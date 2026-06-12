# Lane X-KF-ITEMS — the keyframes.js tranche items, AUTHORED

**Fleet:** second N-tranche deep-audit (lanes2). **Phase:** tranche development only — docs-only;
the ONE sanctioned cross-repo write executed. **Date:** 2026-06-12. **Branch:**
`tranche-f-handoff` @ `199fd15` + 0.12.0 published.

**Deliverable (authored, uncommitted by design):**
`/Users/mkbabb/Programming/keyframes.js/docs/tranches/K/VALUEJS-N2-ASKS.md` — the value.js
0.12.0 inbound for kf, placed at K's tranche root beside `L-SEED.md`/`PATH-FORWARD.md` (the
F-era precedent for inbound ask docs is `kf/docs/tranches/F/valuejs-sota-handoff-v2.md` at the
tranche root; this follows it). NOT committed — the brief forbids it; the kf owner folds.

**Substrate consumed:** `lanes2/X-KF.md` (the overlap matrix), `impl/W7C.md` (the 0.12.0 cut),
`impl/W7A-recon.md` (per-item spec + GREEN verification), the user LEDGER (U8/U25/U27),
kf `K.md`/`PROGRESS.md`/`waves/{README,K.W1,K.W4}.md`/`L-SEED.md`, and live source greps on
BOTH trees (every file:line in the authored doc re-verified this session, not inherited).

---

## §1 — What the authored doc contains (5 sections, all brief items discharged)

1. **Census correction** (supersedes L-SEED §7's stale census): 0.12.0 published; M superseded
   by N; L's preface re-anchors on value.js `docs/tranches/N/PROGRESS.md`. Plus one fold the
   matrix missed: **PKG-9 (the parse-that realm split, kf `packaging-k.md`/DL-K34) is resolved
   upstream** — value.js now pins `^0.9.0` (`package.json:65`) matching kf's `^0.9.0`
   (`kf/package.json:178`).
2. **The re-pin + witness-flip slate** — 12 rows, each producer↔seam↔flip exact:
   - MCI-5 (the ONE live witness): `functionIdentityValue` (`src/units/utils.ts:71`) →
     kf `padToLength` (`kf/src/animation/utils.ts:316` `new ValueUnit(0)` — re-verified live);
     flips `interpolate-anything.test.ts:256` + removes the positive control `:271-277`.
     Wiring caution recorded: the pad site needs the absent function's NAME in scope.
   - E1/E2/VJ-3/B1/B2/B4 consume edges per `W7C.md` (cited as the brief required), with the
     E1 **contract deltas** no prior doc recorded: value.js `parseLinearStops` takes the FULL
     `linear(...)` string and THROWS on malformed (`src/parsing/easing.ts:78` via `tryParse`);
     kf's shim took the inner string and returned `undefined` (fall-through) and required ≥2
     stops — the consume motion must wrap or thread `OnParseError`.
   - F3→DL-K18, VJ-F1→DL-K21/FB-3, VJ-F2→DL-K17 (the "consume the VJ.W3 producer" arm now
     real), VJ-F4, and the RIPE-NOW trio (lerpArray KEPT, deltaEOK, reverseAnimationShorthand).
   - Re-pin disposition left as the kf owner's confirm-first call (charter-conservative L-wire
     vs opportunistic K.W1 ride) — K.W1's hard gate is glass-ui currency; the value.js rows are
     its "re-pin re-confirm" RECORD clause (`K.W1.md:550-556`), so the doc feeds, never forces.
3. **The does-NOT-flip ledger** (prevents kf chasing ghosts): SEAM-4 `rotate()`
   (`serialize-from-template.test.ts:143` stays `it.fails` — 0.12.0 did not ship it,
   `W7A-recon.md §14`); VJ.W1/VJ.W2 open (the L gates); VJ-9 totality partial; VJ-5 verify;
   F2b unshipped.
4. **The easing-editor hand-off** (U27/U8): donor trio named
   (`kf/demo/@/components/custom/{EasingEditor,EasingCurveCanvas,EasingSelect}.vue` +
   `easingGroups.ts` — paths verified); kf CEDES the component chassis (net-deletion on the
   glass-ui publish, K.W1 idiom), KEEPS spring/playback/`useDragCapture` (L-SEED §7 boundary
   law + the BA `BezierEditor` re-expression precedent), value.js KEEPS the curve math
   (`src/index.ts:226-238`). DESIGN-TOTALITY coordination: K.W4 touches the spring
   `KeyframesEditor` + the U-K16 1-item dropdown (`ChromeDock.vue:200`), NOT the easing canvas
   (verified by grep of `K.W4.md:462-463,590`) — no collision; one standing request that K.W2/W4
   restyles of the trio stay token-routed (extraction-cleanliness mid-hand-off). Tripwire named:
   "glass-ui publishes the easing primitive".
5. **K-planned value.js asks acknowledged**: K authors ZERO net-new VJ items (X-KF §3 confirmed);
   the L-SEED §7 ledger statused for L's re-anchor (VJ.W0 LANDED / VJ.W3 + VJ.W4 PARTIAL /
   VJ.W1 + VJ.W2 OPEN, recorded for value.js's post-N successor).

## §2 — The two opens X-KF left, now CLOSED by this lane

- **VJ-1 `cssLinearFromString` (X-KF §3.1 "BOOK-with-verify")** → **SATISFIED-BY-COMPOSITION.**
  `cssLinear(parseLinearStops(s))` is the string→fn path on two published barrel symbols
  (`src/index.ts:233,238`); no `cssLinearFromString` symbol exists or is owed. The EF-3 shim
  retirement proceeds on the composition.
- **VJ-2 ≡ VJ-F1? (X-KF §3.2 "verify")** → **YES for the sampler half, including orient**:
  `PathGeometry.sampleAtLength` returns point + tangent angle for `rotate: auto`
  (`src/transform/path.ts:478,508`, `PathSample.angle` `:29-31`). The MorphSVG SHAPE-interp
  product half remains kf's own L work, gated on nothing value.js-side.

## §3 — Discoveries beyond the brief (for the N re-divination)

- **kf's PROGRESS already names K.W1 as the value.js "re-pin re-confirm" site** for DL-K18/K20/
  K21 — X-KF §2.2's "K does NOT schedule a value.js re-pin in any wave" is right about WIRED
  consumes but under-reads the RECORD clause: K.W1 explicitly re-confirms the VJ targeting on
  publish ("born-RED-able the instant its primitive publishes", `PROGRESS.md` DL-K20). The
  authored doc is precisely the artifact that clause consumes — the handshake is tighter than
  the matrix suggested, and N owes nothing further.
- **DL-K17's fork resolves cheap now**: kf's diagnostics-channel decision was "author a kf
  channel (K.W0) OR consume the value.js VJ.W3 producer" — the producer shipped (VJ-F2), so the
  consume arm is strictly cheaper. Recorded in the doc; the call is kf's.
- **No value.js work was created or implied for N by this lane.** The constellation phasing
  stands: N shipped (0.12.0), K records, L wires. The only N-side easing obligation remains the
  already-charted N.W6.C gradient-pane upgrade, which gates on the glass-ui primitive the
  sibling X-GU item seeds — out of this lane's scope, cross-referenced in the doc's §4.

## §4 — Constraints honored

Docs-only (zero code edits, both trees); the kf write confined to the sanctioned
`docs/tranches/K/` path; nothing committed anywhere; no K wave added, none re-litigated, no
duplication of K's specs (the doc indexes K's own dispositions and fills only the inbound
census they await); LEAN per the proof-idiom-retired feedback. No browser work needed — this
lane is source/doc-mapping; no screenshots emitted.
