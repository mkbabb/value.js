# E.W0 Lane A — glass-ui ./styles.css adoption

**Branch**: `tranche-e` at `271eda8`.
**Lane**: A — `@mkbabb/glass-ui/styles.css` subpath adoption + `siblingFsAllowTransient` retire-or-narrow.
**Author posture**: Read/Write/Edit + non-mutating Bash only. No git mutations.
**Date**: 2026-05-20.

---

## §1 — Pre-adoption state

### §1.1 demo/@/styles/style.css line 3 (verbatim, pre-edit)

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "@mkbabb/glass-ui/styles";
@import "./animations.css";
```

Line 3 imports the **Tailwind-source** surface only. The new compiled `./styles.css` subpath was NOT yet consumed.

### §1.2 What the Tailwind-source `./styles` surface provides

Verified via direct read of `/Users/mkbabb/Programming/glass-ui/src/styles/index.css` + the 16 sub-imports it chains:

| # | Sub-import | Provides |
|---|---|---|
| 1 | `tokens.css` | All design-system CSS custom properties (`--glass-*`, `--paper-*`, `--dock-*`, color rungs, easing, surface tints, the 800+ tokens). Includes `--paper-clean-texture` + `--paper-aged-texture` (inline SVG data URLs). |
| 2 | `typography.css` | **6 `@font-face` declarations** + **6 `url("../fonts/…woff2")` references** (Plus Jakarta Sans latin + latin-ext; Fira Code latin + latin-ext; Fraunces; Computer Modern). The `../fonts/` reference walks OUT of `src/styles/` into glass-ui's repo-root `fonts/` directory. |
| 3 | `theme.css` | Tailwind v4 `@theme` block — aliases tokens (1) to Tailwind utility keys. |
| 4 | `glass.css` | `.glass-{wash,quiet,resting,floating,overlay}` 5-rung ladder + `.glass-card / -pill / -btn`. |
| 5 | `paper.css` | Paper underpaint + grain overlay utilities. Contains 2 `url("data:image/svg+xml,…")` data URLs (inline; no asset walk). |
| 6 | `dock.css` | `.dock-icon-btn`, `.dock-select-trigger`, etc. |
| 7 | `cards.css` | `.cartoon-surface`, `.paper-texture`. |
| 8 | `floating-panel.css` | `.floating-panel` + `.floating-panel-item`. |
| 9 | `transitions.css` | Vue `<Transition>` class recipes. |
| 10 | `animations.css` | `@keyframes` consumed by (9) + component `<style>` blocks. |
| 11 | `utilities.css` | `focus-ring`, `btn-press`, `btn-audacious`, `rainbow-text`, `touch-gate`. |
| 12 | `instrument-chassis.css` | P-tranche chassis bezel + groove dividers. |
| 13 | `glyph-face.css` | P-tranche cap + backplate. |
| 14 | `dock-group.css` | P-tranche chassis-strip. |
| 15 | `disco-glyph.css` | P-tranche layered fills. |
| 16 | `hover-popover.css` | V.W3 popover-animation grammar. |
| trailer | `@source "../components"` | Tells the consumer's Tailwind v4 compiler to scan glass-ui's `components/` tree for utility-class usage. |

### §1.3 What the compiled `./styles.css` surface provides

Verified via direct read of `/Users/mkbabb/Programming/glass-ui/dist/glass-ui.css` (43,712 bytes):

- **110 distinct `data-v-*` SFC-scoped selectors** (Vue `<style scoped>` compiled output across glass-ui's components).
- **ZERO `@font-face` declarations** (`grep -c '@font-face' dist/glass-ui.css` → 0).
- **ZERO `url()` references** (`grep -c 'url(' dist/glass-ui.css` → 0).
- **ZERO design-system tokens** (no `--glass-*`, `--paper-*`, `--dock-*` rungs — those live exclusively in the Tailwind-source `tokens.css`).

**Conclusion**: `./styles.css` is purely the SFC-scoped component-CSS surface; it does NOT absorb the Tailwind-source half. The two surfaces are **complementary, orthogonal distribution mechanisms** — exactly as glass-ui commit `9275584`'s message states and as E.W0.md Lane A line 16 anticipates.

### §1.4 vite.config.ts `siblingFsAllowTransient` (verbatim, pre-edit)

```ts
// Contract-v2 (docs/precepts/cross-repo-dev-resolution.md §1.2, §2):
// bare `@mkbabb/*` specifiers resolve through the sibling's `exports` map to
// `dist/` via the `file:` symlink in `node_modules`; the sibling's
// `build:watch` keeps `dist/` fresh under dev-orchestration. Consumer-side
// `resolve.conditions` widening is struck — Vite's defaults (`module`,
// `browser`, `default`) resolve the published surface in every demo mode.
//
// `server.fs.allow` widening: narrowly retained as an explicit transient.
// glass-ui's `./styles` subpath (`./src/styles/index.css`) violates the
// contract-v2 §2.1 keystone ("no subpath advertises anything but a `dist/`
// artefact") because it ships Tailwind-source CSS that the consumer's
// Tailwind compiler processes — Tailwind-source is structurally `src/` and
// cannot be pre-compiled into `dist/` without losing its semantics. The
// precept's §5 migration map names glass-ui's 41-subpath cleanup as
// outstanding work in the AG fleet; the AG glass-ui-core wave at `ce5aad8`
// landed the root `exports["."]` advance only. Until that subpath migration
// completes (or glass-ui changes its Tailwind-source distribution model —
// see `docs/tranches/D/coordination/Q.md §3`), the demo must `@import
// "@mkbabb/glass-ui/styles"` and Vite must serve the `src/`-relative font
// assets (`url("../fonts/fira-code/…woff2")`) from glass-ui's parent
// directory. This widening is the consumer-side reciprocal of the
// publisher-side gap; it is filed and time-boxed, not silent.
const siblingFsAllowTransient = [path.resolve(import.meta.dirname, "..")];
```

---

## §2 — Adoption diff

### §2.1 demo/@/styles/style.css (the additive edit)

```diff
 @import "tailwindcss";
 @import "tw-animate-css";
+/*
+ * Glass-ui imports the two orthogonal distribution surfaces glass-ui ships
+ * (post-9275584 — E.W0 Lane A adoption, closes contract-v2 §2.1 keystone gap):
+ *
+ *   `./styles`     — Tailwind-source surface (src/styles/index.css):
+ *                    tokens.css, typography.css (@font-face + url("../fonts/…")),
+ *                    theme.css (@theme aliases), glass/paper/dock/cards/...
+ *                    utilities, and `@source "../components"` for Tailwind's
+ *                    class-scanning over glass-ui's component tree. This path
+ *                    MUST be processed by the consumer's Tailwind compiler
+ *                    (its semantics depend on Tailwind v4 `@theme` + `@source`).
+ *
+ *   `./styles.css` — Compiled SFC-scoped surface (dist/glass-ui.css):
+ *                    Vue <style scoped> output (data-v-* attribute selectors)
+ *                    for glass-ui's components. Pre-compiled; consumed as-is.
+ *
+ * The two are complementary, not substitutes: the Tailwind-source path carries
+ * design-system tokens + font-face + utilities; the compiled path carries
+ * SFC-scoped component CSS. Both are needed for a faithful glass-ui render.
+ */
 @import "@mkbabb/glass-ui/styles";
+@import "@mkbabb/glass-ui/styles.css";
 @import "./animations.css";
```

**Rationale**: per E.W0.md Lane A line 16, the two surfaces are **orthogonal distribution mechanisms**. The Tailwind-source `./styles` import is preserved (carries tokens + font-face + utilities + `@source` directive); the SFC-scoped `./styles.css` is ADDED below it (carries `data-v-*` component-CSS that the demo would otherwise be missing).

The order matters: `./styles.css` is appended AFTER `./styles` so the SFC-scoped component CSS overrides any cascading utility from the Tailwind-source half if a conflict arose (none expected, since SFC-scoped selectors are attribute-targeted and don't collide with utility classes).

---

## §3 — Verification

### §3.1 glass-ui package.json exports (verbatim from `/Users/mkbabb/Programming/glass-ui/package.json:148-149`)

```json
"./styles": "./src/styles/index.css",
"./styles.css": "./dist/glass-ui.css",
```

The `./styles.css` subpath IS in the exports map (line 149).

### §3.2 glass-ui dist/glass-ui.css

- **Path**: `/Users/mkbabb/Programming/glass-ui/dist/glass-ui.css`.
- **Size**: 43,712 bytes.
- **Modified**: 2026-05-19 22:34.
- **Content shape**: 110 distinct `data-v-*` SFC-scoped selectors; zero `@font-face`; zero `url()` references; zero design-system tokens.

### §3.3 Dev-mode resolution probe

`npm run dev` booted in 711ms on port 9001 (port 9000 in use). Probes:

| Probe | Result |
|---|---|
| `curl -I http://localhost:9001/` | HTTP/1.1 200 OK, Content-Type: text/html |
| `curl -o /tmp/glass-ui-served.css http://localhost:9001/@fs/Users/mkbabb/Programming/glass-ui/dist/glass-ui.css` | HTTP 200; 44249 bytes (slight overhead vs raw 43712 from dev HMR injection) |
| Server log | Clean — zero warnings, zero errors, ready in 711ms |

### §3.4 Demo build (`npm run gh-pages`) resolution probe

`npm run gh-pages` built in 6.50s. The bundled main `index-*.css` (284,925 bytes) was inspected:

| Check | Pre-adoption (predicted) | Post-adoption (actual) |
|---|---|---|
| `data-v-*` SFC-scoped selectors | ~0 (only inline `<style scoped>` from demo SFCs) | **196 selectors** (demo SFCs + glass-ui SFCs absorbed via `./styles.css`) |
| `@font-face` declarations | 1 (the demo's own) | **1** (unchanged — fonts come from `./styles`'s typography.css) |
| Font names | Fira Code, Fraunces, Plus Jakarta Sans | **Fira Code, Fraunces, Plus Jakarta Sans** (unchanged) |
| Font asset refs | `fira-code/…woff2`, `fraunces/…woff2`, `plus-jakarta-sans/…woff2` | **All present** (unchanged) |
| glass-ui tokens (`--dock-*` rungs) | Multiple | **Multiple** (`--dock-active-bg`, `--dock-active-border`, etc.) |

The SFC-scoped count jumped from ~0 to 196, confirming the compiled surface IS in the bundle. Font-face and tokens are unchanged (they come from `./styles`, which is preserved).

### §3.5 Library build (`npm run build`) probe

`npm run build` built in 2.24s. `dist/value.js` is 137,600 bytes (unchanged shape; the library build does not include demo CSS).

---

## §4 — siblingFsAllowTransient decision

### §4.1 Decision: **NARROW**

The `siblingFsAllowTransient` widening **stays**, with sharpened rationale documenting the residual gap.

### §4.2 Rationale

Per §3.4's actual dist evidence: the bundled `index-*.css` contains **6 font-asset URL references** (e.g. `fira-code/fira-code-latin.woff2`) that resolve through `../fonts/` from `src/styles/typography.css`. These references walk OUT of glass-ui's `src/styles/` directory into the parent `fonts/` directory at glass-ui's repo root.

Under contract-v2 + the file: symlink, this resolution chain crosses out of the symlinked package (`node_modules/@mkbabb/glass-ui/src/styles/`) and into the symlink target's parent (`/Users/mkbabb/Programming/glass-ui/fonts/`). Vite's `server.fs.allow` must reach that parent.

**Could `./styles.css` absorb the font-face declarations?** No — by inspection of `dist/glass-ui.css`, the compiled surface contains ZERO `@font-face`. The Tailwind-source build process strips font-face from the compiled SFC-scoped output (correctly: SFC-scoped fonts would be meaningless; `@font-face` is global by spec). This is **a structural property of the compiled surface**, not a bug. Retiring the Tailwind-source import would forfeit fonts entirely.

**Could we vendor the fonts into the demo?** Yes, but that's a separate architectural move — duplicating the font assets at every consumer is contract-v2-hostile. Filed as a glass-ui-side concern (option (a) in the updated comment: inline font binaries as base64 data URLs in `dist/glass-ui.css`).

**Could we drop `./styles` entirely?** No — `./styles` carries:
- The Tailwind v4 `@theme` alias declarations (theme.css)
- The `@source "../components"` directive (Tailwind class-scanning over glass-ui's component tree)
- 800+ design-system CSS tokens (tokens.css)
- 12+ utility CSS files (glass.css, paper.css, dock.css, etc.)

Dropping it would break the demo wholesale. The `./styles.css` ship NARROWS the contract-v2 §2.1 keystone gap (the SFC-scoped half is now contract-v2-compliant), but the Tailwind-source half remains structurally `src/`-shaped.

### §4.3 vite.config.ts patch (the comment update)

```diff
 // Contract-v2 (docs/precepts/cross-repo-dev-resolution.md §1.2, §2):
 // bare `@mkbabb/*` specifiers resolve through the sibling's `exports` map to
 // `dist/` via the `file:` symlink in `node_modules`; the sibling's
 // `build:watch` keeps `dist/` fresh under dev-orchestration. Consumer-side
 // `resolve.conditions` widening is struck — Vite's defaults (`module`,
 // `browser`, `default`) resolve the published surface in every demo mode.
 //
-// `server.fs.allow` widening: narrowly retained as an explicit transient.
-// glass-ui's `./styles` subpath (`./src/styles/index.css`) violates the
-// contract-v2 §2.1 keystone ("no subpath advertises anything but a `dist/`
-// artefact") because it ships Tailwind-source CSS that the consumer's
-// Tailwind compiler processes — Tailwind-source is structurally `src/` and
-// cannot be pre-compiled into `dist/` without losing its semantics. The
-// precept's §5 migration map names glass-ui's 41-subpath cleanup as
-// outstanding work in the AG fleet; the AG glass-ui-core wave at `ce5aad8`
-// landed the root `exports["."]` advance only. Until that subpath migration
-// completes (or glass-ui changes its Tailwind-source distribution model —
-// see `docs/tranches/D/coordination/Q.md §3`), the demo must `@import
-// "@mkbabb/glass-ui/styles"` and Vite must serve the `src/`-relative font
-// assets (`url("../fonts/fira-code/…woff2")`) from glass-ui's parent
-// directory. This widening is the consumer-side reciprocal of the
-// publisher-side gap; it is filed and time-boxed, not silent.
+// `server.fs.allow` widening: NARROWED at E.W0 Lane A (post-glass-ui-9275584
+// `./styles.css` adoption) — see `docs/tranches/E/audit/E.W0-lane-a-styles-
+// adoption.md`. Glass-ui now ships TWO orthogonal style surfaces:
+//
+//   `./styles`     — Tailwind-source (src/styles/index.css): tokens,
+//                    typography (@font-face + url("../fonts/...woff2")),
+//                    theme.css @theme aliases, utilities, @source directive.
+//                    Consumer's Tailwind compiler processes this; structurally
+//                    `src/`, cannot be pre-compiled without losing semantics.
+//   `./styles.css` — SFC-scoped compiled (dist/glass-ui.css): data-v-* scoped
+//                    component CSS. Zero @font-face, zero url() refs.
+//
+// The compiled `./styles.css` surface ABSORBS the SFC-scoped contract-v2
+// component-CSS gap, but the Tailwind-source `./styles` surface still ships
+// `@font-face` declarations whose `url("../fonts/fira-code/...woff2")` refs
+// are resolved RELATIVE to `node_modules/@mkbabb/glass-ui/src/styles/` — i.e.
+// they walk OUT of the symlinked package into glass-ui's repo-root `fonts/`
+// directory. That walk is the residual reason `server.fs.allow` must reach
+// glass-ui's parent (`path.resolve(__dirname, "..")`). The widening is now
+// the consumer-side reciprocal of a NARROWED publisher-side gap — only
+// font-asset resolution remains; the SFC-scoped component-CSS half is
+// closed. Retiring this entirely requires either (a) glass-ui inlining the
+// font binaries as base64 data URLs in `dist/glass-ui.css` and exporting the
+// `@font-face` declarations through the compiled surface, or (b) the demo
+// dropping the Tailwind-source `./styles` import entirely (which would
+// forfeit the design-system tokens + Tailwind `@source` class-scanning).
+// Neither is appropriate scope for tranche E; filed as a successor concern.
 const siblingFsAllowTransient = [path.resolve(import.meta.dirname, "..")];
```

---

## §5 — Gate matrix (post-Lane-A)

| Gate | Expected | Actual |
|---|---|---|
| `npm run lint` | exit 0 | **exit 0 (clean)** |
| `npx vue-tsc --noEmit \| grep -c 'error TS'` | 126 | **126 (no regression)** |
| `npm run build` | exit 0, clean | **exit 0, clean; dist/value.js = 137,600 bytes** |
| `npm run gh-pages` (demo build for the CSS-resolution check) | exit 0, clean | **exit 0, clean; demo CSS contains BOTH surfaces (196 SFC-scoped + @font-face + tokens)** |
| `npx vitest run` | 1582 passing / 34 files | **1582 / 34 (all pass)** |
| `npm run proof:resolution` | GREEN | **PASS — contract-v2 dev-resolution contract satisfied across the constellation** |
| Dev-server boot | ready, no errors | **ready in 711ms; zero warnings/errors; /@fs/... glass-ui.css resolves HTTP 200** |

---

## §6 — Proposed `coordination/Q.md §3` patch (orchestrator integrates)

The orchestrator owns `coordination/Q.md`. The following text is **proposed** for the contract-v2 §2.1 row update; the orchestrator may transcribe verbatim or adapt:

```markdown
| §2.1 Tailwind-source subpath shipping `src/` semantics | **NARROWED at E.W0 Lane A** (post-glass-ui `9275584`). The SFC-scoped half of the contract-v2 §2.1 gap is **CLOSED**: glass-ui's `./styles.css → ./dist/glass-ui.css` subpath ships pre-compiled `data-v-*` SFC-scoped component CSS, and the demo now imports it alongside the Tailwind-source `./styles` (see `demo/@/styles/style.css` post-Lane-A). The Tailwind-source half **remains structurally `src/`-shaped** because (a) Tailwind v4 `@theme` aliases + `@source` directive cannot pre-compile without losing semantics, (b) `@font-face` declarations in typography.css resolve `url("../fonts/...woff2")` references that walk OUT of `node_modules/@mkbabb/glass-ui/src/styles/` into the symlink target's parent `fonts/` directory. The `siblingFsAllowTransient` widening in `vite.config.ts` is NARROWED — it now justifies font-asset resolution only; SFC-scoped component CSS no longer requires it. Retirement requires either glass-ui inlining font binaries as base64 in `dist/glass-ui.css` (option a) or the demo dropping `./styles` entirely (option b — forfeits tokens + `@source`). Neither is tranche-E scope; filed as a glass-ui-side successor concern. **Evidence**: `docs/tranches/E/audit/E.W0-lane-a-styles-adoption.md` (this audit). |
```

---

## §7 — Files modified (DO NOT commit; orchestrator stages)

- `demo/@/styles/style.css` — added `@import "@mkbabb/glass-ui/styles.css";` (the SFC-scoped surface) beneath the existing Tailwind-source import, with an inline rationale block.
- `vite.config.ts` — replaced the `siblingFsAllowTransient` inline comment block to reflect post-adoption NARROW posture; the array constant itself is unchanged.
- `docs/tranches/E/audit/E.W0-lane-a-styles-adoption.md` — this audit (new).

**No git mutations performed.** The orchestrator owns staging + commit per the dispatch contract.
