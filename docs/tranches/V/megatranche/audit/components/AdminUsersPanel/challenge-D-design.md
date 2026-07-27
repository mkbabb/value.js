# CHALLENGE-D · `AdminUsersPanel.vue` — the design is wrong

## Model receipt

I observe myself to be **Opus 5 (1M context)**, exact model id `claude-opus-5[1m]`, spawned with an
explicit Opus 5 declaration. The seat is declared, not inherited.

- Subject: `demo/palettes/browser/admin/AdminUsersPanel.vue` (391 lines), area `palettes`, route `#/admin/users`.
- Repo `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`; subject file clean at HEAD.
- Run date **2026-07-27, pass 2**. Two earlier challenge-D passes are preserved beside this file as
  `challenge-D-design.2026-07-24-prior.md` and `challenge-D-design.2026-07-27-pass1.md`. **This pass
  re-derived every number from its own probes** (`probe-D3.mjs`, `probe-D3b.mjs`, `probe-D3c.mjs`,
  `probe-D3d.mjs`, `probe-D3e.mjs`, `probe-D3f.mjs` → `probe-D3*.json`, frames in `frames-D3/`).
  No repo source was touched; all API traffic is intercepted in-browser.
- **Verdict: DEFECTIVE.** 4 BLOCKER · 14 MAJOR · 4 MINOR/INFO.

**The binding authority for this surface is `docs/tranches/V/OPTICAL-BENCH-COMPOSITIONS.md` rows 57
and 82 plus its §5 type/inset matrices** — the artifact that decides Admin · Users' housing, boundary
inventory, type mapping and row rhythm. Pass 1 did not cite it. Four of the findings below are
violations that artifact names as defects *by name*.

---

## 0 · What the mega-tranche captures actually show, and what they cannot

`audit/visual/REPORT.md:128,143,158,173` records `/#/admin/users` at `text` **273 / 273 / 122 / 122**
across `safari-desktop-light | safari-desktop-dark | safari-mobile-light | safari-mobile-dark`, with
`overflowX 0`, `main 1`, `h1 0`, `pageErr 0`, `consoleErr 0`, `smallTapTargets 4`. Nine matrices —
those four plus `forced-colors-desktop`, `reduced-motion-desktop`, `rtl-desktop`, `rtl-mobile`,
`zoom-200-desktop` — and **every one is the zero-row state**: dock reads `Login`, panel reads
`· ROSTER CLEAR · / No users found.`
(`audit/visual/shots/safari-desktop-light/admin-users.png`, read.)

The largest component in the palettes area has therefore never been photographed doing its job. That
absence is itself the first design finding — and §0 of the pass-1 report made the same observation, so
I treat it as established rather than new. I closed the gap with my own probes against the live dev
server at `http://localhost:9000` (`frames-D3/`).

**One honest correction to my own instrumentation.** My first focus probe (`probe-D3.json`
`P5_focus_ring`) reported `changedPx: 0`; that was a settle artifact — the row carries
`transition-colors` (line 80) and I screenshotted before it settled. Every focus number quoted below
comes from `probe-D3b`/`probe-D3c`, which wait 400 ms. The conclusion did not change; the number did.

---

## BLOCKERS

### D-1 · The confirmation of an irreversible bulk deletion understates its scope. Measured: 1 promised, 3 executed.

`emptyCount` derives from the `users` prop (`AdminUsersPanel.vue:241`); `AdminPane.vue:28` binds that
prop to `pm.filteredAdminUsers` — the **search-filtered, sorted** list (`useAdminUsers.ts:29-34`). The
dialog interpolates that filtered number (`AdminUsersPanel.vue:290-291`). The action it guards calls
`pruneEmptyUsers(token)`, whose signature carries **no scope argument at all**
(`demo/palettes/api/admin-users.ts:69-71` → `POST /admin/users/prune-empty`, no body).

Reproduced in one run (`probe-D3f.mjs`, roster of 5 with 3 empty, search = `aaaa-33`):

```
filtered:        { headerBadge: "5", toolbar: ["5 users","· 1 empty"],
                   renderedRows: 1, renderedSlugs: ["empty-ghost-account-aaaa-33"] }
filtered_dialog: "Prune 1 empty users? | This will permanently delete 1 user with 0 palettes
                  and their sessions. This cannot be undone. | Cancel | Prune"
prune_request:   { url: "/admin/users/prune-empty", postData: null }
filtered_after:  { toolbar: ["2 users", "Pruned 3 users"], renderedSlugs: [] }
```

Frames `frames-D3/K-prune-filtered-dialog.png`, `frames-D3/L-prune-filtered-after.png`.

The dialog promised one deletion; the system performed three. Compounding it, the client only ever
holds 50 users (`listUsers(token, 50)`, `useAdminUsers.ts:59`), so even *unfiltered* the number in the
dialog is a page count presented as a corpus count.

Visible in the same frame: **"Prune 1 empty users?"** — line 290 carries no plural guard while line 291
does. The grammar bug is not the finding; it is the tell that this string was never read on screen.

Binding law: `OPTICAL-BENCH-COMPOSITIONS.md:57` — "W24. Companion rect `50%→0`; **actor, scope, status
and irreversible effect remain visible**." `PROPORTION-AUDIT.md:55` PR-11 — "Admin rows obscure
actor/scope/effect → ADD-AFFORDANCE … One review anatomy with authority/state/confirmation."

**Cure (transposition, not patch).** A bulk irreversible action must confirm against the *server's*
scope. The idiomatic shape is the two-phase review PR-11 already prescribes: the affordance resolves
the candidate set, the dialog *names* the candidates, and the confirmed call carries those identities.
Repointing `emptyCount` at the unfiltered array only swaps a wrong number for a differently wrong one,
because that array is a 50-row page.

---

### D-2 · Five of the six actions have no result channel. A 500 on a delete closes the dialog and changes nothing on screen.

`useAdminUsers.ts` swallows every mutation failure into `console.warn`: `onFeaturePalette` (96-98),
`onAdminDeletePalette` (107-109), `onAdminDeleteUserPalette` (122-124), `onDeleteUserPalettes`
(135-137), `onDeleteUser` (147-149), `onPruneEmpty` (195-198). Only prune has any UI result at all
(`AdminUsersPanel.vue:301-309`), and `onPruneDone(count: number)` cannot express failure — `return 0`
maps to the string **"No empty users to prune"**, so *the server refused* and *there was nothing to do*
arrive at the same sentence.

Reproduced with `DELETE /admin/users/:slug` fulfilled `500 application/problem+json`
(`probe-D3.json` `P8_silent_delete_failure`):

```
dialogText:     "Delete user? | This will permanently delete user zed and all associated data.
                 This cannot be undone. | Cancel | Delete user"
rowsBefore: 7   rowsAfter: 7      dialogStillOpen: false
alertRoles: 0   anyErrorText: false
toolbar:        ["6 users", "· 3 empty"]        # unchanged
console:        ["[warning] Failed to delete user: Internal Server Error"]
```

Frame `frames-D3/F-delete-500-desktop-light.png`. The operator pressed **Delete user**, the modal
dismissed itself, and the only record that the deletion did not happen is in the developer console.
`role="alert"` count is **0**.

This component already ratified the correct principle for the *load* path — its own comment at lines
49-50 reads "error ≠ empty — a dead backend never costumes as an empty roster", and
`EmptyState variant="error"` (51-62) implements it. The principle was applied once, to the cheapest
path, and never carried to the five paths where the stakes are irreversible.

`VISUAL-CONSTITUTION.md:101` — "Persistent operation state stays with the entity/workspace. A transient
flourish may celebrate success but **never carries the only truth**." `PROPORTION-AUDIT.md:52` PR-08 —
"Pending/**failure**/export/recovery truth only transient → ADD-AFFORDANCE."

**Cure.** The result channel must be one channel for all six actions, carrying three outcomes —
*applied N* / *nothing to do* / *failed, with the machine reason* — in the error register already
ratified at 51-62. `onPruneDone(count: number)` is the wrong signature for the whole family.

---

### D-3 · The keyboard focus indicator of the primary disclosure renders at 1.02–1.20:1. Its ring is entirely clipped. Two engines, both schemes.

The row declares `focus-visible:bg-accent/50 focus-visible:outline-none focus-visible:ring-2
focus-visible:ring-ring` (line 82). Its wrapper declares `overflow-hidden` (line 68). A Tailwind `ring`
is a `box-shadow` with **2 px outward spread**; the row's border box equals the wrapper's content box,
so the entire ring falls in the clipped region.

Measured by real `Tab` presses, 400 ms settle, pixel diff of the row's own clip
(`probe-D3b.json`, `probe-D3c.json`, `probe-D3d.json`):

| engine · scheme | `:focus-visible` | boxShadow present | changed-px bbox | max channel Δ (of 765) | **focus contrast** |
|---|---|---|---|---:|---:|
| WebKit · light | true | `rgb(28,25,23) 0 0 0 2px` | `11,12 → 470,67` | 27 | **1.034 : 1** |
| WebKit · dark | true | `rgb(233,230,226) 0 0 0 2px` | `11,12 → 470,67` | 62 | **1.166 : 1** |
| Chromium · light | true | `rgb(28,25,23) 0 0 0 2px` | `11,12 → 470,67` | 34 | **1.024 : 1** |
| Chromium · dark | true | `rgb(233,230,226) 0 0 0 2px` | `11,12 → 470,67` | 72 | **1.202 : 1** |

The clip rect started at `x=214, y=362`; the row's border box is `x=225 … 685, y=373.8 … 429.8`. The
changed-pixel bounding box `11,12 → 470,67` maps to exactly `225,374 → 684,429` — **the row's interior
and nothing else. The ring contributed zero pixels in all four combinations.**

Control, same page, same probe, same keystrokes — the sibling native `<button aria-label="Delete user
mbabb">`: max channel Δ **177** (Chromium light) / **290** (Chromium dark), against the row's 34 / 72.
The row's focus indicator is 5–8× weaker than the button's six pixels away.

Frames `frames-D3/focus-webkit-light-before.png` and `-after.png` are visually indistinguishable
(read). The mega-tranche `shots/keyboard-focus-desktop/adminusers.png` shows the same nothing.

`VISUAL-CONSTITUTION.md:84` — "**Focus remains visibly distinct from selection in both schemes**,
forced colors and reduced transparency." WCAG 2.4.11 requires ≥ 3:1 between focused and unfocused
states of the indicator area; 1.024:1 is 34× short. **Two-engine reproduction satisfied per the seat's
standing requirement; this is not the MT-F022 Full-Keyboard-Access delta — the row is focused and
`:focus-visible` matches in both engines.**

**Cure.** The indicator is invisible because the design made a `div` the button and then clipped it.
`VISUAL-CONSTITUTION.md:102` states the anatomy: "One native `<button type="button">` **spans its
specimen/identity region**." A native button over the identity region, sibling to the action cluster,
gets the producer's focus register for free and has nothing to clip.

---

### D-4 · RTL fabricates identifiers. `empty-ghost-account-aaaa-33` renders as `aaa-33empty-ghost-account-a`.

Tail-priority truncation (`AdminUsersPanel.vue:97-101`, `slugHead`/`slugTail` 246-252) splits one
identifier into two sibling spans with no bidi isolation. Under `dir=rtl` the bidi algorithm reorders
them. Measured (`probe-D3b.json` `rtl_long_slug`), **4 of 4 long slugs, `bdi` count `0` page-wide**:

```
dom ["an-extremely-long-anonymous-visitor-slug-from-the-wild-2", "f9a-33"]
    headLeft 1010.5  tailLeft 950.0   → rendered "f9a-33an-extremely-long-…-the-wild-2"
dom ["empty-ghost-account-a", "aaa-33"] → rendered "aaa-33empty-ghost-account-a"
dom ["empty-ghost-account-a", "aaa-77"] → rendered "aaa-77empty-ghost-account-a"
dom ["empty-three-b",         "bbb-11"] → rendered "bbb-11empty-three-b"
```

Frame `frames-D3/rtl-long-slug.png` (read): the four pills read
`aaa-33empty-ghost-account-a` · `aaa-77empty-ghost-account-a` · `bbb-11empty-three-b` ·
`f9a-33…g-from-the-wild-2`. Every one is a string that does not exist. The delete confirmation quotes
the *raw* `user.slug` (line 169, unsplit), so the row and its own confirmation dialog display two
different identities for the same account. The count line inherits it: the same frame reads
**"empty 3 · users 6"**.

Binding law, `VISUAL-CONSTITUTION.md:133`: "CSS direction keywords, physical axes, code, hex, **slug,
ID** | preserve the declared physical/domain meaning | identical domain meaning **inside an
LTR-isolated value** | … **no custom bidi reinterpretation**." And `:154`: "CSS strings, hex, **slugs,
IDs and provenance** | render in **LTR-isolated spans** inside RTL prose." The two-span split *is* the
custom bidi reinterpretation the constitution names and forbids, and the isolation it mandates is
absent (`bdi: 0`).

**Cure.** The mechanism is the wrong shape even in LTR. Head-elision with a protected tail is one CSS
declaration on one LTR-isolated text node (`<bdi dir="ltr">` + `direction: rtl; text-overflow:
ellipsis`), not two spans plus two string functions. Corroborating LTR artefact: at 390 the same pill
renders `empty-ghost-acco… aaa-33` with a visible inter-token gap
(`frames-D2/B-populated-mobile-light.png`, read) while at 1440 it renders `an-extremely-long…f9a-33`
with none — **one identifier, two rendered grammars, viewport-dependent.**

---

## MAJORS

### D-5 · The binding boundary inventory for Admin · Users is exceeded 24 : 5, including the terminal rule the artifact names as a defect by name.

`OPTICAL-BENCH-COMPOSITIONS.md:82` decides this composition's lines exactly:

> | Admin · Users | `n/a` | `n/a` | **one low-emphasis separator between adjacent review rows; none after the final row** | preserve row/actor/authority association in the dense review field |

and `:84` — "Any additional line, … **terminal row rule**, caster stroke or corner rule **is a defect**."

Measured (`probe-D3.json` `P2_boundary_census`, 6-row roster at 1440):

```
rowBoxes: 6
perRow:   { t: "1px", r: "1px", b: "1px", l: "1px",
            color: "oklab(0.216129 0.003491 0.005182 / 0.12)", radius: "6px" }
horizontalRulesRendered: 12      verticalRulesRendered: 12
adjacentSeparatorsPermitted: 5   leadingRuleRendered: true   terminalRuleRendered: true
```

Line 68 gives every row `rounded-md border border-card-edge` — a **full four-edge box**, not a
separator. Twenty-four painted edges where five are permitted; a leading rule above row 1; a terminal
rule below row 6. Frame `frames-D2/A-populated-desktop-light.png` shows six stacked boxes where the
composition decided one dense field with hairlines between.

Family note, not an excuse: `AdminListItem.vue:12` carries the same `rounded-md border border-card-edge`,
so the cure belongs at the primitive and closes all five Admin routes at once.

### D-6 · Every action control in the panel speaks in the display family — Fraunces italic — where the binding type matrix requires non-bold Plus Jakarta Sans.

`OPTICAL-BENCH-COMPOSITIONS.md` §5 *Binding type matrix*: "The type relation is **exact** across
`ALL18`: … **controls/labels → `text-small` + non-bold Plus Jakarta Sans**." `VISUAL-CONSTITUTION.md:75`
repeats it. Measured computed style (`probe-D3.json` `P1_typography_light`):

| control | source | family | size | style |
|---|---|---|---|---|
| `Prune empty` | line 24 `font-display text-caption` | **Fraunces** | 14.384 px | **italic** |
| `Refresh` | line 35 `font-display text-caption` | **Fraunces** | 14.384 px | **italic** |
| row `Palettes` | line 116 `font-display text-caption` | **Fraunces** | 14 px | normal |
| `Retry` (error plate) | line 58 `font-display` | Fraunces | — | — |

Four action controls in the display family. Visible in every frame: `Prune empty`, `Refresh` and
`Palettes` render as serif italic lozenges. `text-caption` is additionally not a member of the closed
role list (`VISUAL-CONSTITUTION.md:78`, "This matrix is **closed** across all eighteen compositions"),
which names `text-display / --type-title / --type-subheading / text-heading / text-prose / text-small /
text-mono-small | mono-caption`. `grep -rn "font-display" demo/palettes/browser/admin/*.vue | wc -l`
→ **12** — the whole Admin suite speaks its actions in Fraunces.

The consequence is not pedantic: Fraunces italic is the app's *argument* voice. Putting the two most
destructive controls on the route in it makes them read as editorial captions, which is exactly the
register a destructive action must not have.

### D-7 · The disclosure has no visual state. Closed vs open, the same row is 99.95 % pixel-identical.

Element-level screenshot of the *same* header row, closed then open (position-independent;
`probe-D3c.json` `header_row_open_vs_closed`):

```
sameSize: true   dims [460,57,460,57]
changedPx: 14  of  26220        (0.053 %)      maxChannelDelta: 56
header_row_open_semantics: { ariaExpanded: "true", childElementCount: 2,
  svgsInsideHeaderRow: 2, svgNames: ["…trash2… w-3 h-3 mr-1", "…trash2… w-3 h-3"],
  computedBg: "rgba(0,0,0,0)", computedBorderBottom: "0px" }
```

Both SVGs inside the header row are trash icons. **There is no chevron, no rotation, no persistent
open marker, no rule tying the expansion to the row that owns it, and the row's own background does not
change.** `aria-expanded` flips for assistive tech; sighted users get 14 pixels, which is antialiasing.

Aggravating, same probe (`accordion`): `firstRowSilentlyClosed: true`,
`simultaneousOpenRowsMax: 1`, `ariaControlsPresent: false`. `expandedUserSlug` is a single ref (line
236), so opening a second row silently closes the first — an accordion nobody declared, nothing signals,
and no `aria-controls` links the control to its region.

`PROPORTION-AUDIT.md:51` PR-07 — "**Hover-only**/unlabeled controls and invisible drag state →
ADD-AFFORDANCE / REMOVE … every surviving action/drag seat has a **name/state**." `:70` §5.5 — a mark
is "data, status, labeled action, drag affordance, focus/selection register or **removed**."

### D-8 · The row rhythm violates the binding inset matrix at both arms, and does not respond to the arm at all.

`OPTICAL-BENCH-COMPOSITIONS.md` §5 PR-35: "**Admin row block inset: `--spacing(4)` wide, `--spacing(3)`
narrow/zoom. Action gap: `ADMIN5` `--spacing(2)`** … the five Admin members share the one dense-row
rhythm." Measured (`probe-D3e.json`, `--spacing` resolves to `0.25rem` = 4 px):

| quantity | required @1440 | required @390 | **measured @1440** | **measured @390** |
|---|---|---|---|---|
| row block inset | 16 px | 12 px | **10 px** | **10 px** |
| action-cluster gap | 8 px | 8 px | **6 px** | **6 px** |

Source: `px-3 py-2.5` (line 80) and `gap-1.5` (line 106). Wrong value at the wide arm, wrong value at
the narrow arm, and **one constant where the matrix specifies two** — the row rhythm has no responsive
arm at all. PR-35's forbidden-behaviour column: "No margin collapse, Card-padding variable/formula or
**per-route substitute**."

### D-9 · The unauthenticated state was never designed. It costumes as a clean roster, and Refresh is a dead control.

With no admin token, `loadAdminUsers` returns at `useAdminUsers.ts:55-56` before any request. The panel
falls to line 63 and renders the TRUE-EMPTY plate. Measured (`probe-D3f.json` `signed_out`):

```
plate: "· ROSTER CLEAR · | No users found."
refreshDisabled: false   pruneDisabled: true
adminRequestsBeforeRefresh: 10    adminRequestsAfterRefresh: 10    newRequests: []
plateUnchanged: "· ROSTER CLEAR · | No users found."
```

**Clicking Refresh issued zero requests.** It is enabled, named, styled and inert. And the plate makes
a positive factual claim about a corpus the app has never queried, in Fraunces display. This is the
state in **all 60 mega-tranche captures** (`REPORT.md:128,143,158,173`), so the only picture anyone has
ever had of this component is a picture of an undesigned state.

`PROPORTION-AUDIT.md:70` §5.5 and `:71` §5.6 ("Subtraction precedes explanation"). **Cure:** signed-out
is a route-guard species, not a roster species. The route should not mount a roster it cannot populate,
and the panel should not own a third empty-shaped state.

### D-10 · The roster has no columns. The one scannable quantity sits at five different x-positions.

Measured left edges of the palette-count Badge across 6 rows at 1440 (`probe-D3.json` `P3_geometry_1440`):

```
badgeLefts: [313.5, 507.0, 535.5, 535.5, 293.3, 454.8]
distinctBadgeLefts: 5      badgeLeftSpread: 242.2 px
actionClusterLefts: [549.1, 645]      pillWidths: [68.5, 262, 290.5, 290.5, 48.3, 209.8]
```

Because the identity pill is `max-w-full` shrink-to-content (line 98), the badge that follows it
(102-104) lands wherever the slug ends. Frame `frames-D2/A-populated-desktop-light.png`: `12 · 3 · 0 ·
0 · 1 · 0` walking diagonally down the card. For a surface whose entire job is *who owns how many
palettes*, the quantity costs a fresh saccade per row. The action cluster opens at two different x
(549.1 vs 645) because `Palettes` appears and disappears with `v-if="user.paletteCount"` (line 112) —
a 96 px hole opening and closing down the list.

`PROPORTION-AUDIT.md:5` — "Every element earns its scale, interval, boundary and material from its job
relative to the local protagonist"; `:73` §5.8 — "**Real rendered relation wins over token intent.**"

### D-11 · Row identity is painted in a variable that carries no information about the row, in the same chrome as the Dock's authority badge.

Lines 99 and 168: `:style="{ color: safeAccent, borderColor: safeAccent }"`. Measured
(`probe-D3b.json` `identity_light` / `identity_dark`):

```
light: rosterPill color = oklch(0.470927 0.188343 9.834023)   ==  --accent-live
       dockPill  color = oklch(0.751    0.147    84.2)         (the fixed gold "admin" badge)
dark:  rosterPill color = oklch(0.958322 0.021053 9.834023)   ==  --accent-live
       dockPill  color = oklch(0.784    0.143    86)
both:  weight 700 · Fira Code 16.4px · 1px border · rounded-full · slugPillTotal 7 (6 roster + 1 dock)
```

Three defects in one mark:

1. **It re-paints with the picked colour.** Every user's identity chip changes hue when the operator
   moves the picker. Chroma 0.188 in light, 0.021 in dark — so the "identity" signal is loud in one
   scheme and gone in the other.
2. **It shares `.slug-pill` with the Dock's `admin` authority badge** — same class, same weight, same
   radius, same border. `VISUAL-CONSTITUTION.md:218` — "**Elevated authority is communicated by
   labeling and scope, not by a fourth visual system.**" Here user identity and elevated authority wear
   one visual system, differing only in hue, and one of the two hues is not constant.
3. **It wears operable chrome while being the only inert thing in the row.** `foundation.css:746`
   groups `.slug-pill` with `[role="tab"]` for the operable-chrome border bump. In forced colors the
   conflation completes — measured in Chromium with `forcedColors: "active"` (`probe-D3b.json`
   `forced_colors`):

   ```
   rosterPill  : { color: rgb(0,0,0), bg: rgba(255,255,255,0), border: rgb(0,0,0) }
   palettesBtn : { color: rgb(0,0,0), bg: rgba(255,255,255,0), border: rgb(0,0,0) }
   ```

   **Byte-identical computed style.** In forced colors the identity chip and the operable button are
   indistinguishable.

`VISUAL-CONSTITUTION.md:21` — "Seed tint is forbidden outside the ambient field, active accent,
WatercolorDot/specimen, and pastel Palettes lanes"; `:23` — "every other navigation, route, pane,
**Admin**, Account, action, and status label use **neutral ink**." `PROPORTION-AUDIT.md:74` §5.9 — "A
renderer specimen is not an unlabeled button." The one element that looks interactive is the only one
that is not, while the real disclosure (D-7) has no paint at all.

### D-12 · The toolbar count ships the exact contrast defect that the shared empty-plate atom was certified to cure.

`demo/shared/ui/EmptyState.vue`'s own style block records the cure:

> "the STATIC `text-muted-foreground` composited **3.84:1** over the My Palettes plate in light
> (< the 4.5:1 small-text floor). … the eyebrow/hint thread the certified de-emphasis rung
> `--ink-muted`."

`AdminUsersPanel.vue:8, 11, 17` still write `text-mono-small text-muted-foreground` — the retired class,
on the same plate family, in a file that *imports the cured EmptyState on line 202*. Measured from the
rendered crop (`probe-D3d.json` `count_line_contrast`, `frames-D3/count-line.png`):

```
declaredColor rgb(112,89,66) · 16.4px · weight 400
darkest ink pixel rgb(112,89,66)   plate luminance @P90 → contrast 3.91 : 1
```

**3.91:1 against a 4.5:1 floor** for 16.4 px regular text. The component consumes the cure and
reproduces the defect twelve lines above it.

### D-13 · Under reduced motion the only pending signal is a 50 %-opacity dimming — a colour-only state.

`animations.css:184-192` neutralises every animation app-wide under `prefers-reduced-motion: reduce`.
Measured with `reducedMotion: "reduce"` and a 4 s roster (`probe-D3.json` `P9_reduced_motion`):

```
spinnerPresent: true   spinnerAnimationDuration: "0.00001s"   spinnerIterationCount: "1"
refreshDisabled: true  refreshAriaBusy: null  refreshAriaDisabled: null  disabledOpacity: "0.5"
liveRegionCount: 0
```

The `animate-spin` on `Loader2` (line 28) and `RefreshCw` (line 39) is frozen — correctly, per the
guard — leaving the disabled dim as the sole indicator of in-flight work, with **no `aria-busy` and no
polite live region**. `VISUAL-CONSTITUTION.md:83` — "Selected, failed, pending, withdrawn and disabled
states are **never colour-only**. Role, accessible name, state/value and associated error/status are
explicit." `PROPORTION-AUDIT.md:52` PR-08 bears.

Related, same family: the loading region is `<div aria-label="Loading users">` with **no role** (line
46) — measured `loadingRegionRole: null` (`probe-D3.json` `P7_skeleton`). `aria-label` on a generic
element is not exposed; the label is dropped.

### D-14 · The loading grammar promises a row anatomy this panel never renders.

`AdminListSkeleton.vue:4` states it is "shaped as the **AdminListItem** row grammar (leading swatch +
primary/secondary lines + trailing action lozenge)". AdminUsersPanel renders three of them (line 47)
and then resolves to a different row. Measured (`probe-D3.json` `P7_skeleton` / `P7_resolved`):

```
skeleton: height 54 px · leading 32 px round swatch: true · 4 skeleton bars (two text lines)
resolved: height 56 px · leading swatch: false           · 1 line (pill + badge)
```

The shadow shows an avatar and two lines of metadata; the truth is a pill and a number. The loading
state is not a preview of this component — it is a preview of `AdminListItem`, which this component
does not use.

### D-15 · Two irreversible actions of different scope share one glyph six pixels apart; 11 of 14 controls at 390 are sub-44 px.

The row cluster (106-131) is `🗑 Palettes` then a bare `🗑`, `gap-1.5` = 6 px measured. Both are
`Trash2`. One deletes every palette the user owns; the other deletes the user and everything attached.
The sole differentiator in the resting paint is the word **"Palettes"** — which names the *object*, not
the *verb*: nothing on that button says *delete*. Measured at 390 (`probe-D3.json` `P6_targets_390`):

```
Palettes 82×36 · "Delete user …" 28×36 · row 322×56
under24: 0    under44: 11    total: 14
```

`PROPORTION-AUDIT.md:50` PR-06 — "Three adjacent action species or duplicated selected fills →
**REMOVE** … One action/selection owner." `:72` §5.7 — "Visual glyph size, operable target size and
layout reservation are separate quantities"; PR-12 wants an invisible seat preserving the target floor
while the glyph follows the rung. Here glyph *and* seat are both small: the 12 px glyph sits in a 28 px
seat. Frame `frames-D2/A-populated-desktop-light.png` shows six resting trash glyphs down a six-row
list plus three more inside the `Palettes` buttons — nine destructive glyphs on six rows.

The W5-12/F-8 comment at 107-111 claims this family was cured. It cured the *colour* (resting ink
measured `rgb(213,208,200)` dark, correctly quiet). It did not reduce the **count**.

### D-16 · The result beat displaces both live controls 105 px on the pointer axis, and the toolbar is already ragged before it fires.

`<Transition name="vj-celebrate">` wraps a text span (16-20) that is a **flex sibling** of the two
action buttons inside `flex items-center gap-2 flex-wrap` (line 4). Measured at 390 before and after one
successful prune (`probe-D3.json` `P6_toolbar_wrap_390` plus the pass-1 before/after pair, re-derived):

```
before: Prune empty (x 249.1, y 274.1)    Refresh (x 33, y 318.1)
after:  Prune empty (x 249.1, y 379.1)    Refresh (x 33, y 423.1)     # both +105.0 px
```

The destructive button the operator just released moves 105 px down as the *acknowledgement* of the
action. The same measurement exposes a defect present **before** any animation: at 390 `Prune empty` is
right-aligned on line 1 and `Refresh` is orphaned alone at the left margin of line 2 (x 33 vs 249.1) —
two sibling actions of the same species split across two lines and opposite ends of the card. Visible
in `frames-D2/B-populated-mobile-light.png` (read). Nothing designed that; it is what
`<div class="flex-1" />` (line 14) plus `flex-wrap` produces when the line runs out.

Motion law, stated precisely so it is not over-claimed: the transition **is** tokenized
(`animations.css:142-165`, `--duration-fast` / `--spring-bouncy`) and **is** neutralised under
`prefers-reduced-motion` (`animations.css:184-192`). The 105 px reflow is not a transition, so the guard
does not touch it — reduced-motion users get the displacement instantaneously instead of smoothly. The
defect is the *layout participation*. Separately, `.vj-celebrate-enter-active` transitions
**`max-height`** (`animations.css:146,153`) — a layout-forcing property; this component supplies neither
`--vj-celebrate-collapse` nor `--vj-celebrate-expanded`, so the declaration resolves `none → none` and
is inert here, but the family ships a layout-animating property to every consumer that does set them.

Register defect on the same line: the celebration is `text-mono-small text-muted-foreground italic`
(17); the count 40 px to its left is `text-mono-small text-muted-foreground` (8). A one-shot event and a
persistent state speak in the same voice, distinguished by synthesised italics on Fira Code.

### D-17 · The expanded region imports the Browse/Library entity slip — cartoon press register and in-card action menu — into the review field.

`OPTICAL-BENCH-COMPOSITIONS.md:57` decides this composition's housing: "Full-width query/status tray
followed by principal review rows; selected detail and dangerous confirmation open contextually … |
filters; rows; row disclosure; confirmation. | **Structural review field; rows are bounded review
entities, not nested glass Cards.**" §5: "Browse and Library use exactly one Card shell per rendered
palette entity … **the other sixteen compositions have Card count `0`**."

Lines 140-151 seat full `PaletteCard`s inside the row, with `is-admin` — which opens
`PaletteCardMenu.vue:153-168`'s in-card `Delete (admin)` menu. Measured: `cardMenuButtons: 1`
(`probe-D3e.json` `arm_1440_expanded`, `button[aria-haspopup]` inside the panel). `PaletteCard.vue:5-25`
is a `role="article"` div with `cursor-pointer`, `@click`, `cartoon-surface` press choreography and a
`cartoon-cast` cel shadow.

`VISUAL-CONSTITUTION.md:102` — "A palette card is a bounded entity article, **not a clickable
`role=article`** … **The card body owns no expand, inline rename, action menu, transient result or
hover-only swatch-action path.**" Frame `frames-D2/D-expanded-desktop-dark.png` (read) shows exactly
that: two cartoon-cast cards with `⋯` menus, nested pane Card → row box → `border-t` region →
PaletteCard — **four painted boundaries around one palette** (`PROPORTION-AUDIT.md:48` PR-04, "nested
housing → REMOVE").

### D-18 · The sort offers a key the row refuses to display.

`useAdminUsers.ts:36-46` sorts by `slug | newest (createdAt) | palettes`; `UserSortMenu` exposes all
three (`AdminPane.vue:17-21`). The row renders slug and count only (91-105). Choosing "newest" produces
an order the surface cannot justify — rows rearranged with no visible cause.
`OPTICAL-BENCH-COMPOSITIONS.md:57` — "**actor, scope, status** and irreversible effect remain visible."
`createdAt` and `status` are on the `User` model and are consumed by the sort; neither reaches the row.

---

## MINOR / INFO

### D-19 (MINOR) · The "no users" plate wears the palette-identity ghost trio, painted with the live picked colour.
Line 63 passes no `:dots="false"`, so `EmptyState` renders its three ghost `WatercolorDot`s on the
Admin route. Measured (`probe-D3d.json` `empty_state_species`): `trioPresentOnAdminRoute: true`,
`dotCount: 3`, `--watercolor-color: var(--accent-live)` = `oklch(47.09% 0.188 9.83)` in light,
`aria-hidden: true`, eyebrow `· roster clear ·`. `VISUAL-CONSTITUTION.md:17` reserves the
Watercolor/data tier for "swatches, active mark, pastel `Palettes` identity"; `:186` authorises the
`EmptyPaletteMark` for the *palette* field's true-empty invitation. Admin's own paragraph (`:218`)
authorises no ornament. Three chromatic ghost dots that depict nothing are decoration on a review
suite — and "roster clear" editorialises a corpus state as a good outcome.

### D-20 (MINOR) · Physical-direction margin in a bidi-bearing row.
Line 119 — `<Trash2 class="w-3 h-3 mr-1" />`. `mr-1` is physical; the surrounding layout is logical.
Under RTL the gap lands on the wrong side of the glyph (`frames-D3/rtl-long-slug.png`).

### D-21 (INFO) · The design system already ships five of the things this file hand-rolls; `demo/` consumes none of them.
`@mkbabb/glass-ui@7.0.0` exports `./collapsible`, `./expandable-container`, `./data-table`, `./toast`,
`./separator`, `./progress`, `./pulse`, `./status-dot`, `./sortable-list`, `./metric` (verified in
`node_modules/@mkbabb/glass-ui/package.json`). Measured consumption in `demo/`:

```
collapsible 0 · data-table 0 · toast 0 · expandable-container 0 · separator 0
progress 0 · pulse 0 · sortable-list 0 · status-dot 0 · metric 0   (demo consumers)
```

This one file hand-rolls the disclosure (D-7), the review table (D-10), the one-shot result beat
(D-16), the row separator (D-5) and the pending indicator (D-13) — five primitives the producer already
owns. Owner edict 4 ("Glass-ui is the design system … Reuse existing component-type names").

### D-22 (INFO) · Encapsulation inverted, plus two hygiene items.
`defineExpose({ removeUserPalette, updatePaletteTier, clearUserPalettes, onPruneDone, userPalettes })`
(line 389). `userPalettes` (237) is loaded, owned and mutated inside the leaf while the port drives it
through three imperative mutators plus a completion callback (`useAdminUsers.ts:95,117,132,146`). Five
exposed members is the largest imperative surface in the area; the expanded palettes belong to the port
that already owns every other list on this route. Owner edict 1. The six confirm refs plus a
callback-in-a-ref (255-261) reimplement an imperative modal driver inside a leaf.
Hygiene: `setTimeout(…, 3000)` at line 308 is never cleared (two prunes inside 3 s truncate the first
message; an unmount inside 3 s writes to a dead ref); line 186 imports `Transition` from `vue` —
`grep -rl "<Transition" demo | wc -l` → **19**, `grep -rlE 'Transition[ ,}].*from "vue"' demo | wc -l`
→ **1**. It is a compiler built-in. Owner edict 3.

---

## Verified-clean — recorded so the negatives are not re-litigated

- `import type { Palette, User }` is correct at line 199 (`verbatimModuleSyntax`, edict 8).
- Reactive props destructure with a default is correct at 205-220 (Vue 3.5, edict 7).
- The `target === currentTarget` guard at line 345 is load-bearing and correct.
- The shift-click confirm bypass really was excised (311-314); the resting destructive ink really was
  quieted (measured `rgb(213,208,200)` dark); the loading state really is row-shaped rather than a
  centred spinner (46-48).
- Motion is tokenized and reduced-motion-guarded (`animations.css:142-165, 184-192`).
- **No horizontal overflow at any arm.** 390: `scrollW 390 = clientW 390`. 200 %-zoom equivalent
  (720 CSS px stage): `horizontalOverflow: false`, `scrollW 720 = clientW 720`, both toolbar buttons on
  one line at `y 246.5`, first row renders `mbabb 12 Palettes` (`probe-D3.json` `P11_zoom200`).
- The header badge is correctly suppressed while loading (`AdminPane.vue:119-122`), and the toolbar
  count is correctly suppressed too (`toolbarTextWhileLoading: []`) — A-3 holds.
- `EmptyState variant="error"` on the load path is correct and carries `role="alert"`.
- **The WebKit/Chromium keyboard-reachability delta (7/12 vs 2/12) is macOS Full Keyboard Access per
  MT-F022 and is NOT counted as a defect.** Roving tabindex is the correct ARIA pattern. The one a11y
  finding here (D-3) is reproduced in **both** engines and **both** schemes.

## Route context, not this file's code

Every capture and every probe frame still renders the `My Palettes` companion at 50 % beside the Admin
route, against `OPTICAL-BENCH-COMPOSITIONS.md:50` ("V removes that companion, its right label, its
mobile pane toggle, and its 50 % acreage"), `:57` ("Companion rect `50%→0`") and `PROPORTION-AUDIT.md:48`
PR-04 ("Admin companion `50%→0`"). The row anatomy above is fighting for 640 px it should not have to.
Owner: the route, not this component.

---

## Where this leaves the component

These are not twenty-two independent bugs. They fall into four mechanisms:

1. **Truth is derived at the wrong altitude.** D-1, D-2, D-9, D-18 share one cause: the panel computes
   claims from whatever array it was handed instead of receiving them, and the port hands it a
   filtered 50-row page with no result channel. The confirmation lie and the silent-failure lie are the
   same defect in different copy.
2. **The binding composition was never read.** D-5, D-6, D-8, D-17 are four rows of
   `OPTICAL-BENCH-COMPOSITIONS.md` — boundary inventory, type matrix, PR-35 inset matrix, housing
   decision — violated on the surface the artifact names. Three of them the artifact calls a defect by
   name. This is the finding that most needs saying: the component is not merely unpolished, it is
   built against a decided composition it does not implement.
3. **The row anatomy was hand-rolled instead of consumed.** D-3, D-7, D-10, D-11, D-13, D-14, D-15,
   D-21 all follow from re-inventing a review row inside this file: a `div` as button with a clipped
   focus ring, no open state, no column grammar, an inverted paint hierarchy, a skeleton of a different
   component, duplicated destructive glyphs, and five producer primitives left on the shelf.
4. **Text is composed by concatenation instead of by typed, isolated values.** D-4 and the
   viewport-dependent ellipsis artefact both come from splitting one identifier into two spans and one
   sentence into two spans, with zero bidi isolation on the page.

The gestalt cure is to stop authoring a table here. Implement the decided Admin · Users composition:
one structural review field with hairline separators and no terminal rule, one native named button over
the identity region, counts and scopes received from the port, identifiers rendered as single
LTR-isolated values, one result channel for all six actions, and the producer's `collapsible` /
`data-table` / `toast` / `separator` where this file currently hand-rolls them. That subtracts roughly
the whole toolbar, the whole confirm-state block, the slug-splitting pair and the per-row box — the
direction `SUBTRACTION.md` and `PROPORTION-AUDIT.md` §6 both point.

**Strongest single defect: D-1.** An irreversible bulk deletion whose confirmation understated its
scope by 3× on the first attempt, reproduced independently in one run, with the captured request
(`POST /admin/users/prune-empty`, `postData: null`) proving the client cannot scope it at all.

**Second, and new to this pass: D-3.** The primary keyboard control on the surface has a focus
indicator measuring 1.024–1.202:1 across two engines and two schemes, with its ring entirely clipped by
`overflow-hidden` on line 68 — while a native button six pixels away, in the same probe, measures a max
channel delta of 290.

---

## Evidence index

| artefact | what it holds |
|---|---|
| `probe-D3.mjs` / `.json` | typography, boundary census, 1440 geometry, 390 targets, skeleton→row, DELETE-500, reduced motion, RTL, 200 %-zoom arm |
| `probe-D3b.mjs` / `.json` | two-engine focus diff (WebKit + Chromium × light + dark), identity paint both schemes, RTL long slugs, Chromium forced-colors |
| `probe-D3c.mjs` / `.json` | focus contrast ratios, element-level closed-vs-open row paint, undeclared accordion |
| `probe-D3d.mjs` / `.json` | Chromium focus contrast, composited count-line contrast, EmptyState species on the Admin route |
| `probe-D3e.mjs` / `.json` | PR-35 inset/gap matrix at 1440 and 390, in-card menu census |
| `probe-D3f.mjs` / `.json` | filtered-prune scope reproduction, signed-out roster + inert Refresh |
| `frames-D3/` | 30 frames incl. `focus-webkit-*-before/after`, `rowpaint-closed/open`, `rtl-long-slug`, `K-prune-filtered-dialog`, `M-signed-out`, `forced-colors-chromium` |
