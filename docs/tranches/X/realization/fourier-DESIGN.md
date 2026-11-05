# fourier — the realization DESIGN pass (2026-11-04)

**Order.** The owner, 2026-11-04, verbatim: "Ensure that our tranche extant, the megatranche, items aare fully realized and refined with design and planning passes thereof." Standing orders: the 2026-09-17 begin-word ("NO quick solutions, NO workarounds … completed the plan IN TOTALITY") and the post-reboot "No deferring any item to another time."

**Scope.** This is the fourier-analysis design pass over the X·F realization inventory. Every self-owned item gets a gestalt cure, a falsifier and the frames it is expected to produce. Glass-owned items get relay text. Owner acts get the exact ask. No engineering ran in this seat: it read source at fourier `origin/master` `5001d2f`, the served app and the public API. The plan is executable as written, and nothing in it is deferred. Each glass-gated unit names the publish event that opens it, because those bytes are not ours.

**Inventory note.** The inventory this seat received was cut off inside the O-97 (glass O-98) CONTRAST-FLOOR row, at "GAB-1[plate/page] is a ruled-residual hold (§0fk.1), whose". That row is designed below from its visible text. Any rows after it were not visible to this seat, so the orchestrator must route them to a follow-up seat. They are not dropped.

**Law carried into every unit.**
- Every run goes through `~/.claude/guard/guarded`. Browser runs are never `--light`; WebKit runs use `--exclusive webkit`. fourier API runs set `COMPUTE_CONCURRENCY=1`.
- Bounded workers: vitest `--maxWorkers=2`, playwright `--workers=1`, pytest without `-n`.
- Every falsifier is RED before the change and GREEN after, run ×2, and every frame is Read.
- Commits go by pathspec. COHESION and the LEDGER take addenda only (E-3). Glass is read-only to us.
- Identity colour, type and motion are owner rulings, never cures. fourier's identity is the cream palette, Computer Modern / Fraunces / Plus Jakarta type, and the 13 section hues (`web/DESIGN.md`).
- Goldens are re-minted only by counterfactual attribution, on darwin and linux.

---

## 0 · What the served app shows

Read 2026-11-04 at about 20:40 EST. Prod is `https://fourier.babb.dev`, serving `index-CogWSlpS.js` / `index-B0pcU8kT.css` (fourier master `5001d2f`).

**Probe.** One guarded headless Chromium (default headless shell) for the whole run, one context per cell, closed in `finally`: `fourier-design-frames/probe.mjs` (durable copy in `~/.dev-logs/fourier-design-2026-11-04/`). There were 60 cells: 6 routes (`/`, `/w`, `/equation`, `/morph`, `/paper`, `/gallery`) × 5 viewports (390×844, 430×932, 844×390, 1440×900, 1800×1000) × light and dark, at DPR 1. The run waited about 75 min in the machine-wide browser queue before admission, which is the guard working as designed. Raw readings are in `cells-r1.json`. The 9 frames this seat Read are banked beside it.

| Reading | Value | Verdict |
|---|---|---|
| Horizontal overflow (`scrollWidth − clientWidth`), all 60 cells | 0 | GREEN |
| Dock centre offset from the viewport centre, all 60 cells | 0 px | **Mobile centring GREEN**, on every route and in both schemes |
| Dock box (first `[class*=dock]`) | 56 px tall at 390/430/1440/1800, top 8 or 12 px; **48 px** tall at 844×390, top 4 px | The short-landscape compact dock is served (D-22). The F-D3 cell must select the dock root by role, not by this class probe. |
| `/` | redirects to `/paper`. At 390 the first body line sits at about y = 378, inside the 844 fold | D-22 looks GREEN; F-D3 records it ×2 |
| `/equation` rAF p50 / p95 (software raster, 120 frames) | 390 / 430 / 844: **8.3 / ≤ 9.4 ms**. 1440: **25 / 41.6 ms**. 1800: **25.1–33.3 / 50–58.8 ms** | **D-17 confirmed, and sharper than the docket.** The cost scales with canvas *area*: 120 Hz on phones, 30–40 fps on desktops. That points at full-canvas raster, not at geometry. F-D2's falsifier cells are 1440 and 1800. |
| Console errors | 3 of 60 cells: `429 Too Many Requests` on `/equation` (844 light, 390 dark, 1440 dark) | The probe loads `/equation` 10 times in about 3 min and trips the API rate limiter. That is not a user path, but the F-D3 D-27 run must pace its `/equation` cells (≥ 20 s apart) or it will read the limiter as a CSP or console RED. No CSP violation appeared in any cell. |
| `/gallery` and `/w` | "No visualizations yet." with "Open the Visualizer"; `/w` shows "Draw any outline in circles" and "Browse the gallery" (which leads to the empty gallery) | D-4, owner ask O-F1 |
| `/morph` at 430 and 844×390 | the sun path visibly self-intersects (the loop through the centre) | D-37, owner ask O-F4 |
| `/equation` at 390 and 1440, Series panel | "Displayed harmonics" at its maximum (9 of 9) paints a **full fill with no visible thumb**. "Harmonics" at 8 of 100 shows only a small thumb dot. | **D-9 also holds at the maximum**, not only at the minimum. Added to relay R-F1. |
| Fonts loaded per route | 6–7 faces on `/paper` and `/equation`, 2 on `/w` and `/gallery` | Route-lazy faces. F-D3 asserts Fraunces and Plus Jakarta on the routes that set them. |
| Breath of life | `/equation` sweeps on load at every width (the instrument is alive). `/w` and `/gallery` are static empty cards. | The two empty surfaces are D-4. The sweep's life costs frames on desktop (D-17). |

---

## 1 · Self-owned units (one root and one falsifier set per unit)

### F-D1 · Deploy-of-record totality: every exit of the hook writes the record
**Items:** DEPLOY-ALERT-5001d2f (issue #3).

**Observed.** deploy-trigger POSTed the signed ci-green body for `5001d2f` and got HTTP 200 with an empty body. That is the webhook receiver's normal answer when it has launched the command; it is not a refusal. `/deploy-record.json` still reads `OK` at `be252f4` (2026-11-02T16:33:40Z). deploy-alert timed out after 1800 s.

**Root (read in `scripts/deploy-hook.sh@5001d2f`).** The script runs under `set -euo pipefail` (:76). `write_record` is called on exactly four arms of `deploy()`: REFUSED (:845), OK (:906), ROLLED_BACK (:927) and ALERT (:931). Every other way out of the script writes nothing:
1. `assert_clean_tree` (:824) returns 1 on a dirty host tree. Called bare under `set -e`, that ends the script. A `notify err` goes out, but no record is written.
2. Any failing command before the gate also ends the script with no record: `cd "${REPO_DIR}"` (:821), `git fetch origin` (:842, for example a network or credential failure), `git rev-parse` (:844), `git reset --hard` (:858).
3. `flock 9` (:946) waits with no bound. If an earlier deploy is wedged and holds the lock, this deploy never reaches `deploy()`, and the receiver's own timeout kills it silently.
4. If the receiver never executed the script (a hooks.json arm or a trigger-rule mismatch), there is no hook log line for `10:34:59Z` at all.

Arms 1 to 3 are the same defect: inv-31 is enforced by *call sites* instead of by the script's *exit*. The host log decides which arm fired on 2026-11-04. The cure does not depend on which one it was, because it closes all of them.

**Gestalt cure (one invariant, at the exit, never per call site):**
- Add a single `RECORDED=0` flag, set to 1 inside `write_record`.
- Install `trap 'on_exit $? ${LINENO}' EXIT` in `main()` before the lock. `on_exit` writes `ABORTED` (with the failing line, the last log line and the exit status as its `detail`) when `RECORDED=0`. It uses `prev` and `new` as far as they were resolved, and `unknown` otherwise. Then it calls `notify err`.
- Replace `flock 9` with `flock -w "${LOCK_WAIT:-900}" 9 || { write_record TIMEOUT … "lock held > ${LOCK_WAIT}s by pid $(cat "${LOCKFILE}.pid")"; exit 1; }`. The holder writes its pid beside the lock.
- `assert_clean_tree` writes `REFUSED` with the dirty paths in its detail, so the commonest operator error has a first-class outcome instead of the generic `ABORTED`.
- Add `ABORTED` and `TIMEOUT` to deploy-alert's terminal vocabulary. The workflow then reports the outcome instead of waiting out 1800 s.
- On the host: if the log shows arm 4 (no hook line), the receiver config is cured at its root (the hooks.json `execute-command` path and trigger rule, compared against `infra/apache/deploy.babb.dev.conf.template`), and that change is recorded in the fourier deploy README.

**Falsifier.** Extend `scripts/deploy-alert-fixture.sh` (which already sources the hook without running it) with four forced exits on a scratch repo under `~/.dev-logs/`: dirty tree, `git fetch` failing (bad remote), lock held past a 2 s `LOCK_WAIT`, and `kill -TERM` mid-build. Each asserts that a record exists, that its outcome is one of REFUSED, ABORTED or TIMEOUT, and that `recorded_at` is after the start. All four are RED before the change (no record) and GREEN after, ×2. The existing OK, REFUSED and ROLLED_BACK fixtures stay GREEN ×2.

**Close.** Push and let CI go green. Re-request the deploy of current master. Read `/deploy-record.json` showing `OK` at the master SHA ×2, 60 s apart, and read the deploy-alert run's terminal verdict. Then close issue #3 with the record quoted, and write a COHESION addendum and a LEDGER event.

**Expected frames.** None; this unit has no UI.

---

### F-D2 · The convergence sweep: a layered raster, with the real GPU as the gate of record
**Items:** D-17 (F0hm-4) and D-17-GPU.

**Root.** `ConvergencePlot.vue` memoises the *geometry* (`frameGeometry`, keyed on coefficients, nHarmonics, domain and transition progress), but `draw()` still *rasterises* every layer on every rAF tick. It calls `clearRect` on the whole backing store, then `drawPlotGrid`, then the dashed original f(x) (500+ segments with `setLineDash`), then every settled harmonic, then the entering one, then the Sum. Only the cursor reveal and the Sum depend on `t`. The settled harmonics are static between the moments one finishes and the next begins, and the grid and f(x) are static for the whole sweep.

**Gestalt cure (cache what does not move; never throttle what does):**
- One `OffscreenCanvas` (with an `HTMLCanvasElement` fallback), the size of the device-pixel backing store that `useCanvasSetup` already owns, holds the **static layer**: grid, f(x), and every harmonic whose `harmonicProgress` is 1.
- Its key is the geometry memo key, plus `ink` (the theme flip), `hoveredCurve`, and the **settled count** (the number of harmonics at progress 1). It is re-rendered only when that key changes. In a 2–12 s sweep with N harmonics, that is N + 1 times, against the current ~120 frames per second.
- Each tick then does one `drawImage(static)`, strokes the entering harmonic's partial path, and strokes the Sum. The Sum stays per-frame because the reveal blend touches every sample.
- The Sum's 500 × N `revealWeight` loop splits in two: the settled prefix is a cached `Float64Array` (keyed on settled count), and only the entering harmonic's weighted term is added per frame. That changes the work from O(N·500) to O(500) per frame.
- `useCanvasSetup`'s resize, DPR and zoom path invalidates the static layer. The reduced-motion arm (terminal frame `t = 1`) draws the static layer once and stops.
- Hit regions (`cachedScreenCurves`) are rebuilt with the static layer, not per frame.

This is the same idiom as the app's other canvases (one DPR-aware surface, no per-frame allocation). It adds no new module beyond a small `useStaticLayer(surface, key, paint)` in `web/src/composables/canvas/`, next to `useCanvasSetup`.

**Falsifier (frame time, two rasters).**
1. Software raster (the CI-reachable cell, and the liveness and regression guard). A guarded single-browser probe opens `/equation` at 1440×900 with the default function at N = 100 (FunctionInput's slider max) and records 240 rAF deltas mid-sweep, at **1440×900 and 1800×1000** (the area-bound cells; §0 read p50 25 / 25.1–33.3 ms there and 8.3 ms at ≤ 844). Before the change the deltas match the docket. After the change, p50 must be ≤ 8.4 ms (120 Hz) and p95 ≤ 16.7 ms at both sizes. ×2 before and ×2 after, with `/equation` loads paced ≥ 20 s apart (the API rate limiter, §0).
2. Real GPU, the gate of record (D-17-GPU). Add an `/equation` sweep cell to the real-GPU cell of record (§0gp.2): headless, channel `chrome`, ANGLE-Metal, with the need cited in the spec file header ("GPU/ANGLE-Metal frame-budget witness, machine law 2026-10-16"). It runs under `guarded` (never `--light`) with `--cpu-cores 0`, and asserts p50 ≤ 8.4 ms and 0 long frames over 33 ms. It is read ×2 before and ×2 after. The software-raster cell asserts liveness only on the GPU budget.
3. A pixel guard. The frame at `t = 0.5` and at `t = 1` (reduced-motion) must be byte-equal before and after, or within the existing golden tolerance, on darwin and linux. That proves the cache changed cost and not picture.

**Expected frames.** `/equation` at 1440 light and dark and at 390 dark, mid-sweep: grid, dashed f(x), settled harmonics in their section hues, the entering harmonic, and the Sum. They should be identical to today's frames.

---

### F-D3 · The prod readings record: the five landed cures and the CSP beacon
**Items:** 0HM-F-RECORDS (D-8, D-21, D-22, D-25, D-27 landings at `2f0bff0`, `75aed4c`, `5001d2f`) and D-27 (the CSP beacon arm, OD-6 twin).

**Root.** These cures shipped and are served, but the X records never received them: there are 0 hits for the three SHAs under value.js `docs/`. Their only falsifiers were local, so the served reading ×2 is the missing half.

**Cure (records, no app bytes).** Run one guarded prod browser run (one browser, a context per cell, closed in `finally`), ×2:
- **D-8** at 844×390, on `/equation`: series overflow = 0, and the pill's box is inside its layer's box.
- **D-21** at 390: the stage block size is ≥ 340 px, and each label's top is ≥ its value's bottom (labels sit under values).
- **D-22** at 390: the `/paper` first text line's bottom is ≤ 844 (inside the fold), and the dock root (selected by role) at 844×390 carries glass's compact block inset. §0 read the first `[class*=dock]` box at 48 px there, against 56 px elsewhere, so the cell asserts the inset token's computed value and not a hard-coded px.
- **D-25** at 1800: the top delta = 0 and the foot = 0 (the aside spans the stage rows; the golden is 620 px).
- **D-27**, over the 27 cells of 2f0bff0's own falsifier, read on prod instead of locally (§0's 60-cell sweep is a superset of the routes): 0 CSP violations and 0 console errors, and `document.fonts` reports Fraunces and Plus Jakarta Sans `loaded`.

Frames for each row are Read and banked in `docs/tranches/X/realization/fourier-design-frames/`. Then write one COHESION §0hm addendum (each SHA, CI runs `41809598775` and Pages `41815131919`, the 75aed4c-RED → 5001d2f golden re-mint attributed on darwin and linux, and the D-27 beacon arm: *allowed*, mirroring value OD-6, with `script-src` adding `static.cloudflareinsights.com` and `connect-src` adding `cloudflareinsights.com`), and one LEDGER event.

**Falsifier.** The prod run is RED wherever a row does not hold (no "before" exists for an already-served cure). Each row's local falsifier is re-run once on `5001d2f^` in a worktree, to record the RED-before the commits never wrote down, and once on `5001d2f` for the GREEN.

---

### F-D4 · The version model is told the truth: PATCH is a mutation
**Items:** FW6-G1 (chain depth), FW6-G2 (set_hash on PATCH), FW6-G3 (palette_slug clearable), FW6-G4 (PATCH field set = atom set).

**Root (one).** There are two write paths for the same atom bag. Create and remix go through `atomdiff.enumerate_atoms` → `set_hash` → `_write_root_version` (visualizations.py:114; depth 0, `parent_hash=None`). PATCH (:409–411) is a bare `$set` of the non-None fields. So PATCH cannot clear (G3), never re-hashes (G2), never versions (G1), and accepts a field set unrelated to the atoms (G4). The depth, parent and root quadruple carries no information because the only writer always writes the root.

**Decision.** Keep the quadruple. It is the shared fork-edge vocabulary that value.js defines for O-119 (`parentHash`, `forkedFromHash`, `rootHash`, `depth`), and dropping it on the fourier side would break the cross-repo contract that F-D9 asks fourier to co-sign. This executes the "write a depth-1 version" arm of the ruled disposition.

**Gestalt cure:**
- Generalise `_write_root_version` into one `_write_version(db, viz, atoms, parent: Version | None, atom_ops, now)`. It derives `depth = parent.depth + 1`, `parent_hash = parent.set_hash` and `root_hash = parent.root_hash` when there is a parent. The content-addressed `_id` keeps idempotence.
- PATCH splits its body into **metadata** (visibility, title, description, tags: not atoms, no version, stated in the model docstring) and **atoms**.
- `VisualizationUpdate` gains `active_bases`, `n_harmonics`, `contour_settings` and `animation_settings`, so the PATCH atom fields equal `ATOM_KEY_ORDER`. Each field keeps the create-model validator.
- Atom changes are applied with the remix idiom (`model_fields_set`): omitted inherits, `null` clears (`palette_slug` only; the other atoms reject null with 422), and a value rebinds. Then the code computes `set_hash(enumerate_atoms(doc))` and `diff_atoms(head, child)`. If the hash changed, it writes `_write_version(parent=head)` and `$set`s `set_hash` in the same transaction (the compose stack is a replica set, so transactions work).
- A PATCH that changes no atom writes no version; that path is idempotent.

**Falsifier (pytest, no `-n`, against the compose test stack).** `tests/api/test_patch_versions.py`:
1. Create, then PATCH `n_harmonics`. Assert a version with depth 1, `parent_hash` = the root hash, `root_hash` = the root hash, and a stored `set_hash` equal to the recomputed one. (G1/G2: RED today.)
2. PATCH `palette_slug: null`, then read it back: absent. PATCH omitting it: inherits. PATCH with a slug: rebinds. (G3: the null arm is RED today.)
3. Assert the field set of `VisualizationUpdate` minus the metadata set equals `ATOM_KEY_ORDER`. (G4: RED today.)
4. PATCH only the title: no new version, `set_hash` unchanged.

RED ×2 before, GREEN ×2 after; the existing remix and provenance tests stay GREEN.

**Expected frames.** `/v/:slug` provenance panel after an edit: a chain of two (root → depth 1).

---

### F-D5 · Reads are gated by one predicate and have no side effects
**Items:** FW6-G5 (breadcrumb redaction), FW6-G6 (mutating GET), FW6-G11 (image remediation).

**Root (one).** Readability is decided per route, not by one predicate, and GETs write.
- The breadcrumb walk (:860–891) calls bare `find_one` on each parent and emits the lineage fields of private or draft ancestors.
- Image blob, thumbnail and overlay GETs (images.py) have no visibility gate, are served `public, max-age=86400`, and refresh janitor recency (`touch_document`).
- `GET /visualizations/:slug` runs `$inc views` and `$set last_accessed_at` (:273).

**Gestalt cure:**
- `_readable_or_none(db, slug, viewer)` (:494) becomes the only read gate. The breadcrumb routes every hop through it, and an unreadable hop is emitted as `{kind: "unavailable", ordinal}` (the cycle guard and the 50 cap stay). The `ForkCrumb` model becomes a discriminated union, and the web panel renders "an unavailable ancestor" as a muted row.
- An image inherits readability from the visualizations that reference it: it is readable if any readable visualization references it, or the viewer is its owner. Blob and thumbnail GETs go through `_image_readable_or_none`. Public reads keep `public, max-age=86400, immutable` on a **versioned URL** (`/images/:slug/thumbnail?v=<content_hash>`). Owner-only reads are `private, no-store`.
- GETs never write. Recency, the janitor's retention signal, moves to the write and fork verbs plus the owner's explicit open. Views move to `POST /visualizations/:slug/view`, which the web fires once per session-visible open with `navigator.sendBeacon`. The FR-GV-24 lock holds: no test asserts a re-open increment.
- Add `DELETE /images/:slug` for the owner. It is refused with 409 while a visualization references the image, and quarantines to soft-delete otherwise. The janitor's grace hard-delete removes the blob, the thumbnail and the cached contours.
- No auth proxy is assumed.

**Falsifier (pytest).** (a) A private ancestor in a three-deep fork chain: the breadcrumb hop is `{kind:"unavailable"}` and contains no slug, set_hash or author. (b) An anonymous GET of a private image's blob and thumbnail returns 404. (c) An anonymous GET leaves `last_accessed_at` and `views` unchanged. (d) DELETE of a referenced image returns 409; of an unreferenced one, 204, then 404 after grace. All RED ×2 before, GREEN ×2 after.

---

### F-D6 · Admin writes are stated, attributed and cascaded
**Items:** FW6-G8 (flag cascade at hard delete), FW6-G9 (actor field), FW6-G10 (stated tier transitions), FW6-G12 (one checked shape).

**Root (one).** The admin plane writes without a model of its own transitions: unconditioned `update_many` (admin.py:438), an actor smuggled into `ip_hash` (janitor.py:56/:95), no entity-keyed cascade, and 12 of 13 routes with unchecked shapes.

**Gestalt cure:**
- `AdminAuditEntry` gains `actor: {kind: "user" | "system", id}`. Both writers (`log_audit` and the janitor) fill it, and `ip_hash` is the request's or null, never a sentinel. The S-8 enumeration (grep every `admin_audit` insert) is the coverage proof.
- Tier transitions become a table, `featured ↔ normal` and `normal → saved`. The write is `update_many({slug in S, tier: from, deleted_at: None}, {$set: {tier: to}})`, and the response reports `affected` and `skipped` per slug. The flagged listing filters on the same predicate. The 428 escalation stays killed.
- At grace hard-delete, `pinned_cron` cascades flags by `content_hash` (the entity key) as well as by `reporter_slug`. The softdelete docstring says so. This depends on the G11 ruling (F-D5): images join the same cascade.
- Every admin route declares a `response_model`, and a test walks `app.routes` and asserts each admin route has one.

**Falsifier (pytest).** (a) A system janitor action has `actor.kind == "system"` and `ip_hash` null. (b) Unfeaturing a `saved` viz is skipped and does not overwrite. (c) A hard-deleted viz leaves 0 flags keyed to its hash. (d) The route walk finds 13/13 routes with a response_model. RED ×2 before, GREEN ×2 after.

---

### F-D7 · Cache identity covers what extraction consumes; editor contours are authoritative
**Items:** FW6-G13 (cache key ⊇ consumed fields), FW6-G14 (contour provenance on write).

**Root (one).** Extraction identity and provenance are written by hand instead of being derived from the settings model. `extraction_cache_key` (image_storage.py:289–308) lists fields by name and misses `ml_threshold` and `ml_detail_threshold` (shared.py:37–38). Editor contours are stored without bounds, and re-extraction may overwrite them.

**Gestalt cure:**
- The key payload becomes `settings.model_dump(include=EXTRACTION_FIELDS)`, where `EXTRACTION_FIELDS` is a frozenset declared on the settings model next to the fields the pipeline consumes. Bump `_v` to 4.
- A unit test asserts `EXTRACTION_FIELDS` equals the set of settings attributes the pipeline reads. It is collected by an `ast` walk of `api/services/extraction*`, so a new consumed field cannot slip out of the key again.
- `store_contour_asset(source="editor")` derives `image_bounds` on POST from the contour's own extent and the image's dimensions. The backfill on GET (dependencies.py:102–165) is deleted, because GETs never write (F-D5).
- Extraction's upsert filter excludes `source: "editor"`, so a re-extract writes a sibling asset and never overwrites the editor's.

**Falsifier.** (a) The same image with `ml_threshold` 0.3 → 0.6 gives different `contour_hash`es (RED today: the cache hit returns the same one). (b) An editor POST has `image_bounds` set on the stored doc. (c) A re-extract after an editor save leaves the editor asset byte-equal. RED ×2 before, GREEN ×2 after. Run with `COMPUTE_CONCURRENCY=1` (the ML models load).

---

### F-D8 · One BasisKey unit, and the @layer law in lint
**Items:** F.W3 g15 (BasisCanvas.vue:313), F.W3 g16 (the @layer lint rule).

**Cure.**
- `BasisCanvas.vue:313`'s `basisKey.startsWith("fourier") ? "fourier" : basisKey` becomes `normalizeBasisKey(basisKey)` from `lib/basis.ts`, and the label uses `basisModeLabel`.
- The lint half is a small local ESLint rule, `fourier/no-naked-layer`, in `web/eslint/rules/`, run over SFC `<style>` blocks through `vue-eslint-parser`'s style tokens or a stylelint `at-rule-allowed-list`-style custom rule. It fails on any `@layer` block other than `glass-overrides`. Pick stylelint if the repo will grow more CSS rules; this seat recommends stylelint with `postcss-html`, since it parses SFC styles natively. It is wired into CI's lint step.

**Falsifier.** (a) A grep cell: `git grep -nE "startsWith\\(.fourier" web/src -- ':!web/src/lib/basis.ts'` → 1 today, 0 after. (b) A mutant fixture, `web/eslint/__fixtures__/naked-layer.vue` with `@layer components {}`, makes the rule fail (RED); the same fixture with `@layer glass-overrides {}` passes. The real tree passes. ×2.

---

### F-D9 · fourier's coordination ledger is booked and answered
**Items:** O-119 co-signature ⊕ the O-132/O-133 follow-up, O-132-ID-COLLISION, G-F10-2 (inbound-mail parity), G-F10-1 (ADOPTION-ASKS fourier leg).

**Root (one).** Letters were sent to fourier with no fourier seat live to book them, so fourier's `docs/tranches/F/coordination/INBOX.md` has no verbs for anything X·F sent. Value-side ids also collided because ids were allocated at the moment of writing, not at send.

**Cure (a fourier-side seat, docs only):**
- In fourier's INBOX, one dated §1 row per letter with a terminal verb: FN-1..FN-7 (FN-5's "before or with M.W10" rider is re-scoped to X·F, because M.W10 closed with F), the 2.0.0 note, O-27, O-44, O-119 and the follow-up (O-133). M-1 and M-2 are closed or re-homed with dated provenance.
- The O-119 co-signature answers on the fork-edge vocabulary. fourier's `VisualizationVersion` already carries `parent_hash`, `forked_from_hash`, `root_hash` and `depth`, which map to value's `parentHash`, `forkedFromHash`, `rootHash` and `depth`. The answer is **CO-SIGNED, conditional on F-D4**, because before F-D4 fourier's depth is always 0. The value INBOX then records READ+ACKED.
- In fourier `docs/constellation/ADOPTION-ASKS.md`, a dated addendum-beside sets Ask 3 to ADOPT (repo half landed, host half named), Ask 5 to DONE for value with the keyframes half open, inv-22-color to DONE (`api.color` `/docs`, `/openapi.json` and `/health` returned 200 on 2026-11-04), and cascade-vjs to SPLIT per the R.W7 letter.
- Value INBOX erratum: the fourier follow-up is **O-133** (as `value-DESIGN.md` §2 already allocates), and glass's booking keeps O-132 (`b2eb9950a`). Beside `web/e2e/producer-held.json`'s contrast pairs, add a note: "value O-97 = glass O-98 (glass BL/audit/INBOUND.md:60; glass O-97 is EASING-CURVE-GLYPH)". From now on, ids are allocated at send time.

**Falsifier.** A grep cell: `grep -cE "FN-[1-7]|O-119|O-133|O-44|O-27" docs/tranches/F/coordination/INBOX.md` → 0 today, ≥ 11 rows with verbs after. The ADOPTION-ASKS rows no longer read "re-affirmed G.W8" for Ask 3, Ask 5, inv-22-color or cascade-vjs. And `grep -n "O-132" value INBOX` resolves to one letter plus the erratum.

---

### F-D10 · The canonical addenda: the census rows are homed
**Items:** F.W3 g17 / F.W0 G-12 (shadow aggregate), F.W0 G-15(d) (the ruling-6 emission rider), F.W1 G20 leg (b), F.W4 G-F4-CARRY-CLOSURE leg (b) (D-1), F.W4 G-F4-CENSUS-CELLS (D-6), F.W4 G-F4-ANCHORS.

**Root (one).** Each wave proved its rows in its *execution* record and never wrote them back into the *canonical* docs that their gates read (SUBSTRATE-LEDGER, waves/F-W1.md, the residual register). E-3 forbids patching those docs, so each one gets a dated addendum-beside.

**Cure, per row:**
- **SUBSTRATE-LEDGER §G-12:** the shadow-surface aggregate (the 9 components, the stated sum, the canvas-lib split) and the derivation command, re-run at the current HEAD.
- **SUBSTRATE-LEDGER §G-11:** anchor rows 12–18 from F-W4-CLOSURE §4, each anchor re-resolved at HEAD first (path:line still names the same symbol). Any anchor that has moved is re-pointed, with the old and new locations given.
- **G-15(d):** the served `index-B0pcU8kT.css` contains `class*=size-])` (2 hits). The decider: whichever banked cell said the `size-` attribute selector would *not* be emitted is the cell that lost. Grep the built CSS ×2 (`npm run build` under guarded, plus the served file), then land the canonical erratum in F-W0 naming the losing cell (fr-PaperSearch MISS-A7 or D-24/K1).
- **G20 (b):** in waves/F-W1.md §10, an addendum with one CITED token for fr-ExportModal R2-1 at §2·R2a.1, and a CITED row for fr-ContourSettings M-4 held at F.W3/W4 beside m-17.
- **G-F4 carry (b):** for each of fr-ConvergenceLegend C-11, fr-ConvergenceTimeline M-5, fr-EquationPanel D-L1, fr-FullscreenViewer FM-4 and fr-VisualizationView L-23, either verify it cured at HEAD (with a byte receipt) or home it to a named unit in this document. ConvergenceLegend and ConvergenceTimeline sit beside F-D2 and are re-read there.
- **G-F4 census:** two addenda correcting the `raw-findings.json:2968` cell (.c) and the HLG-8 claim (.a), plus a residual-register row.

**Falsifier.** Re-run each gate's own leg on the tree before (RED, as recorded in the C/ files) and after (GREEN): G20 leg (b) ×2, G-F4 carry leg (b) ×2, the G-11 anchor resolver ×2, and the G-15(d) grep ×2.

---

### F-D11 · The library window reaches its third consumer
**Items:** FOURIER-REPIN (value.js 4.0.0 → the current minor), F.W2 G15 (easing Δ = 0, ESC-4).

**Root.** fourier pins `^4.0.0` and installs 4.0.0. The X library window (4.1.0's analytic easing arms and retired transform names, and 4.2.0) has not reached fourier.

**Cure.**
- Commit 1 repins `@mkbabb/value.js` to an **exact** published version (the latest at execution: 4.2.0, or 4.3.0 if V-D4.2 cuts first), following the keyframes precedent. Lock integrity must equal the registry's `dist.integrity`. Migrate every retired transform name at its consumer, with no shim (feedback-no-backwards-compat).
- Commit 2 is the dependency pass: glass 10.1.4 is **skipped** (it carries only deck and DataTable cures, with no fourier rows; fourier adopts at 10.1.5 or 10.2.0 with the relays below), keyframes.js 6.0.0 → 6.2.1, and latex-paper 0.2.1 → 0.3.0.
- ESC-4: re-run the 22×1001 sampler ×2 against 0.13.0. The four producer-direct keys are expected to leave a residual of at most 4.563e-6 (ease-in-out-back). The **owner/delegate ruling is asked (O-F3)**. This seat recommends the bar "|Δ| ≤ 1e-5, with algebraic equivalence shown". Without a ruling, ESC-4 stays literal and RED, with no in-file redefinition.

**Falsifier.** `npm ls @mkbabb/value.js` reads the exact version, and the lock integrity matches `npm view … dist.integrity`. vue-tsc `-b` rc 0 ×2, vitest ×2 (`--maxWorkers=2`), e2e smoke ×2 (`--workers=1`), and CI green. The sampler table is banked. Before the repin, the sampler's 8-arm cells read the 4.0.0 drift (RED); after it they read ≤ 4.563e-6.

---

### F-D12 · C31: the two-sided reproduction instrument exists
**Items:** F.W8 G3 limb (i).

**Root.** The conformance doc `fourier/conformance/C31-two-sided-reproduction.md` specifies a producer-side harness (`CLIENT_MATCH_SOURCE_DERIVED`, a `control.wrong-reason` arm, `R4.C31`) that was never written. There are 0 hits at `5001d2f`.

**Cure.** Land `tests/conformance/test_c31_two_sided.py` exactly as the conformance doc specifies. The server side derives the client-match source and compares it with the web client's emitted record, which the same test reads through the fixture's recorded client output under `web/e2e/fixtures/c31/`. The `control.wrong-reason` arm must fail for the wrong reason being named, so the control proves the instrument can see. Then run the close-gate walk ×2 on a non-production compose stack (`docker-compose.yml`, `COMPUTE_CONCURRENCY=1`, guarded). This seat does not recommend retiring the limb under OG-F1: the instrument is small and now inside X's write hand.

**Falsifier.** The control arm is RED by construction (it must fail) and the match arm GREEN, ×2. The gate reads 0 hits today and the instrument present after.

---

### F-D13 · F.W10 is stamped ACCEPTED
**Items:** F.W10-ACCEPTED ⊕ G-F9-8's last fixme. This unit is gated on relay R-F5.

**Cure.** On the glass publish that lifts SegmentedTabs' inactive underline ink to ≥ 4.5:1: repin, delete the `test.fixme` and its rationale at `visualization-crud.spec.ts:641`, run the a11y keystone GREEN alone ×3 and in the suite ×2, and re-sit F.W10S.d (G-S-1 plus .b's five: G-F9-11 is already ✓ in CI 41809598775). Then stamp ACCEPTED in a LEDGER event.

**Falsifier.** The keystone is RED under the fixme removed on the current pin (4.33:1) and GREEN on the new pin.

---

### F-D14 · The owner's standing design asks on fourier
**Items:** proportion, breath of life, the dock and transitions, mobile centring, cube orbit refinement. These are read from §0's frames.

**Mobile centring.** GREEN in all 60 cells: the dock centre offset is 0 and overflow is 0. There is no row. F-D3's re-reads keep it as a standing assertion.

**The dock and transitions.** The dock rows (D-9, D-26, D-34, D-22-glass) are glass-owned or owner-held: relays R-F1, R-F2 and R-F6, and owner ask O-F2. fourier adds no app-local press and no local dock seat. Its contribution is the adoption read on each glass publish: the dock box at 390/844×390/1440, the press scale after O-F2, and the menu icon gap.

**Proportion: F-D14a, the short-landscape morph stage.** At 844×390, `/morph` stacks the page title (left-aligned at the 16 px gutter), a centred square stage card (about 270 px wide, cut by the fold) and the controls below the fold. The title column and the stage do not share an axis, and the instrument is never fully visible. `/equation` already solves this viewport with the 75aed4c D-8 rule (`(orientation: landscape) and (max-height: 500px)`: stage and panel side by side).
- **Cure.** `/morph` takes the same query and the same grid: the stage on the left at `block-size: calc(100svh − dock − 2 × gutter)` with `aspect-ratio: 1`, and the controls on the right in a scroll region. The title row sits inside the controls column. One media rule, shared with `/equation` as a named custom media (`@custom-media --short-landscape`) if the build supports it, or a shared class on the view root. Never a per-route copy.
- **Falsifier.** At 844×390, the stage's bottom ≤ 390 and its centre on the left column's axis, the controls' first slider is visible without scrolling, and overflow is 0. RED today (the stage is cut by the fold), GREEN after, ×2, light and dark, with frames Read. The 390 and 1440 goldens are unchanged.

**Proportion: F-D14b, /morph's readout belongs to its stage.** At 430, the PHASE / N / SHAPE / TOTAL readout hangs between the stage card and the controls with no container, sitting on the page grid.
- **Cure.** The readout becomes the stage card's foot (inside the card, the same type, a hairline above it), as `/equation`'s N = 8/8 sits inside its stage.
- **Falsifier.** The readout's box is inside the stage card's box at 390, 430 and 1440. RED today, GREEN after, ×2.

**Breath of life: F-D14c, the mobile /equation opens on the instrument.** At 390, `/equation` opens on the **Controls** tab, so a first visitor sees a form and not the convergence sweep, which is the app's signature motion. At 844×390 and wider, the sweep is the first thing seen.
- **Cure.** The 390/430 panel default becomes **Canvas**, with Controls one tap away. The user's last-chosen tab still persists, so this changes only the first visit. This touches the app's identity motion, so it is gated on **owner ask O-F6** below, and the seat does not ship it without a yes.
- **Falsifier.** A first-visit context at 390 shows the plot canvas in the viewport, and the rAF sweep runs (p50 ≤ 9 ms). RED today, GREEN after, ×2.

**Cube orbit refinement.** fourier has no cube; the keyframes design pass owns it.

---

## 2 · Glass relays (to glass-ui-b5 via SendMessage, logged in INBOX)

Ids are allocated at send time (the F-D9 rule). This seat drafts them; the orchestrator sends them. Each relay opens with `fourier (X·F) → glass-ui-b5`. Value already holds O-134..O-136 for its own relays, so the provisional ids here are O-137..O-142.

**R-F1 (O-137) D-9, the Slider thumb at its extremes:**
> fourier (X·F) → glass-ui-b5. At its minimum, the integrated-thumb `Slider` paints a bare track with no thumb: fourier /morph "Morph", range 50..800, at 50. The served app on 2026-11-04 also shows the mirror case: at its **maximum** ("Displayed harmonics" 9 of 9 on /equation, at 390 dark and 1440 light; frames in value.js `docs/tranches/X/realization/fourier-design-frames/`) the fill covers the whole track and no thumb is visible. fourier pins 10.1.3, and 10.1.4 carries no Slider change. Ask: the fill keeps `min-inline-size` equal to the thumb diameter, so the thumb is visible and the same size at min, mid and max. fourier's gate is the thumb's border box at min, mid and max: equal size and inside the track, at 390 and 1440, light and dark. fourier adopts at the repin with no local shim. Which release carries it?

**R-F2 (O-138) D-34 ≡ O-76, the MENU-ICON-GAP:**
> fourier (X·F) → glass-ui-b5. `DropdownMenuItem` lays its icon about 3 px from its label (fourier AppDock.vue:230–240: Smooth, Simplify, Reset). fourier's e2e honest-red row 3 (`f-w14v-c3.spec.ts` c3g) expires "at glass 10.2.0 repin". Ask: an icon-slot gap token on DropdownMenuItem (for example `--menu-item-icon-gap`, defaulting to the menu's inline padding rhythm). fourier deletes the producer-held row on adoption, with no consumer override. Please confirm 10.2.0 still carries it.

**R-F3 (O-139) O-90, the TOAST-FOCUS-PROXY:**
> fourier (X·F) → glass-ui-b5. The glass Toaster (reka `ToastViewport`) renders `aria-hidden` focus proxies with `tabindex=0`, so axe reports serious aria-hidden-focus. That turns four fourier admin keystones RED (producer-held rows 4–7, expiry 10.2.0; CI 41809598775 honest-red step). 10.1.4 has no Toaster change. Ask: make the sentinels inert or non-focusable while no toast is present (`inert`, or `tabindex=-1` with the hidden state). fourier repins, the honest-red reporter flips the rows, fourier deletes them, and the admin axe runs GREEN ×2. Please confirm the 10.2.0 placement.

**R-F4 (O-140) O-97 (glass O-98), the CONTRAST-FLOOR pairs:**
> fourier (X·F) → glass-ui-b5. On id mapping: value's O-97 is your O-98 (BL/audit/INBOUND.md:60); your O-97 is EASING-CURVE-GLYPH. fourier's held pairs are `--tier-featured` (1.384:1), `--tier-saved` (2.461:1), and HLG-37 `--card` vs `--background` (1.000:1). Their expiry is the 10.2.0 repin. Ask: confirm the 10.2.0 rungs lift each meaning-bearing pair to ≥ 3:1 (1.4.11 non-text) without moving fourier's cream identity hues, which are owner-ruled. GAB-1 [plate/page] stays a ruled residual (§0fk.1) and is not reopened by this relay.

**R-F5 (O-141) A-3 / E-F10S-b2, the SegmentedTabs inactive underline ink:**
> fourier (X·F) → glass-ui-b5. The last F.W10 blocker is producer-caused. `SegmentedTabs`' inactive underline ink measures 4.33:1 on fourier's cream (E-F10S-b2, relayed as A-3). The a11y keystone `visualization-crud.spec.ts:641` is `test.fixme` on it. Ask: lift the inactive rung to ≥ 4.5:1, either inside the 10.2.0 ink-veil work or a patch. Please name the release. fourier then stamps F.W10 ACCEPTED (F-D13).

**R-F6 (O-142) D-22-glass (withdrawn) and D-26 (press token):**
> fourier (X·F) → glass-ui-b5. (1) Withdraw letter §0hm.1 item 10 (a compact dock block-size token "if none exists"). fourier's 75aed4c cured D-22 by consuming your existing compact block inset (60 → 52 px), so no new token is asked. (2) D-26: the owner rules the press direction and weight (owner ask O-F2 below). Until then, hold the 0.96 default. On the ruling, `--dock-press-spring` is the one source, and every fourier dock seat consumes DockIconButton with no app-local press.

---

## 3 · Owner asks (exact)

| # | Item | The ask | Recommendation |
|---|---|---|---|
| O-F1 | D-4 (F0hm-1) | "The fourier gallery is empty (`GET /api/visualizations` → `items: []`), and /w opens on an empty card, so a first visitor never sees an epicycle draw. Will you publish `assets/portraits/daraksha.jpg` (already public in the repo) plus one or two other committed portraits as public owner visualizations? Daraksha's outfit photos stay unpublished, as you ruled. Optionally, /w's empty state links 'or watch Daraksha'." A seat re-reads `/api/visualizations` ×2 after. | Publish daraksha.jpg plus one geometric portrait. Add the /w link only after the item exists, never a client-side fake sample. This is the same ask as value A-15, so answer once. |
| O-F2 | D-26 (S4-6) | "Dock press: should it press in (0.96, fourier) or out (1.07, value), and how deep? Should keyframes adopt it?" | Press in, 0.96, all apps, through `--dock-press-spring`. This is the same ask as value A-4, so answer once. |
| O-F3 | F.W2 G15 / ESC-4 | "fourier's easing keys differ from 0.13.0 by at most 4.563e-6 (1–2 ULP, ease-in-out-back) after the 4.1.0 analytic restoration. Does an algebraically equivalent sub-1e-5 residual satisfy ESC-4's 'EQUAL at every sample', or must it be bit-equal?" | Accept ≤ 1e-5 with the equivalence shown. Bit-equality would bind the library to 0.13.0's operation order forever. |
| O-F4 | D-37 ⊕ FW6-G15 | "/morph's sun and moon paths self-intersect at n = 50. Either keep `sun.json` and `moon.json` frozen (the FW6-G15 tripwire stays RED and is recorded as permanent), or have them re-authored as clean contours with G5c's diagnostics row and a golden-file diff (never regenerated on master). Which?" | Re-author. The self-intersection is visible in the morph, and the tripwire was built to close this way. |
| O-F6 | F-D14c | "On a phone, /equation opens on Controls, so a first visitor sees a form before the convergence sweep. Should the first visit open on Canvas (Controls one tap away; your last choice still remembered)?" | Yes. The sweep is the app's breath of life, and it already runs at 120 Hz at 390. |
| O-F5 | F-D1 host leg | "The deploy hook for `5001d2f` was accepted but wrote no outcome. A seat needs to read the host's webhook receiver log and `/var/log` deploy-hook lines around 2026-11-04T10:34:59Z. May a seat ssh to the host to read them (read-only), or will you paste them?" | Allow the read-only ssh. The cure (F-D1) does not depend on the answer, but the issue #3 close cites it. |

---

## 4 · Other repos (tracked; no fourier bytes)
- **keyframes cube orbit refinement:** the cube is the keyframes.js surface. fourier ships no cube, so it has no row here. The kf design pass answers it.
- **daraksha v2:** that workflow owns `~/Programming/daraksha`. O-F1's portrait publish is fourier's and does not touch it.

## 5 · Order of execution
1. **F-D1 first.** The deploy of record is wrong, and every later unit's "served ×2" read depends on a truthful record.
2. F-D3 (records only, a prod run) in parallel with F-D9 and F-D10 (docs-only seats on fourier).
3. API serially, one heavy run per seat: F-D4, then F-D5 (it depends on F-D4's version writer), then F-D6 (the G8 cascade uses F-D5's image ruling), F-D7 and F-D12.
4. Web: F-D8, then F-D2 (it carries the D-17-GPU cell), then F-D14a/b (and F-D14c on O-F6's yes), then F-D11 (repin last, so its e2e ×2 runs over the new web bytes).
5. Owner asks O-F1..O-F6 go out as one message now, merged with value's A-4 and A-15.
6. Glass relays R-F1..R-F6 go now. On each glass publish ping: repin, flip the producer-held rows, and run F-D13.
7. Each unit closes with: falsifier RED→GREEN ×2, frames Read, an attributed re-mint where needed, a pathspec commit to fourier, CI green, the deploy record OK at the SHA ×2 (after F-D1), and a COHESION and LEDGER addendum in value.js.
