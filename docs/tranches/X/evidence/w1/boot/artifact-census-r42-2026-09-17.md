SERVED MODEL: claude-opus-5[1m]

# X.W1.c · R42 — THE POST-`c4af0ef9` gh-pages ARTIFACT CENSUS

**X-W1-FOLD `R42 · Katex residue 12` (cl.3 · MEASURE-AT-OPEN · INFO), `X-W1-FOLD.md:711-717`:**

> *"The library re-reader's rebuild receipts (122 assets, vendor-katex emitted, **not in the
> modulepreload set**) are adopted as its receipts; this seat ran no build. **One fresh
> `npm run gh-pages` + artifact census at the next X-W1/X-W2 sitting closes it.**"* Rides G-13's
> MEASURE-AT-OPEN prod-preview build — the census is a free by-product of the build G-13 already
> runs.

**The build was run.** ⟨`npm run gh-pages`⟩ in `/Users/mkbabb/Programming/value-js-x-w1-c` at
**`cad51f9e`** (this unit's script commit; the census was first taken at the unit's base `f62bf82b`
and RE-TAKEN here after a sibling seat's `demo/color-picker/composables/boot/useAtmosphere.ts` +
`demo/scenes/blob/BlobPane.vue` landing moved the entry chunk — the figures below are the settled
ones), 2026-09-17, rc 0, glass-ui **7.0.0** from the registry. The census
below is read from the settled bytes of that build, and is emitted by
`scripts/ci/boot-smoke.mjs --mode=prod-preview` on every run (the `[boot-smoke] artifact census
(R42): …` line and the `census` member of `--json`), so it is a standing reading, not a one-off.

---

## The three adopted figures, re-measured

| R42's adopted figure | measured 2026-09-17 | verdict |
|---|---|---|
| **122 assets** | ⟨`ls dist/gh-pages/assets \| wc -l`⟩ → **122** | **CONFIRMED, exactly** |
| **vendor-katex emitted** | `assets/vendor-katex-DJ58vqXJ.js` (258,876 B) + `assets/vendor-katex-BorAY7qD.css` (28,482 B) | **CONFIRMED** |
| **not in the modulepreload set** | the served `index.html` carries exactly **5** `modulepreload` links (`index.html:206-210`) — `rolldown-runtime`, `vue.runtime.esm-bundler`, `usePointerVelocityField`, `_plugin-vue_export-helper`, `css`. **No katex entry.** | **CONFIRMED** |

**R42 is CLOSED on its own terms.** Its three receipts were re-derived from a build this wave ran,
not adopted from a seat that ran none.

---

## The full census, for the waves that read it (X-W2's eager-bytes delta, CC-035)

⟨`ls dist/gh-pages`⟩ → `CNAME` · `_headers` · `assets/` · `fonts/` · `index.html` · `robots.txt`
⟨`du -sk dist/gh-pages`⟩ → **3,900 KB**

| extension | count |
|---|---|
| `.js` | **45** |
| `.woff` | 20 |
| `.ttf` | 20 |
| `.woff2` | 19 |
| `.css` | **17** |
| `.svg` | 1 |
| **total** | **122** |

Of the 59 font files under `assets/`, **59 are `KaTeX_*`** — the KaTeX face set is the single
largest population in the artifact by file count. Four Fraunces faces live in `fonts/` (self-hosted,
`index.html` preloads the latin-normal one).

### The eager boot surface — what the document asks for before any route renders

| rel | href | bytes |
|---|---|---|
| `script type="module"` | `./assets/index-DOE-kt2B.js` | **446,664** |
| `modulepreload` | `./assets/rolldown-runtime-QTnfLwEv.js` | |
| `modulepreload` | `./assets/vue.runtime.esm-bundler-DVtiiGpU.js` | |
| `modulepreload` | `./assets/usePointerVelocityField-DsIf7yyq-DJWUkmi3.js` | |
| `modulepreload` | `./assets/_plugin-vue_export-helper-xmicxnVE.js` | |
| `modulepreload` | `./assets/css-h0A6KHoK.js` | |
| `stylesheet` | `./assets/index-CyBun992.css` | **518,949** |
| `stylesheet` (`media="print"`, `onload` swap) + `<noscript>` | `./assets/glass-fonts-DH5GtBvs.css` | |

### Where katex actually sits

⟨`grep -l 'vendor-katex' assets/*.js`⟩ → `assets/AboutPane-<hash>.js`, `assets/Katex-C5_J-l65.js`
— i.e. the 258 KB katex chunk is reached **only** through the About pane's route chunk and its
507-byte wrapper. It is code-split (`vite.config.ts`'s `codeSplitting.groups` names
`vendor-katex`), it is **not** in the eager set, and no `modulepreload` pulls it forward. That is
the disposition R42's INFO class wanted recorded, and it is the answer to the residue's implicit
question: the katex weight is real but it is not on the boot path.

**Recorded, not ruled:** the 59 KaTeX font files ship unconditionally into the artifact regardless of
whether the About pane is ever visited — a static-asset question, not a module-graph one, and
outside X-W1's bounds. It belongs to whichever wave owns the payload budget (CC-035 / X-W2).
