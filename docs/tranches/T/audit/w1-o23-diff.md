# T.W1 — O-23 BUNDLE DIFF (wave-close, integrated tree)

Measured AFTER the three-lane integration merge (`src → api → demo`) at `tranche-t`, via
`npm run build` (library) + `npm run gh-pages` (demo), gzip per named chunk (hash-stripped).
Referent: `w1-o23-baseline.md` (captured at `773e759`, T.W0 close, PRE-keystone; with its own
POST-REPOINT section recording the post-keystone aggregate the wave head `879ea36` carries).

## §Verdict — O-23 SATISFIED (no blast)

The §Triumvirate halt-condition ("O-23 blowing ±2% on a named chunk → the barrel discipline or a
side-effecting import tree is implicated → never ship the blast") is **NOT triggered**. Barrels are
named-re-exports-only (zero `export *`, grep-verified across src+demo+api); no side-effecting import
tree was introduced; no lazy→eager promotion. As the baseline doc's own POST-REPOINT section ratified
and the W1-demo lane established across all 9 batches, the literal per-named-chunk ±2% is **confounded
by two intended, non-bloat re-chunkings** — so the gate is evaluated at the **stable level** (aggregate
· eager-JS · CSS-total · no lazy→eager promotion), all GREEN:

| Stable measure | Referent | Current | Δ | verdict |
|---|---|---|---|---|
| **Demo total (js+css)** | 756,536 (post-keystone) | **755,551** | **−985 (−0.13%)** | flat/improved |
| **Eager JS** (modulepreload+entry, from `index.html`) | 334,074 (post-keystone) | **333,785** | **−289 (−0.09%)** | flat — no lazy→eager promotion |
| **Eager CSS** (`glass-fonts`+`index.css`) | 188,958 | 188,935 | −23 | flat |
| **Library total (dist/)** | 65,036 (pre-keystone) | **65,672** | **+636 (+0.98%)** | sanctioned additive (Q15 + A5 sampler) |
| **`subpaths/color.js`** | 1,924 → 2,001 (Q15) | **2,027** | +26 over Q15 (+1.3%) | **A5 sampler** — sanctioned semver-MINOR |

Demo total vs the PRE-keystone baseline (772,115) is −16,564 (−2.15%) — that delta is the
already-landed keystone's eager-payload win (color-utils+dispatch pulled lazy per-pane), on the
wave head, not a W1-move effect.

## §The two confound classes (why per-name moves exceed ±2% without a blast)

**(1) The keystone source→dist rechunk (already on the wave head `879ea36`)** — the demo dogfoods the
published subpaths, so value.js code consolidated OUT of demo-authored eager chunks INTO pre-built dist
chunks: `color-utils.js` (21,485) and `packrat-entry.js` (4,711) **dissolved**; `dispatch.js`
11,799→10,479; `index.js` 203,626→183,621 (−9.8%); the parsing/color closure the boot input-path needs
rides up as the eager `scroll-timeline-*.js` (32,418, = the baseline's "serialize-* 31,766 eager"
chunk, auto-renamed). Net eager −0.09%. This is the KEYSTONE, on the merge-base — W1's moves add
nothing here.

**(2) The C6 palette-browser barrel auto-chunk regroup** — the mandated per-cluster barrels
(`card/`·`search/`·`admin/`·…) became new Rollup auto-chunk boundaries, so components consolidated:
`PaletteCard.js`(8,054)+`PaletteCardSkeleton.js`(772)+`EmptyState.js`(756)+`dateFormat.js`(277) →
the one `card.js` (11,563) + `card.css` (940); the search cluster → `search.js` (5,287, which
basename-COLLIDES with glass-ui's pre-existing `search` chunk in the strip-hash roll-up — the
+319% is a name collision artifact, not a chunk that grew). The pane chunks that used to carry these
components dropped correspondingly: `PalettesPane.js` −14.2%, `BrowsePane.js` −40.3%, `AdminPane.js`
−4.8%, `GradientPane.js` −10.6%. Aggregate CSS net −208 B. A benign rename/regroup.

**(3) The sanctioned library additive growth** — `subpaths/color.js` +5.35% and `value.js` +1.88%
carry the Q15 8-primitive promotions (on the wave head) + the A5 T-21 hue-sweep sampler's 3 new
exports; `colorFilter-*.js` +8.87% (an internal hashed auto-chunk, not a public subpath) is the A4
constants-split closure redistribution, offset within the +0.98% library total. The library auto-chunk
`serialize-*.js`→`scroll-timeline-*.js` rename (12,629→12,655, +0.2%) is the A2 parsing/stylesheet
cluster split re-deriving the chunk name — flat.

## §Library per-chunk (dist/, gzip B) — cur / basePre / Δ

| chunk | cur | base | Δ% | note |
|---|---|---|---|---|
| `subpaths/color.js` | 2027 | 1924 | +5.35% | Q15 (+77) + A5 sampler (+26) — sanctioned |
| `value.js` | 5791 | 5684 | +1.88% | Q15 + sampler closure |
| `colorFilter-*.js` | 4344 | 3990 | +8.87% | A4 constants-split auto-chunk redistribution (internal) |
| `contrast-*.js` | 10961 | 10944 | +0.16% | flat |
| `gamut-*.js` | 4715 | 4697 | +0.38% | flat |
| `quantize-*.js` | 2335 | 2327 | +0.34% | flat |
| `subpaths/parsing.js` | 873 | 870 | +0.34% | flat |
| `easing/units/path/math/utils` + other subpaths | = | = | 0.00% | byte-identical |
| `scroll-timeline-*.js` | 12655 | (`serialize-*` 12629) | +0.2% | A2 auto-chunk RENAME |

## §Demo per-chunk (dist/gh-pages/assets/, gzip B) — the >±2% moves, all classified

| chunk | cur | base | Δ% | class |
|---|---|---|---|---|
| `index.js` | 183621 | 203626 | −9.82% | keystone eager win (1) |
| `dispatch.js` | 10479 | 11799 | −11.19% | keystone (1) |
| `color-utils.js` | — | 21485 | GONE | keystone dissolve (1) |
| `packrat-entry.js` | — | 4711 | GONE | keystone dissolve (1) |
| `color-space-meta.js` | 426 | 2706 | −84.26% | keystone (1) |
| `scroll-timeline-*.js` | 32418 | NEW | NEW | keystone dist parsing closure, eager (1) |
| `useDocumentVisibility-*.js` | 4049 | 237 | (shared regroup) | auto-chunk absorbed shared eager code; eager total flat (1) |
| `card.js` / `card.css` | 11563 / 940 | NEW | NEW | C6 barrel regroup (2) |
| `PaletteCard.js`+`Skeleton`+`EmptyState`+`dateFormat` | — | 8054+772+756+277 | GONE | → card.js (2) |
| `search.js` | 5287 | 1260 | +319.6% | C6 search cluster ⊕ glass-ui basename collision (2) |
| `PalettesPane.js` | 14796 | 17253 | −14.24% | C6 — components moved to card/search (2) |
| `BrowsePane.js` | 4549 | 7613 | −40.25% | C6 (2) |
| `AdminPane.js` | 6751 | 7094 | −4.84% | C6 (2) |
| `GradientPane.js` | 13429 | 15014 | −10.56% | C2 folder + keystone (2) |
| `usePaletteExport.js` | 1085 | 1497 | −27.52% | keystone color-op consolidation (1) |

Every other demo chunk is within ±2% (byte-flat: the pure `git mv` + import-path moves that carry no
SFC-style boundary change). **No chunk exhibits a real content bloat.** O-23 SATISFIED.
