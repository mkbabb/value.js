# CHALLENGE-D — `demo/shell/dock/menus/MobileMenuDropdown.vue`

## Model receipt

I observe myself to be **Opus 5** (`claude-opus-5[1m]`, 1M context) — the model this seat was
explicitly spawned with. The seat is declared, not inherited.

---

## 0. Scope, method, and what is new here

Subject: `demo/shell/dock/menus/MobileMenuDropdown.vue` (115 lines), the `lg:hidden` overflow menu
in the dock band. It appears on **every one of the 15 routes** (it is inside `Dock.vue`'s `main`
layer, `Dock.vue:207-215`), so its defects are 15-route defects.

The root visual audit (`audit/visual/REPORT.md`) captured **only the closed state**. Every capture
in that matrix has this component contributing exactly one 42.7×33.3 glyph. Nothing in the 60-shot
matrix has ever seen this menu **open**. That is where the defects are, and this pass opened it.

**Method.** Four WebKit (Safari 26.4) probe runs against the live dev server at
`http://localhost:9000`, 390×844 and 320×640 and 195×422 (the 200%-zoom arm), light + dark,
in three identity states forced through `localStorage` (`palette-user-slug`,
`palette-admin-token` — the exact keys at `demo/platform/auth/useUserAuth.ts:23` and
`useAdminAuth.ts:15`), plus RTL, reduced-motion and forced-colors arms. Scripts and raw JSON are
committed beside this file under `frames/`. Frames referenced below are in `frames/`.

Every number in this report is a measurement I took, not an inference from class names.

---

## 1. Verdict

**DEFECTIVE.** Two BLOCKERs, seven MAJORs, six MINORs, two INFO.

The through-line: **this component was designed as a list of rows and never as a surface.** It has
no width law, no boundary law, no state law, and no feedback law. Its content is allowed to set its
geometry (D-01), its markup is allowed to invent its own hit-testing (D-02), and its actions are
allowed to differ from one another for no reason (D-03). It is not a mobile *translation* of the
desktop identity chrome; it is the desktop chrome poured into one popover with the grouping,
naming, and identity treatment silently deleted on the way.

**Strongest defect: D-01** — the menu's width is a pure function of the user's slug string, and at
the canon-bound 320px arm a realistic slug puts **270.8 CSS px of the menu outside the viewport
with no scroll path to reach it.**

---

## 2. Visual truth first

### 2.1 Closed — the trigger in the band

`frames/` (and the root matrix's `safari-mobile-{light,dark}/picker.png`).

Measured at 390×844 (`frames/mmd-probe3.json → rhythm`):

| element | x | right | w | h |
|---|---:|---:|---:|---:|
| `.dock-plate` | 67.6 | 322.4 | 254.7 | 59.5 |
| `.dock-select-trigger` (Home) | 81.7 | 140.4 | 58.7 | 33.3 |
| `.dock-mobile-panes` (Picker/About) | 154.4 | 258.6 | 104.2 | 32.3 |
| `.dock-dropdown-trigger` (⋮) — **this component** | 265.6 | 308.3 | 42.7 | 33.3 |

Plate insets are symmetric (left 14.1, right 14.1) and the trigger is vertically centred to within
0.05px. Those are correct and I record them as such.

What is **not** correct is the interior rhythm: `Home → segmented` gap = **14.0px**;
`segmented → ⋮` gap = **7.0px**. A 2:1 asymmetry inside a 254.7px pill. The ⋮ is crowded against a
two-position toggle at half the interval used everywhere else in the same band — two adjacent
touch targets 7px apart on a phone. The band reads left-weighted because of it: the eye finds
`Home | ——— | [Picker About]⋮` rather than three evenly-set groups.

### 2.2 Open — light, logged in (`frames/D-390-light-loggedin-open.png`)

This frame is the indictment. Named in design terms:

1. **It is not a popover.** Measured `rect = {x: 0, y: 69.5, w: 349.5, h: 440.5}` in a 390×844
   viewport. It is **89.6% of the viewport width**, hard against the left edge, while its trigger
   sits at x=265.6–308.3 — the far right. `align="end"` (line 43) has been collision-flipped into
   nothing. The surface has no visual relationship to the control that summoned it. Compare the
   logged-out frame (`frames/D-390-light-loggedout-open.png`): `{x: 92.5, w: 214.6}` — a tidy,
   properly end-aligned popover under the ⋮. **The same component renders as two entirely different
   objects depending on whether a slug exists.**

2. **The veil is failing at its one job.** Menu background measured
   `oklab(0.936408 0.005529 0.013284 / 0.808)` — 80.8% alpha. In the frame the Picker's
   `92.0%, 88.8,` display readout and the `Lab` identity are legible *through* the menu, colliding
   with "Regenerate slug" and the @mbabb block. VISUAL-CONSTITUTION §2: "Glass earns its blur by
   revealing live content; otherwise it is a neutral well." Here the reveal actively destroys the
   menu's own copy. A menu is not an atmosphere.

3. **Hierarchy is inverted.** The rows ("Copy slug", "Share color", "Dark mode") are the largest
   type in the popover; the *slug* — the identity the menu exists to present — is the smallest
   headline-weight thing in it. Measured on iOS Safari: rows **21px**, pill **14px**, description
   **11px**. The least consequential rows shout; the subject whispers. (Mechanism in D-05.)

4. **The GitHub row is visibly broken.** The mark sits on one line and the word "GitHub" on the
   next, flush left at x=15 while every other label starts at x=37. Nothing else in the list does
   this. (Mechanism in D-02.)

5. **No boundary between identity and action.** The @mbabb card runs straight into "Share color"
   with zero separation. The desktop twin puts a rule there.

### 2.3 Open — dark (`frames/D-390-dark-loggedin-open.png`)

Same geometry. The dark treatment adds its own failure: the slug pill — the component's live-colour
identity — computes `oklch(0.958322 0.021053 9.834023)`. The picked colour is
`oklch(0.470927 0.188343 …)`. **Chroma 0.021 against a picked 0.188 — 11%.** In dark mode the
"live-colour identity" the file's own comment (lines 21-24) exists to protect renders as an
off-white capsule. It is decoratively dead. (Mechanism in D-16.)

### 2.4 Open — 320px with a long slug (`frames/D-320-longslug-open.png`)

The pill runs off the right edge mid-word. The whole menu measures **590.8px wide in a 320px
viewport**. `document.scrollWidth === clientWidth === 320`, so the 270.8px that is off-screen
cannot be reached by scrolling, panning, or any gesture. It is simply gone.

### 2.5 Open — admin, forced colors (`frames/D-390-forcedcolors-admin-open.png`)

The menu survives forced-colors (bg forced to `rgb(255,255,255)`; the pill keeps a legible
`rgb(112,89,66)` ink+border). Recorded as a **negative finding**. What the frame *does* expose is
D-08: the entire admin menu is `admin · @mbabb · Share color · GitHub · Dark mode`. There is no way
out.

---

## 3. Defects

### D-01 · BLOCKER — the menu has no width law, so the user's slug sets the viewport overflow

**Defect.** `DropdownMenuContent` carries `min-w-menu` (line 43) — a **minimum**. There is no
maximum, anywhere. Inside it, the slug pill is `class="slug-pill whitespace-nowrap"` (line 48) with
no `max-inline-size`, no `text-overflow`, no `overflow: hidden`. The pill's intrinsic width is
therefore an unbounded function of the slug string, and it is the widest child, so it sets the
popover width, which sets the overflow.

**Evidence** (`frames/mmd-probe.json`, `frames/mmd-probe2.json`):

| arm | slug len | menu `x` | menu `w` | viewport | px off-screen right |
|---|---:|---:|---:|---:|---:|
| 390 logged-out | — | 92.5 | 214.6 | 390 | 0 (correct) |
| 390, 35-char slug | 35 | **0** | **349.5** | 390 | 0 (but flush-left, 89.6% of screen) |
| **320, 35-char slug** | 35 | 0 | 349.5 | 320 | **29.5** |
| **390, 62-char slug** | 62 | 0 | **590.8** | 390 | **200.8** |
| **320, 62-char slug** | 62 | 0 | 590.8 | 320 | **270.8** |
| **195 (= 390 @ 200% zoom)** | 35 | 0 | 349.5 | 195 | **154.5** |

`docScrollW === docClientW` in every overflowing case — the document does not scroll, so the lost
region is unreachable. The producer's vertical clamp works (`max-height: 506.4px` at 390,
`384px` at 320, `overflow-y: auto`); there is no horizontal counterpart because the *content*, not
the container, is at fault.

**Reproduction.** `node frames/mmd-probe2.mjs` — sections `longSlug_390`, `longSlug_320`,
`zoom200`. Or: `localStorage.setItem("palette-user-slug","a-very-long-generated-slug-name-for-overflow-testing-1234567890")`,
reload `/#/` at 320×640, tap ⋮.

**Canon.** VISUAL-CONSTITUTION §3.2 and PROPORTION-AUDIT §2 bind **1440 / 390 / 320 / actual
400%-zoom** as the observation arms; three of the four fail. §4 requires live values to "reserve
their widest legal representation so value changes never reflow the settled chassis" — the pill
does the opposite: it reflows the chassis to the value. WCAG 1.4.10 (Reflow) is failed at the
200%-zoom arm.

**Note on prior work.** The root's `horizontalOverflow` count is 0 across all 60 captures —
correct, because the menu was never opened. This is not a contradiction of the root row; it is the
state the root matrix cannot see.

**Proposed cure (gestalt, not patch).** The slug is *provenance data of unbounded length in a fixed
chrome*, which is the exact job glass-ui's `./chip` primitive exists for. Retire `.slug-pill`
(foundation.css:585 — a recipe whose own comment concedes it institutionalises per-instance
overrides) in favour of the producer `Chip` with a producer-owned `max-inline-size` + middle-ellipsis
truncation and the full slug as the accessible name. The menu then has a width law by construction
and no consumer can break it. Do **not** add a local `max-w-[…]` — that repairs one of five sites
and leaves the mechanism alive.

---

### D-02 · BLOCKER — `as-child` is inert on `DropdownMenuItem`; 73.2% of the GitHub row is a dead zone that eats the tap and dismisses the menu

**Defect.** Line 92 writes `<DropdownMenuItem class="text-small gap-2 cursor-pointer" as-child>` and
line 93 supplies an `<a>`. The producer's contract has no such prop:

```
node_modules/@mkbabb/glass-ui/dist/components/dropdown-menu/DropdownMenuItem.vue.d.ts
export interface DropdownMenuItemProps {
    disabled?: boolean;
    textValue?: string;
    inset?: boolean;
    class?: HTMLAttributes["class"];
}
```

`asChild` is absent. The attribute is silently consumed by Vue (it does not even reach the DOM —
measured attribute list on the rendered item: `data-reka-collection-item`, `role=menuitem`,
`tabindex=-1`, `data-slot=dropdown-menu-item`, `class=…`; **no `as-child`**). The producer renders
its own `<div role="menuitem">` and the anchor becomes a `display:block` child of it.

**Evidence** (`frames/mmd-probe3.json → asChild`, logged-out, 390×844):

- `anchorIsItem: false`, `anchorParentIsItem: true`
- item rect `{x:99.5, y:223.3, w:200.6, h:55.4}`; anchor rect `{x:107.5, y:229.3, w:68.6, h:43.4}`
- **`deadFractionOfRow: 0.732`** — 73.2% of the row's area is not the link
- `elementFromPoint(itemRight-20, itemMidY)` → `DIV.dropdown-menu__item …`, i.e. the row, not the anchor
- `anchorDisplay: "block"` — so inside the anchor the 14×14 svg and the label stack:
  svg at `y=400.6`, text at `y=417`, **`sameLine: false`**. That is the visible two-line break, and
  it is why this row is **55.4px** tall against **44.0px** for all six siblings, and why its label
  starts at **x=15** against **x=37** for all six siblings.

**Reproduction — the behaviour, not just the geometry** (`frames/mmd-probe3.mjs`, section
`githubRowClick`): click at `(itemRight − 20, itemMidY)`, i.e. inside the row's visible bounds,
outside the anchor.

```
"githubRowClick": { "newPages": 0, "menuStillOpen": false,
                    "url": "http://localhost:9000/#/?space=lab&color=…" }
```

**The menu closed and nothing happened.** No navigation, no new tab, URL unchanged. A user who taps
the right three-quarters of a row that reads "GitHub" gets their menu dismissed. On a phone that is
the *likely* tap location, because the thumb rests on the right.

**Canon.** PROPORTION-AUDIT §5.5 ("a small icon/mark is either data, status, labeled action … or
removed") and §5 interaction grammar. A row that looks operable across its full width and is
operable across 26.8% of it is a false affordance.

**Proposed cure.** Stop trying to make a menu row into a link through a prop the producer does not
publish. Either (a) relay to glass-ui for a first-class `DropdownMenuItem` link arm (`href` prop, or
a genuine `asChild`) — the standing BH/BI fond — and consume it; or (b) make the row an ordinary
`DropdownMenuItem` whose `@select` opens the URL, so the producer's own full-row hit target and
row-height rhythm apply unmodified. Both twins share the identical markup
(`ProfileSection.vue:158-165`), so one producer-side cure closes both sites.

---

### D-03 · MAJOR — two copy verbs in the same list; one confirms, one is mute

**Defect.** `Share color` (lines 88-90) swaps its icon and label to `Check` / `"Copied!"`.
`Copy slug` (lines 52-54) does the identical class of thing and reports nothing. Both use
`@select.prevent`, so both deliberately hold the menu open — one to show a result, one to show the
user the same unchanged row they just tapped.

**Evidence — measured, with the clipboard stubbed** (`frames/` probe 5 transcript):

```
tap "Copy slug"   → clipboard: ["api","amaranthine-quokka-northern-marches"]
                    menu open: true
                    menu text: "… Copy slug Switch account Logout Regenerate slug … Share color GitHub Dark mode"
                    aria-live regions with content: only the Picker's four, all aria-live="off"
tap "Share color" → clipboard: ["api","http://localhost:9000/#/?space=lab&color=…"]
                    menu open: true
                    menu text: "… Copy slug … Copied! GitHub Dark mode"   ← the row changed
```

The clipboard write succeeds; the *design* omits the acknowledgement. There is no `slugCopied` in
the prop type (lines 16-19) — the feedback channel was never built. The underlying handler is
`SlugEditLayer.vue:68-70`, `void writeClipboard(pm.userSlug.value)` — the promise is discarded, so
a rejection (insecure context, permission denial) is also silent.

**Canon.** PROPORTION-AUDIT PR-08 ("pending/failure/export/recovery truth only transient" →
ADD-AFFORDANCE) and VISUAL-CONSTITUTION §5 ("a transient flourish may celebrate success but never
carries the only truth").

**Proposed cure.** One copy-result affordance owned once, applied to both verbs — not a second
boolean prop. The `linkCopied` prop is already a bespoke per-verb flag threaded from
`Dock.vue:210`; adding `slugCopied` beside it doubles the contrivance. The right shape is a single
`useCopyFeedback()` seam in `demo/platform/` returning `{copy, lastCopied}` keyed by verb, consumed
by both rows and by the desktop twin, with one `aria-live="polite"` status inside the menu.

---

### D-04 · MAJOR — the admin identity is two different visual systems on two branches, and neither one works

**Defect.** One state (`pm.isAdminAuthenticated`), two renders.

| | mobile (this file, :65-69) | desktop (`ProfileSection.vue:95-99`) |
|---|---|---|
| where | `DropdownMenuLabel` inside the overflow menu (one tap deep) | a bare pill **on the dock band**, always visible |
| ink | `style="border-color: var(--muted-foreground); color: var(--muted-foreground)"` | `style="border-color: var(--color-gold); color: var(--color-gold)"` |
| class | `slug-pill cursor-default text-muted-foreground whitespace-nowrap` | `slug-pill cursor-default whitespace-nowrap gold-shimmer` |
| measured light | `rgb(112, 89, 66)` | `oklch(0.751 0.147 84.2)` |
| motion | none | `metal-shimmer-sweep 5s` infinite |

On a phone, elevated authority is indistinguishable from muted caption ink and is hidden behind a
tap. On desktop it is a gold shimmering badge on the chrome. The same person on two devices sees
two different products.

**And the desktop treatment is itself dead.** Measured at 1440×900 with an admin token
(`frames/mmd-probe6` transcript):

```
cls:             "slug-pill cursor-default whitespace-nowrap gold-shimmer"
color:           "oklch(0.751 0.147 84.199997)"        ← the INLINE style
backgroundImage: "linear-gradient(90deg, oklch(0.599 …), oklch(0.89 …), …)"
backgroundClip:  "text"
animationName:   "metal-shimmer-sweep"   animationDuration: "5s"
```

`.gold-shimmer` (producer, `dist/styles/utilities/base-misc.css`) works by setting
`color: transparent` and clipping a moving gradient to the glyphs. The inline `style` attribute at
`ProfileSection.vue:96` has higher cascade weight than the class, so `color` resolves to **opaque
gold** and paints straight over the clipped gradient. **The shimmer runs forever and is never
visible** — an infinite compositor animation with zero pixels of output.

**Reproduction.** `node frames/mmd-probe6.mjs` (1440×900, `localStorage['palette-admin-token']='t'`).
Mobile arm: `frames/mmd-probe.json → admin-light/admin-dark`, `pill.color = rgb(112,89,66)` /
`rgb(195,185,172)`.

**Canon.** VISUAL-CONSTITUTION §4.1 ("selected, failed, pending, withdrawn and disabled states are
never color-only") and §7 Admin ("elevated authority is communicated by labeling and scope, not by
a fourth visual system"). The gold *is* the fourth visual system; the mobile grey is the state
being color-only and then losing the colour. Both are wrong, in opposite directions.

**Proposed cure.** One admin identity composition, defined once, rendered identically on both
branches: neutral ink + an explicit **scope word**, not a metal. Delete `gold-shimmer` from the pill
(it is a dead animation) and delete the divergent `--muted-foreground` inline. If a distinguishing
mark is wanted it belongs in glass-ui as a `Chip` tone, not as an inline `style` on two SFCs.

---

### D-05 · MAJOR — the type-role matrix is broken three ways inside one popover

**(a) Prose rendered in the display face.** Line 85:
`<p class="text-micro italic text-muted-foreground leading-tight font-display">Color space picker &amp; converter</p>`.
Measured: **`Fraunces`, italic, 11px, `rgb(112,89,66)`**.
VISUAL-CONSTITUTION §4 assigns *prose/help* → `text-prose`, **Plus Jakarta Sans**, and reserves
Fraunces for `text-display` / `--type-title` / `--type-subheading` only. §4 also declares the matrix
"closed across all eighteen compositions" with exactly one exception (P019's Picker pair). `text-micro`
is not a role in the matrix at all. Two violations on one line, duplicated at
`ProfileSection.vue:150`.

**(b) `font-display` on the content is cascade-dead.** Line 43 writes
`class="min-w-menu font-display"`. Measured computed style of the `[role="menu"]` element:
**`Fira Code`, 16px**. `--font-display` resolves correctly (`"Fraunces", "Fraunces Fallback", serif`)
and the utility *does* work elsewhere in the same subtree (the `<p>` in (a) gets Fraunces), so this
is not a missing font — the declaration simply loses on the content element. Authored intent that
paints nothing. This is precisely the failure class the codebase already diagnosed once and wrote a
ten-line comment about (`ProfileSection.vue:103-110`, "the `border-primary/30` accent voice was
cascade-DEAD"); the lesson did not generalise. Same dead class at `ProfileSection.vue:70` and `:143`.

**(c) iOS text-autosizing scrambles the rungs, non-uniformly.** Same URL, same 390px viewport, one
variable — WebKit's mobile text-autosize path:

| element | `isMobile: true` | `isMobile: false` |
|---|---:|---:|
| `[role="menuitem"]` row copy | **21px** / lh 29.4 | 14px / lh 19.6 |
| `.slug-pill` | 14px | 14px |
| description `<p>` | 11px | 11px |
| `@mbabb` wordmark | 14px | 14px |

`--type-small` is `clamp(0.875rem, 0.8rem + 0.25vw, 1.25rem)` → 14px at 390px in both cases, so the
21px is a 1.5× boost applied to **the rows only**. The result is the inverted hierarchy visible in
`frames/D-390-light-loggedin-open.png`: the control copy is 1.5× the identity it labels and 1.9× the
description. The rungs are not merely wrong, they are *reordered*, and only on the platform this
component exists to serve.

**Reproduction.** `node frames/mmd-probe2.mjs` → `type_isMobile_true` vs `type_isMobile_false`.

**Proposed cure.** (a)+(b): delete `font-display` from the content and give the description the
`text-prose` role — the matrix already has the right answer. (c): pin `text-size-adjust: 100%` at
the app root so the fluid `clamp()` ladder is the only size authority; the ladder was designed for
this and the boost is fighting it. This is a `demo/styles/` root cure, not a per-component one.

---

### D-06 · MAJOR — the description text fails contrast on the real composited surface, and varies along its own line

**Defect.** The menu is 80.8% alpha over a live, chromatic, non-uniform ground (the Picker readout
and the gradient body). The lowest-contrast text in the popover sits directly over the busiest part
of it.

**Evidence** — real pixels, sampled from a rendered clip at DPR 1 (`frames/mmd-probe4.json`,
band `y 40–56`, `x 95–330` of a clip at `y=290`):

```
darkest ink in the description line : rgb(112, 89, 66)
ground sampled under/next to it     : rgb(233, 193, 194)   ← the Picker's pink bleeding through
contrast(ink, that ground)          : 4.03 : 1
lightest ground in the same band    : rgb(241, 226, 220)
contrast(ink, lightest ground)      : 5.21 : 1
```

The text is 11px non-bold. WCAG 1.4.3 requires **4.5:1**. It measures **4.03:1** over part of its own
line box and 5.21:1 over another part — *the same string is compliant and non-compliant at different
x offsets*, because the backdrop is live content.

**Canon.** VISUAL-CONSTITUTION §4.1, first bullet, verbatim: "Text, focus, boundaries and state meet
their rendered contrast **on the actual material tier**; a token name is not evidence." The token
here (`text-muted-foreground`) is floor-raised at `foundation.css:739` — and the raise is against
`--background`, not against a translucent veil over a chromatic ground.

**Proposed cure.** A menu is not a window. In the §2 material table a dropdown is *structural glass*
whose job is chrome, not revelation — so the correct move is a **specimen-well/opaque tier for the
menu surface**, matching what the forced-colors arm already proves is legible. That is a
`DropdownMenuContent` surface decision (a producer `surface="opaque"`/`tier` selection), applied at
the root for every menu in the app, not a per-instance `bg-` override here.

---

### D-07 · MAJOR — no pending, no disabled, no error state exists anywhere in this component

**Defect.** Four of the seven rows invoke asynchronous, networked, destructive or irreversible work:

- `pm.userLogout()` (line 58) — network session delete
- `pm.onRegenerateSlug()` (line 61) — network slug regeneration; **irreversible**
- `emit('copySlug')` (line 52) → `SlugEditLayer.vue:68-70` → clipboard promise, `void`-discarded
- `emit('shareLink')` (line 88) → clipboard promise

Measured: `grep -c "disabled\|aria-busy\|pending\|loading" demo/shell/dock/menus/MobileMenuDropdown.vue`
→ **0**. No row can be disabled while in flight. No row shows a result. No row shows a failure.
Double-tapping Logout fires two deletes.

**Worse — the result is destroyed by the gesture that requests it.** `Regenerate slug` (line 61)
carries **no** `@select.prevent`, so selecting it closes the menu. The regenerated slug's only
display surface in the entire mobile UI is the pill at line 47-50 **inside this menu**. The user
taps "Regenerate slug", the menu vanishes, and the new identity is never shown. Contrast the three
rows that *do* carry `@select.prevent` (52, 88, 101) — the inconsistency is not a design decision,
it is an omission: `@select.prevent` was added exactly where someone noticed a result needed to
stay visible, and not where the result is invisible.

**Canon.** PROPORTION-AUDIT PR-08 (ADD-AFFORDANCE: "persistent entity status/recovery");
VISUAL-CONSTITUTION §4.1 ("selected, failed, pending, withdrawn and disabled states are never
color-only. Role, accessible name, state/value and associated error/status are explicit").

**Reproduction (hypothesis — the failure arm was not exercised).** Throttle the API to offline and
tap Logout: nothing renders. I confirmed the *absence of the mechanism* by source census, not the
failure render; labelling accordingly.

**Proposed cure.** Identity mutations do not belong on a fire-and-forget menu row. They belong in
the one surface the canon already designates: VISUAL-CONSTITUTION §7 "Account and storage recovery"
— "Account is one modal side Dialog opened from the Dock … it owns identity, recovery-credential
rotation and logout when active". Move `Logout` / `Regenerate slug` / `Switch account` behind that
Dialog (W23's owned composition), leaving the menu with navigation-class rows only. That deletes the
state problem rather than styling it.

---

### D-08 · MAJOR — an authenticated admin on mobile has no way out

**Defect.** The admin branch (lines 65-69) renders a `DropdownMenuLabel` containing one pill and
**nothing else**. Measured menu contents in the admin arm (`frames/mmd-probe.json → admin-light`):

```
items: ["Share color", "GitHub", "Dark mode"]
```

No Logout. No Login. No Switch account. The three identity actions that exist in the `userSlug`
branch (52-63) and the one that exists in the logged-out branch (71-73) are all absent. The dock's
admin exit lives in `DockViewSelect`'s `__admin_toggle__` row, which toggles *admin mode*, not
*admin authentication*. This is the whole mobile surface for an authenticated administrator.

**Reproduction.** `localStorage.setItem("palette-admin-token","t")`, reload `/#/` at 390×844, tap ⋮
(`frames/D-390-forcedcolors-admin-open.png` shows the exact three rows).

**Note.** The desktop twin is equally actionless here (`ProfileSection.vue:95-99` is a bare `<span>`),
so this is a *shared* hole, not a mobile regression. It is filed here because this component is the
entire mobile expression of the state.

**Proposed cure.** Same as D-07: the Account Dialog is the canonical owner of "identity, recovery
and logout when active" (§7). One surface, all three principals (user / admin / anonymous), one
exit.

---

### D-09 · MAJOR — the trigger is the smallest target in a flow made of 44px targets

**Defect.** Measured trigger hit box **42.7 × 33.3** with a 24×24 glyph and producer padding
`4.68px 9.36px`. Every row it opens measures **44.0px** tall (six of seven; the seventh is D-02's
55.4). The one control a thumb must hit *first*, in a fixed band, adjacent to another control at a
7.0px gap (§2.1), is 24% shorter than the floor its own children honour.

**Canon.** PROPORTION-AUDIT §5.7: "Visual glyph size, operable target size and layout reservation
are separate quantities. Accessibility floors do not require bloated visible chrome" — and PR-12
(TIGHTEN, "invisible/seat geometry preserves target floor while optics follow rung"). The law is
explicitly that the *seat* may exceed the *glyph*. This component takes the glyph's height as the
seat's height and stops. WCAG 2.5.8 AA (24px) passes; the mobile 44px floor the component's own menu
rows implement does not.

**Proposed cure.** The seat is producer geometry (`.dock-trigger`), so this is a glass-ui relay, not
a local `min-h-11`: `DockTrigger` should expose the 44px touch seat with the 24px optical glyph
centred inside it — the same separation the dock's `DockControl` already needs. A per-instance class
here would fork the dock's one trigger rhythm.

---

### D-10 · MAJOR — PR-16 is half-unmet: the ellipsis has expanded state but no named purpose and no perceptible label

**Defect.** PROPORTION-AUDIT PR-16 names this control explicitly: *"Dock's dim home mark, floating
eye and unlabeled vertical ellipsis have no explicit purpose/state law … `…` keeps a **named menu
purpose** plus **expanded state** or is removed; … **labels remain perceptible in both schemes**."*

Measured (`frames/mmd-probe.json → trigger`, all six arms identical):

| requirement | measured | verdict |
|---|---|---|
| expanded state | `aria-expanded` `"false"` → `"true"`, `data-state` `closed`→`open`, `aria-haspopup="menu"` | **MET** |
| named menu purpose | `aria-label="Menu"` | **NOT MET** — "Menu" names the widget type, not the purpose. This menu contains account identity, slug lifecycle, share, and theme. |
| label perceptible in both schemes | no visible text in either scheme; glyph only | **NOT MET** |

Contrast the desktop branch, which for exactly these functions renders **three named text controls**:
`Profile` (`ProfileSection.vue:59-68`), `Login` (`:111-120`), `@mbabb` (`:135-141`) — each with a
visible label and a certified chrome-rung ink.

**This component is not MT-F005's site.** MT-F005's one nameless button is `ColorInput.vue`'s
`send-btn` (established by prior passes; ≡ L-7 ≡ ColorInput-adj D-3). The ⋮ *has* a name. Its defect
is that the name is a noun for the widget rather than for its contents, and that it is invisible.
Recording this so no close row conflates the two.

**Proposed cure.** Name the purpose (`aria-label="Account and settings"` or whatever the contents
actually resolve to after D-07's subtraction), and — the real fix — reduce what the menu contains
until a name is honest. Right now no single label can be truthful because the menu is four unrelated
concerns in one list.

---

### D-11 · MAJOR — the boundary inventory diverges from the desktop twin in three places, in both directions

**Defect.** The two menus are self-documented twins (line 22: *"the desktop twin's cure, verbatim
(ProfileSection.vue)"*), yet their separator sets disagree. Measured block layout, logged-in, 390px
(`frames/mmd-probe.json → logged-in-light.menu.nonItemBlocks`):

```
label(pill)  h39.4 @76.5
menuitem     h44   @115.9   Copy slug
menuitem     h44   @159.9   Switch account
menuitem     h44   @203.9   Logout
menuitem     h44   @247.9   Regenerate slug     ← desktop has a separator BEFORE this (ProfileSection.vue:86)
separator    h1    @295.9
div          h49.8 @300.9   @mbabb identity card  (ends 350.7)
menuitem     h44   @350.6   Share color         ← desktop has a separator HERE (ProfileSection.vue:153); gap measured 0px
menuitem     h55.4 @394.6   GitHub
separator    h1    @454
menuitem     h44   @459     Dark mode           ← a separator isolating a group of ONE
```

Three findings in one table:

1. **Missing (desktop has it):** the rule before `Regenerate slug`. On desktop the maintenance /
   irreversible action is grouped apart from Copy/Switch/Logout. On mobile it sits flush against
   `Logout` — the two most consequential rows in the menu are adjacent with no boundary, on the
   device where mis-taps are likeliest.
2. **Missing (desktop has it):** the rule after the @mbabb identity card. Measured **0px** boundary:
   the card ends at 350.7 and `Share color` begins at 350.6. The identity block and the action rows
   are one visual mass; see `frames/D-390-light-loggedin-open.png`.
3. **Present and unearned:** the trailing separator at y=454 separates `GitHub` from `Dark mode` —
   a group of one. PROPORTION-AUDIT §5.4: "A divider is retained only when grouping would be
   ambiguous without it." A rule that fences a single item is decoration, and PR-05's terminal verb
   for this family is **REMOVE**.

**Proposed cure.** Grouping is not a per-branch choice. Derive both menus from one declarative
section model (`sections: {identity, actions, meta}`) so the boundary set is a property of the
grouping, not of the file — which also deletes the 81%-identical fork (L-9/L-26) that made the
divergence possible.

---

### D-12 · MINOR — three icon rungs in one list, one of them geometrically wrong

**Defect.** Measured icon boxes in the seven-row menu (`frames/mmd-probe2.json → iconAlign`):

```
Copy slug        14 × 14   label x=37
Switch account   14 × 14   label x=37
Logout           14 × 14   label x=37
Regenerate slug  14 × 14   label x=37
Share color      14 × 14   label x=37
GitHub           14 × 14   label x=null (wrapped — D-02)
Dark mode        16 × 24   label x=39      ← wrong on both axes
```

Lines 108-109: `<Moon v-if="isDark" class="aspect-square w-4" …>` / `<Sun v-else …>`. `w-4` sets
width 16; the lucide SVG's intrinsic `height="24"` survives, and `aspect-square` does not win. The
glyph box renders **16 wide × 24 tall** — non-square despite the class asking for square — so the
theme row's icon column is 10px taller than every sibling's and its label is displaced **2px** to
the right of the other six. The trigger adds a third rung at 24×24.

**Canon.** PROPORTION-AUDIT §5.8: "Real rendered relation wins over token intent. Adjacent rungs,
measured rects and ink gaps appear in DELTA; token presence alone cannot close a row." `aspect-square`
is token intent; 16×24 is the rendered relation.

**Proposed cure.** One icon rung for menu rows, set once on the row composition (the producer's
`DropdownMenuItem` should own its icon slot size), not seven times at seven call sites with three
answers. Identical defect at `ProfileSection.vue:174-175`.

---

### D-13 · MINOR — three import paths to one package inside one ten-line block, one of them a pure alias barrel

**Defect.** Lines 6-12:

```
line  6:  import { useGlobalDark } from "@mkbabb/glass-ui/dark";
line 10:  } from "../../../ui/dropdown-menu";      ← demo-local barrel
line 11:  import { DockTrigger } from "@mkbabb/glass-ui/dock";
line 12:  import { Avatar, AvatarImage } from "../../../ui/avatar";
```

`demo/ui/dropdown-menu/index.ts` is **one line**, a verbatim re-export of `@mkbabb/glass-ui`
(measured: 19 such barrels under `demo/ui/`, every one a pure re-export). So the same package is
reached by a subpath export, a root re-export, and a directory alias, in one file, within six lines.

**Canon.** Owner edict 2 (no aliases, migration shims, dual paths) and edict 4 (glass-ui is the
design system — the barrel exists only to preserve a shadcn-shaped import path that no longer
corresponds to any local code).

**Note.** A prior ledger row (DEFECT-LEDGER:12278) attributes this menu's type/veil defects to
"the demo-local `demo/ui/dropdown-menu` primitive … rather than the producer's menu tier". That
mechanism is **refuted**: the barrel re-exports the producer's tier verbatim, so the primitive *is*
the producer's. D-05 and D-06 are consumer-class and surface-tier defects, not primitive-substitution
defects. The barrel is still an alias, which is what I file it as.

---

### D-14 · MINOR — per-instance override institutionalised, two different mechanisms 17 lines apart in one file

**Defect.** `foundation.css:585-587` defines `.slug-pill` and its own comment concedes the shape:
*"Consumers set `color` / `border-color` per-instance via `:style`."* This component uses **two
different** consumer mechanisms for the same recipe:

```
line 47-50:  :style="{ color: menuInk, borderColor: menuInk }"     (bound object)
line 67:     style="border-color: var(--muted-foreground); color: var(--muted-foreground)"  (static string)
```

Across the tree the same recipe is driven five ways (injected value, static CSS var inline, Tailwind
utilities, bare class) — already booked as a family row. What is new here is that **one component
uses two of them, 17 lines apart, for the same pill in two branches of one `v-if`.**

**Canon.** Owner edict 5 (style at the root, never per-instance overrides). glass-ui ships `./chip`
(`dist/components/chip/`), which is the root that should own tone.

**Proposed cure.** The same cure as D-01: the pill becomes a producer `Chip` with a `tone` prop.
That closes D-01 (width law), D-04 (one admin treatment) and D-14 (one mechanism) together — which
is the argument for doing it as a transposition rather than three patches.

---

### D-15 · MINOR — the identity card is not a menu item, and puts two tabbable anchors inside `role="menu"`

**Defect.** Lines 79-87 put a plain `<div class="flex items-center gap-2 px-2 py-1.5">` directly
inside `DropdownMenuContent`. Measured (`frames/mmd-probe4.json`):

```
identityBlock: { role: null, tabIndex: -1, h: 49.8, focusableChildren: 1 }
tabbables inside [role="menu"]: [ {A, tabIndex 0, "@mbabb"}, {A, tabIndex 0, "GitHub"} ]
```

An ARIA `menu` owns `menuitem` children under roving focus (`tabindex="-1"`, measured on all seven
rows). Two `tabindex="0"` anchors inside it break that contract: `Tab` from within the menu lands on
content the menu's own keyboard model does not know about, and conversely the `@mbabb` link is not a
`menuitem`, so a screen reader walking the menu never reaches it. The 51.7×17.2 anchor is also well
under any touch floor.

**Canon.** VISUAL-CONSTITUTION §4.1 ("role, accessible name, state/value … are explicit") and §5.1
(overlay focus contract).

**Proposed cure.** The @mbabb card is *attribution*, not a menu command. It belongs above the menu's
item list as a labelled, non-focusable header (`DropdownMenuLabel` with `aria-hidden` decorative
avatar and the link promoted to a real `menuitem`), or in the About route where §7 already assigns
provenance. Do not leave a focusable island in a roving-focus widget.

---

### D-16 · MINOR (mechanism CONFIRMED, consequence HYPOTHESIS) — the "certified ink" is certified twice, against two different rungs, from a prop whose name is false

**Defect.** Lines 16-24 declare a prop `cssColorOpaque` and comment: *"certified ink on the menu's
floating rung — the desktop twin's cure, verbatim."* The value it receives is **already certified**:

```
Dock.vue:35   const safeAccent = inject(SAFE_ACCENT_KEY)!;
Dock.vue:209  :css-color-opaque="safeAccent"
keys.ts:9     SAFE_ACCENT_KEY: InjectionKey<ComputedRef<string>>
useContrastSafeColor.ts:301-311
              safeAccentCss = certifyAccentInk(cssColorOpaque, surfaceLightnessNow("resting", …))
```

So line 24's `safeCss(cssColorOpaque)` computes
`certifyAccentInk( certifyAccentInk(pick, resting), floating )`. The D6 rationale quoted in both
twins — *"each ink certifies against the surface it actually composites over"* — is structurally
defeated, because the second certification's input is a colour already walked away from the pick for
a **different** surface. The pill can never be more chromatic than the resting-certified ink even
when the floating rung would have permitted the raw pick.

**Measured consequence at the boot seed: zero.** `pill.color` = `oklch(0.470927 0.188343 9.834023)`
and `--accent-live` = `oklch(47.0926…% 0.188342… 9.834…deg)` — identical. So the *harm* at this seed
is nil and I label it a **hypothesis**: a pick for which resting requires a walk and floating does
not would show a delta; I did not enumerate one.

**What is NOT a hypothesis** is the dark-mode reading. Measured, dark arm:

```
picked accent (light):  oklch(0.470927 0.188343 9.834023)   C = 0.188
pill + --accent-live (dark): oklch(0.958322 0.021053 9.834023)   C = 0.021   → 11% of the pick
```

The identity that these 115 lines and their two paragraphs of comment exist to preserve renders, in
dark mode, as an off-white capsule. Visible in `frames/D-390-dark-loggedin-open.png`.

**Proposed cure.** Rename the prop to what it is, or — better — stop passing a certified colour into
a certifier. The component should receive the **raw** `cssColorOpaque` (which `CSS_COLOR_KEY` already
provides at `Dock.vue:19`) and certify once against `floating`, which is what the comment claims and
what D6 actually requires. One certification, one rung, one honest name.

---

### D-17 · INFO — motion: the component authors none (correct); the producer's is symmetric (relay)

Recorded as findings *and* as negative proof.

- The SFC contains no `transition`, no `animation`, no keyframes, and no `--animation-slide-*` usage.
  For a component whose surface motion is producer-owned, that is the right answer. **No defect.**
- Reduced motion **is** honoured, end to end. Measured with `reducedMotion: "reduce"`:
  content transition collapses from
  `scale, translate, opacity, filter, display, overlay @ 0.35s` to `opacity @ 0.15s`;
  trigger from four properties to `opacity 0.15s`. **No defect.**
- Producer relay: entry and exit are both **0.35s**. VISUAL-CONSTITUTION §6: "Color/opacity effects
  use the corresponding short effect curve; **exit is shorter than entry**." Symmetric here. The
  transition list also includes `filter`, a paint-class property, on a backdrop-blurred surface.
  Both are glass-ui-owned (`.dropdown-menu__content`) — this is a **BH/BI relay ask**, never a local
  override (a consumer counter-transition would violate §6's "no consumer counter-filter fights a
  producer reveal").

---

### D-18 · INFO — both twins mount at every viewport (corroboration, not a new row)

Measured in the 390px DOM (`frames/mmd-probe2.json → twinCensus`): **3** dropdown triggers, of which
two are `Profile`/`@mbabb` inside `display:none` wrappers at 0×0. The desktop identity chrome is
fully constructed and hidden on every phone load; the mobile menu is fully constructed and hidden on
every desktop load. This is L-9/L-26's 81%-identical fork observed from the runtime side. Filed as
corroboration under the existing identity; **not re-booked.**

---

## 4. State coverage table

Every state this component can be in, and whether it was designed.

| state | handled? | evidence |
|---|---|---|
| logged-out | yes | 1 item + meta; menu 214.6px, correctly end-aligned |
| logged-in | **broken** | menu 349.5px flush-left at 390; 590.8px at 62-char slug (D-01) |
| admin | **broken** | 3 items, no exit (D-08); grey where desktop is gold (D-04) |
| empty | n/a | no collection |
| **loading / in-flight** | **NO** | 0 occurrences of `disabled\|aria-busy\|pending\|loading` (D-07) |
| **error / offline** | **NO** | no error surface; clipboard promise `void`-discarded (D-07) |
| **disabled** | **NO** | producer supports `disabled`; never used |
| focused (row) | yes | measured ring `2px` accent @0.3 + fill; `data-highlighted` on ArrowDown |
| hovered | yes | producer `interactive-item` |
| pressed / active | yes | producer `tap-squish` / liquid press on the trigger |
| expanded | yes | `aria-expanded` false→true, `data-state` closed→open |
| selected | n/a | no selection semantics |
| dragging | n/a | none |
| **overflowing** | **NO** | 200.8px off-screen @390, 270.8px @320 (D-01) |
| **truncated** | **NO** | `whitespace-nowrap`, no ellipsis, no max-width (D-01) |
| RTL | partial | mirrors correctly (trigger x 81.7, menu x 82.5) but the slug pill (:48) and `@mbabb` (:84) carry no `dir="ltr"` / `unicode-bidi: isolate` — family row already booked |
| reduced-motion | yes | 0.35s → 0.15s opacity, measured |
| forced-colors | yes | menu bg → `rgb(255,255,255)`, pill ink legible; **but** the desktop twin's `.gold-shimmer` (`color: transparent` + clipped gradient) is a known forced-colors hazard — not exercised here |
| **zoomed 200%** | **NO** | 154.5px off-screen at the 195×422 arm (D-01) |
| keyboard open/close | yes | ArrowDown highlights "Copy slug"; **Escape closes and restores focus to the trigger** (measured `activeEl = BUTTON.dock-dropdown-trigger[aria-label="Menu"]`) |

Eight states are unhandled. Six of those eight are states the *canon explicitly binds*
(320px, 400%-zoom, pending, failure, disabled, truncation).

---

## 5. What desktop renders that mobile does not

The brief's specific question. Enumerated from source and confirmed in the DOM.

| # | desktop (`ProfileSection.vue`) | mobile (this file) |
|---|---|---|
| 1 | a **named** identity trigger: `Profile` (`:59-68`) or `Login` (`:111-120`), text + icon + certified chrome-rung ink | one unnamed `⋮` glyph, `aria-label="Menu"`, no visible label (D-10) |
| 2 | the `@mbabb` **wordmark** as a first-class dock control (`:135-141`) | demoted into the menu body as a 51.7×17.2 anchor (D-15) |
| 3 | `DockSeparator` ×2 bracketing the identity group (`:49`, `:123`) | none — the trigger sits bare in the row |
| 4 | admin as **gold** `--color-gold` + `.gold-shimmer` on the band | muted grey `--muted-foreground`, one tap deep (D-04) |
| 5 | a rule before `Regenerate slug` (`:86`) | none — flush against `Logout` (D-11) |
| 6 | a rule after the @mbabb card (`:153`) | none — 0px boundary (D-11) |
| 7 | `triggerInk` — a **second** certified rung for the chrome surface (`:28,:30`) | one rung only (`floating`) — the trigger carries no accent at all |
| 8 | `data-o18="profile-trigger"` test hook (`:64`) | no hook |
| 9 | **two** menus, ≤5 rows each, one concern apiece | **one** menu: identity + slug lifecycle + share + provenance + theme, 7 rows + 2 blocks |

And the reverse — what mobile renders that desktop does not: **the `⋮` only.**

Row 9 is the design failure the other eight are symptoms of. Desktop separates identity from
provenance because they are different concerns. Mobile concatenates them because a phone has less
room — which is precisely backwards: the narrower surface needs *more* subtraction, not the union of
two menus.

---

## 6. Negative proof — what I checked and found sound

So the verdict is not an artefact of only looking for faults:

- **Idiomatic Vue 3.5.** Reactive props destructure (`:16`), `defineModel` (`:32`), `defineEmits`
  typed (`:26-30`). No stale-read hazard (no `defineModel` round-trip is read back synchronously).
  Correct.
- **`verbatimModuleSyntax`.** All six imports are value imports; no type-only import is mis-declared.
  Correct.
- **No god module.** 115 lines, one concern per section. Correct.
- **Animations never deleted.** Nothing was removed; the component authors none. Correct.
- **Keyboard.** ArrowDown highlights the first item (`data-highlighted`, `activeEl` = "Copy slug");
  Escape closes the menu and returns focus to the exact opener — measured
  `{tag: "BUTTON", cls: "dropdown-menu__trigger dock-trigger dock-dropdown-…", label: "Menu"}`.
  §5.1's "exact connected opener on close" is **met**.
- **Menu naming.** `aria-labelledby` points at the trigger; `aria-orientation="vertical"`. Correct.
- **Avatar decorative.** `decorative` (line 80) works: rendered `<img alt="" aria-hidden="true">`
  inside `span.glass-avatar__identity[aria-hidden]`. Correct.
- **Reduced motion.** Measured, honoured. Correct.
- **Row tap targets.** Six of seven rows are exactly 44.0px. Correct — which is what makes D-09
  (33.3px trigger) and D-02 (55.4px GitHub) legible as defects rather than as house style.
- **Trigger vertical centring** in the dock plate: −0.05px. Correct.
- **Plate insets** symmetric at 14.1 / 14.1. Correct.
- **`horizontalOverflow = 0`** in the root matrix is not contradicted — the document never scrolls;
  the menu overflows *off* it.

---

## 7. Disposition summary

| id | sev | one-line |
|---|---|---|
| D-01 | BLOCKER | no width law; slug string sets menu width → 270.8px unreachable at 320px, 154.5px at 200% zoom |
| D-02 | BLOCKER | `as-child` inert → 73.2% of the GitHub row is dead; tapping it closes the menu and does not navigate |
| D-03 | MAJOR | two copy verbs, one confirms and one is silent (measured) |
| D-04 | MAJOR | admin = grey on mobile, gold on desktop; and the desktop shimmer is occluded by its own inline colour |
| D-05 | MAJOR | prose in Fraunces, `font-display` cascade-dead, iOS autosize inverts the rungs 21/14/11 |
| D-06 | MAJOR | 4.03:1 measured on the real composited ground at 11px (needs 4.5) |
| D-07 | MAJOR | zero pending/disabled/error; `Regenerate slug` destroys its own result surface |
| D-08 | MAJOR | authenticated admin has no logout on mobile |
| D-09 | MAJOR | 33.3px trigger opening a menu of 44px rows; 7px from its neighbour |
| D-10 | MAJOR | PR-16 half-unmet: expanded state yes, named purpose no, perceptible label no |
| D-11 | MAJOR | two desktop separators missing, one unearned separator kept (group of one) |
| D-12 | MINOR | three icon rungs; the theme glyph renders 16×24 despite `aspect-square` |
| D-13 | MINOR | three import paths to one package in one block; `demo/ui/*` are 19 pure alias barrels |
| D-14 | MINOR | `.slug-pill` per-instance override, two mechanisms 17 lines apart in this file |
| D-15 | MINOR | identity card is a non-menuitem div with two `tabindex=0` anchors inside `role="menu"` |
| D-16 | MINOR | ink certified twice against two rungs from a falsely-named prop; dark identity at 11% of picked chroma |
| D-17 | INFO | motion sound locally; producer relay: symmetric 0.35s entry/exit + `filter` |
| D-18 | INFO | both twins mount at every viewport (L-9/L-26 corroboration, not re-booked) |

## 8. The one cure, if only one is taken

Not a patch list. **Collapse the two twins into one identity composition driven by a section model,
and move the identity *mutations* out of it into the canon's Account Dialog (§7).**

That single transposition closes D-03 (one feedback owner), D-04 (one admin treatment), D-07 (state
lives in a Dialog that can show it), D-08 (one exit for all principals), D-10 (a menu small enough to
name honestly), D-11 (boundaries derive from grouping, not from a fork) and D-18 (no fork to double-
mount). D-01 and D-14 then close together by adopting the producer `Chip`; D-02 and D-09 close by
producer relay. Patching the seventeen rows individually preserves the fork that generated them.
