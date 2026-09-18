SERVED MODEL: claude-opus-5[1m]

# KF.W0 — THE MANIFEST RULING

**Wave**: KF.W0 · Substrate Settle (Track B · X·KF) · **Unit**: `KF.W0.b` · **Date**: 2026-09-17
**Substrate**: `/Users/mkbabb/Programming/keyframes.js` at `master` == `origin/master` == `81a56990736ced5b5edde0b84c527680ac7689b1`, **settled** by `KF.W0.OP-1` under COHESION §0j.C **KF-OP1**.
**Producer**: `/Users/mkbabb/Programming/glass-ui` at HEAD `887a0db9` — **READ / HASH ONLY, always**.
**Spec (GOVERNING, immutable per E-3)**: `docs/tranches/X/keyframes/waves/KF-W0.md` — §Scope 2 · §Gates **G-0.2** · **G-0.5** · §Carry **C-1** · **C-3** · **C-16** · §LAW-A CENSUSES **Census 2** · §Sequencing, the glass-ui **OUTBOUND HOLD + FYI** row · §Bounds, the `INBOX.md` row.
**Artefacts** (the pasted readings this file rules on): `artefacts/W0/manifest-four-coordinates.txt` · `artefacts/W0/headerribbon-tripwire.txt`.

**What this file is.** Two written rulings the gate's own falsifier demands — _"silence is not a
disposition"_ — plus the negative gate's HOLD carried into the ruling that would otherwise destroy the
build. **What this file is not**: it authors no manifest byte. The version half of G-0.2 was
reconciled **by the reset itself** (§Bounds' four OWNER'S-HAND rows), and no seat of this wave wrote
`package.json`, `package-lock.json` or `.npmrc`.

---

## §1 · The four coordinates, after the settle (G-0.2's measured half)

Every figure below was **double-run**; both runs agreed on every byte. Full paste:
`artefacts/W0/manifest-four-coordinates.txt` §A–§C.

| coordinate      | RED baseline (spec `:511-521`, fold 2026-08-28)    | **AFTER the settle** (this seat, 2026-09-17)   |
| --------------- | -------------------------------------------------- | ---------------------------------------------- |
| `HEAD`          | `:71 "6.0.0"` under **optionalDependencies**       | `:77 "7.0.0"` under **devDependencies**, EXACT |
| `origin/master` | `:77 "7.0.0"` under devDependencies, EXACT         | `:77 "7.0.0"` under devDependencies, EXACT     |
| worktree        | **row DELETED** from `package.json` _and_ the lock | `:77 "7.0.0"` under devDependencies, EXACT     |
| installed       | `7.0.0`                                            | `7.0.0`                                        |
|                 | **four coordinates · THREE states**                | **four coordinates · ONE state**               |

⟨`git show HEAD:package.json \| grep -n glass-ui`⟩ → `77:        "@mkbabb/glass-ui": "7.0.0",`
⟨`git show origin/master:package.json \| grep -n glass-ui`⟩ → `77:        "@mkbabb/glass-ui": "7.0.0",`
⟨`grep -n glass-ui package.json`⟩ → `77:        "@mkbabb/glass-ui": "7.0.0",`
⟨`node -p "require('./node_modules/@mkbabb/glass-ui/package.json').version"`⟩ → `7.0.0`

**Exactness and placement are resolved by parser, not by grep** — a grep proves the string, never the
section, and the RED baseline's defect was a _section_ (`optionalDependencies`) as much as a version:
⟨`node -e "const p=require('./package.json'); …"`⟩ → `devDependencies['@mkbabb/glass-ui'] = "7.0.0"` ·
`dependencies` / `optionalDependencies` / `peerDependencies` → **undefined** · ⟨`grep -c
optionalDependencies package.json`⟩ → **0**. The whole `optionalDependencies` section is gone at the
frontier, which kills the `npm ci --omit=optional` failure **shape** (kf-CubeAxisLines β-miss-1) by
substrate rather than by version — §Excluded carries that row as narrative, booked as nothing, and it
stays booked as nothing here.

**The lock, at the two facts §Bounds' owner-hand row names.** ⟨`grep -c glass-ui package-lock.json`⟩
→ **3**, equal at HEAD, `origin/master` and the worktree; ⟨`grep -n glass-ui package-lock.json`⟩ →
`:19` (root devDependencies mirror) · `:612` (the installed-tree node) · `:614` (`resolved`).
⟨`sed -n '613,617p'`⟩ → `"version": "7.0.0"` · `resolved` · `"integrity":
"sha512-iK2DaPNbnEOkcI6deSyYZ1mCbDyHCY+IGFeKtsKb800WzApX0uL/Pq6FA9EomqCcBWWDrPSa7iydk7kg9sH2ww=="` ·
`"dev": true` · `"license": "MIT"`. **Lock `:612` integrity present; `dev:true` set.**

---

## §2 · RULING 1 — the worktree's uncommitted glass-ui devDep deletion

**Carried lock, verbatim** ⟨kf-CubeScene, via §Carry C-1⟩: _"sync the sacred checkout to `81a56990`+;
RULE on the worktree's uncommitted glass-ui devDep deletion (committing it as-is revives census F-1)"_.
Its second banked voice ⟨kf-SharePopover, via C-1⟩: the stripped worktree manifest _"remains an
unexplained local artifact → KF.W0 §B-12"_.

### THE RULING — **DISCARDED AND SUPERSEDED. It is preserved by commit on a DISQUALIFIED ref, and it is never re-raised.**

Three limbs, each measured, none inferred.

**(i) The deletion is gone from the execution substrate, and it was removed by the reset, not by a
seat.** The settle's direction lock is **disk←master**; `origin/master`'s `:77` exact devDep is what
the worktree now carries. No unit of this wave authored a manifest byte
⟨KF.W0.OP-1 close: `git diff --name-only origin/master` → **0**; re-verified at this seat after its
own probes: 0 tracked status rows, 0 frontier diff, `git diff --check` clean⟩.

**(ii) It is not lost — it is preserved by commit, and the commit is on a ref this whole wave
DISQUALIFIES.** ⟨`git rev-parse kf-sacred-snapshot-2026-09-17`⟩ →
`6d280ee7bec7793846b2e2e1d250e1ea0a21859a`; ⟨`git show kf-sacred-snapshot-2026-09-17:package.json |
grep -c glass-ui`⟩ → **0**; ⟨`… :package-lock.json | grep -c glass-ui`⟩ → **0**; ⟨`… :package.json |
grep -c optionalDependencies`⟩ → **0**; ⟨`git diff --stat 8281638c kf-sacred-snapshot-2026-09-17 --
package.json package-lock.json`⟩ → _2 files changed, 9 insertions(+), 81 deletions(-)_. The stripped
manifest is therefore **reversible and inspectable** rather than discarded-into-nothing.

**(iii) The falsifier is read at its own words and is NOT tripped — and the distinction is stated
rather than assumed.** G-0.2's falsifier reads _"committing the worktree deletion **as-is** revives
census F-1 and this gate reads three states again."_ OP-1 **did** commit it — to
`kf-sacred-snapshot-2026-09-17`, a **preservation ref**, never to `master`. A naive reading would
convict that act. It does not hold, for the reason this wave exists to establish: **the manifest
coordinate is the execution substrate**, and the execution substrate is `master` == `origin/master`
(COHESION §0j.C **KF-WRITE**), where the row stands at `7.0.0` exact devDep. `8281638c` and every ref
descending from it — the snapshot included — are **DISQUALIFIED as manifest coordinates** and may
never be cited for a live manifest count. _Committed to a disqualified preservation ref_ and
_committed as-is to the substrate_ are different acts; only the second revives F-1, and only the
first happened. **This ruling makes the snapshot ref citable ONLY as provenance.**

**What the deletion actually was, so the next seat does not re-file it as a phantom.** ⟨kf-App,
AUDIT-REGISTRY / FAM-01 RAIL, via C-1⟩ the removed pin is _"a deliberate in-flight migration state"_
— `H→V-01`, producer-gated at that repo's own W2 — not author error and not a missing dependency.
The census **F-1 / SCH-1 "phantom dependency" headline is FALSIFIED at the frontier**, and it is
falsified by the manifest, not by argument: `origin/master:package.json:77` carries the exact devDep
⟨C-1's head record, `kf-AmigaScene.md:6`⟩. **KF-HA-6 (pin-and-bump-one-commit) is DISCHARGED BY this
state, not blocking**: `origin/master` already _is_ that commit (`kf 6.0.0` · `value.js 4.0.0`).

**Consequence booked, not re-booked.** Every _"blocked on F-1"_ gate in the CopyButton corpus (D-9 ·
C-15 · M-6 leg 2) is **RE-SCOPED, not blocked** (C-1); the clean-`npm ci`-fails probe and the
_"verify against 6.0.0"_ residue stay **RETIRED / DISCHARGED** at their banks. No seat re-spends that
budget. Any _future_ removal of the glass-ui pin is a **producer-gated act that rides the standing
relay** (§4's HOLD binds it), never an uncommitted worktree state and never a demo-side hack.

---

## §3 · RULING 2 — `legacy-peer-deps=true` versus the two genuinely-absent peers

**Carried lock, verbatim** ⟨C-16 / KF-APP-59⟩: _"the reconciliation must decide whether
`legacy-peer-deps=true` continues to mask the two genuinely-absent peers, or whether the absence is
declared and the flag retired — **either is a ruling; silence is not**."_

### §3.1 The measurement that decides it

⟨`cat .npmrc`⟩ → `legacy-peer-deps=true` · ⟨`npm config get legacy-peer-deps`⟩ → `true` ·
⟨`ls node_modules/@mkbabb/`⟩ → `glass-ui  parse-that  value.js` (**no pencil-boil**) ·
⟨`npm --version`⟩ → `11.12.1` · ⟨`node --version`⟩ → `v26.0.0`.

**The installed artifact's peer map, each entry resolved against the tree** (full table:
`manifest-four-coordinates.txt` §D):

|              | peer                      | want      | installed                              |
| ------------ | ------------------------- | --------- | -------------------------------------- |
| **REQUIRED** | `@lucide/vue`             | `^1.16.0` | `1.17.0`                               |
| **REQUIRED** | `reka-ui`                 | `^2.0`    | `2.9.9`                                |
| **REQUIRED** | `tailwindcss`             | `^4.0`    | `4.3.0`                                |
| **REQUIRED** | `vue`                     | `^3.5`    | `3.5.35`                               |
| optional     | `@mkbabb/keyframes.js`    | `^6.0.0`  | ABSENT (the tree itself — self-peer)   |
| optional     | **`@mkbabb/pencil-boil`** | `^0.9.2`  | **ABSENT** ← C-16's first absent peer  |
| optional     | `@mkbabb/value.js`        | `^4.0.0`  | `4.0.0`                                |
| optional     | `@vueuse/core`            | `^14.0`   | `14.3.0`                               |
| optional     | **`embla-carousel-vue`**  | `^8.0`    | **ABSENT** ← C-16's second absent peer |
| optional     | `tw-animate-css`          | `^1.2.5`  | `1.4.0`                                |

**Four REQUIRED peers; all four satisfied. Both of C-16's absent peers are producer-declared
`optional` in `peerDependenciesMeta`** — at the shipped tarball _and_ at the lock-recorded packument.

**The decisive probe** (DRY RUN; writes nothing — manifests verified untouched afterwards by
⟨`git status --short -- package.json package-lock.json .npmrc`⟩ → empty):

```
$ npm ci      --dry-run --no-legacy-peer-deps --ignore-scripts   run1 exit=0   run2 exit=0
$ npm install --dry-run --no-legacy-peer-deps --ignore-scripts   run1 exit=0   run2 exit=0
$ grep -ci 'ERESOLVE|could not resolve|conflicting peer' <all four runs>        → 0 everywhere
CONTROL — the same npm ci dry-run WITH the flag (the tree's own default):        exit=0
$ diff <control, timings elided> <--no-legacy-peer-deps, timings elided>         → IDENTICAL
```

Both arms were run: `npm ci` (lock-faithful) **and** `npm install` (re-resolution from
`package.json`), because a lock generated under legacy mode could in principle encode a tree strict
mode would reject, and checking only the lock-faithful arm would have left exactly that hole. **Both
are strict-clean, twice each.**

### THE RULING — **the absence is DECLARED; the flag is RULED INERT and RETIRABLE; the retirement ACT is routed, not performed here.**

**(a) C-16's premise is FALSIFIED at the bytes, and saying so is the disposition.** The flag is not
_"masking the two genuinely-absent peers"_: **an optional peer is never demanded**, so at this
coordinate there is nothing to mask. C-16's own headline — _"a closed falsifier, not a defect"_ —
stands, and it is now closed **by the producer's own `peerDependenciesMeta`** rather than by the
unreachability-from-App's-closure argument the record used. The stronger ground replaces the weaker
one; the record's verdict is unchanged.

**(b) The flag is INERT here, measured by control.** Strict resolution succeeds on both arms and the
control run is byte-identical to the strict run. Its only demonstrated effect at this substrate is to
**disable a safety check that currently passes** — repo-wide, not glass-ui-scoped.

**(c) Therefore: RETIRE IT — and the act is NOT this wave's to perform.** `.npmrc` is a **product byte
named by no §Bounds row of KF.W0** (the four OWNER'S-HAND rows are `package.json`,
`package-lock.json` and the two EE-02 paths; every other writable row is `docs/**`). Deleting the line
here would be the **file-bound expansion the §Triumvirate Dispatch calls wave-invalidating** — and a
ruling that invalidates its own wave is not a cure. So the act is declared with its owner, its exact
form, its precondition and its falsifier, and it is **NO-WAVE-OWNER**: homing it is SS-1/SS-2's act,
exactly as this wave's §Excluded rules for every other unhomed packet. W0 supplies the ground.

> **ROUTED ACT (NO-WAVE-OWNER)** — delete the single line `legacy-peer-deps=true` from
> `/Users/mkbabb/Programming/keyframes.js/.npmrc` (the file's whole content), in a wave whose §Bounds
> names that path.
> **Precondition, non-negotiable**: re-run BOTH dry-run arms **at the coordinate of the act**, because
> inertness is a property of the _installed peer map_, and that map changes with every producer
> advance. **§4's HOLD forbids that advance while `EditorShell.vue:116` stands**, so the flag's
> inertness and the tripwire's HOLD have the **same expiry**, and whoever lifts one re-measures the other.
> **Falsifier**: a nonzero exit or any `ERESOLVE` line on either arm means the flag _is_ load-bearing
> for something this seat did not measure — the deletion is then refused and the finding rowed, not worked around.

**(d) The producer-facing half rides the relay, NEVER a demo-side hack** ⟨C-16, verbatim: _"Producer-facing
half rides SS-6 / the standing BH relay per owner edict"_⟩ — delivered at §6, packet **KF-APP-59**.

### §3.2 Two drift findings surfaced by this ruling — banked loudly, ruled nowhere

1. **Packument ≠ tarball at glass-ui 7.0.0.** The lock's recorded peer map carries **eleven** entries;
   the shipped `node_modules/@mkbabb/glass-ui/package.json` carries **ten**. The extra is a bare
   **`embla-carousel: ^8.0`** ⟨`grep -n 'embla' package-lock.json` → `:630` `:631` `:650` `:653`;
   `grep -n 'embla' node_modules/@mkbabb/glass-ui/package.json` → `:544` `:554` `:582`, **no bare
   `embla-carousel`**⟩. It changes no verdict — the entry is optional in the map that has it and
   absent from the map that does not — but a **version string agreeing while the artifacts disagree**
   is precisely **C-13's class**, occurring inside this wave's own manifest surface. Relayed at §6
   with packet KF-APP-59; ruled nowhere.
2. **`@mkbabb/parse-that@1.0.0` is EXTRANEOUS in `node_modules`.** ⟨`grep -n parse-that package.json`⟩
   → no hit; ⟨`grep -c parse-that package-lock.json`⟩ → **0**; ⟨`node -e "…glass-ui/package.json"`⟩ →
   `dependencies: undefined`, `peer has parse-that: false`. All four dry-runs report
   `remove @mkbabb/parse-that 1.0.0`. It is an **install-state residue, not a manifest coordinate**,
   so it is outside G-0.2's four coordinates and outside this ruling; routed at §7.

---

## §4 · THE HOLD — G-0.5 carried into the ruling, because it **BOUNDS** G-0.2

**This section exists because the cure that passes G-0.2 destroys the build.** Spec, verbatim
(`:586`): _"**This gate BOUNDS G-0.2's cure rather than following it**: a 'declare the newest glass-ui
and regenerate the lock' remediation passes G-0.2 and destroys the build."_ A manifest ruling that
recorded §1–§3 and stopped would hand the next seat the single remediation this wave forbids.

### THE HOLD, declared from this end (§Sequencing, glass-ui **OUTBOUND HOLD + FYI**)

> **INSTALLED glass-ui MAY NOT ADVANCE PAST `4bf53962` WHILE
> `origin/master:demo/components/instrument/shell/EditorShell.vue:116` IMPORTS `/header-ribbon`.**

**The three legs, all measured at this seat** (full paste: `artefacts/W0/headerribbon-tripwire.txt`):

- **producer, deleted and ANCESTRAL** — ⟨`git -C ../glass-ui ls-tree --name-only HEAD
src/components/header-ribbon/`⟩ → **(empty)**; ⟨`… '4bf53962^' …`⟩ → **5 files**
  (`HeaderRibbon.vue · README.md · index.ts · styles.css · types.ts`), deleted WHOLE at
  `4bf53962d255806a84d8fde48c049373f20cba3b` (**2026-08-04**, _"feat(reduction): land BK #18 W-DELETE
  — the Φ5 deletion spine…"_); ⟨`git -C ../glass-ui merge-base --is-ancestor 4bf53962 HEAD`⟩ → **YES**,
  so **every producer release cut at or after that commit lacks the subpath**; ⟨`grep -c header-ribbon
../glass-ui/package.json`⟩ → **0**.
- **consumer, still importing** — `origin/master:EditorShell.vue:116` = `import { HeaderRibbon } from
"@mkbabb/glass-ui/header-ribbon";`, reproduced at the settled worktree by direct read.
- **installed artifact, still shipping** — ⟨`ls -la node_modules/@mkbabb/glass-ui/dist/header-ribbon.js`⟩
  → present, 2420 B (7.0.0, cut 2026-07-16, **before** the 2026-08-04 delete).

### The blast radius is ONE, and it is one because the GRAPH says one

**LAW A, Census 2, executed on the settled tree** — the gate's own rule: _"A GREEN reached by
re-deriving the consumer set from anything other than the import graph is RED by LAW A."_

```
(1) SPECIFIER  git grep -nF 'glass-ui/header-ribbon' origin/master -- .
                 → EditorShell.vue:116                              ← the ONE live import
                 → docs/tranches/H/audit/a-glass-ui-consumption.md:48
                   docs/tranches/V/audit/R1-15-cross-repo.md:54     ← docs PROSE, non-import context,
                                                                      recorded and NEVER counted
               git grep -n 'header-ribbon' origin/master -- src/ demo/ test/ scripts/  → 1 hit, the same :116
                 (no alias root — @src · @components · @kf-engine · @state · @utils · @composables · @styles — reaches P)
(2) SYMBOL     git grep -n '\bHeaderRibbon\b' origin/master -- demo/ test/ src/ scripts/
                 → :16  <HeaderRibbon placement="right">   :50  </HeaderRibbon>   :116  the import
                 → resolved: all three the SAME file through the SAME specifier; no sibling-basename consumer
(3) CONSUMER SET = { demo/components/instrument/shell/EditorShell.vue } — EXACTLY ONE, tests included
```

### The gate reading, honest on both disjuncts

G-0.5's GREEN (`:585`) is a disjunction: _"**either** the installed producer stays at-or-below
`4bf53962` (i.e. 7.0.0, today's state), **or** `origin/master:EditorShell.vue:116` no longer imports
the deleted subpath."_ **Disjunct (a) HOLDS** (installed 7.0.0, cut before the delete). **Disjunct (b)
does NOT** (the import stands). The gate is therefore **GREEN by (a)** — which upholds seat 0's **R.2
GREEN-BEFORE-CURE finding** exactly: _the state is safe, the tripwire was undeclared_. **This unit's
act is the declaration.** No state is changed, no cure is skipped, and no `demo/**` byte is touched:
§Bounds forbids this wave writing `demo/**`, and the migration decision (which chrome host replaces
the band) is **NO-WAVE-OWNER**, SS-1/SS-2's. **W0 carries only the tripwire.**

### C-15's rider, discharged by measuring the reconciliation instead of assuming it

⟨`sed -n '16p' demo/…/EditorShell.vue`⟩ → `<HeaderRibbon placement="right">`;
⟨`grep -n 'mode="persistent"\|position="right"' …`⟩ → **no hit**. HEAD's `position="right"` — also not
a 7.0.0 prop — **did not carry forward**. C-15's warning (_"a naive reconciliation would carry it
forward"_) is discharged **by the diff of the reconciliation output**, which is the form the spec
demands and the form an assumption cannot supply.

### What the HOLD costs, and why it is cheap to lift

One consumer, one file, one import. The HOLD is not a freeze on glass-ui; it is a **precedence order**:
the consumer migrates off `/header-ribbon` **first**, the installed producer advances **second**.
Because the band's replacement is a design decision and not a version bump, **a producer advance can
never be the cure** — and **C-14 gates the scoping**: _nothing in KF.W6 may be scoped from either
archived Glass-7 letter_, only from the tree and the shipped dist (G-0.10, unit `.e`).

---

## §5 · Gate readings, BEFORE → AFTER

| gate                                               | BEFORE (spec RED baseline; reproduced read-only by seat 0, 2026-09-17)                                                                                                                                                                                     | AFTER (this unit, on the settled tree)                                                                                                                                                                                                                                                                                                                          |
| -------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **G-0.2** — manifest single-state                  | **RED** — four coordinates, three states (HEAD `6.0.0` optionalDeps · master `7.0.0` exact devDep · worktree DELETED from both manifests · installed `7.0.0`); `.npmrc` unruled                                                                            | **GREEN** — `HEAD == origin/master == worktree == installed` at `"@mkbabb/glass-ui": "7.0.0"` **exact devDep** + lock (`:19` · `:612` integrity · `dev:true`), **AND** the two written rulings landed: §2 (the worktree deletion) and §3 (`legacy-peer-deps=true` vs the two absent peers). Version half reconciled **by the reset**; ruling half by this unit. |
| **G-0.5** — header-ribbon tripwire (negative gate) | **RED as a tripwire · GREEN-BEFORE-CURE on stated disjunct (a)** (seat 0's R.2 finding) — producer deleted the dir at `4bf53962`, the one live consumer still imports it, installed 7.0.0 still ships `dist/header-ribbon.js`; the HOLD was **undeclared** | **GREEN by disjunct (a), and the tripwire is now DECLARED** — consumer set re-derived from the **import graph** (LAW A Census 2) at **exactly one**, the HOLD carried into §4, `headerribbon-tripwire.txt` banked. **G-0.5 BOUNDS G-0.2**: the "declare the newest glass-ui and regenerate the lock" remediation is refused by name.                            |

**Neither gate was reached by a workaround.** G-0.2's version half moved because the owner-hand reset
moved it; its ruling half is written, not asserted. G-0.5 changed no state at all — a negative gate is
turned by declaring its bound, and the one thing that would have turned it falsely (advancing the
installed producer) is the thing §4 forbids.

---

## §6 · The three relay packets (stated here; delivered at `INBOX.md` by this unit alone, once, at close)

Per §Bounds' `INBOX.md` row and §Sequencing's glass-ui **OUTBOUND HOLD + FYI** row. **Producer rows
NEVER become demo-side hacks** — each rides the standing BH / SS-6 relay. No packet mints a new id:
each is keyed by its **banked** id (anti-rename), and **no `O-n` letter id is minted here** — `O-21`
is reserved for **KF.W1's** delivery under COHESION §0j.C **KF-WRITE**.

| packet        | class                                                                         | content, as ruled above                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ------------- | ----------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **KF-APP-59** | FYI — **closed falsifier**, not a defect                                      | glass-ui 7.0.0's peer set names two peers absent from the keyframes.js tree (`@mkbabb/pencil-boil ^0.9.2`, `embla-carousel-vue ^8.0`); **both are producer-declared `optional`**, so strict resolution passes and nothing is masked (§3.1's four dry-runs). **Plus one producer-side question this ruling surfaced**: the 7.0.0 **packument and tarball disagree by one peer entry** (bare `embla-carousel`, present in the lock's recorded map, absent from the shipped `package.json`) — §3.2(1).                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| **EH-1**      | rider on the standing BH relay                                                | _Producer docs/letters must be re-derived against shipped bytes_ (third instance of the kf-ChromeDock doc-drift pattern), delivered with **BOTH repo-qualified letters named** — **(a)** value.js `docs/tranches/V/archive/GLASS-INBOUND-2026-07-16-headerribbon-persistent-only.md` (present, 2878 B; `:15-19` carries the _"Deleted with it: the anchor button/slot, `anchorLabel`, … and the `--header-ribbon-actions-width` knob"_ claim) and **(b)** keyframes.js `origin/master:docs/tranches/V/coordination/GLASS-INBOUND-2026-07-16-headerribbon-consumer-updates.md` (present at the frontier, 26 L). **A relay naming one of the two hands the recipient the wrong tree.** Producer content to correct: `../glass-ui/docs/consumer-evidence/header-ribbon.md:3` still reads _"(RETAINED persistent-only — BI.W-P114 re-spec)"_ and `:5` still names `src/components/header-ribbon/`, **against producer HEAD where the directory is deleted**. |
| **KF-APP-5**  | **producer half MOOT** — downgraded to FYI + the consumer-evidence correction | The producer **answered by deletion** (`4bf53962`, ancestral to HEAD): the ask needs no producer decision. What remains is the consumer-evidence correction above **and §4's HOLD, declared from this end** so the producer's next bump does not silently break the one consumer's build.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |

**Corroboration for EH-1, at the shipped artifact** (the full G-0.10 re-derivation is **unit `.e`'s**;
this is the rider's ground, not its discharge): ⟨`grep -o 'anchor\|pinned\|placement\|anchorLabel\|
HeaderRibbonMode' node_modules/@mkbabb/glass-ui/dist/components/header-ribbon/HeaderRibbon.vue.d.ts`⟩
→ `anchor` ×1 · `pinned` ×1 · `placement` ×1, **`anchorLabel` and `HeaderRibbonMode` absent**;
⟨`grep -rl 'header-ribbon-actions-width' node_modules/@mkbabb/glass-ui/dist/`⟩ → **1 file**
(`dist/components/header-ribbon/styles.css`). **EH-1 reproduces**: the shipped 7.0.0 still carries the
`anchor` slot with its `{pinned}` payload and the `--header-ribbon-actions-width` knob that letter (a)
says were deleted; only `mode` and `anchorLabel` are actually gone.

---

## §7 · Residuals — routed, not cured

1. **`.npmrc`'s retirement act** — §3(c)'s ROUTED ACT. **NO-WAVE-OWNER**; homing is SS-1/SS-2's.
   Expires with §4's HOLD; both are re-measured by whoever lifts either.
2. **`@mkbabb/parse-that@1.0.0`, extraneous in `node_modules`** — §3.2(2). An install-state residue,
   not one of G-0.2's four coordinates. Named so no later seat reads it as a manifest defect; it
   vanishes on the next real `npm ci` and needs no act.
3. **The packument/tarball peer-map divergence at glass-ui 7.0.0** — §3.2(1). Relayed at §6
   (KF-APP-59); **producer-owned**, and nothing in this tree is changed for it.
4. **The COHESION §4a mirror.** The SS-6 accretion register is the natural second home for the three
   §6 packets. **`COHESION.md` is not in this unit's writable set**, so the mirror is routed to the
   orchestrator rather than written — and the packets are durable regardless, because `INBOX.md` is
   the ledger of record under E13 and §Bounds names it as this wave's landing site.
5. **Unit `.e`'s inheritance.** §6's EH-1 corroboration is **ground, not discharge**: G-0.10 requires
   XR-4 / IN-GLASS-1 / `DISPOSITIONS.md:21` re-read against **both** repo-qualified letters **and**
   `dist/header-ribbon.js`, and _"a receipt naming one letter is RED"_. Both letters are named here
   with their measured coordinates so `.e` starts from bytes.

## §8 · Limits of the instrument, declared rather than papered over

- **The peer-map ruling is a reading of TODAY's installed artifact.** It is true of glass-ui 7.0.0 as
  installed at `81a56990`. It is **not** a claim about any other producer version, and §4's HOLD is
  the reason no other version is in play.
- **The dry-run probes prove resolution, not build.** They prove `npm ci` and `npm install` resolve
  strict-clean; they do not execute the build, and this wave runs no build
  (§Cadence: _"No `npm run lint` / `check` / `test` runs in this wave"_; the one `npm run gh-pages` is
  **G-0.10's, unit `.e`'s**).
- **No closure is asserted in this file's own voice.** The consumer set of `/header-ribbon` is stated
  as what the **pasted import-graph census** returns (`headerribbon-tripwire.txt` §B, this date), with
  its prose hits recorded as non-import context; the peer enumeration is stated **at** the table that
  enumerates it, with its counting rule (_one row per key of the installed
  `package.json`'s `peerDependencies`; the class is its `peerDependenciesMeta.optional` flag_).

---

**Status**: G-0.2 **GREEN** · G-0.5 **GREEN (by disjunct (a), tripwire DECLARED)**. Both rulings
written; neither deferred. **E-3**: this file is dated and append-only — corrections land as dated
addenda beside, never as a rewrite.
