SERVED MODEL: claude-opus-5[1m]

# KF.W4 `.d` — the gate-authoring audit (G-KFW4-9, G-L7 rules a–f)

**Dated** 2026-09-17 · **Substrate** `/Users/mkbabb/Programming/keyframes.js`, branch
`master`. Every figure double-run at the settled bytes.

**The six rules, adopted verbatim** — (a) one immutable map keyed by physical coordinate ·
(b) reauthenticate every payload node and checksum row at use · (c) read every declared
predecessor authority, **never allowlist** · (d) derive every envelope assertion from the
pinned artifact · **(e) a gate may not re-derive its own oracle** · (f) every
comment-stated invariant is a test obligation. Plus B10-27's closing clause: *"every input
a gate names must be re-read and re-hashed at use, not allowlisted."* The audit's own
closing rule: **it fails if any gate is left asserting over its subject's SOURCE TEXT.**

**Each row below is CURED or BOOKED WITH ITS BOUND STATED.** A bound is a fact about the
tree, never an implementer's preference.

## 0 · The denominator, at the frontier

⟨cmd⟩ `find scripts/gates -name '*.mjs' | wc -l` → **11** — the frontier's **NINE**
(`structure/index.mjs` · `surface/{agent-surface,boundary,consume-bundle,index,published-surface,readme-runs,verify-diff}.mjs`
· `visual/index.mjs`) **plus this unit's two creates** (`census.mjs`,
`register-census.mjs`). The stale-worktree "2 scripts" reading is not this audit's basis
(OP-3 RESOLVED / R-17).
⟨cmd⟩ `ls scripts/observe scripts/observe/demo` → **7** (`lighthouse.mjs` +
`demo/{live-session,live-session-mobile,occlusion,smoke,subject-animates,usability}.mjs`).
`test/` is audited by the rule that has a mechanical detector (§3).

## 1 · The CURED rows

| # | gate / spec | rule | the defect at the bytes | the cure |
|---|---|---|---|---|
| 1 | `test/demo/instrument/resize-tracks.test.ts:132-140` | **(e) + the source-text ban** | clause 3 was `fs.readFileSync(AnimationVisualizer.vue)` + two `toMatch` regexes. A gate asserting over its subject's SOURCE TEXT greens on a comment and reds on a rename; it can never see whether the wire RUNS | **CURED**: the component is **MOUNTED** and the wire is read off its behaviour — a registered `ResizeObserver` with a real target, and a container resize that advances the epoch. ⟨cmd⟩ `npx vitest run --project demo test/demo/instrument/resize-tracks.test.ts` → **3 passed**. The vendor touch-gate is stubbed at its own module seam (glass-ui's dist self-imports `@mkbabb/keyframes.js`, unresolvable from inside `node_modules/@mkbabb/`); **nothing about the wire is stubbed** |
| 2 | `test/demo/instrument/resize-tracks.test.ts:1-25` (prose) | **C1 / KF-AV-18** | the docblock attributed `bumpLayoutEpoch` / `getLayoutEpoch` / `layoutEpoch` to value.js **four times**; all are THIS repo's own (`src/animation/resolve/browser.ts:15`/`:17`) and value.js 4.0.0 exports none | **CURED**: the prose names the real owner, and the census that catches the class is named at the site. ⟨cmd⟩ `node scripts/gates/census.mjs --clause provenance` → the two `resize-tracks.test.ts` rows are **gone** from the roster |
| 3 | `test/demo/scenes/orbital-rotate3d.test.ts` (the `renderTransform` helper + clause (c)) | **(e) + the source-text ban** | the gate **REPLICATED** OrbitalDrag.vue's render math — *"the EXACT render math … Replicated here"* — and bound it back with `readFileSync` + four `toMatch`/`toContain` source pins. A replicated formula greens while the component diverges: the oracle WAS the subject | **CURED**: the helper is deleted and the component is MOUNTED; every clause reads the transform the REAL `containerStyle` rendered. ⟨cmd⟩ `npx vitest run --project demo test/demo/scenes/orbital-rotate3d.test.ts` → **4 passed** |
| 4 | `test/demo/scenes/orbital-inertia-parity.test.ts:29` (+ its EIGHT uses) | **(c)/(d)** | `const INERTIA_FACTOR = 0.92` against the shipped `OrbitalDrag.vue:56` `?? 0.95`, **no consumer override** — the gate proved parity for a coefficient the demo never runs | **CURED**: recalibrated to **0.95**. The declaration is the single home the eight uses read, so the recalibration reaches **all NINE coordinates** at once. ⟨cmd⟩ `grep -n 'INERTIA_FACTOR' …` → **9** lines, all reading the one constant; `grep -c '0\.92'` → **2**, both non-pins (this unit's own note quoting the retired value, and the k-mapping sweep `[0.8, 0.9, 0.92, 0.95]`) |
| 5 | `test/demo/scenes/orbital-inertia-parity.test.ts:2` | **(d)** | `import { decay } from "../../../src/animation/physics/decay"` — a DEEP source import, while the SUBJECT (`useOrbitalInertia.ts:14`) consumes `decay` from the PUBLISHED surface `@mkbabb/keyframes.js`. The envelope was derived from a different artefact than the one that ships | **CURED**: the gate imports from `@mkbabb/keyframes.js`. ⟨cmd⟩ `npx vitest run --project demo test/demo/scenes/orbital-inertia-parity.test.ts` → **6 passed** |
| 6 | `demo/styles/font-roles.json:16-26` | **the non-vacuity rule** | two manifest rows selecting `.tab-trigger-base[data-state='inactive'|'active']` — *"a green registry gate over an empty set"*. Verified empty at the bytes: ⟨cmd⟩ `git grep -n 'tab-trigger' -- demo/` returns the CSS skin (`tab-idiom.css`), two prose mentions and the manifest rows — **no template applies the class** | **CURED (R-3)**: both rows DELETED with the C-15 skin they describe (the skin itself is KF.W6's). Manifest **10 → 8** roles, and `register-census.mjs` clause 1 now FAILS on any row matching zero elements, so the class cannot return silently |
| 7 | `scripts/observe/demo/usability.mjs:239` | **(e)** | `glyphCount: mirrorText.replace(/\s+/g,"").length` — the subject's OWN counter, so (2c)'s equality at `:278-285` held **by construction** and a formally-discharged defect survived a HARD-in-CI browser gate (KF-AT-4) | **AUTHORED, NOT LANDED — the atomic bundle.** The oracle moves OUTSIDE the subject: `DECLARED_HERO_TITLE`, read statically from `EditorStartScreen.vue`'s own `title:` default. Written as `docs/tranches/X/execution/B/KF-W4-usability-bundle.patch`; **no byte of `usability.mjs` is committed by this wave** (runbook §3.4) |
| 8 | `scripts/observe/demo/usability.mjs:20-31`/`:160-172`/`:188`/`:218` + `font-roles.json:34-38` | **coupling (KF-AT-24)** | the private `.wave-word`/`.wave-char` class strings had three homes and **no runner** read the manifest — a rename to `kf-split` would silently void both instruments | **CURED + AUTHORED (R-3's fold)**: `font-roles.json`'s `hero-display` row is the ONE home (it gains `wordWrapperSelector`), `register-census.mjs` exports the contract as `SELECTORS`, and the usability half (in the patch) reads it from there. A rename now REDs both. ⟨cmd⟩ `node scripts/gates/register-census.mjs --static` → *"(S) the KF-AT-24 fold holds"* |
| 9 | the register census itself | **(b)/(c)** | the old census read a SELECTOR contract and could not see `text-transform`, and admitted mono content **by descent** from `[data-register='code']` | **CURED by construction**: `register-census.mjs` re-reads the manifest at every use (no checked-in list), reads `font-family`/`weight`/`style` **and `text-transform`** per matched leaf, **fails if it cannot read the property at all** (a blind census FAILS, never passes), and REFUSES descent-only mono satisfaction, naming the laundering ancestor |
| 10 | the citation census | **(b)** + B10-27 | — | **CURED by construction**: `census.mjs --clause citations` re-reads and **re-hashes every enumerated site at use** and prints the hashes; the roster is read from the artefact when `--sites` is given (its sha256 printed too), never allowlisted |

## 2 · The BOOKED rows — each with its bound STATED

| # | subject | rule | bound |
|---|---|---|---|
| B1 | `test/physics/oscillator.test.ts:196`/`:212` | (e)/source-text | reads its subject's source and asserts over it. **The file is in NO KF.W4 unit's writable set** — a write there is §Sequencing trigger 1 (*any write outside §Bounds*). BOOKED, routed in the record |
| B2 | `test/engine/boundary-cohesion.test.ts` | (e) | reads source files — **allowed by subject**: the gate's subject IS the import graph (light/heavy boundary), and specifiers are the only instrument that can see it. Not a source-text oracle over a behaviour claim |
| B3 | `test/compile/compile-roundtrip.test.ts` · `test/compile/roundtrip-fidelity.test.ts` | (e) | read **FIXTURES and a manifest**, not their subject's source. Allowed |
| B4 | `scripts/gates/structure/index.mjs:457`/`:536` | (c) *never allowlist* | carries a line-ceiling **allowlist**. Its bound is measured and stated in the gate itself: *"allowlist EMPTY at birth"*, and it is empty today. An allowlist that is empty forbids nothing and hides nothing; it becomes a rule-(c) violation the moment an entry lands. BOOKED with that trigger named. **Not in any KF.W4 unit's writable set** |
| B5 | `scripts/observe/demo/live-session.mjs` · `live-session-mobile.mjs` | (c) | carry a shared structured error-budget **allowlist**. `live-session.mjs` is **read-only census evidence** for this unit by §Bounds row L78; `live-session-mobile.mjs` is **neither read nor written**. BOOKED, untouched, routed |
| B6 | `scripts/gates/surface/*.mjs` (7) · `visual/index.mjs` · `structure/index.mjs` | (a)–(f) | audited by reading: each keys its assertions to physical coordinates it re-reads at run (`published-surface` / `verify-diff` / `visual` all hash or diff a pinned artefact); **`visual/index.mjs` and `census.mjs` are the only two that hash inputs** ⟨cmd⟩ `grep -rln 'createHash\|sha256' scripts/gates scripts/observe` → **2**. No further violation found; no cure authorized here |
| B7 | `demo/components/playback/AnimationVisualizer.vue:70-78` | C1 / KF-AV-18's ORIGIN | the 9-line comment attributes the layout-epoch cache to value.js **four times**. It names **no identifier in an attribution form** — it attributes a MECHANISM — so it is outside C1's stated denominator (that bound is written INTO the gate's header, not discovered after the fact). **The file is in no KF.W4 unit's writable set.** BOOKED; the mechanism-attribution class needs an instrument that does not exist, which is R-8's *"an honest UNPROVEN beats a contrived gate"* |
| B8 | `test/demo/instrument/KfPillTabs.test.ts:19` | (f) | its docblock states *"vitest has no Vue-SFC plugin"* — **false since `.b`'s `fb509edd`** registered plugin-vue. A stale comment-stated fact, not an invariant. Out of this unit's writable set. BOOKED, routed |

## 3 · The `test/` sweep — the mechanical detector, run whole

⟨cmd⟩ `grep -rln 'readFileSync' test/ --include='*.ts'` → **6** files, and only six:
`compile/compile-roundtrip` · `compile/roundtrip-fidelity` · `demo/instrument/resize-tracks`
· `demo/scenes/orbital-rotate3d` · `engine/boundary-cohesion` · `physics/oscillator`.
**Counting rule, stated at the figure**: one unit = one file the command returns.
Two of the six are this unit's cures and now carry the token only in PROSE (the retirement
note); ⟨cmd⟩ `grep -n 'readFileSync' test/demo/instrument/resize-tracks.test.ts
test/demo/scenes/orbital-rotate3d.test.ts` → **2 lines, both inside a docblock**, no call
site. Three are allowed by subject (B2/B3). **One survives: `physics/oscillator.test.ts`
(B1), out of bounds, booked.**

## 4 · What this audit did NOT do

No allowlist was added anywhere. No `test.skip`, no `|| true`, no severity downgrade, no
`known-violations` file, no `node_modules` patch, no copied producer selector. No gate was
weakened to pass: the two new gates both REPORT RED where the tree is red
(`census.mjs --clause provenance` exits 1 on 8 residue rows) and the register census's
browser half **refuses to pass vacuously** — it prints a structured skip when playwright
is unresolvable and THROWS under `KF_REQUIRE_BROWSER=1`.
