# Producer artifact boundary — Glass, Value, and Keyframes

**Observed:** 2026-07-29  
**Mode:** tranche development; read-only producer audit plus isolated build
reproduction  
**Glass coordinate:** `77540ffd21253f0668acdb779f6a047cce82f26d`  
**Keyframes coordinate:** `8281638c0ac4ac8c54a67a018ca5bf6a9117174f`

This packet narrows Fourier F-B1 to facts that survive an independent root
reproduction and an independent Sol xhigh audit. It does not create a new Glass
wave, change either producer, or turn dirty workspace bytes into a release.

## Terminal findings

| Finding | Evidence | Disposition / receiver |
|---|---|---|
| Glass `build:watch` is not a complete public-artifact producer | `glass-ui/package.json:502-508` runs Vite alone in watch but emits declarations and `component-styles.css` only in the full build; `vite.config.ts:29-35` explicitly calls declaration emission out-of-band | **FOLD** the new declaration and watch-input omissions into existing `R-TRACK-PUBLIC-BREAK` / `BJ.W-TRACK-DRY`; no new wave |
| A fresh Glass watch output is incomplete | In an isolated copy using the current checkout and its dependency installation, the first `vite build --watch` produced `dist/glass-ui.js` and `dist/styles/index.css`, but `dist/index.d.ts`, `dist/slider.d.ts`, and `dist/component-styles.css` were absent | Existing component-manifest defect is already booked and is not resent; the missing declaration projection is the new delta |
| Standalone style/font edits are not registered watch inputs | `vite.style-assets.ts:40-76` copies and transforms those assets in `closeBundle`, but the plugin has no `addWatchFile`, `watchChange`, or equivalent standalone-input registration | **FOLD** into the same shared build/watch/iter lifecycle; a CSS/font-only mutation must advance the complete receipt |
| Value's sibling-ready signal is false-green | `value.js/scripts/dev/dev.sh:165-176` treats only the entry JS mtime as proof that a watch pass completed | **SPLIT** into complete artifact-set readiness; no JS-only ready signal |
| Current mutable Glass bytes are not signed v7 | Current manifest still says `7.0.0`; signed `v7.0.0` is `4ab12128…`; the current candidate is already booked by Glass as the unique 8.0 close | **PRUNE** mutable-version language; do not resend the already acknowledged identity batch |
| Keyframes source/dist repair is not established | Independent tag/current/source/dist comparisons found no consumer-relevant public delta; all eight topology-anomalous source files compared byte-identically with the immutable v6 tag baseline and the current library chunks were reachable. Genuine Luna archaeology later proved that tag is annotated but not cryptographically signed. | **PRUNE** “dist trails source.” Consumer admission requires an exact immutable packed hash and receipt, not a workspace repair or a false signature claim. |
| Value misclassifies both producer edges | Product `src` and published non-demo `dist` contain zero Glass and zero Keyframes imports. Glass appears only in demo/build work; Keyframes appears nowhere outside manifest/lock | **MOVE** Glass from runtime dependencies to development dependencies; **PRUNE** Keyframes from package and lock |

## Exact dependency census

The independent Sol AST/CSS census is the authoritative count:

| edge | product `src` | library `dist` | demo/build |
|---|---:|---:|---:|
| Glass | 0 | 0 | 119 ESM declarations across 79 demo files, plus two CSS imports in one file |
| Keyframes | 0 | 0 | 0 |

Root's file-level census independently agrees on the classification: zero
product/published files, Glass in the demo only, and no Keyframes consumer.
Glass is not a Value peer because no published Value capability exposes or
loads it.

## Isolated watch reproduction

Root copied the current tracked Glass checkout into a temporary directory,
excluded `.git`, `dist`, `node_modules`, docs, and visual-test outputs, linked
the existing dependency installation read-only, and ran the repository's exact
Vite watch command. After the first successful 725-module build:

```text
dist/component-styles.css | MISSING
dist/index.d.ts            | MISSING
dist/slider.d.ts           | MISSING
dist/glass-ui.js           | present
dist/styles/index.css      | present
```

The watch process was stopped and the temporary copy deleted. No producer,
consumer, dependency installation, cache, git state, or retained artifact was
modified.

## Existing Glass authority

The one-shot component-manifest defect and mutable 7→8 identity are already
owned:

- `docs/tranches/BJ/EXECUTION-PROGRESS.md:481-489`;
- `docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/REGISTRY.md:18`;
- `docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/GATES.md:10`.

The only outbound Glass delta is therefore declaration projection plus
standalone style/font watch registration and complete ready-state evidence.

## Acceptance delta

Amend the existing Glass row rather than minting a process gate:

1. one shared lifecycle owns full build, watch, and iterated build;
2. a clean watch output contains every exported JS, declaration, CSS manifest,
   copied style, and font target;
3. a public-TypeScript mutation advances JS where applicable and declarations;
4. a standalone `src/styles/**` or font mutation triggers and advances the
   complete exported closure;
5. an incomplete or failed pass emits no ready receipt;
6. packed export/type/style verification passes against the same immutable
   bytes.

No compatibility export, source alias, copied consumer CSS, mutable `7.0.0`
identity, new component, or separate watch-only implementation is admitted.
