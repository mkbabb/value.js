# OWNER RULING — card width tightening (2026-07-05, mid-round-2)

## §0 Verbatim owner text (wins over any encoding below)

> Ecoute-moi: the layout needs a bit of work. We should have tighter, less wide, cards for
> both the picker and the rightside about the spaces (and that slot in general). They should
> be about 1/3 smaller in width, maybe a bit less, maybe 1/4.

Delivered with a 1440-class screenshot of the Lab picker plate at the current full clamp.

## §1 Encoding

- **Surface**: the pane clamp ladder, `demo/@/styles/style.css:250-252` — `--pane-min: 30rem`
  · `--pane-max: 44rem` · the grid-owned `min()` clamp (two max cards + gutter ≈ 1434px).
  Both cards (picker left, About/right slot — "that slot in general") ride these tokens, so
  the ruling lands as a token change, not per-card CSS. Mobile's single-slot
  `max-w-md sm:max-w-lg` is already tight — untouched unless visual verify says otherwise.
- **Magnitude**: 25–33% off the width — `--pane-max` 44rem → **~30–33rem** (1/4 off = 33rem;
  1/3 off = 29.3rem). The exact value is a taste call INSIDE that band, verified in the
  browser at 1440 light+dark. `--pane-min` must drop below the new max (≈24–26rem) so the
  dual grid keeps its floor semantics.
- **Interactions to verify, not assume**: the W4-2 readout one-line lock (per-space
  reservation table) at the new width — in-card type rides `cqi` (the pane-wrapper is a size
  container) so it should scale, but the wide spaces (Lab/OKLCh) are the risk rows; the
  dual-pane-1440 e2e spec; the portrait band (≥1024 aspect<1.1 single-slot grammar); the
  `--content-max-h` proportion (a much narrower card may want no change — decide by eye,
  record the call).
- **Timing**: lands NOW on mainline (the round-2 waves are mid-flight; the W4 π-close + taste
  review and both wave gates will judge the NEW geometry — correct, since the ruling
  supersedes the old baseline). The W3 CSS-diet lane touches `style.css`'s import block only;
  the token block is disjoint — rebase-clean by construction.
- **Downstream**: W5 (cards wave) builds atop the new geometry; the §6.1 π matrix states
  inherit it. Any W4/W3 gate row that fails BECAUSE of the narrowing is remediated forward
  against the ruling, never reverted.

## §2 Implementation record

**Landed 2026-07-05** (implementing lane, browser-verified at 1440×900 light + dark).

- **Chosen values**: `--pane-max: 44rem → 32rem` (**~27% off** — "about 1/3 smaller,
  maybe a bit less"); `--pane-min: 30rem → 25rem` (below the new ceiling; the dual-grid
  `minmax()` floor semantics kept). Grid clamp comment arithmetic updated:
  two max cards + gutter ≈ **1050px** (32rem × 2 + 1.618rem), was ≈ 1434px.
- **The why (candidates tried by eye, dev :9010, Lab dual-pane)**:
  - *44rem (before)*: cards ≈ 670px each, container ≈ 1434px at 1440 — the spectrum
    plate a ~2.9:1 banner, sliders runways, ~20px of page margin. The complaint, confirmed.
  - *32rem (chosen)*: cards 512px, container 1042px — ~200px of real margin each side at
    1440; the plate drops to ~2.1:1 and reads as an instrument card; sliders proportionate;
    the About card's Components row ("a* (Green-Red)" / "b* (Blue-Yellow)") holds one line.
  - *30rem (tried, rejected)*: cards 480px — the picker is fine but the About card starts
    strangling: the Components labels wrap **mid-word** ("a* (Green-\nRed)"). The extra
    2rem buys exactly that legibility; 32rem is the tightest width that doesn't cost it.
- **Readout lock verify (W4-2 reservation table)**: all catalog spaces probed live at the
  new 512px pane — lab, oklch, oklab, **ictcp**, **jzazbz**, xyz, lch, hsl — every one
  `lockedLines 1 = actualLines 1` (readout height 38px = min-height 38px, font 33.8px).
  The `cqi` constancy holds as designed: **no reservation-constant tuning**;
  `READOUT_LINE_CAPACITY_CH = 20` stands (new-band arithmetic: 512px → 20.1ch,
  400px → 20.1ch). Only the derivation comment's worked examples in
  `readoutReservation.ts` were updated from the stale 704/480 band.
- **Other verifies**: portrait 1080×1750 — single-slot grammar intact (one mounted
  mobile slot, `display:flex`, 512px, centered); mobile 390×844 — untouched (358px wide,
  `max-w-md`/448px clamp governs, the ruling's mobile carve-out holds); dark 1440 —
  warm dark-material cards at the same 512px geometry, no overflow.
- **Suites**: eslint 0 · vue-tsc (lib + demo) 0 · vitest **2096/2096** ·
  playwright `smoke` **27/27** (dual-pane-1440 + page-load included) ·
  `smoke-reactivity` **2/2**. **Zero e2e assertion updates needed** — no spec asserts
  the old pixel geometry (dual-pane-1440 asserts pane *visibility* + cascade root).
- **Files**: `demo/@/styles/style.css` (token block + two comment sites),
  `demo/@/components/custom/color-picker/readoutReservation.ts` (comment only), this doc.
