# W7 — adversarial spec-verification record (2026-06-03)

8 read-only agents opened the `file:line` cites in each authored tranche spec against the real code, hunting for stale cites · over-claims · unsound dispositions · glass-ui-boundary violations · non-additive writes. **Result: the authoring is sound.**

| Spec | Cites sampled | Confirmed | Verdict | boundary-ok | additive-safe |
|---|---|---|---|---|---|
| glass-ui AS.W5 | 17 | 16 | CONFIRMED-WITH-NITS | ✓ | ✓ |
| value.js K.W1 | 10 | 9 | CONFIRMED-WITH-NITS | ✓ | ✓ |
| fourier J.WC | 12 | 10 | CONFIRMED-WITH-NITS | ✓ | ✓ |
| speedtest AT | 10 | 9 | CONFIRMED-WITH-NITS | ✓ | ✓ |
| keyframes A | 12 | 12 | **CONFIRMED** | ✓ | ✓ |
| muster K | 11 | 10 | CONFIRMED-WITH-NITS | ✓ | ✓ |
| slides B | 12 | 12 | **CONFIRMED** | ✓ | ✓ |
| words A | 12 | 12 | **CONFIRMED** | ✓ | ✓ |

**Totals: 100/106 cites confirmed · 0 NEEDS-FIX · 8/8 glass-ui-boundary-ok · 8/8 additive-safe.**

## Nits (all minor; correct-at-execution — the executor re-grounds each cite when it opens the file)

1. **value.js** — `useAurora.ts:201` is a glass-ui (cross-repo) file, not intra-repo. **FIXED** — qualified as `glass-ui aurora/composables/useAurora.ts:201` in `K.W1-grand-audit-refinement.md`.
2. **muster** — the 150ms chevron-rotate cite `CommandDock.vue:131-141` is wrong; the actual chevron transform is `EliminatedFold.vue:127`. (MASTER-FINDINGS row 116 listed `EliminatedFold.vue:126-127` correctly — the muster fold doc narrowed to the wrong sibling.) Correct at execution.
3. **fourier** — §B2 Cloudflare-beacon doc-comment cite `AppHeader.vue:75` actually points at the maintainer avatar. Low impact: §B2 is **KILL-as-moot** (no beacon in HEAD), so the bad cite drives no work.
4. **fourier** — §B1 KaTeX-CSP defect is **LIVE-confirmed** (inlined `data:font/woff2` in dist CSS) but the remedy (`assetsInlineLimit:0`) is **proposed, not yet in `vite.config.ts`** — which is correct for a *spec* (authoring phase). Clarify "will-implement at W7" at execution.
5. **fourier / speedtest** — the glass-ui `asideSide`/needle `springTimingFunction` items are correctly scoped as **ADOPTION ASKS / proposed wave-items** that glass-ui/AT has **not yet committed** — the serial spine (W_FINAL §1) is exactly the mechanism that lands them. Not errors; they are the asks.

## Conclusion
The grand-audit's authored specs are **grounded, additive, glass-ui-boundary-clean, and disposition-disciplined**. The constellation tranche set is execution-ready pending the W_FINAL §4 decisions (Q1–Q7) + per-repo GO. No spec requires re-authoring.
