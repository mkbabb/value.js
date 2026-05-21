# F.W0 Lane D — Coord refresh (peer-state re-verification)

**Captured at**: 2026-05-21 (dispatch wall-clock; tranche-f branch @ `188bd6b`)

**Procedure**: Read-only re-verification of the SHAs recorded at F open
(`coordination/Q.md` §1, mirrored in `F.md`). The recorded snapshot was taken
at the moment value.js cut `tranche-f` from master; this audit checks whether
any peer repo drifted between F open and F.W0 dispatch.

All operations across all peer repos are READ-ONLY. No commits, no add,
no push, no peer-repo writes. Q.md is NOT edited by this audit
(orchestrator integrates §4's proposal).

---

## §1 — Peer-state diff vs recorded

| Repo                | Recorded HEAD       | Live HEAD        | Drift? | Notes                                                                                       |
| ------------------- | ------------------- | ---------------- | ------ | ------------------------------------------------------------------------------------------- |
| value.js (self)     | 188bd6b @ tranche-f | 188bd6b          | no     | F open commit; branch `tranche-f`.                                                          |
| glass-ui            | 5b81866             | **e150e2f**      | **YES**| 13 new commits on master (AJ tranche W1..W6 publisher writes — see §3).                     |
| keyframes.js        | d312517             | d312517          | no     | Zero new commits; working tree CLEAN. F.W2 precondition holds.                              |
| speedtest           | 30f7f555            | **5e52d136**     | **YES**| 20 new commits (AJ-W2..W8 consumer adoption + close ceremony); 10 untracked PNG screenshots.|
| fourier-analysis    | 926ca6a             | 926ca6a          | no     | Zero new commits; 109-file dirty tree unchanged (chronic, ack'd at F open).                 |
| precepts (submodule)| 68d9b20             | 68d9b20          | no     | Submodule pin matches.                                                                       |

**Summary**: 2 of 5 peer repos drifted (glass-ui, speedtest). Both drifts are
**publisher-half AJ-tranche activity**, not contraction reversal — glass-ui
extended its publisher surface (DialogContent scrim, Progress
crescendo prop, useBreakpoint composable, useViewportReady composable);
speedtest consumed those publisher writes downstream and closed its AJ
tranche. Neither drift implicates value.js's F-tranche scope (lerp
contract retirement, demo-side cohesion, library-demo separation).

---

## §2 — Keyframes.js lerp call sites verification (CRITICAL for F.W2)

Both call sites were re-inspected by direct file read at the live HEAD
(`d312517`). Lines verified:

**`src/animation/numeric.ts:159`** (within a per-key segment loop, eased ∈ [0,1]):

```ts
(this.result as Record<string, number>)[seg.keys[i]!] = lerp(
    eased,
    seg.startVals[i]!,
    seg.stopVals[i]!,
);
```

Argument order: `lerp(eased, startVals[i], stopVals[i])` → **(t, a, b)** legacy.

**`src/animation/group.ts:251`** (within a numeric-carrier merge branch, `layer.weight` ∈ [0,1]):

```ts
existing.value = lerp(
    layer.weight,
    existing.value,
    incoming.value,
);
```

Argument order: `lerp(layer.weight, existing.value, incoming.value)` → **(t, a, b)** legacy.

**Both call sites still use LEGACY `(t, a, b)` ordering**: yes.
**Working tree clean (F.W2 pre-condition)**: yes (zero modified files, zero
untracked files; verified by `git status --short` returning empty).

F.W2 may dispatch the keyframes.js consumer migration at any time; no
peer-repo precondition has slipped.

---

## §3 — Glass-ui contraction posture verification

**DockGroup / ProgressiveSidebar present in `src/components/`?** No.
A `ls … | grep -iE 'dock|sidebar'` of `glass-ui/src/components/` returns
nothing. (DockGroup retains its archival path under `archive/`, not active
components; ProgressiveSidebar likewise archived. The contraction posture
established by `ai-w5-gamma`/`ai-w5-delta` at the close of the AI tranche
holds.)

**New commits since 5b81866 (recorded) — any indicating contraction reversal?**
13 new commits, all categorized below:

| Commit  | Category                              | Reversal? |
| ------- | ------------------------------------- | --------- |
| e150e2f | feat: useBreakpoint composable        | no — additive composable, not chassis |
| e54256b | feat: useViewportReady composable     | no — additive composable, not chassis |
| 70b90c8 | feat: motion-stagger token promotion  | no — token canon expansion |
| d318704 | feat: progress :disable-crescendo prop| no — prop extension on existing component |
| b46547f | feat: DialogContent --scrim cascade   | no — CSS-var on existing component |
| 4e60045 | feat: metaballs :duration prop        | no — prop extension |
| cd9d14d | fix: util/cn tailwind-merge bucket    | no — utility bugfix |
| 0492ccb | chore: shimmer canon comment block    | no — comment-only |
| 46c9fce | refactor: progress keyframe content   | no — keyframe refinement |
| fb4a10a | feat: glass blur tier refinement      | no — token refinement |
| f7fc5eb | feat: glass-dock instrument-strip     | no — variant on existing GlassDock |
| a7b6b3d | feat: MetricRow value/unit cascade    | no — cascade var split |
| 5d47bfd | feat: MetaballCanvas positioning prop | no — prop extension |

All 13 commits are **publisher writes within the AJ-tranche scope**: motion
tokens, animation expressiveness refinements, composable additions, and
prop extensions on already-shipped components. **Zero commits re-introduce
DockGroup, ProgressiveSidebar, or any contracted chassis primitive.** The
contraction posture is intact.

---

## §4 — Q.md update proposal

Two peer entries in `coordination/Q.md` §1 have stale SHAs and should be
refreshed at the next coordination integration pass. Proposed updates
(orchestrator integrates; this audit does NOT edit Q.md):

| Field                          | Current (Q.md §1)   | Proposed                | Rationale                                              |
| ------------------------------ | ------------------- | ----------------------- | ------------------------------------------------------ |
| glass-ui master HEAD           | 5b81866             | **e150e2f**             | AJ-tranche publisher activity (13 commits).            |
| speedtest master HEAD          | 30f7f555            | **5e52d136**            | AJ-tranche consumer adoption + close (20 commits).     |

Unchanged (no proposed update):

- keyframes.js master HEAD: d312517 (no drift; F.W2 precondition holds).
- fourier-analysis master HEAD: 926ca6a (no drift; chronic 109-file dirty
  tree pre-existing and ack'd).
- precepts submodule pin: 68d9b20 (matches).

Recommended secondary note for Q.md §1 to add alongside the SHA refresh:

> Glass-ui drift between F open and F.W0 is AJ-tranche publisher activity
> (additive composables, prop/token extensions on shipped components). The
> contraction posture (DockGroup, ProgressiveSidebar archived) is intact —
> verified by F.W0 Lane D §3.

---

## §5 — Sub-gate D verdict

**PASS** — peer-state recorded; drift documented for glass-ui (+13 commits)
and speedtest (+20 commits), both within the AJ-tranche publisher/consumer
axis and orthogonal to value.js F scope. **F.W2 keyframes.js precondition:
clean** (zero commits since recorded d312517, working tree empty, both
lerp call sites still legacy `(t, a, b)` ordering). Glass-ui contraction
posture: intact. Q.md §1 SHA refresh proposed for orchestrator integration
in §4 — no in-place edits applied by this audit.
