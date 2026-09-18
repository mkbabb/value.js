SERVED MODEL: claude-opus-5[1m]

# X.P.W2 — the seats' own printed records, folded at the second sitting's close

`W2.md` §8 names *"Per-candidate `VERDICT.md` in each `experiments/w2/<candidate>/` directory"* and
the Stage-0 admission record as verification artefacts. The FIRST sitting's close read the fold as
**PARTIAL** — only `../h/**` had landed, and *"the seats' own printed tables (`.g`'s admission
record, `.d`/`.e`/`.f`'s gate prints) are NOT folded"* (§Close C.3). This directory discharges that
row.

Every file is a **verbatim copy**, byte for byte, of a `<p2>` artefact that stays in place in the
fresh root; nothing here was edited, re-ordered, or summarised.

| file | source in `<p2>` | commit it belongs to |
|---|---|---|
| `g-ADMISSION.md` | `experiments/w2/stage0/ADMISSION.md` | `.g` — `81370815` (`w2/harness`) |
| `d-ac1-tagless-VERDICT.md` | `.worktrees/ac1/experiments/w2/ac1-tagless/VERDICT.md` | `.d` — `af40fb2d` (`w2/ac1`) |
| `e-ac2-closed-ir-VERDICT.md` | `.worktrees/ac2/experiments/w2/ac2-closed-ir/VERDICT.md` | `.e` — `a7ac4ea4` (`w2/ac2`) |
| `f-ac3-span-VERDICT.md` | `.worktrees/ac3/experiments/w2/ac3-span/VERDICT.md` | `.f` — `f9349560` (`w2/ac3-scan-union`) |

`SHA256SUMS` covers the four `.md` copies. ⟨`shasum -a 256 -c SHA256SUMS`⟩ → 4 of 4 `OK`. This
README is prose and is not in the sums.

**The originals are the authority.** `<p2>` has no remote (⟨`git -C <p2> remote -v | wc -l`⟩ → 0),
so this fold is the only copy of these four files that reaches a pushed history — which is exactly
why §8 asks for it at close. A divergence between a copy here and its `<p2>` original is a defect in
this fold, never in the original.
