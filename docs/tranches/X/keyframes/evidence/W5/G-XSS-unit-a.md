SERVED MODEL: claude-opus-5[1m]

# X.KF.W5.a — G-XSS evidence (arm 0, THE FRONT-LOAD)

**Wave** KF.W5 · **unit** `.a` · **seat** Opus · **date** 2026-09-17.
**Substrate**: keyframes.js `master` == `origin/master` `7d958f212fd519142ee9ed5e298d5afe456a7967`
at open (the wave record's re-derived ref; the spec's `81a56990` is 14 commits behind and the
spec pins *"or later"*). Zero tracked modifications at open; the two untracked rows are the
§0m.0 survivors and were never staged.

Every figure below was read from the settled bytes and **double-run**; both runs agree.

---

## 1 · The born-RED readings, at open

| leg | command | reading |
|---|---|---|
| observable half | `git grep -n 'innerHTML' origin/master -- demo/components/instrument/keyframes/composables/useHighlightCSS.ts` | **2 lines** — `:111 el.innerHTML = s;` · `:123 el.innerHTML = h.value;` |
| observable half, property form | `… \| grep -v 'h\.value'` | **1** |
| round-trip half | `npx vitest run --project demo` | 30 files / 191 tests passed; `test/demo/instrument/highlight-css-roundtrip.test.ts` **ABSENT** |

Both reproduce the wave record's §Baseline exactly.

## 2 · The fixture, measured RED **before** the cure

The fixture was written first and run against the **un-cured** composable — the wave's own
born-RED discipline, and the only way a gate's bite is a measurement rather than a claim:

⟨`npx vitest run --project demo test/demo/instrument/highlight-css-roundtrip.test.ts`⟩ →
**4 failed (4)**, each for its own reason and none of them a timeout-by-accident:

1. `KAD-2 … byte-identical` — `100% { content: "<name> & <other>"; }` came back as
   `100% { content: " & "; }`: the parser swallowed **both** `<name…>` tags.
2. `KAD-2 … lands as TEXT` — same delta at `textContent`, plus `children.length` ≠ 0.
3. `KAD-1 … crafted payload is inert` — `expected <img src="x" onerror="__kfXSS=1"></img> to be
   null`: the sink minted a **live element with an event handler** out of a `?state=`-shaped
   string.
4. `KAD-3/KAD-14(a) … empty first open` — no `<span>` ever appeared: after the always-empty
   first pass the boolean marker read `"true"` and every later `highlightAll()` short-circuited.
   **Highlighting was inert for the rest of the session.**

## 3 · The cure (commit 1, S-0 — the sink and the marker in ONE commit)

`a9fe060fc7c4c8138071a6aa141aa78d0b1f8148`, one file,
`demo/components/instrument/keyframes/composables/useHighlightCSS.ts`:

- **`:111` → `el.textContent = s`.** `s` is prettier's plain text; text is what it is.
- **The marker redesign (`:110`/`:117`/`:124`).** The boolean attribute recorded only *that* a
  pass had run; it is replaced by a module-level `WeakMap<HTMLElement, string>` recording **the
  exact source text the element's current markup was produced from**. A pass is skipped exactly
  when the element already shows the highlight of the text it currently holds.
  `setHighlightingString` deletes the element's record because the element now holds raw text.
  KAD-14(a)'s trap — *"normalising it to `"true"` silently turns reformat into 'inject raw text,
  never colourise'"* — is structurally impossible afterwards: there is no boolean to normalise.
- **`:123` (`el.innerHTML = h.value`) is untouched** — the hljs-escaped writer, the declared
  inversion. It survives verbatim at `:198` of the cured file.
- **No DOM attribute is lost to a live consumer**: ⟨`git grep -n 'highlighted' origin/master -- .`⟩
  → the only hits outside the composable are prose in `PlaybackRibbon.vue:161` and seven dated
  tranche docs. Zero selectors, zero styles, zero specs.

## 4 · The readings after the cure

| leg | command | reading (run 1 / run 2) |
|---|---|---|
| observable half | `git grep -n 'innerHTML' HEAD -- …/useHighlightCSS.ts` | **exactly one line**, `:198 el.innerHTML = h.value;` — the known-escaped writer inside `highlight()`, `h = hljs.highlight(el.innerText, { language: "css" })` / same |
| observable half, property form | `… \| grep -v 'h\.value'` | **0 / 0** |
| round-trip half | `npx vitest run --project demo` | **31 files / 195 tests passed** / **31 / 195** |
| the fixture alone | `npx vitest run --project demo test/…/highlight-css-roundtrip.test.ts` | **4 passed (4)** |

Baseline was 30 files / 191 tests; the delta is **+1 file / +4 tests**, all of them this unit's.

**G-XSS: RED → GREEN, both halves.** The falsifiers are honoured at the bytes: the escaped
`h.value` write is neither deleted nor rewritten; no new `innerHTML` write appears in the file;
`setHighlightingString` no longer assigns caller-supplied markup; the fixture was **not** re-homed
into a library zone directory (it is the one `create` arm 0 owns, in the shared four-party
`test/demo/instrument/`); and **no tracked file in that directory was touched** — the nine remain
byte-identical (`git status --porcelain` shows one added path, none modified).

## 5 · Instrument caveat — jsdom has no `innerText`

⟨`node -e "… new JSDOM(…); console.log('innerText' in el)"`⟩ → **false**;
`el.innerText` → `undefined` at jsdom 29. `innerText` is the **reader** the component uses
(`highlight()` reads it; `KeyframesAddDialog`'s `onInput` emits it) and never this gate's
**subject**, which is the writer. The spec therefore installs a `<pre>`-faithful shim on
`HTMLElement.prototype` for its own duration and removes it in `afterAll`: the editable surface is
a `white-space: pre` block, where `innerText` and `textContent` agree byte for byte. Declared here
rather than buried, because a shim that silently flattered the subject would be the defect class
this wave exists to kill. It does not: the fixture was **RED 4/4 with the shim installed** and went
GREEN only when the writer changed.

## 6 · The rest of arm 0

| row | disposition | receipt |
|---|---|---|
| **KAD-5** (MAJOR) | CURED, `2f688f9c` | `ensureThemeStyle` called the async `setCodeTheme()` bare on every keydown. Split into `applyCodeTheme` (may reject) + a `setCodeTheme` **boundary** that handles it once; both callers (the ensure and `watch(isDark, …)`) go through it. **Non-toast posture**, as the bank requires: the demo's toast surface is structurally unreachable (the vue-sonner stylesheet is imported nowhere), so a toast would be an inert cure — it logs at the boundary |
| **KAD-14(b)** (MINOR) | CURED, `54d5c20e` | the ensure rewrote the whole github stylesheet's `textContent` per keystroke; one equality check, the dark-mode flip still writes |
| **KAD-14(d)** (MINOR, LATENT) | CURED, `f5f68034` | the shared `#highlightjs-theme` node is refcounted; the **last** holder out removes it. **Premise re-verified before grading, as the row requires**: `useCodeHighlight` has exactly two call sites (`KeyframesEditor.vue:176` · `KeyframesAddDialog.vue:92`), and the dialog is rendered **unconditionally** inside the editor's toolbar (`KeyframesEditor.vue:75`, no `v-if`) — so child and parent **do** co-terminate today and the row stays LATENT. N-2's three-concurrent-instances bank is about `useKeyframesEditor`, a **different composable** (`git grep -n 'useCodeHighlight' -- demo/` → 2 call sites, neither in `KeyframesStringControls.vue`); that reading is recorded so it is not re-filed as a falsification. The cure lands regardless: co-termination is a property of one template, not of the composable |
| **KAD-14(e)** (MINOR) | CURED, `8bc83753` | `highlight` dropped from the return. Symbol census re-run at the settled bytes: `KeyframesEditor.vue:176` takes `{ highlightAll }`, `KeyframesAddDialog.vue:92` takes `{ setHighlightingString, highlightAll }`, and the new fixture uses the same two — **consumers of `highlight` = ∅**. It survives as `highlightAll`'s internal per-element step |
| **KAD-14(c)** | NOT TAKEN — SFC-side, §Excluded (rides KAD-17's KF.W6 packet) | no `.vue` byte written by this unit, for any reason |
| **LP-7's rider · ME-32** | carried prerequisites, **DISCHARGED AT THE FRONTIER** | `test:demo` exists (`package.json:47`) and the demo project runs; the R-9b observability rider is discharged by KF.W4's `fb509edd`, so this unit's round-trip half was **observable on the day it was written** |

## 7 · Instrument floors, measured and attributed (nothing of this unit's in them)

| instrument | reading after the cure | attribution |
|---|---|---|
| `npx tsc --noEmit -p tsconfig.test.json` | **24** `error TS` | identical to the wave record's banked floor (FINDING 3). ⟨`… \| grep -c 'highlight-css-roundtrip'`⟩ → **0**. No pre-existing diagnostic was deleted to reach it |
| `npx vue-tsc --noEmit -p tsconfig.json` (`check` leg 1) | **34** `error TS` across 24 files | ⟨`… \| grep -c 'useHighlightCSS\|highlight-css-roundtrip'`⟩ → **0**. `KeyframesEditor.vue`'s two are `TS2339 Property 'value' does not exist on type 'KeyframeSelector'` at `(38,73)`/`(43,41)` — a different subject; the composable's API surface raises nothing at either consumer, which is the independent check on the KAD-14(e) delete |
| `npm run lint` (`depcruise src demo && eslint demo`) | **4 `no-cycle` errors**, 434 modules / 1539 deps | all four are the `demo/scenes/cube/orbital-drag/**` ring (`index.ts` · `useOrbitalPointer.ts` · `useOrbitalPinch.ts` · `useOrbitalInertia.ts`), pre-existing and none of this unit's. `npx eslint <the composable>` alone → **clean** |

The two typecheck floors are **carried, not reduced**: a seat that greened a leg by deleting a
sibling's pre-existing diagnostic would have moved another wave's RED, which is a HIGH defect.

## 8 · Bounds and law

Writes landed in exactly two keyframes.js paths —
`demo/components/instrument/keyframes/composables/useHighlightCSS.ts` (modify) and
`test/demo/instrument/highlight-css-roundtrip.test.ts` (create, by name) — plus this evidence file
and the wave record on the value.js side. No `src/` byte, no `.vue` byte, no glass-ui byte, no
`scripts/dev/dev.sh`. Six commits, each with its own pathspec **on the commit itself** and each
carrying the session trailer. Nothing was pushed: KF-WRITE's push is the **wave's close**, not a
unit's.
