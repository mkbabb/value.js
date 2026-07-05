# S.W8 — THE 5.0.0 ADOPT EVENT (trigger-gated)

**Name**: W8 — The glass-ui 5.0.0 adopt event
**Opens after**: **the BG/BH joint cut** (trigger-gated — slots into whatever round is current when it fires; NOT on the critical path; books never gates). Ratification is still a precondition: the trigger may fire early, the wave dispatches only post-ratification.
**Spec of record**: `audit/SYNTHESIS.md §3.10` (the walk, from `glassui-consume-map §5`) · the producer's by-name MIGRATION table (BH.B4e) · `letters/GLASSUI-S-ASKS.md` (the verify-at-cut rows + the producer-gap rows fired by W6/W7).
**Agents**: 1 serial (a mechanical, verified walk — the adopt-event book pattern; a triumvirate on any non-mechanical surprise).
**Hard gate**: composite (§Hard gate) — the by-name MIGRATION walk green (typecheck 0, `boot-smoke` cold, e2e 5-project) · local shadcn slider/input DELETED onto `/slider` + `/forms` · CI un-pinned from `tranche/BG` at the master landing.
**Status**: PENDING-RATIFICATION + TRIGGER-GATED (the BG/BH joint cut).

---

## §Goal criterion

The adopt-event book executes as one mechanical, verified walk. (SYNTHESIS §3.10 Goal, verbatim.)

## §Completion criterion

The by-name MIGRATION walk green (typecheck 0, boot-smoke cold, e2e 5-project); local shadcn
slider/input DELETED onto `/slider` + `/forms`; CI un-pinned from `tranche/BG` at the master
landing. (SYNTHESIS §3.10 Completion, verbatim.)

---

## §Scope — the walk (SYNTHESIS §3.10, transcribed verbatim)

The walk (from `glassui-consume-map §5` — the demo consumes **18** specifiers, not the relay's
17; `/styles/fonts` is the unnamed 18th, letter L12 files the addendum before BH.B4e authors the
203-row table): `goo-blob`→`/blob` (3 files, symbols byte-identical) · `density`→`size` prop
walk · bare `--ring` grep → `--focus-ring-color` · `/slider` + `/forms#Input` adopt +
local-shadcn deletion (kills S-2/S-16/S-17 at the true root; verify the spectrum special case,
WS4-11) · `uSatColor[]`/`bodyLightness`/`lightnessFloor` consume + any interim satellite
fallback DELETED · dock-fission rail evaluate (the S-3 letter-rail decision point) · Card
cartoon+glass tier consume (W5-2 re-points) · corner-alias + clip-discipline verify at adopt ·
EasingPicker a11y verify (relay item 8) · `clampLabel` Ad-18 workaround retired · aurora-metal
re-verify · U6 dock-fission verify · GAP-4 blob perf verify. 14 of 18 specifiers are
zero-migration rows — the adopt is genuinely small.

**Plus the producer-gap re-verifications** (the §7.1 hard-gate map fallbacks, if fired):
L2 dark L band ≤0.42 (W6-2/W6-3) · L4 luma truth + the S-20 π re-check (W7-3) · L1 Safari
aurora (W6-5) · any L3/L5/L9/L10/L11 rows W3/W5/W6 recorded.

## §Triumvirate dispatch

Mandatory on:

- **bounds expansion**: any migration row proving non-mechanical (an API shape the MIGRATION
  table didn't name — producer letter, never an in-place adaptation shim); any `src/` write;
- **non-local gate failures**: `boot-smoke` cold RED post-walk (named-export drift the table
  missed — the Tabs class of failure; the catch-all doing its job); e2e regressions localized
  to a producer surface (escalate to the BG/BH inbox, the D8-1 precedent);
- **loop halt**: the third iteration of any dist-resolution diagnostic loop halts and routes.

## §File bounds · disjointness · worktrees

| Surface | Files | Access |
|---|---|---|
| specifier walk | every `@mkbabb/glass-ui` import site in `demo/` (per the MIGRATION table) | modify |
| local shadcn deletion | `demo/@/components/ui/slider/**` · `demo/@/components/ui/input/**` (onto `/slider` + `/forms#Input`) | delete |
| satellite consume | `HeroBlob.vue` / blob config (`uSatColor[]` et al.; interim fallbacks deleted — none should exist) | modify |
| CI un-pin | `.github/workflows/ci.yml` (the `tranche/BG` checkout pin → master, AT the master landing) | modify |

Do NOT touch: `../glass-ui` (zero files — asks route to the inbox), `src/`, `api/`,
`docs/precepts/`. Single writer.

## §Hard gate (verbatim-faithful to SYNTHESIS §3.10)

1. The by-name MIGRATION walk green: `npm run typecheck` 0 · `boot-smoke` cold (`--force`)
   PASS · e2e 5-project green.
2. Local shadcn slider/input DELETED (tree absent; grep-zero); `/slider` + `/forms#Input`
   consumed; the spectrum special case (WS4-11) verified.
3. The verify-at-cut rows walked with evidence: `uSatColor[]` consume · dock-fission rail
   evaluate (the S-3 decision recorded) · Card tier re-point · corner-alias/clip verify ·
   EasingPicker a11y · `clampLabel` Ad-18 retired · aurora-metal · U6 · GAP-4.
4. The producer-gap rows (if any) re-verified and their book rows amended.
5. CI un-pinned from `tranche/BG` **at the master landing** (the un-pin book's own trigger —
   if the cut lands on `tranche/BG` first, the pin stays until master carries it; recorded).
6. `npm run lint` 0 · `npm test` green · `npm run gh-pages` ✓ built.

## §No-workaround prohibitions (binding)

- **NO adaptation shims** for un-tabled migration rows — a surprise is a producer letter.
- **NO interim satellite fallback survives** the consume (deletion is part of the walk).
- **NO early un-pin** — the CI checkout moves off `tranche/BG` only at the 5.0.0 MASTER
  landing, never at the branch cut.

## §Format + lint cadence

`npm run lint` + `npm run typecheck` + `npm test` after each walk segment; `boot-smoke --force`
cold after every segment that touches the module graph; `npx playwright test` at close.

## §Verification artefacts

Saved at close (cited in `PROGRESS.md`): the walked MIGRATION table (row → evidence); the
shadcn deletion grep-zero capture; the `boot-smoke` cold log; the producer-gap re-verification
records; the un-pin commit hash (or the recorded still-pinned rationale); per-segment commit
hashes.

## §Commit plan

Specifier-walk segments row-scoped; the shadcn deletion as its own commit with body; the
satellite consume; the CI un-pin as its own commit (or a recorded deferral); a status commit at
close.

## §Dependencies

- **Depends on**: the BG/BH joint cut (trigger) + ratification. NOT on the critical path — no
  S wave waits on this one.
- **Blocks**: nothing (S.W9 re-verifies whatever state this book is in at close; an unfired
  trigger at S close hands the book to the successor, the R precedent).

## §BOOKS opened/serviced (books-never-gates)

- **glass-ui 5.0.0 adopt event** — THIS WAVE is the book's execution.
- **CI un-pin from `tranche/BG`** — serviced here at the master landing (else stays open).
- **S-3 letter-rail** — its dock-fission DECIDE evaluation point is in this walk.
- **All W3/W5/W6/W7 producer-gap rows** — re-verified here.

## §Evidence packets consumed

`audit/lanes/glassui-consume-map.md` §5 (the 18-specifier ground truth) ·
`audit/lanes/glassui-bg-bh-assay.md` · `letters/GLASSUI-S-ASKS.md` (verify-at-cut rows) · the
producer's BH.B4e MIGRATION table (at cut) · R `FINAL.md` (the R.W7 first-wire chronicle — the
pin/lockfile/abrogation precedents).

## §Hand-off

If executed before S.W9: the close wave inherits a clean adopt record. If the trigger has not
fired by S close: the book hands to the successor tranche with this wave doc as its standing
spec (the R→S precedent for the same book).
