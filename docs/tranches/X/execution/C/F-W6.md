SERVED MODEL: claude-opus-5[1m]

# F.W6 — execution record (Track C · X·F) — provenance defect burn-down (library/server half)

Spec: `docs/tranches/X/fourier/waves/F-W6.md` (IMMUTABLE, E-3) · order `docs/tranches/X/EXECUTION-RUNBOOK.md`
§1.3 · seat law §5 · locks §3.4 · owner rulings `docs/tranches/X/COHESION.md` §0i + §0j.D.
Ledger row: `docs/tranches/X/execution/LEDGER.md` Track C.

**The wave's shape, stated once so no seat mistakes it** (spec §4, *Execution shape*): *"each burn unit's
product act is a **commissioned ask** in the bounds #4 letter plus its burn-register row; the fourier edits
land in fourier's own sub-session (COMMISSION §2) after the begin-word. **Nothing in this wave opens product
source in either repo.**"* `/Users/mkbabb/Programming/fourier-analysis` is **READ-ONLY, always** (§1, §4's
last cross-edge; runbook §5.5) — every fourier figure below is a read (`grep`/`sed`/`ls`/`git -C … status`),
which is what D-19 MEASURE-AT-OPEN requires and what the read-only law permits.

---

## Open

**Opened 2026-09-17 (seat 0, OPEN) on the owner's begin-word** (verbatim at COHESION §0j). Base: value.js
`tranche-u`, HEAD at open **`f5f62b91`**; fourier `../fourier-analysis` HEAD **`3bac3d52`**, **0 dirty paths**.

### Preconditions — verified at the bytes AND in the ledger

The ledger's Track C row for F.W6 reads `Opens after: F.W5`; runbook §1.3's edge row is *"F.W5 → F.W6 /
F.W7 / F.W8 — F-W6 order `a` consumes the F.W5 clause set"*; the spec's §4 lock 1 adds the F.W0 hard
pre-gate (*"F.W0 failing to re-ground HALTS this wave"*).

| # | condition | measured, this seat (2026-09-17 22:56 EDT) | verdict |
|---|---|---|---|
| 1 | **F.W5 CLOSED** (the stating wave) | LEDGER Track C: **CLOSED 2026-09-17 — CHECK 2 … returns CONFORMANT**, 22/22 gates reproduce GREEN; record present — ⟨cmd⟩ `ls -l docs/tranches/X/execution/C/F-W5.md` → **190,024** B | **MET** |
| 2 | **the F.W5 clause set exists** (spec §1 r6, *cited-when-created*) | ⟨cmd⟩ `ls -l docs/tranches/X/fourier/contract/` → `J-diff-shape-v2.md` 244,274 B · `operation-register.md` 38,255 B · `OWNER-RULINGS-F.W5.md` 18,702 B — **all three**, the exact set `F-W5.md` §1a owns | **MET** |
| 3 | the clause set **carries every clause F.W6 burns** | ⟨cmd⟩ `grep -cE '^### [A-G][0-9]+c? (—\|⊙)' J-diff-shape-v2.md` → **71** clauses; per-id `grep -cE '^### <id> '` → **E2=1 · E7=1 · E10=1 · E13=1 · E14=1 · E17=1 · E18=1 · D5=1 · D6=1 · D12=1 · D16=1 · D17=1 · E4=1 · G1c=1 · G5c=1 · G10c=1** (the R-1e re-keyed set §2/§4 name). ⟨cmd⟩ `grep -c '^| ' operation-register.md` → **114** (45 operation rows + headers/legend) | **MET** |
| 4 | **F.W0 CLOSED** (substrate pre-gate, HARD — §4 lock 1) | LEDGER Track C: **CLOSED 2026-09-17 (honest-RED: G-4 · G-5 · G-8 · G-15(d))**; the re-grounding receipt is on disk — ⟨cmd⟩ `ls -l $F/docs/tranches/F/SUBSTRATE-LEDGER.md` → **201,985** B, Sep 17 15:03; the anchor/denominator tables are cited by gate id — ⟨cmd⟩ `grep -nE "^### G-11 —\|^### G-12 —" waves/F-W0.md` → `364:### G-11 — ONE corrected anchor table published; every later wave quotes it` · `369:### G-12 — ONE corrected-denominator table published; superseded figures FORBIDDEN downstream` | **MET** |
| 5 | the **substrate is actually re-grounded** (the F.W0 cure, which F.W6's G19 witness predates) | ⟨cmd⟩ `git -C $F rev-parse --short=8 HEAD` → **`3bac3d52`** · ⟨cmd⟩ `git -C $F status --porcelain \| wc -l` → **0**. The spec's born-RED figures (`cd26c653`, **28** dirty paths, GAB-13) are **F.W5-authoring-pass figures and no longer reproduce** — which is what F.W0 was for | **MET** |
| 6 | the adjudicated registry **whole (66/66)** | ⟨cmd⟩ `ls docs/tranches/V/megatranche/registry/adjudicated/fr-*.md \| wc -l` → **66** | **MET** |
| 7 | **census freeze** (runbook §5.4/§5.6; spec §0.1 — the sole census operand) | ⟨cmd⟩ `shasum -a 256 …/conformance/CENSUS-CANONICAL.md \| cut -c1-12` → **`f44362757458`**, character-match to the spec's pin; ⟨cmd⟩ `grep -nE '^### F\.W5(-W8)? — '` → `5078:### F.W5 — **27 rows**` · `5092:### F.W5-W8 — **89 rows**` — **27 + 89 = 116**, and **ZERO** record-side rows at F.W6 (§0.1 clause 2) | **MET** |
| 8 | **zero value-tree bytes** at open (FW6-G16's standing condition) | ⟨cmd⟩ `git diff --stat -- api/src src` → **empty** (exit 0) · ⟨cmd⟩ `git status --porcelain -- api/src src \| wc -l` → **0** | **MET** |

**No precondition fails. The wave opens.**

### Owner-gated items — RULED at COHESION §0j.D, never presumed, never re-opened

FW6-G18's roster is **R1–R9 ⊕ OG-F1 / OG-F2**, and `OWNER-RULINGS-F.W5.md` (F.W5 unit *e*) transcribes all
nine — ⟨cmd⟩ `grep -c '^| \*\*R[1-9]\*\*' OWNER-RULINGS-F.W5.md` → **9** (double-run: 9). This seat cites
the COHESION ruling ids; it rules nothing.

| spec item (F-W6) | §0j.D ruling id | the ruling | consequence for THIS wave |
|---|---|---|---|
| **R1** / TA-4 (§2.10 row 4, FW6-G16) | **F-SS4REST R1** | **RE-SCOPE value.js out of the diff clause** — a one-sided §6 verdict; `atomdiff.ts` stays wholly excised | unit `i`'s receipt records TA-4 as **RE-SCOPED**, not as an ask for restoration; the spec's *"UNFALSIFIABLE until G4 closes"* consequence is discharged by the ruling and stated as such |
| **R2** / trie (§2.7, §4 lock 8, F.W7 edge) | **F-TRIE (R2 ≡ E16 ≡ G7 ≡ G-F7-1)** | **NO TRIE**; whole-snapshot duplication is the recorded shipped behaviour; `atomdiff.py:12-14` is the guardrail | unit `h`'s hold is **discharged**: the E10 strikes are no longer waiting on a compression decision, and **no trie is designed here** (§5 exclusion stands) |
| **R3** / producer-or-retire (§2.4, the ADMISSION GATE) | **F-PRODRET (R3 ≡ D3 ≡ G11)** | **PRODUCER**, as a **port** of value.js's `POST /:slug/flag`, **homed at F.W8**, F.W5 writing the clause | unit `e` **opens** (the band is admitted, not retired) — and **F.W6 does NOT ship the flag-write operation**: the port is F.W8's act by the ruling's own homing. §2.4's *"If PRODUCER: F.W6 ships the flag-write operation"* is superseded on the HOMING only; the band's other server rows are F.W6's as written |
| **R4** / the like verb (§2.9) | **F-SS4REST R4** | **REMOVE the affordance** | §2.9's own branch: *"If DELETE: F.W4's."* — F.W6 books **no** server act; unit `d` records FR-GFC-3 as ruled-and-routed |
| **R5** / off-state `[]` (FW6-G18's load-bearing pair) | **F-SS4REST R5** | **STOP MINTING** the off-state `[]` | carried on the cited row `fr-BasisSelector M-9` (§2.11 row 7); no F.W6 booking |
| **R6** / hard-delete arm (§2.4 FR-AFP-66) | **F-SS4REST R6** | **KEEP** the arm; copy made truthful about irreversibility | unit `e` burns the cascade **as a build, not a deletion**; the truthful-copy arm is F.W3/W4's |
| **R7** / codegen (§2.4 FR-AFP-36 ⊙) | **F-SS4REST R7** | **CODEGEN** — twins derived from one source | unit `e`'s ⊙ is lifted: one generated/checked shape is admitted (FW6-G12) |
| **R8** / born visibility (§2.8) | **F-SS4REST R8** | **REMIX + BORN-PRIVATE** | unit `d` burns the fourier half (already born `draft`) + the `fork_of` lineage arm; the value half routes OUT at unit `i` |
| **R9** / dead session subsystem (§5, F.W8 edge) | **F-SS4REST R9** | **DELETE** (zero external call sites) | the ⊙ travels with FR-USB-23 **to F.W8**; F.W6 neither wires nor deletes it |
| **OG-F1 / OG-F2** | §0j.D | OG-F1 **FREEZE-WITH-ADOPTION**; OG-F2 **CODEX-ERA-SPECIFIC** (the pre-write root-absence receipt died with M-15; the *finding* stays adopted) | G-11 narrows to drift-correction; GAB-13 discharges to a disclosure line — both consumed by unit `a`, re-derived by nobody |
| **G-15(c)** (FM-19, the frozen-asset instrument) | §0j.D **G-15** | **FROZEN-FOREVER with a golden-file diff** | unit `g`'s honest interim under G1c — see the brief |

### E13 Step-0 — the four-path mail sweep (runbook §5.3)

Swept read-only at this seat's own clock (**2026-09-17 22:56 EDT**) and compared against **every row** of
`docs/tranches/V/coordination/INBOX.md`; classification taken from each row's **status cell**, never from a
bare `grep -i unread` (X.P.W0 CHECK 1 D-1). `INBOX.md` self-excluded (SELF-COUNT law).

1. `docs/tranches/V/` (10 `.md`) + `docs/tranches/V/coordination/` — newest non-self
   `value-inbox-2026-09-17-o8-o11-amendment-addendum.md`@13:09 = **ours** (O-21's retained copy, rowed I-26).
2. `../glass-ui/docs/tranches/BK/coordination/` — **BK re-confirmed the newest glass tranche dir**: ⟨cmd⟩
   `ls -1dt ../glass-ui/docs/tranches/*/ | head -5` → `BK/` · `BJ/` · `BI/` · `IOS27-MICRO/` · `BH/`. **7
   files**; the three newest (Sep 17 17:43) are `glass-outbound-2026-09-17-constellation-o20-relay.md` ·
   `…-bbnf-lang-9.0.0-addendum.md` · `…-valuejs-o20-disposition.md` — **all three already ROWED** as
   **I-32 · I-33 · I-34** (⟨cmd⟩ `grep -o "glass-outbound-2026-09-17-[a-z0-9.-]*" INBOX.md | sort | uniq -c`
   → 1 · 1 · 3 hits), rowed 2026-09-17 at X.P.W2 open and **CONSUMED at F.W1 unit `b`** (the INBOX's own
   consumption line). None carries `UNREAD`; their status cells are routing prose (`X-W0.j / X-EXT-1`,
   *"Glass is READ-ONLY always — producer rows ride SS-6"*).
3. `../keyframes.js/docs/tranches/V/coordination/` — **12 files + `vnext/`**; every `VALUEJS-INBOUND-*` is
   **ours (outbound)**; the rest are other senders' letters to kf. Nothing addressed to value.js.
4. `../sci-report/atlas/docs/tranches/P/coordination/` — 7 entries, newest@Aug 3 15:01
   (`valuejs-inbound-2026-07-27-library-band-export-delta.md` = **O-12**, ours). **4b** atlas
   `Q/coordination/` also swept (the I-27/I-31 minuted path) — newest `ATLAS-TO-VALUE-2026-08-03-RULINGS.md`
   @Aug 3 15:06 = **I-27, rowed**.
5. *(Track-C extension, not a fourth path: the fourier mail-ledger surface COHESION §0k.1 names)* —
   ⟨cmd⟩ `ls -1lt ../fourier-analysis/docs/tranches/F/coordination/` → `INBOX.md`@13:13 + three May files.
   **No reciprocal to O-22 yet** — consistent with the INBOX's own `SENT … AWAITING RECIPROCAL` cell; nothing
   unrowed, nothing owed to F.W6 today.

**Result: 0 unrowed letters · 0 new `I-n` minted · 0 UNREAD in F.W6's scope** (36 `| I-` rows; none carries
`UNREAD` as its status). A dated sweep line is appended at the ledger's end; **no existing row rewritten**
(append-only, spec §1 bounds row 5).

---

## Baseline — the 19 gates of §3, run READ-ONLY before any cure (R.2)

Bases as §0.2's base block defines them: `F=/Users/mkbabb/Programming/fourier-analysis` (**READ-ONLY**) ·
`V=/Users/mkbabb/Programming/value.js`. Engine **`/usr/bin/grep`** (BSD), the spec's pinned binary — bare
`grep` is ugrep in this shell and silently differs (§0.2). Every count double-run; both runs agreed.

| gate | BEFORE (this seat, 2026-09-17) | verdict |
|---|---|---|
| **FW6-G1** chain depth (F-α) | ⟨cmd⟩ `grep -rn "_write_root_version" $F/api` → **3 source hits** — `routers/visualizations.py:110` (def) · `:220` (create) · `:592` (remix), the ONLY writer; ⟨cmd⟩ `sed -n '136,142p'` → `parent_hash=None,` · `root_hash=set_hash_value,` · `depth=0,` verbatim; ⟨cmd⟩ `grep -rn "visualization_versions" $F/api --include='*.py' \| grep -v tests` → 1 insert (`:146`), 2 finds (`:749`, `:874`), 1 find_one (`:822`), the migration script, 2 index calls | **RED-AS-EXPECTED** |
| **FW6-G2** `set_hash` recompute on atom PATCH (F-β) | ⟨cmd⟩ `sed -n '379,385p' visualizations.py` → `updates = {k: v for k, v in body.model_dump(exclude_unset=True).items() if v is not None}` then `update_one({"slug": slug}, {"$set": updates})` — **a bare `$set`, no recompute, no version write**; `_head_set_hash` (`:477`) returns `doc.get("set_hash") or …` — the **stored** value when non-empty; `palette_slug` is atom 5 (`atomdiff.py` `AtomKey` tuple) and a PATCH field (`models/visualization.py:207`) | **RED-AS-EXPECTED** |
| **FW6-G3** `palette_slug` clearable | the same `if v is not None` comprehension at `:381` — **PATCH can never clear** `palette_slug`; the remix arm twenty lines away already tri-states it: ⟨cmd⟩ `sed -n '520,529p'` → `if "palette_slug" in body.model_fields_set:` … `# tri-state (F-08): null CLEARS the binding … a slug rebinds; an omitted field inherits` | **RED-AS-EXPECTED** |
| **FW6-G4** PATCH field set = atom set (SS-C-1 write leg) | `VisualizationUpdate` (`models/visualization.py`) = **five** fields (`visibility · title · description · tags · palette_slug`) with `model_config = ConfigDict(extra="forbid")`; `VisualizationPatch` (`web/src/lib/types.ts:256-262`) the same five; `atomdiff.py`'s atom tuple carries **`animation_settings`** — the sets differ, so `speed` is settable only at create/fork | **RED-AS-EXPECTED** |
| **FW6-G5** breadcrumb redaction parity (F-γ) | ⟨cmd⟩ `grep -n "_readable_or_none" visualizations.py` → `:466` (def) · `:507` · `:744` (the **entry row**) · `:816` · `:869` — **absent from the ancestor walk**, where ⟨cmd⟩ `sed -n '782,790p'` shows a bare `cur = await db.visualizations.find_one({"slug": parent_slug})` feeding `ProvenanceResponse(chain=…, fork_breadcrumb=…)` | **RED-AS-EXPECTED** |
| **FW6-G6** unsafe GET / counter provenance | the read path in order: `find_one({"slug": slug})` → `{"$inc": {"views": 1}, "$set": {"last_accessed_at": …}}` → `body = _public_doc(doc)` — **the pre-increment doc is what serialises**; ⟨cmd⟩ `grep -rn "viewed_ips" $F/api --include='*.py' \| wc -l` → **0** while `liked_ips` → **7** | **RED-AS-EXPECTED** |
| **FW6-G7** create-path idempotency / dedupe | ⟨cmd⟩ `sed -n '372,380p' api.ts` → `createVisualization` posts `{ method: "POST", body: { ...body } }` — **no `Idempotency-Key`** though `coreFetch` supports one (`:139`); ⟨cmd⟩ `grep -n "def replay_or_record" -A 14 idempotency.py` → `key = request.headers.get("Idempotency-Key")` / `if not key: return await handler()` — the explicit **no-header passthrough**; ⟨cmd⟩ `grep -n "content_hash" services/database.py` → `:98 create_index("content_hash")` **PLAIN**, against `:140 create_index([("content_hash",1),("reporter_slug",1)], unique=True)` on flags | **RED-AS-EXPECTED** ⟨**divergence, form only, minuted D-2 below**⟩ |
| **FW6-G8** flag cascade at hard delete | ⟨cmd⟩ `grep -c "flags" $F/api/lib/crud/pinned_cron.py` → **0** — the cascade owner named by ⟨cmd⟩ `grep -rn "cascade" softdelete.py` → *"the cron handles hard-delete cascade via `pinned_cron.cron_prune`"* contains **zero flags code**; the only live cascade is the reporter-keyed stale-user one (`janitor.py:234 db.flags.delete_many({"reporter_slug": {"$in": stale_slugs}})`) | **RED-AS-EXPECTED** |
| **FW6-G9** the actor field | ⟨cmd⟩ `sed -n '54,58p' janitor.py` → `_JANITOR_ACTOR = "system:janitor"` under the comment *"self-documenting in the viewer"*; ⟨cmd⟩ `grep -n "ip_hash" janitor.py` → `:95 "ip_hash": _JANITOR_ACTOR` (the sentinel **written into `ip_hash`**); ⟨cmd⟩ the viewer renders `AdminAuditLog.vue:146 {{ entry.ip_hash.slice(0, 10) }}` → `system:jan`; the second writer (`:59-99`) inserts directly, bypassing `log_audit` | **RED-AS-EXPECTED** |
| **FW6-G10** tier transitions are stated transitions | ⟨cmd⟩ `grep -n 'tier.*normal' admin.py` → `:438 {"$set": {"tier": "normal", "updated_at": …}}` inside the batch `update_many` — **unconditional**; `set_tier` (`:164`) writes `{tier, updated_at}` only, and the flagged listing carries no tier predicate | **RED-AS-EXPECTED** |
| **FW6-G11** image remediation executed | ⟨cmd⟩ `grep -nE '^@[a-z_]*router\.(get\|post\|put\|patch\|delete)' images.py` → **7 ops** (`POST ""` · `GET /by-hash/{sha256}` · `GET /{imageSlug}` · `GET /{imageSlug}/blob` · `GET /{imageSlug}/thumbnail` · `GET /{imageSlug}/overlay` · `POST /{imageSlug}/extract-contour`), ⟨cmd⟩ `grep -cE '^@[a-z_]*router\.delete' images.py` → **0 DELETE**; ⟨cmd⟩ `grep -n "max-age=86400"` → `:145` · `:164` · `:205` — blob **and** thumbnail public-cached, no `Depends`; `touch_document` × **2** on the fetch paths | **RED-AS-EXPECTED** |
| **FW6-G12** one checked shape / one serializer | ⟨cmd⟩ `grep -nE 'response_model' admin.py` → **exactly ONE** — `:110 "/stats", response_model=AdminStatsResponse, dependencies=[Depends(admin_required)]` — against ⟨cmd⟩ `grep -cE '^@[a-z_]*router\.(get\|post\|put\|patch\|delete)' admin.py` → **13**; the flagged listing is hand-built through `:92 json.dumps(body, default=str)` (space-separated, non-ECMA) while audit returns the Pydantic `AuditListResponse`. **1 of 13, and not one of the two this row is about** — the round-2 re-measured witness reproduces exactly | **RED-AS-EXPECTED** |
| **FW6-G13** cache identity ⊇ consumed fields | ⟨cmd⟩ `sed -n '248,268p' image_storage.py` → `extraction_cache_key` is a closed `json.dumps` literal over `_v · image_sha256 · strategy · resize · blur_sigma · n_classes · min_contour_length · min_contour_area · max_contours · smooth_contours · n_points`; ⟨cmd⟩ the same window `grep -c "ml_threshold"` → **0** — the two fields the ML control is the sole producer of are **absent from the key** | **RED-AS-EXPECTED** ⟨**divergence, form only, minuted D-1**⟩ |
| **FW6-G14** contour provenance / bounds on write | ⟨cmd⟩ `sed -n '20,30p' contours.py` → `doc = await store_contour_asset(xs, ys, req.image_slug, source="editor")` — **no `image_bounds`, no `extraction_cache_key_value`**; ⟨cmd⟩ the signature at `image_storage.py:285` defaults both to `None` | **RED-AS-EXPECTED** |
| **FW6-G15** canonical-geometry TRIPWIRE (**stays RED by design**) | ⟨cmd⟩ `grep -rn "def order_contours" $F --include='*.py' \| wc -l` → **0** — the only claimed regenerator imports a symbol no module defines; ⟨cmd⟩ `grep -n "scripts/\*" $F/.gitignore` → `53:scripts/*` swallows it and its `raw-contours.json`; the artifact is live and tracked — ⟨cmd⟩ `git -C $F ls-files --error-unmatch web/src/assets/fourier-paths/moon.json` → the path. The 3.7 % / p90 37.6 / bbox figures are **the record's**, cited, not re-derived (D-19) | **RED-AS-EXPECTED** |
| **FW6-G16** value-side routing receipt (**zero value-tree bytes**) | ⟨cmd⟩ `ls docs/tranches/X/fourier/waves/F-W6/` → *No such file or directory* — **no receipt exists**; and the standing condition holds at open: ⟨cmd⟩ `git diff --stat -- api/src src` → **empty** · ⟨cmd⟩ `git status --porcelain -- api/src src \| wc -l` → **0** | **RED-AS-EXPECTED** (RED on the receipt's absence, not on any moved byte) |
| **FW6-G17** no double-booking / span closure | the gate's operand is the **burn register's id column** (bounds #2) and it does not exist — same `ls` → *No such file or directory*. The upper operand is present and frozen: canonical `f44362757458`, **F.W5 = 27 ⊕ F.W5-W8 = 89 = 116**, **ZERO** record-side rows at F.W6 (§0.1 clause 2) | **RED-AS-EXPECTED** |
| **FW6-G18** owner rulings present before any conditioned burn | ⟨cmd⟩ `ls -l …/contract/OWNER-RULINGS-F.W5.md` → **18,702 B, Sep 17 18:16** and ⟨cmd⟩ `grep -c '^| \*\*R[1-9]\*\*'` → **9** — **the born-RED witness (*"`OWNER-RULINGS-F.W5.md` does not exist`"*) NO LONGER REPRODUCES**; all nine are ruled at COHESION §0j.D (table above). The gate is nonetheless **RED**: its GREEN is *"each conditioned row either carries its ruling or is explicitly deferred with its honest default recorded"*, and **no F.W6 row carries anything yet** — the burn register does not exist | **RED** ⟨**witness superseded — D-3 below; precondition half satisfied before the cure**⟩ |
| **FW6-G19** F.W0 re-grounding (D-19) | first conjunct **satisfied**: the receipt exists (`SUBSTRATE-LEDGER.md`, 201,985 B) and the substrate is re-grounded — `HEAD 3bac3d52`, **0** dirty paths, against the witness's `cd26c653` / **28** dirty. Second conjunct **unperformed**: *"every anchor cited by this wave is re-resolved against it"* is unit `a`'s act and nothing is re-resolved yet | **RED** ⟨**first conjunct GREEN-BEFORE-CURE — D-4 below**⟩ |

**Tally: 19 gates · 17 RED-AS-EXPECTED · 2 RED-with-a-superseded-or-satisfied-conjunct (G18 · G19) · 0
gate GREEN before its cure · 0 UNRUNNABLE · 4 divergences, all of form, none of substance.**

**GREEN-BEFORE-CURE (R.2), stated as the finding it is:** no gate stands GREEN. **Two conjuncts do** —
FW6-G18's *rulings-exist* half and FW6-G19's *receipt-exists* half — and **both are the cures of F.W5 and
F.W0 respectively, landing exactly as the order §1.3 predicted**. Recorded here so the close seat reads the
gates' RED as resting on **this wave's own unwritten artefacts**, never on a stale predecessor claim.

### Divergences, minuted (E-3: addenda-beside; the spec is immutable and is not edited)

- **D-1 · FW6-G13, field count.** The spec calls `extraction_cache_key` a *"closed **10-field**
  `json.dumps` literal"*; the live literal carries **eleven** keys (`_v:3` + ten parameters). **Substance
  unchanged and re-verified**: `ml_threshold` / `ml_detail_threshold` are absent (`grep -c` → 0), and the
  handler still short-circuits on the hit before `compute_contours`. A reading correction, not a spec edit.
- **D-2 · FW6-G7, the second `replay_or_record` site.** The spec names the remix arm's call at `:612`; the
  **create** path also wraps its handler — `:236 return await idempotency.replay_or_record(request, _store(),
  f"user:{owner_slug}", _handler)`. **The defect is untouched**: the envelope is header-driven and the client
  sends no key (`if not key: return await handler()`), so the second press still mints a second public
  visualization, and `content_hash` is still a plain index. If anything the RED is sharper — the server-side
  envelope is *already there* and only the key and the index are missing.
- **D-3 · FW6-G18, witness superseded by F.W5's own cure.** See the gate row. The gate stays RED on **this**
  wave's artefact; the conditioned-row roster is now RULED rather than owed, which is what unlocks unit `e`.
- **D-4 · FW6-G19, witness superseded by F.W0's own cure.** The 28-dirty-path GAB-13 state is gone
  (**0** dirty, HEAD `3bac3d52`); OG-F1's *"GAB-13 discharges to a disclosure line"* is the ruled shape.
  Unit `a` re-resolves anchors **against F-W0 §4 G-11 / G-12 by gate id, never by line** (§4 F.W0 edge).
- **D-5 · bounds #4's `DD`.** The spec spells the courier `value-to-fourier-2026-08-DD-…` and orders *"`DD`
  resolves at execution, **never back-dated**"*. Execution is **2026-09-17**, so the letter lands as
  **`value-to-fourier-2026-09-17-provenance-burndown-F.W6.md`** — dating it into August would be the
  back-dating the same clause forbids. Minuted here rather than silently spelled.

---

## Unit plan — 9 units, **strictly serial**, one writer on `tranche-u`

**Order (spec §4, *In-wave order*, binding and quoted):** *"`a` preconditions (FW6-G19 receipt + F.W5
clause set + FW6-G18 rulings) → `b` **the PATCH/chain one-cut** (F-α · F-β · SS-C-1 — G1/G2/G3/G4) → `c`
privacy (F-γ + FR-AFP-4 — G5/G11, one cut) → `d` counters + idempotency (G6/G7) → `e` **moderation band,
only if G11 ruled** (G8/G10/G12 + FR-AFP-7/33) → `f` audit actor (G9) → `g` contour + geometry
(G13/G14/G15) → `h` liveness strikes (PP-DEADSEAM, only what E16/G7 does not touch) → `i` routing receipt +
carry closure (G16/G17)"* — **serial; each commits before the next opens.**

**Groups:** `[a] [b] [c] [d] [e] [f] [g] [h] [i]`. **Peak concurrency 1.** Two independent reasons, both
binding: the spec declares the order serial, and **every unit appends to the same file**
(`F-W6/burn-register.md`) — no two units may hold it concurrently. No worktree plan; one writer on
`tranche-u`, other tracks' seats committing beside us by pathspec.

**Model tiering (M-12, runbook §5.1): all nine units = Opus.** The spec declares no `Agents` line and names
**no** Fable / fresh-Fable / adjudicator / design-author seat for any in-wave unit; the nine are mechanical
and challenge seats (censuses, greps, register rows, letters). **L-18's fresh-Fable seats are NOT units of
this plan**: *"no wave is ACCEPTED until two quartet gestalt passes adjudicated by a fresh Fable instance"*
(§ close act) — they run after the IMPLEMENTED stamp, as F.W5's CHECK 1 / CHECK 2 did.

**Writable set — the spec's five §1 bounds rows, plus this record and the ledger as execution apparatus.**
Anything else is an **ESCALATION** (runbook §5.7): `/Users/mkbabb/Programming/fourier-analysis/**` (whole
tree, read-only — reads permitted, writes never), product source in **both** repos, the 66 `fr-*.md`,
`lane-crud.md`, `INTAKE-ADJUDICATION-2026-08-03.md`, `CENSUS-CANONICAL.md`, `COHESION.md`, the F.W5 contract
set, `package.json`, `~/.codex/**`, and `scripts/dev/dev.sh` (**unowned, dirty, never staged, NEVER touch**).
`F-W6.md` itself is **immutable now** (E-3) — its corrections are dated addenda **in this record**.

**Standing locks binding every unit**

- **READ-ONLY fourier, zero fourier bytes.** Every cure below is a **commissioned ask** in the unit's
  burn-register row and in unit `i`'s letter. A fourier edit by any seat of this wave is a halt condition.
- **F.W5 STATES, F.W6 BURNS — no double-booking** (§4 lock 2, two homes, quoted separately: `F-W5 §2 §E
  clause E2` ▲ *"F.W5 owns the CLAUSE; F.W6 owns the burn-down — do NOT double-book."* and `F-W5 §3 gate
  G3`'s green-owner cell). A row credited here **and** to F.W1/F.W3/F.W4/F.W5/F.W8 fails FW6-G17.
- **One home, two citations** — the client/display arms enumerated at §4's F.W3/F.W4 edge and §5 are
  **EMITTED, never claimed** (the FR-GIG-5 standing bar).
- **Record-qualification (R-5/§4 lock 10)** — the ten colliding tokens `M-13 · L-B1 · L-M3 · C-17 · C-18 ·
  B-1 · B-2 · C-2 · M-10 · M-9` are written **with their record** in every register row, so no
  set-difference collapses two identities.
- **Census freeze** — `CENSUS-CANONICAL.md` @ `f44362757458` is the sole census operand; the struck
  132/111/153 are inadmissible, and **no roster integer is re-derived** (§0.1).
- **MEASURE-AT-OPEN (D-19)** — every fourier anchor is re-resolved against **F-W0 §4 G-11 / G-12 by gate
  id, never by line**; producer-side evidence carries the producer **commit hash**, never a version string.
- **Killed cures stay killed** (§4 lock 6): AA-23's regex action · β's 428-escalation · the K9 fallback
  deletion · SE-05's *"just delete it"* · `fr-BasisSelector m-7`'s **422-straddle scenario only**. **K-1**:
  cite 45/30/13, never 30 alone or zero. **K12**: B-2 closes statically. **FR-GV-24**: no re-open-increment
  assertion. **K-6/S-8**: absence-proofs enumerate the surface.
- **TRIPWIRE** (§4 lock 7): **DO-NOT-REGENERATE `moon.json` / `sun.json` on `master`** — an attempt is a
  gate FAILURE and revives L-B1 + L-B2/C-2 at BLOCKER. **M-10 innerPoly anti-cure rider travels with every
  L-B1/L-B2 act.**
- **WAVE-LOCK** (§4 lock 9): `fr-GallerySearchBar C-2` binds any `F.W5-W8` wiring of `basisFilter` —
  the banked normaliser (`GalleryCard.vue:39 startsWith("fourier")`) is not optional.
- **Commits** — pathspec only, one commit per meaning, `--no-verify --quiet` with the `Claude-Session:`
  trailer; **never `-A`** (other tracks write this tree concurrently). Unit `b`'s three rows are **ONE
  commit** (§2.1's *ONE COMMIT* + §4 lock 3's F-β ⊕ SS-C-1 one-cut). Unit `c`'s two rows are ONE commit
  (one privacy limb). Unit `e`'s FR-AFP-66 ⊕ FR-AFP-33 pair is ONE commit.
- **Third-iteration halt (triumvirate, runbook §5.7)** — any third diagnose→edit→re-measure on one gate ·
  any write outside bounds · any pressure to allowlist.

| unit | model | spec sections executed (heading · lines at this writing) | writes | gates it must turn | locks / families |
|---|---|---|---|---|---|
| **a** | opus | §0.1–§0.3 `:13-59` · §1 Bounds `:79-106` · §3 **FW6-G18** `:527`, **FW6-G19** `:528` · §4 locks 1–2 `:542-543` · §4 cross-edges **F.W0** `:557`, **F.W5** `:558` | `docs/tranches/X/fourier/waves/F-W6/burn-register.md` (**create**: header + §0 precondition block) · this record | **FW6-G19** (2nd conjunct) · **FW6-G18** (roster carried per row) | D-19 · census freeze · F.W0-HALT · no line cites into live siblings |
| **b** | opus | §2.1 `:171-178` (F-α · F-β · SS-C-1) · §3 **G1** `:510`, **G2** `:511`, **G3** `:512`, **G4** `:513` · §4 lock 3 `:544` | `burn-register.md` (append 3 rows) · this record | **FW6-G1 · G2 · G3 · G4** | **ONE COMMIT family** (§2.1 head) · ONE-CUT F-β ⊕ SS-C-1 · KISS: lift the `:522-528` tri-state, do not invent |
| **c** | opus | §2.2 `:179-185` (F-γ · FR-AFP-4 ⊕ F-4 ⊕ m-15 ⊕ GCM-52) · §3 **G5** `:514`, **G11** `:520` · §4 lock 3 `:544` | `burn-register.md` (append 2 rows) · this record | **FW6-G5 · FW6-G11** | ONE privacy limb, ONE commit · cycle-guard + ≤50 cap survive · F-4 (WHO) ⊕ m-15 (WHAT) cross-referenced, never merged · SS-13 auth-proxy stays UNPROVEN |
| **d** | opus | §2.3 `:186-192` (FR-GV-12 ⊕ FR-GV-24 ⊕ VV-R2-A · B-2 ⊕ FR-GV-1) · §2.8 `:225-230` · §2.9 `:231-236` · §3 **G6** `:515`, **G7** `:516` | `burn-register.md` (append 4 rows) · this record | **FW6-G6 · FW6-G7** | FR-GV-24: **no re-open-increment assertion** · K12: B-2 closes **statically** · R8 (BORN-PRIVATE) fourier half only · R4 (REMOVE) → the affordance is F.W4's |
| **e** | opus | §2.4 `:193-203` (FR-AFP-1 · -66 · -7 · -33 · -36/D17 · FR-GV-9) · §3 **G8** `:517`, **G10** `:519`, **G12** `:521` · §4 locks 3–4 `:544-545` | `burn-register.md` (append 6 rows) · this record | **FW6-G8 · FW6-G10 · FW6-G12** | **admission gate RULED PRODUCER (F-PRODRET) — the PORT is F.W8's act** · FR-AFP-66 ⊕ FR-AFP-33 **one commit** · **K9: the five `?? item.slug` fallbacks STAY** · R6 KEEP · R7 CODEGEN · β's 428 stays killed |
| **f** | opus | §2.5 `:204-209` (AA-10 **cited** ⊕ AA-5; AA-6/AA-24/AA-23 cited) · §3 **G9** `:518` | `burn-register.md` (append 1 row) · this record | **FW6-G9** | AA-10 **CITED to F.W4, never booked** · AA-23 **kill-only carry**, host row held at F.W5 · K-6 method law · display arms are F.W4's |
| **g** | opus | §2.6 `:210-217` (B-4=C-1 ∘ i-7 ∘ m-18 · `fr-ContourSettings M-13` · G16/`fr-FourierShapeExtractor L-B1`) · §3 **G13** `:522`, **G14** `:523`, **G15** `:524` · §4 lock 7 `:548` | `burn-register.md` (append 3 rows) · this record | **FW6-G13 · FW6-G14 · FW6-G15** | **TRIPWIRE** · **M-10 innerPoly anti-cure rider** · m-18's `*0.6` not preserved · track the seam (G2c) first · L-2 orchestrator move is F.W3/W4's |
| **h** | opus | §2.7 `:218-224` (PP-DEADSEAM ⊕ M-β4 ⊕ L·m-6 ⊕ GM-M4 · `fr-EquationModeToggle FR-EMT-20` **cited**) · §4 lock 8 `:549` · §4 **F.W7** edge `:561` | `burn-register.md` (append 2 rows) · this record | *(none — the wave's one ungated unit; its evidence is its register rows, read by FW6-G17)* | **F-TRIE ruled NO TRIE** discharges the E16/G7 hold · **E10's ONE stated disposition**, never three ad-hoc deletions · `reconstructed_points` is ONE field, ONE cut · VV-R2-B wiring is F.W4's |
| **i** | opus | §2.10 `:237-247` (V-α · V-β · V-γ · ⊙ TA-4) · §2.11 / §2.11a / §2.11b / §2.11c / §2.11d `:248-501` · §3 **G16** `:525`, **G17** `:526` · §4 cross-edges `:553-570` · §5 `:573-596` · the close act `:630` | `F-W6/value-side-routing-receipt.md` (**create**) · `docs/tranches/X/coordination/value-to-fourier-2026-09-17-provenance-burndown-F.W6.md` (**create**) · `docs/tranches/V/coordination/INBOX.md` (**append-only**) · `burn-register.md` (close stamp) · this record (close) · `LEDGER.md` | **FW6-G16 · FW6-G17** | **zero value-tree bytes or G16 fails** · the receipt cites **TWO** authorities and asserts **no** V-α list membership · G17 **both directions**, record-qualified · E13 close sweep — **no wave closes with UNREAD mail** |

### Briefs

**a — preconditions, and the register's spine.** Create `waves/F-W6/burn-register.md` (this wave's FW6-G17
operand; without it the closure gate is prose). Its §0 carries, in order: (1) **FW6-G19's discharge** — name
F.W0's re-grounding receipt (`$F/docs/tranches/F/SUBSTRATE-LEDGER.md`) and re-resolve **every anchor this
wave cites** against **F-W0 §4 G-11 / G-12 by gate id, never by line**; where an anchor has moved since the
spec was authored, record the new coordinate **beside** the old, never over it (E-3), and state OG-F1's
narrowing (*G-11 → drift-correction*; *GAB-13 → a disclosure line*). (2) **FW6-G18's roster** — R1…R9 ⊕
OG-F1/OG-F2, each quoted from **COHESION §0j.D** with its ruling id (`F-SS4REST` · `F-TRIE` · `F-PRODRET` ·
`G-15`), each mapped to the F.W6 rows it conditions, **never re-ruled and never pre-answered**; where a
ruling changes a row's homing (R3's port → F.W8; R4's deletion → F.W4), say so **in the row**, because a
burn seat reading only §2 would ship it here. (3) The **F.W5 clause set** by clause id — the 71-clause v2,
the 45-row register, the ruling block — with the E-3 note that F.W6 **consumes** them and authors no clause.
(4) The **census pin** `f44362757458` and the band's record-side figure: **27 ⊕ 89 = 116, ZERO at F.W6**.
Commit, then open `b`.

**b — the PATCH/chain one-cut (F-α · F-β · SS-C-1), ONE COMMIT.** Append three register rows, each: banked
id (record-qualified) · the measured witness at this seat's clock · the **commissioned act** · the F.W5
clause that states it · gate · fourier-side landing evidence (pending until the sub-session lands it).
**F-α** — the deepen-or-retire execution v2 **E2/G3** states, cited at F-W5's own words (*"v2 states
**deepen-or-retire** for the depth/parent/root quadruple"*), with value.js's `service/versions.ts:46-58`
named as the reference walk; carry the **dissent of record** (fourier's board books DELETE at M.W10) rather
than resolving it here. **F-β** — `set_hash` recomputed from `enumerate_atoms(doc)` on every atom-touching
PATCH **plus** the version write, and `palette_slug` made tri-state **by lifting the remix arm's
`model_fields_set` idiom twenty lines away** (KISS lock: lift, do not invent). **SS-C-1 write leg** — PATCH
field set **equals** the atom set, or each divergence is stated per-atom with its reason; the **READ leg
stays banked at `fr-GalleryCardModal GCM-1` → F.W4 and is NOT re-booked**. F-β ⊕ SS-C-1 are **one PATCH-model
change** — split them and the second reverts the first's invariant. FW6-G2/G3/G4 exist because **F.W5 states
clause E7 without gating it**; F.W6 supplies the gates rather than reading the omission as absence of scope.

**c — the privacy limb (F-γ + FR-AFP-4), ONE CUT.** Two rows, one commit. **F-γ** — apply
`_readable_or_none` **per hop** in the `fork_of` walk and collapse non-public ancestors to value.js's
shipped `{kind:"unavailable", ordinal}` shape (**adoption, not design**: `service/forks.ts:167-179` is the
counter-example already in tree); the **cycle-guard and the ≤50 cap must survive the cure**. v2's **C5**
(redaction parity) is now stated, so the redact branch is available — cite the clause, do not re-choose it.
**FR-AFP-4 ‡** (⊕ F-4 ⊕ m-15 ⊕ GCM-52) — the image-remediation contract v2 **C2** states as ONE unit:
delete/quarantine op · blob **and** thumbnail visibility gate · janitor predicate fix (an anonymous fetch
must stop rewarding reported content) · versioned thumbnail URL. **F-4 books WHO can fetch; m-15 books WHAT
they see — cross-referenced, never merged**, and neither cure discharges the other. Two honesty locks:
soft-delete **does** de-list from browse (do not overstate the hole), and the deployment **auth-proxy
question stays UNPROVEN** (SS-13) — the gate may not close by assuming a proxy in either direction. A
redacted breadcrumb over a world-readable image leaf **has not cured the leak**: that is why this is one cut.

**d — counters, idempotency, lineage, and the ruled-away like verb.** Four rows. **FR-GV-12** (⊕ FR-GV-24 ⊕
VV-R2-A) — an explicit view verb making the read safe, **or** the mutating-GET policy stated against RFC
9110 §9.2.1 (v2 **E6**/G12's two branches); ▲ **the repair test may NOT assert a re-open increment** —
`viewedHashes` works *within* a session and the defect is SCOPE, not absence. The client arm (publish adopts
`store.setVisibility`) is **F.W4's and is not credited here**. **`fr-GalleryDraftsSection B-2` ‡** — server
dedupe on the create path: lift the remix arm's `replay_or_record` **and/or** make `content_hash` unique;
**K12: B-2 closes STATICALLY — SS-13 spends no probe**. Record **D-2** (the create path already wraps the
envelope; the key and the index are what is missing) so the ask is sharp. **§2.8 R-5/G5 ⊕ E4** — under **R8
(REMIX + BORN-PRIVATE)** the fourier half already conforms (remix child born `draft`); what F.W6 burns is
the **"no `fork_of` recorded"** server arm of GCM-1 plus the create-visibility test v2 **E4**/G5 names.
**GCM-1's routing cure (`/v/`, `entry.slug`, `loadVisualization`) is F.W4's.** **§2.9 FR-GFC-3 ⊙** — ruled
**REMOVE the affordance (F-SS4REST R4)**, so by §2.9's own branch the act is **F.W4's**: the row is entered
as ruled-and-routed, **F.W6 books no server act**, and the `aria-pressed` + re-click guard is F.W3/W4's
regardless. Carry K-1's counting lock verbatim: **cite 45/30/13, never 30 alone or zero.**

**e — the moderation band (admitted, not retired).** Six rows; FR-AFP-66 ⊕ FR-AFP-33 land in **one commit**.
The admission gate is **RULED PRODUCER** (F-PRODRET) — the band opens — **and the port itself is homed at
F.W8**: F.W6 **does not ship the flag-write operation**; it records FR-AFP-1 as ADMITTED-and-ROUTED with the
ruling id and value.js's `POST /:slug/flag` named as the reference implementation for that wave. Then burn
the band's server rows: **FR-AFP-66** — a `content_hash`-keyed cascade at grace hard-delete **plus the
docstring correction** (the false module prose is part of the cure), under **R6 KEEP** the hard-delete arm;
**FR-AFP-33** — bound the `$push` (`$slice`) and scope the aggregate (cascade without bound leaves the cost;
bound without cascade leaves the growth); **FR-AFP-7** (⊕ -8 identity arm) — flags key the **entity**, and
the dismiss action's scope follows (v2 **D4**/**D5**); **FR-AFP-8's one-token `item.slug` label is F.W3/W4's
and may not be claimed**; **FR-AFP-36 ⊕ the D17 serializer clause** — one generated/checked shape (now
admissible: **R7 = CODEGEN**), dead models deleted, **one** serializer on the server, ▲ **K9: the five
`?? item.slug` fallbacks STAY — defensive, not dead**; **FR-GV-9** (⊕ FR-AFP-10 ⊕ FR-AFP-70) — a blanket
`$set` **is not a transition**: condition the write on the current tier and give the flagged listing the tier
predicate FR-AFP-10 assumes, with **FR-GFC-20's server rider** (`BatchResponse.errors` never populated →
partial failures report green) **travelling in the same cure**, carried as a rider and **not re-booked**
(it is banked at `fr-AdminUserList FR-AUL-13`). β's 428-escalation stays killed. Every client arm listed at
§4's F.W3/F.W4 edge is **emitted, never claimed**.

**f — the audit actor.** One row. **AA-10 is CITED, not booked** — the canonical homes it at F.W4 and the
record says so; what this wave carries is the **`F.W5-W8` leg, the actor-field contract question**, under
the holder's id. The commissioned act, from v2 **E18**: *"An audit row's actor is a FIELD, not a repurposed
`ip_hash`"* — an `actor` field exists and **both** writers populate it, the janitor's inlined second writer
(`janitor.py:59-99`) routed through the shared `log_audit` seam and v2 **D16**'s action taxonomy. ▲ **K-6
METHOD LOCK: `grep "log_audit("` is structurally BLIND to an inlined second writer — enumerate with S-8.**
▲ **AA-23 is a KILL-ONLY carry**, marked as such, its host row held at F.W5: the regex-action cure stays
rejected, and AA-6's sound order is (a) honest placeholder, (b) `$in` over a generated taxonomy, (c) anchored
case-**sensitive** `^prefix`, **in that order only**. The sentinel-aware display branch, the legend, the
display taxonomy and the placeholder honesty are **F.W4's**; AA-44's coverage obligation is **emitted to
F.W9/W10**. Compose with V-γ — *"the fourier and value halves of user provenance are one clause with two
burn seats"* — and route the value half at unit `i`, not here.

**g — contour, cache identity, canonical geometry.** Three rows. **B-4 = C-1 ‡** — **cache identity ⊇
consumed request fields** (v2 **E13**), with the named GREEN fixture: **`contour_hash` INSTABILITY across an
ML-threshold change**; ▲ rider **m-18**: the invented `ml_detail_threshold = mlThreshold * 0.6` coupling
**must not be preserved by the cure**. **`fr-ContourSettings M-13` ‡** (record-qualified; the homonym
`fr-CoefficientsSpectrum M-13` is a distinct identity) — extraction **cannot overwrite a `source="editor"`
asset** (v2 **E14**/G14), and **derive-on-POST or backfill-on-write is RULED, not left to taste** (**E17**,
C-2's image-bounds arm). **G16 / `fr-FourierShapeExtractor L-B1` — the TRIPWIRE.** v2 **G1c** rules
**RE-AUTHOR, AT F.W6, NOT BEFORE**: name the true source, or re-author the artifact **under a repaired,
tracked, runnable pipeline** — *"never regenerated ad hoc, never hand-corrected in place"* — **WITH G5c's
diagnostics row, which is a PRECONDITION, not a companion**; until that pipeline exists the artifact is
**FROZEN with a golden-file baseline** (the instrument §0j.D **G-15(c)/FM-19** already ruled). **Track the
seam first (G2c)**: an untracked, import-broken regenerator (`.gitignore:53 scripts/*`; `def order_contours`
→ **0**) cannot be a cure input. ▲ **DO-NOT-REGENERATE on `master` — an attempt is a gate FAILURE, not a
pass**, and ▲ **M-10's innerPoly rider binds every L-B1/L-B2 act: the six per-iteration draws are entangled
with `outerPoly`'s stream; deleting the discarded work re-rolls the canonical sun.** The G7c honesty lock
(the decomposition is not duplicated; the offline detour is elective) and SE-05's killed *"just delete it"*
both stand. L-2's orchestrator move is **F.W3/W4's**; `moon.json`'s true source stays **UNDETERMINED → SS-13**.

**h — the liveness strikes (E10's ONE disposition).** Two rows, **no gate** — the unit's evidence is its
register rows, which FW6-G17 reads. **F-TRIE (NO TRIE) is ruled**, so §4 lock 8's hold is **discharged**:
the strikes are no longer waiting on a compression decision, and **no trie is designed here** (§5's
exclusion of F.W7's compression design stands; `atomdiff.py:12-14` remains the incumbent guardrail).
**PP-DEADSEAM** (⊕ M-β4 ⊕ L·m-6 ⊕ GM-M4) — the server-side strikes only: the three `preview_path` writes
(`assets.py:85`, `image_storage.py:318`, `responses.py:22`) and the produced-and-unconsumed projections,
**disposed ONCE under v2 E10, never as three ad-hoc deletions**. **`fr-EquationModeToggle FR-EMT-20` is
CITED, not booked** — the canonical homes it at **F.W5 with no band leg** — and its mechanism
(`ComputeEquationResponse.reconstructed_points` produced at real cost with zero consumers;
`SimplifyResponse.term_count` likewise) rides the **same** cut, because `reconstructed_points` is the very
field PP-DEADSEAM names. The client wiring (`softDelete`/`restore` → VV-R2-B's single F.W4 unit) is **not
scattered here**.

**i — the routing receipt, the carry closure, the letter, the close.** (1) Create
`F-W6/value-side-routing-receipt.md`: **V-α · V-β · V-γ · ⊙ TA-4** named to the **value.js API row**, each
citing **the authority that actually holds it** — **F-W5 §4's `F.W5 → value.js API row` edge row** for
**V-β · V-γ · TA-4**, and **lane-crud §2's R-2 row** for **V-α**, *asserting no list membership for V-α*
(the phantom *"§6c"* is struck; manufacturing membership re-opens R2-1b). TA-4 is recorded as **RULED
RE-SCOPE (F-SS4REST R1)** — a one-sided §6 verdict, **not** a restoration ask — which also retires the
*"UNFALSIFIABLE until G4 closes"* hedge. **Zero value-tree bytes**: re-run `git diff --stat -- api/src src`
at close; **any moved byte fails FW6-G16**. (2) **FW6-G17, both directions, record-qualified**: forward —
every id the **canonical** homes at `F.W5` or `F.W5-W8` (27 ⊕ 89 = 116) appears here **booked (§2.1–§2.10),
cited (§2.11/§2.11c), cited-to-holder (§2.11d) or excluded-with-reason (§5)**; reverse — `grep` each printed
identity's **banked id token** (the **(record, id)** pair for the ten colliders and the four homonym pairs)
and confirm the named landing section holds it. **Zero silent drops either way**; no row manufactured into
the **seven negative-roster records** (evidence, never a denominator); no row credited both here and to
F.W1/F.W3/F.W4/F.W5/F.W8. The operand is **the enumeration, never an integer** — and the canonical homes
**ZERO** record-side rows at F.W6, so a record-side escape is impossible by construction and what the reverse
direction tests is **fabrication**. (3) Write the courier —
`docs/tranches/X/coordination/value-to-fourier-2026-09-17-provenance-burndown-F.W6.md` (**D-5**: `DD`
resolves to the execution date; never back-dated) — the **only vehicle** by which the fourier side receives
this burn-down: every commissioned ask by gate id and clause id, the TRIPWIRE and the M-10 rider carried
**verbatim**, the R3 port explicitly homed at **F.W8**, this end of every §4 cross-edge declared and the
reciprocal **requested** (COHESION is bounds-excluded — F.W6 does not write the spine). (4) Append **one**
E13 row to `V/coordination/INBOX.md` (append-only), re-sweep the four paths at close — **no wave closes with
UNREAD mail** — and write this record's close. Then set the ledger row to **IMPLEMENTED** with the commit
roster and append the event line. **L-18's two fresh-Fable gestalt passes follow the IMPLEMENTED stamp; this
unit does not stamp CLOSED and does not stamp VERIFIED.**

---

## Unit receipts

*(appended by each unit, in order; no seat rewrites another's rows — E-3)*

---

### a — preconditions, and the register's spine

**Seat**: Opus 5 (1M), 2026-09-17. **Sections executed exactly as ordered**: spec §0.1–§0.3 · §1 Bounds ·
§3 **FW6-G19** + **FW6-G18** · §4 locks 1–2 · §4 cross-edges **F.W0** and **F.W5**. **Writes**: the two
paths of the unit's writable set and nothing else. **Zero fourier bytes · zero value-tree product bytes.**

#### Acts, in order

**Act 1 — the spec read WHOLE, then the unit's sections read again at their own bytes.** `F-W6.md` is
**634 lines / 263,396 B** (⟨cmd⟩ `wc -l -c`); the unit's ordered coordinates were re-confirmed to be the
sections they name before any of them was consumed. **Nothing in the spec was edited** (E-3).

**Act 2 — §4 lock 1, the F.W0 HARD pre-gate, run FIRST.** *"F.W0 failing to re-ground HALTS this wave."*
⟨cmd⟩ `ls -l $F/docs/tranches/F/SUBSTRATE-LEDGER.md` → **201,985 B, Sep 17 15:03** · ⟨cmd⟩
`git -C $F rev-parse --short=8 HEAD` → **`3bac3d52`** · ⟨cmd⟩ `git -C $F status --porcelain | wc -l` → **0**.
**Re-grounded. The wave does not halt.** The spec's born-RED figures (`cd26c653`, 28 dirty, the unresolvable
pin `14d83356`) are F.W5-authoring-pass readings and no longer reproduce.

**Act 3 — the two F.W0 tables addressed BY GATE ID, never by line** (§4's F.W0 cross-edge, verbatim:
*"Cited hereafter as F-W0 §4 G-11 / §4 G-12 — by gate id, never by line"*). ⟨cmd⟩
`/usr/bin/grep -nE "^### G-11 —|^### G-12 —" waves/F-W0.md` → `364:### G-11 — ONE corrected anchor table
published; every later wave quotes it` · `369:### G-12 — ONE corrected-denominator table published;
superseded figures FORBIDDEN downstream` ⟨*the line numbers are the command's output, never this seat's
address for them — R3-3.10's distinction, observed*⟩.

**Act 4 — THE FINDING THAT SHAPED THE UNIT: G-11's table does not reach a single F.W6 anchor.** F.W0's
own §2.1.3 row 5 states the boundary in its state cell — *"**RECORD** (api/py coordinates are outside F.W0's
bounds)"* — and its §2.1.4 states the narrowing in F.W0's own hand: *"Under **FREEZE-WITH-ADOPTION AND
WORKTREE-AS-BASELINE**, G-11 is **drift-correction only**."* F.W6's anchor set is overwhelmingly `api/**`.
**Consequence, taken rather than absorbed**: the re-resolution FW6-G19's second conjunct demands is **this
wave's own act**, performed read-only here, and the burn register says so at §0.1a rather than letting a
later seat read G-11's silence as a certification.

**Act 5 — the substrate delta measured before the anchors, because it governs the work.** G-11's table is
dated at fourier **`8bc7736`**; HEAD is **`3bac3d52`**. ⟨cmd⟩
`git -C $F diff --name-only 8bc7736 3bac3d52 -- api | wc -l` → **0** — **not one `api/` byte moved between
G-11's substrate and this wave's open**, so every server anchor sits on the bytes G-11's seat read. ⟨cmd⟩
`git -C $F diff --name-only 8bc7736 3bac3d52 -- web` → **13** files, **none of them an F.W6 anchor** (they
are G-10's DELETE + the `aria-pressed` lift and the `--viz-*` cure — F.W0's own acts).

**Act 6 — every anchor this wave cites, re-resolved at the true bytes, read-only.** ⟨cmd⟩
`/usr/bin/sed -n '<L>p' <rooted path>` per coordinate, double-run, at `3bac3d52`. Published as three tables
at burn-register §0.1c (**A** the fourier server · **B** the fourier web tree · **C** the value tree's four
routed-out rows, explicitly outside the F.W0 lock per §2.10). **Result: NOT ONE ANCHOR IS FALSE.** Sixteen
table rows carry a **⟨beside⟩** correction — **7 rootings · 1 collision · 1 split spelling · 5 extent
disclosures · 2 reading corrections** — each recorded **beside** the spec's spelling, **never over it**
(E-3), and self-counted at the settled bytes (⟨cmd⟩ `/usr/bin/grep -c '⟨beside' burn-register.md` → **18**,
double-run 18, **minus the notation's own definition and the receipt's own command text = 16**; the
arithmetic is disclosed in the file because the probe matches its own receipt).

**The one correction a burn seat could have been misled by, named here as well as there**: §2.4 FR-AFP-9's
*"restore route live at `:430`"* — `admin.py:430` is `result = await db.visualizations.update_many(`, the
batch write of a different row. The restore route is **`api/routers/visualizations.py:430`** —
`@router.post("/{slug}/restore")`, with `:445 result = await softdelete.restore(...)`. **The claim is TRUE
at the corrected coordinate**; only the address collided. Two more worth the close seat's eye: §2.10's V-β
cell spells **one** filename for **two** files (`models/visualization.py:235` ⊕ `routers/visualizations.py:129`,
both true), and **`GalleryView.vue:128`'s *"can only add"* is a REACHABILITY claim, not a syntactic one** —
the delete arm is present at `:128` and unreachable only because `gallery.ts:195` hard-codes
`const liked = true`. Recorded so unit `d` does not "cure" a ternary that is not the defect.

**Act 7 — G-12's forbidden-figure register checked against the spec, and it comes back clean.** ⟨cmd⟩ a
`-F` loop over the thirteen literal forbidden figures against `F-W6.md` → **0** at every one. The fourteenth
(*any array-literal `loops[].cardinality`*) returns one `-F 'cardinality'` hit which is **not** it — ⟨cmd⟩
`/usr/bin/grep -n -F 'cardinality' F-W6.md` → `430:| fr-ContourPreview row 28 | 2 | carried at §2.6
(boundary cardinality on the write path) |`, an ordinary noun in a landing cell. **F.W6 quotes no superseded
denominator** — published as a measured negative, not assumed.

**Act 8 — FW6-G18's roster, quoted from COHESION §0j.D with ruling ids, mapped per row, re-ruled by nobody.**
The rulings exist (⟨cmd⟩ `ls -l …/OWNER-RULINGS-F.W5.md` → **18,702 B, Sep 17 18:16**; ⟨cmd⟩
`/usr/bin/grep -c '^| \*\*R[1-9]\*\*'` → **9**, double-run 9), and **§0j.D is the authority for what each
one SAYS**. Eleven entries carried: **R1 F-SS4REST · R2 F-TRIE · R3 F-PRODRET · R4–R9 F-SS4REST ⊕ OG-F1 ⊕
OG-F2 ⊕ G-15(c)**. ▲ **Three rulings RE-HOME a row away from this wave and each re-homing is stated IN its
row**, because a seat reading only §2 would ship it here: **R3's port → F.W8** (§2.4's *"If PRODUCER: F.W6
ships the flag-write operation"* superseded **on the homing only**; the band's other server rows stay
F.W6's), **R4's deletion → F.W4** (by §2.9's own branch, F.W6 books **no** server act), and **R9's ⊙ →
F.W8 attached to `FR-USB-23`**, as FW6-G18's own cell already ordered. Two holds **DISCHARGED** by ruling:
**F-TRIE** frees unit `h`'s E10 strikes from §4 lock 8's compression hold (**and no trie is designed here**),
and **R7 = CODEGEN** lifts FW6-G12's ⊙ (**K9's five `?? item.slug` fallbacks survive the lift**).

**Act 9 — the F.W5 clause set consumed by clause id.** ⟨cmd⟩
`/usr/bin/grep -cE '^### [A-G][0-9]+c? (—|⊙)' J-diff-shape-v2.md` → **71** (double-run 71), enumerated whole
in the register: `A1–A6 · B1–B5 · C1–C5 · D1–D8 · D10–D17 · E1–E20 · F1–F9 · G1c–G10c`. ⟨cmd⟩
`/usr/bin/grep -cE '^### D9 ' J-diff-shape-v2.md` → **0** — **`D9` is absent from the clause register**, which
is the record's own state and the reason the actor clause is **E18**. ⟨cmd⟩ `/usr/bin/grep -c '^| '
operation-register.md` → **114**. Each clause this wave burns verified present by ⟨cmd⟩
`/usr/bin/grep -cE "^### <id> (—|⊙)"` → **1** at every one of `C1 C2 C5 D2 D3 D5 D6 D8 D10 D11 D12 D16 D17 E2
E5 E6 E7 E13 E14 E17 E18 B4 E10 G1c…G10c`. A **per-unit clause map** is published so each burn seat reads its
own stating clause and no other. ▲ **E-3 stated: F.W6 CONSUMES these clauses and authors none.**

**Act 10 — the census pin, and no roster integer re-derived.** ⟨cmd⟩ `shasum -a 256 …/CENSUS-CANONICAL.md |
cut -c1-12` → **`f44362757458`**, character-match to the spec's pin. ⟨cmd⟩
`/usr/bin/grep -nE '^### F\.W5(-W8)? — ' "$C"` → `5078:### F.W5 — **27 rows**` · `5092:### F.W5-W8 — **89
rows**`; ⟨cmd⟩ `/usr/bin/grep -o 'F\.W6., .F\.W8. and .F\.W10. are likewise named by \*\*no record\*\*' "$C"`
→ *"F.W6`, `F.W8` and `F.W10` are likewise named by **no record**"*. **27 ⊕ 89 = 116, ZERO at F.W6** — the
116 is **the canonical's, quoted**, and this wave's own population stays folds, gate operands and
commissioned acts, summed into nothing.

**Act 11 — the register's spine opened.** `waves/F-W6/burn-register.md` created (`mkdir -p` first; the
directory did not exist — the baseline's FW6-G16/G17 RED rested on exactly that). §1 carries the table
**FW6-G17 greps**, with the `id` column first; **unit `a` books no identity** and says so in the table, since
its product is §0, an operand, not a burn.

#### Commit

| commit | meaning | pathspec |
|---|---|---|
| **`7f2d6baa`** | `docs(x-f/w6.a): burn register OPENED — FW6-G19's anchor re-resolution and FW6-G18's ruled roster` | `docs/tranches/X/fourier/waves/F-W6/burn-register.md` |

Settled bytes: **357 lines / 40,373 B**; line 1 = `SERVED MODEL: claude-opus-5[1m]`. ⟨cmd⟩
`git status --porcelain -- docs/tranches/X/fourier/waves/F-W6/` → **0** after the commit. **`scripts/dev/dev.sh`
untouched and unstaged** — ⟨cmd⟩ `git show --stat 7f2d6baa` names one file.

#### Gate readings — BEFORE → AFTER

| gate | BEFORE (baseline, this record) | AFTER (this unit) | reading |
|---|---|---|---|
| **FW6-G19** F.W0 re-grounding (D-19) | **RED** — first conjunct GREEN-BEFORE-CURE (receipt exists, substrate re-grounded), **second conjunct unperformed**: *"every anchor cited by this wave is re-resolved against it"* | **GREEN** | Both conjuncts now hold at the bytes. Every anchor re-resolved at `3bac3d52` against F.W0's receipt, addressed **by gate id**; **not one anchor false**; 16 corrections recorded **beside**, none over. The gate's owner cell is *"F.W0; F.W6 cites"* — there is no fourier-side landing to wait on, so the split verdict does not hold it open |
| **FW6-G18** owner rulings present before any conditioned burn | **RED** — the born-RED witness (*"`OWNER-RULINGS-F.W5.md` does not exist"*) no longer reproduces (D-3), but *"no F.W6 row carries anything yet — the burn register does not exist"* | **RED — operand installed, roster complete** | ▲ **Reported RED deliberately.** The gate's falsifier is *"**each conditioned row** either carries its ruling or is explicitly deferred with its honest default recorded"* — and the conditioned rows are units `d`/`e`/`g`/`h`'s. **This unit's whole obligation is discharged**: the register exists, all nine rulings ⊕ OG-F1/OG-F2 ⊕ G-15(c) are quoted from §0j.D with their ruling ids, each is mapped to the rows it conditions, and the three re-homings are stated in their rows. Calling it GREEN here would be *a gate argued green over rows that do not exist* — an L-18 base by name |

**No other gate was touched, and none was read as GREEN.** FW6-G16 and FW6-G17 stay RED at unit `a`: the
value-side routing receipt does not exist (unit `i`'s), and the register's id column is open with **zero**
booked rows. The standing FW6-G16 condition holds at this seat's clock — ⟨cmd⟩ `git diff --stat -- api/src
src` → **empty** · ⟨cmd⟩ `git status --porcelain -- api/src src | wc -l` → **0**.

#### Locks observed, each with the act that observed it

- **§4 lock 1 (F.W0 pre-gate, HARD)** — run first, before any anchor was cited (Act 2). Not a halt.
- **§4 lock 2 (F.W5 STATES, F.W6 BURNS)** — the law quoted from **both** its homes and **never fused**:
  **F-W5 §2 §E clause E2**'s ▲ sentence and **F-W5 §3 gate G3**'s green-owner cell. Unit `a` books no
  identity, so it double-books none.
- **D-19 MEASURE-AT-OPEN** — every figure in the register is this seat's own read at `3bac3d52`; no figure
  is re-asserted from the spec's authoring pass.
- **Census freeze `f44362757458`, sole operand** — **no roster integer re-derived**; 116 quoted from the
  canonical, 132/111/153 not touched.
- **Anchors by gate id, never by line into a live sibling** — the only line numbers this unit publishes for
  a live sibling are the **outputs** of the `grep -n` receipts that locate G-11/G-12, and they are labelled
  as outputs, not as addresses.
- **R-5 record-qualification from the first row on** — the ten colliding tokens are written with their
  record everywhere they appear (`fr-FourierShapeExtractor L-B1` · `fr-ContourEditorCanvas C-2` ·
  `fr-BasisSelector M-9` · `fr-GalleryDraftsSection B-2`).
- **Read-only siblings** — every fourier and value-side figure above is a `grep`/`sed`/`ls`/`git … status`
  read. **glass-ui untouched**; §4's SS-6 relay stays **DECLARED EMPTY** and is recorded as such.
- **E-3** — the spec, the 66 `fr-*.md`, the census, the F.W5 contract set and F.W0's receipt were read and
  not written. Every correction is an addendum **beside**.

#### Residuals carried forward (none blocking)

1. **The sixteen beside-corrections are a reading aid, not a spec amendment.** `F-W6.md` is immutable;
   units `b`–`i` cite the corrected coordinates **from the register**, and the spec's spellings stay where
   they are.
2. **`admin.py:430` / `visualizations.py:430`** — unit `e` (FR-AFP-66, R6 KEEP) inherits the corrected
   restore-route coordinate; the spec's bare `:430` is not to be followed inside an `admin.py` paragraph.
3. **`equations.py`'s three `reconstructed_points` sites** (`:114` emitted, `:128` returned, `models/equations.py:33`
   typed) are unit `h`'s real strike surface; the spec's `:100-106` is the compute, not the field.
4. **`GalleryView.vue:128` is a reachability claim** — unit `d`'s row must say so or it invites a cure of the
   wrong line.
5. **G-11's api/py boundary** is now on the record: any later X·F wave whose anchors are server-side gets no
   drift-correction from F.W0 and must re-resolve its own, as this one did.

**Escalations: none.** No write was attempted outside the writable set; no specified cure was impossible at
the bytes; no third diagnose→edit→re-measure occurred on any gate.

**Unit `a` CLOSED. Unit `b` opens** — the PATCH/chain one-cut (F-α · F-β · SS-C-1 — FW6-G1/G2/G3/G4),
**ONE COMMIT** per §2.1's head and §4 lock 3, with the KISS lift of the remix tri-state idiom
re-resolved above and holding at `visualizations.py:522-528`.
