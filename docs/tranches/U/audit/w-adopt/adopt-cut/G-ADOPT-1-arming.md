# G-ADOPT-1 — the born-RED adopt-cut gate · ARMING AUDIT (U.W-ADOPT Lane A)

**Status: ARMED-NOT-FLIPPED.** The glass-ui v5 cut is USER-GATED and **UNFIRED**. This lane
ARMS the born-RED gate against the LIVE `tranche/BG`-pinned tree, records the exact RED evidence
and per-arm flip-condition, and AUTHORS the co-land retirement ordering. **No source edit lands
from this lane** — the orchestrator owns the unpin; the version cut is owner-held (§13.5). The
gate stays RED until the real cut. Never fake a flip over the pinned sandbox preview (E-3).

- **Families**: U-F2 (adopt-trigger-disease, THE DISEASE LAW), U-F68 (glass-ui-lock-adopt-drift).
- **Spec of record**: `../../../registry.md` §1 (U-F2), §17 (U-F68); `../../../../waves/U.W-ADOPT.md`
  §Hard-gate G-ADOPT-1. Registry wins on divergence; owner verbatim wins above all.
- **Standing laws**: E-3 (no workaround / no legacy shim / no compat re-export alias for
  goo-blob→blob — migrate the consumer at the root only), §3.4 pin policy (the adopt is a booked
  EVENT, not a silent floor-bump).

---

## §0 — Live-tree verification (dispatcher drift CONFIRMED; the doc/registry counts are stale)

Re-verified at this lane's execution (2026-07-13), value.js branch `tranche-u`:

| Fact | Doc / registry said | LIVE tree reads | Verdict |
|---|---|---|---|
| `tranche/BG` pin count | **6** (gate §Hard-gate; registry §1 cites 3) | **7** — `ci.yml` ×6 + `deploy-pages.yml` ×1 | DRIFT: +1 site |
| `ci.yml` pin lines | `80,277,373,472,557` (gate); `80,277,369` (registry §1) | `80,288,391,493,599,684` | DRIFT: line-shift + a **6th ci.yml site** |
| `deploy-pages.yml` pin line | `80` | `80` | matches |
| `release.yml` pin count | (implied 0) | `0` | matches |
| lock workspace-dep node | `~4.0.0` at `:194` (gate); `4.2.0` (registry §17) | `~4.0.0` at **`:193`** | DRIFT: line -1; the `~4.0.0` record is the current false record |
| lock resolved node | `resolved: "../glass-ui"` at `:1432-1433` | `:1431-1432` | DRIFT: line -1 |
| glass-ui disk version | `5.0.0` | `5.0.0` (`../glass-ui/package.json:3`) | matches |
| glass-ui branch / HEAD | `tranche/BG` (gate authoring) | **`tranche/BI` @ `8b0f9acc`** | DRIFT: glass-ui HEAD moved BG→BI; **the CI pin `tranche/BG` is now even more stale** (points at an older branch than disk HEAD) |
| `v5*` tag | none (USER-GATED) | **none** (`git -C ../glass-ui tag --list 'v5*'` empty) | UNFIRED — re-checked at lane close, still 0 |
| goo-blob→blob demo import | "WILL break 3 demo sites at the cut" (registry §1) | **ALREADY SWAPPED** — `110b56f` landed | STALE: the import surface is already GREEN |

Re-verify commands (source of truth, not the line integers above — a moving tree):
```
grep -c 'ref: tranche/BG' .github/workflows/*.yml   # ci.yml:6  deploy-pages.yml:1  release.yml:0  = 7 total RED
grep -n 'glass-ui' package-lock.json                # workspace-dep ~4.0.0 @:193 ; resolved ../glass-ui @:1432
git -C ../glass-ui tag --list 'v5*'                 # EMPTY = cut unfired
grep -rn '@mkbabb/glass-ui/goo-blob' demo/          # NO match = zero dead goo-blob import (GREEN)
```

**+1-site cause**: the PERF wave grew `ci.yml` — a 6th glass-ui checkout site now exists in the
`boot-smoke:` job (`ci.yml:684`, job header `ci.yml:668`). The gate's "RED today = 6" is corrected
to **RED today = 7** here.

---

## §1 — G-ADOPT-1 arming rows (each: LIVE RED evidence → exact flip-condition)

### 1(a) — NO `tranche/BG` pin remains · **RED (7 pins live)**

**Assertion**: `grep -c 'ref: tranche/BG' .github/workflows/*.yml` → **0** across all workflow files.

**RED evidence (live)**: **7** pins across 2 files. Per-site, with owning CI job (for the
retirement ordering):

| # | File:line | Job (header line) | Checkout `name:` |
|---|---|---|---|
| 1 | `ci.yml:80` | `build-and-test:` (`:38`) | "Checkout glass-ui @ tranche/BG (file: workspace dep — the D8-1-cured live tree)" |
| 2 | `ci.yml:288` | `e2e-smoke:` (`:273`) | "…un-pin at the 5.0.0 master landing" |
| 3 | `ci.yml:391` | `e2e-safari:` (`:376`) | "…un-pin at the 5.0.0 master landing" |
| 4 | `ci.yml:493` | `e2e-slate:` (`:478`) | "…un-pin at the 5.0.0 master landing" |
| 5 | `ci.yml:599` | `gh-pages:` (`:583`) | "…un-pin at the 5.0.0 master landing" |
| 6 | `ci.yml:684` | `boot-smoke:` (`:668`) | "…un-pin at the 5.0.0 master landing" |
| 7 | `deploy-pages.yml:80` | (pages deploy) | "…un-pin at the 5.0.0 master landing" |

Each site is an `actions/checkout@v4/@v5` block: `repository: mkbabb/glass-ui` + `ref: tranche/BG`
+ `path: glass-ui`. The 6 non-`build-and-test` checkout `name:` strings already carry the standing
instruction "un-pin at the 5.0.0 master landing" — the retirement is pre-annotated at the site.

**Flip-condition (owner-gated cut)**: retire `ref: tranche/BG` at all 7 sites → the tagged 5.0.0
master (`ref: v5.0.0` or the tag the owner cuts). Re-annotate each `name:` (drop the "@ tranche/BG
… un-pin at the 5.0.0 master landing" clause → "@ v5.0.0"). Then the grep returns 0. **Lane A does
NOT edit ci.yml / deploy-pages.yml** — those are READ-ONLY reference here; the orchestrator takes
the unpin at the cut.

### 1(b) — package-lock recorded glass-ui version ≡ resolved disk 5.0.0 · **RED (lock reads ~4.0.0, U-F68)**

**Assertion**: the package-lock's recorded glass-ui version matches the resolved disk `5.0.0`.

**RED evidence (live)**: the lock records a STALE `~4.0.0`:
- workspace-dep node: `"@mkbabb/glass-ui": "~4.0.0"` at `package-lock.json:193` — a false record
  vs disk `5.0.0`.
- resolved node: `"node_modules/@mkbabb/glass-ui"` → `"resolved": "../glass-ui"` at `:1431-1432`
  (a `file:` link — resolves to disk, but the recorded semver constraint `~4.0.0` is the drift).
- glass-ui 5.0.0 peers ARE satisfiable now: value.js `3.1.0` (disk), keyframes `5.2.0` (disk).

**Flip-condition**: the lock refreshes at the adopt cut (`npm install` after the pin retires + the
`file:` tree resolves to tagged 5.0.0) → the recorded constraint reads `5.0.0` (or `^5.0.0` /
`~5.0.0` per the cut's `package.json` bump). This is a **sub-assertion of the cut**, no independent
work (U-F68 disposition: fold → the adopt cut). **Lane A does NOT edit package-lock.json.**

### 1(c) — demo build zero dead `goo-blob` import · **GREEN at the import surface (nuanced)**

**Assertion**: the demo build has zero dead `goo-blob` import.

**Evidence (live)**: **ALREADY GREEN at the import surface.** `grep -rn '@mkbabb/glass-ui/goo-blob'
demo/` returns NO match. The consume-swap `110b56f` ("feat(demo · U.W-ADOPT L17): the goo-blob→blob
early consume-swap") LANDED. All three consumer sites import `@mkbabb/glass-ui/blob`:
- `demo/color-picker/composables/boot/useAtmosphere.ts:36` — `{ BLOB_CONFIG_KEY, BLOB_CONFIG_DEFAULTS }`
- `demo/@/components/custom/panes/BlobPane.vue:12-13` — `{ BLOB_CONFIG_KEY, BLOB_CONFIG_DEFAULTS }` + `type BlobConfig`
- `demo/@/components/custom/color-picker/visual/HeroBlob.vue:71-72` — `{ Blob, BLOB_CONFIG_KEY }` + `type BlobConfig`

glass-ui 5.0.0 disk exports match: `./blob` (`package.json:475-477`) + `./blob-config`
(`:331-333`); the former `./goo-blob` export is GONE. So consumer ↔ producer names align at 5.0.0.

**The residual `goo-blob` tokens are NOT dead imports** — they are:
- CSS class **selectors**: `demo/@/styles/style.css:892` `.goo-blob-canvas`, `:1004` `.goo-blob-wrapper`,
  `:1005` `.goo-blob-canvas`. These target **glass-ui-INTERNAL DOM classes** the blob primitive
  emits, NOT value.js-owned classes.
- comments/history: `App.vue:64`, `animations.css:180`, `HeroBlob.vue:5` (`.goo-blob-hit`), `:246`,
  `demo/CLAUDE.md:79`.

**CONSUME-AT-CUT RE-PROBE (booked, no edit)**: glass-ui 5.0.0 STILL emits `.goo-blob-*` internal
DOM classes — confirmed at disk: `../glass-ui/src/components/custom/blob/Blob.vue`,
`.../composables/useBlobPointer.ts`, `../glass-ui/dist/blob.js`, `../glass-ui/dist/glass-ui.css` all
carry `goo-blob-canvas`/`goo-blob-wrapper`/`goo-blob-hit`. The rename note says internals render
byte-identical, so the demo's `.goo-blob-*` selectors STILL bind at 5.0.0. **Open question at the
cut**: re-probe whether the built 5.0.0 dist still emits those class names; if a later glass-ui cut
renames the internal DOM classes too, the demo selectors go dead-CSS (not dead-import) and get
migrated at the root (E-3). This is a **producer-owned internal**, NOT a value.js edit today.

**Flip-condition for 1(c)**: already GREEN — assert `grep -rn '@mkbabb/glass-ui/goo-blob' demo/`
→ 0 AND the demo build resolves `@mkbabb/glass-ui/blob` against the tagged 5.0.0 (not the pinned
branch). The import surface holds; the CSS-selector re-probe is a watch, not a blocker.

### 1(d) — boot-smoke green against the 5.0.0 dist · **RED (armed; the Tabs-class named-export drift catch)**

**Assertion**: `npm run boot-smoke` (`scripts/ci/boot-smoke.mjs`, `ci.yml:668` job) is green
against the **built 5.0.0 dist** — the §3.4 pin-policy catch-all for named-export drift (the Tabs
class of failure the registry names).

**RED evidence (armed, NOT run against the sandbox)**: boot-smoke today runs against the
`tranche/BG`-pinned tree, not the tagged 5.0.0 master. **Lane A does NOT run boot-smoke against the
pinned sandbox and call it a flip** (E-3 — armed gates flip only at the REAL cut; the pinned
worktree `.claude/worktrees/glass-ui-pinned` holds orchestrator UNCOMMITTED preview state, off-limits).

**Flip-condition**: at the cut, boot-smoke runs against the built 5.0.0 dist and passes — every
demo-consumed glass-ui named export (`Blob`, `BLOB_CONFIG_KEY`, `BLOB_CONFIG_DEFAULTS`, `BlobConfig`
+ the dock/select surface) resolves. This is the §3.4 pin-policy `boot-smoke cold` guarantee against
the named-export drift class.

---

## §2 — The co-land retirement ORDERING (authored; executed by the orchestrator at the owner-gated cut)

The adopt is an **explicit booked EVENT** (§3.4 pin policy), not a silent floor-bump. Ordering:

1. **Owner cuts glass-ui `v5.0.0`** (tag on master; USER-GATED, UNFIRED). Precondition — nothing
   below runs before the tag exists. Lane A verifies the tag's absence at authoring and re-checks
   at close (both times: absent).
2. **U.W-LIB has landed a fix to version** (LIB → ADOPT dependency) — the U-F29/F30 amelioration +
   the build-time re-enumeration born-RED (§28.2). The co-land cannot sequence a version until LIB
   has a fix to version.
3. **Retire the pin at all 7 sites** → `ref: v5.0.0`: `ci.yml` ×6 (`build-and-test`, `e2e-smoke`,
   `e2e-safari`, `e2e-slate`, `gh-pages`, `boot-smoke`) + `deploy-pages.yml` ×1. Re-annotate each
   `name:`. (Orchestrator owns; Lane A does not edit these.)
4. **Refresh the lock** (U-F68): `npm install` after the pin retires → recorded glass-ui version ≡
   5.0.0. (Sub-assertion of 1(b).)
5. **goo-blob→blob**: already done at the import surface (`110b56f`) — E-3 forbids any re-export
   alias; nothing to re-migrate. Re-probe the `.goo-blob-*` CSS selectors against the built 5.0.0
   dist (consume-at-cut watch, §1(c)).
6. **Boot-smoke against the 5.0.0 dist** (1(d)) — the named-export drift catch.
7. **Version-cut decision (owner-held, §13.5)** sequenced against BOTH `^3.1.0` floors — see §3.
8. **RELAY-ADOPT addendum** extends the landed BH communiqué (`glass-ui HEAD 17e0f522`) with the
   co-land addendum (Lane B owns the relay spec; this lane cross-references it).

**COMPLETION LAW (PP-16)**: the disease row is DECIDED by THIS lane's decision (spec + ordering +
armed gate) **independent of the cut firing**. If the cut does not fire in-window, the gate stays
ARMED-RED, the constraints are FILED, and the wave closes `complete_with_misses` with the
cut-execution residual booked BY NAME to U.W-CLOSE (never re-booked to a successor tranche).

---

## §3 — The BOTH-`^3.1.0`-floors fact (U-F77 4b arming input; Lane B/LIB own the gate)

Cross-referenced for the version-cut decision (owner-held). Verified live this authoring:

| Floor | Site | Reads | Kind |
|---|---|---|---|
| glass-ui peer | `../glass-ui/package.json` `peerDependencies["@mkbabb/value.js"]` (`:1091`) + `devDependencies` (`:1129`) | `^3.1.0` | peer floor |
| keyframes runtime | `../keyframes.js/package.json` `dependencies["@mkbabb/value.js"]` (`:268`) | `^3.1.0` | **RUNTIME** dependency floor (the stronger coupling) |

value.js disk is `3.1.0` → **BOTH floors satisfied now**; a 3.x minor auto-adopts. A `4.0.0` cut
strands BOTH `^3.1.0` floors (glass-ui peer + keyframes runtime + every transitive keyframes
consumer) — RED until both siblings co-widen + relay (E-2). This is U-F77's G-ADOPT-4b; Lane B /
U.W-LIB own that gate. Named here so the version decision is not sequenced blind to the runtime floor.

---

## §4 — Census-residue rows carried by this lane (DISPOSITION-LEDGER §C.1 — booked, no work)

- **CC-1 `.glass-wash` demo consume-half** — CONSUME-AT-CUT, gated on THIS adopt. The producer half
  rides packet P8 in the §B BH-relay set (already in the letter lane, `17e0f522`). The demo
  consume-half (paint the two demo sites' rung once glass-ui ships the `.glass-wash` fill) WAITS on
  the primitive — **E-3 forbids a demo override of the producer fill**. Named so the consume is not
  invisible; no demo edit today.
- **L8 — the 5th-booking ESCALATION** (from `T/FINAL:303`, the L2..L16 open GLASSUI asks folded →
  U-F2) is a **disease-adjacent signal** (kin of the ≥3-tranche disease-row law) — recorded, not
  swept. The open asks ARE the §1 design reds U-F2 re-files as EXPLICIT NAMED BI-acceptance
  constraints (Lane B's relay spec).
- **Per-item book-reverify (L2..L16)** = G-ADOPT-1's adopt-cut ledger-vs-rebuilt-dist EXTENDED to
  each open ask; re-probed at U.W-CLOSE's book re-probe.
- **W8-2 rest-floor F9.R1 producer knob** (from `ROWS.md:194`) — rides the adopt cut like the GAP-*
  reds; the in-bracket rest-floor DEFAULT already landed in T's package, only the producer-knob
  residual carries. PR-2 fence: no demo cure for a producer knob.

---

## §5 — Gate disposition summary

| Arm | Assertion | State today | Flip-condition |
|---|---|---|---|
| G-ADOPT-1(a) | `grep -c 'ref: tranche/BG' *.yml` → 0 | **RED (7 pins)** | retire all 7 at the cut → tagged 5.0.0 |
| G-ADOPT-1(b) | lock glass-ui ≡ disk 5.0.0 | **RED (~4.0.0 @:193)** | `npm install` at the cut (U-F68) |
| G-ADOPT-1(c) | zero dead goo-blob import | **GREEN (import surface, `110b56f`)** | holds; CSS-selector re-probe watch |
| G-ADOPT-1(d) | boot-smoke green vs 5.0.0 dist | **RED (armed, not run vs sandbox)** | boot-smoke passes vs built 5.0.0 (§3.4) |

**Overall: G-ADOPT-1 = ARMED-RED (3 of 4 arms RED; 1(c) already green at the import surface).**
Flips GREEN only at the owner-gated cut. `v5*` tag: **UNFIRED** (verified at authoring AND lane close).
