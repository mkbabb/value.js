# U.W-ADOPT Lane B — the PRODUCER-BI-ACCEPTANCE relay SPEC (U-F4 + U-F13-producer)

**Lane**: U.W-ADOPT Lane B (the producer-visual bi-acceptance lane). **Families**: U-F4
(`reduced-motion-dock-collapse`, producer half) + U-F13-producer (`dock-edge-clip`, producer clip/fade
half). **Both PRODUCER-ONLY**: there is NO value.js/demo source edit to make (E-3 — a consumer CSS
override breaches glass-ui-first; the build IS the producer BI-acceptance constraint).

**Trigger state**: glass-ui v5 cut USER-GATED + **UNFIRED at authoring** (`git -C ../glass-ui tag
--list 'v5*'` EMPTY; glass-ui HEAD `8b0f9acc` branch `tranche/BI`; the orchestrator's pinned preview
worktree at `2e559f7a`). This lane FLOATS on the owner-gated cut: it DECIDES + NAMES the two
BI-acceptance constraints, ARMS the two born-RED gates, and FILES the U-F54 owner-attest annex rows —
independent of whether the cut fires in-window (PP-16, gates-armed-goal-trigger-gated).

**What this doc IS**: the relay SPEC authored in the value.js tree (the UNFIRED-arm home). In the
UNFIRED arm the SPEC lives HERE, in my own audit doc — NOT the foreign tree. **At the fired cut**, this
SPEC becomes a NEW single-file BI addendum path-scoped to
`../glass-ui/docs/tranches/<active>/coordination/valuejs-inbox-<date>-adopt.md` (plain-push-only, their
tree stays dirty, add ONLY the addendum file), EXTENDING the landed record (see §Relay lineage). No
foreign-tree edit lands from THIS (unfired) campaign.

---

## §Relay lineage (cite BY NAME; no second book)

The producer material for U-F4 + U-F13-producer is ALREADY dispatched. This SPEC extends, never
re-litigates, the record:

- **The FORMATION communiqué** — `../glass-ui/docs/tranches/BH/coordination/valuejs-inbox-2026-07-12-u-formation.md`
  (landed at glass-ui HEAD `17e0f522`, stamped producer HEAD `051e6957`, later addendum HEAD `dd9af7cf`).
  Carries **§2a U-F4 PRM-dock** (the sharpest a11y break) + **§2b the 9 carried-forward T producer
  reds** (incl. **T-52** the dock-edge mask honesty = the U-F13-producer half).
- **The BI inbox letters** (`../glass-ui/docs/tranches/BI/coordination/`) — 4 files exist:
  `valuejs-inbox-2026-07-13-bi-dist-breakage.md`, `-colands-preview.md`, `-u-w-lib-invariant.md`,
  `-u-w-visual.md`. **`-u-w-visual.md §B`** re-cites T-52 as **"ALREADY DISPATCHED — communiqué §2b
  T-52 (cite by name, do NOT re-book)"** and confirms the demo Tools box-model half is CENSUS-GREEN
  (interior ring, within the content box) → the demo half is U.W-VISUAL's, the producer clip/fade half
  is THIS lane's.
- **DRIFT NOTED**: the relay target moved **BH → BI** (glass-ui advanced past `17e0f522` → `dd9af7cf`
  → `ff0f62f2` → … → `8b0f9acc`). At the fired cut the addendum lands in the THEN-active tranche's
  coordination dir, supplementing (never superseding) the BH communiqué + the BI letters.

---

## §The two NAMED BI-acceptance constraints (verbatim as relayed at the fired cut)

These are the DECIDED, NAMED constraints the disease-row LAW (U-F2) demands be re-filed as EXPLICIT
producer BI-acceptance constraints — not trusted to a topical wave, not cured by a demo override.

### BI-ACCEPTANCE CONSTRAINT #1 — `prm-dock-arm-static-expanded-fallback` (U-F4)

> **At glass-ui 5.0.0, under `prefers-reduced-motion: reduce`, an `.expanded` / `.always-expanded`
> `.glass-dock` MUST resolve to its EXPANDED geometry STATICALLY** — the reduced-motion cure is
> snap-to-END-state, not freeze-at-start.
>
> **Mechanism (verified live at glass-ui HEAD `8b0f9acc` AND the pinned preview `2e559f7a`, cited by
> BLOCK — the line-integer is a moving foreign-tree target):** `src/styles/dock/morph.css` — the
> `[data-morphing]:not([data-pane-swap])` arm derives `--dock-expand-t: var(--dock-morph-t)` for
> `.glass-dock.expanded` / `.glass-dock.always-expanded` while the class is set. `--dock-morph-t` is a
> registered `@property` (initial 0); `[data-morphing]` is armed on the root by `useLayerTransition`.
> Under PRM the spring's `respectReducedMotion` settles instantly, BUT `[data-morphing]` latches ON
> with `--dock-morph-t` frozen at **0**, so `--dock-expand-t` resolves **0** → the dock renders at the
> collapsed **44px pill on EVERY desktop view** (`always-expanded=false`; mobile degrades to 244px, not
> empty). **19/20 nav+action controls visually clipped away, with NO hover/click/keyboard recovery**
> (probes: width stays 44px through all interactions). A **WCAG 2.4.3 / 2.4.7 / 1.4.13-class app-level
> nav failure.**
>
> **The cure (producer-side):** the static class-endpoint `--dock-expand-t: 1` (the `.expanded` /
> `.always-expanded` resting value) MUST WIN under PRM — e.g. a `@media (prefers-reduced-motion:
> reduce)` arm pinning `--dock-expand-t: 1` for `.expanded` / `.always-expanded`, OR suppressing the
> `[data-morphing]` latch under PRM so the static endpoint is never overridden by the frozen clock.
>
> **Acceptance oracle:** under emulated PRM, the expanded dock renders FULL-WIDTH with EVERY nav+action
> control reachable, desktop viewport, BOTH schemes — attested against a **REAL-GPU or OWNER frame**
> (U-F54 annex; **NEVER a headless assertion** — this formation logged 2 demonstrated headless
> false-reds: the U-F4 `overture.css` red herring + a U-F13 PRM confound).
>
> **PRODUCER-ONLY — value.js/demo has NO cure to make.** The demo is **EXONERATED**: the
> earlier-suspected `overture.css` root is a CONFIRMED RED HERRING (never applied under PRM). E-3
> forbids a demo CSS override (it would breach glass-ui-first). **JOINS** the U-F2 BI-acceptance-
> constraint list; already dispatched at communiqué **§2a** — this is the co-land ADDENDUM SHARPENING.

### BI-ACCEPTANCE CONSTRAINT #2 — `dock-edge-clip-fade-mask-focus-ring-honesty` (U-F13-producer)

> **At glass-ui 5.0.0, the producer dock-layer clip/fade-mask MUST NOT shave EDGE-item focus rings.**
> The focus ring is the U-F25 focus-affordance a11y class; interior-item rings render full, so the
> shave is EDGE-specific (the milder read after the U-F4 PRM confound was retired — §21).
>
> **Mechanism (verified live at glass-ui HEAD `8b0f9acc` AND the pinned preview `2e559f7a`, cited by
> BLOCK):** `src/styles/dock/overflow.css` — the `mask-image: linear-gradient(...)` block reads the
> `--fade-start` / `--fade-end` customs (driven by the `gl-fade-start-in` / `gl-fade-end-out` keyframes,
> the SAME `<FadingScroll>` mask family). When NEITHER fade is active, the 0px-fade transparent stop
> (`black var(--fade-start, 0px)`) antialiases the outermost pixel column at BOTH inline edges, shaving
> flush items' focus-ring arcs.
>
> **The three asks (per communiqué §2b T-52):** (a) **mask honesty at rest** — when neither fade is
> active, `mask-image` must compute `none`; (b) an **inline safe-inset on `.dock-layer` ≥ ring weight**
> (~2-4px + `scroll-padding`) — the current `overflow-clip-margin: var(--dock-control-safe-inset)` (the
> 80%-of-cell plate inset) is a PARTIAL mitigation but does NOT close the mask's edge-antialias; (c)
> optional `--dock-pill-h` export.
>
> **Acceptance oracle:** the flush/edge-item focus ring renders **WHOLE** — edge-item ring pixel-
> coverage **≡ interior-item ring pixel-coverage** — at rest AND mid-scroll, BOTH edges, BOTH schemes —
> attested against a **REAL-GPU or OWNER-attested frame** (U-F54 annex; **NEVER headless** — the PRM
> confound already demonstrated a false-red on this exact surface, §21).
>
> **PRODUCER half ONLY.** The demo Tools true-button box-model half is CENSUS-GREEN (Tools true-button
> is INTERIOR, its ring within the content box) → U.W-VISUAL's row (already dispatched; do NOT re-book).
> Named in the BH communiqué **§2b T-52** + BI **`-u-w-visual.md §B`** — this is the co-land ADDENDUM
> RE-CITE (by name, no second book), sharpened to the **edge-ring-shave a11y class**. No demo cure in
> this wave.

---

## §The verified morph.css ANCHOR DRIFT (record for the successor)

The discipline (glass-ui CLAUDE.md, §Dependencies): **cite block+key, NEVER a line integer into a
moving foreign tree.** The dispatcher-verify of the pinned preview `2e559f7a` (re-confirmed against
glass-ui HEAD `8b0f9acc`) records the drift:

| Locus | What lives there (pinned `2e559f7a` + HEAD `8b0f9acc`, byte-identical) | Cited by |
|---|---|---|
| `morph.css` header comment ~:26–53 | the `--dock-expand-t` **directional derivation** explanation; `[data-morphing]` "armed on the root by useLayerTransition, cleared on settle" ~:32 | R-1 SHARPENED (dispatcher-verify) |
| `morph.css` :47–50 (static endpoint) | `.glass-dock.expanded, .glass-dock.always-expanded { --dock-expand-t: 1 }` — the operative `1` at **:49** | R-1 SHARPENED |
| `morph.css` :52–54 (static endpoint) | `.glass-dock.collapsed { --dock-expand-t: 0 }` — the operative `0` at **:53** | R-1 SHARPENED |
| `morph.css` :70–73 (in-flight arm) | `.glass-dock.expanded[data-morphing]:not([data-pane-swap]), .always-expanded[…] { --dock-expand-t: var(--dock-morph-t) }` — the PRM-frozen derivation (the operative defect) | **communiqué §2a + registry §23 R-1 SOUND** |

**The drift, precisely:**
1. The BH communiqué (§2a) + registry §23 R-1 SOUND cite **`morph.css:70-73`** for the operative
   defect (the `[data-morphing]` derivation of `--dock-expand-t` from the frozen `--dock-morph-t`).
   **This line-integer STILL RESOLVES correctly** at both the pinned preview `2e559f7a` AND glass-ui
   HEAD `8b0f9acc` (verified live: the two-selector `[data-morphing]:not([data-pane-swap])` block sits
   at :70–73 in both). The byte-stable citation is a coincidence of a mechanically-stable block, not a
   guarantee.
2. The R-1 SHARPENED dispatcher-verify anchors the FULL directional-derivation mechanism to the
   **:26–53** span (the header comment + the static class endpoints `--dock-expand-t: 1` @ :49 / `:0` @
   :53) — a BROADER locus than the single :70-73 citation implies: the DEFECT is the :70-73 in-flight
   arm OVERRIDING the :49 static endpoint (`.expanded` SHOULD resolve 1) with the frozen `var(--dock-morph-t)=0`.
3. The :70–77 in-flight arm now carries a **`:not([data-pane-swap])`** gate (a `BG.W-DOCK-PANE-OVERLAP`
   addition) — present in BOTH current trees; a genuine PRM expand (not a nested pane swap) carries no
   `[data-pane-swap]`, so the arm STILL matches and STILL derives from the frozen clock → the defect
   holds.

**Relay rule:** the constraint text above cites the **MECHANISM** (`[data-morphing]:not([data-pane-swap])`
derivation of `--dock-expand-t` from the frozen `--dock-morph-t` while `.expanded` / `.always-expanded`
is set), never `:70-73`. The line-integer is recorded here only as the drift datum, not as the
load-bearing anchor.

---

## §The gates this SPEC arms (born-RED, producer-gated)

Both are ARMED now (the defect is LIVE in both trees) and flip ONLY when glass-ui ships the accepted
BI-acceptance constraint at 5.0.0. value.js has NO source edit to make. Full RED evidence +
π/DELTA obligation: `../pi/g-adopt-2-3-red-evidence.md`.

- **G-ADOPT-2 — U-F4 PRM-dock BI-acceptance.** Under PRM, dock width > 44px AND ≥ 19/20 nav+action
  controls reachable. **RED NOW** (width stays 44px = 1/20 usable). The width+reachability probe is
  **headless-trustworthy** (R-1 retired the confound → producer-only); the visual "reads-correct-when-
  expanded" confirmation is **OWNER-ATTESTED** (π-frame, U-F54). Flips GREEN only at the producer cut.
- **G-ADOPT-3 — U-F13-producer edge-clip.** On a **REAL-GPU or OWNER-attested frame** (NEVER headless),
  edge-item dock focus rings render un-shaved (≡ interior-item ring pixel-coverage). **RED NOW.** ARMED
  as an OWNER-ATTEST annex row (`../producer-bi/uf54-annex-rows.md`) — do NOT headless-assert a green.

---

## §Completion law (PP-16)

Both constraints DECIDED + named as BI-acceptance + both gates ARMED, **independent of the cut**. Zero
silent drops. BOOKS: U-F13-demo box-model half → U.W-VISUAL (already dispatched); the U-F54 annex
attest → U.W-CLOSE (owner-attested). If the cut fires in-window, the born-RED gates flip GREEN and the
addendum lands in the foreign tree; if not, the constraints are FILED, the gates ARMED, and the residual
cut-execution is booked BY NAME to U.W-CLOSE's book re-probe (never re-booked to a successor tranche).
