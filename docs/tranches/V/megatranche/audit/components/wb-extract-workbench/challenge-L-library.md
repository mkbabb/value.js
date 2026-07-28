# CHALLENGE-L — library structure · `demo/workbenches/extract/ExtractWorkbench.vue`

## Model receipt

I observe myself to be **Opus 5** (`claude-opus-5[1m]`, the 1M-context variant) — the tier this seat
was explicitly spawned with. Declared, not inherited.

- Repository `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`.
- Subject: `demo/workbenches/extract/ExtractWorkbench.vue` — `wc -l` → 293 (template 1–182, script 184–282, style 284–293).
- Axis: **library structure** — module boundaries, ownership, dependency direction, public surface.

**This is pass 3.** Pass 1 (2026-07-27) is at `challenge-L-library.pass1-2026-07-27.md`; pass 2
(2026-07-28) is preserved verbatim at `challenge-L-library.pass2-2026-07-28.md`. Both are strong.
I worked the component cold before reading either, then reconciled. This file is the canonical
record: it re-verifies the load-bearing prior claims with my own commands, adds **five findings
neither pass reached**, and records one place where pass 2's live measurement **corrected a
conclusion I had independently drafted** — which is worth stating, because it is evidence the
correction was real and not a stylistic preference.

**Verdict: DEFECTIVE.** Prior severity roll-up (1 BLOCKER · 8 MAJOR · 8 MINOR) stands; pass 3 adds
2 MAJOR · 3 MINOR.

**Strongest defect after three passes:** the forged `Palette` entity is not cosmetic. The palettes
feature **parses the extract workbench's private sentinel back out** and branches nine ways on it
(§2.1). Passes 1 and 2 established the forgery; neither found the return edge that makes it a
cycle.

---

## §0 · Reconciliation with the prior passes

Independently re-run, this pass, on the same HEAD:

| prior finding | my command | result | status |
|---|---|---|---|
| B-1 · camera `MediaStream` outlives the view | `grep -n ':max=' demo/color-picker/App.vue` → `88:"9"` `107:"6"` `133:"4"`; `grep -n KeepAlive demo/shell/PaneSlot.vue` → `:120`; `grep -rn "onDeactivated" demo/` → **0 hits** (2 `onActivated`, both `HeroBlob.vue:27,246`) | desktop-left `:max="6"` equals exactly the 6 non-admin left panes named at `App.vue:96-99` — extract is never LRU-evicted in non-admin use, so `ExtractWorkbench.vue:281 onBeforeUnmount(stopCamera)` never runs | **CONFIRMED — BLOCKER stands** |
| camera implemented twice, composable copy dead | `grep -rn "quantizeFromCamera\|quantizeFromCanvas\|useImageQuantize" demo src test e2e` → only the definitions at `useImageQuantize.ts:110,115` and the returns at `:158,:159`; zero call sites | 41 of 161 lines (`:110-150`) unreachable, while `ExtractWorkbench.vue:239-279` reimplements the same flow *without* the `stop()` handle the dead copy already returns | **CONFIRMED** |
| port bypass into the raw store | `useExtractSession.ts:17,41,185` vs `usePalettePorts.ts` `libraryPort = { … createPalette … }` provided at `LIBRARY_PORT_KEY` | the port publishes exactly the capability that is bypassed; `usePalettePorts.ts:22-30` states "no consumer injects a member outside the port it named" | **CONFIRMED** |
| demo import-boundary law dead | `npx eslint --print-config demo/workbenches/extract/ExtractWorkbench.vue` → `no-restricted-imports = null`; same for `useExtractSession.ts` and `palettes/browser/card/index.ts`; `ls -d demo/@` → *No such file or directory*; `grep -rn "@components/" demo/` → 2 hits, both prose | `browser/index.ts:6-8` asserts "the G-DEMO-3b boundary (eslint.config.js) **enforces it standing**" — it does not | **CONFIRMED** |
| dead `layout="split"` arm | `grep -rn "ExtractWorkbench" demo e2e test` → one mount, `ExtractPane.vue:11`; `grep -rn 'layout=' demo/workbenches/extract/` → `ExtractPane.vue:13 layout="column"` is the only pass | `:5`, `:13`, `:18`, `:148` unreachable; `useBreakpoint("(min-width: 640px)")` (`:188`,`:226`) is the demo's **only** 640px literal and feeds only `:148` | **CONFIRMED** |
| `DisplayColorSpace` ×4 + type-erased hop | 4 declarations (`color-model.ts:29`, `useImageSampler.ts:21`, `ExtractWorkbench.vue:202`, `ExtractPane.vue:30`); `picker-color.ts:37 export type PickerSpace = SpaceId` is a bare alias so all four denote one type; `usePaneRouter.ts:141` → `PaneSlot["props"]: Record<string, unknown>` → `PaneSlot.vue:125 v-bind="liveProps"` | **CONFIRMED** | |
| only defaulted `CSS_COLOR_KEY` inject | `grep -rn "inject(CSS_COLOR_KEY" demo/` → 8 sites use `inject(CSS_COLOR_KEY)!`, only `ExtractWorkbench.vue:218` uses `inject(CSS_COLOR_KEY, undefined)`; `App.vue:271` provides unconditionally | one site in nine, and it is the one that installs the `?? ''` degrade (`:71`, `:149`) | **CONFIRMED** |
| `.plate-ink` ×5 | `grep -rln "\.plate-ink" demo/` → `ExtractWorkbench.vue`, `ExtractControls.vue`, `ImageDropZone.vue`, `EmptyState.vue`, `ErrorBoundary.vue`; `demo/styles/utils.css` already hosts `.fira-code` / `.section-subtitle` — the same class of cross-component text recipe | **CONFIRMED** | |

**Epistemic note on pass 2's C-1.** Working cold, I reached pass 1's conclusion — that the three
nameless buttons on `/#/extract` (`REPORT.json` `safari-desktop-light /#/extract`: `"button": 15`,
`"namelessButtons": 3`, in all four matrices) indict glass-ui's `DockControl`, whose declared prop
surface (`node_modules/@mkbabb/glass-ui/dist/components/dock/DockControl.vue.d.ts`) is
`{shape, compact, active, type, disabled, as, asChild, class}` — no `title`, no `ariaLabel`. I had
that finding drafted. Pass 2's live audit (`/#/mix`, `/#/` — eight `DockControl`s, every one
`aria-label`, none `title`) shows the app-wide idiom is already correct and
`ExtractControls.vue:41,50,85` is the **sole divergence**. Pass 2 is right and I withdraw the
drafted finding: pushing a `title`→`aria-label` fallback into the design system would install a
masking fallback (edict 2) to accommodate one file. **Cure stands as pass 2 states it:** three
`aria-label`s in `ExtractControls.vue`, no glass-ui change, no BH relay.

---

## §1 · Nothing found in the published surface — the negative, re-proved

This is the axis's headline question and it is worth re-establishing independently each pass,
because it is the one thing that is right.

```
$ grep -rn "@mkbabb/value.js" demo/workbenches/extract/
quantize-worker.ts:6                    import { quantizePixels }                  from "@mkbabb/value.js/quantize";
quantize-worker.ts:7                    import type { QuantizeOptions, QuantizedColor } from "@mkbabb/value.js/quantize";
ExtractWorkbench.vue:189                import type { SpaceId }                    from "@mkbabb/value.js/color";
composables/useExtractSession.ts:14     import type { QuantizedColor }             from "@mkbabb/value.js/quantize";
composables/useExtractSession.ts:15     import { serializeCssColor }               from "@mkbabb/value.js/css";
ExtractPane.vue:28                      import type { SpaceId }                    from "@mkbabb/value.js/color";
ImageEyedropper/composables/useImageSampler.ts:12  import type { SpaceId }         from "@mkbabb/value.js/color";
ImageEyedropper/composables/useImageSampler.ts:13  import { parseCssColor }        from "@mkbabb/value.js/css";
composables/useImageQuantize.ts:9       import type { QuantizedColor, QuantizeOptions } from "@mkbabb/value.js/quantize";

$ grep -rn "@src\|\.\./\.\./\.\./\.\./src\|from \"src/" demo/workbenches/extract/
NONE
```

Nine imports, three specifiers, all three real keys in `package.json#exports`. Symbol-by-symbol:
`SpaceId` → `src/subpaths/color.ts:11`; `serializeCssColor` + `parseCssColor` → `src/subpaths/css.ts`;
`QuantizedColor` / `QuantizeOptions` / `quantizePixels` → `src/subpaths/quantize.ts:1-2`.
`vite.config.ts:38-49` *generates* the demo self-alias set from `package.json#exports`, so a subpath
that is not published cannot resolve in the demo either. **A real external consumer of
`@mkbabb/value.js@4.0.0` could write all nine lines verbatim.**

Also sound, stated so this report is not read as an unqualified condemnation:

- **`verbatimModuleSyntax`** — every type-only import in the 12-file subtree is `import type` or an
  inline `type` specifier (`ImageEyedropper.vue:99`). Zero violations.
- **The `../../palettes/browser/card` reach complies with G-DEMO-3b's letter** — `browser/index.ts:23-30`
  re-exports the `./card` sub-barrel and `:11-13` explicitly blesses sub-barrel reaches. The code
  complies independently of the fact that the rule is dead.
- **`demo/ui/` is not a measured tree-shaking defect.** `node_modules/@mkbabb/glass-ui/package.json`
  declares `"sideEffects": ["*.css"]`, so the bundler may elide unused root re-exports. I went
  looking for a byte cost here and did not find one; the finding (pass-2 N-3) is a coherence
  defect — one concept, two names — and should be stated as exactly that.
- **No named historical suspect touches this graph.** `ActionBarLayer`/`useLayerTransition`,
  `palettes/export.ts` vs `usePaletteExport.ts` vs `export/serializers`, and the three parallel
  `useDark` stores appear nowhere in the subtree's transitive import set.

---

## §2 · NEW — what passes 1 and 2 did not reach

Coverage check before claiming novelty:

```
$ for t in __extracted__ TEMP_ID_PREFIXES getPaletteKind quantizeError totalPopulation lastFile K-PALID; do
      grep -c -- "$t" challenge-L-library.pass1-*.md challenge-L-library.pass2-*.md; done
__extracted__      pass1=1  pass2=0     ← named, but only as a forged field
TEMP_ID_PREFIXES   pass1=0  pass2=0
getPaletteKind     pass1=0  pass2=0
quantizeError      pass1=0  pass2=0
totalPopulation    pass1=0  pass2=0
lastFile           pass1=0  pass2=0
K-PALID            pass1=0  pass2=0
```

### 2.1 · P3-1 · MAJOR — the forgery is a **cycle**: palettes parses the workbench's sentinel back and branches nine ways on it

Pass 1 §L-13 found the forged entity and called it "the canonical symptom of a wrong module
boundary." Correct, and one hop short. The sentinel does not sit inert in a display prop — **the
palettes feature reads it back out and drives live UI with it.**

The outbound edge (workbench → palettes), `useExtractSession.ts:88-100`:

```ts
return {
    id: "__extracted__",
    name: paletteName.value,
    slug: "extracted",
    colors,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isLocal: true,
};
```

The **return** edge (palettes → workbench), `demo/palettes/utils.ts:18-30`:

```ts
export type PaletteKind = "temporary" | "saved" | "remote";

const TEMP_ID_PREFIXES = ["gen-", "__extracted__", "mix-"];

export function getPaletteKind(palette: Palette): PaletteKind {
    if (!palette.isLocal) return "remote";
    const id = palette.id;
    if (id != null && TEMP_ID_PREFIXES.some((p) => id.startsWith(p))) return "temporary";
    return "saved";
}
```

```
$ grep -rn "__extracted__" demo/
demo/workbenches/extract/composables/useExtractSession.ts:91:   id: "__extracted__",
demo/palettes/utils.ts:20:                                      const TEMP_ID_PREFIXES = ["gen-", "__extracted__", "mix-"];
demo/palettes/types.ts:17:                                       * `gen-`/`mix-`/`__extracted__` temp prefix), present **iff** `isLocal`.
```

And the consumption, `PaletteCard.vue:225` → `:85` → `PaletteCardMenu.vue`:

```
$ grep -n 'kind\b' demo/palettes/browser/card/PaletteCard/PaletteCard.vue
225:  const kind = computed<PaletteKind>(() => getPaletteKind(props.palette));
 85:  :palette-kind="kind"

$ grep -n "paletteKind" demo/palettes/browser/card/PaletteCard/PaletteCardMenu.vue
16,28,49,64,74,84,134,144,153   ← nine v-if branches
```

**So the menu the extract workbench's card renders is selected by a string literal the extract
workbench mints and the palettes feature parses.** The coupling is bidirectional, load-bearing,
untyped in both directions, and invisible to `vue-tsc` at every hop.

**The decisive test of a wrong boundary.** Adding a fourth workbench that renders a `PaletteCard`
requires editing `demo/palettes/utils.ts:20` — a file in a *foreign feature* — or the new
workbench's card silently renders the `"saved"` menu (Publish / Rename / Delete on a thing that was
never saved). The registry already enumerates three workbenches (`gen-`, `__extracted__`, `mix-`),
so this has happened three times.

**Mechanism.** There is no type for "a candidate palette not yet persisted." Its absence forces the
workbench to impersonate a persisted entity, which forces the palettes feature to un-impersonate it
by string sniffing. The two halves of one missing type, split across two features and joined by a
literal.

**Cure.** Pass 1's `PaletteSpecimen` split is the right shape but is scoped as a *display* fix. It
must also carry the discriminant: introduce `PaletteDraft { name, colors }` in `demo/palettes/` as
a first-class sibling of `Palette`, make the card's contract `Palette | PaletteDraft`, and derive
`PaletteKind` from the **union tag**, not from `id.startsWith`. `TEMP_ID_PREFIXES` is then deleted
and the return edge disappears — the palettes feature stops knowing that workbenches exist.

### 2.2 · P3-2 · MAJOR — the forged entity defeats the K-PALID id-honesty invariant by construction

`demo/palettes/usePaletteStore.ts:47-55` installs the R.W2 K-PALID invariant as a **type predicate**:

```ts
// K-PALID: a "saved" palette is a LOCAL palette that carries its local store
// key. The type predicate encodes the store invariant — every stored local
// palette is minted an `id` (`createPalette` / `addPublishedPalette`) — so
// downstream consumers read `id` as a definite `string` with no coercion.
const savedPalettes = computed(() =>
    getStore().value.palettes.filter(
        (p): p is Palette & { id: string } => p.isLocal && p.id != null,
    ),
);
```

The forged extract palette satisfies **both** conjuncts: `isLocal: true` (`useExtractSession.ts:97`)
and `id: "__extracted__"` (`:91`). It is, to the predicate, indistinguishable from a palette the
store minted. `demo/palettes/types.ts:15-27` states the invariant it is supposed to encode —
*"client-minted (`crypto.randomUUID()` or a `gen-`/`mix-`/`__extracted__` temp prefix)"* — i.e. the
type doc has already been widened to grandfather the forgeries in. The invariant that "every stored
local palette is minted an `id`" is now enforced by nothing: three features mint `id`s outside the
store's two minting functions, and the predicate cannot tell the difference.

This is not currently a live bug — the forged object never enters `getStore().value.palettes`
(`onSave` at `useExtractSession.ts:185` calls `createPalette`, which mints a fresh entity). It is a
**structural** finding: an invariant installed to stop exactly this class of impersonation has been
defeated by three consumers and then documented as if the defeat were the design.

**Reproduction:** NONE — this is a type-level defect with no runtime symptom today. Labelled as
such. It becomes live the moment any workbench pushes its display object into the store.

### 2.3 · P3-3 · MAJOR — the camera writes its error into the quantizer's error channel, where the next image silently erases it

```ts
// ExtractWorkbench.vue:251-254
} catch (err) {
    session.quantizeError.value = `Camera access denied: ${err}`;
    cameraActive.value = false;
}
```

`quantizeError` is a **writable computed over the worker's error ref**
(`useExtractSession.ts:66-73`):

```ts
const quantizeError = computed<string | null>({
    get: () => workerError.value ?? (presentedPalette.value.ok ? null : presentedPalette.value.error),
    set: (value) => { workerError.value = value; },
});
```

and `useImageQuantize.ts:86` clears that ref at the top of **every** quantize:

```ts
error.value = null;
```

So a camera-permission denial is stored in the quantizer's slot and is wiped by the next unrelated
image drop. One error channel, three semantically distinct producers (worker failure, serialization
failure, device-permission failure), one of which is written from *outside* the composable that
owns the channel by reaching through a computed setter.

The ownership defect is the setter itself: `useExtractSession` exposes a write path into
`useImageQuantize`'s private state so that the SFC can inject an error the quantizer knows nothing
about. Three modules share one mutable slot.

**Reproduction:** open `/#/extract`, press the camera control, **deny** camera permission → the
destructive line at `ExtractWorkbench.vue:100-105` reads "Camera access denied: …". Now drop any
image → the message vanishes on `runQuantize`'s first statement, with no user action
acknowledging it. (Attempted live; both drivers were held by concurrent seats — output in §4 — so
this is carried on the three cited lines, which are unambiguous.)

**Cure.** `useCameraCapture` (pass-2's lattice already creates it) owns its own `error` ref; the SFC
renders whichever of the two is set. Delete the `set:` half of the `quantizeError` computed — a
writable computed over another composable's private ref is the whole defect in one construct.

### 2.4 · P3-4 · MINOR — 4 of `useExtractSession`'s 17 returned members are read by nobody

```
$ for m in palette lastFile paletteName totalPopulation extractedPalette dominant dominantShare kSliderGradient; do
      grep -c "session\.$m" demo/workbenches/extract/ExtractWorkbench.vue; done
palette           0      extractedPalette  2
lastFile          0      dominant          4
paletteName       0      dominantShare     1
totalPopulation   0      kSliderGradient   1
```

`useExtractSession` has exactly one consumer (`ExtractWorkbench.vue:220`). `palette` (`:200`),
`lastFile` (`:207`), `paletteName` (`:208`) and `totalPopulation` (`:212`) are exported into a
one-consumer surface that reads none of them. `totalPopulation` is additionally a full recomputation
of a sum `dominantShare` already computes internally.

That is the composable drifting toward an aggregate: 17 members returned, 13 used, in a module with
a single caller. The right surface for a one-consumer composable is exactly what that consumer
reads.

### 2.5 · P3-5 · MINOR — the sentinel registry is not a prefix scheme

```ts
const TEMP_ID_PREFIXES = ["gen-", "__extracted__", "mix-"];   // utils.ts:20
```

`"gen-"` and `"mix-"` are separator-terminated prefixes matched against ids like `gen-<uuid>`.
`"__extracted__"` has no separator and is the **complete** id (`useExtractSession.ts:91`), matched by
`startsWith` as a degenerate case. Three workbenches, two incompatible id conventions, in one array
named for the convention only two of them follow. Cosmetic on its own; it is listed because it is
the visible tell that the registry grew by accretion rather than by design, which is P3-1's
mechanism in miniature.

---

## §3 · Amendments to pass 2's greenfield lattice

Pass 2's lattice is sound and I adopt it. Three amendments, all consequences of §2:

```
demo/palettes/
    draft.ts                     ← NEW.  export interface PaletteDraft { name: string; colors: readonly PaletteColor[] }
                                   The type whose ABSENCE is P3-1's entire mechanism. Every workbench
                                   (extract · generate · mix) produces one; none forges a Palette.
    types.ts                     ← Palette loses the `gen-`/`mix-`/`__extracted__` prose at :17;
                                   K-PALID's predicate becomes honest again              (P3-2)
    utils.ts                     ← TEMP_ID_PREFIXES DELETED. getPaletteKind derives from the
                                   Palette | PaletteDraft union tag, not id.startsWith().
                                   The palettes feature stops knowing workbenches exist  (P3-1, P3-5)
    browser/card/
        PaletteSpecimen.vue      ← pass-2's split, now taking PaletteDraft as its contract
        PaletteCard.vue          ← contract `Palette | PaletteDraft`; menu branches on the tag

demo/workbenches/extract/composables/
    useExtractSession.ts         ← returns 13 members, not 17                             (P3-4)
                                   `quantizeError` becomes read-only: the `set:` half DELETED (P3-3)
    useCameraCapture.ts          ← (pass-2) owns its own `error` ref alongside the stream  (P3-3)
```

**Ordering by leverage**, amending pass 2's: pass 2 puts the boundary law first and that is right —
`no-restricted-imports = null` over `demo/workbenches/**` is why every other finding could
accumulate unobserved. But **P3-1 now ranks immediately after the BLOCKER**, ahead of the seam
findings, because it is the only defect on the list where a *neighbouring feature's* source file
must be edited whenever this feature changes shape. That is the definition of a boundary that is in
the wrong place, and unlike the dead-code findings it actively grows: it has grown three times
already.

---

## §4 · What I could not measure

Both browser drivers were held by concurrent seats for the whole of this pass:

```
$ (playwright) browser_navigate http://localhost:9000/#/extract
Error: Browser is already in use for /Users/mkbabb/Library/Caches/ms-playwright-mcp/mcp-chrome-83447af,
       use --isolated to run multiple instances of the same browser

$ (chrome-devtools) navigate_page http://localhost:9000/#/extract
Error: The browser is already running for /Users/mkbabb/.cache/chrome-devtools-mcp/chrome-profile.
       Use a different `userDataDir` or stop the running browser first.
```

Consequently P3-3's reproduction is carried on three cited lines rather than a photograph, and I
took pass 2's live `DockControl` audit (C-1) on its evidence rather than re-running it. Everything
else in this pass is static, and the static evidence is complete: the §2 findings are all
file:line + pasted command output.

I did **not** re-open pass 2's own open items (production chunk composition; whether the frozen
`node_modules/@mkbabb/value.js@4.0.0` ever wins a resolution; the `?probe=1` self-navigation). They
remain open as pass 2 states them.

---

## §5 · Pass-3 delta table

The full roll-up is `challenge-L-library.pass2-2026-07-28.md` §5. This pass adds:

| id | severity | finding | evidence |
|---|---|---|---|
| **P3-1** | **MAJOR** | the forged entity is a **cycle** — `palettes/utils.ts:20` parses `"__extracted__"` back and drives 9 `PaletteCardMenu` branches; a 4th workbench must edit a foreign feature's file | `useExtractSession.ts:91` · `utils.ts:18-30` · `PaletteCard.vue:225,85` · `PaletteCardMenu.vue:16,28,49,64,74,84,134,144,153` |
| **P3-2** | **MAJOR** | K-PALID's type predicate is defeated by construction — the forgery satisfies `p.isLocal && p.id != null` | `usePaletteStore.ts:47-55` · `useExtractSession.ts:91,97` · `types.ts:15-27` |
| **P3-3** | **MAJOR** | camera error written into the quantizer's channel through a writable computed, silently cleared by the next quantize | `ExtractWorkbench.vue:252` · `useExtractSession.ts:66-73` · `useImageQuantize.ts:86` |
| **P3-4** | MINOR | 4 of 17 returned session members read by nobody, in a one-consumer composable | grep counts, §2.4 |
| **P3-5** | MINOR | `TEMP_ID_PREFIXES` mixes two id conventions; `"__extracted__"` is a whole id, not a prefix | `utils.ts:20` · `useExtractSession.ts:91` |
| — | withdrawn | glass-ui `DockControl` accessible-name defect — **pass 2's C-1 is correct**, I reached pass 1's wrong conclusion cold and withdraw it | §0 |

---

## §6 · Reproduction index (this pass)

```
grep -rn "__extracted__" demo/                                → 3 sites: mint · parse · type-doc         (P3-1)
grep -n "paletteKind" .../PaletteCardMenu.vue                 → 9 v-if branches on the parsed value      (P3-1)
grep -n 'kind\b' .../PaletteCard.vue                          → :225 getPaletteKind → :85 :palette-kind  (P3-1)
grep -n "savedPalettes = computed" -A8 usePaletteStore.ts     → :53 predicate the forgery satisfies      (P3-2)
grep -n "quantizeError" -A10 useExtractSession.ts             → :66-73 writable computed, set→workerError (P3-3)
grep -n "error.value = null" useImageQuantize.ts              → :86 cleared every quantize               (P3-3)
for m in palette lastFile paletteName totalPopulation; do grep -c "session.$m" ExtractWorkbench.vue; done → 0 0 0 0  (P3-4)
grep -n ':max=' demo/color-picker/App.vue                     → :88 "9"  :107 "6"  :133 "4"       (B-1 re-verify)
grep -rn "onDeactivated" demo/                                → 0 hits                            (B-1 re-verify)
npx eslint --print-config .../ExtractWorkbench.vue            → no-restricted-imports = null      (boundary re-verify)
ls -d demo/@                                                  → No such file or directory         (boundary re-verify)
grep -rn "@mkbabb/value.js" demo/workbenches/extract/         → 9 imports, 3 published subpaths          (§1)
grep -rn "@src\|from \"src/" demo/workbenches/extract/        → NONE                                     (§1)
python3 -c "…glass-ui package.json…" → sideEffects: ['*.css']  → demo/ui is coherence, not bytes          (§1)
```
