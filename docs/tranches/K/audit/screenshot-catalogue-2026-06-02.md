# Cross-repo screenshot + cruft inventory — 2026-06-02

**Wave**: K.W1 (DEV/design). **Scope**: read-only inventory across the 7-repo
constellation feeding the before/after visual-evidence protocol
(`design/K.W1-visual-evidence-protocol.md`).

**No mutation in this wave.** This is a catalogue + a booked-action ledger.
Nothing is moved or deleted here. value.js's loose PNGs are **ARCHIVED, not
deleted** (the protocol's no-naive-delete rule); the archival is a K-close
booked action, executed at the K.W6 ι-sweep.

---

## §1 — Consolidated inventory

Two classes: **ARCHIVED** (already in `docs/`, keep) vs **LOOSE SCRATCH**
(repo-root or `.playwright-mcp/`, archive-or-ledger-delete).

| Repo | Loose scratch (root PNG) | Archived π/doc captures | Other cruft |
|---|---|---|---|
| **value.js** | **27** root PNGs (Mar–Apr 2026: `dock-*`, `color-picker-*`, `pane-*`, `dark-*`, `production-*`) | 64 in `docs/tranches/{A,B,D}` (+3 demo fixtures) | 7 `.DS_Store` |
| **glass-ui** | **102** root PNGs (`aurora-*`, `v2/v3-*`, `btn-*`, `slider-*`, `wave2-*`, `E-W0-*`; newest `v2-10-close.png` 2026-06-02) | ~327 in `docs/tranches/{E,F,K,L,Q}` | 1 `.DS_Store`; 3 superseded `docs/constellation/*-PLAN.md` |
| **speedtest** | **54** root PNGs (`aj-/am-/an-/aq-` design variants, May 26–29) | 716 in `docs/audits` + 689 in `docs/tranches` (organized) | 22 `.txt`/`.log`; `draft-authority.ts` WIP |
| **fourier-analysis** | **1** (`w2-workspace-configurator.png`) | 80 assets + `W2/W3/W3.5/W5-screenshots` + `2026-05-27-D-audit/screens`; 13 e2e snapshots | `.playwright-mcp/` (114 MB); `fourier_paper.log` |
| **keyframes.js** | **2** in `.playwright-mcp/` (`dock-closeup`, `dock-fixed`) | 14 doc-assets + 5 dist fixtures | 7 `.DS_Store`; 50 `.playwright-mcp` logs |
| **words** | **2** root (`search-autocomplete.png`, `search-results.png`) | 2 benchmark e2e failures + intentional fixtures | 24 cruft md in `backend/docs/`; `chef-1.png` (5.6 MB, purpose unknown) |
| **muster** | **0** | 119 e2e (`tranches/C` visual-probe + `tranches/F` W8) — exemplary baseline/state matrix | 5 `.txt` build logs |

**Totals**: ~188 loose-scratch screenshots awaiting first-time archival
(value.js 27 + glass-ui 102 + speedtest 54 + fourier 1 + words 2 + keyframes 2);
the rest already live in `docs/`.

**Exemplar**: muster's `tranches/C` + `tranches/F` visual-probe dirs already
capture a full state×viewport×theme matrix — the target shape. The protocol adds
only the `baseline/`+`close/` split, `DELTA.md`, and the date+tranche stamp.

---

## §2 — value.js blob baseline finding

No clean intended-position blob reference exists in the archive. The most recent
blob-era π capture is `docs/tranches/D/audit/D.W6-visual-runtime/picker.png`, and
in it the picker top-right (where `ColorPicker.vue:22` mounts `<HeroBlob>`) is
EMPTY. The blob landed Apr 2026 (post-B.W4); A/B captures predate it, so there is
nothing to diff D.W6 against. This absence is exactly why the standing protocol
is needed — and why K's picker recapture (the present/positioned assertion in
`K.W1-visual-evidence-protocol.md §4`) establishes the first real baseline.

> **UPDATE 2026-06-02 (live capture, protocol applied):** the K mid-tranche
> current-state capture (`visual-evidence-2026-06-02/{picker-current-2026-06-02.png,
> DELTA.md}`) captured the live blob — it renders **over-large + mis-positioned**
> and the picker **card-chrome is absent** (the regression the user flagged across
> tranches — CONFIRMED). Bound to **K.W3** (goo-blob lift + `BlobConfig` sizing) +
> **K.W2** (glass-ui card chrome). The protocol earned its place on first use.

---

## §3 — value.js loose-PNG ARCHIVAL plan (BOOKED — executed at K.W6 ι-sweep)

27 root PNGs, archived per `K.W1-visual-evidence-protocol.md §2`. **Archive, not
delete** — these are the only Mar–Apr 2026 captures of the dock-restructure and
dark-mode work; they become retroactive baselines for the tranche that owned that
work. Disposition by prefix:

| Root prefix | Owning surface/tranche | Archival target |
|---|---|---|
| `dock-*` | dock restructure (Mar 2026, B-window) | `docs/tranches/B/audit/B.W4-visual-runtime/baseline/2026-06-02-Karchive/` |
| `color-picker-*` | picker (D-window) | `docs/tranches/D/audit/D.W6-visual-runtime/baseline/2026-06-02-Karchive/` |
| `pane-*` | pane router (B-window) | `docs/tranches/B/audit/B.W4-visual-runtime/baseline/2026-06-02-Karchive/` |
| `dark-*` | dark-mode token work (D-window) | `docs/tranches/D/audit/D.W6-visual-runtime/baseline/2026-06-02-Karchive/` |
| `production-*` | gh-pages production probe (D-window) | `docs/tranches/D/audit/D.W6-visual-runtime/baseline/2026-06-02-Karchive/` |

The `-Karchive` leaf marks a retroactive archival run (distinct from a tranche
`open`/`close` capture). The ι-sweep ledger records each `git mv` with rationale;
zero `rm`. The 7 `.DS_Store` files are a separate hygiene sweep (gitignore +
delete) — out of visual-protocol scope, booked at the same ι-sweep.

> No file is moved by this catalogue. The `git mv` set above is the booked action
> the K.W6 ι-sweep executes.

---

## §4 — Per-repo rollout booking

| Repo | Booked action | When |
|---|---|---|
| **value.js** | Adopt protocol at K close. Recapture the affected-page set (picker/browse/extract/palettes/admin-users) as the FIRST close-baseline; the picker capture forces the blob present/positioned assertion that resolves the open regression. Archive the 27 loose root PNGs per §3; sweep 7 `.DS_Store`. | K.W6 |
| **glass-ui** | Adopt at next tranche close (paired with K.W6 source-boundary open). Archive 102 loose root PNGs (largest backlog) into per-tranche baseline dirs; aurora/blob/dock families map to existing E/F/K `screenshots/` leaves. Retire 3 superseded `docs/constellation/*-PLAN.md` via ledger. | glass-ui peer-tranche close |
| **speedtest** | Adopt at next close. 54 loose root design-variant PNGs → archive into the tranche the prefix encodes (`aj-/am-/an-/aq-`). Sweep 22 `.txt`/`.log`; resolve `draft-authority.ts` WIP. | next visual close |
| **muster** | Reference implementation — already a full state×viewport×theme matrix in `tranches/C` + `tranches/F`. Add only the `baseline/`+`close/` split, `DELTA.md`, and the date+tranche stamp. Promote its `visual-probe` shape as the cross-repo exemplar. | next close |
| **fourier-analysis** | Adopt at next close. 1 loose root PNG → archive. Reconcile the existing `W2/W3/W3.5/W5-screenshots` + `2026-05-27-D-audit/screens` into the `baseline/`+`close/` split. Triage the 114 MB `.playwright-mcp/` (gitignore + prune-ledger). | next visual close |
| **keyframes.js** | Adopt at next visual close. 2 `.playwright-mcp` scratch PNGs → archive or delete; sweep 50 `.playwright-mcp` logs + 7 `.DS_Store`. Library-heavy — apply only to demo/playground surfaces. | next visual close |
| **words** | Adopt at next frontend close. 2 loose root PNGs → archive into a tranche dir. Investigate `chef-1.png` (5.6 MB, unknown). The 24 `backend/docs` cruft md are a separate doc-hygiene sweep, out of visual-protocol scope. | next frontend close |

---

## §5 — Notes

- The grep-based `proof:*` codification idiom is RETIRED (SPLIT-K-PLUS-L
  decision). This protocol is enforced **structurally** — the paired-π lane is a
  binding close step in `tranche/SPEC.md`, verified by close-time review + the
  `DELTA.md` artefact, not by a committed script.
- `.playwright-mcp/` dirs across the fleet (fourier 114 MB, keyframes 50 logs)
  are scratch and should be gitignored; their triage is per-repo, not a value.js
  concern beyond this record.
- value.js's loose root PNGs predate the protocol — they are first-time
  archivals, not protocol BEFORE/AFTER captures. They land under retroactive
  `-Karchive` baseline leaves, not `open`/`close` leaves.

---

## §6 — Per-repo grounding corrections (2026-06-02, from the sibling constellation-adoption folds)

The 6 sibling folds (each at `<repo>/docs/tranches/<active>/audit/constellation-adoption-2026-06-02.md`) were grounded in each repo's real tree and corrected this catalogue's §1 read-only estimates. **The fold doc in each repo is authoritative; the corrections:**

- **fourier-analysis** (HEAD `36f760e`, tranche J, clean): the "13 e2e snapshots" do NOT materialize — the 7 `web/e2e/*.spec.ts` commit zero baseline PNGs. `.playwright-mcp/` (114 MB) + `paper/*.log` already gitignored. Already ships `scripts/dev.sh` → the ask is a **conformance re-shape**. Sanctioned dev.sh divergence: **bare mongo, NO replica set** (its remix CORE is transaction-free). Analogue regression = the P5 inner-rounding defect.
- **speedtest** (HEAD `57ed803f`, v1.0.0, tranche AT): "22 .txt/.log" was an over-count (only `LICENSE.txt` at root + tracked `docs/` evidence); `draft-authority.ts` is **now a live route** (not WIP). It is the **maturest `dev.sh` reference** (reconcile-not-adopt). Analogue regression = dial-CLS 0.3228 (`main.instrument-dial`).
- **glass-ui** (HEAD `756adcc`, v3.1.1, tranche **AS** active — V is long-closed): `.DS_Store` is **6** (not 1). It is the primitive **SOURCE** → the blob regression does NOT apply here. Library SHAPE (port 5173, no mongo/`deploy.sh`; `release.sh` kept).
- **words** (tranche A): `chef-1.png` (5.6 MB) is **app data** at `data/images/` (NOT cruft); `backend/docs` cruft md is **28** (not 24); `.playwright-mcp` holds logs, not PNGs. Already ships `scripts/dev.sh`+`deploy.sh` → **re-shape ask** (the flag-style CLI → uniform subcommands is behavior-breaking; confirm with owner). No WebGL hero → no blob analogue.
- **keyframes.js** (HEAD `12f8282`, v2.2.0, tranche A, clean): library SHAPE; light adoption (demo/playground only).
- **muster** (HEAD `f5d476e`, tranche K): the **EXEMPLAR** — 110 organized PNGs, zero loose scratch; the 5 `.txt` are wave-close evidence (RETAINED). Analogue concern = CLS 0.0729 residual. No WebGL → no blob analogue.
