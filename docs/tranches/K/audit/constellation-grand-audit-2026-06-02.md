# Constellation grand-audit + tranche-expansion — 2026-06-02

**Mandate (terse recap).** Playwright-grounded audit + Lighthouse + frontend-design
4-lens + Google modern-web-guidance across the *whole* constellation; then
**expand & augment the open tranches NOW** (value.js · fourier-analysis ·
speedtest · keyframes.js · glass-ui — cross-cutting items owned by the fittest
repo) with grounded specs, chronic-deferral inventories (last 10 tranches each),
and chat-history critique recaps. Finally: a **maximally-parallel execution
ordering** with pithy per-session prompts. **Tranche-writing only — NO IMPL.**
NO workarounds, NO legacy; idiomatic gestalt transpositions for elegance /
simplicity / performance. Primitives from **glass-ui** unless contrived.

> This doc is the orchestration spine. It is a LEDGER, not ceremony — terse,
> table-driven, grounded. The `proof:*` idiom stays retired ([[feedback-proof-idiom-retired]]).

---

## §1 — Constellation map (verify paths in W0)

| Repo | Path (`/Users/mkbabb/Programming/`) | Role | Host | Open tranche | Active session |
|---|---|---|---|---|---|
| **value.js** | `value.js` | color picker demo + Hono/Mongo api | babb.dev? / friday? (open) | **K** | ✅ |
| **fourier-analysis** | `fourier-analysis` | paper · visualizer · equation · CRUD/remix | babb.dev | **J** | ✅ |
| **glass-ui** | `glass-ui` | design system + storybook (**primitive SOURCE**) | babb.dev (storybook) | **AS** | ✅ |
| **speedtest** | `speedtest` | network speedtest app | **friday.institute** | **AT** (v1.0.0) | — |
| **keyframes.js** | `keyframes.js` | animation library + demo/playground | babb.dev | **A** (v2.2.0) | ✅ |
| **muster** | `muster` | app (visual-matrix exemplar) | babb.dev | **K** | ✅ |
| **slides** | `slides` | slide deck app (dock needs refinement) | **friday.institute** | (open — W0) | ✅ |
| **words** | `words` | dictionary backend + frontend | babb.dev? (open) | **A** | — |
| **bbnf-buddy** | `bbnf-buddy` | BBNF grammar tool | babb.dev? (open) | (open — W0) | — |
| **deploy** | `deploy` | **babb.dev CI/CD + deploy facility** | — (the deployer) | (open — W0) | — |

**Hosting split (load-bearing):** **babb.dev** constellation is deployed via the
**`deploy` repo**. **speedtest + slides live on `friday.institute`** (NCSU Friday
Institute), NOT babb.dev — separate deploy path. value.js's api currently notes
`mbabb.fi.ncsu.edu/colors/` (friday) — **OPEN QUESTION: does colors migrate to
babb.dev, or stay on friday?** (resolve W0 / deploy-tranche.)

**Tranches authored in (the 5):** value.js · fourier-analysis · speedtest ·
keyframes.js · glass-ui. **Cross-cutting facilities** owned by the fittest repo
(glass-ui = primitives; deploy = CI/CD; value.js = dev.sh standard + visual
protocol + precepts hub). muster / slides / words / bbnf-buddy: fold if open.

---

## §2 — Grounded critiques (the spec seeds)

**value.js (screenshot-confirmed, `Screenshot 2026-06-02 23.38.15`):**
- **C1 · Dock** — broken, does not animate smoothly. → *smooth-dock* spec (motion).
- **C2 · Aurora** — flat cyan→white "sky" default, **not palette-derived**; ignores the
  active color entirely. → *aurora-derive* spec (the chronic #23 mandate, now visually proven).
- **C3 · Blob** — over-large; floats center-top not top-left-corner-nestled; eats the left
  column; **satellites pinpoint-tiny**; not reactive/squishy enough; heavy literal shadow.
  → *goo-blob refinement* spec (size · position · squish/reactivity · satellite scale · shadow).

**Cross-constellation seeds:**
- **fourier** — controls must move **BACK to the LEFT**; abrogate the configurator-side approach.
- **slides** — dock refinement.
- **value.js + fourier** — CRUD/remix system must be **functionally tested** (Playwright).
- **glass-ui** — primitive audit; what gaps in sibling apps belong **in** glass-ui.
- **all** — 8-rules-of-animation adherence per page; modern-web facilities; deep Lighthouse; **deploy/CI perfection**.

---

## §3 — Wave plan (long-horizon workflow)

| Wave | Name | Shape | Output |
|---|---|---|---|
| **W0** | Orientation & grounding | fan-out: 1 Explore/repo + Google-guidance + storybook/plugin | per-repo dossier (paths · routes · last-10 tranches · chronic-deferred · past critiques · defects) |
| **W1** | Visual + functional capture | Playwright (serial, main-loop) local+prod; Lighthouse; anim-timing | per-repo capture set + functional/perf inventory; value.js critiques re-grounded |
| **W2** | Frontend-design 4-lens | workflow: 4 agents (typo/color · motion · layout · atmosphere-a11y) | design-defect ledger per surface + glass-ui-backed remediation |
| **W3** | Modern-web · glass-gap · animation | workflow: 6 agents (focus fourier/value.js/glass-ui) | cross-cutting opportunity ledger **with owners** |
| **W4** | Chronic-deferral + chat-history mine | fan-out per repo (last 10 tranches) | per-repo carry-forward ledger |
| **W5** | Tranche authorship | fan-out: 1 author/repo, then synthesis | augmented open tranches (new grounded waves) in the 5 + cross-cutting |
| **W6** | Deploy/CI authorship | deploy repo (babb.dev) + speedtest/slides (friday.institute) | deploy-tranche + CI-perfection spec |
| **W_final** | Execution ordering | synthesis | parallel DAG + pithy per-session execution prompts |

**Playwright contention note:** browser MCP = single instance → W1 capture runs
**serially in the main loop** (not fanned out). Analysis of captures fans out.

---

## §4 — The many-item task list

### A · Orientation (W0)
- [ ] A1 Verify all 10 repo paths; locate any that drifted.
- [ ] A2 Per repo: dev command, `scripts/dev.sh` presence/shape, prod URL(s), host (babb.dev vs friday.institute).
- [ ] A3 Per repo: open tranche + **last 10 tranche** dirs (FINAL.md list).
- [ ] A4 Per repo: route/page/component inventory (the capture target list).
- [ ] A5 Per repo: chronic-deferred scan (E5 deferrals recurring ≥2 tranches).
- [ ] A6 Per repo: chat-history / docs critique recap (past user prompts).
- [ ] A7 Fetch + distill `developer.chrome.com/docs/modern-web-guidance` → facility catalogue.
- [ ] A8 glass-ui storybook story inventory + frontend-design plugin location/invocation/4-lenses.
- [ ] A9 Resolve colors-host question (babb.dev vs friday.institute).

### B · Capture (W1) — per repo, local + prod
- [ ] B1 value.js: picker · browse · extract · palettes · mix · gradient · admin-users · markdown — local(:9000)+prod; **re-ground C1/C2/C3**; CRUD round-trip.
- [ ] B2 fourier: paper · visualizer · equation · CRUD/remix — capture; **confirm controls-side regression**.
- [ ] B3 glass-ui: every storybook story (primitives + compositions).
- [ ] B4 speedtest: all pages (friday.institute prod + local); dial-CLS.
- [ ] B5 keyframes.js: demo + playground + all example pages.
- [ ] B6 muster: all pages (reconcile vs its visual-probe matrix).
- [ ] B7 slides: deck + dock; friday.institute prod.
- [ ] B8 words: search · results · autocomplete.
- [ ] B9 bbnf-buddy: all pages.
- [ ] B10 Lighthouse (perf/a11y/best-practices/SEO) per core page, all repos.
- [ ] B11 Animation-timing capture (DevTools performance / computed durations) per animated surface.

### C · Frontend-design 4-lens (W2)
- [ ] C1 Typography/color lens — across surfaces (incl. value.js Lab-serif label, fourier).
- [ ] C2 Motion lens — dock (C1), blob squish, aurora, slides dock; 8-rules adherence.
- [ ] C3 Layout lens — blob left-column overrun (C3), fourier controls-left, card chrome.
- [ ] C4 Atmosphere/a11y lens — aurora-derive (C2), contrast, reduced-motion, focus.

### D · Modern-web · glass-gap · animation (W3)
- [ ] D1 Modern-web facility map per repo (View Transitions · @layer · @container · Popover · scheduler.yield · CSS Custom Highlight · etc.).
- [ ] D2 glass-ui primitive-gap ledger: per sibling, what belongs IN glass-ui (owner = glass-ui).
- [ ] D3 8-rules-of-animation audit per page, glass-ui-backed.
- [ ] D4 keyframes.js leverage opportunities (which animations should use it).
- [ ] D5 Cross-cutting **owner assignment** for each opportunity.

### E · Chronic-deferral mine (W4)
- [ ] E1..E10 Per repo (value.js · fourier · glass-ui · speedtest · keyframes · muster · slides · words · bbnf · deploy): mine last 10 tranches for chronically deferred/broken items → carry-forward ledger.

### F · Tranche authorship (W5)
- [ ] F1 **value.js K**: NEW waves/specs — goo-blob refinement (size/pos/squish/satellites/shadow) · aurora-derive (kill sky-default) · smooth-dock · CRUD test plan · modern-web parity · glass-ui-first lifts.
- [ ] F2 **fourier J/next**: controls-back-to-LEFT (abrogate configurator) · CRUD/remix test · paper/visualizer/equation page specs · modern-web.
- [ ] F3 **glass-ui AS/next**: primitive audit · lifted primitives (BlobDot/Watercolor/Metaballs API) · animation primitives · storybook-gap fills.
- [ ] F4 **keyframes.js A/next**: animation-facility leverage · demo/playground polish · modern-web.
- [ ] F5 **speedtest AT/next**: page audits · dial-CLS · friday.institute deploy.
- [ ] F6 Cross-cutting folds: dev.sh standard · visual-evidence protocol · precepts sync · glass-ui primitive source-boundary.
- [ ] F7 muster/slides/words/bbnf: fold if open (slides dock spec owned here).

### G · Deploy / CI (W6)
- [ ] G1 **deploy repo**: babb.dev CI/CD perfection spec (build · deploy · rollback · per-app pipeline).
- [ ] G2 speedtest + slides: **friday.institute** deploy path (separate from babb.dev).
- [ ] G3 Resolve colors host (G/§1 A9).
- [ ] G4 Per-repo CI gate parity (lint → typecheck → build → test → playwright → lighthouse budget).

### H · Execution ordering (W_final)
- [ ] H1 Build the parallel execution DAG (independent vs serial vs glass-ui-source-first).
- [ ] H2 Output pithy per-session execution prompts (value.js · fourier · keyframes · glass-ui · slides · muster).
- [ ] H3 Mark serial constraints (glass-ui primitives land before sibling consumers).

---

## §5 — Cross-cutting ownership

| Facility | Owner | Consumers |
|---|---|---|
| UI primitives (Blob/Watercolor/Metaballs/dock/animation) | **glass-ui** | value.js · fourier · slides · muster |
| babb.dev CI/CD + deploy | **deploy** | all babb.dev apps |
| friday.institute deploy | **speedtest** (+ slides) | speedtest · slides |
| `scripts/dev.sh`/`deploy.sh` standard | **value.js** (`docs/dev-deploy-standard.md`) | all |
| Visual-evidence protocol + precepts hub | **value.js** | all |
| Animation primitives / timing tokens | **glass-ui** (+ keyframes.js engine) | all |

---

## §6 — Execution ordering

*Filled at W_final.* Placeholder DAG: glass-ui primitives (serial root) →
{value.js blob/aurora/dock, fourier controls-left, slides dock} (parallel) ;
deploy/CI (parallel, independent) ; CRUD tests (parallel) ; modern-web parity
(parallel). Pithy prompts appended there.

---

## §6.5 — Design decisions (user-ratified)

- **DEC-1 · Configurator side = RIGHT (constellation-wide), reversibly.** (2026-06-03, user reconsidered the original "fourier controls → LEFT" mandate → "fine on all except fourier… or maybe right — what do you think.") **Resolution:** keep controls-RIGHT everywhere (the inspector / result-as-protagonist idiom; value.js · muster · sudoku · speedtest all coherent). fourier's defect is **not the side** — it's the empty-state **void** (~75% dead dot-grid stage + the upload card marooned top-right; `visual-evidence-2026-06-02/grand-audit/fourier-visualize-prod.png`). **Fix the void** (a generous centered glass-resting dropzone that claims the stage), keep the configurator RIGHT as the inspector. glass-ui still ships `asideSide:'left'|'right'` as a **reversible capability defaulted to RIGHT** — fourier (or any app) can flip with one prop if the authoring-rail reading is later preferred. **Reconciliation:** the W5 fourier + glass-ui specs are corrected to this framing. **RESOLVED 2026-06-03 (Q3): RIGHT is FINAL** — user: "keep right and fix"; the void-fix ships, the LEFT flip is NOT taken (`asideSide` stays a built reversible capability, but fourier remains RIGHT).

- **DEC-2 · glass-ui PUBLISH-gated; NO `file:` usage (Q1, 2026-06-03).** Consumers adopt glass-ui primitives against **published versions** (the AS 3.2.0 minor), never a `file:`/source link. glass-ui AS publishes 3.2.0 carrying the AS.W5 bundle; each consumer wave (fourier J.W5 · value.js K.W3/K.W4 · speedtest AT-R2 · words A.W5 · slides B.W5) bumps to `^3.2.0` then adopts. **The serial spine firms: glass-ui publishes BEFORE consumers adopt** (W_FINAL §1 updated; the cohort still co-authors, but adoption gates on the publish).
- **DEC-3 · NO mascot primitive, NO new package (Q2, 2026-06-03).** The bbnf "b" / orange-sun / sudoku mascots are **fairly disparate** — they share a pencil-boil *skin*, not a *shape*. glass-ui AS.W5 **P7 is KILLED**; no `@mkbabb/mascot` package. Shapes stay app-local; the skin/physics + the mid-session reactive-PRM-teardown fix live in `@mkbabb/pencil-boil`. (glass-ui AS.W5 P7 → KILL; bbnf/sudoku mascot asks → pencil-boil.)
- **DEC-4 · friday.institute = TWO separate deployments (Q4, 2026-06-03).** speedtest/words/slides on friday.institute are **independent, app-owned deployments**, NOT babb.dev-spine dual-homed. The babb.dev deploy standard owns the babb.dev edge only; friday.institute is a second pipeline each app owns. (deploy ζ.7 → document the two-host topology as two pipelines.)
- **DEC-5 · colors host = `color.babb.dev` / `api.color.babb.dev` (Q5, 2026-06-03).** Canonical confirmed (deploy uses these). deploy reconciles its `api.value` placeholder → `api.color`; the stale `mbabb.fi.ncsu.edu/colors/` + apache-vhost are purged from the value.js api tree (inv-16 owner-purge); `/hooks/` slug = `value-js` (matches PAGES_PROJECT).
- **DEC-6 · `proof:*` stays DIVERGENT (Q6, 2026-06-03).** value.js retired its grep fleet (structural enforcement); glass-ui keeps + hardens its own (it guards a published public surface — VT-name collisions, phantom classes, cross-repo resolution — failure modes a leaf app lacks). Ratified-correct; no reconciliation; no action on glass-ui AS.W2.
- **DEC-7 · speedtest creds stay SEPARATE (Q7, 2026-06-03).** The `cred-consolidate` 5-tranche carry is **KILLED** (keep-separate); creds are not consolidated. AT-W-CLOSE records the terminal KILL-the-carry.

## §7 — Progress log

- **2026-06-02** — doc authored (orchestration spine). value.js critiques screenshot-confirmed (C1 dock · C2 aurora-sky-default · C3 blob over-large/mis-placed/tiny-satellites). Wave 0 launching.
