# B-keyframes — value.js ↔ keyframes.js parity + abstraction audit

**Tranche B audit** — a 6-lane read-only assay, 2026-05-19, of parity and abstraction between value.js and its sibling `@mkbabb/keyframes.js` (animation library, v2.1.1, HEAD `19d1a1b`). The user named the two "tightly coupled" and asked for an audit of both their libraries AND their demos. Folded into Tranche B; planning-only.

## §1 — Coupling and abstraction (the headline: it is sound)

**Dependency direction is clean and one-way.** keyframes.js depends on value.js — it imports ~14 value.js exports across 12 modules (`lerp`, `clamp`, `scale`, `CSSCubicBezier`, `steppedEase`, `timingFunctions`, `parseCSSStylesheet`, `ValueUnit`, `ValueArray`, the `lerp*Value` family, …). value.js imports **nothing** from keyframes.js — `grep "from \"@mkbabb/keyframes.js\""` across `value.js/src/` and `value.js/demo/` returns **zero**. No circular coupling; no duplicate-Vue/glass-ui instance hazard (dev resolves via the `development` export condition, not a hard `dist/` alias; production externalises correctly).

**Zero shared-logic duplication.** An animation library and a CSS-value library overlap heavily in interpolation math — but keyframes.js re-implements none of it. All easing presets, cubic-bezier evaluation, `steps()`, `lerp`/`clamp`/`scale`, and the `timingFunctions` registry are consumed from value.js as the single source of truth. The architecture is correct: animation-over-value-library, no shared package warranted.

**One finding from the direction**: value.js declares `"@mkbabb/keyframes.js": "file:../keyframes.js"` (`package.json:64`, devDependencies) but **imports it nowhere** — the devDependency appears **vestigial**. B.W3 verifies and dispositions (remove if dead; if a non-import build use exists, document it).

## §2 — Parity findings (value.js side — B-actionable)

| # | Finding | Evidence | Wave |
|---|---|---|---|
| K1 | Vestigial `@mkbabb/keyframes.js` devDependency — zero import sites | `value.js/package.json:64`; grep of `src/`+`demo/` returns 0 | B.W3 (WIP/dependency disposition) |
| K2 | `tsconfig.json` hard-aliases `vue`/`@vue/*` — over-prescriptive vs keyframes.js, which lets node resolve | `value.js/tsconfig.json paths` | B.W3 (invariant-30 / resolution audit) |
| K3 | `vitest.config.ts` carries only a minimal `@src` alias; keyframes.js mirrors the full vite alias set (the safer pattern) | `value.js/vitest.config.ts` | B.W3 (note; low-risk converge) |
| K4 | `CLAUDE.md` documents no Prettier/code-style convention; keyframes.js's does (4-space, 80-col, plugin list) | `keyframes.js/CLAUDE.md` vs `value.js/CLAUDE.md` | B.W4 (doc-drift lane) |
| K5 | `solveCubicBezierX` is a private helper in `easing.ts:128-154`; exporting it from the barrel costs nothing and unblocks future curve-inversion consumers | `value.js/src/easing.ts` | B.W3 (library gap audit — optional, recommendation only) |

## §3 — keyframes.js-side findings (FILED — B cannot write keyframes.js)

Per the cross-repo boundary (`dispatch/AGENT.md`), Tranche B writes value.js only. These route to keyframes.js's own maintenance (a coordination filing — `coordination/Q.md §9`):

- **kf-1** — keyframes.js's `src/animation/index.ts` is a 965-line OOP god module (Animation class + subclass + 10 methods). value.js's small-barrel idiom is the fleet reference; keyframes.js should split it.
- **kf-2** — keyframes.js declares `verbatimModuleSyntax: true` but applies `import type` inconsistently (≈1 use in the 965-line index). It violates its own tsconfig.
- **kf-3** — `package.json` is **missing `"sideEffects": false"`** — blocks tree-shaking; value.js has it.
- **kf-4** — `vite.config.ts` uses `dts({ rollupTypes: true })` and an unconditional `prepare` build; value.js uses neither. Worth a deliberate fleet decision.
- **kf-5** — keyframes.js demo hand-rolls a `copyText` clipboard wrapper and has no safe-storage helper; value.js consumes glass-ui's `copyToClipboard` and has `useSafeStorage`. Per the standing rule (glass-ui is the design system), the shared utilities belong in glass-ui — a glass-ui filing, recorded in `coordination/Q.md §9`.
- **kf-6** — keyframes.js runs **no tranche methodology** (`docs/tranches/` absent); it is modified *by* glass-ui's tranches (commits tagged "glass-ui Q.W5/W6") rather than running its own. Whether it should is the fleet owner's call — recorded, not actioned.

keyframes.js is invariant-30 **compliant** on its root export (the 4-key `development`/`types`/`import`/`default` shape) — no gap there.

## §4 — Precept submodule desync (coordination finding)

The shared `docs/precepts` submodule is pinned at three different SHAs across the fleet:

- **value.js**: `3310a8c` (B.W0 advances it to `3c32fae`).
- **keyframes.js**: `458c2d1`.
- **glass-ui**: `3c32fae` (advanced by glass-ui Q.W6 — the current fleet HEAD).

The fleet target is `3c32fae`. value.js converges at B.W0. keyframes.js's pin (`458c2d1`) is off-target — a filed coordination note (`coordination/Q.md §9`); keyframes.js advances on its own schedule.

## §5 — Verdict

The value.js↔keyframes.js relationship is **architecturally healthy** — clean one-way dependency, zero math duplication, idiomatic dev-resolution. The parity gaps are convention drift, not structural debt. value.js is the more idiomatic reference repo of the two. B's actionable items (§2) are minor and fold into B.W3/B.W4; the keyframes.js-side items (§3) and the precept desync (§4) are filed cross-repo — they do not block B.
