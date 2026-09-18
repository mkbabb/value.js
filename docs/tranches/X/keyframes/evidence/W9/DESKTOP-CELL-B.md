SERVED MODEL: claude-opus-5[1m]

# X.KF.W9 `.b` — THE DESKTOP CELL · THE CAPTURE BAND, MEASURED AND BLOCKED

**Wave** X.KF.W9 (Track B) · **unit** `.b` (cell `safari-app/desktop`) · **2026-09-17**.
**Subject**: S-8 families **(i)** three-rect ONE mount · **(ii)** the cartoon plate ONCE · the **1280 arm**
of **(iii-a)** the OD-V3 capture packet; and the capture limbs of G-KFW9-6(ii) and G-KFW9-7.

**Verdict: ZERO captures taken. Not by choice and not by deferral — the capture band's preconditions are
unmet at this seat, re-measured here rather than inherited from `.a`, and the blocker has CHANGED SHAPE
since `.a` booked it.** This file is the measurement and the ask.

---

## 1 · THE BAND'S PRECONDITIONS, MEASURED AT THIS SEAT

Every row is a command run by `.b`, at the clock printed. `.a`'s rows are cited where they date a state
this seat could no longer observe; **nothing in this section is inherited.**

| clock | fact | command → output |
|---|---|---|
| 13:37 | a gh-pages bundle existed at wave-open | `.a` SUBSTRATE-PIN §3 (dated reading: `index.html` 8,381 B, `assets/` 53 entries) |
| 15:26:18 | **bundle destroyed #1** — npm `prepare` → `build:lib` self-empties `dist/` | `.a` SUBSTRATE-PIN §3.2 (mechanism measured there: `package.json:36 "prepare": "npm run build:lib"`, no `outDir` on the lib branch) |
| 16:13:48 | 21 `demo/` files dirty, uncommitted — the photographed surface being edited | `.a` SUBSTRATE-PIN §8 |
| **16:17:47** | a gh-pages bundle **reappears** | ⟨`stat -f '%N %Sm' dist/gh-pages/index.html`⟩ → `Sep 17 16:17:47 2026` |
| **16:18:26** | KF.W4 `.a` commits **`5388907b`** — *"wire vue-tsc into `check` … cure the day-one type surface (X.KF.W4 .a / G-KFW4-1)"*, 26 files / 23 under `demo/` | ⟨`git log -1 --format='%H%n%ci%n%s' 5388907b`⟩ |
| **16:18:48** | tree quiescent: `HEAD 5388907b`, `git diff --name-only -- demo/` → **0** | ⟨`git rev-parse HEAD`⟩ · ⟨`git diff --name-only -- demo/ \| wc -l`⟩ → `0` |
| **16:31:58** | **bundle destroyed #2** — `dist/` rewritten by another `build:lib` | ⟨`find dist -maxdepth 1 -type f -exec stat -f '%Sm %N'`⟩ → `16:31:58` on `dist/keyframes.js`, `registry-*.js`, `sequence-*.js`; `16:31:59` on `dist/keyframes.d.ts` |
| **16:35:38** | **no bundle**; the tree is dirty again with a **different** sibling chassis | ⟨`ls dist/gh-pages`⟩ → `No such file or directory` · ⟨`git status --porcelain -uno`⟩ → `M .dependency-cruiser.cjs` · `M .github/workflows/ci.yml` · `M package-lock.json` · `M package.json` · `M vitest.config.ts` |

### 1.1 · What changed since `.a` booked it — and why it is WORSE, not better

`.a` booked **two** blockers and offered three shapes, noting that *"only the orchestrator can pick one"*:
**(1)** no bundle — *"curable by one command under a named grant"*; **(2)** no stable source — *"not
curable by this wave at all"*.

At this seat, **blocker (2) dissolved and re-formed inside eighteen minutes**, and **blocker (1) fired a
second time**. The upgrade is structural, and it is the finding this unit hands up:

> **The kf checkout is a SHARED, ACTIVELY-WRITTEN workspace for the whole X·KF fan-out. In it, a
> `dist/gh-pages/` bundle has a lifetime of minutes.** Twice in one wave an unrelated sibling's `npm
> install` / `build:lib` emptied `dist/` and took the gh-pages build with it — 15:26:18 and 16:31:58 —
> and between those two events the demo source went dirty (16:13), settled (16:18), and went dirty again
> (16:35).
>
> **A one-off rebuild under a grant therefore does not open the band.** It restores an artifact that the
> next sibling install destroys. What the band needs is either a **declared quiescence window** on the kf
> checkout, or a **separate serving tree** (`.a`'s shape (b)) that no sibling writes.

### 1.2 · The 16:17 bundle: FOREIGN, and its provenance is unprovable

For thirteen minutes a bundle existed. It was **not** this wave's and could not be stamped:

- built **16:17:47**, i.e. **39 seconds BEFORE** the commit `5388907b` (16:18:26) that would have named
  its source. It was therefore compiled from an **uncommitted working tree**, matching **no ref**.
- its tree digest was taken while it existed —
  ⟨`find dist/gh-pages -type f | sort | xargs shasum -a 256 | shasum -a 256`⟩ →
  **`a599205a5e0da27f5a8a030fbe4451f74334a0e94c4300cf7fa9a5d3a3dfad54`** — recorded here as a dated fact
  about bytes that **no longer exist** (destroyed 16:31:58) and that nobody can re-hash.

`.a` §7 names this case in advance, in the row headed **what must NOT happen**: *"a capture against a
**stale or foreign** bundle … evidence that cannot be proved to be the bytes anyone looked at."* A
capture taken in that window could have carried `bundleSha256: a599205a…` truthfully and
`substrateSha: 5388907b` **only as an assertion** — the one thing the §H witness-substrate law and
G-KFW9-14 exist to forbid. **It was not taken.**

### 1.3 · And the pin has moved out from under the band

The wave's published pin is **`55e9bf0d`** (SUBSTRATE-PIN §1). The kf checkout's HEAD is **`5388907b`**
(= pin + 1). ⟨`git rev-parse origin/master`⟩ → still **`55e9bf0d`** — the commit is **local and unpushed**,
so even the remote does not carry the substrate the working tree would serve.

**Capturing at `5388907b` is a RE-PIN**, which `.a` booked as shape (c), *"lawful, but … a real cost and
must be a decision, not a drift"*. **This seat does not take that decision.** It prices it instead,
because the price turned out to be small and measurable — `PRM-ENUMERATION.md` §5:

- PRM census (`prefers-reduced-motion` ∪ `respectReducedMotion`): **25 lines at both refs**, content
  byte-identical, **one coordinate drifts** (`EasingTarget.vue:234` → `:241`).
- engine instantiations: **40 at both refs**, content byte-identical, **three coordinates drift** (all in
  `useSquareDemo.ts`).

**A re-pin costs four line numbers, not a re-census.** That is offered as evidence for the ruling; it is
not the ruling.

---

## 2 · WHY NO CAPTURE WAS TAKEN — the law, cited, not paraphrased

1. **§Bounds**: *"Do NOT touch — **any keyframes.js byte**"* — after R-9a this wave holds **zero** kf
   write grants. A rebuild writes `dist/`. **S-13** makes it *a bounds expansion → triumvirate, never a
   quiet build.* This unit's writable set contains **no kf path**.
2. **§H witness-substrate law** + **G-KFW9-14**: *"every capture names substrate ref + sha + cell."* At
   16:17–16:31 the only servable bundle matched no ref; from 16:31:58 there is no bundle at all.
3. **§0j.C KF-ODV3**: the capture band is *"AUTHORIZED to run"* — authorisation is not a bundle. The
   ruling authorises the act; it does not manufacture the artifact the act photographs.
4. **`.a` §8**: the shape decision is *"above this seat"*. This seat re-measured, found the situation
   materially changed, and **hands the change up rather than resolving it by capturing anyway**.

**What this seat refused, explicitly**: building in the kf tree · serving the foreign 16:17 bundle ·
stamping `55e9bf0d` on bytes compiled from something else · re-pinning to `5388907b` on its own authority
· stashing, checking out or otherwise quieting a sibling's worktree · substituting a `webkit-engine`
(Playwright) run for the `safari-app` cell — **that last is I-20's convicted failure by name**, and it is
the tempting one, so it is written down.

---

## 3 · THE S-8 FAMILIES THIS UNIT OWES — specified, unspent, no probe double-spent

Each family below is **UNMEASURED**, with **the same single precondition**: a servable gh-pages bundle at
a **named** ref, in a tree nobody is writing. Shot lists are published so the shots are unambiguous and so
`.e`'s `SS-13-CAPTURE-RECEIPT.md` can state the packet's exact precondition rather than a silence.

### (i) · The three-rect probe — **ONE mount**

- **Rows discharged**: SS-13 #1 across **kf-SequenceAxis · kf-SequencePlayhead · kf-SequenceScene ·
  kf-SequenceTarget** — four records, one mount. **K-29 stands against ruling it statically**, so a
  reading taken from source is not a substitute and is not offered.
- **Shot**: the sequence scene at 1280, the three rects in one frame, engine at rest.
- **DISCRIMINATOR**: all three rects in a single frame with their geometric relation visible — a
  per-rect crop proves nothing about the relation. **FALSIFIER**: any frame in which the three are not
  simultaneously visible voids the family.
- **State**: **UNMEASURED** · **0 probes spent** (so none is double-spent later).

### (ii) · The composited `Card cartoon tier="quiet"` plate — **ONCE**

- **Rows discharged**: **KF-AV-19/D-8** ⟨kf-AnimationVisualizer⟩ · **D-6/D-7** ⟨kf-KeyframeTimeline⟩ ·
  **D-5/D-6/D-m3** ⟨kf-TimelineTrack⟩ · **D·M-7** ⟨kf-TimelineCaret⟩ — four records, one plate.
- **KF-AV-28 RIDER, binding here as WITNESS-ORDERING ONLY** (§H): KF-AV-19/D-8 is one of the **seven
  governed rows**. This wave **spends no cure on any of them**, so a capture is lawful before KF.W7's
  verdict — but a verdict-superseded row's witness must be **reported as superseded at close, never
  silently inherited**. Recorded here so the ordering travels with the shot rather than with a memory.
- **Shot**: one composited plate at 1280, all four subjects in frame, contrast numerals **re-derived at
  capture** (KF-SKEL-22 — no corpus numeral is the figure of record), frame stamped (KF-AX-4).
- **State**: **UNMEASURED** · **0 probes spent**.

### (iii-a) · The OD-V3 capture packet — **the 1280 arm** (`.b`'s half; `.c` holds the 390 arm)

- **Subject** (enumeration source `kf docs/tranches/V/audit/R2-01-visual-design.md` **DP2-06**, and
  `OWNER-DECISIONS.md:7`'s *"390 AND 1280"*): **both transport homes** — the **in-panel transport card**
  (progress bar + `Play`/`Reverse` + scrubber) and the **bottom-center floating transport pill** (play
  triangle in a rainbow ring + scene dropdown + reset) — on **all four duplicating scenes: `cube` ·
  `amiga` · `square` · `easing`**, at **1280**, against **real Glass 7**.
- **The shot matrix `.b` owes: 4 scenes × 2 homes at 1280 = 8 cells**, plus a whole-viewport frame per
  scene showing both homes **simultaneously** (4) — because the ask is a **comparison**, not an
  inventory: **DISCRIMINATOR** *"a capture of one home, or of either home at one viewport only, does NOT
  satisfy the packet"*; **FALSIFIER** *"any scene shot at 390 alone, or against a pre-Glass-7 build, voids
  that scene's cell."*
- **THIS WAVE PRODUCES THE PACKET AND RULES NOTHING** — OD-V3/OD-V5 are owner-gated at KF.W10's own owner
  block, *"Never proxied"* (§0j.C KF-ODV3/KF-ODV5). No verdict on a transport home is formed here, and
  none is implied by the shot list.
- **State**: **UNMEASURED — 0 of 12 frames** · the packet is **INCOMPLETE**, and its **exact
  precondition** is §1 above: *a servable gh-pages bundle at a named ref, in a quiescent tree.* **This is
  the shape §0j.C authorises KF.W10 `.g` to close `complete_with_misses` on**, and it is stated in that
  form deliberately so the sibling's row can cite a measured precondition rather than an absence.

### Also owed at this cell, from the gate band

- **G-KFW9-6(ii)** — the KAD-11 pair's rest-state capture at 100 % width. Specified in full at
  `G-KFW9-6-REGISTER.md` §"Measurement (ii)". **UNMEASURED.**
- **G-KFW9-7** — the two-direction pass, four frames, one page load. Specified in full at
  `G-KFW9-7-TWO-DIRECTION.md` §4, including the **runtime lane reader** (`document.getAnimations()`
  filtered to `.hero-dots`) so the lane is measured and not predicted. **UNMEASURED.**

---

## 4 · OP-4 for this cell

`safari-app/desktop`'s three `.media` strings are **already recorded, dated, for this exact cell**, by
`.a` at SUBSTRATE-PIN §4.4 — all three round-trip byte-identical (*"a query Safari cannot parse
serialises `not all`; none does"*), so **that column is NOT foreclosed by UA capability**, and the three
`*Match` are `false` because the host is not in those modes (*a baseline, not a finding*).

**This seat opened no second session.** Probe parsimony (owner edict 2026-07-12, runbook §5.2) is a LAW
block on every seat: a second WebDriver session would have re-measured a recorded capability, on the same
host, in the same cell, with **nothing to load** — the demo is unservable (§1). The cell's capability
record exists and is dated; a duplicate reading would be spend without discrimination. **Stated, so the
absence is a decision and not an omission.**

---

## 5 · THE ASK — sharpened, and re-priced

`.a` asked *"who rebuilds and under which grant"*. **That question is now insufficient**, because §1.1
shows a rebuilt bundle does not survive the fan-out. The band needs a decision on **all three** of:

1. **A serving artifact that survives** — either a **declared quiescence window** on
   `/Users/mkbabb/Programming/keyframes.js` (no sibling `npm install` / `build:lib` while the band runs)
   **or** `.a`'s **shape (b)**: build and serve from a **separate clone** at the named ref, which no
   sibling writes and which needs a grant for *that* tree only, never for the sacred checkout.
2. **The substrate ruling** — pin stays `55e9bf0d` (shape (b) preserves it exactly) **or** re-pins to
   KF.W4's `5388907b` (shape (c)). **Priced at four drifting coordinates** (§1.3); note that `5388907b`
   is **local and unpushed**, so a re-pin to it pins a sha the remote does not carry.
3. **The bundle hash discipline, unchanged** — `capture.mjs` aborts without `--bundle-sha=` by design
   (SUBSTRATE-PIN §7); whoever builds hashes the tree and passes it. **No seat may default it**, and this
   seat did not.

**What is NOT asked**: permission to capture anyway, to soften a stamp, or to substitute a cell. The
wave's own conviction — *"a wave that produces screenshots without cell labels, per-shot hashes, and a
named substrate has failed"* — is the reason this unit returns an escalation with its measurements
instead of a directory of images.

---

## 6 · What this unit DID land, so the escalation is not read as a stall

| gate | landed | state |
|---|---|---|
| **G-KFW9-5** | `PRM-ENUMERATION.md` — 14 enforcement sites / 14 files / 4 mechanisms; 51 motion sites in four layers; 42 engine instances with per-site flag state; 18 of 18 §A rows resolved; amendment DRAFT for `.e` | **GREEN at this seat's limb** |
| **G-KFW9-6** | `G-KFW9-6-REGISTER.md` — measurements (i) and (iii) landed with every arm at its byte; (ii) is a capture and is blocked | **RED → RED, 2 of 3** |
| **G-KFW9-7** | `G-KFW9-7-TWO-DIRECTION.md` — both directions' mechanisms re-derived at the pin, one shared surface identified, the lane chain measured to its one undecided link, the four-frame protocol published | **RED → RED, 0 of 1 (it is a capture gate)** |
| **S-8 (i)(ii)(iii-a 1280)** | shot lists, discriminators, falsifiers, and the packet's exact precondition | **UNMEASURED, 0 probes spent** |
