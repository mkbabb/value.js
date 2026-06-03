# K.W1 — grand-audit refinement spec (value.js)

**2026-06-03.** A CORE design spec that **augments** K's existing waves with the grounded findings of the constellation grand-audit (W1 live capture · W2 4-lens · W3 modern-web/glass-gap/8-rules · W4 chronic), consolidated in `audit/visual-evidence-2026-06-02/grand-audit/MASTER-FINDINGS.md §A·value.js`. It does **not** open new waves; it sharpens K.W3/W4/W5 and names two new bounded lanes (motion, typo/a11y) that ride the existing IMPL schedule. Every row is file:line-grounded and idiomatic (no workaround, no legacy). The three user critiques are **C1 dock · C2 aurora · C3 blob** — all confirmed live + at prod (`color.babb.dev` ships them, `grand-audit/valuejs-picker-PROD.png`).

> Authority: the 2026-06-02/03 mandate (Playwright-grounded audit + frontend-design + modern-web; "perfect the tranches NOW; refine goo-blob + aurora; test CRUD; idiomatic gestalt; NO legacy; tranche-writing only"). Supersedes nothing; K.md §3/§6 wave-gates absorb these rows.

---

## §1 — C2 aurora-derive → **K.W4** (sharpened; the #1 mandate, the longest chronic)

**Root cause (mechanism, live DOM).** `body` bg IS the active color (`lab(92 88.8 20)`), but a full-viewport WebGL canvas (`canvas.absolute.inset-0.w-full.h-full`) **overpaints** it with a static `DEFAULT_AURORA_CONFIG` — glass-ui's **"Sky" preset** (confirmed: glass-ui's `/aurora` story ships named `OklchStop[]` presets Sky/Dawn/Meadow/…; value.js feeds the static Sky). The aurora is **palette-blind by construction** — nothing mutates `auroraConfig.palette` from the picked color.

| # | Item | Evidence | Spec |
|---|---|---|---|
| W4-1 | Wire picker→atmosphere | `App.vue:209-215` static `reactive(structuredClone(DEFAULT_AURORA_CONFIG))`; `useAppColorModel.ts:75-79` cssColorOpaque watcher only writes localStorage | `watch(cssColorOpaque, css => auroraConfig.palette = deriveAuroraFromColor(cssToOklch(css)))` → 4–6-stop OKLCh ramp; glass-ui's `useAurora` deep-watch (glass-ui `aurora/composables/useAurora.ts:201`, cross-repo) uploads — **no new plumbing**. This is **VAL-1's 2nd live consumer** (gate met). |
| W4-2 | `@property --active-color` single-source (land FIRST) | active color parsed to RGB 3× independently: goo-blob `useMetaballRenderer.ts:58`, glass-ui aurora `cssToOklch`, body-bg | register `@property --active-color {syntax:'<color>'}`, write once from `useAppColorModel`; aurora/blob/dock read one typed, animatable channel. Lands before W4-1. |
| W4-3 | Dynamic-bg contrast guard (the constellation's widest a11y hole) | `--background`=runtime color but body/muted text = static glass-ui `--muted-foreground`, no guard vs the live tint | route `safeAccentColor`/`useContrastSafeColor` to also emit contrast-safe `--foreground`/`--muted-foreground` (OKLab L-pick) against the live surface; `--muted-foreground-strong` floor. |
| W4-4 | `AuroraPane` dead-end stub → live | `AuroraPane.vue:16-33` permanent "temporarily unavailable" since A.W0 | rebuild the slider table over the live 30-field `AuroraConfig` via glass-ui Configurator; the **palette-derive toggle is the first control** (the pane demonstrates AND governs W4-1). |

**glass-ui lever (owner ask):** `deriveAuroraFromColor(css|OklchStop, stopCount)` producer + Aurora `:deriveFrom`/`accentColor` prop — **net-new**, but the low-level math (`cssToOklch`/`hexToOklchStop`/`flattenPalette`/`paletteToCssGradient` + `AuroraConfig.palette:OklchStop[]`) **all ships** (`aurora/composables/color.ts:78-166`, `presets.ts:70`). See glass-ui AS spec.

---

## §2 — C3 goo-blob refinement → **K.W3** (sharpened; the user's blob critique)

**Root cause.** The canvas renders `width/height:160%` (**179px**) inside a `w-[7rem]` (**112px**) cell with `overflow:visible` + `translate(-50%,-50%)`, bleeding ~33px over the Lab title and rendering off-corner at `(367,126)`; a 2nd satellite canvas collapses to **0×0**. The footprint (layout box) and the render-resolution **disagree**, split across two files (`160%` in the SFC, `POS_SCALE 1/1.6` in the renderer). The user's three complaints map exactly: **over-large** (160% > footprint), **mis-placed** (off-corner translate), **satellites too small** (0×0 collapse + over-scaled parent).

| # | Item | Evidence | Spec |
|---|---|---|---|
| W3-1 | Footprint == render-resolution contract | `GooBlob.vue:96-106` (160% canvas + translate); `useMetaballRenderer.ts:11-19` (`POS_SCALE 1/1.6` redundant w/ 160%) | the glass-ui Metaballs primitive OWNS the contract: layout box stays the declared size (112px); the orbit-overflow halo is an **internal uniform-space token**, NOT a 160% CSS blow-up + a counter-scale split across two files. **One source of size.** |
| W3-2 | Corner-anchor | `ColorPicker.vue:22` grid placement; renders off-corner | a `corner-anchor` token nestles the blob into the card's top-left **inside its footprint** (the user's "sit properly in the top-left corner"), not floating center-top over the title. |
| W3-3 | Satellite never collapses | 2nd `goo-blob-canvas` 0×0 | gate `start()` on non-zero `clientWidth` via ResizeObserver (the D4 demand-driven RAF gate, K.md) so satellites size correctly — fixes "satellites too small." |
| W3-4 | Squish/reactivity = spring, not tween | `useBlobMood.ts:72-99` per-mood fixed-`TRANSITION_MS` `easeInOut(t)` lerp of 11 MoodParams — no overshoot/settle; rapid re-trigger snaps | replace the hand-rolled tween with glass-ui `useSpring` (per-param vector) toward `MOOD_TARGETS`, stiffness/damping per mood — the **"squishy/reactive enough"** the user asked for. Folds into the Metaballs lift. |
| W3-5 | Hover shadow off the GL path | `GooBlob.vue:81,84-93` `transition: filter` animates non-compositor `drop-shadow` over a live WebGL RAF loop | render the shadow as a separate transform-layer (opacity/transform) or drop it; let the GL body carry the response. |

**glass-ui lever:** Metaballs + BlobDot primitive — **net-new** (no blob story in the 127-story manifest), color resolver **injected** (no value.js default — inv-K-3). Ships after v1.0.0 (K.W6). See glass-ui AS spec.

---

## §3 — C1 dock motion → **NEW bounded lane "K motion"** (rides K.W5)

**Root cause (refined by W3).** The dock **host wrapper** sets no `transition-property` → computed **`transition: all`**, transitioning layout/filter/color on accent change. glass-ui's `.glass-dock` is **already per-property correct** (`dock.css:185-220`) — so the jank is value.js's outer shell, not the component. (Original W1 read corrected: the inner dock is fine.)

| # | Item | Evidence | Spec |
|---|---|---|---|
| M-1 | Strip host `transition:all` | `Dock.vue:91` host div (a static positioning shell) | remove the leaked `transition:all`; all dock motion belongs to the inner `.glass-dock` + `.dock-layers` FLIP. glass-ui adds a `--dock-motion-*` guarantee token so no consumer re-introduces `all`. |
| M-2 | Spectrum dot glides on external change | `SpectrumCanvas.vue:226-278` raw `left/top` %, no transition | short `left/top` (or translate) transition on `.spectrum-dot`, **gated off during `isDragging`** (8-rule: spatial-continuity) — drag stays 1:1, slider/text/space-switch glides. |
| M-3 | Slider gate-active shares one clock | `ComponentSliders.vue:84,313,328-331` outline fades, thumb-fill snaps | `background/border-color` transition on `.slider-thumb` matching the outline duration (8-rule: timing). |
| M-4 | Dock-layer / action-bar enter | `Dock.vue:111-193,215-227` 0fr→1fr animates on toggle only, not first appearance | `@starting-style` gives the inserted layer a defined start so the existing transition runs on insert; stagger inner DockIconButtons (8-rule: anticipation). |

---

## §4 — Typography + a11y → **NEW bounded lane "K typo/a11y"** (rides K.W5)

| # | Item | Sev | Evidence | Spec | glass-ui lever |
|---|---|---|---|---|---|
| T-1 | One ornamental serif everywhere | P1 | `style.css:28-29` (`--font-display`==`--font-serif`==Fraunces); glass-ui `typography.css:142-147` body cascade; `ColorPicker.vue:4,25` forced `font-display` | `--font-serif`=Computer-Modern body (`--font-stack-serif`), keep `--font-display`=Fraunces for the **display register only**; drop the blanket `font-display` class; `.text-display`/`.text-title` on the Lab label + headings only | `--font-stack-serif` vs `--font-stack-display` |
| T-2 | Fraunces SOFT/WONK axes inert | P1 | `index.html:14,17` CDN loads `ital,opsz,wght` only; glass-ui applies `"WONK" 1,"SOFT" 0` but the subset lacks the axes; glass-ui ships no Fraunces face | consume glass-ui's **self-hosted Fraunces `@font-face`** (opsz+SOFT+WONK) via `@mkbabb/glass-ui/styles/fonts`; removes the CDN from LCP | self-hosted Fraunces face (net-new, glass-ui) |
| T-3 | Readout off φ-ladder + neutral ink | P2 | `ColorComponentDisplay.vue:3,27` raw `text-4xl`; sibling label `text-title sm:text-display` | onto `.text-title`/`.text-display`; tint with injected `safeAccent` — the value reads as the dominant color | `.text-title/.text-display`, `safeAccentColor` |
| A-1 | Zero form-validation a11y | P1 | grep `user-valid\|aria-invalid` demo/ → **0**; `useAppColorModel.ts:61` bare `catch{}` | `:user-valid`/`:user-invalid` after-interaction styling + `aria-invalid`/`aria-describedby` on parse-fail (native pseudo + ARIA, **no JS toasts** — retired) | Input `invalid` variant (`--input-invalid-*`, net-new glass-ui) |

---

## §5 — Modern-web → **K.W5** (sharpened; refutes the stale W0 reads)

| # | Item | Evidence | Spec | Baseline |
|---|---|---|---|---|
| MW-1 | `@property --active-color` single-source | (= W4-2) | typed animatable color channel; lands before aurora-derive | newly |
| MW-2 | Picker pane `@container` not viewport | `ColorPicker.vue:2-4`, `ColorNutritionLabel.vue:16,38,65` (`sm:`/`lg:` wrong — width set by `usePaneRouter` single/dual-pane, not viewport → dual-pane desktop picker overflows the 3-col header) | `container-type:inline-size` + `@container`, no new wrapper | widely |
| MW-3 | `content-visibility` palette cards | `PaletteCardGrid.vue:34` (`contain:content` set, full strips still render) | `content-visibility:auto` + `contain-intrinsic-size` per card — standards replacement for the absent virtual scroller | widely |
| MW-4 | `scheduler.yield()` slider-gradient rebuild | `useSliderGradients.ts:45-58` (11-stop ×N recomputed inline per keystroke). **NOT quantize** — that already runs in a Worker (`useImageQuantize.ts:11`) | `await scheduler.yield()` between channel builds (active channel first), `Promise.resolve()` fallback — fixes INP without a lagging debounce | feature-detect |
| MW-5 | `light-dark()` for `--popover`/`--active-tab-color` | `style.css:185,197` `.dark` literals; glass-ui tokens already `light-dark()` (`tokens.css:1264-1267`) | fold onto one `light-dark()` decl, drop the `.dark` override | widely |

*(K.md §4 already maps View Transitions / `@layer` / vue-router-5 / `Intl.DurationFormat` — unchanged.)*

---

## §6 — CRUD functional test → **K.W2 api-lane** (user mandate: "the CRUD system needs to be tested")

J shipped the palette atom-diff + publish (`api/src/lib/crud/atomdiff.ts`, `remixPalette`, `/diff`, `/publish`, `/unpublish` + the `[P0]` `visibility:"public"` filter; api 140/25 green). K's api-lane (which already absorbs the I-tail conformance residuals) adds the **functional CRUD test the mandate asks for** — not new feature work, **verification** of shipped behavior:

| # | Test | Grounds |
|---|---|---|
| CR-1 | e2e round-trip: create → fork → remix(atom-diff) → `/diff` shape → publish → unpublish | `routes/palettes/{crud,forks,diff,publish}.ts`; the demo palette CRUD consumers |
| CR-2 | `visibility:"public"` leak gate (the J `[P0]` fix) — a non-owner list never sees private | `crud-list.ts` `viewingOwn` branch |
| CR-3 | Idempotency-Key replay + If-Match (the I-tail plumbing) | `api/src/middleware/idempotency.ts` (the booked store) |
| CR-4 | per-repo conformance suite `api/test/conformance/` (folds the I-tail) | the cross-repo atom-diff shape-parity (twin of fourier-J) |

**E5 trigger** (per K.md §7 path-(b)): blocker = the K.W2 substrate-restoration green; smallest-unblock = the `idempotency.ts` store + the conformance dir; re-check = K.W2 close.

---

## §7 — What this spec does NOT change

- **value.js has no configurator-aside** (the picker is a 2-col picker|info layout, not a stage|aside). The constellation DEC-1 (configurator = RIGHT, reversible) **does not touch value.js**; the dual-pane asymmetry (MASTER-FINDINGS `style.css:170-172`, `1fr 1fr` → `minmax(0,0.85fr) minmax(0,1.15fr)`, cap prose ~62ch) is an app-local grid tweak under K.W5, NOT a Configurator adoption.
- **Card chrome is OK** — `glass-resting`/`rounded-card`/`shadow-[var(--shadow-card)]` present (`grand-audit/valuejs-picker-9001.png`); the earlier "chrome absent" was a transient build state — **dropped from the defect set**.
- The `proof:*` idiom stays retired ([[feedback-proof-idiom-retired]]); every row above is enforced structurally (tsc/eslint/excision + close-time review + the K.W6 π visual-runtime lane), not by a committed script.

---

## §8 — Wave-gate deltas (fold into K.md §6)

- **K.W3** gates += W3-1..W3-5 (blob footprint contract · corner-anchor · satellite-non-collapse · spring-mood · shadow-off-GL).
- **K.W4** gates += W4-1..W4-4 (picker→palette wiring runtime-observed · `@property --active-color` · contrast-guard `--foreground`/`--muted-foreground` · AuroraPane live).
- **K.W5** gates += the K-motion lane (M-1..M-4) · K-typo/a11y lane (T-1..T-3, A-1) · MW-2..MW-5.
- **K.W2 api-lane** gates += CR-1..CR-4 (CRUD functional verification).
- All glass-ui-owned levers (deriveAurora · Metaballs/BlobDot · self-hosted Fraunces · Input-invalid · `--dock-motion`) are **ADOPTION ASKS** to the glass-ui AS peer-tranche under `coordination/glass-ui.md` (paired-authorship) — see the glass-ui AS constellation-primitives spec.
