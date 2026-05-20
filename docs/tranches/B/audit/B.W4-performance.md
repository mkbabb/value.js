# B.W4 — Performance Audit

Close-ceremony performance artefact for tranche B (B.W4 Lane 5).
Read-only audit: no build was run (`npm run build` deliberately not invoked — a
sibling may hold the tree), no git state was mutated.

## 1. Bundle

`dist/` was freshly built at B.W3 close. The current `dist/value.js` was read
in place — not rebuilt.

| Artefact         | B.W3 close | A.W7 baseline | Delta |
|------------------|-----------:|--------------:|------:|
| `dist/value.js` (raw)    | 139,306 B | 139,306 B | **0 B (0.00 %)** |
| `dist/value.js` (gzip)   |  39,435 B |  39,435 B | **0 B (0.00 %)** |

- Raw size measured by `ls -la dist/value.js` → 139,306 B.
- Gzip size measured by `gzip -c dist/value.js | wc -c` → 39,435 B (matches the
  A.W7 estimate exactly — same `gzip -c` method).
- `dist/value.js` mtime: 2026-05-19 16:28:58. No file under `src/*.ts`
  (`.d.ts` excluded) is newer than the bundle — `find src -name '*.ts'
  ! -name '*.d.ts' -newer dist/value.js` returns empty. The bundle is current
  relative to the committed source tree.

### The library bundle did NOT grow

This is the load-bearing finding. B.W3 (`8d6dfac feat(library/w3): commit src/
WIP`) committed five new parsing/units modules to `src/`:

- `src/parsing/animation-shorthand.ts`
- `src/parsing/extract.ts`
- `src/parsing/serialize.ts`
- `src/parsing/stylesheet.ts`
- `src/units/interpolate.ts`

Yet `dist/value.js` is **byte-identical** to the A.W7 baseline. The reason is
tree-shaking: the library uses **named exports only** (CLAUDE.md convention,
"enables tree-shaking"). The five new modules are WIP — committed to `src/` but
**not yet re-exported through `src/index.ts`**, or re-exported but unreachable
from any retained entry symbol. With nothing in the public surface pulling them
in, Rollup drops them from the ESM build entirely. The 0-byte delta is the
direct evidence: new source landed, zero bytes reached the bundle.

**Implication for a future tranche**: when `src/index.ts` is wired to surface
the new parsing API (B.W3-library-gap.md tracks the Mandate-12 library-side
work), the bundle *will* grow by the compressed weight of those five modules.
This audit records the pre-wiring baseline so that growth is attributable, not
mysterious. The A.W7 housekeeping item — rebuild with a clean `dist/` to drop
the stale `gh-pages` demo chunks (`postcss-BrHISTov.js`, `standalone-*.js`) —
still stands; those chunks remain in `dist/` and are not library surface.

### Bundle verdict

**No regression.** Library bundle holds at **139,306 B raw / 39,435 B gzipped**
— exactly the A.W7 baseline. B's `src/` WIP added zero bytes to the shipped
library because the new modules are not yet reachable from `src/index.ts`.

## 2. Component-tree weight

B.W2 Lane A's pane-router consolidation is a maintainability/weight signal — a
file-count reduction in the demo, not a bundle measurement (the demo is not the
library build).

Measured: `git diff --name-status master..HEAD -- demo/`

| Change | Count |
|--------|------:|
| Files **added** under `demo/` | 1 |
| Files **deleted** under `demo/` | 21 |
| **Net file-count delta** | **−20** |

### Added (1)

- `demo/@/composables/usePaneRouter.ts` — the single pane-routing
  source-of-truth (229 lines; collapses the dual desktop/mobile route tables).

### Deleted (21)

7 wrapper composables/components folded into their consumers:

- `dock/DockMainLayer.vue` (151-line passthrough → merged into `Dock.vue`)
- `dock/composables/useDockLayers.ts`
- `dock/composables/useGenericActionBar.ts`
- `dock/composables/useDockActionBar.ts` (dead injection symbol, 0 consumers)
- `composables/useAtmosphere.ts`
- `composables/useDesktopPaneRouter.ts`
- `composables/useMobilePaneRouter.ts`

Plus the three discrete deletions the brief names:

- `panes/PaneSearchBar.vue` — pure relay, 3 consumers re-pointed to glass-ui
  `SearchBar` directly (1 file).
- `ui/table/` — invariant-33 dead, zero references in `demo/` (10 files:
  `Table`, `TableBody`, `TableCaption`, `TableCell`, `TableEmpty`,
  `TableFooter`, `TableHead`, `TableHeader`, `TableRow`, `index.ts`).
- `ui/alert/` — 3 hand-rolled SFCs (`Alert.vue`, `AlertTitle.vue`,
  `AlertDescription.vue`) deleted; glass-ui ships the primitive. `ui/alert/
  index.ts` was *retained* (converted to a glass-ui re-export) so it does not
  appear in the deletion set.

7 wrappers + 1 (`PaneSearchBar`) + 10 (`ui/table`) + 3 (`ui/alert` SFCs) = 21
deletions, 1 addition → **net −20 demo files**.

### Weight verdict

The demo component tree is **20 files lighter** after B. The consolidation
removed hidden duplication (parallel desktop/mobile route tables, passthrough
wrappers) rather than relocating it: `Dock.vue` absorbed `DockMainLayer`,
`App.vue` script dropped to 140 lines, and one `usePaneRouter` replaced the dual
router. A clear maintainability gain; not a bundle-size figure.

## 3. Frame budget

### goo-blob renderer — unchanged by B

`demo/@/components/custom/goo-blob/composables/useMetaballRenderer.ts`.

`git log --oneline master..HEAD -- demo/@/components/custom/goo-blob/` →
**empty**. No B commit touches any file under `goo-blob/`. The renderer's last
modification is `5247313 fix(tranche-a/w5): animation correctness` — an A.W5
commit, before B's range begins.

This matches the A.W6 re-scope (`docs/tranches/A/audit/W6-deferred.md`): the
glass-ui metaballs API value.js would abstract goo-blob onto is **not shipped**,
so A.W6 unshipped and B inherited goo-blob's renderer untouched. The renderer's
RAF discipline — single-reschedule per vsync, `prefersReducedMotion` guard,
tab-hidden idle — verified healthy by the A.W7 audit, is unchanged and remains
in force (`useMetaballRenderer.ts:74` const, `:241-242` guarded reschedule,
`:268-271` reduced-motion seed path).

#### `cssColorToRgb` per-frame hot-spot — still present, still routed

The A.W7 audit flagged a per-frame allocation hot-spot: `cssColorToRgb` is
invoked **inside the render loop** at `useMetaballRenderer.ts:174`
(`const rgb = cssColorToRgb(color.value)`), and `cssColorToRgb` itself
(defined `:53`) builds a 1×1 canvas-2D resolution each call. Confirmed still
present at the same line. **Not B's to fix** — B touched no goo-blob code; this
is a routed carry-over, recorded here for continuity, not a B regression.

### hero-lab RAF loops — `prefers-reduced-motion` guards confirmed

B.W2 Lane B (`9091e12 fix(tranche-b/w2): hero-lab pass`) added
`prefers-reduced-motion` guards to hero-lab's four RAF components. Confirmed via
`docs/tranches/B/audit/B.W2-hero-lab.md` and the commit:

| File | `prefersReducedMotion` const | guarded reschedule |
|------|------------------------------|--------------------|
| `CanvasAtmosphereHero.vue` | :19-21 | render loop ~:99 |
| `CanvasTileHero.vue` | :27-29 | render loop ~:115 |
| `WebGLTileHero.vue` | :18-20 | render loop ~:250 |
| `WebGLAtmosphereHero.vue` | :18-20 | render loop ~:180 |

Each adopts the goo-blob pattern (`useMetaballRenderer.ts:74-76`): read
`window.matchMedia("(prefers-reduced-motion: reduce)").matches` once at setup;
`mountScene()` issues the initial `requestAnimationFrame(render)` so one frame
paints; the guard sits on the *re-schedule* inside `render` — when reduced, the
loop renders once and stops. **All four confirmed guarded.** B.W2-hero-lab.md
sub-gate B (all 4 RAF files honour `prefers-reduced-motion`) is met.

### Frame-budget verdict

**No regression; one B improvement.** goo-blob's renderer is unchanged by B
(no commit touched it — A.W6 re-scope). hero-lab's four RAF loops *gained*
`prefers-reduced-motion` reschedule guards in B.W2 — a frame-budget improvement,
not a cost. The `cssColorToRgb` per-frame hot-spot at `useMetaballRenderer.ts:174`
persists, correctly routed as inherited, not B-introduced.
