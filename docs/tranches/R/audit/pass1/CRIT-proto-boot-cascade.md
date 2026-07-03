# CRIT — proto-boot-cascade (Tranche R, pass-1 critic)

**Target**: `scratchpad/pass1/proto-boot-cascade.md` · **Critic date**: 2026-07-02 · **Convergence: 88%**

**One-line verdict**: An exceptionally well-grounded proto — every load-bearing citation checks out against the live trees and both defects are genuinely LIVE — but the boot cure's blast radius is unverified across the 3 non-dev build modes it silently touches, and that is exactly the failure class N.W1.C committed.

---

## §A — Factual grounding (spot-checked against live trees — ALL PASS)

Every citation I sampled is true:

| Claim (report) | Live check | Verdict |
|---|---|---|
| `vite.config.ts:50` bare-string alias `@mkbabb/value.js → dist/value.js` | line 50 exact | ✓ |
| `dist/value.js` is a FILE (not dir) | `file` → "Java source, ASCII" 14871 B | ✓ |
| exports `./math → ./dist/subpaths/math.js`; 7 subpaths under `dist/subpaths/` | package.json:41-44; `ls dist/subpaths` = 7 pairs | ✓ |
| keyframes 5.1.0 imports exactly `@mkbabb/value.js` + `@mkbabb/value.js/math` | `grep` over dist/*.js → those two only | ✓ |
| glass-ui 4.2.0; `dist/styles/index.css:258 @import "./components.css";` unlayered | line 258 exact, no `layer()` | ✓ |
| `components.css`: 0 `@layer`, 0 `@utility`, bare `.hidden{display:none}`/`.flex{display:flex}` | grep counts 0/0; both selectors present | ✓ |
| header comment "so a bare consumer (no @source glob) paints them" | verbatim in header lines 1-4 | ✓ |
| `@utility text-mono-small` at `typography/utilities.css:49` | exact line | ✓ |
| glass-ui exposes NO `./styles/components` sub-export (only styles, critical, deferred, fonts, styles.css) | package.json:301-305 | ✓ |
| `.w6a-audit.mjs` shim = `display:flex/block !important` at `>= 64rem` | lines 8-14 exact | ✓ |
| demo `style.css:52 @import "@mkbabb/glass-ui/styles"` | line 52 exact | ✓ |

Factual grounding is effectively flawless. The report's central correction of R7 ("stale keyframes dist") to the real root (prefix-alias mangles the new `/math` subpath) is mechanically correct: object-form Vite string aliases are prefix rewrites, so `@mkbabb/value.js/math → dist/value.js/math` → "Not a directory." I confirmed the exports map + subpath files independently.

## §B — Precept fidelity (STRONG)

- Rejects the `!important` shim, source-order hacks, and demo-side `@layer` wraps — routes the cascade cure as a **glass-ui producer relay**, respecting the sibling-repo boundary and the design-system-is-glass-ui precept. No design-system bypass.
- Refutes the naive "@layer wrap the whole import" with a concrete mechanism (Tailwind v4 won't register `@utility text-mono-small` nested in a layered `@import`) — verified plausible; `text-mono-small` is a real glass-ui `@utility` the demo `@apply`s.
- The boot cure lands in value.js's own `vite.config.ts` (dev config, not src/demo/api) — inside proto scope.

## §C — Staleness (CURRENT)

Tested TODAY against live glass-ui **4.2.0** and keyframes **5.1.0** (both confirmed by me). Not stale. The report correctly supersedes R7's "could-not-confirm."

## §D — mustFix (load-bearing gaps)

**M1 — the array-alias conversion touches ALL FOUR build modes, verified only under `dev`.**
`resolve` sits in the top-level `defaultOptions` object (`vite.config.ts:27`) that is spread (`...defaultOptions`) into every mode return: `production` (125), `hero-lab` (204), `gh-pages` (232), `dev` (273). The report converts all 8 aliases object→array form and proves ONLY `npm run dev`. The **gh-pages** build is the DEPLOYED demo and the **production** build ships the library — both inherit the array-form conversion unproven. This is precisely N.W1.C's original sin (a global alias correct for one era, silently wrong for a later graph). R.W2 must not inherit this blind: the cure is not ratifiable until `npm run build` + `npm run gh-pages` are confirmed green with the array-form aliases.

**M2 — the regex replacement hard-codes the exports-map path shape (`dist/subpaths/$1.js`), a maintenance coupling.**
The fix duplicates value.js's own `package.json` exports logic in a hand-rolled regex. It is correct for today's 7 uniform subpaths, but the very reason this alias exists ("a package never installs itself") plus the fact it already drifted once argues for either (a) a one-line justification of why the regex is preferred over resolving through value.js's own exports map, or (b) an explicit note that the regex must track the exports map. Ship the cure with that coupling documented, not silent.

**M3 — make explicit that the boot cure is dev-config-only (no dist change, no republish).**
The report says "fully value.js-internal" but never states it does not touch the shipped `dist/` and requires no library version bump. R.W2 sequencing needs that unambiguous (it decouples the boot fix from any publish gate).

## §E — Completeness / over-scoping

Zero-drop: the report ADDS value (the §4 caution flag that the keyframes devDep is a LIVE transitive `/math` consumer, correcting R.W0/§9's "verify-then-dispose" assumption; and the R.W2 gate amendment that its "renders without the w6a shim" criterion has an external glass-ui dependency booked as internal). No over-scoping — cross-repo work is relayed, not performed. No god-module or legacy-code concerns (config-only).

## §F — Convergence rationale

Grounding perfect, precepts honored, current, findings proven. Held below 95 solely because the boot cure — the report's one PROVEN value.js-side deliverable — has an unverified blast radius across the two shipping build modes (gh-pages deployed, production library), which is a real regression surface, not a nitpick. Clear M1/M2/M3 and this is ratifiable at ~96.
