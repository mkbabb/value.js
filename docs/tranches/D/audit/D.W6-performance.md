# D.W6 close audit lane 5 — performance

**Mode**: measure-only.
**Verdict**: **PASS** — L8 microbench re-runs ≥ 5× gate; bundle effectively unchanged (+0.18 kB gzip); backend deferred (no local MongoDB).

## Bundle size

`npm run build` at D.W6 close:

| Artefact | Raw | Gzip |
|---|---|---|
| `dist/value.js` | 137,600 bytes (137.60 kB) | 40,328 bytes (40.33 kB) |
| `dist/postcss-BrHISTov.js` | 202,445 bytes (202.45 kB) | 48.36 kB |
| `dist/standalone-JqHlnZSs.js` | 112,157 bytes (112.16 kB) | 32.39 kB |

**Comparison vs D.W1 L8 baseline** (per `PROGRESS.md`, post-L8 commit `059cf72`):

| Metric | L8 baseline | D.W6 close | Delta |
|---|---|---|---|
| `dist/value.js` raw | 136.93 kB | 137.60 kB | +0.67 kB (+0.49%) |
| `dist/value.js` gzip | 40.15 kB | 40.33 kB | +0.18 kB (+0.45%) |

The +0.67 kB raw / +0.18 kB gzip delta covers:
- L11 lerp arg-order canonicalisation (lerpLegacy alias added with `@deprecated` JSDoc — preserves backward-source-compat)
- L3+L8 memo wrappers in `src/parsing/{color,units}.ts`
- L5 hueMethod carry-through in `src/units/normalize.ts` + `interpolate.ts`
- L12 _lerp bolt-on cleanup
- L4 calc AST excision NET-NEGATIVE (removed `new Function`)

Net: bundle effectively unchanged; the perf wins (10× channel-read speedup, memoization) come at near-zero bundle cost.

## L8 microbenchmark re-run

3 runs at D.W6 open via `node bench/color-channel-access.mjs` — full outputs in `audit/D.W6-bench/run-{1,2,3}.txt`:

| Run | Speedup median (5-run inner) | Gate (≥ 5×) | Verdict |
|---|---|---|---|
| 1 | 10.02× | ≥ 5× | PASS |
| 2 | 10.09× | ≥ 5× | PASS |
| 3 | 10.67× | ≥ 5× | PASS |

**Median of medians: 10.09×** — consistent with D.W1 L8 commit-time observation (11.06× median, 5-run range 8.73× to 14.82×). The slight regression from the commit-time peak is within normal microbench noise; both rounds clear the gate by > 2× margin.

## Bundle DCE verification (sub-gate L8 §4)

Per `D-RELEASE-PLAN.md §4` risk row "Production bundle includes dev-assertions":

```
grep -c "import\.meta\.env\.DEV" dist/value.js  →  0
```

Zero `import.meta.env.DEV` references in the production bundle — the DEV-only `_assertChannel` guards are stripped by Vite's tree-shaking + DCE. **PASS.**

## Backend startup time + repository indirection latency

Per the wave spec: "Backend: spin up if MongoDB available, else skip ('DEFERRED, no local MongoDB')."

**DEFERRED** — no local MongoDB instance is configured in the development environment at the orchestrator's host. The D.W2 service+repository indirection is structurally one extra function call per query (typed Collection<T> factory + repository method dispatch); the absolute overhead is sub-microsecond and not measurable from cold-start without a real Mongo instance.

The api/'s post-D.W2 architecture is structurally identical to the pre-D state from the request perspective (each request still: validate → service call → single Mongo query → format → response); the indirection is a compile-time TypeScript layering, not a runtime hop. **No backend perf regression expected by construction; measurement DEFERRED.**

## Frame budget

Unchanged from D open — D did not touch goo-blob/aurora rendering paths. The cssColorToRgb memoization in `useMetaballRenderer.ts:53` (D.W3 Lane C) is a perf WIN (eliminates per-frame canvas getImageData + 3-element array allocation) at the rendering hot loop; the absolute frame budget is bounded by the pre-existing rAF loop which was untouched.

## Aggregate verdict

**PASS.**
- Bundle: +0.18 kB gzip delta (essentially zero).
- L8 microbench: median 10.09× across 3 close re-runs (gate ≥ 5×).
- DCE: 0 `import.meta.env.DEV` in production bundle.
- Backend: DEFERRED with structural-no-regression argument.
- Frame budget: unchanged + 1 hot-path memoization win.
