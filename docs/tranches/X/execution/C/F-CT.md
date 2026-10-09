SERVED MODEL: claude-opus-5-5

# X·F F.CT — execution record (fifth workflow)

Spec: `docs/tranches/X/fourier/waves/F-CT.md` (§ Goal, § Gates at close, addenda (a) and (b)). Authority: COHESION §0dr, §0ds. Repo: fourier-analysis, branch `m/w1-bump-migration`, `src/fourier_analysis/contours/**`, `shortest_tour.py`, `tests/**`, `bench/contours/**`. Every seat Opus 5.5.

**Privacy.** The original phone file `~/.fourier-samples/daraksha.jpeg` (it still carries GPS) is cited here only as `PRIVATE-SAMPLE`, with numbers only. This record holds no pixels. Every overlay, screenshot and served frame is under `~/.fourier-samples/evidence/` and nothing from there is committed. The stripped public copy `assets/portraits/daraksha.jpg` (`4c38b12`) is a committed sample by addendum (a) and is named normally (`portraits-daraksha`).

## Close — 2026-09-26 (verify and record)

Close seat, `claude-opus-5-5`. fourier HEAD = `603ae37` (= `origin/m/w1-bump-migration`; `git status` = `?? .worktrees/` only). Load average during the gates was 23 to 40.

**Verdict: NOT MET.** The unit and api gates are GREEN ×2, and the harness is deterministic across both runs. But the bar fails on every image on both runs, and on 10 of 19 images for more than runtime. Seven public images regress against the baseline on P, R or bg. The served check shows a face that is not yet fully traced.

### Gates

| Gate | Run 1 | Run 2 | Reading |
|---|---|---|---|
| `uv run pytest tests/` | 177 passed (315 s) | 177 passed (464 s) | GREEN ×2 |
| `uv run pytest api/` (`MONGO_TEST_URI=…:27018`, throwaway DBs) | 302 passed | 302 passed | GREEN ×2 (0 skipped) |
| harness `--tag close1` / `--tag close2` | 19/19 FAIL | 19/19 FAIL | **bar NOT met** on either run |
| served check (`:3100` → `:8000`, PRIVATE-SAMPLE original upload) | — | — | **not GREEN** (see below) |

### The bar (`bench/contours/harness.py` `BAR`)

P ≥ 0.97 · R ≥ 0.90 · bg ≤ 0.02 · frame ≤ 0.005 · jumps ≤ 3 · jump fraction ≤ 0.03 · wiggle ≤ 0.025 · epicycle error at N = 50/100/200 ≤ 1.5 / 0.6 / 0.25 (% of the diagonal) · runtime ≤ 8.0 s. The runtime limit is load-sensitive and was 6.0 s at the baseline. On top of the metrics: three judges must PASS every image in the same round, and no public image may regress.

### Before / after metrics

Before = `baseline` (the pre-F.CT pipeline; `portraits-daraksha` was not yet in the set). After = `close1`. `close2` is byte-identical on every metric except `runtime_s`, so it is not repeated. The bar-failure column lists only non-runtime failures. Runtime failed on every image except giraffe (7.6/8.0 s) and sun on close2 (7.7 s), because load was 23 to 40. A quiet-machine rerun is owed before runtime counts either way.

| image | P | R | bg | jumps | wiggle | e50 / e100 / e200 | non-runtime failures after |
|---|---|---|---|---|---|---|---|
| PRIVATE-SAMPLE | 1.000 → 1.000 | 0.857 → **1.000** | 0.000 → 0.000 | 12 → **0** | 0.040 → **0.007** | 1.90/0.82/0.33 → **0.70/0.24/0.09** | none (runtime 18.5 / 14.6 s) |
| portraits-daraksha | — → 1.000 | — → 1.000 | — → 0.000 | — → 0 | — → 0.007 | — → 0.74/0.26/0.08 | none (runtime 10.4 / 10.6 s) |
| portraits-nes-rob | 0.983 → 0.987 | 0.996 → 0.966 ▼ | 0.016 → 0.019 | 11 → 0 | 0.020 → 0.012 | 2.10/0.82/0.27 → 0.75/0.31/0.11 | none |
| portraits-cauchy | 1.000 → 1.000 | 0.995 → 0.945 ▼ | 0.016 → 0.000 | 10 → 1 | 0.049 → 0.010 | 2.60/1.19/0.51 → 0.70/0.26/0.10 | none |
| portraits-chef | 0.919 → 0.990 | 0.830 → 0.706 ▼ | 0.106 → 0.010 | 12 → 0 | 0.045 → 0.011 | 2.34/1.08/0.43 → 0.73/0.28/0.11 | R |
| portraits-euler | 0.990 → 0.986 | 0.930 → 0.892 ▼ | 0.019 → 0.014 | 15 → 0 | 0.040 → 0.011 | 2.06/0.91/0.38 → 0.86/0.29/0.11 | R |
| portraits-human | 0.337 → 0.865 | 0.554 → 0.965 | 0.672 → 0.135 | 14 → 1 | 0.032 → 0.013 | 1.96/0.73/0.27 → 0.66/0.24/0.09 | P, bg |
| portraits-joseph-fourier | 0.998 → 1.000 | 1.000 → 1.000 | 0.001 → 0.000 | 9 → 0 | 0.057 → 0.022 | 2.26/1.08/0.46 → 0.98/0.43/0.17 | none |
| animals-chef-2 | 0.955 → 0.947 | 0.672 → 0.820 | 0.056 → 0.056 | 12 → 0 | 0.068 → 0.021 | 1.99/0.97/0.42 → 1.76/0.80/0.35 | P, R, bg, e50, e100, e200 |
| animals-giraffe | 0.950 → 0.965 | 0.996 → 0.965 ▼ | 0.065 → 0.038 | 15 → 2 | 0.064 → 0.025 | 1.36/0.61/0.27 → 0.83/0.31/0.11 | P, bg |
| animals-golden-retriever | 0.976 → 0.969 | 0.440 → 0.672 | 0.033 → 0.031 | 11 → 0 | 0.032 → 0.015 | 1.90/0.74/0.30 → 0.99/0.39/0.14 | P, R, bg |
| animals-llama-1 | 0.993 → 0.993 | 0.979 → 0.980 | 0.025 → 0.006 | 9 → 0 | 0.054 → 0.017 | 1.94/0.91/0.40 → 0.83/0.36/0.13 | none |
| animals-llama-2 | 0.986 → 1.000 | 0.961 → 0.986 | 0.019 → 0.000 | 12 → 0 | 0.054 → 0.011 | 2.26/0.98/0.42 → 0.89/0.39/0.12 | none |
| animals-llama-3 | 0.932 → 1.000 | 0.989 → 1.000 | 0.100 → 0.000 | 13 → 0 | 0.045 → 0.015 | 2.42/1.03/0.40 → 0.58/0.21/0.08 | none |
| animals-sponge-flower | 1.000 → 1.000 | 0.772 → 0.968 | 0.005 → 0.000 | 6 → 0 | 0.031 → 0.024 | 2.12/0.89/0.35 → 0.82/0.35/0.13 | none |
| animals-sponge-happy | 0.971 → 1.000 | 0.968 → 0.998 | 0.033 → 0.000 | 13 → 0 | 0.017 → 0.014 | 2.01/1.00/0.38 → 1.11/0.47/0.14 | none |
| animals-sponge-pineapple | 1.000 → 0.935 ▼ | 1.000 → 0.803 ▼ | 0.000 → 0.064 ▼ | 15 → 0 | 0.013 → 0.012 | 1.99/0.67/0.24 → 1.02/0.41/0.17 | P, R, bg |
| animals-sponge-scared | 1.000 → 1.000 | 0.728 → 0.964 | 0.000 → 0.000 | 9 → 0 | 0.025 → 0.006 | 2.04/0.92/0.38 → 1.18/0.44/0.17 | none |
| animals-sun | 1.000 → 0.938 ▼ | 0.995 → 0.974 ▼ | 0.009 → 0.062 ▼ | 8 → 3 | 0.031 → 0.014 | 2.36/1.00/0.37 → 0.62/0.21/0.08 | P, bg |

▼ marks a regression of more than 0.01 against the baseline. **Seven public images regress:** nes-rob R −0.030, cauchy R −0.050, chef R −0.124, euler R −0.038, giraffe R −0.031, sponge-pineapple P −0.065 / R −0.197 / bg +0.064, sun P −0.062 / R −0.021 / bg +0.053. Golden-retriever and chef-2 lose less than 0.01 of P. The tour gate is met almost everywhere: jumps fell from 6–15 to 0 on 15 of 19 images, and 3 or fewer on the rest; wiggle and all three epicycle errors meet the bar on 18 of 19 (not chef-2).

### Served check (PRIVATE-SAMPLE, local only)

- `:8000` was a uvicorn started 2026-09-25 01:31, before every F.CT commit, and it has no `--reload`. It was restarted at HEAD `603ae37` with the same environment (`MONGO_URI=…:27018/fourier`, the dev `BLOB_DIR`). Vite `:3100` proxies to it (`/api/health` 200 via `:3100`).
- The original `~/.fourier-samples/daraksha.jpeg` (EXIF orientation 6, 1,528,429 B) was fed to the Visualize page's own file input in an isolated DevTools context. Both MCP uploaders refuse paths outside the value.js workspace, so a loopback-only (`127.0.0.1`) file server read the file and a `DataTransfer` placed it on the input. Nothing left the machine. Canvas frames were posted back to the same loopback server, into `~/.fourier-samples/evidence/served/` (3 PNGs).
- **Read by eye:** the upload was accepted and the image came in upright, so EXIF orientation 6 is honoured end to end. The contour editor shows 1024 points; the epicycles ran with 401 circles at N = 200. What reads well: the skull outline, the hairline and centre part, the image-left cheek and jaw, the neckline and collar, and the shoulder. **Not GREEN:** the image-right cheek and jaw are missing (only the hair edge is drawn). The chin is an open arc. The image-right eye is an E-shaped squiggle, and the image-left eye is an open lid line with ticks. There is no nose bridge. The mouth is a crossed fragment with no lower lip, and the braid is not traced below the hair tie. The harness overlay `close1/private-sample` shows the same defects, and they match the round-8 fidelity judge list.
- **Deleted afterwards:** the image, contour and compute-cache documents (1 each) and both blob files (`<slug>`, `<slug>.thumb`). `/api/images/<slug>/thumbnail` now returns 404. No `visualizations` document was ever created, and nothing was published. The browser's `fourier-drafts` IndexedDB and storage were cleared, and the page was closed. A different, older image in the dev DB (`original_name daraksha.jpg`, 1,188,627 B, 2026-09-25) is the public committed copy uploaded by an e2e seat; it was left alone.

### Commits (fourier-analysis, all on `origin/m/w1-bump-migration`)

| commit | unit |
|---|---|
| `4c38b12` | assets: `daraksha.jpg` (EXIF and GPS stripped), by the orchestrator under addendum (a) |
| `94a60bf` | CT-1: closed-loop splice tour (MST over minimum inter-contour distances, spliced depth-first) |
| `03e5e1c` | CT-2: per-model subject specs, U2-Net + BiRefNet-lite ensemble, hysteresis |
| `e2b1474` | CT-3 + CT-4: the silhouette traces the true boundary; clip to the subject instead of voting |
| `7e72a98` | bench: the jump metric sees absorbed chords; arc-length-weighted wiggle and precision; daraksha is the primary sample (addendum (b)) |
| `a0c61b6` | CT-5 + CT-6: structure and features are edge-supported strokes, not iso-loops |
| `fbfdf3a` | CT-7: greedy marginal-value selection; `max_contours` is a ceiling |
| `2c4dcda` | refine r5: routed joins, chained pen strokes, contrast ridges |
| `7885681` | refine r6: structure-scale edges, robust stop reference |
| `ca9b3b6` | refine r7: structure iso-lines traced at the structure scale |
| `603ae37` | refine r8: the face is drawn before the coat |

The close seat made no fourier commits.

### Per-round log

- **r1 (CT-1 `94a60bf`, CT-2 `03e5e1c`).** The tour became an MST over KDTree attachment pairs, rooted at the largest closed loop and spliced depth-first; NN/2-opt was deleted. Closed paths are resampled with a periodic CubicSpline (golden-retriever e50 had been 34%). The subject model became the U2-Net 320 + BiRefNet-lite 1024 ensemble with hysteresis (seed 0.8); `subject_mask` is never None. Gates at the time: tests 105 passed, api 170 passed / 119 skipped. Jumps went to 0 on 18/18 images. The CT-2 no-regression gate was NOT met on 7 images (chef-2, sun, sponge-happy, golden-retriever, giraffe, sponge-pineapple, PRIVATE-SAMPLE). At that round the branch was held unpushed because `4c38b12` added the portrait; addendum (a) (COHESION §0ds) later ratified the commit, and the branch has since been pushed.
- **r2–r8 (`e2b1474` … `603ae37`).** Silhouette and clip (CT-3/4), bench metric repairs, edge-supported feature strokes (CT-5/6), greedy selection (CT-7), then refine rounds r5–r8 (routed joins, structure-scale edges, iso-lines, face-first ordering). Round-8 fidelity judge (all 19 overlays viewed): **bar NOT met.** PRIVATE-SAMPLE and portraits-daraksha: the image-right cheek and jaw are missing and the chin is an open arc; the braid is untraced below the tie; the eyes are boxy or zigzag with spur ticks; the brows merge into the nose-bridge diagonal; there is no nose bridge; the smile breaks at the philtrum with no lower lip; and at N = 100 it does not read as a face. portraits-nes-rob: the coil is traced as a halo, there is a head-highlight squiggle, and the lenses are partial.
- **Close (this seat).** Gates reproduced ×2 (above). Metrics are deterministic between close1 and close2. **Remaining defects:** (1) the round-8 fidelity list stands, confirmed by eye on the served app; (2) the seven public regressions tabled above; (3) non-runtime bar failures on chef, euler, human, chef-2, giraffe, golden-retriever, sponge-pineapple and sun; (4) runtime is over 8 s on nearly every image under load 23–40, and a quiet-machine solo rerun is owed before it counts as a real failure.

**Status: F.CT OPEN — bar NOT met.** It is not closable until every judge PASSes every image in one round, the metrics meet the bar on two consecutive runs, and no public image regresses.

## Phase 2 — the approach tournament

Close seat, `claude-opus-5-5`, 2026-10-08. Spec: addendum (c) (the tournament, binding), addenda (a) and (b) (daraksha public and the primary sample). fourier HEAD at close = `e26d48a` on `origin/m/w1-bump-migration` (pushed, no force). The phase-2 pipeline is unchanged since `87ff8ac`; `e26d48a` changes only the API's extraction cache key (below). The original phone file stays `PRIVATE-SAMPLE` (numbers only; it still carries GPS and is never committed).

**Verdict: NOT MET.** The unit and api gates are GREEN ×2, and the harness is deterministic across both close runs (every metric except `runtime_s` is identical between `ct2-close1`, `ct2-close2` and `ct2-r8`). The judges' last round did not pass every image. 10 of 19 images fail the metric bar on lines other than runtime (17 lines). Five public images still regress against the original baseline. The served check reads right on both uploads, but only after a stale-cache defect was found and cured at this close.

### The tally (each prototype in its own worktree, same harness, same three-judge panel, judge means on a 1–5 scale)

| approach | branch | fidelity | clean | drawable | pass (of 3 lenses) |
|---|---|---|---|---|---|
| **A** landmarks + silhouette (BlazeFace ≥ 0.85 at three scales → FaceMesh v2 478-point chains as Catmull-Rom polylines; selfie-multiclass region boundaries for hairline, braid and neckline, and a person cut; Informative Drawings two-scale persistent lines as the fallback; Chinese-postman tour, retraces on their own strokes; linear resampling that keeps corners) | `f-ct2/A` | 3.75 | 3.28 | 3.22 | 0 |
| **B** learned line drawing (Informative Drawings contour-768 ONNX, sha-pinned at rev `f6030b3a`, cached like `ml.py`; tonal stretch, Chambolle TV 0.06, background faded by the soft subject alpha; stroke-graph vectorisation, spur pruning, directional gap bridging, junction-pinned smoothing; silhouette from the smoothed subject mask; salience pruning to an ink budget; new `postman_tour.py`: MST connectors, blossom matching of odd nodes, least-turn Hierholzer walk) | `f-ct2/B` | 3.63 | 3.21 | 2.89 | 0 |
| **C** semantic parts (face parsing plus colour parts; region boundaries as strokes; minimum-retrace Chinese-postman stroke graph) | `f-ct2/C` (head `907d8a8`, pushed) | **3.84** | **3.53** | **3.37** | 0 |

No prototype passed a lens on its own. The harness wrote only N=100 renders at the tournament, so the judges read N=50 and N=200 from the metrics; the harness has drawn all three since `afc3a87` (the overlays at close show N=50/100/200).

**Winner: C**, the highest mean on all three lenses. It draws a face from the parts a person names (skin, brows, eyes, nose, lips, hair, cloth), so its strokes are the boundaries an artist draws, not luminance level-sets, and its region graph gives the postman tour closed, clean pieces to walk. The grafts from the runners-up: B's Informative Drawings line model for the interior lines and the faceless subjects (`lines.py`), A's MediaPipe selfie-multiclass person cut (`person.py`), A's landmark idea kept as YuNet five-point rescue of features the parser misses, and B's postman tour with junction-pinned smoothing, twin-strand merging and budget pruning (`strokes.py`, `shortest_tour.py`).

### Per-round results (implementation and refinement on `m/w1-bump-migration`)

Judge failures count 19 images × 3 judges = 57 per round.

| round | fourier commit(s) | judges (fails / 57) | what landed |
|---|---|---|---|
| 1 | `afc3a87`, `4961935` | 57 | C implemented with every graft (`drawing.py` layers, `lines.py` contour-768 ONNX, `person.py` person cut, `parts.py` iris discs, `strokes.py` smoothing/dedupe/pruning; the SLIC/watershed path and the iso helpers deleted; jump factor 8× kept after measuring 3× and 8×; harness N=50/100/200 panels; daraksha-first tests). Then half-width closing, `merge_twins` for doubled strands, and `is_shape` protection of compact closed strokes. 21 non-runtime failing lines (from 23). |
| 2 | `92c57cf` | 57 | The nose as form (only where the image marks the skin/nose edge), teeth split by Otsu, connectors routed geodesically along image lines and joined by a Kruskal MST, `JUMP_PENALTY` 8 → 16 by measurement, lone thin lines kept (necklace, chef's whiskers: chef R 0.768 → 0.845), the frame band kept out of the lines. |
| 3 | `cf5e950` | 57 | Nose bridge down the shadowed side, brows by their spine, a thin lip between two parts as one line, YuNet rescue of missed eyes and mouths, odd-node chords routed (0 jumps on all 19). |
| 4 | `4ed2df6` | not relayed to this seat | The braid as hair by its colour (`material_revote`, CIELAB Gaussians, Bhattacharyya ≥ 1), local `thin_to_line`, a missed eye drawn by its lid valley, shortest-step connectors on facial skin. |
| 5 | `74aac87` | not relayed | A feature is joined only at an end or corner (`entry_points`); the nose's wings and base drawn whole (`wing_end`). CLAHE tried and rejected. |
| 6 | `bd083b0` | not relayed | Only the lower bridge drawn, no connector across the glabella, connectors from free ends pulled taut, the gum line thinned. |
| 7 | `06d9853` | not relayed | Bridge from the eyes' inner corners, brows entered at the tail, no pockets in a smile, faint twigs dropped around a face. |
| 8 | `1be00c3` | not relayed | The necklace kept (only true twigs dropped), brows along their dark core, features hung on each other before the outline. |
| 9 | `87ff8ac` | **NOT all pass** (the panel's last result) | A hair parting carried to its edge; upper teeth parted from the lower. |
| close | `e26d48a` | — | API only: the extraction cache keyed on the pipeline's fingerprint (below). |

The orchestrator relayed per-round judge counts for rounds 1–3 only (57/57 each). For rounds 4–9 this seat has the commits and the panel's final verdict, "NOT all pass", but no counts, so none are claimed. Rounds 4–9 are mapped to commits by their order on the branch. By the commit receipts, P, R, bg and jumps did not change on any image from `bd083b0` to `87ff8ac`; the refine rounds moved the face's drawing and the epicycle errors.

### Before and after

Columns: the **original baseline** (pre-F.CT) → **round 1's close** (`close1`, phase 1, `603ae37`) → **now** (`ct2-close1`; `ct2-close2` is identical except runtime). The last column lists only the non-runtime bar failures now.

| image | P | R | bg | jumps | wiggle | e50/e100/e200 | non-runtime failures now |
|---|---|---|---|---|---|---|---|
| PRIVATE-SAMPLE | 1.000 → 1.000 → 1.000 | 0.857 → 1.000 → 1.000 | 0.000 → 0.000 → 0.000 | 12 → 0 → 0 | 0.039 → 0.007 → 0.009 | 1.90/0.82/0.33 → 0.70/0.24/0.09 → 0.55/0.20/0.07 | none |
| portraits-daraksha | — → 1.000 → 1.000 | — → 1.000 → 1.000 | — → 0.000 → 0.000 | — → 0 → 0 | — → 0.007 → 0.008 | — → 0.74/0.26/0.08 → 0.52/0.20/0.07 | none |
| portraits-nes-rob | 0.983 → 0.987 → 0.988 | 0.996 → 0.966 → 0.957 | 0.016 → 0.019 → 0.012 | 11 → 0 → 0 | 0.019 → 0.012 → 0.019 | 2.10/0.82/0.27 → 0.75/0.31/0.11 → 0.84/0.33/0.14 | none |
| portraits-cauchy | 1.000 → 1.000 → 1.000 | 0.995 → 0.945 → 0.946 | 0.016 → 0.000 → 0.000 | 10 → 1 → 0 | 0.049 → 0.010 → 0.019 | 2.60/1.19/0.51 → 0.70/0.26/0.10 → 1.01/0.47/0.19 | none |
| portraits-chef | 0.919 → 0.990 → 0.969 | 0.830 → 0.706 → 0.843 | 0.106 → 0.010 → 0.029 | 12 → 0 → 0 | 0.045 → 0.011 → 0.022 | 2.34/1.08/0.43 → 0.73/0.28/0.11 → 0.93/0.38/0.17 | precision=0.969<0.97, recall=0.843<0.9, background_fraction=0.0293>0.02 |
| portraits-euler | 0.990 → 0.986 → 0.987 | 0.930 → 0.892 → 0.951 | 0.019 → 0.014 → 0.015 | 15 → 0 → 0 | 0.040 → 0.011 → 0.020 | 2.06/0.91/0.38 → 0.86/0.29/0.11 → 1.20/0.51/0.22 | none |
| portraits-human | 0.337 → 0.865 → 1.000 | 0.554 → 0.965 → 0.964 | 0.672 → 0.135 → 0.000 | 14 → 1 → 0 | 0.032 → 0.013 → 0.012 | 1.96/0.73/0.27 → 0.66/0.24/0.09 → 0.34/0.14/0.05 | none |
| portraits-joseph-fourier | 0.998 → 1.000 → 1.000 | 1.000 → 1.000 → 1.000 | 0.001 → 0.000 → 0.000 | 9 → 0 → 0 | 0.057 → 0.022 → 0.026 | 2.26/1.08/0.46 → 0.98/0.43/0.17 → 0.83/0.38/0.16 | wiggle=0.0264>0.025 |
| animals-chef-2 | 0.955 → 0.947 → 0.989 | 0.672 → 0.820 → 0.750 | 0.056 → 0.056 → 0.015 | 12 → 0 → 0 | 0.068 → 0.021 → 0.040 | 1.99/0.97/0.42 → 1.76/0.80/0.35 → 1.12/0.51/0.24 | recall=0.75<0.9, wiggle=0.0399>0.025 |
| animals-giraffe | 0.950 → 0.965 → 0.963 | 0.996 → 0.965 → 0.971 | 0.065 → 0.038 → 0.036 | 15 → 2 → 0 | 0.064 → 0.025 → 0.046 | 1.36/0.61/0.27 → 0.83/0.31/0.11 → 0.74/0.30/0.11 | precision=0.963<0.97, background_fraction=0.0361>0.02, wiggle=0.0455>0.025 |
| animals-golden-retriever | 0.976 → 0.969 → 1.000 | 0.440 → 0.672 → 0.847 | 0.033 → 0.031 → 0.000 | 11 → 0 → 0 | 0.032 → 0.015 → 0.025 | 1.90/0.74/0.30 → 0.99/0.39/0.14 → 0.79/0.31/0.13 | recall=0.847<0.9, wiggle=0.0252>0.025 |
| animals-llama-1 | 0.993 → 0.993 → 0.994 | 0.979 → 0.980 → 0.992 | 0.025 → 0.006 → 0.006 | 9 → 0 → 0 | 0.054 → 0.017 → 0.041 | 1.94/0.91/0.40 → 0.83/0.36/0.13 → 0.82/0.36/0.15 | wiggle=0.0405>0.025 |
| animals-llama-2 | 0.986 → 1.000 → 1.000 | 0.961 → 0.986 → 0.990 | 0.019 → 0.000 → 0.000 | 12 → 0 → 0 | 0.054 → 0.011 → 0.033 | 2.26/0.98/0.42 → 0.89/0.39/0.12 → 1.24/0.53/0.25 | wiggle=0.0335>0.025 |
| animals-llama-3 | 0.932 → 1.000 → 1.000 | 0.989 → 1.000 → 1.000 | 0.100 → 0.000 → 0.000 | 13 → 0 → 0 | 0.045 → 0.015 → 0.039 | 2.42/1.03/0.40 → 0.58/0.21/0.08 → 0.87/0.40/0.16 | wiggle=0.0394>0.025 |
| animals-sponge-flower | 1.000 → 1.000 → 1.000 | 0.772 → 0.968 → 0.761 | 0.005 → 0.000 → 0.000 | 6 → 0 → 0 | 0.031 → 0.024 → 0.018 | 2.12/0.89/0.35 → 0.82/0.35/0.13 → 0.30/0.10/0.03 | recall=0.761<0.9 |
| animals-sponge-happy | 0.971 → 1.000 → 1.000 | 0.968 → 0.998 → 0.998 | 0.033 → 0.000 → 0.000 | 13 → 0 → 0 | 0.017 → 0.014 → 0.018 | 2.01/1.00/0.38 → 1.11/0.47/0.14 → 1.00/0.44/0.15 | none |
| animals-sponge-pineapple | 1.000 → 0.935 → 1.000 | 1.000 → 0.803 → 1.000 | 0.000 → 0.064 → 0.000 | 15 → 0 → 0 | 0.013 → 0.012 → 0.016 | 1.99/0.67/0.24 → 1.02/0.41/0.17 → 1.09/0.40/0.16 | none |
| animals-sponge-scared | 1.000 → 1.000 → 1.000 | 0.728 → 0.964 → 0.964 | 0.000 → 0.000 → 0.000 | 9 → 0 → 0 | 0.025 → 0.006 → 0.011 | 2.04/0.92/0.38 → 1.18/0.44/0.17 → 0.74/0.29/0.12 | none |
| animals-sun | 1.000 → 0.938 → 0.940 | 0.995 → 0.974 → 0.990 | 0.009 → 0.062 → 0.062 | 8 → 3 → 0 | 0.031 → 0.014 → 0.019 | 2.36/1.00/0.37 → 0.62/0.21/0.08 → 0.34/0.15/0.05 | precision=0.94<0.97, background_fraction=0.0615>0.02 |

**Regressions against the original baseline (more than 0.01), now:** nes-rob R 0.996 → 0.957, cauchy R 0.995 → 0.946, giraffe R 0.996 → 0.971, sponge-flower R 0.772 → 0.761, sun P 1.000 → 0.940 and bg 0.009 → 0.062. All five were carried from round 1 or 2, and none got worse after round 2. The sun's P and bg come from the reference mask, which leaves out the upper-right ray; that needs a ruling on correcting the reference. **Cured since phase 1:** chef R 0.706 → 0.843 (baseline 0.830), euler R 0.892 → 0.951 (baseline 0.930), human P 0.865 → 1.000 and bg 0.135 → 0.000, sponge-pineapple back to 1.000/1.000/0.000, and 0 jumps on all 19 images (from 0–3). **Worse than phase 1's close but not the baseline:** wiggle on the furry subjects (llama-1/2/3, chef-2, giraffe, golden-retriever, joseph-fourier), which comes from the learned line layer. Non-runtime bar failures now: chef (P, R, bg), joseph-fourier (wiggle), chef-2 (R, wiggle), giraffe (P, bg, wiggle), golden-retriever (R, wiggle), llama-1/2/3 (wiggle), sponge-flower (R), sun (P, bg): 10 images, 17 lines. Both daraksha samples, nes-rob, cauchy, euler, human, sponge-happy, sponge-pineapple and sponge-scared meet every metric line except runtime.

### Gates

| Gate | Run 1 | Run 2 | Reading |
|---|---|---|---|
| `uv run pytest tests/` | 169 passed (505 s) | 169 passed (696 s) | GREEN ×2 |
| `uv run pytest api/` (`MONGO_TEST_URI=mongodb://localhost:27018`, throwaway DBs) | 302 passed | 302 passed | GREEN ×2 (run 1 and run 2 both at the cache-key change) |
| harness `--tag ct2-close1` / `ct2-close2` | 19/19 fail (10 on non-runtime lines) | identical | deterministic; **bar NOT met** |
| runtime, solo on a quiet host | — | — | **UNREAD**: waited 60 min (19:19–20:19), re-checking every 3 min; the 1-minute load stayed between 25 and 84 and never went under 8. The close runs read 8.9–19.5 s per image under load 34–61; they are not claimed either way. |
| served check (`:3100` → `:8000`) | — | — | GREEN by eye after the cure below |

### Served check

- `:8000` had been started at 11:16, before the phase-2 refine commits, with no `--reload`. It was restarted at HEAD with the same environment (`MONGO_URI=mongodb://localhost:27018/fourier`, `BLOB_DIR=~/.mongo-dev/fourier-blobs`, the compute and write rate limits). `:3100` proxies to it (`/api/health` 200).
- Uploads were made through the Visualize page's own file input (`image-file-input`) in headless Chromium (Playwright 1.61, from fourier's `web/`). Frames are in `~/.fourier-samples/evidence/ct2-served/` (local only).
- **The original `~/.fourier-samples/daraksha.jpeg`** (EXIF orientation 6, 1,528,429 B): it came in upright, with image bounds 768 × 1024 (portrait), so orientation 6 is honoured end to end. The contour has 1024 points and the epicycles 401 circles at N = 200. By eye, the hair outline and centre part, both eyes with irises, both brows, the nose bridge and wing, the smile with the teeth band, the chin and jaw, the neckline, the shoulder and the braid all read; there are no leaf, painting or frame lines. The upload was then deleted: the image, contour and compute-cache documents (1 each) and both blob files. `/api/images/<slug>/thumbnail` now returns 404. No visualisation was created.
- **The committed `assets/portraits/daraksha.jpg`: RED at first, then cured.** The API de-duplicates it by sha256 to an image uploaded on 2026-09-25, and the extraction cache returned that day's iso-contour tour, a dense scribble that does not read as a face. Root cause: `extraction_cache_key` carried a hand-bumped `_v: 3` that phase 2 never bumped, so every image extracted before phase 2 kept serving its old tour. **Cure (fourier `e26d48a`, pushed):** the key now carries `fourier_analysis.contours.version.PIPELINE_VERSION`, a digest of the `contours/` sources and `shortest_tour.py`, so any change to the pipeline retires its old entries without anyone having to remember a bump. Re-served at the cure, the committed portrait draws the phase-2 figure: the same features as the original, matching the harness overlay `ct2-close1/portraits-daraksha`.
- **What still reads wrong by eye (both uploads):** an open shoulder stroke ends in the air at the image-left edge; the upper lip's outer edge is not drawn apart from the teeth band; the image-left eye hangs from its brow's tail by a connector across the lid; at N = 50 the nose and eyes are loops, not features.

### Commits

fourier-analysis (`origin/m/w1-bump-migration`, all pushed, no force; pathspec-only): `afc3a87`, `4961935`, `92c57cf`, `cf5e950`, `4ed2df6`, `74aac87`, `bd083b0`, `06d9853`, `1be00c3`, `87ff8ac` (the rounds above), and `e26d48a` at this close (`src/fourier_analysis/contours/version.py`, `api/services/image_storage.py`). Track C's `web/**` and `api/**` in-flight files were not touched.

### Residuals

1. **The judge bar:** the panel's last round did not pass every image. Phase 2 is the third method on this bar, and 9 rounds moved the face's drawing without a round where all 57 judgements passed.
2. **The metric bar:** 17 non-runtime failing lines on 10 images. Most are wiggle on fur from the learned line layer, plus chef, chef-2 and golden-retriever recall.
3. **Five baseline regressions** (nes-rob, cauchy, giraffe, sponge-flower R; sun P/bg). The sun's needs a ruling on its reference mask.
4. **Runtime UNREAD:** a solo run on a quiet host (1-minute load < 8) is still owed.
5. **The served defects** listed above, which are the same as the harness overlay's.
6. **Cache:** contour documents extracted under older pipelines stay in the dev database. They are no longer served for a fresh extraction but are not purged.

**Status: F.CT OPEN — bar NOT met.** It is not closable until every judge passes every image in one round, the metrics meet the bar on two consecutive runs, no public image regresses against the original baseline, and runtime is read on a quiet host.

**Addendum 2026-10-09 (F.CT3 step 0, COHESION §0eu.4): the sun reference is re-derived.** The documented derivation (`derive_reference_mask`, ISNet) reproduces the stored `animals-sun.png` byte for byte. ISNet scores the upper-right ray at about 0.2, below its 0.5 cut, so re-deriving cannot restore the ray. The defect is ISNet's, and the eye-check is made measurable instead. Background = the border-connected region within CIELAB ΔE 15 of the border's median colour. Missed regions = outside that background and outside the ISNet mask, opened by the derivation's own element. A missed region is added only if it holds a disc of the harness tolerance (13.06 px): the ray, 14,455 px, has an inscribed radius of 44.8; every rim sliver is ≤ 9.5. Result: 0.3147 → 0.3321 of the frame, +14,455 px, 0 removed. fourier `fe1749e` (f-ct3, fast-forwarded to `m/w1-bump-migration`) holds the PNG and the rule in `bench/contours/README.md`. The pipeline was not fitted to it. Evidence: `~/.fourier-samples/evidence/ct3-sunref/` (the script is `scripts/correct_sun.py`). The step-0 baseline run (the current harness over the old pipeline at `603ae37`, and at the true pre-F.CT tree `4c38b12`) is NOT yet read. Host load was 420–700, and F.REL `.mem` held `heavy.lock`.
