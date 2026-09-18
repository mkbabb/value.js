# CHALLENGE-L — library structure · `demo/workbenches/mix/MixConfigBar.vue`

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]`, 1M context. That is the tier
this seat was explicitly spawned with. Declared, not inherited.

- Repository `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`.
- Subject: `demo/workbenches/mix/MixConfigBar.vue` (173 lines), area `demo/workbenches`.
- Axis: library structure — module boundaries, ownership, dependency direction, public surface.
- Write scope honoured: only files under `…/components/wb-mix-configbar/`. **No source edited.**

---

## §00 · Provenance — this is ROUND 6; rounds 1–5 preserved intact, nothing lost

| round | report | status |
|---|---|---|
| 1 | `challenge-L-library-round-1.md` | **verbatim, untouched** |
| 2 | `challenge-L-library-round-2.md` | **verbatim, untouched** |
| 3 | `challenge-L-library-round-3.md` | **verbatim, untouched** |
| 4 | `challenge-L-library-round-4.md` | **verbatim, untouched** |
| 5 | `challenge-L-library-round-5.md` | **verbatim, copied from the head before this write** |
| **6** | `challenge-L-library.md` (this) | supersedes as the head; carries 1 + 2 + 3 + 4 + 5 whole |

**All thirty-two prior findings stand.** I traced the import cone and ran every measurement below
before opening any prior round, then reconciled. I retract nothing of theirs. I do **correct one
piece of carried evidence** (§4) — with receipts, and the correction makes the finding underneath it
sharper, not weaker.

**Tally note, recorded rather than smoothed over.** Counting r5's own §5 carry table by severity I get
**3 BLOCKER · 19 MAJOR · 8 MINOR · 2 INFO = 32**; round 5's header states 18 MAJOR / 31 total. The
discrepancy is one MAJOR row and I have not adjudicated which; I flag it so the next round does not
inherit an arithmetic drift silently. Round-6 items are numbered `R6-n`.

**Discipline note.** My independent pass produced eleven candidates. **Seven were already held** and
are not re-reported — the dead `variant` prop (r2 **L2-1**; I reproduced the live DOM and added the
`vue-tsc` EXIT=0 receipt, which r5 also added), the `demo/ui/` alias layer (r1 **L-4** / r3 **L3-8**),
the `reka-ui` reach and unexported `SelectionValue` (r1 **L-6**), the dead eslint globs (r3 **L3-1** —
I re-derived `demo/@/{components,lib,composables}` → 0 files independently), the two-homes
interpolation split (r1 **L-2** / r4 **R4-1/R4-2**; my 3-operand divergence numbers reproduce r4's
line-for-line), the non-exhaustive vocabulary arrays (r1 **L-7** / r2 **L2-5** / r5 **R5-2**), and the
`h-9`/`h-10` per-instance costume (r5 **R5-3**). **One I filed and then killed myself** (§7.1).
**Four survived as genuinely new**, and all four come from looking at the two artifacts no prior round
opened: `package-lock.json` and the *installed contents* of `node_modules/@mkbabb/`.

| new | severity | one line |
|---|---|---|
| **R6-1** | **MAJOR** | The cross-repo resolution posture three config files document at length (**mechanism-C**: a `file:` symlink to `../glass-ui` kept fresh by sibling `build:watch`) **is not the one installed**. `node_modules/@mkbabb/glass-ui` is a **registry tarball in a real directory** (`test -L` → false; lock says `resolved: https://registry.npmjs.org/…`), and `../glass-ui` **has no `dist/` at all**. Zero mentions of the install's actual shape across rounds 1–5. |
| **R6-2** | **MAJOR** | `server.fs.allow` grants the dev server **the entire parent directory of the repository**, justified by a `@font-face` `url("../fonts/…woff2")` walk out of the package. glass-ui 7.0.0 **inlines its fonts as `data:font/woff2;base64`** — `grep -c '\.\./fonts'` across all **20** shipped CSS files → **0 in every one**. The comment names inlining as its own retirement condition; the condition is met and the widening survives. |
| **R6-3** | **MAJOR** | `npm test` has **no build hook** where `npm run typecheck` has `pretypecheck`. `test/preview-chips.test.ts` — the O-14 oracle that certifies *this component's* preview chips — binds `@mkbabb/value.js/{color,css}` by package self-reference into `dist/`, which is **gitignored and untracked** (`git ls-files dist` → **0**). And `vitest.config.ts` justifies its `exclude` filter by *"the repo-hygiene gates live in `test/dist/`"* — **`test/dist/` does not exist.** Second dead-config instance after r3 L3-1, in a second gate file. |
| **R6-4** | **MAJOR** | **Correction + the defect underneath it.** r2 L2-2 / r5 §5 record that `@mkbabb/value.js/css` "resolve[s] by a *different* mechanism (the `node_modules` symlink)". Measured: it is **not a symlink**, and it does **not** resolve through `node_modules` — both `tsc --traceResolution` and `import.meta.resolve` land on the **local `dist/`** by package self-reference. There are not two resolution paths. **But** R5-1's cycle has *materialised*: npm peer-auto-installed a **registry copy of value.js into value.js's own `node_modules`**, and that copy has **already diverged** from what this tree builds — `css.d.ts` **382 vs 350 lines**, `css.js` differing at char 141 — under an immutable `4.0.0`. |

**Verdict: DEFECTIVE.** Cumulative across six rounds: **3 BLOCKER · 23 MAJOR · 8 MINOR · 2 INFO.**
Strongest defect this round: **R6-4**, because it converts R5-1 from a payload-hygiene argument into
physical evidence sitting in this checkout's `node_modules`.

---

## §0 · Independent re-derivation of the import cone

Traced before reading any prior round. Sixth independent observation; the boundaries agree.

| # | line | specifier | resolves to | verdict |
|---|---|---|---|---|
| 1 | 2 | `vue` | peer | SOUND |
| 2 | 3–9 | `../../ui/select` | `demo/ui/select/index.ts` — **1 line**, re-exports `@mkbabb/glass-ui` | r1 **L-4** · r3 **L3-8** |
| 3 | 10 | `../../ui/button` | `demo/ui/button/index.ts` — **1 line** | r1 **L-4** · r3 **L3-8** |
| 4 | 11 | `@lucide/vue` (`Blend`) | devDep | SOUND |
| 5 | 12 | `@mkbabb/value.js/color` (type) | real `exports` key → local `dist/subpaths/color.d.ts` | **SOUND** (code) · r2 **L2-2** (config) · **R6-4** (install) |
| 6 | 13 | `../../color-session/picker-color` (type) | domain module | r2 **L2-4** · r5 **R5-2** |
| 7 | 14 | `../../palettes/mix` (type) | sibling **feature** tree | r1 **L-2** · r4 **R4-3/R4-4** |
| 8 | 15 | `reka-ui` (type) | glass-ui's own private dep | r1 **L-6** |
| 9 | 18 | `../../color-session/color-space-meta` | the F16 neutral home | r1 **L-5** · r2 **L2-5** · r5 **R5-2** |
| 10 | 23 | `../../color-session/color-chips` | domain module | r1 **L-3** · r4 **R4-1/R4-2** |

Ten edges, one unqualified — the same ratio five prior rounds reached independently. No `@src/*`
reach, no `demo/ → src/` internal edge, no feature → shell edge.

**Rounds 1–5 asked what each edge points at. Round 6 asks what is actually on disk at the other end.**
Three of the four edges that leave this repository — `@mkbabb/value.js/color`, `@mkbabb/glass-ui`, and
(transitively) `reka-ui` — resolve into an installed tree whose *shape* contradicts the shape three
config files spend forty lines of comment describing. That is the thread this round pulls.

---

## §1 · R6-1 — MAJOR · the documented cross-repo resolution posture is not the one installed

### 1a — what the config says

Three separate comment blocks, all load-bearing, all describing one mechanism:

`vite.config.ts:86-96` —
> *"Cross-repo resolution (N.W1.C / mechanism-C …): bare `@mkbabb/glass-ui` specifiers resolve through
> the sibling's `exports` map **via the `file:` symlink** in `node_modules`. … During co-development
> the dist is kept fresh by `build:watch` (`dev.sh SIBLING_WATCH_BUILDS=(../glass-ui)`); there is no
> mid-edit source consumption at any hop."*

`tsconfig.demo.json:20-26` — the same posture, cited as the reason the demo typecheck needs no
foreign-error filter (*"glass-ui's declaration files are skip-checked … the demo typecheck sees ZERO
foreign errors"*).

`vite.config.ts:98-137` — `server.fs.allow` widened *"because the `@font-face` refs … walk OUT of the
package into glass-ui's repo-root `fonts/` directory"* — a walk that only exists **through a
symlink**. (That half is R6-2.)

### 1b — what is installed

```
$ for p in node_modules/@mkbabb/glass-ui node_modules/@mkbabb/value.js node_modules/@mkbabb/keyframes.js; do
    if [ -L "$p" ]; then echo "$p = SYMLINK -> $(readlink $p)"; else echo "$p = REAL DIRECTORY"; fi; done
node_modules/@mkbabb/glass-ui    = REAL DIRECTORY
node_modules/@mkbabb/value.js    = REAL DIRECTORY
node_modules/@mkbabb/keyframes.js = REAL DIRECTORY
```

```
$ node -e "const l=require('./package-lock.json'); … "
node_modules/@mkbabb/glass-ui     {"version":"7.0.0","resolved":"https://registry.npmjs.org/@mkbabb/glass-ui/-/glass-ui-7.0.0.tgz","integrity":"sha512-iK2DaPNbnEOkcI6…"}
node_modules/@mkbabb/keyframes.js {"version":"6.0.0","resolved":"https://registry.npmjs.org/@mkbabb/keyframes.js/…"}
```

Registry tarballs. Not symlinks. `package.json` declares `"@mkbabb/glass-ui": "^7.0.0"` — a **registry
range**, never a `file:` spec. There is no `file:` anywhere in the manifest.

### 1c — and the sibling has nothing to watch

```
$ ls -d ../glass-ui ../keyframes.js
../glass-ui
../keyframes.js

$ node -e "console.log(require('../glass-ui/package.json').version)"
7.0.0

$ ls -la ../glass-ui/dist/index.d.ts ../glass-ui/dist/components/button/Button.vue.d.ts
ls: ../glass-ui/dist/index.d.ts: No such file or directory
ls: ../glass-ui/dist/components/button/Button.vue.d.ts: No such file or directory
```

The sibling checkout exists and **has never been built in this working tree**. So the documented loop
is inoperative on both ends at once: no symlink to resolve through, nothing built to watch, and a
registry pin a sibling build could not reach even if there were.

### 1d — why this matters to this component, and what it does *not* mean

It would be easy to over-read this. I checked the tempting version and it is false: the installed
tarball is **not** stale relative to the producer's source. glass-ui's source has already completed
the migration r2 L2-1 condemns —

```
$ grep -n "emphasis\|variant" ../glass-ui/src/components/button/Button.vue | head
20:    emphasis?: ButtonEmphasis;
21:    /** Semantic intent, orthogonal to emphasis. */
35:    emphasis: "secondary",
49:        (props.emphasis === "primary" || props.emphasis === "secondary"),
88:        :data-emphasis="emphasis"

$ grep -c "primary-audacious" ../glass-ui/src/components/button/{Button.vue,index.ts,styles.css}
0  0  0
```

So **L2-1 is confirmed as a purely consumer-side un-migrated adoption**: the producer retired
`variant` in source *and* in the shipped 7.0.0, the demo never followed, and nothing at the boundary
noticed. That is a useful sharpening — it means the r2 L2-1 / r5 R5-3 cure needs **no** glass-ui work
on Button at all; the only standing BH item on this component's surface is r1 L-6's `SelectionValue`
export.

The defect R6-1 names is narrower and structural: **three config files justify their contents by a
mechanism this checkout does not use.** `tsconfig.demo.json` argues the demo typecheck is safe
*because* of dist-resolution-through-a-symlink; `vite.config.ts` argues `dedupe` is what "MAKES
dist-resolution single-instance"; `vite.config.ts` argues `server.fs.allow` must reach the repo's
parent *because* of a symlinked font walk. The first two conclusions happen to hold anyway (a registry
tarball is dist-resolution too, and more strongly). The third does not, and it is R6-2. The tranche
record for W44 — *"Glass 7.0.0 ADOPTED WHOLE"* — rests on a posture description that no longer
matches the tree.

- **Mechanism.** A resolution posture was reasoned about carefully once (N.W1.C), written into three
  comment blocks as the *reason* for three unrelated settings, and then the install changed underneath
  the prose. Comments that justify settings are contracts; nothing checks them.
- **Reproduction.** The four commands above, all in this checkout.
- **Cure.** Decide the posture and make it checkable. If sibling co-development is real, declare
  `"@mkbabb/glass-ui": "file:../glass-ui"` and let the lockfile say so — then the comments become
  true and `build:watch` becomes meaningful. If it is not (and the evidence is that it is not: a
  registry pin, an unbuilt sibling), delete the symlink prose, delete `siblingFsAllowTransient`
  (R6-2), and keep the honest one-line statement: *glass-ui resolves from its published tarball.*
  Either way the settings must cite the posture the lockfile records, and a CI assertion on
  `lock.packages["node_modules/@mkbabb/glass-ui"].resolved` makes that a gate rather than a paragraph.

---

## §2 · R6-2 — MAJOR · the dev server is granted the repository's entire parent directory on a justification that is measurably obsolete

`vite.config.ts:139` and `:287`:

```ts
const siblingFsAllowTransient = [path.resolve(import.meta.dirname, "..")];
…
server: { host: true, fs: { allow: siblingFsAllowTransient } },
```

`server.fs.allow` replaces Vite's default (the project root) with **`/Users/mkbabb/Programming`** — the
parent of the repository, containing every sibling checkout on this machine. Combined with
`server.host: true` (`:286`, for LAN device testing), the dev server serves that subtree to the local
network.

The stated justification, `vite.config.ts:107-117`:

> *"The Tailwind-source `./styles` surface ships `@font-face` declarations whose
> `url("../fonts/fira-code/...woff2")` refs resolve RELATIVE to the symlinked `dist/styles/` — they
> walk OUT of the package into glass-ui's repo-root `fonts/` directory. That walk is why
> `server.fs.allow` must reach glass-ui's parent… **Retiring it entirely requires glass-ui to inline
> the fonts as data URLs in the compiled surface**, or the demo to drop the Tailwind-source `./styles`
> import…"*

**glass-ui 7.0.0 has inlined the fonts.** Measured against the installed surface —
`exports["./styles"]` → `./dist/styles/index.css`:

```
$ grep -c '\.\./fonts' node_modules/@mkbabb/glass-ui/dist/styles/*.css
accessibility.css:0   animations.css:0   components.css:0   draw-in.css:0   fonts.css:0
glass-refract.css:0   glass-specular-track.css:0   glass.css:0   index.css:0   paper.css:0
scroll-choreography.css:0   scroll-chrome.css:0   scroll-driven.css:0   theme.css:0
tokens.css:0   transitions.css:0   typography.css:0   utilities.css:0
view-transition.css:0   viz-reveal.css:0

$ grep -o 'url("data:font/woff2' node_modules/@mkbabb/glass-ui/dist/styles/fonts.css | wc -l
       4

$ ls -d node_modules/@mkbabb/glass-ui/fonts
ls: node_modules/@mkbabb/glass-ui/fonts: No such file or directory
```

**Zero** `../fonts` references across all twenty shipped stylesheets; **four** `@font-face` blocks
carrying base64 `data:font/woff2` payloads; and no `fonts/` directory in the package for a walk to
land in even if one existed. The retirement condition the comment names as sufficient is satisfied by
the installed producer, and the widening it justifies is still in the config.

This is R6-1's most concrete consequence: a setting whose premise was *"the symlinked package walks
out into a sibling repo"* survives an install where the package is a self-contained tarball with
inlined assets. It is not a hypothetical exposure — it is a live dev server (`:9000`, confirmed
responding `200` this session) serving `/Users/mkbabb/Programming` to the LAN.

- **Mechanism.** A transient workaround was named `…Transient`, justified by a producer gap, and
  outlived the gap because nothing re-checks a workaround's premise when the producer ships the fix.
- **Reproduction.** The three commands above; `vite.config.ts:139,287` for the setting; the
  producer's own `exports["./styles"]` for the surface under test.
- **Cure.** Delete `siblingFsAllowTransient` and the `fs.allow` override; Vite's default root-scoped
  allowlist is correct for a tarball install. Verify by booting the dev server and loading `/#/mix` —
  the four inlined faces need no filesystem escape. If a future `file:` posture (R6-1) reintroduces
  the walk, reintroduce the narrowest allowlist entry that covers it — the sibling's `fonts/`
  directory, not the parent of every project on the disk.

---

## §3 · R6-3 — MAJOR · the oracle that certifies this component's preview chips binds to an untracked build artifact no gate refreshes, and its config cites a directory that does not exist

### 3a — the asymmetry

```
$ node -e "const s=require('./package.json').scripts; for(const k in s) console.log(k.padEnd(16),'=',s[k])"
predev:web-only  = npm run build
prepare          = rm -rf dist && npm run build
pretypecheck     = npm run build
typecheck        = vue-tsc -p tsconfig.lib.json --noEmit && vue-tsc -p tsconfig.demo.json --noEmit
test             = vitest run          ← no pretest
```

Three commands protect themselves with a build. `test` does not.

### 3b — what the test program binds to

`vitest.config.ts` declares exactly one alias, `@src`. Nothing maps `@mkbabb/value.js/*`. So the
vitest program resolves those specifiers the way Node does — and Node's `PACKAGE_SELF_RESOLVE` runs
before the `node_modules` walk, so a package with `name` + `exports` resolves its own name to itself:

```
$ node --input-type=module -e "for (const s of ['@mkbabb/value.js/color','@mkbabb/value.js/css','@mkbabb/glass-ui']) console.log(s.padEnd(24),'->',import.meta.resolve(s))"
@mkbabb/value.js/color   -> file:///Users/mkbabb/Programming/value.js/dist/subpaths/color.js
@mkbabb/value.js/css     -> file:///Users/mkbabb/Programming/value.js/dist/subpaths/css.js
@mkbabb/glass-ui         -> file:///Users/mkbabb/Programming/value.js/node_modules/@mkbabb/glass-ui/dist/glass-ui.js
```

And `dist/` is not a tracked artifact:

```
$ git check-ignore -v dist
.gitignore:17:dist/	dist
$ git ls-files dist | wc -l
       0
```

Five test files import the library by bare specifier — including the one that matters here:

```
$ grep -rn '@mkbabb/value\.js' test/ demo/test/
test/ink.test.ts:17,18        test/view-accents.test.ts:28,29        test/mix-v4.test.ts:2
test/preview-chips.test.ts:25 import { … } from "@mkbabb/value.js/color";
test/preview-chips.test.ts:26 import { parseCssColor } from "@mkbabb/value.js/css";
demo/test/export/byte-exact.test.ts:312
```

`test/preview-chips.test.ts` is **the O-14 oracle for this component's preview chips** — the one
`color-chips/sample.ts:19-23` names as holding the sampler "STRICTLY EQUAL to a direct library
recompute". Its `mixColors` is whatever happens to be sitting in an ignored, untracked build-output
directory when `npm test` runs. `npm run typecheck` rebuilds first; `npm test` does not.

**I checked the tempting overclaim and it is currently false.** Right now `dist/` is fresh:

```
$ find src -name '*.ts' -newer dist/subpaths/color.js | wc -l
       0
$ ls -la dist/subpaths/color.js
-rw-r--r--  1 mkbabb  staff  604 Jul 29 10:16 dist/subpaths/color.js
```

So this is a **structural** defect, not a live wrong result: nothing *keeps* it fresh. Edit
`src/color/operations.ts` and run `npm test` and the oracle certifies the previous library. That
composes exactly with r4 **R4-2** — R4-2 showed the oracle re-derives its own algorithm and so cannot
see r4 R4-1's divergence; R6-3 adds that it is also bound to an artifact no gate regenerates. The
guard is pointed at its own reflection *and* the mirror is not required to be current.

### 3c — the dead config in the same file

`vitest.config.ts` carries:

```ts
// U.W-CANON (U-F49/U-F50): the repo-hygiene gates live in `test/dist/`, but vitest's default
// exclude swallows `**/dist/**`. `include` is scoped to `test/**` and `test/dist` is the ONLY
// dist dir under it, so drop just the dist rule … to auto-discover them under `npm test`.
exclude: configDefaults.exclude.filter((p) => !p.includes("dist")),
```

```
$ ls test/dist/
(no such directory)
```

The gates it exists to discover are gone. What remains is a filter that strips `**/dist/**` from
vitest's default exclusions repo-wide, with nothing to include — so the only live effect is that
`npm test` will now walk any future `dist/` under its include globs. This is r3 **L3-1**'s mechanism
in a second gate file: config that outlived the tree it named, still green because a glob that matches
nothing reports nothing.

- **Mechanism.** Build outputs treated as a module-resolution target for the test program, plus
  per-script build hooks applied by hand rather than by dependency. `pretypecheck` exists because
  someone noticed; `pretest` does not because nobody did.
- **Reproduction.** The five commands above.
- **Cure.** Two edits and a deletion. Add `"pretest": "npm run build"` — or, better, point the test
  program at `src/` the way `vitest.config.ts` already points `@src` there, so the oracle tests the
  *source* and the `dist/` binding disappears from the test graph entirely. Delete the
  `configDefaults.exclude.filter(...)` line with its dead comment. And the general rule, which is
  r3 L3-1's rule restated for gate configs: **a config comment that names a path is an assertion; if
  the path can vanish without the build going red, the comment is decoration.** A four-line
  `test/config-paths.test.ts` asserting that every path named in `eslint.config.js` globs and
  `vitest.config.ts` comments still exists would have caught both instances.

---

## §4 · R6-4 — MAJOR · correction of a carried evidence claim, and the defect it was pointing at

### 4a — the correction

r2 **L2-2**, carried forward at r5 §5, records:

> *"`paths` **omits `@mkbabb/value.js/css`**, which the demo imports **10** times … so those resolve by
> a *different* mechanism (**the `node_modules` symlink**) than the other four, **two resolution paths
> in one program**."*

The omission is real and stands. The resolution claim is wrong on both counts, and I have receipts.

**It is not a symlink** (§1b: `test -L` → false, all three `@mkbabb` packages are real directories
from registry tarballs).

**It does not resolve through `node_modules`.** TypeScript, on the actual demo program:

```
$ npx tsc -p tsconfig.demo.json --noEmit --traceResolution | grep -i "value.js/css"
======== Resolving module '@mkbabb/value.js/css' from '…/demo/color-session/picker-color.ts'. ========
'paths' option is specified, looking for a pattern to match module name '@mkbabb/value.js/css'.
======== Module name '@mkbabb/value.js/css' was successfully resolved to
         '/Users/mkbabb/Programming/value.js/dist/subpaths/css.d.ts'
         with Package ID '@mkbabb/value.js/dist/subpaths/css.d.ts@4.0.0'. ========
```

The `paths` lookup misses, TS falls through, and **package self-reference** lands it on the *local*
`dist/`. Node agrees (§3b, `import.meta.resolve` → `file:///…/value.js/dist/subpaths/css.js`). Vite's
generated self-alias lands there too by construction. **All three resolvers agree on one target.**
There is one resolution path, not two.

I record this because it was one `ls` away from being wrong in the other direction as well: I
independently filed *"`/css` typechecks against a stale copy"* as a MAJOR before running
`traceResolution`, and `traceResolution` killed it. The hypothesis was well-motivated and false.

### 4b — the defect that was actually down there

The frozen copy the claim was reaching for **does exist**, and nobody put it there on purpose:

```
$ node -e "const l=require('./package-lock.json'); console.log(JSON.stringify(l.packages['node_modules/@mkbabb/value.js']))"
{"version":"4.0.0","resolved":"https://registry.npmjs.org/@mkbabb/value.js/-/value.js-4.0.0.tgz",
 "integrity":"sha512-Z8ywb4htSxJlRFvoU1DNtvzr9Bsuaw9ahT/hvNlKbnRj6fTnLuXjn0itKq1Q5s6rwg24ct0zcLZ04BuR3/SzGw==",…}

$ grep -n '"@mkbabb/value.js"' package.json
2:    "name": "@mkbabb/value.js",          ← the ONLY occurrence. No self-dependency is declared.

$ node -e "const g=require('./package-lock.json').packages['node_modules/@mkbabb/glass-ui'];
           console.log(g.peerDependencies['@mkbabb/value.js'])"
^4.0.0
```

**`@mkbabb/value.js` is installed into `@mkbabb/value.js`'s own `node_modules`, from the public
registry, because npm auto-installs peerDependencies and glass-ui@7 peers on `@mkbabb/value.js:
^4.0.0` — which npm can only satisfy by downloading the package the repo *is*.** That is r5 **R5-1**'s
cycle, not as a manifest argument but as bytes on disk. R5-1 reasoned about what a *consumer* would
receive; the same cycle has already reached back and installed a second copy of the library inside the
library.

**And the two copies have already drifted.** Comparing every published subpath, local build vs the
registry self-copy:

```
$ for f in color css value math easing transform quantize; do … md5 … done
color      SAME    css  DIFFER    value SAME    math SAME    easing SAME    transform SAME    quantize SAME

types:   dist/subpaths/css.d.ts  382 lines   vs   node_modules/…/css.d.ts  350 lines
runtime: dist/subpaths/css.js  43973 B       vs   node_modules/…/css.js  43972 B
$ cmp dist/subpaths/css.js node_modules/@mkbabb/value.js/dist/subpaths/css.js
… differ: char 141, line 2
```

The runtime divergence is minifier identifier assignment against an **identical content-hashed chunk**
(`anchors-C_wdoOYd.js` in both) —

```
LOCAL : … r as ee, s as f, v as p, x as m, y as h } from "../anchors-C_wdoOYd.js";  var g = …
NM    : … r as f,  s as p, v as m, x as h, y as g } from "../anchors-C_wdoOYd.js";  var _ = …
```

— i.e. same source, **different toolchain**. The type divergence is larger and goes the wrong way: the
local build emits five spurious duplicate declarations the published one does not
(`Alpha_2`, `Channel_2`, `ChannelsBySpace_2`, `Color_2`, `SpaceId_2`, and
`CssColorByColorSpace` mapping over `Color_2<S>` instead of `Color<S>`). **The current toolchain
produces a worse declaration bundle than the one already on npm, under the same immutable version.**

So: `@mkbabb/value.js@4.0.0` is not reproducible from this checkout at HEAD. Two artifacts carry one
name@version, and one of them is sitting in this repo's `node_modules` where any tool that does *not*
implement package self-reference — a bundler with `preserveSymlinks`, a downstream consumer's
resolver, a `--conditions` variation, any tool that walks `node_modules` first — would pick it up.
The demo, the tests and both typechecks happen to self-reference and so happen to agree. That is a
property of three resolvers' current behaviour, not a boundary.

- **Mechanism.** A dependency cycle in the manifest (R5-1) plus npm's automatic peer installation
  makes a package install itself. An untracked, non-reproducible build output (R6-3) makes the two
  copies disagree. Neither is checked.
- **Reproduction.** The lockfile query, the `grep` on `package.json`, the md5 sweep, and `cmp`, all
  above.
- **Cure — R5-1's, with one addition.** Moving `@mkbabb/glass-ui` and `@mkbabb/keyframes.js` to
  `devDependencies` does not by itself remove the self-install (glass-ui's peer still resolves), so
  add `"@mkbabb/value.js": "."` — or `overrides` pinning the peer to the workspace — so npm satisfies
  glass-ui's peer with *this* checkout instead of downloading a stranger. Then make reproducibility a
  gate: `npm pack` twice from a clean tree and assert an identical `integrity`, which is the artifact
  twin of the manifest assertion R5-1 proposes. Together they close the loop: the manifest declares no
  runtime dependencies, no copy of the package can be installed inside it, and the one artifact that
  ships is byte-defined by the tree that ships it.

---

## §5 · Rounds 1–5 — carried, round-6 status

No prior finding is retracted or downgraded. ✓ = independently re-derived this run before reading it;
**+** = strengthened; **⚑** = evidence corrected (finding stands).

| id | sev | round-6 status |
|---|---|---|
| r1 **L-1** | BLOCKER | carried. |
| r1 **L-2** | MAJOR | carried ✓ (`MixConfigBar.vue:14` + `useMixingState.ts:23` both reach `demo/palettes/mix.ts`). |
| r1 **L-3** | MAJOR | carried ✓ — re-derived the twin `Select` blocks and the shared `class="h-9"`. |
| r1 **L-4** | MAJOR | carried ✓ **+** — per-directory census reproduced (18 of 19 `demo/ui/*` are one file, one line; `alert` is 11). Adding the *lossy* half: the select barrel forwards 8 components and **0** of glass-ui's 16 select types; the button barrel forwards `Button` and drops `ButtonProps`/`ButtonEmphasis`/`ButtonSize`. **That is the forcing function under both L2-1 and L-6** — a consumer that cannot name the producer's types cannot check the props it passes, and reaches elsewhere for a substitute. |
| r1 **L-5** | MAJOR | carried. |
| r1 **L-6** | MAJOR | carried ✓ **+** — reproduced `SelectionValue = string \| number` (`_shared/selection.d.ts:2`) against reka's `AcceptableValue = string \| number \| bigint \| Record<string,any> \| null` (`reka-ui/dist/index3.d.ts:231`): the annotation at `MixConfigBar.vue:15` is **four union members too wide**, making `v as PickerSpace` the widest cast site available. **New this round:** the producer-side gap is the *only* standing glass-ui BH item on this component's surface — §1d proves Button needs no producer work. |
| r1 **L-7** | MINOR | carried ✓. |
| r1 **L-8** | MAJOR | carried. |
| r1 **L-9** | INFO | carried. |
| r2 **L2-1** | BLOCKER | carried ✓ **+** — independently reproduced live: `data-emphasis="secondary" data-tone="neutral"`, `variant="primary-audacious"` as a raw DOM attribute, `class="… glass-wash glass-capsule …"`; `ButtonProps` has no `variant` (`Button.vue.d.ts:5-19`); compiled defaults `emphasis:{default:"secondary"}` (`button-Bu9F4uU6.js`); `grep -rn primary-audacious node_modules/@mkbabb/glass-ui/dist/` → **0**; `vue-tsc -p tsconfig.demo.json --noEmit` → **REAL_EXIT=0, 0 lines of output**. My own census of every `<Button …>` tag in `demo/`: **51 sites in 22 files** — `outline` 28, `ghost` 19, `primary-audacious` 2, `destructive` 1, `default` 1 — all rendering at the default emphasis, and the `destructive` one carrying no tone. **§1d newly proves this is consumer-side only.** |
| r2 **L2-2** | MAJOR | carried **⚑** — the `paths`/`exports` divergence is real and I re-derived it independently (3 phantom keys: root, `/parsing`, `/units`; 2 omissions: `/css`, `/value`; `dist/index.d.ts` absent). **The "two resolution paths via the node_modules symlink" evidence is corrected in §4a** — one path, by self-reference, no symlink. **The defect the claim was pointing at is real and worse: §4b.** |
| r2 **L2-3** | MAJOR | carried. |
| r2 **L2-4** | MAJOR | carried. |
| r2 **L2-5** | MAJOR | carried ✓ — `HUE_INTERPOLATION_METHODS: HueInterpolationMeta[]` (`color-space-meta.ts:38`) is a plain array over a library-owned union; a fifth arc in `src/` leaves it silently short. |
| r2 **L2-6** | MINOR | carried. |
| r2 **L2-7** | MINOR | carried — extended by r4 R4-2 and now by **R6-3** (the oracle is bound to an artifact no gate refreshes). |
| r3 **L3-1** | MAJOR | carried ✓ **+** — independently re-derived: `ls -d demo/@` → No such file; `demo/@/components` **0** files, `demo/@/lib` **0**, `demo/@/composables` **0**, `demo/color-picker` 16. `demo/workbenches/**` is under **no** import-boundary rule at all. **R6-3 §3c is the same mechanism in `vitest.config.ts`** — a second gate file naming a directory (`test/dist/`) that does not exist. |
| r3 **L3-2** | MAJOR | carried. |
| r3 **L3-3** | MAJOR | carried. |
| r3 **L3-4** | MINOR | carried. |
| r3 **L3-5** | MINOR | carried. |
| r3 **L3-6** | MINOR | carried. |
| r3 **L3-7** | INFO | carried. |
| r3 **L3-8** | MINOR | carried ✓. |
| r4 **R4-1** | MAJOR | carried ✓ **+** — reproduced the divergence independently against the built `dist/`, operands `#ff0000,#00ff00,#0000ff`, `space=oklab hue=shorter`: app result `oklch(64.88028998731% 0.013979941145 188.478372779407deg)` (identical to R4-1's figure to the last digit), preview stops running chroma **0.258–0.313** across all 17 samples, `APP result appears in preview stop list? false` — roughly **20× the chroma** of the thing being previewed, endpoint pure blue. |
| r4 **R4-2** | MAJOR | carried ✓ **+** — `test/preview-chips.test.ts:65` ("three operands") re-derives the same polyline and asserts equality with itself. **R6-3 adds the second half**: it is also bound to an untracked build output `npm test` never regenerates. |
| r4 **R4-3** | MAJOR | carried. **R6-4 is the same fusion in a third artifact**: R4-3 found the library's *tests* own demo code, R5-1 found the *manifest* owns demo dependencies, R6-4 finds the *lockfile* has installed the library inside itself. |
| r4 **R4-4** | MINOR | carried. |
| r5 **R5-1** | BLOCKER | carried ✓ **+** — **§4b is its physical receipt.** R5-1 argued the cycle from two manifests; the cycle has already executed: `node_modules/@mkbabb/value.js@4.0.0` from `registry.npmjs.org`, with no self-dependency declared, because npm auto-installs glass-ui's `^4.0.0` peer. And the installed copy has drifted from what this tree builds. |
| r5 **R5-2** | MAJOR | carried ✓ — re-derived the absence independently: `grep -rn "cylindrical\|hasHue\|HUE_SPACES\|isCylindrical" demo/ src/` returns only prose. **+ a live consequence R5-2's framing predicts but does not measure:** because *"does this space carry a hue"* has no home, the Hue-method control is **inert at this component's own default**. Measured against `dist/`, comparing all four arcs' serialized stop lists for `#ff0000→#0000ff`: `oklab` **1 distinct ramp**, `lab` 1, `rgb` 1, `xyz` 1, `oklch` 2, `lch` 2, `hsl` 2, `hsv` 2, `hwb` 2. `useMixingState.ts:45` defaults `colorSpace` to `"oklab"` — so in **4 of the 9 offered spaces**, including the shipped default, the Select and all four T-17 preview ramps are decorative. `shots/safari-desktop-light/mix.png` shows exactly that pairing — `COLOR SPACE · OKLab` beside `HUE METHOD · Shorter`, both presented as live choices. |
| r5 **R5-3** | MAJOR | carried ✓ — reproduced the geometry live: `SelectTrigger` **158 × 36 px** with `h-9` last in the class list, Mix button **324 × 40 px**; `SelectTriggerProps.size?: "sm" \| "default"` with the doc comment *"Trigger height register."* (`SelectTrigger.vue.d.ts:7`). |
| r5 **R5-4** | MAJOR | carried. |

---

## §6 · The greenfield lattice — six rounds folded

Round 5's five strata stand unchanged in shape. Round 6 does not add a stratum; it adds **the gates
that make the existing strata real**, because every round-6 finding is a boundary that was written
down and never wired.

```
  L0  ── THE PACKAGE BOUNDARY ──                                          ← R5-1
      @mkbabb/value.js   dependencies: {}       devDependencies: { glass-ui, keyframes.js, … }
                         overrides: { "@mkbabb/value.js": "." }   ← no copy of self installs  R6-4
        │ ⟦gate 0⟧ Object.keys(pkg.dependencies ?? {}).length === 0
        │ ⟦gate 0b⟧ NEW · lock.packages["node_modules/@mkbabb/value.js"] === undefined     ← R6-4
        │ ⟦gate 0c⟧ NEW · two `npm pack` runs from a clean tree ⇒ identical integrity      ← R6-4
        │ ⟦gate 0d⟧ NEW · the resolution posture the comments cite ≡ lock `.resolved`      ← R6-1
        ▼
  L1  @mkbabb/value.js/color
        mixColors · mixSequence · sampleColorRamp   related by construction     ← R4-1 · L2-3
        SPACE_IDS · SPACE_SCHEMA · spaceHasHue      the registry, PUBLISHED     ← R5-2 (+R6)
        HUE_INTERPOLATION_METHODS  as const satisfies readonly HueInterpolationMethod[]
        │ ⟦lint 1⟧ no demo module names src/
        │ ⟦gate 1b⟧ NEW · the TEST program resolves the library from src/, not dist/  ← R6-3
        ▼
  L2  @mkbabb/glass-ui/{select,button,…}      demo/ui/ deleted            ← r1 L-4 / L3-8
        Select generic over its value; SelectionValue EXPORTED             ← r1 L-6  ⟵ the ONE
        Button: emphasis × tone × size (+ a `voice` axis)                  ← L2-1 · R5-3   standing
        SelectTrigger size="sm" as a PROP, never re-derived as h-9         ← R5-3          BH item
        │ ⟦lint 1⟧ zero demo edges to reka-ui
        │ ⟦lint 4⟧ no Tailwind class on a glass primitive a token already sets  ← R5-3
        │ ⟦gate 2b⟧ NEW · server.fs.allow ⊆ project root unless a walk is proven ← R6-2
        ▼
  L3  demo/color/     InterpolationSelect.vue — ONE space+hue control, TWO consumers
                      spaces.ts — a LABEL OVERLAY keyed by SPACE_IDS, no facts of its own
        ▼
  L4  demo/workbenches/mix/   MixPane owns the verb ONCE, with its predicate   ← R5-4
        │ MixConfigBar: 173 → ~55 lines. No verb, no canMix, no reka edge, no casts,
        │ no vocabulary, no ramp computation — and the three Select blocks collapse to one v-for.
        ▼
  ⟂   demo/shell/     routes; holds NO verbs
```

**Rounds 4–5's rules 0–7 stand. Rule 0 gains its sharpest clause, and rule 8 is new.**

- **Rule 0** (*every boundary has a live lint rule*) — **a config comment that names a path or a
  mechanism is an assertion, and an unasserted assertion decays into fiction.** This round found three
  instances in three files: `eslint.config.js` globbing `demo/@/**` (r3 L3-1), `vitest.config.ts`
  citing `test/dist/` (R6-3), and `vite.config.ts` + `tsconfig.demo.json` citing a `file:` symlink to
  an unbuilt sibling (R6-1). All three are green. **The cheapest possible cure is one test file that
  asserts every path named in a gate config still exists** — four lines, and it would have caught all
  three. **(R6-1 · R6-3)**
- **Rule 8 — NEW: a workaround must carry its own retirement condition as an assertion, not as
  prose.** `siblingFsAllowTransient` names inlined data-URI fonts as the condition under which it can
  be deleted; glass-ui 7.0.0 ships four of them and zero `../fonts` references, and the widening — the
  repository's entire parent directory, served over the LAN — is still in the config. A workaround
  that documents its exit criterion and does not test it will outlive the problem every time.
  **(R6-2)**

---

## §7 · Negative proof — checked this round, genuinely sound

Recorded so the absences are evidence, including the probes I ran and discarded.

1. **A MAJOR I filed and then killed with my own measurement.** I had written up
   *"`@mkbabb/value.js/css` has no `tsconfig.demo.json#paths` entry, so vue-tsc resolves it through the
   self-installed registry copy whose `css.d.ts` demonstrably differs — the demo typechecks `/css`
   against a stale surface, and `picker-color.ts` (the module defining this component's `PickerSpace`
   prop) is the consumer."* Every premise is true and the conclusion is false:
   `tsc --traceResolution` (§4a) shows the `paths` miss falls through to **package self-reference** and
   lands on the local `dist/`. **No finding.** It is recorded because it is the exact shape of the
   claim r2 L2-2 made and r5 carried, and because the true defect underneath it (§4b) is only visible
   once the false one is cleared.
2. **A second discarded probe: the CTA's `disabled` binding is honest.** I measured
   `domDisabled: false`, `ariaDisabled: null`, `opacity: 1`, `pointerEvents: auto` on the Mix button
   and nearly filed a dropped-prop BLOCKER. Re-probing the page text showed a `RESULT` row already
   rendered — the shared browser session had ≥2 operands selected, so `canMix` was genuinely `true`.
   glass-ui's Button forwards it correctly (`button-Bu9F4uU6.js`: `disabled: h.value ? m.value : void 0`,
   plus an `aria-disabled` branch). **No finding**, and r5 §7.5 records the mirror-image false positive
   from the other state — two rounds, two opposite misreads of the same button, both cleared.
3. **The `#description` slot is live API, not a second dead prop.** Having found `variant` dead, I
   checked the other glass-ui seam this file depends on. `SelectItem` in glass-ui 7.0.0 declares
   `{ default?: … } & { description?: (props: {}) => any }` (`SelectItem.vue.d.ts`, `__VLS_WithSlots`
   tail). The whole T-17 preview-chip mechanism at `:109-114` and `:131-136` is wired to a slot that
   exists and survived the major. **No finding.**
4. **The public surface is clean in the code.** `MixConfigBar.vue:12` → `@mkbabb/value.js/color`, a
   real `exports` key; `md5(dist/subpaths/color.d.ts) == md5(node_modules/@mkbabb/value.js/dist/subpaths/color.d.ts)
   == 5a71fb2b2121cc96492bc561b2ce93f4` — no drift on this subpath. Whole-demo census: `color` 25,
   `css` 10, `math` 6, `easing` 5, `quantize` 4, **zero deep `src/` paths, zero bare-root imports**
   (`grep -rn 'from "@mkbabb/value.js"' demo/` → 0 hits, correct since `exports` has no `.` key). A
   real npm consumer could write line 12 verbatim.
5. **`verbatimModuleSyntax` and Vue 3.5 idiom.** Lines 12, 13, 14, 15 all `import type`; 18 and 23 are
   genuine value imports. `:25-45` is reactive props destructure with a default (`operandColors = []`).
   The two `computed` ramp maps are correctly cold while `SelectContent` is unmounted. Edicts 7 and 8
   satisfied.
6. **Not a god module.** 173 lines, one job, no local state, no timers, no lifecycle, no DOM access.
   Its composable (`useMixingState.ts`, 130 lines) is a clean state machine honouring the one-clock
   law. Every defect across six rounds is a *boundary* defect.
7. **The three named historical suspects are not in this cone.** `ActionBarLayer`'s local
   `useLayerTransition` reimplementation is at `demo/shell/dock/layers/ActionBarLayer.vue:63` (a real
   V-W44 glass-7 carry, elsewhere); `demo/palettes/export.ts` + `usePaletteExport.ts` vs
   `demo/palettes/export/serializers.ts` is the palettes tree; the parallel `useDark` stores are
   `demo/scenes/about/markdown/composables/`. This component touches none of them.
8. **Visual audit: nothing attributable to this component.** `/#/mix`, all four Safari matrices —
   `overflowX 0 · pageErr 0 · consoleErr 0 · main 1`. The 8 desktop / 4 mobile `smallTapTargets` are an
   `input` 160×23, three 22×22 slug buttons ("Switch to slug" / "Generate new slug" / "Cancel") and
   four 12×24 channel spans — all picker/slug shell, none from `MixConfigBar`; its own targets measure
   36 px and 40 px and both carry `aria-label` or text. The screenshot does corroborate L2-1 visually:
   the CTA is the palest, lowest-contrast element on the pane.

---

## §8 · Verdict

**DEFECTIVE** — cumulative across six rounds: **3 BLOCKER · 23 MAJOR · 8 MINOR · 2 INFO.**

**Strongest defect this round: R6-4.** Round 5 argued from two manifests that `@mkbabb/value.js@4.0.0`
declaring `@mkbabb/glass-ui ^7.0.0` closes a producer↔consumer cycle. Round 6 found the cycle's
physical residue: `node_modules/@mkbabb/value.js` — version 4.0.0, `resolved:
https://registry.npmjs.org/@mkbabb/value.js/…tgz`, a real directory, **installed into the library's
own tree** because npm auto-installs peers and glass-ui@7 peers on `@mkbabb/value.js: ^4.0.0`, with no
self-dependency declared anywhere in `package.json`. And the two copies have already drifted:
`css.d.ts` **382 vs 350 lines**, `css.js` differing at char 141 in minified identifier assignment
against an identical content-hashed chunk — same source, different toolchain — with the *local* build
emitting five spurious duplicate declarations the published one does not. Two artifacts, one immutable
`name@version`. The demo, the tests and both typechecks happen to agree only because all three
resolvers implement package self-reference; that is a coincidence of tooling, not a boundary.

The other three findings are one sentence said three ways: **this repository writes its boundaries in
comments and checks them nowhere.** `eslint.config.js` globs a directory tree W43 deleted (r3 L3-1).
`vitest.config.ts` justifies an exclude-filter by gates in a `test/dist/` that does not exist (R6-3).
`vite.config.ts` and `tsconfig.demo.json` justify three unrelated settings by a `file:` symlink to a
sibling that has never been built (R6-1) — and one of those settings, `server.fs.allow`, hands a
LAN-exposed dev server the entire parent directory of the repository on the strength of a `@font-face`
walk that glass-ui 7.0.0 eliminated by inlining four faces as `data:font/woff2` (R6-2, `grep -c
'\.\./fonts'` → **0 across all 20 shipped stylesheets**). Every one of these is green. Every one of
them would have gone red under a four-line test asserting that the paths a gate config names still
exist.

And the same shape reaches all the way down to the subject file. `variant="primary-audacious"` at
`MixConfigBar.vue:163` is a prop glass-ui deleted, landing on the DOM as junk markup while the verb
renders `data-emphasis="secondary"` over `glass-wash` — precisely the register the comment three lines
above it says it is avoiding — across **51 sites in 22 files**, with `vue-tsc` exiting **0** and
printing nothing. §1d newly settles who owes the fix: the producer's source has carried `emphasis` and
zero `primary-audacious` all along. Nobody regressed. **The boundary between them was simply never
instrumented**, so a design system completed a major migration and its only in-house consumer did not
notice, for a whole tranche, in a repository whose demo exists to prove the surfaces are sufficient.

Round 3 closed on *"the rule that said there must be only one home no longer matches any file."*
Round 4: *"the guard built to protect it was pointed at its own reflection."* Round 5: *"the outermost
boundary was never drawn at all."* Round 6 adds the reason all three could be true at once: **every
boundary in this repository is documented, argued for at length, and asserted by nothing — so the tree
is free to move out from under the prose, and it has, in five separate places, without a single gate
turning red.**

---

*Seat: CHALLENGE-L (library structure), round 6. Rounds 1–5 preserved verbatim at
`challenge-L-library-round-{1,2,3,4,5}.md`. No source edits land from this formation. All probe
scripts were written to `/tmp` and the session scratchpad, never to the repository. Browser probes
were read-only against the running dev server at `:9000` (two `evaluate` calls, one `navigate`).*
