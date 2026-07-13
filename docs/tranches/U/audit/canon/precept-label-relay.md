# U-F75 — precept-stale-label · RETIRE (relayed-and-recorded — the label is already superseded upstream)

**Family**: U-F75 `precept-stale-label` · **Wave**: U.W-CANON (CANON-SYNC cluster) ·
**Disposition**: **retire** (label-only; the `<app>.babb.dev` convention IS followed) ·
**Outcome**: **RELAYED-and-RECORDED** (NOT edited-in-submodule) · **No gate** (one-shot; no ongoing
defect once discharged) · **Spec of record**: `../registry.md §19` + `../../waves/U.W-CANON.md §U-F75`.

---

## §1 The defect (registry §19, verified live at the pinned SHA)

`docs/precepts/infra/domains.md:25`, **at the SHA the superproject pins** (`63240e6`), names
value.js's app "palette":

```
| palette | palette.babb.dev | api.palette.babb.dev |
```

The landed reality is **"color"** (`color.babb.dev` / `api.color.babb.dev`). The `<app>.babb.dev`
convention IS followed — only the **illustrative label** was stale.

---

## §2 The foreign-tree reality (why RELAY-and-RECORD, not edit-in-place)

`docs/precepts` is a git **submodule** (`git@github.com:mkbabb/precepts.git`). Its live topology at
execution:

| Ref | SHA | Relation |
|---|---|---|
| superproject gitlink (checked-out HEAD, detached) | `63240e6` "infra: promote tls/blob-backend-dr/deploy + new domains precept (fourier D.W2)" | the PINNED tree — carries the stale `palette` label |
| `origin/main` (published tip) | `8781ebb` "infra truth: the deploy contract lands, the fourier residue exits, three decisions declared" | **40 commits AHEAD**; `63240e6` is its **direct ancestor** (clean fast-forward, no divergence) |

**The precept dev process has ALREADY corrected this.** The `8781ebb` rewrite of `infra/domains.md`
(commit range `63240e6..origin/main`, one touch: `8781ebb`) **removed the per-app label rows
entirely** — a `git show origin/main:infra/domains.md | grep -i 'palette\|color'` returns **zero**
hits (the file was rewritten around the sudoku reference-API path; the stale `palette` row does not
survive). The stale-label defect is **discharged at source**: it lives ONLY in value.js's *pinned*
(40-commits-old) SHA, not in the published precept.

**Why a direct in-submodule edit was REJECTED (E-3 · SWEEP-SAFETY):**

- A one-line edit committed on top of the pinned `63240e6` would **fork a divergent side-branch**
  off a base that upstream has already superseded — a stale-base shim, exactly the class E-3
  forbids ("no legacy shim").
- The resulting gitlink would point to a **local-only commit not on `origin/main`** → a fresh clone
  / CI `git submodule update` could not resolve it (a broken pin), unless force-pushed to the
  precepts remote — a reckless cross-tree write the SWEEP-SAFETY law counsels against
  ("WHEN IN DOUBT, RECORD/RELAY instead of a reckless cross-tree write").
- The narrow "relabel `palette`→`color`" edit is **moot**: upstream did not relabel the row, it
  **removed** it. There is no `color` row to write; the defect is 0 upstream by supersession.

---

## §3 The disposition (RELAYED-and-RECORDED · RETIRE)

- The one-line label correction is **discharged by the upstream precept dev process** (`8781ebb`
  superseded the `palette` row). Recorded here so **no successor re-opens** U-F75 believing the
  label is still uncorrected at source.
- **No in-submodule commit, no gitlink change** is made by this lane: the submodule working tree is
  left **clean at `63240e6`** (no fork, no orphan pin). This is the honest WHEN-IN-DOUBT-RECORD path.
- **DELTA**: stale precept label **as a live upstream defect: 1 → 0** (superseded at source). The
  residual — value.js's *pinned* SHA is 40 commits behind the published precept — is a **precepts
  pin-advance**, not a label edit, and is BOOKED below (out of this narrow label-lane's scope).

## §4 BOOK — the precepts pin-advance (owner-decidable · out-of-scope-here)

> **BOOK → owner-decidable / constellation precepts-adopt.** Advancing value.js's `docs/precepts`
> gitlink `63240e6 → origin/main` (`8781ebb`, a clean fast-forward, +40 commits) would materially
> land the already-published correction (and 39 unrelated precept advances: motion-canon,
> design-idioms §11/§12/§13, meta-language pruning, …) in value.js's tree. That is a **precepts-adopt
> event** — a broad, cross-repo-coordinated content advance, **not** the "one-line label fix" U-F75
> scoped — and other constellation repos submodule the same precepts at their own pins. It is
> **out of scope for this label lane** and left owner-decidable (re-probe at U.W-CLOSE or a dedicated
> constellation precepts-adopt). Named, not dropped.

## §5 Cross-repo RELAY — CHECKED, NOT-triggered

U-F75 touches a **precept doc**, not a glass-ui component or the glass-ui-level contract. The precept
correction already lives upstream; value.js records the discharge and books the pin-advance. **No
glass-ui BH relay row triggers** (a precept-tree concern, not a producer surface).
