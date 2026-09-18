SERVED MODEL: claude-opus-5[1m]

# X.KF.W9 `.c` — CAPTURE INDEX · mobile / iOS cells

**Seat**: `.c`. **Date**: 2026-09-17. **Gate owned**: **G-KFW9-11**. **Status**: **ESCALATED**.
**Cells owned**: `safari-app/ios-device` · `safari-app/ios-simulator` (SEPARATE cells, I-20).

**THE INDEX IS EMPTY, AND THAT IS THE MEASUREMENT.**

| capture path | cell | substrate ref | sha256 | probe |
|---|---|---|---|---|
| — | — | — | — | — |

**0 captures · 0 per-shot sha256 sidecars.** G-KFW9-2's close condition — *"green without per-shot
sha256 FAILS"* — is honoured by having nothing to green: no row in this seat's scope is GREEN, EXECUTED
or RETIRED.

---

## Gate reading

| gate | BEFORE | AFTER | why |
|---|---|---|---|
| **G-KFW9-11** | **RED** (wave record §Baseline: `clampIOSNoZoomFontSize` declared `iosTextEntry.ts:10`, consumed at exactly one site, tested 14→16, **unused at R-9's 14 px and SP-4's ~12.2 px** on a shell that calls `initIOSPlatformClass()`) | **RED** | its CLOSES requires *one real-iOS-Safari session*. **No iOS cell can be opened on this host** (F-1, F-2) and the pinned substrate has no servable build (F-3). The born-RED witness **re-verifies at the pin** (record §6) — the gate is RED at its own witness, still, and is not turned by a substitute cell |

**Shares of the wave-wide gates**: `.c` contributes **0 captures** to G-KFW9-1, **0 labelled rows** to
G-KFW9-2, **0 probe discharges** to G-KFW9-4, **0 substrate-stamped shots** to G-KFW9-14 — each stated
as a zero rather than left to inference.

---

## The record of substance

Everything measured by this seat — the three foreclosures with their commands and double-runs, the
per-probe terminal dispositions for S-8 families (v), (iii), (iii-a), (iii-b), for S-6 and S-7, the
OP-4 per-cell disposition, the OD-V3 **exact precondition** written for KF.W10, and the six static
anchors re-verified read-only at the pin — is at

> **`docs/tranches/V/megatranche/audit/visual/safari-real/mobile-CELL-RECORD-2026-09-17.md`**
> (machine-readable twin: `…/safari-real/mobile-cell-foreclosure-2026-09-17.json`)

**Headline, so it is not buried**: **F-1** no paired iOS device (`xcrun devicectl list devices` →
*No devices found*, double-run, plus two corroborating witnesses) · **F-2** `safari:useSimulator`
refused by the platform (*"The 'macOS' platform is incompatible with requested capability"*, double-run;
`safaridriver --help` has no simulator flag) · **F-3** the pin `55e9bf0d` is stale — kf HEAD moved to
`5388907b` (unpushed, 1 ahead) mid-run and the rebuilt `dist/gh-pages` (16:17:47) compiles **23 changed
`demo/` files**, among them every surface this seat photographs. **F-1 and F-2 are not curable by any
grant this wave could be given.**

**Re-pinning is G-KFW9-14's act and is not taken here**; `.a` escalated exactly that decision to the
orchestrator at `SUBSTRATE-PIN.md` §8 with three named shapes, two of which ((a) and (c)) became
*available* at 16:20 where they were not at 16:14.

One dated **correction-beside** (E-3, `.a`'s bytes untouched): `CELL-ROSTER.md` §1 row 3 names this
cell's driver `safaridriver --use-simulator`; that flag does not exist in `safaridriver` 26.4. The
roster's cell *separation* is untouched and correct.
