# W_final — constellation execution ordering + pithy per-session prompts

**2026-06-03.** The grand-audit authored grounded tranche specs across 11 repos (value.js K · fourier J · glass-ui AS · speedtest AT · keyframes A · muster K · slides B · words A + sudoku/bbnf/deploy audit docs). This doc sequences their **execution** for maximal parallelism, names the serial constraints, and gives each active session a pithy run-prompt. **Authoring is done; this is the run-plan — execution awaits the user's GO per repo.**

---

## §1 — The dependency DAG (what gates what)

**glass-ui AS is the serial root** — it owns the 4 net-new cross-cutting primitives + the VT/dock hardening that consumers adopt. Everything else parallelizes around it.

```
glass-ui AS.W5  ──┬─ Configurator asideSide + --configurator-aside-min token ─→ muster K.W3 (token) · value.js dual-pane · fourier (optional flip)
 (the keystone)   ├─ deriveAuroraFromColor producer ───────────────────────────→ value.js K.W4 ⇄ (2nd consumer = the ship gate) · speedtest derived-aurora
                  ├─ useTextHighlight (Custom Highlight) ───────────────────────→ fourier J.W5 (equation) · words A.W5 (search)
                  ├─ self-hosted Fraunces @font-face (opsz+SOFT+WONK) ──────────→ value.js K.W5 · words A.W5 · slides B.W5
                  ├─ VT .ready rejection hardening ─────────────────────────────→ speedtest AT-R2 · keyframes scene-swap · slides B.W4
                  └─ --dock-fg-on-aurora + DockIconButton as/asChild ───────────→ value.js K (dock) · slides (Home control)
glass-ui v1.0.0 (= value.js K.W6) ─→ Metaballs+BlobDot (post-v1.0.0) ─→ value.js K.W3 blob LIFT · bbnf mascot physics
bbnf W13-ζ 3.1.1 bump ─→ glass-ui Mascot primitive lift
slides B.W0-W2 (reframe) ─→ glass-ui /deck extraction ─→ slides B.W3 (adopt)
keyframes A.W4 (exports PRM gate) ─→ glass-ui /motion heavy-surface PRM fan-out   [reverse dep]
value.js K.W2 (substrate green) ─→ value.js K.W3/W4/W5 + value.js L (api excision)
```

**Two-stage C3 (blob):** the value.js-local footprint bug fix (160%/POS_SCALE → one size source · corner-anchor · satellite ResizeObserver gate · spring-mood) ships in **K.W3 with no glass-ui dependency** (it's a local bug); the full **lift** to glass-ui Metaballs is post-v1.0.0. So the user-visible C3 is fixed early; the extirpation lands later. (Resolves the K.W3-needs-Metaballs-which-ships-at-K.W6 circular.)

---

## §2 — Three execution waves (maximally parallel)

### WAVE 1 — fire everything with no cross-repo dependency (10 lanes concurrent)
| Lane | Repo · wave | Work |
|---|---|---|
| **glass-ui keystone** | AS.W2 + AS.W3 + **AS.W5** | gate-integrity (tooling) · postTask · **the 5 primitives** (asideSide+token, deriveAurora, useTextHighlight, Fraunces face, VT .ready + dock tokens) — start ASAP, the most-depended-on lane |
| value.js | K.W2 | substrate green (topology/dev.sh) + **CRUD functional test CR-1..4** + C1 dock `transition:all` strip (local) |
| fourier | J.W2 (CORE) + J.W5-indep | remix/publish WRITE side (the J thesis) · **void-fix** · epicycle PRM gate · cross-page VT widen · trail alpha-taper |
| speedtest | AT-R1 | **dial CLS 0.3228** 1-line `revert-layer` fix (both unlayered sites) · needle springTimingFunction |
| keyframes | A.W2 + A.W4 | EasingResolvable · **heavy-engine PRM gate (export it)** · tick `scheduler.yield` · WAAPI `linear()` · LoAF |
| muster | K.W3 (local) | verdict-cascade binding (compute→bind) · CLS fence (local `--configurator-aside-min` fallback) · spring micro-tweens |
| slides | B.W0-W2 | **responsive reframe** (kill the 0.29 letterbox) · dark-dock `color-scheme:dark` · `<360px` dock collapse |
| bbnf | W13-ζ A+B | **PRM gate across 4 mascot loops (P0)** · glass-ui 2.0→**3.1.1 bump** (deletes the hand-rolled palette mirror) |
| sudoku | — | dep bumps (keyframes 2.0→2.2, value.js 0.5→0.10 spec+lock) · pencil-boil mid-session PRM teardown |
| deploy | ζ.5-ζ.8 | rsync→git-pull (value.js outlier) · **DNS-tuple verify (P0, before any sync)** · CI lighthouse-budget gate · friday two-host topology doc |

### WAVE 2 — after glass-ui AS.W5 primitives land (consumers adopt)
| Lane | Work |
|---|---|
| value.js K.W4 ⇄ glass-ui | **aurora-derive** (picker→palette via `deriveAuroraFromColor`; the paired ship — value.js is the 2nd consumer that clears the gate) + dynamic-bg contrast guard + AuroraPane-live |
| value.js K.W5 | modern-web (`@property --active-color`, `@container`, content-visibility, `scheduler.yield`, `light-dark()`) + typo (Fraunces face, φ-ladder) + a11y (`:user-invalid`) + View Transitions + vue-router 5 |
| fourier J.W5/W6/W7 | equation `useTextHighlight` · (optional asideSide flip — user taste) · CRUD e2e/axe (W6) · CSP `assetsInlineLimit:0` + crossorigin (W7) |
| speedtest AT-R2 | VT completion re-founding on the hardened `startViewTransition` (CLS-free + mobile-blank-card fix) |
| words A.W5/W6 | warm-ink palette · Fraunces face · search `useTextHighlight` · DELETE headword typewriter · word→word VT |
| slides /deck → B.W3-W5 | glass-ui extracts `/deck` → slides adopts · home↔deck VT · Fraunces |
| muster K.W3 | adopt the upstream `--configurator-aside-min` token (re-point the local fallback) |

### WAVE 3 — after value.js K.W6 / glass-ui v1.0.0
| Lane | Work |
|---|---|
| glass-ui post-v1.0.0 | **Metaballs + BlobDot** primitive · **Mascot** primitive (after bbnf 3.1.1 bump) |
| value.js K.W3 (lift) | move the (already-fixed) goo-blob into glass-ui Metaballs (extirpation) · WatercolorDot lift |
| value.js L | api legacy-excision (after K.W2 green) |

---

## §3 — Pithy per-session execution prompts (the 6 active sessions)

Paste into the matching session to dispatch its tranche. Each is grounded in its authored spec; gate on the repo's own green CI (inv-27).

**glass-ui** (the keystone — run FIRST):
> Execute AS.W5 per `docs/tranches/AS/design/AS.W5-constellation-primitives.md`: ship the 4 net-new primitives + hardening — `Configurator asideSide:'left'|'right'` (default `'right'`) + `--configurator-aside-min` token; `deriveAuroraFromColor(css,stopCount)→OklchStop[]`; `useTextHighlight` (Custom Highlight, retire the FuzzySearch `<mark>` splitter); self-hosted Fraunces `@font-face` (opsz+SOFT+WONK); `vt.ready.catch(()=>{})` in `useViewTransition`; `--dock-fg-on-aurora` + DockIconButton `as`/`asChild`. Also AS.W3 postTask, AS.W4 container-style/scroll. Honor DEC-1 (asideSide is a reversible capability, default RIGHT). No double-mint of shipped substrate (inv J-10). Gate on the AS gate fleet green; fold into 3.2.0.

**value.js** (my repo):
> Execute K.W2→K.W6 per `docs/tranches/K/design/K.W1-grand-audit-refinement.md` + `K.md`: K.W2 substrate green (tsconfig.lib split, dev.sh) + CRUD test CR-1..4 + strip the dock host `transition:all`; K.W3 blob C3 local fix (one size-source, corner-anchor, satellite ResizeObserver gate, spring-mood); K.W4 aurora-derive (picker→`deriveAuroraFromColor`, the 2nd-consumer gate) + dynamic-bg contrast guard; K.W5 modern-web + Fraunces + φ-ladder + `:user-invalid` + VT + vue-router 5. Adopt glass-ui AS.W5 primitives as they land. v1.0.0 at K.W6; blob LIFT + L after.

**fourier**:
> Execute J per `docs/tranches/J/design/J.WC-frontend-grand-audit.md` + the J.md fold: J.W2 remix/publish WRITE side (the CORE); J.W5 — **fix the empty-state void** (configurator stays RIGHT per DEC-1; the LEFT flip is OPTIONAL — confirm taste before flipping) + epicycle PRM gate + cross-page VT widen + equation `useTextHighlight` (after glass-ui ships it) + trail alpha-taper; J.W6 CRUD e2e/axe; J.W7 CSP `assetsInlineLimit:0` + font-preload crossorigin. Gate on green CI + the e2e arm (the inv-27 debt I closes).

**keyframes**:
> Execute A.W2 + A.W4 per `docs/tranches/A/audit/constellation-grand-audit-2026-06-02.md`: EasingResolvable (collapse 3 `.ready()` copies); the heavy-engine reduced-motion gate (one engine-base helper, snap to final frame, **export it for glass-ui /motion**); `scheduler.yield()` in `AnimationGroup.tick()`; WAAPI `linear()` spring widening; dev-only LoAF; README modern-web posture. You are the constellation animation engine — the PRM-gate export fans out to fourier/muster/words via glass-ui.

**slides**:
> Execute B.W0-W2 per `docs/tranches/B/CONSTELLATION-FOLD.md` FIRST (the serial spine): kill the 1280×720→0.29 letterbox (responsive reflow), dark-dock `color-scheme:dark` (the inert-`.dark` WCAG bug), `<360px` dock collapse via GlassDock `density`, unscoped `<style>`→declarative. THEN glass-ui extracts `/deck` → B.W3 adopts it → B.W4 home↔deck VT → B.W5 Fraunces. Zero-deferrals posture holds.

**muster**:
> Execute K.W3 per `docs/tranches/K/audit/grand-audit-fold-2026-06-02.md`: bind the already-computed verdict cascade (`revealedRows`/`eliminatedRevealed` → RankedVerdict/EliminatedFold, the compute-then-discard P1); fix CLS 0.0729 via a single `--configurator-aside-min` source-of-truth (local fallback now, adopt the glass-ui token later); spring micro-tweens; PRM-first throughout. Stays a coda — no new wave. Controls stay RIGHT (DEC-1 N/A for muster).

*(deploy, words, sudoku, bbnf have no standing session — their run-prompts live in their authored docs; dispatch when a session opens.)*

---

## §4 — Open decisions — ALL RESOLVED 2026-06-03 (user)

> **Verdicts** (canonical: grand-audit `§6.5` DEC-2..DEC-7): **Q1 → PUBLISH-gated, NO `file:`** (glass-ui publishes 3.2.0 *before* consumers adopt — the serial spine firms) · **Q2 → NO mascot, NO new package** (disparate; glass-ui P7 KILLED; skin stays `@mkbabb/pencil-boil`) · **Q3 → RIGHT + fix the void** (final; LEFT not taken) · **Q4 → TWO separate deployments** (friday.institute is app-owned, not babb.dev-spine) · **Q5 → `color.babb.dev`/`api.color.babb.dev`** (purge stale NCSU) · **Q6 → keep `proof:*` divergent** · **Q7 → keep creds separate** (cred-consolidate KILLED). All leans matched except **Q2**, where the user went further (no new primitive at all). The original-lean table is retained below for reasoning.

### Original decisions table (leans — superseded by the verdicts above)

| # | Decision | Owner | Lean |
|---|---|---|---|
| Q1 | **glass-ui publish cadence** — does AS 3.2.0 publish gate consumers, or adopt against `file:` link pre-publish? | you | file: link pre-publish (the cohort/paired-authorship already opens the boundary) |
| Q2 | **Mascot home** — glass-ui primitive vs `@mkbabb/pencil-boil` / a new `@mkbabb/mascot` package? (sudoku+bbnf are pencil-boil-native; the orange-sun+pencil-boil skin recurs in 3 repos) | you | the physics/skin → `@mkbabb/pencil-boil`; a thin glass-ui `Mascot` wrapper only if a glass-ui consumer needs it |
| Q3 | **fourier LEFT-commit** — keep RIGHT (DEC-1 default) or commit fourier to LEFT? | you (taste) | keep RIGHT + fix the void; flip is one prop if you change your mind |
| Q4 | **friday.institute topology** — speedtest/words/slides: one service dual-homed (babb.dev + friday) or two deployments? (needs a VPN-side capture) | you/maintainer | resolve at deploy ζ.7 with a VPN-side capture |
| Q5 | **value.js colors host** — live truth is `color.babb.dev`/`api.color.babb.dev`; purge the stale `mbabb.fi.ncsu.edu/colors/` + `api.value` placeholder + the `/hooks/value.js` vs `value-js` slug | you (value.js) + deploy | canonical = `color`; slug = `value-js` (matches PAGES_PROJECT) |
| Q6 | **`proof:*` posture** — value.js retired it; glass-ui AS hardens its own gate fleet. Reconcile or keep divergent? | glass-ui | divergence correct (library substrate warrants binding gates a leaf app doesn't) — no action |
| Q7 | **speedtest cred-consolidate** (5-tranche chronic) — keep-separate / consolidate / discard at AT-W-CLOSE | you | adjudicate or the orchestrator records KILL-the-carry |

---

## §5 — What is NOT yet done (execution, not authoring)

Authoring is complete + reconciled. The following are **execution / commits**, each awaiting your GO (nothing committed; commit only on your word):
- Per-repo tranche execution (the §3 prompts).
- **Commits**: value.js (K design docs + grand-audit + `docs/tranches/C/` retired-record + the J work) and the 10 sibling additive docs are **uncommitted** in their repos.
- Local dev servers (value.js :9001, glass-ui :5210, slides :5220, bbnf :5230, muster :5176) left up for before/after recapture — tear down at close.
- Real **Lighthouse** runs (need the CLI + apps up) — booked at execution; the perf defects (CLS roots, bundle, font preloads) are code-grounded now.
- **precepts** submodule sync (the visual-evidence π-lane + the dev.sh standard) — gated on committing the precept SPEC first.
