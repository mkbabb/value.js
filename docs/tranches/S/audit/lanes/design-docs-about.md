# S audit lane — ABOUT/DOCS pages (design assay: register, S-1/S-5/S-14, φ-ladder, KaTeX, code blocks)

**Mode**: AUDIT ONLY · repo @ `c5aa091` (branch `tranche-q`) · live dev server http://localhost:9000 · 2026-07-04
**Register assayed against**: the editorial instrument — Fraunces display voice, Fira readout, cartoon-offset shadow, crayon primaries, ink+grain, perceptually-true fields (demo/DESIGN.md).
**Evidence**: screenshots under `docs/tranches/S/audit/lanes/evidence/design-docs-about/` (referenced inline). Light + dark, 1440×900 + 390×844.

**Methodology caveat**: this MCP browser session was shared with at least one other lane during the assay (the route flipped `#/` → `#/blob` and the hue drifted 145→150→155 between my calls). The 11-page live sweep via `location.hash` mutation measured a stale doc — the app applies `?space=` only at load (no hashchange re-parse) — so the per-page census below was done statically against the `.md` imports + conversion signatures and spot-verified live on the oklch page. All computed-style numbers were measured on live DOM.

---

## P0

### P0-1 · 9 of 10 code-bearing docs pages ship TRUNCATED, syntactically-invalid code snippets

**Evidence**: `about-katex-code-light.png`, `about-codeblock-light-2.png` — panels containing exactly `function oklch2oklab({ l, c, h, alpha }` and then nothing. Measured live on the oklch page: pre char counts **39 / 39 / 37 / 1010** — three of four snippets are ONE line, cut mid-parameter-list; only `xyz2oklab` (1010 chars, 35 lines) is complete.

**Root** (`plugins/vite-source-export.ts:89`): `raw.indexOf("{", start)` finds the FIRST brace after `export function|const` — for any export whose first parameter is **destructured** (`({ l, c, h, alpha }: OKLCHColor)`), that brace is the *param destructuring*, the depth-scan closes it at `}` (lines 97–117), and the "source" ends before the body ever starts. Compounding it, `prettier.format` on the invalid fragment throws and the `catch` at **:131–133 silently swallows** the failure and ships the fragment — the precept-violating silent handler that hid this defect.

**Static census** (signatures grepped from `src/units/color/conversions/`): destructured-param victims = `rgb2hsl, hsl2rgb, hsv2hsl, hsl2hsv, hwb2hsl, hsl2hwb, kelvin2rgb, rgb2kelvin, oklab2xyz, oklab2oklch, oklch2oklab, rgb2xyz, xyz2rgb, lch2lab, lab2lch` — **15 of 18** doc-imported conversion functions. Per page: hsl, hsv, hwb, kelvin, oklab, oklch, rgb, xyz, lch **all truncated**; lab.md clean (`xyz2lab`/`lab2xyz` take a named param); hex.md imports no `?source`.

**ROOT-ROUTING**: value.js (build plugin `plugins/vite-source-export.ts`). Fix the extractor to locate the *body* brace (scan past the balanced `(...)` param list first, or parse properly — the file already round-trips through prettier, so a real TS parse is available); make the prettier failure **throw** (fail the build loudly, never ship a fragment).
**Wave-item**: plugin fix + a vitest golden asserting every `?source` export parses as a complete declaration (e.g. contains its `return`/closing brace) across all 11 docs pages.

---

## P1

### P1-1 · S-1 (About half) — the About dropdown paints the wrong face; the trigger's face is AMBIENT, not owned

**Measured**: fresh load, before first open — picker trigger computed `font-family: Fraunces, serif`; **About trigger: "Plus Jakarta Sans"** (both at the same audacious 41.888px). Shots: `desktop-light-picker-about.png` (Lab in sans on the About card, Fraunces on the picker).

**Root**: R.W4 F2 retired the trigger-level fontFamily override (`ColorSpaceSelector.vue:24–27` comment) and let the face "ride the CardHeader's `font-display` surface" — an **inheritance dependency**. The picker wraps the selector in `CardHeader class="font-display …"` (`ColorPicker.vue:29`); AboutPane mounts the same component inside `PaneHeader`'s `<h3 class="pane-header-title text-heading">` (`PaneHeader.vue:3`, `AboutPane.vue:8–16`) which carries **no** `font-display` → body sans. Worse, the face is **two-state**: once the dropdown has opened, reka clones the SelectItemText span (`font-display italic text-title`, `ColorSpaceSelector.vue:54–57`) into the trigger and the About face flips sans→Fraunces (`about-dropdown-open-light.png` shows Fraunces after open). A component whose typeface depends on (a) its host and (b) whether it has ever been opened is off-register by construction.

**ROOT-ROUTING**: value.js demo — `ColorSpaceSelector.vue` must OWN `font-display` (+ italic) on the trigger itself (one edit, both consumers cured; S-21 at-the-root).

**Same-component parity gap**: in the picker the dropdown rows carry the live per-space conversion specimen; in About `COLOR_MODEL_KEY` injects null (`ColorSpaceSelector.vue:109–112`) and the rows render bare. S-1 demands the two be THE SAME — AboutPane (or the pane shell) should provide the color model rather than the component special-casing its absence.

### P1-2 · S-1 restyle — the veil-capsule pill is exactly the furniture the user ordered removed

Both dropdowns still render the `.space-capsule veil-surface` pill (hairline border + `--radius-pill` + padding, `ColorSpaceSelector.vue:5,151–158`) with the small-caps eyebrow above the name. The user's spec: **no background, no rounded pill — the space name (Fraunces) + caret as a pure component of the title**. The capsule also inflates the About sticky header (see P1-4). Shots: `desktop-light-picker-about.png`, `mobile-dark-about-top.png`.
**ROOT-ROUTING**: value.js demo — `ColorSpaceSelector.vue` (delete capsule + eyebrow; keep the ghost trigger + caret; the focus ring already exists at :170–174).

### P1-3 · S-14 — the "— 09 / 16" counter (and its per-row twin)

Live text `color space — 09 / 16` in BOTH dropdowns — one root site: the eyebrow at `ColorSpaceSelector.vue:9–11` (`pad(activeIndex+1) / pad(spaceEntries.length)`). The same superfluity repeats **inside every dropdown row** as a right-aligned `pad(i+1)` index (`:72`, visible as `07 08 09 10` in `about-dropdown-open-light.png`). Excise both with the eyebrow (P1-2 removes the line wholesale).
**ROOT-ROUTING**: value.js demo — `ColorSpaceSelector.vue` (dies together with P1-2 in one edit).

### P1-4 · The About sticky header is a 167px occlusion band; content ghosts through it

Measured: `.pane-header` rect **167.2px tall at 1440×900 (~19% of viewport)**, ~200px at 390×844 (~24%). It is sticky with `bg-card/60 backdrop-blur-md` (`PaneHeader.vue:2`) and contains the 41.9px-tall capsule *inside the h3*. Scrolled content half-reads through the translucent band — `about-guide-top-light.png` ("Detailed Guide" + bullets ghosting behind the title), `about-codeblock-light-2.png` (a KaTeX formula ghosting through), `mobile-dark-about-top.png` (the pane description AND the Definition callout partially painted over). The `pane-title-shrink` animation (`PaneHeader.vue:47–51,78–85`) shrinks only the h3 font-size — the capsule keeps its full audacious height, so the band never actually shrinks.
**ROOT-ROUTING**: value.js demo — composition fix in `AboutPane.vue` + `PaneHeader.vue`: P1-2's de-capsuling shrinks the band substantially; the selector must also participate in the shrink (or the header go opaque at scroll). A 24%-of-viewport translucent occluder is a hierarchy inversion: chrome above content.

### P1-5 · S-5 — "@MBABB": the handle is set in the EYEBROW register, which bakes uppercase

Source is lowercase `@mbabb` (`dock/menus/ProfileSection.vue:100`) but the trigger's class is `text-mono-caption` (`:99`) — and glass-ui's canonical eyebrow vocabulary bakes `text-transform: uppercase` (`glass-ui/src/styles/typography/utilities.css:42–47`, BB.W-EYEBROW-UNION). A handle is not an eyebrow. The dropdown's inner `@mbabb` (`ProfileSection.vue:109`) and the mobile menu (`MobileMenuDropdown.vue:78`) already use `text-mono-small` and render correctly — one site is off-register.
**ROOT-ROUTING**: value.js demo — `ProfileSection.vue:99`: set the trigger in the handle register (`text-mono-small`), NOT a `normal-case` per-instance patch and NOT a glass-ui change (the uppercase eyebrow canon is correct for eyebrows). Evidence: `desktop-light-picker-about.png` (dock, "@MBABB").

### P1-6 · Runtime KaTeX hijacks EVERY classless inline `<code>` — the inline-code register is extinct on all 11 pages

`renderKatex` (`markdown/composables/useMarkdownHighlighting.ts:74–98`) replaces every `<code>` **without a class** with a KaTeX render. Markdown compiles ALL inline backticks to classless `<code>` — so `` `oklch()` ``, `` `0`–`1` ``, `` `sqrt(a^2+b^2)` `` (prose pseudo-code, `assets/docs/oklch.md`) are all typeset as math: *oklch()* becomes an italic serif product of variables, `sqrt` renders as s·q·r·t juxtaposition (`about-guide-top-light.png` bullet 4; `about-katex-code-light.png` paragraph above "Color Conversions"). Measured on the live oklch page: **`p > code, li > code` count = 0; 39 `.katex` nodes** — the carefully-styled inline-code chip rule (`Markdown.vue:243–246`) is dead code on every docs page.
**ROOT-ROUTING**: value.js demo — excise the classless-code heuristic (precept: no special-cases). The docs already have an explicit math channel (the `<Katex>` component imported per-page); real inline math should be authored explicitly (markdown-it KaTeX at compile time, or inline `<Katex>`), and inline code should stay code. This is a per-.md-page authoring sweep + one deletion in `useMarkdownHighlighting.ts`.

### P1-7 · Pane titles are body-sans — a register violation across all 9 panes

DESIGN.md §fonts names "pane titles" as Fraunces display rungs (demo/DESIGN.md:25–27). Measured: `.pane-header-title` computes **"Plus Jakarta Sans", weight 700, 25.888px** — the generic bold-grotesque of every AI-default app shell. One root site: `PaneHeader.vue:3` lacks `font-display` (used by all 9 panes). Evidence: every About screenshot ("About the color spaces," in sans against Fraunces section heads below it — hierarchy reads inverted: the h2s outdress the pane title).
**ROOT-ROUTING**: value.js demo — `PaneHeader.vue` (one edit; verify the `pane-title-shrink` keyframes still read well in Fraunces).

---

## P2

### P2-1 · KaTeX output is MathML-only — typeset quality is delegated to the browser's math engine

Both math sites pin `output: "mathml"` (`useMarkdownHighlighting.ts:94`, `katex/Katex.vue`). All 39 math nodes on the oklch page are bare MathML. Visible cost: the M₁⁻¹ matrix/vector displays render cramped with colliding primes and rough bracket sizing (`about-codeblock-light-2.png`, "OKLab to XYZ"); glyph metrics differ per browser — a direct S-22 risk since WebKit's MathML-Core is the least mature. KaTeX's own guidance: MathML output is the accessibility tree, HTML the visual one.
**ROOT-ROUTING**: value.js demo — switch both sites to `htmlAndMathml` (visual consistency + a11y) and ship the KaTeX fonts (the gh-pages vendor-katex chunk already exists; `katex.min.css` is already imported at `Katex.vue` scoped style). Verify on Safari.

### P2-2 · Code plates are generic GitHub furniture, not atlas plates

Two off-register layers: (a) surface — `pre { @apply bg-muted rounded-2xl }` (`Markdown.vue:232–236`), a flat soft rectangle with no hairline, no cartoon offset, no plate caption (contrast the picker's specimen plates); (b) ink — `highlight.js/styles/github.css` + `github-dark.css` imported wholesale (`useMarkdownHighlighting.ts:5–6`) — GitHub's brand palette, not the crayon primaries. The themes are injected as a raw `<style>` appended to `document.head` per composable instance and swapped by `innerHTML` (`:114–123`) — outside the token system entirely.
**ROOT-ROUTING**: value.js demo (with a glass-ui option): a token-mapped hljs theme (hljs scope classes → house tokens/crayon primaries, one small CSS file, dark via `.dark` — kills the JS theme-swap and the head-injection) + plate treatment on `pre`. If the "code plate" becomes a reusable surface, it belongs in glass-ui (S-21).

### P2-3 · Heading ink is a per-level hue-rotation carousel

`--md-color-h2` = safe accent at current hue; h3 = **+40°**, `mark.cs-name` accent = **+20°** (`useMarkdownColors.ts:43–45`). On the live page this painted "Historical Context" cyan and "Key Characteristics" green simultaneously (`about-guide-top-light.png`) — the transition (`Markdown.vue:126`) animates them at different times, so the document reads as a rainbow sampler rather than one accent voice. S-18's philosophy (vary H **and** C) belongs to the *ambient* field; document headings want ONE accent family per view — vary L/C down the ladder, not hue per level.
**ROOT-ROUTING**: value.js demo — `useMarkdownColors.ts` (derive h2/h3/mark from one hue with L/C steps; keep `computeSafeAccent`).

### P2-4 · Dark mode is incoherent around the About card (evidence hand-off)

With `html.dark` measured true: the cards flip to dark tokens but the page aurora stays light pink and the dock stays cream — dark ink floats on a light field (`desktop-dark-picker-about.png`, `mobile-dark-about-top.png`; in the mobile shot the pane description is near-illegible dark-on-brown). S-18's lane owns the aurora; recorded here because the About card's dark legibility depends on it.
**ROOT-ROUTING**: value.js demo (App background layer + dock dark tokens) — cross-ref S-18 lane.

### P2-5 · Markdown owns two private `useDark` instances + a one-frame wrong-theme paint was observed

`useMarkdownColors.ts:15` and `useMarkdownHighlighting.ts:111` each spin their own vueuse `useDark` while the app's source of truth is glass-ui's `useGlobalDark` (`App.vue:126`). Three dark-related localStorage keys coexist in a live profile (`vueuse-color-scheme`, `glass-ui:dark`, `darkMode`). One captured frame shows github-DARK code plates inside a fully light app (`about-katex-code-light.png`) that later re-rendered light with no user action (`about-codeblock-light-2.png`) — an initial-resolution race consistent with parallel dark stores.
**ROOT-ROUTING**: value.js demo — consume `useGlobalDark` (glass-ui-first-class) in both composables; delete the parallel instances.

### P2-6 · S-11 evidence — dev demo calls the PROD API and CORS kills it

Console on every localhost load: `Access to fetch at 'https://api.color.babb.dev/colors/approved' from origin 'http://localhost:9000' blocked by CORS ('Access-Control-Allow-Origin: https://color.babb.dev')`. The About/docs lane hits it via approved-color-names.
**ROOT-ROUTING**: api (CORS allowlist for dev origins) and/or value.js demo `@lib/palette/api/client.ts` BASE_URL dev default. Owned by the API lane; evidence logged here.

### P2-7 · Definition ↔ Type duplication (S-12 superfluity, About top plate)

"Definition: A cylindrical representation of the OKLab color space." followed one screen later by "Type: Cylindrical representation of OKLab" (`desktop-dark-picker-about.png`) — the same sentence twice inside one card (`ColorNutritionLabel.vue:6` Alert vs the Basic-Information "Type" row). One of the two should die.
**ROOT-ROUTING**: value.js demo — `ColorNutritionLabel.vue` + the nutrition data source.

---

## P3

- **φ-ladder verdict — HOLDS in the markdown body, drifts at the pane seam.** Measured h2 `margin-top: 41.888px = φ⁴ (2.618rem)`, `margin-bottom: 16px = φ² (1rem)` — exactly the ladder (`Markdown.vue:90–97,117–127`). Spot-verified on the live oklch page; the ladder CSS is identical for all 11 pages (one scoped stylesheet), and the pages share the same template structure (6 h2 sections), so the rhythm is uniform by construction. BUT the `--phi-*` tokens are private to `.markdown-wrapper`; `AboutPane.vue:23,29` re-hardcodes `py-[1.618rem] pb-[2.618rem]` as Tailwind arbitrary values. Promote the ladder to `style.css` tokens (DESIGN.md's stated token discipline) and consume in both.
- **`mark.cs-name` treewalker regex is stateful** — `pattern.test()` with `/g` in `acceptNode` only resets `lastIndex` on the reject path (`useMarkdownHighlighting.ts:38–41`); after an accept, the next text node's test starts at a stale offset → intermittent missed highlights. Reset unconditionally.
- **Global CSS routed through leaf components**: `Markdown.vue:32–33` imports `@styles/style.css` + `@styles/utils.css` in a component script; `Katex.vue` `@import`s `katex.min.css` inside a *scoped* block (it hoists global anyway). Move both to the app entry.
- **`?space=` is load-only** — in-page hash edits don't re-drive the model (my sweep proved it: 11 hash writes, 0 doc swaps). Acceptable SPA behavior, but if URL↔model is advertised bidirectional, hashchange should apply or the claim should be dropped.
- **Dropdown scroll edge** — the SelectContent's last visible row half-clips under the scroll chevron (`about-dropdown-open-light.png`, "K…" row). glass-ui producer knob (`--select-content-max-h`) — round the max-height to a whole row.
- **Collapsed dock ghost (S-8 cross-ref)** — captured here too: the dock collapsed to a tiny circle with clipped "Ho" text over the dot (`about-dropdown-open-light.png`, top center). Owned by the shell lane; evidence logged.

---

## Candidate wave-items (concrete, root-routed)

| # | Item | Root | Ledger |
|---|------|------|--------|
| W1 | source-export plugin: body-brace extraction + loud prettier failure + per-page snippet goldens | value.js `plugins/vite-source-export.ts` | P0-1 |
| W2 | Docs math pipeline: delete classless-code→KaTeX; explicit math authoring; `htmlAndMathml` output + fonts; restore inline-code chips; Safari verify | value.js demo (`markdown/`, `katex/`, `assets/docs/*.md`) | P1-6, P2-1, S-22 |
| W3 | ColorSpaceSelector = pure title component: capsule/eyebrow/counter/row-index excised; trigger owns `font-display`; About provides `COLOR_MODEL_KEY` (specimen parity) | value.js demo `ColorSpaceSelector.vue` + `AboutPane.vue` | S-1, S-14 |
| W4 | PaneHeader register + sticky-band cure: `font-display` titles; header shrink includes the selector / band ≤ one title line | value.js demo `PaneHeader.vue`, `AboutPane.vue` | P1-4, P1-7 |
| W5 | `@mbabb` handle register (`text-mono-small` at the one off-register site) | value.js demo `ProfileSection.vue:99` | S-5 |
| W6 | Code-plate + token-mapped hljs theme; single dark source via `useGlobalDark`; kill head-injection swap | value.js demo (glass-ui if plate generalizes) | P2-2, P2-5 |
| W7 | One-accent heading ink (L/C ladder, no per-level hue spin) | value.js demo `useMarkdownColors.ts` | P2-3 |
| W8 | φ tokens promoted to `style.css`; AboutPane consumes; Definition/Type dedupe | value.js demo | P3, P2-7 |
| — | Dev CORS/API base; dark aurora+dock coherence | api / demo App layer | S-11, S-18 (other lanes) |
