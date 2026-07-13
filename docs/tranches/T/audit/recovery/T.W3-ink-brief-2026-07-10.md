# T.W3-INK (W3-5) — RECOVERY / RESUME BRIEF (2026-07-10)

> **RESOLVED (2026-07-10, same-day resume)** — the ink lane (W3-5, the D6
> ink-on-tier contract) died at the session wall with its ENTIRE work-set
> UNCOMMITTED (the canonical W3-5 partial signature: a full contract landed in
> the tree, zero commits). The resume audited every hunk (kept ALL — no
> discard, no blind commit), and the whole-gate re-drive caught **one latent
> defect in the live tier-tint instrument** (cured below; O-18 re-run 10/10
> green both schemes).

Per the standing §Recovery rider (`T.W3.md §Recovery`, `T.md §8`, PP-14/PP-15).
The four steps, against the LIVE tree:

## §1 Audit-partial

**Branch/head at resume**: `worktree-wf_5011a3ae-57c-6` @ `d99303f` (the merged
round-2 head; W2 boot/overture + W3 core/material lanes already in history).
`git status`: 13 modified + 1 staged deletion + 3 untracked — audited hunk by
hunk (`git diff` per file):

| Partial | Verdict |
|---|---|
| `demo/@/composables/color/ink.ts` (NEW — the pure D6 module: `resolveSurfaceLightness` · `certifyAccentInk` · `resolveMutedInk` · `contrastInkFor`) | KEPT — library-leaf-sourced, interim producer table carries its §BOOKS citation |
| `useContrastSafeColor.ts` (constants retired; surface-keyed `useSafeAccentFn(surface)`; live tier-tint probe) | KEPT + CURED (§2 — the probe raced the detached initial render) |
| `keys.ts` `INK_AMBIENT_KEY` | KEPT |
| `useAtmosphereBoot.ts` (the ONE M-15-sanctioned boot thread: `derivedLightness` → guard + `INK_AMBIENT_KEY` + `--ink-muted` + published `--ink-ambient-l`) | KEPT — the boot-side half (`useAtmosphere` exposure + `useViewAccents` cure) verified ALREADY LANDED via W2's queue (`useAtmosphere.ts:127,344`; `useViewAccents.ts:71-105` consumes `derivedLightness`) |
| `ProfileSection.vue` / `MobileMenuDropdown.vue` (A11Y-F2: raw pick ≤1.28:1 → certified chrome/floating ink) | KEPT |
| `ColorNutritionLabel.vue` (F-3 fg/bg double-duty split: fill + `contrastInkFor`-derived ink committed together) | KEPT |
| `ParseEchoReadout.vue` + `SpectrumPlateCaption.vue` (F-4/F-10: `/70` alpha-multiply + `--muted-foreground` → the certified `--ink-muted` rung) | KEPT |
| `useMarkdownColors.ts` (S1 shadow-duplicate constants → live resting referent through `certifyAccentInk`) + `Markdown.vue` (inline code joins `--md-color-accent`) | KEPT |
| `PaletteCard.vue` → `useSafeAccentFn("well")` (the Q4 "PaletteCard = well" ruling) | KEPT |
| `test/ink.test.ts` (NEW, ambient-band-sweeping probe) · `view-accents.test.ts` (measured-band referents) · `color-contrast.test.ts` (leaf-probe comment) | KEPT |
| `e2e/smoke/oracles/o18-contrast-census.spec.ts` (NEW) + `accent-contrast-guard.spec.ts` DELETED | KEPT — the O-18 row's own words ("accent-contrast-guard generalized"); the root-token leg survives inside the census re-keyed on the live ground; W4's roster rows minted BORN-RED `test.fixme` (h-dag D-4) |

Bounds re-walked: no `src/`, no `../glass-ui`/`../keyframes.js`, no picker-knot
writes (`ParseEchoReadout` is `controls/` root, `SpectrumPlateCaption` is
`SpectrumCanvas/` — neither is in W4's knot list; `ColorNutritionLabel` is
`display/`, NOT `ColorComponentDisplay/`), no `docs/precepts/`, no owner-`:9000`
(playwright's own ports). The one boot write is the M-15 routed exception, and
W2 is CLOSED in history (`b0bef69`).

## §2 What the whole-gate re-drive found (the resume's earned catch)

**O-18 FAILED on first full run** (light scheme): the profile trigger's
certified ink measured **3.59:1** on the REAL dock band (census ground
rgb(176 171 166), L≈0.745) because the guard had certified against the STATIC
interim model (referent ≈0.90). Root cause: the live tier-tint probe
(`document.querySelector(".glass-dock")`) ran during the consumer's FIRST
`computed` evaluation — Vue builds the subtree DETACHED on initial mount, the
query missed, and the cached computed carried the model referent forever. The
dock band's real recipe (α 0.539) is far thinner than the floating model row
(α 0.8) — exactly the gap the live instrument exists to close.

**Cure (idiomatic, no workaround)**: a module-level **probe EPOCH** ref that
every live read tracks; every consumer bumps it from its own `onMounted` —
Vue's "the DOM is now connected" signal — so the probes re-drive through
ordinary reactivity (no polling, no per-site patch). Post-cure the trigger
settles at **6.73:1 light / 5.91:1 dark**.

## §3 Re-certification (all gates re-driven WHOLE, per the rider)

- **O-18 census 10/10** (both schemes × 5 rows) + 3 BORN-RED W4 `fixme` rows
  minted (readout fracs · channel letters · ConfigSliderPane — un-fixme at
  W4-3/W4-4). Census table in `w3-ink-lane-record.md §4`.
- `BG_LIGHTNESS_DARK/LIGHT` grep: **0 in code** (citation comments only) —
  satisfiable only WITH the W2-routed boot half, per the gate's own note.
- Guard-then-alpha on the W3-5 routed set: **0** (ParseEcho `/70` dead; the
  caption's under-floor `--muted-foreground` dead; the W4-owned readout-frac
  instances untouched per h-dag D-4).
- `npm run lint` 0 · `npm run typecheck` 0 (lib + demo) · vitest **2192/71**
  green (incl. the new `test/ink.test.ts` ambient-band probe).
- Full playwright at lane close — recorded in the lane record §6.

## §4 Seam-audit-at-close

- The tool-artefact grep over this brief + the lane record — empty (M-1).
- The throwaway census-table dump spec (used to capture §4's table) deleted
  before commit; the committed oracle is the settle-polling census only.
- Commits are path-scoped: ONE W3-5 code commit (contract + routed sites +
  oracle), ONE docs commit (this brief + the lane record).
