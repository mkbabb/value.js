# CHALLENGE-D — `PaletteCardMeta.vue` design audit

## Receipt

Source `demo/palettes/browser/card/PaletteCard/PaletteCardMeta.vue`, lines 1–64, SHA-256 `95dd9725de21b2c00e3a2c46f08606abd2afa1a5426d5fbd970b60971cb13c16`. Static tranche audit; no execution.

**Verdict: SOURCE-RED.** The metadata row is compact, but it collapses provenance, taxonomy, version, and voting into one low-contrast strip and has no honest busy/failure state.

## Findings

1. Four information classes compete at the same micro-text weight. The user cannot quickly separate provenance (fork), recency (version), classification (tags), and action (vote).
2. Only three tags render, with no `+N` overflow or affordance to inspect the remainder. The visible taxonomy can therefore understate the palette.
3. Fork/version meaning is carried mainly by icons and `title`; title tooltips do not serve touch users and are not a dependable accessible description.
4. The heart is a high-salience red action inside otherwise muted metadata. No pressed/busy/failure or count-update feedback is designed.
5. Long tags and large counts have no wrapping/truncation policy, so the row can collide with the vote control on narrow cards.

## Direction and states

Treat provenance as a quiet first line, tags as a horizontally readable chip row with explicit overflow, and voting as a named trailing action. Required cells: no metadata, fork only, version only, 0/1/3/4+ tags, long/localized tags, unvoted/voted/pending/rejected, zero/large count, phone/desktop, keyboard/touch. This remains a source design finding until real Safari/iOS evidence exists.
