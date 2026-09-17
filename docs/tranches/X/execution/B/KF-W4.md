SERVED MODEL: claude-opus-5[1m]

# KF.W4 — K-Quartet Hygiene and the Gate Chassis — execution record (Track B · X·KF)

Governing spec: `docs/tranches/X/keyframes/waves/KF-W4.md` (335 L, read WHOLE at this seat).
Order of authority: `docs/tranches/X/EXECUTION-RUNBOOK.md` §1.2 · §3.4 · §5; owner rulings at
`docs/tranches/X/COHESION.md` §0i + §0j. E-3: this record is append-only; corrections are dated
addenda beside, never patches to the spec, the registry or a prior conformance artefact.

---

## Open

**Date**: 2026-09-17, on the owner's begin-word (COHESION §0j, quoted verbatim there).
**Seat**: KF.W4 seat 0 (OPEN).
**Execution substrate (named, not assumed)**: `/Users/mkbabb/Programming/keyframes.js`, branch
`master`, under **COHESION §0j.C KF-WRITE (b)** — *"after §B-12, the sacred checkout on `master`
(= `origin/master`) is the execution substrate for KF.W2 · W4 · W5 · W6 · W7 · W8 · W9 · W10,
every wave pushing `origin HEAD` at close"*. Every measurement below names `origin/master` in the
command; a bare `HEAD` appears nowhere.

⟨`git -C ../keyframes.js rev-parse --short=8 origin/master`⟩ → `55e9bf0d` (double-run).
The spec's Ref of record is *"`origin/master` **`81a56990`** or later"*; `81a56990` is now the
parent of `55e9bf0d`, KF.W1's pushed addendum commit (docs-only, `docs/tranches/V/coordination/`),
so the frontier is **`81a56990` + one docs commit** and every source anchor below re-resolves
unchanged. Recorded as a dated reading, not a spec edit (E-3).

### Preconditions — verified at the bytes AND in the ledger

| # | precondition (spec §0 / ledger "Opens after") | verdict | receipt |
|---|---|---|---|
| **Opens after KF.W0** | LEDGER Track B row | **MET** | KF.W0 = **CLOSED 2026-09-17**, close commits `3a7efda5` · `a8abec97`, kf snapshot `6d280ee7` (ledger `:45`) |
| **OP-1 — write authority** | spec §0 OP-1 (*"UNRESOLVED — owner-held"* at authoring) | **RULED — RESOLVED** | COHESION **§0j.C KF-WRITE**: the sacred checkout on `master` is this wave's substrate, under the value.js orchestrator's hand on the owner's 2026-09-17 grant; **no new kf tranche letter is minted**. The spec's own two admissible shapes are superseded by the ruling, cited never presumed |
| **OP-2 — §B-12 substrate settle** | spec §0 OP-2 (HARD) | **MET** | `git -C ../keyframes.js status --porcelain` → **6 rows, 0 tracked modifications** (all `??`). Manifest schism closed at the bytes: ⟨`git show origin/master:package.json \| sed -n '70p;77p;81p;92p'`⟩ → `"@mkbabb/value.js": "4.0.0"` · `"@mkbabb/glass-ui": "7.0.0"` · `"@vitejs/plugin-vue": "^6.0.7"` · `"monaco-themes": "^0.4.8"` — the four §Bounds anchors at their stated lines |
| **OP-3 — the `proof:*` roster** | spec §0 OP-3 (RESOLVED in-spec by R-17) | **MET, re-measured** | ⟨`git ls-tree -r --name-only origin/master -- scripts/gates \| wc -l`⟩ → **9** (double-run), incl. `structure/index.mjs` + `surface/agent-surface.mjs`; ⟨`git show origin/master:package.json \| sed -n '37p'`⟩ → `"check": "tsc --noEmit && tsc --noEmit -p tsconfig.test.json && npm run proof:structure"` — `proof:structure` **present at the frontier**, as R-17 ruled. The stale 2-script count is not this wave's denominator |
| **OP-4 — the EE-01 re-land guard** | spec §0 OP-4 (KF.W0's obligation) | **MET** | KF.W0 CLOSED; `bounceInEase` survives only as prose at `src/animation/easing.ts:44` and `src/animation/waapi/eligibility.ts:169` (both verified below) — the phantom trail this wave takes |
| **OP-5 — the O-11 §C mail cure lands exec-visible** | spec §0 OP-5 (KF.W1's) | **MET** | LEDGER `:46`: KF.W1 **CLOSED 2026-09-17**, **O-21 MINTED**, addendum **309 L / 24,108 B** sha256 `80b7c831…` delivered and pushed (kf `55e9bf0d`); the delivered copy is on disk at `../keyframes.js/docs/tranches/V/coordination/VALUEJS-INBOUND-2026-09-17-o8-o11-amendment-addendum.md`. The wave consumes **the row `O-21`**, never a frozen literal |
| **OP-6 — the `smooth-step-3` owner ruling** | spec §0 OP-6 (UNRULED at authoring; gates G-KFW4-14's arm) | **RULED** | COHESION **§0j.C KF-SS3**: *"**NOT repointed at `bezierPresets`; its class is preserved.** A smoothstep polynomial is not a cubic bézier; flipping its class to make a name resolve is a behaviour change dressed as hygiene… The easing-name trap (KF-CB-18/24/29 + K1) is cured by K1's sampled value-identity on the 33-point grid — the mechanism, not a relabel."* **Unit `.e`'s G-14 arm therefore DISPATCHES on the preserve-the-class branch**; the merge branch is dead by ruling |

**Verdict: all seven preconditions MET. The wave OPENS.**

### Mail sweep (E13 Step-0, runbook §5.3) — 0 unrowed · 0 UNREAD in scope

Four paths swept read-only at this seat's clock and compared against **every row** of
`docs/tranches/V/coordination/INBOX.md`, classification taken from each row's **status cell**
(never from a bare `grep -i unread`, per X.P.W0 CHECK 1 D-1).

1. `docs/tranches/V/` (10 `.md`) + `docs/tranches/V/coordination/` (17 entries). `INBOX.md`
   self-excluded (SELF-COUNT law). Newest non-self: `value-inbox-2026-09-17-o8-o11-amendment-addendum.md`
   @13:09 — **ours** (KF.W1's retained OUTBOUND copy; rowed at **I-26 → CURED 2026-09-17**), then the
   two 07-2{4,7} back-fills @12:54, also ours.
2. `../glass-ui/docs/tranches/BK/coordination/` — **BK re-confirmed the newest tranche dir**
   ⟨`ls -dlt ../glass-ui/docs/tranches/B*/`⟩ → `BK`@Sep 17 12:49 > `BJ`@Aug 3 > `BI`@Jul 28 > `BH`@Jul 15.
   4 files; newest `glass-outbound-2026-08-29-valuejs-o20-ack.md` @Aug 29 16:41 = **I-30, already rowed**.
3. `../keyframes.js/docs/tranches/V/coordination/` — 12 files + `vnext/`; newest
   `VALUEJS-INBOUND-2026-09-17-o8-o11-amendment-addendum.md` @14:58 = **ours** (KF.W1's delivery).
   The dir's uniform 2026-09-17 mtimes are OP-1's absorption artefact — **named, not tripped**, a fourth time.
4. `../sci-report/atlas/docs/tranches/P/coordination/` — 29 files, newest @Aug 3 15:01
   (`valuejs-inbound-2026-07-27-library-band-export-delta.md`), all pre-dating the last four sweeps.

**Result: 0 unrowed · 0 new `I-n` minted · 0 UNREAD addressed to KF.W4's scope.** The one literal
`UNREAD` word in the ledger's rows is **I-31**, whose own Routing cell assigns it to **X-W0 (Track A)**,
not to Track B. `INBOX.md` is **not touched by this seat** (nothing to row); the dated sweep line is
appended to it below only because E13 requires the sweep be recorded, and it is appended at the file end.

---

## Baseline — the born-RED gates, run READ-ONLY at `origin/master 55e9bf0d`

Every figure double-run (RUN1/RUN2 identical). Commands are literal and pasted with their outputs.
**No byte of any tree was written to produce this table.**

| gate | unit | BEFORE verdict | measurement (⟨cmd⟩ → output) |
|---|---|---|---|
| **G-KFW4-1** vue-tsc gate (**sequencing head**) | `.a` | **RED-AS-EXPECTED** | ⟨`ls node_modules/.bin/vue-tsc`⟩ → *"No such file or directory"* — **ABSENT**, not merely unwired (KF-ES-34 reproduces). ⟨`git show origin/master:package.json \| sed -n '37p;38p;44p;45p;46p'`⟩ → the five before-forms **byte-exact as §Bounds quotes them**. ⟨`npx tsc --noEmit --listFiles \| grep -c '/demo/'`⟩ → **127**; ⟨`… \| grep -c '\.vue$'`⟩ → **0** — *the* gate hole. ⟨`git show origin/master:demo/env.d.ts \| sed -n '3,7p'`⟩ → the `DefineComponent<{}, {}, any>` block, **standing** |
| **G-KFW4-1 leg 2** (`tsc -p tsconfig.test.json`) | `.a` | **GREEN-BEFORE-CURE** (leg only) | ⟨`npx tsc --noEmit -p tsconfig.test.json`⟩ → **0 `error TS` lines**. The leg this wave **preserves verbatim** already passes; the gate stays RED on legs 1 + 3 |
| **G-KFW4-2** merge-path demo seat | `.b` | **RED-AS-EXPECTED** | ⟨`git show origin/master:.github/workflows/ci.yml \| sed -n '50,55p'`⟩ → `demo-correctness` behind `if: github.event_name == 'schedule' \|\| github.event_name == 'workflow_dispatch'`, its own comment *"does not block library merges"*. ⟨`git show origin/master:vitest.config.ts \| grep -c plugins`⟩ → **0** — no `plugins` array at all; the `demo` project sits at `:48-55`, include glob `:52`. ⟨`git ls-tree -r --name-only origin/master -- test/demo \| wc -l`⟩ → **27** |
| **G-KFW4-2 precondition census** (the falsifier's own demand) | `.b` | **27 PASS / 0 FAIL** | ⟨`npx vitest run --project demo`⟩ → **Test Files 27 passed (27) · Tests 155 passed (155) · Duration 2.10s**. **No RED among the 27 ⇒ no triumvirate trigger for the merge-path wiring**, and the lane passes today with **zero mounted SFCs** (plugin-vue unregistered), which is exactly the false green the gate exists to convert. This run **is** the first `--project demo` roster the falsifier requires; `.b` re-runs it at its own clock into `census-first-run.txt` |
| **G-KFW4-3** ESLint + `eslint-plugin-vue` essentials | `.b` | **RED-AS-EXPECTED** | `eslint.config.js` **ABSENT** ⟨`git cat-file -e origin/master:eslint.config.js`⟩ → fatal; `eslint` absent from the manifest; ⟨`git show origin/master:package.json \| sed -n '44p'`⟩ → `"lint": "depcruise src"`. ME-29 witness reproduces: ⟨`git show origin/master:demo/scenes/cube/matrix-editor/MatrixEditor.vue \| sed -n '11p'`⟩ → `v-for="(value, i) in matrix3dEnd.args"` — **keyless**, inside the `:8` `<div>` |
| **G-KFW4-11** depcruise reaches `demo/` — **part (1) REACH** | `.b` | **RED** (config scope) | ⟨`npx depcruise --config .dependency-cruiser.cjs src demo --output-type json`⟩ → exit 0, **439 modules · 230 demo modules** (the CLI argument reaches demo; the **config** is still `src/`-scoped, which is the §Bounds act). **5 dead LIGHT-allowlist entries re-measured**: of the 24 `LIGHT_BARREL_MODULES`, ⟨`git cat-file -e origin/master:src/animation/<entry>.ts` per entry⟩ → **DEAD ×5** (`physics/spring/duration` · `physics/spring/reseat` · `physics/spring/linear-stops` · `physics/spring/timing-function` · `orchestration/drag/drag-2d`), **LIVE ×19** — the spec's round-4 figure **5**, not the bank's 4, reproduces exactly |
| **G-KFW4-11** — **part (2) THE ORACLE** | `.b` | **GREEN-BEFORE-CURE (declared)** | The frozen RHS derivation reproduces **exactly the pinned seven / six files**: ⟨`git grep -n '@src/' origin/master -- demo/ \| sed 's\|^origin/master:\|\|' \| grep -E '(import\|export).*"@src/' \| sed -E 's\|^([^:]+):[0-9]+:.*"(@src/[^"]+)".*\|\1 \2\|' \| sort`⟩ → 7 lines, 6 distinct files (listed in full below). 9 raw `@src/` lines in `demo/`; the 2 dropped are the declared prose negatives `demo/kf-engine.ts:5` and `demo/scenes/cube/orbital-drag/composables/useOrbitalInertia.ts:12`. The spec declares this green by construction — *"`diff` exits 0 today, by DETECTION alone"* — and it does. **But see FINDING F-2**: the LHS as literally spelled yields 0 |
| **G-KFW4-12** manifest hygiene | `.b` | **RED-AS-EXPECTED** | `scripts/gates/census.mjs` **ABSENT** at `origin/master`; ⟨`git show origin/master:package.json \| sed -n '92p'`⟩ → `"monaco-themes": "^0.4.8",` **present**. LAW A census reproduces: the only live `monaco-themes` source hits are `CSSCodeEditor.vue:36`/`:37` importing the **vendored sibling directory** `./monaco-themes/*.json` — consumer set of the *package* = ∅ |
| **G-KFW4-4** K3 `noUnusedLocals` (G-L7c) | `.c` | **RED-AS-EXPECTED** | ⟨`git show origin/master:tsconfig.json \| grep -c noUnusedLocals`⟩ → **0**; same for `tsconfig.lib.json` → **0**. `:8` `"noUncheckedIndexedAccess": true` · `:9` `"exactOptionalPropertyTypes": true` · `:47` `"include": ["src/", "demo/"]` — all three **re-verified, not weakened**. src-arm site: ⟨`git show origin/master:src/animation/load-engine.ts \| sed -n '65p'`⟩ → `import type { Stylesheet } from "@mkbabb/value.js/css";`, ⟨`git grep -c '\bStylesheet\b' origin/master -- src/animation/load-engine.ts`⟩ → **1** (the import itself; **consumer set = ∅**). demo-arm sites reproduce: `AmigaScene.vue:21` / `SquareScene.vue` / `SequenceScene.vue` `grep -c 'computed('` → **0 · 0 · 0**; `ChannelOptions.vue` `grep -c '<Teleport'` → **1** (the live `:377`/`:401` element) with `:437` the import; the four `const props` in the timeline subtree resolve at `CSSPasteDialog.vue:43` · `KeyframeTimeline.vue:179` · `TimelineCaret.vue:35` · `components/TimelineTrack.vue:120` — **the row's three among them, each at its stated line**, and `TimelineCaret.vue` is **KF.W7's cure site, witness-only here** (R-3). R-9's basis: ⟨`git grep -n '_boundTimeline' origin/master -- src/ demo/ test/ scripts/`⟩ → **exactly 3 hits, one file** — `animation.ts:5` docblock · `:54` declaration · `:82` `this._boundTimeline = timeline;` a **write**. **No hit is a READ ⇒ R-9's else-branch: delete the field and its prose together, one commit** |
| **G-KFW4-5** K1 stable easing identities (G-L7a) | `.c` | **RED-AS-EXPECTED** | `test/compile/easing-identity.test.ts` **ABSENT**. The census, re-derived live against the installed pin (`@mkbabb/value.js` **4.0.0**, resolved by absolute path so no byte of the kf tree was touched): **40 names · 21 unstable (`easing(n) !== easing(n)`) · 31 distinct fn refs · 9 collisions** — *reproducing the banked 21/40 + 9 exactly*. The nine colliding pairs, enumerated: `smooth-step-3`≡`smoothStep3` · `ease-in-out-sine`≡`easeInOutSine` · `ease-in-out-quad`≡`easeInOutQuad` · `ease-out-cubic`≡`easeOutCubic` · `ease-in-out-cubic`≡`easeInOutCubic` · `ease-out-expo`≡`easeOutExpo` · `ease-in-out-expo`≡`easeInOutExpo` · `ease-in-out-circ`≡`easeInOutCirc` · `ease-in-bounce`≡`easeInBounce`. ⟨`git show origin/master:src/animation/compile/easing/registry.ts \| sed -n '36p'`⟩ → `/** Stable identities let the serializer distinguish named curves from closures. */` — **FALSE at 31-onto-40**; the `:43` module-evaluation `throw` fence verified in place (**DO NOT DISTURB**) |
| **G-KFW4-6** K2 tautology delete + docstrings (G-L7b) | `.c` | **RED-AS-EXPECTED** | `test/internal/leaves-parity.test.ts` **PRESENT** (not yet deleted) ⇒ no single commit contains delete + correction. ⟨`git show origin/master:src/animation/internal/leaves.ts \| sed -n '17,19p'`⟩ → *"The drift guard / (`test/leaves-parity.test.ts`) now asserts the re-exported subpath values / match the value.js barrel."* — **both halves false**, and the cited path does not exist (the file is `test/internal/…`). `:28` → `export { clamp, scale, lerp, lerpArray } from "@mkbabb/value.js/math";` — a re-export cannot drift |
| **G-KFW4-7** K4 provenance (G-L7d) | `.d` | **RED-AS-EXPECTED** | `scripts/gates/census.mjs` **ABSENT** ⇒ command unrunnable = RED. Witnesses in place: ⟨`git grep -n '\bsampleColorRamp\b' origin/master -- src/animation/compile/emit/backward/backward.ts`⟩ → `:30`, `:47`; ⟨`… '\bdeltaEOK\b' …`⟩ → `:32`, `:47` — **three attribution lines, one docblock**, as the round-3 widening states |
| **G-KFW4-8** the citation census | `.d` | **RED-AS-EXPECTED** | `census.mjs` ABSENT. Denominator reproduces **byte-for-byte**: ⟨`git grep -n 'proof:' origin/master -- <the eight targets>` ⟩ → **33 lines**; ⟨`… \| grep -oh 'proof:[a-z0-9-]*' \| sort -u \| wc -l`⟩ → **19 distinct names** (both double-run). The struck ninth verifies struck: ⟨`git show origin/master:demo/components/instrument/shell/EditorShell.vue \| grep -c 'proof:'`⟩ → **0** |
| **G-KFW4-9** the gate-authoring audit | `.d` | **RED-AS-EXPECTED** | Subject set at the frontier: **9** `scripts/gates/` files (enumerated below) + `scripts/observe/` (7 files incl. `demo/usability.mjs` **410 L** and `demo/live-session.mjs` **1612 L**) + `test/`. Rule (e) witness: ⟨`git show origin/master:scripts/observe/demo/usability.mjs \| sed -n '239p'`⟩ → `glyphCount: mirrorText.replace(/\s+/g, "").length,` — the subject's own counter, with (2c)'s equality at `:278-285` (`probe.charCount === probe.glyphCount`) holding **by construction**. Rules (c)/(d): ⟨`git grep -n 'INERTIA_FACTOR' origin/master -- test/`⟩ → **9 lines, one file** (`:29` declaration `= 0.92` + eight uses `:52 :58 :76 :99 :106 :123 :132 :138`) against ⟨`git grep -n '0\.95' origin/master -- demo/scenes/cube/`⟩ → `OrbitalDrag.vue:56:const inertiaFactor = props.inertiaFactor ?? 0.95;`. The `:9` header-line off-by-one correction verifies: `sed -n '9p'` → `* Three falsifiable clauses, each BITING on the exact defect it forbids:` |
| **G-KFW4-10** the register/font census | `.d` | **RED-AS-EXPECTED** | `scripts/gates/register-census.mjs` **ABSENT**. `font-roles.json` anchors exact: `:17` `"role": "filing-tab"` · `:23` `"role": "filing-tab-active"` · `:36` `"selector": "h1.hero-display .wave-char"` · `:68` `"kbd"` · `:82` the `_monoContract` T.D4 clause (d). R-3's fold premise reproduces: ⟨`git grep -nF 'font-roles' origin/master -- demo/ src/ test/ scripts/`⟩ → **exactly one hit, `demo/DESIGN.md:28`**, prose — **zero import specifiers, zero runners** |
| **G-KFW4-13** name/identity honesty | `.e` | **RED-AS-EXPECTED** | `test/compile/timing-function-names.test.ts` **ABSENT**. ⟨`git show origin/master:src/animation/constants/types.ts \| sed -n '25p;27p;194p;195p'`⟩ → `export type TimingFunctionNames =` · `\| "steps"` · `\| TimingFunctionNames` · `\| string` — all three at their stated lines. Phantom prose reproduces: `src/animation/easing.ts:44` and `src/animation/waapi/eligibility.ts:169` both name `bounceInEase` |
| **G-KFW4-14** one catalogue, one truth | `.e` | **RED-AS-EXPECTED** | `test/demo/easing-catalogue.test.ts` **ABSENT**. The divergence reproduces: `Object.keys(bezierPresets).length` → **30**; the `NAMED_EASING_BEZIER` literal in `demo/utils/reference-data/animationDescriptions.ts` → **29 keys**; sole delta **`smooth-step-3`**. The cure-lock's subject is in place at its true file: ⟨`git grep -n 'seedFor\|syncGap' origin/master -- demo/`⟩ → **six lines and only six**, `EasingSidebar.vue:99` (`seedFor` decl) `:122` `:132` (`syncGap` decl) `:138` `:162` `:163`; the reach ⟨`sed -n '112p'`⟩ → `    if (name in bezierPresets) {`; the else-arm ⟨`useEasingDemo.ts` `sed -n '255,257p'`⟩ → `} else {` / `// Non-bezier curve: reset to linear approximation` / `bezierControlPoints.value = [0, 0, 1, 1];` |

**Tally, with its counting rule stated AT the figure (R5-11): one unit = one distinct gate id.**
⟨`grep -o '^| \*\*G-KFW4-[0-9]*\*\*' <this file> | sort -u | wc -l`⟩ → **14** over **17 table rows**
(the three extra rows are sub-components, deliberately given their own line: G-KFW4-1's leg 2,
G-KFW4-2's precondition census, and G-KFW4-11's two parts).
**14 gates · 14 RED-AS-EXPECTED · 0 GREEN-AS-A-WHOLE · 0 DIVERGENT · 0 UNRUNNABLE-BY-DEFECT.**
**TWO GREEN-BEFORE-CURE sub-components, neither of them a whole gate** (R.2 — listed as findings, not
smoothed): **(1)** G-KFW4-1's **leg 2**, `tsc --noEmit -p tsconfig.test.json` → 0 errors, the leg this
wave preserves verbatim; the gate stays RED on legs 1 + 3. **(2)** G-KFW4-11's **part (2) equality
oracle** — the frozen seven reproduce exactly, so the `diff` arm is satisfiable **today by detection
alone**, which the spec itself declares (*"GREEN IS NOW REACHABLE IN-BOUNDS … `diff` exits 0 today, by
DETECTION alone, with no act inside §Bounds"*); the gate stays RED on part (1)'s config scope, and
**F-2 shows the arm is green only under the corrected key**.
Every "unrunnable" command above is unrunnable *because its artefact is a `create` row of this wave* —
that is the RED, not a measurement failure.

### The pinned seven, frozen here as the BEFORE (G-KFW4-11's RHS)

```
demo/components/instrument/keyframes/composables/useKeyframeOps.ts @src/animation/compile/emit/css-text
demo/components/instrument/keyframes/utils/parseAnimationCSS.ts @src/animation/compile/emit/css-text
demo/components/instrument/timeline/utils/timelineEngine.ts @src/animation/compile/emit/css-text
demo/components/instrument/timeline/utils/timelineEngine.ts @src/animation/internal/helpers
demo/components/playback/AnimationVisualizer.vue @src/animation/resolve/browser
demo/utils/helpers.ts @src/animation/resolve/browser
demo/utils/keyframeSelector.ts @src/animation/compile/selector
```

**7 pairs / 6 distinct files** (multiset, `sort` never `sort -u`; the line coordinate is deliberately
not part of the key). Negative witnesses, declared so no future census counts them:
`demo/kf-engine.ts:5` · `demo/scenes/cube/orbital-drag/composables/useOrbitalInertia.ts:12`.

### The frontier `scripts/gates/` roster (G-KFW4-9's denominator) — NINE

`structure/index.mjs` · `surface/agent-surface.mjs` · `surface/boundary.mjs` ·
`surface/consume-bundle.mjs` · `surface/index.mjs` · `surface/published-surface.mjs` ·
`surface/readme-runs.mjs` · `surface/verify-diff.mjs` · `visual/index.mjs`.

### Baseline FINDINGS — measured at this seat, routed, not smoothed

**F-1 · SUBSTRATE (MAJOR, blocks G-KFW4-1's and G-KFW4-4's src arm reaching GREEN) — four untracked
non-`origin/master` source files poison every `tsc` run in the execution substrate.**
⟨`git -C ../keyframes.js status --porcelain -- src/`⟩ →
`?? src/animation/compile/compiled-frame.ts` (32 L) · `?? src/animation/compile/interp-slot.ts` (350 L) ·
`?? src/animation/compile/value-ast.ts` (400 L) · `?? src/animation/group/composite-storage.ts` (25 L).
⟨`npx tsc --noEmit -p tsconfig.lib.json`⟩ → **exit 2, exactly one diagnostic**:
`src/animation/group/composite-storage.ts(2,32): error TS2307: Cannot find module './composite-state' or its corresponding type declarations.`
⟨`npx tsc --noEmit`⟩ (src/ + demo/) → **the same single error and nothing else** (double-run) — which is
itself the gate hole restated: the whole-project check is one error away from green *because no `.vue`
file is parsed*.
**Provenance**: these are residue of the 118-file untracked absorption KF.W0's close booked as
*"irreversible, E13 consequence NIL"*; `git reset --hard` does not remove untracked files, and the
§B-12 spec required untracked files be left in place. They are **not in KF.W4's §Bounds** (no row names
them; they exist at no committed coordinate).
**Routing**: **ORCHESTRATOR / triumvirate — not an implementer's decision.** Unit `.a` states this at
its first gate run; it may **not** delete, edit or `.gitignore` them, and it may **not** wrap the gate to
tolerate them (an allowlist, an `--exclude`, a `skipLibCheck` widening or a try/catch are each a HIGH
defect under standing law). If G-KFW4-1 cannot exit 0 with them present, that is the
born-RED-with-unreachable-GREEN class this spec convicts, arriving from the substrate rather than from
the spec — and it fires the §Sequencing triumvirate trigger *"any write outside §Bounds"* the moment a
seat reaches for them. The honest dispositions available to the triumvirate, named not chosen:
(i) the owner's hand removes them as a §B-12 tail; (ii) they are moved to an untracked location outside
`src/` by the same hand; (iii) KF.W4 books G-KFW4-1 GREEN-EXCEPT-F-1 with the residue named, which the
spec's own goal criterion forbids (*"a `.vue` file can fail a build"* is met, but `check` would not exit 0).

**F-2 · SPEC (MAJOR, unit `.b`) — G-KFW4-11 part (2)'s LHS pipeline, as literally spelled, yields the
EMPTY set at the frontier; the key it must use is the `@src/` specifier, not `.module | startswith("src/")`.**
The spec's command column reads
`jq -r '.modules[] | select(.source | startswith("demo/")) | .dependencies[] | select(.module | startswith("src/")) | "\(.source):\(.module)"'`.
Measured against the real `depcruise --output-type json` report at `origin/master 55e9bf0d`:

| key | pairs | what it is |
|---|---|---|
| `.module` starts `"src/"` (**as spelled**) | **0** | `.module` holds the **specifier as written**; a deep import is written `@src/animation/…`, never `src/…` |
| `.module` starts `"@src/"`, key `"\(.source) \(.module)"` | **7** | **exactly the pinned seven, in the frozen RHS's own key form** — reproduced byte-identical to the `git grep` derivation above |
| `.resolved` starts `"src/"` | **84** (71 distinct) | the **barrel** hops (`@mkbabb/keyframes.js` → `src/animation/index.ts`) — *not* deep imports, not this gate's subject |

**Consequence**: under the spelled filter the diff's LHS is empty against a 7-line RHS, so the gate reds
**for the wrong reason** and would still red after a correct cure — and it would red identically whether
or not depcruise reached `demo/`, re-creating the blindness-passes-silently defect PASS-6 D-1 just closed
at this same gate, with the sign flipped. **Routing**: unit `.b` executes the oracle with the
**`@src/`-specifier key** and writes a **dated addendum-beside** at
`docs/tranches/X/keyframes/waves/evidence/KF-W4/` recording the correction and both readings (E-3: the
spec's bytes are not edited by an executing seat — KF.W0 proved that law by `shasum`). The gate's
substance is untouched: equality against the frozen seven, failing on an addition **and** on a silent
removal, satisfiable by detection alone.

**F-3 · DATED DELTA (INFO, unit `.a`) — the day-one demo-file count reads 127, not the banked 126.**
⟨`npx tsc --noEmit --listFiles \| grep -c '/demo/'`⟩ → **127** (double-run) against B-1's banked *"126
demo files, 0 `.vue`"*. **The load-bearing half reproduces exactly: `.vue` = 0.** Recorded as a dated
reading beside the bank, never as an edit to it.

**F-4 · KEY-FORM (INFO, unit `.b`) — `depcruise-inventory.json` and `pinned-seven.txt` must agree on the
key.** PASS-6 D-1 fixed `depcruise-inventory.json` as depcruise's **RAW** output and moved the curated
pairs, the hash, the five dead LIGHT entries and the config's literal path to `pinned-seven.txt`'s header
block. The raw report does **not** contain the `path @src/specifier` pair form, so `pinned-seven.txt`'s
body is produced **by the artefact's own writer** from the raw report (never hand-typed), in the key form
F-2 establishes. One path, one writer, one content.

---

## Unit plan

**Execution shape (spec `:22`, binding — runbook §5.1 *"per-wave seat counts are declared in each spec's
§State `Agents` line and are binding"*)**: *"5 seats, 4 sequential phases — phase 1: `.a` serial · phase
2: `.b` serial (shares `package.json` + `ci.yml` with `.a`) · phase 3: `.c` ∥ `.d` (disjoint) · phase 4:
`.e` serial (opens after `.c` commits). **Peak concurrency 2**."*

**Model tiering**: the spec names **no** Fable / fresh-Fable / adjudicator / design-author seat anywhere
in KF.W4 — every unit is a mechanical/challenge seat (censuses, greps, gate runs, single-file cures) —
so **all five units are Opus** under M-12 TRI-FOLD (*"Opus solo for mechanical/challenge seats"*).

**Ordered groups (≤2 concurrent; no two concurrent units share a modify path — §Disjointness verified
path-by-path at this seat):**

1. `KF.W4.a`
2. `KF.W4.b`
3. `KF.W4.c` ∥ `KF.W4.d`
4. `KF.W4.e`

`.a` and `.b` both hold `package.json` (+ `package-lock.json`) and `.b` holds `ci.yml` → **sequenced,
never parallel**. `.c` (src + K3 demo sites) and `.d` (scripts + specs + manifests + citation targets)
share no path. `.e` opens after `.c` **commits** because both reach the easing family.

### `KF.W4.a` — the typecheck chassis · **Opus**

- **Sections**: §Gates *"Unit `.a` — the typecheck chassis"* (L203–207) · §Bounds rows `package.json`
  (L55, the `scripts` + devDeps carve only), `tsconfig.lib.json` (L58), `demo/env.d.ts` (L60),
  `demo/**` type-surface (L63), `demo/scenes/square/useSquareDemo.ts` (L87),
  `demo/app/scene/sceneExposedApi.ts` (L88), the evidence dir (L90) · **R-10** (L157) · §Sequencing
  internal locks (L248) · §Artefacts (L321) · §Commits **commit 1** (L323).
- **Gates**: `G-KFW4-1`.
- **Writable** — keyframes.js: `package.json`, `package-lock.json`, `tsconfig.lib.json`,
  `demo/env.d.ts`, `demo/**` (R-10 type surface ONLY), `demo/scenes/square/useSquareDemo.ts`,
  `demo/app/scene/sceneExposedApi.ts`. value.js: `docs/tranches/X/keyframes/waves/evidence/KF-W4/`,
  `docs/tranches/X/execution/B/KF-W4.md`, `docs/tranches/X/execution/LEDGER.md`.
- **Locks**: precedes `.b` (shared manifest); **commit 1 is ONE commit** — vue-tsc wiring + `env.d.ts` +
  the day-one type repairs + the protocol / `sceneExposedApi` / `SquareVars` riders; **R-10's inventory
  (`vue-tsc-inventory.json`) is written BEFORE any file under the `demo/**` row is opened**, and
  `import-graph-census.md`'s twelfth-act census lands from it before the first demo file is opened
  (its absence at that moment is a triumvirate trigger, spec §Artefacts).
- **Brief** (≤700 chars): Add `vue-tsc` (+ `eslint`/`eslint-plugin-vue` for `.b`) to devDeps; redefine
  `check` to `vue-tsc --noEmit -p tsconfig.json && tsc --noEmit -p tsconfig.test.json && npm run
  proof:structure` — **the `proof:structure` tail survives verbatim** (NO-SILENT-DELETION over all five
  opened scripts, before-forms quoted in §Bounds). Run `vue-tsc` read-only FIRST, bank every diagnostic
  to `vue-tsc-inventory.json` (dated), then **narrow** `demo/env.d.ts:3-7` to a typed `DefineComponent`
  — never delete it (the `tsconfig.test.json` census: `check` leg 2 includes `demo/env.d.ts` and plain
  `tsc` cannot parse an SFC). Cure diagnostics **type-only** (R-10: annotations, guards, declarations,
  import specifiers; no runtime value, no rendered output). Land `sceneExposedApi.ts:33` + MISS-6's
  `SquareVars` in the same commit. **State F-1 at the first gate run; do not touch the four untracked
  `src/` files.** A green `check` with the `any` shim standing is the no-op the goal criterion forbids.

### `KF.W4.b` — the merge-path lanes · **Opus**

- **Sections**: §Gates *"Unit `.b` — the merge-path lanes"* (L209–216) · §Bounds rows `package.json`
  (L55), `.github/workflows/ci.yml` (L56), `vitest.config.ts` (L59), `.dependency-cruiser.cjs` (L61),
  `eslint.config.js` (L62), the evidence dir (L90) · §Sequencing → KF.W8 cross-edge (L270) · §Artefacts
  (L321) · §Commits **commit 2** (L323).
- **Gates**: `G-KFW4-2` · `G-KFW4-3` · `G-KFW4-11` · `G-KFW4-12`.
- **Writable** — keyframes.js: `package.json`, `package-lock.json`, `.github/workflows/ci.yml`,
  `vitest.config.ts`, `.dependency-cruiser.cjs`, `eslint.config.js` (create). value.js: the evidence dir
  + this record.
- **Locks**: after `.a`. **Commit 2 is the witness KF.W8's G10 leg (a) cites** — the plugin-vue
  **registration** happens here, once, and W8 performs no `vitest.config.ts` edit; the devDep is already
  at `package.json:81` so **no manifest add for plugin-vue**. `−monaco-themes` lands **with**
  `package-lock.json` regenerated **in the same commit**. `census-first-run.txt` (the 27's roster) is
  written **before** the demo step is marked blocking.
- **Brief**: Register `@vitejs/plugin-vue` in `vitest.config.ts` (the file has **no** `plugins` array)
  and put `--project demo` + `demo:correctness` on the CI **merge** job as blocking steps, ungating
  `ci.yml:53-55`. Create `eslint.config.js` — **flat, `eslint-plugin-vue` essentials ONLY** (a wider
  ruleset is itself a failure of G-3); wire `lint` = `depcruise --config .dependency-cruiser.cjs src demo`
  + eslint. Extend `.dependency-cruiser.cjs` past `src/` and repoint the **five** dead LIGHT entries to
  their live twins. Run G-11 in two parts: reach (depcruise → raw `depcruise-inventory.json`) then the
  **equality oracle** against the frozen `pinned-seven.txt` — **execute F-2's corrected key (`@src/`
  specifier), and write the dated addendum-beside**. Delete `monaco-themes`. Any RED among the 27 ⇒
  triumvirate. No `known-violations` file, ever.

### `KF.W4.c` — the library K-quartet · **Opus**

- **Sections**: §Gates *"Unit `.c` — the library K-quartet"* (L218–224) · §Bounds rows `tsconfig.json`
  (L57), `registry.ts` (L64), `easing-serialize.ts` (L65), `leaves.ts` (L66), `leaves-parity.test.ts`
  delete (L67), `load-engine.ts` (L68), `engine/css/animation.ts` (L69), `backward/backward.ts` (L70),
  the K3 demo sites (L71), `test/compile/easing-identity.test.ts` create (L80) · **R-2** (L127) ·
  **R-9** (L155) · COHESION **§0j.C KF-SS3** · §Commits **commits 3 · 4 · 5** (L323).
- **Gates**: `G-KFW4-4` · `G-KFW4-5` · `G-KFW4-6`.
- **Writable** — keyframes.js: `tsconfig.json`, `src/animation/compile/easing/registry.ts`,
  `src/animation/compile/emit/easing-serialize.ts`, `src/animation/internal/leaves.ts`,
  `test/internal/leaves-parity.test.ts` (**delete**), `src/animation/load-engine.ts`,
  `src/animation/engine/css/animation.ts`, `src/animation/compile/emit/backward/backward.ts`,
  `test/compile/easing-identity.test.ts` (**create**), and the K3 demo sites
  `demo/scenes/amiga/AmigaScene.vue`, `demo/scenes/square/SquareScene.vue`,
  `demo/scenes/square/useSquareTumble.ts`, `demo/scenes/sequence/SequenceScene.vue`,
  `demo/scenes/spring/SpringScene.vue`,
  `demo/components/instrument/timeline/components/TimelineTrack.vue`,
  `demo/components/instrument/transport/channel-controls/ChannelOptions.vue`. value.js: the evidence dir.
- **Locks**: ∥ `.d` (disjoint by construction); **K2's delete + `:18` + `:19` correction are ONE commit
  (commit 4) — two commits fail G-6**; K1 = commit 3; K3 both arms + R-9 = commit 5; **K3's src arm
  precedes its demo arm**; `registry.ts:43`'s module-evaluation `throw` fence **DO NOT DISTURB** (a key
  removal is a boot throw, an addition silently widens the public registry); **`TimelineCaret.vue` is
  KF.W7's cure site — witness only, no byte written here** (R-3).
- **Brief**: K1 (R-2 + KF-SS3): keep the module-evaluation map, **retire** `easing-serialize.ts:71-73`'s
  `.find(func === easing.fn)` reverse-map as a **REPLACEMENT, never a removal** — the name travels with
  the serialized record; the census binds it (17 call sites + 2 published re-exports + 3 asserting specs;
  three assertions need a registry **name** back, four need the **throw preserved**). Create
  `test/compile/easing-identity.test.ts`; identity is proved by **sampled value-identity on the 33-point
  grid** (§0j.C KF-SS3), not by relabel. K2: delete `leaves-parity.test.ts` **and** correct
  `leaves.ts:18-19` in one commit. K3: flip `noUnusedLocals`, cure the in-bounds sites, and take R-9's
  measured **else-branch** — delete `_boundTimeline` and its `:5` prose together (3 hits, 0 reads;
  re-run the two commands at open into `k3-decision.md` and record any delta first).

### `KF.W4.d` — the censuses and the gate-authoring audit · **Opus**

- **Sections**: §Gates *"Unit `.d` — the censuses and the gate-authoring audit"* (L226–233) · §Bounds
  rows `resize-tracks.test.ts` (L75), the orbital specs (L76), `usability.mjs` (L77),
  `live-session.mjs` **read-no-write** (L78), the `scripts/gates/` creates (L79),
  `typing-dots-engine-seam.test.ts` create (L83), `aurora-opacity-ceiling.test.ts` create (L84),
  `font-roles.json` (L85), the **eight** citation targets (L89) · **R-3 · R-4 · R-5 · R-7 · R-8** ·
  §Excluded 16–21 + the G-KFW4-8 residue routing table (L300–316) · §Commits **commit 6** (L323).
- **Gates**: `G-KFW4-7` · `G-KFW4-8` · `G-KFW4-9` · `G-KFW4-10`.
- **Writable** — keyframes.js: `scripts/gates/census.mjs` (create), `scripts/gates/register-census.mjs`
  (create), `test/demo/instrument/resize-tracks.test.ts`,
  `test/demo/scenes/orbital-inertia-parity.test.ts`, `test/demo/scenes/orbital-rotate3d.test.ts`,
  `test/demo/instrument/typing-dots-engine-seam.test.ts` (create),
  `test/demo/instrument/aurora-opacity-ceiling.test.ts` (create), `demo/styles/font-roles.json`,
  and the eight citation targets (`demo/DESIGN.md`,
  `demo/components/instrument/shell/EditorStartScreen.vue`, `demo/app/App.vue`,
  `demo/components/instrument/shell/HeroAurora.vue`, `demo/components/instrument/shell/TypingDots.vue`,
  `demo/styles/layout.css`, `demo/styles/design-idioms.css`,
  `demo/scenes/spring/SpringPhysicsFacet.vue`). value.js: the evidence dir **and
  `docs/tranches/X/execution/B/KF-W4-usability-bundle.patch`**.
  **NOT writable**: `scripts/observe/demo/usability.mjs` (see locks), `scripts/observe/demo/live-session.mjs`
  (read-only census evidence), `live-session-mobile.mjs` (neither read nor written).
- **Locks**: ∥ `.c`; **KF.W4 ∥ KF.W6 ATOMIC BUNDLE (runbook §3.4)** — `scripts/observe/demo/usability.mjs`
  is *"written ONLY inside the atomic bundle (one commit, both seats); never unilaterally, never
  concurrently"*. **This wave AUTHORS its half as a patch file at
  `docs/tranches/X/execution/B/KF-W4-usability-bundle.patch` and commits NO byte of `usability.mjs`;
  W6's first commit lands the bundle with both halves.** The file is therefore left **unmodified in the
  working tree** so no pathspec can capture it. `DESIGN.md`'s §10 rules table (`:234-240`) is a **declared
  separate bounded act with its own diff review**; every other citation site is **≤1 clause** (R-7).
- **Brief**: Author `scripts/gates/census.mjs` as **ONE script, three separately-closing clauses**
  (provenance C1 · citations C2 · manifest C3) and `register-census.mjs` reading the **rendered** register
  per `font-roles.json` (R-3's fold: one shared selector module, no second parallel runner; fails on
  descent, on blindness to `text-transform`, and on any **empty-set** manifest row — `:16-26`'s
  `filing-tab` rows die here). Delete the **33 lines / 19 names** of dead `proof:` citations at the eight
  targets, **declaring the `proof:brittleness` carve at `layout.css:152` by name in the run's artefact**
  (R2-13) and pulling in **no** residue family (§Excluded 16–21 route them). Cure the rule-(c)/(d)/(e)
  sites: recalibrate `INERTIA_FACTOR` at **all nine** coordinates, retire the two `toMatch` source-text
  pins in `resize-tracks.test.ts`. Create R-5's single TypingDots seam spec + KF-HA-4's aurora-ceiling
  spec (`.test.ts`, never `.spec.ts`). Author the usability half **as the patch file only**.

### `KF.W4.e` — easing honesty · **Opus**

- **Sections**: §Gates *"Unit `.e` — easing honesty"* (L235–240) · §Bounds rows
  `constants/types.ts` (L72), `easing.ts:44` + `waapi/eligibility.ts:169` (L73),
  `orchestration-api.test.ts` (L74), `timing-function-names.test.ts` create (L81),
  `easing-catalogue.test.ts` create (L82), the `EasingSidebar.vue` / `useEasingDemo.ts` carve (L86) ·
  **R-6** (L135) · §0 **OP-6** → COHESION **§0j.C KF-SS3** · §Commits **commits 7 · 8** (L323).
- **Gates**: `G-KFW4-13` · `G-KFW4-14`.
- **Writable** — keyframes.js: `src/animation/constants/types.ts`, `src/animation/easing.ts`,
  `src/animation/waapi/eligibility.ts`, `test/orchestration/orchestration-api.test.ts`,
  `test/compile/timing-function-names.test.ts` (create), `test/demo/easing-catalogue.test.ts` (create),
  `demo/scenes/easing/EasingSidebar.vue` (**`:42-49` · `:86-89` · `:99` · `:112` · `:132-137` only**),
  `demo/scenes/easing/useEasingDemo.ts` (**`:255-257` only**),
  `demo/utils/reference-data/animationDescriptions.ts`. value.js: the evidence dir.
- **Locks**: opens **after `.c` commits**; **KF-CB-18 + KF-CB-24 + KF-CB-29 are ONE commit** (commit 7,
  the bank's explicit instruction); commit 8 carries G-14. The rest of `EasingSidebar.vue` /
  `useEasingDemo.ts` is the **OPTIONS-UNIT's** and sequences after this wave (R-6).
- **Brief**: Delete `types.ts:195`'s `| string` arm **and** `:27`'s `| "steps"` — deleting `| string`
  alone is insufficient, and `"steps"` throws (bare `steps` fails CSS Easing L1 parse; absent from
  `registryNames`). Create `test/compile/timing-function-names.test.ts`: every member constructs without
  throwing, and `// @ts-expect-error` on `const x: TimingFunctionName = "banana"` compiles clean under
  `vue-tsc` (today it is **unused**, TS2578 — that is the RED). Retire the two surviving `bounceInEase`
  prose phantoms and `orchestration-api.test.ts:142-148`'s `cssTwinFor("bounceInEase")` tautology with
  its `:147` falsifier. **G-14 dispatches on §0j.C KF-SS3's preserve-the-class branch**: create
  `test/demo/easing-catalogue.test.ts`, correct the `smooth-step-3` caption and its `:86-89` comment,
  and **gate `seedFor` on `NAMED_EASING_BEZIER` so it no longer reaches `bezierPresets` at `:112`** —
  never merge the catalogues (29 ⊂ 30, sole delta `smooth-step-3`). Correcting the caption while
  `seedFor` still reaches `bezierPresets` fails the gate.

### Standing law carried into every unit

Owner's begin-word authorizes publish/push/pull/deploy · the **spec GOVERNS**, root-cause cures only
(no try/catch around a defect, no `test.skip`, no allowlist, no copied producer selector, no
`node_modules` patch) · writes ONLY inside the unit's writable set, anything else is an **ESCALATION** ·
`scripts/dev/dev.sh` **NEVER touched, never staged** · pathspec commits only, **the pathspec on the
`commit`, never only on a preceding `add`** (KF.W0's landed-wrong guard) · E-3 addenda-beside ·
WRITE-THEN-MEASURE + double-run + SELF-COUNT + quote-by-command · glass-ui **READ-ONLY always**, producer
rows ride SS-6/BH, never demo-side hacks · probe parsimony (§5.2) · no wave closes with UNREAD mail ·
**triumvirate triggers** (§Sequencing L276): any write outside §Bounds, an inventory row not curable
type-only, G-11 unsatisfiable by detection, G-5's round-trip still failing after the reverse-map
retirement, any third diagnose→edit→re-measure iteration on one gate, and **any pressure to allowlist**.

---

## Unit receipts

*(appended by each unit as it lands; nothing here yet)*
