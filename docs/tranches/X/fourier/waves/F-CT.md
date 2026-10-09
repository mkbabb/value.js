# F.CT — fourier: contour selection, the tour, and refinement, to the owner's bar

## State
**Minted by:** COHESION §0dr (2026-09-25), on the owner's order. It runs as its **own workflow**, the fifth, and the owner ordered it explicitly ("add another"). It is concurrent with Tracks A–D.
**Model:** Opus 5.5 every seat. **Record:** `docs/tranches/X/execution/C/F-CT.md`. **Repo:** fourier-analysis (`src/fourier_analysis/contours/**`, `src/fourier_analysis/shortest_tour.py`, `api/**` only where the extraction route needs it, `tests/**`, a new `bench/contours/**`). Track C holds `web/**`; this wave touches `web/**` only for the contour-editor/preview path, and only after reading `git status` for Track C's in-flight files.

## Authority — the owner, verbatim (2026-09-25)
*"add another for the fourier analysis contour tour selection and refinement thereof. We'll use this image for all of our samples going forward, the image of my fiancee, Daraksha … The contour extraction bar should be set against this, and our other test images, until perfection."*

## The sample set
- **The primary sample (PRIVATE):** `~/.fourier-samples/daraksha.jpeg` (3024×4032 portrait: dark hair with a centre part and a braid, a smile with teeth, a necklace, a beige sweater, and a busy background of monstera and pothos leaves plus a colourful painting).
- **The public set:** fourier `assets/portraits/*` (euler, joseph-fourier, cauchy, chef, human, NES-ROB) and `assets/animals/*` (llama ×3, golden-retriever, giraffe, sponge ×4, chef-2, sun).

## PRIVACY LAW (binding on every seat)
Both fourier-analysis and value.js are **public** repos, and the owner has not authorised publishing this photo.
- The image, and **every derivative of it** (overlays, crops, contour plots, epicycle renders, frames, thumbnails, base64, test fixtures), stays **local only**: under `~/.fourier-samples/` (evidence in `~/.fourier-samples/evidence/`).
- Never `git add` it or any derivative, in any repo. Never push it, never upload it to any external service, never deploy it or publish it to a gallery. Never write its bytes or likeness into committed code, tests, docs or records. Records cite it only as `PRIVATE-SAMPLE` with numeric metrics.
- Committed tests use the public set only. A private-sample gate reads the local path, is **skipped when the file is absent**, and never embeds the image.
- If the served app is used with it (`:3100` against the API on `:8000`), it stays in the local dev database and `BLOB_DIR`. It is never published or made public; delete that visualisation after the check.

## Goal: "until perfection", made measurable
For every image in the set (the private sample first):
1. **Selection:** the chosen contours trace the subject, not the background. For the portrait: the head and face outline, the hairline and the braid, plus the defining features (eyes, brows, nose, mouth and teeth line, the neckline). No leaf, painting or wall edges. It is measured as subject-mask precision and recall against a reference mask (the ML subject mask, refined and checked by eye), plus a feature-coverage check on named landmarks.
2. **The tour:** one continuous closed path (`shortest_tour`) with no long jumps across the subject (report the count and length of jumps above k × the median step), no backtracking scribble, and ordering that follows the strokes.
3. **Refinement:** smooth where the subject is smooth, detailed where it is detailed (no staircase, no noise spurs), with arc-length resampling that preserves features.
4. **The epicycle reconstruction** is recognisable at a moderate harmonic budget (reported at N = 50, 100, 200). Its error against the tour is reported.
5. **The judge bar:** a panel of three vision judges (fidelity to the subject, cleanliness and background, tour and drawability) rate each overlay. **Perfection = every judge PASSes every image in the same round, with every metric at or above the bar, and no public-set image regressing against the baseline.**

## Gates at close
`uv run pytest` GREEN ×2 (including the new bench tests on the public set); the api tests GREEN; the bar met ×2 (two consecutive harness runs); the served check (upload, contour, preview, epicycles at `:3100`) reads GREEN on the private sample locally, with the visualisation deleted afterwards. The record holds the metrics table, before and after, with no private pixels.

## ADDENDUM 2026-09-25 (a) — the owner lifts the privacy law: "Public in the repo is fine." (COHESION §0ds)
- **The PRIVACY LAW above is superseded.** The portrait is now a **public, committed sample**: fourier `assets/portraits/daraksha.jpg` (`4c38b12`), committed by the orchestrator, **not a violation**. Seats must not remove or rewrite it. It was committed with EXIF and GPS stripped: the original carried GPS coordinates and orientation 6, so the orientation is baked into the committed pixels. **Never commit the original `~/.fourier-samples/daraksha.jpeg`** (it still holds GPS). Any copy must go through the stripped, committed file.
- **Consequences:**
  - The harness and the committed tests use `assets/portraits/daraksha.jpg` as the **primary** sample, in the public set, and the private-skip gate becomes an ordinary committed test on it.
  - Evidence frames may stay local (size); committing a small set of before/after overlays to the record is allowed.
  - The raw phone JPEG's EXIF orientation (6) is a real input case: the pipeline must honour EXIF orientation on upload (the models lens checks `image.py`), and the served check uploads the **original** file from `~/.fourier-samples/` to prove it.
- **"Use this image for all of our samples going forward":** every fourier test or e2e spec that uploads a sample image moves to `assets/portraits/daraksha.jpg` as its default. This is Track C's `web/e2e/**` (F-W14V.md addendum (d)); F.CT's own tests use it directly.

## ADDENDUM 2026-09-25 (b) — daraksha replaces the golden retriever everywhere (owner: *"It's still the golden--it should be daraksha"*)
At the orchestrator's read, `tests/test_contour_bench.py` still has `SAMPLES = ("portraits-euler", "animals-golden-retriever", "animals-sun")`, and `tests/test_contours.py:248` loops over `golden-retriever.webp` first. The next refine seat changes both so that `portraits-daraksha` (`assets/portraits/daraksha.jpg`) is the **first, default** sample, with the golden retriever kept only as one of the public-set regression images. Anywhere a single "representative" sample is chosen (harness defaults, the README example, CLI defaults, judge prompts), it is daraksha.

## ADDENDUM 2026-09-26 (c) — round 1 closed NOT met; the method is ruled at its limit; an approach tournament follows (COHESION §0eg)
- **Round 1 close** (value.js `4d41b9fd`): 8 refine rounds (CT-1 … r8, fourier `94a60bf` … `603ae37`).
  - Gates: pytest 177 ×2 and api 302 ×2 GREEN; deterministic.
  - Bar: **19/19 FAIL**. The portrait's metrics meet every numeric bar except runtime (P 1.000, R 1.000, bg 0, 0 jumps, epicycle error 0.70/0.24/0.09 against a baseline of 1.90/0.82/0.33). By eye, the face is incomplete: the right cheek and jaw are missing, the eyes are squiggles, there is no nose bridge, the lower lip is missing and the braid is untraced.
  - Tour: retracing shows as doubled strands. **Seven public images regress** (nes-rob, cauchy, chef, euler, giraffe, sponge-pineapple, sun).
- **Ruling:** iso-intensity contours over an image, however selected and clipped, trace luminance level-sets, not the lines an artist draws. Eight rounds of tuning converged on that ceiling, and **more rounds of the same method are refused**. The next phase is an **approach tournament**, each approach prototyped in its own worktree and measured on the same harness and judge panel:
  - **A. Landmarks plus silhouette:** a face-landmark model (e.g., MediaPipe FaceMesh or face-alignment) gives the facial feature lines (brows, eye lids, nose bridge and base, lips, jaw) as polylines where a face is detected; the ensemble subject mask gives the silhouette; the hair and braid come from a hair-segmentation boundary; non-face subjects fall back to B.
  - **B. A learned line drawing:** a photo-to-line-drawing model (e.g., Informative Drawings, anime2sketch, or TEED/PiDiNet edges with thinning), then vectorisation into a stroke graph.
  - **C. Semantic parts:** a face-parsing model (BiSeNet-class: skin, brows, eyes, nose, lips, hair, neck, cloth) whose region boundaries are the strokes; for animals, a general part/edge model under the subject mask.
  - **The tour, common to all:** strokes form a graph, and the closed path is a minimum-retrace walk (a Chinese-postman augmentation over the stroke graph). Unavoidable connectors are routed **along existing strokes** or kept short, and any retrace must coincide with its stroke so it does not read as a doubled strand at N ≥ 100.
- **Selection:** the harness bar and the 3-judge panel on all 19 images, including no public regression against the **original baseline**. The winning approach is implemented on `m/w1-bump-migration`, grafting the runners-up's best parts. Refinement then loops until the bar is met (every judge PASSes every image in one round, ×2).
- **Runtime:** it is read solo on a quiet host (1-minute load < 8) before it counts. Model downloads are allowed; the model files stay out of git (cached as `ml.py` does).

## ADDENDUM 2026-10-08 (d) — phase 2 CLOSED honest-RED; C adopted; phase 3 is bounded and has a restated bar (COHESION §0eu)
- Phase 2 is closed. C (YuNet + BiSeNet parts, a postman tour) ships through F.REL, which bakes and sha-pins its models. The named REDs are listed in §0eu.
- **Phase 3 (F.CT3)** opens only after F.REL closes, on `m/w1-bump-migration` or master as F.REL leaves it.
  - Step 0: the same three-lens panel judges the pre-F.CT pipeline. That is the baseline.
  - Then up to 4 rounds of root cures, aimed at these clusters: the face seams that read as scars (the cheek chord, and the brow tied to the face edge); the nose (both alar sides, the nostrils); the lips (upper lip, philtrum); the braids (plaits, the left braid); the necklace; eye loops at N=50/100; the subject-mask rim (nes-rob, cauchy, giraffe recall); and wiggle on fur.
  - Bar: daraksha passes all three lenses at N=100/200; every other image is at or above its baseline on each lens, with a mean of at least 5; the sun reference mask is re-derived and receipted; the recall regressions are cured or ruled with frames; runtime is banked in the quiet window.
  - After round 4 it closes honest-RED with whatever remains. The resource law of the phase-2 implement seat applies to every seat.
