# M — Fold-ledger (the consolidated deferred + chronic census)

Every deferred / chronic / P0 item from the two-wave 12-agent post-L audit (2026-06-04),
with its fold-disposition. The detail lives in the wave findings files
(`/tmp/m-w1-{A..F}.md`, `/tmp/m-w2-E.md` — captured into `audit/wave1-2-synthesis.md`).

**Disposition key**: FOLD→M.Wn (lands in that wave) · BOOK (E5-triggered, no M blocker) ·
KILL (retired) · KEEP (befitting, the green substrate M builds on).

---

## §1 — The P0 census (11 distinct P0s, deduped across both waves)

> Wave 1 emitted 13 raw P0 IDs and Wave 2 one (E1–E3 dedup with A1/E3); after merging duplicate
> framings of the same defect (the `development` violation alone carried 5 IDs) the distinct P0 set
> is **11 rows** below. The chronic CH-1/CH-2/CH-3 (aurora/blob) are P1-severity *chronics* tracked
> in §2 — listed here only by their fold-link, not double-counted as P0s.

| ID (wave) | Title | Fold |
|---|---|---|
| A1/C-LIVE/D-1/E1/F-INV4 | `development` export precept-violation LIVE (`package.json:27`); value.js is the SOLE constellation exports-map violator | **M.W1** |
| A2 | L closed against an invalidated precondition (post-W2 re-preconditioned L on K.W2.5-green, never ran) | **M.W9.D** (re-confirm L close on the post-W1 substrate) |
| A3/D-3/F-W26 | Desktop pane-visibility P0 (Tailwind v4 `@source` gap; `grep @source` = 0) | **M.W2.A** |
| C-REKA *(corrected by review)* | reka is ONE install at `^2.0.0` (K.W2.5 §4's single-install diagnosis was CORRECT; the audit's "two copies" was wrong). The real item: the demo declares `reka-ui ^2.0.0`, behind glass-ui's reka | **M.W1.C** (bump `^2.0.0 → ^2.9` + install + lockfile guard — NOT a 2-copy fix) |
| C-DTS/E4 | glass-ui (+keyframes) `build:watch` JS-only — the dts-freshness keystone unmet even in 3.2.0/3.0.0 | **M.W7** (glass-ui dts-watch cohort ask) + cohort note to keyframes |
| D-2/E2/F-CH1-8 | glass-ui 3.2.0 shipped WITHOUT the blob-lift/dock-fix → the K.W3 "3.2.0" anchor is SPENT | **M.W7** (re-anchor on glass-ui 3.3.0) |
| E3 | The publish-spine broke: glass-ui 3.2.0 cut against value.js 0.10.0, not 0.11.0; the aurora cast SURVIVED | **M.W4** (publish 0.11.0 first) → **M.W7** (3.3.0 cut against it) |
| F-AURORA / CH-2 | aurora-derive-from-color — the OLDEST unaddressed mandate (7+ tranches); producer (`deriveAurora`) now shipped | **M.W5** (C2 + VAL-1) |
| F-BLOB / CH-1/CH-3 | blob-extirpation — 2nd-oldest mandate (7+ tranches); both blob dirs still in demo | **M.W7** (cohort lift) |
| L-PC-1 | the WithId read-side transposition L under-measured — **25 `as <Model> & {_id:unknown}` casts / 13 files** across 4 models (Palette ×17, ProposedName ×5, Tag ×2, AdminAuditEvent ×1); the 9 `: X & {_id}` type-annotations are legit, NOT counted | **M.W2.B** (all 4 model repos → `WithId<T>`, not Palette-only — else 8 sibling casts survive) |
| F-PUBLISH-SPINE | publish spine un-started — both peers `file:../` not registry | **M.W4** + **M.W9** (v1.0.0 registry consumption) |

## §2 — The chronic spine (3+ tranche carry — from the H/K/L ledger lineage)

| ID | Item | Carry | Live-state | Fold |
|---|---|---|---|---|
| CH-1 | Metaballs/GooBlob API → glass-ui lift | A→K ~9 | bespoke in demo | **M.W7** (W-LIFT) |
| CH-2 | Aurora derive helper — the real glass-ui export is **`deriveAurora`** (the spec's `deriveAuroraPalette` was a ghost) | A→K ~9 | producer shipped (3.2.0); consumer unwired | **M.W5** |
| CH-3 | `BlobDot`/WatercolorDot lift (9 consumers) | A→K ~9 | bespoke in demo | **M.W7** |
| CH-4..CH-8 | glass-ui primitive asks (Select size, clampLabel, Tooltip mono, Button icon-sm, Tabs underline) | A→K ~9 | unshipped | **M.W7** (W-ASKS, in the 3.3.0 cut); CH-6/CH-8 ship-or-KILL |
| CH-9 | `dist/glass-ui.css` font-inlining residual (retires `fs.allow`) | D→K ~7 | glass-ui-blocked | **M.W7** (glass-ui P5 inline) discharges the last `fs.allow` |
| CH-10 | keyframes precept-pin convergence | B→K ~8 | maintainer-signal | **BOOK** (the value.js submodule commit folds to M.W9; keyframes-side stays booked) |
| CH-11 | aurora+blob precept-§10 wire-before-retire (derivative of CH-2+CH-3) | D→K ~7 | open | **M.W5+M.W7** (closes when CH-2/CH-3 ship) |
| CH-13 | fourier Phase-0 quiescence | D→H 5+ | fourier-owned | **BOOK** (chronic-stable; not value.js's lever) |
| CH-14a | gh-pages OIDC-auth half | A→H 5+ | mostly superseded by DEC-9 | **mostly KILL**; residual → **M.W8** (CF-Pages, Ask 5) |
| CH-12 | speedtest CW Phase-2 value.js-participation | retired G | non-consumer | **KILL — permanent** |

## §3 — The K-* carry (K's own deferred items, re-homed into M)

| ID | Item | Fold |
|---|---|---|
| K-INV4 | the `development` violation | **M.W1** (= the corrected K.W2.5) |
| K-W26 | desktop pane-visibility P0 | **M.W2.A** (= K.W2.6) |
| K-DOCK | dock view-select e2e blocker (16 specs RED) | **M.W1** (reka) + **M.W7** (glass-ui W-D) |
| K-PARSE | `parseCSSColor` typing root-fix (0.11.0 head; deletes 9-11 casts) | **M.W3.B** |
| K-VAL1 | VAL-1 OKLab aurora-LUT ship-or-KILL | **M.W5.B** (the J kill-date; no re-book) |
| K-W3DIFF | J.W3 `PaletteDiff.vue` demo CSS-Highlight render (fired-trigger orphan) | **M.W6** (re-homed; carry-forward) |
| K-PALID | demo `Palette` id-honesty (`id?:string` + guards, NOT a union) | **M.W6.D** |
| K-INV5 | inv-K-5 typed degraded-backend (delete `VITE_API_URL` hack) | **M.W6.E** |
| K-DISP | `dispatch.ts` REAL hue-cluster extraction → `mix.ts` (vs K.W2e comment-condense) | **M.W6.C** |
| K-W5RT | modern-web + vue-router 4→5 (keyframes-gated — now SHIPPED 3.0.0) | **M.W6** |

## §4 — The architectural transpositions (the user's "elegance/simplicity/performance" mandate)

| ID | Smell → gestalt fix → win | Fold |
|---|---|---|
| L-PC-1 | repos discard the driver's `WithId<T>` → 4-model read sigs to `WithId<T>`, **25 casts delete**; type flows driver→formatter | **M.W2.B** |
| L-PC-2 | aggregation returns widened to bags (`as Record` ×8, `row.x as T` ×7) → type at the repo-aggregation boundary | **M.W2.B** |
| E1 | two divergent CSS-color→RGB DOM-round-trip resolvers → one library-backed `parseColorUnitToRgb01` | **M.W3.A** |
| E2/T1 | `useWatercolorBlob` un-gated RAF → reuse the existing static path under PRM (treat PRM as `animate=false`) | **M.W3.C** |
| E4/T3 | `useLayerTransition` self-described glass-ui "Local fork" → adopt the glass-ui primitive | **M.W3.C** (or M.W7 if it needs the 3.3.0 cut) |
| K-PARSE | `parseCSSColor` untyped memoize → annotate the return; 9-11 `cssToOklch` casts delete | **M.W3.B** |
| K-DISP | `dispatch.ts` comment-condensed to fit the cap → REAL hue-cluster extraction to `mix.ts` | **M.W6.C** |

## §5 — value.js-owned infra (ADOPTION-ASKS — folded, value.js can self-execute the code side)

| Ask | Item | Pri | Fold |
|---|---|---|---|
| Ask 3 | palette-api rsync deploy-dir → git checkout under canonical root + `deploy-hook.sh` (the N1 fix; the 4th migration gating `dispatch.sh` deletion) | **P1 critical-path** | **M.W8.A** (code side; the host git-checkout step is the maintainer's single op) |
| Ask 5 | value.js GH-Pages → CF-Pages CNAME | P3 | **M.W8.B** |
| inv-22-color | `api.color.babb.dev` 4-endpoint vhost (`/health`,`/docs`,`/openapi.json` → 404 now) | P3 | **M.W8.C** |

## §6 — Doc-drift + reconciliation (the A7 items)

| Item | Fold |
|---|---|
| VAL-9 KILLED but re-bookings not struck from K.md §7 | **M.W9.C** |
| dirty `docs/precepts` submodule (L closed on it) + the contract-v2 lesson commit | **M.W9.C** |
| PROGRESS.md K.W2 still carries the WRONG inv-K-4 framing beside the correction | **M.W9.C** |
| `request-coverage.md` over-claims contract-v2 TS-half ADDRESSED | **M.W9.C** |
| `demo/CLAUDE.md` — L's inadvertent revert | **RESOLVED** (recovered from dangling blob this session) |

## §7 — L-SEED reconciliation (the audit corrected L's close)

| L-SEED monitor | Audit finding | Fold |
|---|---|---|
| cron-txn (re-check at `cron.ts`) | the orphaned-vote sweep is non-transactional — a LIVE TOCTOU, not just a monitor | **BOOK** (name the orphaned-vote race precisely; M.W6 if touched, else booked) |
| bench-script (re-check at `bench/`) | phantom/mis-scoped — `bench/` holds only the color benches | **DROP** (re-scope away the phantom monitor) |
| I-tail conformance residuals | landed at K.W2 api-lane | **KEEP** (closed) |

---

**Net**: 11 distinct P0s, 11 chronic, 10 K-carry, 7 transpositions, 3 infra asks, 5 doc-drift — **all
FOLDED into M.W1–M.W9, BOOKED with an E5 trigger, or KILLED**. Zero items leave M un-dispositioned.
The two oldest user mandates (aurora C2, blob C3) land at M.W5/M.W7. v1.0.0 is the close.
