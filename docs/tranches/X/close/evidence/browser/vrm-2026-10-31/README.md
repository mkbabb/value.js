SERVED MODEL: claude-opus-5-5

# X.W11.vrm — evidence (COHESION §0gy.3, §0gv.2)

Darwin host (the CI `visual` job's image is `macos-15` + SwiftShader, `ci.yml:193-195`; goldens live
under `goldens/darwin/` only — the `.vrb` anchor-drift-1 reading, unchanged at these bytes).

## 1 · keyboard-focus-desktop › gradient — root of the intermittency

- `runs/kf-r0.txt` — cell ×4 at `ce711ca3c`+ (pre-cure), `--retries=0`: 4301 / 575 / 4301 / 575 px.
- `runs/kf-r0-ground-edges.tsv` — the two states differ only by where the viewport-tall ground layer
  sits in the full-page capture: edges y=169/937 (the 4301 draws) vs y=178/946 (the 575 draws and the
  golden) — a 9 px `scrollY` difference.
- `probe/vrm-kf-probe.spec.ts.txt` + `runs/kf-probe1.txt`, `runs/kf-probe2.txt` — the walk logged per
  Tab: the 5th Tab focuses the pane's `fading-scroll` scroller and the document scrolls to bring it in
  view, to 169 or 178. In each 169 draw `overture-plate-settle` (the pane arrival keyframe,
  `translateY(-12px) rotate(-0.6deg)` → none, `demo/app/composables/boot/overture.css:87`) was running
  on `div.pane-shell` when the walk began; in each 178 draw it was not. Before: 4 of 11 draws at 169.
- Cure (`e2e/visual/capture.ts`, `settleArrivals`, called by `tabTo` before the walk): await every
  running finite document-timeline animation's own `finished` promise, re-read until none remains;
  refuse past a 10 s bound. No wall-clock sleep. The product bytes are untouched: the arrival is the
  product's lawful motion; the instrument started the walk inside it.
- After: `runs/kf-probe3.txt` (cure on) 10/10 at scrollY 178; `runs/kf-r1.txt` cell ×6 → 575 px ×6 (one
  state, the golden's geometry; the 575 is light paint, attributed in §2).

## 2 · the 99 light cells — census, counterfactual, mint

See the X.W11.vrm receipt in `docs/tranches/X/execution/A/X-W11.md` for commands and counts;
`runs/ci-124398470790-failed.txt` is CI's own 99-cell failure list (run `41154553074` @ `1ea5872d7`),
`runs/minted.txt` the cells the mint rewrote, `runs/cf-summary.txt` the counterfactual result.
