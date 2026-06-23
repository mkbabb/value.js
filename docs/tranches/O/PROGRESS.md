# O — PROGRESS

**Status board.** O is **CLOSED** — all library waves (O.W0–O.W6) SHIPPED.
Closed at **value.js 1.0.0** (2026-06-19); two patch releases followed (1.0.1, 1.0.2).
O.W7-demo was the only unimplemented wave (demo-only, not required for the library close).

**Prerequisite state (verified 2026-06-18):**
- value.js HEAD at O-open = `9fce504`, version 0.13.0 (N.W11.D + N.W11' shipped).
- N demo/design block (N.W10–N.W18): RATIFIED, not yet implemented.
- v1.0.0 = N.W9' close target (gated on glass-ui BA 4.0.0 pin via N.W18). O opens after.
- parse-that 0.9.0, single root export (parse-that A not yet started).
- Two P0 crashes CONFIRMED live on 0.13.0: `linear-gradient(red,blue)` + CSS Nesting.
- `linear()` stop-spacing bug CONFIRMED live on 0.13.0.

---

## Wave status (CLOSED-as-built)

| Wave | Disposition | Kind | Status | Published at |
|------|-------------|------|--------|--------------|
| **O.W0** — P0 crashes + `linear()` spacing | IMPL | unilateral (library) | **SHIPPED** (fix commit `650a8cd`) | **0.13.1** |
| **O.W1** — Subpath structural pre-work | IMPL | unilateral (library) | **SHIPPED** (commit `9ae9df0`) | **0.14.0** |
| **O.W2** — Subpath build + exports map | IMPL | unilateral (library) | **SHIPPED** (commit `9ae9df0`, lockfile `90bdcfa`) | **0.14.0** |
| **O.W3** — Color-math zero-alloc | IMPL | unilateral (library) | **SHIPPED** (commit `0118ae1` — 104→84 allocs/call) | **0.15.0** |
| **O.W4** — 2026+ grammar (AT-RULE + NESTING + values) | IMPL | unilateral (library) | **SHIPPED** (commits `990bf32` + `bfbfd5d` integrated at `1670c90`) | **0.15.0** |
| **O.W4b** — Full timeline + scroll-driven grammar | IMPL | unilateral (library) | **SHIPPED** (integrated with O.W4, `@scroll-timeline` typed kind) | **0.15.0** |
| **O.W5** — Semantic-idempotence + moderate-supersede | IMPL | unilateral (library) | **SHIPPED** (commits `d4e515e` + `0b0d9ee`) | **0.16.0** |
| **O.W6** — SOTA perf: combinator/scanner hybrid | IMPL | unilateral (library) | **SHIPPED** (commits `9aedfc5` + `dd9beb5` — dispatch() table + byte scanners) | **1.0.0** |
| **O.W7-demo** — Parse-Lab pane + gamut-truth indicator | IMPL | unilateral (demo) | **NOT SHIPPED** (demo-only; deferred — not a library-close blocker) | — |

---

## Patch releases post-close

| Version | Commit | Fix |
|---------|--------|-----|
| **1.0.1** | `f1d9bab` | `ValueUnit U` default → `string` (fix cross-package `instanceof` narrowing collapsed to `any`) |
| **1.0.2** | `15b0382` | Subpath chunks → `dist/subpaths/` (fix `dist/units.js` ↔ `dist/units/` shadow collision) |

---

## Born-RED gate status (all GREEN on 1.0.2)

All gates that were born-RED on 0.13.0 are GREEN on 1.0.2:

| Gate | Status on 1.0.2 |
|------|----------------|
| `proof:css-parity` — C1 (`linear-gradient(red,blue)`) | **GREEN** |
| `proof:css-parity` — C4 (CSS Nesting) | **GREEN** |
| `proof:css-parity` — C9 (`linear()` stop-spacing) | **GREEN** |
| `proof:subpath-budget` | **GREEN** (subpaths published) |
| `proof:round-trip-idempotent` | **GREEN** |
| `proof:grammar-2026` | **GREEN** |
| `proof:gamut-alloc` | **GREEN** (104→84; `color2Into` deferred to value.js P) |
| `proof:perf-target` | **GREEN** |

`proof:subpath-precheck` internal scaffolding gate retired after O.W1 close.
`proof:parse-lab-mount` (demo) remains unimplemented with O.W7-demo.

---

## Version cut cadence (as-built)

| Version | Waves shipped | Notes |
|---------|--------------|-------|
| **0.13.1** | O.W0 | P0 patch — ships immediately, no subpath precondition |
| **0.14.0** | O.W1 + O.W2 | Subpath exports (`./color` et al.), parse-that 0.11.0 re-pin |
| **0.15.0** | O.W3 + O.W4 + O.W4b | Grammar 2026 + zero-alloc color-math |
| **0.16.0** | O.W5 | Semantic-idempotence + spring() moderate-supersede |
| **1.0.0** | O.W6 | SOTA perf + 1.0.0 semver cut (constellation spine: parse-that 0.11.0 → value.js 1.0.0) |
| **1.0.1** | (patch) | ValueUnit U default → string |
| **1.0.2** | (patch) | Subpath chunks shadow fix |

---

## Dispatch gate

**Gate (O charter):** explicit user ratification of O.md. **DISCHARGED** — O executed in full.
The cross-repo dispatch (`docs/tranches/O/KF-TO-VALUEJS-P-ASKS.md`) was superseded by the
**value.js Tranche P dispatch** (`keyframes.js/docs/tranches/P/KF-TO-VALUEJS-P.md`); the
surviving ASKs (VJ-L3 `parseCSSSubValue`, VJ-P1 `color2Into`, VJ-P3 `: any`→`string`) ride
value.js **Tranche P** (1.1.0 + 1.2.0).

---

## Constellation sync points (resolved)

| Event | Status |
|-------|--------|
| parse-that 0.11.0 published | **DONE** — O.W2 consumed it |
| N.W9' / v1.0.0 closes | **DONE** — O shipped AT 1.0.0 (O.W6 = the 1.0.0 cut) |
| O.W0 published (keyframes.js M.W11 gate) | **DONE** — keyframes M consumed 0.13.1+ |
| O.W2 published (keyframes.js M.W9/M.W10 bundle gate) | **DONE** — subpaths live on 0.14.0+ |
