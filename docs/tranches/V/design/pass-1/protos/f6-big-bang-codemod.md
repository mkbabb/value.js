# V · pass-1 · PROTOTYPE — Family 6 · BIG-BANG CODEMOD

**Pass 1 · PROTOTYPE · 2026-07-13 · prototyper: pass-1 F6 prototyper (opus, model declared).**
Ran in an isolated worktree (`wf_cb377abc-406-15`, `npm ci` fresh) against `tranche-u` HEAD `6abef80`.
Discharges the three demonstrations `spec-f6.md §7` demanded. **Mode = RAN**: every number below is
measured; the codemod executed for real, the tree flattened, `vue-tsc` + `vitest` ran on the result.
All mutation happened ONLY in the worktree and is NEVER merged — the deliverable is this evidence.

> **Assignment-recovery note.** The orchestration spawned this prototyper with `${x.id}`/`${x.family}`/
> `${x.brief}` **un-interpolated** (literal placeholders — the same defect the F2/F6 researchers and the
> F2 prototyper each recorded). Batch 1 (worktrees `-10/-11/-12`) produced protos f1/f2/f3; I am the
> third lane of batch 2 (`-13/-14/-15`), so by the batch-1 ordering I am **Family 6 · BIG-BANG CODEMOD**.
> F6's §7 brief is fully RUNNABLE (adapt glass-ui's codemod → dryrun → apply → typecheck oracle → git
> `--follow`), so a possibly-misrouted lane still yields concrete substrate. File named descriptively.

---

## §0 Headline (what RAN)

The prototype **adapts glass-ui's proven regex codemod** (`codemod-glass-alias.mjs`, read READ-ONLY) into
`codemod-value-at-abrogation.mjs`, runs it DRYRUN → **`SAFE:true`, 373 rewrites, 0 REVIEW hits**, then
**executes it for real**: Phase-1 in-place rewrite (373 specifiers / 125 files) → Phase-2 `git mv`
(`demo/@/*` → `demo/*`, **231 renames / 0 deletes**) → strip the 5 alias defs across 4 config files. The
completeness oracle (`vue-tsc`) shows **ZERO new type errors** (error set byte-identical to baseline
modulo the path prefix); the unit suite is **2241/2241 green**; `git log --follow` traverses the rename
(ColorPicker.vue follows **112** commits). **F6's mechanism holds — with two spec refutations and one
whole missed class the spec never named, all surfaced by RUNNING it.**

**The load-bearing lesson**: the fail-closed AUDIT is necessary but **NOT sufficient**. It caught 2 real
non-import path references the spec undercounted, but it is BLIND to plain-relative imports crossing the
vanishing `@` boundary — those were caught only by the **typecheck oracle**. F6 is a two-gate mechanism
(audit `SAFE:true` AND oracle `delta==0`), not one.

---

## §1 The codemod (adapted from glass-ui, RAN)

`codemod-value-at-abrogation.mjs` (in the worktree, never merged). It is glass-ui's mechanism —
`SPECIFIER_RE` specifier-position rewrite + `ANY_*` fail-closed audit + dryrun-report shape — adapted to
value.js's **heavier class** (a PHYSICAL `demo/@/` dir behind 5 aliases, not glass-ui's alias-only prefix).
It runs **three rewrite passes** (A/B were spec-anticipated; **C was forced by a measured miss**):

| pass | what it rewrites | why | count |
|---|---|---|---|
| **A** | JS import specifiers: `@<alias>/tail` → true relative to POST-MOVE target; `/@/`-in-specifier → elide | the 351-site `@`-abrogation core | **355** |
| **B** | generic quoted `"…/@/…"` relative strings (NON-import): CSS `@reference`, `new URL()` | the 2 audit-surfaced misses (§3) | **2** |
| **C** | escaping plain-relatives in MOVED files whose target is OUTSIDE `demo/@/` | the missed class the ORACLE caught (§4) | **3** |
| relat-at | test files' `../demo/@/…` cross-refs (elide `/@/`) | 5 test files reach the tree relatively | **13** |
| | | **TOTAL** | **373** |

Reproduction (from the worktree root):
```
node codemod-value-at-abrogation.mjs            # DRYRUN → codemod-dryrun-report.json
node codemod-value-at-abrogation.mjs --apply    # Phase-1 in-place rewrite
for d in components composables lib router styles utils; do git mv demo/@/$d demo/$d; done
rmdir demo/@                                     # Phase-2 physical move
```

---

## §2 Demonstration 1 — DRYRUN report (§7.1), the reviewable artifact

```
=== value.js @-abrogation codemod DRYRUN ===
total import-specifier rewrites : 373
  by KIND                       : {"alias":355,"escape-relat":3,"css-or-url-at":2,"relat-at":13}
  by alias                      : {components:171, lib:84, composables:89, utils:7, styles:4}
files touched                   : 125
unmatched comments (ignored)    : 17
REVIEW hits (UNSAFE if > 0)     : 0
SAFE                            : true
```

- **The dryrun JSON is the reviewable evidence** (spec §5 gap-c): a human reviews `totalRewrites`,
  `filesTouched`, and `unmatchedREVIEW_unsafeIfNonzero == 0` — NOT the 231-file diff. Achieved.
- **Blast surface confirms the spec's 351**: measured `341 from` + `10 dynamic import()` = **351**
  alias-import specifiers (`.vue` 232 / `.ts` 109 = 68%/32%, the spec's "67% in SFC" fact holds). The
  codemod's 355 alias-rewrites = 351 + **4 side-effect CSS imports** (`import "@styles/style.css"` in
  `<script setup>` — 0 `from`-statements, which is why a `from`-only grep undercounts `@styles`; the
  `\bimport\s+` branch catches them).
- **`@styles`/`@src`/`@assets` correctly untouched as aliases** (`@styles` 0 `from`-imports; `@src`→`src/`,
  `@assets`→`assets/` are separate concerns owned by the shape families, kept per §3 posture).

## §3 The fail-closed audit EARNED ITS KEEP — 2 spec refutations

The FIRST dryrun returned **`SAFE:false`, 4 REVIEW hits** — the audit refusing to bless the pass. Two were
comment false-positives (my JS-only comment detector missed `.vue` `<!-- -->` HTML comments — fixed with a
block-comment state machine). **Two were REAL path references the spec explicitly said did not exist:**

| # | site | spec claim | REFUTED by |
|---|---|---|---|
| 2 | `demo/color-picker/App.vue:370` → `@reference "../../demo/@/styles/style.css";` in `<style scoped>` | spec §D1: "CSS `@import` alias sites = **0**" | a live CSS `@reference` (Tailwind v4) through the moving `demo/@/styles/` dir |
| 4 | `e2e/…/o10d-display-voice-census.spec.ts:456` → `new URL("../../../demo/@/components/.../MigratePalettesDialog.vue")` | spec §5/research §5: "e2e is **clean**, 0 `@`-refs" | a `readFileSync(new URL(...))` byte-census pinning a physical `demo/@/` path |

Both are relative paths through `/@/` **outside JS-import position** — invisible to `SPECIFIER_RE`, visible
to the audit's `ANY_*` scan. Pass B (generic quoted-`/@/` elision) fixes both; re-run → **`SAFE:true`,
0 REVIEW**. **This is exactly the value glass-ui's fail-closed audit was designed to deliver: it refused
`SAFE` until every `@`-occurrence was explained, and it caught two the paper spec missed.**

## §4 The class the audit is BLIND to — caught by the ORACLE (not in the spec at all)

With `SAFE:true`, I executed for real and ran `vue-tsc`. The oracle reported **6 NEW errors** (3 root +
3 cascade). Root cause — **a class the spec never named**: 3 plain-relative imports FROM inside `demo/@/`
reaching OUTWARD into `demo/color-picker/` (the Vite root, a **sibling of `demo/@/` that does NOT move**):

```
demo/@/components/custom/color-picker/ColorPicker.vue   "../../../../color-picker/composables/boot/useOverture"
demo/@/components/custom/panes/aurora-harmony-stops.ts  "../../../../color-picker/composables/boot/atmosphere-calibration"
demo/@/composables/color/palettes-ramp.ts               "../../../color-picker/composables/boot/view-accents"
```

When `@` vanishes, these `../` chains cross one fewer level — each must **decrement by one `../`**.
**glass-ui never hit this** (its demo had no stay-put sibling beside its moving tree; value.js uniquely
sits `demo/color-picker/` beside `demo/@/`). The audit is structurally blind here — these are plain
relatives with no `@`-token to scan. **Only the typecheck oracle caught them.** Fix = **Pass C**: for moved
files, resolve each relative from the OLD dir; if the target is OUTSIDE `demo/@/`, recompute from the NEW
dir (targets INSIDE move in lockstep → unchanged). Measured escaping set = exactly **3**. Pass-A
alias-derived relatives resolve (from the old dir) back INTO `demo/@/`, so Pass C correctly skips them.

> **F6's mechanism is therefore a TWO-gate leap, not one**: `audit SAFE:true` (completeness of the
> `@`-token rewrite) **AND** `oracle delta==0` (completeness of resolution, incl. the boundary-relative
> class the audit cannot see). The spec's §5 "reviewable via oracle not eyeball" is right — but the oracle
> is not merely review ergonomics; it is a **load-bearing second correctness gate**.

## §5 Demonstration 2 — the completeness oracle (§7.2)

**Honest oracle finding — the spec's "`vue-tsc` exit 0" is not achievable, and not the codemod's fault.**
The BASELINE typecheck (untouched tree, `dist` built) is already **exit 2 / 12 errors** — pre-existing
failures unrelated to `@`: `@mkbabb/glass-ui/goo-blob` missing under the pinned glass-ui 5.0.0 (5 sites),
plus `{}`-inference + `symbol`-index issues in `HeroBlob.vue`/`BlobPane.vue`. So the correct oracle is
**delta: zero NEW errors** (error set identical modulo the `demo/@/`→`demo/` prefix), not absolute exit-0.

```
baseline (untouched, demo/@/→demo/ normalized) : 12 errors
post-flatten (Pass A+B+C)                      : 12 errors
TRUE-NEW errors (post ∖ baseline)              :  0     ← codemod introduced ZERO failures
VANISHED baseline errors (baseline ∖ post)     :  0     ← codemod hid NO real error
```

Method: normalize `demo/@/`→`demo/` in both logs, `comm -13`/`comm -23`. **The error set is byte-identical
after the flatten** — every one of the 373 rewritten specifiers resolves; the only errors are the 12
pre-existing, at their relocated paths. **Completeness proven.**

**Corroborating runtime evidence (beyond the spec's ask)** — the unit suite on the flattened tree:
```
Test Files  74 passed (74)
      Tests  2241 passed (2241)    VITEST_EXIT=0
```
The 8 rewritten test files (3 `@`-alias + 5 `../demo/@/`-relative) resolve and RUN. This refutes glass-ui's
"bug 1" (mirror-tree corruption) for value.js — the test tree was flattened atomically in the same pass.

## §6 Demonstration 3 — git rename detection survives (§7.3)

Phase-1-rewrite-in-place / Phase-2-`git mv` ordering preserves rename detection:

```
staged move: renames(R) 231 · deletes(D) 0 · adds(A) 2 (the codemod .mjs + report only)
  R100 (content-identical, imports untouched) : 124
  R<100 (Phase-1-rewritten, still a rename)   : 107
git log --follow (throwaway worktree commit, NEVER merged):
  demo/components/custom/color-picker/ColorPicker.vue  → 112 commits (back to T.W5)
  demo/styles/style.css                                →  72 commits
  demo/lib/palette/api/index.ts                        →   6 commits
```

**`--follow` traverses the rename** — history survives. The 107 R<100 entries prove that content-editing
a file (Phase 1) and moving it (Phase 2) still register as a rename (similarity > git's threshold), so the
atomic per-surface commit is `git log`-legible.

## §7 Reuse verdict (spec §6, gap d) — glass-ui's CODEMOD-SPEC is DIRECTLY reusable, CONFIRMED

- **REUSED verbatim**: `SPECIFIER_RE`, the `ANY_*` fail-closed audit pair, the dryrun-report shape, the
  `elide()` segment-drop insight. The whole skeleton transplanted in one sitting.
- **ADAPTED**: 5 alias prefixes → relative (glass-ui had 1); the physical move-map (glass-ui's demo had
  none); the HTML-comment classifier (`.vue` templates; glass-ui's demo is `.vue` too but its prose didn't
  mention aliases); **Pass C** (value.js-specific — the stay-put-sibling boundary class).
- **The 3 glass-ui bugs, value.js disposition**: bug 1 (mirror/test corruption) — **DEFUSED** (8 test files
  flattened in-pass, suite green); bug 2 (no-dist TS2307) — **HANDLED** (`npm run build` first); bug 3
  (meta-gate self-ref) — N/A here (no `@`-ban gate authored in this prototype; that is F5's lane).

## §8 Fence check (spec §5 gap-b) — re-confirmed on live data

`git log -30 tranche-u | demo/@ product files touched` = **1** (`SpectrumPlateCaption.vue`); U.W-CLOSE is
docs-scoped. The "214-file conflict bomb" the portfolio feared is **~1 file**, and moot regardless —
charter §2 defers the real codemod to the eventual wave. Confirmed against HEAD `6abef80`.

## §9 Honest frictions + residual weaknesses

1. **F6 is HOW, not WHAT (spec §8 residual, unmoved).** This prototype executed the **`@`-abrogation +
   `demo/@/`→`demo/` flatten** — the measurable big-bang core. It did NOT execute the deeper *recursive
   colocation* target tree (sub-components/composables/skeletons WITH their component) the owner edict
   demands — that is a SHAPE the families F1–F4 must supply. F6 faithfully executes a target tree; **it
   does not validate one.** A wrong paper tree → a wrong leap, silently (mitigated only by the dryrun gate
   + oracle catching *resolution* errors, not *design* errors).
2. **The audit is not sufficient (the §4 lesson).** A single-gate "regex + fail-closed audit" mechanism
   would have shipped 3 broken imports. F6 MUST be gated on BOTH `SAFE:true` AND oracle `delta==0`.
3. **Spec number drift, measured**: test-mirror = **8 files** (spec said 4); physical move = **231 renames**
   (spec said 221 — git counts the whole `demo/@` subtree incl. `router/`, uncounted by the spec); CSS/e2e
   `@`-refs = **2** (spec said 0). None are fatal; all are the codemod's job once measured — but they show
   the paper blast-surface was ~5% low.
4. **`demo/router/` moved but is un-aliased** — no rewrite needed (internal relatives move in lockstep),
   but it IS part of the physical move (the spec's alias-only framing omits it).
5. **Doc-surface follow-ups NOT executed** (out of oracle scope, flagged for the real wave): `CLAUDE.md`'s
   "Path aliases (tsconfig)" table + `demo/CLAUDE.md` still list the 5 dropped aliases. A real landing
   sweeps these; the typecheck oracle does not see them.

## §10 Composition (facts, not ranking)

F6 answers **HOW** for whichever shape (F1/F2/F3/F4) supplies the WHAT. This run proves the vehicle is real
and glass-ui's kit transplants. It **pairs with a minimal F5 born-RED gate** to hold the `@`-ban after the
leap (the natural standing form of the §4 two-gate discipline: `SAFE:true` becomes a CI `proof:no-at-alias`
audit; `delta==0` is just `typecheck`). The carves it would execute on `src/` (units/index.ts, color-SCC,
barrel-purity siblings) are the SAME nodes F1/F2/F4 reach — F6 does not compete with them; it lands them.

---

**Verdict**: Family 6 RAN end-to-end. `SAFE:true` (373 rewrites, 0 REVIEW) · oracle delta 0 new errors ·
2241/2241 green · 231 renames with `--follow` intact. The big-bang codemod is a **viable, reviewable
execution vehicle** — its correctness is a **two-gate** proof (audit ∧ oracle), and its ceiling is the
target-tree spec it is handed.
