# CHALLENGE-D · `AdminUsersPanel.vue` — the design is wrong

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]` — spawned with an explicit
Opus 5 declaration. The seat is declared, not inherited.

Subject: `demo/palettes/browser/admin/AdminUsersPanel.vue` (391 lines), area `palettes`, route `#/admin/users`.
Repo `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`.
Verdict: **DEFECTIVE** — 4 BLOCKER, 8 MAJOR, 3 MINOR, 3 INFO.

---

## 0. Method, and the evidence gap I had to close first

The mega-tranche visual audit captured `/#/admin/users` in 4 matrices + 5 state matrices — **all nine of them
in the zero-row state**. `REPORT.json` proves it: every admin-users row has `bodyTextLength` 273/122 and the
dock reads `Login`. So **every populated state of the largest component in the palettes area has never been
looked at**: no row, no expanded disclosure, no confirm dialog, no error body, no RTL row, no focused row.

That is itself the first finding about this design: it has never been seen doing its job.

I closed the gap with three read-only probes committed beside this report:

| probe | what it decides |
|---|---|
| `probe-populated.mjs` → `probe-populated.json`, `frames/A..G` | populated / expanded / dialog / dark / mobile / error, plus computed-style telemetry |
| `probe-measure.mjs` → `probe-measure.json` | type rungs, nested-boundary chain, dialog surface, mobile toolbar geometry |
| `probe-states.mjs` → `probe-states.json`, `frames/H..J` | row focus, forced colors, RTL on a real roster |
| `probe-pill-schemes.mjs` | the slug-pill paint in both schemes, measured |

Each mints a fake admin token in `localStorage` (`palette-admin-token`, see
`demo/platform/auth/useAdminAuth.ts:15`) and fulfils `**/admin/users**` from a fixture. Nothing was written
outside this directory; no source was touched.

---

## 1. BLOCKERS

### D-1 · The route gives the roster 36.4% of `main` and gives an *empty* companion the same 36.4%

Measured (`probe-populated.json → desktopLight`), WebKit @1440×900:

```
mainWidth        1408
card[0] Users        x=199  w=512   → 36.36% of main
card[1] My Palettes  x=729  w=512   → 36.36% of main
user row width                460   → 32.7% of the 1408px main
```

`frames/A-desktop-light-populated.png` and the shipped `shots/safari-desktop-light/admin-users.png` both show
it: an Admin review surface beside a **"My Palettes" pane that says "No saved palettes yet."** The companion is
empty and it is co-equal.

Three binding clauses, all violated:

- `VISUAL-CONSTITUTION.md:218` — "**Each Admin route uses the full main width: the current Palettes companion,
  right label and resulting mobile pane selector are removed rather than restyled.**"
- `VISUAL-CONSTITUTION.md:28` (§3 law 2) — "Empty secondary content occupies at most a narrow invitation tray
  (≤15% of the stage) or disappears. **It never receives half the viewport.**"
- `PROPORTION-AUDIT.md:48` (PR-04) — terminal verb **REMOVE**, "Admin companion `50%→0`".

The mobile half is live too: `shots/safari-mobile-light/admin-users.png` still carries the `Users | Palettes`
pane selector in the dock — the exact artefact clause :218 names for removal.

The consequence for *this* component is not abstract. A five-column review table (identity, palettes, created,
last seen, status) cannot exist in 460px. The panel's whole anatomy — one pill, one bare badge, a void, two
buttons — is the shape a 460px cage forces. **The row is not badly designed for its container; the container is
the defect and the row is the symptom.**

> Ownership note: the composition lives in `demo/palettes/admin/AdminPane.vue:2` (a `Card tier="resting"` per
> pane) and the shell pane router. AdminUsersPanel cannot fix it. It is reported here because it is the
> gestalt defect of this component's surface, it is booked with a terminal REMOVE verb, and it is **still live
> at HEAD**.

### D-2 · RTL destroys the user's identity — on the surface that deletes users

`AdminUsersPanel.vue:101` splits the slug into two sibling inline spans:

```html
><span class="truncate min-w-0">{{ slugHead(user.slug) }}</span><span class="shrink-0">{{ slugTail(user.slug) }}</span></span>
```

Measured under `dir="rtl"` (`probe-states.json → rtl`): `pillDirection: "rtl"`, `pillUnicodeBidi: "normal"`,
`pillDirAttr: null`. No isolation. The two spans therefore lay out right-to-left, and `frames/J-rtl-populated.png`
renders:

| intended | rendered in RTL |
|---|---|
| `aurora-drifting-lantern-4471` | **`n-4471…-drifting-lanter`** |
| `empty-ghost-quiet-meadow-77` | **`dow-77empty-ghost-quiet-mea`** |
| `empty-ghost-quiet-meadow-33` | **`dow-33empty-ghost-quiet-mea`** |
| `3 users · 2 empty` | **`empty 2 · users 3`** |

`VISUAL-CONSTITUTION.md:133` and `:155` are explicit: "CSS strings, hex, slugs, IDs and provenance | **render
in LTR-isolated spans inside RTL prose**."

Two things make this a BLOCKER rather than a cosmetic bidi slip:

1. The split exists *specifically* to protect identity. `AdminUsersPanel.vue:243-245`: "the last 6 chars carry
   the distinguishing suffix (prune candidates read `…-33` vs `…-77`, never two identical `empty-ghost…`
   stubs)." Under RTL the mechanism inverts — the distinguishing suffix moves to the **head** of a string whose
   remainder is truncated. The affordance defeats itself.
2. The confirm dialog's pill is a *single* text node (`:169`), so it renders the slug correctly. Measured
   `dialog.text` = "…delete user aurora-drifting-lantern-4471 and all associated data." So in RTL **the row you
   click says `n-4471…-drifting-lanter` and the dialog you confirm says `aurora-drifting-lantern-4471`.** The
   identity shown at the point of choice and the identity shown at the point of irreversible commit disagree.

### D-3 · The identity token is painted from a *contrast*-only accent, so it collides with `destructive` in light and dies in dark

`AdminUsersPanel.vue:99` and `:168` paint the slug pill by inline style:

```html
:style="{ color: safeAccent, borderColor: safeAccent }"
```

`safeAccent` comes from `SAFE_ACCENT_KEY`, produced by `safeAccentColor` (`demo/color-session/ink.ts:74`,
`useContrastSafeColor.ts:302`). That solver guarantees **contrast**. It does not guarantee **hue**. Measured
at the shipped boot seed (`probe-pill-schemes.mjs`, `probe-measure.json`):

| element | measured paint | OKLCH |
|---|---|---|
| slug pill, **light** | `oklch(0.470927 0.188343 9.834023)` | L .471 · C .188 · H 9.8° |
| slug pill, **dark** | `oklch(0.958322 0.021053 9.834023)` | L .958 · C **.021** · H 9.8° |
| dialog **Cancel** label | `oklch(0.470927 0.188343 9.834023)` | *byte-identical to the pill* |
| dialog **Delete user** fill | `rgb(219, 36, 36)` | L .574 · C .216 · H **27.5°** |

Three separate failures fall out of one mechanism:

**(a) The identity token wears the destructive register.** Identity `H 9.8° / C .188` vs destructive
`H 27.5° / C .216`: **ΔH = 17.6°, ΔC = 0.027, ΔL = 0.103.** They are neighbours. `frames/A` shows five
saturated crimson lozenges marching down the roster. The component's own comment at `:107-111` removed exactly
this pattern from the delete button — *"the per-row destructive is quieted to ink-at-rest — red arrives on
hover/focus, never as **5 resting beacons down the list**"* — and then reinstated five resting beacons on the
identity token, in the destructive hue. Measured resting trash ink is `rgb(91,70,51)` = `oklch(.411 .042 63.4)`,
correctly quiet. The pill is 4.5× its chroma.

**(b) Cancel and Delete are the same colour family.** `frames/C-desktop-light-confirm-dialog.png`: the safe
escape is crimson text, the irreversible commit is a red fill, 17.6° apart. In a destructive confirmation the
one thing colour must do is separate the two answers.

**(c) No scheme-stable identity.** Chroma collapses **0.188 → 0.021, an 8.9× reduction (−88.8%)**, L → .958.
`frames/D-desktop-dark-populated.png` shows the pills as plain white-on-dark ink with white borders. The
loudest element of the light page is the *quietest* element of the dark page. The π/DELTA pair
(`frames/A` vs `frames/D`) is the witness `VISUAL-CONSTITUTION.md:228` asks for.

Authorities: `VISUAL-CONSTITUTION.md:82` ("Text, focus, boundaries and state meet their rendered contrast on
the actual material tier; **a token name is not evidence**"), `:23` ("every other navigation, route, pane,
**Admin**, Account, action, and status label use neutral ink"), `:218` ("Elevated authority is communicated by
labeling and scope, **not by a fourth visual system**"). Also owner edict 5 — this is a per-instance inline
paint of a token the design system should own.

### D-4 · There is no unauthorized state; "no authority" is dressed as "no users"

`demo/palettes/useAdminUsers.ts:54-56`:

```ts
async function loadAdminUsers() {
    const token = getAdminToken();
    if (!token) return;            // ← loading stays false, users stays [], loadError stays null
```

So for a visitor with no admin token the panel receives `loading=false, users=[], loadError=null` and renders
line `:63`:

```html
<EmptyState v-else-if="users.length === 0" eyebrow="· roster clear ·" message="No users found." />
```

**The application tells an unauthenticated stranger, as fact, that the user roster is empty** — and hands them
a live `Refresh` button (`:32-41`, `:disabled="loading"` only) that silently returns at line 56, plus a
`Prune empty` button. `AdminPane.vue:122` compounds it: the header badge renders `0`.

This is the exact conflation the component's own comment at `:49-50` claims to have cured: *"error ≠ empty — a
dead backend never costumes as an empty roster."* The cure was applied to one branch (HTTP failure) and the
authority branch was never designed.

Reproduction: `localStorage.removeItem('palette-admin-token')`, load `http://localhost:9000/#/admin/users`.
Witness: **all nine shipped captures for this route are this state** —
`shots/safari-desktop-light/admin-users.png` (dock reads `Login`, body reads `0 users` / `· roster clear ·` /
`No users found.`), and the same in desktop-dark, mobile-light, mobile-dark, rtl-desktop, rtl-mobile,
zoom-200, reduced-motion, forced-colors.

A state that was never designed is a design defect. This one is also a truth defect.

---

## 2. MAJOR

### D-5 · The error state contradicts itself in adjacent lines

`AdminUsersPanel.vue:8` gates the count on `!loading` only:

```html
<span v-if="!loading" class="text-mono-small text-muted-foreground">{{ totalUsers }} user…</span>
```

Measured error-state DOM (`probe-populated.json → error`, backend forced to 500):

```
Users 0 · Manage accounts and permissions. · 0 users · Prune empty · Refresh
· The roster is unreachable. Internal Server Error · Retry
```

`frames/G-desktop-light-error.png`: the toolbar asserts **"0 users"** and the header badge asserts **"0"**
directly above **"The roster is unreachable."** The A-3 note at `:5-7` reasons correctly ("a '0 users' line
above three loading skeletons is a self-contradiction") and then applies the fix to `loading` alone. `loadError`
needed the same guard, and `AdminPane.vue:121-122` needed it too.

### D-6 · Three fields of `User` exist in the model and have no design; the default sort is keyed on an invisible one

`demo/palettes/types.ts:88-94`:

```ts
export interface User { slug; createdAt: string; lastSeenAt?: string; status?: "active" | "suspended"; paletteCount?: number }
```

The row (`:91-131`) renders `slug` and `paletteCount`. **`createdAt`, `lastSeenAt` and `status` are rendered
nowhere.** A *suspended* account is pixel-identical to an active one. And `useAdminUsers.ts:26` defaults
`userSortMode` to `"newest"`, which sorts on `createdAt` (`:40-42`) — **the list's order is governed by a key
the design never shows**, while the sort control itself is buried in the SearchBar kebab
(`AdminPane.vue:17-21`). Frames A/D/F: five rows in an order the viewer cannot account for.

`VISUAL-CONSTITUTION.md:218`: "**Actor, scope, provenance and effect remain visible.**"
`PROPORTION-AUDIT.md:55` (PR-11): "Admin rows obscure actor/scope/effect" — **ADD-AFFORDANCE**, primary W24.
Still live.

### D-7 · Hierarchy inversion: the data shouts, the controls whisper, the middle is void

Measured (`probe-populated.json`, `probe-measure.json`, `probe-pill-schemes.mjs`):

| element | job | rendered weight |
|---|---|---|
| slug pill | data | `C .188` crimson, `font-weight 700`, `border-width 2px` (`foundation.css:746`), Fira Code |
| count badge | data | filled secondary lozenge, no label, no accessible name |
| `Palettes` button | **action** | translucent lozenge, label ink `rgb(0,0,0)` at 14.4px italic serif |
| trash button | **destructive action** | 28px glyph, ink `rgb(91,70,51)`, no visible label |

Row geometry: **56px tall × 460px wide desktop, 74px × 322px mobile**, carrying exactly two tokens of
information, with the `flex-1 min-w-0` content column holding only pill+badge and the rest of the row a
measured void. `PROPORTION-AUDIT.md:72` (§5 law 8) — "Real rendered relation wins over token intent";
`VISUAL-CONSTITUTION.md:34` (§3 law 8) — "Supporting fixtures do not compete with it through equal size or
equal shadow." Here they do not merely compete: the non-operable identity chip out-weighs both operable
controls in chroma, weight and border.

### D-8 · Type jurisdiction: interactive controls wear glass-ui's *italic caption* voice, re-familied to the display face

Four sites (`:24`, `:35`, `:116`, and `:125` unlabelled) carry `font-display text-caption`. Measured computed
style on `Prune empty` / `Refresh` (`probe-populated.json → desktopLight.toolbarButtons`):

```
font-family : Fraunces, "Fraunces Fallback", serif
font-style  : italic
font-size   : 14.384px
```

The italic is not decoration — it is the producer's caption *role* leaking into controls.
`node_modules/@mkbabb/glass-ui/dist/styles/typography/semantic.css`:

```css
@utility text-caption { font-family: var(--font-text); font-size: var(--type-caption);
                        line-height: var(--type-leading-caption); font-style: italic; font-weight: 400 }
```

So the component (a) borrows a **caption** utility for **interactive control labels**, and (b) overrides that
utility's own `font-family` with `font-display`.

`VISUAL-CONSTITUTION.md:75` (§4) — "control or label, including dropdown options → `text-small` → **Plus Jakarta
Sans, non-bold**". Measured rungs (`probe-measure.json → tokens`):

```
--type-small   : clamp(0.875rem, 0.8rem + 0.25vw, 1.25rem)  → 16.40px @1440
--type-caption : clamp(0.75rem,  0.71rem + 0.21vw, 1rem)    → 14.38px @1440
```

**Delta: −2.02px (−12.3%), wrong family, wrong slope (italic).** `PROPORTION-AUDIT.md:78` (law 13) closes the
matrix: Fraunces owns display/identity only, "P019's paired Picker scale is the sole exception."

And the design system already ships the role this panel needed:

```css
@utility text-admin-label { font-family: var(--font-mono); font-size: var(--type-admin-label);
                            line-height: 1; text-transform: uppercase;
                            letter-spacing: var(--type-tracking-caps); font-weight: 500 }
```

`grep -rn "text-admin-label" demo/` → **zero hits.** glass-ui's Admin type role is unconsumed by the
five-route Admin suite that exists to use it. Owner edict 4.

### D-9 · Per-instance overrides of the Button root — one of which does not even apply

`h-7 px-2.5 … gap-1.5` at `:24`, `:35`; `h-7 px-2` at `:116`, `:125`. Measured on the rendered buttons:

```
min-height : 36px
height     : 36px          ← h-7 = 1.75rem = 28px never lands
```

So the same class attribute carries a **dead** height override (glass-ui's `size="sm"` `min-height` wins) beside
**live** overrides of the family, size and gap the size token owns. Five properties of the producer root are
overridden per instance, one of them inertly.

Owner edict 5 ("style at the shadcn/glass root component level, **never per-instance overrides**") and edict 2
(no dead/masking code). The family is 8+ sites — `AdminFlaggedPanel.vue:10,90,96`, `AdminTagsPanel.vue:10,40`,
`AdminAuditPanel.vue:30`, `AdminNamesPanel.vue:55,64,109` copy the same string. The cure belongs in glass-ui
(an admin-control Button size/tone), not in a ninth copy.

### D-10 · The expanded disclosure is casters stacked within casters, and the palette card root is clickable

Measured boundary chain from the palette card inside an expanded row, upward
(`probe-measure.json → nestedCard`):

```
boundedAncestorCount: 4
 1. group rounded-card cartoon-surface border-card-edge bg-well cursor-pointer
    border 2px · box-shadow  -3px 3px 0 , -5px 5px 0 , -7px 7px 0     ← 3 stacked hard casters
 2. border-t border-border bg-muted/30 px-3 py-3                       (AdminUsersPanel:134)
 3. rounded-md border border-card-edge overflow-hidden                 (AdminUsersPanel:68)
 4. glass-resting card rounded-card …   box-shadow 8px 8px 0           (AdminPane:2)
```

`VISUAL-CONSTITUTION.md:186`, verbatim: "Saved palettes are matte specimen slips inside a glass workspace,
**not cartoon casters stacked within casters**." And `:54` / `PROPORTION-AUDIT.md:77` (law 12) fix the binding
tuple as `{size:"sm", material:"content", tier:"quiet", surface:"opaque", **shadow:false, grain:false,
specular:"off"**}` with "no cartoon, grid, or Card-level selected variant." The rendered card is
`cartoon-surface` with a triple caster inside two more boundaries inside a caster.

Second half, and this one *is* AdminUsersPanel's own: the card root computes `cursor: pointer`, and `:148`
binds `@click="emit('toggleExpand', palette.slug)"` to the component root. `VISUAL-CONSTITUTION.md:54`/`:102`:
"The Card/article root is a **noninteractive** container: it owns no activation, focus or selection state…Its
sole selection seat is a native named `<button type="button" aria-pressed>`." The panel mounts the clickable-card
fiction the constitution abrogates.

`frames/B-desktop-light-expanded.png` shows the optical result: the child palette card (full-bleed 4-colour
band, 2px border, triple caster) is visibly heavier than the parent row that owns it — a support fixture
out-weighing its protagonist (`VISUAL-CONSTITUTION.md:34`).

`PROPORTION-AUDIT.md:49` (PR-05) is the terminal law here: "**only the five Admin fields retain one
adjacent-row separator and no terminal rule; every other divider/ornament is zero**." Four boundaries is not one
separator.

### D-11 · The destructive confirmation is the wrong species, on a see-through surface, with shattered prose

Measured (`probe-populated.json → dialog`, `probe-measure.json → dialogSurface`):

```
role          : "dialog"                     ← not alertdialog
aria-modal    : null                         ← absent
surfaceBg     : oklab(0.9035 0.0153 0.0142 / 0.705088)     ← 29.5% transparent
backdrop      : blur(11px) saturate(1.6)
description   : 462px wide, 3 lines
inline pill   : 300.6px wide  (65% of the measure, on its own line)
focused       : BUTTON:Cancel                ← correct
```

Four design defects in one overlay:

1. **Species.** An irreversible, un-undoable delete is announced through a generic `role="dialog"` with no
   `aria-modal`. glass-ui retired `ConfirmDialog` (the panel's own note, `:157`) and the consumer rebuilt a
   confirm out of the generic family — losing the register in the move.
2. **Surface.** 70.5% opacity + `blur(11px)`. `frames/C-desktop-light-confirm-dialog.png` shows the underlying
   Harbor Dusk swatch band and its "Harbor Dusk 4 ♡0" text reading **through** the confirmation copy.
   `VISUAL-CONSTITUTION.md:19`: "Glass earns its blur by revealing live content; otherwise it is a neutral
   well." The one sentence a person must read before destroying an account is not a place to reveal live
   content.
3. **Prose.** A 300.6px bordered lozenge is set inline in a 462px, 3-line description (`:162-171`), producing
   `This will permanently delete user` / **[300px pill]** `and all associated` / `data. This cannot be undone.`
   The sentence is broken across the ornament and orphaned.
4. **Locus.** `:254-286` is a seven-ref hand-rolled confirm engine (`confirmOpen`, `confirmTitle`,
   `confirmDescription`, `confirmSlug`, `confirmLabel`, `confirmDestructive`, `confirmAction`) plus
   `showConfirm()`/`onConfirm()`, living inside a list panel that also owns a fetch (`:352-365`) and a
   five-member imperative surface (`defineExpose`, `:389`) that `useAdminUsers.ts:95,117,132,146` reaches into
   by template ref. This is the area's largest file and it is a view, a store and a dialog engine. Owner
   edicts 1 (no god modules), 3 (KISS/no contrivance), 4 (the primitive belongs in glass-ui).

### D-12 · At 390px the two toolbar actions land on different lines, pinned to opposite edges

Measured (`probe-measure.json → mobileToolbar`, viewport 390):

```
"3 users"     x=33.0   y=278.0
"· 2 empty"   x=101.3  y=278.0
Prune empty   x=249.1  y=260.8   w=107.9
Refresh       x=33.0   y=322.8   w=79.7
sameLine      false                        (Δy = 62px)
```

`frames/F-mobile-light-populated.png`: `Prune empty` sits at the right edge of line 1; `Refresh` sits at the
left edge of line 2. Two members of one action family, split across lines and thrown to opposite margins.

Cause is structural: `:14` uses `<div class="flex-1" />` as a spacer inside a `flex items-center gap-2
flex-wrap` container (`:4`). A flex spacer and `flex-wrap` are incompatible — once the line breaks, the spacer's
`flex-1` no longer separates anything and the second line starts flush. `VISUAL-CONSTITUTION.md:33` (§3 law 7):
"Spacing is container-scaled from glass-ui tokens. **No desktop-tight/mobile-airy fork and no breakpoint pile.**"
The cure is one container that answers at both widths, not a spacer div.

Same line carries a second, smaller defect: `:11-13` welds the separator to the second fragment
(`· {{ emptyCount }} empty`), so in a wrapping container the "·" can orphan onto a new line ahead of its
operand — and under RTL it already renders as `empty 2 · users 3` (D-2).

---

## 3. MINOR

### D-13 · The only record of an irreversible bulk delete is a bouncy 3-second flourish

`:301-309`:

```ts
pruneResult.value = count > 0 ? `Pruned ${count} user${count !== 1 ? "s" : ""}` : "No empty users to prune";
setTimeout(() => { pruneResult.value = null; }, 3000);
```

announced through `<Transition name="vj-celebrate">` (`:16-20`), which `demo/styles/animations.css:141` labels
"**Family 3 · celebration**" and drives on `--spring-bouncy` with `max-height` + `translate` + `scale`
(`:142-165`).

- `VISUAL-CONSTITUTION.md:101`: "Persistent operation state stays with the entity/workspace. A transient
  flourish may celebrate success but **never carries the only truth**." `PROPORTION-AUDIT.md:52` (PR-08):
  "Pending/failure/export/recovery truth only transient" → **ADD-AFFORDANCE**.
- **Register error**: a bouncy celebration spring announces the permanent deletion of N accounts.
- **Failure costumes as a no-op**: `useAdminUsers.ts:196-197` catches and returns `0`, so a *failed* prune
  renders "No empty users to prune" — the D-4 sin on a second path.
- **Motion cost**: the beat transitions `max-height`, a layout-forcing property, inside the `flex-wrap` toolbar
  that already breaks at 390px (D-12) — its arrival re-wraps the toolbar to a third line.

### D-14 · The loading shadow does not predict the row it becomes, and the shared row primitive is bypassed

`AdminListSkeleton.vue:4-6` states its own contract: "shaped as the **AdminListItem row grammar** (leading
swatch + primary/secondary lines + trailing action lozenge)", and `:14-20` renders exactly that — an 8×8 circle,
a 36px line, a 24px line, one 56px lozenge.

`AdminUsersPanel.vue:47` renders three of them, and then resolves to a row (`:91-131`) with **no swatch, one
line, and two lozenges of unequal width**. The skeleton promises an anatomy the panel does not have.

Because the panel does not use `AdminListItem` at all. Of the five admin panels:

```
AdminNamesPanel.vue:44,94      → <AdminListItem>            (the shared anatomy)
AdminUsersPanel.vue:68,80      → hand-rolled  "rounded-md border border-card-edge overflow-hidden"
                                              "flex items-center gap-3 px-3 py-2.5 …"
AdminFlaggedPanel.vue:47,50    → the same two strings, verbatim
AdminAuditPanel.vue:62         → the same string + hover
```

`VISUAL-CONSTITUTION.md:218`: "Admin is a five-route review suite — Users, Names, Audit, Flagged and Tags —
using **one review-row anatomy**." There are two anatomies and three copies of one of them.

### D-15 · `role="button"` with two interactive descendants, and a disclosure with no association

Measured (`probe-populated.json → desktopLight`): `rowChildInteractive: [2, 2, 2]` — every disclosure row
carries a `role="button"` (`:85`) that contains two real `<button>` children (`:112`, `:122`).
`probe-measure.json` / `probe-states.json`: `hasAriaControls: false`, `disclosureId: null`.

The component documents the *workaround* at length (`:337-343`: the `target === currentTarget` keydown guard,
`@click.stop` at `:106`) rather than the structural fix. A `button` role may not contain interactive content;
the design wants "the whole row opens the palettes" and "the row also holds two independent commands", and
those two wants are incompatible in one control. The idiomatic transposition is a row that is *not* a button
plus one named disclosure control (`AdminListItem` already reserves an actions slot for exactly this).

> Per the corrected state matrix (MT-F022) I make **no keyboard-reachability claim**: roving tabindex is the
> correct pattern and the WebKit 2/12 delta is macOS Full Keyboard Access, not a defect. The finding above is a
> static DOM-structure fact, engine-independent, and I verified it in WebKit only because that is the audit's
> engine.

---

## 4. INFO / hypotheses (labelled)

### D-16 · `outline-none` where the design system's own `outline-hidden` carries the forced-colors escape — **HYPOTHESIS**

`:82` uses `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring`. Measured focus in normal
mode (`probe-states.json → rowFocus`): `outline-style: none`, ring delivered as
`box-shadow: rgb(28,25,23) 0 0 0 2px` — visible, `frames/H-desktop-light-row-focused.png`.

In glass-ui's compiled CSS the two utilities are not equivalent:

```css
.outline-none  { --tw-outline-style: none; outline-style: none }
.outline-hidden{ --tw-outline-style: none; outline-style: none }
@media (forced-colors: active) { .outline-hidden { outline-offset: 2px; outline: 2px solid #0000 } }
```

Because `box-shadow` is suppressed under real Windows High Contrast, a row whose only focus signal is a
box-shadow ring and whose outline is `none` is at risk of having **no focus indicator** there —
`VISUAL-CONSTITUTION.md:84`: "Focus remains visibly distinct from selection in both schemes, **forced colors**
and reduced transparency."

**Labelled a hypothesis** because I could not reproduce it: WebKit's `forcedColors: "active"` emulation does
not perform author-colour substitution — under it I still measured the accent pill
(`pillColor: oklch(0.519 0.208 9.83)`) and the author box-shadow ring
(`probe-states.json → forcedColors`). Settling this needs a real HCM host. The CSS asymmetry is a fact; the
rendered consequence is not yet observed.

### D-17 · The user-roster empty state borrows the palette-domain mark, and renders it twice on one screen

`:63` renders `EmptyState eyebrow="· roster clear ·"`, whose mark is the three-WatercolorDot +
dashes `EmptyPaletteMark` that `VISUAL-CONSTITUTION.md:186` scopes to the *palette library* empty invitation
("a true empty invitation content-hugs its text/action and may carry one static, aria-hidden
`EmptyPaletteMark`: exactly three WatercolorDots plus the established dashes").

Consequence, visible in the shipped capture `shots/safari-desktop-light/admin-users.png`: because of D-1 the
empty Users panel and the empty My Palettes panel sit side by side, so **the identical ornament is rendered
twice, 400px apart, standing for two unrelated domains** — "· roster clear ·" and "· empty plate ·" under the
same three pastel dots. A palette mark cannot depict the absence of *users*.

### D-18 · Reduced motion does not collapse the row transition to the intended `0.01ms` — **HYPOTHESIS, not this component's**

`demo/styles/animations.css:184-192` declares a global guard (`*, *::before, *::after { transition-duration:
0.01ms !important }`). Under `reducedMotion: "reduce"` (`matchMedia` confirmed `true`) I measured the row's
computed `transition-duration` as **`0.1s`** (`probe-populated.json → reducedMotion.rowTransition`), and found
no `prefers-reduced-motion` variant of any `.vj-celebrate-*` rule in the served stylesheets.

I could not identify the rule that wins, and the mechanism is cross-cutting rather than component-local, so I
report the measurement and decline to attribute it. `VISUAL-CONSTITUTION.md:144`: "Reduced motion resolves
directly to the final geometry and stable chromatic state."

---

## 5. What the design should be (gestalt, not patch)

The transposition is one move, and every BLOCKER and most MAJORs fall out of it.

**The Admin suite is a review *table*, not five bespoke lists in a half-width card.**

1. **Delete the companion; take the full main width.** `PROPORTION-AUDIT.md:48` already rules this
   (PR-04 REMOVE, primary W18). Once the roster owns ~1400px instead of 460px, the row can carry the columns it
   is missing — identity · palettes · created · last seen · status — and D-6, D-7 and half of D-12 stop being
   design problems and become column-width decisions.
2. **One review-row anatomy, owned by `AdminListItem`, for all five routes.** Then the skeleton is honest by
   construction (D-14), the three hand-rolled copies die (D-14), and the disclosure control becomes a named
   member of the actions slot instead of a `role="button"` wrapper around two buttons (D-15).
3. **Identity is neutral ink; the accent stays in its lanes.** The slug is provenance: `text-mono-small`,
   neutral foreground, no per-instance inline paint, no 2px chromatic border. That single change kills D-3
   (a), (b) and (c) at once — Cancel stops being crimson because Cancel stops inheriting the accent, and the
   dark-mode chroma collapse stops mattering because there is no chroma to collapse. Reserve `C > 0.15` in the
   warm-red arc for `destructive` alone.
4. **Consume the producer's roles instead of re-deriving them.** `text-admin-label` for admin control labels;
   an admin-control Button size/tone contributed to glass-ui once, replacing eight copies of
   `h-7 px-2 font-display text-caption`; the confirm dialog re-landed in glass-ui as an `alertdialog`-species
   member of the Dialog family with an opaque surface and a block-level (not inline) subject line. That is
   D-8, D-9, D-11 as one producer letter.
5. **Design the two missing states.** `unauthorized` (no token → a named authority state, not a roster claim,
   and no operable toolbar) and `error` (suppress the count and the header badge, not just the skeleton). D-4,
   D-5.
6. **Isolate every identifier.** One `<bdi>`/`dir="ltr"` boundary around the slug — and, better, stop splitting
   it into two spans at all: `direction: rtl; text-overflow` with a single node, or a producer-owned
   middle-truncation primitive. D-2.
7. **Durable operation state on the entity.** The prune result belongs in the roster's status region (or an
   audit row), not in a 3-second bouncy flourish; the failure path gets its own copy. D-13.

Nothing above is a patch to a line. Each is a removal or a relocation to the layer that should have owned it.

---

## 6. Artefacts

```
docs/tranches/V/megatranche/audit/components/AdminUsersPanel/
├── challenge-D-design.md          (this report)
├── probe-populated.mjs / .json    populated · expanded · dialog · dark · mobile · error
├── probe-measure.mjs   / .json    type rungs · boundary chain · dialog surface · mobile toolbar
├── probe-states.mjs    / .json    row focus · forced colors · RTL
├── probe-pill-schemes.mjs         slug-pill paint, light vs dark
└── frames/
    ├── A-desktop-light-populated.png      D-1 D-3a D-7
    ├── B-desktop-light-expanded.png       D-10
    ├── C-desktop-light-confirm-dialog.png D-3b D-11
    ├── D-desktop-dark-populated.png       D-3c  (π pair with A)
    ├── E-desktop-dark-row-hover.png       D-7
    ├── F-mobile-light-populated.png       D-12 D-7
    ├── G-desktop-light-error.png          D-5
    ├── H-desktop-light-row-focused.png    D-16
    ├── I-forced-colors-populated-focused.png  D-16 (emulation limits noted)
    └── J-rtl-populated.png                D-2
```

All probes are read-only against `http://localhost:9000` and write only into this directory.
No file under `src/`, `demo/`, `api/`, `test/`, `e2e/`, `docs/tranches/V/vnext/`, `scripts/dev/dev.sh` or any
`INBOX.md` was read-modified. No source edits land from this seat.
