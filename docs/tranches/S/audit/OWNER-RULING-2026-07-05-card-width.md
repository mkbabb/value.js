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

(appended by the implementing lane)
