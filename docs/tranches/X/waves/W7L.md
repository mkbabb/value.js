# X.W7L — value.js repins glass-ui ^7.0.0 → 10.1.0 exact (owner: "All should be on 10.1.")

## State
**Opens after**: X-W12 CLOSED. **Blocks**: X-W12U, X-W8. **Minted by**: COHESION §0de (2026-09-24), brought forward from "at BL's cut" (§0ci R-5) by the owner's ruling. **Model**: Opus 5.5, effort high. **Record**: `docs/tranches/X/execution/A/X-W7L.md`.

## Authority — the owner, verbatim (2026-09-24)
*"All should be on 10.1."* This **supersedes the §0ci R-5 hold** ("value.js stays on glass 7.0.0 … X-W7L mints at BL's cut"). value.js ships on glass 10.1.0. Holding on 7.0.0 is no longer a lawful outcome of this wave.

## Units (serial)
### `.m` — the repin and the migration
1. Pin `"@mkbabb/glass-ui": "10.1.0"` (exact) and install.
2. Apply the banked migration patch `docs/tranches/X/evidence/X-W7R/m-repin-10.0.1-migration.patch` (`d49d2238`, written for 10.0.1). Resolve drift against today's tree at the root; the patch is a guide, not bytes to force.
3. Read glass's CHANGELOG and migration notes for 8.0.0 through 10.1.0 whole. Migrate every breaking change at its consumer root. No shims and no compat layers.
4. Gates: `npm run check` 0 · `npm test` GREEN · vue-tsc demo 0 · smoke `--workers=1` GREEN or each failure classified with its cause · D1 headed ×2.

### `.i` — the certified ink on glass 10's veil (ESC-W7Rm-1's cause, cured, never held)
1. Reproduce the crash: glass 10's veil-ladder plate recut (GLASS-VEIL-GREY, O-62) makes the certified-ink instrument throw `contrast_unreachable`. Name the plates, the composites and the ink the instrument sought.
2. First, ask glass-ui (the live session) whether 10.1.0 changes the veil. Measure the light-theme `.dock-plate` composite and every glass surface in view at 10.1.0, against the 7.0.0 reading `color(srgb 0.916 0.870 0.829 / 0.328)`.
3. **Cure at the root.** The instrument certifies ink against the **real composite** glass 10.1 paints: glass's published veil tokens, the plate material and the ground below it. Where a certified ink is reachable, the instrument finds it; `contrast_unreachable` is a bug in the instrument's search or its model, not a reason to stay on 7.0.0. Where the veil truly makes AA unreachable on a surface, the measured surface and composite go to glass as a dated addendum beside O-62, and the surface is recorded honest-RED with its id. The app still ships on 10.1.0, and the ink stays the best certified value.
4. Gates: the instrument runs to completion on every plate ×2; the certified-ink contract tests are GREEN; frames at 1440 light and dark, before (7.0.0) and after.

### `.v` — re-read every glass-owned value.js row at 10.1.0
Re-read, on the served page (`:9000`, headed): every open value.js honest-RED id and relay row glass owns (the X-W7R `.v` list: DOCK-SCROLL-MORPH, DOCK-MORPH-ROOT, I3-SEED-SIZE, G3-FALLTHROUGH-TYPES, O12-3-HOVER-GPU, GLASS-VEIL-GREY, O-55/56/62/63/65/66/67/68), and every AUDIT-2-value row marked ADOPT-AT-X-W7L. Mark each CURED-BY-REPIN or still-live, with its measurement. X-W12U then cures the consumer halves on 10.1.0, and its ADOPT-AT-X-W7L rows become "adopt now".

### `.a` — adopt 10.1.0's additive primitives where value.js has the shape
`ConfiguratorLayer #actions` everywhere a section action sits on its own row (the owner: *"the refresh button should be inline in the section when expanded too"*). `Configurator layout="detached"` wherever a stage-plus-inspector Configurator shows a shell band between stage and aside (the fourier owner frame, §0cz). A falsifier of the same shape as fourier's `f-w14v-detached.spec.ts`.

## §1 Bounds
`package.json` · `package-lock.json` · `demo/**` · `src/**` only where the migration names a library consumer site (one commit, `npm test` GREEN) · `e2e/**` · `test/**` for the ink instrument · the record · `LEDGER.md` (own hunk) · `INBOX.md` (mail rows). Never `glass-ui/**` (READ-ONLY) or `scripts/dev/dev.sh`.

## §2 Close
The pin reads `10.1.0` exact on `tranche-u`, committed and pushed. Every gate above is GREEN ×2 or carries a named honest-RED with a relayed id. No row reads "hold on 7.0.0". The row flips CLOSED on a CONFORMANT check.

## ADDENDUM 2026-09-24 (I-56) — the migration traps glass names, which MIGRATION.md does not catch at build time
`.m` checks each one against value.js's source and lists it in the record with the grep or measurement:
- 1. 10.0.0 put every library rule in `@layer components`. Unlayered consumer CSS now BEATS library rules it used to lose to: old no-op overrides can start painting, and `!important` hacks flip meaning. Audit every consumer stylesheet that touches glass classes.
- 2. Stale reka-ui bindings silently do nothing: `:pressed`, `v-model:search-term`, `tag=`, and the MIGRATION BI.W-* renames (variant→tone, type→tone, direction/position, surface="clear" retired, Sheet → <Dialog placement>, MultiSelect → <Combobox multiple>, ContextMenu → Menu trigger="context"). vue-tsc and unit tests PASS these; only e2e or a paint check catches them. Grep for each.
- 3. `:global(.dark) .x` inside scoped Vue style blocks is DROPPED from the emitted CSS. Use a plain `.dark .x` ancestor instead.
- 4. `light-dark()` wrapping an inset shadow computes the whole box-shadow to none, so any consumer shadow token built that way paints nothing.
- 5. glass → keyframes.js ^6 → value.js 4.0.0: a consumer that also pins value.js directly can end up with two copies. Check `npm ls @mkbabb/value.js` and dedupe.
- 6. For jumps from 3.x: cross 4.0.0, 5.0.0 (the /api fold, --ring → --focus-ring-color, goo-blob → blob) and 7.0.0. Read MIGRATION.md BOTTOM-UP from your pinned version, not top-down.
- **Also:** the veil fix (O-62 plus O-66 §1) ships in glass **10.2.0**. It depends on BL D3 converging, and the owner confirms that publish in the glass session. When it publishes, value.js repins to it exactly and re-reads its certified ink. That work is a follow-up unit, not a reason to stay on 10.1.
