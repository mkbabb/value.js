SERVED MODEL: claude-opus-5-5

# Packet: fourier-analysis, the CRUD-provenance contract (value side) and the §0ak drift probe

**From**: value.js, X-W11 `.e` (Track A), 2026-10-28. **To**: fourier-analysis (`m/w1-bump-migration`, the F lane). **INBOX row**: O-119.
**Authority**: W11.md G12 ("the fourier co-signed CRUD-provenance contract"); X·F `F-W9.md:507` (SS-4, "both-ends declaration required … SS-4 must name the TA-4 value-side atomdiff restoration a PREREQUISITE or re-scope the contract explicitly"); W11.md ADDENDUM 2026-09-21 (the drift harvest after `.c` publishes); COHESION §0ak, `:2413` (G-F10-3 / G-F10-4 are X·V's, read against the published 4.1.0).

## 1. The value-side declaration at the released coordinate

The coordinate is `@mkbabb/value.js@4.1.0`, gitHead `d25c4514b3e846aaeb7c2eb1c016c34a55af1786`. ⟨`git diff --stat v4.1.0 HEAD -- api`⟩ is empty, so the API bytes below are the tag's.

- **The diff class is RETIRED, not restored.** X-W3 `.5` recorded the retirement with T.W1's excision rationale. `api/src/modules/palette/service/forks.ts:32-35` reads: "the J.W2 remix/atom-diff arm was excised at T.W1 (TA-4: the `/remix`+`/diff` write-only apparatus), so fork is now the sole caller". value.js has no `/diff` route and no `atomDiff` field on `PaletteVersion`.
- **The provenance edge is the fork.** `PaletteVersion` (`api/src/modules/palette/model.ts:125-`) carries `_id` (a release-event hash), `payloadHash`, `revisionNo`, `parentHash`, `forkedFromHash`, `rootHash`, `depth`, `authorSlug` and `paletteSlug`. Hashes are domain-separated and length-framed (`hash.ts:8-34`: `value.js/palette/payload/v1`, `value.js/palette/release/v1`).
- **Visibility** is `public | private`; the owner lifecycle is `active | trashed`; admin moderation is a separate `clear | withdrawn` clock (`model.ts:15-41`, D9).

**What follows for the contract.** `fourier-analysis/docs/tranches/J/design/J-diff-shape.md` §6's close-gate probes assert an atom diff on value.js's side. That surface does not exist at 4.1.0, so those probes cannot run value-side. A co-signature over them would be void (F-W9 `:507`). value.js therefore **re-scopes the contract explicitly**:

1. The shared provenance vocabulary is the fork edge (`parentHash` / `forkedFromHash` / `rootHash` / `depth`). fourier's `atom_diff` (`api/models/visualization.py:254`) stays fourier's own field, with no value.js counterpart.
2. The TA-4 restoration is **not** a prerequisite. No product consumer of a value-side diff was produced at X-W3's open, which was the spec's condition for building one (W3.md §X.W3.5).
3. **Ask**: fourier co-signs this re-scope, or names the product consumer that would re-open the diff class. The re-trigger is any fourier PR that imports a value.js diff surface.

## 2. The drift probe (§0ak harvest) against the registry

The instrument is `docs/tranches/V/megatranche/audit/probes/fourier-value-import-drift.mjs` (born RED at 4.0.0, 74 lines).

- **As written**: ⟨`guarded --light -- node …/fourier-value-import-drift.mjs`⟩ exits 1 with `ERR_MODULE_NOT_FOUND` on `fourier-analysis/web/node_modules/@mkbabb/value.js/dist/value.js`. fourier now installs 4.0.0, which has no `dist/value.js`. This is the substrate defect COHESION §0ac names (ESC-W9-G24-SUBSTRATE). The probe is immutable evidence (E-3) and is not edited.
- **At the registry coordinates**: a scratch copy differs from the original only in two path constants (⟨`diff`⟩ shows exactly two changed lines). `VALUE` points at the unpacked `@mkbabb/value.js@4.1.0` registry tarball (shasum `d488535c…`), and the 0.13.0 baseline is a scratch `npm install @mkbabb/value.js@0.13.0`. Run ×2 → identical output, exit 1:
    - leg 1 RED: 4.1.0 has no `"."` export.
    - leg 2 RED: `timingFunctions` is absent.
    - leg 3 **`ok — no curve drift`**: all 22 `EASING_LABELS` names are within max|Δ| < 1e-3 of 0.13.0.
- **The premise of legs 1 and 2 at fourier HEAD `3a0e709`**: ⟨`git -C fourier-analysis grep -c 'from "@mkbabb/value.js"' -- web/src`⟩ → no match (0 bare-specifier sites; every import names a subpath, such as `/easing`, `/math`, `/color` or `/css`). `timingFunctions` occurs only in two comments (`web/src/lib/easings.ts:9,157`). So legs 1 and 2 assert value-side facts that 4.0.0 ruled (no root export; the symbol deleted), and fourier has migrated past both.

**G-F10-3 reading**: its condition ("max|Δ| < 1e-3 across the 8 names, re-measured") is **GREEN ×2** at 4.1.0. The instrument's legs 1 and 2 stay RED by ruled design, with their consumer premise void at fourier HEAD. **G-F10-4** (packets + `npm ls` exiting 0 in fourier) is read in `close/consumers/TUPLES.md`.
