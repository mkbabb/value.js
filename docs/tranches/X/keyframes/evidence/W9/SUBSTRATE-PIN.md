SERVED MODEL: claude-opus-5[1m]

# X.KF.W9 `.a` — SUBSTRATE PIN · OP-3 SESSION RECEIPT · OP-5 AND ITS BREAK

**Gate**: G-KFW9-14 (substrate naming and witness refresh). **Seat**: `.a`, 2026-09-17.
**Authority**: `docs/tranches/X/keyframes/waves/KF-W9.md` §Gates G-KFW9-14 · §H *the witness-substrate
law* · §Open-preconditions OP-3 / OP-5 · COHESION §0j.C **KF-WRITE** / **KF-ODV3**.

> **Every figure below is the output of a command re-run at this seat, at this seat's clock.** Nothing
> is inherited from the spec's authoring-time cells, from the wave record's baseline table, or from an
> earlier draft of this file. **§3 is where that discipline earns its keep**: an earlier, uncommitted
> draft of this file (15:24) published a bundle hash for an artifact that a sibling destroyed at
> 15:26:18. The figure is **struck and replaced by the measurement**, and the destruction is recorded
> as the finding it is.

---

## 1 · THE SUBSTRATE OF RECORD — pinned, not presumed

**keyframes.js `master` == `origin/master` == `55e9bf0d2391bbc6d9871bb3f0555a6225daae92`.**

Every capture in this wave, in every cell, names this ref and this sha. A capture that does not is not
evidence (G-KFW9-14's own close condition).

| fact | command | output |
|---|---|---|
| branch | `git -C ../keyframes.js rev-parse --abbrev-ref HEAD` | `master` |
| local HEAD | `git -C ../keyframes.js rev-parse HEAD` | `55e9bf0d2391bbc6d9871bb3f0555a6225daae92` |
| remote | `git -C ../keyframes.js rev-parse origin/master` | `55e9bf0d2391bbc6d9871bb3f0555a6225daae92` |
| local == remote | — | **YES** — the two shas are byte-identical above |
| disqualified HEAD preserved | `git -C ../keyframes.js rev-parse kf-sacred-snapshot-2026-09-17` | `6d280ee7bec7793846b2e2e1d250e1ea0a21859a` |
| `8281638c` reachable from that ref | `git -C ../keyframes.js merge-base --is-ancestor 8281638c kf-sacred-snapshot-2026-09-17` | exit 0 → **YES** |
| and is its PARENT | `git -C ../keyframes.js rev-parse kf-sacred-snapshot-2026-09-17^` | `8281638c0ac4ac8c54a67a018ca5bf6a9117174f` |

**The disqualified `8281638c` is preserved BY REF ONLY** and is never a witness substrate (§H's
witness-substrate law; KF.W0 §B-12). `6d280ee7` is the OWNER'S-HAND record commit sitting directly on
top of it (§0j.C KF-OP1 step 2), so the 1-ahead commit and the 252 tracked dirty rows are both
recoverable and neither is in the execution path.

### 1.1 The spec's pinned ref → the frontier: the delta, re-measured

⟨`git -C ../keyframes.js diff --name-only 81a56990..55e9bf0d`⟩ →

```
docs/tranches/V/coordination/VALUEJS-INBOUND-2026-09-17-o8-o11-amendment-addendum.md
```

**Exactly one path, and it is docs.** The spec (`KF-W9.md` preamble) re-resolves its anchors at
`origin/master 81a56990`; this wave executes against `55e9bf0d`; **the source trees are identical**.
Every byte-offset receipt the spec carries therefore holds at the execution substrate without
re-anchoring — a measurement, not an assumption.

---

## 2 · THE kf WORKING TREE AT THIS SEAT — named so no capture silently inherits it

### 2.1 The six untracked files

⟨`git -C ../keyframes.js ls-files --others --exclude-standard`⟩ →

```
docs/tranches/V/coordination/VALUEJS-INBOUND-2026-07-24-parser-totality-exposure.md
docs/tranches/V/coordination/VALUEJS-INBOUND-2026-07-27-library-band-r1-widened-k1-k4.md
src/animation/compile/compiled-frame.ts
src/animation/compile/interp-slot.ts
src/animation/compile/value-ast.ts
src/animation/group/composite-storage.ts
```

Two coordination letters (inert to any render) and **four `src/` files**. The four are **not a live
source delta** — they are **orphans at pre-carve paths**, left in place by §B-12's reset exactly as
§0j.C KF-OP1 requires (*"untracked files are not added"*). Measured, not asserted:

- The live modules sit at the **carved** paths —
  ⟨`git ls-files | grep -E 'compiled-frame|interp-slot|value-ast|composite-storage'`⟩ →
  `src/animation/compile/frame/compiled-frame.ts` · `src/animation/compile/frame/interp-slot.ts` ·
  `test/compile/interp-slot.test.ts`. **`value-ast.ts` and `composite-storage.ts` have no tracked file
  at any path** — the former was split into `src/animation/compile/value/`.
- **No importer resolves to an orphan path** —
  ⟨`git grep -n -E '"\.{1,2}/(\.\./)*((animation/)?compile/(compiled-frame|interp-slot|value-ast)|(animation/)?group/composite-storage)"' -- src demo test scripts | wc -l`⟩ → **0**.
- mtimes are all **2026-07-16 03:11–03:42** — two months older than the reset, which is what an orphan
  looks like.

**Consequence for the capture band**: the four are unreachable from any entry point, so no built bundle
can contain them.

### 2.2 The TWO tracked modifications — **CORRECTED AT THIS SEAT**

An earlier draft of this file published ⟨`git status --porcelain --untracked-files=no | wc -l`⟩ → **0**.
**That is no longer true and the figure is struck.** At this seat:

⟨`git -C ../keyframes.js diff --name-only`⟩ →

```
package-lock.json
package.json
```

⟨`git -C ../keyframes.js diff --stat`⟩ → `package-lock.json | 1007 +…` · `package.json | 5 +-` ·
**2 files changed, 1007 insertions(+), 5 deletions(-)**.

The content, read whole ⟨`git diff -- package.json`⟩:

```
-        "check": "tsc --noEmit && tsc --noEmit -p tsconfig.test.json && npm run proof:structure",
+        "check": "vue-tsc --noEmit -p tsconfig.json && tsc --noEmit -p tsconfig.test.json && npm run proof:structure",
+        "eslint": "^10.10.0",
+        "eslint-plugin-vue": "^10.11.0",
+        "vue-tsc": "^3.3.11",
```

**This is a SIBLING SEAT'S work, not this wave's** — this wave holds **zero write grants in the kf
tree** (§Bounds, after R-9a) and wrote none of it. The shape (a `vue-tsc` check script + three
devDependencies) is **KF.W4's type-cure chassis**, which OP-6 expressly authorises to run concurrent
with this wave.

**Why it matters, and why it does not**: `package.json`/`package-lock.json` are **build inputs**, not
compiled sources. ⟨`git diff --name-only -- src/ demo/`⟩ → **0** and
⟨`git ls-files --others --exclude-standard -- demo/`⟩ → **0**. **Every byte the gh-pages bundle
compiles is identical to `55e9bf0d`.** The devDependency additions change no emitted byte. **The
substrate is clean at every SOURCE byte** — which is the property OP-5's byte-offset trust actually
rests on.

---

## 3 · OP-5 — **BROKEN AT THIS SEAT**, measured, with its bound stated

OP-5 requires a build at the named ref. **This wave holds ZERO write grants in the kf tree** (§Bounds:
*"Do NOT touch — any keyframes.js byte"*), so its lawful discharge is **measurement**.

### 3.1 The script exists (R-11)

⟨`grep -n '"gh-pages"' ../keyframes.js/package.json`⟩ →
`43:        "gh-pages": "vite build --mode gh-pages",`

`build:gh-pages` exists at no coordinate; the command G-KFW9-14 names **is** the real script.

### 3.2 **THE BUILT BUNDLE IS GONE.** The hash cannot be taken.

⟨`ls -la ../keyframes.js/dist/gh-pages/`⟩ → **`ls: dist/gh-pages/: No such file or directory`**

⟨`ls -la ../keyframes.js/dist/`⟩ →

```
drwxr-xr-x  8 mkbabb  staff     256 Sep 17 15:26 .
drwxr-xr-x  4 mkbabb  staff     128 Sep 17 15:26 engine
-rw-r--r--  1 mkbabb  staff  211595 Sep 17 15:26 keyframes.d.ts
-rw-r--r--  1 mkbabb  staff   21831 Sep 17 15:26 keyframes.js
-rw-r--r--  1 mkbabb  staff    2119 Sep 17 15:26 registry-DNkwsOW9.js
-rw-r--r--  1 mkbabb  staff     119 Sep 17 15:26 registry-_wUGxPD9.js
-rw-r--r--  1 mkbabb  staff   24044 Sep 17 15:26 sequence-CSsnibl1.js
```

`dist/` now holds a **LIBRARY** build, not a demo bundle.

**THE MECHANISM, MEASURED — this is not speculation.**

| fact | command | output |
|---|---|---|
| the lib build's outDir is bare `dist/` | `grep -n 'outDir:\|emptyOutDir:' vite.config.ts` | only **two** explicit `outDir`s: `:263` `dist/gh-pages/` (+ `:264` `emptyOutDir: true`) and `:370` the demo default. **The production/lib branch sets none** → vite's default `dist/`, self-emptying |
| `prepare` runs the lib build | `grep -n '"prepare"' package.json` | `36: "prepare": "npm run build:lib",` |
| and `build:lib` is the production build | `grep -n '"build:lib"' package.json` | `41: "build:lib": "vite build --mode production",` |
| the clock | `stat -f '%N %Sm' package.json package-lock.json node_modules/vue-tsc dist dist/keyframes.js` | `package.json` **15:26:13** → `package-lock.json` **15:26:16** → `node_modules/vue-tsc` **15:26:16** → `dist/keyframes.js` **15:26:18** → `dist` **15:26:19** |

**The chain, in one sentence**: a sibling seat ran an install in the kf tree at **15:26:13–16**; npm's
lifecycle fired **`prepare` → `build:lib` → `vite build --mode production`** into the bare `dist/`,
whose **self-emptying** output directory took `dist/gh-pages/` with it at **15:26:18**. The gh-pages
bundle — `index.html` 8,381 B + `assets/` (53 entries) + `apple-touch-icon.png` + `robots.txt`, all
13:37, banked at wave-open — **no longer exists on disk**.

### 3.3 THE STRUCK FIGURE, recorded so it is not re-quoted

An earlier uncommitted draft of this file (mtime **15:24**, four minutes before the destruction)
published:

```
bad6ea595fb59899e6589ad731b542d77eb19079a67d10548f6c07fc3c9564d2   (bundle tree digest)
5abf8bf7d2d4da670ede1087cb909cf827c4ca9933d22c44e39b3c64d3d674b8   index.html
```

**Both are STRUCK.** They describe bytes that are not on disk and that no seat in this wave can now
re-hash, so **no capture may cite them**. They are printed here only so that a hash appearing in a
later artifact can be recognised as inherited from a dead draft rather than measured.

### 3.4 THE BOUND, STATED NOT EVADED — and **NOT crossed at this seat**

The spec states the bound in its own voice (§Open-preconditions OP-5, carried into the wave record's
baseline):

> *"if any **source** byte ever differs, a rebuild writes into the kf tree, which this wave's §Bounds
> forbids (`Do NOT touch — any keyframes.js byte`) → **S-13 bounds expansion → triumvirate**, never a
> quiet build."*

**The antecedent is FALSE here** — `src/` and `demo/` are byte-identical to `55e9bf0d` (§2.2). **The
consequent is nevertheless live**, because the *act now required* is the same act the bound forbids: a
rebuild writes kf bytes, and this unit's writable set contains no path in `/Users/mkbabb/Programming/keyframes.js`.

**Therefore this seat does not rebuild, and books the break instead** — see §7. Running
`npm run gh-pages` "just to restore what was there" is precisely the quiet build the bound names, and
it would also re-enter the kf tree **while a sibling wave is mid-install there**.

---

## 4 · OP-3 — A REAL SAFARI SESSION, OPENED AND RECORDED AT THIS SEAT

§0j.C **KF-ODV3**: *"OP-3's Safari reachability is **measured at run, never assumed**."* Measured here,
in a session this seat opened and closed.

### 4.1 The binary and the platform

| fact | command | output |
|---|---|---|
| driver | `which safaridriver` | `/System/Cryptexes/App/usr/bin/safaridriver` |
| symlink | `ls -la /usr/bin/safaridriver` | `lrwxr-xr-x root wheel → /System/Cryptexes/App/usr/bin/safaridriver` |
| driver version | `safaridriver --version` | `Included with Safari 26.4 (21624.1.16.11.4)` |
| Safari | `defaults read /Applications/Safari.app/Contents/Info.plist CFBundleShortVersionString` | `26.4` |
| OS | `sw_vers` | macOS **26.4.1** · build **25E253** |
| Develop menu | `defaults read com.apple.Safari IncludeDevelopMenu` | `1` |

### 4.2 `safaridriver --enable` and *Allow Remote Automation* — the honest reading

⟨`defaults read com.apple.Safari AllowRemoteAutomation`⟩ → **`does not exist`** (the key is absent from
the container's plist; the setting is not readable this way on macOS 26).

`safaridriver --enable` requires an interactive administrator authorization no non-interactive seat can
supply. **This seat therefore does not claim it ran.** What it claims instead is the only thing
`--enable` exists to make true, and that claim is a measurement:

⟨`nohup /usr/bin/safaridriver -p 4601 &` ; `lsof -nP -iTCP:4601 -sTCP:LISTEN`⟩ →

```
com.apple 85467 mkbabb 10u IPv4 … TCP 127.0.0.1:4601 (LISTEN)
com.apple 85467 mkbabb 11u IPv6 … TCP [::1]:4601     (LISTEN)
```

⟨`curl -s http://localhost:4601/status`⟩ → `{"value":{"message":"","ready":true}}` (HTTP **200**)

**Remote automation is enabled on this host** — a driver that was not permitted would refuse the
session below, not merely listen. Recorded exactly this way so no later seat reads a green where a
non-interactive prompt stands, and so a host where the session does **not** open is routed correctly:
S-13's first non-local-recoverable gate failure is *"G-KFW9-1 RED because safaridriver cannot be enabled
(the named condition is unreachable → **the horizon is re-planned, not faked with webkit**)"*.

### 4.3 The session, opened

⟨`curl -s -X POST http://localhost:4601/session -d '{"capabilities":{"alwaysMatch":{"browserName":"safari"}}}'`⟩ →

```json
{"value":{"sessionId":"7BB393EF-45A2-4EB5-9B01-C12155925F97",
 "capabilities":{"browserName":"Safari","browserVersion":"26.4",
 "safari:platformVersion":"26.4.1","safari:platformBuildVersion":"25E253",
 "platformName":"macOS","safari:useSimulator":false,"setWindowRect":true,
 "acceptInsecureCerts":false,"strictFileInteractability":false,
 "safari:automaticInspection":false,"safari:automaticProfiling":false,
 "safari:diagnose":false,"safari:experimentalWebSocketUrl":false,
 "webkit:alwaysAllowAutoplay":false,
 "webkit:WebRTC":{"DisableICECandidateFiltering":false,"DisableInsecureMediaCapture":false}}}}
```

**OP-3 = MET.** A **real Safari 26.4 on macOS 26.4.1** accepted a WebDriver session on this host, at
this clock, in the **`safari-app/desktop`** cell. **`"safari:useSimulator": false` is carried
explicitly**: this is the app cell, not the simulator cell — I-20's whole subject.

### 4.4 OP-4 baseline for `safari-app/desktop` — the three `.media` strings

⟨`POST /session/<id>/url {"url":"about:blank"}`⟩ → **200** · ⟨`POST /session/<id>/execute/sync`⟩ →

```json
{"fc":"(forced-colors: active)",
 "prt":"(prefers-reduced-transparency: reduce)",
 "prm":"(prefers-reduced-motion: reduce)",
 "fcMatch":false,"prtMatch":false,"prmMatch":false,
 "ua":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.4 Safari/605.1.15",
 "dpr":2,"iw":800,"ih":600}
```

**All three queries PARSE** — each `.media` string round-trips byte-identical to its input; a query
Safari cannot parse serialises as `not all`, and none does. **The `safari-app/desktop` column is
therefore NOT foreclosed by UA capability** for forced-colors, reduced-transparency or reduced-motion,
and a row reporting UNREACHABLE-IN-CELL there must name a reason that is **not** capability (OP-4's own
law: *by UA capability, not by omission*).

The three `*Match` values are `false` — the host is not currently **in** any of those modes. A
**baseline**, not a finding.

**This binds the desktop cell alone.** `.b` re-takes it in its own session; `.c` takes `ios-device` /
`ios-simulator`; `.d` takes `hcm` / `at`. **No cell inherits another's** (§Open-preconditions OP-4).

### 4.5 The session, closed — single-session discipline

⟨`curl -s -X DELETE http://localhost:4601/session/7BB393EF-…`⟩ → **200** ·
⟨`pkill -f 'safaridriver -p 4601'` ; `lsof -nP -iTCP:4601 -sTCP:LISTEN | grep -c LISTEN`⟩ → **0**.

safaridriver (WebDriver classic) allows **one** session at a time. This seat's session is deleted and
the port released, so `.b`/`.c`/`.d` each open their own. A phase-2 seat that meets `"already active"`
has met a **leak**, not this seat — wait 5 s, retry twice, then report BLOCKED-SESSION.

---

## 5 · G-KFW9-14 — GATE READING AT THIS SEAT

| | reading |
|---|---|
| **BEFORE** (wave record, baseline) | **RED** — *"no capture names substrate ref + sha + cell, because no capture exists"* |
| **AFTER (`.a`)** | **RED — and correctly so.** The pin is published (§1) and the harness stamps it on every row (§6), but the gate closes on **captures**, and `.a` takes none. ⟨`git ls-files …/audit/visual/safari-real/ \| wc -l`⟩ → **4** tracked vs ⟨`ls -1 …/safari-real/ \| wc -l`⟩ → **31** on disk (27 uncommitted ⇒ nonexistent, L-7); ⟨`git ls-files …/shots/ \| wc -l`⟩ → **0** vs **11** on disk. |

**What `.a` discharges and what it does not.** `.a` discharges the gate's **precondition**: the
substrate is named and pinned, the delta measured, the working tree enumerated (including the two
tracked rows a sibling added), the session proven reachable, and the harness made to **stamp**
`substrateRef` / `substrateSha` / `bundleSha256` on every row it emits. The gate itself turns only when
`.b`/`.c`/`.d` land captures carrying those stamps. **Recording a precondition holding as a gate
closing is exactly the failure this wave exists to convict** (I-20, twice fired), and it is not done
here. **The bundle hash the stamp needs is NOT pre-filled** — see §3 — it is supplied at capture by
`--bundle-sha=` and is a required field.

---

## 6 · WHAT THE HARNESS NOW CARRIES (the pin, mechanized)

`capture.mjs` and `states.mjs` each declare, and stamp onto every emitted row:

```
SUBSTRATE = { repo: "keyframes.js",
              ref:  "master == origin/master",
              sha:  "55e9bf0d2391bbc6d9871bb3f0555a6225daae92" }
```

overridable only by `--substrate-sha=` / `--bundle-sha=` **at the command line**, so a run against a
different substrate is **declared** rather than silently inherited. `bundleSha256` has **no default**:
a run that does not name the bundle it photographed aborts. Cell roster and column law: `CELL-ROSTER.md`.

---

## 7 · **BOOKED: the OP-5 break** — handed up, not worked around

| | |
|---|---|
| **what** | the `dist/gh-pages/` bundle OP-5 discharges against **no longer exists**; destroyed 2026-09-17 **15:26:18** by npm's `prepare` → `build:lib` self-emptying `dist/`, triggered by a sibling seat's install in the kf tree |
| **who** | **not this wave** — `.a` holds no kf write grant and wrote no kf byte; the install's fingerprint (`vue-tsc` + `eslint` + `eslint-plugin-vue`, a `vue-tsc` check script) is KF.W4's type-cure chassis, which **OP-6 authorises to run concurrent with this wave** |
| **impact** | `.b` · `.c` · `.d` cannot photograph a served demo until a gh-pages build exists again. **G-KFW9-1 / -2 / -14's capture limbs are blocked on it**; `.a`'s chassis limbs are not, and are landed |
| **why `.a` does not just rebuild** | a rebuild writes into the kf tree. §Bounds: *"Do NOT touch — any keyframes.js byte"*. This unit's writable set contains no kf path. **S-13 bounds expansion → TRIUMVIRATE, never a quiet build** — the spec names this act specifically |
| **the ask** | a ruling on **who rebuilds and under which grant**. §0j.C **KF-WRITE** already names the hand (*"the sacred checkout on `master` … is the execution substrate for … **W9** …"*, the value.js orchestrator under the owner's 2026-09-17 grant), so the authority plausibly exists **above** this seat; what does not exist is a grant **inside** this unit's bounds |
| **the fix, once granted** | `npm run gh-pages` in `/Users/mkbabb/Programming/keyframes.js` at `55e9bf0d`, then hash the tree and pass it to every capture as `--bundle-sha=`. **The source bytes are unchanged** (§2.2), so the rebuilt bundle is the same build the wave opened against — this restores an artifact, it does not move the substrate |
| **what must NOT happen** | a capture against a **stale or foreign** bundle, or a capture that omits `bundleSha256` because the figure was inconvenient. Both are the I-20 failure in a different coat: evidence that cannot be proved to be the bytes anyone looked at |
