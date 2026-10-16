SERVED MODEL: claude-opus-5-5

# Addendum beside `pc/measure.mjs` + `pc/pred.js` (dated 2026-10-16; E-3: the instrument bytes are not rewritten)

KF.W13X RESUME 2 Repair 1 (Check 1 C1r2-6; Close R-4 (a)). `pred.js:70` names the Spring control `.spring-heatmap[role=application]` at rest. X-DS has since folded the heatmap behind its figure title (`.spring-heatmap-section [data-figure-title]`), so at rest the named control is absent and the spring PC1 / PC1i cells read RED by the instrument (`named:{"found":false}`), not by the page.

- **Reading rule from this date:** the spring PC1 / PC1i cells are read by `pc2/probe.mjs`, which presses the figure title first (`pc2/probe.mjs:29`) and then measures the opened heatmap (close3 `served/pc2-r{1,2}.log.txt`: GREEN ×2 at 1024 and 1440, light and dark). The easing cells and PC2 (corners) stay with `pc/measure.mjs`.
- A re-run of `pc/measure.mjs` that reports spring `named.found=false` is this drift. It is not a product RED, and it is never read as a GREEN either.
