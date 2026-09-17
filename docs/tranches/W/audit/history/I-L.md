# Historical audit — tranches I · J · K · L

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`, running as a
Claude Code subagent seat. All findings below were produced by this seat against
`/Users/mkbabb/Programming/value.js` at branch `tranche-u`, HEAD `c654824e`.

---

## §0 — Headline

**Of 77 distinct commitments the four tranches made, 40 are verified landed. Two of the four
tranches never produced a close document at all in the form they promised: K has NO `FINAL.md`
(waves W2.5, W2.6, W3, W4, W5, W6 never executed — zero commits reference them), and J's `FINAL.md`
certified `140/140` green CI against a tree that was still uncommitted, landing the next day inside
a K commit.**

The single most damaging fact in scope: **K.W2 re-introduced a `development` export condition that
tranche D had deliberately abrogated three weeks earlier; the post-W2 audit ruled it a contract-v2
precept violation the same day; the corrective wave K.W2.5 was specced and NEVER EXECUTED; the
condition was published to npm at `0.11.0` and broke every Vite-based downstream consumer (37
keyframes.js test files failed to resolve `@mkbabb/value.js`); it was finally removed four days
later as an emergency `fix(pkg)` that does not cite K.W2.5, the precept, or the audit.** The
project memory records this as "reverted in K.W2.5." That is false.

The second most damaging: **J's entire headline deliverable — the WAVE-D atom-diff cohort CORE,
closed GREEN and cohort-paired — was excised whole at T.W1 on 2026-07-10 as "write-only legacy",
because its only consumer (J.W3's demo diff render) was booked at the same close and never
executed.** J's own overfitting hard gate ("every J artifact carries ≥2 consumers, a demo, or is
not shipped") was declared satisfied by counting a consumer in another repository that J's own
shape doc forbids it from observing.

---

## §1 — Scope, method, evidence base

Scope surveyed:

```
docs/tranches/I/{I.md,FINAL.md,PROGRESS.md,audit/*4}         =  7 files,   574 lines
docs/tranches/J/{J.md,FINAL.md,PROGRESS.md,design/*5}        =  8 files,   985 lines
docs/tranches/K/{K.md,PROGRESS.md,audit/*7+2 dirs,design/*12,coordination/*2}
                                                             = 35 md files (22 top-level, 3199 lines)
                                                               + 84 tracked PNGs (visual-evidence-2026-06-04)
docs/tranches/L/{L.md,FINAL.md,PROGRESS.md,audit/excise-ledger.md}
                                                             =  4 files,   436 lines
```

`docs/tranches/K/FINAL.md` — **does not exist.** (`ls: No such file or directory`.)

Every status below was determined against the tree and `git`, not against the close document's
own claim.

---

## §2 — The commitment ledger

Counting rule: one row per distinct binding commitment in the tranche's own §6 hard-gate ledger,
§0 completion criterion, or named-residual table. "LANDED" means verified present in the tree or
verified present at the wave that promised it (later deletion-for-cause is noted separately).

### I — CRUD-CONTRACT v2.0.0 conformance (CLOSED 2026-05-28 `2fefe5e1`)

| # | Commitment | Status | Evidence |
|---|---|---|---|
| I-1 | GET returns visibility + tier | LANDED | `api/src/platform/migrations/check.ts:53-65` |
| I-2 | Smoke probe asserts new fields | LANDED | same; `process.exit(1)` at `:144` — a real hard fail |
| I-3 | Admin toggleFeature → tier | LANDED | `api/src/modules/admin/service/palettes.ts` |
| I-4 | Demo renders featured via tier read | **GREEN-OVER-BROKEN** | see §4.1 |
| I-5 | DELETE soft + `deletedAt` | LANDED | `api/src/modules/palette/routes/crud.ts`, `cron.ts` |
| I-6 | 410 Gone + `Retry-After` | LANDED (Retry-After UNVERIFIED) | `GoneError` present; header not asserted anywhere I could find |
| I-7 | RESTORE endpoint | LANDED | `api/src/modules/palette/routes/publish.ts` |
| I-8 | Cascade-delete grace-aware / reaper cron | LANDED | `api/src/cron.ts` |
| I-9 | Idempotent `setFeatured` + audit row | LANDED | `docs/tranches/I/audit/W3-W4-sota-envelopes.md §1` |
| I-10 | problem+json on every 4xx/5xx | LANDED | `api/src/app.ts` |
| I-11 | ETag on GETs | LANDED | `api/src/modules/palette/etag.ts` |
| I-12 | If-Match REQUIRED on PATCH (428/412) | **LANDED SERVER-SIDE, BROKE THE PRODUCT** | see §4.2 |
| I-13 | RateLimit-* headers | LANDED | `api/src/platform/http/rate-limit.ts` |
| I-14 | Idempotency-Key POST+PUT 24h replay | **DEFERRED** → K.W2, as a *per-process* store | see §6 chronic B |
| I-15 | Per-repo conformance suite `api/test/conformance/` | **DEFERRED** → landed `59aab42c` (K.W2) | |
| I-16 | Per-call-site `ifMatch`/`idempotencyKey` on demo | **DEFERRED** → landed `59aab42c`; the deferral IS the I-12 break | |
| I-17 | `id` field hard-removal | **DEFERRED** → landed `59aab42c`; broke remote-card expand | see §4.3 |
| I-18 | Cohort T7 probe 12/12 green | **UNVERIFIED** | no artifact in this repo; see §5 |
| I-19 | Paired FINAL.md commits | LANDED (value.js half) | `2fefe5e1` |
| I-20 | "`pnpm test` green; `pnpm build` clean" (`I.md:89`) | **UNRUNNABLE GATE** | no `pnpm-lock.yaml` in any commit; no `packageManager` field |
| I-21 | NO-legacy invariant CHI held | **VIOLATED — alias smuggled** | see §7 |
| I-22 | inv-I-2 visibility transition guard | dead-authored at I | J/FINAL §4: "the guard's **first live caller** (was dead-authored I→J)" |

**I: 22 promised · 14 landed.**

### J — WAVE-D atom-diff + publish (FINAL committed 2026-06-03 inside `b8afd1cf`, a K docs commit)

| # | Commitment | Status | Evidence |
|---|---|---|---|
| J-1 | W1 CORE spec landed | LANDED | `docs/tranches/J/design/J.W1-palette-remix.md` (288 lines) |
| J-2 | VAL-9 re-gate verdict recorded | LANDED — KILL | J/FINAL §2 |
| J-3 | VAL-1 re-gate verdict + kill-date | **VACUOUS KILL-DATE** → killed 3 tranches late at N.W5 | see §6 chronic D |
| J-4 | `POST /:slug/remix` + persisted atom-diff | LANDED at K.W2 → **EXCISED T.W1** | `a8ff7792` |
| J-5 | `GET /:slug/diff` with ETag | LANDED (ETag unverified) → **EXCISED T.W1** | `a8ff7792` |
| J-6 | Diff-symmetry probe green | LANDED (`test/conformance/diff.test.ts`) → **DELETED T.W1** | `a8ff7792` |
| J-7 | Dedup probe green | same | |
| J-8 | BrowsePane `scheduler.yield()` | **SILENT DROP** | `rg "scheduler\.yield" demo/ src/` → 0 at HEAD |
| J-9 | `content-visibility` on the palette grid | **SILENT DROP as specced** | only `demo/scenes/about/markdown/Markdown.vue:107` + `demo/color-picker/App.vue:408` — not the grid |
| J-10 | `PaletteDiff.vue` CSS Custom Highlight render | **NEVER LANDED** | 0 files match; `a8ff7792`: "K-W3DIFF alt-exit taken demo-side at W5-13" |
| J-11 | Idempotency-Key replay store | booked → K.W2 (partial, see chronic B) | |
| J-12 | Per-repo conformance suite | booked → K.W2 | `59aab42c` |
| J-13 | "Smoke probe at startup asserts the diff-edge schema invariant" (`J.md:115`) | **NEVER WIRED** | `git show 59aab42c:api/src/migrations/check.ts \| rg atomDiff` → 0 |
| J-14 | Overfitting: ≥2 consumers, a demo, or not shipped | **VACUOUS + REFUTED BY OUTCOME** | see §5.1 |
| J-15 | CH-6 → K.W3 ship-or-kill | K.W3 never ran; 0 at HEAD | see §6 chronic C |
| J-16 | Cross-repo `/diff` parity verified | **UNVERIFIED — delegated away** | J/FINAL §5: "The cross-repo parity verdict is the lead's" |
| J-17 | api tsc clean / eslint 0 | LANDED (claimed) | J/FINAL §0 |
| J-18 | "api npm test 140/140 passed, 25 files" | **CLAIMED ON AN UNCOMMITTED TREE** | see §3.1 |

**J: 18 promised · 8 landed — and 4 of those 8 were deleted at T.W1.**

### K — cross-repo cohesion (NO CLOSE DOCUMENT)

| # | Commitment | Status | Evidence |
|---|---|---|---|
| K-1 | Five W1 CORE specs authored | LANDED | `docs/tranches/K/design/K.W1-*.md` ×5 |
| K-2 | `vue-tsc` 0 with glass-ui `dist/` deleted | **LANDED BY A MECHANISM RULED A PRECEPT VIOLATION** | see §3.2 |
| K-3 | Playwright 5 projects green, zero console errors, api down | **NOT MET** | only page-load; smoke was `continue-on-error: true` with "16 view-switching specs red" |
| K-4 | `grep -r glass-ui src/` → 0 | LANDED (+ eslint ban added after adversarial review found the grep non-structural) | `0ff3edc8` bug 2 |
| K-5 | glass-ui OKLab dedup + 1e-6 equivalence | LANDED (cross-repo; unverifiable here) | K/PROGRESS:43 |
| K-6 | glass-ui `@mkbabb/value.js` peerDep | LANDED (cross-repo; unverifiable here) | K/PROGRESS:43 |
| K-7 | `dispatch.ts` ≤ 350 LoC | LANDED (372→349) | `5d970304` |
| K-8 | api-lane I-tail (4 items) | LANDED | `59aab42c` |
| K-9 | `dev.sh`/`deploy.sh` micro-lane | LANDED | `57c0928e` |
| K-10 | **K.W2.5 — revert the precept violation** | **NEVER EXECUTED** | 0 commits reference K.W2.5; see §3.2 |
| K-11 | **K.W2.6 — desktop pane-visibility P0** | **NEVER EXECUTED IN K** | fixed 8 days later at `fc23c8ee` (N.W2.B) |
| K-12 | K.W3 goo-blob + WatercolorDot lift | **NEVER EXECUTED IN K** | chronic A→J 7+; landed in the N window |
| K-13 | K.W3 — the 8 glass-ui asks | **NEVER EXECUTED IN K** | `rg 'variant="mono"' demo/` → 0 at HEAD |
| K-14 | K.W3 — `sortablejs` absent from `package.json` | **NEVER** | `package.json:107` `"sortablejs": "^1.15.7"`, `:92` `@types/sortablejs` at HEAD |
| K-15 | K.W3 — `ui/` codified as bare glass-ui shims | UNVERIFIED (wave never ran) | |
| K-16 | K.W3 — `hero-lab` promote-or-delete | **NEVER IN K** | deleted at R.W2.6, `9ed9175d`, 2026-07-03 |
| K-17 | K.W4 aurora-derive + VAL-1 | **NEVER EXECUTED IN K** | see §6 chronics D/E |
| K-18 | K.W5 modern-web parity + vue-router 5 | **NEVER EXECUTED IN K** | router `^5.1.0` at HEAD, landed later |
| K-19 | K.W6 — 7-lane close ceremony + π visual-runtime lane | **NEVER** | no `FINAL.md` |
| K-20 | v1.0.0 cut at K.W6 (a RESOLVED user verdict, K/PROGRESS:25) | **NEVER** | version went 0.11.0 → 0.11.1 → … |
| K-21 | 27 loose root PNGs archived at the K.W6 ι-sweep | **NEVER** | no `*Karchive*` dir exists; 39 untracked root PNGs at HEAD |
| K-22 | `scripts/capture-visual-runtime.mjs` (K/PROGRESS:106) | **NEVER ON DISK** | `find . -name "capture-visual-runtime*"` → 0 |
| K-23 | Cohort close with the glass-ui peer tranche | **NEVER** | no close document to record it |

**K: 23 promised · 8 landed.** K's *audit* output is excellent and its W2 lanes are real work. K's
*close* does not exist, and everything K promised past W2 rode into M (superseded, never ratified)
and then into N.

### L — api/ legacy-excision (CLOSED 2026-06-04 `66dcd68d`)

| # | Commitment | Status at HEAD | Evidence |
|---|---|---|---|
| L-1 | inv-L-1 `as any` = 0 in api | **HOLDS** | `rg "as any" api/src api/test \| wc -l` → **0** |
| L-2 | inv-L-2 `as unknown as` = 1 | **HOLDS** | exactly 1: `api/src/main.ts:83` `(server as unknown as { close: … }).close(…)` |
| L-3 | inv-L-3 no `sessionToken` / 4-state `status` in `api/src` | **PARTIAL — predicate narrowed at close** | see §5.5 |
| L-4 | inv-L-4 no ad-hoc `c.json({ error })` | **HOLDS** | → 0 |
| L-5 | inv-L-5 no `services.repositories` in routes | **HOLDS** | → 0 |
| L-6 | inv-L-6 DI seam / no raw db in the request pipeline | **HOLDS** | only startup `main.ts:45` + tests |
| L-7 | inv-L-7 no `api/src` file > 350 LoC | **HOLDS** | max 325 (`modules/palette/service/crud-list.ts`) |
| L-8 | inv-L-8 no `: any` params | HOLDS | tsc 0 |
| L-9 | inv-L-9 no transitional drop-comments | **HOLDS** | → 0 |
| L-10 | L.W4 decompose `crud`/`forks`/`users` into triplets | **RETIRED WITH RATIONALE** (verify-not-split) | L/FINAL §4 — an honest re-scope; the invariant it served is met |
| L-11 | Dispatch gate: 5-project playwright exit 0 (`L.md:162`) | **NOT MET — RE-BASELINED** | see §5.4 |
| L-12 | §0 #8 "full vitest + 5-project playwright exit 0" | **NOT MET — SUBSTITUTED** | L/FINAL §1: "12 passed / 24 failed / 1 did-not-run" |
| L-13 | All 26 excise-ledger items land | **LANDED** (+5 scan-phase finds) | `docs/tranches/L/audit/excise-ledger.md §1.1` |
| L-14 | `api/CLAUDE.md` + root `CLAUDE.md` cite L invariants | LANDED (claimed) | L/FINAL §3 |

**L: 14 promised · 10 landed.** **L is the strongest tranche in scope by a wide margin.** Its
`excise-ledger.md §1.1` voluntarily publishes five items the frozen ledger *missed*, and §2's
eight "befitting-keeps" are each individually justified — that is the opposite of a masked
fallback. Its two failures (the e2e dispatch gate, the inv-L-3 predicate) are named below without
prejudice to that.

**Requested verification — L's `as any = 0 / as unknown as = 1` claim in the CURRENT tree: HOLDS
EXACTLY.**

```
$ rg -n "as any" api/src api/test | wc -l
0
$ rg -n "as unknown as" api/src api/test
api/src/main.ts:83:  (server as unknown as { close: (cb: () => void) => void }).close(() => resolve());
```

---

## §3 — The two structural lies

### 3.1 — J closed GREEN on an uncommitted tree

`docs/tranches/J/FINAL.md §0` is titled "Green CI (inv-27: green-means-green, this repo)" and
tabulates `api npm test` → **140 / 140 passed, 25 files**.

`git log --diff-filter=A -- docs/tranches/J/FINAL.md` → **`b8afd1cf` 2026-06-03 "docs:
constellation grand-audit + tranche doc-set (K)"** — J's close document was committed inside a *K*
docs commit.

`git log --diff-filter=A -- api/src/lib/crud/atomdiff.ts` → **`59aab42c` 2026-06-03 "feat(K.W2
api-lane)"**, whose message reads verbatim:

> J-substrate (**was uncommitted on this branch**): /diff atom-diff (remixPalette, atomdiff lib),
> /publish + /unpublish (visibility state-machine), the crud/forks/versions/format updates +
> conformance/diff.test + palettes-publish + palette-remix tests.

So: J's "green-means-green" attestation described a working tree that no reviewer could read, and
the artefact it attested to landed under a different tranche's commit. The invariant J cites
(`inv-27: green-means-green`) is precisely the one this violates.

### 3.2 — K.W2.5 was never executed; the precept violation shipped to npm

This is a four-act failure and the project memory has act 4 wrong.

**Act 1 — the abrogation.** `73fdabcf` (2026-05-19): *"feat(library/w1): align to contract-v2 —
**drop development condition** + build:watch + proof-resolution-contract.mjs (D.W1 L1-L5)"*.

**Act 2 — the regression.** `c4c58421` (2026-06-03, K.W2a) re-adds it:

```
$ git show c4c58421 -- package.json
+            "development": "./src/index.ts",
```

Commit message: *"resolves @mkbabb/glass-ui from SOURCE via a new 'development' export condition
(added to glass-ui's 68 object-form exports **and value.js's own**)"*. Gate recorded GREEN.

**Act 3 — the same-day verdict, and the wave that never ran.** `docs/tranches/K/PROGRESS.md:63-70`:

> **The headline finding (gate-grounded):** K.W2's `inv-K-4` mechanism-A (the `development` export
> condition) is a **contract-v2 precept violation** — it FAILS glass-ui's own `proof:resolution`
> gate on both repos and is the **root cause** of the dual-instance fragility … specced as the NEW
> corrective lane **K.W2.5**.

`K.md:59` was rewritten to say *"The K.W2 source-resolution mechanism that violated this is
reverted in **K.W2.5**"* — present tense, as if done. `K/PROGRESS.md:12` is honest: K.W2.5 is
**"SPECCED … awaits user ratification + IMPL."**

```
$ git log --oneline --all | rg -i "w2\.5|w2\.6|K\.W3|K\.W4|K\.W5|K\.W6"
(nothing)
```

**Zero commits in this repository's entire history reference K.W2.5.**

**Act 4 — it shipped, broke a sibling repo, and was patched under another name.** `4c8c5320`
(2026-06-07, four days later):

> `fix(pkg): drop the broken 'development' export condition — registry consumers resolve dist (0.11.1)`
>
> 0.11.0 added `"development": "./src/index.ts"` to exports while `files: ["dist"]` omits src from
> the published tarball. … Vite/Vitest APPLY it and fail to find `src/index.ts` in the registry
> artifact — **breaking every Vite-based consumer in dev/test mode** (caught by the keyframes.js
> re-pin: **37 test files failed to resolve `@mkbabb/value.js`**).

That commit message cites neither K.W2.5, nor the precept, nor the post-W2 audit. It rediscovers
the defect from the outside, as a downstream breakage.

**Act 5 — the last band-aid outlived K by a week.** K.W2.5's spec required retiring four
band-aids, one being `scripts/check-types.mjs`.

```
$ git log --diff-filter=AD --follow -- scripts/check-types.mjs
d9c3b9f2 2026-06-11 fix(boot): N.W1 — … mechanism-C remainder (self-alias→dist, check-types.mjs retired, reka ^2.9)
c4c58421 2026-06-03 feat(K.W2a): …
```

**Verdict on the requested question — "verify the K.W2.5 revert is complete":** the *end state* is
correct at HEAD (no `development` key in `package.json`, `check-types.mjs` gone, `reka-ui ^2.9`,
plain `vue-tsc -p` in the `typecheck` script, `tsconfig.{base,lib,demo}.json` split retained,
`SIBLING_WATCH_BUILDS` populated in `scripts/dev/dev.sh:46`). **But the revert was NOT executed as
K.W2.5 and NOT executed inside K.** It took two later tranches and one production incident, spread
over eight days, under three unrelated commit subjects. Any record saying "reverted in K.W2.5" —
including `~/.claude/…/memory/MEMORY.md` — is wrong and should be corrected.

---

## §4 — Green-over-broken

### 4.1 — I certified a demo consumer that did not typecheck

`I/FINAL.md §3` gate row: *"Demo renders featured palette via tier read | **PASS** (PaletteCardMenu
+ PaletteCard + **useAdminUsers** updated)"*.

At I close (`2fefe5e1`), `demo/@/composables/auth/useAdminUsers.ts:88`:

```ts
tier: result.tier as "standard" | "featured",
```

while `demo/@/lib/palette/api/admin-palettes.ts` declared:

```ts
): Promise<{ slug: string; status: string }> {     //  ← no `tier`
```

That is a live TS2339. `docs/tranches/K/PROGRESS.md:31` measures it at K.W0 as *"❌ vue-tsc 92
errors (… **1 genuine `tier`**)"*, and `K.md:108` names the exact site
`demo/@/composables/auth/useAdminUsers.ts:88`. It was fixed at `c4c58421`, **six days after I
declared it PASS**. The gate was asserted, not run.

### 4.2 — I made `If-Match` REQUIRED on PATCH and shipped a demo that never sent it

`I/FINAL.md §3`: *"If-Match required on PATCH (412 on stale) (I.W4) | **PASS**"*.
`I/FINAL.md §1`, the same-close β.2 wave: *"**GREEN** … ifMatch + idempotencyKey + RateLimit retry
plumbed"*.
`I/FINAL.md §5`, deferral row: *"Per-call-site adoption of `ifMatch` / `idempotencyKey` on demo
callers | I-tail or value.js-J | **options plumbed; per-call adoption is bounded but voluminous**"*.

At `13281fc` (the β.2 commit I/FINAL certifies GREEN), `demo/@/lib/palette/api/palettes.ts:77-82`
issues the PATCH with **no** `If-Match`. K.W2's commit `59aab42c` states it plainly:

> per-call-site ifMatch/idempotencyKey: updatePalette takes ifMatch (**the API REQUIRES If-Match ->
> remote PATCH was previously already 428-broken**; onRename now derives a real validator …)

**Every remote palette rename from the demo returned 428 from I close until K.W2 — five days —
while the close document recorded the very same wave as PASS and knowingly deferred the half that
made it work.** This is the cleanest "per-mechanism green over gestalt broken" in scope: the
server-side mechanism was correct and tested; the product was broken; and the close *named* the
missing half as a deferral without noticing it was load-bearing.

### 4.3 — the `id` removal broke the browse grid

`59aab42c`'s message claims *"`id` hard-removed from the palette envelope … **consumer audit
GREEN (no remote reader**)"*. `0ff3edc8`, 19 minutes later, from the 3-critic review:

> 4. id-removal BROKE remote-card expand — BrowsePane/PaletteBrowseTab **keyed expand on
>    palette.id**, now undefined for remote palettes → undefined===undefined → **ALL remote cards
>    expanded at once**.

The "consumer audit GREEN" claim was false when written. The item is one I deferred to J
(`I/FINAL §5`), J re-deferred to K (`J.md §7`), and K executed with an audit that missed the
consumer. Three closes to move one field, and the move was still wrong.

### 4.4 — the K.W2 gate-checker could not fail

`0ff3edc8` bug 1, in the authors' own words:

> `check-types.mjs` GATE HOLE — `FOREIGN_RE` matched the whole diagnostic LINE, so a real demo
> error whose MESSAGE quoted a `@mkbabb/glass-ui/*` subpath (TS2305/2307, **the dominant demo
> import form**) was silently dropped and **the gate reported 0**.

The tool that produced K.W2's headline "vue-tsc 0" was structurally blind to the most common class
of demo error. This is a vacuous gate that was *shipped as the proof of the tranche's central
invariant* and only caught by an adversarial pass the gates themselves did not require.

---

## §5 — Vacuous gates

For each: what exact input would make this RED?

### 5.1 — J's overfitting gate (`J.md:114`)

> **Overfitting**: every J artifact carries ≥2 consumers, a demo, or is not shipped (… **WAVE-D is
> ≥2-consumer by construction — both repos**).

**No input makes this RED.** The claimed second consumer is fourier-J, in another repository, and
`J/FINAL.md §5` states value.js asserts *"against the shape doc, **never** against fourier's
output — J-diff-shape §6"*. The gate counts a consumer it is contractually forbidden to observe.
The first consumer (J.W3's `PaletteDiff.vue`) was booked **at the same close**. Refuted by outcome
37 days later at `a8ff7792`: *"the demo consumes neither `/remix` nor `/diff` … the persisted
`PaletteVersion.atomDiff` column has NO reader … `computePaletteDiff` had zero consumers besides
its own route."*

### 5.2 — K.W2's CI smoke step (`57c0928e:.github/workflows/ci.yml:150-153`)

```yaml
# 16 view-switching specs red; continue-on-error captures the report
- name: Playwright — full smoke project (soft-launch)
  continue-on-error: true
```

**No input makes this RED — the step's exit code is discarded by construction, and the comment
declares 16 known-red specs.** Same for the Lighthouse step at `:187-188`. `K.md:132` states the
K.W2 hard gate as *"`npx playwright test` → **all 5 projects green, zero console errors, with the
api/ container down**"*; what shipped satisfies that for the `page-load` spec only.
(Credit: `.github/workflows/*.yml` at HEAD contains **zero** `continue-on-error` — this was cured,
per the V·W44 record, ~6 weeks later.)

### 5.3 — K's inv-K-1 grep backstop

`K.md:56` names *"a close-time `grep -r "glass-ui" src/` returns zero"* as the structural backstop.
`0ff3edc8` bug 2: *"inv-K-1 was NOT structural — a `src/`→glass-ui import **RESOLVES to dist** when
glass-ui ships its `.d.ts` (its normal state); it only errored in the transient dist-deleted
window."* The grep is textual and passes on a codebase that imports glass-ui through an alias or a
re-export; the *program-graph* claim ("glass-ui-free by construction") was false and the commit
corrects the tsconfig comment for "overstat[ing] 'by construction'".

### 5.4 — L's dispatch gate, met by re-baselining

`L.md:162` (binding, emphasis original): *"IMPL is **hard-blocked until** … `npx playwright test`
(**all 5 projects**: smoke / smoke-admin / smoke-mobile / smoke-reactivity / smoke-safari) …
**all exit 0**"*. `L.md:23` §0 criterion 8 repeats it.

`L/FINAL.md §1`: *"playwright (5 projects) | **12 passed / 24 failed / 1 did-not-run** — identical
to the dispatch baseline"*. `L/FINAL.md §3`: *"the playwright 12/24/1 was **pinned as the
pre-existing orthogonal baseline**."* The close gate then reads *"playwright = baseline"* rather
than "exit 0".

**The gate as written could only be met by a green suite; it was met by redefining the target.**
The rationale (all failures pre-existing and L-unreachable) is plausible and honestly stated — but
the charter's own §11 explains *why* exit-0 was required (*"without it, a regression cannot be
distinguished from a pre-existing K-substrate failure"*), and that reasoning was not answered, only
set aside.

### 5.5 — L's inv-L-3, verified by a substituted predicate

`L.md:51` prescribes the verification verbatim: *"**Verified at close by** `grep -rn 'sessionToken'
api/src` → **0**"*.

```
$ git grep -c "sessionToken" 66dcd68 -- api/src        # at L close
15
$ rg -c "sessionToken" api/src                          # at HEAD
21
```

`L/FINAL.md §2` records: *"inv-L-3 | … | ✅ **palette-field survivors = 0** (auth var distinct,
survives)"*. The substituted predicate ("palette-field survivors") has no enumerated definition
anywhere in L's documents, so **no grep can produce a RED**. The narrowing is semantically
defensible — `c.var.sessionToken` is auth context, not a palette field — but the close asserts ✅
against the charter without stating that the charter's own verification command returns 15.

### 5.6 — I's `pnpm` gates

`I.md:89`: *"`pnpm test` green; `pnpm build` clean."* `I/PROGRESS.md`: *"`pnpm test`: 115/115
PASS."*

```
$ ls *lock* ; rg -n packageManager package.json ; git log --all -- pnpm-lock.yaml
(no lockfile matches; no packageManager field; no pnpm-lock.yaml in any commit)
```

This repository has never used pnpm. The gate is stated against a tool that is not present, and
the close reports a numeric PASS for it. Whatever was actually run, the *recorded* gate is
unrunnable as written — a documentation-integrity defect inside a close-of-record.

### 5.7 — J's diff-edge smoke probe

`J.md:115`: *"Smoke probe at startup asserts the diff-edge schema invariant."* Never wired:

```
$ git show 59aab42c:api/src/migrations/check.ts | rg -c "atomDiff|diff"
0
```

`J/FINAL.md` does not mention the gate at all. **A gate that is never implemented cannot fail; it
also cannot be reported, and here it simply vanished from the close.**

### 5.8 — where the K.W3 glass-ui-asks chronic finally landed (out of scope, named for the record)

`docs/tranches/N/waves/N.W18.md:409`, gate HG-A10:

> The four AZ-fleet adopts land or skip BY CHECKLIST … **un-named/un-shipped adopts skip quietly**

A gate whose non-satisfaction is *defined as* satisfaction. This is the terminus of chronic C
below, and it is the reason `variant="mono"` is still 0 at HEAD.

---

## §6 — CHRONICS (re-booked items that rode 2+ closes, renamed)

### Chronic A — the legacy 4-state `status` field · **rode I → J → K → L (4 closes)** · DISEASE ROW

| Close | The name it wore |
|---|---|
| I.W1 | "legacy status retained for backward-compat"; live envelope carries `status=featured` (`I/PROGRESS.md`) |
| I.W3 audit | "`status = "featured"` (**legacy mirror**)" (`audit/W3-W4-sota-envelopes.md §1`) |
| I/FINAL §7 | "**NO-legacy held**: the `status` field is computed/dual-written for the transition window; drop is scheduled at value.js-J" |
| J.md §7 | inherited as part of "the I-tail"; never named as its own row |
| K.md §10 | "the never-dropped 4-state `status` field (`models.ts:87-92` — **'Drop scheduled at I.W4' was never executed**)" |
| L ledger #6–#12 | "Legacy 4-state `status` field", "status write", "status dual-write", "status query-filter", "status projection", "status envelope", "status legacy-tolerant comment" — **seven rows for one field** |
| L.W3 `17b61488` | EXCISED |

**Evidence it is a disease row:** I declared the NO-legacy invariant (CHI) held *in the same
paragraph* that describes the dual-write. The comment `Drop scheduled at I.W4` was written by I.W1
and survived I.W4, J, and K untouched — L's charter had to make "no `Drop scheduled at I.W4`
comment survives" an explicit invariant (inv-L-9) because *the comment itself* had become the debt.

### Chronic B — the Idempotency-Key replay store · **rode I → J → K (3 closes), landed relaxed**

| Close | The name it wore | Disposition |
|---|---|---|
| I/FINAL §5 | "Idempotency-Key API-side middleware" | DEFERRED — "I-tail or value.js-J" |
| J.md §7 | "Idempotency-Key API-side replay store — **FOLD → J.W4**" | |
| J/FINAL §3 | "**J.W4** — Idempotency-Key replay store … *Blocker*: none — it is **optional**" | BOOKED |
| K.md §7 | "Idempotency-Key API-side replay store (24h window)" | folded to the K.W2 api-lane |
| `59aab42c` | landed | **as a per-process LRU** |

**The relaxation is a partial counted as done.** The shipped file's own header
(`api/src/platform/http/idempotency.ts:26-36`) states:

> Store: the in-process `LRU` … **NOT a Mongo collection** … Consequence — like rate-limit, the
> store is **PER-PROCESS**, so the 24h durability is **best-effort and does NOT survive a restart
> or span replicas**. … (The cross-repo contract's reference impl is **Mongo-backed + durable**;
> value.js's LRU is the sanctioned single-replica KISS relaxation …)

I's commitment was "Idempotency-Key on POST + PUT (24-hour replay window)". What shipped satisfies
the *constant* (`IDEMPOTENCY_WINDOW_MS = 24h`) but not the *property*. To be fair, the relaxation is
documented in-source rather than hidden — this is a disclosed partial, not a masked one. It is
counted here because no close document ever restates the commitment in the relaxed form; only the
source does.

### Chronic C — `TooltipContent variant="mono"` · **rode A → G → H → I → J → K → M → N (9+ closes)** · STILL OPEN

| Close | The name it wore |
|---|---|
| A | `research/Ad` **Ad-17** (G6) |
| G | **CH-6**, "5-tranche", "glass-ui-blocked", "PEER-AUTHORSHIP-REQUIRED" (`G-AUDIT-2-deferred-ledger.md:87,141`) |
| H | carried unchanged (`H-AUDIT-2-deferred-ledger.md`) |
| J.W0 | "**CH-6** `TooltipContent variant="mono"` \| **6-tranche** glass-ui chronic \| **UNBLOCKED → K.W3 ship-or-kill**" (`J/FINAL §2`) |
| K | folded into "**the 8 glass-ui primitive asks** … the 7-tranche carry ends here" (`K.md:157`) — **K.W3 never ran** |
| M | "**CH-4..CH-8** glass-ui primitive asks (… **Tooltip mono** …) \| A→K **~9** \| unshipped \| M.W7; CH-6/CH-8 ship-or-KILL" (`M/audit/fold-ledger.md:40`) — **M superseded, never ratified** |
| N | "the **AZ-fleet `Tooltip` mono adopt**" (`N.W18.md:98,245,371,509`), gated by HG-A10's "skip quietly" |
| V | the token `CH-6` is **re-used for an unrelated design-canon item** (`V-PRIME.md`, `W55-W56.md`) — the identifier itself has been recycled |

**At HEAD: `rg 'variant="mono"' demo/ src/` → 0.** Nine closes, five distinct names, one recycled
identifier, and a terminal gate that is satisfied by doing nothing. **This is the highest-value
find in the chronic class.**

### Chronic D — VAL-1 OKLab aurora-LUT · **rode A → G → H → I → J → K → M → N (7+ closes)** · killed by a kill-date whose wave never closed

| Close | The name / verdict |
|---|---|
| A turn-1 m.13 | "aurora derived from a singular color" (the substrate half) |
| J.W0 | "**VAL-1** OKLab aurora-LUT \| chronic A→J \| **BOOK + kill-date** … **Trigger**: fires at K.W4; **if not live by K.W4 close, KILL**" |
| K.md §7 | "**FOLD → K.W4** … **VAL-1 ships**" — **K.W4 never ran, K never closed, so the kill-date never arrived** |
| M.W5 | "C2 + **VAL-1** ship-or-KILL" (`M.md:112,169`) — M superseded |
| N.W5.B | "**VAL-1 — KILL (recorded, no carry)**" (`N/audit/impl/W5B.md:100`) |

**The structural lesson:** a kill-date bound to a *wave* rather than a *date* is vacuous if the wave
can simply not close. J attached VAL-1's death to "K.W4 close"; K.W4 was booked, K.W6 never
happened, K has no `FINAL.md`, and the item therefore outlived its own execution by three tranches.
N's kill rationale is honest and well-argued — the failure is J's and K's, not N's.

### Chronic E — the two oldest mandates (aurora-derive · blob-extirpation) · **A → J = 7+ closes at K-open, and K did not discharge them**

`K.md:16` states the problem exactly: *"Both have been deferred A→B→D→E→F→G→H→I→J (**7+
tranches**)"*, and `K.md:157` promises *"the 7-tranche carry **ends here**"*.
`W4-CHRONIC-LEDGER.md` grades them "**SHIP K.W4**" / "**SHIP K.W3**".

**K.W3 and K.W4 never executed.** They went to M.W5/M.W7 (superseded), then N.W5/N.W6. Blob
extirpation *did* eventually land — `demo/picker/visual/HeroBlob.vue:34` now imports
`{ Blob, BLOB_CONFIG_KEY } from "@mkbabb/glass-ui/blob"` — but in the N window, not K's. The
aurora-derive consumer wiring was still being re-specced as late as `V-PRIME` W54 (*"**D-1
aurora-derive RUNS or V′ does not close**"*), i.e. **~13 closes after A turn-1**.

### Chronic F — the glass-ui resolution mechanism · **a chronic REGRESSION: D → (fixed) → K (re-broken) → shipped → M → N**

Aliases across its life: *"the `development` export condition"* (D.W1, K.W2a, `4c8c5320`) ·
*"inv-K-4 mechanism-A"* (K post-W2 audit) · *"source-resolution"* (K.W2a) · *"mechanism-C by
deletion"* (K.W2.5 spec) · *"the 4 band-aids"* (K.W2.5 spec) · *"mechanism-C remainder"* (N.W1
`d9c3b9f2`). Full narrative at §3.2. This is the only item in scope that a *later* tranche
re-introduced after an *earlier* tranche had correctly removed it.

---

## §7 — Alias smuggling

1. **`status` shipped as a "computed/dual-written" legacy mirror under a "NO-legacy held" banner.**
   `I/FINAL.md §7`: *"NO-legacy held: the `status` field is computed/dual-written for the
   transition window."* `I.md:32` names NO-legacy (invariant CHI) as load-bearing. A dual-write
   compatibility mirror is exactly the shim the invariant forbids; the close renames it "the
   transition window" and declares the invariant intact. It took L.W3 and seven ledger rows to
   remove.

2. **`forkPalette` retained as "a semantic delegate of `remixPalette` (one path)".**
   `J/FINAL.md §4`: *"**NO-LEGACY**: `forkPalette` is a semantic delegate of `remixPalette` (one
   path)."* The direction was backwards: at `a8ff7792`, *"fold `remixPalette` back INTO
   `forkPalette` (**fork was the only live caller, always empty `colors`**)"*. The "one path" was a
   never-exercised generalization wrapping the only real operation — a compatibility alias pointing
   the wrong way, declared as its own refutation.

---

## §8 — Declared captures checked on disk

| Declared | Where declared | On disk? |
|---|---|---|
| K `FINAL.md` + K-SEED | `K.md:78,136`; `K/PROGRESS.md:16` | **ABSENT** |
| `scripts/capture-visual-runtime.mjs` | `K/PROGRESS.md:106` ("`/tmp/capture.mjs` → `scripts/…`") | **ABSENT** (`scripts/` holds only `ci/`, `deploy/`, `dev/`, `fonts/`) |
| 27 root PNGs archived to `docs/tranches/{B,D}/…/baseline/2026-06-02-Karchive/` | `audit/screenshot-catalogue-2026-06-02.md §3` ("BOOKED — executed at K.W6 ι-sweep") | **ABSENT** — no `*Karchive*` dir; **39** untracked root PNGs at HEAD (grew from 27), **0** tracked |
| The 84-capture π baseline | `K/PROGRESS.md:87`; `9413e472` | **PRESENT — 84 PNGs, count exact** |
| `visual-evidence-2026-06-02/grand-audit/` (11 md + 15 png) | `K/PROGRESS.md:143` | **PRESENT** |
| T7 cross-repo conformance probe "12/12 PASS at 2026-05-28T05:55Z; cron-installed on host" | `I/FINAL.md §3,§4` | **UNVERIFIABLE FROM THIS REPO** — no probe, log, or receipt under `docs/tranches/I/`. *What would verify it:* the probe source + a dated run log in `fourier-analysis/docs/tranches/E/`, or the host cron unit + its output. Until then this is a cohort claim resting entirely on the other repo's word. |
| glass-ui `color-equivalence.test.ts` 6/6 to 1e-6 (inv-K-2) | `K/PROGRESS.md:43` | **UNVERIFIABLE FROM THIS REPO** — cross-repo file. *What would verify it:* `../glass-ui/src/components/custom/aurora/__tests__/color-equivalence.test.ts` at commit `6d3e151` + a run. K's own note that "the equivalence-test tautology [was] recorded" (`0ff3edc8`) is a caution flag. |

---

## §9 — Masked fallbacks

1. `57c0928e:.github/workflows/ci.yml:150-153` — `continue-on-error: true` on the full Playwright
   smoke project, with the inline comment *"16 view-switching specs red"*. The known-red suite is
   the *mechanism* by which the K.W2 close could claim green. Cured at HEAD (0 `continue-on-error`
   in `.github/workflows/`).
2. `57c0928e:.github/workflows/ci.yml:187-188` — Lighthouse CI `continue-on-error: true`
   ("soft-launch"). Budgets (`CLS≤0.1/LCP≤2.5s/INP≤200ms/TBT≤300ms`) declared but non-binding.
   Relevant because the LCP/TBT blowout later became the Q14 RULED ESCALATION at T.
3. `scripts/check-types.mjs` (K.W2a→N.W1) — the gate hole of §4.4: a filter that dropped real
   errors and reported 0.
4. The idempotency LRU's per-process 24h window (chronic B) — **disclosed**, not masked; listed for
   completeness with credit for the in-source disclosure.
5. **Counter-finding, in L's favour:** `docs/tranches/L/audit/excise-ledger.md §2` enumerates eight
   graceful catch/fallback paths and justifies each individually ("no silent/graceful handling
   UNLESS befitting"). I checked several against the tree; they are what they say they are. This is
   the correct treatment of fallbacks and the only instance of it in scope.

---

## §10 — What the next mega-tranche should carry out of I–L

1. **Correct the record.** `MEMORY.md` and any successor charter that says "K.W2 precept violation
   reverted in K.W2.5" is wrong (§3.2). K has no `FINAL.md`; K.W2.5/W2.6/W3/W4/W5/W6 never ran. Any
   ledger that treats K as closed is inheriting a fiction.
2. **CH-6 is still open at HEAD** and its identifier has been recycled for an unrelated V item. It
   needs a terminal ruling (ship or kill with a *date*, not a wave), and the recycled token needs
   disambiguating before it corrupts the V/W ledger.
3. **Ban wave-bound kill-dates.** Chronic D died three tranches late purely because "if not live by
   K.W4 close" is unsatisfiable when K.W4 never closes. Kill-dates must be calendar-bound.
4. **Ban gates whose failure mode is "skip quietly"** (N.W18 HG-A10) and gates asserted rather than
   run (§4.1). Every gate in the next charter should carry, in the charter, the exact input that
   makes it RED.
5. **`sortablejs` is still in `package.json`** (`:92`, `:107`) against an explicit K.W3 hard gate
   naming its absence. Cheap, and it is a live counterexample to "K's plan was discharged".
6. **The 39 untracked root PNGs** are the K.W6 ι-sweep debt, still growing (27 → 39).
7. **Adopt L's excise-ledger form as the standard.** L is the only tranche in scope whose close
   survives adversarial reading essentially intact, and the reason is `excise-ledger.md`: a frozen,
   numbered, per-item inventory with a published §1.1 of its own misses. Its two defects (§5.4,
   §5.5) are both "the gate text and the gate verdict disagree" — fixable by requiring the close to
   quote the charter's verification command verbatim and paste its output.

---

*Report seat: Opus 5 (1M). Written to `docs/tranches/W/audit/history/I-L.md`. No source, `INBOX.md`,
`docs/tranches/V/vnext/`, or `scripts/dev/dev.sh` was modified by this seat.*
