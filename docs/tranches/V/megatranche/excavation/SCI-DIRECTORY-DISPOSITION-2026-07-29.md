# Sci directory disposition — 2026-07-29

## Finding

The initial cross-repository census counted two directories under
`/Users/mkbabb/Programming/sci-report/docs/tranches` as tranches. Neither is a
tranche.

| directory | tracked contents | plan/progress/final | tranche commit history | disposition |
|---|---|---|---|---|
| `docs/tranches/F` | none; two ignored PNG strips dated 2026-07-02 | none | none for the path | NON-TRANCHE screenshot artefact |
| `docs/tranches/O` | none; empty ignored `exec/` directory | none | none for the path | NON-TRANCHE empty artefact |

Evidence:

- `git ls-files docs/tranches/F docs/tranches/O` returns no paths;
- `git log --all -- docs/tranches/F docs/tranches/O` returns no commits;
- `.gitignore:44` ignores `/docs/`;
- F contains only `strips/f3-homepage-dark.png` and
  `strips/f3-homepage-light.png`;
- O contains no file.

The physical-directory count remains 109 for reproducibility. The actual
tranche denominator is 107, with 45 Glass tranches still awaiting a deep
disposition.
