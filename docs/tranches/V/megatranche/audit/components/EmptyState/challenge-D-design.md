# CHALLENGE-D — `demo/shared/ui/EmptyState.vue` — the design is flawed

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`, the tier declared
at spawn. The seat is declared, not inherited.

Seat: CHALLENGE-D (design). Component: `demo/shared/ui/EmptyState.vue` (105 lines, area `core`).
Repo `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`.
Write scope honoured: this file, `./challenge-D-design.pass1.md`, and `./probes/` only.
**No source edit was made by this seat.**

Pass 2. Pass 1 is preserved verbatim at `./challenge-D-design.pass1.md`; §J is the concordance.
Every number below was re-measured by this seat against the live tree — nothing is inherited.

---

## Verdict

**DEFECTIVE.** 20 findings: **2 BLOCKER, 10 MAJOR, 8 MINOR** (+ 3 INFO, + 8 negative proofs).

The gestalt, in one line: **`EmptyState` is a decoration with a caption attached, and it is wired to
a predicate it does not describe.** Its species taxonomy has exactly two members — *invitation* and
*failure* — and the product needs four. The two it is missing are the two the user actually hits:
*your filter matched nothing* and *the refresh failed but your data is still here*. Because neither
exists, the component ships a **provable lie** (BLOCKER `D-1`: a library holding two palettes renders
"No saved palettes yet." while the header badge four hundred pixels above reads **2**) and a
**data-hiding** failure register (BLOCKER `D-2`).

Everything downstream is the same mistake at smaller scale: the ornament outranks the message in
every scheme, the de-emphasis rung that carries the whole hierarchy is 6.4× weaker in dark than in
light, one 10 px gap token is asked to express four semantic ranks and produces a 14 : 23 : 16
rhythm that *inverts* the title/section relation, and the canon's named mark primitive
(`EmptyPaletteMark`) does not exist so it is hand-rolled, unconditional, and shipped onto five Admin
routes the canon zeroes ornament on.

**Strongest defect: `D-1`.** It is the only one where the component renders a statement that the
same viewport simultaneously disproves.

---

## Evidence index

| Kind | Coordinate |
|---|---|
| Source | `demo/shared/ui/EmptyState.vue:1–105` |
| Call sites (16 across 7 files) | `MixSourceSelector.vue:239` · `BrowsePane.vue:61` · `PaletteCardGrid.vue:21` · `AdminUsersPanel.vue:51,63,138` · `AdminAuditPanel.vue:42,56` · `AdminNamesPanel.vue:30,42,80,92` · `AdminFlaggedPanel.vue:22,37` · `AdminTagsPanel.vue:68,82` |
| Uncalled clones of the same plate | `ErrorBoundary.vue:16–33,84–86` · `Markdown.vue:20–29` |
| Canon | `VISUAL-CONSTITUTION.md:23,28,34,66–78,82–85,92,101,139–145,151–154,186,218` · `PROPORTION-AUDIT.md:5,39,49,52,66–79` |
| Real-Safari matrix | `../../visual/shots/{safari-desktop-light,safari-desktop-dark,safari-mobile-light}/admin-{tags,users}.png` · `{forced-colors,zoom-200,rtl}-desktop/adminusers.png` |
| Live probes (this seat) | `./probes/probeD-*.png` — 13 captures, Chromium/Playwright, `http://localhost:9000` HTTP 200 |
| Probe sources | `/private/tmp/.../scratchpad/D2-empty-probe.mjs`, `D2-probe2.mjs` … `D2-probe7.mjs` |
| Producer | `node_modules/@mkbabb/glass-ui@7.0.0/dist/components/watercolor-dot/WatercolorDot.vue.d.ts:26–52` · `dist/glass-ui.css` (`.watercolor-swatch`, `.watercolor-ghost-stroke`) |
| Token source | `demo/styles/foundation.css:221,231` · `demo/color-picker/composables/boot/useAtmosphereBoot.ts:85,103` |

Probe matrix: 1440×900 and 320/390×1000 at DPR 2 and DPR 1, `colorScheme` light/dark,
`forcedColors: active`, `dir=rtl` (from the tracked matrix), plus seeded-`localStorage` population.

---

## A. The predicate — two BLOCKERs

### D-1 · BLOCKER · The plate asserts "No saved palettes yet." while the header badge reads 2

`PalettesPane.vue:77` binds the empty predicate to the **filtered** collection and then hands
`EmptyState` a single string for both meanings:

```
77:  :empty="pm.filteredSaved.value.length === 0"
78:  empty-eyebrow="· empty plate ·"
79:  empty-text="No saved palettes yet."
80:  empty-hint="Add colors above, then save the set."
```

**Rendered reproduction** (`probes/probeD-filtered-zero-populated.png`, script `D2-probe7.mjs`):

1. seed `localStorage["color-palettes"]` with two local palettes (`usePaletteStore.ts:6` — key
   `color-palettes`, shape `{version:1, palettes:[…]}`);
2. load `#/palettes` → probe reads `{ plate: null, cards: 2 }` — no plate, two cards;
3. type `zzzzqqqq` into *Search your palettes…*;
4. probe reads:

```json
"filteredZero": { "plate": { "text": "· empty plate ·No saved palettes yet.Add colors above, then save the set.",
                             "role": "status", "hasTrio": true }, "cards": 1 }
```

The screenshot shows the contradiction inside one frame: the pane heading renders **`My Palettes ②`**
and, 400 px below it, **`· EMPTY PLATE · / No saved palettes yet. / Add colors above, then save the set.`**

Every one of the four rendered elements is false or actively misdirecting:

| element | asserts | truth |
|---|---|---|
| `· empty plate ·` | the plate is empty | it holds 2 |
| `No saved palettes yet.` | nothing has ever been saved | 2 are saved |
| `Add colors above, then save the set.` | the recovery is *save something* | the recovery is *clear the search* |
| the three-dot mark | canon §7's TRUE-EMPTY invitation | this is not a true empty |

Canon `VISUAL-CONSTITUTION.md:186` reserves the mark explicitly: "A **true empty** invitation
content-hugs its text/action and may carry one static, aria-hidden `EmptyPaletteMark`." §5.1 row 5
puts the filtered case in a different jurisdiction entirely: "in-route filter … announce **changed
result count/state** through the owning status region; no route announcement."

The same mechanism is live at two more sites: `BrowsePane.vue:83` (`displayedBrowse.length === 0` →
"No published palettes here yet.") and `AdminUsersPanel.vue:63` (`users` is the *query result*; the
message "No users found." is honest but the eyebrow `· roster clear ·` is not — the roster is not
clear, the query missed).

**Mechanism.** The component exposes one `message` and one `variant` and therefore cannot express
*why* the collection is zero. The consumer is given no place to put the distinction, so it doesn't
make it. This is a component-API defect, not a copywriting slip: no amount of consumer diligence can
render two states from one string.

**Cure (transposition, not patch).** Model the *reason*, not the *rendering*. One discriminated prop
replaces `variant`:

```ts
state:
  | { kind: "empty" }                                   // true zero — invitation, mark, CTA
  | { kind: "filtered"; query: string; total: number }  // zero of N — "no match for “zzzz” · 2 saved" + Clear
  | { kind: "failed"; detail: string; retry: () => void }
  | { kind: "unavailable" }                             // failed with data retained — see D-2
```

The mark then rides `kind === "empty"` structurally and cannot leak. `dots` (D-7) dies with it.

---

### D-2 · BLOCKER · The failure species is defined only as a content *replacement*, so a failed refresh hides data the user is reading

The `error` variant is a sibling root (`EmptyState.vue:14` `v-if` / `:28` `v-else`). It has no
non-destructive form. Consumers therefore have exactly one way to use it — put it in the `v-if`
chain — and six of seven do:

```
AdminTagsPanel.vue:68     v-else-if="tagsApi.loadError.value"     ← error plate
AdminTagsPanel.vue:82     v-else-if="tags.length === 0"           ← empty plate
AdminTagsPanel.vue:85     v-else                                  ← the list
```

The data is **still in state** when that happens. `useAdminTags.ts:53–59`:

```ts
try   { tags.value = await getAdminTags(token); loadError.value = null; }
catch (e: any) { loadError.value = e?.message ?? "Backend unreachable"; }   // tags.value untouched
```

Identical shape at `useAdminFlagged.ts:69–75` and `useAdminAudit.ts:63–67`. So after a user has
loaded 200 tags and presses *Refresh* on a flaky link, `tags.value` still holds 200 rows and the UI
replaces all of them with a 235 px plate reading "The tag ledger is unreachable."

Sites: `AdminTagsPanel.vue:68`, `AdminFlaggedPanel.vue:22`, `AdminAuditPanel.vue:42`,
`AdminUsersPanel.vue:51`, `AdminNamesPanel.vue:30`, `AdminNamesPanel.vue:80` — **6 sites, 5 routes.**

`BrowsePane.vue:62` is the lone correct site and it had to invent the guard itself:

```
v-else-if="pm.browseError.value && displayedBrowse.length === 0"
```

One consumer in seven discovering the right predicate unaided is the signature of a missing
component contract.

Canon `PROPORTION-AUDIT.md:52` PR-08: "Pending/failure/export/recovery truth only transient →
**ADD-AFFORDANCE** … Persistent entity status/recovery."
`VISUAL-CONSTITUTION.md:101`: "Persistent operation state stays with the entity/workspace."

**Reproduction:** source-derived and exact — template order (`v-if=error` before the list) plus
composable retention (`tags.value` not cleared on catch). Not rendered: this dev host cannot reach
the failure branch at all (see `D-19`).

**Cure.** The `failed` register must be a *strip*, not a *stage*: when the collection is non-empty,
the failure renders as a bounded status band above retained rows carrying `Retry`; only a failure
with nothing to retain escalates to a full plate. That is the `unavailable` arm in D-1's union, and
it deletes the guard from all seven consumers.

---

## B. Chroma and scheme — the ornament outranks the message

### D-3 · MAJOR · The de-emphasis rung is 6.4× weaker in dark than in light — the hierarchy is gone

Measured from **rendered pixels** (`D2-probe2.mjs` + a PIL scan of `probes/probeD-{light,dark}-trio-crop.png`),
`#/admin/users`, 1440×900:

| scheme | plate | eyebrow ink | contrast | headline ink | contrast | **headline : eyebrow** |
|---|---|---|---|---|---|---|
| light | `rgb(243,189,206)` | `rgb(86,84,83)` | 4.65 : 1 | `rgb(28,25,23)` | 10.81 : 1 | **2.32×** |
| dark | `rgb(121,78,89)` | `rgb(221,218,217)` | 4.96 : 1 | `rgb(233,230,226)` | 5.54 : 1 | **1.12×** |

In OKLCH lightness, from the computed tokens:

| scheme | `--foreground` L | `--ink-muted` L | separation |
|---|---|---|---|
| light | 0.2161 | 0.4471 | **23.10 L-points** |
| dark | 0.9262 | 0.8900 | **3.62 L-points** |

**6.38× weaker in dark.** The two crops make it visible without arithmetic: in
`probeD-light-trio-crop.png` the caption is grey and the statement is near-black; in
`probeD-dark-trio-crop.png` "· ROSTER CLEAR ·" and "No users found." read at the same brightness.
The same collapse is in the tracked Safari matrix — `safari-desktop-dark/admin-tags.png`, where
"Add colors above, then save the set." is as bright as "No saved palettes yet."

`EmptyState.vue:49–54` and `:95–101` both certify this rung by name ("the certified de-emphasis
rung … boot-stamped, floor-clamped against the live resting plate; D6"). The certification is a
*floor* — it guarantees the caption is legible. It never established a *ceiling*, so in dark the
floor-clamp pushes the caption up to within 3.6 L-points of the primary ink and the rung stops being
a rung. `PROPORTION-AUDIT.md:73`: "Real rendered relation wins over token intent. … token presence
alone cannot close a row."

**Cure.** `--ink-muted` needs a paired *separation* obligation, not only a contrast floor: clamp it
to the plate **and** hold ≥ 12 OKLCH L-points from `--foreground` in the same scheme, resolving the
conflict by moving the plate, not the ink. Rung, not floor.

---

### D-4 · MAJOR · The mark is fed an ink-contrast-guarded token into a paint slot — 8.95× chroma loss in dark

`EmptyState.vue:45–47` paints all three dots `color="var(--accent-live)"`.
`foundation.css:221`: "`--accent-live` is the **contrast-guarded** LIVE picked color". It is guarded
for *ink over the plate*, which means its lightness is driven to whichever pole reads as text:

| scheme | `--accent-live` computed | L | C |
|---|---|---|---|
| light | `oklch(47.119% 0.188448 9.834deg)` | 0.471 | **0.1884** |
| dark | `oklch(95.832% 0.021053 9.834deg)` | 0.958 | **0.0211** |

**8.95× chroma loss.** The dot's own paint confirms it — computed `background-color`
(`color-mix(… --watercolor-color 12% …)`): light `color(srgb 0.6655 0.0001 0.2617 / 0.12)`,
dark `color(srgb 0.9999 0.9247 0.9331 / 0.12)`. The mark is crimson in light and near-white in dark.

`EmptyState.vue:6` states the intent: "seeded WatercolorDot ghosts **reading the LIVE accent**." In
dark they read a near-neutral. `VISUAL-CONSTITUTION.md:17` puts WatercolorDot in the
"Watercolor/data" tier — "the **only** ornamental color-bearing species." A color-bearing species
that loses 89 % of its chroma in one scheme is not bearing color.

The same-frame proof is in the tracked matrix: `safari-desktop-dark/admin-tags.png` renders the
EmptyState trio achromatic white **while the sibling "Start a new palette" ghost dot 150 px above it
stays pink** — two ghost marks, same scheme, same viewport, different chromatic law.

The codebase already owns the correct token family: `ExtractControls.vue:124` resolves graphic paint
through `safeCss(cssColor, GRAPHICS_CONTRAST_FLOOR)` rather than the ink-guarded variable.

**Cure.** Specimen paint reads a *graphics*-floored accent (`GRAPHICS_CONTRAST_FLOOR`), never the
ink guard. One-line token swap at the producer seam; nothing else moves.

---

### D-5 · MAJOR · In dark, the `aria-hidden` ornament is the loudest thing on the plate

Combine D-3 and D-4 and the rank order inverts. In dark the message sits at 5.54 : 1 while the
44 px mark — `aria-hidden="true"`, zero information — carries a hard 2 px dashed edge at near-white
`oklch(95.8 %)` against a plate at OKLCH L 0.395. Measured edge-vs-plate contrast from
`probeD-dark-trio-crop.png` exceeds the headline's.

`VISUAL-CONSTITUTION.md:34`: "One pane may have one full-strength visual protagonist. Supporting
fixtures do not compete with it through equal size or equal shadow."
`PROPORTION-AUDIT.md:70`: "A small icon/mark is either data, status, labeled action, drag affordance,
focus/selection register **or removed**. Decoration without information" is not on the list.

The protagonist of an empty plate is the sentence. Here it is the ornament, in both schemes — in
light because the mark is the only saturated element (`probeD-light-trio-crop.png`), in dark because
it is the only high-contrast one.

**Cure.** The mark's rendered contrast against the plate must be *bounded above* by the caption's,
not merely bounded below by legibility. Practically: the ghost stroke drops to the caption rung, and
its chroma comes from a graphics floor (D-4), so it reads as atmosphere rather than as an edge.

---

## C. Scope — the mark ships where the canon zeroes ornament

### D-6 · MAJOR · `dots` defaults **true**, so the canon-restricted mark ships on all 5 Admin routes; the prop has zero consumers

`EmptyState.vue:90`: `{ variant: "empty", eyebrow: "· empty plate ·", dots: true }`.

```
$ grep -rn "dots" demo/ --include=*.vue
demo/shared/ui/EmptyState.vue:37,40,88,90       ← the definition only
demo/workbenches/gradient/.../GradientEasingEditor.vue:5,125,127,233,235   ← unrelated `specimen-dots`
```

**Zero consumers pass `dots`.** The prop, its four-line justification (`:83–87`) and the ten-line
`N-3 RE-AIMED` comment block (`:29–38`) exist to describe an escape hatch nobody uses. Every one of
all 10 empty-variant call sites therefore render the mark, including
`AdminUsersPanel.vue:63,138`, `AdminTagsPanel.vue:82`, `AdminAuditPanel.vue:56`,
`AdminFlaggedPanel.vue:37`, `AdminNamesPanel.vue:42,92`.

Canon scopes the mark to the palette field: `VISUAL-CONSTITUTION.md:186` grants it under
*"### Palette library and Browse"*, and `PROPORTION-AUDIT.md:49` PR-05 rules for everything else —
"only the five Admin fields retain one adjacent-row separator and no terminal rule; **every other
divider/ornament is zero**." `VISUAL-CONSTITUTION.md:218`: Admin's "elevated authority is
communicated by labeling and scope, not by a fourth visual system."

The tracked frame shows the compounding: `safari-desktop-light/admin-tags.png` renders the identical
three-dot mark **twice in one viewport** (Tags pane + the Palettes companion) at identical scale.
`EmptyState.vue:31` says "never two ghost registers at two scales" — the clause is satisfied and the
outcome is worse, because the two registers are at the *same* scale and read as a repeated stamp.

**Cure.** Default `false`; the mark becomes a structural consequence of `kind === "empty"` **and**
the palette-field host, per D-1's union. The prop disappears rather than flipping.

---

### D-7 · MAJOR · The canon names a primitive `EmptyPaletteMark`; it does not exist, so it is hand-rolled with per-instance overrides

`VISUAL-CONSTITUTION.md:186`: "may carry one static, aria-hidden **`EmptyPaletteMark`**: exactly three
WatercolorDots plus the established dashes."

```
$ ls node_modules/@mkbabb/glass-ui@7.0.0/dist/components/ | grep -i -E "empty|mark"
handmark
```

No such primitive. `EmptyState.vue:39–48` inlines it: a bare `<div class="flex items-end gap-2">`
plus three `<WatercolorDot>` whose entire composition is expressed as per-instance Tailwind:

```
w-8 h-8 opacity-80 · w-11 h-11 · w-6 h-6 opacity-60
```

Three consequences, all measured:

1. **The stroke weight does not scale.** `glass-ui.css` `.watercolor-ghost-stroke` is
   `border: var(--watercolor-ghost-weight, 2px) dashed …` — a fixed 2 px. Against the three
   diameters that is **8.3 % of Ø on the 24 px dot vs 4.5 % on the 44 px** — the smallest dot carries
   a proportionally **1.8× heavier** edge. Visible in `probeD-light-trio-crop.png`: the small dot
   reads as a heavier, denser ring than the large one.
2. **The dash rhythm does not scale.** `--watercolor-dash: 8px` / `--watercolor-gap: 5px`, also fixed
   → ≈ 5.8 dashes around the 24 px dot and ≈ 10.6 around the 44 px. Three different textures in one
   mark.
3. **The producer's own scaling seam is bypassed.** The ghost sets `container-type: inline-size`
   (`glass-ui.css`, `[data-variant=ghost]`) — it is built to respond to its container. The consumer
   pins it with fixed `w-*` utilities instead.

Owner edict 4 ("variants/primitives belong in glass-ui, not in demo/") and edict 5 ("style at the
root component level, never per-instance overrides") are both breached, and edict 3's KISS clause is
the reason it happened — nobody wanted to open a producer PR for three dots.

**Cure.** `EmptyPaletteMark` lands in glass-ui as the canon already names it, owning the three
diameters, the proportional `--watercolor-ghost-weight`/dash pair, `aria-hidden`, and the graphics
accent from D-4. `EmptyState` then renders `<EmptyPaletteMark />` and its ten-line comment block
(`:29–38`) is deleted rather than re-litigated.

---

### D-8 · MINOR · The mark's own optical mass sits 3.5 px left of the axis it is centred on

Measured centres (`D2-empty-probe.mjs`, `#/admin/users`, 1440): dots at cx `413 / 459 / 501`,
container 397→513 (centre 455.0), eyebrow centre 454.99, headline centre 454.995.

Weighting the three by painted area × opacity:

```
(32²·0.8·413 + 44²·1.0·459 + 24²·0.6·501) / (32²·0.8 + 44²·1.0 + 24²·0.6) = 451.53
```

and by stroke perimeter × opacity: `452.18`. Both land **~3 px left** of the 455.0 text axis, because
the descending 32 → 44 → 24 arrangement puts 76 px of dot on the left of the big one and 24 px on
the right. `items-end` (`:42`) then bottom-aligns them, so the residual asymmetry reads as a
tail rather than as a considered fall.

MINOR because 3 px on a 116 px mark is at the edge of perception — but it is a *designed* mark, and
the design does not resolve.

---

## D. Proportion and rhythm

### D-9 · MAJOR · One 10 px token serves four semantic ranks; the rendered ink rhythm is 14 : 23 : 16 and it inverts the title/section relation

`gap-2.5` (`:16`, `:28`) is the only vertical relation in the component. Box gaps are exactly 10 px
between all four children (`D2-probe5.mjs`, offsets from plate top: trio `32→76`, eyebrow `86→107.58`,
headline `117.58→153.17`, hint `163.17→186.14`).

Rendered **ink** bands, scanned per-row from `probes/probeD-inkscan.png` (DPR 1, 462×218,
`#/palettes` empty plate, threshold Δluma > 18):

```
ink bands (y0,y1):  (32,75) h=44   (90,100) h=11   (124,149) h=26   (166,181) h=16
rendered gaps:      75→90 = 14px   100→124 = 23px   149→166 = 16px
```

| relation | canon rank (`PROPORTION-AUDIT.md:68`) | token | **rendered ink** |
|---|---|---|---|
| mark → eyebrow | section boundary (should be widest) | 10 px | **14 px** |
| eyebrow → statement | title gap (should be tightest) | 10 px | **23 px** |
| statement → hint | within-section | 10 px | **16 px** |

The rhythm is **inverted**: the annotation is optically bonded to the ornament it does not describe
(14 px) and optically detached from the line it labels (23 px). A reader's eye groups
`[mark + eyebrow]` and then `[statement]`, which is exactly backwards — the eyebrow is the
statement's label.

Cause: one flex `gap` across three different font metrics (Fira Code 14.38/21.58, Fraunces
25.89/35.60, Fira Code 16.4/22.96). Half-leading differs per pair, so a uniform box gap cannot
produce a uniform ink gap. `PROPORTION-AUDIT.md:68` requires the two ranks to be *different* tokens;
`:73` requires the *rendered* relation to be the one that counts.

**Cure.** Trim the line boxes so the token *is* the ink — `text-box: trim-both cap alphabetic` on the
three text rows — then give the two ranks two tokens: `--empty-title-gap` (eyebrow→statement, tight)
and `--empty-section-gap` (mark→eyebrow and statement→action, φ× larger). One CSS property change
plus two tokens replaces the whole guessed ladder.

---

### D-10 · MAJOR · The `26ch` measure is 46 % wider than it reads, because `ch` is sampled in a display serif

`:20` and `:58`: `max-w-[26ch]` on a `font-display` (Fraunces) line.

Computed at 1440 (`D2-empty-probe.mjs`): `font-size 25.888px`, `max-width **469.474px**` → Fraunces
`ch` = 18.06 px = 0.698 em (the advance of `0`, a lining figure).
Rendered average glyph advance, from a real string: "No saved palettes yet." = 22 chars in 272.84 px
→ **12.40 px/char**.

```
469.474 / 12.40 ≈ 38 characters   —  the authored intent was 26
```

**The measure is 46 % looser than written.** For a display line the typographic target is 20–35
characters; this permits 38. The error is confined to the display rows: the two Fira Code rows
(`max-w-[36ch]` → 363.32 px at 16.4 px = 10.09 px/ch; `max-w-[44ch]` → 444.06 px) are monospace, so
their `ch` is exact.

Same class of defect, opposite direction, in the same component: the *hint*'s honest 36 ch measure
(363 px) is **narrower** than the *headline*'s nominal 26 ch (469 px), so the small support line is
set tighter than the large statement it supports.

**Cure.** Display measures are authored in `em` of their own face or as a token
(`--measure-display: 22em`), never in `ch` of a proportional serif. `ch` survives only on the mono rows.

---

### D-11 · MINOR · `justify-center` is a provable no-op, duplicated in both branches

`:16` and `:28` both carry `justify-center` on a `flex-col` whose height is content-derived. Measured
(`D2-empty-probe.mjs`):

```
#/admin/users  plate h = 185.17 = 32 + 44 + 10 + 21.58 + 10 + 35.59            (py-8 + 4 rows)
#/palettes     plate h = 218.14 = 32 + 44 + 10 + 21.58 + 10 + 35.59 + 10 + 22.97
```

Both exact to 0.01 px — the box is precisely its content, so main-axis centring has nothing to
distribute. It is inert in every one of the 16 call sites. Two copies of a no-op inside a 105-line
file, in a repo whose canon opens with a subtraction mandate.

---

### D-12 · MINOR · `py-8` is a fixed 32 px in a container-scaled system

`:16`, `:28`. Measured `padding-top: 32px` / `padding-bottom: 32px` identically at 1440, 390 and 320,
and identically inside a 462 px Admin column and a 254 px mobile column.
`VISUAL-CONSTITUTION.md:33`: "Spacing is container-scaled from glass-ui tokens. No desktop-tight/
mobile-airy fork and no breakpoint pile." The mark's `w-8/w-11/w-6` are fixed for the same reason —
at 320 px the 116 px mark occupies 46 % of the 254 px column against 25 % of the 462 px desktop one
(`probes/probeD-real320-palettes320.png`). At 200 % zoom (`../../visual/shots/zoom-200-desktop/adminusers.png`)
the mark plus eyebrow consume the visible plate and push "No users found." to the fold.

---

## E. Type jurisdiction and the design-system boundary

### D-13 · MAJOR · `font-display text-heading` is a family↔size mapping the closed type matrix does not contain

`VISUAL-CONSTITUTION.md:66–78` publishes the matrix and closes it: "This matrix is **closed** across
all eighteen compositions. P019's family-neutral Picker identity/headline pair is the **sole**
paired-scale exception."

| role | glass-ui role | family |
|---|---|---|
| section heading | `text-heading` | **Plus Jakarta Sans** |
| instrument identity | `--type-title` | Fraunces |
| palette identity | `--type-subheading` | Fraunces |

`EmptyState.vue:20` and `:58` render `font-display text-heading` — Fraunces at `text-heading`.
Measured: `fontFamily: "Fraunces"`, `fontSize 25.888px`, `fontWeight 700`. That mapping is not in the
matrix and is not the granted exception.

Two further per-instance overrides sit on the same root-owned utility: `leading-snug` (rendered
line-height 35.596 px = 1.375 — overriding `text-heading`'s own leading, which `foundation.css:379`
notes is producer-hardcoded) and `text-balance`. Edict 5: "style at the shadcn/glass root component
level, never per-instance overrides."

Blast radius — `grep -rn "font-display text-heading" demo/ --include=*.vue`:
`EmptyState.vue:20`, `EmptyState.vue:58`, `ErrorBoundary.vue:24`, `Markdown.vue:26`. Four sites,
three of them copies of this plate (D-14). Whatever this pairing is, it is a real 18th role and the
matrix should either name it or the component should drop to `--type-subheading`.

---

### D-14 · MAJOR · "the ONE shared empty atom" is false — the plate is cloned twice, with drifted proportions

`EmptyState.vue:98` claims: "This is the ONE shared empty atom (8 consumers incl. the admin walls),
so every consumer inherits the cure."

`ErrorBoundary.vue:16–33` is the same plate, re-typed, with every number nudged:

| | EmptyState error | ErrorBoundary | drift |
|---|---|---|---|
| glyph | `CircleAlert w-6 h-6 text-destructive/80` | `CircleAlert w-7 h-7 text-destructive/80` | +1 rung |
| row gap | `gap-2.5` | `gap-3` | +2 px |
| block pad | `py-8` | `py-10 px-6` | +8 px |
| statement measure | `max-w-[26ch]` | `max-w-[28ch]` | +2 ch |
| detail measure | `max-w-[44ch]` | `max-w-[46ch]` | +2 ch |

…and the scoped `.plate-ink` rule is duplicated verbatim (`EmptyState.vue:102–104` ≡
`ErrorBoundary.vue:84–86`). `Markdown.vue:20–29` is a third rendering of the same idea through an
`Alert` + `AlertTitle class="font-display text-heading"`, with its own comment explaining that it
"joins the EmptyState error-statement register **verbatim**" — which it does not; it is a fourth
geometry.

So the failure plate exists in three incompatible geometries, each with a comment asserting it is the
shared one. Edicts 1 (no god modules → focused modules with **real encapsulation**) and 3 (KISS) both
fail here: the abstraction was declared and then not used.

**Cure.** One `FailurePlate` composition owns the glyph rung, gaps, and both measures; `EmptyState`'s
`failed`/`unavailable` arms, `ErrorBoundary`, and `Markdown`'s doc-miss all render it. The three
comment blocks asserting shared-ness are deleted, because the code will assert it instead.

---

### D-15 · MINOR · `tag="div"` is passed three times to a prop glass-ui 7.0.0 deleted

`:45–47` pass `tag="div"` to `WatercolorDot`. The 7.0.0 surface
(`dist/components/watercolor-dot/WatercolorDot.vue.d.ts:26–52`) is
`{ color, variant?, animate?, cycleDuration?, range?, seed? }` — **no `tag`**. Canon
`VISUAL-CONSTITUTION.md:91` is why: "V **abrogates** a selection outline and interactive host on
`WatercolorDot`. P051 removes the public `tag="button"`/interactive-host branch in the clean major."

The producer executed the abrogation; the consumer still speaks the retired API. Measured outcome
(`D2-empty-probe.mjs`): the elements render as `<span … class="w-8 h-8 opacity-80 watercolor-swatch"
data-variant="ghost">` — a `<span>`, not the requested `div` — and `document.querySelectorAll("[tag]")`
returns `[]`, so it is silently swallowed rather than leaked. Dead words asking for something that
cannot happen. Owner edict 2 (no legacy code, no dual paths).

---

### D-16 · MINOR · `tracking-[0.18em]` is an arbitrary literal on a root-owned caption utility

`:55`: `text-mono-caption uppercase tracking-[0.18em]`. Measured `letter-spacing: 2.58912px`
(= 0.18 × 14.384 px). `text-mono-caption` is the producer's caption role
(`foundation.css:88` registers glass-ui's `@utility` set); its tracking belongs there, not at one
call site as a magic literal. Same class as D-13's `leading-snug`.

---

## F. State coverage

Every state the component can occupy, and where it stands. **Un-designed states are the finding.**

| state | handled? | evidence |
|---|---|---|
| true empty | ✔ | `probeD-light-trio-crop.png` |
| **filtered-zero** | ✘ **renders the true-empty lie** | **D-1** |
| loading | n/a — consumer-owned (`PaletteCardSkeleton`) | `BrowsePane.vue:41–54` |
| error, no data | ✔ | `probeD-errorspecies-light.png` (synthesised — D-19) |
| **error, data retained** | ✘ **hides the data** | **D-2** |
| populated | n/a | — |
| disabled / focused / hovered / pressed / selected / dragging | n/a — the plate has no interactive element of its own; the `#action` slot's `Button` owns its own states | `AdminUsersPanel.vue:58` |
| **overflowing / unbreakable** | ✘ silent clip | **D-17** |
| **RTL** | ✘ mark mirrors, punctuation reorders, machine `detail` un-isolated | **D-18** |
| reduced-motion | ✔ (vacuously) | negative proof N-3 |
| forced-colors | ~ hierarchy flattens, decoration keeps chroma | **D-20** |
| zoomed 200 % | ~ mark + eyebrow push the message to the fold | `zoom-200-desktop/adminusers.png` |
| 320 px | ✔ for shipped copy | `probeD-real320-*.png` |

### D-17 · MINOR · `break-words` is applied to one of the three text rows; the other two clip silently

`:23` (error `detail`) carries `break-words`. `:20/:58` (`message`) and `:61` (`hint`) do not.
Computed on the live component: `overflow-wrap: normal`, `word-break: normal`, `hyphens: manual`.

Measured on the **real mounted component** (`D2-probe5.mjs`, message text replaced in place, no clone):

```
vw 320 :  <p> L=33  R=502.5  w=469.5   host L=33 R=287 w=254
          scrollWidth 1198   clientWidth 469
          documentElement.scrollWidth 320 == clientWidth 320 ; body.scrollWidth 320
```

An 84-character unbreakable token renders **1198 px of ink into a 254 px column**. The `<p>` extends
182.5 px past the right viewport edge, and the document does **not** scroll — an ancestor clips it.
The user sees 254 px of 1198 px (21 %) with no ellipsis, no wrap, no scroll, no signal. At 1440 the
same string overruns the 462 px Admin column by 7.5 px and clips 729 px internally.

MINOR rather than MAJOR because no current call site supplies a triggering value — all 16 pass
literals (`PalettesPane.vue:79`, `BrowsePane.vue:85`, the nine Admin strings). But `message` is
public, is also a `<slot>` (`:21`, `:59`), and the component already demonstrates it knows the hazard
by guarding `detail` alone. The asymmetry is the defect.

**Cure.** The three text rows share one `overflow-wrap: anywhere` + `hyphens: auto` rule, or the
component stops carrying arbitrary strings in the display row.

### D-18 · MINOR · RTL: the mark mirrors, the punctuation reorders, and the machine string has no isolation

`../../visual/shots/rtl-desktop/adminusers.png`:

- The mark reverses: LTR renders 32/44/24 left-to-right; RTL renders 24/44/32. The trio is a flex row
  in document direction. A *composed mark* (canon calls it `EmptyPaletteMark`) is an image and should
  not mirror; chrome and layout should (`VISUAL-CONSTITUTION.md:151`).
- Every message renders its full stop at the **line start**: `.No users found`,
  `.No saved palettes yet`, `.Add colors above, then save the set`. Trailing neutrals reorder under
  an RTL paragraph direction because the strings carry no `dir`/isolation.
- The failure `detail` (`:23`) is the acute case: it carries `e?.message`
  (`useAdminTags.ts:58`, `useAdminFlagged.ts:74`, `useAdminAudit.ts:66`) — URLs, HTTP codes, JS error
  text. `VISUAL-CONSTITUTION.md:154`: "CSS strings, hex, slugs, IDs and provenance render in
  **LTR-isolated spans** inside RTL prose." It has none.

RTL is not a shipped user mode; it is a tracked canon obligation with its own table
(`VISUAL-CONSTITUTION.md:122–133`), which is why this is MINOR rather than INFO.

### D-19 · MINOR · The failure species has zero rendered evidence anywhere in the audit corpus

Not in the 60-capture Safari matrix (`../../visual/REPORT.md` — the routes render loading, empty or
populated), not in the 26 state captures, and not reachable on this dev host: probing `#/browse` with
`page.on("request")` returned exactly one non-asset request (`GET http://localhost:9000/`), and the
Admin composables early-return before the fetch when unauthenticated (`useAdminTags.ts:50`
`if (!token) return;`). I synthesised it (`D2-probe4.mjs` → `probeD-errorspecies-{light,dark}.png`,
built from `EmptyState.vue:14–27` verbatim against the live `data-v-7acf0aa0` scope) purely to measure
it; that is a reconstruction, not a witness.

A species that has never been photographed is a species nobody has judged. Given D-2 is *about* that
species, the mega-tranche needs a fault-injection arm before the register can close.

### D-20 · MINOR · Forced colors keeps the decoration's chroma and flattens all three text ranks

`probes/probeD-forcedcolors-adminusers.png` (Chromium, `forcedColors: active` — the tracked
`forced-colors-desktop/adminusers.png` did **not** take, because WebKit ignores the emulation, so that
matrix arm is void for this component).

Measured: eyebrow, message and hint all resolve to `rgb(0,0,0)` — the `--ink-muted` rung is overridden
away, so the entire colour-borne hierarchy of D-3 collapses to one register. Meanwhile the mark keeps
its pink dashed stroke and its `--accent-live` fill. The single element that should drop first is the
only one that survives with colour. `VISUAL-CONSTITUTION.md:82`: "Text, focus, boundaries and state
meet their rendered contrast **on the actual material tier**; a token name is not evidence."

### D-21 · MINOR · The motion contract lives in the consumers, so 4 of 7 hosts hard-cut

The two species are sibling roots with no transition of their own. Consumers therefore diverge:

```
BrowsePane.vue:41            <Transition name="vj-morph" mode="out-in">   ✔ (keys: developing/error/wall)
AdminUsersPanel.vue          <Transition> present                          ✔
MixSourceSelector.vue        <Transition> present                          ✔
AdminTagsPanel.vue           none                                          ✘
AdminAuditPanel.vue          none                                          ✘
AdminFlaggedPanel.vue        none                                          ✘
AdminNamesPanel.vue          none                                          ✘
PaletteCardGrid.vue          none                                          ✘
```

`VISUAL-CONSTITUTION.md:141`: "A scene swap preserves the specimen and changes the surrounding
instrument. **No full-slab remount hole.**" Four Admin routes pop. Edict 6 is not breached (nothing
was deleted) but the animation was never *placed* — it was left to sixteen call sites to remember.

### D-22 · MINOR · Every empty plate is a polite live region, and the decorative eyebrow is inside the announcement

`:28` `role="status"` (implicit `aria-live="polite"`). Measured on `#/admin/users`:

```json
"liveRegions": [
 { "role": "alert",  "text": "dev misconfigured — run `npm run dev`" },
 { "role": "status", "text": "· roster clear ·No users found." },
 { "role": "status", "text": "· empty plate ·No saved palettes yet.Add colors ab…" }
]
```

Two polite regions per Admin route, and the authoritative count readout ("0 users",
`AdminUsersPanel.vue`) is **not** one. So the ornamented plate announces and the number stays silent —
the inverse of `VISUAL-CONSTITUTION.md:114`: "changed result count/state through the **owning status
region**." The Picker rule at `:182` is the general law: "never a routine live region: ordinary text
uses `aria-live="off"`."

And the announced string opens with `· roster clear ·` — a decoration (`EmptyState.vue:7` calls it
"the plate label") that is not `aria-hidden`, unlike the mark it sits under (`:43`). The component
hides its silent ornament from AT and reads its visual ornament aloud.

---

## G. The eyebrow — MAJOR, and it belongs to no section above

### D-23 · MAJOR · The eyebrow restates the message at 10 of 10 live sites

| site | eyebrow | message |
|---|---|---|
| `PalettesPane.vue:78` | `· empty plate ·` | No saved palettes yet. |
| `BrowsePane.vue:84` | `· the commons ·` | No published palettes here yet. |
| `MixSourceSelector.vue:241` | `· nothing to mix ·` | No saved palettes yet. |
| `AdminUsersPanel.vue:63` | `· roster clear ·` | No users found. |
| `AdminUsersPanel.vue:138` | `· none pinned ·` | No palettes. |
| `AdminTagsPanel.vue:82` | `· no tags minted ·` | No tags yet. |
| `AdminAuditPanel.vue:56` | `· ledger clear ·` | No audit entries found. |
| `AdminFlaggedPanel.vue:39` | `· nothing flagged ·` | No flagged palettes. |
| `AdminNamesPanel.vue:42` | `· queue clear ·` | No pending proposals. |
| `AdminNamesPanel.vue:92` | `· none approved yet ·` | No approved color names. |

Ten of ten (nine distinct; `dots`-bearing). **Not one eyebrow carries information the message does
not.** It is the same proposition in a second typeface.

`safari-mobile-light/admin-users.png` shows the density that produces: the mobile Users plate states
the same fact **four times** in one screen — heading badge `0`, the `0 users` readout, `· ROSTER
CLEAR ·`, and `No users found.`

`PROPORTION-AUDIT.md:34`: rationale must say "what comprehension/action improves; **'prettier' is
invalid**." `:71`: "Subtraction precedes explanation."

The Q6 ruling quoted at `EmptyState.vue:7` ("this annotation class survives ONLY here, on TRUE
EMPTY") narrowed *where* the annotation may appear. It never established *what it says*. Ten sites
later, it says nothing.

Secondary defect in the same string: the `· … ·` frame is presentation encoded as content, repeated
across ten literals in seven files. Changing the frame is a ten-file edit; the component cannot own
its own punctuation.

**Cure.** Either the eyebrow carries the datum the message cannot — the **count** and the **scope**
(`2 saved · 0 shown`) — which is exactly what D-1's `filtered` arm needs, or it is subtracted. There
is no third option in which it repeats the sentence below it.

---

## H. Negative proofs — claims I tried to make and could not

Recorded so the arbiter can see the boundary of the attack.

**N-1 · The mark is canon-shaped.** `VISUAL-CONSTITUTION.md:186` requires "exactly three
WatercolorDots plus the established dashes." There are exactly three (`:45–47`), and the dashes are
real: `glass-ui.css` `.watercolor-ghost-stroke { border: 2px dashed var(--watercolor-color) }`,
confirmed rendered in `probeD-light-trio-crop.png`. **No finding.** (D-6/D-7 are about *where* and
*who owns it*, not shape.)

**N-2 · The plate content-hugs.** Canon `:186` requires the true-empty invitation to content-hug.
Measured exactly: 185.17 px = 32+44+10+21.58+10+35.59 and 218.14 px = …+10+22.97. Zero reserve, zero
min-height of its own. **No finding.**

**N-3 · Motion is clean.** `animationName: none` on all three dots; `animate` defaults `false`
(`WatercolorDot.vue.d.ts:35`) so no rAF is started; the only transitions are producer-owned
(`transform .2s, border-radius .6s, filter .2s, box-shadow .2s`) and nothing in this component
triggers them. Nothing animates a layout-forcing property. `prefers-reduced-motion` is vacuously
satisfied. **No finding** — and note `reduced-motion-desktop` in `STATES.json` reports
`rafPer1500ms: 0` on `#/browse`. Edict 6 (animations never deleted) is intact: none existed here.

**N-4 · `?: T | undefined` is required, not noise.** `tsconfig.base.json:11` sets
`exactOptionalPropertyTypes: true`, so the explicit `| undefined` on all six optional props
(`:74–88`) is correct. **No finding.**

**N-5 · `verbatimModuleSyntax` is satisfied.** Both imports (`:69`, `:70`) are value imports of
components; there is no type-only import to mark. **No finding.**

**N-6 · No god module.** 105 lines, one responsibility, no barrel, no util drawer. Edict 1 intact.
**No finding.**

**N-7 · The mark is properly hidden from AT.** `aria-hidden="true"` on the wrapper (`:43`) and,
independently, on each producer `<span>`. **No finding.** (D-22 is about the *eyebrow*, which is not.)

**N-8 · No horizontal overflow ships today.** `../../visual/REPORT.md` → `horizontalOverflow — 0`
across all 60 captures; my own `documentElement.scrollWidth == clientWidth` at 320, 390 and 1440.
D-17 is latent, and I have labelled it MINOR for exactly that reason. **No finding beyond D-17.**

Additionally **retracted** during this pass: an earlier measurement suggested the plate overflows its
host by 7.5 px with ordinary long copy. Re-measured on the real mounted component
(`D2-probe4.mjs`, `mutate_1440/390/320`) the `<p>` clamps to the host every time (462/324/254 px).
The first reading was an artefact of appending a second grid item. Only the **unbreakable-token** case
overflows, and that is what D-17 now claims.

---

## I. The gestalt cure

One transposition retires D-1, D-2, D-6, D-23 and most of the rest; the remainder are token moves.

**1. The component models the reason, not the picture.** Replace `variant` + `message` + `eyebrow` +
`hint` + `dots` with the discriminated union from D-1. `empty` earns the mark and the CTA; `filtered`
earns the count and *Clear*; `failed` earns the detail and *Retry*; `unavailable` renders as a strip
over retained rows. The mark's scope becomes structural, so `dots` cannot be defaulted wrong.

**2. The mark becomes the primitive the canon already named.** `EmptyPaletteMark` lands in glass-ui
owning three diameters, proportional `--watercolor-ghost-weight`/dash, `aria-hidden`, and a
**graphics**-floored accent instead of the ink guard. `EmptyState` renders one tag; D-4, D-7, D-8 and
D-15 close together, and the ten-line `N-3 RE-AIMED` comment block is deleted rather than amended.

**3. One `FailurePlate` composition, actually shared.** `EmptyState`'s failure arms, `ErrorBoundary`
and `Markdown`'s doc-miss all consume it. D-14's three geometries collapse to one; the three comments
claiming shared-ness are replaced by code that is.

**4. The rhythm is trimmed, then tokenised.** `text-box: trim-both cap alphabetic` on the text rows so
the token equals the ink, then two tokens — `--empty-title-gap` and `--empty-section-gap` — for the
two canon ranks. D-9 closes with measurement rather than taste.

**5. The de-emphasis rung gains a ceiling.** `--ink-muted` holds ≥ 12 OKLCH L-points from
`--foreground` in both schemes, resolved by moving the plate, not the ink. D-3, D-5 and half of D-20
close at the boot writer, once, for all 33 consumers of the token.

**6. Measures leave `ch` for the display face.** `--measure-display` in `em`; `ch` survives only on
the mono rows. `overflow-wrap: anywhere` applies to all three text rows, not one. D-10 and D-17 close.

**7. The status role moves to the count.** The plate drops `role="status"`; the owning result-count
region announces, and the eyebrow — if it survives §G at all — carries the count rather than a second
copy of the sentence. D-22 and D-23 close together.

What must **not** happen: another prop, another comment block explaining why the current shape is
correct, or a per-instance override that makes one route look right. The file is 101 non-blank lines,
**43 of them comment/doc citing rulings** against 58 of code (counted, `EmptyState.vue`); the next
edit should remove ruling-citation, not add it.

---

## J. Concordance with pass 1

Pass 1 (`./challenge-D-design.pass1.md`, 22 findings) and this pass were produced independently. They
converge on the chroma/scheme block, the mark's scope and ownership, the flat rhythm, the type-matrix
breach, and the state-coverage tail — which is strong cross-validation of those.

**This pass adds, as new material:**

- **D-1 (BLOCKER)** — the filtered-zero falsehood, with a rendered reproduction. Absent from pass 1.
- **D-15** — `tag="div"` against a prop glass-ui 7.0.0 deleted. Absent from pass 1.
- **D-23** — the eyebrow's 10-of-10 redundancy tabulated site by site, promoted to MAJOR.
- Rendered-pixel contrast for D-3 (4.65/10.81 vs 4.96/5.54) and a per-row ink scan for D-9
  (14 : 23 : 16), replacing token-level argument with measurement.

**This pass retracts** pass 1's overflow-by-7.5 px claim for ordinary copy (see §H); the finding
survives only for the unbreakable-token case, as D-17.

Pass 1 additionally raises a *no-CTA-anywhere* finding and a *two-plates-out-of-vertical-register*
finding that I did not independently reach; I have not re-verified them and do not carry them here.
The arbiter should read both files.
