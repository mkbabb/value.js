# G.W3 Lane J — `proof:no-deep` gate (FOLD-S1)

**Branch**: `tranche-g` @ `c57ec01` (G.W3 execution).
**Scope**: author `scripts/proof-no-deep.mjs` — zero `:deep()` / `::v-deep`
CSS selectors across `demo/` + `src/` — and wire it into `package.json
scripts` + the CI workflow. Per `G.W3.md §"Lane J"` and
`G-PEER-SPEEDTEST §7.1 FOLD-S1` (user-ratified 2026-05-21).

---

## The finding

`:deep()` / `::v-deep` punch through Vue's scoped-CSS barrier and couple a
consumer to a primitive's *internal* class names — the cross-boundary contract
glass-ui's custom-prop cascade pattern replaced. value.js inherits the precept
(PaletteCard.vue's D.W4 Lane A §3 retired its last `:deep(svg)` reach in favour
of a `.featured-badge__icon` wrapper class) but had **no CI gate** — a
regression could re-introduce the pattern silently. speedtest gates it via
`scripts/check-deep.mjs` (AD.W2.T7); FOLD-S1 ports that gate here.

## The fix — and a correction to the G.W3.md template

`G.W3.md §"Lane J"` sketches a one-line `grep -rn` template. That naive grep
**false-positives**: PaletteCard.vue carries two *narrative* mentions of
`:deep()` —

- line 39, inside a Vue `<!-- ... -->` template comment;
- line 391, inside a CSS `/* ... */` block comment —

both documenting the *retired* pattern (the D.W4 Lane A §3 citation). A line
grep flags them as live selectors, producing a spurious FAIL at HEAD.

Per the binding constraint that proof scripts must be HONEST, the script is a
faithful **port of speedtest's `check-deep.mjs`**, not the naive template:

- `stripBlockComments()` blanks `/* ... */` (CSS/JS) and `<!-- ... -->` (Vue
  template) spans, preserving newlines so line numbers stay aligned.
- `isCommentLine()` additionally filters residual `//` / `*`-continuation
  single-line comments.
- The matcher runs against the stripped text — only **live selectors** fault.

value.js scans `demo/` + `src/` (vs. speedtest's `src/` + `styles/`). No
`PERMITTED_NARRATIVE_ANCHORS` allowlist is needed: comment-stripping handles
the two PaletteCard.vue citations correctly, so the gate is honestly GREEN
with zero exceptions.

Wired: `package.json scripts` entry `proof:no-deep`; CI workflow step
"Proof — no :deep() / ::v-deep in demo/ + src/" in the G.W3 invariant block.

## Verification

`npm run proof:no-deep` →
`PASS — zero :deep() / ::v-deep in demo/ + src/`, exit 0 at HEAD. The two
PaletteCard.vue comment citations are correctly NOT flagged.

## Sub-gate J — status

- [x] `npm run proof:no-deep` exits 0 at HEAD (honestly — comment-aware port,
      not the false-positive-prone grep template).
- [x] CI step wired.

## Files

- `scripts/proof-no-deep.mjs` — new.
- `package.json` — `scripts` entry.
- `.github/workflows/node.js.yml` — CI step.
