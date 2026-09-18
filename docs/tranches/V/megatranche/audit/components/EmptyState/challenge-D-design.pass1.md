# CHALLENGE-D — `demo/shared/ui/EmptyState.vue` — the design is flawed

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`, the tier
declared at spawn. The seat is declared, not inherited.

Seat: CHALLENGE-D (design). Component: `demo/shared/ui/EmptyState.vue` (105 lines, area `core`).
Repo `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`.
Write scope honoured: this file plus `./probes/` only. No source edits.

---

## Verdict

**DEFECTIVE.** 22 findings: **2 BLOCKER, 12 MAJOR, 8 MINOR, 2 INFO.**

The gestalt: **`EmptyState` is one composition wearing two species' names, and neither species has
the anatomy its job requires.** The *invitation* has no action anywhere in the product; the
*failure* has no non-destructive form, so on 5 of 6 hosts a failed refresh deletes the data the
user was reading. Everything else — the flat rhythm, the inert `ch` measures, the dark-mode
hierarchy inversion, the unconditional Admin ornament — follows from that one missing distinction.

Strongest defect: **D-2** (error variant is defined only as a content *replacement*, so a
refresh failure destroys visible truth on Admin Users/Tags/Audit/Names/Flagged).

---

## Evidence index

| Kind | Path / command |
|---|---|
| Source | `demo/shared/ui/EmptyState.vue:1–105` |
| Call sites (16) | `MixSourceSelector.vue:239`, `BrowsePane.vue:57`, `PaletteCardGrid.vue:21`, `AdminUsersPanel.vue:51,63,138`, `AdminAuditPanel.vue:42,56`, `AdminNamesPanel.vue:30,42,80,92`, `AdminFlaggedPanel.vue:22,37`, `AdminTagsPanel.vue:68,82` |
| Canon | `docs/tranches/V/VISUAL-CONSTITUTION.md:17,23,62,68–78,82–92,140–145,186,218` · `PROPORTION-AUDIT.md:5,45,49,52,66–79` |
| Real-Safari matrix | `../../visual/shots/safari-desktop-light/admin-tags.png`, `safari-mobile-dark/admin-tags.png`, `safari-desktop-light/browse.png`, `forced-colors-desktop/adminusers.png` |
| Live probes (this seat) | `./probes/emptystate-light-admintags.png`, `emptystate-dark-admintags.png`, `forced-colors-admintags.png`, `state-320-admintags.png`, `state-zoom200-admintags.png`, `state-rtl-admintags.png`, `state-overflow-long-strings-1440.png`, `state-unbreakable-token-clip.png` |
| Producer | `node_modules/@mkbabb/glass-ui/dist/components/watercolor-dot/WatercolorDot.vue.d.ts:23–52` · `dist/glass-ui.css` (`.watercolor-swatch`) |
| Token source | `demo/styles/foundation.css:220–231` (`--accent-live` = *ink-contrast-guarded*) |

Probes were driven read-only against the live dev server (`http://localhost:9000`, HTTP 200) with
Chromium/Playwright at 1440×900 DPR 2, plus 320px, `zoom:2`, `colorScheme` light/dark,
`reducedMotion: reduce`, `forcedColors: active`, and `dir="rtl"`.

---

## A. Species anatomy — the two BLOCKERs

### D-1 · BLOCKER · The invitation species has no action. Anywhere.

`EmptyState.vue:9` promises "optional hint + CTA slot". Across all 16 call sites the `#action`
slot is filled **only** on the `error` variant (8×, always a `Retry`). On the `empty` variant it
has **zero live consumers**:

```
$ grep -rn "emptyAction|empty-action" --include=*.vue demo/
demo/palettes/browser/card/PaletteCardGrid.vue:28:  <template v-if="$slots.emptyAction" #action>
demo/palettes/browser/card/PaletteCardGrid.vue:29:      <slot name="emptyAction" />
```

`PaletteCardGrid` declares the forward; **no consumer ever passes it** (`BrowsePane.vue:84–86` and
`PalettesPane.vue:78–80` pass only `empty-eyebrow` / `empty-text` / `empty-hint`).

So all 11 empty plates are text-only dead ends, and the `hint` prop is carrying the job:

- `MixSourceSelector.vue:242` — "Save two or more palettes, then pour them together here."
- `BrowsePane.vue:86` — "Publish one from My Palettes and start the wall."
- `PalettesPane.vue:80` — "Add colors above, then save the set."

All three are **navigations rendered as monospace prose**. `PROPORTION-AUDIT.md:71` (law §5.6) is
exactly on point: *"Add affordance when the surviving action/state is otherwise undiscoverable; do
not compensate for an unnecessary action with tooltip proliferation. Subtraction precedes
explanation."* The plate explains instead of affording.

The inversion is visible in one frame. `../../visual/shots/safari-desktop-light/browse.png`: the
**error** plate carries the product's only `Retry`; the **empty** plate beside it — the path where
the user actually has something to do — carries a sentence.

**Reproduction:** `http://localhost:9000/#/palettes` (cold, empty library) → measured accessible
text of the plate is exactly `"· empty plate ·No saved palettes yet.Add colors above, then save
the set."`; the plate contains **0** elements matching `button, a, [tabindex]`.

**Cure (architectural).** Split the species and give the invitation a required primary action.
`EmptyInvitation` = mark + label + one statement + **one required named action** (the verb it is
inviting: *New palette*, *Publish a palette*, *Add a source*). The `hint` prop dies with it — the
sentence it carried was a button all along. `EmptyState`'s current `hint` copy converts 1:1 into
action labels.

---

### D-2 · BLOCKER · The failure species exists only as a content *replacement*, so a failed refresh destroys visible data

`EmptyState`'s `error` variant is a full-plate takeover. It has no "banner over retained content"
form. Because that is the only shape on offer, 5 of 6 hosts wire it as an unguarded
`v-else-if` **after** the loading branch and **before** the data branch:

```
demo/palettes/browser/admin/AdminUsersPanel.vue:55    v-else-if="loadError"                       ← no length guard
demo/palettes/browser/admin/AdminTagsPanel.vue:66     v-else-if="tagsApi.loadError.value"         ← no length guard
demo/palettes/browser/admin/AdminAuditPanel.vue:43    v-else-if="audit.loadError.value"           ← no length guard
demo/palettes/browser/admin/AdminNamesPanel.vue:31    v-else-if="pendingError"                    ← no length guard
demo/palettes/browser/admin/AdminNamesPanel.vue:81    v-else-if="approvedError"                   ← no length guard
demo/palettes/browser/admin/AdminFlaggedPanel.vue:23  v-else-if="flagged.loadError.value"         ← no length guard
demo/palettes/BrowsePane.vue:57  v-else-if="pm.browseError.value && displayedBrowse.length === 0"  ← guarded
```

One species, two contradictory policies. On the six unguarded branches, `Refresh` on a populated
Admin roster that fails leaves `users.length > 0` **and** `loadError` truthy → the roster the user
was reading is replaced by "The roster is unreachable." Retrying is the only way back to data that
was never lost.

This is the law the plate breaks, verbatim — `VISUAL-CONSTITUTION.md:101`: *"Persistent operation
state stays with the entity/workspace. A transient flourish may celebrate success but never carries
the only truth."* And `PROPORTION-AUDIT.md:52` PR-08: *"Pending/failure/export/recovery truth only
transient → **ADD-AFFORDANCE** … Persistent entity status/recovery."*

Second-order: the takeover also unmounts whatever row control held focus. On refresh failure focus
falls to `<body>`; `VISUAL-CONSTITUTION.md:113` forbids *"focus on removed content."*
**(the focus consequence is a HYPOTHESIS — it needs a forced backend failure with focus parked on a
row action to reproduce; the branch order above is measured fact.)**

**Reproduction (the data-destruction half, measured by construction):** any state where
`loadError` is truthy and `items.length > 0`. The template makes it unreachable to render both.

**Cure (architectural).** `error` is not a variant of *empty* — it is a *status on the field*.
Two distinct shapes: **cold-load failure** → plate replacement (correct, keep it); **refresh
failure** → a persistent, dismissible status strip *above the retained field*, owning the retry.
The tri-state then reduces to: `field | field+status | empty-invitation`, and the plate stops being
the container for a truth it cannot hold.

---

## B. Chroma and scheme — the ornament outranks the content

### D-3 · MAJOR · In dark mode the `aria-hidden` ornament is the highest-luminance ink on the plate

Measured OKLab lightness of every ink in one dark plate (`/#/admin/tags`, probe values +
computation):

| Ink | Token | OKLab L | Job |
|---|---|---:|---|
| ghost trio stroke | `--accent-live` (dark) | **95.83 %** | `aria-hidden="true"` decoration |
| headline "No tags yet." | `--foreground` → `rgb(233,230,226)` | 92.62 % | the statement |
| eyebrow / hint | `--ink-muted` (dark) | 89.00 % | the label, the help |

On a dark plate higher L is more contrast. The luminance hierarchy therefore runs
**decoration > statement > label** — exactly inverted. `+3.22 L pts` of the ornament over the
headline.

**Evidence:** `./probes/emptystate-dark-admintags.png` and
`../../visual/shots/safari-mobile-dark/admin-tags.png` — the white dashed blob is the loudest thing
in the panel, louder than the "Tags" identity line.

**Reproduction:** `colorScheme: "dark"` → `http://localhost:9000/#/admin/tags`;
`getComputedStyle(html).getPropertyValue("--accent-live")` = `oklch(95.832172477266% 0.021053120065 9.83402284231deg)`.

### D-4 · MAJOR · `plate-ink` de-emphasis is 6.4× weaker in dark than in light

`EmptyState.vue:102–104` binds the eyebrow, the hint, and the error detail — 3 of the plate's 4
text lines — to `--ink-muted`.

| Scheme | `--foreground` L | `--ink-muted` L | Δ |
|---|---:|---:|---:|
| light | 21.61 % | 44.71 % | **+23.10 L pts** |
| dark | 92.62 % | 89.00 % | **−3.62 L pts** |

Asymmetry **6.38×**. In dark the "de-emphasis rung" is 3.6 lightness points from the headline —
below any perceptual threshold for rank. The component's own comment (`:49–54`, `:95–101`) records
that D6's floor-clamp was adopted to cure a 3.84:1 small-text contrast failure in light. It did.
The clamp then pushed the dark rung *up* to L 89.0 % to satisfy the same 4.5:1 floor — and
**bought contrast by spending hierarchy.** A contrast floor is not a hierarchy law; the plate needs
both and has only one.

**Reproduction:** the two `--ink-muted` values above, read from `documentElement` under each
`colorScheme`.

### D-5 · MAJOR · The mark is fed an *ink-contrast-guarded* token into a *specimen* slot

`EmptyState.vue:45–47` passes `color="var(--accent-live)"`. But
`demo/styles/foundation.css:220–231` defines that token as **ink**: *"`--accent-live` is the
**contrast-guarded** LIVE picked color … guarded to the light-scheme lightness so first paint is
never ink."*

Measured, same hue, both schemes:

```
light  oklch(47.118925176164%  0.188447570516  9.83402284231deg)
dark   oklch(95.832172477266%  0.021053120065  9.83402284231deg)
                               ^^^^^^^^^^^^^^  chroma collapse 8.95×
```

The component's opening comment (`:6`) states the design premise: *"seeded WatercolorDot ghosts
reading the **LIVE accent**."* In dark that premise is **false**: chroma 0.021 is achromatic
white. `VISUAL-CONSTITUTION.md:17` assigns the Watercolor tier the job *"the only ornamental
**color-bearing** species"* — in dark it bears no color.

There is no unguarded chromatic source wired for it to read: `--ground-seed`, `--atom-1`,
`--atom-2` all resolve to `""` on the live tree, and `data-ground-state` is `null` (V-next boot is
unshipped). So the premise is not merely mis-wired — it is architecturally unbacked.

**Cure (gestalt, and it dissolves D-3, D-5, D-6 and D-17 together).** **Absence is neutral.** A
ghost that reads the user's live color is claiming to depict data that is not there. Retint the
absence mark to the neutral boundary/de-emphasis rung, and reserve `--accent-live` (and the ghost
species generally) for the *add-slot* — where the dashed outline legitimately previews the colour
the next swatch will take. That single move also stops the mark competing with the live add-slot
ghost 200 px away (see D-6 evidence frame).

---

## C. Scope — the mark ships where the canon forbids it

### D-6 · MAJOR · The three-dot Watercolor mark is unconditional on all 5 Admin routes; the `dots` escape hatch has zero consumers

```
$ grep -rn ":dots|dots=" --include=*.vue demo/
(no output)
```

`dots` defaults `true` (`EmptyState.vue:90`) and is **never passed** at any of the 16 call sites.
The prop's own doc (`:83–88`) says it must be shed *"ONLY where a card-scale instrument ghost seats
beside this caption"* — a clause with no enforcement, because the escape hatch is dead API.

The canon scopes the mark narrowly:

- `VISUAL-CONSTITUTION.md:186` — *"A true empty invitation … may carry one static, aria-hidden
  `EmptyPaletteMark`: exactly three WatercolorDots plus the established dashes"* — authorised for
  the **palette library / Browse** field.
- `VISUAL-CONSTITUTION.md:218` — the **Admin** paragraph authorises **no** such mark. *"Elevated
  authority is communicated by labeling and scope, not by a fourth visual system."*
- `VISUAL-CONSTITUTION.md:17` — Watercolor tier = *"swatches, active mark, pastel `Palettes`
  identity"*. An Admin tag ledger is none of those.

**Evidence frame:** `../../visual/shots/safari-desktop-light/admin-tags.png` — **two** identical
trios in one 1440×900 viewport (Tags panel + My Palettes companion), plus a **third** dashed ghost
in the "Start a new palette" slab. Three dashed-outline registers, one frame. Measured on the live
tree: 2 trios on `/#/admin/tags`, 2 on `/#/browse`, 1 on `/#/palettes`.

### D-7 · MAJOR · The canon's named primitive `EmptyPaletteMark` does not exist; the mark is inlined with per-instance overrides

```
$ grep -rn "EmptyPaletteMark" --include=*.vue --include=*.ts demo/
(no output)
```

The name is ratified in `VISUAL-CONSTITUTION.md:186`, in the W22 plan
(`archive/waves/W22.md:20` — "the static three-face `EmptyPaletteMark`") and in
`reformation/waves/W49-W52.md:45`. It was never built. Instead `EmptyState.vue:45–47` hand-rolls it
as three raw producer calls with Tailwind utilities written onto the glass-ui root:

```
<WatercolorDot … class="w-8 h-8 opacity-80" />
<WatercolorDot … class="w-11 h-11" />
<WatercolorDot … class="w-6 h-6 opacity-60" />
```

Three violations in three lines: **edict 5** (styling a producer root per instance rather than at
the root), **edict 4** (a mark species composed in `demo/` rather than owned by the design system),
and **edict 3** (the ratified primitive is the KISS answer; the inline recipe is the contrivance).
The consequence is structural: the mark cannot be reused without the plate, and the plate cannot be
had without the mark — which is precisely why `dots` is dead (D-6) and why the mark leaks onto
Admin.

### D-8 · MINOR · The mark's own composition is not optically centred

The trio is mechanically centred by flex (`items-end gap-2`, container 116 px, centre x = 455).
Weighting each dot by outline perimeter × opacity — the quantity that actually reads:

```
32px×0.80 @ x=413   44px×1.00 @ x=459   24px×0.60 @ x=501
ink centroid = 452.2 px      text axis = 455.0 px      → mark sits 2.8 px left of the copy axis
```

Small, but it is the difference between a *drawn mark* and three divs in a row — and it is
un-fixable while the mark is flex children rather than one primitive (see D-7, D-18).

---

## D. Proportion and rhythm

### D-9 · MAJOR · One flat `gap-2.5` serves four semantic ranks; the rendered ink rhythm is ragged

`EmptyState.vue:16,28` — `gap-2.5` (10 px) between *every* sibling. Measured line boxes and
half-leadings on `/#/palettes`:

| Pair | authored gap | half-leadings | **rendered ink gap** |
|---|---:|---|---:|
| mark → eyebrow | 10 px | 0 + 3.596 | **13.60 px** |
| eyebrow → headline | 10 px | 3.596 + 4.854 | **18.45 px** |
| headline → hint | 10 px | 4.854 + 3.280 | **18.13 px** |

(`font-size/line-height` measured: eyebrow 14.384/21.576, headline 25.888/35.596, hint 16.40/22.96.)

So the **decoration is bound 26 % more tightly to the label than the label is to the statement**,
and the two most semantically distinct joints — label→statement and statement→help — get
indistinguishable intervals. `PROPORTION-AUDIT.md:68` law §5.3 requires the opposite:
*"Header→headline uses title gap; headline→next semantic section uses section gap."* There is no
rendered title/section distinction here at all. `PROPORTION-AUDIT.md:73` §5.8 governs the reading:
*"Real rendered relation wins over token intent."*

### D-10 · MAJOR · Nothing about the plate is container-scaled; the type pair's ratio drifts 19.5 %

Measured at 1440 px vs 320 px, same component, same host:

| Quantity | 1440 px | 320 px | change |
|---|---:|---:|---:|
| `padding-block` | 32 px | 32 px | 0 % |
| `row-gap` | 10 px | 10 px | 0 % |
| trio width | 116 px | 116 px | 0 % |
| eyebrow font-size (`text-mono-caption`, fluid) | 14.384 px | 12.032 px | **−16.4 %** |
| headline font-size (`text-heading`, fixed) | 25.888 px | 25.888 px | 0 % |
| **headline : eyebrow ratio** | **1.800** | **2.152** | **+19.5 %** |

`VISUAL-CONSTITUTION.md:33` §3.7: *"Spacing is container-scaled from glass-ui tokens."* None of the
three spatial quantities responds. And the mixed scaling law is worse than either pure choice: one
arm of the type pair is fluid and the other is frozen, so the pair's ratio is a function of
viewport. The Picker pair is held to *"one paired proportional clamp; both sizes resolve from that
one clamp … through floor, fluid arm and ceiling rather than only at endpoints"*
(`PROPORTION-AUDIT.md:15`). The same principle condemns a 19.5 % drift here.

At 320 px the consequence is visible: the 116 px ornament occupies **45.7 %** of the 254 px plate
width (`./probes/state-320-admintags.png`).

### D-11 · MAJOR · The `ch` measures are font-relative across three families, so the authored ladder does not render — and the headline's measure is inert

| Line | authored | resolved `max-inline-size` | plate width | binds? |
|---|---|---:|---:|---|
| headline (Fraunces 25.888 px) | `max-w-[26ch]` | 469.474 px | 462 px | **NO — inert** |
| error detail (Fira 16.4 px) | `max-w-[44ch]` | 444.062 px | 462 px | yes |
| hint (Fira 16.4 px) | `max-w-[36ch]` | 363.323 px | 462 px | yes |

The display line — the one measure that matters most — never engages on `/#/palettes`,
`/#/browse` or any of the five Admin plates, because 26 ch of Fraunces at 25.888 px (469.474 px) is
**wider than the container it lives in** (462 px). Above a 469.5 px container it suddenly does
engage. One component, two typographic behaviours, crossover at an accidental number nobody chose.

This matters concretely against `VISUAL-CONSTITUTION.md:218` — *"Each Admin route uses the full
main width: the current Palettes companion … removed rather than restyled."* The moment that law
lands, every Admin plate crosses 469.5 px and the headline's measure silently switches on.

`PROPORTION-AUDIT.md:73` §5.8 again: *"token presence alone cannot close a row."*

### D-12 · MAJOR · Two same-species plates in one frame are 78 px out of vertical register

Measured, `/#/admin/tags` at 1440×900 — the Tags plate and the My Palettes plate:

| | Tags | My Palettes | Δ |
|---|---:|---:|---:|
| plate height | 185.17 px | 218.14 px | 32.97 px |
| mark top y | 466.19 px | 544.06 px | **77.87 px** |

At 200 % zoom the same pair measures 370.3 / 482.1 px tall with mark tops 156.7 px apart
(`./probes/state-zoom200-admintags.png`). The plate has no `min-height`, no shared baseline, and no
relation to its sibling — height is purely a function of how many optional props the host happened
to pass. Two instances of one ornament at two heights in one frame reads as accident.
`VISUAL-CONSTITUTION.md:34` §3.8: *"Supporting fixtures do not compete with it through equal size
or equal shadow"* — here they do not even agree with each other.

### D-13 · MINOR · The centred island introduces a second, unrelated horizontal axis

Plate copy axis x = 455; the panel's established reading axis (pane header "Tags", "0 tags", the
tag-name field) x = 224. A **231 px** offset, and there is no other centred text on the route.
`PROPORTION-AUDIT.md:5`: *"Every element earns its scale, interval, boundary and material from its
job relative to the local protagonist."* A centred stack inside a left-aligned reading column has
no relation to the protagonist.

---

## E. Type jurisdiction

### D-14 · MAJOR · Two violations of the closed type matrix

`VISUAL-CONSTITUTION.md:68–78` is a **closed** matrix with exactly one authorised exception
(P019's Picker identity/headline pair).

1. **`font-display text-heading`** (`EmptyState.vue:20,58`) → measured **25.888 px / 35.596 px /
   700 / Fraunces**. The matrix binds `text-heading` to *"section heading → Plus Jakarta Sans."*
   Applying Fraunces to that role is a second paired exception, unauthorised. (`PROPORTION-AUDIT.md:78`
   law §5.13 restates it: *"Fraunces owns display/identity, Plus Jakarta Sans owns headings/prose/controls
   … P019's paired Picker scale is the sole exception."*)
2. **`hint` in `text-mono-small`** (`EmptyState.vue:61`) → measured **16.4 px Fira Code**. The
   matrix binds *"prose/help → `text-prose` → Plus Jakarta Sans"* and reserves Fira for
   *"value, code, or provenance."* "Add colors above, then save the set." is help copy. Rendering
   an invitation in monospace is why it reads as terminal output rather than an invitation —
   see `../../visual/shots/safari-desktop-light/browse.png`. (The error `detail` in Fira is
   **correct** — that one *is* machine truth.)

### D-15 · MINOR · Two incompatible mark languages inside one component, and the failure mark is the smaller one

The `error` arm draws a `@lucide/vue` `CircleAlert` — a 24×24 px geometric 1.5 px-stroke line glyph
at `oklab(0.574 0.192 0.100 / 0.8)` (`EmptyState.vue:19`). The `empty` arm draws seeded organic
watercolour blobs under an SVG turbulence filter. Two mark grammars, one file, no shared tier in
`VISUAL-CONSTITUTION.md:11–17`.

The ranking is backwards: ornament footprint 116×44 = **5 104 px²** vs failure glyph 24×24 =
**576 px²** — the non-event's mark is **8.9×** the failure's. Visible side by side in
`../../visual/shots/safari-desktop-light/browse.png`.

### D-16 · MINOR · The `· … ·` frame is presentation encoded in 11 content strings

Every empty call site hand-writes the bullets: `"· empty plate ·"`, `"· no tags minted ·"`,
`"· roster clear ·"`, `"· ledger clear ·"`, `"· queue clear ·"`, `"· none approved yet ·"`,
`"· nothing flagged ·"`, `"· none pinned ·"`, `"· nothing to mix ·"`, `"· the commons ·"`.
A copy edit that drops one bullet silently breaks the register. `PalettesPane.vue:78` restates the
component's own default verbatim (`empty-eyebrow="· empty plate ·"` vs default
`eyebrow: "· empty plate ·"` at `EmptyState.vue:90`) — dead duplication. And AT reads them: the
measured accessible text is `"· no tags minted ·No tags yet."` (the eyebrow is not `aria-hidden`).
If the frame is part of the plate-label species, the species should draw it.

---

## F. State coverage

Every state the plate can occupy, and its disposition. **Unhandled = design defect.**

| State | Handled? | Evidence |
|---|---|---|
| empty (populated copy) | yes | measured |
| empty, **no message** | **NO** | `message?: string` has no default; `<slot>{{ message }}</slot>` yields an empty `<p>` that still occupies a 35.596 px line box |
| empty, **with action** | **NO — 0 consumers** | D-1 |
| loading | **NO — deliberately absent** | D-19 |
| error, cold load | yes | `BrowsePane.vue:57` |
| error, **refresh over data** | **NO — destroys data** | D-2 |
| error, **very long `detail`** | **NO clamp** | D-17 |
| overflowing / unbreakable token | **NO — silent clip** | D-17 |
| RTL | **mirrors the mark** | D-18 |
| forced-colors | **ornament keeps author colour** | D-20 |
| reduced-motion | n/a (no own motion) | negative proof N-4 |
| zoomed 200 % | renders; register worsens | D-12 |
| 320 px | renders; ornament 45.7 % of plate | D-10 |
| disabled / focused / hovered / pressed / selected / dragging | n/a — the plate is non-interactive, and its only focusable descendant is the slotted `Retry`, which is styled by an 8× repeated per-instance `class="font-display"` (edict 5) | `grep -c 'class="font-display"'` = 11 |
| enter / exit transition | **host-owned, inconsistent** | D-21 |

### D-17 · MINOR · Unbounded and unbreakable content: silent clipping, no clamp

- **Unbreakable token in `message`.** The headline carries `max-w-[26ch] text-balance` but **no**
  `break-words`, while the error `detail` at `:23` **does** (`break-words`) — an inconsistency
  inside one component. Injecting a 63-char unbroken token into the live headline:
  ```
  headline box 469.5 px   plate 462 px   → clipped 3.7 px left AND right
  host overflow-x: hidden ; hostScrollWidth 510 == hostClientWidth 510  → no scroll produced
  ```
  Glyphs are **silently clipped at both edges** — no ellipsis, no scroll, no wrap.
  (`./probes/state-unbreakable-token-clip.png`)
- **Long `hint` / `detail`.** A 100-char URL in the hint grew the plate **218.14 → 322.64 px
  (+48 %)** with no clamp (`./probes/state-overflow-long-strings-1440.png`). `detail` is a raw
  server string of arbitrary length, sitting inside an **assertive** `role="alert"` region (D-22) —
  a 2 000-char stack trace is both rendered whole and read out whole.

### D-18 · MINOR · The mark mirrors under RTL

Measured with `dir="rtl"`, dot x-positions: `32 px @ 1011`, `44 px @ 959`, `24 px @ 927` — the
32 px dot moves from leftmost to rightmost; the composition flips. `VISUAL-CONSTITUTION.md:150–154`
§6.1 assigns inline mirroring to *"chrome, navigation and layout"*. A deliberately asymmetric
drawn mark (32/44/24 with graded opacity) is neither. It mirrors only because it is built from flex
children instead of being one direction-invariant primitive — the same root cause as D-7 and D-8.
(`./probes/state-rtl-admintags.png`)

### D-19 · MINOR · The tri-state has no owner, so it is re-wired 16 times

`EmptyState.vue:2–3` deliberately excludes loading: *"TWO species, never conflated … loading ≠
empty."* Correct as a *conflation* rule, wrong as an *ownership* rule. The `loading | error | empty
| populated` machine is now spread across two shared components plus inline blocks:

```
demo/shared/ui/EmptyState.vue            error + empty
demo/palettes/browser/admin/AdminListSkeleton.vue      loading (admin rows)
demo/palettes/browser/card/PaletteCardSkeleton.vue     loading (palette cards)
+ inline Skeleton blocks in BrowsePane, AdminUsersPanel, AdminTagsPanel,
  AdminAuditPanel, AdminNamesPanel, AdminFlaggedPanel, ExtractWorkbench
```

Each host re-decides the branch **order**, which is exactly how the D-2 policy split arose. This
is edict 1 read in reverse: not a god module, but a **fissioned** one — a shared atom too small to
own its own state machine, so 16 hosts own fragments of it.

### D-20 · MINOR · Forced colors strips the content and keeps the decoration

Under `forcedColors: active` the text forces to `rgb(0,0,0)` but the ghost retains its author
colour:

```
text        color: rgb(0, 0, 0)                                        ← forced
ghost fill  background-color: color(srgb 0.79408 0.000149 0.318273 / 0.12)   ← NOT forced
ghost stroke  dashed, 2px, the accent                                  ← NOT forced
```

So in the one mode whose entire purpose is to remove author colour, the trio becomes the **only
coloured ink on the plate** — the decoration is *promoted* by the accessibility mode.
`./probes/forced-colors-admintags.png` and `../../visual/shots/forced-colors-desktop/adminusers.png`.
`VISUAL-CONSTITUTION.md:84`: *"Focus remains visibly distinct from selection in both schemes,
forced colors and reduced transparency"* — the plate has no forced-colors design at all; it
inherits whatever the producer happens to leak. The `EmptyPaletteMark` primitive (D-7) is where
`forced-color-adjust` would be decided once.

### D-21 · MINOR · Motion belongs to the hosts, so 4 of 5 Admin routes pop

```
$ grep -c Transition demo/palettes/BrowsePane.vue                        → 1  (vj-morph, out-in, :40)
$ grep -c Transition demo/palettes/browser/admin/AdminUsersPanel.vue     → 3
$ grep -c Transition demo/workbenches/mix/MixSourceSelector.vue          → 4
$ grep -c Transition demo/palettes/browser/admin/AdminTagsPanel.vue      → 0
$ grep -c Transition demo/palettes/browser/admin/AdminAuditPanel.vue     → 0
$ grep -c Transition demo/palettes/browser/admin/AdminNamesPanel.vue     → 0
$ grep -c Transition demo/palettes/browser/admin/AdminFlaggedPanel.vue   → 0
```

`EmptyState` declares **no** motion of its own: no `@keyframes`, no `transition`, no
`--animation-slide-*`, no `prefers-reduced-motion` branch. `BrowsePane.vue:29–40` carries a long
comment explaining that skeleton→content must *"SETTLE into the wall on the snappy spring instead
of a hard v-if POP"* — and then only BrowsePane gets it. Four of five Admin routes swap a
185–218 px slab with a hard `v-if`. `VISUAL-CONSTITUTION.md:141` §6: *"No full-slab remount hole."*
Edict 6 says animations are moved or tokenized, never deleted — here the animation was never
*given* to the species, so it exists on 3 hosts of 16 by accident of authorship. Motion is a
property of the species, not of its 16 addresses.

### D-22 · MINOR · The live-region design is asymmetric and reads the ornament aloud

- `role="status"` (`:28`) carries implicit `aria-live="polite"` **and** `aria-atomic="true"`, and it
  sits on the **empty branch**. So "the field became empty" announces; "results arrived" never does
  — the region unmounts. One direction of the state change is audible, the other is silent.
  The live region should belong to the *field*, not to one of its states
  (`VISUAL-CONSTITUTION.md:114`: *"changed result count/state through the **owning** status region"*).
- Because it is atomic, the whole plate re-announces on any mutation, ornament included: measured
  accessible text `"· no tags minted ·No tags yet."`
- `role="alert"` (`:17`) is **assertive** and wraps a focusable `Retry` button — an interactive
  control inside an assertive live region, and the region is never focused, so the keyboard user
  hears the failure and must hunt for the button.
- Measured: 2 `role="status"` regions coexist on `/#/admin/tags`.

---

## G. INFO

### D-23 · INFO · `withDefaults` rather than Vue 3.5 reactive props destructure

`EmptyState.vue:72–91` uses `withDefaults(defineProps<…>(), {…})`. Edict 7 names reactive props
destructure as the 3.5 idiom for custom components: `const { variant = "empty", eyebrow = "· empty
plate ·", dots = true } = defineProps<…>()`. `verbatimModuleSyntax` is satisfied (both imports at
`:69–70` are value imports; no type-only import is present to mis-declare). The six redundant
`| undefined` unions on already-optional props are noise, not defect.

### D-24 · INFO · One host of this species is unphotographed by the visual matrix

`MixSourceSelector.vue:239` renders the plate only in **Palettes** source mode, behind a tab. Live
probe of `/#/mix` in both schemes returned **0** instances. The species therefore has a host that
appears in none of the 60 real-Safari captures — a coverage hole for the next visual pass, not a
defect in the component.

---

## H. Negative proofs — claims I tried to make and could not

Recorded so the next seat does not re-litigate them.

- **N-1 · `tag="div"` does not leak into the DOM.** `WatercolorDot`'s v7 prop surface
  (`WatercolorDot.vue.d.ts:23–52`) declares `color / variant / animate / cycleDuration / range /
  seed` — **no `tag`** (V's P051 abrogation removed the interactive host). `EmptyState.vue:45–47`
  still passes `tag="div"`. I expected a stray HTML attribute; measured
  `document.querySelectorAll("[tag]").length === 0` on 4 routes × 2 schemes. It is **dead API, not
  a rendered defect** — hand it to CHALLENGE-C as a legacy-surface finding (edict 2), not to design.
- **N-2 · The 0.34 CLS on `/#/browse` is not the plate's.** Measured `CLS = 0.3415`, dominated by a
  single `0.32588` shift. Attribution from `LayoutShift.sources`: `DIV.pane-container
  pane-container--dual`, `pane-wrapper--left|right`, and `DIV.glass-resting card …` moving
  `774 → 515 px` tall. The identical shift (`0.31024`) occurs on `/#/admin/tags`. **Pane-layout
  settle, not the EmptyState branch swap.** D-21's remount-hole claim therefore rests on the
  missing `Transition` (code fact), not on CLS.
- **N-3 · No horizontal document overflow.** 320 px: `documentElement.scrollWidth === 320 ===
  clientWidth`. 200 % zoom: `1440 === 1440`. The REPORT.md `horizontalOverflow — 0` row holds for
  this component.
- **N-4 · Reduced motion is not violated.** `animationName: none` on all three dots. Under
  `reducedMotion: "reduce"` the only surviving declaration is a producer-owned
  `opacity .1s / color .1s` — a colour/opacity effect, which `VISUAL-CONSTITUTION.md:140` permits.
  No layout-forcing property is animated, because nothing is animated.
- **N-5 · The Q6 species separation *is* honoured at content level.** The error arm renders no
  eyebrow and no trio: the measured `/#/browse` error instance has children
  `svg / p / p / button` and **no** `[data-slot="empty-state-trio"]`. The rule at
  `EmptyState.vue:10–13` is implemented as written. The defect is that the two species share one
  *composition* (D-15), not that the content rule leaks.
- **N-6 · The producer's small-scale legibility affordance is inert here (mechanism unresolved).**
  `glass-ui.css` contains `@container (width<=48px){ .watercolor-ghost-stroke{ border-style: solid } }`
  and all three dots are ≤ 48 px with `container-type: inline-size`. Measured `border-top-style`
  is nonetheless **`dashed`** on all three. Either the rule loses to a later declaration or the
  query does not resolve. Recorded as a producer/consumer seam observation for the BJ relay, not
  claimed as a value.js defect. Its practical effect is that the canon's *"established dashes"*
  survive — which is what the constitution wants.
- **N-7 · The absolute stroke geometry is a real optical inconsistency but a producer default.**
  `--watercolor-ghost-weight: 2px`, `--watercolor-dash: 8px`, `--watercolor-gap: 5px` are fixed on
  `.watercolor-swatch`. Consumed at three diameters that yields stroke/diameter of
  **8.33 % / 6.25 % / 4.55 %** (a **1.83×** weight spread) and dash cycles of
  **5.80 / 7.73 / 10.63** over perimeters ≈ 75.4 / 100.5 / 138.2 px — non-integer, so each outline
  carries a dash-phase seam at a different place. Visible on the small right dot in
  `./probes/emptystate-dark-admintags.png`. **The design decision that exposes it is
  EmptyState's** (three arbitrary Tailwind diameters, D-7); the token law is the producer's. It
  belongs in the BJ relay alongside a request for a scale-invariant ghost stroke, and is the reason
  the mark should be **one** primitive at **one** size with internally-proportioned satellites.

---

## I. The gestalt cure

Not 22 patches. Three transpositions, in order.

**1 · Split the species; give each the anatomy its job requires.** `EmptyState` is not one
component. It is:

- **`EmptyInvitation`** — mark + label + statement + **one required named action**. `hint` dies;
  its three live strings were verbs. This closes D-1 and, with the action present, removes the
  reason the plate needed a 26 ch display line to carry persuasion (D-11).
- **`FieldFailure`** — with **two** shapes, cold (plate replacement) and warm (persistent status
  strip *above retained content*, owning retry). This closes D-2 and unifies the 7 divergent
  branch policies to one.
- **`FieldSkeleton`** — the loading arm the current design pushed out to 7 files. Closes D-19 and
  removes the branch-order freedom that caused D-2.

One `<FieldState>` wrapper owning the `loading | failure | empty | populated` switch, its live
region (bound to the *field*, so both directions announce — D-22), and its transition (so motion is
the species' property, not the host's — D-21).

**2 · Build the ratified `EmptyPaletteMark` in glass-ui, and make absence neutral.** One primitive,
one authored size with internally proportioned satellites, direction-invariant internals, a
scale-invariant stroke, one `forced-color-adjust` decision, `aria-hidden` once. Retint it to the
neutral de-emphasis rung and reserve `--accent-live` for the add-slot ghost, where a live-colour
preview is *data*. This single move closes D-3, D-5, D-7, D-8, D-18, D-20 and answers N-7 — and it
makes D-6 enforceable by construction: Admin composes `EmptyInvitation` without the mark because
the mark is a separate import, not a `dots` boolean nobody passes.

**3 · Re-derive the plate's spacing and measure from the glass-ui ladders, not from Tailwind
brackets.** A title gap between label and statement and a section gap between statement and action
(closing D-9); container-scaled padding and a paired clamp that holds the caption:headline ratio
across the whole range (closing D-10); measures expressed in one font's `ch` or in the shared
measure token so the ladder that is authored is the ladder that renders (closing D-11); a
`min-block-size` on the species so sibling plates share a register (closing D-12); the type roles
re-seated on the closed matrix — Plus Jakarta Sans for `text-heading` and for help copy (closing
D-14); the `· … ·` frame drawn by the label species rather than typed into 11 strings (closing
D-16); `overflow-wrap: anywhere` on every text arm, not one of four (closing D-17).

What survives untouched: the Q6 species separation (N-5), the `--ink-muted` contrast floor's
*light* behaviour, and the decision that loading is not empty. Those were right. The design failure
is that being right about the *distinction* was mistaken for being finished with the *anatomy*.
