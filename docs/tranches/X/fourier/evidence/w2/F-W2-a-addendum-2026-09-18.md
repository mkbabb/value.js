SERVED MODEL: claude-opus-5[1m]

# X.F.W2 unit `.a` — DATED ADDENDUM-BESIDE, 2026-09-18

**Authority**: the owner's begin-word 2026-09-17 (`docs/tranches/X/COHESION.md` §0j).
**Standing**: an **E-3 ADDENDUM-BESIDE**. It amends **nothing**. `docs/tranches/X/fourier/waves/F-W2.md`
(dated 2026-08-28, repair rounds 1–12), `docs/tranches/V/megatranche/audit/probes/fourier-value-import-drift.mjs`
and every adjudicated record are **IMMUTABLE and are not edited by this unit**. Where a figure below
diverges from a dated spec, the spec's bytes stand and **this file records the divergence beside them**.
**COHESION §0o's `ESC-4` is RULED — cited by id throughout, and never re-opened.**

**Substrate.** fourier `0cc9b00` on `m/w1-bump-migration`, worktree **0 dirty** ⟨cmd⟩
`git -C /Users/mkbabb/Programming/fourier-analysis status --porcelain | /usr/bin/wc -l` → `0`.
value.js `tranche-u`, `package.json` version **4.0.0**, built `dist/subpaths/`; fourier installs
`@mkbabb/value.js` **4.0.0**, `@mkbabb/glass-ui` `^8.0.0`, `@mkbabb/keyframes.js` `^6.0.0`.
Every figure below was **measured after all of this unit's edits had landed** and **reproduced on a
second run** (WRITE-THEN-MEASURE).

---

## §A — The drift probe, RE-GROUNDED (finding F-1's root cure)

**The dated probe is not patched, not silenced, not skipped and not allowlisted.** It is a true
reading of the pre-uplift tree and it keeps its bytes. At the uplifted tree it is stale in leg 1 and
**unrunnable** in leg 3 — ⟨cmd⟩ `node docs/tranches/V/megatranche/audit/probes/fourier-value-import-drift.mjs`
→ leg 1 prints five bare-root site coordinates the tree no longer holds, and leg 3 raises
`Error [ERR_MODULE_NOT_FOUND]: Cannot find module '/Users/mkbabb/Programming/fourier-analysis/web/node_modules/@mkbabb/value.js/dist/value.js'`,
because the installed pin is 4.0.0 and 4.0.0 publishes no `dist/value.js`.

The re-grounded probe is published **beside** it, dated, at
`docs/tranches/X/fourier/evidence/w2/fourier-value-import-drift-2026-09-18.mjs`. It asks the **same
three questions** and re-grounds each so that it **measures rather than asserts**:

| leg | the dated probe | the re-grounded probe | gate |
|---|---|---|---|
| 1 | five **frozen** site coordinates | the bare-root census is **walked** in the live tree; the enumeration IS the figure | G1 |
| 2 | `timingFunctions` absent at 4.0.0 | absent at the producer **and** 0 CODE references in the consumer (docblock prose excluded, and said so) | G2 |
| 3 | the **struck** 14/22 · 8/22 · max Δ 0.192 drift figure | **ESC-4's Δ = 0 sampler** over all 22 keys against the **published 0.13.0** baseline | G15 |

Two engineering facts, recorded so no successor re-derives them:

1. **The baseline is no longer resident.** fourier's `node_modules` holds 4.0.0, so the pre-bump
   function is not on disk anywhere. The probe therefore **obtains its own baseline** — it installs
   the **published** `@mkbabb/value.js@0.13.0` into `os.tmpdir()/value-js-0.13.0-baseline`, pinned to
   the exact version, once. A probe that cannot obtain its own baseline is the very defect F-1 names.
2. **The consumer catalogue is read through fourier's OWN toolchain** (its installed `esbuild`,
   resolved from `/Users/mkbabb/Programming/fourier-analysis/web/package.json`), never re-typed into
   the probe. **Neither tree is written**: the baseline and the bundle both land in `os.tmpdir()`,
   and ⟨cmd⟩ `git -C /Users/mkbabb/Programming/fourier-analysis status --porcelain | /usr/bin/wc -l`
   → `0` after three probe runs.

**Line 1 of the probe is `// SERVED MODEL: claude-opus-5[1m]`, a comment.** The receipts law asks for
that string on line 1; an executable that carries it bare does not parse, and an unrunnable probe is
the defect this file cures. The deviation is disclosed here rather than elided.

**Reading, double-run** — ⟨cmd⟩ `node docs/tranches/X/fourier/evidence/w2/fourier-value-import-drift-2026-09-18.mjs`
→ exit **1** both runs; captured to two files and ⟨cmd⟩ `diff` them → **EMPTY**.
**leg 1 ok · leg 2 ok · leg 3 RED (4/22)**.

---

## §B — G15: ESC-4's Δ = 0 sampler, run. **18 of 22 EXACTLY; 4 carry a ≤ 2-ULP producer residual**

### B.1 The gate's shape, and what supersedes what

`F-W2.md` §5's **G15** closes on *"a probe-pinned declared divergence row in the banked figures"* —
**14 of 22 drift analytic→CubicBezier, of which 8/22 are MATERIAL (max Δ 0.192)**. **That figure is
SUPERSEDED by COHESION §0o `ESC-4`**, which **refuses the drift outright**: *"**DRIFT REFUSED — no
acceptance, silent or explicit.** … **The gate is MPC-5's sampler re-run: every one of the 22 samples
EQUAL (Δ = 0 at every sample point) to the pre-bump 0.13.0 function under the same key**, so the hop
changes no motion; RD-5 RESTORE is thereby executed, not re-priced. No CubicBezier approximation is
admitted for any key."* ⟨cmd⟩ `/usr/bin/grep -o '\*\*DRIFT REFUSED — no acceptance, silent or explicit\.\*\*' /Users/mkbabb/Programming/value.js/docs/tranches/X/COHESION.md`
→ `**DRIFT REFUSED — no acceptance, silent or explicit.**`

**G15 is therefore read against Δ = 0 on all 22 keys, never against the struck 14/22.** The dated
spec's §5 G15 cell keeps its bytes; this is the note beside it.

### B.2 The measurement

Landed `EASING_PRESETS[k].fn` (fourier `web/src/lib/easings.ts`, bundled by fourier's own esbuild)
versus **published** `@mkbabb/value.js@0.13.0`'s `timingFunctions[k]`, **22 keys × 1001 samples** over
`[0, 1]`. Re-run at a **100001-sample** grid: the same four keys, the same four maxima, no fifth.

| arm | keys | reading |
|---|---|---|
| **corpus-in-file** (ESC-4's 14 orphans, defined inside `web/src/lib/easings.ts`) | 14 | **Δ = 0 at every sample point — BIT-IDENTICAL, all 14** |
| **producer-DIRECT**, exact | 4 | `linear` · `ease-in-out-sine` · `ease-out-expo` · `ease-in-out-circ` — **Δ = 0** |
| **producer-DIRECT**, residual | 4 | `ease-in-out-expo` **4.4409e-16** · `ease-in-out-quad` **1.1102e-16** · `ease-out-cubic` **1.1102e-16** · `ease-in-out-cubic` **1.1102e-16** |

**18 of 22 are exactly zero. The enumeration IS the figure.**

### B.3 What the four are, measured at both producers' bytes

They are **not** shape drift and **not** a CubicBezier approximation. They are the **same analytic
closed form, re-expressed by the producer between 0.13.0 and 4.0.0** — 0.13.0 ships the Penner
`(t /= .5)` forms, 4.0.0 the easings.net forms; the two are algebraically equal and differ only in
floating-point rounding, at **1–2 ULP at magnitude 1**. Read at the two dists:

| key | 0.13.0 | 4.0.0 |
|---|---|---|
| `ease-out-cubic` | `--e * e * e + 1` | `1 - (1 - e) ** 3` |
| `ease-in-out-quad` | `(e /= .5) < 1 ? .5*e*e : -.5*(--e*(e-2)-1)` | `e < .5 ? 2*e*e : 1 - (-2*e+2)**2/2` |
| `ease-in-out-cubic` | `(e /= .5) < 1 ? .5*e*e*e : .5*((e-=2)*e*e+2)` | `e < .5 ? 4*e**3 : 1 - (-2*e+2)**3/2` |
| `ease-in-out-expo` | `… (e /= .5) < 1 ? .5*2**(10*(e-1)) : .5*(2-2**(-10*--e))` | `… e < .5 ? 2**(20*e-10)/2 : (2-2**(-20*e+10))/2` |

Literal, runnable from any cwd, after one `npm i @mkbabb/value.js@0.13.0` into any scratch package
(the probe does exactly this into `os.tmpdir()/value-js-0.13.0-baseline`, whose entry is the
`OLD` path below) — ⟨cmd⟩ `OLD=$(node -p "require('node:os').tmpdir()")/value-js-0.13.0-baseline/node_modules/@mkbabb/value.js/dist/value.js; node -e "Promise.all([import(process.argv[1]),import('/Users/mkbabb/Programming/value.js/dist/subpaths/easing.js')]).then(([o,n])=>{for(const [k,v] of [['ease-in-out-quad',n.easeInOutQuad],['ease-out-cubic',n.easeOutCubic],['ease-in-out-cubic',n.easeInOutCubic],['ease-in-out-expo',n.easeInOutExpo]]){console.log(k);console.log(' 0.13.0:',String(o.timingFunctions[k]).replace(/\s+/g,' '));console.log(' 4.0.0 :',String(v).replace(/\s+/g,' '))}})" "$OLD"`
→ the eight bodies tabulated above. *(This is the file's ONE shell variable, defined in the command
that consumes it, which is the form R4-2.3 requires; every other ⟨cmd⟩ here consumes none.)*

**ESC-4's express prohibition is met at all 22**: no key resolves through a CubicBezier
approximation — the eight producer-DIRECT keys are analytic at both pins, and the fourteen orphans
are the corpus's own closed forms, bit-identical to 0.13.0.

### B.4 The reading this unit publishes, and why it is not laundered

**G15 is RED — an HONEST RED on 4 of 22 keys**, and the unit does not read it green.

- ESC-4's gate is literal: *"every one of the 22 samples EQUAL (Δ = 0 at every sample point)"*.
  Four keys are not equal. **A ruling this unit must cite and never re-open is not a ruling this
  unit may re-interpret to its own threshold.**
- The competing reading is on the record and is **not** adopted here: `F-W2.md` §3's **A1** banks
  this same residual as *"numerically identical to 0.13.0 (max|Δ| ≤ 4.44e-16 over 1001 samples) —
  the direct-symbol arm is a drift-free rename"*, i.e. the dated spec already treats **4.44e-16** as
  identity. **Adopting that reading is an owner/orchestrator act, not a seat's.**
- **No cure inside this unit's bounds closes it.** ESC-4 *prescribes the mechanism*: *"the 8
  survivors re-point to `@mkbabb/value.js/easing`"*. Defining those four in-file instead would make
  the sampler read zero **by contradicting the ruling that set the sampler** — the masking class,
  refused. The root cause is `value.js src/easing.ts`, which `F-W2.md` §1b puts **out of this wave's
  bounds** (*"does not edit any value.js `src/**`"*) and which belongs to **X-W9 / W.L6**.

**ESCALATION, raised not resolved.** Two dispositions are open and both are above this seat:
**(i)** read ESC-4's *"EQUAL"* at double precision and adopt A1's banked ≤ 4.44e-16 identity, which
turns G15 GREEN at these bytes with no byte moving; **(ii)** treat the re-expression as a producer
defect and route the analytic-form restoration to **X-W9 / W.L6** (value.js `src/easing.ts`), G15
staying RED until it lands. **This unit takes neither.** The measurement, both readings and the
prohibition-met finding are the whole of its contribution.

---

## §C — G1 · G2 · G16: the readings, and the credit this unit does not take

**G1 — GREEN, and GREEN BEFORE ITS CURE.** ⟨cmd⟩
`/usr/bin/grep -rn 'from "@mkbabb/value\.js"' /Users/mkbabb/Programming/fourier-analysis/web/src/ | /usr/bin/wc -l`
→ **0**. The re-grounded probe's leg 1 walks **129** source files and enumerates every value.js
import as subpath-keyed. **The five bare-root statements were retired inside F.W1's one atomic
transaction** (`538db90`), released to it by ESC-4's *"the six bare-root import lines"*.
**F.W2 claims none of that GREEN** (FR-GIG-5; §1b's own bar). The anti-rename lock holds:
`L/B-1 + C/B-1` is **F.W1's** identity, carried at F-W1 §2 WU-K's `L/B-1 + C/B-1` row — **cited
here, never re-minted**.

**G2 — GREEN.** Both prescribed ACT(1) symbols are absent at the target, so there was nothing to
transcribe: ⟨cmd⟩ (cwd `/Users/mkbabb/Programming/value.js`) `/usr/bin/grep -rn 'easingNames\|timingFunctions' src/ dist/`
→ no output. The consumer's mapping is **re-derived, not transcribed**, and this unit's evidence for
that is the **§B measurement, not a reading of the docblock**: all **14** keys the corpus defines
in-file reproduce their 0.13.0 function **bit-identically**, which a transcription of a
non-existent `easingNames()` mapping could not do. The gate's two RED inputs are measured **absent**:
there is **no `easing()` call** in the consumer (§D) and therefore **no `.value` unwrap and no issue
arm to swallow**; `getEasingFn`'s `?? EASING_PRESETS.linear.fn` is now a fallback over a **total**
map (`EASING_FNS` carries one entry per `EASING_LABELS` key), not the miss-swallow A2 warned of.
The record leg is unit `.c`'s (`RULINGS-F.W2.md` §4); **this is the cure-side reading only.**

**G16 — GREEN, and the catalogue is left UN-REARMED.** The producer-side instability reproduces —
⟨cmd⟩ `node -e "import('/Users/mkbabb/Programming/value.js/dist/subpaths/easing.js').then(m=>console.log(m.easing('ease-in-out').value === m.easing('ease-in-out').value))"`
→ **false**, a fresh closure per call, matching X-W9 `G23`. It **cannot reach the render path**:
⟨cmd⟩ `/usr/bin/grep -rnoE '[^a-zA-Z]easing\(' /Users/mkbabb/Programming/fourier-analysis/web/src/ | /usr/bin/wc -l`
→ **0** — the consumer makes **no `easing()` call at all**, and `EASING_PRESETS` is built **once** at
module scope by `Object.fromEntries` (`web/src/lib/easings.ts:186`). **This unit re-armed nothing**:
it wrote no `easing(name)` call, per-invocation or otherwise.

**G10 — DISCHARGED BY F.W1, re-stated and NOT re-closed.** The pin moved inside the atomic
transaction; the value.js-direct specifier arm never landed alone.

---

## §D — A3 / SC-4 / C-19: the cure, and its measured consequence

**Landed at fourier `0cc9b00`** — one commit, both halves, per §6a's same-commit rider law:

- `web/src/components/equation/composables/useCurveTransition.ts` — the hand-rolled
  `export function lerp(a, b, t) { return a + (b - a) * t; }` **deleted**.
- `web/src/components/equation/ConvergencePlot.vue` — `lerp` removed from the
  `./composables/useCurveTransition` named list and imported from **`@mkbabb/value.js/math`**.

**§2b item 7 is confirmed at the bytes and is the reason the two travel together**: there was **one**
declaration and **one** importer, and *"the re-point is mandatory or ConvergencePlot's import
breaks"*. Ten call sites in `ConvergencePlot.vue` consume it.

**The numeric consequence, measured and not glossed.** The producer's `lerp` is
`(1 - t) * start + t * end` (`src/foundation/math.ts:28`); the deleted one was `a + (b - a) * t`.
They are algebraically equal and differ at ULP — ⟨cmd⟩ `node -e "import('/Users/mkbabb/Programming/fourier-analysis/web/node_modules/@mkbabb/value.js/dist/subpaths/math.js').then(m=>{const L=m.lerp,H=(a,b,t)=>a+(b-a)*t,V=[-1e3,-3.7,-1,-0.25,0,0.25,1,3.7,1e3];let mx=0,n=0,tot=0;for(const a of V)for(const b of V)for(let i=0;i<=1000;i++){const t=i/1000;tot++;const d=Math.abs(L(a,b,t)-H(a,b,t));if(d!==0)n++;if(d>mx)mx=d}console.log('differ',n,'of',tot,'max',mx.toExponential(3));console.log('endpoint-exact',V.every(a=>V.every(b=>L(a,b,0)===a&&L(a,b,1)===b)))})"`
→ `differ 20864 of 81081 max 2.274e-13` · `endpoint-exact true`. **20864 of 81081 samples differ,
max |Δ| = 2.274e-13** at magnitude 1e3 (i.e. ~1 ULP), and the producer's form is **endpoint-exact**
(`lerp(a,b,0) === a`, `lerp(a,b,1) === b` on every pair). This is a 500 ms plot
transition; the shift is orders of magnitude below one device pixel. **It is recorded because it is
a change, not because it is visible.** ESC-4's Δ = 0 law governs the 22 **easing keys** and is
untouched by it — no easing key routes through this `lerp`.

**Gate witnesses at the landing**, double-run: ⟨cmd⟩ (cwd `/Users/mkbabb/Programming/fourier-analysis/web`)
`npx vue-tsc -b --force` → exit **1**, **18 diagnostics** — ⟨cmd⟩ (same cwd)
`npx vue-tsc -b --force 2>&1 | /usr/bin/grep -oE 'error TS[0-9]+' | sort | uniq -c` → **17 `TS6133`
⊕ 1 `TS6196`** — and ⟨cmd⟩ `npx vue-tsc -b --force 2>&1 | /usr/bin/grep -c 'error TS2307'` → **0**;
run twice into two files and ⟨cmd⟩ `diff` them → **EMPTY**. **That is byte-for-byte F.W1's banked close reading** (its §Close
G11 row: *"by code **17 `TS6133` ⊕ 1 `TS6196` = 18**"*, `TS2307` **0**): **zero diagnostics added,
zero removed**, and **none of the 18 names a file this unit touched**. ⟨cmd⟩ `npx vite build` →
exit **0**, `✓ built in 6.27s` — the new `@mkbabb/value.js/math` specifier resolves through vue-tsc
**and** vite.

---

## §E — Divergences recorded at the true bytes (D-19 / MEASURE-AT-OPEN; **INTENT**, never a patch)

1. **`F-W2.md` §2b item 7 — "one hand-rolled `lerp`" is TWO at HEAD.** ⟨cmd⟩
   `/usr/bin/grep -rn 'function lerp\|const lerp' /Users/mkbabb/Programming/fourier-analysis/web/src/components/ /Users/mkbabb/Programming/fourier-analysis/web/src/lib/`
   → `useCurveTransition.ts:85` (A3's target, **cured here**) and **`web/src/lib/easings.ts:49`**
   (`const lerp = (start, end, t) => (1 - t) * start + t * end` — the **de Casteljau step** inside the
   `cssCubicBezier` solver **F.W1 landed under ESC-4**). **The second is NOT cured and NOT touched.**
   A3's carry, §2a row 3 and §2b item 7 all name `useCurveTransition.ts:85` and nothing else; §2a
   row 1 gives `easings.ts` the specifier retirement and the `timingFunctions` re-derivation and no
   `lerp` cure. It is noted for **F.W3/F.W4/W.L6**, with the measurement that would matter to them:
   it is **formula-identical** to `@mkbabb/value.js/math`'s `lerp`, and `deCasteljau` is itself a
   published `./math` export — so the collapse is available, and it is **theirs to price**, not this
   unit's to improvise. **Improvising it inside ESC-4's zero-drift solver is precisely the act this
   unit refuses.**
2. **A1's specifier anchors.** The five bare-root coordinates are retired; at HEAD the value.js
   imports sit at `ConvergencePlot.vue:5` (`/easing`) ⊕ **`:6`** (`/math`, minted by this unit) ·
   `useCurveTransition.ts:8` · `harmonics.ts:5` · `colors.ts:20`, `:21` · **`easings.ts:26-35`**
   (ONE import block, not the two statements at `:9` and `:10-16`). **MISSED-F's costing correction
   is thereby discharged at the bytes** — the duplicated specifier is gone; F.W1 owns that, and
   **F.W2 claims none of it**.
3. **`easingNames` in the consumer is a NAME COINCIDENCE, not ACT(1)'s symbol.**
   ⟨cmd⟩ `/usr/bin/grep -rn 'easingNames' /Users/mkbabb/Programming/fourier-analysis/web/src/` →
   `MorphPhaseConfig.vue:41` and `:104`, where `const easingNames = EASING_PRESET_NAMES` is a local
   template binding over the corpus's own catalogue. It is **not** an import of value.js's
   prescribed `easingNames()`, which does not exist at 4.0.0. Recorded so that no successor's grep
   reads it as a transcription of the prescription.
4. **`harmonics.ts`'s `spectrumColor` is LOCKED and was not edited.** ⟨cmd⟩
   `/usr/bin/grep -n 'export function spectrumColor' /Users/mkbabb/Programming/fourier-analysis/web/src/components/equation/lib/harmonics.ts`
   → **`:81`** — the spec's anchor re-resolves exactly. Its fork collapse is **F.W3 `.d`**'s and its
   execution half **F.W4**'s (`M-β1`, one identity, original for life). `harmonics.ts`'s only other
   F.W2 business was its specifier, already `@mkbabb/value.js/easing` at `:5`.

---

## §F — Residuals carried out of unit `.a`

1. **G15's 4-key ULP residual** — escalated at **§B.4**, both dispositions named, neither taken.
   Its root cause is `value.js src/easing.ts`, **X-W9 / W.L6**'s surface.
2. **The producer's re-expression of four analytic easing forms between 0.13.0 and 4.0.0** is a
   **producer-side finding** with a consumer-visible measurement. It belongs on the value.js side of
   the **X·V / V·π** and **X-W9 / W.L6** edges (`F-W2.md` §6b), and — since `F-W2.md` §6b routes
   **X-W9 §Hard Gate's `G24`** as *"the drift gate … G15 is its consumer-side twin"* — **G24's
   producer-side owner should read §B before closing it.** The relay vehicle is unit **`.d`**'s
   letter and its append-only INBOX row; `INBOX.md` is **not** written by this unit.
3. **`easings.ts:49`'s second hand-rolled `lerp`** (§E.1) — noted for F.W3/F.W4/W.L6, uncured by
   design.
4. **The 18 `TS6133`/`TS6196` diagnostics** are **F.W0's honest-RED unused-symbol substrate**,
   several in files outside every F.W2 writable set. This unit added none and removed none; curing
   them is not a limb of this wave.
