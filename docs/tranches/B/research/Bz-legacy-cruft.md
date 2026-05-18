# Bζ — Legacy + cruft sweep

**Lane Bζ.** Read-only, 2026-05-18. "NO legacy code" — find what lingers.

**31 items.** RETIRE: 3 · WIRE: 9 · KEEP (rationale): 9 · B's call / OOS: 6 · Coord-rows live: 4.

## §1 — Most surprising finding

**glass-ui has shipped `UnderlineTabs.vue` as a standalone component** (`src/components/custom/tabs/UnderlineTabs.vue` — JS-driven animated indicator, ResizeObserver, full TypeScript API). The demo's `coordination/Q.md §3` marker said "until glass-ui ships a Tabs `underline` variant." glass-ui shipped something — but it is NOT a `variant` prop on the reka-ui `<Tabs>` family; it is a parallel component (`<UnderlineTabs :options="..." v-model="...">`). The demo's existing `<Tabs>` + `.underline-tabs` CSS override in `PaletteDialog.vue` cannot prop-swap; it requires a structural refactor to consume the standalone component.

**Implication**: the marker comment in `style.css:161-166` and `coordination/Q.md §3` row 67 must update — the gap-as-filed is no longer accurate. The shape glass-ui shipped is a WIRE candidate (structural migration), not a marker-retire.

## §2 — glass-ui ship-status against HEAD `888d227`

| Gap (coord/Q.md §3) | Shipped? | Notes |
|---|---|---|
| `SelectTrigger` `size` prop | **NO** — `SelectTrigger.vue` has `variant` only | marker valid |
| `DockSelectTrigger clampLabel` | **NO** — no `clampLabel` in props | marker valid |
| `TooltipContent variant="mono"` | **NO** — no `variant` prop on `TooltipContent` | marker valid |
| `Button size="icon-sm"` | **NO** — sizes are `default/xs/sm/lg/icon`; no `icon-sm` | marker valid |
| `BlobDot` primitive | **NO** | gap valid |
| `deriveAuroraPalette` | **NO** | gap valid |
| metaballs `positionSource` hook | **NO** | gap valid |
| Tabs `underline` variant | **PARTIAL** — shipped as standalone `<UnderlineTabs>` | shape mismatch, WIRE not retire |
| `Card` props fail-explicit (Q-card-2) | Owned by Q; not verified here | unchanged |
| `floating-panel-item` class | **NO CSS DEFINITION** — `floating-panel.css` defines only `.floating-panel` | not formally filed in §3 |

## §3 — Category cross-cuts

### Category 1: marker comments / pending (8 items)

All seven `pending glass-ui` markers are accurate (the surfaces have not shipped). The one exception is `.underline-tabs` (above) — marker premise is now stale.

### Category 2: resolved-but-lingering (10 items)

- `.fira-code`: 15+ consumers, zero `font-mono-code` residuals — clean.
- `text-2xs`: zero residuals — clean.
- `--menu-min-w` 2 kept-wider sites (`DockViewSelect` 12rem, `GenerateControls` 14rem): genuine content-driven exceptions; rationale in audit docs but not inline in source. **B.W3 adds inline rationale.**
- `aria-disabled` on GradientStopEditor: deliberate (native `disabled` blocks drag pointer-events). **KEEP — documented in W4-states-a.md:36.**

### Category 3: dead tokens / unused CSS (1 item)

**`floating-panel-item`** — applied at 7 sites across `PaletteCard.vue` and `CurrentPaletteEditor.vue` but has **zero CSS rule** in glass-ui or the demo. The buttons carry their styling inline via Tailwind; the class is a ghost label implying a contract that doesn't exist. **B.W1: either wire a local CSS rule with `:active`/`:focus-visible`/`:disabled` states or strip the class.** Then formally file the glass-ui gap.

### Category 4: orphaned files (0)

Every composable and component A created has at least one consumer. No orphans.

### Category 5: under-rework stubs (1)

`AuroraPane.vue` — gracefully degrades; aurora itself is live; W6 rebuilds the slider table when glass-ui ships the aurora API. **Chronic deferral.** B's call: either accept indefinite stub status or rebuild the slider table directly against the live 30-field `AuroraConfig` (the W6 fallback path) without waiting on `deriveAuroraPalette`.

### Category 6: vue dedup (1)

`resolve.dedupe: ["vue"]` + tsconfig `paths` pin. **Still required.** glass-ui's `node_modules/@mkbabb/glass-ui/node_modules/vue` exists on disk. Keep until glass-ui retires its nested vue.

### Category 7: typecheck baseline (1)

**Current count: 290** (up from 243 at W4 close — the W5 a11y additions surfaced new ARIA-related strict-prop issues + the un-committed W5 source moved 2 errors). Distribution:
- ~104 shadcn-vue generated (`auto-form`, `ui/button`, `ui/form`, `ui/chart`) — genuinely pre-existing, not B-fixable without regeneration.
- ~31 `hero-lab/`.
- ~155 custom-component fixable cluster (`useInertiaGesture.ts` 18, `useWatercolorBlob.ts` 16, etc.).

**B.W4 fixes the custom-component cluster (~155). Shadcn-vue (104) routes to a generator update or stays OOS. Hero-lab (31) folds into B.W3.**

### Category 8: hero-lab (1)

**31 errors. 4 unguarded RAF loops. No e2e. No `prefers-reduced-motion`.** Design exemplar per DESIGN.md (with unchecked TODO). Not broken at runtime. **B.W3** does a light pass: Card migration + index narrowing + `prefers-reduced-motion` guards.

### Category 9: W2 dock-pos deviation (1)

**Honest behavioural fidelity, not bug-preservation.** PROGRESS.md §125 records the runtime evidence. The dock-follows-content design at 21:9 is intentional. Bβ owns the deeper question (idiomatic transposition: Proposal A or B); the deviation itself is correctly recorded.

### Category 10: doc drift (1)

`CLAUDE.md:16,60` says "1372 tests, 24 files." Reality: **1409 tests, 26 files**. **B.W7 fix.**

### Category 11: pre-existing src/ WIP (8 items)

5 untracked: `animation-shorthand.ts`, `extract.ts`, `serialize.ts`, `stylesheet.ts`, `interpolate.ts`. 3 modified: `src/index.ts`, `src/parsing/units.ts`, `src/units/normalize.ts`. 1 imported-but-tracked: `plugins/vite-source-export.ts`. The 5 untracked are re-exported from `src/index.ts` — they are part of the public API surface despite being untracked. The library build emits their `.d.ts` into `dist/`. **B.W4 disposition: commit + audit, OR retire and remove from `src/index.ts`. The current state — untracked yet exported — is the worst of both worlds.**

### Category 12: coordination Q.md §3 (9 rows)

Eight rows STAND (gaps still real). One row (`Tabs underline`) needs updating to "shipped as standalone, demo needs structural migration." **B.W7 updates §3.**

## §4 — B disposition summary

| Action | Items |
|---|---|
| RETIRE (clean wins) | 3 — `text-2xs` (already gone, verify); `floating-panel-item` orphan class (define or strip); CLAUDE.md test-count drift |
| WIRE (pending glass-ui — coord/Q stays open) | 9 — 6 glass-ui markers + `UnderlineTabs` structural migration + custom-component typecheck cluster + `floating-panel-item` CSS definition |
| KEEP with rationale | 9 — vue dedup, `.fira-code`, `aria-disabled` GradientStopEditor, dock-pos formula deviation, 2× `--menu-min-w` exceptions, Ab-16 dev-only, ConfigSliderPane comment, AuroraPane stub pending W6 |
| B's call | 6 — 5× `src/` WIP files + hero-lab pass |
| Coord rows live | 9 |

## §5 — The two clear wins for B

1. **`floating-panel-item` is an orphan class.** It implies a glass-ui contract that doesn't exist. Either wire it locally (with the four-state CSS) and formally file the glass-ui gap, or strip the class from the 7 call sites. **B.W1 owns it.**
2. **`UnderlineTabs` shape mismatch.** glass-ui shipped, but the demo's reka-ui `<Tabs>` consumer can't prop-swap. **B.W3 structural migration** (PaletteDialog tabs → `<UnderlineTabs>`) retires the `.underline-tabs` CSS override.

## §6 — One reminder for B's planning

The W5 commit-and-close work (Bα §1) is the single biggest cruft accumulation right now: 30+ modified files in the working tree, 2 untracked audit docs, the W5 wave-log row still saying "planned." The legacy and the not-yet-resolved overlap there. **B.W0 closes that first.**
