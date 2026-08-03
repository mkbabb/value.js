# CHALLENGE-L — PalettesPane: library structure

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]`, the 1M-context Opus 5
variant. This matches the explicit declaration under which this seat was spawned. The seat is
declared, not inherited. (Passes 1–4 recorded the same receipt.)

---

## Amendment notice — pass 5

**This is a fifth Opus-5 pass.** Pass 4's file is preserved verbatim at
`challenge-L-library.pass-4-prior.md`. Nothing from any prior pass is deleted; everything below
the pass-4 notice is carried forward unchanged and re-verified where I rely on it.

- Work order HEAD: `c654824e`. **Actual HEAD at pass 5: `d19da6d3`**
  (`docs(V·mega): 3:30am wall harvested — 233/243 axes banked …`). The tree has now moved four
  times under this workflow (`32b4040e` → `e79fcd43` → `9268f054` → `d19da6d3`). Every prior line
  citation I rely on was re-resolved at `d19da6d3`; all still resolve. Commands pasted at P5-9.

Pass 5 opened the axis at the **export seat** and at the **component boundary**, the two places
passes 1–4 touched but did not exhaust. Passes 1–4 proved the export dual path and its CSS byte
divergence (L-2), the three name→identifier homes (L-4), the port-key co-location cost (L-3), the
19 `demo/ui/` shims (L-6), the dead eslint globs (P4-4) and the stale `.d.ts` type gate (P4-1).
Pass 5 adds eight findings that none of those four passes recorded:

- **P5-1 (BLOCKER, promotes L-2).** The byte contract does not merely *differ* from the shipping
  exporter — it **names and forbids the exact construct the shipping exporter uses**. Quoted
  verbatim from the authority: *"never a partial download or `console.warn`-only result."*
  `usePaletteExport.ts:21-23` is a `console.warn`-only result. L-2 was "two implementations
  disagree"; it is now "the shipped seat violates a named prohibition of the same authority."
- **P5-2 (MAJOR, extends L-2).** The divergence is **5-of-5 formats, not CSS-only**. Tailwind
  ships `.tailwind.ts` / `text/typescript` against a contract that fixes
  `.tailwind.json` / `application/json;charset=utf-8`; SVG ships a `<text>` element with a
  `font-family` against a contract that forbids text rendering and fonts outright.
- **P5-3 (MAJOR, new).** Three vocabularies for one closed union, bridged by a hand-written
  5-line table — while the union itself already exists and is imported by nothing in the app.
- **P5-4 (MAJOR, new).** `CurrentPaletteEditor.vue` — whose sole consumer is `PalettesPane.vue` —
  lives inside the **remote-browse** mega-feature and is named in its public seam. `browser/` has
  become a god *directory*.
- **P5-5 (MINOR, new, measured live).** `card/index.ts`'s PI-6 tree-shake claim is **false in dev
  and unverifiable in prod**: two SFCs this pane never renders, and both their scoped
  stylesheets, are fetched on `/#/palettes`.
- **P5-6 (MINOR, new).** The class on this pane's **root element** is defined inside a
  **descendant's** unscoped `<style>`. Nine panes depend on a global side effect emitted by a
  child SFC.
- **P5-7 (INFO, new; bounds P4-3).** The repo's own production build emits **no application
  chunk** — 698 bytes of modulepreload polyfill and zero `modulepreload` links. That is *why*
  pass 4 had to hand-drive esbuild to measure tree-shaking, and it is why P5-5 cannot be closed
  in prod at this HEAD.
- **P5-8 (re-verification, strengthens P4-4).** P4-4's dead-lint finding confirmed with a sharper
  instrument — `eslint --print-config` on the subject file itself — plus a **third** independent
  cause P4-4 did not name.

Pass 5 also **re-affirms pass 2's negative proof on the published-surface axis** with fresh
commands, and adds the resolution evidence that makes it a proof rather than an absence
(P5-10).

---

## Verdict (pass 5)

**DEFECTIVE.** Five BLOCKERs, sixteen MAJORs, eight MINORs, three INFOs (cumulative
passes 1–5).

The pass-5 headline: **the export seat is not a divergence, it is a contract violation with the
violated clause written down.** `docs/tranches/V/PALETTE-CONTRACT.md:174` closes the W51 preamble
with a sentence that reads like it was written after looking at `usePaletteExport.ts`:

> "A serializer either yields the bytes below or a visible terminal/retryable operation state —
> never a partial download or `console.warn`-only result."

The seat `PalettesPane.vue:211` mounts does exactly the forbidden thing, on a `switch` with no
`default`, behind a parameter typed `string` instead of the closed union that already exists two
directories away. Four independent structural failures stacked into fourteen lines, all of them
downstream of the one root cause passes 1–4 already named: **there are two export
implementations and the certified one is wired to a test.**

The second pass-5 theme is **misplaced ownership that no gate can see**: the local pane's editor
lives in the remote feature (P5-4); the pane's own root class lives in its child (P5-6); the
card barrel's tree-shake promise is unkept (P5-5). Each is invisible to tsc, invisible to eslint
(P5-8), and invisible to the test suite. They persist for exactly the reason P4-4 identified —
the demo's module-lattice lint globs a directory tree that was deleted.

---

# Findings — pass 5

## P5-1 — BLOCKER — the export failure path is the exact construct the byte authority names and forbids

**Where:** `demo/palettes/usePaletteExport.ts:11-27`, reached from `PalettesPane.vue:211`
(`const { onExport } = usePaletteExport();`) and bound to the card at `PalettesPane.vue:96`
(`@export="(p, fmt) => onExport(p, fmt)"`).

```ts
export function usePaletteExport() {
    async function onExport(palette: Palette, format: string) {
        try {
            switch (format) {
                case "json": downloadExport(exportAsJSON(palette)); break;
                case "css": downloadExport(exportAsCSSCustomProperties(palette)); break;
                case "tailwind": downloadExport(exportAsTailwindConfig(palette)); break;
                case "svg": downloadExport(exportAsSVG(palette)); break;
                case "png": downloadExport(await exportAsPNG(palette)); break;
            }
        } catch (e) {
            console.warn("Export failed:", e);
        }
    }
    return { onExport };
}
```

**The violated clause, verbatim** — `docs/tranches/V/PALETTE-CONTRACT.md:174`, the closing
sentence of the W51 preamble, which `:165-171` declares to be *"W51's sole byte authority"* and
*"VERBATIM … DO NOT prose-compress"*:

> "A serializer either yields the bytes below or a visible terminal/retryable operation state—never
> a partial download or `console.warn`-only result."

Two distinct failures satisfy that prohibition here:

1. **The `catch` is a `console.warn`-only result.** `exportAsPNG` rejects on `img.onerror`
   (`export.ts:113-116`) — reachable whenever the 1×1-canvas SVG round-trip fails to rasterise,
   which includes any colour string the `<img>` decoder rejects inside the inline SVG. The user
   clicks *Export → PNG*, nothing downloads, and the only trace is a console line they will never
   open. No toast, no dialog, no card feedback.
2. **The `switch` has no `default`.** An unrecognised `format` falls through every case, exits the
   `try` normally, and returns `undefined`. That is not even a `console.warn`-only result — it is
   a **silent total no-op with no diagnostic of any kind**. It is reachable by construction: see
   P5-3, where `format` is typed `string` and produced by a hand-written translation table.

**The pane already owns the correct channel and does not use it.** Fourteen lines above the export
wiring, `PalettesPane.vue:199-209` routes the *publish* result through the card's exposed
feedback surface:

```ts
async function onPublish(palette: Palette) {
    const result = await pm.onPublish(palette);
    …
    const card = cardRefs[id];
    if (card) card.showFeedback(result.message, result.success ? "success" : "error");
}
```

`showFeedback` is a real `defineExpose` on `PaletteCard.vue:244`. Publish gets a visible terminal
state; export — governed by a contract that *requires* one — gets a console line.

- **Severity:** BLOCKER. This is a quoted-spec violation at the seat this component owns, on the
  user-facing failure path, with the correct mechanism already present in the same file.
- **Mechanism:** the shipping exporter predates the contract (L-2). It was never re-fitted to the
  contract's operation-state requirement because the contract was satisfied by the *other*
  implementation, which the app does not call.
- **Reproduction:** `http://localhost:9000/#/palettes`, save a palette, card menu →
  *Export → PNG*, with a colour the inline-SVG decoder rejects. Nothing downloads; DevTools
  console shows `Export failed: Error: Failed to load SVG for PNG conversion`; the UI is unchanged.
  (Mechanism confirmed from source; the specific decoder-rejecting colour was not enumerated this
  pass — that half is a hypothesis. The `default`-less `switch` needs no such qualifier: it is a
  total no-op for any input outside the five literals, unconditionally.)
- **Cure:** `onExport` returns a discriminated `ExportOutcome`
  (`{ ok: true } | { ok: false; reason: … }`); the pane routes it into the same `showFeedback`
  seat as publish. Close the format union (P5-3) so the missing `default` becomes a `never`
  exhaustiveness error rather than a silent branch. This lands with the L-2 cure, not after it —
  the certified `export/` tree is the one that should carry `useExport`.

---

## P5-2 — MAJOR — the shipped/certified divergence is 5-of-5 formats; two more are quotable against the authority

Pass 2's L-2 tabulated the **CSS** divergence (token prefix / index base / colour spelling). At
pass 5 the same comparison over the remaining four formats shows every one of them differs, and
two differ against clauses quotable verbatim.

**Tailwind** — `docs/tranches/V/PALETTE-CONTRACT.md` Appendix W51 §2, verbatim:

> "Extensions are JSON `.json`, CSS `.css`, Tailwind `.tailwind.json`, SVG `.svg`, and PNG
> `.png`. … MIME/extension pairs are exact: … `application/json;charset=utf-8`/`.tailwind.json` …"

| | shipped (`export.ts:39-59`) | contract (`export/canonical.ts:74-88`) |
|---|---|---|
| extension | `.tailwind.ts` (`:57`) | `.tailwind.json` (`:77`) |
| MIME | `text/typescript` (`:58`) | `application/json;charset=utf-8` (`:85`) |
| body | a TypeScript module — `// Tailwind config for "…"\nexport default {…}` (`:55`) | RFC-8785 canonical JSON + one LF |

The shipped artefact is not a malformed instance of the contract's format; it is a **different
media type**. A consumer pipeline that accepts `.tailwind.json` cannot read it at all.

**SVG** — Appendix W51 §6, as quoted in the certified implementation's own header
(`demo/palettes/export/svg.ts:2-6`):

> "No XML declaration, **no text rendering, font**, external reference, CSS, metadata, script,
> event attribute, animation, filter, image, foreignObject or embedded data URL."

`export.ts:74`, the shipping SVG:

```ts
`  <text x="${width / 2}" y="${swatchH + 20}" text-anchor="middle" font-family="system-ui, sans-serif" font-size="14" fill="#333">${palette.name}</text>`,
```

A `<text>` element with a `font-family` — two of the named prohibitions in one line, plus
`fill="#333"`, a non-canonical colour spelling, and `${palette.name}` interpolated **unescaped**
into XML (the certified path routes every such value through `xmlEscape`, `svg.ts:16`). A palette
named `A & B` produces malformed XML from the shipping exporter and valid XML from the certified
one.

**JSON / PNG** differ in the same direction (raw `c.css` strings and a `slugify(name)` filename
vs canonical fixed-point `oklch()` and `<slug>--w<rev>`), already covered by L-2/L-4.

- **Severity:** MAJOR (the BLOCKER weight sits on P5-1 and L-2; this bounds their blast radius).
- **Mechanism:** identical to L-2 — a pre-contract implementation left on the shipping route.
- **Reproduction:** save a palette named `A & B`; card menu → *Export → SVG*. The downloaded file
  contains a raw `&` inside `<text>`; opening it in any XML parser errors.
- **Cure:** the L-2 cure. No partial fix is coherent — patching `.tailwind.ts` → `.tailwind.json`
  on the legacy path would produce a *third* artefact conforming to neither implementation.

---

## P5-3 — MAJOR — three vocabularies for one closed union, bridged by a hand-written table, while the union already exists unused

The export format crosses four module boundaries and is spelled differently at three of them.

```
demo/palettes/browser/card/PaletteCard/PaletteCardMenu.vue:113-126
    $emit('action', 'exportJSON')      ← vocabulary 1: action verbs
    $emit('action', 'exportCSS') … 'exportTailwind' … 'exportSVG' … 'exportPNG'

demo/palettes/browser/card/PaletteCard/PaletteCard.vue:308-312
    exportJSON:     () => emit("export", props.palette, "json"),      ← the translation table
    exportCSS:      () => emit("export", props.palette, "css"),
    exportTailwind: () => emit("export", props.palette, "tailwind"),
    exportSVG:      () => emit("export", props.palette, "svg"),
    exportPNG:      () => emit("export", props.palette, "png"),

demo/palettes/usePaletteExport.ts:12
    async function onExport(palette: Palette, format: string)         ← vocabulary 2, UNTYPED

demo/palettes/export/types.ts:8
    export type ExportFormat = "json" | "css" | "tailwind" | "svg" | "png";
                                                        ← vocabulary 3: the closed union,
                                                          imported by nothing in the app
```

```console
$ grep -rn --include='*.ts' --include='*.vue' 'ExportFormat' demo/ | grep -v 'demo/palettes/export/' | grep -v demo/test
(no output)
```

The union that would delete the translation table and close the parameter **already exists, is
already correct, and is already the contract's own spelling** (`export/types.ts:8`, byte authority
Appendix W51 §1). It is unreachable from the app only because it sits in the tree the app does not
import (L-2).

`format: string` is the type-lie that makes P5-1's missing `default` unrepresentable in the type
system: a typo in `PaletteCard.vue:308-312` compiles, propagates, matches no case, and exports
nothing, silently.

- **Severity:** MAJOR.
- **Mechanism:** the same dual-tree root cause. Vocabulary 1 exists because the dropdown emits a
  single `action` string for *all* card actions (delete/publish/rename/export…); vocabulary 2
  exists because the legacy exporter predates the union; vocabulary 3 is the contract's.
- **Reproduction:** change `exportSVG: () => emit("export", props.palette, "svg")` to `"SVG"` in
  `PaletteCard.vue:311`. `npx vue-tsc -p tsconfig.demo.json --noEmit` passes; `npx eslint` passes;
  the menu item becomes a silent no-op. (Not executed — `demo/` is read-only to this seat. The
  compile-time half is certain from `format: string`; the runtime half follows from the
  `default`-less `switch`.)
- **Cure:** `PaletteCardMenu` emits `ExportFormat` on a dedicated `export` event; delete
  `PaletteCard.vue:308-312`; `onExport(palette, format: ExportFormat)`. One vocabulary, three
  boundaries, zero translation.

---

## P5-4 — MAJOR — the local pane's editor lives inside the remote-browse mega-feature and is published in its seam

`CurrentPaletteEditor.vue` (13.8 KB) — the editor for the user's **unsaved working palette**, the
single largest child `PalettesPane` renders (`PalettesPane.vue:41-54`) — lives at:

```
demo/palettes/browser/card/CurrentPaletteEditor.vue
```

and is re-exported from the browse feature's declared public API, `browser/index.ts:24`, whose
header (`:1-8`) states:

> "palette-browser — the mega-feature's TOP-LEVEL SEAM (U.W-DEMO · U-F47). The stable public API
> of the palette-browser feature … External consumers reach the feature through THIS seam."

Its only consumer anywhere in the repo is the **local library** pane:

```console
$ grep -rn 'CurrentPaletteEditor' demo/ | grep -v 'browser/card/CurrentPaletteEditor.vue:'
demo/palettes/PalettesPane.vue:41       <CurrentPaletteEditor
demo/palettes/PalettesPane.vue:137          CurrentPaletteEditor,
demo/palettes/browser/index.ts:24           CurrentPaletteEditor,
demo/palettes/browser/card/index.ts:9   export { default as CurrentPaletteEditor } from "./CurrentPaletteEditor.vue";
```

There is no reading under which the editor of an unsaved local draft is part of the *remote
community browse* feature's public API. What has actually happened is that `browser/` absorbed
every palette component that is not a top-level pane. Its `card/` sub-barrel now holds three
distinct populations:

| population | members | true owner |
|---|---|---|
| genuinely shared card primitives | `PaletteCard/`, `PaletteColorStrip`, `SwatchHoverMenu`, `PaletteCardGrid` | a peer `palettes/card/` — used by **both** panes and by 3 workbenches (`MixSourceSelector.vue:8`, `GenerateControls.vue:16`, `ExtractWorkbench.vue:200`) |
| local-library-only | `CurrentPaletteEditor` | `palettes/library/` |
| browse-only | `PaletteCardSkeleton`, `ShadowPalette` | `palettes/browse/` (and see P5-5) |

This is the same failure as a god module, one level up: a **god directory**. The seam is honest
about being a public API; it is dishonest about *whose*.

- **Severity:** MAJOR. It is the reason `PalettesPane` — the local pane — must import from a
  directory named `browser`, which is exactly the "reaching across a boundary" this axis exists to
  find; and it is why P5-5's over-fetch has anything to over-fetch.
- **Mechanism:** U-F47 created the seam around the *then*-largest feature and subsequent
  components were filed by shape (a card) rather than by owner (which pane needs it).
- **Reproduction:** structural; the grep above is the whole proof.
- **Cure:** three peers under `demo/palettes/` — `card/` (shared primitives, owned by neither),
  `library/` (LibraryPane + CurrentPaletteEditor), `browse/` (BrowsePane + skeleton + shadow).
  `browser/` as a name disappears; nothing named `browser` is imported by the local pane.

---

## P5-5 — MINOR — the card barrel's tree-shake claim is false in dev and unverifiable in prod

`demo/palettes/browser/card/index.ts:2-3` makes a specific engineering claim:

> "NAMED re-exports only (PI-6: never a star re-export — SFC scoped `<style>` is a side-effecting
> import; **named re-exports let the bundler tree-shake unused members per consumer** — so
> reaching the seam for one symbol does not pull every sibling SFC's style into the consumer's
> chunk)."

`PalettesPane` renders neither `PaletteCardSkeleton` nor `ShadowPalette`. Measured live
(Playwright network log, `http://localhost:9000/#/palettes`, after a hard reload):

```
260. [GET] .../demo/palettes/browser/card/PaletteCardSkeleton.vue                            => [200] OK
280. [GET] .../demo/palettes/browser/card/PaletteCardSkeleton.vue?vue&type=style&…&lang.css  => [200] OK
261. [GET] .../demo/palettes/browser/card/ShadowPalette.vue                                  => [200] OK
269. [GET] .../demo/palettes/browser/card/ShadowPalette.vue?vue&type=style&…&lang.css        => [200] OK
```

Both modules **and both scoped stylesheets** — the precise thing the comment says named
re-exports prevent. The premise is right (a scoped `<style>` is a side effect) but the conclusion
does not follow: named re-exports control *binding* reachability, not *module* side-effect
reachability. Rollup retains a module whose graph contains a side effect regardless of whether any
of its bindings are used, unless `moduleSideEffects` says otherwise — and nothing in this repo
sets it.

Dev is settled by the log above. **Prod cannot be checked at this HEAD** — see P5-7 — so the PI-6
claim currently rests on assertion in the one environment where it might have been true.

- **Severity:** MINOR (correctness of a documented invariant, plus dev-loop cost; the shipped cost
  is unmeasured).
- **Mechanism:** a barrel that aggregates SFCs with scoped styles cannot be side-effect-free.
- **Reproduction:** the pasted log. Repeat: navigate to `/#/palettes`, hard reload, filter the
  network panel on `browser/card`.
- **Cure:** P5-4's split removes the shared/browse-only mixing that makes the barrel over-broad;
  after it, `library/` imports `card/` (all of which it uses) and never sees the browse-only pair.
  If a barrel over a side-effecting SFC set is still wanted, `"sideEffects"` must be declared in
  `package.json` and the claim re-measured against a real production build.

---

## P5-6 — MINOR — the class on this pane's root element is defined inside a descendant's unscoped `<style>`

`PalettesPane.vue:2` puts `pane-scroll-fade` on the pane's **root** `<Card>`:

```html
<Card tier="resting" class="pane-scroll-fade w-full mx-auto overflow-y-auto …">
```

The rule that gives it meaning lives in an **unscoped** `<style>` block inside
`demo/shared/ui/PaneHeader.vue` — a component the pane renders as a *child*
(`PalettesPane.vue:10`):

```css
/* demo/shared/ui/PaneHeader.vue:54-57 */
.pane-scroll-fade {
    contain: layout style paint;
    scroll-timeline: --pane-scroll block;
}
```

Nine sibling panes carry the class:

```console
$ grep -rn 'pane-scroll-fade' demo/ --include='*.vue' --include='*.css'
demo/palettes/PalettesPane.vue:2            demo/palettes/BrowsePane.vue:2
demo/palettes/admin/AdminPane.vue:2         demo/scenes/about/AboutPane.vue:4
demo/scenes/ConfigSliderPane.vue:106        demo/workbenches/gradient/GradientPane.vue:20
demo/workbenches/mix/MixPane.vue:62         demo/workbenches/generate/GeneratePane.vue:31
demo/workbenches/extract/ExtractPane.vue:5
demo/shared/ui/PaneHeader.vue:54            ← the sole definition
demo/styles/foundation.css:578              ← a comment recording the move
```

All nine depend on a **global side effect emitted by a descendant SFC**. The named
scroll-timeline `--pane-scroll` is the producer for `PaneHeader`'s own veil/shrink animations
(`PaneHeader.vue:158-176`), so the coupling is currently self-consistent — but the *definition*
of a class applied to nine components' roots is not the child's to own. The file itself records
the reasoning (`PaneHeader.vue:41-52`): the block "must be UNSCOPED to reach those consumers" and
is colocated "because PaneHeader owns the only consumers of `--pane-scroll`". The first clause is
the tell: the moment a rule must be unscoped to reach its consumers, it is global, and colocation
stops being colocation.

Standing law (edict 6) already assigns the home: *"Global keyframes live in `demo/styles/`."* The
same reasoning covers a global class.

- **Severity:** MINOR (no live defect; a latent one — deleting or lazily-loading `PaneHeader`
  silently removes scroll containment and the timeline from nine unrelated panes).
- **Mechanism:** a D.W4-era colocation pass moved a global rule out of `styles/style.css` into the
  component that consumes its *variable*, conflating "who reads the token" with "who owns the
  class".
- **Reproduction:** structural; the grep is the proof.
- **Cure:** `.pane-scroll-fade` → `demo/styles/foundation.css` (where `:578` already documents its
  absence). `PaneHeader.vue` keeps only its `scoped` block. Zero behaviour change.

---

## P5-7 — INFO — the repo's own production build emits no application chunk; this bounds P4-3 and blocks P5-5

```console
$ ls dist/gh-pages/assets/*.js | wc -l
       2
$ ls -la dist/gh-pages/assets/index-Dezn_h7o.js
-rw-r--r--  1 mkbabb  staff  698 Jul 29 10:23 dist/gh-pages/assets/index-Dezn_h7o.js
$ grep -c modulepreload dist/gh-pages/index.html
0
$ grep -n '<script' dist/gh-pages/index.html
159:        <script>
205:        <script type="module" crossorigin src="./assets/index-Dezn_h7o.js"></script>
```

The single module script the built page loads is 698 bytes whose entire content is Vite's
modulepreload-polyfill IIFE. No app code, no `modulepreload` links, one unrelated worker chunk.
This is the carried **gh-pages prod-preview empty-mount** (CARRY-LEDGER §F, named as the first
deep-audit probe) — out of this seat's axis and owned elsewhere.

Recorded here because it has two consequences *on* this axis:

1. It explains P4-3's methodology. Pass 4 measured glass-ui's shipped delta at 969 bytes by
   hand-driving esbuild; it had to, because the repo's own production build produces nothing to
   measure.
2. It blocks P5-5. The card barrel's tree-shake claim is a claim about production bundling, and
   production bundling emits no bundle at this HEAD.

Any finding in this component's neighbourhood that turns on chunking, tree-shaking or code-split
boundaries is **unverifiable in prod until the empty-mount is cured** — pass 5 states that
limitation rather than reporting dev numbers as if they were shipped ones.

---

## P5-8 — re-verification, strengthens P4-4 — the demo's module-lattice lint is dead, and there is a third cause

P4-4 established that G-DEMO-1 / G-DEMO-3a / G-DEMO-3b glob a tree W43 deleted. Pass 5 confirms
it with a sharper instrument — ESLint's own resolved configuration for the subject file — and
adds a third independent cause.

**Instrument 1 — the subject file is subject to no import restriction at all:**

```console
$ npx eslint --print-config demo/palettes/PalettesPane.vue \
    | node -e "…console.log(c.rules['no-restricted-imports'])"
no-restricted-imports = undefined
```

Same result for `demo/palettes/browser/card/PaletteCardGrid.vue` and
`demo/workbenches/mix/MixSourceSelector.vue` (a cross-feature consumer of `palettes/browser/card`,
precisely the edge G-DEMO-3b exists to police): `undefined`.

**Instrument 2 — the one glob that still matches real files gets an unfireable rule:**

```console
$ npx eslint --print-config demo/color-picker/App.vue | …
[2,{"patterns":[{"group":["@components/custom/palette-browser/**/*.vue"],
   "message":"G-DEMO-3b: reach palette-browser through its barrel seam, never a raw .vue file."}]}]
```

The rule is active on 16 files. Its pattern can never match anything. Three independent reasons,
any one sufficient:

1. **The file globs point at a deleted tree** (P4-4's finding, re-verified):
   ```console
   $ ls -d 'demo/@'
   ls: demo/@: No such file or directory
   $ find 'demo/@' -type f 2>/dev/null | wc -l
          0
   ```
   `demo/@/components/**`, `demo/@/lib/**`, `demo/@/composables/**` match zero files.
   `demo/palettes/**` is in **no** glob.
2. **The patterns use an alias W43 killed:**
   ```console
   $ grep -rn '"@components|@components/' vite.config.ts vitest.config.ts tsconfig*.json
   (no output)
   $ grep -rn 'from "@components' demo/ | wc -l
          0
   ```
   No alias definition anywhere, zero usages. A `no-restricted-imports` `group` matches the
   *written specifier*; no specifier in the repo is written that way.
3. **The directory named does not exist** (new at pass 5):
   ```console
   $ find . -type d -name 'palette-browser' -not -path './node_modules/*'
   (no output)
   ```
   The feature is `demo/palettes/browser/`. Even had the alias survived, `palette-browser` names
   nothing.

**Why this is the keystone of the whole axis.** Every finding in passes 1–5 — the dual export tree
(L-2), the `demo/ui` shim half-migration (L-6), the shell→feature edge (L-3), the `browser/` god
directory (P5-4), the local pane importing from `browser/` — is exactly the class of defect these
three rules were written to make impossible, and every one of them landed in a region the rules do
not cover, under a CI gate the repo runs **hard**. The lint is not weak; it is aimed at coordinates
that no longer exist.

Compounding, and re-verified at pass 5 (this is L-19's mechanism, restated with the resolved
config rather than the source):

```console
$ npx eslint --print-config demo/palettes/PalettesPane.vue | … '@typescript-eslint/no-unused-vars'
[0]
$ grep -n 'noUnusedLocals|noUnusedParameters|strict' tsconfig.base.json
7:        "strict": true,
```

Unused-vars is **off** for this region (`eslint.config.js:185-186`) and `noUnusedLocals` is unset,
which is why `PalettesPane.vue:128`'s three dead `vue` imports (`watch`, `onMounted`, `nextTick` —
0 occurrences after line 154, verified per identifier at pass 5) survive a `--max-warnings=0` gate.

- **Severity:** MAJOR (carried at P4-4's severity; pass 5 adds cause 3 and the resolved-config
  instrument).
- **Cure:** re-anchor to the tree that exists —
  `files: ["demo/palettes/**","demo/workbenches/**","demo/scenes/**","demo/picker/**","demo/shell/**"]`,
  `group: ["**/palettes/browser/**/*.vue","**/palettes/admin/**"]` — and add the edge this axis
  found missing: `demo/shell/**` may import `palettes/ports/keys` and nothing else from
  `palettes/**` (L-3, L-5). Then re-enable `@typescript-eslint/no-unused-vars` with
  `argsIgnorePattern: "^_"`, which is what the "destructure-and-discard" rationale at
  `eslint.config.js:10` actually calls for.

---

## P5-9 — re-verification of the prior claims pass 5 relies on, at HEAD `d19da6d3`

Every load-bearing prior claim that pass 5 builds on, re-run this pass. All confirmed.

**L-2 — the dual export path, disjoint consumer sets:**
```console
$ grep -rn --include='*.ts' --include='*.vue' 'from "\./export"|palettes/export"' demo/ test/ e2e/
demo/palettes/usePaletteExport.ts:9:} from "./export";

$ grep -rn --include='*.ts' --include='*.vue' 'export/serializers|export/png|export/svg|export/json|export/css|export/tailwind|export/reload|export/digest|export/canonical' demo/ test/ e2e/
demo/test/export/byte-exact.test.ts:23:} from "../../palettes/export/serializers";

$ wc -l demo/palettes/export/*.ts demo/palettes/export.ts demo/test/export/*.ts
     869 total (export/, 12 modules)     132 export.ts     453 byte-exact.test.ts
```
Confirmed live — `/#/palettes` fetches `export.ts` (request 266) and zero `export/` modules. The
dual path is still documented as deliberate at `export/serializers.ts:6-9`.

**L-3 — the port-key co-location, now with a live network measurement rather than a static
closure.** On `/#/palettes` — an **unauthenticated, non-admin** route — the browser fetches the
entire admin console's composables and API surface:
```
158. useAdminUsers.ts    163. useAdminAudit.ts   164. useAdminFlagged.ts   165. useAdminTags.ts
238. api/admin-palettes.ts  239. api/admin-users.ts  240. api/admin-colors.ts  241. api/admin-audit.ts
```
Static runtime-graph walk (type-only imports excluded, 60-line resolver, scratchpad):

| entry | runtime modules | of which `demo/palettes` |
|---|---:|---:|
| `demo/palettes/PalettesPane.vue` | 68 | 44 |
| `demo/palettes/usePalettePorts.ts` | 31 | 23 |
| `demo/shell/dock/Dock.vue` | 65 | **23** |

`Dock.vue` needs one `Symbol` (`SESSION_PORT_KEY`) and pays 23 palettes modules for it. Five shell
files import from `demo/palettes/` (`Dock.vue:18`, `DockViewSelect.vue:8`, `SlugEditLayer.vue:5`,
`ProfileSection.vue:14`, `MobileMenuDropdown.vue:13`) while `usePalettePorts.ts:19` imports
`type { ViewId }` back from `../shell/useViewManager` — type-only, so erased, so no *runtime*
cycle, but a declared type-level cycle over a 23-module one-way runtime tax.

**L-6 — 19 shims, half-migrated, both idioms in the subject file:**
```console
$ for d in demo/ui/*/; do echo "$(basename $d) lines=$(wc -l < $d/index.ts)"; done
alert 11 · avatar 1 · badge 1 · button 1 · card 1 · checkbox 1 · collapsible 1 · dialog 1
dropdown-menu 1 · input 1 · label 1 · popover 1 · radio-group 1 · select 1 · separator 1
skeleton 1 · slider 1 · switch 1 · tooltip 1
$ cat demo/ui/card/index.ts
export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@mkbabb/glass-ui";
$ grep -rn 'ui/(card|button|badge|…)"' demo/ | wc -l   →  92
$ grep -rn 'from "@mkbabb/glass-ui'      demo/ | wc -l   → 119
```
`PalettesPane.vue:129-131` uses the shim; `:148-149` uses the direct subpath. Eleven shim modules
are fetched on `/#/palettes` purely to forward a name. glass-ui installed version confirmed
`7.0.0`, matching `package.json#dependencies ^7.0.0`.

**L-4 — three name→identifier homes**, re-confirmed at `utils.ts:3`, `export.ts:9`,
`export/canonical.ts:52-72` (the last stating the invariant the codebase already knows: *"The
prefix already satisfies the token grammar; no slugifier exists."*).

**L-8/L-19 — three dead `vue` imports** at `PalettesPane.vue:128`, 0 occurrences in `:154-212`,
`eslint` exit 0.

**L-13 — the `$el` reach.** `PalettesPane.vue:180-181` still reaches
`(sortableGridRef.value as any)?.$el`; `PaletteCardGrid.vue` still has **no** `defineExpose`
(`grep -n defineExpose` → no match); and its template still carries the load-bearing comment
(`:7-11`) constraining its own root-node shape *because the parent reads `$el`*. Pass 5 adds only
the observation that the constraint is written into the **child**: an editor who moves that
comment one line up silently breaks drag-to-reorder, and no gate in the repo says so.

---

## P5-10 — the negative proof, re-affirmed with resolution evidence

The axis brief's headline hypothesis — *"a demo import a real consumer could not write, and
therefore a false proof of the public API"* — is **false at the specifier level**. Pass 2 asserted
this; pass 5 re-runs it and adds the mechanism that makes it structural rather than incidental.

```console
$ grep -rn --include='*.ts' --include='*.vue' 'from "[^"]*\.\./src/' demo/
(no output)
```

Zero deep reaches into `src/` from anywhere in `demo/`. Every library import is a published
subpath, and every one appears in `package.json#exports`:

```console
$ grep -rn 'from "@mkbabb/value\.js' demo/ | awk -F'-> ' '{print $2}' | sort | uniq -c
  24 "@mkbabb/value.js/color";     10 "@mkbabb/value.js/css";      6 "@mkbabb/value.js/math";
   5 "@mkbabb/value.js/easing";     4 "@mkbabb/value.js/quantize";
```

`exports` declares `./color ./value ./css ./easing ./math ./transform ./quantize`, each backed by
a real `src/subpaths/*.ts`. **This cannot drift**, and that is the structural part:
`vite.config.ts:36-47` *generates* the self-alias set by reading `package.json#exports` at config
time — `:28`, verbatim: *"GENERATED (not hand-rolled) so the alias set can never drift from the
exports map: add or rename a subpath in `package.json#exports` and the alias follows."* It is
built in **array** form specifically because string aliases are prefix rewrites that would mangle
`/math` (`:30-35`, `:59-66`), and each alias resolves to `conditions.import` — the **published**
`dist/subpaths/*.js`, not source.

The package deliberately has **no root export** and no `main`/`module`/`types`:
```console
$ node -e "…" → main: undefined | module: undefined | types: undefined | exports has ".": false
$ node -e "require.resolve('@mkbabb/value.js')" → resolve error: ERR_PACKAGE_PATH_NOT_EXPORTED
```
and `README.md:15-21` documents subpath-only consumption, matching exactly. Coherent, not broken.

`PalettesPane.vue` imports nothing from the library directly — correct: it is a list/CRUD surface
over a localStorage store, and colour maths does not belong in it. The library enters its closure
only through `../color-session/*` and `./mix.ts` (`mix.ts:10-14` — `mixColors`, `AnyColor`,
`HueInterpolationMethod` from `@mkbabb/value.js/color`, a clean published-subpath edge).

**The qualification that keeps this from being an unconditional negative** is pass 4's P4-1, which
stands: the *specifiers* are honest, but `@mkbabb/value.js/css` type-checks against the installed
4.0.0 tarball's `.d.ts` while Vite executes the local build. The published **surface** is sound;
the **gate over it** is not. Pass 5 changes nothing about that finding and does not weaken it.

Also sound, and preserved by every cure proposed across five passes:
`usePaletteStore.ts:20-45`'s lazy module-singleton (one localStorage binding, SSR- and
Safari-private-browsing-safe); the `K-PALID` id-honesty work (`types.ts:16-27`,
`usePaletteActions.ts:34-38`) that made `Palette.id` honestly optional instead of a type-lie; the
`save-P0` local-first inversion (`usePaletteActions.ts:66-76`) that stopped a network call
destroying a save; and `PalettesPane.vue:16-25`'s treatment of the count badge (`aria-hidden` plus
an `sr-only` companion), which is exactly right.

---

## Pass-5 deltas to the greenfield lattice

The lattice proposed by passes 1–4 (below, unchanged) is correct and pass 5 adopts it. Four
amendments follow from the new findings:

1. **`palettes/card/` becomes a first-class peer** of `library/`, `browse/` and `admin/` — shared
   card primitives owned by neither pane, with `CurrentPaletteEditor` moved into `library/` and
   the skeleton/shadow pair into `browse/`. The name `browser` disappears. (P5-4; it also removes
   P5-5's over-fetch surface by construction.)
2. **`export/useExport.ts` returns an `ExportOutcome`**, routed by the pane into the card's
   existing `showFeedback` seat, and the dispatch is keyed on `ExportFormat` so the missing
   `default` becomes a `never` exhaustiveness error. `usePaletteExport.ts` and `export.ts` both
   delete. (P5-1, P5-3.)
3. **`PaletteCardMenu` emits `ExportFormat`** on a dedicated event; `PaletteCard.vue:308-312`
   deletes. One vocabulary across all four boundaries. (P5-3.)
4. **`.pane-scroll-fade` moves to `demo/styles/foundation.css`**, where `:578` already documents
   its absence; `PaneHeader.vue` keeps only its `scoped` block. (P5-6.)

And one process amendment: **re-anchor the lint before, not after, the restructure** (P5-8).
Every defect this axis found across five passes landed in a region the module-lattice lint was
believed to be guarding. A restructure landed under a lint aimed at deleted coordinates will
decay back to this state; a restructure landed under a lint aimed at the real tree cannot.

---

## Pass-5 finding index

| id | severity | one line | primary evidence |
|---|---|---|---|
| P5-1 | **BLOCKER** | the export failure path is the `console.warn`-only result the byte authority names and forbids; plus a `default`-less `switch` that is a silent total no-op | `usePaletteExport.ts:11-27`; `PALETTE-CONTRACT.md:174` (verbatim); `PalettesPane.vue:199-209` vs `:211` |
| P5-2 | MAJOR | shipped/certified divergence is 5-of-5 formats: Tailwind is a different **media type**; SVG emits `<text font-family>` + unescaped XML against a clause forbidding both | `export.ts:39-59,74` vs `canonical.ts:74-88`, `svg.ts:2-6,15-19`; Appendix W51 §2/§6 |
| P5-3 | MAJOR | three vocabularies for one closed union, bridged by a hand-written 5-line table; the union already exists, imported by nothing | `PaletteCardMenu.vue:113-126`; `PaletteCard.vue:308-312`; `usePaletteExport.ts:12`; `export/types.ts:8` |
| P5-4 | MAJOR | the local pane's editor lives in the remote-browse feature and is published in its seam; `browser/` is a god directory | `browser/card/CurrentPaletteEditor.vue`; `browser/index.ts:1-8,24`; sole-consumer grep |
| P5-5 | MINOR | the card barrel's PI-6 tree-shake claim is false in dev, unverifiable in prod | live reqs 260/261/269/280; `card/index.ts:2-3` |
| P5-6 | MINOR | the pane's **root** class is defined in a **descendant's** unscoped `<style>`; 9 panes depend on it | `PalettesPane.vue:2`; `PaneHeader.vue:41-57`; `foundation.css:578` |
| P5-7 | INFO | the production build emits no app chunk (698 B polyfill, 0 modulepreload links) — bounds P4-3, blocks P5-5 | `dist/gh-pages/assets/index-*.js`; `index.html:205` |
| P5-8 | MAJOR (carried) | the module-lattice lint is dead — three independent causes, the third new; `--print-config` on the subject returns `undefined` | `eslint --print-config` ×3; `ls demo/@`; `find -name palette-browser` |
| P5-9 | — | re-verification of L-2/L-3/L-4/L-6/L-8/L-13 at `d19da6d3` | commands pasted in-section |
| P5-10 | — | negative proof re-affirmed with the generated-alias mechanism; qualified only by P4-1 | `vite.config.ts:28,36-47`; `ERR_PACKAGE_PATH_NOT_EXPORTED`; `README.md:15-21` |

**Visual-axis attribution (pass 5).** `REPORT.json` rows for `/#/palettes`, all four matrices:
`pageErrors 0`, `consoleErrors 0`, `overflowX 0`, `main 1`, no blank/near-blank. The
`namelessButtons: 1` (desktop only) and every `smallTapTargets` entry — `Switch to slug` /
`Generate new slug` / `Cancel` at 22×22, the L/a/b/α channel spans at 12×24, an unlabelled 160×23
input — originate in `PaletteSlugBar`, the picker sliders and the dock. **None is rendered by
`PalettesPane.vue`.** The screenshot `shots/safari-desktop-light/palettes.png` renders the pane
correctly (header ramp, search, empty-plate state) in all four matrices. Nothing on the visual
axis is attributable to this component at this HEAD; the pass-3 dark-ramp finding (L-18) concerns
the token layer, not the pane's markup, and is unchanged.

---
---

*Everything below this line is pass 4's file, carried forward verbatim.*

---
---

# CHALLENGE-L — PalettesPane: library structure

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]`, the 1M-context Opus 5
variant. This matches the explicit declaration under which this seat was spawned. The seat is
declared, not inherited. (Passes 1, 2 and 3 recorded the same receipt.)

## Amendment notice — pass 4

**This is a fourth Opus-5 pass.** Pass 3's file is preserved verbatim at
`challenge-L-library.pass-3-prior.md`. Nothing from any prior pass is deleted.

Pass 4 changed method rather than repeating one. Where passes 1–3 measured the **static** import
closure and **on-disk** artefact sizes, pass 4 measured (a) the **live Vite dev-server module
graph** — the actual byte stream the browser fetches for this pane's lazy chunk — (b) **production
bundle output** with the repo's own esbuild, and (c) **TypeScript's actual resolution decisions**
via `tsc --traceResolution`. Three of those measurements change prior conclusions:

- **P4-1 (BLOCKER, corrects L-21 and its cure).** Passes 2 and 3 assert twice — line 1108 and
  line 1241 — that `@mkbabb/value.js` is *"self-linked into its own `node_modules`"*. **It is
  not a symlink.** It is a real, installed **4.0.0 tarball, 10 days older than the local build**.
  So `/css` — the one subpath with no `paths` entry — type-checks against a *stale published
  artifact* while Vite executes the *local* one. L-21's proposed cure (delete all four
  `@mkbabb/value.js*` `paths` entries) would extend that split from **one subpath to all seven**.
  It is an anti-cure and must not be executed as written.
- **P4-2 (measurement, sharpens L-3).** L-3's cost was stated as a 97-module static closure.
  Measured live: removing the key co-location eliminates **27 modules / 262,662 served bytes**
  from the pane's chunk. L-3 now carries a served-byte number, not an estimate.
- **P4-3 (scoping correction, bounds L-6 and L-23).** L-23 measured the glass-ui root barrel at
  218.9 KiB on disk. Measured through a production bundler the shipped delta is **969 bytes** —
  glass-ui tree-shakes correctly. L-6's cure stands on *second-naming-authority* grounds; it must
  **not** be escalated on bundle size. The same correction applies to the `@mkbabb/value.js/css`
  god-barrel: tree-shaking recovers 25,762 of 38,540 B.
- **P4-4 (new, MAJOR).** The three eslint rules that are supposed to enforce the demo module
  lattice — G-DEMO-1, G-DEMO-3a, G-DEMO-3b — **glob a directory tree that W43 deleted**. Zero
  files match. No rule globs `demo/palettes/**` at all. This is the mechanism by which twenty-odd
  findings coexist under a HARD `--max-warnings=0` gate.
- **P4-5 (new, INFO).** Two module-specifier dialects in one program.

Pass 4 also re-verified, at this HEAD, every pass-1..3 claim it relies on: the seven-key
`exports` map with no root, the 19 `demo/ui/` shims, the dual export path, the `reorderPalettes`
partial-order completion behind L-17, and the root-barrel importer set. All confirmed; commands
pasted at P4-6.

## Amendment notice — pass 3

This file was written by an Opus-5 seat at HEAD `32b4040e` (pass 1) and amended by a second
Opus-5 seat at HEAD `e79fcd43` (pass 2). **This is a third Opus-5 pass.** Nothing from either
prior pass is deleted.

Pass 3 independently **re-verified the three load-bearing pass-2 claims** (L-11 phantom
tsconfig keys, L-12 dist-has-no-external-imports, L-13 glass-ui ships `SortableList`) — all
three confirmed, commands pasted at L-23. It then **seeded the saved-palette surface and drove
it**, which neither prior pass nor the visual matrix ever did, and that produced:

- **two corrections to pass 2** — its closing negative proof ("no library-structure defect is
  visible in the render") is **withdrawn**: the render was never exercised with data (L-22),
  and once it is, a defect is visible in both dark matrices and measurable in tokens (L-18);
- **a second, independent reorder-corruption mechanism** that survives every cure proposed for
  L-1, promoted to BLOCKER (L-17);
- three further findings (L-19, L-20, L-21).

Pass 3 also **corrects pass 2's L-11 in the opposite direction**: pass 2 found three *phantom*
keys in `tsconfig.demo.json`. It missed that a **real, 10-site subpath (`./css`) is absent**
from the same block (L-21).

## Substrate

- Repo `/Users/mkbabb/Programming/value.js`, branch `tranche-u`.
- **HEAD at pass 3 is `9268f054`** (`docs(V·mega): picker band COMPLETE 12/12 validated …`).
  The work order states `c654824e`; pass 1 recorded `32b4040e`; pass 2 recorded `e79fcd43`.
  The tree has moved three times under this workflow. I re-checked every pass-1 and pass-2 line
  citation I rely on and all still resolve at `9268f054`.
- Subject: `demo/palettes/PalettesPane.vue`, 212 lines, area `palettes`.

## Verdict

**DEFECTIVE.** Four BLOCKERs, fourteen MAJORs, six MINORs, two INFOs (pass-4 counts).

Pass 4's addition to the headline: **the demo's type gate does not check the library surface this
pane runs on.** `@mkbabb/value.js/css` — reached from this pane's closure via
`demo/color-session/{picker-color,ink,color-utils}.ts` — resolves under `vue-tsc` to
`node_modules/@mkbabb/value.js/dist/subpaths/css.d.ts` (published 4.0.0, 350 lines, Jul 17) and
under Vite to `dist/subpaths/css.js` (local build, 382-line `.d.ts`, Jul 27). Two artefacts, ten
days apart, one of them type-checked and the other executed. No semantic break has landed in that
window — the public export names still match — but the gate is structurally incapable of catching
one when it does. That is a *false proof of the public API*, which is precisely what this axis
exists to find (P4-1).

The strongest finding remains **drag-to-reorder**, and pass 3 makes it worse than pass 1
recorded. There are **two independent corruption mechanisms**, both reproduced live against
`localhost:9000` this run:

1. **L-1** — the vueuse `onUpdate`/`onEnd` race over a dereferenced computed. Seeded `A,B,C`,
   dragged 0→2, persisted `C,B,A`; correct is `B,C,A`.
2. **L-17 (new, BLOCKER)** — with a search filter active, a drag rewrites the order of palettes
   the user **cannot see and did not touch**. Seeded `A,B,C,D,E`, filtered to `B,D,E`, dragged
   one slot; persisted `D,B,E,A,C` — `A` and `C` flung from positions 1 and 3 to the tail.
   This one is structural, not a race: `reorderPalettes` completes a *partial* ordering by
   appending the remainder, and the pane hands it a *filtered projection*. **It survives every
   cure proposed for L-1**, including `SortableList` (L-13), because the defect is in what the
   list is, not in how the drag is bound.

The second BLOCKER is unchanged: **the palette export the app ships and the palette export the
test suite proves are different implementations that disagree by construction** (L-2).

Pass 3's headline addition: **an owner-RULED behaviour is measurably dead in dark scheme.**
Q5/T-43 ruled that the "Palettes" letterforms wear a ramp. Measured on `:root` at
`localhost:9000`: in light the three stops carry chroma `0.188 / 0.188 / 0.125`; in dark they
carry `0.0337 / 0.0211 / 0.0231` at `L=95.83%` — sRGB `(255,234,252) (255,236,238)
(255,237,228)`, a near-white monochrome. Visible in both dark screenshots. The structural cause
is exactly the three-home token split L-7 describes: producer, recipe and alias live in three
modules, so **no module is in a position to assert that the ramp is still a ramp** (L-18).

---

## The import graph, edge by edge

`PalettesPane.vue:127-152`. Every specifier traced to its home:

| # | Specifier | Resolves to | Verdict |
|---|---|---|---|
| 1 | `vue` | framework | ok — but 3 of 7 named imports unused (L-8) |
| 2 | `../ui/card` | `demo/ui/card/index.ts` → `@mkbabb/glass-ui` root | **shim (L-6)** |
| 3 | `../ui/button` | `demo/ui/button/index.ts` → `@mkbabb/glass-ui` root | **shim (L-6)** |
| 4 | `../ui/badge` | `demo/ui/badge/index.ts` → `@mkbabb/glass-ui` root | **shim (L-6)** |
| 5 | `@lucide/vue` | icon package | ok |
| 6 | `@vueuse/integrations/useSortable` | vueuse + `sortablejs@1.15.7` | **misused (L-1); superseded by glass-ui (L-13)** |
| 7 | `./usePalettePorts` | `demo/palettes/usePalettePorts.ts` | **cycle anchor (L-3)** |
| 8 | `../color-session/keys` | `demo/color-session/keys.ts` | ok — leaf keys module, correct idiom |
| 9 | `./browser/card` | `demo/palettes/browser/card/index.ts` | ok — own feature |
| 10 | `@mkbabb/glass-ui/dialog` | granular published subpath | ok — **and it contradicts #2-4** |
| 11 | `@mkbabb/glass-ui/search` | granular published subpath | ok — **and it contradicts #2-4** |
| 12 | `../shared/ui/PaneHeader.vue` | `demo/shared/ui/PaneHeader.vue` | ok — 9 real consumers |
| 13 | `./types` (`import type`) | own feature | ok — correct `import type` |
| 14 | `./usePaletteExport` | `demo/palettes/usePaletteExport.ts` | **legacy path (L-2)** |

No import from `@mkbabb/value.js` appears in this file directly; it enters the closure through
`../color-session/*` and `./mix.ts` (see the negative proof).

---

# Findings — pass 1 (carried forward, re-verified)

## L-1 — BLOCKER — drag-to-reorder is structurally miswired and persists a corrupted order

**Where:** `demo/palettes/PalettesPane.vue:180-197`.

```ts
const sortableGridRef = ref<InstanceType<typeof PaletteCardGrid> | null>(null);
const sortableEl = computed(() => (sortableGridRef.value as any)?.$el as HTMLElement | undefined);

useSortable(sortableEl, pm.filteredSaved.value, {   // ← .value: a DEREFERENCED computed
    handle: ".drag-handle",
    animation: 150,
    ghostClass: "opacity-30",
    onEnd(evt) {                                     // ← onEnd does NOT override vueuse's onUpdate
        …
        const ids = pm.filteredSaved.value.map((p) => p.id);
        const [moved] = ids.splice(evt.oldIndex, 1);
        …
        pm.reorderPalettes(ids);
    },
});
```

### Reproduction (measured, deterministic — pass 1)

Script: `scratchpad/reorder-probe2.mjs` — headless Chromium against the live dev server at
`http://localhost:9000`, `localStorage["color-palettes"]` seeded with four local palettes
`A,B,C,D`, reload, pointer-drag one `.drag-handle` onto another, read the persisted store back.

```
run1  drag 0->2  STORE=[C,B,D,A]  DOM=[PalC,PalB,PalD,PalA]
run2  drag 0->2  STORE=[C,B,D,A]  DOM=[PalC,PalB,PalD,PalA]
run3  drag 0->2  STORE=[C,B,D,A]  DOM=[PalC,PalB,PalD,PalA]
run4  drag 3->1  STORE=[A,B,C,D]  DOM=[PalA,PalB,PalC,PalD]

expected for 0->2 : BCAD
observed 0->2 set : ["CBDA"]
expected for 3->1 : ADBC  (D moves to index 1)
observed 3->1     : ABCD
```

- **Forward drag (0→2): every one of the four positions is wrong**, deterministically, 3/3.
- **Backward drag (3→1): the reorder is silently discarded** — a total no-op.

The corrupted order is written through to `localStorage` and survives reload. This is not a visual
glitch; it is data loss of user intent.

### Mechanism — three compounding structural errors

Pasted from `node_modules/@vueuse/integrations/dist/useSortable.js`:

```js
const defaultOptions = { onUpdate: (e) => {
    moveArrayElement(list, e.oldIndex, e.newIndex, e);
} };
…
sortable = new Sortable(target, { ...defaultOptions, ...resetOptions });
…
function moveArrayElement(list, from, to, e = null) {
	if (e != null) { removeNode(e.item); insertNodeAt(e.from, e.item, from); }
	const _valueIsRef = isRef(list);
	const array = _valueIsRef ? [...toValue(list)] : toValue(list);   // ← NO COPY when not a ref
	if (to >= 0 && to < array.length) {
		const element = array.splice(from, 1)[0];                     // ← SYNCHRONOUS removal
		nextTick(() => { array.splice(to, 0, element); if (_valueIsRef) list.value = array; });
	}
}
```

1. **The list argument is a dereferenced computed, not a ref.** `isRef(list)` is `false`, so vueuse
   takes the no-copy branch and splices the caller's array *in place*, and never writes back. The
   whole write-back half of vueuse's contract is dead.
2. **`onEnd` does not override `onUpdate`.** The spread is `{...defaultOptions, ...resetOptions}` —
   different keys, so vueuse's `onUpdate` survives alongside the custom `onEnd`. Both fire.
   sortablejs fires `onUpdate` *before* `onEnd`, and `moveArrayElement`'s removal is synchronous
   while its reinsertion is deferred to `nextTick`. So by the time `onEnd` reads
   `pm.filteredSaved.value`, the array is one element short and the indices `evt.oldIndex` /
   `evt.newIndex` no longer address what the user dragged.
3. **The array being mutilated is a live computed cache.** `demo/palettes/useFilteredList.ts:9`:
   `if (!q) return items.value;` — with an empty search box the computed returns
   `savedPalettes.value` *by reference*. `demo/palettes/usePaletteStore.ts:51` `savedPalettes` is
   itself a `computed`. Nothing invalidates it during the drag, so `onEnd` re-reads the same
   already-spliced cached array. A `computed` is being mutated from the outside.

### Cure — **amended by pass 2, see L-13**

Pass 1 proposed moving the sortable binding down into `PaletteCardGrid` and adding a
`movePalette(fromId, toId)` port member. The ownership half of that is right and stands. The
mechanism half is wrong: **glass-ui 7.0.0 already ships the primitive**, so the correct cure
deletes `@vueuse/integrations/useSortable` and `sortablejs` from the tree entirely rather
than relocating them. See L-13.

---

## L-2 — BLOCKER — two live export implementations; the shipped one and the tested one disagree

**Where:** `demo/palettes/export.ts` (132 L, flat file) **and** `demo/palettes/export/` (12 files,
914 L) both exist as siblings. `demo/palettes/usePaletteExport.ts:9` imports `"./export"`.
`export/` has **no `index.ts`**, so `./export` resolves to the flat file. Consumed at
`PalettesPane.vue:96` (`@export="(p, fmt) => onExport(p, fmt)"`) and `:211`.

**Consumer census — exactly one each, and they do not overlap:**

```
$ grep -rn "export/serializers" --include=*.ts --include=*.vue demo/ src/ test/ e2e/
  demo/test/export/byte-exact.test.ts:23:} from "../../palettes/export/serializers";

$ grep -rn 'from "\./export"' --include=*.ts --include=*.vue demo/ test/ e2e/
  demo/palettes/usePaletteExport.ts:9:} from "./export";
```

Re-verified at pass 2 by the complementary probe — no application module anywhere produces the
tested module's input type:

```
$ grep -rn "ExportSnapshot" demo/ --include='*.ts' --include='*.vue' | grep -v "^demo/palettes/export/"
demo/test/export/byte-exact.test.ts:21,43,81,82,83,443     ← and nothing else
```

**Measured:** `demo/palettes/export/*.ts` = **914 lines**. `demo/test/export/byte-exact.test.ts` =
**453 lines, 78 `expect(` assertions**. All of it guards code **no running page ever loads**.

The code admits it — `demo/palettes/export/serializers.ts:5-9`:

> *"This module is intentionally NOT named `index.ts`: the sibling legacy `../export.ts` (the
> pre-contract routed seat that W50 will replace) still resolves `./export`…"*

And `docs/tranches/V/reformation/CARRY-LEDGER.md:25` books the retirement under **D57 / W50**, which
has not executed.

**The two disagree by construction.** CSS export, byte-for-byte:

| | shipped (`export.ts:26-37`) | tested (`export/css.ts:9-17` + `canonical.ts`) |
|---|---|---|
| token prefix | `palette-<slugify(palette.name)>` | `identifierPrefix(snapshot)` = the stored `slug`, or `palette-<digest>` for a draft |
| index | `0`-based, unpadded (`-0`, `-1`) | `1`-based, zero-padded (`color-001`) |
| colour spelling | `c.css` — the raw user string, verbatim | `canonicalColor()` — fixed-point `oklch(92.000% 0.012345 88.800 / 1.000000)` |

Asserted by the test at `demo/test/export/byte-exact.test.ts:156-158`:
`":root {\n  --s-color-001: oklch(92.000% 0.012345 88.800 / 1.000000);\n}\n"`.
Produced by the app: `":root {\n  --palette-my-set-0: #ff0000;\n}\n"`.

**This is a false proof of the export surface.** 78 green assertions certify bytes that no user can
obtain. `docs/tranches/V/PALETTE-CONTRACT.md` Appendix W51 is the byte authority and the shipping
path does not implement it.

**Pass 2 addition — the two are not even the same domain.** `export/types.ts:30-50` declares
`SnapshotSource = device-draft | workspace | release` with `workspaceRevision`, `releaseNo`,
`basedOnReleaseId`, `deviceDraftRevision`, `contentDigest`. The live `Palette`
(`demo/palettes/types.ts:14-64`) has **none** of those concepts — no workspace, no release, no
revision, no draft. So `export/` is not a stricter version of `export.ts`; it is a specification
for a product the app is not. No `Palette → ExportSnapshot` adapter exists, and none can be
written without inventing the missing model. This raises the cost of "migrate to it" and lowers
the cost of "delete one of them" — the choice must be made deliberately, not deferred again.

**Secondary consequence:** the shipped `exportAsPNG` (`export.ts:85-119`) hand-rolls an
`<img>` + Canvas-2D SVG rasterizer and touches **no** value.js. The unshipped `export/png.ts:11`
correctly does `import { oklch, toRgba8 } from "@mkbabb/value.js/color"`. The one export path that
dogfoods the library is the one that is dead.

**Proposed cure:** execute D57 as a *decision*, not a deferral. Either (a) delete
`demo/palettes/export/` and its 453-line test if the workspace/release domain is not being
built, or (b) delete `export.ts` + `usePaletteExport.ts`, rename `export/serializers.ts` →
`export/index.ts` so `./export` resolves to the contract set, and land the `Palette →
ExportSnapshot` projection. Do not ship both. `usePaletteExport` is a 27-line `switch` wrapper
with no state — it is not a composable, it is a function, and it belongs as `export/download.ts`.

---

## L-3 — MAJOR — a palettes ⇄ shell dependency cycle, created purely by where the injection keys live

**Where:** `demo/palettes/usePalettePorts.ts` holds *both* the provider `providePalettePorts` (43-259)
*and* the five `InjectionKey` symbols (271-275). `PalettesPane.vue:134` imports two of those keys.

**The cycle, both directions:**

```
palettes → shell:  demo/palettes/usePalettePorts.ts:19
                   import type { ViewId } from "../shell/useViewManager";

shell → palettes:  demo/shell/dock/Dock.vue:18
                   demo/shell/dock/DockViewSelect.vue:8
                   demo/shell/dock/layers/SlugEditLayer.vue:5
                   demo/shell/dock/menus/ProfileSection.vue:14
                   demo/shell/dock/menus/MobileMenuDropdown.vue:13
                   import { SESSION_PORT_KEY } from "…/palettes/usePalettePorts";
```

Five shell components reach into a feature module to read one `Symbol`. `Dock.vue:37` uses exactly
one thing from that import — `inject(SESSION_PORT_KEY)`.

**Pass 2 addition — the shell is reaching through `palettes/` for something `palettes/` does
not own.** `usePalettePorts.ts:5-7` imports `useAdminAuth`, `useUserAuth` and `useSession` from
`../platform/auth/`, and `SESSION_PORT` (lines 127-135) is a **pure pass-through
re-publication** of them — seven members, every one forwarded unchanged. Identity lives in
`demo/platform/auth/`, which is exactly where the shell should read it. The feature module is a
tollbooth on a road between two other places.

**Pass 2 addition — `demo/palettes/` is the demo's god directory.** The directory named for one
feature holds five unrelated domains:

```
demo/palettes/
  api/            admin-audit.ts admin-colors.ts admin-palettes.ts admin-users.ts
                  colors.ts index.ts palettes.ts versions.ts     ← the app's WHOLE HTTP client
  useAdminAudit.ts useAdminFlagged.ts useAdminTags.ts useAdminUsers.ts
  useColorNameQueue.ts                                            ← the admin console
  useBrowsePalettes.ts useSlugMigration.ts                        ← remote browse + identity
  mix.ts                                                          ← colour-mixing math
  export.ts export/                                               ← serialization (L-2)
  usePalettePorts.ts                                              ← the app composition root
```

Inbound fan-in from areas that are not palettes — 23 edges from 7 areas:

```
demo/shell/dock/*                   ×5   SESSION_PORT_KEY
demo/shell/usePaneRouter.ts         ×3   PalettesPane / BrowsePane / AdminPane
demo/picker/ColorPicker.vue         ×1   COLOR_TARGET_PORT_KEY
demo/workbenches/mix/*              ×5   LIBRARY_PORT_KEY, mix.ts, types, browser/card
demo/workbenches/generate/*         ×3   LIBRARY_PORT_KEY, types, browser/card
demo/workbenches/extract/*          ×3   COLOR_TARGET_PORT_KEY, usePaletteStore, types
demo/workbenches/gradient/*         ×1   LIBRARY_PORT_KEY
demo/color-picker/*                 ×2   providePalettePorts, MigratePalettesDialog
```

`usePalettePorts.ts:22-31` claims to have dissolved a god facade into "FIVE narrow, feature-owned
ports". It did not dissolve it; it renamed it. `browsePort` (156-192) carries 27 members,
`adminPort` (194-231) carries 32, and both re-export slices from `actions`, `admin`, `browse`,
`versions`, `tagEdit`, `flagged`. One module still knows every domain in the app.

**Measured cost (pass 1).** Transitive relative-import closure (`scratchpad/closure.mjs`):

```
=== demo/palettes/PalettesPane.vue ===
  modules in closure: 97
  by area: {"palettes":57,"color-session":17,"platform":10,"ui":8,"shared":3,"shell":2}
  ADMIN modules (18): api/admin-audit.ts, api/admin-colors.ts, api/admin-users.ts,
                      api/admin-palettes.ts, useAdminTags.ts, platform/auth/useAdminAuth.ts …
  SHELL modules (2): demo/shell/useViewManager.ts, demo/shell/viewSchema.ts

=== demo/palettes/usePaletteStore.ts ===
  modules in closure: 3
```

**97 modules — 18 of them admin — to render a list of the user's own saved palettes.** The store it
actually needs is 3. 92 of the 97 arrive through the `./usePalettePorts` key import.

The type coupling is unavoidable as written: `LibraryPort = ReturnType<typeof providePalettePorts>["library"]`
(`usePalettePorts.ts:264-266`), so typechecking this pane requires inferring the full return of a
function that calls `useAdminUsers`, `useAdminAudit`, `useAdminFlagged`, `useAdminTags`,
`useColorNameQueue`, `useBrowsePalettes`, `useVersionHistory`, `useTagEdit`, `useSlugMigration`, all
three `platform/auth/*`, and `shell/useViewManager`.

**And it is on the boot critical path.** `demo/color-picker/App.vue:167` statically imports
`{ Dock } from "../shell/dock"` (mounted at `:35`, not async — contrast `usePaneRouter.ts:70-76`,
which *does* use `defineAsyncComponent` for the panes). So the app's synchronous entry graph
includes the admin API modules because the dock needs a Symbol.

**The repo already knows the cure and applies it one directory over.** `demo/color-session/keys.ts`
is a pure leaf: type-only imports, seven `InjectionKey` symbols, **26 consumers, zero cycle**.
`PalettesPane.vue:135` imports `CSS_COLOR_KEY` from it and pays nothing.

**Proposed cure:** `demo/palettes/keys.ts` — the five `InjectionKey` symbols and their port
interfaces, declared *structurally* (hand-written interfaces, not `ReturnType<typeof …>`), with
type-only imports. `usePalettePorts.ts` then *imports* those keys and satisfies the interfaces —
which also makes the port contract checkable rather than inferred. The five shell files stop
importing from `palettes` altogether and read `platform/auth` directly, which is where identity
lives. The `ViewId` edge inverts: `PalettePortsDeps` takes an opaque `currentView: Ref<string>`
supplied by the composition root (`usePaletteWiring.ts:60` already is that root), so palettes
stops naming the shell at all.

---

## L-4 — MAJOR — three homes for "name → identifier", with measured divergence

| # | Home | Algorithm |
|---|---|---|
| 1 | `demo/palettes/utils.ts:3-13` `slugify` | NFKD normalize, strip combining marks, `[^a-z0-9 -]` drop |
| 2 | `demo/palettes/export.ts:9-11` `slugify` | naive `[^a-z0-9]+` → `-` |
| 3 | `demo/palettes/export/canonical.ts:50-59` `identifierPrefix` | none — *"no slugifier exists"*; uses the stored slug |

Measured (`node -e` over the two live regex chains):

```
"Café Noir"      export.ts=> "caf-noir"      utils.ts=> "cafe-noir"
"Grüne Töne"     export.ts=> "gr-ne-t-ne"    utils.ts=> "grune-tone"
"Mötley 2.0"     export.ts=> "m-tley-2-0"    utils.ts=> "motley-20"
```

The store mints `palette.slug` with #1 (`usePaletteStore.ts:87` → `createSlug`). The download path
uses #2. So `exportAsJSON` writes `slug: palette.slug` into the payload (`export.ts:17`) while
naming the file with a *different* slugification of `palette.name` (`export.ts:21`): a palette
"Café Noir" downloads as `caf-noir.json` containing `"slug": "cafe-noir-<uuid8>"`.

**Proposed cure:** #3 is right — identifiers are *minted once at creation and stored*. Deleting
`export.ts` (L-2) deletes #2 and leaves exactly one slugifier, in `utils.ts`, invoked only by
`createPalette`.

---

## L-5 — MAJOR — the imperative card-feedback registry is duplicated with two different key schemes

**Where:**

```
PalettesPane.vue:177   const cardRefs = reactive<Record<string, InstanceType<typeof PaletteCard>>>({});
PalettesPane.vue:84    :ref="(el: any) => el && (cardRefs[palette.id] = el)"        ← keyed by id
PalettesPane.vue:205   const card = cardRefs[id]; card.showFeedback(…)

BrowsePane.vue:209     const cardRefs = reactive<Record<string, InstanceType<typeof PaletteCard>>>({});
BrowsePane.vue:94      :ref="(el: any) => el && (cardRefs[palette.slug] = el)"      ← keyed by slug
BrowsePane.vue:228/237/249/264   cardRefs[palette.slug]?.showFeedback(…)
```

A third site is documented at `demo/palettes/browser/dialog/composables/useDialogBrowseActions.ts:41`
(*"the palette card's `showFeedback` (the same surface `onSave`/`onDeleteOwned`…"*).

One concept — "tell the card that owns this palette that its operation succeeded or failed" — with
two literal copies, two identity schemes (`id` vs `slug`), an `any`-cast ref callback in each, and a
`defineExpose({ showFeedback })` escape hatch at `PaletteCard.vue:244`. Both copies also leak: the
`ref` callback writes on mount but nothing deletes on unmount, so `cardRefs` accumulates dead
instances for the session.

**Proposed cure:** the feedback is a *property of the palette*, not of the component instance.
`PaletteCard` takes `:feedback="feedbackFor(palette)"` and renders `ActionFeedback` declaratively
(that component already exists at `browser/card/PaletteCard/ActionFeedback.vue`). A single
`usePaletteFeedback()` composable holds `Map<paletteKey, {message, variant, at}>`, keyed by the one
identity the domain already has. `defineExpose`, both `cardRefs` registries, both `any` casts, and
the leak all disappear.

---

## L-6 — MAJOR — `demo/ui/` is 19 pure re-export shims; this file disproves them in its own import block

Every one of the 19 barrels under `demo/ui/` is a one-line re-export of glass-ui. Verbatim:

```
badge     export { Badge, badgeVariants, type BadgeVariants } from "@mkbabb/glass-ui";
button    export { Button } from "@mkbabb/glass-ui";
card      export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@mkbabb/glass-ui";
dialog    export { Dialog, DialogClose, DialogTrigger, DialogHeader, … } from "@mkbabb/glass-ui";
…  (avatar, checkbox, collapsible, dropdown-menu, input, label, popover, radio-group,
    select, separator, skeleton, slider, switch, tooltip, alert)
```

`demo/ui/alert/index.ts:1-9` states outright that its local implementation was converted to a
re-export at B.W2 — the shim is a migration artefact that outlived its migration. 31 demo files
import through them. They are aliases with no added surface — a **standing-edict-2 violation**
(no aliases / migration shims / dual paths) and **edict-3** (no wrapper components that add
nothing).

**PalettesPane refutes them in a single import block.** `:129-131` take `Card`/`Button`/`Badge`
through the shim; `:148-149` take `Dialog*` and `SearchBar` straight from
`@mkbabb/glass-ui/dialog` and `@mkbabb/glass-ui/search` — **even though `demo/ui/dialog` exists**.
Two module paths to the same design system inside one 24-line block. `demo/ui/input/index.ts`
already breaks ranks a third way: it alone uses a subpath (`@mkbabb/glass-ui/forms`).

Not merely cosmetic. Measured at pass 2:

```
$ node -e "p=require('@mkbabb/glass-ui/package.json'); console.log(p.exports['.'])"
{ types: './dist/index.d.ts', import: './dist/glass-ui.js', default: './dist/glass-ui.js' }

$ grep -oE 'from *"[^"]+"' node_modules/@mkbabb/glass-ui/dist/glass-ui.js | sort -u | wc -l
46                              # 43 internal chunks + vue + reka-ui + @lucide/vue

$ cat node_modules/@mkbabb/glass-ui/dist/card.js
import { a as e, ... } from "./card-Bk96VI2R.js";       # one 5299-byte chunk
```

glass-ui 7.0.0 publishes 70 export keys. The shims route every one of them through the 43-chunk
root barrel. `sideEffects: ["*.css"]` means the barrel is shakeable in a production Rolldown
build, so this is a dev-graph and correctness-of-intent cost rather than a shipped-bytes one —
but the intent is wrong either way.

**Proposed cure:** delete `demo/ui/` wholesale; rewrite the 31 importers to the granular glass-ui
subpath. A one-shot codemod, no behaviour change, 19 files and one directory removed.

---

## L-7 — MINOR — per-instance style override of a root-level recipe (edict 5), duplicating the token triple

**Where:** `PalettesPane.vue:15` binds `:style="rampTitleVars"`, defined at `:171-175`:

```ts
const rampTitleVars = {
    "--palettes-ramp-0": "var(--palettes-ramp-title-0, oklch(0.632 0.214 333.5))",
    "--palettes-ramp-1": "var(--palettes-ramp-title-1, oklch(0.632 0.214 13.5))",
    "--palettes-ramp-2": "var(--palettes-ramp-title-2, oklch(0.632 0.214 53.5))",
} as const;
```

The identical three `oklch` fallbacks are already the recipe's own fallbacks at
`demo/styles/utils.css:195-197`. Two homes for one constant triple, and an inline-style override of
a class recipe — which edict 5 forbids by name.

**Proposed cure:** a `.palettes-ramp-text--title` modifier in `utils.css` that sets the three slots
from `--palettes-ramp-title-*`. The pane's template becomes
`class="palettes-ramp-text palettes-ramp-text--title"`, the `:style` bind and the whole
`rampTitleVars` object vanish, and the constant lives once. Note `useViewAccents.ts:153/163` already
writes both token families on `:root` at boot, so the fallbacks are a first-paint concern only —
exactly what a CSS `var()` fallback in the recipe is for.

---

## L-8 — MINOR — three unused imports (`verbatimModuleSyntax` hygiene)

`PalettesPane.vue:128`: `import { inject, reactive, ref, computed, watch, onMounted, nextTick } from "vue";`

Re-measured at pass 2 — total occurrences of each identifier in the whole file, import line included:

```
watch: 1   onMounted: 1   nextTick: 1      ← 1 = the import statement only, 0 uses
reactive: 2   computed: 2                  ← live
```

Type-only discipline is otherwise correct: `import type { Palette }` at `:151` is properly
`import type`, and it is the file's only type-only import.

---

## L-9 — MINOR — a dead path alias is cited as if live, in this file and five others

`PalettesPane.vue:6` cites the ramp resolver as `` `@composables/color/palettes-ramp` ``. The
`@composables` alias was killed by W43/RF-15 — it is defined in **no** config
(`grep -rn "@composables" vite.config.ts tsconfig*.json vitest.config.ts` returns only two comments
recording its death), and no such file exists. The real home is
**`demo/color-session/palettes-ramp.ts`**.

Five more files carry the same dead cite: `demo/styles/utils.css:187`,
`demo/color-picker/composables/boot/useViewAccents.ts:14`,
`demo/color-picker/composables/boot/view-accents.ts:9`,
`demo/workbenches/generate/composables/useColorGeneration.ts:7`,
`demo/shell/useViewManager.ts:15`.

These are navigational comments that misdescribe the module lattice — a reader who follows one finds
nothing. Cure: rewrite the six cites to the real relative path.

---

## L-10 — INFO — 2 of 7 published subpaths have zero demo dogfood

Import-site census of `package.json#exports` against `demo/` (re-verified at pass 2:
`grep -rc "value.js/value\|value.js/transform" demo/` → zero sites):

```
./color      25      ./css       10      ./math       6
./easing      5      ./quantize   4
./value       0   ← never imported by the demo
./transform   0   ← never imported by the demo
```

The demo is this library's dogfood proof (`vite.config.ts:63-66`: *"the demo consumes value.js ONLY
through the published subpaths"*). Two published subpaths therefore ship with no consumer-shaped
exercise at all. Not a defect *of this component* — recorded because the export surface is in this
seat's charter.

---

# Findings — pass 2 (new)

## L-11 — MAJOR — the export map has no root key, and `tsconfig.demo.json` declares three specifiers that do not exist

**This corrects pass 1's negative proof §2.** Pass 1 certified that the alias set "cannot drift
from the export map, because it is generated from it." That is true of `vite.config.ts` and only
of `vite.config.ts`. The **TypeScript** half of the same contract is hand-written, and it has
drifted.

`tsconfig.demo.json` declares eight value.js path keys, and its own header prose claims "the demo
speaks only the 8 public keys." Three of the eight exist nowhere:

```
$ node -e "p=require('./package.json'); for (const k of ['.','./parsing','./units'])
           console.log(k, p.exports[k]===undefined?'ABSENT':'present')"
.          ABSENT
./parsing  ABSENT
./units    ABSENT

$ ls dist/index.d.ts dist/subpaths/parsing.d.ts dist/subpaths/units.d.ts
ls: dist/index.d.ts: No such file or directory
ls: dist/subpaths/parsing.d.ts: No such file or directory
ls: dist/subpaths/units.d.ts: No such file or directory
```

`package.json#exports` has exactly **seven** keys — `./color ./value ./css ./easing ./math
./transform ./quantize` — and **no `"."`**.

Three consequences:

1. **`@mkbabb/value.js` cannot be imported by anyone**, in the demo or externally. There is no
   root entry to import. `vite.config.ts:38-48` generates its alias array from the exports map,
   so it contains no bare entry either; the `paths` entry pointing at a nonexistent
   `dist/index.d.ts` is dead config.
2. **`@mkbabb/value.js/parsing` and `/units` are declared to TypeScript and ship nowhere.** A
   demo author who writes either is working against a config that *claims* a public API the
   package does not have — precisely the false-proof failure mode this challenge names. Pass 1
   proved no such import exists *today*; it did not check whether the config would permit one.
   The config invites it.
3. **The repo asserts the opposite in prose.** `demo/shared/utils.ts:12-19`:

   > "`debounce` was the last symbol holding 7 demo files on the BARE `@mkbabb/value.js`
   > specifier — the full-barrel import … The utility tail has no rightful subpath home … so the
   > demo owns its copy; **the library's root-barrel export stands for external consumers.**"

   There is no root-barrel export. That sentence is false at HEAD `e79fcd43`. And the file it
   appears in is the symptom: because the export map is domain-incomplete, the demo forked a
   40-line utility rather than reach a surface that does not exist.

- **Reproduction:** the two commands above, at HEAD `e79fcd43`.
- **Proposed cure:** the same construction that already protects the Vite half. Generate
  `tsconfig.demo.json`'s `paths` block from `package.json#exports` (a `tsconfig.demo.json` emitted
  by a tiny script, or a `paths`-less config relying on real node resolution against the
  `dist/` symlink). Then decide the root: either add `"."` to `exports` with a real
  `dist/index.{js,d.ts}` — which also gives `debounce` a home and lets `demo/shared/utils.ts`
  delete its fork — or remove the three phantom keys and the false prose. One source, zero drift,
  by construction rather than by discipline.

---

## L-12 — MAJOR — the published package forces glass-ui and keyframes.js on every consumer, and imports neither

```
$ node -e "console.log(require('./package.json').dependencies)"
{ '@mkbabb/glass-ui': '^7.0.0', '@mkbabb/keyframes.js': '^6.0.0' }

$ grep -rn "@mkbabb/glass-ui\|@mkbabb/keyframes" src/
NONE in src/

$ grep -ohE 'from *"[^"]+"' dist/subpaths/*.js dist/*.js | sort -u
from "../anchors-C_wdoOYd.js"
from "../operations-CB_1wGy4.js"
from "../result-CZJK1CwL.js"
```

`src/` imports neither package. The built `dist/` has **zero external imports**. Yet both are
runtime `dependencies`, so `npm i @mkbabb/value.js` — a package that sells itself as "Immutable,
failure-explicit CSS color, value, easing, transform, math, and quantization capabilities" —
installs an entire Vue design system and an animation library.

`tsconfig.demo.json`'s own header states the invariant being broken: *"the library program
(tsconfig.lib.json) never [sees glass-ui] (inv-K-1 — structurally glass-ui-free)."* Structurally
free in the source graph; declared as a hard runtime dependency in the manifest. The invariant is
enforced everywhere except the one file consumers actually read.

This is directly this component's business: `PalettesPane` is the reason glass-ui is in the tree
at all, and it is a **demo** consumer.

- **Reproduction:** the three commands above.
- **Proposed cure:** move both to `devDependencies` beside the other ~30 demo-only packages
  (`@vueuse/*`, `clsx`, `tailwind-merge`, `sortablejs`, `reka-ui`, …). Published `dependencies`
  becomes `{}`, which is the truth. `files: ["dist", "!dist/gh-pages"]` already excludes the demo
  build, so nothing published needs them.

---

## L-13 — MAJOR — glass-ui already ships the sortable primitive; L-1's hand-roll is an edict-4 violation, and so was pass 1's proposed cure

glass-ui 7.0.0 publishes `./sortable-list` as a first-class component family:

```
$ cat node_modules/@mkbabb/glass-ui/dist/components/sortable-list/index.d.ts
export { default as SortableList }   from "./SortableList.vue";
export { default as SortableItem }   from "./SortableItem.vue";
export { default as SortableHandle } from "./SortableHandle.vue";
export type { SortableId } from "./composables/types";

$ head -20 node_modules/@mkbabb/glass-ui/dist/sortable-list.js
… //#region src/components/sortable-list/composables/dropResolver.ts   ← its own drop resolver,
                                                                          with cross-group support
```

Against that, the demo carries a whole third-party drag library for **one** call site:

```
$ grep -rn "useSortable" demo/ --include='*.ts' --include='*.vue'
demo/palettes/PalettesPane.vue:133      import { useSortable } from "@vueuse/integrations/useSortable";
demo/palettes/PalettesPane.vue:183      useSortable(sortableEl, pm.filteredSaved.value, {…});
demo/palettes/browser/card/PaletteCardGrid.vue:10   (a comment about the above)
```

`sortablejs@^1.15.7` and `@types/sortablejs@^1.15.9` are in the tree for those two lines. Edict 4
is explicit: variants and primitives belong in glass-ui, and the demo reuses existing
component-type names. `SortableList` is the existing name.

**The encapsulation damage is documented inside the victim.** `PaletteCardGrid.vue:8-12`, in its
own template:

> "This comment is the div's first CHILD, not a sibling: a leading comment node would make this a
> multi-root component, and **PalettesPane reads `$el` for useSortable** — a fragment root resolves
> $el to the comment node, not the `<div>`."

A child whose comment-node *placement* is load-bearing for a parent's private DOM reach has no
encapsulation left. The `as any` at `PalettesPane.vue:181` is the type system being told to stand
down at exactly the point the boundary is crossed.

**Amendment to L-1's cure.** Pass 1 proposed relocating the `useSortable` binding into
`PaletteCardGrid`. That fixes ownership and would fix the data corruption — but it keeps a
hand-rolled drag implementation and two third-party packages that the design system supersedes,
which trades a correctness defect for an edict-4 defect. The correct cure:

- `PaletteCardGrid` renders `<SortableList>` with `<SortableItem>` per card and `<SortableHandle>`
  in place of the `.drag-handle` class contract, emitting `@reorder="(ids: SortableId[]) => …"`.
- The library port exposes `movePalette(fromId, toId)`; `usePaletteStore` performs the splice on
  the store array, the only mutable owner of order.
- Deleted: `useSortable` import, `sortableGridRef`, `sortableEl`, the `as any`, the `$el` read,
  the `onEnd` index arithmetic, the `PaletteCardGrid` comment-node constraint, `sortablejs`,
  `@types/sortablejs`, and — because no view ever holds the list — the entire vueuse ref/non-ref
  branch that L-1's corruption came from.

---

## L-14 — MAJOR — `savedColorStrings` reaches this subtree by two transports at once

One reactive datum, two independent wires into the same component tree, from one origin:

**Route A — prop, de-reffed, through the pane router:**
```
demo/color-session/useColorPipeline.ts:166               computed savedColorStrings
demo/color-picker/App.vue:341                            savedColorStrings: () => savedColorStrings.value
demo/shell/usePaneRouter.ts:155                          savedColorStrings: deps.savedColorStrings()
demo/palettes/PalettesPane.vue:154                       defineProps<{ savedColorStrings: string[] }>
demo/palettes/browser/card/CurrentPaletteEditor.vue:~26  the same prop again
```

**Route B — `Ref`, through the ports deps:**
```
demo/color-picker/App.vue:356                            savedColorStrings
demo/color-picker/composables/usePaletteWiring.ts:31,63  savedColorStrings: Ref<string[]>
demo/palettes/usePalettePorts.ts:36,47,94                savedColorStrings: Ref<string[]>
demo/palettes/usePaletteActions.ts:13,101,103            deps.savedColorStrings.value
```

`PalettesPane` already injects `LIBRARY_PORT_KEY` and `COLOR_TARGET_PORT_KEY` at lines 164-165. It
could read this list from a port. Instead it takes it as a prop, and the port graph *also* takes
it, from the same origin, by a second path, in a second type spelling (`string[]` vs
`Ref<string[]>`). Unique semantic ownership is the invariant; one concept has two transports.

The prop is also the sole reason `usePaneRouter.rightProps` special-cases `"palettes"`
(`usePaneRouter.ts:150-158`) — a router that knows one pane's prop names.

- **Reproduction:** `grep -rn "savedColorStrings" demo/ --include='*.ts' --include='*.vue'` → 22
  hits across the two chains above.
- **Proposed cure:** delete the prop. The true owner is `useColorPipeline`; expose
  `currentColors` on the colour-session port and let `PalettesPane` and `CurrentPaletteEditor`
  read it there. `rightProps("palettes")` collapses to `{}`.

---

## L-15 — MAJOR — commit/cancel-edit has two mechanisms, and the second needs a 2-second mount poll to work

`PalettesPane.vue:51-52` emits `commitEdit` / `cancelEdit` up to the router, which calls into a
**component instance**:

```
demo/shell/usePaneRouter.ts:156-157
  "onCommit-edit": () => deps.colorPickerRef()?.commitEdit(),
  "onCancel-edit": () => deps.colorPickerRef()?.cancelEdit(),
```

Meanwhile `COLOR_TARGET_PORT` — which this same component injects at line 165 — already exposes
the operation:

```
demo/palettes/usePalettePorts.ts:239    commitColorEdit: actions.commitColorEdit,
```

Two mechanisms, one gesture. And `PalettesPane` is not the only emitter: `demo/shell/dock/Dock.vue:143-144`
emits the same pair, handled at `demo/color-picker/App.vue:41-42` by calling
`colorPickerRef?.commitEdit()`. Three call sites, one concept, routed through a component handle.

**The cost of that instance coupling is written down.**
`demo/color-picker/composables/usePaletteWiring.ts:31-58`: the ports cannot be constructed until
`colorPickerRef` mounts, so the wiring polls for it every 50 ms, 40 times (~2 s), then
`console.warn`s and gives up:

```ts
const PICKER_WAIT_ATTEMPTS = 40; // 40 × 50ms ≈ 2s
…
if (attempts++ >= PICKER_WAIT_ATTEMPTS) {
    console.warn(`[usePaletteWiring] gave up waiting for the color picker to mount (${label}).`);
    return;
}
setTimeout(poll, 50);
```

That poll exists only because state is being reached through a component instance instead of
through the store that owns it. It is the same species as L-5's `cardRefs` — pass 1 caught the
card half; this is the picker half, and it sits on the boot path.

- **Reproduction:** `grep -rn "commitEdit\|cancelEdit\|commitColorEdit" demo/` → three emitters,
  one unused port member, one ref-call at `usePaneRouter.ts:156`, one bounded poll.
- **Proposed cure:** edit state is session state. Put `editTarget` + `commit()` + `cancel()` on
  the colour-session store; dock, pane and picker all call the store. `colorPickerRef`,
  `PaneRouterDeps.colorPickerRef`, `whenColorPickerReady`, the 2 s poll and its `console.warn` all
  delete — and with them the mount-order race they exist to paper over.

---

## L-16 — MINOR — "Palette" has three homes and none of them is the library, which advertises it as a keyword

- `demo/palettes/types.ts:14-64` — the client model (`id?`, `slug`, `colors`, `visibility`,
  `tier`, `atomSetHash`, `forkOf`, `currentHash`, …).
- `api/src/modules/palette/repository/palette.ts` — the server model.
- `demo/palettes/export/types.ts:52-65` — a third, incompatible model (L-2).

And the library:

```
$ find src -iname "*palette*"
(empty)
$ grep -rln "palette" src/
(empty)
```

`package.json:16` lists `"palette"` among the package keywords. `src/` contains no palette code of
any kind — not a type, not a comment. The demo's central domain object (an ordered, named,
addressable colour set with canonical serialization) is exactly what a colour library should own,
and it is the one concept this library does not touch.

This is the structural reason `PalettesPane.vue` imports nothing from `@mkbabb/value.js` at all
(see the import table): every colour that flows through it is an opaque `string` —
`cssColorOpaque`, `savedColorStrings: string[]`, `PaletteColor.css: string`. The library is not
in this component's vocabulary.

- **Proposed cure:** either give the library a `./palette` subpath owning the immutable
  `Palette`/`PaletteColor` value types and the canonical serializers — making the demo *and* the
  API consumers of one definition, which is exactly what `export/canonical.ts` was reaching for —
  or drop `"palette"` from the keywords. The present state advertises ownership the code does not
  hold.

---

# Findings — pass 3 (new)

Every pass-3 reproduction was run this session against the live dev server at
`http://localhost:9000` at HEAD `9268f054`, with `localStorage["color-palettes"]` seeded by
`page.addInitScript` before navigation. No source file was modified.

## L-17 — BLOCKER — reordering under an active filter rewrites palettes the user cannot see

**This is a second, independent corruption mechanism.** L-1 is a race between two event handlers.
L-17 is a type error in the domain: **the pane hands a projection to a function whose contract
requires the source.**

**Where:** `PalettesPane.vue:190-194` computes `ids` from `pm.filteredSaved.value` — the
*search-filtered* list — and passes it to `pm.reorderPalettes(ids)`. That function
(`usePaletteStore.ts:153-166`) is a **total** reordering primitive:

```ts
function reorderPalettes(orderedIds: string[]): void {
    const map = new Map(store.value.palettes.map((p) => [p.id, p]));
    const reordered: Palette[] = [];
    for (const id of orderedIds) { const p = map.get(id); if (p) reordered.push(p); }
    // Append any palettes not in the ordered list …
    for (const p of store.value.palettes) {
        if (p.id == null || !orderedIds.includes(p.id)) reordered.push(p);
    }
    store.value.palettes = reordered;
}
```

The `// Append any palettes not in the ordered list` loop is correct for its stated contract —
`orderedIds` is meant to be the *whole* library. Under a filter it is not, so every non-matching
palette is silently relocated to the tail.

### Reproduction (measured, live, this session)

`scratchpad/live3.mjs` — headless Chromium, dev server at `localhost:9000`, five seeded local
palettes `A(alpha) B(beta) C(gamma) D(delta) E(epsilon)`. Type `e` into
`input[placeholder="Search your palettes..."]` (matches beta / delta / epsilon), then drag the
first visible card down one slot.

```
{
 "seedOrder": ["A(alpha)","B(beta)","C(gamma)","D(delta)","E(epsilon)"],
 "filter": "\"e\"",
 "visibleNames": ["beta1","delta1","epsilon1"],
 "afterDragWithinFilter": ["D","B","E","A","C"],
 "intended":               ["A","D","B","C","E"]
}
```

`alpha` and `gamma` were **not visible, not touched, and not addressable** by the gesture. They
moved from positions 1 and 3 to positions 4 and 5, and the result was written to `localStorage`.

The drag was driven by invoking the live `Sortable` instance's own `options.onUpdate` then
`options.onEnd` with a same-list `{oldIndex:0,newIndex:1}` event — i.e. sortablejs's real
dispatch sequence, read off the instance the app itself constructed
(`grid[Object.keys(grid).find(k => k.startsWith("Sortable"))]`), not a stub. The same probe
confirms vueuse's default handler is live alongside the custom one, which is L-1's premise:

```
"hasDefaultOnUpdate": true,   "hasOnEnd": true,   "handle": ".drag-handle",   "cards": 3
```

### Why it survives the cures already proposed

- **L-1's cure** (bind correctly, override `onUpdate`) fixes the index arithmetic. It does not
  change *which list* is reordered.
- **L-13's cure** (`<SortableList>` from glass-ui) replaces the drag implementation. The
  `@reorder` payload is still the ids of the *rendered* items, which under a filter is still a
  subset.
- Only moving the operation into the store, expressed over the source, closes it.

### Proposed cure

`reorderPalettes(ids: string[])` is the wrong primitive to expose at all — it makes every caller
responsible for supplying a total ordering, and there is no type that says so. Replace it with a
**relative** move the store can always satisfy from the source list:

```ts
movePalette(id: string, before: string | null): void   // splice within store.palettes
```

The view supplies two identities from the gesture; the store performs one splice on the array it
owns. A projection can express "put A before C" correctly even when B is filtered out, which
`reorderPalettes` structurally cannot. This is the same transposition L-1's cure needs, and it
subsumes it — which is the argument for doing it once, in the store, rather than twice in two
panes.

---

## L-18 — MAJOR — the owner-ruled letterform ramp is measurably dead in dark scheme

**Where:** the ramp spans three modules and no one of them owns the invariant.

| Role | Module | What it does |
|---|---|---|
| producer | `demo/color-picker/composables/boot/useViewAccents.ts:163` | writes `--palettes-ramp-title-{0,1,2}` on `:root` |
| recipe | `demo/styles/utils.css:184-201` | `.palettes-ramp-text` reads `--palettes-ramp-{0,1,2}` |
| **alias** | `PalettesPane.vue:171-175` | inline `:style` mapping `title-N` → `N` |

Q5 was RULED (owner-verbatim, `palettes-ramp.ts:2-4`): *"Only palettes should be rainbow — the
letterforms dropdown and the title."* `PalettesPane.vue:3-9` records T-43 owner-CONFIRMS.

### Measurement (live, this session — `scratchpad/ramp.mjs`)

Headless Chromium, two contexts differing only in `colorScheme`, `/#/palettes`, 2.5 s settle,
reading the resolved custom properties off `:root` and off the `.palettes-ramp-text` element,
then resolving each through a canvas 2D context:

```
LIGHT  dark=false
  oklch(47.118925176164%  0.188447570516  329.834deg)   rgb(144, 32,140)
  oklch(47.118925176164%  0.188447570516    9.834deg)   rgb(170,  0, 67)
  oklch(47.118925176164%  0.124864700704   49.834deg)   rgb(144, 65,  0)

DARK   dark=true
  oklch(95.832172477266%  0.033662079591  329.834deg)   rgb(255,234,252)
  oklch(95.832172477266%  0.021053120065    9.834deg)   rgb(255,236,238)
  oklch(95.832172477266%  0.023120217659   49.834deg)   rgb(255,237,228)
```

- Chroma collapses **5.6× / 8.9× / 5.4×** between schemes.
- In dark the three stops span **ΔR = 0, ΔG = 3, ΔB = 24** out of 255. That is not a ramp; it is
  near-white with a faint tint.

**Corroborated visually.** I read four screenshots. In
`shots/safari-desktop-light/palettes.png` the word "Palettes" is plainly a magenta→red→amber
gradient distinct from the ink of "My". In **both**
`shots/safari-desktop-dark/palettes.png` and `shots/safari-mobile-dark/palettes.png`, "My" and
"Palettes" render as **the same cream** — the ruled behaviour is absent, in both dark matrices,
at both viewports.

### Mechanism, and why it is a library-structure defect

`palettes-ramp.ts:30-37` documents the *previous* failure — three near-identical **near-blacks**
— and claims cure (2): *"the near-black wreck cannot recur (it holds the pick's C at the cusp
instead of the old constant-C-then-project collapse)."* The measurement shows the identical
collapse recurring at the **white** end: the feasibility-aware walk correctly chooses "toward
white" against a dark card, runs to `L = 0.958`, and the OKLCH gamut cusp permits almost no
chroma there. The walk is scheme-aware. It is not **spread**-aware.

The structural point for this seat: there is **no module that could enforce a chroma-spread
floor**, because the concept is split three ways — the walk is in `boot/`, the gradient is in
`styles/utils.css`, and the binding between them is an inline `:style` object in a **feature
pane**. A cross-cutting invariant ("these three stops must remain perceptibly distinct") has no
home, so nothing asserts it and no test can.

- **Reproduction:** `scratchpad/ramp.mjs`, output pasted above; plus the three screenshots named.
- **Proposed cure:** fold the alias into the recipe (L-7's cure — a `.palettes-ramp-text--title`
  modifier reading `--palettes-ramp-title-*`), which leaves **two** homes; then give the resolver
  a spread obligation it can actually discharge: certify the triple, not each stop
  independently — after the per-stop WCAG walk, if `max(ΔC)` across the three falls below a
  floor, spread hue and trade lightness back toward the cusp until it does not. Both the walk and
  the floor then live in `palettes-ramp.ts`, which is the one module that knows what a ramp is.

---

## L-19 — MINOR — `no-unused-vars` is disabled repo-wide, so L-8's class is ungated at a HARD gate

L-8 reports three dead imports at `PalettesPane.vue:128`. Pass 3 establishes **why they shipped**.

```
$ npx eslint demo/palettes/PalettesPane.vue
exit=0                                   # clean

$ grep -n "unused" eslint.config.js
71:            "@typescript-eslint/no-unused-vars": "off",
81:            "no-unused-vars": "off",
118:            "no-unused-vars": "off",
153:            "vue/no-unused-vars": "off",
154:            "vue/no-unused-components": "off",
182:            "vue/no-unused-properties": "off",
185:            "@typescript-eslint/no-unused-vars": "off",
186:            "no-unused-vars": "off",
```

Every unused-symbol rule — TS, core, and Vue — is off in every block. CI runs
`eslint . --max-warnings=0` as a **hard** step, and it cannot see this class at all.

Demo-wide census of dead `vue` named imports (import line present, zero uses in the rest of the
file):

```
demo/*.vue with dead `vue` imports: 4 files, 6 dead symbols
  demo/palettes/PalettesPane.vue                      ['watch', 'onMounted', 'nextTick']
  demo/palettes/browser/card/CurrentPaletteEditor.vue ['TransitionGroup']
  demo/palettes/browser/admin/AdminUsersPanel.vue     ['Transition']
  demo/workbenches/mix/MixPane.vue                    ['computed']
```

**This component is the worst offender in the demo — 3 of the 6.** Its two closest collaborators
hold two more.

`eslint.config.js:10` gives the rationale: *"many destructure-and-discard patterns."* That is a
reason to configure `argsIgnorePattern` / `varsIgnorePattern` / `ignoreRestSiblings`, not to
disable the rule. As configured, the demo tree accumulates dead imports with a green gate.

- **Reproduction:** the two commands above.
- **Proposed cure:** `"@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_",
  varsIgnorePattern: "^_", ignoreRestSiblings: true }]`. Six deletions clear the tree.

---

## L-20 — MINOR — the library port publishes raw refs, so the template writes into another module's state

`PalettesPane.vue:164` injects `LIBRARY_PORT_KEY`. The port is a plain object of refs
(`usePalettePorts.ts:138-154`), so nothing unwraps in the template and every read spells `.value`:

```
template .value occurrences: 16
port members touched in template: expandedId, filteredSaved, onCurrentPaletteSaved,
  onCurrentPaletteUpdated, onDelete, onDeleteAllSaved, onEditColor, onRenameSaved,
  savedPalettes, searchQuery, showDeleteAllConfirm, toggleExpand
direct writes to port state:
  pm.showDeleteAllConfirm.value = true      (:69)
  pm.showDeleteAllConfirm.value = false     (:113)
```

Sixteen `.value` in a 125-line template is noise; the two **writes** are the defect. Markup in a
feature pane assigns into a ref owned by `usePaletteActions`
(`usePaletteActions.ts:26` `const showDeleteAllConfirm = ref(false)`), reached through two module
boundaries. The port exposes the *state* where it should expose the *operation* — the module
already owns `onDeleteAllSaved()`, which closes the dialog itself
(`usePaletteActions.ts:130`), so the open/close pair is the only member that leaks.

- **Reproduction:** the counts above, from the template block of `PalettesPane.vue`.
- **Proposed cure:** the port publishes `confirmDeleteAll()` / `dismissDeleteAll()` and a
  `deleteAllOpen` **readonly** computed. Separately, `provide()` the ports through `reactive()`
  (or return getters) so consumers read `pm.savedPalettes.length`, not
  `pm.savedPalettes.value.length` — 16 `.value` disappear and the ports become a surface rather
  than an internals dump. This is the same shape as L-3's "declare the port interfaces
  structurally" cure and should land with it.

---

## L-21 — MAJOR — `tsconfig.demo.json` also *omits* a real subpath; the `paths` block is authoritative for nothing

**This corrects pass 2's L-11 in the opposite direction.** Pass 2 found three keys declared that
do not exist. Pass 3 finds a key that exists, is used 10 times, and is **not declared**.

Full `paths` block, comments stripped:

```
$ python3 -c "…json.loads(strip_comments(open('tsconfig.demo.json').read()))…"
{
 "vue": ["./node_modules/vue"],
 "@vue/*": ["./node_modules/@vue/*"],
 "@mkbabb/value.js":          ["./dist/index.d.ts"],        ← phantom (no "." export, no file)
 "@mkbabb/value.js/color":    ["./dist/subpaths/color.d.ts"],
 "@mkbabb/value.js/parsing":  ["./dist/subpaths/parsing.d.ts"],   ← phantom
 "@mkbabb/value.js/math":     ["./dist/subpaths/math.d.ts"],
 "@mkbabb/value.js/easing":   ["./dist/subpaths/easing.d.ts"],
 "@mkbabb/value.js/units":    ["./dist/subpaths/units.d.ts"],     ← phantom
 "@mkbabb/value.js/transform":["./dist/subpaths/transform.d.ts"],
 "@mkbabb/value.js/quantize": ["./dist/subpaths/quantize.d.ts"]
}
```

`@mkbabb/value.js/css` is absent — yet:

```
$ grep -rc '@mkbabb/value.js/css' demo/     →  10 import sites
   e.g. demo/workbenches/gradient/composables/gradientParse.ts:21
        import { parseCssColor, parseCssScalar } from "@mkbabb/value.js/css";
```

So the block declares 3 specifiers that resolve to nothing and omits 1 that 10 files depend on.
It is **neither sound nor complete**. Independently confirmed: `package.json#exports` has exactly
seven keys and no `"."`, and there are no `main` / `module` / `types` fields —

```
$ node -e "p=require('./package.json'); console.log(Object.keys(p.exports)); console.log(p.main,p.module,p.types)"
[ './color', './value', './css', './easing', './math', './transform', './quantize' ]
undefined undefined undefined
```

**Why the omission does not currently break the build, and why that is worse.** The `./css`
imports typecheck only because a self-link happens to exist:

```
$ ls node_modules/@mkbabb/
glass-ui   keyframes.js   value.js          ← the package is linked into its own node_modules
```

TypeScript falls through the missing `paths` key to ordinary node resolution and finds the real
package. So the `paths` block is **load-bearing for nothing**: the entries that work are
redundant with node resolution, and the entries that are wrong are silently unused. It survives
review because it never fails — which is exactly how it drifted to 3 phantom + 1 missing without
anyone noticing.

- **Reproduction:** the four commands above, at HEAD `9268f054`.
- **Proposed cure:** delete the four `@mkbabb/value.js*` `paths` entries outright. Node
  resolution against the self-link already resolves all seven published subpaths through the real
  export map — which makes the demo's type resolution *identical to an external consumer's*,
  which is the whole point of the dogfood. That is strictly better than pass 2's "generate the
  block from `exports`": the most reliable generated config is no config. (Pass 2's L-11 items 1
  and 3 — the missing `"."` export and the false prose in `demo/shared/utils.ts:19` — stand
  unchanged and still need a decision.)

---

## L-22 — MAJOR — the visual matrix never seeds a palette, so this component's real surface is uncaptured; pass 2's negative render proof is withdrawn

Pass 2 closed with: *"No library-structure defect is visible in the render."* That conclusion was
drawn from captures of an **empty** pane.

```
$ grep -n "palette\|localStorage\|color-palettes" docs/tranches/V/megatranche/audit/visual/states.mjs
(no matches)
```

No seeding anywhere in `capture.mjs` or `states.mjs`. The measured consequence, from
`REPORT.json`, all four `/#/palettes` rows:

```
safari-desktop-light  bodyTextLength 237   safari-mobile-light  bodyTextLength 169
safari-desktop-dark   bodyTextLength 237   safari-mobile-dark   bodyTextLength 169
```

237 characters is the empty state. Both light shots and both dark shots show **"· EMPTY PLATE ·
/ No saved palettes yet."** So across **60 captures + 30 state probes**, the following were never
rendered even once:

`PaletteCard` · `PaletteCardMenu` · `PaletteCardMeta` · `PaletteCardSwatches` ·
`PaletteRenameInput` · `ActionFeedback` · `PaletteColorStrip` · `SwatchHoverMenu` ·
the populated `PaletteCardGrid` · the drag handle · the export menu · the delete-all
`Dialog` · the header count `Badge` and its `sr-only` companion (both gated on
`savedPalettes.length > 0`, `:20` / `:25`).

That is the entire reason this component exists. The audit's `/#/palettes` rows report
`pageErrors 0, consoleErrors 0, overflowX 0` — true, and true of a nearly empty card.

Pass 3 seeded three to five palettes and drove the surface. The first two things it found were
a BLOCKER (L-17) and a MAJOR visible in two of the four captured matrices (L-18). The empty-state
capture is not weak evidence; it is **evidence about a different page**.

- **Reproduction:** the grep above; the four `bodyTextLength` values from `REPORT.json`; the four
  screenshots.
- **Proposed cure:** the capture harness gains a seeded matrix. One `page.addInitScript` writing
  `localStorage["color-palettes"]` before navigation — the exact three lines pass 3 used — turns
  60 captures of an empty plate into coverage of the component under audit. Until then, no
  `/#/palettes` row in `REPORT.md` may be cited as evidence that this component renders
  correctly.

---

## L-23 — INFO — pass-2 claims independently re-verified at HEAD `9268f054`

Recorded so a fourth pass need not re-run them.

```
L-13  glass-ui ships the sortable primitive — CONFIRMED
  $ node -e "console.log(require('./node_modules/@mkbabb/glass-ui/package.json').exports['./sortable-list'])"
  { types: './dist/sortable-list.d.ts', import: './dist/sortable-list.js' }
  $ ls node_modules/@mkbabb/glass-ui/dist/sortable-list.js   → present

L-12  dist imports nothing external — CONFIRMED
  $ grep -ohE 'from *"[^"]+"' dist/subpaths/*.js dist/*.js | sort -u
  from "../anchors-C_wdoOYd.js"   from "../operations-CB_1wGy4.js"   from "../result-CZJK1CwL.js"

L-11  three phantom tsconfig keys — CONFIRMED (and extended by L-21)
  exports keys = 7, no "."; dist/index.d.ts, dist/subpaths/parsing.d.ts,
  dist/subpaths/units.d.ts all absent.
```

**L-6 strengthened with a byte measurement.** glass-ui 7.0.0 publishes **74** export keys,
including `./card`, `./button`, `./badge` — the exact three `PalettesPane.vue:129-131` takes
through `demo/ui/` shims that re-export the **root barrel**. Static transitive closure of each
published entry, walked over `node_modules/@mkbabb/glass-ui/dist/`:

```
.          {"files":66,"kib":"218.9"}      ← what ../ui/card, ../ui/button, ../ui/badge reach
./card     {"files":10,"kib":"18.5"}
./button   {"files":11,"kib":"16.8"}
./badge    {"files": 3,"kib": "5.7"}
./dialog   {"files":11,"kib":"23.1"}       ← what :148 already does correctly
./search   {"files":22,"kib":"60.0"}       ← what :149 already does correctly
```

218.9 KiB of eager graph for what three granular subpaths deliver in 41.0 KiB. Route census
demo-wide: **87** import statements go through `demo/ui/` shims, **129** address glass-ui
directly. Both conventions are live, and this file uses both.

---

# Findings — pass 4 (new)

Method note. Passes 1–3 walked the *static* import closure and measured *on-disk* artefacts. Pass 4
adds three instruments:

1. **Live dev-server graph walk** — fetch `http://localhost:9000/@fs/…/PalettesPane.vue` and follow
   Vite's own transformed `import` specifiers transitively. This is the byte stream the browser
   actually pulls for the lazy pane chunk (`usePaneRouter.ts:70` — `defineAsyncComponent`), so the
   chunk boundary is real, not inferred.
2. **Production bundling** with the repo's own `node_modules/.bin/esbuild`
   (`--bundle --format=esm --minify`, vue/reka/value.js external) to separate *dev-graph* cost from
   *shipped* cost.
3. **`tsc --traceResolution`** against a byte-replica of `tsconfig.demo.json`'s
   `moduleResolution`/`baseUrl`/`paths`, to read TypeScript's actual decisions instead of predicting
   them.

Baseline, measured this run:

```
LIVE dev-server module graph rooted at PalettesPane.vue
 modules: 164  bytes: 4933061
  demo/*        : 79 modules   788699 B
  glass-ui      :  8 modules   293136 B
  value.js dist :  5 modules   429115 B
  prebundled dep: 76 modules  3456218 B
```

---

## P4-1 — BLOCKER — `node_modules/@mkbabb/value.js` is **not** a self-link; the demo type-checks `/css` against a stale published tarball while Vite runs the local build. **L-21's cure is an anti-cure.**

**The claim being corrected.** Pass 3 wrote (line 1108): *"The `./css` imports typecheck only
because a self-link happens to exist … `ls node_modules/@mkbabb/` → the package is linked into its
own node_modules"*, and repeated it in the negative proof (line 1241). L-21's cure is built on it:
*"delete the four `@mkbabb/value.js*` `paths` entries outright. Node resolution against the
self-link already resolves all seven published subpaths through the real export map — which makes
the demo's type resolution identical to an external consumer's."*

**It is not a link.**

```
$ test -L node_modules/@mkbabb/value.js && echo SYMLINK || echo "NOT A SYMLINK — real directory"
NOT A SYMLINK — real directory

$ python3 -c "import os; p='node_modules/@mkbabb/value.js'; print('islink:', os.path.islink(p)); print('realpath:', os.path.realpath(p))"
islink: False
realpath: /Users/mkbabb/Programming/value.js/node_modules/@mkbabb/value.js
```

It is an ordinary installed copy of the **published 4.0.0 tarball** (`name @mkbabb/value.js`,
`version 4.0.0`, with its own `LICENSE`/`README.md`), pulled in transitively — `@mkbabb/glass-ui`
and `@mkbabb/keyframes.js` both depend on `@mkbabb/value.js` (their `dist/` imports
`/color`, `/css`, `/easing` and `/css`, `/easing`, `/math` respectively). It is **not** this
checkout.

**What TypeScript actually does.** Replaying `tsconfig.demo.json`'s exact
`moduleResolution: "bundler"` + `baseUrl` + `paths`:

```
$ tsc -p <byte-replica of tsconfig.demo paths> --traceResolution

======== Module name '@mkbabb/value.js/css' was successfully resolved to
  '/Users/mkbabb/Programming/value.js/node_modules/@mkbabb/value.js/dist/subpaths/css.d.ts'
  with Package ID '@mkbabb/value.js/dist/subpaths/css.d.ts@4.0.0'. ========

======== Module name '@mkbabb/value.js/color' was successfully resolved to
  '/Users/mkbabb/Programming/value.js/dist/subpaths/color.d.ts'. ========
```

`/color` has a `paths` entry → the **local build**. `/css` has none → fall-through to node
resolution → the **installed tarball**. Vite aliases *both* to the local build
(`vite.config.ts:41-49`, generated from `package.json#exports`, which does contain `./css`).

**And the two artefacts have already diverged:**

```
$ ls -la dist/subpaths/css.d.ts node_modules/@mkbabb/value.js/dist/subpaths/css.d.ts
Jul 27 11:52  dist/subpaths/css.d.ts
Jul 17 21:10  node_modules/@mkbabb/value.js/dist/subpaths/css.d.ts

$ wc -c node_modules/@mkbabb/value.js/dist/subpaths/css.d.ts dist/subpaths/css.d.ts
10910   node_modules/@mkbabb/value.js/dist/subpaths/css.d.ts
12490   dist/subpaths/css.d.ts

$ wc -l  …
350 / 382 lines
```

Of the seven published `.d.ts` files, **`css.d.ts` is the only one that differs** — and it is
exactly the one subpath with no `paths` entry. The other six are byte-identical, which is why
nothing has broken: they are checked against the local build via `paths`, so no drift is possible.

**Honest bound on today's damage.** The 32-line / 1,580-byte delta is emit-alias noise —
`Alpha_2`, `Channel_2`, `ChannelsBySpace_2`, `Color_2`, `SpaceId_2`. The public export-name sets
are identical:

```
$ diff <(names in installed css.d.ts) <(names in local css.d.ts)
(no output — same public names)
```

So **no semantic break has shipped**. The defect is the mechanism, not a present symptom: any
change to `src/css/**` lands in `dist/` where Vite executes it and never reaches `node_modules/`
where `vue-tsc` reads it, so `npm run typecheck` — a HARD CI step (`package.json:scripts.typecheck`)
— is blind to the `/css` surface by construction. The dogfood keystone
`tsconfig.demo.json`'s header claims (*"the `dist/*.d.ts` trust boundary"*) holds for six subpaths
and is false for the seventh.

**Why L-21's cure makes it worse.** Deleting all four `@mkbabb/value.js*` `paths` entries removes
the only thing pinning `/color`, `/math`, `/easing`, `/quantize`, `/transform` to the local build.
All seven then resolve to the installed 4.0.0 tarball while Vite continues to execute the local
`dist/`. That converts a one-subpath split into a **whole-surface split**, and it silently freezes
the demo's type view at whatever version npm last installed. L-21's *diagnosis* is right and its
*prescription* is inverted.

- **Reproduction:** the five commands above, verbatim, from the repo root. Replica tsconfig at
  `scratchpad/res/tsconfig.json`, probe at `scratchpad/res/probe.ts`.
- **Proposed cure (supersedes L-21's).** Generate the `paths` block from `package.json#exports` at
  config-load time, exactly as `vite.config.ts:41-49` already does for the Vite alias — one
  manifest, two projections, drift impossible by construction. `tsconfig.json` does not execute
  code, so the practical form is a tiny `scripts/sync-tsconfig-paths.mjs` run in `pretypecheck`
  (which already exists and already runs `npm run build`) that rewrites the block and fails if it
  changed — a generated file that is checked in and gated, not hand-maintained. That kills the three
  phantom keys (L-11) and the one missing key (L-21) in the same stroke and cannot regress.
  Pass 2's L-11 items 1 and 3 (the absent `"."` export; the false prose at
  `demo/shared/utils.ts:16`) still need an owner decision and are untouched by this.

---

## P4-2 — MAJOR (sharpens L-3) — the key co-location costs **27 modules / 262,662 served bytes**, measured live

L-3 established the disease (InjectionKeys co-located with the provider) and priced it as a
97-module *static* closure. Measured against the running dev server, blocking exactly one edge —
`PalettesPane.vue:134`'s import of `./usePalettePorts` — and nothing else:

```
$ node scratchpad/devgraph3.mjs
FULL      : 164 modules, 4933061 bytes
WITHOUT usePalettePorts (keys moved to a leaf module): 137 modules, 4670399 bytes
DELTA: 27 modules, 262662 bytes eliminated
```

The demo-source half of that delta, itemised (`scratchpad/devgraph2.mjs`, live transformed bytes):

| module | bytes |
|---|---:|
| `demo/palettes/useBrowsePalettes.ts` | 25,594 |
| `demo/palettes/useAdminUsers.ts` | 20,777 |
| `demo/palettes/useColorNameQueue.ts` | 12,321 |
| `demo/palettes/useSlugMigration.ts` | 11,976 |
| `demo/palettes/useAdminFlagged.ts` | 11,668 |
| `demo/palettes/useAdminTags.ts` | 9,700 |
| `demo/palettes/useVersionHistory.ts` | 9,299 |
| `demo/palettes/useAdminAudit.ts` | 8,221 |
| `demo/palettes/useTagEdit.ts` | 6,172 |
| `demo/palettes/api/admin-colors.ts` | 6,069 |
| `demo/palettes/api/admin-users.ts` | 5,512 |
| `demo/platform/auth/useAdminAuth.ts` | 4,548 |
| `demo/palettes/api/admin-palettes.ts` | 4,237 |
| `demo/palettes/api/versions.ts` | 3,693 |
| `demo/palettes/api/admin-audit.ts` | 2,996 |
| `demo/palettes/api/colors.ts` | 1,114 |
| **16 modules** | **143,897** |

The pane renders a search field, a card grid and a delete dialog. It fetches the entire admin
console, the remote-browse surface, version history, tag editing and slug migration **to read two
`Symbol()` values**. ESM has no partial evaluation; a module is all-or-nothing.

This also settles a question passes 1–3 left open: the pane *is* `defineAsyncComponent`-lazy
(`usePaneRouter.ts:70`), so this is a genuinely isolated chunk and the 27 modules are not
double-counted against app boot. (L-3's separate finding — that `Dock.vue:18` puts
`SESSION_PORT_KEY` on the **eager** boot path — is orthogonal and stands.)

Nothing about L-3's cure changes; it now has a number. `demo/color-session/keys.ts` remains the
in-repo proof that the leaf-keys form works: this same file imports `CSS_COLOR_KEY` from it
(`PalettesPane.vue:135`) and pays nothing.

- **Reproduction:** `node scratchpad/devgraph2.mjs`, `node scratchpad/devgraph3.mjs`, against the
  dev server already running on :9000. Read-only; no navigation, no interaction.

---

## P4-3 — INFO (scoping correction to L-6 / L-23, and to the `/css` barrel argument) — the barrel drags are **dev-graph and latency**, not shipped bytes

L-23 measured the glass-ui root barrel at *"218.9 KiB / 66 files vs `./card`+`./button`+`./badge` =
41.0 KiB / 24 files"*. That is a **disk** measurement of the module graph. It reads like a shipping
blocker and it is not one. Bundled the way the demo actually ships:

```
$ esbuild c.js --bundle --format=esm --minify --external:vue --external:reka-ui …
c  26540 bytes   ← Card + Button + Badge from "@mkbabb/glass-ui"          (root barrel)
d  25571 bytes   ← the same three from "./card", "./button", "./badge"    (narrow subpaths)
```

**969 bytes.** glass-ui declares `sideEffects: ["*.css"]`, so Rollup/esbuild shake the barrel
correctly. The same correction applies to `@mkbabb/value.js/css`, which
`demo/color-session/ink.ts:8-11` consumes for 2 of its 19 runtime exports:

```
a  12778 bytes   ← parseCssColor + serializeCssColor only
b  38540 bytes   ← the whole css subpath
```

Tree-shaking recovers **25,762 B**. On disk `dist/subpaths/css.js` is 43,973 B and pulls
`anchors-C_wdoOYd.js` (12,472 B) + `result-CZJK1CwL.js` (100 B).

**What this does and does not change.** L-6 stands unchanged as a *structure* finding — 19 pure
re-export shims are a second naming authority for every design-system component, and
`PalettesPane.vue` proves it by using both dialects in one import block (`:129-131` shim vs
`:148-149` direct). Delete `demo/ui/` because there must be one name per concept, not because it
costs bytes. Likewise, splitting the `css` subpath into `css/color` + `css/stylesheet` is an
elegance and dev-latency argument. **Do not escalate either on bundle size; the measurement above
is the reason.**

Where the drag *is* real is the unbundled dev server, which is what `localhost:9000` serves and
what the visual matrix measured: `@mkbabb_glass-ui.js` alone is **234,285 B** of this pane's
293,136 B glass-ui footprint. Eleven modules in the pane's graph reach the root barrel — the seven
`demo/ui/*` shims plus four direct reaches that bypass their own shims:

```
$ node scratchpad/devgraph4.mjs
ROOT-BARREL importers (@mkbabb/glass-ui):
    /demo/palettes/browser/card/PaletteCard/PaletteCard.vue
    /demo/palettes/browser/card/PaletteCard/PaletteCardSwatches.vue
    /demo/palettes/browser/card/composables/useSwatchActions.ts
    /demo/palettes/usePaletteActions.ts
    /demo/ui/{badge,button,card,dropdown-menu,popover,skeleton,tooltip}/index.ts
```

`demo/ui/input/index.ts` already does it correctly (`@mkbabb/glass-ui/forms`), so the narrow form
is a known idiom that was never propagated.

---

## P4-4 — MAJOR — the demo's three module-lattice eslint rules glob a tree that W43 deleted; `demo/palettes/**` has **zero** structural enforcement

`eslint.config.js` carries three boundary rules whose comments describe them as the standing
guarantee for the demo module graph — G-DEMO-3b: *"the palette-browser mega-feature is reached
through its BARREL SEAM … never a raw internal `.vue` file"*; G-DEMO-1/3a: *"wired STANDING so a
future feature edit cannot silently re-invert the demo module graph."*

Every glob and every pattern addresses the pre-W43 tree. W43 (RF-15 §b, commit `bc06a0cd`) deleted
it:

```
$ ls -d demo/@
ls: demo/@: No such file or directory

$ grep -rn "@components/custom" --include='*.ts' --include='*.vue' demo/
demo/palettes/browser/status/index.ts:5:// (@components/custom/dock/DockStatusLamp.vue); the S.W0-1 honesty contract …
                                                    ↑ the sole hit is inside a COMMENT
```

Rule by rule:

| rule | file glob | files matched | banned pattern | imports matched |
|---|---|---:|---|---:|
| G-DEMO-3b | `demo/@/components/**`, `demo/@/lib/**` | **0** | `@components/custom/palette-browser/**/*.vue` | **0** |
| G-DEMO-3b | `demo/color-picker/**` | 16 | same | **0** |
| G-DEMO-1 | `demo/@/composables/**` | **0** | `**/color-picker/**` | **0** |
| G-DEMO-3a | `demo/@/composables/**` | **0** | `@components/custom/*/composables/**` | **0** |

**No rule globs `demo/palettes/**`.** The subject and its whole feature tree sit outside structural
enforcement entirely:

```
$ npx eslint demo/palettes/PalettesPane.vue demo/palettes/usePalettePorts.ts demo/palettes/usePaletteExport.ts
(no output — clean)
```

That is the mechanism by which L-1 through L-23 coexist under a CI gate that runs
`eslint . --max-warnings=0` as a HARD step. This is the boundary-layer twin of L-19 (which found
`no-unused-vars` disabled at the hygiene layer): between them, neither dead imports nor inverted
module edges are detectable, and the gate is green in both cases.

The deeper defect is that **a lint rule whose glob matches nothing cannot fail.** It passed review
in W43 for the same reason it passes CI now: silence is indistinguishable from compliance.

- **Reproduction:** the four commands above.
- **Proposed cure.** (i) Re-aim all three rules at the post-W43 physical tree, and add the edges
  this audit found: `demo/palettes/**` may not import `demo/shell/**` (L-3's `ViewId` edge);
  nothing outside the composition root may import the port *provider* (P4-2); no file may import
  `demo/ui/**` once L-6's cure lands. (ii) Add a one-line assertion — in `eslint.config.js` itself
  or a `pretest` script — that **every** `files:` glob in the config matches ≥1 file, failing
  otherwise. A dead glob is then a build error rather than a silent pass, which is the only
  structural fix; re-aiming the rules without it just resets the clock until the next rename.

---

## P4-5 — INFO — two module-specifier dialects in one program

```
$ grep -rhoE 'from "\.[^"]*"' --include='*.ts' --include='*.vue' demo/ | grep -c  '\.js"'   →   4
$ grep -rhoE 'from "\.[^"]*"' --include='*.ts' --include='*.vue' demo/ | grep -vc '\.js"'   → 676
```

All four extension-ful specifiers are in `demo/platform/transport/` — `client.ts:27,34` and
`useApiClient.ts:19,20` — and both files are in this pane's runtime closure. Under
`moduleResolution: "bundler"` the `.js`→`.ts` mapping resolves, so nothing breaks; this is a
consistency defect, not a correctness one. Normalise to extensionless, which is the demo's
99.4 % convention.

---

## P4-6 — INFO — pass-1..3 claims re-verified at this HEAD

Re-run this pass, all confirmed:

| claim | pass | verification |
|---|---|---|
| `exports` has 7 keys, no `"."` | 2 (L-11) | `node --input-type=module … import.meta.resolve('@mkbabb/value.js')` → `ERR_PACKAGE_PATH_NOT_EXPORTED`; `/css` and `/color` both `OK` |
| `dist/index.d.ts`, `subpaths/parsing.d.ts`, `subpaths/units.d.ts` do not exist | 2 (L-11) | `ls dist/subpaths/` → color, css, easing, math, quantize, transform, value; `ls dist/index.d.ts` → *No such file* |
| `demo/ui/` is 19 pure re-export shims | 1 (L-6) | full `cat` of all 19 `index.ts` — every one a bare `export { … } from "@mkbabb/glass-ui…"` |
| dual export path; `./export` resolves to the legacy file | 1 (L-2) | `grep -rnE 'from "(\.\./)*\.?/?export(/[a-z0-9]+)?"' demo/ test/ e2e/ src/` → exactly 2 hits: the test on `export/serializers`, `usePaletteExport.ts:9` on `./export`; no `export/index.ts` exists |
| the byte-exact set is 12 modules | 1 (L-2) | `wc -c demo/palettes/export/*.ts` → **34,867 B** total, 0 app consumers |
| `reorderPalettes` completes a partial order by appending | 3 (L-17) | `usePaletteStore.ts:161-165` — `for (const p of store.value.palettes) if (p.id == null || !orderedIds.includes(p.id)) reordered.push(p)`. Mechanism confirmed by reading; the live drag was **not** re-run this pass (the shared Playwright browser was held by another seat: `Error: Browser is already in use for … mcp-chrome-83447af`). Pass 3's live reproduction stands. |
| vueuse's default `onUpdate` survives an `onEnd`-only options object | 1 (L-1) | `node_modules/@vueuse/integrations/dist/useSortable.js:11-16` — `defaultOptions = { onUpdate }`, then `new Sortable(target, { ...defaultOptions, ...resetOptions })`; `moveArrayElement` at `:77-91` opens with `removeNode(e.item); insertNodeAt(e.from, e.item, from)` — raw DOM surgery on a Vue-managed subtree |
| glass-ui ships narrow `./card` `./button` `./badge` subpaths | 2 (L-6) | `package.json#exports` of glass-ui — 74 subpaths incl. all three; `dist/card.js` 217 B, `button.js` 71 B, `badge.js` 92 B vs `glass-ui.js` 25,239 B of re-export statements over 66 chunks |

**Pass-4 reproduction artefacts** (session-local scratchpad, not repo state; every command is
pasted inline above and rerunnable from the repo root):
`scratchpad/graph3.out` (static closure, runtime vs type-inclusive) ·
`scratchpad/devgraph2.mjs` (live graph + subsystem census) ·
`scratchpad/devgraph3.mjs` (the P4-2 counterfactual) ·
`scratchpad/devgraph4.mjs` (root-barrel importers, value.js dist entries) ·
`scratchpad/bundletest/` (P4-3 esbuild a/b/c/d) ·
`scratchpad/res/{probe.ts,tsconfig.json}` (P4-1 traceResolution replica).
**No source file was modified by this seat.**

---

# Negative proof — what is genuinely SOUND here (amended twice)

The challenge's headline hypothesis is that the demo imports the library through paths a real
consumer could not write. **At runtime, it does not.** Positive evidence:

1. **Every value.js import in `demo/` is a bare published subpath specifier.** Exhaustive census,
   re-run at pass 3 (HEAD `9268f054`; the tree has grown one `/color` site since pass 1) — all 50
   sites, no exceptions:
   ```
   $ grep -rho '@mkbabb/value\.js[a-z/]*' demo/ | sort | uniq -c
     25 @mkbabb/value.js/color
     10 @mkbabb/value.js/css
      6 @mkbabb/value.js/math
      5 @mkbabb/value.js/easing
      4 @mkbabb/value.js/quantize

   $ grep -rn '@src/\|from "\.\./\.\./src/\|value\.js/src' demo/
   (no matches)

   $ grep -rn '@mkbabb/value\.js"' demo/
   demo/shared/utils.ts:16    ← prose in a comment, not an import (and the claim is false — L-11)
   ```
   Zero `../../src/…`, zero `@src/…`, zero `dist/…`, zero root-barrel imports. Every one of these
   five specifiers **is** in `package.json#exports`. A real consumer could write all 50.
   **⚠ Pass-3 nuance (L-21): one of the five — `./css`, 10 sites — is not declared in
   `tsconfig.demo.json`'s `paths`. It typechecks only because the package is self-linked into
   its own `node_modules`. The imports are legitimate; the config that is supposed to certify
   them is not the thing certifying them.**
   **⛔ Pass-4 correction (P4-1): "self-linked" is FALSE. `test -L node_modules/@mkbabb/value.js`
   → not a symlink; it is a real installed **4.0.0 tarball** pulled in transitively by glass-ui
   and keyframes.js. `tsc --traceResolution` shows `/css` resolving to
   `node_modules/@mkbabb/value.js/dist/subpaths/css.d.ts@4.0.0` (Jul 17, 350 lines) while Vite
   executes `dist/subpaths/css.js` (Jul 27 build). The demo type-checks one artefact and runs
   another. The statement "the imports are legitimate" still stands — a real consumer could write
   all 50 specifiers — but "it typechecks against the real package" does not.**
2. **The Vite alias set cannot drift from the export map**, because it is *generated from it*.
   `vite.config.ts:37-50` reads this repo's own `package.json#exports` at config time and derives
   one anchored-regex alias per subpath. The anchoring is deliberate and load-bearing — the
   comment at `:30-36` records the R-era demo boot break caused by the prefix-matching string form.
   **⚠ Amended by L-11: this property belongs to the Vite half only. The TypeScript half
   (`tsconfig.demo.json` `paths`) is hand-written and has drifted by three keys.**
3. **`tsconfig.demo.json` has no `@src/*` path**, so a deep import would not typecheck from the
   demo tree; `@src` survives only for the exempt `assets/docs/*.md` source-embedding plugin.
   This part stands.
4. **`PalettesPane.vue`'s own closure** reaches value.js only through `@mkbabb/value.js/color` and
   `/css` (`demo/palettes/mix.ts:14`,
   `demo/color-session/{picker-color,view-accent,ink,color-utils,generate-color}.ts`) — all bare
   subpaths. This part stands.

So: the demo does not reach into `src/`, and what it *does* import it imports legitimately. The
defect is on the other side of the boundary — the published surface is incomplete (no root, L-11),
over-declared in the demo's type config (three phantom keys, L-11), over-specified in the manifest
(two unused runtime deps, L-12), and missing the one domain this component exists to demonstrate
(L-16).

Two further soundnesses worth recording so a later seat does not re-litigate them:

- **`demo/shared/ui/PaneHeader.vue` is not an edict-3 contrivance.** `demo/shared/` predates this
  work (3 files total), and PaneHeader has 9 real consumers with genuine encapsulation (it owns
  `--pane-scroll`, the named scroll-timeline, and its only consumers). It *would* be a glass-ui
  primitive under edict 4 — the file repeatedly books `ScrollCardHeader` as pending — but
  re-verified at pass 2: `grep -rl "ScrollCard" node_modules/@mkbabb/glass-ui/dist/` → **empty**.
  No `ScrollCardHeader` exists in glass-ui 7.0.0. So this is a *proposal to glass-ui*, not a
  violation. Note the contrast with L-13, where the primitive **does** exist and the demo
  hand-rolled anyway — that is what makes L-13 a finding and this not one.
- **`../color-session/keys` (`PalettesPane.vue:135`) is a correct cross-area edge.** Colour state is
  genuinely owned by `color-session`; the key module is a leaf; 26 consumers; no cycle. This is the
  pattern L-3 asks `palettes` to adopt.

---

# The greenfield lattice

Structured today with no legacy, this is four strata with a strict downward dependency direction
and no cycles. Pass 2 lifts `platform` and `domain` out as explicit floors, because L-3, L-12 and
L-16 are all the same disease: things that should be at the bottom of the stack are living inside
one feature.

```
  ┌─ platform/                          NO imports from anything above
  │    http/          the ONE typed fetch client + error boundary
  │    auth/          useSession · useUserAuth · useAdminAuth        (already here)
  │    storage/       the localStorage binding  (usePaletteStore moves OUT of palettes/)
  │
  ├─ domain/  (pure, no Vue, no DOM)
  │    palette/       the Palette algebra + ONE slugifier; slugs minted at creation,
  │                   never re-derived. Ideally re-exported FROM @mkbabb/value.js/palette (L-16)
  │    export/        the W51 byte contract, index.ts as its barrel — the ONLY serializer
  │                   set; download.ts is a function, not a composable (L-2)
  │    mix/           mix.ts moves here
  │
  ├─ features/  (Vue reactivity; each owns its keys.ts LEAF)
  │    library/       keys.ts (InjectionKeys + hand-written port interfaces, type-only imports —
  │                   the ONLY module another area may import)
  │                   store.ts   sole owner of palette ORDER; movePalette(fromId,toId).
  │                              No caller ever computes a permutation.  (kills L-1 by construction)
  │                   feedback.ts  Map<paletteKey, Feedback> — one home for card feedback (L-5)
  │                   PalettesPane.vue + browser/card/
  │    browse/        remote projection
  │    admin/         its own composables AND its own api/ — imported by NOTHING outside admin/,
  │                   mounted async, never in another pane's closure  (kills 18 of L-3's 97)
  │    session/       colour pipeline, edit target, commit()/cancel()  (kills L-14, L-15)
  │    workbenches/{mix,generate,gradient,extract}
  │
  └─ shell/           dock, router, view manager. Imports feature keys.ts leaves and
                      platform/auth DIRECTLY. Never the reverse.
     app/             App.vue: mounts stores, mounts shell. No component instance refs.
```

Seven properties this buys, each of which kills a finding above **by construction** rather than by
vigilance:

1. **Each feature's `keys.ts` is a leaf** → the shell↔palettes cycle (L-3) cannot form, and
   `PalettesPane`'s closure drops from 97 modules to roughly its own card subtree plus `session`.
2. **The shell reads `platform/auth` directly** → `SESSION_PORT`'s seven-member pass-through
   deletes; identity is read where it lives.
3. **The store is the sole owner of order, exposing `movePalette(id, before)`, and the grid is
   `<SortableList>`** → L-1 cannot recur (no view holds a list to splice, so the vueuse
   ref/non-ref branch is unreachable), **L-17 cannot recur** (no caller ever supplies a total
   ordering, so a filtered projection can no longer imply one), and L-13 closes, taking
   `sortablejs` and `@types/sortablejs` out of the tree.
4. **`export/index.ts` is the barrel** → `./export` resolves to the contract set, `export.ts` has
   no name to occupy, and L-2 and L-4 both close by deletion rather than migration.
5. **Ports declared as interfaces, not `ReturnType<typeof …>`** → the port contract becomes
   checked rather than inferred, and typechecking a pane stops requiring inference over the admin
   console.
6. **Session owns edit state** → L-14's second transport and L-15's whole mechanism (including the
   2 s mount poll and its `console.warn`) delete; no component instance is ever a dependency.
7. **`domain/palette` is one definition** → whether it lives in the library or the demo, the API,
   the exporter and the store stop each having their own (L-16, L-4).

`PalettesPane.vue` at the end of that is roughly: template + `const library = useLibraryStore()` +
`const session = useColorSession()`. No props, no emits, no injects of aggregate ports, no refs
into children, no `as any`, no inline token aliasing — and one import convention.

**Ordering note for whoever executes (revised at pass 3).**

0. **L-22 first, and it is nearly free** — three lines in the capture harness. Until the matrix
   seeds a palette, no gate in this program can observe whether any of the rest actually landed.
   Every other item here is verified by a probe that only exists in a scratchpad.
1. **L-17 + L-1 together, via the store** — the single `movePalette(id, before)` transposition
   closes both, and L-17 is silent user-data destruction that is live right now.
2. **L-3** (extract `keys.ts`): mechanical, no behaviour change, and it unblocks the closure
   reduction that makes everything else cheap to verify.
3. **L-11 / L-21 / L-12 / L-19**: manifest, tsconfig and lint-config edits measured in lines.
   L-21's cure (delete the four value.js `paths` entries) is a four-line deletion and makes the
   demo's type resolution identical to an external consumer's. L-19 is one rule re-enabled plus
   six deletions.
4. **L-13**, **L-2**, **L-18** are independent of the above and of each other. L-18 should be
   scheduled deliberately rather than folded into L-7 — L-7 is a placement fix and will make the
   dark-scheme collapse *tidier* without making it *stop*.

## Pass-4 addenda to the lattice

The four strata above are right and pass 4 does not restate them. Three amendments:

**(a) One manifest, two projections — and step 3 of the ordering note must change.**
`package.json#exports` is the single authority for the published surface. `vite.config.ts:41-49`
already derives its alias set from it and therefore cannot drift; `tsconfig.demo.json`'s `paths`
is a hand-written third copy and has drifted by three phantom keys (L-11) *and* one missing key
(L-21) *and* silently repoints one subpath at a different artefact (P4-1).

> **⛔ Correction to ordering step 3.** It reads: *"L-21's cure (delete the four value.js `paths`
> entries) is a four-line deletion and makes the demo's type resolution identical to an external
> consumer's."* Per P4-1 that is false — `node_modules/@mkbabb/value.js` is an installed tarball,
> not a self-link, so the deletion makes all seven subpaths resolve to a **stale published copy**
> while Vite runs the local build. **Do not execute L-21 as written.** Generate the block from
> `exports` instead (a `pretypecheck` sync script that rewrites and diff-fails), which closes
> L-11, L-21 and P4-1 in one stroke and cannot regress.

**(b) Keys are leaves, and the invariant is mechanical.** L-3's `keys.ts` extraction is the right
shape; P4-2 prices it at 27 modules / 262,662 served bytes for this pane alone. The lattice should
state the rule so it generalises past `palettes/`: **a module that declares an `InjectionKey` may
have type-only imports and nothing else.** That single sentence is checkable by lint and is what
`demo/color-session/keys.ts` already satisfies. Split the provider by port on the same principle,
so `provideAdminPort()` is `import()`ed by the admin route rather than statically linked into every
consumer of every other port.

**(c) The lattice needs a gate, or it is prose.** P4-4 is the reason this component can hold
twenty-odd structural findings and still pass `eslint . --max-warnings=0`: the three rules that
encode the demo's module lattice glob a directory tree that no longer exists, and the feature this
audit is about is covered by none of them. Whatever lattice is adopted, the executing wave must
(i) re-aim those rules at the physical tree and add the edges found here — `palettes → shell`
banned, provider-import restricted to the composition root, `demo/ui/**` banned once it is
deleted — and (ii) assert that **every `files:` glob in `eslint.config.js` matches at least one
file**, failing the build otherwise. Without (ii) the next rename silently disarms the lattice
again, exactly as W43 did, and nothing will report it.

---

# Summary table

| ID | Pass | Severity | Defect | Anchor |
|---|---|---|---|---|
| L-1 | 1 | **BLOCKER** | Drag-to-reorder persists a corrupted order (fwd) / silently drops it (back) — dereferenced computed passed to `useSortable`, `onEnd` not overriding `onUpdate`, computed cache mutated in place. Re-reproduced at pass 3: seeded `A,B,C`, drag 0→2, persisted `C,B,A` | `PalettesPane.vue:180-197` |
| L-17 | **3** | **BLOCKER** | **Second, independent mechanism.** A drag under an active search filter rewrites palettes the user cannot see: `reorderPalettes` is a *total* primitive fed a *filtered projection*, so non-matching palettes are appended to the tail. Seeded `A..E`, filtered to `B,D,E`, dragged one slot → persisted `D,B,E,A,C`. **Survives L-1's and L-13's cures** | `PalettesPane.vue:190-194`; `usePaletteStore.ts:153-166` |
| L-2 | 1 | **BLOCKER** | Dual export impls; app ships `export.ts`, 78 assertions test `export/` — they disagree in prefix, index base, colour spelling, and (pass 2) in domain model | `export.ts` ∥ `export/`; `usePaletteExport.ts:9` |
| L-18 | **3** | MAJOR | The owner-RULED (Q5/T-43) letterform ramp is measurably dead in dark: chroma collapses 5.4–8.9×, three stops span ΔB=24/ΔG=3/ΔR=0 at L=95.8%. Visible in both dark shots. Producer / recipe / alias live in three modules, so no module can assert the spread invariant | `useViewAccents.ts:163`; `utils.css:184-201`; `PalettesPane.vue:171-175`; `palettes-ramp.ts:30-37` |
| L-21 | **3** | MAJOR | `tsconfig.demo.json` `paths` **omits** `@mkbabb/value.js/css` (10 live sites) while declaring 3 phantom keys; it resolves only via a self-link, so the block is authoritative for nothing. **Corrects pass 2's L-11 in the opposite direction** | `tsconfig.demo.json`; `node_modules/@mkbabb/value.js` |
| L-22 | **3** | MAJOR | The visual matrix never seeds a palette (`bodyTextLength` 237/169 = the empty state in all 4 rows), so 12 components incl. the card, grid, drag handle, export menu and delete-all dialog are uncaptured across 60 shots + 30 states. **Withdraws pass 2's negative render proof** | `visual/states.mjs`; `visual/REPORT.json` `/#/palettes` rows |
| L-3 | 1+2 | MAJOR | palettes ⇄ shell cycle from co-locating InjectionKeys with the provider; 97-module closure, 18 admin, on the eager boot path; shell reaches through palettes for `platform/auth` | `usePalettePorts.ts:5-7,19,271-275`; `Dock.vue:18` |
| L-4 | 1 | MAJOR | Three slugifiers; filename disagrees with the slug inside the file it names | `utils.ts:3`, `export.ts:9`, `canonical.ts:50` |
| L-5 | 1 | MAJOR | `cardRefs` imperative feedback registry duplicated, keyed by `id` here and `slug` in BrowsePane; both leak | `PalettesPane.vue:177,84,205` |
| L-6 | 1 | MAJOR | 19 pure re-export shims in `demo/ui/`; this file uses both the shim and the direct subpath in one block | `demo/ui/*/index.ts`; `PalettesPane.vue:129-131` vs `:148-149` |
| L-11 | **2** | MAJOR | `exports` has no `"."`; `tsconfig.demo.json` declares 3 specifiers absent from the map and missing on disk; `demo/shared/utils.ts:19` asserts a root barrel that does not exist. **Corrects pass 1's negative proof §2** | `package.json#exports`; `tsconfig.demo.json`; `demo/shared/utils.ts:12-19` |
| L-12 | **2** | MAJOR | glass-ui + keyframes.js are runtime `dependencies` of a package whose `src/` and `dist/` import neither | `package.json#dependencies`; `src/`; `dist/subpaths/*.js` |
| L-13 | **2** | MAJOR | glass-ui 7.0.0 ships `SortableList`/`SortableItem`/`SortableHandle`; the pane hand-rolls `useSortable` + `sortablejs` and reaches a child's `$el`. **Amends L-1's cure** | `glass-ui/sortable-list`; `PalettesPane.vue:133,181,183`; `PaletteCardGrid.vue:8-12` |
| L-14 | **2** | MAJOR | `savedColorStrings` reaches the subtree as a de-reffed prop AND as a `Ref` ports dep, from one origin | `usePaneRouter.ts:155`; `PalettesPane.vue:154`; `usePalettePorts.ts:36` |
| L-15 | **2** | MAJOR | Commit-edit has two mechanisms; the instance-ref one needs a 40×50 ms mount poll that gives up with a `console.warn` | `usePaneRouter.ts:156-157`; `usePalettePorts.ts:239`; `usePaletteWiring.ts:31-58` |
| L-7 | 1 | MINOR | Per-instance `:style` override of a root recipe, duplicating the oklch triple | `PalettesPane.vue:15,171-175` vs `utils.css:195-197` |
| L-8 | 1 | MINOR | `watch` / `onMounted` / `nextTick` imported, 0 uses | `PalettesPane.vue:128` |
| L-9 | 1 | MINOR | Dead `@composables/…` alias cited as live in 6 files | `PalettesPane.vue:6` + 5 |
| L-16 | **2** | MINOR | `Palette` has three homes and none is the library; `src/` has zero palette code while `package.json:16` advertises the keyword | `demo/palettes/types.ts`; `api/src/modules/palette`; `export/types.ts`; `src/` |
| L-19 | **3** | MINOR | `no-unused-vars` is `off` in every eslint block (8 sites), so the HARD `--max-warnings=0` CI gate cannot see dead imports at all. This component holds 3 of the demo's 6 | `eslint.config.js:71,81,118,153,154,182,185,186` |
| L-20 | **3** | MINOR | The library port publishes raw refs: 16 `.value` in a 125-line template, and the template **writes** `pm.showDeleteAllConfirm.value` across two module boundaries | `PalettesPane.vue:69,113`; `usePalettePorts.ts:138-154` |
| **P4-1** | **4** | **BLOCKER** | `node_modules/@mkbabb/value.js` is **not** a self-link — it is a real installed 4.0.0 tarball. `/css` (no `paths` entry) type-checks against it (Jul 17, 350 lines, 10,910 B) while Vite executes the local build (Jul 27, 382 lines, 12,490 B): the demo's HARD typecheck is blind to the `/css` surface. **Corrects L-21's diagnosis and inverts its cure** — deleting the four `paths` entries would extend the split from 1 subpath to all 7 | `tsconfig.demo.json:41-48`; `node_modules/@mkbabb/value.js/`; `dist/subpaths/css.d.ts` |
| **P4-4** | **4** | MAJOR | G-DEMO-1 / G-DEMO-3a / G-DEMO-3b glob `demo/@/**`, a tree W43 deleted → **0 files, 0 imports matched**; no rule globs `demo/palettes/**`. `npx eslint` on the subject + provider + export composable is silent. The boundary-layer twin of L-19 | `eslint.config.js:220-256,257-300`; `ls -d demo/@` |
| **P4-2** | **4** | MAJOR | Live measurement of L-3: blocking the single `./usePalettePorts` edge removes **27 modules / 262,662 served bytes** from the pane's lazy chunk, 16 of them (143,897 B) the admin console + browse + versions + tags + slug migration. Sharpens L-3's static 97-module estimate | `PalettesPane.vue:134`; `usePalettePorts.ts:251-255` |
| L-10 | 1 | INFO | `./value` and `./transform` published with 0 demo dogfood sites | `package.json#exports` |
| **P4-3** | **4** | INFO | **Scoping correction to L-6 / L-23.** Production esbuild: root barrel vs narrow subpaths for Card+Button+Badge = **969 B** delta; whole `css` subpath vs 2 symbols = 38,540 vs 12,778 B. Both barrels tree-shake. L-6's cure stands on naming authority; **do not escalate on bytes** | `scratchpad/bundletest/`; glass-ui `sideEffects: ["*.css"]` |
| **P4-5** | **4** | INFO | 4 extension-ful (`./x.js`) vs 676 extensionless relative specifiers; all four in `demo/platform/transport/`, both files in this pane's closure | `client.ts:27,34`; `useApiClient.ts:19,20` |
| **P4-6** | **4** | INFO | Eight pass-1..3 claims independently re-verified at this HEAD (exports map, phantom `dist` files, 19 shims, dual export path, 34,867 B unwired serializer set, `reorderPalettes` partial-order completion, vueuse `onUpdate` survival, glass-ui narrow subpaths) | see P4-6 |
| L-23 | **3** | INFO | Pass-2 claims L-11 / L-12 / L-13 independently re-verified at HEAD `9268f054`; L-6 strengthened with a byte measurement (root barrel 218.9 KiB / 66 files vs `./card`+`./button`+`./badge` = 41.0 KiB / 24 files; 87 shim-routed vs 129 direct imports demo-wide) | see L-23 |

**Reproduction artefacts.** Pass 1: `scratchpad/reorder-probe.mjs`, `scratchpad/reorder-probe2.mjs`
(L-1), `scratchpad/closure.mjs` (L-3). Pass 3: `scratchpad/probe.mjs` (L-1 mechanism, isolated
against the real `moveArrayElement`), `scratchpad/live.mjs` (L-1 live, `A,B,C` → `C,B,A`),
`scratchpad/live3.mjs` (L-17 live, filtered drag), `scratchpad/ramp.mjs` (L-18 token
measurement). All other findings reproduce from the shell commands pasted inline.
**No source file was modified by any of the three seats.**

**Visual evidence checked (pass 3) — and pass 2's conclusion withdrawn.**
Four screenshots read directly:
`shots/safari-desktop-light/palettes.png`, `shots/safari-desktop-dark/palettes.png`,
`shots/safari-mobile-dark/palettes.png` (pass 2 read the first only).

Pass 2 wrote: *"No library-structure defect is visible in the render."* **That is withdrawn.**
Two things were wrong with it. First, all four captures are of an **empty** pane — 237 / 169
characters of body text, "· EMPTY PLATE · / No saved palettes yet." — so the render being
certified is not this component's render (L-22). Second, a defect **is** visible in the frames
that were captured: in both dark matrices the ramped "Palettes" letterforms render as the same
cream as "My", the ruled rainbow absent, which the token measurement in L-18 confirms as a
5.4–8.9× chroma collapse rather than a rendering artefact.

What does still stand from pass 2's reading: `overflowX 0`, `main`=1, 0 page errors and 0 console
errors on all four `/#/palettes` rows, and the `namelessButtons: 1` on desktop tracking the left
picker pane rather than this component (`PalettesPane`'s only icon-only button carries
`aria-label="Delete all saved palettes"`, `:68`). Also standing: `h1` = **0** on this route in all
four matrices — `demo/shared/ui/PaneHeader.vue:31` hardcodes `<h3>` and its prop surface is
`{ description?: string }` with no level, so no pane can own its own heading rank. That is a
public-surface gap in a shared component, recorded here for whichever seat owns `PaneHeader`.

The honest summary is the opposite of pass 2's: **most findings here are invisible to the eye, but
not all — and the ones that are visible were missed because the matrix photographed an empty
page.** Fix L-22 first.
