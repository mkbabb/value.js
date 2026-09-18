SERVED MODEL: claude-opus-5[1m]

# X.W1.c · G-13 MEASURE-AT-OPEN — the gh-pages prod-preview mount state, BEFORE any cure

**Taken 2026-09-17 at `f62bf82b`, in the unit's own worktree
`/Users/mkbabb/Programming/value-js-x-w1-c` (detached at `f62bf82b`), with a FRESH
`npm run gh-pages`, served at a BARE `127.0.0.1:PORT` origin.** This reading is the first act of
the unit and precedes every authored byte of `scripts/ci/boot-smoke.mjs`: the instrument that
follows was written after this measurement, not around it.

`W1.md:126-127` names the standing record it is measured against:

> **G-13's gh-pages production-preview mount state.** Requires `npm run gh-pages` + a preview
> server. The standing record is CARRY-LEDGER §F's *"gh-pages prod-preview empty mount"* carry;
> the fresh measurement is taken at open and pasted into the wave log before any cure.

and `CARRY-LEDGER.md:116-118` states the carry verbatim:

> **Deep-audit item — gh-pages prod-preview empty mount:** the PRODUCTION build previewed at
> a bare 127.0.0.1 origin mounts empty (boot-guard/ground-record quirk; dev witness green
> and canonical). First probe of the post-compaction deep audit.

---

## The acts, in order

⟨`git worktree add --detach /Users/mkbabb/Programming/value-js-x-w1-c HEAD`⟩ →
`Preparing worktree (detached HEAD f62bf82b)` · `HEAD is now at f62bf82b docs(x-p/w2/record): …`

⟨`npm ci --no-audit --no-fund`⟩ → `added 438 packages in 7s`, rc 0. The `prepare` lifecycle ran
(`rm -rf dist && npm run build`), which is what puts `dist/subpaths/*` on disk — see §The
build's undeclared input, below.

⟨`node -p "require('…/value-js-x-w1-c/node_modules/@mkbabb/glass-ui/package.json').version"`⟩ →
`7.0.0` — the installed producer is the **declared `^7.0.0`**, resolved from the registry. No
`tranche/BG` checkout is involved in this measurement at all.

⟨`npm run gh-pages`⟩ → `✓ built in 3.57s`, rc 0.

⟨a 40-line node static server bound to `127.0.0.1:0`, serving `dist/gh-pages`, + a headless
chromium `page.goto(origin + "/")`⟩ — the origin was `http://127.0.0.1:53042`, **bare**: root
path, no sub-path, no query, no fragment.

## The reading

```
ORIGIN: http://127.0.0.1:53042
HTTP: 200
MOUNT STATE: {
  "appTag": "BODY",
  "elementChildCount": 6,
  "childTags": [ "DIV", "DIV", "SPAN", "DIV", "DIV", "DIV" ],
  "innerHTMLLength": 98826,
  "mainCount": 1,
  "bodyText": "→\nHome\nTools\nLogin\n@mbabb\nLab\n92.0\n%\n,\n88.8\n,\n20.0\nL\na\nb\nα\n92.0% …",
  "styleSheetCount": 8
}
PAGEERRORS: []
CONSOLE ERRORS: [
  "[value.js] value.js dev is MISCONFIGURED: http://127.0.0.1:53042 has no VITE_API_URL and is
   targeting the cross-origin production API (https://api.color.babb.dev), whose CORS allow-list
   excludes localhost — every palette request will be blocked. … This is a dev-config error,
   NOT \"backend offline\"."
]
FAILED REQUESTS: []
```

## The verdict, stated plainly

**NV-7 DOES NOT REPRODUCE AT `f62bf82b`.** The gh-pages production preview, served at a bare
`127.0.0.1` origin, **mounts**: `#app` (which is the `<body>` — `demo/color-picker/index.html:225`
`<body class="relative" id="app" data-paper-field>`) carries 6 element children, the
`role=main` landmark is present, `pageerror` is `[]`, and the document carries 8 stylesheets.

This is a **GREEN-BEFORE-CURE finding** under §READINESS R.2 (*a PASS before its cure is itself a
finding*), and it is recorded as one rather than treated as a gate pass: the carry was real when
it was written, and the question the wave actually owes is **why it was real and why it is not
now** — which is G-14, discharged differentially in
`docs/tranches/X/evidence/w1/nv-7-root.md`.

The one console error is the **environment**, not the product: the static preview carries no
`VITE_API_URL`, so the demo's own misconfiguration notice fires. It is reported as environment,
never filtered away, and it is not an assertion input (A3 reads `pageerror`, which is `[]`).

## The build's undeclared input, recorded here because the open measurement surfaced it

`npm run gh-pages` has **no `pregh-pages` hook** (⟨`grep -n '"pretypecheck"\|"gh-pages"\|"prepare"'
package.json`⟩ → `:62 "gh-pages": "vite build --mode gh-pages"` · `:63 "prepare": "rm -rf dist &&
npm run build"` · `:64 "pretypecheck": "npm run build"`), yet the demo reaches the library through
the package's own exports map (`@mkbabb/value.js/css`, `/color`, `/math`, `/easing`, `/transform`),
which resolves to `dist/subpaths/*.js` — **library build output**. A checkout whose `dist/` is
absent cannot build the demo at all; a checkout whose `dist/` is *stale* builds the demo against
bytes no source file in the tree describes. Measured, at the W44 clock, with `npm ci
--ignore-scripts` (so `prepare` never ran):

```
error during build:
Build failed with 7 errors:
[UNLOADABLE_DEPENDENCY] Could not load dist/subpaths/css.js
   ╭─[ demo/color-session/picker-color.ts:2:50 ]
   │ import { parseCssColor, serializeCssColor } from "@mkbabb/value.js/css";
```

This is not NV-7's root (the root is named in `nv-7-root.md`), and it is **not in this unit's
writable set** — `package.json` is X.W1.a's. It is handed to X.W1.a as a finding: the deploy and
CI paths that run `npm run gh-pages` must run the library build first or the artifact's provenance
is undefined. `.github/workflows/deploy-pages.yml` is X.W1.d's to check on the same point.
