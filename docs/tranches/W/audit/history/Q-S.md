# Historical audit — tranche scope Q · R · S

## Model receipt

I observe myself to be **Claude Opus 4.x** operating under the model id string
`claude-opus-5[1m]` as declared by this harness. I did not verify the id against a provider
API; the declaration is the harness's, not mine. Seat: hostile historical audit, Q–S.

**Audit date**: 2026-07-24 · **Repo**: `/Users/mkbabb/Programming/value.js` · **Branch**
`tranche-u` · **HEAD** `c654824e` · **Writes**: this file only.

---

## §0 — Headline

Three closes, three "success" documents, one shared shape:

1. **Q never had a close.** `docs/tranches/Q/FINAL.md` is a 46-line document authored
   retroactively at R.W0 from two commits. It is the entire Q corpus — no charter, no wave
   docs, no audit, no gate ledger, no evidence directory. Its central claim ("Every item
   carried a born-RED gate verified to bite the unfixed tree") rests on `proof:*` scripts that
   the owner had **explicitly prohibited three weeks earlier** and that a later tranche deleted
   as overfit.

2. **Q and R both published a package that depended on an older major of itself**, and the
   local build carried a purpose-built alias to hide it. Four releases shipped that way
   (1.1.1 · 1.2.0 · 2.0.0 · 2.0.1). R's independent 12/12 verifier, R's `npm pack --dry-run`
   publish-shape CI step, and R's full §6 counts were all green over it.

3. **S declared a hard Lighthouse gate as its "oracle floor" while the gate could not
   collect.** `staticDistDir` pointed at a path that does not exist under the nested-workspace
   CI layout R.W7 had introduced two days earlier. The fix landed **two hours after the S close
   merge and is not an ancestor of it**. The first time the gate actually ran (T.W0) it
   measured **LCP 5563 ms** against its own 2500 ms error-level bound.

4. **The ~5s boot has never been fixed and has now ridden five closes** under four names
   (S: `RP-2` / `L20` · T: `Q14` / `O-5` · U: `U-F3` · V′: `CH-4`). At HEAD the producer half
   is *shipped* (`@mkbabb/glass-ui/blob-config` exists, 245 bytes) and the consume was never
   made (`demo/color-picker/composables/boot/useAtmosphere.ts:36` still imports from the
   103,031-byte `@mkbabb/glass-ui/blob` barrel).

5. **91.8 % of Q/R/S visual evidence is not in version control.** 625 media files on disk,
   51 tracked. `.gitignore:34` is a repo-wide `*.png`. R's `π CLEAN` verdict rests on 114
   screenshots of which **zero** are in the R close commit's tree.

**Counting basis for §1**: `promised` = distinct named rows the tranche committed to (wave
slates, wire items, publishes, rulings, books). `landed` = verified by git object / tree /
command output at the time of the close, and not silently reverted. A row that landed and was
later *deliberately* retired with a written rationale still counts as landed; a row that landed
and vanished with no disposition is a **silent drop** (§3).

| Tranche | Promised | Landed (verified) | Deferred at close | Verified silent drops |
|---|---|---|---|---|
| Q | 12 | 12 | 0 (none recorded) | 3 |
| R | 31 | 16 | 13 books + X1 + X2 | 2 |
| S | 39 | 17 | 21 books + 1 undispatched wave | 3 |
| **total** | **82** | **45** | **37** | **8** |

---

## §1 — The commitment ledger

### §1.1 Q (`docs/tranches/Q/FINAL.md`, 46 lines — the whole corpus)

`ls docs/tranches/Q` → `FINAL.md`. Nothing else exists. Two commits carry the tranche:
`fd3c7cef` (1.1.1) and `e80b359c` (1.2.0), both 2026-06-23, ~29 minutes apart.

| # | Commitment | Landed at close | Status at HEAD `c654824e` |
|---|---|---|---|
| Q-1 | VJ-Q1 `contrast-color()` (CSS Color L7) | YES (`fd3c7cef`) | **GONE** — `rg -in "contrast-color\|contrastColor" src/` → 0 hits |
| Q-2 | parse-that re-pin `^0.12.0`→`^0.13.0` | YES | **DEP DELETED** — `package.json` `dependencies` = glass-ui + keyframes.js only |
| Q-3 | NO-LEGACY: retire the L6 `color-contrast(… vs …)` stub from `css-color.bbnf` | YES | grammar files gone with `src/parsing/` at the v4 cut |
| Q-4 | VJ-Q2 egress out-param family (`xyz2rgbFamilyInto` + per-space `*Into`), 37→9 allocs | YES (`e80b359c`) | **GONE** — 0 hits in `src/` |
| Q-5 | VJ-Q3 `mixColorsInto` + `sampleColorRampAt` + `for…in` `clone()` | YES | **GONE** |
| Q-6 | VJ-Q6 dashed-call arm + `<syntax>` validator (`parsing/syntax.ts`) | YES | **HALF SURVIVES** — `src/css/syntax.ts` exists; dashed-call arm gone |
| Q-7 | VJ-Q7 `if()` multibranch (full ordered N-branch clause list) | YES | **GONE** — 0 `if()` handling in `src/css/grammar.ts` |
| Q-8 | VJ-Q4 `flatLeaf .fnName` (7th `ValueUnit` ctor field) | YES | **GONE** |
| Q-9 | VJ-Q8 `ColorChannelPlan` SoA (`color-soa.ts`, ~5× fold-win) | YES | **EXCISED 12 DAYS LATER** at S 3.0.0 (Q3) |
| Q-10 | VJ-Q9 none-channel + `color()`-wrapper round-trip | YES | **PARTIAL** — `"none"` handling survives (`src/css/grammar.ts:135,233`) |
| Q-11 | VJ-Q5 `/math` stays parse-that-free | YES | subpath survives (`src/subpaths/math.ts`); parse-that gone entirely |
| Q-12 | tags `v1.1.1`, `v1.2.0` | YES — both present in `git tag` | present |

**Q's gate apparatus.** Both commit messages cite `proof:*` gates as the proof of work
("all 9 proof gates green" / "all 12 proof gates green"). Script counts by `git ls-tree`:

```
3b0d9330 2026-05-26: 9      ← the G/H-era proof:* set
c4c58421 2026-06-03: 0      ← the owner's excision
650a8cdb 2026-06-19: 1      ← O.W0 re-introduces the idiom
23d1a91e 2026-06-23: 7
fd3c7cef 2026-06-23: 8      ← Q adds proof:contrast-color
e80b359c 2026-06-23: 11     ← Q adds proof:serialize-fidelity, proof:grammar-q, proof:color-arch-q
825bd58  2026-07-04: 11     ← R closes with 11
4a6b62b  2026-07-06: 11     ← S closes with 11
HEAD     2026-07-18: 0
```

The standing owner edict (memory topic `feedback-proof-idiom-retired`, 2026-06-02) reads:
*"**NEVER** re-introduce `proof:*` scripts"* and *"When tempted to 'codify an invariant as a
proof script,' don't."* Q added **three new ones** and re-baselined a fourth
(`proof:gamut-alloc` `N_TARGET 40 → 11`). Neither R nor S flagged it across two full
"legacy grep clean" sweeps. T.W0 finally split them (`8bbf0690`, 2026-07-10): **7 excised**,
5 retained under `test:dist`. Of Q's own three, **all three were in the excised set**
(`proof:contrast-color`, `proof:grammar-q`, `proof:color-arch-q`).

Q's FINAL.md — authored at R.W0, 2026-07-03, *after* the prohibition and *with* the
prohibition in force — never mentions it.

### §1.2 R (`docs/tranches/R/FINAL.md`, 296 lines)

R's §2 zero-drop ledger has 13 substantive rows + §7 five wire items + §5 thirteen books = 31.

| Row | R's claim | Audited |
|---|---|---|
| W0-1..W0-14 | LANDED | LANDED — hash table in `PROGRESS.md`; commit objects `aace524` `8f1d8e7` `e68b720` all resolve |
| R.W1 slate → 2.0.0 | LANDED | LANDED — `96f124d`, tag `v2.0.0` present. **But the published manifest carried a self-dependency (§5.1)** |
| R.W2 slate | LANDED / ADJUDICATED | LANDED-with-2-refutations: K-INV5 literal fix REFUTED; K-W3DIFF **REFUTED-AS-CONTRIVANCE**. Two of the slate's own rows did not land, by design |
| R.W3 slate | LANDED | LANDED (`0cbef49..c4eb9d2`) — evidence PNGs untracked (§6) |
| R.W4 slate | LANDED | LANDED (`4d8ad79..9675ef3`) — evidence PNGs untracked (§6) |
| hero-lab | KILLED | KILLED, verified: no `docs/frontend-design/hero-lab.md` (`ls docs/frontend-design/` → `color-picker.md` only); no `waves/R.W5.md` |
| R.W6 slate | LANDED | LANDED (`7351297`, merge `8a2a617`) |
| R.W7 slate | LANDED / PENDING-ON-MERGE | X3/X4/X5 LANDED; **X1 and X2 NOT FIRED** |
| BOOKS row | ON THE BOOKS | 13 rows → §2 |
| R8-18 → fourier | ROUTED | UNVERIFIED (cross-repo; would need `../fourier-analysis` at `cd26c65`) |
| R8-19 → kf | ROUTED | UNVERIFIED (cross-repo) |
| CLOSED-by-O/P/Q | NOT RE-FOLDED | verified — no R wave re-folded them |
| OBSOLETE | PRUNED | verified |
| X1 prod deploy | PENDING-ON-MERGE | **NOT FIRED at R close**; landed only at T.W0 `bdfb4a5` |
| X2 NCSU alias | PENDING | **NOT FIRED at R close**; partially satisfied at T.W0 (§9.2) |
| X3 CF-Pages wire | GREEN | LANDED — run 28723903374; `f9b1810` resolves |
| X4 openapi authority | RECORDED | LANDED — `docs/dev-deploy-standard.md:562` `## §7` |
| X5 rollback runbook | LANDED | LANDED — `docs/dev-deploy-standard.md:472` `## §6` |

**R landed 16 of 31.** The 15 not landed are 13 books + X1 + X2 — R names all of them, which
is to its credit. What R does **not** name is that its own gates were running against an
aliased tree (§5.1).

### §1.3 S (`docs/tranches/S/FINAL.md`, 215 lines)

10 wave verdicts + 2 publishes + 6 owner rulings + 21 books = 39.

Landed and still true at HEAD (verified):

- **3.0.0 near-black `srgbToLinear` cure** — SURVIVES the v4 rewrite. `src/color/operations.ts:180`
  and `src/color/anchors.ts:95` both branch on `0.04045` (the encoded threshold), `anchors.ts:100`
  encodes at `0.0031308`. The R-booked defect is genuinely dead.
- **ICtCp + Jzazbz as full spaces (3.1.0)** — SURVIVE. `src/color/model.ts:124-125`
  `export const ictcp = factory("ictcp"); export const jzazbz = factory("jzazbz");`
- **`vue-router` 4→5 (K-W5RT)** — landed at W2; `package.json` no longer pins 4.x.
- **the self-dependency excision (W0-9)** — landed at `1537fed`; `git show 1537fed:package.json`
  no longer contains `"@mkbabb/value.js"`.
- **the standing oracle slate** — `e2e/smoke/url-color-precedence.spec.ts`,
  `e2e/smoke/atmosphere-cold-load.spec.ts`, `e2e/smoke/views/browse-loading.spec.ts`,
  `e2e/smoke/safari/sustained-30s.spec.ts`, `e2e/smoke/admin/admin-populated.spec.ts`,
  `test/view-accents.test.ts` all present. `smoke-perf` still a project
  (`playwright.config.ts:225`). 6 playwright projects then and now.

Landed and killed within days:

- **S.W7-4 "gamut-guarded 9-accent derivation"** — S's own §1 headline for W7. `test/view-accents.test.ts:3-8`
  at HEAD: *"O-13-SLIMMED at T.W6 · W6-4 (the T-10 excise…) WHAT SLIMMED: the 9-per-view-token rows
  (`PRIMARY_VIEW_IDS`/`PRIMARY_VIEW_SHIFTS`/`resolveViewAccentTokens`) **died with the W7-4
  color-wheel legend (the owner overrule)**."* Six days from headline to excision. Suite 13 → 11 tests.

---

## §2 — The chronics (disease rows)

### CH-A · The ~5s boot / eager payload — **5 closes, 4 names, still live**

| Close | Name | Wording |
|---|---|---|
| S (2026-07-06) | **RP-2** + **L20** | `S/FINAL.md:111` "OPEN — standing on-record re-baseline from W3; +2.5 KiB W4–W7 shell drift **recorded, not reconciled**". `:110` "**L20** — `goo-blob/config` subpath … landing ≈ −33 KiB eager; OPEN — subpath absent; **anchors RP-2**" |
| T (2026-07-12) | **Q14** + **O-5** | `T/FINAL.md:227` "JS eager (RP-2) … **331.0 KiB gz** ≤ 280 **RED** — +51 KiB / ~1.18× over"; `:254` "**the RP-2 re-baseline … carries a third tranche**" |
| U (2026-07-13) | **U-F3** | `U/FINAL.md:41` "ESCALATE DELIVERED-as-structural-fact … G-PERF-3 ARMED-RED, **LCP ~4919 local/5141 CI**, RP-2 331.0 KiB JS-eager producer-gated on the unfired adopt" |
| V′ (2026-07-17) | **CH-4** | `V/reformation/CARRY-LEDGER.md:29` "**CH-4: p75 LCP ≤2.5s on the named matrix — the ~5s boot dies or V′ does not close**" |
| HEAD (2026-07-24) | — | still armed: `e2e/smoke/perf/o5-boot-pacing.spec.ts:48` `test.fail();` |

T's own FINAL.md says the quiet part out loud at `:398`: *"a re-carried chronic (GAP-L2 S→T,
GAP-L5 K→N→M→S→T) is escalation, never a…"*. GAP-L5 is recorded there as riding **five**
tranches before T.

**The live root at HEAD, verified.** The producer half shipped:

```
../glass-ui/package.json:268   "./blob-config": { "import": "./dist/blob-config.js" }
../glass-ui/dist/blob-config.js      245 bytes
../glass-ui/dist/blob.js         103,031 bytes
```

`blob-config.js:2` exports `BLOB_CONFIG_DEFAULTS, BLOB_CONFIG_KEY, BLOB_HERO,
LIGHTNESS_FLOOR_BRACKET, LIGHTNESS_FLOOR_DEFAULT, clampLightnessFloor` — i.e. **L20 landed and
`BLOB_HERO` (the GAP-L5 "HERO preset" half) landed with it.**

The consume was never made. On the *boot* path:

```
demo/color-picker/App.vue:193            import { useAtmosphereBoot } from "./composables/boot/useAtmosphereBoot";
demo/color-picker/composables/boot/useAtmosphereBoot.ts:58   import { useAtmosphere } from "./useAtmosphere";
demo/color-picker/composables/boot/useAtmosphere.ts:36       import { BLOB_CONFIG_KEY, BLOB_CONFIG_DEFAULTS } from "@mkbabb/glass-ui/blob";
```

`HeroBlob` itself is correctly lazy (`demo/picker/ColorPicker.vue:157`
`defineAsyncComponent(() => import("./visual/HeroBlob.vue"))`). The boot-path barrel import is
the one static edge from the eager graph into the blob module. `BLOB_HERO` has **zero**
consumers in `demo/` (`rg -rn "BLOB_HERO" demo/` → no hits).

**Honest caveat**: `../glass-ui/package.json:219` declares `"sideEffects": ["*.css"]`, so a
tree-shaking rollup build *may* reduce the `./blob` import to the 1,581-byte
`presets-5myqNv59.js` chunk. Whether the barrel import costs eager bytes is **UNVERIFIED**.
The command that settles it: `npm run gh-pages` then compare gzip totals of `dist/gh-pages/assets/*.js`
before and after repointing `useAtmosphere.ts:36` to `@mkbabb/glass-ui/blob-config`. What is
*not* in doubt: the booked L20 consume, five closes old, has still not been made, and `BLOB_HERO`
— shipped by the producer specifically for this consumer — is unused.

### CH-B · GAP-L2 (aurora lightness atoms) — **S → T → U → HEAD, 4 closes**

- S: `FINAL.md:106` "OPEN — `atoms.ts` has no `lightnessScheme`/`lBand`/`hueSpread`/`chromaVariance`;
  the dark L band `[0.18,0.42]` unreachable"
- T: `FINAL.md:308` "door surface now present in-tree…; verify-at-adopt **(OLDEST, S→T)**"
- U: routed to `U.W-ADOPT / U.W-VISUAL`
- HEAD: `demo/color-picker/composables/boot/useAtmosphere.ts:234` — *"the atoms door ships no
  scheme/lBand (**GAP-L2**, probed at this dist…) — that half rides packet P1 and **the W7
  re-verify**"*. T.W7 never fired (`T/FINAL.md:69` **TRIGGER-NOT-FIRED**). The comment points
  at a wave that does not exist.
- Producer state now: `rg -c "lightnessScheme" ../glass-ui/dist/aurora.js` → **6**. glass-ui is
  at 7.0.0. The row is stale *and* re-bookable, and no close re-probed it after U.

### CH-C · SoA in color kernels — **Q shipped it, S killed it, V′ re-books it**

- Q 1.2.0 (`e80b359c`): `VJ-Q8 ColorChannelPlan SoA (MEASURE-FIRST → BUILD; color-soa.ts) … ~5×
  fold-win`
- S 3.0.0 (`1537fed`, 12 days later): `color-soa.ts` **excise (Q3)** — on the by-name MIGRATION table
- V-next `docs/tranches/V/vnext/DISPOSITIONS.md:12`: *"SoA in color kernels — **Banked with one
  measured re-trigger** — V16B — **D-19 holds the 3.0.0 tombstone**."*

Three closes, three verdicts, zero settlement. Q's measured "~5× fold-win" was never cited as a
reason against the S excise, and the S excise's rationale is not cited in the V-next re-book.

### CH-D · OKHSL / OKHSV — **R shipped them, v4 deleted them, V′ restores them**

- R 2.0.0: `R/FINAL.md:21` "OKHSL/OKHSV" in the W1 slate, verifier 12/12 PASS
- v4 cut `164343c1`: `src/units/color/gamut/okhsl.ts | 270 ----` (deleted)
- HEAD: `rg -in "okhsl" src/` → 0 hits; `src/color/model.ts` `SPACE_SCHEMA` has no okhsl/okhsv
- V-next `DISPOSITIONS.md:40-41`: *"OKHSL — **Restore on the shared cusp kernel** — V18H"* /
  *"OKHSV — **Restore** … V18V"*

Same for **raytrace gamut mapping** (S 3.0.0 Q8 additive → deleted at v4 → `DISPOSITIONS.md:30`
demotes it to "test-side exact-boundary evidence only") and **cusp/Halley** (`DISPOSITIONS.md:31`
"**Restore as one non-CSS kernel** — V15P — the decided restoration is not prune-eligible").

### CH-E · The 7-set spec-status books — **R → S → T → U, 4 closes, zero decisions**

`CH-10 · CH-13 · FN-7 · kf resolveEasing · R8-23 · R-5 (rec2100 HDR) · R-10 (`if()`/`random()`)`.
R `FINAL.md:123-124` "WAITING". S `FINAL.md:125` "KEEP-BOOKED". T carries them. U `FINAL.md:146`:
*"a rolling spec-status **WATCH** row (**no work**; re-surfaces only if a trigger crosses the
consume-edge)"*. Four closes; the only motion is the label.

Plus the PARK set: `Color.try()` · `usePaletteStore` schema-v1 migration · `S.H3` Pratt —
`U/FINAL.md:147` "**PARK — carried, no wave work**". Also 4 closes.

### CH-G · The renames (the pattern, catalogued)

Renames are how a carry survives an audit. Four confirmed in this window:

| Origin | Rename | Then | Verdict |
|---|---|---|---|
| S **W2-3** Normalized/Display brand (`S/FINAL.md:116` "OPEN NEW") | T **L1** | `T/FINAL.md:180` CLOSED, killed-with-rationale (`T/audit/L1-normalized-display-brand-decision.md`); `U/DISPOSITION-LEDGER.md:297` "PERMANENTLY RETIRED" | **Decided.** The rename was benign — this is what a carry is supposed to look like |
| S **RP-2** / **L20** | T **Q14** / **O-5** | U **U-F3** → V′ **CH-4** | **Disease row** (CH-A). Four renames, zero decisions |
| S **GAP-L5** | T records the lineage itself: `T/FINAL.md:398` "GAP-L5 **K→N→M→S→T**" | U.W-ADOPT + U.W-PERF | **Disease row**, 5+ closes by T's own count |
| R **X2** "NCSU-alias retirement" | T **W0-X2** | executed as a permanent 301 redirect | **Closed by redefinition** (§9.2) |

### CH-F · R-7 (HCT / CAM16) — deferred at R, never discussed again

`R.md:258` "R-7 HCT/CAM16 (heavy, no demand)". `rg -l "HCT"` across `docs/tranches/{T,U,V}` hits
**only** `package-lock.json` files and raw agent `.jsonl` envelopes. `rg "CAM16"` across the same
scope: **zero hits**. The token `R-7` appears in T/U ledgers, but the *subject* was never
re-examined. This is a deferral that became a token.

---

## §3 — Silent drops (promised, never appears again, not in the tree)

| # | What | Last seen | Evidence it is gone |
|---|---|---|---|
| SD-1 | **`test:dist` — the 5 retained proof gates** (`proof:css-parity` · `proof:round-trip-idempotent` · `proof:perf-target` · **`proof:serialize-fidelity`** [Q-authored] · `proof:subpath-budget`) | `8bbf0690` 2026-07-10: *"reclassified into ONE self-building CI-wired entry (`test:dist`), landed as a named step in build-and-test"* | `164343c1` 2026-07-17 removed `test:dist`. `package.json:56-69` at HEAD has 12 scripts, none of them `test:dist`. `rg "test:dist" .github/workflows/` → 0. **The five behavioural dist gates are simply gone**; the v4 commit message is one line with no disposition for them |
| SD-2 | **Q's VJ-Q2 out-param egress family** (`xyz2rgbFamilyInto` + per-space `*Into` + `getXyzFromIntoFn`), the row R FINAL §2 lists as "closed by O/P/Q — do NOT re-fold" and S carries as "**color2Into currency** (standing note)" | S `FINAL.md:125` (via R §5), and `S/FINAL.md:39` W1 "`color2Into`" | `rg -c "color2Into\|xyz2rgbFamilyInto\|Into\b" src/` → 0. The v4 cut deleted the whole egress discipline. No tranche document dispositions it. `DISPOSITIONS.md:12` says "**Into loops remain canonical**" — a claim about code that no longer exists |
| SD-3 | **Q's VJ-Q1 `contrast-color()`** — the *entire justification* for the 1.1.1 release ("the first CSS feature value.js trailed the platform on, inverting the library-LEADS precept") | `Q/FINAL.md:19-22` | `rg -in "contrast-color" src/` → 0. `docs/tranches/V/vnext/DISPOSITIONS.md` has no `contrast-color` row. The library-LEADS precept it was minted to defend is not restated anywhere in the V-next dispositions |
| SD-4 | **`color-mix()` and `light-dark()`** parse arms (Q FINAL cites `color-mix()` as the eager-resolution precedent VJ-Q1 mirrors) | `Q/FINAL.md:22` | `rg -in "color-mix\|light-dark" src/` → 0 |
| SD-5 | **R's ΔE-2000 (14 Sharma vectors) + ΔE-ITP** | `R/FINAL.md:21` W1 gate evidence | `rg -in "deltaE" src/` → 0. `src/units/color/difference.ts \| 243 ----` in `164343c1`. No disposition row anywhere in T/U/V for the ΔE surface |
| SD-6 | **R's boundary API** (`sampleGamutBoundary`/`Into` + `sampleOKLChSliceBoundary` + goldens @1e-3 + the 0.5 ms bench contract ceiling) | `R/FINAL.md:139` "`bench/gamut-boundary.mjs` … UNDER the 0.5 ms contract ceiling" | `rg -in "sampleOKLChSliceBoundary\|sampleGamutBoundary" src/` → 0; `src/units/color/gamut/boundary.ts \| 604 ----`. `ls bench/` — no gamut-boundary harness reachable from any script |
| SD-7 | **S's `resolveEasing` + `safeAccentCssString`** (3.0.0 additive surface) | `S/FINAL.md:78` | `rg -in "resolveEasing\|safeAccentCssString" src/` → 0 |
| SD-8 | **`e2e/smoke/webgl-goo-blob.spec.ts`** — one of the two specs S.W0 W0-2(d) minted as the appearance oracle | `b339e37` | file absent; `e2e/smoke/webgl-blob.spec.ts` + `webgl-blob-idle.spec.ts` exist. Probably the L17 rename consume, but **no document records the rename of an *oracle***, and the S FINAL §6 oracle slate still names the old file class |

**The mechanism of SD-2/3/4/5/6/7 is one commit.** `164343c1` (2026-07-17):

```
129 files changed, 4117 insertions(+), 24330 deletions(-)
```

Full commit message body: *empty*. Subject: `feat(v4)!: value 4.0 producer surface + packed-surface
gate; retire pre-v4 src trees`, plus a session link. **24,330 deleted lines carrying the entire
Q + R + S library payload, with no per-item disposition ledger in the commit and none findable in
`docs/tranches/V/`.** Test-file count over the same arc: Q 51 → R 58 → S 68 → **HEAD 22**
(`git ls-tree -r --name-only <c> | rg -c '^test/.*\.test\.ts$'`).

I am not asserting the v4 cut was wrong. I am asserting that **three tranches' worth of
individually-gated, individually-published commitments were retired without an individual
disposition for any of them**, and that the next tranche is planning to re-implement several
(OKHSL, OKHSV, cusp/Halley, SoA, parse-that) without citing the closes that shipped them.

---

## §4 — Vacuous gates

For each: what exact input makes this RED? If I cannot name one, I say so.

| # | Gate | Where | Why it cannot fail |
|---|---|---|---|
| VG-1 | **"Hard Lighthouse" CWV floor** (CLS ≤0.1 · LCP ≤2.5s · TBT ≤300ms · a11y ≥0.9) | `lighthouserc.json` @ `4a6b62b`; `ci.yml:358-364` @ `4a6b62b` | `"staticDistDir": "./dist/gh-pages"` but `configPath: ./value.js/lighthouserc.json` and `actions/checkout … path: value.js` (`ci.yml:55`). LHCI resolves `staticDistDir` **relative to CWD, not to the config file** — CWD is the workspace root, so the path resolves to a directory that does not exist. **No input makes this gate report a CWV number.** Fixed at `29ea8ac7`, 2026-07-06 **20:54:47**, two hours *after* the S close merge `4a6b62b` at **18:54:26**, and `git merge-base --is-ancestor 29ea8ac7 4a6b62b` → **NO**. The step's own inline comment at S close still read: *"Soft-launch (continue-on-error) — **path drift here never blocks the ladder**"* — stale text naming the exact failure mode that was live |
| VG-2 | **The S.W0 CI-LOG deferral discharge** | `S/FINAL.md:25-27`; `S/audit/w9-close-probes.md §c.4` | Discharged by run `28828848774`, whose *"terminal conclusion … is `cancelled`"*. The probe doc then states: *"**This does not gate the close.** … the CI run status is *captured*, not re-gated"*. A discharge criterion that explicitly cannot gate is not a criterion. **No CI outcome — green, red, or cancelled — would have changed the close** |
| VG-3 | **smoke-safari in CI** — listed at `S/FINAL.md:135` as the first item of the "standing oracle slate (the successor's inherited floor)" | `ci.yml:277-279` @ `4a6b62b` | `continue-on-error: true`, by design, to avoid surfacing known glass-ui producer defects. A WebKit total failure does not redden the ladder. **No input makes it RED at the workflow level** |
| VG-4 | **The full `smoke` playwright project in CI** | `ci.yml:261-263` @ `4a6b62b` | `continue-on-error: true`, with the step's own comment recording *"16 view-switching specs red"* as a pre-existing condition. S's `FINAL.md:158-160` reports "e2e 66/66 across 6 projects" — a **local** run. At S close CI's only hard e2e was `page-load.spec.ts` (`ci.yml:253-254`) |
| VG-5 | **The three armed `test.fail()` oracles** — O-5, O-16, O-26 | `e2e/smoke/perf/o5-boot-pacing.spec.ts:48`; `e2e/smoke/oracles/o16-computed-cascade.spec.ts:34`; `e2e/smoke/oracles/o26-aurora-perceptibility.spec.ts:57` | `test.fail()` inverts the verdict: the suite is GREEN **because** the product is broken, and would go RED the day it is fixed. Legitimate as an expected-failure idiom; catastrophic as a close-gate input, because every close since T has reported these inside a "66/66 green" total. O-5's own header names S's `RP-2` (347.9 KiB) as the surviving cause and books the cure to "W7" — a wave that never fired |
| VG-6 | **`Color.try()` trigger**: "demand for a non-throwing parse" | `R/FINAL.md:118`; `S/FINAL.md:120`; `S/audit/w9-close-probes.md:155` | The demand metric is a grep count of `try {}` wraps with **no threshold**. Recorded values across closes: R 11 → S **12** ("drift 11→12 on the record, not reconciled") → U **3**. The metric moved 4× and in both directions with no decision either way. **No count fires it, because no count is specified** |
| VG-7 | **`RP-2` "on-record RE-BASELINE"** | `S/FINAL.md:41,111,153` | A budget row whose verdict is neither PASS nor FAIL but "RE-BASELINE" cannot ever be RED: the bound is declared unreachable while the number is left unchanged (280) and the measurement is left over it (347.9 → 331.0 → still over). Four closes, four re-baselines. The status column literally reads "RE-BASELINE (RP-2) — 67.9 over" |
| VG-8 | **`I2r` PRM-absent clause** in the R.W3 close gate | `R/audit/R.W3-visual-runtime/close/DELTA.md` gate ledger (f) | **R names this itself, to its credit**: *"I2r (PRM-absent — a negative assertion, **vacuously green** while the open-beat animations do not exist)"*. It is the model of how the others should have been reported |
| VG-9 | **"hero-lab grep-zero"** in the R.W2 composite gate | `R/FINAL.md:22` | Green by construction once the tree is deleted. It is a regression tripwire mis-sold as one sixth of a wave's composite gate |

**Not vacuous — checked and cleared.** R.W1's `GAMUT_ALPHA=1.0` tiered bound (`ΔL < 0.09` on
`C∈{0.37,0.40}`, measured 0.083) *is* post-hoc calibrated with ~7.8 % headroom, but the wave doc
is explicit about it (`R/waves/R.W1.md:42,46,48`: *"Ship the tiered bound, never '<0.05'; the
pass-1 'natural knee' claim is refuted"*) and a named RED input exists (any α change pushing the
corpus worst case past 0.09). Recorded as weak, not vacuous.

---

## §5 — Green-over-broken

### §5.1 The self-dependency — Q's and R's whole publish record ran over it

```
git show 825bd58:package.json → "dependencies": { "@mkbabb/parse-that": "…", "@mkbabb/value.js": "^1.0.2" }
```

Present at `e80b359` (Q 1.2.0), `96f124d` (the **2.0.0 version commit**), `825bd58` (R close),
`a7eabcc` (2.0.1). Absent from `1537fed` (S 3.0.0) onward.

**Four published releases declared a runtime dependency on an older major of themselves.** Every
consumer of 2.0.0 materialised `node_modules/@mkbabb/value.js@1.0.2` beside it.

The gates that should have caught it and did not:
- R.W1's *"Independent verifier 12/12 PASS"* on the 2.0.0 cut (`R/FINAL.md:21`)
- the CI step *"Inspect publish shape (npm pack --dry-run)"* (`ci.yml:207` @ `4a6b62b`)
- R.W0's dependency work and R's §6 authoritative counts table
- S.W0's own dependency ledger `adab17a` (11 devDeps excised) — it found the self-dep in the
  *audit* lane, not in a gate

**Why they were all green: an alias built for the purpose.** `git show 825bd58:vite.config.ts:29-33`:

> *"…NOT on the stale registry self-install (`node_modules/@mkbabb/value.js@1.0.2`, a real
> tarball dir that npm materializes from the `^1.0.2` self-dep) whose graph predates the subpath
> cut. **The alias's TRUE job is to OVERRIDE that stale self-install**…"*

Every local gate — dev, build, gh-pages, e2e, boot-smoke — ran against the aliased graph. The
published artifact carried the defect. This is the exact definition of the class.

S's audit lane states the harm plainly (`S/audit/w0-9-dependency-ledger.md:47,51`):
*"value.js declares a **runtime dependency on an old major of ITSELF** … **Harmful to published
consumers** (a package self-depending on an older major → a nested stale self-install)."* And
the entanglement it names is the other Q sin: *":53 the dormant retired-idiom
`scripts/proof-subpath-*.mjs` node-import `@mkbabb/value.js` (via node resolution → the
self-install)"*. The prohibited proof scripts were **resolving through the self-dependency**.

### §5.2 The "oracle floor" that could not run

S.W0 W0-2 is presented as the tranche's foundational act: *"The suite was blind to Safari, to
rendered appearance, and to Lighthouse regressions — S-1..S-24 all shipped green"* (`b339e37`).
Four changes were made. Audited:

- (a) smoke-safari in CI → **soft** (VG-3)
- (b) Lighthouse hard → **could not collect** (VG-1)
- (c) shader-compile substrings added to `CONSOLE_FAIL_SUBSTRINGS` → **real**, and the only one
  of the four that is unambiguously a working oracle
- (d) WebGL appearance asserts → **substituted** (§7.1)

Three of four either could not fail or measured something other than what was claimed. S's own
W0 row records exactly one deviation ("readPixels … substituted with per-canvas draw-call
counting") and calls the wave 7 PASS + 1 MISS.

The first time (b) actually ran was T.W0: run `28836873580`, **LCP 5563 ms / TBT 5618 ms**
(`T/FINAL.md:60`) — 2.2× and 18.7× their own error-level bounds. The app had been that slow
throughout S. The gate that was declared as the protection against exactly this was pointing at
a nonexistent directory.

### §5.3 The proof:* apparatus (Q)

Both Q releases cite proof-gate greens as the evidence of correctness. Of the 12 gates green at
`e80b359`, **7 were deleted 17 days later as overfit** (`8bbf0690`), including all three Q
minted. The remaining 5 were consolidated into `test:dist` and then deleted entirely at
`164343c1` (SD-1). Q's "all 12 proof gates green" is, at HEAD, a statement about zero surviving
gates.

---

## §6 — Declared captures: on disk, not in the repository

`.gitignore:34` is `*.png` (with a single un-ignore, `:35 !demo/**/*.png`).

```
Q/R/S media on disk (png|webm|jpe?g):   625
Q/R/S media tracked by git:              51        (8.2 %)

R.W3-visual-runtime  ondisk 42   tracked 0
R.W4-visual-runtime  ondisk 72   tracked 0
S/audit/pi           ondisk 371  tracked 16 png + 18 webm
S/audit/lanes        ondisk 102  tracked 10
```

`git ls-tree -r --name-only bdba8fc | rg -c 'R.W3-visual-runtime.*png'` → **0**.

R `FINAL.md:88-104` §4 renders the verdict **"π CLEAN. No unintended delta survived either
close"** on the basis of "18+18 shots" (W3) and "36+36 shots + a11y prewave/close snapshots"
(W4). **None of those 108 images is in the commit that says so.** They survive here only because
this is the machine that produced them.

The irony is recorded inside R's own lesson list (`FINAL.md:233`):

> *"**Hoist worktree-authored reports before cleanup, with provenance lines** … worktrees are
> ephemeral; **evidence is not**."*

S is partially honest about this — `S/audit/pi/w5a-after/DELTA.md` states *"PNGs self-ignore
(`.gitignore *.png`); harness + manifests + this DELTA are the committed record"*, and
`w9-pi-review.md:31` confirms *"the only committed PNGs are the sixteen
`w6-after/ruling-shots/*`"*. S FINAL §6 nonetheless presents *"the π matrix: 7 paired
before/after archives … 167 shots + 5 videos"* as an inherited asset. What is inherited is 7
`.mjs` harnesses and 14 manifests. Reproducing the shots requires a dev server, a built bundle,
the sibling producers at the right commits, and a GPU — none of which is pinned.

**Sub-finding — two of the seven "paired archives" contain no images at all**:

```
w5a-before  png=0 webm=0        w5a-after  png=0 webm=0
w5b-before  png=0 webm=1        w5b-after  png=0 webm=1
w5c-before  png=0 webm=1        w5c-after  png=0 webm=1
```

`w5a-after/DELTA.md` asserts *"`w5a-before/` (61 shots) → `w5a-after/` (60 shots, this dir)"*.
On disk: zero, in both. The manifests list the filenames; the files were never written to a
location that survives, or were written and swept.

---

## §7 — Masked fallbacks

### §7.1 The WebGL appearance oracle that counts draw calls

`e2e/smoke/fixtures/webgl-appearance.ts` (S.W0 W0-2d, `b339e37`) — the wave's intent is stated
in its own header as *"a non-blank / actually-rendering assertion"*. What shipped:

> *"The robust, buffer- and timing-INDEPENDENT signal is to **count the WebGL2 draw calls** each
> canvas receives: a canvas whose shader failed to compile/link, or whose render loop is dead,
> draws NOTHING (count 0); a live pipeline draws geometry (count > 0)."*

The substitution rationale (`preserveDrawingBuffer:false`, racy readPixels) is technically
sound. The consequence is not stated anywhere in `S/FINAL.md`: **a canvas that draws a fully
transparent or fully black frame every frame passes this oracle.** Draw-call count is a
liveness signal, not an appearance signal. S FINAL §1's W0 row describes the deviation as a
substitution of oracle *mechanism*; it is a substitution of oracle *subject*. The named
motivating defect ("catches S-4's '4px smudge'") is covered by a separate bbox-size floor, not
by the draw counter.

### §7.2 The dark-ground silent revert

`demo/color-picker/composables/boot/useAtmosphere.ts:237-247` — the F-6 "dark honesty" cure:

```ts
const seed = auroraAtoms.seed;
if (typeof seed !== "string") return fieldPalette;
try {
    return deriveAurora(seed, { scheme: "dark" });
} catch {
    return fieldPalette;
}
```

No log, no comment, no telemetry. If `deriveAurora` throws — e.g. after a producer signature
change, precisely the class R canonised as lesson 8 ("live-producer mid-round drift") — the dark
ground silently reverts to the **light** field palette: the exact defect the cure exists to
remove. No e2e asserts the dark ground derives through the dark band. Ten silent `catch {}`
blocks sit on the boot path:

```
demo/color-picker/composables/boot/hydrate.ts:73,107,123
demo/color-picker/composables/boot/atmosphere-calibration.ts:81
demo/color-picker/composables/boot/useAtmosphere.ts:82,144,244,252,371,398
```

Six carry an explanatory comment (private-mode `localStorage`, un-parseable seed — legitimate).
`:82` (`catch { return null; }`) and `:244` do not.

### §7.3 The vite self-alias — see §5.1

The single highest-impact masked fallback in the Q–S window: a build-time alias whose documented
purpose was to override a defect present in every published tarball.

---

## §8 — Alias smuggling

**Nothing found.** I looked for compatibility shims behind the three "clean break" claims:

- R.W2's `Tabs → SegmentedTabs` migration shipped a **named-export tripwire** (`6ed3677`,
  "born-RED on the 4 dead bindings") rather than a compat alias.
- S 3.0.0's two public-surface breaks are on `CHANGELOG.md:65` `[3.0.0]` with a by-name MIGRATION
  table; the self-dep excision is listed by name.
- S's L17 `GooBlob → Blob` rename: at HEAD `demo/picker/visual/HeroBlob.vue:34` imports
  `{ Blob, BLOB_CONFIG_KEY } from "@mkbabb/glass-ui/blob"`. `rg "goo-blob" demo/` hits only CSS
  class names in `demo/styles/foundation.css:691,803-804` and prose comments — no JS alias.

The one thing that *smells* like smuggling and is not: **2.0.1 is a PATCH that bumped a runtime
dependency across a major** (`@mkbabb/parse-that` `^0.13.0` → `^1.0.0`, `git show
a7eabcc:package.json:110`). R's own §1 W1 row canonises the opposing rule — *"one honest 2.0.0
bundling every output-changing row (the keyframes-2.2.0 semver lesson applied)"*. R FINAL §11
records the commit's scoping blemish but not its semver posture. Recorded as a lesson violation,
not an alias.

---

## §9 — Partial counted as done

### §9.1 The S.W0 CI-LOG discharge (VG-2)

`S/FINAL.md:25` — *"The W0 CI-log deferral **discharged**: the first master-targeting CI run is
`28828848774`"* — for a run whose conclusion was `cancelled` and which the probe doc says
"does not gate the close". A deferral is not discharged by an observation that was never made.

### §9.2 X2 — the NCSU alias "retirement"

The owner order, carried verbatim from R through S: **"no ncsu alias"**. R `FINAL.md:167-176`
specifies the op: *"remove the `/colors/` reverse-proxy `<Location>` block … **let the DNS/cert
lapse**. Verification = **the alias going non-200**"*. S `FINAL.md:205-209` re-carries it
identically.

What T.W0 executed (`T/FINAL.md:284`): *"the `/colors/` proxy block in the NCSU Apache vhost
**replaced with a `RewriteRule` → `https://color.babb.dev/ [R=301,L]`**"*, re-probed at T close
as *"`mbabb.fi.ncsu.edu/colors/` → **301**"*.

A 301 satisfies the letter of the verification criterion (`non-200`) and **inverts the order**:
the alias is not retired, it is made permanent and self-documenting. The DNS and cert do not
lapse; they must now be maintained forever. T FINAL records this as *"X2 EXECUTED + LIVE —
RETIRE, both discharged by execution"*. Two closes deferred the row; the third closed it by
redefining it.

### §9.3 S.W1's 3.0.0 — caught by S's own gate, and the right lesson drawn

`S/FINAL.md:39`: 3.0.0 published claiming ICtCp/Jzazbz as full spaces; the independent gate
**BLOCKED 9/11** because they shipped as conversion pairs only; 3.1.0 remediated. S's lesson 1
is exactly right: *"A MET on an integration row must cite a test driving the INTEGRATED
surface."* **This is the one instance in the Q–S window where a partial was caught before the
close consumed it**, and it is the model. It is also the reason 3.0.0 exists as an immutable
tag documenting a false claim.

### §9.4 R.W2's two REFUTED rows counted inside a "LANDED / ADJUDICATED" verdict

`R/FINAL.md:39` marks the whole R.W2 slate "LANDED / ADJUDICATED" while `:22` records that
**two** of its rows (`K-INV5` literal fix, `K-W3DIFF`) were *"REFUTED by triumvirate experiment,
not landed"*. The §2 ledger's single-cell verdict flattens a 2-of-N refutation into a landing.
The detail is honest; the ledger row that a successor reads is not.

---

## §10 — What the next mega-tranche inherits (ranked)

1. **CH-A, the boot.** Five closes. The producer half is shipped and unconsumed. First action is
   not a design decision, it is `npm run gh-pages` + a byte measurement before and after
   repointing `useAtmosphere.ts:36`. If the number does not move, **say so and delete L20 from
   every ledger**; the row has cost four closes of ledger surface and is either a fix or a myth.
2. **Retire `test.fail()` as a close-gate input.** Three armed inversions ship at HEAD. Any close
   that reports "N/N green" while `test.fail()` sites exist is reporting a number that means the
   opposite of what it appears to mean. Either the oracle is a gate (and reds) or it is a
   tracked known-defect (and is not counted in a suite total).
3. **Commit the evidence or stop citing it.** 574 of 625 Q/R/S captures are outside version
   control while three FINAL documents render verdicts on them. Either un-ignore a
   `docs/tranches/**/audit/**/*.png` path, or replace shot-citing verdicts with harness-plus-manifest
   citations and say plainly that the images are not retained.
4. **Every gate declaration must carry its RED input.** VG-1 through VG-7 would all have been
   caught by one sentence per gate: *"this goes RED when ____"*. VG-1 in particular would have
   been caught by requiring one observed RED run before a soft→hard flip.
5. **A wholesale src replacement needs a per-item disposition ledger.** `164343c1` retired 24,330
   lines carrying Q's, R's, and S's entire library payload with an empty commit body. V-next is
   now planning to *restore* OKHSL, OKHSV, cusp/Halley, SoA, and parse-that. Before it does,
   somebody should read what R and S measured about each of them.
6. **The book mechanism failed to detect a fired trigger, twice.** `vue-router 5` went stable
   2026-05-28 and sat unnoticed through R's close until S's census lane found it
   (`S/audit/lanes/deferred-books-census.md §2`: *"the trigger fired ~5 weeks before this audit
   and **nobody noticed**"*). GAP-L2's atoms door and L20's subpath have both since shipped
   producer-side with no consumer re-probe. Books need a scheduled re-probe, not a trigger
   people are supposed to notice.
7. **The `proof:*` recurrence is a governance finding, not a tooling one.** An explicit,
   memory-recorded owner prohibition was violated 17 days later, compounded 4 days after that,
   and survived two full "legacy grep clean" close sweeps. The sweeps grep for *named legacy
   symbols*; nothing greps for *prohibited idioms*. That gap is still open.

---

## §11 — UNVERIFIED

| Claim | What would verify it |
|---|---|
| The `useAtmosphere.ts:36` barrel import costs eager bytes | `npm run gh-pages` at HEAD, record gzip totals of `dist/gh-pages/assets/*.js`; repoint to `@mkbabb/glass-ui/blob-config`; rebuild; diff. `sideEffects: ["*.css"]` means rollup may already shake it |
| R8-18 (fourier) and R8-19 (keyframes) routings | Read `../fourier-analysis` @ `cd26c65` and `../keyframes.js` @ `9a0f6cb`. Not in this repo |
| Q's "1912 tests green" / "1934 tests green (51 files)" | `git checkout fd3c7cef && npm ci && npx vitest run`. 51 test files at `e80b359` is confirmed by `git ls-tree`; the pass counts are not independently reproduced here |
| Whether npm's registry tarballs for 1.1.1/1.2.0/2.0.0/2.0.1 actually contain the self-dep | `npm view @mkbabb/value.js@2.0.0 dependencies` (network). The manifest at the version commits is confirmed; publication of `dependencies` is the npm default, so the inference is strong but not measured |
| Whether the 16 CI-red view-switching specs at S close were ever made green | The CI step comment at `4a6b62b:ci.yml:256-260` is the only record found; no later document dispositions the 16 |
| GAP-L2's current producer state | `rg -c "lightnessScheme" ../glass-ui/dist/aurora.js` → 6 confirms *some* surface exists at glass-ui 7.0.0; no `aurora.d.ts` was readable to confirm it is a public **atom**. Needs a typed consume attempt |

---

*Audited against the current tree and git history, not against the close documents' own claims.
Every quoted line is `file:line` or a pasted command result. Where I could not verify, §11 says
so and names the command.*
