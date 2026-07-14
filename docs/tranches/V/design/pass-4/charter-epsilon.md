# V · pass-4 · Charter ε — LONG-DIRS + STYLES + THE DEMO-WIDE MANIFEST

**Closes GA-2 / GA-3 / GA-5 (owner clauses 4 / 3 / 1) + NG-6 + NG-3.** The un-charted long-dir +
styles + demo-wide-flatten half of the owner's edict. Everything below is either **RAN in an
isolated worktree** (with the command + measured number) or **stated SPEC-ONLY with its objective
named**. Nothing merged; pathspec `docs/tranches/V/**`. Every claim rides a **committed durable
instrument** under `instruments/` (the pass-4 durable-instrument law) — α's `census-postmove.mjs`
is the referent, and `placement-census.mjs` is its faithful demo-wide generalization (it carries an
α-reproduction harness, §5).

Base tree: current tranche-u HEAD `7b554e4` (the pass-4 launch commit; the worktree was
fast-forwarded to it so every measurement is against the real tree — the campaign measured
`composables/color/` = 18 files, and this tree has 18).

---

## §0 THE OBJECTIVE, STATED (NG-3 — the honesty gate this charter is built on)

Every placement/carve decision here is decided by a **chosen** objective, stated as a rule with its
alternative named — never a choice dressed as a measurement:

- **panes / styles carve axis** = ENCAPSULATE-THE-SHARED-FRAMEWORK (separate the reusable chassis /
  the single-owner style from the routed leaves / the global registers). The metric that improves
  is **top-level fan-out + framework encapsulation**, NOT LoC (a move preserves LoC). The
  alternative — literal per-pane recursive dirs — is named in §1.
- **demo-wide placement** = the TWO objectives (min-edge vs literal-colocation) the manifest reports
  side by side (`charter-epsilon-manifest.md §0`). Neither is ground truth; the owner rules
  (OF-4-widened).
- **style cohesion** = COLOCATE-IFF-SINGLE-OWNER (the glass-ui law): a block whose selector is owned
  by exactly one component colocates; cross-family registers + tokens + the a11y modality layer stay
  central with cascade-ORDER preserved (glass-ui's `§index.css` precedent). The alternative —
  colocate every single-owner block regardless of cascade coupling — is named where it would
  fragment the a11y/media cascade (§2).

---

## §1 `panes/` — THE ENCAPSULATION CARVE (clause 4 · D1 half) — **RAN**

`panes/` was **16 flat files / 2076 LoC** (`panes-carve.mjs`). The carve classifies each file and
breaks the long dir into its encapsulated common module:

| class | count | disposition |
|---|---|---|
| **CHASSIS** | 4 | → `panes/chassis/` — the pane FRAMEWORK: `PaneHeader.vue` (10 sibling consumers), `PaneSlot.vue` (App.vue's router slot), `PaneSegmentedControl.vue` (dock's mobile switcher), `ConfigSliderPane.vue` (2 sibling panes, NOT routed) |
| **LEAF** | 10 | stay flat — the routed panes (`usePaneRouter` lazy-imports each: About/Palettes/Browse/Extract/Generate/Gradient/Mix/Admin/Aurora/Blob) |
| **DATA** | 1 | `aurora-harmony-stops.ts` — AuroraPane's private data; stays flat beside it (single data file; the earned-dir rule does not fire on one file — see the fork below) |
| **DEAD** | 1 | `index.ts` — the barrel had **0 consumers** (the router uses direct `defineAsyncComponent` imports; App/dock import files directly). **DELETED** (clause: no legacy, clean break) |

**Top-level `panes/` files: 16 → 11 leaves + 1 `chassis/` (4) − 1 deleted.** The framework is
encapsulated; the routed leaves sit flat at the pane root where the router names them.

**The RUN** (isolated worktree, `git mv` + import rewire):
- `git mv` the 4 chassis files into `chassis/`; `git rm index.ts`.
- Rewired: 8 leaf panes `./PaneHeader.vue → ./chassis/PaneHeader.vue`; Aurora/Blob
  `./ConfigSliderPane.vue → ./chassis/…`; App.vue + Dock.vue's alias imports `+/chassis/`;
  ConfigSliderPane's own `./PaneHeader.vue` stays (both in `chassis/`).
- **`typecheck` Δ0** — baseline exit 0 → post-carve exit 0, **zero errors** (`npm run typecheck`).
- **`gh-pages` build exit 0** (`npm run gh-pages`) — *after* fixing the one hazard the first build
  caught (see below).
- **smoke green** — `smoke` + `smoke-mobile` (both exercise the desktop + mobile pane routing +
  PaneSegmentedControl + ConfigSliderPane spectrum sliders). See §4.

**THE HAZARD THE RUN EXPOSED (folded into the durable instrument):** two chassis files carry a
Tailwind `@reference "../../../styles/style.css"` in their `<style>`; moving them one level deeper
into `chassis/` broke the relative path (the first `gh-pages` build failed). The fix: `+1` level →
`../../../../styles/style.css`. `panes-carve.mjs` now scans for and REPORTS this
`<style>`-relative-path hazard — the class a script-only import scan misses.

**The presented fork (OF-ε-2, min-move vs literal-colocation for panes):** the RAN carve keeps
`aurora-harmony-stops.ts` flat beside AuroraPane. The literal-colocation reading would give
AuroraPane its own dir (`AuroraPane/{AuroraPane.vue, aurora-harmony-stops.ts}`). ε takes the
min-move carve (the glass-ui **earned-dir rule** does not fire on a single colocated data file);
the owner may rule the per-pane-dir alternative.

---

## §2 `style.css` — THE COHESION CARVE (clause 3 "same for styles") — **RAN (low-risk) + PRESENTED (shell)**

`style.css` was **55687 bytes / 38 top-level blocks** (`style-census.mjs`). The census greps the
demo tree for every rule's class owners and classifies each block:

| disposition | blocks | bytes | share |
|---|---|---|---|
| **STAY (global)** | 22 | **44248** | **79.5%** — tokens (`@theme` + 2 `:root` + `@property` = 24005 / 43%), the a11y modality layer (`forced-colors`/`prefers-contrast`/`reduced-transparency`/`print` = 9205), infra (`@import`/`@source`/`@layer base` = 7831), cross-family registers (`.console-well` 2 fams, `.slug-pill` 4 fams = 1451), token-overrides (698) |
| **COLOCATE** | 13 | **10873** | SHELL (12 blocks, 9828 — App.vue-owned) + SINGLE-OWNER (1 block, 1045 — the spectrum-range override → ConfigSliderPane) |
| **DELETE** | 1 | **500** | `.underline-tabs` — 0 consumers on disk (a dead reka-ui Tabs override) |

**THE LOAD-BEARING FINDING: `style.css` is NOT a god-sheet of mislaid single-owner blocks — ~79.5%
of it is legitimately GLOBAL.** The design tokens (43%), the a11y modality support layer (a
document-wide cross-cutting escape that MUST see every surface), the glass-ui imports, and the
cross-family registers are irreducibly central. The low-hanging single-owner colocations were
already taken at D.W4 Lane A (the breadcrumb comments at `style.css:482`/`778` record
`.palette-card-grid`/`.touch-gate-*`/`.pane-scroll-fade` moves). The residual carve is therefore
MODEST and honest, not wholesale.

**THE RUN (low-risk, both dispositions demonstrated):**
- **DELETED** the dead `.underline-tabs` block (500 b) — clean break, no legacy.
- **COLOCATED** the SINGLE-OWNER `.glass-slider[data-variant="spectrum"] .slider-range` block (the
  canonical colocate-iff-single-owner demonstration) into its sole owner `ConfigSliderPane.vue` as
  an **unscoped** `<style>` (the target is glass-ui's Slider-internal element — a scoped `[data-v-*]`
  selector would not reach it; the D.W4 unscoped-colocation precedent).
- **before/after: 55687 → 54544 bytes** (−1143). `typecheck` unaffected (CSS is not typechecked);
  `gh-pages` build exit 0; smoke green.

**PRESENTED (the SHELL carve — spec-only, cascade-proven, landing-wave scope):** the 12 SHELL
blocks (9828 b — `.app-layout`/`.dock-band`/`.pane-*`/`[data-layout]` witnesses/the dual-grid media/
the T-45 oversampled-blur `@supports` seat) are **single-owner App.vue** (App.vue applies every one
of these classes; confirmed). They CAN colocate into App.vue's unscoped `<style>` — and the cascade
is **provably safe**: the a11y modality layer that references `.pane-wrapper::before`/`.dock-band`
does so with `!important` (reduced-transparency, print) or higher specificity (`.app-layout
.glass-resting`, `prefers-contrast`), both order-independent. ε does NOT physically move the shell in
this RUN — its correctness is a static cascade-ORDER argument, and relocating the delicate T-45
seat exceeds the safe-RUN envelope for a docs-scoped pass. **The honest caveat (the alternative
named):** the shell is single-owner BUT cascade-coupled to the global a11y/token layer that STAYS;
colocating it FRAGMENTS a cascade that currently reads as one adjacent unit. So the SHELL colocation
is the ratifiable *plan* the landing wave takes (bounded by the smoke), with the tradeoff surfaced —
not a silent split. **After the full colocation: central sheet 55687 → ~44314 bytes (−20%).**

---

## §3 THE DEMO-WIDE MANIFEST (clause 1) — the per-dir tables + NG-6 + OF-4-widened

The full ratifiable tables are `charter-epsilon-manifest.md` (regenerated by `alias-census.mjs` +
`placement-census.mjs`). The headlines:

**The `@`-abrogation surface = 377 import sites** (`@components` 172 · `@composables` 95 · `@lib` 87
· `@utils` 7 · `@styles` 5 · `@assets` 11). **366 rewrite to relative** when `demo/@/` flattens;
**`@src` = 0** (already abrogated at T.W1 — **the campaign's "@src 212 sites" is STALE, corrected to
0**); **`@assets` = 11 is the one genuine fork** (all `AboutPane.vue`'s cross-boundary
`import("@assets/docs/*.md")` into repo-root `assets/` — a literal relative rewrite is a 4-deep
brittle path; OF-ε-1, §manifest).

**The placement census = 64 shared files → 49 KERNEL / 12 APP / 3 FEATURE / 0 ORPHAN** (objective A).
**The demo's shared buckets are 77% true-kernel** — a demo-wide refutation of any "most of these
colocate into one feature" prior; only **3** files are single-feature colocation candidates under
min-edge (`usePaletteExport`→panes, `lib/palette/export`→panes, `lib/palette/mix`→mix). The color
bucket **reproduces α's RATIFIED 6K/12A/0F exactly** (the α-reproduction harness passes) — this
instrument is α generalized, not a rival.

**NG-6 (the kernel→app-root inversion) — RESOLVED-or-forked.** The scatter leaves exactly ONE
kernel→app edge, type-only: `keys.ts` (KERNEL) imports `type UseColorPipelineReturn` from
`useColorPipeline` (APP) for its `COLOR_MODEL_KEY` injection key. ε's recommended **R1**: hoist the
pipeline's return TYPE into a KERNEL type module (`color-model.types.ts`) — then `keys.ts` imports
kernel→kernel and the pipeline imports the contract UP (app→kernel, clean); the inversion is gone,
runtime-neutral, and the shared contract becomes a first-class kernel artifact. **R2**: the owner
ratifies the single type-only inversion (the census reports it as `type-only=1`, so it can never
silently become a runtime edge). Detail: `charter-epsilon-manifest.md §4`.

**OF-4-widened (NG-3) — the 7 fork rows.** Where min-edge (A) and literal-colocation (B) diverge,
the file is a presented fork: 7 of 64 shared files (α surfaced only `useColorPipeline`). `keys`,
`useContrastSafeColor`, `ink` (→color-picker), `generate-color` (→generate), `aurora-atoms`
(→panes), `lib/palette/utils` + `lib/palette/api/useApiClient` (→palette-browser). The owner rules
the OBJECTIVE, not each directory; both tables regenerate from one instrument
(`charter-epsilon-manifest.md §3`).

---

## §4 WHAT RAN (the measured green — visual regression bounded by the smoke)

| gate | command | result |
|---|---|---|
| typecheck (baseline) | `npm run typecheck` | exit 0 (clean `7b554e4` tree) |
| typecheck (post-carve) | `npm run typecheck` | **exit 0, zero errors — Δ0** |
| build | `npm run gh-pages` | **exit 0** (after the `@reference` +1-level fix) |
| smoke + smoke-mobile | `npx playwright test --project=smoke --project=smoke-mobile` (lane ports 8950/8951) | **154 passed · 2 skipped · no "failed" line — GREEN** (9.7m). The pane-routing (`usePaneRouter` lazy leaves) + shell (o10/o11 header + type gates, both schemes) + spectrum-slider + slug-pill/console-well (o18) + mobile-slot (`smoke-mobile`) surfaces all pass |

**The 2 ✘-marked tests are pre-existing `test.fail()` EXPECTED-RED producer gates, NOT carve
regressions** (the run has no "failed" line → they behaved as annotated): `o16` (the dist `:root`
150ms `--default-transition-duration` clobber tripwire) and `o26` (aurora-field perceptibility
tripwire). Both are self-documented born-RED gates awaiting a glass-ui producer fix. **The carve
provably cannot touch either assertion surface** — `git diff` confirms the style carve edited ONLY
`.underline-tabs` (deleted) + the spectrum block (moved), touching neither
`--default-transition-duration`, `[data-slot=card]`, nor any aurora/atmosphere logic (the panes
carve only moved AuroraPane's import path). No causal path exists.

The carve footprint (evidence-only, NEVER merges): 4 `git mv` into `chassis/` + 1 `git rm` (dead
barrel) + 11 leaf/App/Dock import rewires + 2 `@reference` fixes + the 2 style edits (1 delete, 1
colocate). Typecheck-relevant surface = the panes import rewires; CSS is not typechecked; the smoke
is the visual gate.

---

## §5 THE DURABLE INSTRUMENTS (the pass-4 durable-instrument law — 4 committed, re-runnable)

All under `docs/tranches/V/design/pass-4/instruments/`, plain `.mjs`, run from the repo root against
ANY tree (never a worktree-only `_proto/` that resets away):

| instrument | what it regenerates | reproducibility note |
|---|---|---|
| `placement-census.mjs` | the demo-wide 64-file placement table (both objectives) + the 7 fork rows | **carries an α-reproduction harness** — exit 1 if the color bucket ≠ α's ratified 6K/12A/0F. Faithful generalization of `charter-alpha-harness.mjs`; discharges NG-1/NG-2 for the demo-wide surface |
| `alias-census.mjs` | the 377-site `@`-abrogation surface + the x-bound/dead classification | the `@src`=0 + `@assets`=11-fork facts regenerate |
| `panes-carve.mjs` | the 16-file panes classification + the chassis carve plan + the `<style>`-relative-path hazard | runs pre- or post-move without crashing |
| `style-census.mjs` | the 38-block style.css cohesion census + before/after byte projection | brace/string-aware CSS block splitter; owner-grep per class |

**The objective is stated in every instrument's header** (NG-3), and every number in this charter +
the manifest is a re-runnable command, not a hardcoded verdict.

---

## §6 OWNER-RESERVED (ε decides none)

- **OF-4-widened** (min-edge vs literal-colocation, the 7 fork rows §3) — the owner rules the objective.
- **OF-ε-1 (NEW): the `@assets` cross-boundary abrogation** — the 11 `AboutPane` `import("@assets/
  docs/*.md")` sites cross `demo/` into repo-root `assets/`. Pole A: keep ONE clean `@assets` alias
  (the alias that does not die). Pole B: literal relative `../../../../assets/…` (brittle, 4-deep).
  Pole C: relocate the color-space `.md` corpus INTO `demo/` (the deepest clean break). Surfaced,
  not decided.
- **OF-ε-2 (NEW): panes min-move vs per-pane-dir** (`aurora-harmony-stops.ts` flat vs an
  `AuroraPane/` dir) — §1.
- **NG-6 R1-vs-R2** (hoist-the-type vs ratify-the-inversion) — §3.

Nothing merged; this lane authored only `docs/tranches/V/design/pass-4/**`.
