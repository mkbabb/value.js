# CERT-boot-blast-radius — Pass-3 certification

**Critic**: Pass-3 certification · **Date**: 2026-07-02 · **Head**: `tranche-q` @ `e80b359` (v1.2.0)
**Target**: `docs/tranches/R/audit/pass2/boot-blast-radius.md` (pass-2 score 98, verdict RATIFY, mustFix none)
**Verdict**: **CERTIFIED — 100** · **mustFix**: none

---

## Method

This is a certification pass, not a discovery pass. I (a) confirmed the pass-2 mustFix ledger for
this item is empty and that no PASS2-VERDICT §3 (M1–M7) row targets it; (b) spot-checked every
load-bearing `file:line` against the live tranche-q tree; (c) confirmed the sole post-pass-2 mutation
(the L2 hoist) introduced no new error.

## (a) MustFix ledger — nothing outstanding for this item (vacuous discharge)

- Pass-2 critique (`CRIT-boot-blast-radius.md:5,82`): verdict RATIFY, convergence 98%, **mustFix: none**.
- PASS2-VERDICT §3 backlog (M1–M7): **no row targets boot-blast-radius**. Target files are
  `SYNTHESIS-v2.md`, `kf1-grammar.md`, `dispatch-homes.md`, `overlay-amendment.md`,
  `easing-disposition.md`, `w0-truth.md` — this item appears in none.
- PASS2-VERDICT §3 closing note (line 81): *"Not in the backlog (empty-mustFix, co-signable as-is):
  gamut-bound, **boot-blast-radius**, boundary-api."* Explicit.
- The M1 `extractFunctions` correction that rippled through five OTHER documents does not touch this
  report: boot-blast §1.2 already names `extractFunctions`/`parseCSSSubValue` as **P/Q-era source
  exports** — the correct side of the correction. It is cited in PASS2-VERDICT §2.3 and §5 as the
  very cross-lane fact that exposed the kf1/SPEC error. No residual here.

Every prior mustFix bearing on this item is discharged by vacuity.

## (b) Load-bearing citations — all VERIFIED against the live tree

| Report claim | Live check | Result |
|---|---|---|
| Self-dep `^1.0.2` at `package.json:113` | `sed -n 113p` = `"@mkbabb/value.js": "^1.0.2"` | PASS |
| `boot-smoke` wired at `package.json:83` | `sed -n 83p` = `"boot-smoke": "node scripts/boot-smoke.mjs"` | PASS |
| `node_modules/@mkbabb/value.js` is a REAL DIR @ 1.0.2, not symlink (proto's "nothing to resolve to" FALSE) | `-d` true, `-L` false, `version` = `1.0.2` | PASS |
| Tabs shim `demo/@/components/ui/tabs/index.ts:1` dead-imports 4 symbols | verbatim `export { Tabs, TabsList, TabsTrigger, TabsContent } from "@mkbabb/glass-ui";` | PASS |
| glass-ui 4.2.0 barrel exports 0 `Tabs*` | `grep -c 'Tabs' ../glass-ui/dist/glass-ui.js` = 0; version = 4.2.0 | PASS |
| 10 demo files consume `ui/tabs` | `grep -rl 'ui/tabs' demo/ \| wc -l` = 10 | PASS |
| `extractFunctions` in source (§1.2 mention) | `src/parsing/extract.ts:124` (`export const extractFunctions = (`); `src/index.ts:291` (`extractFunctions,`) | PASS |
| Pre-cure object-form alias is a prefix rewrite (`vite.config.ts:50`) | main-tree `vite.config.ts:50` = `"@mkbabb/value.js": path.resolve(import.meta.dirname, "dist/value.js")`; the false "nothing to walk up to" comment lives at `:43` (the report corrects it) | PASS |
| Cure generates anchored `^…$` regexes from `package.json#exports` via `conditions.import` (§1/§5) | worktree-2 `vite.config.ts:47-57`: `Object.entries(VALUE_JS_PKG.exports).map(... find: new RegExp(\`^${escaped}$\`), replacement: path.resolve(import.meta.dirname, conditions.import))` | PASS — the bug class (prefix-mangle of `/math`) is killed by construction |

Nothing was taken on faith; the anchored-regex generation — the crux of the "bug class provably gone"
claim — is present verbatim in the cured worktree config.

## (c) The one post-pass-2 mutation introduced no error

The only change to this file since pass-2 is the L2 hoist from worktree-2 into the main tree
(`L2-kf1-reverify.md:47-54`), which prepends a 2-line provenance header (report `:1-2`).

- `diff <(tail -n +3 boot-blast-radius.md) <worktree-2 source>` → **IDENTICAL-BODY**. Byte-faithful.
- The header's factual claims re-verify: worktree-2 self-corrected to `e80b359`/v1.2.0 (matches the
  report's own §0), and `git worktree list` confirms -2 @ `e80b359` (recorded in PASS2-VERDICT §5 and
  L2 §5:60). No error introduced by the hoist.

## Certification

boot-blast-radius entered pass-3 with an empty mustFix and a RATIFY verdict, was untouched except for a
byte-faithful hoist, and every load-bearing citation it rests on remains true at head `e80b359`. No
prior mustFix is outstanding; the hoist added no defect; I find **no NEW defect that would change what
an implementer builds** — the cure is `vite.config.ts`-only, dev-graph-only, dist byte-parity-proven,
and the exports-map generation is verifiably present. The pass-2 critic's below-the-bar residual (the
gh-pages/hero-lab full-green claim resting on a reverted Tabs stub plus the sound LOAD-vs-LINK
precedence argument) is cosmetic and correctly ruled non-blocking; it does not gate.

**Convergence: 100%. Verdict: CERTIFIED. mustFix: none.**
