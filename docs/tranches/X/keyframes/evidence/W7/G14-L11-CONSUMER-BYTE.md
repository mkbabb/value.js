SERVED MODEL: claude-opus-5[1m]

# KF.W7 · G14 — L-11's CONSUMER BYTE: THE ACKNOWLEDGEMENT WAITS FOR THE OUTCOME

**Unit**: X.KF.W7.i (resume group 3, serial after `.h`). **Date**: 2026-09-18.
**Substrate at open**: keyframes.js `master` ≡ `origin/master` ≡ **`15c95de1`** (`.h`'s landing), clean of
product bytes. **Landed**: **`16f58d54`** (the consumer byte) · **`1fa98a5d`** (an inherited residual).
**Gate**: **G14** — *"The cluster's failure posture is ONE posture"* (`KF-W7.md:317-319`), this being its
**fifth and last consumer byte**. **Row this cure must not trade away**: **G4** (`:273-275`).
**Family**: §Sequencing's *"the posture ruling (G14's consumers, one ruling)"* line (`:340`).

**This is a CONSUMER BYTE, not a second ruling.** The ruling landed at `.c`:
`evidence/W7/G14-POSTURE-RULING.md` (152 L), §2's row **L-11 (KeyframeTimeline)**, registry row **13**,
clause **P3** — *"`rebuild` typed `() => Promise<void>` at `useTimelineOps.ts:19` and **awaited**;
`snapshot` toasts `Keyframe captured …` AFTER the awaited rebuild"*. Nothing here re-opens, re-grades or
re-words it; E-3 holds — the ruling is immutable and this is its execution.

---

## §0 · Anchors re-derived at the bytes BEFORE a byte was written (D-19)

| anchor | brief / resume table | at `15c95de1` | verdict |
|---|---|---|---|
| ops param `rebuild: () => void` | `useTimelineOps.ts:19` | **`:19`** | EXACT |
| the latched `rebuild()` | `:42`, inside the rAF at `:40` | **`:42`** / rAF **`:40`** | EXACT |
| `toast.success` in `snapshot` | `:59` | **`:59`** | EXACT |
| the builder's async rebuild | `useTimelineBuild.ts:43 const rebuild = async (): Promise<void>` | **`:134`** | **DRIFTED — +91** |

**The one drift, taken as INTENT at the true bytes and not as a number.** The brief's
`useTimelineBuild.ts:43` is the pre-`.g` coordinate; `.g`'s preview-cache rules block (the `PreviewEntry`
type, `previewKey`, `evictStalePreviews`, `capturePreview`) now stands above it, so the declaration the
brief names sits at **`:134`**: ⟨cmd⟩ `grep -n 'const rebuild = async (): Promise<void>' useTimelineBuild.ts`
→ **`134`**, one hit. The INTENT — *the builder's `Promise<void>` must be visible to the ops layer* — is
unchanged by where the line sits, and `useTimelineBuild.ts` is **outside this unit's writable set and was
not written**.

## §1 · The cure, exactly the brief's four acts

**(1) The type, at the seam that erased it.** `rebuild: () => void` → **`rebuild: () => Promise<void>`**.
The builder has been `async (): Promise<void>` all along; the ops parameter threw that away, so no caller
of this layer could tell a finished build from a started one.

**(2) `scheduleRebuild` hands back the settlement of the build IT LATCHED — the latch RETAINED.**

```ts
let rebuildFrame: number | null = null;
let rebuildSettled: Promise<void> = Promise.resolve();

const scheduleRebuild = (): Promise<void> => {
    if (rebuildFrame !== null) return rebuildSettled;
    // The executor runs synchronously, so the latch is armed before this
    // returns — the same latch, in the same frame, as before.
    rebuildSettled = new Promise<void>((settle) => {
        rebuildFrame = requestAnimationFrame(() => {
            rebuildFrame = null;
            void rebuild().then(settle, settle);
        });
    });
    return rebuildSettled;
};
```

**Nothing is un-latched.** The guard, the single `requestAnimationFrame`, the one-build-per-frame
coalescing and `moveKeyframe`'s dirty check are the bytes G4 was greened on and they are untouched;
what is added is a handle. **The callers coalesced into one frame receive the SAME promise**, so a
settlement is per-build, not per-call — the coalescing survives in the settlement as well as in the build.

**(3) `snapshot` awaits it before the acknowledgement.** `const snapshot = async (percent?: number):
Promise<void>`; `await scheduleRebuild();` (`:87`) precedes `toast.success(...)` (`:89`). The posture's
third clause — **outcome before acknowledgement** — is now a fact of the control flow rather than a
comment about it.

**(4) `useTimeline.ts:54` — NOT re-pointed, because nothing demanded it.** It already passes the builder's
`rebuild`, which IS `() => Promise<void>`; ⟨cmd⟩ `npx tsc --noEmit -p tsconfig.test.json` and
`vue-tsc -p tsconfig.json` both report **zero** errors in that file before and after. The file is in this
unit's writable set and **was not written** — the lock's own words: *a wider edit than the typechecker
requires is not this seat's to make*.

## §2 · Why the settlement RESOLVES when the build settles, rather than rejecting

`rebuild` is **P3-bound at the builder**: its `catch` publishes `buildError`, toasts with a Retry action
(★ S-7's shape) and leaves a state the owner RENDERS (P4b) — so the failure is already surfaced, in the
one posture this gate exists to declare. Had this seam re-thrown instead, **every mutation site** —
`addKeyframe`, `removeKeyframe`, `moveKeyframe` at pointer rate, `updateKeyframeProperty` — would emit an
unobserved rejection for a failure that had already spoken: a **second** failure channel, minted at the
exact gate whose subject is that there be only one. The settlement therefore says *the latched build has
SETTLED*, and the five fire-and-forget call sites stay fire-and-forget by construction.

**What the success toast claims is true either way**: a keyframe WAS captured at that percent and is in
`state.keyframes`. A build that fails says so in its own voice, on its own channel, at the same moment —
never through this line's silence, which was the defect.

## §3 · Gate readings BEFORE → AFTER, at the settled bytes, double-run

One script over `git show <ref>:<path>` so BEFORE and AFTER are the SAME probes
(`w7i-measure2.sh`); ⟨cmd⟩ `diff run1 run2` → **no output — DOUBLE-RUN IDENTICAL**.

| probe | BEFORE (`15c95de1`) | AFTER (`1fa98a5d`) |
|---|---|---|
| **G14 · L-11** | | |
| ops param `() => void` / `() => Promise<void>` | **1 / 0** | **0 / 1** |
| `const scheduleRebuild = (): Promise<void>` | **0** | **1** |
| `const snapshot = async (` | **0** | **1** |
| `await scheduleRebuild()` line / `toast.success` line | **— / 59** (nothing awaited) | **87 / 89** — the await PRECEDES the toast |
| builder `const rebuild = async (): Promise<void>` | 1 (`:134`) | 1 (`:134`, unwritten) |
| **reading** | **RED** | **GREEN** |
| **G4 (must stay GREEN)** | | |
| `scheduleRebuild` CALL SITES | **5** | **5** |
| `rebuild(` invocation lines (excl. the prose line `:27`) | **`:42`**, inside the rAF at **`:40`** | **`:66`**, inside the rAF at **`:64`** |
| `if (rebuildFrame !== null) return` (the latch guard) | **1** | **1** |
| `if (next === kf.percent) return;` (the dirty check) | **1** | **1** |
| `const next = clamp(newPercent, 0, 100);` | **1** | **1** |
| **reading** | **GREEN** | **GREEN — unmoved** |

**G4's live witness, re-run twice at the settled bytes**: ⟨cmd⟩ `npx vitest run --project demo` over the
four W7 fixtures → **65 passed**, twice, including fixture 1's two G4 assertions (*"collapses a 60-move
drag to ONE build per animation frame"* · *"builds ZERO times on a zero-clamped-delta hold, and mutates
nothing"*). **Full suite**: ⟨cmd⟩ `npx vitest run` → **147 files passed | 5 skipped · 1518 passed · 3
expected fail · 14 skipped** — byte-for-byte the figure `.h` left; **+0**, which is the right number for a
type-seam cure that adds no assertion.

**Typecheck.** ⟨cmd⟩ `npm run check` → exit **2**; `error TS` → **54** over **22** files; ⟨cmd⟩
`… | grep -c 'instrument/timeline'` → **0**; ⟨cmd⟩ `diff` of the error set against the pre-edit run →
**IDENTICAL**. The 54 are the frontier's pre-existing set (`.g` and `.h` measured the same 54-over-22).
**A leg the frontier hides, measured here because this cure lands in it**: `check`'s legs are `&&`-chained
and leg 1 is RED at the frontier, so **`tsc -p tsconfig.test.json` never runs under `npm run check`**. Run
directly: **25 errors BEFORE → 23 AFTER**, and ⟨cmd⟩ `diff` names the two that went: the TS2345 pair
`timeline-mount-keyboard.test.ts(236,60)` and `timeline-mount-projection.test.ts(272,60)`, *"Argument of
type `() => void` is not assignable to parameter of type `() => Promise<void>`"* — **this cure's own
demand, raised and discharged inside this unit**. The remaining 23 are the frontier's.

## §4 · The two fixtures: what was written, and on whose authority

- **The stubs — the typechecker's demand, and its whole extent.** `() => { builds++; }` → `async () => {
  builds++; }` (fixture 1) and `() => {}` → `async () => {}` (fixture 2). The counter still increments
  **synchronously on entry**, which is what the per-frame assertions read, and `builds()` is asserted
  immediately after a hand-driven frame — so no assertion's timing moves.
- **The dead `previewCache: {}` / `previewLoading: {}` keys — an inherited residual, discharged as its own
  commit** (`1fa98a5d`). The two-map API they described was replaced by a single optional `previews` Map at
  `.g`; since then they have been inert fallthrough attributes describing a contract that no longer exists.
  **Routed here by name, twice**: `.g`'s residual 1 and `.h`'s residual 2 (*"Owner: `.i` — one line each"*).
  **The tension with this unit's lock is declared, not hidden**: the lock says the fixtures are touched only
  as the typechecker demands, and this is four lines more than that — taken because both preceding seats
  assigned it to this unit by name, it is inside the hard writable bound, it removes bytes rather than
  adding any, and the alternative was a four-line cleanup carried into a verify-only `.j` and out to KF.W10.
  **It is a separate commit precisely so a later seat can read the two meanings apart.**
- **Formatting**: ⟨cmd⟩ `npx prettier --check` → the ops file is **clean**; both fixtures carry
  **pre-existing** divergences, and ⟨cmd⟩ the line numbers prettier would change (f1 **58 · 138 · 177**;
  f2 **25 · 80 · 83 · 123 · 132-134 · 145-146 · 309 · 361 · 394 · 399 · 412 · 433 · 435 · 437 · 440 ·
  443-445 · 450**) **intersect none of this unit's hunks** (f1 `@@ -110,2 +109,0 @@` · `@@ -272 +270,5 @@`;
  f2 `@@ -97,2 +96,0 @@` · `@@ -236 +234 @@`). Reformatting either file whole would be exactly the wider
  edit the lock forbids.

## §5 · Falsifiers — how a later seat reads this consumer byte RED

1. `useTimelineOps.ts` declares `rebuild` as anything but `() => Promise<void>` → **RED** (the erasure is
   back).
2. `snapshot`'s `toast.success` line number is **less than** its `await scheduleRebuild()` line number, or
   the await is gone → **RED** (the ruling's falsifier 3, verbatim: *"`snapshot` toasts before
   `await rebuild()` → P3 RED"*).
3. `rebuild` is invoked anywhere in `useTimelineOps.ts` outside the `requestAnimationFrame` callback, or the
   `if (rebuildFrame !== null) return` guard is gone → **G4 RED**, which is the trade `## Close` named in
   advance and this unit refused.
4. `moveKeyframe`'s `if (next === kf.percent) return;` is gone → **G4 RED** (the dirty half of the row).
5. Fixture 1's two G4 assertions stop running, or stand as `test.skip` → **G4's witness RED**. ⟨cmd⟩
   `grep -cE '^\s*(test|it|describe)\.skip'` over the four fixtures → **0**.

## §6 · Residuals and escalations

- **Residual (owner `.j` / KF.W10), declared not cured**: **G14 has no RUNNING witness for the ordering**
  — the gate is read at the bytes (§3) plus the ruling artifact, exactly as `.e`'s three consumer bytes
  were. An executable assertion (*the success toast does not fire until the awaited build settles*) would
  need a new test with a vue-sonner double, which is an addition neither this unit's brief nor its lock
  authorises. **Stated so `.j` reads the gate for what it is.**
- **Residual (owner: the builder's own row, `kf-DemoGlobalChrome` D-1/L-1/C-1, NO-WAVE-OWNER)**: P3's toast
  channel is still structurally unpainted (`G14-POSTURE-RULING.md` §0.1). This unit imports no stylesheet
  and files nothing — the precondition is named, as the ruling names it, and is not presumed away.
- **ESCALATIONS: NONE.** No write outside the writable set (`useTimelineBuild.ts`, `KeyframeTimeline.vue`
  and every tracked `test/demo/instrument/` witness untouched); no `test.skip`, no try/catch around a
  defect, no allowlist, no producer selector copied, no `node_modules` patch; glass-ui READ-ONLY and no row
  filed; `scripts/dev/dev.sh` in zero commits; pathspec on both commits, each carrying only its own paths.
