SERVED MODEL: claude-opus-5[1m]

# X.W1.c · THE FALSIFIER DEMONSTRATIONS — the gate is shown capable of turning red

**2026-09-17, at `f62bf82b`, in the scratch worktree `/Users/mkbabb/Programming/value-js-x-w1-c`.**
Every mutation below was applied to the scratch tree, measured, and reverted; **none was committed**,
and the worktree was left clean and rebuilt (⟨`git status --porcelain`⟩ → `?? scripts/ci/boot-smoke.mjs`
alone, i.e. this unit's own new file and nothing else).

`W1.md:253` states the obligation: *"deleting the mount call in a scratch build turns prod-preview
red"*; `W1.md:312-313` states it for both modes — *"Comment out the `app.mount()` call in a scratch
build → dev mode reds"* and *"the same mount deletion must red this mode too"*.

---

## §1 · The mount deletion — BOTH modes red

⟨`git diff -- demo/color-picker/main.ts`⟩ (scratch only):

```diff
--- a/demo/color-picker/main.ts
+++ b/demo/color-picker/main.ts
@@ -4,4 +4,5 @@ import { router } from "./router/index";

 const app = createApp(App);
 app.use(router);
-app.mount("#app");
+// FALSIFIER (X.W1.c, G-12/G-13 scratch build — NEVER COMMITTED):
+// app.mount("#app");
```

### dev — ⟨`node scripts/ci/boot-smoke.mjs --mode=dev --seed=default`⟩ → **exit 1**

```
[boot-smoke] mode=dev origin=http://127.0.0.1:9139 seeds=1
[boot-smoke] FAIL · default · http://127.0.0.1:9139/
             FAIL A1 #app has >= 1 element child
                  #app is <BODY> with 0 element child(ren): []
             FAIL A2 a role=main landmark exists
                  0 landmark(s): []
             ok   A3 pageerror collected []
                  []
             ok   A4 >= 1 desktop utility class in the emitted CSS
                  47 desktop utility rule(s) across 28 sheet(s) — e.g. .lg\:-top-14 @ (no media), …
[boot-smoke] dev: 0/1 seed cases passed
[boot-smoke] FAIL — 1 case(s): default
```

### prod-preview — ⟨`node scripts/ci/boot-smoke.mjs --mode=prod-preview --build --seed=default`⟩ → **exit 1**

```
[boot-smoke] mode=prod-preview origin=http://127.0.0.1:62545 seeds=1
[boot-smoke] artifact census (R42): 122 assets · entry ./assets/index-a6sBImfr.js (539051 B) · 5
             modulepreload · vendor-katex chunks 2 (in modulepreload set: false)
[boot-smoke] FAIL · default · http://127.0.0.1:62545/
             FAIL A1 #app has >= 1 element child
                  #app is <BODY> with 0 element child(ren): []
             FAIL A2 a role=main landmark exists
                  0 landmark(s): []
             ok   A3 pageerror collected []
                  []
             ok   A4 >= 1 desktop utility class in the emitted CSS
                  47 desktop utility rule(s) across 5 sheet(s) — e.g. .lg\:grid-cols-\[1fr_18rem\]
                  @ (width >= 64rem), …
[boot-smoke] prod-preview: 0/1 seed cases passed
[boot-smoke] FAIL — 1 case(s): default
```

**Both modes red, on the assertions that name the failure class** (A1 mount, A2 landmark) while A3
and A4 stay green — the gate reds *for its reason*, not by collapsing wholesale. The entry chunk is
still 539,051 B and the CSS still emits: nothing about the build broke; the app simply did not
mount, which is exactly the class NV-7 belongs to and exactly what the gate must be able to see.

**Note on A3, recorded rather than smoothed over.** Deleting the mount produces **no** `pageerror`
in either mode — there is nothing to throw. A gate that asserted only "console clean" would have
passed this build. That is the historical failure mode of this row's predecessors, and it is why
A1/A2 are the load-bearing assertions.

---

## §2 · The ORIGIN-FORM check — a sub-path preview is REFUSED, not silently accepted

`W1.md:313`'s falsifier: *"Serving the preview under a sub-path instead of a bare origin makes a
base-path defect invisible — the origin form is checked."* The check is mechanical, and it is
demonstrated in both directions against a live server rooted one level too high (`dist/`, so that
`/gh-pages/` really does serve the artifact and a lax gate would have passed):

⟨`node scripts/ci/boot-smoke.mjs --mode=prod-preview --origin=http://127.0.0.1:62922/gh-pages/`⟩ → **exit 1**

```
[boot-smoke] FAIL — Error: ORIGIN-FORM: http://127.0.0.1:62922/gh-pages/ is not a bare
127.0.0.1:PORT origin — sub-path /gh-pages/ — a sub-path origin masks base-path defects
```

⟨`node scripts/ci/boot-smoke.mjs --mode=prod-preview --origin=http://localhost:62922 --seed=default`⟩ → **exit 1**

```
[boot-smoke] FAIL — Error: ORIGIN-FORM: http://localhost:62922 is not a bare 127.0.0.1:PORT
origin — host localhost (want 127.0.0.1)
```

The second refusal is not pedantry: `localhost` and `127.0.0.1` differ in resolution order and in
what a browser treats as a trustworthy origin, and the carry's own wording is *"a bare 127.0.0.1
origin"*. The gate reads the origin it was given, and says so.

---

## §3 · The instrument's own discriminating power — the seed matrix is not uniform

A matrix that reds everything proves nothing. On the settled tree the matrix splits, and the split
is the finding (full transcripts: `run-dev-2026-09-17.txt`, `run-prod-preview-2026-09-17.txt`):

| seed | dev | prod-preview |
|---|---|---|
| `default` | PASS 4/4 | PASS 4/4 |
| `deep-link-grey-808080` (CONTROL, chromatic-safe grey) | PASS 4/4 | PASS 4/4 |
| `deep-link-black` | **FAIL** `PickerColorError: Missing hsv.h` | **FAIL** (same, via console) |
| `deep-link-grey-333333` | **FAIL** `Missing hsv.h` | **FAIL** |
| `persisted-black` | **FAIL** `Missing hsv.h` | **FAIL** |
| `deep-link-lch-none` | **FAIL** `Missing lch.h` | PASS 4/4 |
| `deep-link-oklch-none` | **FAIL** `Missing oklch.h` | PASS 4/4 |
| `persisted-oklch-none` | **FAIL** `Missing oklch.h` | PASS 4/4 |
| **totals** | **2/8** | **5/8** |

The control passing is what licenses reading the failures as the seed class rather than as the
harness. See the wave record's X.W1.c receipts for the routing of each RED row (R16 → X-W9,
R17 → X-W5 + X-W9) and for the dev/prod A3 asymmetry that this table exposes.
