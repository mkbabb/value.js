# L17 early consume-swap — `goo-blob` → `blob`

**Lane:** U.W-ADOPT (early consume-swap slice) · **Branch:** `tranche-u` · **Date:** 2026-07-13

## The producer event (glass-ui `tranche/BI`, the tree is truth)

The long-booked L17 rename landed in glass-ui at B0:

| SHA | Subject (verbatim) |
|---|---|
| `13735a99` | BI B0 (BI.W-BLOB-RENAME-LAND): the goo-blob->blob rename EXECUTED — dir `custom/goo-blob`->`custom/blob`, `<GooBlob>`->`<Blob>`, subpath `./goo-blob`->`./blob` via subpath-policy disk-follow, zero surviving import-specifier/tag across 1278 app files; **render BYTE-IDENTICAL (shader/renderer/`.goo-blob-*` internals untouched)**; proof:blob-rename 20/20 |
| `2e559f7a` | BI B0 registrar 2: regen-exports --write re-pin (`./blob` in, `./goo-blob` OUT, typesVersions follow); proof:blob-rename + proof:migration-truth rows registered |

The `./goo-blob` subpath export is GONE from the live `file:../glass-ui` dep, so every
fresh `npm run gh-pages` demo build in value.js now DIES on the `@mkbabb/glass-ui/goo-blob`
import. Per the standing **drift-cure precedent** — glass-ui 4.2.0 `Tabs`→`SegmentedTabs`
at R.W2, and the S.W2 BlobPane producer-drift cure — the consumer migrates at the ROOT,
now (E-3: no shims, no aliases, no compat layers).

## Producer surface verified against the actual current exports (not the book)

`glass-ui/package.json` exports `./blob` → `./dist/blob.js`; `./goo-blob` absent.
`dist/blob.js` exports: `Blob`, `BLOB_CONFIG_KEY`, `BLOB_CONFIG_DEFAULTS`,
`useBlobMood`, `useBlobPointer`, `useBlobSatellites`, `useMetaballRenderer`.
`src/components/custom/blob/index.ts` barrel re-exports the same + the type set
(`BlobConfig`, `BlobMood`, `BlobVariant`, `BlobQuality`, `MoodParams`, …) — all
type NAMES unchanged.

**Exact symbol delta (the whole change):**

| Kind | Old | New |
|---|---|---|
| subpath | `@mkbabb/glass-ui/goo-blob` | `@mkbabb/glass-ui/blob` |
| component | `GooBlob` | `Blob` |
| config injection key | `BLOB_CONFIG_KEY` | *(unchanged)* |
| config defaults | `BLOB_CONFIG_DEFAULTS` | *(unchanged)* |
| config type | `BlobConfig` | *(unchanged)* |
| **DOM test-ids** | `goo-blob-canvas`, `goo-blob-hit` | **UNCHANGED (producer kept them)** |
| **CSS classes** | `.goo-blob-wrapper` / `.goo-blob-canvas` / `.goo-blob-hit` | **UNCHANGED (producer kept them)** |

The producer commit is explicit: `.goo-blob-*` internals were **untouched** and render
is **byte-identical**. So the e2e DOM selectors (`getByTestId("goo-blob-canvas")`,
`[data-testid="goo-blob-canvas"]`, the `.goo-blob-wrapper`/`.goo-blob-hit` comments,
the `GOO_BLOB_TESTID` fixture constant value) were **preserved** — renaming them would
break every blob e2e against the real DOM. No structural API delta beyond the rename.

## The swap table (file → change)

| File | Change |
|---|---|
| `demo/@/components/custom/color-picker/visual/HeroBlob.vue` | import `{ GooBlob }` → `{ Blob }` from `.../blob`; `type BlobConfig` from `.../blob`; template `<GooBlob>` → `<Blob>`; `typeof GooBlob` → `typeof Blob`; local template-ref `gooBlobRef` → `blobRef` (root-migration hygiene, all ~11 call sites); 3 symbol-naming comments `GooBlob` → `Blob` |
| `demo/color-picker/composables/boot/useAtmosphere.ts` | import `{ BLOB_CONFIG_KEY, BLOB_CONFIG_DEFAULTS }` from `.../blob`; comment `GooBlob deep-watches` → `Blob deep-watches` |
| `demo/@/components/custom/panes/BlobPane.vue` | import `{ … }` + `type BlobConfig` from `.../blob`; comment `glass-ui's goo-blob 8-atom` → `blob 8-atom` |
| `demo/@/components/custom/color-picker/ColorPicker.vue` | comments only: `glass-ui's GooBlob` → `Blob`, `goo-blob COMPONENT surface` → `blob COMPONENT surface` |
| `demo/CLAUDE.md` | living-doc `goo-blob/` DELETED row: current-import prose `@mkbabb/glass-ui/goo-blob`→`/blob`, `GooBlob`→`Blob` (annotated with the L17 event) |
| `e2e/smoke/webgl-goo-blob.spec.ts` → `e2e/smoke/webgl-blob.spec.ts` | **git mv** (E-3 file rename) |
| `e2e/smoke/webgl-goo-blob-idle.spec.ts` → `e2e/smoke/webgl-blob-idle.spec.ts` | **git mv** (E-3 file rename) |
| `e2e/smoke/fixtures/webgl-appearance.ts` | cross-ref comment `webgl-goo-blob.spec.ts` → `webgl-blob.spec.ts` |
| `e2e/smoke/perf/frame-budget.ts` | cross-ref comment `webgl-goo-blob-idle.spec.ts` → `webgl-blob-idle.spec.ts` |
| `e2e/smoke/perf/idle-frame-budget.spec.ts` | cross-ref comment `webgl-goo-blob-idle.spec.ts` → `webgl-blob-idle.spec.ts` |
| `e2e/smoke/safari/sustained-30s.spec.ts` | cross-ref comment `webgl-goo-blob.spec.ts` → `webgl-blob.spec.ts` |

No `.github/workflows/*.yml`, `playwright.config.ts`, or `package.json` reference to the
two renamed spec filenames existed — the rename needed no config repoint.

**Deliberately NOT changed** (producer truth / out-of-scope):
- All `goo-blob-canvas` / `goo-blob-hit` test-ids + `.goo-blob-*` CSS selectors + the
  `GOO_BLOB_TESTID` fixture constant (producer kept `.goo-blob-*`; render byte-identical).
- Spec test titles/messages describing "goo-blob canvas" — they name the still-valid testid.
- `docs/**` historical records (do not rewrite history).
- `demo/DESIGN.md` + `demo/CLAUDE.md:208` prose that names the DELETED demo fork `GooBlob.vue`
  (a historical N.W5.A reference to a file that no longer exists; names no live import) — left
  for the VISUAL/DEMO catalog sweep.

## Verification (machine heavily loaded — budgeted)

| Gate | Result | Note |
|---|---|---|
| `npm test` (vitest) | **GREEN — 2281/2281, 78 files, exit 0** | library unit suite; independent of glass-ui dist; my change breaks nothing |
| `npm run lint` (eslint) | **GREEN — exit 0** | edited files clean, `--max-warnings=0` |
| `npm run typecheck` (vue-tsc) | **RED — but NOT from this swap** | fails `TS7016` (missing `.d.ts`) identically for `@mkbabb/glass-ui/blob` AND the untouched `/dark`, `/dom`, `/aurora`, `/color`, `/` — the BI mid-flight dist emitted **zero `.d.ts` files** (0 of 0). `/blob` resolves to `dist/blob.js` on equal footing with every working subpath → the swap is correct; the block is a global producer-dist type-declaration absence |
| `npm run gh-pages` (build) | **RED — but NOT from this swap** | dies in `PaneHeader.vue` CSS transform on a dangling `@import "./dock/morph-bridge.css"` inside glass-ui's producer file `dist/styles/dock.css` (BI split `morph-bridge.css`→`morph.css`, left a stale aggregate import). value.js source has **zero** `morph-bridge` references. Orthogonal to the blob rename |
| playwright e2e | **NOT RUN** (per lane charter — the running wave gates own it) | DOM selectors preserved, so blob specs address the real testids |

**Swap correctness proof (independent of the two producer-dist blockers):** (1) no
surviving `goo-blob`/`GooBlob`/`webgl-goo-blob` import-specifier/tag/filename anywhere in
`demo/**` or `e2e/**`; (2) `@mkbabb/glass-ui/blob` resolves to the real 103 KB
`dist/blob.js` exporting `Blob`/`BLOB_CONFIG_KEY`/`BLOB_CONFIG_DEFAULTS`; (3) vitest +
lint GREEN. Without this swap the build would ALSO die on the now-absent `./goo-blob`
export — the swap strictly reduces the failure set.

## The two producer-dist blockers (glass-ui BI mid-flight — NOT this lane)

glass-ui HEAD is `da051943` ("B4+B5 planner running; B3 mid-flight"). The blob rename
landed clean at B0, but the CURRENT dist is a mid-flight BI rebuild that is incomplete:

1. **`dist/styles/dock.css`** carries a dangling `@import "./dock/morph-bridge.css";`
   (the file is now `morph.css`) — breaks the demo CSS build.
2. **Zero `.d.ts`** emitted across the whole dist — breaks the demo typecheck.

Both are expected to clear when BI completes and cuts the **5.0.0 tag that U.W-ADOPT
floats on** (the coupled owner event). They are producer-side, sibling repos are
READ-ONLY, and E-3 forbids a consumer shim — so they are flagged here for U.W-ADOPT /
the glass-ui BI relay, NOT patched. They do not implicate the blob swap.

## Scope line (honest)

**This lane executed ONLY the L17 rename swap.** The remaining adopt event — the version
cut, the `file:` pin-widen, the §7.2 swap set, and the GAP-L2 / GAP-L5 / ARM re-verify —
**stays tag-gated at U.W-ADOPT**, floating on the user-gated glass-ui 5.0.0 tag.
