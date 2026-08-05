claude-opus-5[1m]

# CHALLENGE — `EquationResult.vue` · axis C (CONSUMPTION)

**Subject** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/equation/EquationResult.vue` (101 lines, unmodified vs HEAD `c654824e`-era fourier HEAD `2026-07-03`; `git diff HEAD` empty while **19 sibling files in the same working tree are modified** — see §0.3).

**Method** static + source-derived only. No browser. Every dependency the file imports was read at its installed version in `web/node_modules`. Livable-only claims are marked `UNPROVEN-NEEDS-LIVE` for SS-13.

**Posture** the component was assumed DEFECTIVE until the tree proved otherwise. It largely did not prove otherwise — but three of the loudest-looking findings were shot down by their own falsifiers and are recorded as such (§4), and five things it does are genuinely right (§3, L-18 runs both ways).

**Tally** 12 defects (0 BLOCKER · 3 MAJOR · 9 MINOR) · 3 INFO · 5 superlatives.

---

## §0 — the consumption surface, enumerated

### 0.1 What it actually imports

| line | specifier | resolved | axis bucket |
|---|---|---|---|
| `:2` | `vue` → `computed` | 3.5.x | framework |
| `:3` | `@mkbabb/glass-ui/button` → `Button` | glass-ui **4.0.0**, `exports["./button"] → dist/button.js` | glass-ui, **subpath** |
| `:4` | `@mkbabb/glass-ui` → `useClipboard` | glass-ui **4.0.0**, `exports["."] → dist/glass-ui.js` | glass-ui, **root barrel** |
| `:5` | `lucide-vue-next` → `Check`, `Copy` | 1.x, declared in **devDependencies** | icons |
| `:6` | `katex` → default | **0.17.0** | third-party render |

**value.js: ZERO imports. keyframes.js: ZERO imports.** The fourier API: **zero direct**, one hop up (§0.4).

Corroborates `formation/fourier/lane-frontend.md:261-262` (the two glass-ui import lines, verbatim) and `lane-frontend.md:135` (`components/equation/EquationResult.vue | 101 | KaTeX result + copy`). No contradiction with the census.

### 0.2 value.js 0.13 — the honest reading

`@mkbabb/value.js` resolves to **0.13.0** (`web/package-lock.json`; range `^0.13.0`, a caret not a pin — the axis brief's word "pinned" is the *intent*, the tree carries a range). Repo-wide value.js consumption is **five lines, all easing**:

```
src/components/equation/ConvergencePlot.vue:5        easeInOutSine
src/components/equation/composables/useCurveTransition.ts:8  easeInOutSine
src/components/equation/lib/harmonics.ts:5           easeInOutSine
src/lib/easings.ts:9                                 timingFunctions
src/lib/easings.ts:16                                (+4 more)
```

`EquationResult` consumes none of them. That is **correct** for a pure render surface (see S-3) — *except* at `:97`, where it hand-rolls `transition: … 0.15s ease` while the repo already has `timingFunctions` on the graph and glass-ui ships `--ease-*`/`--duration-*` (defect C-7).

The F.W2 migration surface named in the brief — the hand-rolled `web/src/lib/colors.ts` arms (`cssVarToHex` at `:22`, `hslToHex` at `:56`, `rgbToHex`) that duplicate value.js 0.13's parse/convert core — is **not touched by this component**. It hardcodes `text-green-500` instead (C-6), which is the *same* disease (raw palette instead of resolved token) at one level up the stack. So: `EquationResult` is not a `colors.ts` consumer, and the F.W2 sweep will not find it by grepping `colors.ts`. **Flag for F.W2 scoping: the migration inventory must include raw-Tailwind-palette classnames, not just `colors.ts` callers, or this file is invisible to it.**

### 0.3 The in-flight sweep skipped this file

`git status` shows 19 modified `web/src` files including four siblings in `components/equation/` (`EquationView.vue`, `EquationModeToggle.vue`, `InfoCard.vue`, `convergence/*`). The sweep is doing glass-ui-4.0 conformance work — e.g. `EquationModeToggle.vue` `glass-subtle` → `glass-wash`, `InfoCard.vue` `MetricBadge :amount` → `:value`. `EquationResult.vue` has **zero** working-tree delta. Every §1 finding is therefore live against a file the current sweep has already walked past.

### 0.4 The API leaf coupling (R6-8 adjacency)

`EquationResult` has one call site: `EquationView.vue:255` `<EquationResult :latex="activeLatex" />`. `activeLatex` (`EquationView.vue:49-51`) is:

```
eqMode === "sigma" && displayLatexSigma ? displayLatexSigma : displayLatex
```

both of which are written from **two** sources:
1. the network — `computeEquation()` / `simplifyCoefficients()` (`src/lib/equation/api.ts:23,45`) → `apiFetch` → `POST /api/equations/compute` and `/api/equations/simplify`, returning `ComputeEquationResponse.latex` / `.latex_sigma` (`src/lib/equation/types.ts:27-28`) and `SimplifyResponse.latex` (`:43`);
2. `sessionStorage` — `loadCachedResult()` (`components/equation/composables/useEquationCache.ts:35`, key `eq-tab-result-v2`), `JSON.parse`d with **no shape validation** (`catch { return null }` only).

So the component's single prop is a **raw, unvalidated, network-or-storage-sourced string routed straight into `v-html`** (`:37`). That is the integration seam this axis exists to interrogate — §1 C-2/C-3.

**Relation to intake row R6-8** (`audit/codex-provenance/intakes/lane-fourier-r3-r6.md:142`, verdict TRUE, `CARRY-TO-WAVE → F.W5`): R6-8 established that fourier's operation records embed derived *client* back-references, so a defect cannot be attributed to one side of the client↔operation seam. `EquationResult` is the **degenerate case that makes R6-8's lesson concrete at the leaf**: the client leaf here is not even a method — it is a `string` field whose entire safety contract lives in a *different repo, a different language*, in `src/fourier_analysis/symbolic/parsing.py`'s `SAFE_NAMESPACE` allowlist. The operation record `operation:POST:/api/equations/compute` has no field that expresses "this response body is rendered as trusted HTML by the client." R6-8 asks the shared-provenance contract to keep operation identity independent of client identity; **this seam adds the converse requirement — the operation record must carry a *sink class* for string-typed response fields, or a client-side sink change (e.g. flipping `trust:true`) is invisible to every conformance fixture on the operation side.** Carry to F.W5 alongside R6-8.

I do **not** claim R6-8's C31 mutation reaches this component: C31 targets `web/src/lib/api.ts`'s `updateVisualization` PATCH verb (intake `:142`), which is the visualizations router, not equations. Explicitly non-overlapping.

---

## §1 — defects

### C-1 · MAJOR · silent copy failure — the composable's reported error is re-swallowed at the call site

**Provenance** `EquationResult.vue:16` (`const { copied, copy } = useClipboard({ resetMs: 2000 })`), `:32-34` (`function copyLatex() { copy(props.latex); }`).

glass-ui 4.0.0's `useClipboard` was built *specifically* to stop this. Its own type docs say so:

```
// node_modules/@mkbabb/glass-ui/dist/composables/dom/useClipboard.d.ts
onCopyError?: (reason: CopyFailureReason) => void;
//   "Surfaces the failure instead of swallowing it."
copy: (text: string) => Promise<CopyResult>;
//   "Resolves { ok } on success or { ok: false, reason } naming the channel
//    that failed — the failure is REPORTED, never silently swallowed."
```

`copyLatex()` passes no `onCopyError` and discards the returned `Promise<CopyResult>` — no `await`, no `.then`, no `void` marker. The implementation (`dist/useViewportReady-CvBcCYDf.js`, minified `f(e)`) confirms `copied.value` is set **only** inside `if (i.ok)`. So on failure: `copied` stays `false`, the `Check` icon never appears, the `Copy` icon does not move, and nothing else happens. The user's only signal that the copy failed is a `Copy` icon that also looks exactly like success-hasn't-happened-yet.

The composable already tries both channels before reporting (`navigator.clipboard.writeText` → `document.execCommand("copy")` textarea fallback), so a reported failure means *both* failed — precisely the case worth surfacing. `useToast` is already on the tree (`src/composables/useToast.ts`) and glass-ui exports `./toast`; the wiring cost is one arrow function.

**Failure scenario** Firefox with `dom.events.asyncClipboard.clipboardItem` disabled, or any non-secure-context origin (`http://` LAN dev, `server.host: true` is on), or a permissions-policy-blocked iframe: `navigator.clipboard` is absent → `copyToClipboard` returns `{ok:false, reason:"clipboard-api"}`; `execCommand` fallback returns `false` in modern Firefox for non-user-gesture-adjacent calls → `{ok:false, reason:"exec-command"}`. User clicks Copy, sees nothing change, pastes their previous clipboard contents into a paper.

**Falsifier** would fail if (a) `copy()` threw on failure so an unhandled rejection surfaced in the console — it does not, every path returns a `CopyResult` (verified in the minified `u()` / `c()` / `l()` triple); or (b) glass-ui's `Button` rendered its own failure affordance — it does not (`dist/button-BNDWhAZb.js` renders a `Primitive` with variant classes only); or (c) some ancestor installed a global unhandledrejection→toast bridge — `grep -rn "unhandledrejection" web/src` returns nothing.

**Not novel-but-unfiled**: `lane-frontend.md:233,350-351` records the three `useClipboard` sites as *adopted*; nobody checked whether the adoption used the error channel. All three sites (`EquationResult.vue:33`, `UserSlugBar.vue:69`, `useMorphConfig.ts:74`) discard the result identically. The pattern is repo-wide; this file is one of three.

---

### C-2 · MAJOR · `trust: true` on a `v-html` sink whose only containment lives in another repo, unasserted

**Provenance** `EquationResult.vue:23` (`trust: true`), `:37` (`<div class="eq-scroll-region" v-html="renderedHtml" />`).

`trust: true` is not a stylistic flag. KaTeX's `Settings.isTrusted` (`node_modules/katex/dist/katex.mjs:364-373`) is:

```js
isTrusted(context) {
  if ("url" in context && context.url && !context.protocol) {
    var protocol = protocolFromUrl(context.url);
    if (protocol == null) return false;
    context.protocol = protocol;
  }
  var trust = typeof this.trust === "function" ? this.trust(context) : this.trust;
  return Boolean(trust);
}
```

With `trust: true` the protocol is computed and then **ignored**. `\href{javascript:…}{x}` therefore renders as a live `<a href="javascript:…">`. The type docs are unambiguous (`node_modules/katex/types/katex.d.ts:176-186`, `@default false`): *"If `true` (trust input), allow all such commands."*

CSP does **not** save this. `web/public/_headers` ships `script-src 'self' 'unsafe-inline'`, and `'unsafe-inline'` is exactly the token that re-permits `javascript:` URL navigation under CSP3. The header file's own rationale block even names this component as the reason `style-src 'unsafe-inline'` exists ("EquationPanel/EquationResult render KaTeX to HTML with inline styles") — the CSP was authored *around* this sink without noting that the sink is trusted.

**Falsifier — and it partially fires.** The exploit requires attacker-controlled `latex`. I traced it and **it is not reachable today**: `api/routers/equations.py:110-111` returns `latex` from `simplify_series(...)` / `render_latex_sigma(...)`, both sympy renderers over an expression parsed by `src/fourier_analysis/symbolic/parsing.py:90` `parse_expr(expr_str, local_dict=SAFE_NAMESPACE, transformations=…)`. `parse_expr` runs the Python tokenizer, so `\`, `{`, `}` are syntax errors before `auto_symbol` can mint a `Symbol` with a TeX-command name. There is no gallery/share path that writes another user's string into `displayLatex` (`EquationView.vue` writes it only from `computeEquation`/`simplifyCoefficients`/`loadCachedResult`). **So: not a BLOCKER, and I decline to inflate it into one.**

What survives the falsifier is the real defect: **the containment argument is entirely extrinsic.** It lives in a Python allowlist, in a different repository, four call-frames away, and is asserted *nowhere* — not in `types.ts:27` (`latex: string`), not in the component, not in a comment, not in a test. The component instead affirmatively *widens* the sink beyond KaTeX's secure default for no stated benefit: nothing in this repo's LaTeX generation emits a `trust`-gated command. `grep -rn '\\\\href\|\\\\includegraphics\|\\\\url\|\\\\htmlId\|\\\\htmlClass' src/ api/ src/fourier_analysis/` → zero. **`trust: true` buys nothing and costs the entire secure default.**

**Failure scenario** F.W2/F.W5 lands a "render a shared equation from the gallery" or "import LaTeX" feature — both are natural next steps for a tool whose whole value is shareable equations — and the sink is already open, with no test, no type, and no comment standing between the new source and `v-html`. Or: sympy's `latex()` printer changes its escaping of a `Symbol` name in a future bump and the allowlist stops being the boundary anyone thought it was.

**Fix (KISS, one line)** delete `trust: true` — or, if some future command genuinely needs it, pass the function form and allow exactly that command. `trust: (ctx) => ctx.command === "\\htmlId"`.

**Repo-wide**: identical `trust: true` at `visualization/EquationPanel.vue:31` and `equation/composables/useCoeffHover.ts:100`. Three sinks, one decision, zero rationale recorded at any of them.

---

### C-3 · MAJOR · the `catch` fallback is the *unsafe* branch — raw unescaped interpolation into the same sink

**Provenance** `EquationResult.vue:26-29`:

```js
} catch {
    return `<code>${props.latex}</code>`;
}
```

This string is returned into `renderedHtml`, which is bound with `v-html` at `:37`. `props.latex` is interpolated **raw** — no `escapeHtml`, no `textContent`, no `String.replace`. The branch that exists to be the *safe* degradation is strictly more dangerous than the branch it guards: KaTeX at least parses; this concatenates.

**Reachability — the branch is live, not dead.** `throwOnError: false` (`:22`) does *not* make `renderToString` total. `katex.mjs:374-375`:

```js
var renderError = function renderError(error, expression, options) {
  if (options.throwOnError || !(error instanceof ParseError)) { throw error; }
```

Non-`ParseError` throws (internal `TypeError`s, unicode/font-metrics failures, macro-expansion `RangeError` on deeply nested input) propagate regardless of `throwOnError`. The `catch` is reachable by construction, and the author clearly believed so or would not have written it.

**Failure scenario** the same `latex` string that triggered the internal katex error is emitted verbatim into the DOM as HTML. Any `<` in it — and LaTeX legitimately contains `<` (`x < \pi`) — becomes markup. Best case the equation renders as garbled HTML with the fallback `<code>` silently swallowed; worst case it composes with C-2's threat model into a sink that does not even need KaTeX's cooperation.

**Falsifier** would fail if Vue escaped `v-html` content — it does not, by definition; or if `renderedHtml` were bound with `{{ }}` — it is not (`:37`); or if the fallback used `textContent` — it does not. Sibling `EquationPanel.vue:35` has the identical pattern with `<span class="text-red-400">${latex.value}</span>`, and `useCoeffHover.ts:104` has `catch { return ""; }` — **the three copies have already drifted**, which is C-9's evidence too.

**Fix** return `""` (as `useCoeffHover` already does) or escape. One line.

---

### C-4 · MINOR · root-barrel `useClipboard` against a documented canonical subpath, in a file that already uses subpaths

**Provenance** `EquationResult.vue:3` (`from "@mkbabb/glass-ui/button"`) vs `:4` (`from "@mkbabb/glass-ui"`). Two adjacent lines, two different conventions, same package.

glass-ui 4.0.0's `package.json` exports **79 subpaths** including `"./dom": {types: "./dist/dom.d.ts", import: "./dist/dom.js"}`, and `dist/dom.js` re-exports `useClipboard` (verified: `export { … n as useClipboard, … }`). fourier's own migration ledger already ruled on this — `docs/tranches/M/design/M-bump-migration.md:48`:

> `useClipboard` imported from root barrel `@mkbabb/glass-ui` — not a break (still resolves at 4.0), but pulls the vueuse SCC into the entry chunk → **`@mkbabb/glass-ui/dom` (canonical per glass-ui MIGRATION §1.5 SCC-trap closure)** … `EquationResult.vue:4` — **3 sites**

And commit `262c3d0` ("Subpath sweep (~40 root-barrel → flat)") swept ~40 sites and **missed this one**, in a file where the line immediately above is the sweep's own output.

**Falsifier — and the perf half of it fires.** I checked whether the barrel actually costs anything in prod. `vite.config.ts:53` maps `"@mkbabb/glass-ui"` into the `vendor-ui` manualChunk, and glass-ui declares `sideEffects: ["*.css"]`, so rollup tree-shakes `dist/glass-ui.js` (33,527 bytes of pure re-exports) down to `useClipboard`. **The M-doc's "pulls the vueuse SCC into the entry chunk" claim does not hold for the production build.** It does hold in dev, where Vite does not tree-shake and must traverse the full barrel graph. So I downgrade this from the M-doc's implied weight to MINOR, and the defect is **conformance + internal inconsistency**, not bytes.

**Failure scenario** the next `manualChunks` edit, or a move to `rollupOptions.output.manualChunks` as a function, or any consumer that imports this component outside the app build (a Storybook, a unit test with `vite-node`) re-exposes the full-barrel traversal that the sweep was run to eliminate. And the ledger's row stays open forever because the sweep believes it closed.

---

### C-5 · MINOR · `h-4.5 w-4.5` is inert — glass-ui 4.0.0's `buttonVariants` out-specifies it

**Provenance** `EquationResult.vue:46-47` (`class="h-4.5 w-4.5 text-green-500"`, `class="h-4.5 w-4.5"`).

glass-ui 4.0.0's `buttonVariants` base string (`dist/button-BNDWhAZb.js`) contains:

```
[&_svg:not([class*=size-])]:size-(--ui-glyph)
```

That compiles to a descendant rule `‹btn-base-class› svg:not([class*="size-"]) { width: var(--ui-glyph); height: var(--ui-glyph) }` — specificity **(0,2,1)**. Tailwind emits `.h-4\.5{height:calc(var(--spacing) * 4.5)}` — specificity **(0,1,0)** (verified verbatim in `web/dist/assets/index-57FkGzlZ.css`). Both land in Tailwind v4's `utilities` layer, so specificity decides and **glass-ui wins**. `--ui-glyph` is `calc(1rem * var(--ui-scale))` (`dist/styles/tokens/offsets-sizing.css:177`), i.e. 16px at `--ui-scale:1`, versus the 18px the author wrote.

The publisher even shipped the escape hatch — `:not([class*=size-])` — and the consumer used `h-`/`w-` instead of `size-`, which is exactly the class of name the guard does not recognise.

**Failure scenario** any `--ui-scale` retune in glass-ui silently resizes an icon the consumer believes it pinned; conversely the author's intended 18px never renders and the discrepancy is invisible in review because the class *looks* authoritative.

**Falsifier** would fail if Tailwind emitted the arbitrary-variant rule into a lower `@layer` than plain utilities (it does not — TW4 emits both into `utilities`), or if `--ui-scale` resolved such that `--ui-glyph` == 1.125rem (it is `1` in glass-ui's default scheme). **UNPROVEN-NEEDS-LIVE**: the rendered `getComputedStyle(svg).width`. `web/dist/` is stale (Jun 12, glass-ui 3.x — `grep -c ui-glyph` on the built CSS returns **0**), so the built artifact cannot corroborate; the claim rests on the 4.0.0 source string + Tailwind's emitted specificity, both read directly. Sibling `FunctionInput.vue:196` has the same class, so at least the error is consistent.

---

### C-6 · MINOR · `text-green-500` — raw Tailwind palette where glass-ui ships a light/dark-aware semantic token

**Provenance** `EquationResult.vue:46`.

glass-ui 4.0.0 ships `--success` as an OKLCH token with an explicit light-dark arm: `dist/styles/tokens/light-dark.css:159` `--success: light-dark(oklch(0.720 0.192 149.5), oklch(0.805 0.186 151.6))`, plus `--success-foreground` (`:166`) and a dark-arm override (`dark-arm.css:144`). The app imports `@mkbabb/glass-ui/styles` at `style.css:3`, so the token is present at runtime.

`text-green-500` is a fixed sRGB value that does not participate in the theme at all. The repo already knows this class of problem — `style.css` carries a hand-written `--viz-amber` darken because glass-ui's light token failed AA (`D.W4.d` block). This is the same failure mode with none of the remediation.

**Failure scenario** dark mode: `green-500` (`oklch(~0.72 0.19 145)`) against the dark `--card`/glass surface reads at a different contrast ratio than `--success`'s dark arm was tuned for, and the success affordance is the *one* thing in the component that must be unmistakable. **UNPROVEN-NEEDS-LIVE**: the actual measured ratio (axe run). The token-bypass itself is proven statically.

---

### C-7 · MINOR · hand-rolled duration/easing bypasses glass-ui's motion tokens; the scale transform has no reduced-motion guard

**Provenance** `EquationResult.vue:96-100`:

```css
.icon-swap-enter-active, .icon-swap-leave-active {
    transition: opacity 0.15s ease, transform 0.15s ease;
}
.icon-swap-enter-from { opacity: 0; transform: scale(0.8); }
```

glass-ui 4.0.0 ships the exact vocabulary this needs: `--duration-instant: 0.1s`, `--duration-fast: 0.2s` (`dist/styles/tokens/scheme-motion.css:66-67`) and `--ease-standard`/`--ease-out`/`--ease-apple`/`--ease-spring` (`:216-227`). The component uses none, hardcoding a duration that sits between two published rungs and the CSS `ease` keyword.

Separately: `transform: scale(0.8)` is motion, and glass-ui's `prefers-reduced-motion` handling is **targeted, not blanket** — `dist/styles/animations.css:239,279,369` guard specific keyframes/attributes (`scrim-breath`, `[data-scrim-animation]`), and the app's own PRM guard at `style.css` covers only `[data-state="active"][role="tabpanel"]`. Nothing reaches `.icon-swap-*`. The repo's own house standard is visible three blocks up in `style.css` (`@media (prefers-reduced-motion: reduce) { … animation: none }`) — this component just does not follow it.

**Failure scenario** a `prefers-reduced-motion: reduce` user gets an unguarded scale-in on the one element that changes as feedback. Low harm, but it is a house-rule miss with a documented in-repo precedent, and it is exactly the ungated-motion family the constellation grand-audit named.

**Falsifier** would fail if glass-ui shipped a blanket `@media (prefers-reduced-motion) { *, ::before, ::after { transition-duration: 0.01ms !important } }` reset — `grep -n "prefers-reduced-motion" dist/styles/*.css dist/styles/**/*.css` returns only the three targeted blocks. Would also fail if 150ms/scale-0.8 fell under a "non-essential motion is exempt below N ms" rule — no such rule exists in WCAG 2.3.3 / the PRM media query spec.

---

### C-8 · MINOR · `.eq-scroll-region` is a keyboard-unreachable scroll container

**Provenance** `EquationResult.vue:37` (`<div class="eq-scroll-region" v-html="renderedHtml" />`) and `:59-67`:

```css
.eq-scroll-region { …; overflow-x: auto; scrollbar-width: thin; }
```

A `div` with `overflow-x: auto` that actually overflows is a scroll container. It has no `tabindex="0"`, no `role`, no accessible name. Chrome/Edge do not put untabbable scrollers in the sequential focus order (Firefox does, since 2020) — so on Chromium, a keyboard-only user cannot scroll a wide equation at all. This matters *specifically here*: the whole reason the scroll region exists is that Fourier series LaTeX overflows horizontally by design (that is why `:deep(.katex-display){ overflow: visible !important }` at `:71-75` exists), and the copy affordance (the mouse-free workaround) is C-1-broken on failure.

**Failure scenario** Chromium + keyboard only + a 20-harmonic expanded series: the right-hand terms are unreachable and unscrollable. Two lines fix it: `tabindex="0"` + `role="region"` + `aria-label`.

**Falsifier** would fail if a parent were the scroller (it is not — `.eq-result-root` at `:53-55` is `position: relative` only), or if `.katex-display`'s own `overflow-x: auto` (set globally at `style.css`) were the operative scroller — but `:73` explicitly kills it with `overflow: visible !important`, deliberately promoting this `div` to sole scroller. **UNPROVEN-NEEDS-LIVE**: whether it overflows at a given viewport. Corpus adjacency: `docs/audits/runs/2026-06-01-modern-web-audit/fourier.md:58` already flagged this exact element (`EquationResult.vue:66`) for a *different* scrollbar defect (`scrollbar-width: thin` with no `scrollbar-color` under `prefers-contrast: more`) — six sites, still unadopted. **That row stands; this is a second, more severe defect on the same three lines that the P3 row did not see.**

---

### C-9 · MINOR · four direct `import katex` sites, three copies of the options object, already drifted

**Provenance** `EquationResult.vue:6,20-26`; `visualization/EquationPanel.vue:11,25-37`; `equation/composables/useCoeffHover.ts:7,98-104`; `paper/PaperView.vue:11` (via `latex-paper`'s `useKatex`).

The three direct `renderToString` sites carry a byte-identical options triple `{displayMode: true, throwOnError: false, trust: true}` — and **three different fallbacks**: `` `<code>${latex}</code>` `` (here), `` `<span class="text-red-400">${latex}</span>` `` (EquationPanel:35), `""` (useCoeffHover:104). The security-relevant part is duplicated; the safety-relevant part has diverged. `web/src/lib/katex.ts` **does not exist** — `docs/audits/runs/2026-05-19-refinement-assay/r2-fourier-A-refinement.md:236` recommended exactly that singleton ("so `EquationPanel.vue`/`EquationResult.vue`/`ConvergencePlot.vue`/`useCoeffHover.ts` share one runtime") and it is unadopted 2½ months later.

**Failure scenario** the C-2 fix (drop `trust: true`) must be applied at three sites and will be applied at one; the drift already demonstrates the mechanism. A single `renderLatex(src)` helper collapses C-2, C-3 and C-9 into one edit.

**Falsifier** would fail if the sites needed genuinely different options — they do not; the three option objects are identical today.

---

### C-10 · MINOR · `@types/katex@^0.16.8` retained against `katex@0.17.0`

**Provenance** `web/package.json` devDependencies (`"@types/katex": "^0.16.8"`) vs dependencies (`"katex": "^0.17.0"`); the working-tree diff shows the bump deliberately moved `katex ^0.16 → ^0.17` while pinning `@types/katex ^0.16 → ^0.16.8`. `EquationResult.vue:6,20-26` is the type-checked call site.

katex 0.17.0 ships its own declarations (`package.json exports["."].import.types → "./types/katex.d.ts"`), so under `tsconfig.app.json`'s `"moduleResolution": "bundler"` the bundled types win and `@types/katex` is **inert dead weight**.

**Falsifier fires on severity, not on fact.** If `moduleResolution` were `node`/`node10`, `@types/katex` would shadow the bundled 0.17 types and `KatexOptions` would be validated against a one-minor-old shape. It is `bundler`, so today this is hygiene only — MINOR. It remains a latent trap because the file that makes it harmless (`tsconfig.app.json`) is not the file that makes it look intentional (`package.json`, where a maintainer deliberately kept the 0.16 line).

---

### C-11 · MINOR · `lucide-vue-next` is a devDependency imported at runtime

**Provenance** `EquationResult.vue:5` (`import { Check, Copy } from "lucide-vue-next"`); `web/package.json` devDependencies `"lucide-vue-next": "^1.0.0"`; `vite.config.ts:52-56` names it in the **production** `vendor-ui` manualChunk.

A dependency that ships in the production bundle and is named in the production chunk map is a `dependencies` entry. `reka-ui`, `class-variance-authority`, `clsx`, `tailwind-merge` are similarly classified (glass-ui peer deps, arguably defensible); `lucide-vue-next` is imported *directly by application source* at 20+ sites and is not.

**Failure scenario** `npm ci --omit=dev` in a CI build stage, or any future extraction of `web/` into a publishable package, fails to resolve the import. The app is `private: true`, which is why this has never bitten — a latent, cheap fix.

**Falsifier** would fail if lucide were only used in test/tooling code — `grep -rn "lucide-vue-next" web/src` shows application components throughout, including this one.

---

### C-12 · MINOR · props contract has no empty-state arm, but the component's own code proves the empty state is expected

**Provenance** `EquationResult.vue:7-9` (`defineProps<{ latex: string }>()` — required, no default, no validator), `:20` (`if (!props.latex) return ""`), `:32-34`.

The component *itself* asserts that `latex` can be empty (`:20`). `EquationView.vue:38-39` confirms it: `displayLatex = ref(cachedRes?.latex ?? "")` — the initial state, before any compute, is `""`. In that state the component renders a 4.5rem-tall empty box (`min-height: 4.5rem`, `:63`) with a **fully enabled Copy button** that calls `copy("")` → `navigator.clipboard.writeText("")` → success → `copied = true` → green Check for 2 seconds. **The affordance confirms a copy of nothing.**

**Failure scenario** first load with no cached result: user sees an empty equation panel with an inviting glass copy button, clicks it, gets a green checkmark, and their clipboard is now silently empty — the *worst* possible outcome, because it destroyed whatever they had and told them it worked.

**Falsifier** would fail if the parent conditionally rendered the component — `EquationView.vue:255` renders it unconditionally inside the equation card (`grep -n "activeLatex"` → only `:49` and `:255`; no `v-if` on the `EquationResult` line). Would also fail if `writeText("")` rejected — it does not; empty-string writes succeed. **Fix**: `:disabled="!latex"` on the `Button` — glass-ui's Button accepts `disabled` (`dist/components/ui/button/Button.vue.d.ts`, `disabled?: ButtonHTMLAttributes['disabled']`) and styles it (`disabled:opacity-disabled disabled:pointer-events-none` in the base variant string). One attribute.

---

## §2 — INFO

**C-13 · INFO · the accessible name is a `title`, and the state change is unannounced.** `:40` `title="Copy LaTeX"` on an icon-only `Button`. It *works* — glass-ui's `Button` does not set `inheritAttrs: false` (`grep -c inheritAttrs dist/button-BNDWhAZb.js` → 0), so `title` falls through to the rendered `<button>` and `title` is a valid last-resort accname source. But it is the weakest one: never surfaced to touch users, deprioritized by some AT. Neither is the `copied` transition announced — the `Check`/`Copy` swap is purely visual with no `aria-live`, so a screen-reader user gets no confirmation at all. glass-ui ships `./icon-tooltip` for exactly this affordance.

**C-14 · INFO · zero test coverage.** `grep -rn "EquationResult\|Copy LaTeX\|eq-result\|copy-pos" web/e2e/` → 0 hits across all 8 specs. The copy affordance, the empty-latex state (C-12), and the `v-html` sink (C-2/C-3) are all untested. No unit test directory exists for `web/`.

**C-15 · INFO · confirmation window drifts across the three `useClipboard` sites.** `resetMs: 2000` here (`:16`) and at `useMorphConfig.ts:58`, but `resetMs: 1500` at `UserSlugBar.vue:23` — three instances of the same affordance, two windows, no token. glass-ui's default is 1500.

---

## §3 — superlatives (L-18, the other direction)

**S-1 · `--z-controls` is consumed as a real publisher token, not a magic number.** `:90` `z-index: var(--z-controls)`. I tried to falsify this as an undefined-variable bug — `grep -rn -- "--z-controls:" web/src` returns **nothing**, which looks damning — and it survived: the token is declared by glass-ui at `dist/styles/tokens/scheme-motion.css:336` (`--z-controls: 20`, under its documented "§3 z-index" band), imported via `style.css:3`. Seven sibling sites use the same token. This is correct cross-repo token consumption and it is the *reason* the z-stack in this app is coherent.

**S-2 · `variant="glass" size="icon"` are both real members of the 4.0.0 union.** `dist/components/ui/button/index.d.ts:4-5` declares `variant?: … | "glass" | "glass-wash" | …` and `size?: … | "icon" | "icon-sm"`. The A.W3 native-`<button>`→`<Button>` migration (`docs/tranches/A/audit/W3-button-ledger.md:29`, which pre-registered this exact site with this exact variant/size pair and the rationale "`glass` matches the panel-overlay aesthetic") landed correctly and still typechecks two majors later. Compare the sibling `InfoCard.vue`, whose `MetricBadge :amount` prop **did** break at 4.0 and is being repaired in the working tree right now.

**S-3 · The zero-import posture toward value.js and keyframes.js is right, not lazy.** A two-state icon swap is a Vue `<Transition>` with a CSS rule. Reaching for keyframes.js 4.3's `Animation` engine (which the repo deliberately made lazy at `262c3d0` because the static import broke at runtime) or value.js's easing catalogue would be exactly the manufactured elegance `FA5-architectural-transpositions.md` rejects. The component declines both correctly. (C-7 is the narrow exception — using the *tokens* is free; using the *engine* would not be.)

**S-4 · `:deep()` is used because the author understood the mechanism, not by ritual.** `:70-84`. Vue's scoped-style compiler stamps a data-attribute onto template-authored elements; `v-html` content receives no stamp, so `:deep()` is the *only* way to reach the KaTeX subtree. The three `:deep()` rules do exactly the four things that need doing (kill the global `.katex-display` margin, restore `overflow: visible` against KaTeX's shipped `overflow-x: auto`, set a responsive font-size at one breakpoint) and nothing more. `docs/audits/runs/2026-05-18-fourier-tranche/c-style-consumer.md:115` reached the same verdict independently ("KaTeX is third-party, not reka-ui, so these are legitimate").

**S-5 · The migration provenance is written into the source, and it is what made this challenge cheap.** `:12-15`:

> `P.W5 Lane B.2 — migrated from bare navigator.clipboard.writeText + manual copied ref + setTimeout to glass-ui's useClipboard composable (the reactive copied flag here drives the Check/Copy icon swap below).`

It names the wave, the lane, the prior mechanism, and the consumer of the new API. I was able to reconstruct the entire adoption history — and then find C-1, the thing the adoption *left on the table* — in one read. Two sibling sites carry the same comment. **This is the practice that should propagate; C-1 exists because the comment recorded what was adopted and not what was declined.**

---

## §4 — falsified: things that look like defects and are not

Recorded so the next auditor does not re-spend the time.

| candidate | why it fails |
|---|---|
| "`--z-controls` is undefined — `grep` finds no declaration in `web/src`" | It is a **glass-ui** token, `dist/styles/tokens/scheme-motion.css:336` → `20`, delivered by `style.css:3`'s `@import "@mkbabb/glass-ui/styles"`. See S-1. |
| "the root-barrel import drags the whole 33 KB glass-ui barrel + the vueuse SCC into the bundle" (the M-doc's own framing, `M-bump-migration.md:48`) | `sideEffects: ["*.css"]` + `vite.config.ts:53`'s `vendor-ui` manualChunk ⇒ rollup tree-shakes `dist/glass-ui.js` to `useClipboard` in the production build. The claim holds in **dev only**. C-4 is downgraded to conformance accordingly — **this lane contradicts the M-doc's severity while affirming its ruling.** |
| "`trust: true` is a live XSS" | The backend allowlist (`symbolic/parsing.py:90`, `parse_expr` over `SAFE_NAMESPACE`) makes `\`/`{`/`}` tokenizer errors, so no TeX command can be injected through the expression. **Not a BLOCKER.** What survives is C-2: the containment is extrinsic, cross-repo, cross-language, and asserted nowhere. |
| "CSP mitigates the `v-html` sink" | `_headers` ships `script-src 'self' 'unsafe-inline'`, which re-permits `javascript:` URLs under CSP3. The header's own rationale block names this component as the reason for `style-src 'unsafe-inline'` without noting the sink is `trust:true`. CSP is not a mitigation here. |
| "`copy()` produces an unhandled promise rejection" | It cannot. `dist/useViewportReady-CvBcCYDf.js` `u()`/`c()`/`l()` all resolve to a `CopyResult`; nothing throws. The defect is the *opposite* — see C-1. |
| "`title` on `<Button>` is dropped by attribute fallthrough" | glass-ui's `Button` does not set `inheritAttrs: false`; `title` reaches the rendered `<button>`. C-13 is a weakness, not a break. |
| "R6-8's C31 mutation reaches this component" | C31 targets `web/src/lib/api.ts` `updateVisualization` (PATCH `/api/visualizations/{slug}`). This component's chain is `/api/equations/{compute,simplify}`. Explicitly non-overlapping; the *lesson* transfers (§0.4), the *defect* does not. |
| "the built CSS in `web/dist/` corroborates C-5" | It does not — `dist/assets/index-57FkGzlZ.css` is dated Jun 12 and `grep -c ui-glyph` → **0**, i.e. it predates glass-ui 4.0.0. C-5 rests on the 4.0.0 source string plus Tailwind's emitted specificity, both read directly, and is marked UNPROVEN-NEEDS-LIVE for the computed size. |

---

## §5 — carries

| id | target | one line |
|---|---|---|
| C-2, C-3, C-9 | **F.W5**, with R6-8 | One `web/src/lib/katex.ts` `renderLatex()` — drops `trust`, escapes the fallback, deduplicates three sites. Plus: the shared-provenance contract needs a **sink class** on string-typed operation response fields, or a client-side `trust` flip is invisible to every operation-side fixture. |
| C-1, C-15 | **F.W4** | `onCopyError` at all three `useClipboard` sites + one `resetMs` token. The composable was built to report; three consumers re-swallow. |
| C-6 | **F.W2** | The migration inventory must key on raw-Tailwind-palette classnames, not only `colors.ts` callers — this file is invisible to a `colors.ts` grep and still carries the disease. |
| C-8, C-13 | **F.W4** (a11y) | `tabindex="0"` + `role="region"` + `aria-label` on `.eq-scroll-region`; `aria-live` on the copy confirmation. Composes with the still-open `fourier.md:58` scrollbar-contrast row on the same three lines. |
| C-10, C-11 | **F.W0** (hygiene) | Drop `@types/katex`; move `lucide-vue-next` to `dependencies`. |
| C-12 | **F.W4** | `:disabled="!latex"`. One attribute; prevents a confirmed copy of an empty string over the user's clipboard. |
| C-4 | **the M-bump ledger** | Row `M-bump-migration.md:48` is **still open** at `EquationResult.vue:4` after the `262c3d0` sweep claimed ~40 sites. Severity corrected to MINOR (see §4). |
| S-5 | **standing practice** | Migration-provenance comments in source. Extend the convention to record what was *declined*, not only what was adopted — C-1 is precisely the gap that omission left. |
