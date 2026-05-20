# E.W4 Lane E — Motion-token canon adoption + Vite 7.3.x

**Branch**: `tranche-e`
**HEAD on dispatch**: `f1d2005214465d34aa05d5457ac63c4df805c563`
**Authored**: 2026-05-20
**Authority**: read-only on git mutations; Read/Write/Edit/Bash only per Lane E dispatch contract.

## §0 — Headline finding

**The demo already adopts glass-ui's general-purpose motion canon (`--duration-*`) at 74 consumer sites**. The new `--motion-duration-*` / `--motion-delay-*` family glass-ui shipped at `0124a8b` is a SPECIALISED canon for celebratory + staged-reveal motion (badge reveals, complete-shimmer, progress-lifecycle, ripple) that the demo does NOT currently author — so direct adoption of those tokens is filed forward, not migrated now. The substantive Lane E work was:

1. **Tokenize 3 hard-coded ms residuals** (Family A — general-purpose):
   - `PointerDebugOverlay.vue:349` `0.1s` → `var(--duration-instant)`.
   - `PaletteDialogHeader.vue:87` `3s` → `var(--duration-shimmer-fast)`.
   - `GooBlob.vue:80` stale fallback `0.3s` → `0.45s` (the canonical `--duration-slow` value).

2. **Tighten stale comments** in `useHeightTransition.ts` (the `// var(--duration-slow) = 0.35s` comment was wrong on both sides — 0.35s ≠ `--duration-slow` 0.45s; rewrite to acknowledge bespoke).

3. **Preserve 6 bespoke literals** (no exact canon match — per `feedback_preserve_animations.md`).

4. **Vite 7.3.1 → 7.3.3** via `npm update vite` (within `^7.0.6` constraint). Single-version delta.

## §1 — Motion-token survey

### §1.1 — glass-ui motion-canon tokens (from `src/styles/tokens.css`)

**Family A — general-purpose duration canon** (tokens.css §1, lines 50-62):

| Token | Value | Role |
|---|---|---|
| `--duration-instant` | `0.1s` | snappy feedback, dev-overlay buttons |
| `--duration-fast` | `0.2s` | hover, micro-interactions |
| `--duration-normal` | `0.3s` | standard transitions, fades |
| `--duration-slow` | `0.45s` | hero-filter, input-mode-flash |
| `--duration-panel` | `0.55s` | dock expand, crown-appear |
| `--duration-xl` | `1s` | one-shot affordances |
| `--duration-xxl` | `1.5s` | long affordances |
| `--duration-shimmer-fast` | `3s` | fast shimmer loops |
| `--duration-shimmer` | `5s` | long-loop shimmer sweeps |
| `--duration-sparkle` | `600ms` | audacious-CTA sparkle micro-event |

**Family B — specialised `--motion-*` canon** (tokens.css §1, lines 64-92 + §2.C lines 207-224; introduced at glass-ui `0124a8b` AH.W5-e):

| Token | Value | Designed for |
|---|---|---|
| `--motion-duration-staged` | `320ms` | staged-entrance pairing (opacity + transform Vue Transitions) |
| `--motion-duration-complete-shimmer` | `2.4s` | one-shot celebratory shimmer (results headline) |
| `--motion-delay-complete-shimmer` | `220ms` | celebratory shimmer staging delay |
| `--motion-duration-badge-disc` | `420ms` | CompleteBadge disc reveal |
| `--motion-duration-badge-ring` | `560ms` | CompleteBadge ring reveal |
| `--motion-duration-badge-check` | `380ms` | CompleteBadge check reveal |
| `--motion-delay-badge-{disc,ring,check}` | `80 / 220 / 460ms` | staged-variety delay cascade |
| `--motion-duration-progress-intake` | `220ms` | rising-edge progress pulse |
| `--motion-duration-progress-crescendo` | `240ms` | leading-edge brighten |
| `--motion-duration-progress-indeterminate` | `4s` | indeterminate-sweep period |
| `--motion-duration-ripple` | `340ms` | audacious-button press-ripple |

Plus the existing `--motion-ease-*` family (lines 106-118) which the unprefixed `--ease-*` aliases (theme.css:292-301) already alias.

### §1.2 — Demo-local motion tokens (from `demo/@/styles/style.css`)

After grepping the demo's `style.css :root` block (lines 65-107) + `animations.css`, **zero demo-local motion duration tokens exist**:

- The `--animation-slide-sm/md/lg` triplet was retired at **B.W1-C** (phantom tokens never defined; `PaletteCard.vue:420,431` carry inline comments documenting the phantom-status). Their `transform: translateY(...)` callsites now use literal `0.5rem` offsets.
- The 5 demo-local additions at D.W4 Lane A (`--max-width-desktop-pane`, `--max-width-tooltip`, `--min-width-menu`, `--spacing-dock-inset`, `--shadow-card-hover`) are LAYOUT bridges, not motion tokens.
- `--popover-offset` (referenced in the dispatch's hint) does not exist in `style.css :root` either.

**Net**: there are no demo-local motion tokens to cross-walk. The demo consumes glass-ui's Family A canon directly through `var(--duration-*)` references at ~74 sites.

### §1.3 — Cross-walk

Since no demo-local motion tokens exist, the cross-walk is the consumer-site audit (the hard-coded ms literals that survived previous waves):

| Demo site | Pre-Lane-E literal | Glass-ui token (exact match) | Verdict |
|---|---|---|---|
| `PointerDebugOverlay.vue:349` | `0.1s ease` | `var(--duration-instant) var(--ease-standard)` | **MIGRATE** |
| `PaletteDialogHeader.vue:87` | `3s ease-in-out` | `var(--duration-shimmer-fast)` for the duration; ease-in-out has no `--motion-ease-*` direct alias (closest is `--motion-ease-out-expo` / `--ease-out-expo` cubic-bezier(0.16, 1, 0.3, 1) — different curve) | **PARTIAL MIGRATE** (duration tokenized; ease-in-out kept literal — the cubic-bezier substitute is not value-equivalent) |
| `GooBlob.vue:80` | `var(--duration-slow, 0.3s)` (stale fallback) | `--duration-slow = 0.45s` | **FALLBACK REFRESH** (token already used; fallback was wrong) |
| `PointerDebugOverlay.vue:266` | `blink 0.5s infinite` | no exact canon (0.5s sits between `--duration-slow` 0.45s and `--duration-panel` 0.55s) | **KEEP** (dev-only debug; bespoke) |
| `ImageEyedropper.vue:286` | `swatch-pop 0.65s` | no exact canon (0.65s sits between `--duration-panel` 0.55s and `--duration-xl` 1s) | **KEEP** (bespoke pop curve) |
| `ActionButton.vue:117,120,121` | `action-pulse / action-spin 0.4s` | no exact canon (0.4s sits between `--duration-normal` 0.3s and `--duration-slow` 0.45s) | **KEEP** (bespoke flash) |
| `PaletteCard.vue:388` | `golden-text-shimmer 4s` | no exact canon (4s sits between `--duration-shimmer-fast` 3s and `--duration-shimmer` 5s) | **KEEP** (paired with the 4-stop gradient's visual rhythm) |
| `useHeightTransition.ts:1-2` | `350ms / 250ms` JS constants | no exact canon for either | **KEEP** (JS-runtime; comments tightened) |
| `hero-lab.css:290` | `140ms` | no exact canon (140ms sits between `--duration-instant` 100ms and `--duration-fast` 200ms) | **KEEP** (sub-app entry; bespoke) |

The **3 migrate sites + 1 fallback refresh + 1 comment-tighten + 6 bespoke preserves** is the complete Lane E motion surface.

### §1.4 — Family B (`--motion-duration-*`) demo-side adoption

**NOT ADOPTED** — and the verdict is correct, not a deferral. Family B's celebratory + staged-reveal semantics target speedtest's `SpeedtestResults`, `ThankYou`, `ResultStack`, `CompleteBadge`, `audacious-button` ripple, `Progress` lifecycle. The value.js demo authors:

- a color-picker (`ColorPicker.vue`, `ComponentSliders.vue`) → uses Family A (`--duration-fast` for hover, `--duration-normal` for outline-color transitions).
- palette browsing (`PaletteCard.vue`, `PaletteDialog/`) → uses Family A + bespoke shimmer.
- WebGL atmospherics (`GooBlob.vue`, glass-ui `aurora`) → RAF-driven, not CSS-token-driven.
- height-transitions (`useHeightTransition.ts`) → JS-runtime numeric constants.

Nothing in the demo currently authors "staged reveal", "celebratory badge", "ripple", or "progress lifecycle" semantics, so Family B has no adoption surface here. Filed forward in the §3-style ledger should the demo ever grow such motion (e.g. if a successor tranche adds a CompleteBadge-style flash for "palette saved" affordances).

## §2 — Migration diffs

### §2.1 — `demo/@/components/custom/color-picker/visual/PointerDebugOverlay.vue:349`

```diff
-    transition: filter 0.1s ease, transform 0.1s ease;
+    /* E.W4 Lane E: tokenize to glass-ui canon — `0.1s` = `--duration-instant`. */
+    transition: filter var(--duration-instant) var(--ease-standard),
+                transform var(--duration-instant) var(--ease-standard);
```

### §2.2 — `demo/@/components/custom/palette-browser/PaletteDialog/components/PaletteDialogHeader.vue:87`

```diff
-    animation: golden-shimmer 3s ease-in-out infinite;
+    /* E.W4 Lane E: tokenize 3s shimmer to glass-ui canon `--duration-shimmer-fast`. */
+    animation: golden-shimmer var(--duration-shimmer-fast) ease-in-out infinite;
```

(The `ease-in-out` literal is retained — Family A has no `ease-in-out` alias; `--ease-standard` is `cubic-bezier(0.4, 0, 0.2, 1)` which is the decel-cubic, not symmetric. Keeping the literal preserves the existing visual curve.)

### §2.3 — `demo/@/components/custom/goo-blob/GooBlob.vue:80`

```diff
-    transition: filter var(--duration-slow, 0.3s) var(--ease-standard, ease);
+    /* E.W4 Lane E: refresh fallback to the canonical `--duration-slow` value (0.45s). */
+    transition: filter var(--duration-slow, 0.45s) var(--ease-standard, ease);
```

(The token was already adopted; the `0.3s` fallback was inherited from an earlier `--duration-normal` value and never refreshed.)

### §2.4 — `demo/@/components/custom/palette-browser/composables/useHeightTransition.ts:1-2`

```diff
-const DEFAULT_EXPAND_DURATION = 350; // var(--duration-slow) = 0.35s
-const DEFAULT_COLLAPSE_DURATION = 250; // var(--duration-normal) = 0.25s
+// E.W4 Lane E: bespoke height-transition durations (no exact glass-ui canon match
+// — 350ms sits between `--duration-normal` 300ms and `--duration-slow` 450ms;
+// 250ms sits between `--duration-fast` 200ms and `--duration-normal` 300ms).
+// Both values were tuned by hand at B-tranche for the palette-card expand/collapse
+// rhythm; kept as JS-runtime constants because `useHeightTransition.ts` writes
+// inline `style.transition` strings that need numeric ms units.
+const DEFAULT_EXPAND_DURATION = 350;
+const DEFAULT_COLLAPSE_DURATION = 250;
```

(Pure comment correction; values unchanged — the original comments asserted `--duration-slow = 0.35s` and `--duration-normal = 0.25s`, both of which contradict the canon at glass-ui tokens.css:50-56.)

### §2.5 — Demo SFC consumer migrations (per file)

Only 4 files touched in Lane E. The 74 sites that already consume `var(--duration-*)` and `var(--ease-*)` from glass-ui were verified compliant and not re-touched. Per `feedback_preserve_animations.md` the 6 bespoke literals (preserve list above) are retained verbatim.

## §3 — Vite upgrade

- **Pre-state version**: `7.3.1` (lockfile-resolved from `^7.0.6` constraint).
- **Post-state version**: `7.3.3` (latest within `^7.0.6` constraint per `npm view vite@^7.0.6`).
- **Lockfile clean**: YES. `git diff package-lock.json` shows 4 version transitions only:
  - `@mkbabb/value.js` self-version 0.5.1 → 0.6.0 (lockfile catch-up with package.json which says 0.6.0; not a Lane-E-authored change but lock was stale).
  - sibling `../glass-ui` 1.9.3 → 2.0.0 (reflection of the linked sibling's version field; the `file:` link picks up whatever the symlinked tree's package.json says).
  - `node_modules/vite` 7.3.1 → 7.3.3 (the actual update).
  - `vue-router` relocation from `dependencies` → `devDependencies` (lockfile catch-up).
  - 3 `@babel/*` packages now marked `"dev": true` (lockfile catch-up — they're transitive dev-only).
- **No new packages were installed** (the "added 82 packages" message npm prints is the count of cumulative `file:`-link reconciles, not new installs — `git diff` shows zero new `"node_modules/..."` keys).

The diff is exactly what the Lane E dispatch expected — a one-line patch lift to 7.3.3 + opportunistic lockfile catch-up.

## §4 — `demo/DESIGN.md` motion section

### §4.1 — Diff (the § Motion section, lines 62-73 → expanded)

The pre-Lane-E `§ Motion` section briefly named the three durations (`--duration-fast`, `--duration-normal`, `--duration-panel`) and described the reduced-motion carve-out. The post-Lane-E section:

1. Adds the full Family A token enumeration (10 tokens with values + roles).
2. Adds the Family B specialised-canon enumeration (11 tokens with values + designed-for context).
3. Documents the coexistence ("Family A is the everyday rhythm; Family B is the celebratory grammar reserved for staged-reveal sites the demo doesn't yet author").
4. Adds the **§ Bespoke literals (KEEP, not migrated)** table — 6 sites with explicit bespoke-rationale (per `feedback_preserve_animations.md`).
5. Re-states the reduced-motion carve-out + the canonical motion recipe (unchanged from D.W4 Lane B's authorship).

The diff is non-destructive — every claim from the D.W4 Lane B authorship survives; the section grows to acknowledge Family B + the bespoke-literal preservation.

Full diff at `demo/DESIGN.md` (the section delimiters are `## § Motion` … `## § Z-tier`); lines now span the wider catalog.

## §5 — Proposed Q.md §3 update (orchestrator integrates)

In `docs/tranches/E/coordination/Q.md` §3, replace the row:

```markdown
| **`--motion-duration-*` / `--motion-delay-*` token canon** (new in `0124a8b`) | demo currently doesn't consume these tokens | **NEW — adopt at E.W4** | E.W4 motion-canon adoption |
```

with:

```markdown
| **`--motion-duration-*` / `--motion-delay-*` token canon** (new in `0124a8b`) | Glass-ui's specialised celebratory canon (badge reveals, complete-shimmer, progress-lifecycle, ripple); demo doesn't author analogous motion | **REVIEWED — NOT ADOPTED at E.W4 Lane E** (Family B's semantics target staged-reveal SFCs the value.js demo doesn't author; Family A `--duration-*` canon already adopted at 74 sites). General-purpose `--duration-*` canon ADOPTED (3 hard-coded ms residuals tokenized; 6 bespoke literals preserved per `feedback_preserve_animations.md`). **Evidence**: `audit/E.W4-lane-e-motion-vite.md`. | DONE (E.W4 Lane E) |
```

(Rationale: the row's pre-state claim "demo currently doesn't consume these tokens" was incomplete — it conflates Family A and Family B. The corrected row distinguishes which family was adopted, which was reviewed-and-deferred-with-rationale, and points at the audit doc for the full survey.)

## §6 — Gates

Run on the working tree after all §2 + §3 changes applied.

| Gate | Expected | Actual | Verdict |
|---|---|---|---|
| `npm run lint` | exit 0 | exit 0; zero output | **PASS** |
| `npx vue-tsc --noEmit \| grep -c 'error TS'` | 126 (held) | 126 | **PASS** (held; no new errors introduced) |
| `npm run build` | clean | clean; `dist/value.js 141.47 kB`, `dist/value.cjs`, `dist/value.d.ts` emitted; vite v7.3.3 confirmed in build header | **PASS** |
| `npm run dev` (background boot) | boots cleanly; no CSS-resolution errors | `VITE v7.3.3 ready in 903 ms`; serves at `http://localhost:9000/`; killed after probe | **PASS** |
| `npm run gh-pages` | clean | demo built in 9.09s; all chunks emit (PalettesPane, ColorPicker, AdminPane, MixPane, GradientPane, etc.); only the standard "chunk > 500 kB" advisory for the main `index-*.js` bundle (pre-existing) | **PASS** |
| `npx vitest run` | 1584+ green | 1584 passed / 0 failed / 34 files | **PASS** |
| `npx playwright test --reporter=line` (all 5 projects) | 36/36 green | 36 passed (smoke + smoke-admin + smoke-mobile + smoke-reactivity + smoke-safari) in 56.3s | **PASS** |

All 7 gates green.

## §7 — Files modified

- `demo/@/styles/style.css` — **NOT TOUCHED** (no demo-local motion tokens existed to migrate; the file's `:root` block carries shadow + layout overrides only).
- `demo/@/components/custom/color-picker/visual/PointerDebugOverlay.vue` — tokenize `0.1s ease` (line 349 → multi-line transition with `--duration-instant` + `--ease-standard`).
- `demo/@/components/custom/palette-browser/PaletteDialog/components/PaletteDialogHeader.vue` — tokenize `3s` → `var(--duration-shimmer-fast)` (line 87).
- `demo/@/components/custom/goo-blob/GooBlob.vue` — refresh stale fallback `0.3s` → `0.45s` (line 80).
- `demo/@/components/custom/palette-browser/composables/useHeightTransition.ts` — comment correction (lines 1-2 → 8 lines acknowledging bespoke durations + JS-runtime constraint).
- `package-lock.json` — Vite 7.3.1 → 7.3.3 + lockfile catch-up (value.js 0.5.1 → 0.6.0, ../glass-ui sibling 1.9.3 → 2.0.0 reflections, vue-router devDeps relocation, 3 @babel transitive packages flagged dev:true).
- `demo/DESIGN.md` — § Motion section expanded (Family A enumerated; Family B enumerated + deferred-rationale; bespoke-literal table added).
- `docs/tranches/E/audit/E.W4-lane-e-motion-vite.md` — new (this file).

## §8 — E.W4 Lane E sub-gate verdict

**PASS.**

- Demo consumes glass-ui's Family A `--duration-*` canon at 74 sites (was already adopted prior to Lane E); 3 residual hard-coded ms literals tokenized in Lane E. Family B `--motion-duration-*` canon reviewed and deferred-with-rationale (no consumer surface in the value.js demo at present).
- Vite lifted 7.3.1 → 7.3.3 (within `^7.0.6` constraint); all gates green.
- `demo/DESIGN.md` § Motion section expanded to document both families + bespoke-literal preservation per `feedback_preserve_animations.md`.
- Proposed `coordination/Q.md §3` update filed at §5 above for orchestrator integration.

No hard-cap breaches:
- Family B was NOT force-fit (semantics-mismatch documented).
- Six bespoke literals preserved (no animation deleted per `feedback_preserve_animations.md`).
- Vite bump did not introduce any regression (all 7 gates green post-bump).

**End E.W4 Lane E.**
