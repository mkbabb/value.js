# Historical audit — Tranche V core (V + V′ reformation), hostile seat

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model ID `claude-opus-5[1m]`, running as a
Claude Code subagent seat. Every command below was executed in
`/Users/mkbabb/Programming/value.js` at branch `tranche-u`, HEAD `c654824e`.

**Scope audited:** `docs/tranches/V/*.md` (ARCHITECTURE, DECISIONS D1–D59, CONSUMER-CUT, EVIDENCE,
PALETTE-CONTRACT, PROPORTION-AUDIT, SUBTRACTION, VISUAL-CONSTITUTION,
OPTICAL-BENCH-COMPOSITIONS, ATLAS-INBOUND), `docs/tranches/V/reformation/**` (V-PRIME,
CARRY-LEDGER, DISPOSITIONS, FORMATION-CLOSED, MAPPING, RETURN, `waves/W40..W56,WL`),
`docs/tranches/V/audit/**`. `vnext/` and `apotheosis/` deliberately NOT descended (other seats).

---

## 0. Headline

**V′ was chartered as the tranche that kills the disease riders. It killed 2½ of 8 and then wrote
the other 5½ into a carry ledger as `BUILD W##` rows — the exact act its own standing law L1
declares "the forbidden re-booking." Simultaneously its two cleanest "GREEN" closes (W43
structure, W51 export) shipped defects that no gate in the tranche can see: W43 silently broke the
e2e corpus and the dev-server font pipeline, and W51's byte-exact serializers have exactly one
consumer — a test file — while the product still exports through a legacy `try/catch`-swallowing
canvas path. And the tranche's own primary design authority, the proportion register defining
PR-17…PR-32, is UNTRACKED — absent from a fresh clone — while `EVIDENCE.md §6` states that a
cited artifact absent from `git ls-files` is not evidence.**

Ten of eighteen execution units never ran. Every one of them is now a row in
`reformation/CARRY-LEDGER.md §B`, i.e. the next tranche's opening debt.

---

## 1. Commitment ledger

### 1.1 The countable set

| Source | Commitments |
|---|---|
| `V-PRIME.md §2` execution units | 17 waves (W40–W56) + 1 lane (WL) = **18** |
| `V-PRIME.md §1` standing laws | L1–L8 = 8 |
| `V-PRIME.md §3` owner brackets | B1–B5 = 5 |
| `reformation/DISPOSITIONS.md §1` owner edicts | E1–E13 = 13 |
| `audit/REFORMATION-2026-07-16.md` finding families | RF-1…RF-29 = 29 (all 29 present; RF-14 out of numeric order at line 83) |
| `RF-26` disease riders | D-1, D-2, CH-3…CH-8 = 8 |
| `DECISIONS.md` | D1–D59 rulings + B-01…B-32 visual brackets + OF-1…OF-6/OF-ε1/ε2/NG-6/δ + 5 U-close packet rulings |
| Proportion register | PR-01…PR-35 = 35 |

The headline count used throughout: **18 execution units promised.**

### 1.2 Execution-unit status (verified against the tree, not against close prose)

| Unit | Close doc claim | AUDITED | Evidence |
|---|---|---|---|
| W40 Reconcile | CLOSED GREEN (D46/D47) | **LANDED-SCOPED** | `git ls-files '*CLAUDE.md'` → empty ✓ · `grep -c K_NEXT DECISIONS.md` → `0` ✓ · `git tag -l` shows both `v-perceived-space-plate-ref-w40` / `v-blob-b0-26-ref-w40`, both `git cat-file -t` = `tag` ✓ · `picker-color.ts` tracked at `demo/color-session/picker-color.ts` ✓. **But its headline gate ("fresh clone typechecks+tests green") was re-homed to W44 by D47.** |
| W41 Canon compression | CLOSED (D49) | **PARTIAL** | Archive + MAPPING + V-PRIME swap landed. **D49's own ancillary tracking duty half-failed:** the 5 top-level KEEP docs are tracked (`git ls-files docs/tranches/V/*.md` → 10 rows) but `docs/tranches/V/research/` is still untracked (`git ls-files docs/tranches/V/research/` → empty; `git check-ignore` exit 1 — never ignored, simply never added). See §3.1. |
| W42 Subtraction | CLOSED (D48/D56) | **LANDED** | All 8 meta tests + `oracle-slate-teeth.mjs` + `boot-smoke.mjs` + `css-emission-probe.mjs` absent ✓ · `git worktree list \| grep -c wf_` → `0` ✓ · `.release-working` absent, gitignored ✓ · `git ls-files docs/tranches/V/DESIGN-CAMPAIGN.md docs/tranches/V/design/` → 0 ✓ · `bench/` absent ✓ · `verify-packed-surface.mjs` present ✓ |
| W43 Structure settlement | CLOSED GREEN (D50–D53) | **PARTIAL + COLLATERAL BREAKS** | `test ! -d src/v4` ✓ · `find src -type d -empty` → ∅ ✓ · `find demo -type d -name panes` → ∅ ✓ · `demo/@` gone ✓. **But** the DOWN-METRIC row "css god modules 2 → 0" closed at **2 → 1** (`wc -l src/css/stylesheet.ts` = **899**) and D50(ii) ratifies it. Plus three uncaught collateral breaks — §2.1, §2.2, §2.3. |
| W44 Glass rail | CLOSED GREEN-WITH-RESIDUALS (D58/D59) | **LANDED** | `npx vitest run` → **25 files / 346 tests passed** (I ran it) · `npx vue-tsc -p tsconfig.demo.json --noEmit` → exit 0 · `npx eslint . --max-warnings=0` → exit 0 · glass-ui `7.0.0` from `https://registry.npmjs.org/...` in `package-lock.json:1278`, `grep -c 'file:' package-lock.json` → `0`, `readlink node_modules/@mkbabb/glass-ui` → not a symlink · `rg copyToClipboard` → 0 hits · all 5 RF-13 dead specifiers → 0 hits. **One evidence-law violation: §3.2.** |
| W45 Palette honest core | CLOSED GREEN (D55) | **LANDED** | `/restore` retired with typed-404 note (`api/src/modules/palette/routes/crud.ts:160-165`) · `rg contributor api/src` → 0 · `$regex` gone from color search · `api/src/modules/meta/__tests__/meta.test.ts:105` asserts `expect(specPairs).toEqual(mountedPairs)` (a real, failable gate) · readiness-degraded test at `meta.test.ts:68`. **Its own falsifier was waived — §4.1.** |
| W51 Palette export | CLOSED GREEN-PURE (D57) | **PARTIAL — SHIPPED-BUT-UNREACHABLE** | The 12-file `demo/palettes/export/` set exists and is byte-tested. **Its only consumer is `demo/test/export/byte-exact.test.ts`.** The product exports through the legacy path — §2.4. |
| WL Library evolution | CLOSED (D54) | **LANDED** | 8/8 rows ruled; both letters exist on disk (`keyframes.js/.../VALUEJS-INBOUND-2026-07-17-wl-verdicts.md`, `sci-report/atlas/.../2026-07-17-valuejs-wl-sci-verdicts.md`) ✓ |
| **W46 F0 Constitution** | — | **UNEXECUTED** | carried to `CARRY-LEDGER §B` |
| **W47 F1 Shell & scene** | — | **UNEXECUTED** | ditto |
| **W48 F2 Picker instrument** | — | **UNEXECUTED** | ditto |
| **W49 F3 Palette read** | — | **UNEXECUTED** | ditto |
| **W50 F4 Palette write** | — | **UNEXECUTED** | ditto |
| **W52 F6 Admin suite** | — | **UNEXECUTED** | ditto |
| **W53 F7 Workbenches** | — | **UNEXECUTED** | ditto |
| **W54 F8 Atmosphere & GPU** | — | **UNEXECUTED** | ditto |
| **W55 Adversarial close** | — | **UNEXECUTED** | ditto |
| **W56 Release + canon** | — | **UNEXECUTED** | `reformation/TRANCHE-CLOSED.md` does not exist — V′ is not closed |

**Score: 18 promised · 5 landed clean (W40 scoped, W42, W44, W45, WL) · 3 partial (W41, W43, W51)
· 10 never started.**

`reformation/FORMATION-CLOSED.md:16-17` names `reformation/TRANCHE-CLOSED.md` as the cron-teardown
sentinel written at W56. `ls docs/tranches/V/reformation/` shows no such file. **V′ has no close
document. Its "closes" are eight per-wave D-rulings inside `DECISIONS.md` and one carry ledger.**

---

## 2. Close-class lies found

### 2.1 GREEN-OVER-BROKEN — W43 killed `demo/@` and silently broke the e2e corpus

`RF-29` (the formation's own fresh adversary) explicitly CLEARED e2e:

> `audit/REFORMATION-2026-07-16.md:87` — "CLEANS: … **e2e NOT source-broken by the v4 cut**"

W43 then deleted `demo/@` (`a61094e3 feat(v-w43b3)!: home the feature UI trees; demo/@ dies`).
Two e2e fixtures import through the deleted path:

```
e2e/smoke/fixtures/browse-palettes.ts:19:import type { Palette } from "../../../demo/@/lib/palette/types";
e2e/smoke/admin/fixtures/admin-populated.ts:28:} from "../../../../demo/@/lib/palette/types";
```

`ls demo/@/lib/palette/types.ts` → *No such file or directory*. Plus 8 further stale `demo/@`
citations across `e2e/` (incl. a runtime path string at
`e2e/smoke/oracles/o10d-display-voice-census.spec.ts:456`).

**Why no gate saw it:** `tsconfig.demo.json` include is `["demo/", "src/vite-env.d.ts"]`;
`tsconfig.lib.json` enumerates only `src/` subsets; `tsconfig.json` references only those two
leaves. `e2e/` is in **no** TypeScript program. `.github/workflows/ci.yml` has exactly two jobs
(`producer`, `api`) and **no Playwright step**. So 83 files / 13,333 lines of e2e are
typecheck-invisible and CI-invisible.

**This is RF-3's original defect, still live and now worse.** RF-3 said the lean ci.yml "silently
dropped … ALL e2e (83 files/11,708 L) … from any gating"; bracket B3 routed the e2e re-gate to
**W55** — which never ran. The corpus V promised to prune and re-gate is now also broken.

### 2.2 GREEN-OVER-BROKEN — W43 killed the font-deferral plugin's transform; dev renders in fallback faces

`plugins/vite-defer-glass-fonts.ts:72`:

```js
if (!id.includes("demo/@/styles/style.css") || !code.includes(MARKER)) {
    return null;
}
```

`git log --oneline -- plugins/vite-defer-glass-fonts.ts` → one commit, `7c3c5970` (tranche S).
`git log --oneline --diff-filter=D -- 'demo/@/styles/style.css'` → `0d1d49fe feat(v-w43b)!: split
style.css 1043L → foundation.css + shell.css`. The marker now lives at
`demo/styles/foundation.css:75` (`/*__GLASS_FONTS_DEFERRED__*/`). The guard can never match.

Consequence, per the demo's own canon (`demo/DESIGN.md:33-35`):

> "Real faces load from the corpus import (`@import "@mkbabb/glass-ui/styles/fonts"` — **without it
> only the metric fallback ships and the body paints system-ui**)."

`rg 'styles/fonts' demo/` → **zero hits**. In `serve` mode the `@import` is never re-inserted, so
the dev server renders Plus Jakarta Sans / Fira Code in fallback faces. `renderStart` and
`transformIndexHtml` are gated only on `isBuild`, so the **production** build still ships the real
corpus. Dev and prod therefore render in different typefaces.

**Why this matters to the next tranche:** D58 declared the dev-server witness "the spec's canonical
environment," and W46's entire deliverable is a **closed type role matrix** with `1/√φ` clamps and
`±0.5 CSS px` line-box tolerances, measured Browser-first. Those measurements would be taken in the
wrong faces.

Same file family, same wave: `demo/styles/foundation.css:29-31` still cites
`scripts/ci/css-emission-probe.mjs` as the live guard that "fails loud instead of shipping a blank
desktop" — bracket B4 deleted that probe at W42 (`ls scripts/ci/` → only
`verify-packed-surface.mjs`). Live source comment asserting a guard that no longer exists.

### 2.3 PARTIAL COUNTED AS DONE + SILENT DROP — the css god module

`W43.md:126` DOWN-METRIC row: `css god modules (stylesheet.ts, grammar.ts) | 2 | 0 |` verification
`no split-target module exceeds the god threshold`.

Actual: `wc -l src/css/*.ts` → `stylesheet.ts` **899**, `grammar.ts` 483. D50(ii) ratifies "the css
god-module row closes **2→1**". By the wave's own naming, 658 lines (`grammar.ts` before the split)
qualified as a god module; 899 does not stop qualifying because the residual is "the CORE
DECLARATION PARSER."

**The silent drop:** `rg -in 'god|stylesheet|899' docs/tranches/V/reformation/CARRY-LEDGER.md` →
**zero hits.** The fold source the next formation "consumes WHOLE" has no row for the surviving god
module. §A simply reads "W43 (D50–D53; CH-3 terminal; census 0)". A reader of the carry ledger
alone would believe the metric closed at 0.

### 2.4 PER-MECHANISM GREEN OVER GESTALT BROKEN — W51 shipped an export nobody reaches

D57: "**W51 CLOSED GREEN-PURE** … five byte-exact serializers land at `demo/palettes/export/` …
ALL 30 rows (6 fixtures × 5 formats) byte-identical across Node/Chromium 148/Firefox 150/WebKit
26.4."

`rg -ln 'export/serializers' demo/` returns exactly one file:
**`demo/test/export/byte-exact.test.ts`**.

The product's export path is untouched:

```
demo/palettes/BrowsePane.vue:198:import { usePaletteExport } from "./usePaletteExport";
demo/palettes/PalettesPane.vue:152:import { usePaletteExport } from "./usePaletteExport";
```

`demo/palettes/usePaletteExport.ts` in full:

```ts
async function onExport(palette: Palette, format: string) {
    try {
        switch (format) {
            case "json": downloadExport(exportAsJSON(palette)); break;
            ...
            case "png": downloadExport(await exportAsPNG(palette)); break;
        }
    } catch (e) {
        console.warn("Export failed:", e);
    }
}
```

Three distinct violations in one 25-line file:

1. **Masked fallback.** Every export failure is swallowed to `console.warn`. `DECISIONS.md` D6
   ("Throw/null/status+value/stringization/substitute-color paths die") and PR-08's durable
   persistent status are both contradicted by shipping code.
2. **Byte contract false of the product.** `exportAsJSON` emits `JSON.stringify(data, null, 2)`;
   W51's contract is RFC 8785 + trailing LF. `exportAsCSSCustomProperties` emits
   `--palette-<slug>-<i>`; the contract is positional tokens with one shared fixed-point OKLCH
   spelling. D33 ("JSON/CSS/Tailwind/SVG/PNG follow `PALETTE-EXPORT-CONTRACT.md` byte-for-byte") is
   false of every byte a user can download.
3. **Canvas PNG — explicitly forbidden.** `exportAsPNG` rasterises SVG through
   `document.createElement("canvas")` + `canvas.toBlob(...)`. D33: "PNG uses the authored
   deterministic profile/encoder. **Library/canvas defaults are not alternate serializers.**"

D57 does disclose the retirement rides W50 — but `CARRY-LEDGER §A` lists `W51 GREEN-PURE (D57)`
under "**Executed and CLOSED (the head; context, not carry)**", and `V-PRIME §2`'s W51 row promises
"Prepare→Download reload identity," which never landed. A wave whose product half is deferred is
not in the head.

### 2.5 THE RE-BOOKING — L1 forbids exactly what CARRY-LEDGER §B does

`V-PRIME.md:31-35`, standing law **L1**:

> "The eight disease riders (aurora-derive D-1, blob D-2, colocation CH-3, Q14-LCP CH-4, glass
> adoption CH-5, scene transitions CH-6, real-GPU CH-7, palette truth CH-8) may not be
> re-chartered, re-amended, or re-decided. Their next legitimate state is a RUNNING wave with
> product-green Browser evidence. **A further "BUILD W##" row for any of them is the forbidden
> re-booking.**"

Rider outcome at HEAD:

| Rider | Owning wave | State | Verdict |
|---|---|---|---|
| CH-3 colocation | W43 | RAN | **KILLED** (with the 899-line residual, §2.3) |
| CH-5 glass adoption | W44 | RAN | **KILLED** |
| CH-8 palette truth | W45 (api) + W50 (UI) | api ran; UI never | **HALF-KILLED** — and the api half has *no* Browser evidence, which L1 demands |
| CH-6 scene transitions | W46 seed / W47 run | never ran | **RE-BOOKED** → `CARRY-LEDGER §B` W47 row |
| CH-4 Q14 LCP | W55 | never ran | **RE-BOOKED** → §B W55 row |
| CH-7 real-GPU oracle | W55 | never ran | **RE-BOOKED** → §B W55 row |
| D-1 aurora-derive | W54 | never ran | **RE-BOOKED** → §B W54 row |
| D-2 blob-extirpation | W54 | never ran | **RE-BOOKED** → §B W54 row |

`CARRY-LEDGER.md §B` is titled "The unexecuted V′ wave tail" and its rows read verbatim
"**D-1 aurora-derive RUNS or V′ does not close** (L1)" (§B W54) and "**CH-4: p75 LCP ≤2.5s … or V′
does not close**" (§B W55). Those are BUILD W## rows for riders, written into a fold-forward ledger
whose header says "The next formation consumes this file WHOLE." The document performs the
re-booking while citing the law that forbids it. **2½ of 8 riders died; 5½ rode into tranche W.**

Chronic depth (measured, `rg -c` per tranche dir):

- **aurora-derive / derive-from-color** appears in D(20) E(12) F(5) G(7) H(4) J(2) K(66) M(4)
  N(18) R(3) S(17) T(4) U(1) V(26) — **14 tranche directories**. `docs/tranches/K/K.md:16` already
  called it "deferred A→B→D→E→F→G→H→I→J (7+ tranches)" *in June*. `docs/tranches/D/FINAL.md:186`
  routed it out of D. V is close **#8+**; W will be #9+.
- **blob-extirpation** appears in D(27) E(15) F(9) G(19) H(5) K(28) M(10) N(42) R(3) S(3) T(3)
  V(33) — **12 tranche directories**.
- **Q14 LCP** — T(257) U(89) V(36). Born in T as "RULED ESCALATION", routed to U.W-PERF, routed to
  V W28/W29/W31, re-consolidated to W55, now to tranche W. **4th close.**

### 2.6 ALIAS SMUGGLING — a clean break that still declares the retired subpaths

D3: "The broad `@mkbabb/value.js` root export is removed. Sole entries are `/color`, `/value`,
`/css`, `/easing`, `/math`, `/transform`, `/quantize`. **Old `/units` and `/parsing` names receive
no alias.**"

`tsconfig.demo.json:38-51` still declares TypeScript path mappings for the removed names:

```
"@mkbabb/value.js": ["./dist/index.d.ts"],
"@mkbabb/value.js/parsing": ["./dist/subpaths/parsing.d.ts"],
"@mkbabb/value.js/units": ["./dist/subpaths/units.d.ts"],
```

…and declares **no** mapping for the two NEW public subpaths `/value` and `/css`. `ls dist/` shows
no `index.d.ts`; `ls dist/subpaths/` shows no `parsing.*` or `units.*`. So the mappings are inert
today — but the comment above them asserts "the 7 subpath barrels … the `exports` map is a CLOSED
8-key set," which is false of the actual 7-key map in `package.json`.

**Mitigating (credit where due):** `scripts/ci/verify-packed-surface.mjs:120-132` positively
asserts that `@mkbabb/value.js`, `.../parsing` and `.../units` each throw
`ERR_PACKAGE_PATH_NOT_EXPORTED`. That is a genuine, failable anti-alias gate. The smuggling is at
the typecheck layer only, and it is stale config rather than a live escape hatch — but it is
exactly the class of drift D3 forbids, sitting in the file W43 rewrote.

### 2.7 MASKED FALLBACK — the prepaint boot swallows corrupt ground records with no diagnostic

`demo/color-picker/index.html:186-194`:

```js
try { ...validate persisted stops... }
catch (e) { /* malformed record → the constants */ }
```

D21 requires the boot to "record **diagnostics** without mutating corrupt input." Nothing is
recorded. W54 owns the replacement (SeedToken), but W54's own completion-evidence list requires
only that `groundRecordInject`/`__GROUND_*__` be *absent* — it never requires the diagnostic D21
promised. The commitment is drifting out of existence between canon and spec.

---

## 3. Declared captures missing on disk

### 3.1 THE BIG ONE — the proportion register (PR-17…PR-32) is untracked

`PROPORTION-AUDIT.md:25`:

> "Formation writes `docs/tranches/V/research/proportion-register.md`; it is **the exhaustive
> terminal disposition and ownership authority** before execution."

`V-PRIME.md:50-51` (law L6): "A value.js design-system project is created at W46-open; **the visual
constitution and proportion register are its source**."

Verification:

```
$ git ls-files docs/tranches/V/research/
(empty)
$ git check-ignore -v docs/tranches/V/research/proportion-register.md ; echo exit=$?
exit=1                     # not ignored — simply never added
$ rg -o 'PR-[0-9]+' docs/tranches/V/PROPORTION-AUDIT.md | sort -u | wc -l
17                         # PR-01..PR-16 + PR-35 only
$ rg -o 'PR-[0-9]+' docs/tranches/V/research/proportion-register.md | sort -u | wc -l
35                         # PR-01..PR-35
$ for n in 17 18 19 20 21 24 29 30 31 32; do git grep -l "PR-$n\b" -- docs/tranches/V | grep -v research; done
(no output for any)
```

**PR-17, PR-18, PR-19, PR-20, PR-21, PR-24, PR-29, PR-30, PR-31, PR-32 exist in exactly one file,
and that file is not in the repository.** PR-22/23/25/26/27/28/33/34 are likewise defined only
there (33/34/35 have passing mentions in OPTICAL-BENCH-COMPOSITIONS/EVIDENCE but not their
definitions).

Waves that discharge rows defined only in the untracked file: W46 ("Implement the binding
**PR-33/34/35 inset matrix**"), W48 (`PR-01/02/03/13/15(seed)/23`), W49 (`PR-07(read)/22/26/27`),
W50 (`PR-06/08/25/28`), W52 (`PR-11`), W53 (`PR-09`), W54 (`PR-10`).

`EVIDENCE.md:75` — the tranche's own clean-checkout rule:

> "**A cited artifact absent from `git ls-files` is not evidence.**"

Two more tracked documents name untracked files as terminal authority:

- `DECISIONS.md` D34: "`research/auth-cookie-order.md` **is the terminal ruling**."
- `ARCHITECTURE.md:867`: "`research/auth-cookie-order.md` explicitly limits settlement to the
  origin/edge boundary…"

`CARRY-LEDGER §C` books this as a mild housekeeping row — "D49 residue: `research/{STANDARDS,
auth-cookie-order,proportion-register}.md` remain live-untracked (W41 deviation 4) — the next
formation rules track-or-archive." **That framing is wrong by an order of magnitude.** This is not
residue; it is the load-bearing design authority for nine unexecuted waves and the terminal ruling
of a numbered decision, sitting outside version control on one machine.

### 3.2 W44's HeaderRibbon evidence is untracked by design

W44 completion evidence: "HeaderRibbon persistent-only rows updated at every enumerated
canon/manifest site." The only remaining live site (W44.md:122-124) is
`audit/rehearsal/w17/glass-7.0.0/manifest.json:130`. That line exists on disk and reads
`"headerRibbonMode": "persistent-only (Glass 7)…"`. But:

```
$ git ls-files docs/tranches/V/audit/
docs/tranches/V/audit/REFORMATION-2026-07-16.md
```

**One tracked file in the entire audit directory.** `POST-U-AUDIT.md` (the audit that founded V's
whole product thesis), `audit/bootstrap/w7/value4-exact-seven/manifest.json`, and
`audit/rehearsal/w17/{glass-7.0.0,keyframes-6.0.0}/manifest.json` are all untracked. D58(iii)
declares the manifest edit "deliberately UNCOMMITTED."

So W44's close bullet is satisfied by an artifact that `EVIDENCE.md:75` disqualifies. The escape
hatch is `DECISIONS.md` D42, which weakens the law by one preposition:

> D42: "The corrected bootstrap handoff is transport evidence **only when its durable manifest
> exists on disk**."

`on disk` ≠ `git ls-files`. D42 is the alias that smuggles untracked artifacts back into the
evidence class. **Recommend tranche W collapse D42 into EVIDENCE §6 and re-verify every manifest
citation.**

### 3.3 Captures that DO exist (checked, credit due)

- Both W40 preservation tags are real annotated tag objects. `git ls-tree -r
  v-blob-b0-26-ref-w40` contains `demo/@/components/custom/color-picker/visual/HeroBlob.vue` whose
  line 206 reads `bodyRadius: 0.26`; the current tree reads `bodyRadius: 0.325` at
  `demo/picker/visual/HeroBlob.vue:162`. `v-perceived-space-plate-ref-w40` contains all three named
  files (`PerceivedSpacePlate.vue`, `envelopePlatePaint.ts`, `usePerceivedRamp.ts`), none of which
  exist in the working tree. The B1 preservation mechanism is sound.
- All five declared coordination letters exist at their named cross-repo paths (glass reformation
  ACK, glass O-6 three-marks, atlas O-3, atlas O-5, keyframes O-2, keyframes O-4). Verified by
  `[ -f ]` against `../glass-ui`, `../sci-report/atlas`, `../keyframes.js`. **No missing mail.**
- W48's spec explicitly refuses the phantom: "**Not** the nonexistent
  `pi/w17/p047-producer-baseline/manifest.json`." RF-28 caught that phantom gate during formation.
  That is real anti-partial machinery working.

---

## 4. Vacuous gates

### 4.1 Bracket B3's re-gates — two of three falsifiers explicitly waived, the third never built

Bracket B3 is the sign-off that ratifies the **1607 → 346 unit-test collapse** (RF-29 B9). RETURN.md
§2: "RF-29 B9 (1607→345) ratified as the v4-cut consequence **guarded by this set**." The set:

| Re-gate | Wave | Spec's own falsifier | What actually happened |
|---|---|---|---|
| demo typecheck | W42 | `W42.md:86` — "the CI run **fails** on a demo type error introduced on a scratch branch (prove once, revert)" | D48 landed the step `continue-on-error: true`. **A soft step cannot fail the run — the falsifier is unsatisfiable by construction.** W44 flipped it hard (`ef57230b`), but nobody ever ran the scratch-branch red. |
| api tests | W45 | `W45.md:99` — "the CI run **fails** on an api test broken on a scratch branch (prove once, revert)" | D55(iv): the gates "get their live proof VIA THE BRANCH PUSH … **superseding the scratch-branch-red rehearsal**." A green push is not proof a gate can go red. |
| journeys + e2e prune | W55 | — | **Never executed.** And the corpus it would gate is broken (§2.1). |

**Verdict: the guard justifying the largest coverage loss in the tranche consists of two gates
whose "can it fail?" test was waived and one that does not exist.** The two that landed are now
genuinely hard (`.github/workflows/ci.yml:32-37` runs `vue-tsc -p tsconfig.demo.json` and `npm test`
with no `continue-on-error`), so they *can* fail — but that was established by inspection, never by
demonstration, and the tranche's own spec demanded demonstration.

### 4.2 W48's Blob gate — the wave constructs its own before-frame and its target is pre-published

`W48.md:196-203`: the `.26` before-packet is "a **captured `.26` reconstruction**" built by
"applying the tag's config values onto the buildable post-W44 tree." The after-target is
`0.660192…0.660415` — already printed in `DECISIONS.md` B-05 and `EVIDENCE.md §4` before any
measurement exists.

**What input makes this RED?** The measuring wave authors the baseline, chooses the reconstruction
method, and knows the expected answer to six significant figures. The spec's one honest guard —
"Record in the manifest the pipeline-independence argument … **state it, don't assume it**" —
demands a *prose argument*, not a measurement. A prose argument cannot fail.

**Not fully vacuous** (the WebGPU-vs-WebGL2 alpha-area delta and the 0px chassis/seat/footprint
rows are genuinely falsifiable), but the headline ratio row is self-certifying. Tranche W should
require the `.26` reconstruction to be committed as a fixture **before** the after-frame is
rendered, with its own hash, and reviewed by a non-author.

### 4.3 W46's "override count = 0" — grep-shaped, therefore evadable, but not vacuous

`W46.md:56-63` reduces every later wave's chrome obligation to "consumes the W46 fixture; local
override/copy/definition count = 0." A local `--card-pad-*` or a duplicated divider "reopens **this**
fixture, not the feature wave." That is a good design. But the count is over an unnamed search: no
command, no file glob, no token list. **Failing input exists** (add a `--card-pad-x` to a feature
stylesheet) — so it is not vacuous — but it is unreproducible between auditors. Tranche W should
pin the exact grep.

### 4.4 W55's CH-4 gate — falsifiable but likely unexecutable, which is how it dies again

`W55.md:44-48` requires **exactly 1,440 loads** across "H-D (MacBook Pro `Mac17,7`, 1440/120Hz) and
**H-M (physical Pixel 7, 390/60Hz)**", plus a separate 54-witness boot matrix. This gate is sharply
falsifiable — and it names physical hardware an agent seat cannot drive. **Q14 has now been
specified into a form that guarantees deferral for a fourth close.** The honest options for tranche
W are (a) owner runs the device matrix, or (b) the gate is renegotiated to a reproducible
lab-emulation form with a stated confidence loss. Silently carrying it a fifth time is the disease.

### 4.5 W41's own gate is unauditable after the fact

`V-PRIME §2` W41 gate: "a fresh reader executes any wave from its file + ≤2 refs (**sampled ×3 by a
non-author**)." No artifact records who sampled, which three waves, or what they found. D49
adjudicates only the byte-size clause. **UNVERIFIED — and unverifiable now.** What would have
verified it: three named sample records under `audit/`, tracked.

And the L3 promise it certifies is already broken in practice: `EVIDENCE.md` — a named ≤2-ref for
W46/W48/W49/W51/W53/W54/W55/W56 — still speaks the **old** wave-ID coordinate space (`rg -o 'W(1[7-9]|2[0-9]|3[0-3])'
docs/tranches/V/EVIDENCE.md` → W31×9, W32×8, W20×4, W17×4, W33×3, plus W18/19/22/24/25/26/27/28/29/30).
`EVIDENCE.md §5` freezes `audit/pi/**w31**/interaction-manifest.json` while `W55.md:43` freezes
`audit/pi/**w55**/interaction-manifest.json`. Reconciling requires `reformation/MAPPING.md` — a
**third** document. L3's "file + ≤2 named references" does not hold for any wave that cites
EVIDENCE.md.

### 4.6 Gates that are genuinely good — record them so tranche W keeps them

- `scripts/ci/verify-packed-surface.mjs` — asserts exact export-name sets per entry AND that the
  root/`parsing`/`units` specifiers throw `ERR_PACKAGE_PATH_NOT_EXPORTED`. Real teeth. RF-7's
  protection of it was correct.
- `api/src/modules/meta/__tests__/meta.test.ts:105` — `expect(specPairs).toEqual(mountedPairs)`.
  OpenAPI drift becomes structurally impossible. This is the best gate in the tranche.
- W43 deliberately relocated `PaneSegmentedControl` **alive** to `demo/shell/` (spec: "W43 must NOT
  delete it or that gate becomes unfailable"). Verified live with a real consumer at
  `demo/shell/dock/Dock.vue:15,198`. **That is anti-vacuous engineering done on purpose.** Keep the
  idiom.
- W56's "A genuine external deploy/webhook blocker leaves W56 **BLOCKED** with exact evidence —
  recording it is not completion."

---

## 5. Are the unexecuted specs still correct against the CURRENT tree?

Re-resolved every `Current RED` anchor in `waves/W46-W48.md`, `W49-W52.md`, `W53-W54.md`,
`W55-W56.md`:

| Spec | Anchor | Status |
|---|---|---|
| W46 | `ColorNutritionLabel.vue` (Alert, empty Tooltip, 7 dividers) | **VALID** — file at `demo/scenes/about/ColorNutritionLabel.vue` |
| **W47** | "`demo/@/router/index.ts` is a stub router; line 19 `const Stub`; lines 22–35 register nine member routes; line 37 catch-all" | **PATH STALE, SUBSTANCE VALID.** File is now `demo/color-picker/router/index.ts`; `const Stub = { render: () => null }` at **line 19**, 9 member + 5 admin routes at **21–34**, catch-all at **36**. `/about` and `/easing` still absent. Fix the path, keep the finding. |
| W47 | `PaneSegmentedControl` 1→0 | **VALID and failable** — alive at `demo/shell/PaneSegmentedControl.vue`, consumed by `demo/shell/dock/Dock.vue` |
| W47 rider (D53.iv) | VIEW_MANAGER_KEY ×2, `ViewId`, `resolveCalibratedAtmosphere` | **VALID** — `demo/picker/ColorPicker.vue:130,197`, `demo/color-picker/App.vue:185,275`, `demo/color-picker/composables/boot/useAtmosphere.ts:32` |
| W48 | `SpectrumCanvas.vue:8` `role="img"` | **VALID, EXACT** — `demo/picker/controls/SpectrumCanvas/SpectrumCanvas.vue:8` |
| W48 | `ConsoleRail.vue:13` `role="tablist"`, no tabpanel | **VALID, EXACT** — `demo/picker/controls/ComponentSliders/ConsoleRail.vue:13,29,30`; no `role="tabpanel"`/`aria-controls` anywhere in the file |
| W48 | `seat.css:88` `.title-row` Blob-derived minimum | **VALID ±1** — `demo/picker/seat.css:87` |
| W48 | `contenteditable` headline survives | **VALID** — present in `ColorComponentDisplay.vue` and `GradientCodeEditor.vue` |
| W48 | `.325` already committed | **VALID** — `demo/picker/visual/HeroBlob.vue:162` |
| **W49** | "Color search uses a **regex fallback** rather than the bounded prefix contract (V-A158/RF-24)" | **STALE — ALREADY CURED.** W45 `a714b90f` retired the `$text`/`$regex` rail; `rg '\$regex' api/src/modules/color/` → 0. W49 lists a RED that W45 fixed, then re-asserts it in its own completion evidence ("regex fallback absent"), which now passes trivially. **Delete the row or re-scope it to the client.** |
| W50 | dialogs use retired wrappers | **PARTLY STALE** — W44 already migrated `/confirm-dialog`→`dialog` at all sites (`rg 'glass-ui/confirm-dialog'` → 0) |
| W51 | "no byte-exact five-format serializer set" | **STALE** — landed at W51/D57. The **live** RED is the opposite: the byte-exact set exists and is unreachable (§2.4) |
| W53 | gamut overlay + ink-walk absence verification | **VALID** — `PerceivedSpacePlate`/`envelopePlatePaint`/`usePerceivedRamp` all 0 hits in the tree; only tag-resident |
| W54 | `vite.config.ts:157 groundRecordInject`, registered at :170 | **VALID ±7** — actual `vite.config.ts:150` and `:163` |
| W54 | `index.html:102–106` `__GROUND_LIGHT_*__` | **VALID, EXACT** — `demo/color-picker/index.html:102-106` |
| W55 | "initial JS ≈342KiB gzip, mobile LCP ≈4.9–5.1s" | **UNVERIFIED** — no measurement since T. The number is 3 tranches old and predates the v4 cut, the Glass 7 adoption and the alias death. Re-baseline before gating. |

**Net:** the frontend specs held up far better than expected across W43's restructure — line anchors
in `demo/picker/**` survived nearly exactly. Three concrete stalenesses to fix before execution:
**W47's router path**, **W49's regex RED**, **W51's inverted RED**. Plus `W55`'s three-tranche-old
performance baseline. `ARCHITECTURE.md:944` also still excludes "the vendored `demo/@/components/ui/`
shadcn-vue tree" — now `demo/ui/`.

**Bonus canon falsification:** `ARCHITECTURE.md:943-944` — "**No god modules**: every `demo/` file …
stays ≤ 400 LoC." Violated today by 5 files: `demo/test/export/byte-exact.test.ts` (453),
`demo/color-picker/App.vue` (417), `demo/picker/ColorPicker.vue` (414),
`demo/scenes/about/markdown/Markdown.vue` (408),
`demo/color-picker/composables/boot/useAtmosphere.ts` (406) — plus `src/css/stylesheet.ts` at 899.
δ makes the 500-line ceiling "review signal only, never CI," so nothing catches it; the canon
asserts a property the tree does not have.

---

## 6. New deferrals V′ *created* (debt it added, not inherited)

These are not in RF-1…RF-29 — V′ minted them:

| ID | What | Where booked | Status |
|---|---|---|---|
| NV-1 | **SCI-1 `mixColorsInto`/`toRgba8Into` 4.1.x cut** — D54's sole SHIP verdict, "un-dated, execution-gated, evidence tuple **owed to atlas** at the cut" | `CARRY-LEDGER §B` W56 row | Un-dated obligation to an external repo, with no wave that implements it (W56 only *chooses the version*) |
| NV-2 | **`__Host-value-session` cookie transition** — D55(iii) routed the PALETTE-CONTRACT §2 transition out of W45 to W50 | `CARRY-LEDGER §B` W50 row | Un-run. Spans api+client. |
| NV-3 | **non-UUIDv7 idempotency-key retirement** — D55(iii): "not hard-rejected (7 green conformance tests + the live demo client depend on them)" | §B W50 row | Un-run. Note the shape: tests were written *around* the un-retired behavior. |
| NV-4 | **Prepare→Download seat + legacy export retirement** — D57 | §B W50 row | Un-run; §2.4 is its consequence |
| NV-5 | **`ActionBarLayer` local `useLayerTransition` shim** — D58(iv). Verified at `demo/shell/dock/layers/ActionBarLayer.vue:63` | `CARRY-LEDGER §F` | A local reimplementation of a removed producer API — the exact shape the no-backwards-compat law bans, admitted and deferred to W47 |
| NV-6 | **DarkModeToggle → decorative glyph** — D58(i). Glass 7's toggle is interactive-only; nesting double-toggles | §F / relay M1 | The product lost a functioning affordance to a producer regression; blocked on glass replying |
| NV-7 | **gh-pages production preview mounts empty** | §F, "first probe of the post-compaction deep audit" | Un-diagnosed. Note dev/prod already diverge on fonts (§2.2) — same class of build-mode-only defect |
| NV-8 | **`audit/rehearsal/` track-or-archive** — D58(iii) | §F | §3.2 |
| NV-9 | **D53.vi app-root rename** `demo/color-picker/` → `app/` — "ruled out-of-scope at W43 — next formation decides" | §C | Un-decided |
| NV-10 | **`scripts/dev/dev.sh`** — "the LAST unowned dirty working-tree row (M, un-ruled since pre-V′)" | §C | Confirmed: `git status --porcelain -- demo src test api e2e scripts …` → exactly one row, ` M scripts/dev/dev.sh` |
| NV-11 | **Glass BJ W4 v8 Slider hold** + **BJ W8 refract hold** (2026-07-22) | §D | Two elaborate, hash-pinned consumer holds against a producer that "remains producer/package/browser RED" |

---

## 7. What tranche W must do with this

Ranked by damage:

1. **Track `docs/tranches/V/research/` immediately** (§3.1). Nine unexecuted waves discharge PR rows
   that exist in one untracked file. Until that `git add` happens, W46–W54 are unexecutable from a
   clean checkout and every PR discharge would violate `EVIDENCE.md §6`. Same for `audit/`
   (POST-U-AUDIT.md, the bootstrap and rehearsal manifests).
2. **Stop re-booking the riders (§2.5).** D-1, D-2, CH-4, CH-6, CH-7 and CH-8's UI half have now
   ridden 8+, 8+, 4, 3, 3 and 2 closes. Either they execute in W's *first* third, or the owner
   retires them by name with a rationale. A third option — writing them into another §B table — is
   the disease, and L1 already says so.
3. **Repair the e2e corpus and put it in a program (§2.1).** Two broken imports, 83 files, zero
   typecheck coverage, zero CI. Add `e2e/` to a tsconfig even if the journeys stay unrun.
4. **Fix `plugins/vite-defer-glass-fonts.ts:72` before any W46 type measurement (§2.2).** Measuring
   a `1/√φ` type clamp in the wrong faces produces numbers that will be re-litigated for a tranche.
5. **Retire the legacy export seat (§2.4)** — it is a shipping masked-fallback plus three D33
   violations, and it makes W51's close cosmetic.
6. **Collapse D42 into `EVIDENCE.md §6`** — "exists on disk" must not survive as an alternative to
   `git ls-files`.
7. **Re-run the two waived B3 falsifiers (§4.1)** on a scratch branch, once, and record the red.
   Then the 1607→346 drop has an actual guard.
8. **Fix the three stale unexecuted-spec rows** (W47 router path, W49 regex RED, W51 inverted RED)
   and re-baseline W55's performance numbers.
9. **Carry the 899-line `src/css/stylesheet.ts` forward explicitly** — it is currently a silent drop
   from the fold source (§2.3).

## 8. What V′ got right (so W does not delete it)

- **The anti-partial machinery is real.** RF-28 caught a phantom manifest gate before it could be
  cited. W43 deliberately kept `PaneSegmentedControl` alive so W47's gate could fail. W48's spec
  names the nonexistent manifest and refuses it. RF-25's claim of "zero partial-as-done lies" was
  true *of the formation*; it stopped being true during execution (§2.3, §2.4).
- **The re-homing pattern (D47/D48/D51/D56) is honest**, not laundering: each ruling names the
  blocker, names the owning wave, and W44 actually discharged them. `ef57230b` flipped the CI steps
  hard exactly as D48 promised. I verified the end state green myself.
- **`verify-packed-surface.mjs` and the OpenAPI-vs-registry test are the two gates with teeth.**
  Protect both.
- **W42 executed completely.** Every deletion verified. No half-states.
- **The mail law works.** All six declared cross-repo letters exist at their exact named paths.
  That is a 100% hit rate on declared external captures — better than most closes in this repo.
