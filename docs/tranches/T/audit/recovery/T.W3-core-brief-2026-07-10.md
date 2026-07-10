# T.W3-CORE — RECOVERY / RESUME BRIEF (2026-07-10)

> **RESOLVED (2026-07-10, same-day resume)** — the core lane (W3-1 + W3-4 + the MOB-1 rider)
> had landed ALL FIVE commits (`5f89967` → `e04609a`, tree clean) before the session wall; the
> resume's whole-census re-drive caught **one latent defect in the lane's own O-11 gate-5 mint**
> (cured below, `ab-initio` re-run 9/9 green). No product-code mid-state existed — the canonical
> W3 partial signature (a half-stamped rung fleet) is ABSENT.

Per the standing §Recovery rider (`T.W3.md §Recovery`, `T.md §8`, PP-14/PP-15). The resume ran
the protocol's four steps against the LIVE tree:

## §1 Audit-partial

**Branch/head at resume**: `worktree-wf_5011a3ae-57c-2` @ `e04609a`, `git status` clean.
All five per-item commits present (tokens · deploy · DESIGN.md · header · lane record). Bounds
audit re-walked: no `src/`, no boot-chain, no picker-knot, no `App.vue`, no sibling-repo writes;
the three boundary-adjacent hunks re-justified (`GradientStopEditor` = the opaque `bg-card` mint
→ `bg-well`, NOT the CC-1 `.glass-wash` site; eyedropper = Q4 chrome on the producer rung;
`playwright.config.ts` = the byte-identical-default lane-port seam).

## §2 What the whole-census re-drive found (the resume's earned catch)

**O-11 gate 5 FAILED on re-run** (`o11-header-gates.spec.ts:267`): the normal-engine rest read
raced the boot reveal — gate 5 read the veils right after `main` turned visible, WITHOUT the
mount-wait gates 1+2 use, so `readVeils` returned `[]` and the PRM comparison saw
`0.52 !== undefined`. Worse latent hazard: had BOTH reads raced empty, the comparison would have
passed VACUOUSLY on `undefined === undefined` — a green gate certifying nothing.

**Cure (idiomatic, no workaround)**: the sibling gates' own mount-wait discipline
(`await expect(locator(".pane-header").first()).toBeVisible()`) before the normal read + explicit
non-vacuity assertions (`normal.length > 0`, `prm.length > 0`) on both reads. No product code
changed — the header material itself was correct; the MINT was under-deterministic.

## §3 Re-certification (all gates re-driven WHOLE, per the rider)

- O-7 census **3/3** (light + dark walks + the F-8 390 frame) — re-run whole.
- O-11 gates 1–6 **6/6** after the cure (9/9 spec-level with the per-scheme splits).
- `npm run lint` 0 · `npm run typecheck` 0 (lib + demo) · vitest **2171/69** green.
- CSS tripwire re-measured on a fresh `gh-pages` build: `index-*.css` **88,667 B = 86.6 KiB gz
  ≤ 120** (byte-identical to the record).
- Retirement greps re-run: `tier="wash"` / `bg-card/75` / opaque `bg-card` mints / raw
  black-white utilities — **0** in code (citation comments only).
- Tool-artefact grep over every touched doc — empty (M-1).
- Full 6-project playwright at lane close — recorded in the lane record §6 addendum.

## §4 Seam-audit-at-close (record repairs folded)

- The lane record §5 (MOB-1) cited `style.css:429-440` for the D6-03 aspect-law exception — a
  PRE-LANE coordinate this lane's own +31 token lines drifted; repaired to `style.css:460-471`
  in the record addendum (the MOB-1 adjudication's substance is unchanged; the block itself is
  untouched).
- The gate-5 determinism cure + this brief + the record addendum land as ONE recovery commit
  (path-scoped: the spec + the two audit docs).
