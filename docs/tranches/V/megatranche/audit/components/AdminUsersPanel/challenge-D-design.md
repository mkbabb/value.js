# CHALLENGE-D · `AdminUsersPanel.vue` — the design is wrong · **pass 3**

## Model receipt

I observe myself to be **Opus 5 (1M context)**, exact model id `claude-opus-5[1m]`, spawned with an
explicit Opus 5 declaration. The seat is declared, not inherited.

- Subject: `demo/palettes/browser/admin/AdminUsersPanel.vue` (391 lines), area `palettes`, route `#/admin/users`.
- Repo `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`; subject file clean at HEAD.
- Run date **2026-07-28, pass 3**. Three earlier challenge-D passes are preserved beside this file:
  `challenge-D-design.2026-07-24-prior.md`, `challenge-D-design.2026-07-27-pass1.md`, and
  **`challenge-D-design.2026-07-27-pass2-prior.md`** — pass 2 is the substantive predecessor and its
  22-finding register (D-1 … D-22) is **carried forward whole**, not restated.
- **Verdict: DEFECTIVE.** Pass 2's 4 BLOCKER · 14 MAJOR · 4 MINOR/INFO **stand, all re-verified**,
  plus **1 new BLOCKER · 8 new MAJOR · 1 new MINOR · 1 new INFO** below, and **one correction to a
  pass-2 attribution**.
- Probes: `probe-D4/probe-D4a-computed.mjs`, `-D4b-duplication-ring-trio.mjs`, `-D4c-forced-colors.mjs`,
  `-D4d-a11y-name-two-engine.mjs`. Read-only against `http://localhost:9000`; no repo source touched;
  the only writes are this file, its `-pass2-prior` copy, and `probe-D4/`.

**What this pass adds.** Pass 2 proved the panel lies about *scope* and *outcome*. Pass 3 proves it
also **does not render the design it declares**: it addresses glass-ui 7's `Button` through a
`variant` prop that **does not exist in that component's API**, so five of its stated visual
decisions — including the one the file's own comment claims cured the destructive-beacon defect —
are inert fallthrough HTML attributes. Everything pass 2 credited to `variant="ghost"` is produced by
hand-rolled utility classes instead. That reframes the component from *unpolished* to *undelivered*.

---

## 0 · Carried forward from pass 2 — re-verified, not re-litigated

Every pass-2 finding was re-checked against HEAD `c654824e`. The subject file is byte-identical to
what pass 2 read (`git status` shows it clean), so all 22 stand. Their evidence lives in
`challenge-D-design.2026-07-27-pass2-prior.md` and `probe-D3*.json` / `frames-D3/`.

| pass-2 ID | claim | status in pass 3 |
|---|---|---|
| D-1 (BLOCKER) | prune confirmation understates scope; 1 promised, 3 executed | **STANDS** — mechanism re-read at `:241` + `AdminPane.vue:28`; **extended by D-25** |
| D-2 (BLOCKER) | six mutations have no result channel; `return 0` ≡ "No empty users to prune" | **STANDS** — **extended by D-27** (a seventh path, a *read*, is worse: no `catch` at all) |
| D-3 (BLOCKER) | disclosure focus ring 1.02–1.20:1, clipped by `overflow-hidden`, two engines | **STANDS** — **corroborated from a second direction by D-33** |
| D-4 (BLOCKER) | RTL fabricates identifiers (`aaa-33empty-ghost-account-a`) | **STANDS** — my own `rtl-desktop` read reproduces the count-line arm (`users 0`) |
| D-5 | boundary inventory exceeded 24:5 incl. terminal rule | **STANDS** — **extended by D-28** (the fork's cross-route consequence) |
| D-6 | action controls in Fraunces italic | **STANDS** — independently re-measured: `Fraunces…serif`, `italic`, `14.384px` |
| D-7 | disclosure 99.95 % pixel-identical closed vs open | **STANDS** — **extended by D-29** (its accessible name is the whole row) |
| D-8 | PR-35 inset matrix violated at both arms, no responsive arm | **STANDS** |
| D-9 | unauthenticated state undesigned; Refresh inert | **STANDS** — this is still the only state in all 60 captures |
| D-10 | no columns; badge at 5 x-positions, spread 242.2 px | **STANDS** — **extended by D-30** (the toolbar has the same disease) |
| D-11 | identity painted in `--accent-live`; shares chrome with the Dock authority badge | **STANDS** — **extended by D-26** (a second duplication, of the datum itself) |
| D-12 | toolbar count 3.91:1 — the retired class the imported atom was certified to cure | **STANDS** — **extended by D-32** (the disabled control is worse: 2.88:1 dark) |
| D-13 | reduced motion leaves colour-only pending; no `aria-busy`, no live region | **STANDS** — `STATES.json` `reduced-motion-desktop /#/admin/users` `rafPer1500ms: 0` confirms the freeze |
| D-14 | skeleton promises a row anatomy this panel never renders | **STANDS** — **root cause named in D-28** |
| D-15 | two irreversible actions, one glyph, 6 px apart; 11/14 sub-44 px at 390 | **STANDS** |
| D-16 | result beat displaces both live controls 105 px | **STANDS** |
| D-17 | expanded region imports the Browse/Library entity slip | **STANDS** |
| D-18 | sort offers a key the row refuses to display | **STANDS** |
| D-19 | empty plate wears the palette ghost trio in the picked colour | **STANDS** — re-measured: **two identical trios on one route**, `116×44` each, both `--watercolor-color: var(--accent-live)` |
| D-20 | physical `mr-1` in a bidi-bearing row | **STANDS** |
| D-21 | five producer primitives hand-rolled | **STANDS** — **and understated; see D-23** |
| D-22 | encapsulation inverted; `defineExpose` of 5 | **STANDS** |

One pass-2 line requires correction; it is D-23 below.

---

## NEW — BLOCKER

### D-23 · The component addresses glass-ui 7's `Button` through a prop that does not exist. Five declared visual decisions never shipped — including the one the file claims cured D-15.

`node_modules/@mkbabb/glass-ui/dist/components/button/Button.vue.d.ts` — the whole prop surface:

```ts
export type ButtonEmphasis = "primary" | "secondary" | "quiet" | "text";
export interface ButtonProps extends PrimitiveProps {
    /** Visual priority. It does not change the command's semantics. */
    emphasis?: ButtonEmphasis;
    /** Semantic intent, orthogonal to emphasis. */
    tone?: Tone;
    size?: ButtonSize;
    /** Square geometry for an accessibly named icon command. */
    iconOnly?: boolean;
    /** Marks an in-flight command and suppresses activation until it settles. */
    loading?: boolean;
    type?: …; disabled?: …; class?: …;
}
```

There is **no `variant`**. `demo/ui/button/index.ts` is a single line —
`export { Button } from "@mkbabb/glass-ui";` — so nothing adapts it. `Badge` *does* have `variant`
(`Badge.vue.d.ts`), which is exactly how the mistake survives review: the two neighbours in the same
row take different vocabularies.

AdminUsersPanel passes `variant` at **five** sites: `:22`, `:33`, `:58`, `:114` (`"outline"`) and
`:123` (`"ghost"`). Measured live DOM of the two toolbar buttons (`probe-D4a`, Chromium 1440×900):

```
attrs: data-slot=button | data-emphasis=secondary | data-tone=neutral | data-size=sm |
       data-press-armed= | type=button | disabled= |
       class=button tap-squish focus-ring glass-wash glass-capsule h-7 px-2.5 cursor-pointer
             font-display text-caption gap-1.5 |
       variant=outline |                     ← dead fallthrough HTML attribute
       style=--glass-btn-press-t: 0.0000; --flex-vel: 0.0000;
border: 0px rgb(28, 25, 23)                   ← there is no outline
```

`variant=outline` lands on `<button>` as a literal attribute styling nothing, while the axes that
actually paint read `emphasis=secondary`, `tone=neutral`. Measured `border-width: 0px` closes it:
**the "outline" register the file declares is not on screen at any of the four sites.**

Five consequences, each a design consequence:

1. **The documented cure for pass-2 D-15 is inert.** `AdminUsersPanel.vue:107–111` states the
   W5-12/F-8 decision — *"the per-row destructive is quieted to ink-at-rest — red arrives on
   hover/focus, never as 5 resting beacons down the list"* — and implements it as `variant="ghost"`
   (`:123`). That prop does nothing. The quieting pass 2 measured (`rgb(213,208,200)` resting) comes
   from the hand-rolled `text-muted-foreground hover:text-destructive hover:bg-destructive/10` in the
   same class string. **Correction to pass 2's Verified-clean list:** the bullet *"the resting
   destructive ink really was quieted (measured `rgb(213,208,200)` dark)"* is right about the pixels
   and wrong about the mechanism. The pixels are an accident of a utility string; the declared
   mechanism is dead. A reader maintaining this file will edit `variant` and see nothing change.
   The glass-ui spelling is `emphasis="quiet" tone="destructive"`.
2. **`iconOnly`** — *"Square geometry for an accessibly named icon command"* — is the exact producer
   affordance for the bare-trash button at `:122–130`. Bypassed for `h-7 px-2`. This is the direct
   cause of pass-2 D-15's `28×36` seat.
3. **`loading`** — *"Marks an in-flight command and suppresses activation until it settles"* — is the
   exact producer affordance for the prune/refresh pending state. Bypassed for a hand-rolled
   `<Loader2 v-if="pruning" class="animate-spin"/>` plus a manual `:disabled` (`:26–28`,`:36`). This
   is the direct cause of pass-2 D-13: the producer's `loading` would carry `aria-busy` and a
   non-colour register; the hand-roll carries neither.
4. **`tone`** exists and is orthogonal to emphasis, so `tone="destructive"` is the one-token
   expression of the entire hand-rolled hover/focus destructive cluster at `:125`.
5. Pass-2 D-21 counted five producer primitives left on the shelf. It is **six** — the sixth is the
   producer's own Button axis system, which the file has been overriding for its whole life.

**Scope, stated honestly.** This is systemic, not unique to this file:

```
$ grep -rn '<Button' -A2 demo | grep -c 'variant='
51
$ grep -rln '<Button' demo | wc -l
22
```

51 dead `variant=` occurrences across 22 demo files; this component owns 5 of them. It remains a
defect **of this component** — the seat under audit ships a visual design it did not render — and it
is also evidence that a producer rename landed without a consumer cut.

**Cure (transposition).** Delete every `variant` from the file and state intent on the real axes:
toolbar `emphasis="quiet"`; row destructive `emphasis="quiet" tone="destructive" iconOnly`; prune
`:loading="pruning"`. That single move also deletes the five per-instance class strings (D-24), the
hand-rolled spinner (pass-2 D-13) and the hand-rolled destructive hover cluster. Then relay the
51-site finding to the glass-ui BH inbox per the standing formation invariant — the consumer cut is
producer-coordination work, not a local patch.

---

## NEW — MAJOR

### D-24 · The per-instance geometry override is both forbidden and inert. `h-7` loses at 100 % of measured viewports.

`class="h-7 px-2.5 cursor-pointer font-display text-caption gap-1.5"` at `:24`, `:35`, and
`h-7 px-2 …` at `:116`, `:125` — five per-instance overrides of a root that carries a `size` axis,
passed on the very same elements (`size="sm"`).

Owner edict 5: *"style at the shadcn/glass root component level, never per-instance overrides."*

They do not even take effect. Measured (`probe-D4a`):

| viewport | control | declared | **measured** |
|---|---|---|---|
| 1440×900 | Prune empty | `h-7` = 28 px | **120 × 36** |
| 1440×900 | Refresh | `h-7` = 28 px | **87 × 36** |
| 390×844 | Prune empty | `h-7` = 28 px | **108 × 54** |
| 390×844 | Refresh | `h-7` = 28 px | **80 × 54** |

Zero for four. The file carries five dead geometry declarations that a maintainer will read as the
contract. `cursor-pointer` repeated at four call sites is the same defect in miniature — cursor is a
Button-root property.

### D-25 · One status sentence counts two different populations.

`:8–13` composes the toolbar status from two spans:

```html
<span …>{{ totalUsers }} user…</span>   <!-- AdminPane.vue:33 → pm.adminUsers.length   UNFILTERED -->
<span …>· {{ emptyCount }} empty</span> <!-- :241 → users.filter(…) over the prop  FILTERED   -->
```

`totalUsers` is bound to the **unfiltered** roster; `emptyCount` is computed over the **search-filtered**
prop (`AdminPane.vue:28` → `pm.filteredAdminUsers`). Pass 2's own D-1 reproduction shows the result
and reads past it:

```
filtered: { headerBadge: "5", toolbar: ["5 users","· 1 empty"], renderedRows: 1 }
```

*"5 users · 1 empty"* — where 5 is the whole roster and 1 is only within the single visible row.
A middot joins two populations into one sentence. The operator's mental model of "how much of the
roster is prunable" is assembled from a numerator and a denominator that do not belong to each other,
and it is that numerator the confirmation dialog then quotes (pass-2 D-1).

`PROPORTION-AUDIT.md §5.8` — *"Real rendered relation wins over token intent."* Here the rendered
relation is a ratio, and it is false.

**Cure:** both halves resolve from one received `RosterCounts { total, empty, visible, visibleEmpty }`
supplied by the port. A status line may not compute half of itself from the presentation layer.

### D-26 · The same datum renders twice, 125 px apart, in identical type.

Measured (`probe-D4b`, every leaf node in `<main>` matching the count):

```
DIV.badge-atom        "0"        @ (345, 269)   "Fira Code" 16.4px
SPAN.text-mono-small  "0 users"  @ (224, 394)   "Fira Code" 16.4px
```

Two nodes, same family, same size, same value, 125 px apart in a 512 px pane. Source — the identical
expression, bound twice:

```
AdminPane.vue:122   return pm.loadingUsers.value ? null : pm.adminUsers.value.length   → header Badge
AdminPane.vue:33    :total-users="pm.adminUsers.value.length"                          → AdminUsersPanel:8-10
```

`PROPORTION-AUDIT.md §5.6` — *"**Subtraction precedes explanation**."* One of the two is furniture.
The header Badge is the route-level count and already exists; the toolbar line should carry only what
the header cannot — the actionable `N empty` sub-count (and only after D-25 gives it a matching
denominator). This is the third duplication on the surface, after pass-2 D-11 (identity chip ≡ Dock
authority badge) and D-19 (roster ghost trio ≡ palette ghost trio).

### D-27 · The nested palette read has no `catch` at all — worse than the six swallowed mutations, and it costumes as empty.

Pass-2 D-2 censused six *mutation* paths swallowed into `console.warn`. There is a seventh path, a
**read**, and it has no handler of any kind (`:352–365`):

```ts
    loadingUserPalettes.value = true;
    try {
        userPalettes.value = await pm.loadUserPalettes(slug);
    } finally {
        loadingUserPalettes.value = false;
    }
```

No `catch`. On rejection `userPalettes` stays `[]`, `:138` renders
`EmptyState eyebrow="· none pinned ·" message="No palettes."`, **and the rejection escapes
`toggleUserExpand` as an unhandled promise rejection** — so this path does not even reach the
`console.warn` floor the other six have.

The consequence is not cosmetic. "Has no palettes" is precisely the predicate the Prune command
deletes accounts on (`:241`). A user whose palette list failed to load renders identically to a user
who has none, one click away from a bulk-delete affordance.

And it violates the law this file wrote for itself, ten lines above (`:49–50`): *"error ≠ empty — a
dead backend never costumes as an empty roster."* Applied to the outer list, never carried inward.

**Reproduction:** expand any row while the api is unreachable → `· none pinned · / No palettes.`
plus an unhandled rejection. (Pass 2's `probe-D3` interception harness reproduces it by fulfilling
`GET /admin/users/:slug/palettes` with a 500.)

### D-28 · The suite's shared row anatomy exists, this panel forks it, and the fork shifts the identity column 44 px between Admin routes.

`AdminListItem.vue:11–22` is the shared review row:

```html
<div class="flex items-center gap-3 px-3 py-2.5 rounded-md border border-card-edge min-w-0">
  <div class="shrink-0 w-8 h-8 …"><slot name="swatch"/></div>      ← leading 32 px anchor
  <div class="flex-1 min-w-0 overflow-hidden …"><slot name="content"/></div>
  <div class="flex items-center gap-1.5 shrink-0"><slot name="actions"/></div>
```

`AdminUsersPanel.vue:68 + 80 + 91 + 106` is that markup re-typed inline across two divs, **minus the
swatch column**. Measured consequence: an Admin·Names row starts its content at `px-3` + 32 +
`gap-3` = **56 px** from the row edge; an Admin·Users row starts at **12 px**. Switching Admin tabs
translates the identity column by **44 px**.

`VISUAL-CONSTITUTION.md:218` — *"Admin is a five-route review suite — Users, Names, Audit, Flagged
and Tags — using **one** review-row anatomy."*

```
$ grep -n "AdminListItem" demo/palettes/browser/admin/*.vue
AdminNamesPanel.vue:44,71,94,116,128        ← the only consumer
$ wc -l demo/palettes/browser/admin/*.vue | sort -n
   24 AdminListItem.vue   …   152 AdminNamesPanel.vue   153 AdminFlaggedPanel.vue
  391 AdminUsersPanel.vue      ← 2.56× the next largest sibling
```

A shared anatomy with one consumer and four forks, of which this is the largest. This is also the
**root cause of pass-2 D-14** — the skeleton previews `AdminListItem` (its own comment says so,
`AdminListSkeleton.vue:4`) because the skeleton was written against the anatomy the panel abandoned.
One cure closes both: consume `AdminListItem`, and the loading shadow becomes truthful for free.
Owner edicts 1 (no god modules) and 3 (KISS, no contrivance).

### D-29 · The disclosure's accessible name is the entire row concatenated, and the count digit fuses onto the slug. Two engines.

The row carries `role="button"` (`:85`) with **no `aria-label`**, so its name is computed from
contents — and its contents include both commands. Reconstructing `:78–131`'s structure verbatim and
reading the aria tree in **both** engines (`probe-D4d`):

```
=== chromium ===
- button "ghost-empty-17333 Palettes Delete user ghost-empty-1733":
  - text: ghost-empty-17333
  - button "Palettes"
  - button "Delete user ghost-empty-1733": x
=== webkit ===
- button "ghost-empty-17333 Palettes Delete user ghost-empty-1733":
  - text: ghost-empty-17333
  - button "Palettes"
  - button "Delete user ghost-empty-1733": x
```

Byte-identical in both engines. Two defects in one name:

1. **The disclosure announces as a 51-character sentence containing the word "Delete."** The control
   that expands a row is named after the two irreversible commands inside it.
2. **The palette count fuses onto the slug**: `ghost-empty-1733` + Badge `3` → `ghost-empty-17333`.
   `:97–104` places two adjacent inline chips with no separating text node, so name computation
   concatenates without a space. The row therefore *announces* an identifier that does not exist —
   the same class of defect pass-2 D-4 proved for the RTL *visual* arm, now in the AT arm and in LTR.

This is not the MT-F022 Full-Keyboard-Access delta: it is a name computation, reproduced in both
engines from identical markup. It is also a design finding, not merely an a11y one — `WAI-ARIA 1.2
§"Presentational Children"` lists `button` among the roles whose descendants are presentational, so
nesting two named commands inside a `role="button"` is a structurally invalid composition regardless
of any engine's current leniency.

**Cure — the anatomy the canon already wrote.** `VISUAL-CONSTITUTION.md:102`: *"One native named
`<button type="button">` spans its specimen/identity region"*, with actions as **separate named
sibling controls**. A native button over slug + count, sibling to the action cluster, gets a clean
name, gets the producer's focus register (closing pass-2 D-3), and deletes both the `@click.stop` at
`:106` and the `target === currentTarget` guard at `:345` — two mechanisms that exist solely to
contain the nesting.

### D-30 · The toolbar has the same disease as the roster: a 176 px void between the status and the commands that change it, with the status outranking them in scale.

Pass-2 D-10 proved the roster has no column grammar. The toolbar above it is built the same way.
Measured (`probe-D4a`, `probe-D4b`):

| viewport | status rect | first command x | **void between** |
|---|---|---|---|
| 1440×900 (pane 512 wide) | x 224 – 295 | 471 | **176 px — 34 % of the pane** |
| 390×844 (rail 324 wide) | x 33 – 93 | 161 | **68 px — 21 % of the rail** |

Mechanism: `<div class="flex-1" />` at `:14` — a default `justify` decision, not an earned relation.

And the scale is inverted. Measured computed styles on the same row:

```
"0 users"        "Fira Code" 16.4px    rgb(112,89,66)
"Prune empty"    Fraunces italic 14.384px
"Refresh"        Fraunces italic 14.384px
```

The **passive readout is 14 % larger than the commands it describes**. `PROPORTION-AUDIT.md:5` —
*"Every element earns its scale, interval, boundary and material from its job relative to the local
protagonist."* The protagonist of an action bar is the actions.

Note this compounds pass-2 D-16: the 105 px celebration displacement happens inside a rail that was
already 34 % empty and had nowhere to put a third flex item.

### D-31 · The empty arm is a 190 px block floating in a 515 px card, with 166 px of unowned space beneath it.

Ink profile of the Users card, `shots/safari-desktop-light/admin-users.png`, x 410–1410, y 455–1500
original px, reported in CSS px (DPR 2). Script and full output in Appendix A5.

| band | y (css) | gap above |
|---|---|---|
| "Users" H1 | 256 – 286 | — |
| description | 300 – 313 | 13 |
| search field | 349 – 378 | 36 |
| toolbar | 387 – 413 | 8 |
| ghost trio | 467 – 510 | **54** |
| `· ROSTER CLEAR ·` | 526 – 536 | 15 |
| "No users found." | 560 – 580 | 24 |
| card inner edge | 746 | **166** |

**166 css px — 32 % of the card's 515 px block — of nothing below the last ink.** The empty block is
neither centred (that needs 110/110) nor hugging (that needs the housing to collapse); it has simply
fallen to the top third. The 54 px toolbar→mark gap is 4.5× the panel's own declared rhythm
(`grid gap-3` = 12 px, `:2`) — `EmptyState`'s `py-8` leaking through an interval the panel never
reconciled.

`VISUAL-CONSTITUTION.md:186` — *"A true empty invitation **content-hugs** its text/action."*
`PROPORTION-AUDIT.md:48` PR-04 — empty/equal housing → **REMOVE**.

The same defect recurs at row scale: `:138`'s nested `EmptyState` renders the full page-level
ceremony — `py-8` + a 44 px ghost trio + eyebrow + display line, ~130 px — inside a row expansion
whose own padding is `py-3`, to say "No palettes." The `dots` prop that would shed it exists
(`EmptyState.vue` props block) and is not passed at either site.

---

## NEW — MINOR / INFO

### D-32 (MINOR) · The disabled control is colour-only and measures 2.88:1 in dark — below even the 3:1 non-text floor.

Pass-2 D-12 measured the *count line* at 3.91:1 and D-13 measured the *pending* state. Neither
measured the **disabled paint**. Measured computed style, disabled Prune vs enabled Refresh on the
same row (`probe-D4a`):

| | color | background | opacity |
|---|---|---|---|
| Prune empty (disabled) | `rgb(28, 25, 23)` | `oklab(0.9156 0.0055 0.0131 / 0.52)` | **0.5** |
| Refresh (enabled) | `rgb(28, 25, 23)` | `oklab(0.9156 0.0055 0.0131 / 0.52)` | 1 |

Identical colour, identical background — **the only disabled channel is `opacity`.** Composited
contrast sampled from the tracked captures (Appendix A5):

| capture | disabled glyph / local bg | ratio | enabled ratio |
|---|---|---|---|
| `safari-desktop-light` | `#866A70` on `#EDC6CD` | **3.12 : 1** | 12.03 : 1 |
| `safari-desktop-dark` | `#B09B9C` on `#6C4C4F` | **2.88 : 1** | 6.53 : 1 |
| `zoom-200-desktop` | `#866A70` on `#EDC7CD` | **3.17 : 1** | 12.68 : 1 |

`VISUAL-CONSTITUTION.md:83` — *"Selected, failed, pending, withdrawn and **disabled** states are never
colour-only."* Dark at 2.88:1 is below the 3:1 non-text floor. There is also no reason given — the
operator is not told *why* Prune is dead — and a `disabled` button leaves the tab order, so the
reason is unreachable by keyboard. Together with pass-2 D-13 this means **disabled and pending are
the same 50 %-opacity pill** under reduced motion.

### D-33 (INFO) · Corroboration of pass-2 D-3 from a second direction: the ring is not merely clipped, it is also suppressed in forced colors.

Pass-2 D-3 proved the focus ring contributes zero pixels because `overflow-hidden` (`:68`) clips a
2 px outward box-shadow. A second, independent mechanism kills the same indicator. Measured
(`probe-D4c`, Chromium, two arms, reconstructing `:82`'s exact class string):

```
ring-2 ring-ring compiles to → boxShadow: "… rgb(28,25,23) 0px 0px 0px 2px …"   outline: "none 3px"

forcedColors=none    boxShadow: "… rgb(28,25,23) 0px 0px 0px 2px …"   outline: "none 1px …"
forcedColors=active  boxShadow: "none"                                outline: "solid 2px rgba(5,0,73,0.8)"
```

`:82` pairs `focus-visible:outline-none` with a ring that Tailwind 4 implements as **box-shadow**, and
forced-colors mode forces `box-shadow: none`. So in forced colors the component's own focus treatment
does not exist; what remains is Chromium's UA `:focus-visible` outline, which the design never
specified. `VISUAL-CONSTITUTION.md:84` requires focus to be distinct in forced colors **by design**,
not by browser rescue.

**Engine caveat, stated per MT-F022 discipline.** Measured in **Chromium only** — Playwright's
`forcedColors` option is not honoured by WebKit. That is also why
`shots/forced-colors-desktop/adminusers.png` is indistinguishable from an ordinary light capture and
**must not be read as a forced-colors witness**: the forced-colors arm of this component is, in truth,
**uncovered by the tracked matrix**. Graded INFO for that reason; pass-2 D-3 already carries the
BLOCKER on two engines without needing this arm.

---

## Full state matrix (pass 2 + pass 3)

| State | Handled? | Owner finding |
|---|---|---|
| empty (true) | wrong mark, wrong proportion | D-19, **D-31** |
| empty (unauthorized) | **NO — costumes as a clean roster; Refresh inert** | D-9 |
| loading | row-shaped, but previews a different component's anatomy | D-14, **D-28** |
| loading (nested palettes) | present | `:135–137` |
| error (roster) | correct — plain register, `role="alert"`, Retry | verified clean |
| error (nested palettes) | **NO — unhandled rejection; costumes as empty** | **D-27** |
| error (prune) | **NO — reports "No empty users to prune"** | D-2 |
| error (5 other mutations) | **NO — `console.warn` only, `alertRoles: 0`** | D-2 |
| populated | no column grammar; badge spread 242.2 px | D-10 |
| disabled | opacity-only; 2.88:1 dark; no reason | **D-32** |
| pending | colour-only under reduced motion; no `aria-busy` | D-13 |
| focused | 1.02–1.20:1, ring clipped; also suppressed in forced colors | D-3, **D-33** |
| hovered | the only sighted disclosure cue | D-7 |
| active / pressed | **UNSTYLED** | D-7 |
| selected / expanded | 99.95 % pixel-identical; undeclared accordion | D-7 |
| dragging | n/a | — |
| overflowing / truncated | two-span split; viewport-dependent grammar | D-4 |
| RTL | fabricates identifiers; `bdi` count 0 | D-4, D-20 |
| reduced-motion | motion halts (`rafPer1500ms: 0`) and takes the pending signal with it | D-13 |
| forced-colors | identity ≡ operable byte-identical; own focus ring suppressed; **matrix arm uncovered** | D-11, **D-33** |
| zoom 200 % | reflows, `overflowX 0`; the removal-target pane selector appears | verified clean / route context |
| accessible name (row) | **whole row concatenated; count fuses to slug; two engines** | **D-29** |

---

## Verified-clean — pass 3 additions

Pass 2's clean list stands. Adding what pass 3 attacked and could not break:

1. **`min-w-0` is not missing from the forked row.** D-28's fork drops `AdminListItem`'s `min-w-0`,
   but `:68` carries `overflow-hidden`, which zeroes a grid item's automatic minimum size the same
   way. No truncation regression. Corroborated by `overflowX 0` on all four `REPORT.md` admin/users
   rows and all six `STATES.json` state rows.
2. **`verbatimModuleSyntax` (edict 8) — clean.** `:199` `import type { Palette, User }` is the only
   type-only import and is correct; `SAFE_ACCENT_KEY` / `ADMIN_PORT_KEY` are `InjectionKey` *values*.
3. **Animations (edict 6) — clean.** `vj-celebrate` is one of the three sanctioned families
   (`animations.css:56–80`); nothing deleted; global keyframes live in `demo/styles/animations.css`.
   Its `max-height` leg resolves `none → none` here (no `--vj-celebrate-collapse/-expanded` set), so
   no layout property animates — pass-2 D-16's 105 px displacement is layout participation, not the
   transition.
4. **The panel does not contribute to the tap-target defect count at mobile.** `smallTapTargets` is 4
   on admin/users in *all four* matrices, and the panel's own controls measure 108×54 and 80×54 at
   390 — the 4 belong to the dock/search chrome. (Pass-2 D-15's sub-44 census is about the *populated*
   row cluster, a different set.)
5. **No page or console errors.** `REPORT.md` §pageErrors 0; §consoleErrors lists only
   `safari-desktop-light /#/` (WebGL context lost). admin/users appears in neither.
6. **One `<main>`, no landmark defect.** `main = 1` on every admin/users row.
7. **The icon-only delete has an accessible name.** §namelessButtons (18 total) contains no admin
   route; `:126`'s `aria-label` works. (Its *host* row's name is the defect — D-29.)

---

## Where pass 3 leaves the component

Pass 2 named four mechanisms. Pass 3 adds a fifth, and it sits underneath two of theirs:

5. **The producer's API was never read.** D-23 is not one more styling nit — it is the reason
   mechanism 3 ("the row anatomy was hand-rolled instead of consumed") exists at all. The file
   reaches for `variant`, gets nothing, and back-fills with utility classes; that back-fill *is*
   D-24's dead `h-7`, pass-2 D-13's hand-rolled spinner, pass-2 D-15's undersized icon seat, and
   pass-2 D-6's `font-display text-caption`. Fixing `variant` → `emphasis`/`tone`/`iconOnly`/`loading`
   removes the motive for four other findings simultaneously.

And D-25 + D-26 sharpen mechanism 1: the panel does not merely compute claims at the wrong altitude,
it computes the **two halves of one sentence at two different altitudes** and then renders one of
them a second time, 125 px away, in the same type.

**Ordered cure — five moves, not thirty-three findings:**

1. Type the roster as a discriminated union and route every command — six mutations plus the one
   read — through one `Result` channel with a **server-supplied** scope. Closes D-1, D-2, D-9, D-25,
   **D-27**.
2. Delete every `variant` from the file; state intent on `emphasis` / `tone` / `iconOnly` / `loading`.
   Closes **D-23**, **D-24**, and removes the motive for D-6, D-13, D-15. Relay the 51-site systemic
   finding to the glass-ui BH inbox.
3. Compose the row from `AdminListItem`, with a native `<button>` over identity only and the action
   cluster as its sibling. Closes D-3, D-5, D-7, D-14, **D-28**, **D-29**, and makes D-10's column
   grammar expressible.
4. Render identifiers as one LTR-isolated value (`<bdi dir="ltr">` + `direction: rtl; text-overflow:
   ellipsis`). Closes D-4, D-20, and the fused-name half of **D-29**.
5. Neutralise the Admin plate and let it hug: `dots=false`, ink identity chip, one count, one
   denominator, and remove the 50 % companion the binding artifact already retired. Closes D-11,
   D-19, **D-26**, **D-30**, **D-31**.

**Strongest defect overall: pass-2 D-1** — an irreversible bulk deletion whose confirmation understated
its scope 3× in a single reproduced run, with the captured request proving the client cannot scope it
at all. That stands unchallenged.

**Strongest defect new to pass 3: D-23.** The component has never rendered its own declared design.
Five `variant` props are dead attributes; the comment at `:107–111` describes a cure that a reader
can verify in the source and cannot verify on screen, because the mechanism it names does nothing.
Every downstream hand-roll — the geometry, the spinner, the icon seat, the type family — is
back-fill for an API call that silently failed at every one of its five sites.

---

## Appendix A — probes and raw output

Scripts in `probe-D4/`. Read-only against the live dev server; no repo source, `INBOX.md`, or
`vnext/` path was modified. The only writes from this seat are this file, the `-pass2-prior` copy,
and `probe-D4/`.

**A1 · `probe-D4a-computed.mjs`** — computed styles, DOM attributes and rects of the toolbar controls
and the count, Chromium 1440×900 + 390×844. Output quoted at D-23, D-24, D-30, D-32.

**A2 · `probe-D4b-duplication-ring-trio.mjs`** — duplicate-datum census, `ring-2` resolution,
`empty-state-trio` species, live-region census, 390 rail geometry. Output quoted at D-26, D-30, D-33,
and corroborating D-19:

```
trio: [ {n:3, w:116, h:44, ariaHidden:"true", childColors:["… --watercolor-color: var(--accent-live) …" ×3]},
        {n:3, w:116, h:44, …} ]          ← two identical trios, one route
live: ["alert: dev misconfigured — run `npm run dev`",
       "status: · roster clear ·No users found.",
       "status: · empty plate ·No saved palettes yet.Add colors ab…"]
```

**A3 · `probe-D4c-forced-colors.mjs`** — two-arm Chromium `forcedColors: none | active` against `:82`'s
exact class string. Output quoted at D-33.

**A4 · `probe-D4d-a11y-name-two-engine.mjs`** — Chromium + WebKit `locator.ariaSnapshot()` over a
verbatim reconstruction of `:78–131`. Output quoted at D-29.

**A5 · Pillow measurements against the tracked PNGs** (no script retained; both loops are three lines
and are transcribed here so the numbers are re-derivable).

Composited contrast — darkest glyph pixel vs modal background inside each label's rect, WCAG 2.x
relative-luminance formula:

```
zoom200 'Prune empty' (disabled)  bg=(237,199,205) glyph=(134,106,112)  CR= 3.17
zoom200 'Refresh'     (enabled)   bg=(237,215,207) glyph=( 28, 25, 23)  CR=12.68
light   'Prune empty' (disabled)  bg=(237,198,205) glyph=(134,107,112)  CR= 3.12
light   'Refresh'     (enabled)   bg=(237,207,209) glyph=( 28, 25, 23)  CR=12.03
dark    'Prune empty' (disabled)  bg=(108, 76, 79) glyph=(176,155,156)  CR= 2.88
dark    'Refresh'     (enabled)   bg=( 97, 74, 73) glyph=(233,230,226)  CR= 6.53
```

Ink profile — per-row count of pixels deviating > 28 L from the row median, Users card,
`shots/safari-desktop-light/admin-users.png`, x 410–1410, y 455–1500 original px:

```
ink band css 256..286   (h=31)   "Users"
ink band css 300..313   (h=14)   description            gap_above=13
ink band css 349..378   (h=30)   search field           gap_above=36
ink band css 387..413   (h=26)   toolbar                gap_above=8
ink band css 467..510   (h=44)   ghost trio             gap_above=54
ink band css 526..536   (h=11)   · ROSTER CLEAR ·       gap_above=15
ink band css 560..580   (h=20)   No users found.        gap_above=24
ink band css 746..750            card inner edge        gap_above=166   ← the void
```

**A6 · Pass-2 evidence, unchanged and still authoritative:** `probe-D3*.mjs` / `.json`, `frames-D3/`,
`frames-D2/` — filtered-prune scope reproduction, DELETE-500 silent failure, two-engine focus diff,
RTL long slugs, PR-35 inset matrix, boundary census, forced-colors identity conflation.
