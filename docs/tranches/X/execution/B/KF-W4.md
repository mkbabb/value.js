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

*(appended by each unit as it lands)*

### KF.W4.a

**SERVED MODEL**: `claude-opus-5[1m]` · **Opened** 2026-09-17 · **Gate** `G-KFW4-1` ·
**Commit** keyframes.js **`5388907b`** (one commit, as §Commits commit 1 requires) ·
**Substrate** `/Users/mkbabb/Programming/keyframes.js`, branch `master`,
⟨`git rev-parse --short=8 origin/master`⟩ → **`55e9bf0d`** (COHESION §0j.C KF-WRITE (b)).
Every figure below is read from settled bytes and double-run.

#### Act 0 — FOUND-STATE, declared before anything else (honesty first)

⟨`git -C ../keyframes.js status --porcelain`⟩ at open → **`M package.json` · `M package-lock.json`**
plus the six known `??` rows. **An interrupted prior run of this same seat had already landed the
manifest wiring on disk, uncommitted.** It was not adopted on trust: each byte was verified against the
spec's prescribed after-form before this seat continued (Act 2), and the four untracked `src/` rows
were left exactly as found. No other tracked file was modified at open.

#### Act 1 — R-10's inventory, banked BEFORE any `demo/**` file was opened

⟨`npx vue-tsc --version`⟩ → `Version 6.0.3` · ⟨`ls node_modules/.bin/vue-tsc`⟩ → **present** (the
baseline's *ABSENT* is discharged).
⟨`npx vue-tsc --noEmit -p tsconfig.json`⟩ → **exit 2**, RUN1 == RUN2 byte-identical
(`diff -q` clean). Parsed to
`docs/tranches/X/keyframes/waves/evidence/KF-W4/vue-tsc-inventory.json` (valid JSON; the receipt line
rides as its **first key**, `"SERVED MODEL": "claude-opus-5[1m]"`, so the artefact stays parseable).

**64 diagnostics over 24 files — 63 `demo/**` + 1 `src/`.** By code:
`TS2339`×15 · `TS2532`×12 · `TS2379`×11 · `TS18048`×9 · `TS2322`×7 · `TS2345`×3 · `TS2769`×2 ·
`TS2307`×2 · `TS4104`×1 · `TS2554`×1 · `TS2314`×1. Largest file: `MatrixEditor.vue` **29**.
**This is the wave's principal product** and it is dated, not re-derivable: it is the first reading of
a tree in which a `.vue` file can fail a build.

**`import-graph-census.md` landed next, still before the first demo file was opened** — the TWELFTH
act's census (spec §Artefacts: *"its absence at that moment is a triumvirate trigger"*). Derived from
the inventory: of 63 demo rows **exactly ONE** names a module specifier (`CSSCodeEditor.vue:54`), so the
repoint surface is one site; §Bounds' own `demo/env.d.ts` censuses were re-run at the tree of execution
and **all four reproduce** (1 declaration + 1 prose · 62 specifiers · 0 test-side · 58 SFCs).

**F-3 re-measured**: ⟨`npx tsc --noEmit --listFiles \| grep -c '/demo/'`⟩ → **127**, reproducing the
wave record's dated 127 against the bank's 126; the load-bearing half (`.vue` = 0 under plain `tsc`)
reproduces exactly.

#### Act 2 — the chassis (NO-SILENT-DELETION, all five opened scripts)

⟨`sed -n '37p;38p;44p;45p;46p' package.json`⟩ at close, byte-exact:

```
"check": "vue-tsc --noEmit -p tsconfig.json && tsc --noEmit -p tsconfig.test.json && npm run proof:structure",
"check:lib": "tsc --noEmit -p tsconfig.lib.json",
"lint": "depcruise src",
"test": "vitest",
"test:lib": "vitest run --project library",
```

**The `&& npm run proof:structure` tail SURVIVES VERBATIM (R2-3), and so does leg 2.** `check:lib`,
`lint`, `test`, `test:lib` are **byte-identical to their `origin/master` before-forms** — the declared
outcome, checkable against §Bounds' quoted befores. `lint` is `.b`'s to redefine; this seat did not
touch it. devDeps: **+`vue-tsc ^3.3.11`** (`:116`), **+`eslint ^10.10.0`** (`:86`),
**+`eslint-plugin-vue ^10.11.0`** (`:87`) for `.b`; **`monaco-themes` still present at `:94`** (its
delete is `.b`'s, with the lock, in one commit) and **`@vitejs/plugin-vue` untouched at `:81`** (the
spec struck that add as a no-op).

`tsconfig.lib.json` (`:1-11` carve): the staged-Glass comment is **corrected, not deleted** — glass-ui
7.0.0 is an installed exact devDep at the frontier, so the *"after that dependency is restored"* wait it
described is over, and `check` now runs `vue-tsc`. **`"include": ["src/"]` is NOT widened**: it is what
keeps A inv β (the release-path type-check is glass-ui-free), and the corrected comment says so.

#### Act 3 — the shim (G-KFW4-1's own falsifier)

`demo/env.d.ts:3-7` **NARROWED, not deleted**: `DefineComponent<{}, {}, any>` →
`DefineComponent<Record<string, unknown>, Record<string, unknown>, unknown>`. The branch was chosen
**from the census, before the field opened** (`tsconfig.test.json` includes this file; plain `tsc`
cannot parse an SFC, so a deletion reds leg 2). Verified after: ⟨`npx tsc --noEmit -p
tsconfig.test.json`⟩ → **exit 0**; ⟨`grep -c 'DefineComponent<{}, {}, any>' demo/env.d.ts`⟩ → **1**, the
`*.svg?component` block alone, which is **outside this row's `:3-7` carve** and left byte-exact by
design. `tsconfig.test.json` was **not touched** — the declared triumvirate trigger for it did not fire,
because the narrowing leaves its `:12-15` prose true. Full diff + falsifiers in `env-shim-diff.md`.

#### Act 4 — the type surface, cured TYPE-ONLY (R-10), and the riders

**63 demo diagnostics → 12.** **51 cured**, every one an annotation, a guard, a type declaration or an
import specifier; **no runtime expression value and no rendered output changed.** The load-bearing ones,
by banked id:

- **ChromeDock / C-8** — `BUILT_IN_CONTROL_TABS`, `controlSurfaces`, `extraControlTabs` re-narrowed to
  the unions their own source modules export (`ControlSurfaceTab`, `readonly ControlSurface[]`). Kills
  the banked `:128` TS2322 **and** `App.vue:16`'s TS4104 at one root. `:62`/`:66`/`:154` produce no
  diagnostic and were **left alone** — C-8's MAJOR is its packet's, not this seat's.
- **The protocol rider** — `sceneExposedApi.ts` gains `tabsTrigger?`, the member `App.vue:60-62` binds
  and no scene exposes (CubeScene deleted its entry at `:152-156`). Its slot-props shape was **read off
  the compiler**, not assumed: the first spelling (kebab keys, from the template source) was rejected by
  `vue-tsc` with the true shape `{ selectedAnimation: string \| null; isPlaying: boolean }`, and the
  measured shape is what landed. **`:33`'s `isStarted?: boolean` was measured and left**: scenes expose
  a `Ref`, Vue's expose proxy unwraps it, and the shell binding's `sceneRef.value.isStarted = started`
  writes back through `proxyRefs` — the declared `boolean` is the honest unwrapped type and **no
  diagnostic exists at that line**. L-18/C-12a is discharged by measurement, not by an edit.
- **MISS-6 (`useSquareDemo.ts`)** — `interface SquareVars extends Vars` declared and bound at the
  custom transform function. The library's `Vars<T = any>` made every nested leaf of the one scene whose
  point IS the nested-object primitive resolve to `any`. Landing it immediately caught a real
  mis-typing (`backgroundColor` written onto `el.style.backgroundColor` is a **string**, never a
  number), which is now declared. **Same commit, as the spec requires.**
- **`matrixOptions` (CubeScene's five)** — the store type declared `{ fixed: boolean }` while
  `MatrixEditor.vue` wrote and seeded `selectedMatrixCell`: **statically ill-typed at every read, in the
  one authority for the stored shape**. Cured at that authority (`MatrixOptions`, exported through the
  `@state` barrel), which killed **7** TS2339s; the remaining optionality is discharged at the editor by
  an annotation naming the post-condition its own `??=` establishes.
- **KF-CE-11 (monaco)** — the specifier is written the way the package's own exports map can resolve
  it (`…/editor.api` → `…/editor.api.js`; `"./*": "./*"` maps to an extensionless path that is not a
  file, which is why the type-checker alone could not see it). **Same file on disk, same chunk, no edge
  moved** — census in `import-graph-census.md §A.1`. The TYPE side was repointed to match
  (`import type * as Monaco from ".../editor.api.js"`): the namespace type must name the module the
  runtime actually loads, and the two differ by the language contributions this editor registers by hand.
- **KF-CE-16 (debounce)** — the phantom third argument at the call site is removed; `helpers.ts`'s
  `debounce` takes two parameters and never read it, so **the expression's value is unchanged**. (Dated
  delta: the spec cites `KeyframesStringControls:114-119`; the frontier's sole TS2554 is
  `CSSCodeEditor.vue:119`.)
- **L-D2 / the `exactOptionalPropertyTypes` chain** — nine optional props along
  `EditorShell → AnimationControlsGroup → ControlsPaneWrapper → ChannelControls → ChannelOptions` and
  `TimelineHoverPreview` now declare `| undefined`, because the parents **bind** those attributes rather
  than omitting them (and two of them are index reads, `T | undefined` by construction).
- **ST-5** — `activeRowEl`'s one-guard fix, exactly as banked: runtime-unaffected, an out-of-range row
  is falsy either way.
- **orbital-drag** — `useOrbitalInertia`'s params declared `Float32Array` for an axis and a callback
  that the producer supplies as gl-matrix `vec3` (its sibling `useOrbitalPinch.ts:17` already said
  `vec3`); the velocity dampen loop is keyed by the bucket's own keys, so the read is total without a
  cast.
- **A REVERT, recorded rather than smoothed.** This seat first narrowed `Matrix3dCall.args` to
  `readonly MatrixScalar[]`. `check`'s **leg 2** then failed at
  `test/demo/scenes/cube-scene.test.ts(120,24)` — a spec that authors a `var()` arg **to prove
  `matrixValues` rejects it**. The narrowing would have made that guard's own falsifier inexpressible,
  so it was **reverted**, the open union documented with the reason, and the two `payload` reads cast at
  the editor that knows its matrix came from `createMatrix`. Leg 2 re-measured **exit 0**. *A type that
  makes a rejection untestable is not a cure.*

**Template TS syntax was PROVED, not assumed** before it was used (11 non-null assertions in
`MatrixEditor.vue`, 1 in `CubeScene.vue`, 2 casts): a read-only `@vue/compiler-sfc` probe showed the
compiler emits the assertion into the render function, and ⟨`npx vite build --mode gh-pages`⟩ → **exit
0** proves the toolchain compiles it. No prior site in the tree used the idiom, so it was measured
end-to-end before it was spent.

**Prettier, measured before it was run.** 19 of the touched files fail `prettier --check` — but **17 of
them fail identically at `origin/master`** (verified by checking pristine `git show` copies with the
repo's own config and plugins). Only **2** files (`demo/env.d.ts`, `MatrixEditor.vue`) were made dirty
by this seat's edits, and only those two were `--write`-formatted; reformatting the other 17 would have
been a large write far outside this unit's bound, dressed as cadence.

#### Act 5 — gate reading, BEFORE → AFTER

| leg | command | BEFORE (baseline, `origin/master`) | AFTER (this unit) |
|---|---|---|---|
| chassis | ⟨`ls node_modules/.bin/vue-tsc`⟩ | **ABSENT** | **present**, and invoked by `check` |
| the hole | ⟨`npx tsc --noEmit --listFiles \| grep -c '\.vue$'`⟩ | **0 `.vue` in the program** | leg 1 is `vue-tsc`: **58 SFCs parsed, 63 real SFC diagnostics produced day one** |
| leg 1 | `vue-tsc --noEmit -p tsconfig.json` | 64 errors (63 demo + 1 src) | **13** (12 demo + 1 src) — **51 cured** |
| leg 2 | `tsc --noEmit -p tsconfig.test.json` | 0 errors | **0 errors** (preserved verbatim; re-measured after the shim act and after the revert) |
| leg 3 | `npm run proof:structure` | *(not separately measured at baseline)* | **FAIL: 24 violations, R6×24 — 24 of 24 from F-1's four untracked files** (double-run) |
| **G-KFW4-1** | `npm run check`; exit 0 | **RED-AS-EXPECTED** | **RED — WIRED, NOT GREEN** |

Collateral, re-run at close: ⟨`npx vitest run --project demo`⟩ → **27 files / 155 tests passed**;
⟨`npx vitest run --project library`⟩ → **98 passed / 5 skipped, 1040 tests**;
⟨`npx vite build --mode gh-pages`⟩ → **exit 0**; ⟨`git diff --check`⟩ → clean.

#### Act 6 — residuals and escalations (R-10's register)

Full detail, with per-row measurements and routing, in
`docs/tranches/X/keyframes/waves/evidence/KF-W4/type-surface-residuals.md`. Summary:

- **8 PRODUCER-TYPE-GAP rows → SS-6 / BH mail** (6 glass-ui: `AuroraAtoms.medium`, `InputProps.modelValue`,
  `Select.modelValue`, `InputProps.type` lacking `"number"`, `LabeledSwitch`'s `checked`→`modelValue`
  drift, `EasingPicker.preset/steps/term`; 1 vue-core: `VNodeProps.key?: PropertyKey`; counted as 8
  diagnostics). **Every one is assertable-green at the consumer and NONE was asserted** — that is the
  demo-side hack the standing law forbids, and the spec's own named example (KF-APP-45) is this shape.
- **2 BEHAVIOURAL defects (4 diagnostics) → their packets.** **The gate's first real catch:**
  `MbabbMenu.vue:100`'s `togglePpMode()` writes through `stored.value` on a **non-`Ref`** — a live
  `TypeError` on every click of the pp-mode item, invisible to every instrument in the tree until now.
  And KC-37 (`KeyframesEditor.vue:38/:43`), which reads and WRITES `.value` on a `Readonly` library
  union's wrong arm.
- **F-1 → ORCHESTRATOR / TRIUMVIRATE, WIDENED BY MEASUREMENT.** The four untracked `src/` files red
  **two** of `check`'s three legs, not one: 1 of leg 1's 13 diagnostics **and all 24 of leg 3's
  violations** (`value-ast.ts` 14 · `interp-slot.ts` 6 · `composite-storage.ts` 2 ·
  `compiled-frame.ts` 2). They were not deleted, edited, `.gitignore`d, moved, or gate-wrapped, and no
  flag was widened to tolerate them. The wave record's three honest dispositions stand; **this seat took
  none of them.**

**No suppression of any kind was used anywhere in this unit**: no `@ts-expect-error`, no `any`, no
`test.skip`, no allowlist, no `skipLibCheck` widening, no `node_modules` patch. `scripts/dev/dev.sh`
was never touched. The `.b`-owned rows (`ci.yml`, `vitest.config.ts`, `.dependency-cruiser.cjs`,
`eslint.config.js`, `−monaco-themes`) were not touched.

#### Artefacts landed (value.js `docs/tranches/X/keyframes/waves/evidence/KF-W4/`)

`vue-tsc-inventory.json` (R-10's dated day-one set, 64 rows) · `import-graph-census.md` (LAW A's
twelfth act + the §Bounds census deltas) · `env-shim-diff.md` · `type-surface-residuals.md`.

#### Handover to `.b`

`package.json` + `package-lock.json` are **committed and clean** — `.b` opens from a settled manifest
(the internal lock is discharged). `eslint` and `eslint-plugin-vue` are already installed, so `.b`
authors `eslint.config.js` without a manifest race. `monaco-themes` is **still present**, awaiting
`.b`'s delete-with-lock in one commit. The demo lane's 27/155 pass state is re-measured **after** this
unit's type surface landed, so `.b`'s `census-first-run.txt` starts from a known-good roster. **The push
is the wave close seat's** (§0j.C KF-WRITE: *"every wave pushing `origin HEAD` at close"*); this unit
leaves `5388907b` local and unpushed by design.

### KF.W4.b

**SERVED MODEL**: `claude-opus-5[1m]` · **Opened** 2026-09-17 after `.a` committed (internal lock
discharged: the manifest was settled and clean at open) · **Gates** `G-KFW4-2` · `G-KFW4-3` ·
`G-KFW4-11` · `G-KFW4-12` · **Commit** keyframes.js **`fb509edd`** (ONE commit, §Commits commit 2) ·
**Substrate** `/Users/mkbabb/Programming/keyframes.js`, branch `master`,
⟨`git rev-parse --short=8 origin/master`⟩ → **`55e9bf0d`**, parent `5388907b` (`.a`'s commit 1).
value.js evidence **`1e99ec31`**. Every figure below is read from settled bytes and double-run.

#### Act 0 — anchors re-verified at TRUE bytes before a byte was written

| §Bounds row | anchor as spec'd | measured at this seat | verdict |
|---|---|---|---|
| `package.json` L55 | `:92` `monaco-themes`, devDeps carve | present at **`:95`** after `.a`'s three adds | **DRIFTED — INTENT taken at the true bytes**, recorded |
| `.github/workflows/ci.yml` L56 | merge job `:41-42`; nightly block `:53-55` | ⟨`git show origin/master:.github/workflows/ci.yml \| sed -n '41p;53p;54p;55p'`⟩ → `- name: check library types` · `demo-correctness:` · `name: demo correctness (nightly roster)` · `if: github.event_name == 'schedule' \|\| github.event_name == 'workflow_dispatch'` | **reproduces byte-exact**, all four lines at their stated coordinates (`.a` wrote no byte of this file) |
| `vitest.config.ts` L59 | `projects` `:38-56`, `demo` `:48-55`, glob `:52`, **no `plugins`** | byte-exact; ⟨`grep -c plugins`⟩ → **0** | reproduces |
| `.dependency-cruiser.cjs` L61 | 24 LIGHT entries, **5** dead | per-entry ⟨`git cat-file -e`⟩ → **5 DEAD / 19 LIVE of 24**, twins all EXIST | reproduces (the spec's round-4 **5**, not the bank's 4) |
| `eslint.config.js` L62 | create | ⟨`git cat-file -e origin/master:eslint.config.js`⟩ → fatal | reproduces |
| evidence dir L90 | create | present from `.a` | reproduces |

#### Act 1 — the FROZEN artefacts, written BEFORE the first cure (ordering is law)

1. **`census-first-run.txt`** — G-KFW4-2's falsifier demands the 27's roster *before the step is
   marked blocking*. ⟨`npx vitest run --project demo --reporter=verbose`⟩ → **27 files / 155 tests
   PASSED, exit 0**, both runs. SELF-COUNT over the settled artefact → 27 rows / 155 tests.
   **NO RED among the 27 ⇒ the triumvirate trigger for the merge-path wiring DID NOT FIRE.**
2. **`pinned-seven.txt`** — the frozen oracle RHS, derived from the **pre-cure** raw depcruise report
   by the artefact's own writer (never hand-typed): **7 pairs / 6 distinct files**, byte-identical to
   the wave record's frozen list. sha256 `9733d2e6…`.

#### Act 2 — the cures (commit `fb509edd`, one commit)

- **`vitest.config.ts`** — `plugins: [vue()]` at the config ROOT (both projects inherit through
  `extends: true`). **The registration KF.W8's G10 leg (a) cites; W8 performs no edit of this file.**
- **`ci.yml`** — `gates` (the merge job) gains two blocking steps, `npm run test:demo` and
  `npm run lint`; `demo-correctness`'s `if: schedule || workflow_dispatch` is **REMOVED**, so the
  browser roster runs on `pull_request`/`push` and blocks. Both stale comments asserting *"does not
  block library merges"* corrected — a phantom authority is what this wave extinguishes. The
  deploy-ancestry tag step is scoped to `push`/`schedule` **by event**: on a PR `github.sha` is the
  ephemeral merge commit and a fork token carries no `contents: write`.
- **`eslint.config.js`** — created; flat; **`eslint-plugin-vue` ESSENTIALS ONLY**. `lint` redefined
  `depcruise src` → `depcruise --config .dependency-cruiser.cjs src demo && eslint demo`.
- **`.dependency-cruiser.cjs`** — the five dead LIGHT entries repointed to their live twins (after:
  **24/24 resolve**); rule 1 `from: "^src/"` → `"^(?:src|demo)/"`; the allowlist's prose corrected to
  say why a dead entry is a defect and not a formality.
- **`package.json` + `package-lock.json`** — `−monaco-themes` **with the lock regenerated in the same
  commit** (LAW A census re-run at this seat: consumer set of the *package* = ∅; the two live imports
  are the **vendored sibling directory** `./monaco-themes/*.json`, R3-1's same-basename trap).
  `+test:demo`. **Two parser devDeps, declared**: `vue-eslint-parser` (a **required** peer of the
  authorized `+eslint-plugin-vue` that npm will never auto-install here — ⟨`cat .npmrc`⟩ →
  `legacy-peer-deps=true`) and `@typescript-eslint/parser` (measured necessity: without it
  ⟨`npx eslint demo`⟩ → **55 fatal `Parsing error`s** and ZERO template findings). **Both are
  parsers; neither adds a rule** — the essentials-only bound is intact.

#### Act 3 — gate readings, BEFORE → AFTER

| gate | BEFORE (baseline) | AFTER (this unit) |
|---|---|---|
| **G-KFW4-2** | RED — nightly-gated, no `plugins` array, 27 unmeasured | **GREEN** — roster frozen 27/155; plugin registered and **PROVED by mounting a real demo SFC**, with a negative control; both demo instruments blocking on the merge path |
| **G-KFW4-3** | RED — no ESLint anywhere; `lint` = `depcruise src` | **RED — WIRED, NOT GREEN · TRIUMVIRATE** — the gate's own command now runs and reports **10 problems / 5 files**; ME-29 is row 1 |
| **G-KFW4-11** | RED (config scope) · oracle unsatisfiable as spelled | **GREEN** — reach 439 modules / **230 demo**; ⟨`diff actual-specifiers.txt pinned-seven.txt`⟩ → **exit 0** |
| **G-KFW4-12** | RED — `monaco-themes` present | **ACT-COMPLETE · command DEFERRED** — devDep + lock rows at **0**, ⟨`vite build --mode gh-pages`⟩ → **exit 0**; `node scripts/gates/census.mjs --clause manifest` is unrunnable here because `census.mjs` is `.d`'s create row. Not booked GREEN by assertion |

Collateral after the cures: ⟨`npx vitest run --project demo`⟩ → **27/155** · ⟨`--project library`⟩ →
**98 passed / 5 skipped, 1040 tests** · ⟨`npx vite build --mode gh-pages`⟩ → **exit 0** ·
⟨`npx depcruise --config .dependency-cruiser.cjs src`⟩ → **✔ no violations (164 modules)** — SCH-7's
no-cycle baseline re-verified.

#### Act 4 — findings, routed not smoothed

- **F-5 · SPEC (MAJOR, G-KFW4-11) — the oracle's LHS has THREE defects, not one.** F-2 named the
  `@src/` key and stopped there. Re-run at this seat, F-2's own corrected pipeline yields **7 lines
  whose path column is the string `null`**: after `.dependencies[]` the jq context IS the dependency
  object, which has no `source` key, so the module must be bound (`. as $m`); and the LHS spells a
  **colon** separator where the frozen RHS uses a **space**. F-2's count was right and its content was
  not. Full dated addendum-beside, with both readings at every correction, in
  `evidence/KF-W4/G11-oracle-addendum-2026-09-17.md`.
- **F-6 · SPEC (INFO, G-KFW4-11) — part (1)'s REACH premise is false at the bytes.** *"a config still
  scoped to `src/` reports zero demo modules"*: measured **230** demo modules with the config
  untouched. What a cruise REPORTS is fixed by the CLI argument list, not the rules' `from` scope.
  Blindness still fails the gate — through the RHS's fixity (an LHS of 0 against a 7-line RHS), not
  through rule scope. Recorded so no future seat rebuilds the mechanism on the stated premise.
- **F-7 · TREE (MAJOR, routed) — four REAL runtime cycles, found by the extended rule.** One ring,
  one directory: `demo/scenes/cube/orbital-drag/index.ts` ⇄ `OrbitalDrag.vue` (+ the same ring through
  `useOrbitalPointer` / `useOrbitalPinch` / `useOrbitalInertia`). Verified not a parse artefact:
  `index.ts:3` **value**-re-exports the SFC and `OrbitalDrag.vue:18` imports **values** back from the
  barrel (`:16`/`:17` are `import type` and correctly exempt). **ONE cure shape** closes all four.
  The directory is in **no** KF.W4 unit's writable set → routed.
- **F-8 · SPEC (CRITICAL, G-KFW4-3) — the gate's witness column holds ONE site; the frontier holds
  TEN.** ME-29 reproduces exactly; the other nine — one `vue/valid-v-for`, one
  `vue/multi-word-component-names` and **seven `vue/no-mutating-props`** (behavioural: a child writing
  through its parent's prop object) — are routed nowhere: ⟨`grep -c 'no-mutating-props' KF-W4.md`⟩ →
  **0**, `'App.skeleton'` → **0**, `'valid-v-for'` → **0**. All ten live under `demo/**`, which is in
  no unit's writable set for this wave. **This is the R4-2 disease at a second address** — a
  denominator inherited and never re-derived — and it makes G-KFW4-3's GREEN **unreachable inside
  §Bounds**, the born-RED-with-unreachable-GREEN class the §Gates head convicts. **TRIUMVIRATE**
  (§Sequencing trigger 1: any write outside §Bounds).
- **Artefact NAME COLLISION (E-3, declared).** The spec names `census-first-run.txt` twice with two
  different contents — G-KFW4-2's falsifier (the 27's roster, written here) and §Artefacts *"the three
  clauses, RED"* (unit `.d`'s `census.mjs` first run). This seat wrote the artefact its own binding
  falsifier names. **`.d` must take a DISTINCT path** or the wave breaks its own G-KFW4-11 law *"ONE
  PATH, ONE WRITER, ONE CONTENT"*. The note also rides inside `census-first-run.txt`'s header.
- **Receipt-law exception, declared, one file.** `pinned-seven.txt` is the right-hand side of the
  `diff` that IS G-KFW4-11; a `SERVED MODEL:` line or a header block inside it makes the spec's own
  literal command unsatisfiable at every future run. It holds the seven pairs and nothing else; the
  curated block (hash, the five dead LIGHT entries with their live twins, the config's literal path)
  is written **beside** it, dated, in the G-11 addendum. Every other artefact carries its receipt line.

#### Act 5 — what was NOT done

**No suppression of any kind**: no `ignores` over a finding, no rule disabled, no `eslint-disable`, no
`--max-warnings`, no severity downgrade, no `|| true`, no `known-violations` file, no `test.skip`, no
allowlist, no `node_modules` patch, no copied producer selector. `scripts/dev/dev.sh` never touched.
F-1's four untracked `src/` files not deleted, edited, `.gitignore`d, moved or gate-wrapped. `.npmrc`
measured, not modified. No `demo/**`, `src/**`, `test/**`, `scripts/**` or `tsconfig*.json` byte. No
glass-ui byte. No other unit's row. `prettier --check` flags exactly the 2 files that fail
**identically at `origin/master`** (verified against pristine `git show` copies with the repo's own
config) — **zero new drift**, so no unrelated reformat was spent.

#### Artefacts landed (value.js `docs/tranches/X/keyframes/waves/evidence/KF-W4/`, commit `1e99ec31`)

`census-first-run.txt` (sha256 `8688d931…`) · `pinned-seven.txt` (sha256 `9733d2e6…`) ·
`depcruise-inventory.json` — depcruise's **RAW** output and nothing else (sha256 `fd4d4da3…`) ·
`G11-oracle-addendum-2026-09-17.md` · `merge-path-gates-2026-09-17.md`.

#### Handover

`.c` and `.d` open on a settled manifest and a clean tree (⟨`git status --porcelain`⟩ → only F-1's
four untracked `src/` rows and two untracked V docs). **`.d` inherits two named obligations**: the
`census-first-run.txt` path collision above, and clause C3's denominator over the surviving devDeps
(this unit deleted the one devDep §Bounds authorizes and no other). **The push is the wave close
seat's** (§0j.C KF-WRITE); this unit leaves `fb509edd` local and unpushed by design.

### KF.W4.c

**SERVED MODEL**: `claude-opus-5[1m]` · **Opened** 2026-09-17 in phase 3, ∥ `.d` (disjoint by
construction) · **Gates** `G-KFW4-4` · `G-KFW4-5` · `G-KFW4-6` ·
**Commits** keyframes.js **`ea126540`** (3) · **`736efdbb`** (4) · **`3c8a5525`** (5) ·
**`30ccd4dc`** (the §Bounds L70 provenance act) · **Substrate**
`/Users/mkbabb/Programming/keyframes.js`, branch `master`,
⟨`git rev-parse --short=8 origin/master`⟩ → **`55e9bf0d`**, local HEAD at open `fb509edd`
(`.b`'s commit 2). Every figure below is read from settled bytes and double-run.

**Status: PARTIAL. Two of the three gates are RED with their GREEN measured UNREACHABLE
inside `.c`'s §Bounds, and both are escalated with their full enumerations rather than
smoothed.** `G-KFW4-6` is **GREEN**.

#### Act 0 — anchors re-verified at TRUE bytes before a byte was written

| §Bounds row | anchor as spec'd | measured at this seat | verdict |
|---|---|---|---|
| `tsconfig.json` L57 | `noUnusedLocals` absent; `:8`/`:9` flags + `:47` include not weakened | ⟨`grep -c noUnusedLocals tsconfig.json tsconfig.lib.json tsconfig.test.json`⟩ → **0 · 0 · 0**; `:8` `noUncheckedIndexedAccess` · `:9` `exactOptionalPropertyTypes` · `:47` `"include": ["src/", "demo/"]` all exact | **reproduces** |
| `registry.ts` L64 | `:30-34` `registryNames`, `:36` docstring, `:43` fence | all three byte-exact at their stated lines | **reproduces** |
| `easing-serialize.ts` L65 | `:71-73` the `.find` reverse-map | byte-exact; ⟨`git grep -n '\bserializeEasing\b' origin/master -- src/ demo/ test/ scripts/ \| wc -l`⟩ → **49**, L65's partition **to the digit** | **reproduces** |
| `leaves.ts` L66 | `:17-19` the drift-guard sentence, `:28` the re-export | ⟨`sed -n '17,19p'`⟩ → *"The drift guard / (`test/leaves-parity.test.ts`) now asserts the re-exported subpath values / match the value.js barrel."*; `:28` exact | **reproduces** |
| `leaves-parity.test.ts` L67 | delete; consumer set ∅ | ⟨`git grep -nF 'leaves-parity' -- src/ demo/ test/ scripts/ \| wc -l`⟩ → **2**, both PROSE, 0 specifiers | **reproduces** |
| `load-engine.ts` L68 | `:65` `Stylesheet`, dead | ⟨`git grep -c '\bStylesheet\b' -- src/animation/load-engine.ts`⟩ → **1** (the import) | **reproduces** |
| `engine/css/animation.ts` L69 | 3 hits, 1 file, 0 reads | ⟨`git grep -n '_boundTimeline' -- src/ demo/ test/ scripts/`⟩ → `:5` · `:54` · `:82`, RUN1 == RUN2 | **reproduces** |
| `backward/backward.ts` L70 | `:30` · `:32` · `:47` attributions | ⟨`git grep -n 'sampleColorRamp\|deltaEOK' -- <the file>`⟩ → `:30` · `:32` · `:47`, exactly three | **reproduces** |
| the K3 demo sites L71 | AmigaScene `:21` · SquareScene/SequenceScene/SpringScene `computed` · TimelineTrack `:120` · ChannelOptions `:437` | `grep -c 'computed('` → **0 · 0 · 0 · 0**; ChannelOptions `grep -n 'Teleport'` → `:377`/`:401`/`:437`; `const props` at `TimelineTrack:120` | **reproduces** |
| `test/compile/easing-identity.test.ts` L80 | create | ABSENT | **reproduces** |

**No anchor drifted.** One §Bounds figure is re-measured and superseded, printed with both
readings at the finding (F-9 below); one is re-measured and **reproduces exactly** where the
program's recent history predicted it would not (§Gates' *"9 measured errors"* for the K3 src
arm — measured **9**).

#### Act 1 — R-9's DECISION, recorded before the field was opened

`evidence/KF-W4/k3-decision.md` (landed first, as §Artefacts requires). The two commands
re-run at this seat's clock, RUN1 == RUN2: **three hits, one file — `:5` docblock, `:54`
declaration, `:82` a WRITE. Zero reads.** R-9's own definition governs (*"an assignment is
not a named consumer"*), so **consumer set = ∅ ⇒ the ELSE-branch**: delete the field and its
prose together, one commit. **Delta against §Bounds' round-3 census: NONE.**

The artefact also books the finding that makes the else-branch more than arithmetic: the
field's declaration docblock said it was *"Stored by `bindTimeline` for the no-timeline
guard's check"*, and ⟨`git grep -c '_boundTimeline' -- src/animation/engine/interpolate.ts`⟩
returns **nothing** — the guard that docblock names as the field's sole consumer does not
read it. A phantom authority of exactly the class this wave extinguishes, inside the wave's
own cure site.

#### Act 2 — K1 (commit `ea126540`), and the half of R-2 that was genuinely missing

**R-2's memoise arm was HALF-LANDED at the frontier, and the missing half is the one R-2
names.** `registry.ts` did build its name→function map once at module evaluation — but
`resolveTimingFunction` tried `parseTimingFunction` **FIRST**, so the four registry names
that are *also* CSS keywords took the parse path and got a fresh `easing()` instance on every
call, **outside the memo**. Probed live at the tree of execution:

```
BYPASS the memo (4): ease, ease-in, ease-out, ease-in-out
UNSTABLE through resolveTimingFunction (4): ease, ease-in, ease-out, ease-in-out
```

R-2's words are *"every name hands out one stable reference **forever**"* — false for four of
forty, and the consequence is a live shipping defect, not a tidiness point:
**`serializeEasing({ fn: resolveTimingFunction("ease") })` THREW** *"a custom TimingFunction
has no CSS animation-timing-function representation"* **on the library's own registry
keyword**, because the fresh reference is absent from `timingFunctionEntries`. It is the
first assertion of the created fixture that caught it.

**The cure is the ordering and nothing else** — consult the memo, then the parser. Proved
curve-preserving rather than asserted: the 40 names × the 33 grid points were sampled before
and after through `vite-node`, and ⟨diff⟩ → **0 curve deltas · 4 newly stable · 40/40 in the
memo · 0 unstable**. `registryNames` (`:30-34`) and the `:43` module-evaluation `throw` fence
are **byte-identical to `origin/master`** — no key added, none removed.

`registry.ts:36`'s *"Stable identities let the serializer distinguish named curves from
closures"* is replaced by the measured truth: **stable (now), NOT injective** — 40 names onto
**31** references, nine hyphen/camel twin pairs — plus R-2's named terminus (KF.W3's repin
commit deletes the memo when value.js 4.1's memoised `easing()` lands).

**`test/compile/easing-identity.test.ts`** is G-KFW4-5's fixture, created in the tree's own
easing zone. Identity is proved by **sampled value-identity on the 33-point grid**
(§0j.C **KF-SS3** — *"the mechanism, not a relabel"*), never by name equality, which is
unattainable while nine references carry two names each and the `bezierPresets` fence forbids
both a key removal and a key addition. **The oracle carries no tolerance band**: the
round-tripped sample is compared for EXACT equality against the densify's own `round5`
quantization (a band would let a real curve defect hide under it). **45 assertions, each with
its BITE**, including a negative control that measures value.js's own instability at **21 of
40** and a clause proving the nine collisions are value-identical twins.

#### Act 3 — K2 (commit `736efdbb`), the gate's oracle satisfied by construction

⟨`git show --stat 736efdbb`⟩ → **`src/animation/internal/leaves.ts` + `test/internal/
leaves-parity.test.ts` in ONE commit** — which *is* G-KFW4-6's oracle (*"one commit contains
both … `git show --stat` proves it"*). Both false halves of the `:17-19` sentence die with
the spec: the *"parity with the value.js barrel"* claim (value.js 4.0.0 publishes **seven**
subpaths and **no `.` root export** — ⟨`node -e` over the installed `package.json` exports⟩ →
`./color ./value ./css ./easing ./math ./transform ./quantize`), and the citation at
`test/leaves-parity.test.ts`, **a path that exists at no ref**.

#### Act 4 — K3 + R-9 (commit `3c8a5525`), src arm before demo arm

Full partition in `evidence/KF-W4/k3-residues-2026-09-17.md`. Headline, double-run:
**30 `noUnusedLocals` diagnostics → 18. 12 cured, every one in-bounds. All 18 survivors live
in files NO KF.W4 unit may write** (3 `src/` + 15 `demo/`), and `check` leg 2 adds **17**
more (10 of them in `test/`). The flag was set in the shared base because that is the only
tsconfig in `.c`'s writable set — `tsconfig.lib.json` and `tsconfig.test.json` both `extends`
it, and neither is ours to narrow.

R-9 landed on its measured else-branch: `_boundTimeline`'s `:5` prose, `:48-53` docblock,
`:54` declaration and `:82` write die together. `bindTimeline` keeps its signature and every
consumer (⟨`git grep -c 'bindTimeline' -- test/engine/nan-frame.test.ts`⟩ → **11** matching
lines in that one spec); its docblock now states plainly that the parameter is not read and
why, rather than leaving a silently-unused public parameter behind a deleted field.

**Witnesses measured NOT red, recorded per L71's own instruction rather than cured on a
guess**: ChannelOptions `:437` `Teleport` (the template's single `:377`/`:401` element uses
it — the measurement L71 explicitly deferred to execution), `TimelineTrack.vue:120`
`const props`, `TimelineCaret.vue:35` (**KF.W7's site, R-3 — no byte written here**), and two
of KF-SS-34's four (`SCENE_ID`, `isStarted`; only `computed` and `isPlaying` red, and both
are cured).

#### Act 5 — the §Bounds L70 provenance act (commit `30ccd4dc`)

Measured at the installed pin: **neither `sampleColorRamp` nor `deltaEOK` appears anywhere in
`@mkbabb/value.js` 4.0.0's `dist/`** ⟨`grep -rl <name> node_modules/@mkbabb/value.js/dist/`⟩
→ nothing, for either. Both were attributed to value.js **by name**, inside G-KFW4-7's own
denominator. The real machinery is named instead — `./color`'s own `sampleRamp` driving
value.js's `mixColors`/`convertColor` (**both verified present** in
`dist/subpaths/color.d.ts`, as is `oklab`), and kf's own ΔE-ε check in `./color`. The `:47`
BOUNDARY clause claimed the module *"statically imports `@mkbabb/value.js`"*; its imports are
all relative kf modules, so it is restated as what it does reach.

#### Act 6 — gate readings, BEFORE → AFTER (all double-run)

| gate | BEFORE (this seat's own baseline) | AFTER |
|---|---|---|
| **G-KFW4-4** | `noUnusedLocals` = **0** in all three tsconfigs; src arm 9 unused + F-1's `TS2307`; demo arm 30 unused | **RED — FLAG LANDED, EVERY IN-BOUNDS SITE CURED, GREEN UNREACHABLE IN-BOUNDS.** src arm **4** (3 unused + F-1) · demo arm **31** (18 unused + 13 pre-existing) · leg 2 **17**. The gate's own falsifier clause (*"any **in-bounds** site survives"*) closes — **zero** in-bounds sites survive — while both arms' commands exit non-zero on 18 sites in no unit's writable set. Booked RED, not resolved in this seat's favour |
| **G-KFW4-5** | fixture ABSENT; 21/40 unstable · 31 refs · 9 collisions (reproduced exactly); 4 names bypassing the memo (**new**) | **RED — MEMOISE ARM LANDED AND PROVED, RETIREMENT ARM ESCALATED.** Fixture **45/45 passed**, double-run; 0 curve deltas across 40×33; the four memo-bypasses cured. The falsifier clause *"fails if the reverse-map survives"* is **not executable inside §Bounds** — see F-10 |
| **G-KFW4-6** | `leaves-parity.test.ts` PRESENT; no commit holds both acts | **GREEN.** ⟨`git show --stat 736efdbb`⟩ → both files, one commit. *"Two commits fail this gate"*; there is one |

Collateral at close: ⟨`npx vitest run --project library`⟩ → **98 files / 1080 tests passed**
(+1 expected fail, 14 skipped) · ⟨`--project demo`⟩ → **29 files / 160 passed** (the 27 plus
`.d`'s two concurrent creates) · ⟨`npx vite build --mode gh-pages`⟩ → **exit 0** ·
⟨`git diff --check`⟩ → clean.

#### Act 7 — findings, routed not smoothed

- **F-9 · SPEC (MAJOR, G-KFW4-4) — the K3 denominator is right and unpartitioned.** §Gates'
  *"9 measured errors at HEAD, chief among them `load-engine.ts:65`"* **reproduces to the
  digit at the frontier** (9 src `noUnusedLocals` diagnostics), and **6 of the 9 are in
  `.c`'s files, 3 are in no unit's**; the demo arm had no denominator at all, because none
  could exist before the flag and an SFC-parsing checker both existed — it measures **21**.
  **This is F-8's shape at a third address** (`.b` found it at G-KFW4-3, R4-2 at
  G-KFW4-11): a count carried forward without a partition by writable set. Full enumeration,
  both arms plus leg 2, in `k3-residues-2026-09-17.md`. **TRIUMVIRATE** (§Sequencing trigger
  1). Two of the fifteen demo survivors are worth naming for routing: `EasingScene.vue:8`/
  `:45` are mechanically identical to the `SpringScene.vue` pair cured here, and
  `animationDescriptions.ts:108`/`:116` sit in a file **`.e` holds outright**.
- **F-10 · BOUNDS (MAJOR, G-KFW4-5) — R-2's reverse-map RETIREMENT is not executable inside
  `.c`'s §Bounds, and the blocker is measured, not argued.** *"The name travels with the
  serialized easing record"* requires the record to have somewhere to carry a name. `Easing`
  is `{ fn, css? }` at `src/animation/constants/types.ts:57-62` — **`.e`'s file, and `.e`'s
  carve is `:25`/`:27`/`:195`, so `:57-62` is in NO unit's carve in this wave** — and its
  construction seams are `compile/easing/option.ts`, `easing.ts`, `constants/defaults.ts` and
  `resolve/spring-css.ts`, **none of which any KF.W4 unit may write**. The decisive one is
  `defaults.ts:85`: the library's DEFAULT easing is `{ fn: easeInOutCubic }` with **no `.css`
  and no name**, and its reference was probed live into the memo as `"ease-in-out-cubic"` —
  so retiring the `.find` while that record cannot carry a name makes **every default-easing
  serialization throw**, the exact outcome §Bounds L65 forbids. **No substitute was
  invented** — not a `Map`-keyed reverse index, not a name stamped on the function object,
  not a parameter threaded through the seventeen call sites; each is the same act at a
  different address, and R-2 rules out the injective-wrapper dodge by name. Dated
  addendum-beside with every coordinate and the three honest dispositions:
  `k1-reverse-map-escalation-2026-09-17.md`. **TRIUMVIRATE.**
- **F-11 · TREE (MAJOR, routed) — `backward.ts` carries TWO further phantom value.js
  attributions outside this row's carve, and a third lives in `src/animation/index.ts`.**
  `reverseAnimationShorthand` is attributed to value.js at `:20` (*"value.js's OWN … the
  published inverse of its shorthand parser"*) and `:46`, and is **kf's own**, declared at
  `src/animation/compile/emit/css-text.ts:17` — ⟨`grep -rl reverseAnimationShorthand
  node_modules/@mkbabb/value.js/dist/`⟩ → nothing. `:295` attributes `serializeScrollOptions`
  to value.js; also kf's own. `src/animation/index.ts:233` repeats the `sampleColorRamp`
  attribution. **The carve granted is `:30`·`:32`·`:47` and that is what was written**; these
  four sites are the same class one round of widening later, and all four sit inside
  G-KFW4-7's C1 denominator, so **`.d`'s census will red on them and no unit of this wave may
  cure them**. Same shape as round 3's widening of this very row, at the symbols that sweep
  did not grep.
- **F-12 · LINE-ENUMERATION (INFO, declared not silent).** Four cured K3 sites sit in files
  §Bounds opens for `.c` at coordinates the rows' line lists do not name
  (`load-engine.ts:62`/`:63`, `animation.ts:32`, `backward.ts:72`). They were taken under
  L71's own stated method — *"the flag itself is the instrument"*, *"the falsifier closes on
  the sites that do red — never on a count this file guessed"* — because the enumeration
  cannot exist before the flag lands. **No file outside `.c`'s writable set was written; that
  bound was held absolutely.** Named here so the extension is falsifiable rather than folded
  into the rows' counts.
- **F-13 · RESIDUAL (INFO, K2).** `test/engine/computed-resolution.test.ts:26` carries the
  second prose citation of `leaves-parity` (*"the leaves-parity precedent"*). The file is in
  **no** KF.W4 unit's writable set. The citation is now stale in one word; recorded rather
  than reached for.

#### Act 8 — what was NOT done

**No suppression of any kind**: no `@ts-expect-error`, no `@ts-ignore`, no `any`, no
`test.skip`, no allowlist, no `exclude`, no per-file override, no `skipLibCheck` widening, no
`--max-warnings`, no `|| true`, no `known-violations` file, no `node_modules` patch, no
copied producer selector. The `noUnusedLocals` flag was not weakened and was not hidden in a
narrower config to dodge its fallout. `registry.ts:43`'s module-evaluation `throw` fence was
not disturbed and the roster gained and lost no key. **No byte of `easing-serialize.ts`** (the
escalated act). **No byte of `TimelineCaret.vue`** (KF.W7's, R-3). No byte of any file outside
`.c`'s writable set — including the four untracked F-1 `src/` files, which were not deleted,
edited, `.gitignore`d, moved or gate-wrapped. No glass-ui byte. No `.d`-owned path
(`scripts/gates/census.mjs` and the two `test/demo/**` specs were modified concurrently by
that seat and are absent from every pathspec here). `scripts/dev/dev.sh` never touched.
**Zero new prettier drift**, measured origin-vs-current per file on all ten touched files
(the one file my edit *did* make drift — `load-engine.ts`, 0 → 7 — was reflowed to
prettier's own output, back to 0; `registry.ts` and four `.vue` files fail `--check`
identically at `origin/master` and were left alone rather than reformatted).

#### Artefacts landed (value.js `docs/tranches/X/keyframes/waves/evidence/KF-W4/`)

`k3-decision.md` (R-9's measured basis, written before the field opened) ·
`easing-identity.json` (the 40→31 map before, the round-trip after; valid JSON, receipt line
as its first key) · `k1-reverse-map-escalation-2026-09-17.md` ·
`k3-residues-2026-09-17.md`.

#### Handover to `.e`

`.c` has **committed**, which is `.e`'s opening condition (both reach the easing family).
`.e` inherits four named facts. **(1)** `resolveTimingFunction` now consults the memo before
the parser — every registry name hands out one stable reference, and `serializeEasing` no
longer throws on `ease`/`ease-in`/`ease-out`/`ease-in-out`. **(2)** `smooth-step-3`'s class is
**preserved** (§0j.C KF-SS3) and `registryNames` is byte-identical to `origin/master`, so
G-14 opens on exactly the roster its cure-lock assumes. **(3)** `noUnusedLocals` is ON:
`animationDescriptions.ts:108`/`:116` and `EasingScene.vue:8`/`:45` are live diagnostics in
files `.e` holds or opens — the first two are `.e`'s outright. **(4)** `types.ts:57-62` (the
`Easing` record) is **not** in `.e`'s carve, and F-10 is why that matters.

**The push is the wave close seat's** (§0j.C KF-WRITE); this unit leaves `30ccd4dc` local and
unpushed by design.

### KF.W4.d

**SERVED MODEL**: `claude-opus-5[1m]` · **Opened** 2026-09-17 in parallel with `.c` (disjoint:
`scripts/` + specs + manifests vs `src/` + K3 sites) · **Gates** `G-KFW4-7` · `G-KFW4-8` ·
`G-KFW4-9` · `G-KFW4-10` · **Commits** keyframes.js **`c5c0b889`** (ONE commit, §Commits commit
6) · value.js **`578d2813`** (artefacts + the bundle patch) · **Substrate**
`/Users/mkbabb/Programming/keyframes.js`, branch `master`. Every figure below is read from the
settled bytes and double-run (RUN1/RUN2 identical).

**Receipt-law exception, declared, four files.** The SERVED MODEL line is line 1 of every record
and artefact this unit wrote. For the four SOURCE files it created (`census.mjs`,
`register-census.mjs`, the two `.test.ts` fixtures) the receipt rides the file's own header
docblock instead: line 1 of an `.mjs` gate is its shebang (the house idiom at all nine frontier
gates), and a bare `SERVED MODEL:` line 1 makes a `.test.ts` a syntax error. Provenance is
carried, the file still runs.

#### Act 0 — anchors re-verified at TRUE bytes before a byte was written

| §Bounds row | anchor as spec'd | measured at this seat | verdict |
|---|---|---|---|
| Citation targets L89 | 8 files · **33** `proof:` lines · **19** distinct names | ⟨`git grep -n 'proof:' -- <the eight>` ⟩ → **33**; ⟨`… \| grep -oE 'proof:[A-Za-z0-9_-]+' \| sort -u`⟩ → **19** | **reproduces byte-exact** |
| — same row, `EditorStartScreen.vue` | `:15` `:56` `:134` `:159` `:180` | `:15` `:56` **`:138` `:163` `:184`** | **DRIFTED +4 on the last three — INTENT taken at the TRUE bytes, recorded.** Cause named: ⟨`git show 81a56990:…EditorStartScreen.vue \| grep -n 'proof:'`⟩ → the spec's five exactly, so the drift is **`.a`'s `5388907b`** type-surface cure, not a spec error |
| `font-roles.json` L85 | `:17` `:23` filing-tab rows · `:36` wave-char pin · `:68` kbd · `:82` `_monoContract` | all five at their stated lines | reproduces |
| `resize-tracks.test.ts` L75 | `fs.readFileSync` + two `toMatch` source-text pins | `:133-139` (the pins at `:138`/`:139`) | reproduces |
| orbital specs L76 | `INERTIA_FACTOR = 0.92` at `:29` + **EIGHT** uses; shipped `0.95` at `OrbitalDrag.vue:56` | ⟨`grep -n 'INERTIA_FACTOR' test/demo/scenes/orbital-inertia-parity.test.ts`⟩ → **9 lines** (`:29` + `:52 :58 :76 :99 :106 :123 :132 :138`); ⟨`grep -n 'inertiaFactor' demo/scenes/cube/orbital-drag/OrbitalDrag.vue`⟩ → `:56 const inertiaFactor = props.inertiaFactor ?? 0.95` | reproduces, **all nine** |
| `usability.mjs` L77 | `:9` header · `:239` glyphCount · `:20-31` contract · `:160-172` heroReady · `:278-285` equality | every anchor at its stated line | reproduces — **READ ONLY; not written** |
| `live-session.mjs` L78 | read, no write | read for the census denominator only | honoured; `live-session-mobile.mjs` **neither read nor written** |
| `scripts/gates/` L79 | frontier carries **NINE** | ⟨`find scripts/gates -name '*.mjs' \| wc -l`⟩ → **9** before, **11** after this unit's two creates | reproduces |

#### Act 1 — the two gate creates (R-3's FOLD, one script three clauses)

**`scripts/gates/census.mjs` — ONE script, THREE separately-closing clauses.** Each clause owns
its verdict, its denominator and its exit contribution; `--clause <name>` runs one and only one,
and the script exits non-zero while ANY requested clause is red, so **three gates read three
verdicts off one run**.

- **C1 provenance** (G-KFW4-7): every identifier ATTRIBUTED to `@mkbabb/value.js` in a comment
  under `src/ demo/ test/` must be a real export of the subpath it is attributed to. Two arms,
  one assertion — **PHANTOM** (exported by nobody) and **MISATTRIBUTED** (actually exported by
  THIS repo's `src/`). The denominator is read from the INSTALLED package at use — runtime keys
  ∪ the `.d.ts` declared names, **141 names over 7 subpaths at value.js 4.0.0** — never a
  checked-in list. **The STATED BOUND is written into the gate's header, not discovered after
  the fact**: the subject is an identifier in one of FOUR written relational forms (possessive ·
  export-verb · source · import-parenthetical). Prose that attributes a MECHANISM while naming
  no identifier is **outside the denominator and is not silently claimed** — see B7 below.
- **C2 citations** (G-KFW4-8): every `proof:*` at the eight enumerated targets resolves to an
  executable npm script or gate. Sites re-read and **re-hashed at use** (hashes printed);
  `--sites <artefact>` reads the roster from the evidence file and prints its sha256.
- **C3 manifest** (G-KFW4-12's standing clause): every declared devDependency has an import
  specifier, a config reference or an npm script naming it.

**`scripts/gates/register-census.mjs` — the RENDERED register census, and R-3's fold made real.**
`demo/styles/font-roles.json` is the gate's INPUT and the ONE home of the private AnimatedText
class strings; this module exports the contract (`loadRegister`, `selectorContract`, `SELECTORS`)
and `usability.mjs` reads its selectors from here — **one shared module, no second parallel
runner.** Four clauses: **S** manifest integrity (static, always runs) · **1** non-vacuity (any
row matching ZERO elements FAILS) · **2** register semantics incl. `text-transform`, and **a
census that cannot read the property FAILS rather than passing blind** · **3** no laundering by
descent (a mono leaf must match an allowlist entry ITSELF; descent-only satisfaction is REFUSED
and its laundering ancestor named). Harness = the house `withPage` lifecycle: browser half
**skips honestly** when playwright is unresolvable and **THROWS** under `KF_REQUIRE_BROWSER=1` —
never a vacuous pass.

⟨`node scripts/gates/register-census.mjs --static`⟩ → *"(S) the KF-AT-24 fold holds — the hero
row homes BOTH class strings (.wave-char chars inside .wave-word words)"* · *"(S) every role
binds a selector to an expected register tuple"* · **PASS**.
⟨`KF_REQUIRE_BROWSER=1 node scripts/gates/register-census.mjs`⟩ → throws
`HarnessRequiredError` — the vacuity guard bites.

#### Act 2 — the citation extinction (33 lines / 19 names), with its carve DECLARED

| figure | BEFORE | AFTER |
|---|--:|--:|
| citation LINES at the eight | **33** | **4** |
| `proof:` TOKENS | **38** | **5** |
| distinct NAMES | **19** | **3** |
| C2's dead-citation count | **34** | **0** |

The R-7 partition discharged **name by name, 17 cure / 1 routed / 1 live**, in
`evidence/KF-W4/citation-inventory.md §3`. Two names were **REPOINTED before deletion** because
a real gate exists: `DESIGN.md:29`'s `proof:font-census` → `node scripts/gates/register-census.mjs`
(R-7's named repoint), and `DESIGN.md:251`'s bare *"owner-golden"* → the live
**`proof:owner-golden`**. That second repoint is why the AFTER name count is **3** and not 2, and
it is stated rather than absorbed.

**THE DECLARED CARVE, in the run's artefact and in the gate's own output (R2-13):**
⟨`node scripts/gates/census.mjs --clause citations`⟩ prints, every run — *"DECLARED CARVE:
`proof:brittleness` at demo/styles/layout.css is OUT of this clause's denominator BY NAME;
routed whole to KF.W6 (X.KF.W4 §Excluded 17). Subject present: 1 citation(s)."* The clause
**FAILS if that subject is cured here**. **This wave wrote no brittleness byte** and pulled in
**no** residue family — §Excluded 16–21's six families keep their named destinations.

**The DECLARED SEPARATE BOUNDED ACT** — `DESIGN.md`'s §10 rules table `:234-240` — was reviewed
row by row and is tabulated in `citation-inventory.md §4`: **the rule text of all seven rows is
byte-unchanged**; only the Proof column moved, and only where it claimed a gate that does not
exist. R1 (real depcruise rules) and R2 (`proof:publish`) are untouched. Every other citation
site is ≤1 clause (R-7).

#### Act 3 — the cure rules (c)/(d)/(e)

1. **`resize-tracks.test.ts`** — the two `toMatch` source-text pins RETIRED and replaced by a
   **real mount** of `AnimationVisualizer.vue`: the observer registration and the epoch bump are
   read off behaviour. ⟨`npx vitest run --project demo test/demo/instrument/resize-tracks.test.ts`⟩
   → **3 passed**. The KF-AV-18 prose (four value.js attributions for symbols this repo owns) is
   cured in the same file, and C1's two rows there are gone.
2. **`orbital-rotate3d.test.ts`** — the `renderTransform` helper that **REPLICATED** the
   component's render math is DELETED with clause (c)'s `readFileSync` + four source pins; every
   clause now reads the transform the REAL `containerStyle` rendered from a mounted OrbitalDrag.
   ⟨`npx vitest run --project demo …orbital-rotate3d.test.ts`⟩ → **4 passed** (5 → 4 `it` blocks:
   clause (c) is retired, not re-spelled).
3. **`orbital-inertia-parity.test.ts`** — `INERTIA_FACTOR` recalibrated **0.92 → 0.95** at **all
   NINE coordinates** (the declaration is the single home the eight uses read, so one edit
   reaches all nine; ⟨`grep -n 'INERTIA_FACTOR' …`⟩ → **9**, ⟨`grep -c '0\.92'`⟩ → **2**, both
   non-pins: this unit's own note quoting the retired value and the k-mapping sweep
   `[0.8, 0.9, 0.92, 0.95]`). The **deep-source import** `../../../src/animation/physics/decay`
   is repointed at `@mkbabb/keyframes.js` — the surface the SUBJECT (`useOrbitalInertia.ts:14`)
   consumes, which is rule (d). ⟨`npx vitest run …orbital-inertia-parity.test.ts`⟩ → **6 passed**.
4. **`font-roles.json`** — the two empty-set `filing-tab` rows DELETED (R-3), manifest **10 → 8**
   roles. Emptiness verified statically: ⟨`git grep -n 'tab-trigger' -- demo/`⟩ returns the CSS
   skin, two prose mentions and the manifest rows — **no template applies the class**. The skin
   itself is KF.W6's.

#### Act 4 — the two created fixtures (`.test.ts`, never `.spec.ts`)

- **`test/demo/instrument/typing-dots-engine-seam.test.ts`** (R-5's ONE seam spec; the surface
  `grep -rn TypingDots test/` → 0 covered). Four clauses on a REAL mount: substrate · **engine
  paint** (the wait condition is EVERY dot painted — the stagger's own evidence; a seam that
  never paints times out and REDs instead of passing on a lucky sleep) · no cascade collision ·
  teardown. **4 passed.**
- **`test/demo/instrument/aurora-opacity-ceiling.test.ts`** (KF-HA-4). The bound is read from an
  **`export const`** authored in HeroAurora's own module-scope `<script>` block — §Bounds row L84's
  named alternative, and the reason is written at the site: a `<script setup>` compile-local is
  unreachable to every instrument, so a gate over one could only be a source-text pin. Clause (1)
  asserts the literal is STRICTLY below the OWNER's P-HERO 0.15; clause (2) mounts the component
  and asserts it hands **that exact value** to Aurora's `opacity-ceiling`. **2 passed.**

#### Act 5 — the KF.W4 ∥ KF.W6 ATOMIC BUNDLE half (runbook §3.4)

`scripts/observe/demo/usability.mjs` is **UNMODIFIED in the working tree** — ⟨`git status
--porcelain -- scripts/observe/demo/usability.mjs`⟩ → **empty**, so no pathspec could capture it
— and **no byte of it is committed by this wave**. The half is authored as
`docs/tranches/X/execution/B/KF-W4-usability-bundle.patch` (265 L incl. its stated header),
curing exactly two rows: **rule (e)** — (2c)'s oracle moves OFF the subject's own counter at
`:239` and onto `DECLARED_HERO_TITLE`, read statically from `EditorStartScreen.vue`'s `title:`
default, with the mirror count still REPORTED and (2b) gaining a new bite — and **KF-AT-24** —
every live selector (`heroReady`'s poll, both tiers, (2d)'s ink probe) re-pointed at the shared
`SELECTORS` contract. ⟨`git apply --check <the patch>` from keyframes.js⟩ → **CLEAN**;
⟨`node --check` on the patched scratchpad copy⟩ → **OK**. **W6's first commit lands both halves.**

#### Act 6 — gate readings, BEFORE → AFTER

| gate | BEFORE (baseline) | AFTER (this unit) |
|---|---|---|
| **G-KFW4-7** | RED — `census.mjs` ABSENT, command unrunnable | **RED — WIRED, NOT GREEN · ROUTED.** The gate exists and bites: 13 false attributions at first run, **8** at the settled bytes. **Every one of the 8 is OUTSIDE this wave's writable set** — 4 cured in-bounds (2 by this unit at `resize-tracks.test.ts`, 3 by `.c`'s `30ccd4dc` at `backward.ts`, incl. both named born-RED witnesses `deltaEOK` + `sampleColorRamp`) |
| **G-KFW4-8** | RED — `census.mjs` ABSENT; 33 lines / 19 names | **GREEN** — ⟨`node scripts/gates/census.mjs --clause citations`⟩ → PASS, 0 dead citations at 8 enumerated sites, carve DECLARED in the output and in the artefact, no residue family pulled in (double-run) |
| **G-KFW4-9** | RED — the audit did not exist | **GREEN-WITH-BOOKED-RESIDUE.** Ten rows CURED, eight BOOKED WITH THEIR BOUND STATED, in `evidence/KF-W4/gate-audit.md`. The `test/` sweep's mechanical detector: ⟨`grep -rln 'readFileSync' test/ --include='*.ts'`⟩ → **6** files, of which 2 are this unit's cures (token now in PROSE only, no call site), 3 are allowed by subject (fixtures / the import-graph gate), and **1 survives out of bounds** (`physics/oscillator.test.ts`, booked) |
| **G-KFW4-10** | RED — `register-census.mjs` ABSENT | **GREEN ON ITS STATIC CLAUSE · BROWSER HALF UNMEASURED, HONESTLY.** ⟨`node scripts/gates/register-census.mjs`⟩ → clause S PASS ×2; clauses 1–3 print *"browser half SKIPPED — playwright not resolvable … Clauses 1–3 are UNMEASURED at this run (they did not pass)"*. **Playwright is not installed in this substrate** (⟨`ls node_modules/playwright-core node_modules/playwright`⟩ → both absent), which is the harness's own declared condition, not a gate defect; `KF_REQUIRE_BROWSER=1` converts it to a hard failure and does |

**Collateral at the settled bytes**: ⟨`npx vitest run --project demo`⟩ → **29 files / 160 tests
passed** (27/155 at `.b`'s handover: +2 files, +6 new tests, −1 retired source-text clause) ·
⟨`npx vitest run --project library`⟩ → **98 passed / 5 skipped, 1080 tests** ·
⟨`npx eslint demo --ext .ts,.vue`⟩ → **10 problems / 5 files — byte-identical to `.b`'s F-8 set,
ZERO of them in any file this unit touched** ⟨`… -f compact | grep -c '<my sixteen>'` → **0**⟩ ·
⟨`npx depcruise --config .dependency-cruiser.cjs src demo`⟩ → **4 violations**, `.b`'s F-7 ring,
unchanged · ⟨`git diff --check`⟩ → CLEAN · `prettier --check` over the touched surface: the four
CREATED files are clean; the eight pre-existing files that warn **warn identically at `HEAD`**
(verified against pristine `git show` copies with the repo's own config) — **zero new drift, no
unrelated reformat spent**.

#### Act 7 — findings, routed not smoothed

- **F-9 · TREE (MAJOR, routed) — the value.js 4.0.0 provenance surface is stale in EIGHT places
  no KF.W4 unit may write.** C1's residue, each verified against the installed package (none of
  the names appears anywhere in `node_modules/@mkbabb/value.js/dist/`):
  `backward.ts:296` `serializeScrollOptions` · `format/options.ts:10`/`:81`
  `reverseAnimationShorthand` ×2 · `format/options.ts:148` `serializeStylesheetItem` ·
  `constants/types.ts:9` `timingFunctions` · `computed-resolution.test.ts:23` `convertToPixels`
  · `:50` `dvh` · `fixtures/compile/scroll-driven.css:6` `extractTimelineOptions`. Three are
  MISATTRIBUTED (this repo's own exports credited to value.js) and five PHANTOM. `backward.ts`'s
  survivor sits **outside `.c`'s `:30`/`:32`/`:47` carve**; `types.ts:9` sits outside `.e`'s
  `:25`/`:27`/`:195` carve; the rest are in no unit's set. **ROUTED — §Sequencing trigger 1 (any
  write outside §Bounds).**
- **F-10 · TREE (INFO, routed) — `OrbitalDrag.vue`'s render dep is `rotate.x` alone.**
  `containerStyle` registers `void model.value.rotate.x`, so a y-or-z-ONLY external write to the
  Euler v-model re-seeds the quaternion (the `flush: 'pre'` watch fires) but **never invalidates
  the computed**, and the container keeps rendering the stale orientation. Found by the mounted
  rewrite: a `{x:0, y:95, z:0}` drive measured a **94.99999°** divergence. The forward path
  writes all three components, so production does not hit it; an external y-only write does. The
  file is in no unit's writable set — the spec: *"`OrbitalDrag.vue` is NOT opened by this wave."*
  **ROUTED**, and stated at the fixture so the next seat does not rediscover it as flake.
- **F-11 · SUBSTRATE (MAJOR, routed) — glass-ui's dist self-imports `@mkbabb/keyframes.js`,
  which is unresolvable from inside `node_modules/@mkbabb/glass-ui`.** ⟨first mount attempt⟩ →
  `Error: Cannot find package '@mkbabb/keyframes.js' imported from
  node_modules/@mkbabb/glass-ui/dist/useSpring-BCHxLjwv.js`. Node self-reference resolves inside
  THIS package, not inside a sibling's directory, and the demo vitest project externalizes deps
  so the vite alias never reaches them. **Consequence, stated: no demo spec can mount a component
  that transitively imports glass-ui's runtime** unless that seam is stubbed. Two specs stub the
  vendor **at its own module seam** and nothing about their subject; the general cure is a
  `vitest.config.ts` resolution change — **`.b`'s file, this wave's commit 2, already landed** —
  or a producer row, and **producer rows ride SS-6/BH, never a demo-side hack**. ROUTED.
- **F-12 · SPEC (INFO) — `EditorStartScreen.vue`'s three citation anchors drifted +4** between
  the spec's `81a56990` measurement and this seat's bytes, caused by `.a`'s in-wave
  `5388907b`. INTENT taken at the true bytes (`:138` `:163` `:184`), the cause named by command.
  No spec byte edited (E-3); recorded here and at `citation-inventory.md §3`.
- **Two DECLARED ROUTED RESIDUALS of this unit's own acts**, named rather than smoothed:
  (i) `DESIGN.md:245-247`'s tail prose — *"All other enforcement is clause-shaped on surviving
  gates"* — is FALSE now that R3–R7 name no gate; it carries **no `proof:` token**, so it is
  outside C2's denominator, and §Bounds books the surrounding rationale as **KF.W6's**.
  (ii) `font-roles.json:2`'s `_doc` still names `proof:font-census`; `font-roles.json` is **not**
  one of the eight targets and `:2` is not one of the row's four named anchors. Both **→ KF.W6**.

#### Act 8 — what was NOT done

**No suppression of any kind**: no allowlist added anywhere, no `known-violations` file, no
`test.skip`, no `|| true`, no severity downgrade, no `eslint-disable`, no try/catch around a
defect, no `node_modules` patch, no copied producer selector. **No byte of
`scripts/observe/demo/usability.mjs`** (the atomic bundle), none of `live-session.mjs` (read
only), none of `live-session-mobile.mjs` (neither read nor written). No glass-ui byte. No
`vitest.config.ts`, `package.json`, `ci.yml`, `tsconfig*.json` or `.dependency-cruiser.cjs` byte
(`.a`/`.b`'s rows). No `src/**` byte (`.c`/`.e`'s rows). F-1's four untracked `src/` files not
deleted, edited, `.gitignore`d, moved or gate-wrapped. `scripts/dev/dev.sh` never touched. No
spec, registry or prior conformance artefact edited (E-3); every correction is an addendum
beside. **No gate was weakened to pass** — C1 exits 1 on residue it may not lawfully cure, and
the register census refuses to pass vacuously.

#### Artefacts landed (value.js `docs/tranches/X/keyframes/waves/evidence/KF-W4/`, commit `578d2813`)

`citation-inventory.md` (the enumerated-site artefact G-KFW4-8's command reads via `--sites`;
verified in that form: ⟨`node scripts/gates/census.mjs --clause citations --sites <it>`⟩ →
*"site roster: …citation-inventory.md (sha256 b50c70302e70)"*, PASS) · `gate-audit.md` (six rules
× every gate; 10 cured / 8 booked) · `census-three-clauses-first-run.txt` — **a path DISTINCT
from `.b`'s `census-first-run.txt`, per that unit's declared name collision**: one path, one
writer, one content. Plus `docs/tranches/X/execution/B/KF-W4-usability-bundle.patch`.

#### Handover

`.e` opens on a tree where the demo lane is **29/160 green** and the three new gates run. **`.e`
inherits one named obligation from F-9**: `constants/types.ts:9`'s `timingFunctions` attribution
is a live C1 red sitting in `.e`'s file but **outside** its `:25`/`:27`/`:195` carve — it is
routed, not silently handed over. **The push is the wave close seat's** (§0j.C KF-WRITE); this
unit leaves `c5c0b889` local and unpushed by design.

##### Dated addendum-beside — E13, appended by `.d` at 17:16, after its commits landed

**THREE glass-ui BK outbound letters arrived DURING this wave and are UNROWED.** The seat-0
sweep recorded BK at *"4 files; newest `glass-outbound-2026-08-29-valuejs-o20-ack.md` @Aug 29"*.
Re-swept at this seat's clock: ⟨`ls -lt ../glass-ui/docs/tranches/BK/coordination/`⟩ →
**7 files**, three of them minted after this wave opened —
`glass-outbound-2026-09-17-valuejs-o20-disposition.md` **@17:13** ·
`glass-outbound-2026-09-17-bbnf-lang-9.0.0-addendum.md` **@17:14** ·
`glass-outbound-2026-09-17-constellation-o20-relay.md` **@17:15**.

**One of them is addressed to THIS repo**: the constellation relay's **§2 · keyframes.js**
(`:64`) carries six producer rows against glass 9.0.0 — A-13 (`--rainbow-*` override partial,
`demo/styles/design-idioms.css:12-21`) · **B-3 `text-admin-label`, 16 sites / 10 files, gone
since 8.0.0 → `text-mono-micro`** · A-9 (THP ceiling) · A-7 (`useSelectionGroup` roving door) ·
A-2 (`glass-chip.css`). Its own framing is *"facts found on your bytes, not asks … no edits were
made in any of these trees; every action is yours, in your tranche, at your adopt."*

**Disposition, and its bound.** **NONE of it touches this unit's cures** — A-13's anchor is
`design-idioms.css:12-21` and this unit wrote `:3` and `:43` only; no other row names a file in
`.d`'s writable set. **`docs/tranches/V/coordination/INBOX.md` is NOT in this unit's writable
set**, so rowing these letters would be a write outside §Bounds — an ESCALATION, not a
convenience. They are therefore **HANDED UP, named by path and mtime, to the wave close seat /
orchestrator**, whose E13 obligation (*"no wave closes with UNREAD mail in scope"*) they are.
Recorded here rather than left for the close seat to rediscover.
