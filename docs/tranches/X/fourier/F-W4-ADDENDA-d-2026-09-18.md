SERVED MODEL: claude-opus-5[1m]

# X·F · F.W4 · unit `.d` — dated addenda-beside (2026-09-18)

**Scope**: §2.A `fr-AdminAuditLog` · §2.B `fr-AdminFlaggedPanel` · §2.C `fr-AdminUserList` · §2.J the `/gallery` route.
**E-3**: nothing upstream is edited. Every entry below is a correction *beside* an immutable record, or a hand-off addressed to the seat that owns the bytes.

---

## §A · Falsified census cells (`G-F4-CENSUS-CELLS`)

Each cell below was TRUE at the pin its record was written against and is FALSE at the **adopted glass-ui 8.0.0 pin**. Each landed in the same commit as its cure, per the gate.

### A-1 · `@utility text-admin-label` does not exist at 8.0.0

- **Record**: `fr-AdminAuditLog` **AA-15**, cure clause: *"the installed pin ships `@utility text-admin-label` (semantic.css:213-220, `--type-admin-label: 0.625rem`, mono+uppercase+caps-tracking+500), live at 7 sites in 4 files incl. both siblings — the one-line cure, no uplift."*
- **Measured at this seat**, over `web/node_modules/@mkbabb/glass-ui/dist`:
  - ⟨cmd⟩ `grep -ro 'text-admin-label' .` → **empty**
  - ⟨cmd⟩ `grep -ro '\-\-text-admin-label[^;:]*' .` → **empty**
  - ⟨cmd⟩ `grep -ro 'admin[a-z-]*' styles/` → **empty**
  - the string `admin-label` survives **only** inside `cn`'s class-name bucket regex in `class-names-q-UGOkHH.js` — i.e. the merge function still knows the bucket, and no utility is emitted into it.
- **Disposition**: the rung is real, the *name* is not. `@utility text-mono-micro` **is** emitted (`styles/typography/utilities.css`) and carries mono + `--type-micro` (`0.6875rem`) + caps-tracking — the same recipe, and the rung `AdminUserList.vue` already uses for this exact job. AA-15's cure lands on `text-mono-micro` at both its sites plus the flagged-panel meta line.
- **⊘ Not a substitution of the cure**: AA-15's defect is an off-scale magic `text-[0.65rem]`; the cure is "a real scale rung". Only the rung's spelling changed with the pin.

### A-2 · `./forms` does not exist at 8.0.0

- **Record**: `fr-UserSlugBar` **FR-USB-12** (*"the cure ships at the pin behind `./forms` (`Input` declares `autocomplete/pattern/name/…`; `useUserInvalidAria` exported)"*) and `fr-AdminUserList` **FR-AUL-6** (*"glass-ui exports `./forms` → `Input` with base class `input-pill`"*), **FR-AUL-23**, **FR-AUL-40**.
- **Measured**: the 8.0.0 export map has **no `./forms` key**. In its place: `./input`, `./label`, `./labeled-field`, `./search`, `./textarea`, `./number-field`. `Input`'s base class at 8.0.0 is **`field-control glass-control-edge`**, not `input-pill`; its root is the `<input>` itself with `inheritAttrs: false` + an explicit `forwardedAttrs` merge, so `id`, `aria-*` and the native hygiene attributes still ride through. `useUserInvalidAria` remains exported from the root barrel.
- **Disposition**: the primitive is the same and the cure is unchanged; the import specifier is `@mkbabb/glass-ui/input`. Applied at `AdminUserList.vue` (FR-AUL-6/-23/-40) and `UserSlugBar.vue` (FR-USB-5/-12/-14).

### A-3 · `ButtonTone` has no `warning` member

- **Record**: `fr-AdminUserList` **FR-AUL-7** names the prune control's amber literals (≈1.3:1) as the defect and the producer register as the cure.
- **Measured**: `ButtonProps.tone` is `Extract<Tone, "neutral" | "destructive">` — the producer states the sub-range law in its own docblock: *"A command is neutral or it is destructive; `success`/`warning`/`info` are message tones and live on Alert/Toast, where a surface reports rather than acts."*
- **Disposition**: there is no amber command register to move to, and inventing one at the consumer would be the frontend hack §5.1(6) forbids. `tone="destructive"` + `emphasis="secondary"` is the honest register: prune **deletes users**. Recorded rather than silently chosen.

---

## §B · Hand-offs to `e2e/contrast-pairs.ts` (unit `.g`'s file) — `G-F4-CONTRAST-FLOOR`

`e2e/contrast-pairs.ts` is **not** in `.d`'s writable set. `G-F4-CONTRAST-FLOOR` therefore reads **RED at this seat** on eleven of my rows, and the cause is that the registry's `stack` expressions still spell the **pre-cure** recipes: the harness is a static token-expression evaluator, so it grades what the file says, not what the DOM now paints.

**The independent DOM-side reading**, taken this round against a production build at `http://localhost:4173` with `e2e/gallery-admin-a11y.spec.ts` (`.g`'s spec, unmodified): axe reports **zero `color-contrast` violations** across the admin banner and all three admin panels. Every serious finding that remains is `focusable-not-tabbable` (×8) and `aria-hidden-focus` (×4) on **one** node shape — see §C-1.

The exact row replacements `.g` should apply (the cures are landed; only the expressions are owed):

| row | old `stack` | new `stack` | note |
|---|---|---|---|
| `GAB-1[plate/page]` | `["var(--background)", "rgb(245 158 11 / 0.04)"]` | `["var(--background)", "color-mix(in srgb, var(--viz-amber) 10%, transparent)"]` | **stays RED with cause** — see §D-1 |
| `GAB-1[border]` | `["var(--background)", "rgb(245 158 11 / 0.3)"]` | `["var(--background)", "var(--viz-amber)"]` | measured ≈4.72:1 light at this seat |
| `GAB-1[--tier-featured value]` | `[…, "rgb(245 158 11 / 0.04)", "var(--tier-featured)"]` | `[…, "color-mix(in srgb, var(--viz-amber) 10%, transparent)", "var(--tier-featured)"]` | the numeral's own token is a **producer** register → §C-2 |
| `GAB-1[--tier-saved value]` | as above with `--tier-saved` | as above with `--tier-saved` | same |
| `AA-3[delete]` | `["var(--card)", "rgb(239 68 68 / 0.1)", "rgb(252 165 165)"]` | `["var(--card)", "var(--destructive)", "var(--destructive-foreground)"]` | Badge `tone="destructive"` |
| `AA-3[set_user_status]` | amber triple | `["var(--card)", "var(--warning)", "var(--warning-foreground)"]` | Badge `tone="warning"` |
| `AA-3[set_tier/dismiss]` | emerald triple | `["var(--card)", "var(--success)", "var(--success-foreground)"]` | Badge `tone="success"` |
| `AA-3[batch]` | violet triple | **DELETE THE ROW** | the violet arm no longer exists — §D-2 |
| `AA-3[default]` | sky triple | `["var(--card)", "var(--secondary)", "var(--secondary-foreground)"]` | `variant="secondary"`, `tone="neutral"` |
| `FR-USB-5[resting-border]` | `["var(--card)", "color-mix(in srgb, var(--foreground) 12%, transparent)"]` | the producer's `field-control glass-control-edge` resting edge | the raw field is gone (§A-2) |
| `FR-USB-5[focused-border]` | `["var(--card)", "color-mix(in srgb, var(--foreground) 30%, transparent)"]` | the producer's `focus-ring` | ditto |
| `FR-USB-5[placeholder]` | `["var(--card)", "color-mix(in srgb, var(--muted-foreground) 40%, transparent)"]` | `["var(--card)", "var(--muted-foreground)"]` | the `/40` wash was the consumer's |

⊘ `FR-AUL-7`'s two rows are not in the registry and should be **added** by `.g` if the floor is to grade them: the suspended chip is now `Badge tone="destructive"` and the prune control `Button tone="destructive" emphasis="secondary"`.

⊘ The registry also records **DRIFT** on five rows (`AA-3[default]` banked 1.36–1.81, live 1.219; `AA-3[set_tier/dismiss]` 1.289; `AA-3[set_user_status]` 1.243; `GAB-1[--tier-featured value]` banked 1.45, live 1.536; `GAB-1[--tier-saved value]` banked 2.58, live 2.731). The live reading governs per the harness's own rule; recorded here so the drift is not re-discovered as a new finding.

---

## §C · GLASS-RELAY asks and notes, collected for `.z`

**C-1 · ASK (new, measured this round).** reka's FocusScope sentinel — `<span aria-hidden="true" tabindex="0" style="position: fixed; …clip-path: inset(50%)…">` — is emitted into the `/gallery` route by a producer overlay and is graded **serious ×12** by axe: `focusable-not-tabbable` ×8 and `aria-hidden-focus` ×4, one node shape, every occurrence. It is producer DOM reached through `@mkbabb/glass-ui/dialog`; no consumer edit can cure it without the local patch §0 forbids. The sentinel needs `tabindex="-1"` (or to leave the a11y tree another way) at the producer. **This is the sole remaining serious class on the admin surface** and therefore the sole thing standing between `G-F4-ADMIN-AXE` and green.

**C-2 · ASK (carried, GAB-9 / GAB-2(a)).** `--tier-featured` (1.536:1 light) and `--tier-saved` (2.731:1 light) are producer registers below the 4.5:1 text floor in the light arm. Painting a local value over them at the consumer would be the frontend hack §5.1(6) forbids; the light rebaseline is the producer's.

**C-3 · ASK (GCM-31, producer leg).** `cn`'s closed rounded enum carries **both** `rounded-dialog` and `rounded-xl`, so which wins is decided by emission order rather than by either author. Teach `cn` its own aliases so the pair cannot both survive a merge. ⊘ The **site** leg is landed here (the consumer's `rounded-xl` is dropped from `DialogContent`), which is F.W4's half; this is the other half and it is a relay, not a hack.

**C-4 · NOTE, NOT AN ASK (AA-3's violet `batch` tone).** AA-3's ruling offers an ADOPTION-ASK for a violet register because 7.0.0's five-member TONES has no home for it. **That ask is withdrawn with cause**: AA-24 rules the batch arm's own existence the defect — `batch_users:delete` fell past the `delete` arm into violet and rendered pixel-identical to `batch_users:unsuspend`, a severity inversion inside the map. `batch` is a namespace, not a severity. Asking the producer for a violet tone would ship that inversion into the design system. `.z` should carry this as a note so no later seat re-opens the ask from AA-3's text alone.

**C-5 · NOTE (GCM-6).** The library ✕ is a bare 16×16 target and the coarse floor keys `[data-size="icon"]`, which reka's `DialogClose` does not carry. Not cured at 8.0.0 either (re-checked at this pin). The row is ESC-1/G1-gated by its own contingency note and stays where the spec puts it.

---

## §D · Rows named RED-with-cause, and rows NOT landed

**D-1 · `GAB-1[plate/page]` — RED with cause, by arithmetic, not by omission.**
The admin plate is a **wash**. Measured at this seat against the light page (`--background` `hsl(40 30% 98%)`, `--viz-amber` `hsl(35 76% 35%)`), a 4%- or 10%-alpha fill of any hue cannot reach 3:1 against the page *and remain a wash*; the only fill that clears the floor is one that stops being a tint. The admin register is therefore carried by the **border** and the **mark**, both of which now read ≈4.72:1 (from 1.25–1.27 and 1.60). GAB-1's other three cells are cured; this one is a reading, not an excuse.

**D-2 · `AA-3[batch]` — the pair no longer exists.** See §C-4. `.g`'s registry row should be deleted rather than re-expressed.

**D-3 · `AA-40` — half landed, half posed.** The assistive half is landed (the full IP hash is real `sr-only` text; `title` is kept for the pointer, so nothing regresses). The **sighted-keyboard** half is a design ruling this unit was not given: a per-cell Tooltip trigger adds two tab stops to each of 25 rows (a 2.4.3 cost the row does not weigh), and a per-row disclosure is a new control. Routed to F.W5–W8, named rather than silently dropped.

**D-4 · `GCM-38` — posed, not answered, as the row instructs.** The detail view drops the card's graph-paper motif and flips three image axes at once (4/3→16/10, cover→contain, 85→100%), none of them stated. The row's own terminal makes the cure a decision this wave **poses**: *which of the three flips is intended?* Posed here; the rendered witness is → SS-13.

---

## §E · ESCALATIONS — work the spec assigns to `.d` that `.d`'s bounds cannot reach

**E-1 · `FR-GFC-1` = `FR-GSB-1` — the inert search controls. NOT LANDED.**
Measured: `stores/gallery.ts` builds **both** list requests (`fetchNextPage`, `resetAndFetch`) from `{ limit, sort, cursor, owner }` alone — `searchQuery`, `tierFilter` and `basisFilter` never reach the wire. `GalleryView.vue` does assign all four refs and watches three of them, so the controls *appear* live and destroy pagination on every change (`resetAndFetch` wipes the accumulated list to refetch the same unfiltered first page). **Three of four search controls are inert end-to-end**, exactly as banked.
The cure requires extending `api.listVisualizations(params)` — `web/src/lib/api.ts`, **unit `.f`'s file**. Writing the store half alone would half-land it (a store passing parameters the client drops), and the spec's own note routes the list *contract* to F.W5. Escalated whole; the store-side edit is two lines once `.f` widens the signature to `{ search?, tier?, basis? }`.

**E-2 · `GCM-1` / `GCM-25` / `VV-BLK-1` — the restore family's sibling half. NOT LANDED.**
`GCM-3`'s half **is** landed (`GalleryView.vue`: `selectedSlug` + a computed lookup through `gallery.entries`, so the modal is a view of the entity rather than a photograph of it, and `GCM-24`'s in-place `patchEntry` is visible where the user acted). The loader half lives in `VisualizationView.vue` and `stores/workspace.ts`, neither in this unit's writable set. Escalated as a named block rather than half-landed.

**E-3 · `AA-37` — `components/admin/` directory move. NOT LANDED.** The structural precondition AA-9's port cites is a directory move outside `gallery/**`. Escalated.

**E-4 · `FR-AFP-17` — `VARIANT_MAP` `success → 'success'`. ROUTED TO `.f`.** The map lives in `composables/useToast.ts`, `.f`'s file. The spec is explicit that deferring this to F.W1 is a *scheduling error*, so it is routed now, not deferred: `.f` should map the `success` key to the `'success'` variant at the pin; the adapter rewrite still rides F.W1.

**E-5 · `AA-27` / `FR-AUL-3` — the `adminFetch` registry key shape. ROUTED TO `.f`.** The abort registry keys on the full query-bearing path, so a same-path request self-aborts while a different-path one paints last-to-resolve. SP-1 books component instances only; the seam is `lib/api.ts`. `.d` landed every component-side generation token (`AA-8`/`AA-1`/`AA-7`, `FR-AFP-14`/`-48`, `GAB-20`/`-21`, `FR-AUL-2`/`-4`); the key shape is `.f`'s.

**E-6 · `FR-AFP-36` — `content_hash` omitted client-side.** `FlaggedVisualization` does not declare `content_hash`, so `FR-AFP-15 ⇢ FR-AFP-56`'s banked natural key `(content_hash, reporter_slug)` cannot be spelled. `lib/types.ts` is `.f`'s file and the emission row is routed F.W5. The splice model is keyed on `(item.slug, flag.reporter_slug)` instead, **documented in-code at the site** rather than silently substituted.

**E-7 · `GAB-28` — the banner's `aria-label` rename. NOT LANDED.** The rename would break the locator `getByRole("region", { name: "Admin mode banner" })` in `.g`'s `e2e/gallery-admin-a11y.spec.ts`, which `.d` may not edit. Deferred so the two seats do not land a cure and a breakage in the same wave.

---

## §F · Fold register (no fold adds an edit)

- `GCM-48` → `GCM-30` → `GCM-28`: **one deletion**. The retired-Teleport wrapper residue at `GalleryCardModal.vue` is gone; the nested equal-12px radii (`GCM-30`) stop existing rather than being corrected; `GCM-28`'s stat-row delta dies inside that dedup. `GCM-30`'s sliver readback stays → SS-13 as banked.
- `GCM-44` + `GCM-4`: **one edit** — `@open-auto-focus.prevent` onto the new `DialogTitle`.
- `FR-AUL-6` + `FR-AUL-23` + `FR-AUL-40`: **one swap** — the `Input` primitive.
- `FR-USB-5` + `FR-USB-12` + `FR-USB-14`: **one element rework**.
- `AA-3` + `AA-19` + `AA-20` + `AA-24` + `AA-5`(display): **one classifier**.
- `GCM-37` contributes the modal's site to the dead-`@reference` census; it is **not summed** with `FR-GFC-15`'s 9-file figure (CS-i-7's tally law). The sweep re-derived once at this seat: 11 gallery SFCs, 3 blocks at zero rules (deleted whole), 2 dead `@reference`s in blocks that keep their rules (deleted), 2 blocks genuinely using `@apply`/`theme()` (kept), 1 file with no block at all.
