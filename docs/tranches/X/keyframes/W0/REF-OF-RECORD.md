SERVED MODEL: claude-opus-5[1m]

# REF-OF-RECORD — the 58-record stamp ledger + the appended-correction index (KF.W0 · G-0.9)

**Date**: 2026-09-17 · **Seat**: KF.W0.e
**Ref of record**: keyframes.js `origin/master` **`81a56990736ced5b5edde0b84c527680ac7689b1`**.
**Disqualified**: the local pin `8281638c0ac4ac8c54a67a018ca5bf6a9117174f`.
**Pre-settle working tree**: preserved only as snapshot commit `6d280ee7bec7793846b2e2e1d250e1ea0a21859a`
(OP-1's step 2) — a historical coordinate, never an anchor.
**Authority**: `KF-W0.md` §Gates **G-0.9** (`:653-657`), §Scope 9 (`:313`), §Carry **C-2 · C-19 ·
C-20 · C-21 · C-22 · C-1.R** (`:441-456`).
**Raw transcript**: `docs/tranches/X/keyframes/artefacts/W0/refofrecord-stamp-audit.txt`.

**The binding form, carried verbatim** ⟨kf-TimelineCaret⟩: _"any spec consuming this registry states
WHICH ref it cures against."_ **All 58 now do.**

---

## §1 — THE PASS

|                   | reading                       | command                                                                                               |
| ----------------- | ----------------------------- | ----------------------------------------------------------------------------------------------------- |
| records           | **58**                        | `ls registry/adjudicated/kf-*.md \| wc -l`                                                            |
| stamped at open   | **0**                         | the wave record's RED baseline                                                                        |
| stamped at close  | **58**, each **exactly once** | `grep -lc 'REF-OF-RECORD — KF.W0' kf-*.md \| wc -l` → 58; `grep -c … \| awk -F: '$NF!=1'` → **empty** |
| lines added       | **1204**                      | `git diff --numstat -- …/adjudicated/ \| awk '{a+=$1;d+=$2}'`                                         |
| lines **deleted** | **0**                         | same command; and `awk '$2!=0'` returns **no row**                                                    |

**E-3 is satisfied structurally, not by assertion**: the pass is a pure append. Not one byte of
dated evidence was rewritten, reordered or re-read-out. Every correction below is an **appended
statement beside** the cell it corrects, under that cell's own record and id.

## §2 — C-21: THE PASS IS DEMONSTRABLY PER-FILE, AND HERE IS THE ENUMERATION

A blanket per-repo re-anchor passes a naive stamp count and **corrupts three banked rows**. Each of
the 58 stamps therefore carries **its own record's measured offset**, from
`git diff --numstat 8281638c 81a56990 -- <that record's subject file>`. **64 file-readings over 58
records** (six records have two subjects); full table in the transcript §4.

| class                        | count           | meaning in the stamp                                                                                        |
| ---------------------------- | --------------- | ----------------------------------------------------------------------------------------------------------- |
| **IDENTICAL** at pin and ref | **33 readings** | _"this record's line anchors into the file bind unchanged — and that is a measurement, not an assumption."_ |
| **MOVED** (`+a/−d` stated)   | **31 readings** | _"every line anchor must be re-resolved at `81a56990` before any cure."_                                    |

`33 + 31 = 64` ✔ over its own denominator, **double-run**; zero readings are ABSENT-at-pin. A record
with one IDENTICAL and one MOVED subject file is stamped **MOVED** — the conservative direction, and
the per-file offsets are printed beside it so the next seat re-reads the split rather than the verdict.

### §2.1 The two rows that prove the direction is per-FILE and not per-repo

**KF-TD-2 — the INVERSION.** `demo/components/instrument/shell/TypingDots.vue`:
⟨`git diff --numstat 8281638c 81a56990 -- <it>`⟩ → **`4  9`**, reproducing the fold seat's _"vs HEAD
1 file, 4+/9−"_ byte-exactly, while the **pre-settle worktree was IDENTICAL to `origin/master`** for
that file. **For this one file the local pin was the OUTLIER.** The WAAPI-lane readings are the
shipping truth; the rAF-lane readings describe stale HEAD. Its three travelling corrections are each
landed **at their own bank**, scoped to this file alone: KF-EST-21's scoping and EST ruling 7's
direction at `kf-EditorStartScreen.md`; **KF-AT-28's re-anchor obligation DISCHARGED** at
`kf-AnimatedText.md`.

**kf-AmigaScene `:155` — the one MEASURED per-file offset the corpus hands this wave, in the OPPOSITE
polarity.** Banked: _"comment-only drift, `useAmigaDemo` −2 below `:73`."_ Re-run:
⟨`git diff --numstat … -- demo/scenes/amiga/useAmigaDemo.ts`⟩ → `5  7`, 158 L → 156 L, **net −2**;
⟨`git diff …`⟩ shows **both hunks are comment-block rewrites with zero code-line change**, the first
opening at `@@ -73,11 +73,9 @@`. **Byte-exact.** A small, signed, comment-only offset beside a
whole-file inversion is exactly why the pass records **an offset per file** and never **a verdict per
repo**.

## §3 — `D-19`: THE STAMP IS KEYED TO THE BANKED ID (C-1.R row 6)

The corpus routes its re-anchor obligation on `D-19`, and the id is **overloaded**. Both readings
re-run at the corpus bytes, with the predicate stated so they reproduce:

```
grep -l 'D-19' kf-*.md | wc -l                                          → 42 records   (bare token)
grep -h 'D-19' kf-*.md | wc -l                                          → 94 lines     (bare token)
predicate: a D-19 line ALSO matching 're-anchor|re-resolve|Re-anchor|Re-resolve'
                                                                        → 34 records / 39 lines
42 − 34 = 8 records whose D-19 is a COMPONENT-LOCAL id:
  kf-ChannelOptions · kf-CubeScene · kf-KeyframesStringControls · kf-OrbitalDrag
  · kf-SquareInstrument · kf-SquareScene · kf-StartingStyleTarget · kf-TimelineCaret
58 − 42 = 16 records carry no D-19 at all
```

Reproduces C-1.R row 6 **exactly**, the same eight records included. Each stamp states which of the
three classes its record is in:

- **34** discharge their own `D-19` routing word — **NO RE-BOOK**; the content is carried whole at
  C-2, C-21 and G-0.9.
- **8** are told, in the stamp, that their `D-19` is a component-local id, so the record-qualification
  rule keeps the sweep from booking a dead-token cluster as a re-anchor obligation.
- **16** are reached by the stamp and by nothing else — which is precisely why the stamp is written
  at all 58 and not at the 42 the token reaches.

**The two records the spec names nowhere else — `kf-ChannelControls` and `kf-TimelineTrack` — reach
this GREEN only through that key, and both carry a stamp.**

## §4 — C-19: THE LEDGER RESOLVED AT ITS CORRECTED DENOMINATOR

Re-derived at the bytes ⟨`sed -n '379p' KF-W0.md | grep -oE 'kf-[A-Za-z.]+' | sort -u | wc -l`⟩ →
**32 distinct records**, of which **two are the cell's own declared ANTI-inheritance events**:

- **`kf-CubeAxisLines`** — reader-β re-derived F-1's substrate **from git** rather than inheriting it.
- **`kf-AnimatedText`** — two readers converged independently on the `role="img"` implicit-role
  override, _"the anti-signature of citation-inheritance."_

**32 − 2 = 30 LEDGER MEMBERS + 2 ANTI-FIRINGS, ENUMERATED SEPARATELY.** A sweep keyed to 32 resolves
those two to the **opposite** disposition and cannot close — the exact reason D-3 corrected the
count. Each of the 30 carries a **MEMBER** line in its stamp, dispositioned identically and
truthfully: _the firing is a dated record, not a live defect — its cause (a manifest/tree claim filed
without naming its baseline) is extinguished by the stamp, which names the baseline for every row in
the file._ Each of the 2 carries an **ANTI-FIRING** line instead, and neither is swept as a firing.

The derived laws are booked verbatim where later seats read them: _"the failure is never derivation;
it is an unread registry and an unnamed baseline"_ ⟨kf-MbabbMenu⟩ · _"EVERY re-reader row — confirmed,
killed, or missed — runs through the bank before booking"_ ⟨kf-EditorShell⟩ · _"a 'missed' claim
without a bank sweep is unadjudicable"_ ⟨DISSENT 4⟩ · the tree-motion law ⟨DISSENT 3⟩.

## §5 — C-20: THE NAMED TEST CASE, RESOLVED BY MEASUREMENT

_"If two adjudicated records still disagree about one file's bytes, the wave has not re-anchored."_
Subject: `demo/app/dock/MbabbMenu.vue`.

| coordinate                                | LOC     | vs the ref of record                                |
| ----------------------------------------- | ------- | --------------------------------------------------- |
| pin `8281638c`                            | **241** | `git diff --numstat` → **`13  133`** (net **−120**) |
| pre-settle worktree (snapshot `6d280ee7`) | **121** | `git diff --numstat` → **EMPTY** — byte-identical   |
| ref of record `81a56990`                  | **121** | —                                                   |

- **kf-CubeScene** — _"byte-identical between the worktree and `origin/master`"_ — **TRUE**.
- **kf-ChromeDock** — _"MOVED at the frontier (−146 lines)"_ — **TRUE IN DIRECTION**; the measured
  motion is **+13/−133, net −120**, and **−146 reproduces at no coordinate this wave can name**.

**The two banks were measuring different coordinate PAIRS and neither named its pair.** That is C-2's
mechanism, not a contradiction of fact — and naming the pair is the whole content of this gate. The
load-bearing shape kf-EditorShell's own probe checked survives verbatim at the ref of record: the
`@select.prevent` menuitem wrappers, **5 sites** (`:8` `:18` `:29` `:46` `:57`). The reconciliation is
appended at **both banks** (`kf-ChromeDock`, `kf-CubeScene`), at the **subject** (`kf-MbabbMenu`) and
at **`kf-EditorShell`** (DISSENT 3), per E-3 — never as a rewrite.

## §6 — THE SIX NAMED APPENDED CORRECTIONS, LANDED BY ID

| #         | correction                                                                                                   | landed at                      | receipt                                                                                                                                                                                                                                                                                                                                                            |
| --------- | ------------------------------------------------------------------------------------------------------------ | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **(i)**   | `TABS_EXTERNALLY_MANAGED_KEY`'s provide site is **`demo/app/App.vue:176`**, not the banked stale-HEAD `:169` | `kf-App.md`                    | ⟨`git grep -n … origin/master -- demo/app/App.vue`⟩ → `:140` import, **`:176` `provide(TABS_EXTERNALLY_MANAGED_KEY, true);`**. Path-qualified: ⟨`git show origin/master:demo/App.vue`⟩ → _fatal: path does not exist_                                                                                                                                              |
| **(ii)**  | `--dock-margin` = **9 live unfallbacked sites + 1 prose mention**                                            | `kf-TransportDock.md`          | ⟨`git grep -n 'var(--dock-margin)' origin/master -- demo/`⟩ → **10 lines**, of which `TransportDock.vue:379` is a comment ⇒ **9 live + 1 prose**, reproducing the banked figure. **Second predicate declared**: the bare token returns **11** lines — `layout.css:124` is a second prose mention carrying no `var(`. The delta is the predicate, not the substrate |
| **(iii)** | **KF-SKEL-7**'s cascade-level coupling arm recorded **beside the import census**                             | `kf-App.skeleton.md`           | banked ⟨`:42`⟩; the arm is C-9's legend rider, landing in the census re-anchor at `lane-frontend.md` (KF.W0.d, same wave). Its token-namespace probe half **stays KF.W6's**                                                                                                                                                                                        |
| **(iv)**  | `kf-AnimationVisualizer.md:9`'s census cell corrected to **worktree-scope**                                  | `kf-AnimationVisualizer.md`    | the kf-SequenceScrubber **K-1** kill; every anchor in that instruments line is a read of the pre-settle working tree, now preserved only at `6d280ee7`                                                                                                                                                                                                             |
| **(v)**   | the kf-KeyboardShortcutsModal **renumber DEMOTED to a claim-input**                                          | `kf-KeyboardShortcutsModal.md` | _"the renumber is superseded by the KF.W0 C-17 single-motion mint; the slot id is whatever the mint assigns."_ Its `:29` ruling landed a **second** "S-10" on top of `kf-KeyframesEditor:63`'s and `kf-SquareInstrument:78`'s — the exact mechanism C-17 exists to kill                                                                                            |
| **(vi)**  | the **`kf-KeyframeTimeline` header's _"working tree = the audited tree"_ equation is FALSE**                 | `kf-KeyframeTimeline.md`       | C-1.R row 4 (kf-TimelineCaret's MISS-α5 ≡ RR-β K-BASE attached correction). At the audit's own date the checkout was **41 behind / 1 ahead**, neither ref an ancestor (merge-base `a59d3a22`), 252 tracked modifications, 124 untracked — two of them cited BY LINE in landed records while absent from the pin's tree                                             |

⟨`grep -l 'of the six named at G-0.9' kf-*.md`⟩ → **exactly those six records**, one correction each.
_(A bare `grep 'CORRECTION ('` also hits `kf-HeroAurora.md:84` — pre-existing dated evidence,
declared at transcript §9b so it is not re-found as a seventh.)_

## §7 — THE OTHER APPENDED CORRECTIONS THIS PASS LANDED (beyond the named six)

Each is an **appended** statement under the record's own id, never a rewrite.

| record                                                                       | appended                                                                                                                                                                                                                     | ground         |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `kf-ChromeDock` · `kf-CubeScene` · `kf-MbabbMenu` · `kf-EditorShell`         | the C-20 reconciliation, measured at three coordinates                                                                                                                                                                       | §5             |
| `kf-TypingDots` · `kf-EditorStartScreen` · `kf-AnimatedText`                 | C-21's inversion and its **three** travelling corrections, each scoped to `TypingDots.vue` alone                                                                                                                             | §2.1           |
| `kf-EditorHeader`                                                            | **EH-1 re-verified byte-exact against the consumed 7.0.0 artifact**; the **two repo-qualified letters** named with their repos; **XR-4 / `DISPOSITIONS.md:21` falsified at the frontier**; the `@layer` order delta declared | G-0.10         |
| `kf-EditorShell`                                                             | both letter-(b) consumer updates **already landed** at the ref of record; C-15's phantom attribute did **not** carry forward; the `/header-ribbon` consumer set is **exactly one**                                           | G-0.5 / G-0.10 |
| `kf-SharePopover`                                                            | the glass token re-derivation — **`--spring-press` and `--spring-smooth` BOTH ship**; `ACKNOWLEDGE_WINDOW_MS` **0** in the consumed dist; `--radius-pill` **29 files**                                                       | G-0.10         |
| `kf-KeyframeCardList`                                                        | `--separator-ink` **ships** in the consumed dist (2 files) while `--ink-seam` is **absent** (0) — the relay premise is a producer-HEAD fact, not an artifact fact                                                            | G-0.10         |
| `kf-CSSPasteDialog`                                                          | `--ink-perimeter` **0** in the consumed dist, confirming the 2026-08-04-after-2026-07-16 dating; the Jul-16 build witness superseded                                                                                         | G-0.10         |
| the **10** records citing `index-CL_QYCiO.css` by name                       | the asset is superseded by `index-CBB2Hr7m.css` at a dated, hashed build; **seven byte-offset receipts re-derived and all seven reproduce**                                                                                  | G-0.10         |
| `kf-SpringTrace`                                                             | `D-15` **NO RE-BOOK** guard, record-qualified against kf-EditorHeader's `D-15`/`D-17`                                                                                                                                        | C-1.R row 5    |
| `kf-KeyframesStringControls`                                                 | `L-M-9`'s **two limbs disambiguated** — MAJOR fold vs retired probe; a seat greping the id now finds exactly two dispositions and re-books neither                                                                           | C-1.R row 7    |
| `kf-AnimationControlsGroup` · `kf-DemoGlobalChrome` · `kf-EditorStartScreen` | the three R-8 residue families, each pointed at its enumeration in `GATE-ROSTER.md`                                                                                                                                          | G-0.7          |
| `kf-CubeAxisLines`                                                           | KF-AX-31's `proof:brittleness` family **rostered and routed to KF.W6**, never struck here                                                                                                                                    | G-0.7          |
| `kf-SequenceScrubber`                                                        | K-1's corollary executed; C-9's provenance corrected; `L·D-2`'s MAJOR half **booked, not dropped**                                                                                                                           | C-9 / D-7      |
| `kf-AmigaScene`                                                              | `AGG-P1` named as the **census-probe id it is**, a provenance handle and not a lost cure                                                                                                                                     | C-1 / D-4      |

## §8 — GATE READING

**G-0.9 — REGISTRY RE-ANCHOR.** _Every adjudicated record states WHICH ref it cures against._

| GREEN clause                                                                                                                                                               | reading                                                                                                                                         |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| every record carries a stamped ref-of-record                                                                                                                               | **GREEN** — 58 of 58, exactly once each                                                                                                         |
| every contradicting cell reconciled by **APPENDED** correction (E-3)                                                                                                       | **GREEN** — 1204 added / **0 deleted**; C-20 resolved at both banks, the subject and the dissent                                                |
| C-19's ledger resolved at its corrected denominator — **30 members + 2 anti-firings enumerated separately**                                                                | **GREEN** — §4; the two anti-firings carry an anti-firing line and are not swept as firings                                                     |
| the pass demonstrably **per-file** (C-21's three corrections landed, KF-AT-28 discharged for that file), the corpus's one measured per-file offset carried as the exemplar | **GREEN** — §2, §2.1; the kf-AmigaScene offset re-run byte-exact and the 64-reading table banked                                                |
| the **six** named appended corrections landed **by id**                                                                                                                    | **GREEN** — §6                                                                                                                                  |
| **(vii)** the stamp keyed to **`D-19`** via C-1.R row 6                                                                                                                    | **GREEN** — §3; 34/39 in the re-anchor sense, 42/94 bare, the eight local-id records named, the 16 tokenless records reached by the stamp alone |

**Falsifier, run**: _"a blanket per-repo re-anchor passes a naive stamp count and corrupts three banked
rows — the falsifier is `git diff --stat origin/master -- …/TypingDots.vue` returning empty while the
stamp says 'stale HEAD'."_ Run at this seat: that diff **is** empty (the tree is the frontier), and
**the TypingDots stamp does not say "stale HEAD"** — it states the measured `+4/−9` against the
**disqualified pin**, names the pin as the outlier, and carries the inversion with its three
file-scoped corrections. **Not RED.**

---

## §9 — G-0.10 GATE READING (APPENDED 2026-09-17 · E-3: nothing above is rewritten)

**Why here.** G-0.10 is the one gate of unit `.e`'s four that the spec gives **no dedicated
work-product row** in §Bounds — its GREEN lands as *appended corrections at the registry ids* (§7
above, every row grounded `G-0.10`) and as the transcript
`docs/tranches/X/keyframes/artefacts/W0/glass-citation-rederivation.txt`. A turned gate whose reading
reaches no doc is checkable only by a seat that thinks to open a `.txt`; the reading is therefore
written beside its landings. **No new claim is made below** — every figure is re-executed at this
seat's clock and double-run, and where a figure was already banked it is stated as *reproduces*.

**G-0.10 — SOURCE-OVER-DIST PROVENANCE.** *glass-ui citations re-derived against the consumed
artifact.*

| GREEN clause                                                                          | reading                                                                                                                                                                                                                                                                                                                       |
| ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| every surviving `glass-ui/src/**` citation re-derived against `node_modules/@mkbabb/glass-ui/dist/**` **or struck** | **GREEN** — ⟨`grep -c 'glass-ui/src' kf-*.md`⟩ → **4 records, 1 line each** (`kf-CSSPasteDialog` · `kf-KeyframeCardList` · `kf-KeyframeTimeline` · `kf-SharePopover`), every one a **META-citation about the provenance defect**, not a live `file:line` claim into glass source — so none is struck and each is re-derived at its load-bearing token. The consumed artifact is identified **by bytes, never by a version string** (C-13's whole content): ⟨`shasum -a 256 $(find node_modules/@mkbabb/glass-ui/dist -type f \| sort) \| shasum -a 256`⟩ → `3cc72cc9d84879c7a1ada0ae2d210fbf11ca39904cb5909759c8717bc45da6f2`, **double-run identical at this seat** |
| XR-4 / IN-GLASS-1 / `DISPOSITIONS.md:21` re-read against **BOTH repo-qualified letters and the shipped artifact** | **GREEN** — **(a)** value.js `docs/tranches/V/archive/GLASS-INBOUND-2026-07-16-headerribbon-persistent-only.md:15-19`, re-read at this seat (its seven claimed deletions quoted at transcript §3); **(b)** keyframes.js `origin/master:docs/tranches/V/coordination/GLASS-INBOUND-2026-07-16-headerribbon-consumer-updates.md`, **26 L**, re-read at this seat; **+ `dist/header-ribbon.js`**, re-read at this seat — `anchor` **4** · `pinned` **3** · `inert` **2** · `aria-hidden` **2** · `anchorLabel` **0** · `HeaderRibbonMode` **0**. **Five of letter (a)'s seven deletions are falsified by the shipped 7.0.0; only `anchorLabel` and `HeaderRibbonMode` are actually gone** (EH-1 holds). XR-4 itself is **FALSIFIED at the settled frontier**: ⟨`sed -n '16p' EditorShell.vue`⟩ → `<HeaderRibbon placement="right">` (no `mode=`) and ⟨`grep -c 'defineExpose' EditorShell.vue`⟩ → **0**; both of letter (b)'s consumer updates are already applied |
| **one fresh `npm run gh-pages`**, so the byte-offset receipts stop riding a Jul-16 artifact | **GREEN, and run EXACTLY ONCE** (2026-09-17 13:37:14, `package.json:43` `"vite build --mode gh-pages"`; **no `build:gh-pages` exists at any coordinate**, R-11 re-verified). `index-CL_QYCiO.css` (571142 B, Jul 16 09:11) → `index-CBB2Hr7m.css` (571192 B, Sep 17 13:37). **The artefact banked is the HASH, not the bytes**: ⟨`find dist/gh-pages -type f \| sort \| xargs shasum -a 256 \| shasum -a 256`⟩ → `bad6ea595fb59899e6589ad731b542d77eb19079a67d10548f6c07fc3c9564d2` — **re-verified double-run at this seat, byte-identical**, over **54** files. **This seat did NOT re-run the build**: a second run would breach the spec's *exactly one*, and the banked hash is the standing witness |

**Falsifiers, run at this seat**

- **(1) "matching version strings on both sides passes the check that produced this defect."** Not
  RED: no leg of this gate rests on a version string. The consumed artifact is pinned by the dist
  **digest** above; the producer tree `/Users/mkbabb/Programming/glass-ui` was **never opened** by
  this unit (READ-ONLY always, and here not even read); every producer claim is measured against
  `node_modules/@mkbabb/glass-ui/dist/**`.
- **(2) "a Glass-7 consume slice scoped from the letter rather than the tree."** Not RED: the two
  letters are recorded **with their repos** and with **what each one gets wrong**, and the tripwire
  is stated from the import graph — the `/header-ribbon` consumer set is **exactly one**
  (`EditorShell.vue:116`), LAW-A Census 2. Nothing in KF.W6 is scoped from either letter.
- **(3) "a receipt naming ONE letter is RED."** Not RED: **both** are named, each with its repo, at
  C-14, at transcript §3, and in the appended correction at `kf-EditorHeader`.

**The dead asset name, disposed.** ⟨`grep -l 'index-CL_QYCiO' kf-*.md`⟩ → **10 records**, re-run at
this seat. The coordinate is superseded, **the findings are not**: all seven byte-offset receipts
re-derive GREEN in the fresh build (transcript §6), and the one delta — the `@layer` statement order —
is **declared rather than absorbed** and appended at `kf-EditorHeader` under its own id. The 14 dated
challenge files under `audit/kf-components/` are **immutable dated evidence and were not touched**
(E-3).

**W0 moved no product byte here.** ⟨`git -C /Users/mkbabb/Programming/keyframes.js status --short
--untracked-files=no`⟩ → **0 rows**; ⟨`… status --short -- demo/`⟩ → **0 rows**.
`dist/gh-pages/**` is git-ignored at the frontier (`.gitignore:10` `dist/`), so the one regeneration
commits nothing and is **regenerate-only**, never hand-edited.
