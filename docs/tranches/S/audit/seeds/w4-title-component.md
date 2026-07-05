# Seed: w4-title-component — dropdown-as-title (S.W4 W4-1; S-1/S-14 + the Q5 half of W4-7)

**Verdict: VIABLE_WITH_AMENDMENTS** (one producer defect found; one spec-clause tightening suggested).
Worktree: `.claude/worktrees/wf_01c28a82-3c2-3` cut from `tranche-q` HEAD. Prototype only — nothing here lands on mainline.

## §Intent

SYNTHESIS §3.6 item **W4-1** (AMENDED-AT-PASS-2 treatment-depth respec, transcribed verbatim in
`waves/S.W4.md` row W4-1): kill the `veil-surface` capsule + eyebrow counter + per-row index; the
space name becomes the plate TITLE — a bare `SelectTrigger variant="ghost"` whose class list OWNS
`font-display italic` (the `DockViewSelect.vue:54` pattern), safeAccent ink, producer
`size="audacious"` rung; the FULL affordance grammar bound (rest = caret-only zero-surface / hover
= editorial-link ink, never surface / focus-visible = C5 ring / open = caret 180° + held ink);
About provides `COLOR_MODEL_KEY` (the S-1 parity half); zero per-instance overrides (S-21).
Plus the **Q5** pane-title amendment (SYNTHESIS §2.2 + §12 Q5, the W4-7 first half): `PaneHeader`
gains `font-display` at the ONE site — required here because the About pane title is the line the
title-component flows INTO ("wire ONE pane end-to-end").

## §What was built

| File | What |
|---|---|
| `demo/@/components/custom/color-picker/display/ColorSpaceSelector.vue` (225 LoC) | The flagship, whole-file recomposition. **Template**: capsule wrapper div + eyebrow span EXCISED — the renderless `Select` is the root, so the ghost trigger is the component's first painted node; trigger class list now OWNS `inline-flex gap-2 align-baseline font-display italic tracking-tight` (host-independent face) + `[&[data-state=open]>svg]:rotate-180` (see §producer defect); ink rides `:style="{ '--space-title-ink': safeAccent }"` so the scoped block owns the state ladder; per-row `pad(i+1)` index span EXCISED from the specimen rows (with the now-dead `pad`/`activeIndex` script bindings); WatercolorDot + live-conversion rows KEPT. **Scoped CSS**: the four-state grammar — rest `color: color-mix(in srgb, var(--space-title-ink) 86%, transparent)`; hover (gated `@media (hover: hover)`) deepens to full ink + 1px underline at 3px offset entering via `text-decoration-color` transparent→currentColor on `--duration-fast`/`--ease-standard` (underline lives on the label span — text-decoration does NOT propagate into flex items); `[data-state="open"]` holds the hover ink; C5 focus register kept verbatim (ring at `--radius-md`, never pill); `padding: 0 0 0.25rem` enforcing the excision (see §Learnings 2); `.space-capsule`/`.space-eyebrow` blocks DELETED. |
| `demo/@/components/custom/panes/AboutPane.vue` (+8) | The S-1 parity half: `provide(COLOR_MODEL_KEY, useColorModel(model))` — the same composable the picker provides, over the same external model; read-only in this subtree. About's specimen rows now render the live per-space conversions identically to the picker's (verified live: 16 rows with conversions in BOTH hosts). |
| `demo/@/components/custom/panes/PaneHeader.vue` (+1 class) | Q5: `font-display` added to the `pane-header-title` h3 — the ONE site; all 9 panes inherit the display voice. |

Screenshots (session scratchpad, `w4-title-*.png`): rest-1440, inline-1440 (both-hosts paired),
hover2 (the ink+underline moment), open-about (the full open moment), focus, dark.

## §Verdict — VIABLE_WITH_AMENDMENTS

All four affordance states verified live (Chromium via Playwright MCP, dev server in-worktree
:9137, 1440×900), computed-style probes not just pixels:

- **rest**: both hosts byte-identical — `Fraunces, serif` italic 41.9px (`--type-display-1` clamp at 1440) OWNED by the trigger element's own class; ink `color(srgb …/0.86)` = safeAccent@86%; background transparent, border none, box-shadow none-effective, radius/padding rhythm gone (computed `padding: 0 0 4px`, title flush at x=269 with the hero numerals' grid); caret = the only affordance.
- **hover**: ink deepens 86%→100% (`oklch(0.62 0.2725 9.8)` full), 1px underline at 3px offset enters in the same ink; background STAYS `rgba(0,0,0,0)` — no surface re-growth; letterforms unmoved (decoration box present-at-rest, transparent).
- **focus-visible**: keyboard-Tab probe — C5 ring (`--focus-ring-shadow` = 2px accent@30% + 8px halo@15%), radius 6px (`--radius-md`), outline none. Ring, never pill.
- **open**: `data-state="open"` holds full ink + underline; caret `rotate: 180deg` on the producer's spring clock (via the in-consumer proof utility — see the amendment); all glass belongs to the SelectContent; **16 specimen rows in BOTH hosts with WatercolorDot + live conversion, no per-row index** (About previously rendered without conversions — parity now real).
- **dark**: nothing paints, so the S-1 "muddy brown plate" is dead by construction; ink var scheme-agnostic (safeAccent).
- **reduced-motion**: CDP-emulated `prefers-reduced-motion: reduce` — the global guard (animations.css:32-60) clamps the trigger transition to 0.15s and the caret rotate-transition to 0.1s; states land as ink, no bespoke PRM block needed (the guard governs; glass-ui re-aliases `--ease-cartoon-punch` under PRM).
- **Gates**: `npm run typecheck` 0 (baseline clean → clean); `npm run lint` 0; e2e `color-space-switching` + `page-load` (the two specs that touch the selector, `--project=smoke`) **green** — role/label hooks unchanged; page-load includes the zero-console-error gate. One initial e2e fail was cold-transform contention flake (combobox present in the failure snapshot; deterministic re-runs green ×2). All files ≤400 LoC.

## §Learnings

1. **Producer defect (real find)**: glass-ui `SelectTrigger.vue:138`'s chevron rule `[&[data-state=open]]:rotate-180` is DEAD — reka's `SelectIcon` never carries `data-state` (verified live: trigger `data-state="open"`, `svgHasDataState=false`; the dock's view-select svgs same). The caret has never rotated in ANY glass-ui Select consumer. Root fix **lands in glass-ui**: key the rotation off the trigger's own state (`in-data-[state=open]:rotate-180` or `[[data-state=open]_&]`). The seed carries `[&[data-state=open]>svg]:rotate-180` on the consumer class list as the in-consumer proof of shape, marker-commented to die when the producer ships.
2. **glass-ui's slim `cn` does not resolve the `p-0`↔`px-3 py-2` conflict** (deliberate — the ~22KB twMerge was dropped; the conflict surface is enumerated, and this pair isn't in it). Tailwind's own layer order lets the producer's `px-3 py-2` beat a consumer `p-0`, so the W4-1 "no padding rhythm survives" clause CANNOT be met from the utility list alone — the scoped grammar block must own the box (`padding: 0 0 0.25rem`; the 4px is descender room for the italic face). Any W4-1 implementation that only swaps classes will silently keep a 12px left inset off the plate grid.
3. **`text-decoration` does not propagate into flex items** — the underline must live on the trigger's label span (`.space-trigger > :deep(span)`), not the trigger. An implementation putting `underline` on the button gets nothing.
4. **The trigger must be `inline-flex`** for the About moment: block-level `flex` forces the space name onto its own line inside the h3; `inline-flex` lets "About the color spaces, *Lab* ⌄" read as ONE title line (the picker host blockifies it back to `flex` as a flex-child — harmless, same grammar). This plus the de-capsule collapses the About sticky band to one title line + subtitle (the W4-7 second half falls out for free).
5. **The S-1 parity mechanism is exactly `useColorModel(model)` re-provided** — the composable is lazy (computeds only evaluate while the dropdown renders) and read-only in the About subtree; no narrower key or shim needed, no type gymnastics (`UseColorModelReturn` satisfied structurally by construction).
6. Playwright-MCP + Vite HMR race: after rapid successive edits a `page.reload()` can serve a half-stale module graph (scoped styles fresh, template stale) — probe `class` presence on the DOM before trusting computed-style conclusions.

## §Risks retired

- The de-capsuled title grammar works with ZERO per-instance overrides in both hosts (S-21 holds) — one class list, one scoped block, byte-identical computed states.
- The trigger CAN own its face host-independently (`font-display` in its own class list works; no cascade dependency — the P1-2 "a component whose face depends on its host's cascade is not a component" defect is curable exactly as specced).
- About CAN provide `COLOR_MODEL_KEY` cheaply and safely (no update loops, no double-writer hazard — verified live with both panes mounted side-by-side).
- Q5's one-line `font-display` at PaneHeader:3 is real and non-breaking (e2e green, title-shrink scroll animation unaffected — it animates font-size only).
- The e2e surface survives the excision (role/label hooks only; no spec referenced the eyebrow/capsule DOM).
- Hover cannot re-grow a surface by accident: the grammar is ink-only by construction (color + text-decoration-color transitions; bg/border/shadow never touched).

## §Spec amendments suggested

1. **W4-1 open-state clause** (SYNTHESIS §3.6 row W4-1, "open — the caret rotates 180° on the house micro duration"): append: "*NOTE — the producer's own chevron rotation rule (`SelectTrigger.vue:138` `[&[data-state=open]]:rotate-180`) is dead code (reka SelectIcon carries no `data-state`); the rotation fix is a glass-ui letter item (key off the trigger's state, e.g. `in-data-[state=open]:rotate-180`), and the demo carries a marker-commented consumer utility only until it ships.*" — and add the same item to the glass-ui letter table (it repairs every Select consumer incl. the dock view-select, which has never rotated).
2. **W4-1 rest clause** ("no … padding rhythm … survives the excision"): append: "*enforced in the scoped block, not the utility list — glass-ui's slim `cn` does not resolve `p-0` against the producer's `px-3 py-2`.*"
None of the four state definitions themselves need amendment — they proved out exactly as written.

## §Root-routing (where the atom LANDS)

Per design-picker P1-2 §Root-routing: **the title-as-component grammar lands in the value.js demo**
(`ColorSpaceSelector.vue` — ONE root-level component, both hosts, zero per-pane overrides), exactly
as this seed built it. `veil-surface` stays in glass-ui untouched (sound tier; the demo simply drops
its only consumption). The ONE glass-ui letter item this seed adds: the dead chevron
`data-state` selector (§Learnings 1) — a one-line producer fix in `SelectTrigger.vue`, after which
the demo's `[&[data-state=open]>svg]:rotate-180` utility + its marker comment are deleted.

## §Replay

```sh
cd /Users/mkbabb/Programming/value.js   # or any tranche-q checkout
git apply docs/tranches/S/audit/seeds/w4-title-component.patch
npm run build                            # dist-resolution: the demo self-aliases @mkbabb/value.js → dist/
npm run dev                              # then open the app
```
Expected: picker header = bare "Lab ⌄" in Fraunces italic accent ink flush with the numeral grid,
no capsule/eyebrow; About header = "About the color spaces, *Lab* ⌄" as ONE display-voice title
line; hover = ink deepen + hairline underline (no surface); open = caret flips 180°, catalog rows
show WatercolorDot + live conversions in BOTH hosts, no per-row index; Tab = accent ring.
`npm run typecheck` and `npm run lint` exit 0;
`npx playwright test e2e/smoke/color-space-switching.spec.ts e2e/smoke/page-load.spec.ts --project=smoke` green.
