SERVED MODEL: claude-opus-5[1m]

# NV-7 — THE ROOT, NAMED, WITH ITS DIFFERENTIAL TEST

**X-W1 · X.W1.c · G-14 · CC-032 (DR-10).** Authored 2026-09-17 at `f62bf82b`.

> **G-14** — *NV-7 is re-classed RED and its root named in the wave log with the evidence that
> identifies it.* **Falsifier**: *a root asserted without a differential test fails G-14; X.W1.d's
> pin is a **candidate** until G-16 shows the probe flips.* (`W1.md:314`)

---

## §1 · The row, as the corpus carries it

`docs/tranches/W/audit/history/V-core.md:528` mints it:

| ID | What | Where booked | Status |
|---|---|---|---|
| NV-7 | **gh-pages production preview mounts empty** | §F, "first probe of the post-compaction deep audit" | Un-diagnosed. Note dev/prod already diverge on fonts (§2.2) — same class of build-mode-only defect |

`docs/tranches/V/reformation/CARRY-LEDGER.md:116-118` states the observation:

> **Deep-audit item — gh-pages prod-preview empty mount:** the PRODUCTION build previewed at
> a bare 127.0.0.1 origin mounts empty (boot-guard/ground-record quirk; dev witness green
> and canonical). First probe of the post-compaction deep audit.

Two things in that sentence are load-bearing and one of them is wrong. **Load-bearing and right**:
*dev witness green and canonical* — the divergence is real, and it is exactly what let the defect
survive every gate the tranche owned. **Wrong**: *boot-guard/ground-record quirk* — the parenthetical
was a guess at the mechanism, never a measurement, and §4 falsifies it.

The standing leading candidate is DR-22/CC-034 — *"the deploy still checks out glass-ui at branch
`tranche/BG`… **Highest-probability root cause of NV-7**"* (`DISEASE-REGISTRY.md:327`). §5 falsifies
that one too, on the strongest possible ground: the defect reproduces in a build where no glass pin,
no deploy workflow and no registry resolution participates at all.

---

## §2 · THE ROOT

> **The Vue bootstrap was an INLINE `<script type="module">` inside
> `demo/color-picker/index.html`. Vite's production build does not traverse an inline module as a
> build entry: it emitted the 698-byte modulepreload polyfill shell and dropped the entire
> application module graph — every chunk, and the application stylesheet with it. The dev server
> never had the defect, because the browser's own ESM loader executes an inline module directly and
> no build entry is involved. The shipped artifact therefore carried an HTML document, a font sheet,
> and a shell that imports nothing; `#app` (the `<body>`) was never written to, and nothing threw,
> because nothing ran.**

Cured at **`c4af0ef9`** (2026-07-29, *"fix(demo/boot): expose the Vue mount as Vite's production
entry"*) by moving the unchanged bootstrap into `demo/color-picker/main.ts` and referencing it as
`<script type="module" src="./main.ts">` — an external entry the bundler can follow.

```
 -        <script type="module">
 -            import { createApp } from "vue";
 -            import App from "./App.vue";
 -            import { router } from "./router/index";
 -
 -            const app = createApp(App);
 -            app.use(router);
 -            app.mount("#app");
 -        </script>
 +        <script type="module" src="./main.ts"></script>
```

**Silence is a property of the root, not an accident of the probe.** `pageerror` is `[]` and
`requestfailed` is empty on the RED side: the document is internally consistent — it asks for the
one asset it names, gets `200`, and that asset does nothing. This is why five closes of green
console-and-typecheck gates never saw it, and it is why the gate this unit builds asserts
**`#app` has ≥1 element child** and **a `role=main` landmark exists** rather than asserting the
console is clean.

---

## §3 · THE DIFFERENTIAL TEST — one knob, both sides, at today's bytes

The claim is not "this commit is dated before the cure". The claim is **flip the named mechanism and
the defect appears; flip it back and it disappears** — run at `f62bf82b`, in the worktree
`/Users/mkbabb/Programming/value-js-x-w1-c`, changing **nothing** but the entry form.

⟨`git show c4af0ef9 -- demo/color-picker/index.html demo/color-picker/main.ts | git apply -R -`⟩
→ rc 0 (`M demo/color-picker/index.html`, `D demo/color-picker/main.ts`) · ⟨`npm run gh-pages`⟩ → rc 0

| reading | entry form = **external** (`f62bf82b`, as shipped) | entry form = **inline** (the one knob) |
|---|---|---|
| emitted assets | **122** | **63** |
| entry chunk | `index-DC7wNDmX.js` — **539,078 B** | `index-Dezn_h7o.js` — **698 B** |
| `modulepreload` links | **5** | **0** |
| application stylesheet | `index-CyBun992.css` present | **absent** — only `glass-fonts-DH5GtBvs.css` |
| vendor-katex chunks | 2 | **0** |
| **prod-preview A1** `#app` children | **6** — `[DIV, DIV, SPAN, DIV, DIV, DIV]` | **0** — `[]` |
| **prod-preview A2** `role=main` | **1** — `[Color tool panes]` | **0** |
| **prod-preview A3** `pageerror` | `[]` | `[]` ← *silent both ways* |
| **prod-preview A4** desktop utilities | **47** rules @ `(width >= 64rem)` | **0** rules across 4 sheets |
| **prod-preview verdict** | `1/1 PASS` | `0/1 FAIL` |
| **dev verdict, same knob** | `1/1 PASS` | **`1/1 PASS`** ← *dev cannot see it* |

*(Clock note: the differential was run at `f62bf82b`, the base all group-1 units share. Re-measured
at `cad51f9e` after a sibling seat's `composables/boot/useAtmosphere.ts` landing, the external-entry
arm reads **122 assets / entry 446,664 B / 5 modulepreload** — the entry shrank, the ratio against
the inline arm's 698 B did not move, and both modes' verdicts are unchanged: prod-preview 5/8,
dev 2/8 over the seed matrix, `default` 4/4 in both.)*

Receipts: ⟨`node scripts/ci/boot-smoke.mjs --mode=prod-preview --seed=default`⟩ on the inline arm →

```
[boot-smoke] artifact census (R42): 63 assets · entry ./assets/index-Dezn_h7o.js (698 B) · 0
             modulepreload · vendor-katex chunks 0 (in modulepreload set: false)
[boot-smoke] FAIL · default · http://127.0.0.1:64874/
             FAIL A1 #app has >= 1 element child
                  #app is <BODY> with 0 element child(ren): []
             FAIL A2 a role=main landmark exists
                  0 landmark(s): []
             ok   A3 pageerror collected []
                  []
             FAIL A4 >= 1 desktop utility class in the emitted CSS
                  0 desktop utility rule(s) across 4 sheet(s)
[boot-smoke] prod-preview: 0/1 seed cases passed
```

and ⟨`node scripts/ci/boot-smoke.mjs --mode=dev --seed=default`⟩ on the **same** inline arm →

```
[boot-smoke] PASS · default · http://127.0.0.1:9258/
             ok   A1 … 6 element child(ren)   ok   A2 … 1 landmark(s): [Color tool panes]
             ok   A3 []                       ok   A4 … 47 desktop utility rule(s)
[boot-smoke] dev: 1/1 seed cases passed
```

**That last row is the whole disease in one line.** The same tree, the same knob, the same
instrument: dev green, production blank. *"dev witness green and canonical"* was not an
observation about the product's health; it was the symptom.

### §3.1 · The historical arm — the defect reproduced at its own clock

Independently, before the forward differential was run: a scratch worktree at **`91fa1368`** (the
W44 close, 2026-07-17, the commit whose own §F booked the carry) — ⟨`npm ci --ignore-scripts`⟩,
⟨`npm run build`⟩, ⟨`npm run gh-pages`⟩, then the same bare-origin probe:

```
MOUNT STATE: { "appTag": "BODY", "elementChildCount": 0, "childTags": [],
               "innerHTMLLength": 2, "mainCount": 0, "bodyText": "", "styleSheetCount": 4 }
PAGEERRORS: []   CONSOLE ERRORS: []   FAILED REQUESTS: []
STATE: { "vueAppPresent": false, "perfMarks": ["overture:b0"], "savedBg": "rgb(179, 114, 144)" }
REQUESTS: 200 /  ·  200 /assets/index-Dezn_h7o.js  ·  200 /assets/glass-fonts-DH5GtBvs.css
          ·  200 /fonts/fraunces-latin-normal.woff2
```

63 assets; entry `index-Dezn_h7o.js`, 698 B — **the same content hash the forward differential
mints at `f62bf82b`**, which is what a mechanism-level root looks like: the artifact is a function
of the entry form, not of the two months between the clocks.

Note `perfMarks: ["overture:b0"]` and `savedBg: rgb(179, 114, 144)`: **the boot-guard script ran and
did its job**. See §4.

---

## §4 · The recorded parenthetical *"boot-guard/ground-record quirk"* is FALSIFIED

On the RED arm the inline fouc-guard classic script (`index.html:159-203`) executed to completion:
it marked `overture:b0`, resolved the scheme, and wrote `--saved-bg` = `rgb(179, 114, 144)` onto the
root — measured above. Its `__GROUND_*__` tokens were injected correctly by the vite
`groundRecordInject` plugin in both arms (⟨`sed -n '185,200p' dist/gh-pages/index.html`⟩ → `rec.stops.length === 4`,
`for (var i = 0; i < 4; i++)`, no unreplaced token). The ground record is not implicated on either
side of the differential; it is the one part of the boot that worked.

The guess was reasonable and it was wrong. It is recorded here because the wave's own archaeology is
that **naming is not diagnosis** — a parenthetical carried for two months is exactly the shape
G-14 exists to refuse.

---

## §5 · DR-22 / CC-034 (the `tranche/BG` glass pin) is NOT NV-7's root — and stays a real defect

`DISEASE-REGISTRY.md:327` calls the pin the *"highest-probability root cause of NV-7"*, and
`W1.md:314` makes it a **candidate until G-16 shows the probe flips**. It is falsified here on
evidence that does not require G-16:

1. **Every arm of §3 is a LOCAL build.** ⟨`npm run gh-pages`⟩ in a worktree whose glass-ui came from
   the registry — ⟨`node -p "require('…/node_modules/@mkbabb/glass-ui/package.json').version"`⟩ →
   **`7.0.0`**, the declared `^7.0.0`. `.github/workflows/deploy-pages.yml` and its
   `ref: tranche/BG` checkout participate in **none** of it. A cause that is absent cannot be the
   root of an effect that is present.
2. **The flip is total and it is the entry form.** Holding glass, node, the lockfile, the toolchain
   and every other byte fixed, the artifact goes 122 → 63 assets and 539,078 → 698 bytes on that one
   change. There is no residue for a second cause to explain.
3. **The 5.0.0 exports-map arm is itself GREEN at the installed pin.** `./blob` and `./chip` both
   resolve at 7.0.0 (X-W1's open baseline, GREEN-BEFORE-CURE #1). The B13 citation is scoped to a
   version the tree does not install.

**This does not retire CC-034.** The pin is a genuine deploy-provenance defect — the published
bundle is built against a producer the repository does not declare — and X.W1.d cures it for its own
reason under G-15. What changes is only its *claim*: it is **not** NV-7's root, and G-16 should be
read as what it is — the prod-preview probe run against the amended workflow's exact steps — rather
than as the confirmation of a root that has now been identified elsewhere.

---

## §6 · Disposition

| question | answer |
|---|---|
| **Root** | the inline `<script type="module">` bootstrap: not traversed as a build entry, so the production artifact carried a 698-byte shell and no application graph |
| **Cure** | **ALREADY LANDED** — `c4af0ef9` (2026-07-29), CC-002's product cut, *"expose the Vue mount as Vite's production entry"* |
| **Class** | build-mode-only, and **silent**: no pageerror, no failed request, no console output |
| **Re-class (G-14's word)** | **RED at its own clock (`91fa1368`), reproduced here; GREEN at `f62bf82b`, measured here.** The carry is DIAGNOSED and DISCHARGED, not carried an eighth time |
| **Is the chronic the same defect?** | **Yes.** The desktop/CSS-emission chronic (K.W2.6 → M.W2.A → N.W2.B → N.W10.D → R.W2) reads `0 desktop utility rule(s)` on the RED arm for the same reason: the application stylesheet is emitted by the graph that was dropped. One root, two registry names |
| **What keeps it dead** | `scripts/ci/boot-smoke.mjs --mode=prod-preview`, on every push, at a bare `127.0.0.1` origin with the origin form checked. Its falsifier is demonstrated in `boot/falsifier-2026-09-17.md`: deleting `app.mount()` reds BOTH modes |
| **Standing residual (not this unit's bounds)** | `npm run gh-pages` has no `pregh-pages` hook while the demo resolves the library through `dist/subpaths/*`. An artifact built on a stale or absent `dist/` has undefined provenance — measured in `boot/MEASURE-AT-OPEN-2026-09-17.md` §The build's undeclared input. Handed to **X.W1.a** (`package.json` scripts) and **X.W1.d** (`deploy-pages.yml` build steps) |
