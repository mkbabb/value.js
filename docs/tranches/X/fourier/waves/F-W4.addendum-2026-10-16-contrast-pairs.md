SERVED MODEL: claude-opus-5-5

# F-W4 §4 · G-F4-CONTRAST-FLOOR — dated addendum 2026-10-16: the pair list re-pointed to today's paint (F.REL `.w2`)

**Authority.** COHESION §0fk.1 (ESC-FREL-w-1 ruled (a)); `fourier/waves/F-REL.md` ADDENDUM (d) `.w2`. This file sits beside `F-W4.md` §4 (the `G-F4-CONTRAST-FLOOR` row, `F-W4.md:370` ff.) under E-3: §4 is not edited; this addendum records how its pair list reads at fourier `web/e2e/contrast-pairs.ts` after `.w2`. **Floors are unchanged** (non-text ≥ 3:1, text ≥ 4.5:1, both arms). No pair is skipped. No contrast test id is held.

## 1. Re-pointed rows (stale stack → the expression that paints today)

| §4 pair | Stack frozen at F.W4 | Stack after `.w2` (read at the bytes) | Floor (kept) |
|---|---|---|---|
| FR-MSP-7 | `--muted` 60% `.info-chip` plate on `--background` | glass `Metric` inline label ink `--muted-foreground` on `--background` (`.info-chip` deleted, FMD-12 / DS-F3-C13); plus `FR-MSP-7[phase-value settle|morph]`, the one consumer ink, `color-mix(in oklab, <tone> 75%, var(--foreground))` | non-text 3:1 (the two phase rows: text 4.5:1) |
| PSM-4 ×3 (`@40%` `@45%` `@50%`) | `--muted-foreground` diluted 40/45/50% on `--background` | `--muted-foreground-strong` on `--background` (`PaperSearchModal.vue` `.search-palette-hint`); the three ids kept for life | text 4.5:1 |
| FR-EQR-7[instance] | `rgb(34 197 94)` on `--card` | `var(--section-color-4)` on `--card` (`EquationResult.vue` `.copy-ok`) | non-text 3:1 |
| AA-3 ×5 | Tailwind `-300` inks on `/10` plates over `--card` | glass `Badge`: `delete` → `bg-destructive text-destructive-foreground`; the other four → outline/neutral `text-foreground` on `--card` (`AdminAuditLog.vue` `AuditActionCell`) | text 4.5:1 |
| GAB-1[plate/page] | `rgb(245 158 11 / .04)` on `--background` | `color-mix(in srgb, var(--viz-amber) 10%, transparent)` on `--background` (`GalleryAdminBanner.vue` `.admin-banner`) | non-text 3:1 — **RED-with-cause, held by pair id** (§3) |
| GAB-1[border] | `rgb(245 158 11 / .3)` on `--background` | `var(--viz-amber)` on `--background` | non-text 3:1 |
| GAB-1[--tier-featured / --tier-saved value] | tier ink over the `.04` wash | tier ink over the 10% `--viz-amber` wash | text 4.5:1 — **producer, held by pair id** (§3) |

## 2. Retired

- **FR-USB-5 ×3** (`[resting-border]`, `[focused-border]`, `[placeholder]`), by the R-e-2 precedent (COHESION §0as). The credential field is glass `<Input>` (`auth/UserSlugBar.vue`, class `w-full fira-code` only), so all three paints are the producer's `field-control`. The producer reading rides the BK relay (§4).

## 3. Held by pair id (`web/e2e/producer-held.json` `pairs`)

`contrast-floor.spec.ts` reads the pair-level key, reports each named pair as held, and still fails the arm on any other pair. A held pair that passes in its banked arm, or a held id with no registry row, fails the arm.

| Pair | Held as | O-id | Expiry |
|---|---|---|---|
| GAB-1[--tier-featured value] | producer | O-97 | at glass 10.2.0 repin |
| GAB-1[--tier-saved value] | producer | O-97 | at glass 10.2.0 repin |
| HLG-37[grid-cell-fill] | producer | O-97 | at glass 10.2.0 repin |
| GAB-1[plate/page] | ruled residual (`.d` standing ruling) | — | standing ruling |

## 4. The six awaiting pairs, authored

The roster `PAIRS_AWAITING_THEIR_OWNER` is empty. Each stack is read from the code that paints it:

| Pair | Stack | Floor |
|---|---|---|
| FR-CP-D1 | `--card` · `color-mix(in srgb, var(--muted-foreground) 80%, transparent)` (canvas ink = computed `color` of the `text-muted-foreground` canvas; axes at `AXIS_ALPHA` 0.8, `lib/equation/grid.ts`) | non-text 3:1 |
| ECD D-5 | `--background` · `--muted-foreground` (glass `Metric` `.dock-count` unit ink) | text 4.5:1 |
| ECD D-6 | `--background` · `color-mix(in srgb, var(--foreground) 6%, transparent)` · `--success` (`.is-save.saved`) | non-text 3:1 |
| EV D·D-B3 ×4 | `--popover` · `--<tone>` · `--<tone>-foreground` for tiers symbolic/identified/spline (success/warning/info), plus the energy `Metric` unit `--muted-foreground` on `--popover` | text 4.5:1 |
| PS D-B2 | `--card` · `--muted-foreground` (`PaperTocDrawer.vue` `.sidebar-label`) | text 4.5:1 |
| PV D/M-8 | `--card` · `--muted-foreground-strong` (`PaperPageReadout.vue`; both hosts, the drawer rail and the phone bar, are glass `data-surface="opaque"` = solid `--card`, X-DS `5fbe1cf`) | text 4.5:1 |

## 5. Live reading at landing (fourier m/w1 `9338e26` + `b9bfdaa`)

⟨`guarded -- ~/.fourier-frel/w2-run.sh contrast-{1,2} e2e/contrast-floor.spec.ts --project=chromium` (`--workers=1`)⟩ → `3 passed` ×2 (rc 0, 10:23Z and 10:36Z). Every consumer row clears its unchanged floor in both arms; the four held rows read RED as held. The narrowest consumer rows: ECD D-6 light **3.032:1** (non-text), FR-EQR-7[instance] light 4.487:1 (non-text), FR-CP-D1 light 3.369:1, HLG-37[grid-cell-border] light 3.295:1, the ramp's worst stop light 4.645:1. The table is in the F.REL record, `### F-REL.w2`.
