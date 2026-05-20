# D-HARDEN-5 — Styling + Playwright depth + aurora/blob filing sharpness

**Mode**: READ-ONLY hardening audit, planning-only.
**Date**: 2026-05-19.
**Scope**: Df→D.W4 cross-walk + design-idiom locus + D.W4 pixel-isomorphism gate; Dg→D.W5 cross-walk + mobile budget + admin-mock seed-key; aurora (Dc) + blob (Dd) filing depth in `coordination/Q.md §3`; cross-references.
**Sources cited**: file:line per claim.

---

## §1 — D.W4 (styling) cross-walk + design-idiom locus verdict

### §1.1 Df → D.W4 finding-by-finding cross-walk

| Df finding | Df §:line | D.W4 lane | Landing line | Verdict |
|---|---|---|---|---|
| ~43 arbitrary `[var(--…)]` token-reaches (10 z-tier + 14 duration + 8 radius + 11 layout) | `research/Df-styling.md §1.1, §9.P1.1` | A | `D.W4.md:13` | LANDED — verbatim 43-count carry; mechanism named (Tailwind `@theme` / `@utility`); fully isomorphic compile target |
| Magic-literal arbitrary brackets — `min-h-[120px] ×3`, `max-w-[200px] ×2`, etc. | `Df §1.2`, P1.3 | A | `D.W4.md:14` | LANDED — duplicates de-duped; bespoke ones stay flagged with inline rationale |
| 4 colocation candidates — `.pane-scroll-fade`, touch-gate cluster, `.palette-tab-content`, `.palette-card-grid` | `Df §2.2`, P2.5–6 | A | `D.W4.md:15` | LANDED — all 4 named; landing component scopes named (`PaneHeader.vue` for scroll-fade, `useTouchGate.ts` neighbor for cluster, `PaletteDialog.vue` for tab-content, `PaletteCardGrid.vue` for grid). ~40 LOC delta target carried |
| `.pane-container` ↔ `.app-layout` 1rem padding silent coupling | `Df §4.1`, P1.4 | A | `D.W4.md:16` | LANDED — both repair shapes named (token vs comment); recommends `--app-layout-padding-x` |
| Design-cohesion drift — 3 mono stacks, hero-lab `999px`, redundant `, monospace` | `Df §8`, P2.8 | A | `D.W4.md:17` | LANDED — verbatim three items |
| Brittle `:deep(svg)` + `button:has(> .lucide-x)` | `Df §5.3`, P2.7 | A | `D.W4.md:18` | LANDED — both sites named (PaletteCard + PaletteDialog); replace via role/label/data-* |
| Design-idiom catalog | `Df §7, P1.2` | B | `D.W4.md:22-41` | LANDED — 10-section sketch verbatim |
| Inline static styles (3 sites — touch-action, transition-duration, font-display) | `Df §1.3` | — | (not in D.W4) | DEFERRED — minor, sub-2-line each; could fold into Lane A but not mandated |
| `-webkit-mask-image` removable (P3.10), `-webkit-backdrop-filter` (P3.11), `.fraunces/.fira-code` migration (P3.12), `.slug-pill` upstream (P3.13), `.underline-tabs` sunset (P3.14) | `Df §9.P3` | — | (not in D.W4) | DEFERRED — explicit P3 in Df; carries to a future cleanup; correct exclusion |

**Verdict §1.1**: D.W4's lane-A scope is a **lossless P1+P2 carry** from Df. The P3 exclusions are correctly deferred. No finding falls between the cracks.

### §1.2 Design-idiom locus — verdict against the directive

The directive ("a localized area that defines all of our design idioms — but still leverages proper colocation") was read by Df §7.2 → §7.4 as **a markdown catalog**, not a code file. The reasoning (Df §7.3) is the cascade-order split-brain risk that glass-ui §Token Architecture warns against.

**The user's challenge**: could a thin `demo/@/styles/design-idioms.ts` (type-safe tokens + constants for component-level consumption) be the better idiomatic locus?

Three considerations:

1. **Tokens already live in `style.css :root` + glass-ui's `@theme`** (Df §7.1 enumerates the four current authoritative surfaces). A `.ts` constants file would be a **fourth authority surface** — strictly multiplying the homes where a contributor must look. The directive's "localized area" maps to *reducing*, not *adding*, authoritative surfaces.

2. **Tailwind v4 with `@theme` is the type-safe consumption path**. Once Lane A surfaces the 43 token-reaches as Tailwind utilities (`D.W4.md:13`), `class="z-popover duration-fast rounded-input"` is the type-safe consumption — autocomplete from the Tailwind LSP, error on typo, compile-time class generation. A `.ts` constants file would **duplicate** what `@theme` already generates.

3. **The `.ts` file would create a Vue-template ↔ TS-constant split**. Component templates can't easily consume a `.ts` constant in a `class=` binding without `:class="[someConst.zPopover]"`-style ceremony — strictly worse than `class="z-popover"`. The only natural use is JS-side reads (`style="z-index: Z_POPOVER"`), but the codebase has **zero numeric z-index literals** outside `z-0`/`z-10` (Df §4.3); the JS-side use-case doesn't exist.

**Verdict §1.2**: **`demo/DESIGN.md` is the correct idiomatic locus**, not a `.ts` constants file. The catalog is *narrative + reference map*; tokens stay in `style.css :root`; consumption is via Tailwind utilities (post-Lane A). A `.ts` file would (a) add a fourth authority surface, (b) duplicate what `@theme` already publishes, (c) lack a clean template-binding consumption path. The Df §7.3 reasoning holds.

**One refinement**: D.W4 Lane B's gate (`D.W4.md:41`) says "consumers (component authors) can read the catalog and write idiomatic code without grep-archaeology." This is the right test. The catalog passes if a contributor adding a new pane can read DESIGN.md once and write idiomatic code; it fails if they need to grep for sibling-component examples. Lane B's commit plan should preserve this litmus.

---

## §2 — D.W4 pixel-isomorphism gate verdict

### §2.1 The directive vs the wave-spec gate

- **D-opening directive**: "perfectly isomorphic" unless HIGHLY befitting otherwise (`D.W4.md:7`).
- **D.W4 sub-gate A**: "pixel-drift ≤ 1% (or every drift is documented and accepted)" (`D.W4.md:20`).
- **D.md wave summary**: "0 pixel-drift on the W5 baseline (or documented-and-accepted)" (`D.md:44`).

### §2.2 1% vs 0% tolerance — analysis

The 1% threshold is **soft** — the alternative branch ("or every drift is documented and accepted") is the binding constraint. Lane A's mechanism is `[var()]` arbitrary brackets → Tailwind utilities that compile to **the same `var()` reference**; the rendered CSS is byte-identical for those 43 sites. For the colocation moves (4 candidates) the rules don't change; only the file they live in. For the brittle-selector fixes the rules don't change; only the matcher. **None of Lane A's mechanical work should produce any pixel drift**.

The drift sources are bounded:

| Drift source | Lane A site | Expected drift | Documentable? |
|---|---|---|---|
| `min-h-[120px] ×3` → `min-h-30` (Tailwind v4 numeric) | Df §1.2 row 1 | `min-h-30` = `7.5rem` = `120px` at 16px root — **identical at default root**, drifts at root-font-size override. The demo has no root-font-size override → **zero drift** | n/a |
| hero-lab `999px` → `--radius-pill` (or token) | Df §8 row 2 | If token = `9999px` (Tailwind `rounded-full`), drift = 0 px visually (both exceed half-height) | document if `--radius-pill: 999px` |
| Mono-stack consolidation | Df §8 row 3 | hero-lab dropping `, monospace` fallback — only matters if Fira Code fails to load; in that case the `@theme` fallback chain (which Df §8 confirms exists) takes over → **zero drift in normal conditions** | document the dropped fallback |
| `.app-layout-padding-x: 1rem` tokenization | Df §4.1 | Pure variable substitution; same value → zero drift | n/a |
| Touch-gate `:has()` reach after move out of style.css | Df §2.2, §5.3 | Df §2.2 caveat: "the rules need to participate in the cascade with reka-ui's slider markup; the move is mechanical but requires verifying scoped-style stripping doesn't break the `:has()` reach" | **HIGH-RISK** — this is the one drift source that needs visual verification, not just calculation |
| `button:has(> .lucide-x)` → class/data-attr | Df §5.3 | If the new selector matches the same node set, drift = 0. Risk: misidentifying the close-button node | document a screenshot |

**Verdict §2.1**: **The 1% threshold is too loose for what Lane A actually does.** The work is dominated by *isomorphic-by-construction* moves (Tailwind-utility surfacing, token substitution, selector rewrites). The honest gate is **"pixel-drift = 0 except for an enumerated drift list, each line a single-sentence rationale"**.

### §2.3 Recommended enumeration of accepted drift lines

If D.W4 Lane A is dispatched, the audit artefact (`audit/D.W4-utility-surfacing.md`, per `D.W4.md:56`) should carry a table with one row per accepted drift:

| Drift | Site | Magnitude | Rationale |
|---|---|---|---|
| `999px` → `--radius-pill: 9999px` | hero-lab.css:117 | 0 px visual (both exceed half-height for any reasonable pill) | tokenized; matches Tailwind `rounded-full` convention |
| Touch-gate cascade resolution | `useTouchGate.ts` neighbor | 0 (verify) | visual-diff probe before/after move; if drift > 0, revert + leave global |
| `:has(> .lucide-x)` → close-button class | PaletteDialog.vue:634,643,647 | 0 (verify) | new selector targets the same close-button wrapper |

**Verdict §2.2**: **Tighten the gate to 0% with an enumerated drift list**. The "≤ 1%" framing in `D.W4.md:20` should be retired in favor of "= 0 (or every drift is documented in this list)". A 1% per-pixel tolerance allows imperceptible-but-real drift to accumulate across waves; the codebase has the discipline to claim 0.

**Recommendation**: edit `D.W4.md:20` to read "pixel-drift = 0 (or every drift is enumerated in the audit artefact with a one-sentence rationale)". `D.md:44` already uses the stricter "0 pixel-drift" framing — the wave spec is the looser one and is the inconsistency that should be normalized to the strict reading.

---

## §3 — D.W5 (Playwright) cross-walk + mobile-budget verdict

### §3.1 Dg → D.W5 spec-by-spec cross-walk

| Dg spec | Dg §:line | D.W5 lane | Landing line | Verdict |
|---|---|---|---|---|
| picker, palettes (baseline) | `Dg §6.1` | — | (already in `e2e/smoke/` — 3 baseline) | OK |
| browse, extract, mix, generate, gradient, atmosphere, blob (7 per-view) | `Dg §1.2, §6.1, §7.P1.1` | A | `D.W5.md:15-22` (7 specs named) | LANDED — **but D.W5.md:16 misnames** the picker as `picker.spec.ts` (line 16) when picker is already covered by `page-load.spec.ts` per `Dg §1.2` table row 1; D.W5's Lane A enumerates `picker.spec.ts` as one of the seven, double-spec'ing the already-covered surface |
| cross-view walk (1 spec) | `Dg §4, §6.1, §7.P1.2` | A | `D.W5.md:24` | LANDED — line budget 55-65 carried |
| WebGL probe — aurora + blob (2 specs) | `Dg §3, §6.1, §7.P3.7` | A | `D.W5.md:26` | LANDED as ONE spec `webgl.spec.ts`, not two. **DRIFT** — Dg §6.1 row 4 says "2 specs"; D.W5:26 says "one spec covering both canvases". This is a defensible compaction (one 35-45 line spec can locate both canvases) but is **not literal carry** from Dg; flag for the dispatched agent |
| 5 admin-view specs + admin-walk + fixture | `Dg §2, §6.1, §7.P2` | B | `D.W5.md:32-40` | LANDED verbatim |
| mobile probe (1 spec) | `Dg §5.3, §6.1, §7.P4.9` | C | `D.W5.md:46-49` | LANDED — single-spec, Pixel-7, 5-second budget per Dg explicit |
| `playwright.config.ts` add `smoke-admin`, `smoke-mobile` projects | `Dg §5.1, §5.3` | C | `D.W5.md:47` | LANDED |
| CI wiring (run all three projects) | `Dg §5.2` | C | `D.W5.md:48` | LANDED |
| **NON-RECOMMENDATIONS** — admin-login-live spec | `Dg §7 non-recs` | — | not in D.W5 | CORRECTLY EXCLUDED — the killed W5-C hang root |
| per-pair view-switch matrix (14×13 = 182) | `Dg §7 non-recs` | — | not in D.W5 | CORRECTLY EXCLUDED |
| interaction-depth specs | `Dg §7 non-recs` | — | not in D.W5 | CORRECTLY EXCLUDED — would belong in a D-internal interaction tier |
| visual-regression / screenshot specs | `Dg §7 non-recs` | — | not in D.W5 | CORRECTLY EXCLUDED — the abrogated 16-spec suite's worst offender |
| Cross-tranche dependency — atmosphere spec asserts placeholder copy until Dc lands | `Dg §7 non-recs final` | A (atmosphere.spec.ts) | implicit | NOT CALLED OUT in D.W5 — should be flagged as a follow-up card |

**Verdict §3.1**: Dg's 20-spec budget lands at D.W5 with two notable drifts:
1. **picker double-spec** — `D.W5.md:16` adds a `picker.spec.ts` whereas `page-load.spec.ts` already covers it. Lane A should be tightened to **6 per-view specs**, not 7 (browse, extract, mix, generate, gradient, atmosphere, blob is the correct list with picker excluded).
2. **WebGL spec compaction (2 → 1)** — defensible but undocumented; the wave spec should either (a) split into `atmosphere.spec.ts` + `blob.spec.ts` matching Dg §6.1 row 4, or (b) note the compaction with a one-sentence rationale.

### §3.2 Mobile budget verdict — is one spec enough?

Dg §5.3 justifies the single spec on four grounds:
1. `PaneSegmentedControl` only mounts below `lg:` — desktop never exercises it.
2. Mobile dock layer is a distinct code path.
3. The iOS-Safari ValueUnit-nesting bug (~294-frame stack-overflow per MEMORY.md) only manifested on the smaller mobile stack.
4. **Don't repeat the 14-view walk on mobile** — desktop carries that load.

**Counter-considerations** (the user's audit prompt):

| Concern | Resolution |
|---|---|
| iOS-Safari class bugs not caught by Chromium-Pixel-7 emulation | Pixel-7 device emulation uses **Chromium**, not WebKit; the ValueUnit-nesting fix in MEMORY.md was iOS-Safari-specific. **Pixel-7 emulation does NOT catch iOS-Safari class bugs** — it catches viewport + touch + dock-layer regressions, but not Safari engine quirks |
| Cross-engine coverage (WebKit) | Playwright supports a `webkit` project; not in Dg's scope; would be a fourth project (`smoke-safari`). Recommend filing as a follow-up beyond D — the runtime budget would grow ~30% |
| Mobile dock layer + `PaneSegmentedControl` + `useViewManager` mobile branch | Single-spec probe covers boot + visible landmark; does NOT exercise the segmented-control toggle | 
| The mood/blob FSM on iOS Safari (the original stack-overflow site) | NOT exercised by a boot-only probe; the bug manifested after ~294 frames of WebGL render |

**Verdict §3.2**: The single-spec budget for `smoke-mobile` is **right for the "boot doesn't break on mobile viewport" probe** Dg names, but it's **NOT sufficient for the iOS-Safari class bugs** the prompt asks about. Two precision points:

1. **Pixel-7 emulation runs Chromium engine, not WebKit**. The MEMORY.md ValueUnit-nesting bug "only manifested on the smaller mobile stack" — that's true of stack-frame budget (a Chromium-on-mobile-emulation behavior), but Safari-specific bugs (the post-paint Safari fix in glass-ui's `e2e5303`, the Promise.reject microtask path in `useAurora.ts:148-156`) are **engine** issues, not viewport issues.
2. **A boot-only spec catches "broken on first paint" only**. The WebGL ~294-frame stack overflow only surfaces under sustained rendering; a 5-second boot probe wouldn't catch it.

**Recommendation**: keep D.W5 Lane C's single-spec budget as planned (it's the right scope for the wave), but **file a follow-up card** for tranche-D-or-successor:
- A WebKit project (`smoke-safari`) for engine-class bugs.
- A 30-second `smoke-mobile-sustained` spec that mounts the picker, drives 5 color changes, and asserts no console errors / no `webglcontextlost` (catches the ValueUnit-nesting class bug + the goo-blob render-loop classes).

These are **NOT** in D.W5's scope (would blow the 35-line per-spec budget and the "boot + one interaction + one assertion" smoke discipline), but they're the actual iOS-Safari coverage the prompt's concern points at. The honest framing: D.W5's mobile probe catches viewport regressions, not engine regressions.

---

## §4 — D.W5 admin-mock seed-key verification

### §4.1 The seed-key claim

`Dg §2.1, §2.2` and `D.W5.md:33` all name the storage key `palette-admin-token` for the `addInitScript` seed.

### §4.2 Source verification

`demo/@/composables/auth/useAdminAuth.ts:15`:

```ts
const STORAGE_KEY = "palette-admin-token";
```

`useAdminAuth.ts:21` — `getAdminToken()` reads via `safeGetItem(localStorage, STORAGE_KEY)` on first call (the lazy-init pattern Dg §2.1 describes verbatim).
`useAdminAuth.ts:37` — `login()` writes via `safeSetItem(localStorage, STORAGE_KEY, token)`.
`useAdminAuth.ts:42` — `logout()` clears via `safeRemoveItem(localStorage, STORAGE_KEY)`.

**Verdict §4**: The seed key `palette-admin-token` matches **exactly** what `useAdminAuth.ts:15` reads. The Dg §2.2 `addInitScript` fixture sketch will short-circuit the login UI as designed. The lazy-init claim (`useAdminAuth.ts:19-24` — `if (!_adminToken)` gate, module-level singleton) is also accurate; the init script must run before the first `useAdminAuth()` call, which `addInitScript` guarantees (it runs before any page script).

**One sub-verification**: `safeGetItem` is the wrapper from `useSafeStorage.ts:13` (imported at line 13). It tolerates Safari private-mode `QuotaExceededError`; the fixture's `localStorage.setItem` call in the init-script context runs in the page's own JS realm, where the same wrapper-tolerance is moot (the fixture writes raw `localStorage.setItem(key, val)`, per `Dg §2.2:148-150` — not via `safeSetItem`). This is correct because the init script runs in the page realm where `localStorage` is real (not the wrapper's defensive path). **No correction needed**.

---

## §5 — Aurora filing depth — 3-5 implementer questions check

### §5.1 The filing surface

`coordination/Q.md §3` row 2 (`Q.md:33`) + `research/Dc-aurora.md §3` (the algorithm sketch).

### §5.2 Implementer-question audit

A glass-ui maintainer who picks up "ship `deriveAuroraPalette(baseColor, opts)`" would face these questions; each is checked against the filing.

| # | Question | Answered? | Where |
|---|---|---|---|
| Q1 | What is the *type* of `baseColor` — string CSS, hex, OklchStop, or runtime color object? | YES | `Dc §3.1:255` — `baseColor: string  // any CSS color the canvas-2D parser accepts`. Glass-ui already ships `cssToOklch(css)` (`Dc §1.1` table row) so the parse step is named |
| Q2 | How does the algorithm degrade for grayscale base colors (C = 0)? The hue becomes undefined; the harmony hues are spreads off an undefined H0. | **PARTIAL** — `Dc §3.2` step 1 names `L0, C0, H0 = base.L, base.C, base.h` without addressing the C=0 case. The glass-ui `cssToOklch` likely returns H=0 for grayscale (the value.js convention per `useColorModel`'s `stableHue` pattern in MEMORY.md), so harmony-spread-from-H0 produces a deterministic palette — but the filing doesn't *state* this. An implementer would have to either assume or test. **GAP** |
| Q3 | How does the 30-field `AuroraConfig` derive from ONE OKLCh color? | YES — partially via two functions: `deriveAuroraPalette` returns `OklchStop[]` (the `palette` field), `deriveAuroraConfig` adds the `nuclei[]` placement (`Dc §3.4`) and the motion/medium overrides (the 5 atmosphere-tuned fields named in the return object at `Dc §3.4:362-370`). The remaining ~20 fields use `DEFAULT_AURORA_CONFIG` spread (`Dc §3.4:359`). **COMPLETE — the implementer knows exactly which fields derive, which copy from DEFAULT** |
| Q4 | Does the older `deriveColors` algorithm's hue-triangulation (`i % 3 == 0 ? -1 : 1` sign-flip) generalise to v4.1's nuclei? | **NO — and that's the right answer**. `Dc §2.2` explicitly preserves the *L-envelope two-cohort partition* but `Dc §3.3` replaces hue-triangulation with explicit harmony generators (analogous / complementary / triadic / etc.). The old `i % 3` sign-flip was an implicit analogous-with-accent; the new design surfaces the harmony as a first-class option. **The implementer is told explicitly that the old hue mechanism is replaced, not preserved**. Good |
| Q5 | Is the harmony hue-generator math specified, or only named? | YES — `Dc §3.3` table gives the per-harmony formula: analogous `H0 + spread * (i / (n-1) - 0.5) * 2`; complementary `i % 2 == 0 ? H0 : H0 + 180 + jitter`; triadic `H0 + (i % 3) * 120`; split-complementary `H0, H0+150, H0+210`; monochromatic `tiny wobble`. Each is one line; implementable directly |
| Q6 | What's the determinism guarantee — does the same baseColor always produce the same palette + nuclei layout? | YES — `Dc §3.6:391-395` — PRNG seeded from `H0`, so changing only L0 produces the same nuclei layout. Explicit guarantee |
| Q7 | What happens when L0 + lGain × envelope exceeds [0,1]? | YES — `Dc §3.2:309` `clamp01(...)` is named explicitly |
| Q8 | How does chroma desaturate at L extremes? | YES — `Dc §3.2:311-312` — `C_i = max(0, C0 * chromaK * (1 - 0.4 * abs(L_i - L0) / lSpread))`. Formula given |
| Q9 | How are nuclei placed for the atmosphere config (n=3)? | YES — `Dc §3.4:343-358` — golden-angle on a centered ellipse, seeded by H0, with explicit formulas for x/y/radius/paletteBias/valueBias/driftRadius/driftPhase |
| Q10 | What's the default count, harmony, lSpread, hueSpread? | YES — `Dc §3.1:243-251` (interface defaults: count=4, harmony="analogous", lSpread=0.18, chromaScale=0.9) + `Dc §3.3` table for hueSpread defaults per harmony |

**Verdict §5**: The filing is **nearly complete for direct implementation**, with **ONE gap**:

- **Q2 (grayscale C=0 handling) is not specified**. An implementer must either:
  - Assume glass-ui's `cssToOklch` returns H=0 for grayscale (deterministic), OR
  - Add a `chromaFloor` parameter for the C=0 case to seed a harmony hue spread.

This is fixable with a 1-line addition to `Dc §3.2` step 1: "If `C0 < EPSILON`, harmony hue spreads still operate around `H0` (whose value glass-ui's `cssToOklch` returns as 0 for grayscale per convention) — the result is a monochromatic-with-L-variation palette." Or surface `chromaFloor` as a `DerivePaletteOptions` field.

**Overall verdict §5**: The aurora filing is **9/10 implementable**. A glass-ui maintainer could ship `deriveAuroraPalette` + `deriveAuroraConfig` from the filing without needing additional research, modulo the one grayscale-edge clarification. The atmosphere-preset bundling is also explicit (Dc §3.4 return object names the 5 atmosphere-tuned override fields). Filing depth: **TIGHT**.

---

## §6 — Blob filing depth — hook signature + types check

### §6.1 The filing surface

`coordination/Q.md §3` row 1 (metaballs 7 additions) + row 3 (`BlobDot`) + `research/Dd-blob.md §3-4` (the gap list + augmentation signatures) + `§6.2` (`BlobDot` API).

### §6.2 `useMetaballs` hook signature audit

The proposed signature (`Dd §4.1:244-254`):

```ts
export function useMetaballs(
    canvasRef: Ref<HTMLCanvasElement | null>,
    config?: MetaballConfig,
    options?: UseMetaballsOptions,
): {
    isSupported: Ref<boolean>;
    isReducedMotion: Ref<boolean>;
    isReducedTransparency: Ref<boolean>;
    pause(): void;
    resume(): void;
};
```

The prompt's spelling `useMetaballs(canvasRef, config, options)` matches.

**Checks**:

| Field | Type declared? | Where |
|---|---|---|
| `canvasRef: Ref<HTMLCanvasElement \| null>` | YES | `Dd §4.1:245` |
| `config?: MetaballConfig` | YES — interface fully declared at `Dd §4.1:215-226` (existing 8 fields preserved + `pointer?`, `colorPerturbation?`, `mode?`) | `Dd §3.1, §4.1` |
| `options?: UseMetaballsOptions` | YES — interface declared at `Dd §4.1:230-242` | `Dd §4.1` |
| `options.positionSource?: (now, dt) => readonly MetaballFrame[]` | YES — both arg types and return type given | `Dd §4.1:234` |
| `options.pointer?: Ref<{x, y, active} \| null>` | YES — full shape given, coordinate range specified (`[-0.5, 0.5]` relative to canvas center) | `Dd §4.1:238` |
| `options.pauseOnHidden?: boolean` (default true) | YES | `Dd §4.1:241` |
| Return type | YES — full shape with all 5 fields typed | `Dd §4.1:248-254` |
| `MetaballFrame` interface | YES — full shape `{x, y, radius, opacity?, colorIndex?}` with units (`[0,1]` UV) | `Dd §4.1:194-200` |
| `MetaballPointerConfig` | YES — `{attraction: number, strength: number}` with ranges | `Dd §4.1:202-205` |
| `MetaballColorPerturbation` | YES — `{hueRange, satShift, valueShift, noiseFreq, noiseSpeed}` with ranges | `Dd §4.1:207-213` |
| `MetaballConfig.mode?: "background" \| "layout"` (G6) | YES — default `"background"` preserves current behavior | `Dd §4.1:225` |

**Verdict §6.2**: The hook signature is **fully specified, every option field's type is declared with units and ranges**. A glass-ui maintainer could implement directly from `Dd §4.1`.

### §6.3 `BlobDot` API audit (`coordination/Q.md §3` row 3)

`Dd §6.2:452-470` proposes:

```ts
export interface BlobDotProps {
    color: string;
    tag?: "div" | "button";
    animate?: boolean;
    cycleDuration?: number;
    range?: [number, number];
    seed?: string;
    watercolor?: boolean;
}
defineExpose<{ nudge(): void }>();
```

| Aspect | Specified? | Where |
|---|---|---|
| All 7 prop fields typed with defaults documented | YES | `Dd §6.2:454-466` |
| `nudge()` imperative API | YES — via `defineExpose` | `Dd §6.2:469` |
| Prop migration map (existing `<WatercolorDot>` → `<BlobDot>`) | YES — "1:1" stated | `Dd §6.2:472-477` |
| 16-site / 9-file consumer inventory | YES | `Dd §2.2` table |
| `<feTurbulence>`/`<feDisplacementMap>` filter shipping plan | YES — either bundled in `<defs>` or via `<BlobDotProvider>`; choice deferred to glass-ui implementation | `Dd §6.2:475-478` |

**Verdict §6.3**: `BlobDot` API is **fully specified for direct implementation**. Glass-ui maintainer has every prop, every default, and a migration map.

### §6.4 Shader-changes filing (`Dd §4.2`)

Four named shader changes (G3 vec4 positions, G2 pointer uniforms, G4 HSV perturbation, optional SDF smin replacement), each with the source-line of the existing demo shader to port from (`metaball.frag.glsl:111-117` for pointer; `:46-78` for FBM; `:93-106` for HSV; `:80-89, 119-134` for SDF smin). **Implementable directly**.

### §6.5 Lifecycle-changes filing (`Dd §4.3`)

Five named lifecycle additions (G1 positionSource, G2 pointer upload, G5 context-loss listeners, G6 mode-conditional class, G7 visibility pause). Each has the source-line of the existing demo lifecycle to port from. **Implementable directly**.

**Verdict §6**: The blob filing is **10/10 implementable**. Hook signature + types + shader changes + lifecycle changes + `BlobDot` API are all specified with formulas, ranges, defaults, and porting references. Filing depth: **TIGHT**.

---

## §7 — Aurora / blob cross-references

### §7.1 The directive's "two research agents in parallel"

The D-opening directive (per `findings.md` context) named "two research agents in parallel for aurora + blob". Verified: `research/Dc-aurora.md` and `research/Dd-blob.md` are the two research deliverables, both opened against `coordination/Q.md §3`. Both are present, both planning-only, both file gaps without writing glass-ui. **Confirmed: Dc + Dd ARE the two research agents**.

The deliverables in `coordination/Q.md §3` are the filed gaps (row 2 = aurora; rows 1+3 = blob). **Confirmed: §3 carries them**.

### §7.2 Shared dependencies between aurora and blob

Both consume glass-ui's color helpers; the cross-references:

| Helper | Aurora consumer | Blob consumer | Cross-ref handled? |
|---|---|---|---|
| `cssToOklch(css)` → `OklchStop` (glass-ui `aurora/composables/color.ts:166-170`) | YES — `Dc §3.1` names it as the parser for `baseColor` | NO — blob doesn't use `cssToOklch`; it uses `cssColorToRgb` (`Dd §1.2:4`) | N/A — aurora-only |
| `cssColorToRgb` (1×1 canvas-2D parser) | NO | YES — `Dd §1.2:4, §6.3 risk row` — both demo and glass-ui have duplicate copies | **PARTIAL CROSS-REF**: `Dd §6.3 Risk row 4` calls this out ("Aurora and Blob both pull on the same `cssColorToRgb` resolver — duplicate copies in both repos") and proposes consolidation: "Once glass-ui owns the metaballs shader resolver, expose `@mkbabb/glass-ui/utils/cssColorToRgb` and use it from `<Aurora>` too" |
| `flattenPalette(stops, maxStops?, out?)` → `Float32Array` (LUT bake) | YES — `Dc §1.1` lists it | NO | N/A |
| `oklchToLinear(stop)` → `[r,g,b]` linear sRGB | YES — `Dc §1.1` lists it | NO (uses raw RGB) | N/A |
| `hexToOklchStop(hex)` / `oklchStopToHex(s)` | YES (`Dc §1.1`) | NO | N/A |
| FBM noise shader fragment | aurora shader has it (`Dc §1.3`, `aurora.frag.ts`) | demo shader has it (`metaball.frag.glsl:46-78`) | **CROSS-REF GAP** — `Dd §4.2:266-269` proposes porting FBM from `metaball.frag.glsl:46-78` into glass-ui's metaballs shader, but doesn't note that aurora already has its own FBM. Could two-FBM consolidate? Probably not (different parameterization), but the filing doesn't say. **Minor — non-blocking** |
| HSV converters (RGB↔HSV) | NO | YES — `Dd §4.2:267-268` ports `metaball.frag.glsl:93-106` | N/A |

### §7.3 Cross-reference verdict

`Dd §6.3 Risk row 4` is the **one explicit cross-ref** between Dc and Dd, and it covers the most load-bearing shared helper (`cssColorToRgb`). The consolidation proposal is sound:
- glass-ui owns one canonical `cssColorToRgb` (or its OKLab variant `cssToOklch`).
- Both `<Aurora>` and `<MetaballCanvas>` consume it via `@mkbabb/glass-ui/utils/cssColorToRgb` (or `aurora/composables/color.ts`'s already-exported `cssToOklch`).
- Demo's local `cssColorToRgb` in `useMetaballRenderer.ts:44-60` deletes alongside the renderer.

**One minor gap** in `Dc-aurora.md`: it doesn't mention the blob's `cssColorToRgb` duplication. The cross-ref is **one-way** (`Dd` references aurora; `Dc` doesn't reference blob). Since `Dd §6.3` carries it explicitly, this is **non-blocking** — the implementing tranche reads both docs as the spec substrate.

**Coordination concern**: if glass-ui ships the metaballs upgrade (`Dd §4`) before the aurora-derive upgrade (`Dc §4.1`), the `cssColorToRgb` consolidation lands first; aurora becomes the second consumer. If they ship together (likely, given they're both in the same glass-ui successor tranche), the helper consolidates in one move.

**Verdict §7**: Cross-references are **adequate**. The one load-bearing shared helper is explicitly named with a consolidation plan. The FBM-noise overlap is technical-but-minor (different shaders, different parameters, unlikely to share code) and correctly left undocumented. No new cross-ref filing needed; both Dc and Dd are read-as-a-pair by the implementing tranche.

---

## Summary (7 lines)

- **D.W4 cross-walk**: P1+P2 from Df cleanly lands in Lane A+B; P3 correctly deferred. Design-idiom locus = `demo/DESIGN.md` markdown is the right shape, not a `.ts` constants file (would add a fourth authority surface; Tailwind `@theme` is the type-safe consumption path).
- **D.W4 pixel-isomorphism gate**: 1% threshold (`D.W4.md:20`) is too loose for what Lane A actually does (isomorphic-by-construction). Tighten to 0% with an enumerated drift list (3 candidate drift sources: hero-lab `999px`, touch-gate cascade, `:has(.lucide-x)` rewrite). `D.md:44` already uses the stricter framing — normalize `D.W4.md` to match.
- **D.W5 cross-walk**: 20-spec target lands with two drifts — Lane A names `picker.spec.ts` as one of 7 per-view specs when picker is already covered by `page-load.spec.ts` (should be 6 per-view), and the WebGL specs compact 2→1 without rationale (Dg §6.1 says 2). Tighten both.
- **D.W5 mobile budget**: single-spec Pixel-7 is right for the wave but does NOT catch iOS-Safari engine bugs (Pixel-7 emulation runs Chromium, not WebKit). The ValueUnit-nesting class bug needs a 30-second sustained spec; engine bugs need a `smoke-safari` WebKit project. File as follow-up; not D.W5 scope.
- **Admin-mock seed-key**: `palette-admin-token` matches `useAdminAuth.ts:15` exactly; lazy-init pattern (`useAdminAuth.ts:19-24`) confirms `addInitScript` will short-circuit the login UI as designed.
- **Aurora filing depth**: 9/10 implementable. One gap — grayscale (C=0) handling not specified; 1-line fix in `Dc §3.2`. All 30-field `AuroraConfig` derivation paths named; harmony generators given as one-line formulas; determinism guarantee explicit; atmosphere-preset bundling explicit.
- **Blob filing depth**: 10/10 implementable. Hook signature `useMetaballs(canvasRef, config, options)` fully typed; every option field typed with units/ranges; `MetaballFrame`/`MetaballPointerConfig`/`MetaballColorPerturbation` interfaces complete; `BlobDot` API + migration map complete; shader + lifecycle changes named with source-line porting references. Cross-ref: `Dd §6.3 Risk row 4` carries the one load-bearing shared helper (`cssColorToRgb`) consolidation; one-way reference (Dd→aurora, not vice versa) but adequate for read-as-a-pair consumption.
