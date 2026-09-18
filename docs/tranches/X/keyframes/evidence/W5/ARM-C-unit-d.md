SERVED MODEL: claude-opus-5[1m]

# X.KF.W5 `.d` — ARM C, THE ENGINE SEAM — receipt sheet

**Unit**: X.KF.W5.d · **Track B · X·KF** · wave KF.W5 · spec of record
`docs/tranches/X/keyframes/waves/KF-W5.md` (IMMUTABLE under E-3; the corrections below are dated
addenda-beside, never patches).
**Sections executed, whole and only**: §Bounds *Arm C — the engine seam* (`:246-253`) · §Carry *Arm C ·
THE ENGINE SEAM* (`:361-367`) · §Gates **G-RENDERER · G-RAF** (`:410-411`) · §Sequencing **S-4** (the
engine-seam packet) **· S-5** (`:433-434`) · §Disjointness the `.d` clause (`:297-299`).
**Rulings consumed**: COHESION §0j.C **KF-WRITE** (write authority), **KF-W5R4(4)** `singleTarget`
(**consumed, never re-ruled** — S-5), §0k · §0l · §0m read to file end at this seat.
**Substrate**: keyframes.js `master`, from this wave's HEAD **`55347314`** (the X.KF.W2 sibling's last
landing) to **`d7f68225`**. One commit, one meaning, its own pathspec on the commit.
**Every figure below is read from the settled bytes and DOUBLE-RUN; both runs agree.**

---

## 0 · Bounds, re-verified at true bytes before any edit

`.d`'s three `src` files, re-verified PRESENT at open (§Disjointness requires *"exactly three"* to be
true of three files that exist):

⟨`for f in src/animation/engine/compile-bridge.ts src/animation/engine/css/animation.ts
src/animation/physics/playback.ts; do printf "%s: " "$f"; wc -l < "$f"; done`⟩ →
`compile-bridge.ts` **113** · `engine/css/animation.ts` **253** · `physics/playback.ts` **250**.

The two created specs, ABSENT at open (the `create` verb is real):
⟨`git cat-file -e 55347314:test/engine/adopt-compiled-renderer.test.ts`⟩ → **ABSENT** ·
⟨`… :test/physics/raf-degrade.test.ts`⟩ → **ABSENT**.

**Nothing outside the writable set was written.** `group/group.ts` and `group/waapi.ts` — `.c`'s bytes,
which the `.d` clause forbids this seat to open — were **never opened**: ⟨`git show --stat d7f68225`⟩
names five paths, all `.d`'s. `scripts/dev/dev.sh` untouched and unstaged in both repos.

### ANCHOR DRIFT — one file, recorded rather than smoothed over (WRITE-THEN-MEASURE)

| spec anchor | at `55347314` (this seat) | disposition |
|---|---|---|
| `compile-bridge.ts:85-104` / `:95-99` — *"transplants the compiler whole and copies `unflatten`"* | **REPRODUCES.** ⟨`git show 55347314:… \| grep -n`⟩ → `:88` `export function adoptCompiled<V extends Vars>(` · `:94` `const compiler = compilerFor<V>(source);` · `:95` `setCompilerFor(anim, compiler);` · `:98` `anim.unflatten = source.unflatten;` — `:95-99` is exactly the transplant + flag copy | taken at the spec's anchor |
| `engine/css/animation.ts` — `resolveTransform` declared `:110`, called `:118`/`:135`/`:170`; the `usesDefaultRenderer` comment `:108` | **DRIFTED BY 3 (up).** Measured: declaration **`:107`**, calls **`:115`** / **`:132`** / **`:167`**, the comment *"reference comparison (`usesDefaultRenderer`)"* at **`:105`** | **INTENT TAKEN AT THE TRUE BYTES**, recorded here. The spec's own §Bounds cell already carries this file's round-2 re-path (`css-animation.ts` → `animation.ts` at `1412ed8e`); the residual 3-line drift is KF.W4's landing (`81a56990` → `7d958f21`) and later. Three calls, not four — the count is the spec's and it reproduces |
| `playback.ts:110-152` — `_run`, `const result = step(now)` with no try/catch | **REPRODUCES EXACTLY.** `_run` declared **`:113`** (the seat-0 brief's own anchor) · `const result = step(now)` **`:139`** · `void (result as Promise<boolean>).then(reschedule)` **`:144`** — one argument, no rejection arm | taken at the spec's anchor |

---

## 1 · G-RENDERER — C-1, kf-SquareScene L-2 (BLOCKER, unanimous)

### The defect, measured rather than restated

`adoptCompiled` transplanted the compiled compiler whole **and** copied `source.unflatten`, so the
RENDERER rode along with the compiled state. `usesDefaultRenderer(fn)` is `fn === this._defaultTransform`
(`engine/animation.ts:159-161`) against a **per-instance** field (`:155`), so after an adoption the
receiver's frames hold a **foreign instance's** function.

Two faces, both measured at the un-cured bytes:

1. **The row's face.** A receiver carrying a custom `transformFunc` adopts the editor's recompile
   (`new CSSKeyframesAnimation(options, ...targets).fromKeyframes(edited)`, **no transform** —
   `useKeyframeOps.ts:66-70`, the read-only witness). `resolveTransform(undefined)` on the throwaway
   sets `unflatten = false` and `_defaultTransform`; the adoption then hands both to the receiver.
   Measured: `frames[i].transform` is `[Function _defaultTransform]`, not the supplied renderer;
   `anim.unflatten` is `false`; the renderer **is never called again**, for the mount's lifetime.
2. **The face the row did not have to name, and which the same bytes produce.** A receiver on the
   **DEFAULT** renderer also ends up holding a foreign default — a different object that closes over
   the **SOURCE's** target set. Two consequences, both measured: `anim.usesDefaultRenderer(frame.transform)`
   answers **false**, so the WAAPI fast lane refuses the animation for a renderer nobody supplied
   (`waapi/eligibility.ts:130` · `compile/emit/entry.ts:279` · `compile/emit/refusal-probes.ts:32`);
   and the default paint writes the **source's** element from the receiver's play
   (`destinationTarget.style.opacity` stayed `""`, measured). The pre-existing seam test
   (`test/ingest/adopt-compiled.test.ts`, *"computed slots transfer to destination target ownership"*)
   rebinds the computed SLOTS to the receiver's target and asserts `at()`; it never asserts a paint, so
   this face was invisible to it.

### The cure — LIBRARY-side, keyed on the named instrument

One rule, stated once: **the renderer is the RECEIVER's, unless the SOURCE declared one of its own.**

- `rendererOf(anim)` reads an animation's renderer **off its compiled frames, through
  `usesDefaultRenderer`** — the reference test `engine/css/animation.ts:105`'s own comment already
  names as the way to ask *"did the consumer supply a transform?"*. It returns `declared` (a transform
  that is neither this instance's default nor `NOOP_TRANSFORM`) and `own` (that, else this instance's
  OWN default, recovered by the same test — `_defaultTransform` is `protected` and unreachable from a
  free function, and **`engine/animation.ts` is `.c`'s file, not this unit's**, so no accessor was
  added there).
- The receiver's renderer is read **before** the transplant, while `anim.frames` is still its own.
- When the source declared none, every **template** frame and every **compiled** frame is re-pointed to
  the receiver's renderer. The templates too: `FrameCompiler.createFrame` re-derives a compiled
  transform from `templateFrames` (`compile/frame/compiler.ts:197-209`), so re-pointing only the
  compiled frames would let the next `parse()` — a `setDuration`, a `bindTimeline` — **re-derive the
  loss**. That is clause (a3) of the gate.
- `unflatten` travels **with** the renderer it describes (it is read at apply time only —
  `engine/interpolate.ts:303-308` — so a preserved `true` hands the preserved renderer the nested
  `vars` exactly as before the adoption).

**A demo-side re-supply was the forbidden shape and was not taken**; `useKeyframeOps.ts` is a read-only
witness and is unmodified (⟨`git show --stat d7f68225`⟩ names no `demo/` path).

**One honest addendum-beside to `engine/css/animation.ts` (in bounds, `modify-carve`)**: the
`resolveTransform` docblock's claim — *"which keeps WAAPI eligibility a reference comparison"* — was
**false across `adoptCompiled`** and is true again only because a second site upholds it. The docblock
now names that site. No behaviour rides this edit.

### The gate — `test/engine/adopt-compiled-renderer.test.ts` (**create**, 207 L)

Written against the **SEAM**, not the scene: both animations are built inside the spec out of the
library's own entry points, and **no fixture, import or assertion reaches `demo/`**
(⟨`grep -cE "demo/|SquareScene|useSquareDemo|useKeyframeOps" test/engine/adopt-compiled-renderer.test.ts`⟩
→ **2**, and ⟨`grep -n SquareScene …`⟩ resolves both to the **header docblock** — `:6` the provenance
citation *"the row (C-1, kf-SquareScene L-2)"* and `:12` the falsifier statement itself; **zero in the
body**). *"The row is the seam's, not the scene's"*, and writing the gate against SquareScene fails it.

**The vacuity this unit named in its own gate, before trusting it** (the discipline `.c` recorded as the
transferable part of its G-OPTSET leg-4 finding). The gate's headline wording — *"`usesDefaultRenderer`
still **false**"* — is **VACUOUS at the un-cured bytes**: because `_defaultTransform` is per-instance, a
receiver asked about the THROWAWAY's default answers `false` too. That clause is kept, and named in the
file as the gate's **letter** rather than its measurement; every bite is an identity, a flag or a value
the un-cured seam cannot produce.

| clause | asserts | born-RED |
|---|---|---|
| (a1) | every adopted frame carries the receiver's renderer **by identity** | **FAIL** — `[Function _defaultTransform]` |
| (a2) | `unflatten` survives; `interpFrames(0, true)` reaches the renderer with the nested leaf (`10`, the EDITED range — the compiled state IS adopted) | **FAIL** — `unflatten` false; renderer never called |
| (a3) | the preservation survives a later `parse()` (templates re-pointed) | **FAIL** |
| (b) | a source that DECLARED a renderer is still adopted whole | **PASS** — this is a **REGRESSION LOCK**, not a bite |
| (c1) | a default-renderer receiver answers `usesDefaultRenderer` **true** after adopting | **FAIL** |
| (c2) | the default renderer paints the RECEIVER's target, not the source's | **FAIL** |

**BEFORE → AFTER**, both double-run, the born-RED measured with the FINAL spec bytes against the
un-cured `compile-bridge.ts` (restored from `HEAD` into the worktree, run, then restored — no
`git stash`, no `reset`):

⟨`npx vitest run --project library test/engine/adopt-compiled-renderer.test.ts`⟩
**5 failed | 1 passed (6)** ×2 → **6 passed (6)** ×2. **G-RENDERER GREEN.**

Regression floor: ⟨`… test/ingest/adopt-compiled.test.ts`⟩ → **6 passed**, unmoved.

---

## 2 · G-RAF — C-2, kf-SquareScene D-27/L-7/C-9 (MAJOR rider)

### The defect

`_run`'s frame ran `const result = step(now)` (`:139`) with **no failure path at all**, in either shape:

- a **sync** throw skipped `reschedule` outright;
- an **async** rejection met `void (result).then(reschedule)` (`:144`) — **one argument, no rejection
  arm** — so the rejection escaped into an unhandled-rejection report and the loop was never told.

In both shapes `_cleanup` never ran, `_rafId` stayed populated, **`running` stayed `true` for the
driver's lifetime**, and a pending `play()` promise never settled — so every consumer guarding on
`!playback.running` (`useSweepScene`'s `startLoop`) became a **permanent no-op** and drag, keyboard and
tumble died silently. Reachable through the SAME editor path C-1 opens, which is why S-4 binds the two
rows into one packet.

### The cure — loud AND recoverable; a swallow fails the gate

A failed frame winds the loop down **through `reschedule`** — so the generation guard still decides
whether this frame owns the driver, and a **stale** failure cannot strand the loop that replaced it —
and then **RE-RAISES the failure unchanged**. Nothing is absorbed, nothing is translated: the caller
sees the error its own `step` produced. `failFrame` serves both arms, so the two shapes cannot diverge.

### The gate — `test/physics/raf-degrade.test.ts` (**create**, 234 L)

**The vacuity named here too**: *"it throws"* is vacuous — the un-cured frame throws as well; that is the
defect's own delivery. Every bite is a **recovery** assertion.

| clause | asserts | born-RED |
|---|---|---|
| (a) | a sync throw leaves `running === false` and no frame scheduled | **FAIL** — `running` true |
| (b) | the driver **RE-ARMS** (the `!running` guard opens; the `useSweepScene` shape, verbatim) | **FAIL** — the guard never opens |
| (c) | a pending `play()` promise **SETTLES** when its frame fails | **FAIL** — stranded |
| (d) | the failure is **NOT swallowed** — the identical error object reaches the host (the gate's own falsifier: a catch-and-return-`false` cure reds here) | **FAIL** — `running` true |
| (e) | an **async** rejection winds the loop down too | **FAIL** — `running` true |
| (f) | a **stale** generation's failure does not clobber the loop that replaced it | **PASS** — guard lock |
| (g) | a healthy loop is untouched, `cancelAnimationFrame` never called | **PASS** — regression floor |

The async arm is driven through a **synchronous thenable**, not a mock: the engine's own feature-detect
is `typeof result.then === "function"` (its comment: *"a thenable → async"*), so this is the declared
shape. It is chosen so the re-raise is OBSERVABLE at the pump instead of leaving a floating rejected
promise in the runner; a real `Promise` takes the identical two branches one microtask later. With
the un-cured bytes the same thenable receives **no** `onRejected` and therefore does nothing — which is
exactly what `.then(reschedule)` does with a rejection, so the clause measures the real hole.

**BEFORE → AFTER**, both double-run, born-RED measured with the FINAL spec bytes against the un-cured
`playback.ts`:

⟨`npx vitest run --project library test/physics/raf-degrade.test.ts`⟩
**5 failed | 2 passed (7)** ×2 → **7 passed (7)** ×2. **G-RAF GREEN.**

---

## 3 · Instruments at close (this unit's attribution measured, not assumed)

| instrument | at `.c`'s close | at this unit's close | attribution |
|---|---|---|---|
| ⟨`npx vitest run --project library`⟩ | 110 files passed \| 5 skipped · 1211 passed \| 3 expected fail \| 14 skipped | **112 files passed \| 5 skipped · 1224 passed \| 3 expected fail \| 14 skipped** ×2 | **+2 files, +13 tests = this unit's two specs exactly** (6 + 7). The **3 expected fail are UNMOVED** — 1 pre-existing + `.c`'s 2 born-RED G-FROMSTRING rows; this unit added none and unwrapped none |
| ⟨`npx vitest run --project demo`⟩ | 30/191 at open; 31/195 after `.a` | **31 files passed · 195 passed** | unmoved by this unit (no `demo/` byte written) |
| ⟨`npx tsc --noEmit -p tsconfig.lib.json`⟩ | 3 | **3** — `composite/compositor.ts(79,11)` · `group/waapi.ts(9,1)` · `physics/smooth.ts(194,13)`, all `TS6133` | the banked pre-existing floor, **unmoved** |
| ⟨`npx tsc --noEmit -p tsconfig.test.json`⟩ | 28 (with a sibling mid-edit) | **24** — the record's own open baseline | ⟨`… \| grep -cE 'adopt-compiled-renderer\|raf-degrade\|compile-bridge\|physics/playback\|engine/css/animation'`⟩ → **0**. **No diagnostic names a file this unit wrote**, and none was deleted to green a leg (FINDING 3's reading rule). The 28→24 is the sibling's mid-edit files leaving the worktree, not this unit's work |
| ⟨`npx depcruise --config .dependency-cruiser.cjs src`⟩ | ✔ 0, 160 modules / 702 deps | **✔ 0 violations, 160 modules / 705 deps** | **0 new modules and 0 new module-pairs from this unit**: `engine/compile-bridge → constants` was already an edge (`import type { Vars }`) and this unit only widens it to a runtime import (`NOOP_TRANSFORM`). The +3 deps arrive with the sibling X.KF.W2 seat's two commits in this window (`0cfd3b5f`, `55347314`) — attributed, not absorbed |
| ⟨`node scripts/gates/structure/index.mjs`⟩ | 1 violation (`ingest/cssom.ts` 530 L, the sibling's) | **PASS — 0 violations across R1–R6** | this unit's three `src` files are 186 / 263 / 280 L, all far under the ceiling; no allowlist was edited and no module was carved (`.e`'s act under S-6) |
| ⟨`node scripts/gates/surface/index.mjs`⟩ (`proof:publish`) | PASS | **PASS** — `llms.txt`/`llms-full.txt` byte-identical to a fresh generation | this unit publishes no name |

---

## 4 · Commit

**One commit, one meaning — the engine-seam packet (S-4: C-1 + C-2 must not split).**

`d7f68225` — *fix(kf/w5.d): the renderer belongs to the RECEIVER, and a failed frame degrades instead of
wedging (G-RENDERER + G-RAF)*

⟨`git show --numstat --format= d7f68225`⟩ → **5 files, 567 insertions, 13 deletions**:
`src/animation/engine/compile-bridge.ts` **84/11** · `src/animation/engine/css/animation.ts` **10/0** ·
`src/animation/physics/playback.ts` **32/2** · `test/engine/adopt-compiled-renderer.test.ts` **207/0** ·
`test/physics/raf-degrade.test.ts` **234/0**. **Nothing of a sibling's is in it** — the pathspec rides the
commit itself, and ⟨`git status --porcelain`⟩ after the landing shows only the two untracked I-26 mail
survivors (the §0m.0 class), exactly as at open.

Both created files carry `// SERVED MODEL: claude-opus-5[1m]` as line 1 (⟨`head -1`⟩ on each, verified
at the settled bytes).

**Nothing pushed.** Under KF-WRITE the push of `origin HEAD` is the **WAVE's** close, not a unit's.

---

## 5 · Residuals, carries and findings — none of them silent

1. **`.c`'s ESCALATION 1 (`fromString` REPLACES / G-FROMSTRING) is NOT taken by this unit, and the
   reason is bounds, not reluctance.** Its cure site — `engine/css/animation.ts:166` (today `:176`,
   re-derived by name this seat) — **is** in this unit's writable set, but **G-FROMSTRING is not one of
   this unit's gates and `test/engine/fromstring-idempotence.test.ts` is not in its writable set**.
   Taking only the half that is in bounds would be **actively harmful**: `.c` pinned the ruling with two
   `it.fails` rows, and an `it.fails` that starts passing is a **test FAILURE** — the cure alone would
   turn the library suite RED. **Routing, stated for the wave**: the act needs ONE seat holding
   **both** `engine/css/animation.ts` **and** `test/engine/fromstring-idempotence.test.ts` — clear the
   template set (and the compiled frames with it) before the ingest loop, then unwrap the two rows to
   plain `it`. **Carried, not performed.**
2. **A defect this unit CURED that its row did not name** (§1, face 2): an adopted **default** renderer
   is a foreign instance's, which both (i) breaks `usesDefaultRenderer` as a reference comparison — so
   the WAAPI fast lane refuses an animation for a renderer nobody supplied — and (ii) paints the
   **source's** targets from the receiver's play. It is the same seam, the same rule and the same one
   line of cure; it is booked here so a later census does not read it as scope creep, and clauses (c1)
   and (c2) hold the floor.
3. **`engine/animation.ts` was NOT opened.** `_defaultTransform` is `protected`, so the natural shape —
   an accessor beside `usesDefaultRenderer` — would have been a write into **`.c`'s** file. The cure
   recovers the receiver's own default through the **public** reference test instead. Recorded because
   the alternative shape is the one a later reader will reach for.
4. **S-5 honoured**: `.c`'s `singleTarget` ruling (`0b593743`) is **consumed and never re-ruled**;
   `group/group.ts` and `group/waapi.ts` were not opened by this seat.
5. **E13**: this unit minted no mail, consumed no routed letter, and leaves **0 UNREAD in its scope**
   (the wave's open-time four-path sweep stands; `INBOX.md` is outside this unit's writable set and was
   read-only here).
