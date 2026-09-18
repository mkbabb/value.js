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

---

### b — the PATCH/chain one-cut (F-α · F-β · SS-C-1), ONE COMMIT

**Seat**: Opus 5 (1M), 2026-09-17. **Sections executed exactly as ordered**: spec **§2.1** (F-α · F-β ·
SS-C-1) · **§3 FW6-G1 · FW6-G2 · FW6-G3 · FW6-G4** · **§4 lock 3** (the ONE-CUT laws). **Writes**: the two
paths of the unit's writable set and nothing else — `waves/F-W6/burn-register.md` (append) and this record.
**Zero fourier bytes · zero value-tree product bytes.** Engine `/usr/bin/grep` (§0.2's pin).

#### Acts, in order

**Act 1 — the spec read WHOLE, then §2.1 / §3 G1–G4 / §4 lock 3 read again at their own bytes.** The three
rows of §2.1 were read as one table (the head declares *"**ONE COMMIT** (3 rows)"*), and the four gate rows
were read with their owner cells, because FW6-G4's owner cell is itself a lock (*"same commit as
FW6-G2/G3 (one PATCH-model cut)"*). **The spec was not edited** (E-3). Unit `a`'s §0 was read whole first:
its anchor re-resolution is the coordinate source for every citation below, and **no anchor was re-derived**.

**Act 2 — substrate re-measured at this seat's clock before any citation** (D-19). ⟨cmd⟩ `git -C $F rev-parse
--short=8 HEAD` → **`3bac3d52`** · ⟨cmd⟩ `git -C $F status --porcelain | wc -l` → **0** — **unmoved from
unit `a`'s reading**, so §0.1c holds at this clock and the F.W0 pre-gate is not re-litigated.

**Act 3 — F-α's witness, measured whole.** ⟨cmd⟩ `/usr/bin/grep -rn "_write_root_version" $F/api
--include='*.py' | wc -l` → **3**, double-run **3** (`routers/visualizations.py:110` def · `:220` create ·
`:592` remix) — **the only writer**; ⟨cmd⟩ `/usr/bin/sed -n '136,142p'` prints `:138 parent_hash=None,` ·
`:140 root_hash=set_hash_value,` · `:141 depth=0,`; ⟨cmd⟩ `/usr/bin/grep -rn "visualization_versions" $F/api
--include='*.py' | /usr/bin/grep -v tests | wc -l` → **8**, double-run **8** (insert `:146` · finds `:749`
/`:874` · `find_one` `:822` · 2 migration-script sites · 2 index creations `api/services/database.py:132-133`).
▲ **Added at this seat, and it sharpens the row**: `GET /{slug}/versions`'s own docstring at `:862-863` reads
*"The viz's own version chain, ``depth``-ordered, bounded ≤50"* — **the file states the chain the constructor
forbids**. ⟨*divergence of FORM, disclosed*: the spec's unscoped `grep -rn "_write_root_version" $F/api` also
prints a **binary match** line for `routers/__pycache__/visualizations.cpython-314.pyc`; the published figure
is the `--include='*.py'` source count, **3**, identical to the baseline's. Recorded in the register's §1.b⟩.

**Act 4 — F-β's witness, the PATCH handler read WHOLE rather than at its three cited lines.** ⟨cmd⟩
`/usr/bin/sed -n '355,392p' $F/api/routers/visualizations.py` → after `resolve_session`, the ownership check,
`etag.require_if_match` and the visibility-transition guard, the body is **three statements**: `:381 updates
= {k: v for k, v in body.model_dump(exclude_unset=True).items() if v is not None}` · `:382 updates
["updated_at"] = datetime.now(UTC)` · `:383 await db.visualizations.update_one({"slug": slug}, {"$set":
updates})`. **No `set_hash` recompute · no `content_hash` recompute · no `_write_root_version` call** — the
last confirmed by Act 3's enumeration, which is why the handler was read whole: an absence-proof over three
cited lines proves nothing about the other thirty-five (K-6/S-8's method law, applied to a handler body).
`:480` `_head_set_hash` → `return doc.get("set_hash") or atomdiff.set_hash(atomdiff.enumerate_atoms(doc))` —
**the stored value whenever non-empty**. ▲ **Witness sharpened, measured not inferred**: `VisualizationUpdate`'s
own docstring at `:199-200` states *"``slug`` is immutable and ``content_hash`` is recomputed server-side"* —
**the recompute the handler does not perform**. Booked into the register row as part of the defect surface.

**Act 5 — FW6-G3's arm and the KISS lift, verified at both ends.** The drop is at the same `:381`
comprehension (`if v is not None` discards an explicit null); the idiom to lift is live — ⟨cmd⟩
`/usr/bin/sed -n '520,529p'` → `:522 if "palette_slug" in body.model_fields_set:` … `:528 child_atoms
["palette_slug"] = body.palette_slug`, under the in-source comment *"tri-state (F-08): null CLEARS the
binding (atom removed from the bag); a slug rebinds; an omitted field inherits the source's."* **The
commissioned act names the lift and forbids a second spelling** — the KISS lock is quoted into the row.

**Act 6 — SS-C-1's witness computed as set against set, not as prose.** PATCH fields: ⟨cmd⟩ `/usr/bin/sed -n
'203,207p' $F/api/models/visualization.py | /usr/bin/grep -c ':'` → **5**, double-run **5** (`visibility ·
title · description · tags · palette_slug`, sealed by `ConfigDict(extra="forbid")` at `:209`); the wire twin
⟨cmd⟩ `/usr/bin/sed -n '257,261p' $F/web/src/lib/types.ts | /usr/bin/grep -c '?:'` → **5**, double-run **5**.
Atoms: ⟨cmd⟩ `/usr/bin/sed -n '30,34p' $F/api/lib/crud/atomdiff.py | /usr/bin/grep -c '"'` → **5**, double-run
**5** (`ATOM_KEY_ORDER`, restated as the `AtomKey` Literal at `:37-39`). **Intersection 1 · PATCH-only 4 ·
atom-only 4** — and the named casualty is located: `class AnimationSettings` at **`api/models/shared.py:65`**
(⟨*the spec names the field, not the class's home; recorded here because a burn seat will need it*⟩), whose
`speed` the control types at `web/src/lib/types.ts:49`.

**Act 7 — the dissents, hunted rather than assumed.** The spec orders F-α's dissent *carried*, so it was
read at its source: ⟨cmd⟩ `/usr/bin/grep -n 'W2-transpose' $F/docs/tranches/M/M.md` → **4** sites, of which
the one inside **§7** (*"§7 — The chronic + deferred fold (terminal verdicts — no perpetual punt)"*) is the
verdict row — *"Phantom within-viz version chain (depth always 0) | J | **DELETE** (W2-transpose; net code
decrease, inv-3) | W10"* — and the **M.W10** wave row carries its execution language, ⟨cmd⟩ `/usr/bin/grep -o
'W2-transpose: DELETE the phantom within-viz version chain' M.md` → *"W2-transpose: DELETE the phantom
within-viz version chain"* ⟨*the pattern is cut short of the source's own backticks so the receipt is
runnable as printed; the row's full clause — …`keep the per-viz atom /diff + cross-viz fork_of`… — is quoted
in the register row, where it sits inside the quotation and not inside a command*⟩. **The spec's `M/M.md §7`
citation HOLDS at the bytes.** ▲ **A SECOND dissent was found in the same row and is booked** — ⟨cmd⟩
`/usr/bin/grep -o 'W2-fix: .palette_slug. remix-only' M.md` → *"W2-fix: `palette_slug` remix-only"* (the
dots stand for the source's backticks, same reason): fourier's board plans to take atom 5 **off** the PATCH
surface, under which FW6-G3's tri-state is moot and FW6-G4's set equality resolves **by subtraction**.
**Neither dissent is arbitrated here**; both are carried in their rows and routed to the ruling seat through
unit `i`'s letter. **Neither weakens a gate** — the four falsifiers stay the spec's own words.

**Act 8 — the unruled disposition, FLAGGED INLINE (runbook §5.7), never presumed.** COHESION §0j.D was read
whole for this unit: **R1–R9 ⊕ OG-F1 / OG-F2 ⊕ G-15** reach `TA-4`, the trie, the flag port, the like verb,
the off-state `[]`, the hard-delete arm, codegen, born visibility, the session subsystem and the four G-15
contradictions — ⟨cmd⟩ `/usr/bin/grep -n 'deepen\|F-α\|SS-C-1\|F-β' COHESION.md` → **no output; none of the
ten rulings is a member of the set that reaches this unit's three identities.** Unit `b` is therefore
**unconditioned by owner ruling**, and F-α's *deepen-or-retire* is **open**: the row names both branches
with the falsifier that closes either and hands the choice to F.W5's ruling seat. **This seat chose
neither** — choosing would be an implementer resolving an owner question by shipping.

**Act 9 — the register rows written, and the self-count trap disarmed at the root.** Three rows appended to
§1 (the `id` column FW6-G17 greps), plus **§1.b** carrying the receipts, the form-divergence disclosure and
the *what-this-seat-did-not-decide* block, plus the unit stamp in §2. ▲ **A real defect of my own, caught by
WRITE-THEN-MEASURE and cured structurally rather than patched**: §0.1c publishes a self-count over unit
`a`'s beside-marker (**18**, of which two are self-references). My first draft **quoted that probe's pattern
verbatim**, and ⟨cmd⟩ `/usr/bin/grep -c '⟨beside' burn-register.md` read **22** — I would have silently
falsified a receipt I did not author. Two corrections followed, and the second introduced the same
fixed-point problem one level up (a count of my own marker moved each time I named it: **2 → 3 → 4**). The
cure is **structural, not a third patch**: unit `b` publishes **no count of a notation marker at all** —
the register's countable operand is the `id` column, a marker is not an operand — and the beside-probe is
quoted with a bracketed spelling (`'⟨besid[e]'`) that matches the same lines while the quoting line is not
one of them. **Settled figure, double-run after the commit: 18 = unit `a`'s figure, unmoved.**

#### Commit

| commit | meaning | pathspec |
|---|---|---|
| **`4e65aa76`** | `docs(x-f/w6.b): the PATCH/chain one-cut booked — F-α · F-β · SS-C-1 in ONE COMMIT, four gates' commissioned acts installed` | `docs/tranches/X/fourier/waves/F-W6/burn-register.md` |

**ONE COMMIT family honoured** (§2.1's head *"ONE COMMIT (3 rows)"* ⊕ §4 lock 3's F-β ⊕ SS-C-1 one-cut ⊕
FW6-G4's *"same commit as FW6-G2/G3"*): the three rows, §1.b and the stamp landed together — ⟨cmd⟩
`git show --stat 4e65aa76` → **1 file changed, 68 insertions(+)**. Settled bytes of the register: **425
lines / 56,903 B**, double-run identical; line 1 still `SERVED MODEL: claude-opus-5[1m]`. ⟨cmd⟩
`git status --porcelain -- docs/tranches/X/fourier/waves/F-W6/` → **0**. **`scripts/dev/dev.sh` untouched
and unstaged** — it remains ` M` in the tree and appears in no commit of this unit.

#### Gate readings — BEFORE → AFTER

Every AFTER witness was **re-run post-commit**; all four reproduce unchanged, as they must while fourier is
read-only (HEAD `3bac3d52`, **0** dirty, both measured again after the landing).

| gate | BEFORE (baseline, this record) | AFTER (this unit) | reading |
|---|---|---|---|
| **FW6-G1** chain depth (F-α) | **RED-AS-EXPECTED** — 3 writer sites, `depth=0` hard-coded, 8 non-test `visualization_versions` sites | **RED — commissioned act installed; disposition UNRULED** | §3's split verdict, applied literally: *"a gate closes for F.W6 when the commissioned act is authored with its evidence row in the burn register; it goes GREEN only when the named landing occurs."* The act is authored with both branches, the reference walk and the gate's own falsifier; **the landing is fourier's and the DISPOSITION IS NOT RULED**. A GREEN here would be a gate argued green over bytes that did not move and a branch nobody chose |
| **FW6-G2** `set_hash` recompute on atom PATCH (F-β) | **RED-AS-EXPECTED** — bare `$set`, `_head_set_hash` returns the stored value | **RED — commissioned act installed** | Act = recompute from `enumerate_atoms(doc)` ⊕ the version write, with the in-source docstring claim (`:199-200`) folded into the defect surface. Falsifier carried verbatim. Landing pending |
| **FW6-G3** `palette_slug` clearable | **RED-AS-EXPECTED** — `if v is not None` drops the null; the remix arm tri-states twenty lines away | **RED — commissioned act installed** | Act = **LIFT** `:522-528`'s `model_fields_set` idiom; the KISS lock is quoted into the row so no seat invents a second spelling. Landing pending; M.W10's *remix-only* dissent carried beside |
| **FW6-G4** PATCH field set = atom set (SS-C-1 write leg) | **RED-AS-EXPECTED** — five PATCH fields vs five atoms, one shared | **RED — commissioned act installed** | Act = set equality **or** a per-atom statement with reasons (the gate admits either, never silence), landing in the **same commit** as G2/G3. **READ leg NOT re-booked** — banked at `fr-GalleryCardModal` GCM-1 → F.W4 |

**No other gate was touched, and none was read as GREEN.** The standing FW6-G16 condition holds at this
seat's clock — ⟨cmd⟩ `git status --porcelain -- api/src src | wc -l` → **0**, before and after the commit.

#### Locks observed, each with the act that observed it

- **ONE COMMIT family (§2.1 head)** — one commit, one file, 68 insertions (Act 9 / Commit). The three rows
  were written into the buffer together and were never staged separately.
- **ONE-CUT LAW, F-β ⊕ SS-C-1 (§4 lock 3)** — stated **in both rows** and in FW6-G4's reading, with the
  reason spelled out in each direction (a widened field set without the recompute mints four more
  stale-hash paths; a recompute over a one-atom field set leaves four atoms unreachable). The landing
  evidence cell of SS-C-1 forbids a stamp from a split landing.
- **KISS lock (§2.1's ▲)** — *"the tri-state idiom ships in the same router twenty lines away — LIFT it, do
  not invent one"*: the act names the exact site and the three arms in the source's own words (Act 5). **No
  idiom was designed by this seat.**
- **§4 lock 2, F.W5 STATES / F.W6 BURNS** — each row cites its stating clause (**E2** for F-α, **E7** for
  F-β and SS-C-1's write leg) and **claims no F.W1/F.W3/F.W4/F.W5/F.W8 credit**; the READ leg is left with
  GCM-1 rather than re-homed, so FW6-G17 has no double-booking to find in this unit's rows.
- **R-5 record-qualification (§4 lock 10)** — the one colliding token this unit touches is written with its
  record: **`fr-GalleryCardModal` GCM-1**. No bare `M-9`/`M-10`/`B-2`/`C-2` appears in these rows.
- **D-19 MEASURE-AT-OPEN** — every figure above is this seat's own read at `3bac3d52`, double-run; unit
  `a`'s §0.1c supplied the coordinates and **none was re-derived**.
- **READ-ONLY fourier** — every witness is `grep`/`sed`/`git status`. **Zero fourier bytes**: HEAD and dirty
  count measured before and after the commit, both unmoved. glass-ui untouched; no producer row rides this
  unit.
- **Runbook §5.7** — *"Owner rulings are FLAGGED INLINE and never presumed"*: F-α's disposition is flagged
  inline in the row and in this receipt, and is **not** treated as an escalation trigger (no write outside
  bounds, no third diagnose→edit→re-measure on a gate, no allowlist pressure).

#### Residuals carried forward

1. **F-α's disposition is UNRULED and must be ruled before the landing.** Unit `i`'s letter carries it as
   its **first ask**, with both branches and the single falsifier that closes either. A fourier seat that
   picks a branch unilaterally resolves an open owner question by shipping.
2. **Two dissents of record now ride the F.W6 → fourier edge**, not one: the M.W10 **DELETE** of the
   within-viz chain (F-α) and the M.W10 **`palette_slug` remix-only** plan (F-β/SS-C-1). The second is new
   to this wave's record and **materially changes what "cure" means for FW6-G3 and FW6-G4** — subtraction
   rather than addition. Both belong in the letter.
3. **`VisualizationUpdate`'s docstring (`:199-200`) is part of F-β's cure surface**, not decoration: a
   landing that recomputes the hash and leaves the docstring's *"recomputed server-side"* claim unqualified
   still ships a false in-source statement (the claim is true of `set_hash` after the cure, and was never
   true of a PATCH that touched no atom).
4. **`class AnimationSettings` lives at `api/models/shared.py:65`**, not in `models/visualization.py` where
   the atom is referenced — recorded because SS-C-1's landing edits the PATCH model and will need the
   class's real home.
5. **The self-count lesson generalises** (Act 9): a figure published over a token that a later append can
   mint has no fixed point. Units `c`–`i` append to the same file; **the `id` column is the operand FW6-G17
   greps, and it is the only figure of this file a later seat should be counting.**

**Escalations: none.** No write was attempted outside the writable set (the two paths, both of which the
brief names); no specified cure was impossible at the bytes — **every cure in this unit is a commissioned
ask, and the asks are authored exactly as §2.1 words them**; no third diagnose→edit→re-measure occurred on
any gate (the two re-writes in Act 9 were to **this seat's own prose figure**, not to a gate, and the second
was replaced by a structural cure rather than a third patch).

**Unit `b` CLOSED. Unit `c` opens** — the privacy limb (F-γ + FR-AFP-4 — FW6-G5/FW6-G11), **ONE CUT**, with
`_readable_or_none`'s five call sites and the bare ancestor-walk `find_one` at `:784` holding as unit `a`
re-resolved them, and value.js's `service/forks.ts:167-179` `{kind:"unavailable", ordinal}` shape standing
as the adoption target rather than a design question.

---

### c — the privacy limb (F-γ + FR-AFP-4), ONE CUT

**Seat**: Opus 5 (1M), 2026-09-17. **Sections executed exactly as ordered**: spec **§2.2** (F-γ ·
FR-AFP-4 ‡ ⊕ `fr-GalleryDraftsSection F-4` ⊕ `fr-GalleryDraftsSection m-15` ⊕ `fr-GalleryCardModal GCM-52`)
· **§3 FW6-G5 · FW6-G11** · **§4 lock 3** (the ONE-CUT laws). **Writes**: the two paths of the unit's
writable set and nothing else — `waves/F-W6/burn-register.md` (append) and this record. **Zero fourier
bytes · zero value-tree product bytes.** Engine `/usr/bin/grep` (§0.2's pin).

#### Acts, in order

**Act 1 — the spec read WHOLE, then §2.2 / §3 G5 + G11 / §4 lock 3 read again at their own bytes.** The two
rows of §2.2 were read as one table (the head declares *"one privacy cut (2 rows)"*), and both gate rows
were read with their owner cells. **The spec was not edited** (E-3). Units `a`'s §0 and `b`'s §1.b were read
whole first: §0.1c is the coordinate source for every citation below and **no anchor was re-derived**.

**Act 2 — substrate re-measured at this seat's clock before any citation** (D-19). ⟨cmd⟩ `git -C $F
rev-parse --short=8 HEAD` → **`3bac3d52`** · ⟨cmd⟩ `git -C $F status --porcelain | wc -l` → **0**, both
double-run — **unmoved from units `a` and `b`**, so §0.1c holds at this clock and the F.W0 pre-gate is not
re-litigated.

**Act 3 — F-γ's witness, the provenance handler read WHOLE rather than at its three cited lines.** ⟨cmd⟩
`/usr/bin/sed -n '733,791p' $F/api/routers/visualizations.py`: the entry row **is** gated (`:744 doc = await
_readable_or_none(db, slug, viewer)`) and the `fork_of` walk is **not** — `:764` the crumb list · `:765 seen:
set[str] = set()` · `:767 while cur is not None and len(breadcrumb) < 50:` · `:770 break  # cycle-guard` ·
`:781 parent_slug = cur.get("fork_of")` · **`:784 cur = await db.visualizations.find_one({"slug":
parent_slug})`**, with **no viewer, no `visibility` predicate, no `deleted_at` predicate**. The handler was
read whole for the same reason unit `b` read the PATCH body whole: an absence-proof over three cited lines
proves nothing about the other fifty-six (K-6/S-8's method law). ⟨cmd⟩ `/usr/bin/grep -rn
'_readable_or_none' $F/api --include='*.py' | wc -l` → **5**, double-run **5** — `:466` def · `:507` remix ·
`:744` provenance · `:816` diff · `:869` versions, **none inside the walk**.

**Act 4 — TWO SHARPENINGS AT THE BYTES THAT CHANGE WHAT A LANDING MUST DO.** (1) The emitted crumb is
**five** fields, not the four §2.2 names: `class ForkCrumb` (`api/models/visualization.py:326`) declares
`slug · set_hash · author_slug · fork_of · created_at` (⟨cmd⟩ `/usr/bin/sed -n '331,335p' … |
/usr/bin/grep -c ':'` → **5**, double-run 5) — and **`fork_of` IS the next ancestor's slug**, so a *child*
crumb publishes its private parent's identifier even where the parent's own crumb is redacted. A cure that
swaps only the non-public hops leaves the leak open from the other end. (2) **The cure's own sentence names
two different predicates.** `_readable_or_none`'s body (`:466-474`) returns `None` on `deleted_at is not
None` and on `visibility == "draft" and not is_owner` — **it admits `unlisted`** (`:34 Visibility =
Literal["draft", "unlisted", "public"]`) — while §2.2's same sentence says *"collapse **non-public**
ancestors"*, and value.js's adoption target is strictly public: `isActivePublic`
(`api/src/modules/palette/service/visibility.ts:31-38`) is `visibility === "public" && deletedAt == null`,
its in-source guarantee at `service/forks.ts:163-169` enumerating *"a private / **unlisted** / trashed /
purged ancestor collapses to a non-correlatable `unavailable` step carrying ONLY its ordinal"*. **This seat
did not resolve the divergence by fiat**: the act names `isActivePublic`-equivalence **by citation** (§2.2
orders *"adoption, not design"*, and adoption is of value.js's predicate as well as its shape) and **flags
the precision INLINE** so a landing seat cannot take the looser reading silently.

**Act 5 — FR-AFP-4's four limbs, each measured separately, because C2 rules them as one unit.** (i) ⟨cmd⟩
`/usr/bin/grep -cE '^@[a-z_]*router\.(get|post|put|patch|delete)' images.py` → **7** ops · ⟨cmd⟩ `-cE
'^@[a-z_]*router\.delete'` → **0**. (ii) ⚑ **sharpened past the banked row**: ⟨cmd⟩ `/usr/bin/grep -c
'Depends' images.py` → **0** — *not one `Depends` anywhere in the router*, so F-4's *"one router, one
identity"* is measured at the router rather than inferred from two handlers; ⟨cmd⟩ `-c 'Cache-Control'` →
**4** = three header sites (`:145` blob · `:164` thumbnail · `:205` overlay) ⊕ one comment (`:138`). (iii)
⚑ **the reward surface is FOUR handlers, not one**: the touch rides `get_image_asset`
(`api/dependencies.py:75`, unconditional), whose call sites are blob `:140` · thumbnail `:151` · overlay
`:177` · extract-contour `:214` (⟨cmd⟩ `-c 'asset = await get_image_asset'` → **4**) — so a predicate fix at
the blob route alone leaves three paths bumping the clock. The predicate it feeds: `database.py:163-165`
`$set`s **`last_accessed_at`**; `janitor.py:168` reaps on `{"pinned": False, "last_accessed_at": {"$lt":
cutoff}}`. (iv) `web/src/lib/api.ts:293` is the bare, unversioned thumbnail URL while the regeneration
branch (`image_storage.py:105-128`) rewrites the **same** path `fs:{slug}.thumb` — regenerated bytes,
identical URL, 24 h public cache.

**Act 6 — GCM-52's entropy re-derived at the DATA, and a fifth sharpening booked.** Image slugs are minted
by the **same** generator as viz slugs (`image_storage.py:204` → `slugs.py:62` → `:40-42`), and the four
word lists measure **128 · 128 · 128 · 128** at `api/lib/crud/slug_words.json` — **128⁴ = 2²⁸ exactly**, the
arithmetic F-4 banks, confirmed rather than quoted. ⚑ **But the guard is looser than the data**:
`_load_word_lists` rejects only `len(words) < 64` (`slugs.py:29`), so **2²⁸ is a property of today's JSON,
not an invariant** (2²⁴ at the floor). **Recorded as a finding, not as a new cure** — GCM-52's cure is the
visibility gate, never a longer slug. ⚑ **And the fifth**: the blob handler's own comment (`images.py:136-138`)
calls the 404/410 shim *"auth"* — `get_image_asset` performs **no viewer check** — the same false-in-source
class as unit `b`'s `VisualizationUpdate` docstring find, and part of the cure surface.

**Act 7 — the honesty locks discharged as measurements, not as concessions.** §2.2's ▲ orders *"soft-delete
DOES de-list from browse — the cure may not overstate the hole"*, so it was **measured**:
`api/routers/gallery.py:53 base_query = softdelete.with_not_deleted({"visibility": "public"})`; the detail
read refuses a deleted row to a non-owner (`visualizations.py:263`); and `_recompute_pin_flags` **unpins** a
soft-deleted viz's blob (`janitor.py:351 {"$match": {"deleted_at": None}}`, its own docstring saying so).
**The entity de-lists, the soft-delete arm works, and what survives is the ASSET LEAF plus the RECENCY arm an
anonymous fetch resets** — which is the exact statement, neither larger nor smaller. The second lock: **the
deployment auth-proxy question stays UNPROVEN (SS-13 defer #5) in BOTH directions** — this seat ran **no**
live probe (probe parsimony, §5.2) and asserts no proxy present or absent; FW6-G11 may not close by assuming
one **and** may not be argued RED harder by assuming its absence.

**Act 8 — the branch question, checked and found already answered, so nothing was chosen.** Unlike unit
`b`'s F-α, **neither of this unit's dispositions is open**: v2 **C5** states redaction parity (*"Redaction
applies to **every** hop of a chain, never to the entry row alone"*) and v2 **C2** states the image contract
as ONE unit, with **C1** deciding the class-and-cache act the gate limb executes. The brief's order is
therefore obeyed literally — **cite the clause, do not re-choose the branch** — and **FW6-G5's second
branch (G6's *"stated asymmetry with its reason"*) is SPENT, not declined**: C5 rules *"If the two ends do
not adopt one shape, v2 states the asymmetry and its reason — silence is not a posture"*, and **v2 adopted
the shape**. COHESION §0j.D was re-read for this unit: **F-PRODRET ADMITS the band** (PRODUCER, port homed
at **F.W8**), which is why this row opens at all — and the **port is not this row's act**; no other ruling
reaches F-γ or the image contract's shape.

**Act 9 — the two register rows written as ONE commit, and the notation trap avoided rather than re-sprung.**
Two rows appended to §1 (the `id` column FW6-G17 greps), plus **§1.c** carrying the receipts, the instrument
disclosure, the five sharpenings, the two honesty locks and the *what-this-seat-did-not-decide* block, plus
the unit stamp in §2. ▲ **Unit `b`'s self-count lesson applied rather than re-learned**: this unit's
coordinate note carries a **marker of its own** and **this seat publishes NO count of it**; the register's
countable operand is the `id` column. Unit `a`'s beside-marker figure is **unmoved at 18** after this
landing (⟨cmd⟩ `/usr/bin/grep -c '⟨besid[e]' burn-register.md` → **18**, measured post-commit), and unit
`b`'s bracketed probe remains the only place that figure is taken.

#### Commit

| commit | meaning | pathspec |
|---|---|---|
| **`d4cd2392`** | `docs(x-f/w6.c): the ONE privacy limb booked — F-γ · FR-AFP-4 (⊕ F-4 ⊕ m-15 ⊕ GCM-52) in ONE COMMIT, FW6-G5/G11's commissioned acts installed` | `docs/tranches/X/fourier/waves/F-W6/burn-register.md` |

**ONE PRIVACY LIMB honoured** (§2.2's head ⊕ §4 lock 3's *"F-γ ⊕ FR-AFP-4 as one privacy limb"*): both rows,
§1.c and the stamp landed together — ⟨cmd⟩ `git show --stat d4cd2392` → **1 file changed, 97 insertions(+)**.
Settled bytes of the register: **522 lines / 81,620 B**, double-run identical; line 1 still `SERVED MODEL:
claude-opus-5[1m]`. ⟨cmd⟩ `git status --porcelain -- docs/tranches/X/fourier/waves/F-W6/` → **0**.
**`scripts/dev/dev.sh` untouched and unstaged** — it remains ` M` in the tree and appears in no commit of
this unit (⟨cmd⟩ `git show --stat HEAD --name-only | /usr/bin/grep -c 'dev.sh'` → **0**).

#### Gate readings — BEFORE → AFTER

Every AFTER witness was **re-run post-commit**; both reproduce unchanged, as they must while fourier is
read-only (HEAD `3bac3d52`, **0** dirty, measured again after the landing).

| gate | BEFORE (baseline, this record) | AFTER (this unit) | reading |
|---|---|---|---|
| **FW6-G5** breadcrumb redaction parity (F-γ) | **RED-AS-EXPECTED** — `_readable_or_none` at the entry row only (`:744`); the ancestor walk is a bare `find_one` at `:784` | **RED — commissioned act installed; landing pending** | §3's split verdict applied literally. Act = per-hop gate ⊕ collapse to value.js's `{kind:"unavailable", ordinal}`, **cited from C5 rather than re-chosen**, with the cycle-guard (`:765`/`:770`) and the ≤50 cap (`:767`) **carried as survivals**, `fork_of` named as the fifth leaking field, and the `unlisted` predicate divergence **flagged inline**. Post-commit re-measure: ⟨cmd⟩ `/usr/bin/sed -n '767,785p' … \| /usr/bin/grep -c '_readable_or_none'` → **0** — the walk is still ungated, which is why the gate is RED and not green |
| **FW6-G11** image remediation executed | **RED-AS-EXPECTED** — 7 ops / 0 DELETE; blob + thumbnail public-cached with no `Depends`; `touch_document` on the fetch paths | **RED — commissioned act installed; landing pending** | Act = C2's **four limbs as ONE unit** (asset-level delete/quarantine · blob **and** thumbnail — **and overlay** — visibility gate decided *with* the cache directive per C1 · janitor predicate fixed at `get_image_asset`'s convergence point · versioned thumbnail URL), with **F-4 (WHO) ⊕ m-15 (WHAT) cross-referenced and NOT merged**, the de-listing honesty lock measured, and **SS-13 left UNPROVEN in both directions**. Post-commit re-measure: **7 / 0 / 0** reproduce exactly |

**No other gate was touched, and none was read as GREEN.** The standing FW6-G16 condition holds at this
seat's clock — ⟨cmd⟩ `git status --porcelain -- api/src src | wc -l` → **0**, before and after the commit.

#### Locks observed, each with the act that observed it

- **ONE PRIVACY LIMB, ONE COMMIT (§2.2 head ⊕ §4 lock 3)** — one commit, one file, 97 insertions (Act 9 /
  Commit). Both rows' landing-evidence cells **forbid a stamp from a split landing, in either direction**:
  §2.2's ▲ (*"a breadcrumb redaction that leaves a draft/unlisted viz's source image world-readable by slug
  has not cured the leak"*) and C5's own LOCK (*"A cure at either surface that leaves the other is not
  parity"*) are quoted into the rows, one per direction.
- **The cycle-guard and the ≤50 cap survive** — named as survivals in the act, with value.js's own walk
  (`visited` set ⊕ `chain.length < 50`) cited to show **adoption preserves them rather than costing them**.
- **F-4 books WHO can fetch; m-15 books WHAT they see — cross-referenced, NEVER merged** — quoted from the
  record's own hand (⟨cmd⟩ `/usr/bin/grep -n 'm-15' fr-GalleryDraftsSection.md` → `:80 … cross-referenced,
  not merged.`), with the consequence stated: **a cache-versioning cure discharges neither the auth cure nor
  vice-versa.**
- **SS-13 UNPROVEN, both directions** — Act 7. No live probe was run and no proxy is asserted, present or
  absent (probe parsimony, runbook §5.2).
- **C's scope discipline** — Act 7. Soft-delete's de-listing is **measured**, so the hole is stated at its
  true extent: the asset leaf and the recency arm, not the listing.
- **§4 lock 2, F.W5 STATES / F.W6 BURNS** — each row cites its stating clause (**C5** for F-γ, **C2** ⊕
  **C1** for FR-AFP-4) and **claims no F.W1/F.W3/F.W4/F.W5/F.W8 credit**; `FR-AFP-1`'s port is left at
  **F.W8** by F-PRODRET's homing and the panel's client/copy arms at **F.W3/W4**, emitted and not claimed —
  so FW6-G17 has no double-booking to find in these rows.
- **R-5 record-qualification (§4 lock 10)** — every folded token is written with its record:
  **`fr-GalleryDraftsSection F-4`** · **`fr-GalleryDraftsSection m-15`** · **`fr-GalleryCardModal GCM-52`** ·
  **`fr-ImageUpload row 26`**. ⚑ Measured reason, not ceremony: ⟨cmd⟩ `/usr/bin/grep -ln 'm-15' fr-*.md` →
  **7** records and `-ln 'F-4\b'` → **5**, so both tokens collide across the frozen corpus exactly as the
  ten named ones do; a bare probe on either would span identities.
- **K-1** — the authority denominator is cited **45 / 30 / 13** with C1's measured `0/45` documented against
  `26/45` enforced; **never 30 alone**.
- **D-19 MEASURE-AT-OPEN** — every figure above is this seat's own read at `3bac3d52`, double-run; unit `a`'s
  §0.1c supplied the coordinates and **none was re-derived**.
- **READ-ONLY fourier** — every witness is `grep`/`sed`/`git status`/one read-only `json.load` of a data
  file. **Zero fourier bytes**: HEAD and dirty count measured before and after the commit, both unmoved.
  glass-ui untouched; no producer row rides this unit; SS-6 stays **DECLARED EMPTY**.
- **E-3** — the spec, the 66 `fr-*.md`, the census, the F.W5 contract set and units `a`/`b`'s rows were read
  and not written. Every correction is an addendum **beside**; nothing of another seat's is rewritten.

#### Residuals carried forward

1. **`ForkCrumb.fork_of` is inside F-γ's cure surface, not beside it.** A landing that installs the redacted
   member and leaves the child crumb's parent pointer has published the private ancestor's slug anyway.
   Unit `i`'s letter must carry this as part of the F-γ ask, not as a footnote.
2. **The `unlisted` predicate divergence is UNRESOLVED BY DESIGN and must be written down by whoever lands
   it.** `_readable_or_none` admits `unlisted`; `isActivePublic` does not; §2.2's cure cell names both. The
   act names the strict target by citation and flags the choice — **a landing that takes the loose reading
   silently has resolved a stated precision by shipping.**
3. **The janitor-predicate limb must land at `get_image_asset`, not at the blob route.** Four handlers bump
   `last_accessed_at` through that one dependency; a route-local fix is a three-quarters cure that C2's own
   rule ("*each of the other three independently restores the artifact*") already forbids.
4. **The overlay GET (`images.py:168`, `:205`) shares the blob/thumbnail posture** and is named in the act.
   The spec's G11 falsifier says *"blob **and** thumbnail"*; the third route carries the identical header and
   the identical absence of `Depends`, so a two-route gate leaves the leaf reachable. Recorded so the close
   seat reads the act's third name as deliberate, not as scope creep.
5. **2²⁸ has no invariant behind it.** The word-list floor is 64. If a later wave wants the entropy figure to
   be load-bearing anywhere, the guard — not the data — is what would have to say so. **No cure is proposed
   here**; GCM-52's cure remains the visibility gate.

**Escalations: none.** No write was attempted outside the writable set (the two paths the brief names); **no
specified cure was impossible at the bytes** — both acts are commissioned asks and both are authored exactly
as §2.2 and v2's C1/C2/C5 word them; no third diagnose→edit→re-measure occurred on any gate.

**Unit `c` CLOSED. Unit `d` opens** — counters, idempotency, lineage and the ruled-away like verb
(FW6-G6/FW6-G7), with `viewedHashes`' **no re-open-increment** lock (FR-GV-24) standing, **K12**'s static
close for `fr-GalleryDraftsSection B-2`, the record's **D-2** minute (the create path already wraps the
idempotency envelope; the key and the unique index are what is missing) and **R8 = REMIX + BORN-PRIVATE**
with the fourier half already conforming at `models/visualization.py:277`.

---

### d — counters, idempotency, lineage, and the ruled-away like verb

**SERVED MODEL: claude-opus-5[1m]** · seat clock **2026-09-17** · engine **`/usr/bin/grep`** (BSD, the spec's
pinned binary; bare `grep` is ugrep in this shell). Sections executed, exactly as briefed: **§2.3** (`:186-192`
— `FR-GV-12` ⊕ `FR-GV-24` ⊕ `VV-R2-A` cited · `fr-GalleryDraftsSection B-2` ‡) · **§2.8** (`:225-230`) ·
**§2.9** (`:231-236`) · **§3 `FW6-G6`** (`:515`), **`FW6-G7`** (`:516`). Writes confined to the two paths the
brief names. **Zero fourier bytes · zero value-tree product bytes.**

#### Acts, in order

**Act 1 — substrate re-measured before any citation (D-19 MEASURE-AT-OPEN).** ⟨cmd⟩ `git -C $F rev-parse
--short=8 HEAD` → **`3bac3d52`** · ⟨cmd⟩ `git -C $F status --porcelain | wc -l` → **0**, both double-run.
**Unmoved from units `a`, `b` and `c`**, so §0.1c's anchor re-resolution holds at this clock and this unit
re-derives none of it. The F.W0 pre-gate is unit `a`'s and was not re-litigated.

**Act 2 — every anchor of §2.3 / §2.8 / §2.9 verified at true bytes before it was cited.** Results, with the
two drifts recorded **beside** (E-3), never over:

| spec/record anchor | at the live bytes | verdict |
|---|---|---|
| §2.3 `visualizations.py:256` `find_one` | `:256 doc = await db.visualizations.find_one({"slug": slug})` | **reproduces** |
| §2.3 `:268-270` `$inc {"views": 1}` | the statement spans `:268-270`, literal on `:269` | **reproduces** |
| §2.3 `:272` `_public_doc(doc)` | `:272 body = _public_doc(doc)` | **reproduces** |
| §2.3 `gallery.ts:207-208` write-back | `:207 const idx = …` / `:208 if (idx !== -1) entries.value[idx] = {…, views: data.views}` | **reproduces** |
| §2.3 `gallery.ts:167, :223` ETag capture | both are `etags.get(slug) ?? (await api.getVisualization(slug)).etag` | **reproduces** |
| §2.3 `api.ts:371-380` `createVisualization` | declaration opens at **`:372`**, closes `:380`; `:371` is the JSDoc line | **DRIFT (1 line), recorded beside** |
| §2.3 `api.ts:138-140` `coreFetch` key support | `:138-140 if (options?.idempotencyKey) { headers["Idempotency-Key"] = … }` | **reproduces** |
| §2.3 `idempotency.py:68-70` passthrough | `:68 key = …` / `:69 if not key:` / `:70 return await handler()` | **reproduces** |
| §2.3 `database.py:98` plain / `:140` unique | `:98` plain on visualizations; `:140` unique compound on flags | **reproduces** ⟨+`:141` disclosed below⟩ |
| §2.3 `:612` remix `replay_or_record` | `:612` — **and `:236` create**, the D-2 site | **reproduces ⊕ extended** |
| §2.8 `visualization.py:277` remix born `draft` | `api/models/visualization.py:277 visibility: Visibility = "draft"` | **reproduces exactly** |
| §2.8 `forks.ts:76` value-side `"public"` | `api/src/modules/palette/service/forks.ts:76 visibility: "public",` | **reproduces** ⟨routed OUT⟩ |
| record `fr-GalleryView.md:63` `viewedHashes (:46, :117-121)` | `:46` decl ⊕ `:118-119` inside `openModal` (`:117-122`) | **both true at their own grain; neither corrected** |

**Act 3 — `FR-GV-12` ⊕ `FR-GV-24` (⊙ `VV-R2-A` cited) booked against FW6-G6.** The witness was taken in
**statement order** rather than by coordinate, so the defect is exhibited rather than asserted: `:256` read →
two 404 gates → `:268-270` `$inc` → `:272` serialise **the pre-`$inc` `doc`**. ⚑ Sharpened at the bytes: the
gates above the `$inc` **gate NOT-FOUND only**, so an owner's own draft GET increments a row nobody else can
read. The commissioned act carries **both** of E6's branches — explicit view verb **or** the mutating-GET
policy stated against **RFC 9110 §9.2.1** naming every operation it covers — and neither was chosen here.

**Act 4 — `fr-GalleryDraftsSection B-2` ‡ booked against FW6-G7, statically.** Five limbs, each read: no key
on the create call (`api.ts:372-380`) though the transport carries one (`:138-140`, declared twice at `:98`
and `:210`); the envelope's own docstring declining (`idempotency.py:65`, executed `:68-70`); the plain index
(`database.py:98`) against flags' deliberate `unique=True` (`:140`); **D-2 extended** — `replay_or_record` has
**two** non-test router sites, `:236` **create** and `:612` remix, so the envelope is already installed and
**the key and the index are what is missing**; and the third mechanism, the invariantly-true client gate
(`workspace.ts:102` the only writer, `GalleryView.vue:78-79` the two readers), **cited to F.W3/W4, not
claimed**. **K12 honoured: no probe was spent.**

**Act 5 — §2.8's `R-5`/`G5` ⊕ `E4` row entered under R8, with the open conjunct found by enumeration.** The
fourier half's **shape** conjunct is **already met** (`models/visualization.py:277` remix-child default
`"draft"`, `:183` create default `"draft"`) — stated as conformance, not smoothed into a defect. What this
seat measured that the wave had not: **the EVIDENCE conjunct is absent.** E4 rules *"the rule is not adopted
until both tests exist."* The remix surface is exactly two test files (⟨cmd⟩ `/usr/bin/grep -rln 'remix'
api/tests --include='*.py'`); **neither is a member of the set asserting a visibility** (⟨cmd⟩ `grep -l
'assert.*visibility'` over both → no output); corpus-wide, **zero** files assert a child's visibility; and of
the **12** `_remix(` sites, **8** pass `visibility=` explicitly while the four that do not (`:80` · `:101` ·
`:111` · `:126`) assert `image_slug`/`contour_hash`/`animation_data`, a **401**, a **422** and a **404**.
**The `"draft"` default R8 rules is exercised four times and asserted nowhere.** The create side's
`test_visibility.py:38-46 test_default_draft` is a **MODEL** assertion — no route, no persisted document, no
child — recorded as *existing at the wrong altitude*, never as satisfying G5. The lineage arm was sharpened
the same way: `VisualizationCreate` carries **no `fork_of` field** under `extra="forbid"`, the entity model
holds the slot (`:146`), the only writer is the remix route (`:578-579`), and ⟨cmd⟩ `/usr/bin/grep -c 'remix'
web/src/lib/api.ts` → **0** — **a closed create contract beside an uncalled verb**, not a missing `if`.

**Act 6 — §2.9's `fr-GalleryFeaturedCarousel FR-GFC-3` ⊙ entered RULED-AND-ROUTED, with no act and no
gate.** **F-SS4REST R4 = REMOVE THE AFFORDANCE**, and §2.9's own branch reads *"If DELETE: F.W4's."* — so
**F.W6 books nothing.** The routing was nevertheless stated on **re-measured bytes** so it is falsifiable:
zero like routes by the **non-blind** method; `cursors.py:17`/`:22` and `database.py:111` shipping the sort
key and compound index; `liked_ips` **7 lines over 3 files, every one an exclusion, zero writers**;
`gallery.ts:195 const liked = true;`. ⚑ **Sharpening for whoever lands the retirement: there is no route to
delete** — the fourier-side residue is the counter, the index and the sort key.

**Act 7 — K-1 discharged by arithmetic, not by recitation.** Both decompositions run at this seat, each arm
double-run: bare `@router.` → **30** · `@admin_router.` → **13** · `@app.` → **1** · `@gallery_router.` →
**1** ⇒ **45**; independent total, all-prefix decorators under `api/routers/` → **44** plus the one `@app`
route ⇒ **45**. **The blind form's 30 is published BESIDE the true 45** so the trap is visible rather than
described. **Every absence this unit states is stated over 45 — never 30 alone, never zero.**

**Act 8 — the four rows, §1.d and the `d` stamp appended to `F-W6/burn-register.md`; commit.** Settled bytes
re-measured **after** the write and **double-run identical**: **639 lines / 125,684 B**; line 1 still `SERVED
MODEL: claude-opus-5[1m]`. Table integrity checked mechanically — every one of §1's **10** rows carries
exactly **5** cells under an unescaped-pipe count, and the `id` column FW6-G17 greps now holds **ten** entries
(1 unit-`a` placeholder + 3 `b` + 2 `c` + **4 `d`**).

#### Commit

| commit | meaning | pathspec |
|---|---|---|
| **`087fc5d8`** | `docs(x-f/w6.d): four rows booked — FR-GV-12(+FR-GV-24) · fr-GalleryDraftsSection B-2 · R-5/G5+E4 · FR-GFC-3 ruled-and-routed; FW6-G6/G7 commissioned acts installed` | `docs/tranches/X/fourier/waves/F-W6/burn-register.md` |

⟨cmd⟩ `git show --stat 087fc5d8` → **1 file changed, 117 insertions(+)**. **One commit per meaning**: §2.3
declares no ONE-COMMIT family (only §2.1 does, and §4 lock 3 for the privacy limb), so unit `d`'s four rows —
which are one meaning, *this unit's booking* — land together and this record lands beside. ⟨cmd⟩ `git status
--porcelain -- docs/tranches/X/fourier/waves/F-W6/` → **0**. **`scripts/dev/dev.sh` untouched and unstaged**
— it remains ` M` in the tree and appears in no commit of this unit (⟨cmd⟩ `git show --stat HEAD --name-only |
/usr/bin/grep -c 'dev.sh'` → **0**).

#### Gate readings — BEFORE → AFTER

Every AFTER witness was **re-run post-commit**; all reproduce unchanged, as they must while fourier is
read-only (HEAD `3bac3d52`, **0** dirty, measured again after the landing).

| gate | BEFORE (baseline, this record) | AFTER (this unit) | reading |
|---|---|---|---|
| **FW6-G6** unsafe GET / counter provenance | **RED-AS-EXPECTED** — `find_one` → `$inc` → `_public_doc(doc)` serialises the pre-increment doc; `viewed_ips` → **0** while `liked_ips` → **7** | **RED — commissioned act installed; landing pending** | §3's split verdict applied literally. Act = E6's **two named branches**, neither chosen here, with three bounds carried: the publish self-count is **collateral, not the intended increment** (E6's own ▲); **FR-GV-24's no-re-open-increment lock** is carried into the act *and* into the stamping bar on the evidence cell; and this seat's own bar — **a `viewed_ips` cure may not justify itself by symmetry with `liked_ips`, a surface R4 is retiring**. VV-R2-A's client arm **emitted and measured** (`setVisibility` → 2 hits, **zero call sites**), never claimed. Post-commit re-measure: `:268-270` → `:272` order unchanged; `viewed_ips` → **0** — the read still writes, which is why the gate is RED and not green |
| **FW6-G7** create-path idempotency / dedupe | **RED-AS-EXPECTED** ⟨D-2 minuted⟩ — no `Idempotency-Key` on create; `if not key: return await handler()`; `content_hash` a plain index against flags' `unique=True` | **RED — commissioned act installed; landing pending** | Act = E5's **and/or** — make the standing envelope effective (the key reaches the create call) **and/or** make `content_hash` unique — with **E5's LOCK quoted into the row** (*"a cure that lands one of the three and reports the clause closed has measured the mechanism it chose, not the outcome"*) and installed as a **stamping bar** on the evidence cell. **K12 honoured: closed STATICALLY, zero probes.** D-2 **extended by measurement** — `replay_or_record` at `:236` **create** as well as `:612` remix. Post-commit re-measure: `idempotency.py:68-70` and `database.py:98` reproduce verbatim |

**Two of this unit's four rows turn NO gate, and that is stated in the rows rather than left to inference.**
§2.8's born-visibility/lineage row: **the wave's §3 opens no born-visibility gate** — its GREEN condition is
**F.W5's `G5`** and its evidence is read by **FW6-G17**. §2.9's `FR-GFC-3`: **ruled-and-routed under R4**, so
it turns no gate, books no act, and carries **N/A** — not *PENDING* — in its evidence cell, because there is
nothing for this wave to await.

**No other gate was touched, and none was read as GREEN.** The standing FW6-G16 condition holds at this
seat's clock — ⟨cmd⟩ `git status --porcelain -- api/src src | wc -l` → **0** and ⟨cmd⟩ `git diff --stat --
api/src src` → **empty**, before and after the commit.

#### Locks observed, each with the act that observed it

- **FR-GV-24 — a repair test may NOT assert a re-open view increment** (Act 3). This seat **wrote no test and
  prescribed none.** The lock is carried into the commissioned act **verbatim from v2's bytes** and again
  into the landing-evidence cell as a stamping bar: *"This evidence cell may NOT be stamped from a landing
  whose repair test asserts a re-open increment."* **The defect is SCOPE, not absence** — `viewedHashes`
  works within a session (`GalleryView.vue:46`, `:118-119`), and the row says so.
- **K12 — `fr-GalleryDraftsSection B-2` closes STATICALLY; SS-13 spends no probe** (Act 4). **Zero probes
  were run by this seat on either gated row.** Every limb of FW6-G7's witness is a static read of shipped
  bytes, and the two mechanisms K12 names — the no-header passthrough and the plain index — were read at
  `idempotency.py:69` and `database.py:98`, never observed live.
- **R8 (F-SS4REST) — REMIX + BORN-PRIVATE, fourier half only** (Act 5). The value half (`forks.ts:76`) is
  **named and routed OUT** at unit `i`; **GCM-1's `/v/` routing cure is F.W4's** and is emitted with its
  mechanism measured (`GalleryCardModal.vue:185` emits the asset FK; `GalleryView.vue:396` routes `/w/`);
  the D9 reconciliation is **v2's disclosure and the value.js API row's debt**, not this seat's to re-open.
- **R4 (F-SS4REST) — the like affordance goes to F.W4** (Act 6). **F.W6 books no server act**, turns no gate
  and stamps nothing; the row exists so FW6-G17's **reverse** direction resolves `FR-GFC-3` and its three
  folded witnesses to a wave rather than to silence.
- **K-1 counting lock — cite 45/30/13, never 30 alone or zero** (Act 7). Discharged by **running both
  decompositions**, with the blind form's **30** published beside the true **45**.
- **One home, two citations — the FR-GIG-5 standing bar.** Every client/display arm this unit touched is
  **EMITTED, never claimed**: VV-R2-A's `setVisibility` adoption (F.W4), FR-GV-24's component-local reset,
  E5's client gate and `publishedHashes` misnomer (F.W3/W4), GCM-1's routing repair (F.W4), and D2's
  `aria-pressed` + re-click guard (F.W3/W4). **No F.W1 / F.W3 / F.W4 / F.W5 / F.W8 credit is claimed on any
  of the four rows** — FW6-G17, both directions.
- **Record-qualification (R-5).** `B-2` is written **`fr-GalleryDraftsSection B-2`** in every cell, with the
  homonym `fr-EquationView B-2` named as a DISTINCT identity cited at spec §2.11 row 25, so no
  set-difference collapses the two.
- **E-3 addenda-beside.** Two coordinate drifts recorded **beside** the spec's and the record's spellings
  (`api.ts:371`→`:372`; `viewedHashes` block-vs-statements), **neither corrected over**, and the spec was not
  edited.

#### Disclosures — measured after the commit, recorded rather than smoothed

1. **`database.py:141` exists and is disclosed.** Flags carry **both** the unique compound index (`:140`)
   **and** a plain single-field `content_hash` index (`:141`). The row as written cites `:98` (plain, on
   visualizations) against `:140` (`unique=True`, on flags) and is **accurate as written** — the uniqueness
   lives on the compound — but the honest shape of the contrast is *uniqueness-bearing vs not
   uniqueness-bearing at all*, not *unique vs plain*. Disclosed here so a landing seat reading `:141` does
   not think the row overstated its case.
2. **This seat spent no browser probe and no live run.** FW6-G6's observable magnitude (VV-R2-A probe 4,
   *"born at 1"*) stays **SS-13's and UNPROVEN-NEEDS-LIVE**; FW6-G7 is closed statically by K12. Both REDs
   rest on source-certain reads — a statement order, a store boundary, a docstring executed two lines below
   itself, and an index declaration.

#### Residuals carried forward (none blocking)

1. **The E4 test conjunct is the sharpest thing this unit found and it must reach unit `i`'s letter as an
   ASK, not as a note.** R8's shape is shipped on the fourier side; **the assertion is not**. A courier that
   carries the lineage slot and drops the remix-child born-visibility test leaves R8 **un-adopted by E4's own
   words** (*"the rule is not adopted until both tests exist"*).
2. **`test_default_draft` must not be cited downstream as satisfying G5.** It is a `model_validate_json`
   assertion — no route, no persisted document, no child. Recorded so a close seat greping for
   *"create-visibility test"* does not find it and stop.
3. **D-2's extension changes the SIZE of the B-2 ask, and unit `i` should say so.** The idempotency envelope
   is **already installed on the create path** (`:236`); the ask is a key and an index. A letter that asks
   fourier to "add idempotency to create" mis-describes the tree.
4. **FR-GFC-3's retirement residue has no route in it.** Whoever lands R4 should expect to delete a counter
   field, a compound index (`database.py:111`) and a sort key (`cursors.py:17`, `:22`) — **not** a route,
   because there is none. D2's rule that the four retire together is why the residue matters.
5. **The `viewed_ips`-by-symmetry trap is recorded as a bar, not a design.** `liked_ips` is the obvious model
   for a view dedup and is simultaneously the thing R4 retires. No design was authored here; the bar is in
   the row so the landing seat does not reach for the retiring surface as precedent.

**Escalations: none.** No write was attempted outside the writable set (the two paths the brief names); **no
specified cure was impossible at the bytes** — both gated acts are commissioned asks authored exactly as
§2.3 and v2's E5/E6 word them, §2.8's act is authored as E4/R8 word it, and §2.9 books nothing by the
ruling's own branch; no third diagnose→edit→re-measure occurred on any gate.

**Unit `d` CLOSED. Unit `e` opens** — the moderation band, **admitted not retired** (F-PRODRET: **PRODUCER,
as a PORT**, with the port itself homed at **F.W8**), six rows with **FR-AFP-66 ⊕ FR-AFP-33 in ONE commit**,
**R6 KEEP** the hard-delete arm, **R7 CODEGEN**, **K9's five `?? item.slug` fallbacks STAY**, β's
428-escalation still killed, and **K-1's 45/30/13** carried forward from this unit's Act 7 measurement.

---

### e — the moderation band, ADMITTED not retired

**SERVED MODEL: claude-opus-5[1m]** · seat clock **2026-09-17** · engine **`/usr/bin/grep`** (BSD, the spec's
pinned binary; bare `grep` is ugrep in this shell). Sections executed, exactly as briefed: **§2.4**
(`:193-203` — `FR-AFP-1` ‡⊙ · `FR-AFP-66` · `FR-AFP-7` · `FR-AFP-33` · `FR-AFP-36` ⊕ D17 · `FR-GV-9`) ·
**§3 `FW6-G8`** (`:517`), **`FW6-G10`** (`:519`), **`FW6-G12`** (`:521`) · **§4 locks 3–4** (`:544-545`).
Writes confined to the two paths of the unit's writable set. **Zero fourier bytes · zero value-tree product
bytes.**

#### Acts, in order

**Act 1 — substrate re-measured before any citation (D-19 MEASURE-AT-OPEN).** ⟨cmd⟩ `git -C $F rev-parse
--short=8 HEAD` → **`3bac3d52`** · ⟨cmd⟩ `git -C $F status --porcelain | wc -l` → **0**, both double-run and
re-run again after the last commit. **Unmoved from units `a`–`d`**, so §0.1c's anchor re-resolution holds at
this clock and this unit re-derives none of it. The F.W0 pre-gate is unit `a`'s and was not re-litigated.

**Act 2 — the admission gate consumed as RULED, never re-opened.** COHESION §0j.D **`F-PRODRET` (R3 ≡ D3 ≡
G11): PRODUCER, as a PORT** of value.js's shipped verb, **homed at F.W8**, F.W5 writing the clause. Two
consequences were obeyed rather than interpreted: the band **opens** (§2.4's *"F.W6 may not open the
moderation band unruled"* is discharged **by the ruling**), and **F.W6 does not ship the flag-write
operation** — §2.4's *"If PRODUCER: F.W6 ships the flag-write operation"* is superseded **ON THE HOMING
ONLY**, which is exactly how this record's Owner-gated table already reads it. ⚑ **A seat reading §2.4 alone
would have shipped the port here**, so the supersession is written **in the row**, not only in this receipt.

**Act 3 — `FR-AFP-1` entered ADMITTED-and-ROUTED, its producer-absence ENUMERATED (S-8), not queried.** Five
limbs, each read: the declared request model referenced **nowhere** (`api/models/admin.py:57`, one source
site); **every `db.flags` write repo-wide a migration or a fixture** — the only non-test write is
`api/scripts/migrate_flags_field.py:104`, and the live surface is **read-and-delete only** (`admin.py:530`
aggregate · `:219`/`:358`/`:469`/`:607` delete_many · `janitor.py:234` delete_many); **no client posts a
flag** (`web/src/lib/api.ts` carries the two admin calls `:547`/`:558` and nothing else); **FR-AFP-18
cited** — no total in the `{items, next_cursor, has_more}` envelope (`:587`) and **no `flagged` member** in
`AdminStatsResponse` (`api/models/gallery.py:31-38`); and **value.js HAS the verb**
(`api/src/modules/palette/routes/flags.ts:15`, service + suite named, **read only**). ⚑ **Sharpening for the
F.W8 port seat: there is no route to add a producer *beside* — the collection's entire live surface is two
admin verbs, and §D3's own lock makes `FR-AFP-7`'s identity settlement a PRECONDITION of the port** (*"a
producer that lands with a different flag identity re-opens §D4 at the moment it ships"*).

**Act 4 — `FR-AFP-66` ⊕ `FR-AFP-33` booked as ONE CUT, with the docstring's falsity measured three ways.**
The grace hard-delete is `janitor.py:125 db.visualizations.delete_many({"deleted_at": {"$lt": grace_cutoff}})`
and its pass (`:118-136`) **touches `db.flags` zero times**; the only flags delete in the janitor is `:234`,
**reporter-keyed**, which cannot reach a flag whose reporter is alive. The `softdelete.py:3-4` docstring is
false in **three** distinct ways, and this seat measured each rather than repeating the spec's one:
**(a)** `pinned_cron` carries **zero flags-collection code** (⟨cmd⟩ `grep -c 'flag'` → **1**, and that one
line is `:1`, the module summary's own word — *the count and the fact disagree, which is why the line is
printed rather than the digit*); **(b)** ⚑ **`cron_prune` is not even the function that hard-deletes
visualizations past grace** — that is `janitor.py:125`'s inline `delete_many`, while `cron_prune` runs on
`db.contours` (`:153`) and `db.images` (`:157`); **(c)** ⚑ the docstring's third name **does not exist**:
⟨cmd⟩ `/usr/bin/grep -rn 'def hard_delete_past_grace' $F | wc -l` → **0** — it is *not un-exported, it is
unwritten*. And ⚑ **the cure's shape is already in tree ~100 lines above the defect**: `admin.py:214-219`,
the admin `?hard=true` grace-bypass, is the **only** `content_hash`-keyed flag cascade in the repo — **lift
it, do not invent one** (KISS). `FR-AFP-33`'s two halves were read at the same bytes: the pipeline is a
**single `$group`** with a `$push` at `:537` and **no `$slice` anywhere in the API** (**0**, double-run), and
**no `$match`** — the whole `flags` collection is grouped *before* the page join at `:552`, so the cost is
**O(|flags|) per page request**; the counterweight `550: if not flagged:` is preserved by command, which is
why the producer ruling changes the row's **weight**, not its content.

**Act 5 — `FR-AFP-7` booked; the fan-out exhibited rather than asserted.** `:590` declares a slug-labelled
route; `:600` resolves the entity **and discards it**; `:607` executes `delete_many({"content_hash": …})`.
The index makes the fan-out by design — `database.py:140` unique on **(digest, reporter)** while the
entity's own digest index is **plain** (`:98`) — and the listing then hands **each** of the N siblings the
whole count (`:552` `$in` join → `:572`/`:576`). ⚑ **Sharpening: nothing has to be decided about what a
digest IS — both ends already say it.** `api/models/visualization.py:113` *"substrate, never identity"* and
`web/src/lib/types.ts:211` *"dedup key, never identity (§1)"*; the flags collection keys on it anyway.
**FR-AFP-8's arm is CITED and measured, never claimed** — the five asset-FK spends at `:175`/`:202`/`:212`/
`:222`/`:224` — and **K9 was observed to the letter: this seat deleted nothing and prescribed no deletion.**

**Act 6 — `FR-AFP-36` ⊕ the D17 serializer clause booked; the dead-model set measured by REFERENCE.** The
checked-shape split reproduces exactly (**1** `response_model` against **13** admin decorators, the one
being `/stats` and **neither of this row's two operations**). The three dead models were not copied from the
clause — each was traced: **`FlagRequest`** and **`FlaggedListResponse`** have **zero references of any
kind**, and **`FlaggedEntryInfo`** (`:69`) ⊕ **`FlagInfo`** (`:62`) are reachable **only** from
`FlaggedListResponse`, so the **deletion closure of the flagged family is four**, not three (v2 A4's *three*
is the root count plus the rotted field-carrier). ⚑ **And the twins drifted in OPPOSITE directions**: the
wire emits `content_hash` (`:577`) and the **client** twin omits it (`types.ts:152-161`; 81 server sites vs
2 client sites) while the **server's** dead model says `user_slug` where the wire says `owner_slug` and
`total/page/pages` where the wire ships the cursor envelope the client's own comment already describes
correctly. **The client is right about the envelope and wrong about the join key; the server's models are
wrong about both** — A4's structural-cause limb exhibited, not asserted.

**Act 7 — `FR-GV-9` booked with the FR-GFC-20 server rider travelling IN the cure.** The unconditional
`$set` is `:436-439` (filter = slugs ⊕ liveness, **never the current tier**); `set_tier` writes
`:181-183` and nothing else; and the flagged listing's only `"tier"` is the **emitted field** `:577`, never
a predicate (⟨cmd⟩ over the handler's own bytes → **1**). The rider was measured, not recited: the batch
handler returns `:448 {"ok": True, "affected": affected}` while the wire twin declares
`errors?: string[]` (`types.ts:191-195`) and the server **has never heard of the field** (⟨cmd⟩
`BatchResponse|errors=` over the API, non-test → **0**, double-run); the delete arm's per-slug loop
(`:425-428`) counts successes and drops failures silently. ⚑ **Same batch write, same cure — a conditioned
`$set` that silently drops rows while the envelope reports success is not a stated transition**, which is
why the rider is burned WITH FW6-G10 and **not re-booked** (it is banked at `fr-AdminUserList FR-AUL-13`).

**Act 8 — the six rows, §1.e and the `e` stamp appended to `F-W6/burn-register.md`; five commits.** Settled
bytes re-measured **after** the last write and **double-run identical**: **728 lines / 169,241 B**; line 1
still `SERVED MODEL: claude-opus-5[1m]`. Table integrity checked mechanically — **every row of §1 carries
exactly 5 cells** under an unescaped-pipe count (rows 349–364 checked, **zero** deviations), and the `id`
column FW6-G17 greps now holds **sixteen** entries (1 unit-`a` placeholder + 3 `b` + 2 `c` + 4 `d` +
**6 `e`**).

#### Commits

| commit | meaning | pathspec |
|---|---|---|
| **`ef284298`** | `docs(x-f/w6.e): FR-AFP-1 entered ADMITTED-and-ROUTED — the band opens under F-PRODRET and the flag-write PORT is homed at F.W8, producer-absence enumerated at the bytes` | `docs/tranches/X/fourier/waves/F-W6/burn-register.md` |
| **`01d36470`** | `docs(x-f/w6.e): FR-AFP-66 ⊕ FR-AFP-33 booked as ONE CUT — content_hash cascade at grace hard-delete ⊕ the docstring correction ⊕ the $slice/scoped aggregate; FW6-G8's three conjuncts installed as one act` | same |
| **`f411a369`** | `docs(x-f/w6.e): FR-AFP-7 booked — flags key the ENTITY and the dismiss scope follows; FR-AFP-8's identity arm cited with K9's five fallbacks measured and kept` | same |
| **`39c02c50`** | `docs(x-f/w6.e): FR-AFP-36 ⊕ the D17 serializer clause booked — one generated/checked shape under R7, the dead models' deletion closure measured, one serializer; FW6-G12's act installed` | same |
| **`af053a3b`** | `docs(x-f/w6.e): FR-GV-9 booked — a tier-conditioned $set plus the listing's tier predicate, with FR-GFC-20's server rider travelling in the same cure; FW6-G10's act installed` | same |
| **`121dd4f1`** | `docs(x-f/w6.e): §1.e seat block — the band's counts double-run with their honest readings, the one-cut rationale, the five undecided questions named; unit e stamped` | same |

**One commit per meaning, and the family did not split.** §4 lock 3's **`FR-AFP-66` ⊕ `FR-AFP-33`** landed
in **one** commit (`01d36470`) — *cascade without bound leaves the cost; bound without cascade leaves the
growth* — and the other four meanings (the band's admission-and-routing · flag identity · the contract
shape ⊕ serializer · the tier transition ⊕ its rider) are each a commit of their own, because each is a
separate obligation with a separate stating clause. ⟨cmd⟩ `git status --porcelain --
docs/tranches/X/fourier/waves/F-W6/` → **0**. **`scripts/dev/dev.sh` untouched and unstaged** — it remains
` M` in the tree and appears in **no** commit of this unit (⟨cmd⟩ `git show --stat HEAD --name-only |
/usr/bin/grep -c 'dev.sh'` → **0**, run on each). ⟨*a concurrent Track seat committed `62ccf4a1`
(`ci(release): …`) between this unit's fifth and sixth commits — other tracks write this tree beside us by
pathspec, which is why `-A` is never used*⟩

#### Gate readings — BEFORE → AFTER

Every AFTER witness was **re-run post-commit**; all reproduce unchanged, as they must while fourier is
read-only (HEAD `3bac3d52`, **0** dirty, measured again after the last landing).

| gate | BEFORE (baseline, this record) | AFTER (this unit) | reading |
|---|---|---|---|
| **FW6-G8** flag cascade at hard delete | **RED-AS-EXPECTED** — `grep -c "flags" pinned_cron.py` → **0**; the softdelete docstring names that module as cascade owner; the only live cascade is the reporter-keyed `janitor.py:234` | **RED — commissioned act installed; landing pending** | §3's split verdict applied literally. The act carries **all three** of G8's GREEN conjuncts — cascade ⊕ **docstring correction** ⊕ **a test covering the entity-keyed path** — and the third is installed as a **stamping bar**: §2.4's *"Coverage obligation → F.W9/W10"* routes the coverage **programme**, so a landing that ships the cascade and defers the entity-keyed fixture leaves **G8 RED by its own words**. Two findings sharpen the docstring arm beyond the spec's: `cron_prune` is the **wrong owner** for the grace pass (`janitor.py:125` is the real one), and `hard_delete_past_grace` is **unwritten**, not un-exported. Post-commit re-measure: `pinned_cron` flags code **0**; `:125` unchanged |
| **FW6-G10** tier transitions are stated transitions | **RED-AS-EXPECTED** — `:438 {"$set": {"tier": "normal", …}}` unconditional inside the batch `update_many`; `set_tier` writes `{tier, updated_at}` only; the flagged listing carries no tier predicate | **RED — commissioned act installed; landing pending** | Act = the server **states the transition**: a `$set` **conditioned on the current tier** ⊕ **the inverse verb** ⊕ **the listing's tier predicate**, with **FR-GFC-20's server rider in the same cure** (partial batch failures must stop reporting green). **β's 428-escalation stays killed** and is named as unreachable-for: `set_tier`'s existing `require_if_match` (`:179`) is real and is **not** the missing predicate — recorded so a landing seat does not sell the ETag guard as the cure. No mechanism was chosen between a filter-side predicate and a read-then-write. Post-commit re-measure: `:438` unchanged; the handler's only `"tier"` is still the emitted field |
| **FW6-G12** one checked shape / one serializer | **RED-AS-EXPECTED** — exactly **1** `response_model` (`:110 /stats`) against **13** admin decorators; the flagged listing hand-built through `:92 json.dumps(body, default=str)` while audit returns the Pydantic `AuditListResponse` | **RED — commissioned act installed; landing pending** | Act = **ONE generated/checked shape ⊕ the dead models deleted ⊕ ONE serializer**, as **one act** under A4's lock (*"The generation and the deletion are one act"*) and D17's (*"the cure is a posture in the contract, not a guard in each consumer"*). **R7 = CODEGEN lifts the ⊙ for the codegen half only**; **`FR-AFP-71`'s module-split half stays ⊙ and is recorded open, never presumed**. **K9 observed**: the five `?? item.slug` fallbacks **STAY**, and the row says why (`:578` emits `doc.get("image_slug")` through an unvalidated body). The dead set was measured by reference-closure (**four** in the flagged family) rather than copied. Post-commit re-measure: **1 / 13** reproduces; `:92` and `:652` unchanged |

**Three of this unit's six rows turn NO gate, and that is stated in the rows rather than left to inference.**
`FR-AFP-1` is **ADMITTED-and-ROUTED** — the ruling opens the band and homes the port at **F.W8**, so there
is no F.W6 act and no F.W6 gate, and its evidence cell carries **N/A**, not *PENDING*, because there is
nothing for **this** wave to await. `FR-AFP-33` rides **FW6-G8**'s one-cut commit (§3 opens no gate for the
bound). `FR-AFP-7` settles an identity that **§D3's lock makes a precondition of the F.W8 port** rather than
a gate of this wave. All three are read by **FW6-G17**.

**No other gate was touched, and none was read as GREEN.** The standing FW6-G16 condition holds at this
seat's clock — ⟨cmd⟩ `git diff --stat -- api/src src` → **empty** and ⟨cmd⟩ `git status --porcelain --
api/src src | wc -l` → **0**, before and after every commit.

#### Locks observed, each with the act that observed it

- **Admission gate RULED PRODUCER — and the PORT is F.W8's** (Acts 2–3). The band opened; **the flag-write
  operation was NOT shipped here**, and §2.4's contrary sentence is marked **superseded on the homing only**
  in the row itself, because a seat reading §2.4 alone would have shipped it.
- **ONE-CUT `FR-AFP-66` ⊕ `FR-AFP-33`** (Act 4, commit `01d36470`). One commit, and **both evidence cells
  carry the same stamping bar** — *one landing, or neither cell is stamped.*
- **K9 — the five `?? item.slug` fallbacks STAY** (Acts 5–6). ⟨cmd⟩ → **5**, measured; **this seat deleted
  none and prescribed no deletion**, and the FW6-G12 evidence cell bars a landing that removes them under a
  *"the generated type says it is non-null"* argument while `:578` still emits the field unvalidated.
- **R6 KEEP the hard-delete arm** (Act 4). The cascade is burned **as a build, not a deletion**; D6's lock
  is carried verbatim — *"Truthful copy is the cure; deletion would have been the workaround."*
- **R7 CODEGEN** (Act 6). The ⊙ is lifted **for the codegen half only**; A4 limb 3 is cited as *"an
  amendment stated in the open"*, never as a silent reversal of inv-26, and **the module split stays ⊙**.
- **β's 428-escalation stays killed** (Act 7). Named as unreachable-for, with `require_if_match` (`:179`)
  disclosed so the existing ETag guard is not mistaken for the missing predicate.
- **FR-GFC-20's server rider travels with the G10 cure and is never re-booked** (Act 7). It is banked at
  `fr-AdminUserList FR-AUL-13` (R-5 one-home law) and enters as a **rider** in `FR-GV-9`'s id cell.
- **One home, two citations — the FR-GIG-5 standing bar.** Every client/display arm this unit touched is
  **EMITTED, never claimed**: FR-AFP-8's one-token label, FR-AFP-9 / FR-GV-34's truthful copy, FR-AFP-33's
  collapse (F.W1/W3), FR-AFP-70's reflect-and-disable, FR-AFP-59's tier render, FR-GFC-20's stale-slug
  pruning (F.W4), `FR-AUL-17`'s shared formatter (banked → F.W3, **not re-booked**), and **`FR-GFC-4`'s
  `tier` param, which is F.W8's and is explicitly NOT fused with this row's listing predicate**.
- **Record-qualification (R-5).** `fr-GalleryFeaturedCarousel FR-GFC-20` · `fr-AdminUserList FR-AUL-13` ·
  `fr-AdminUserList FR-AUL-17` · `fr-GalleryCard L·M-4 / D-13 / C-8(a) + L·D-2 / C-12` · `fr-ContourSettings
  B-1 / L-B1 / C-2` — the last spelled with its record precisely because `L-B1` also names
  `fr-FourierShapeExtractor`'s TRIPWIRE identity (unit `g`'s) and `fr-FunctionInput`'s.
- **K-1 counting lock.** The *"1 of 13"* figure is **admin-scoped by name**; the repo total **45** (30 bare
  ⊕ 13 admin ⊕ 1 `@app.` ⊕ 1 `@gallery_router.`) is carried from unit `d`'s Act 7 — **45/30/13, never 30
  alone and never zero**.
- **E-3 addenda-beside.** Two coordinate readings recorded **beside**, never over: FR-AFP-9's *"restore
  route live at `:430`"* resolves in `visualizations.py`, not `admin.py` (§0.1c's addendum **consumed, not
  re-derived**), and the batch delete loop is `:425-428` where a first reading said `:426-429`. The spec was
  not edited.

#### Disclosures — measured after the commits, recorded rather than smoothed

1. **The dead-model count is a ROOT count, and the deletion closure is larger.** v2 A4 names three
   (`FlagRequest` · `FlaggedEntryInfo` · `FlaggedListResponse`). At the bytes, `FlaggedEntryInfo` and
   `FlagInfo` are reachable **only** from `FlaggedListResponse`, so the flagged family's deletion closure is
   **four**. Beyond it, **`GalleryCursorResponse` (`:118`) → `CursorInfo` (`:113`) are dead by the identical
   measure** and sit **outside this clause's named set** — **cited for the landing seat, NOT booked, and NOT
   added to the act's scope by this seat**, because expanding a clause's deletion set is a ruling, not a
   measurement.
2. **A naive grep convicts two of this unit's own figures, so both are published with their readings.**
   `FlagRequest` unfiltered returns **2** (the second a `__pycache__` **binary**); `pinned_cron`'s `flag`
   count returns **1** (the module summary's own word). A landing seat re-running either bare probe would
   read the model as bound and the module as flags-aware; both are false.
3. **This seat spent no browser probe and no live run.** FR-AFP-33's aggregate magnitude and β's sort-index
   note stay **SS-13's and UNPROVEN**; every witness above is a static read of shipped bytes — a pipeline
   with no `$match`, an index declaration, a docstring naming a function that does not exist, and a wire
   twin missing its own join key.

#### Residuals carried forward (none blocking)

1. **FW6-G8's third conjunct must reach unit `i`'s letter as an ASK, not a note.** G8's GREEN names a test
   over the **entity-keyed** path; the repo's only orphan-flag test is **reporter-keyed**
   (`test_janitor_audit.py:306`/`:319`/`:327`). A courier that asks for the cascade and the docstring and
   drops the fixture leaves the gate RED **by the gate's own words**, and §2.4's *"Coverage obligation →
   F.W9/W10"* does not cover it — that clause routes the programme, not this conjunct.
2. **`FR-AFP-7`'s settlement gates the F.W8 port.** §D3's lock is explicit: *"a producer that lands with a
   different flag identity re-opens §D4 at the moment it ships."* Unit `i`'s letter should say so in the
   **port's** paragraph, not only in the flag-identity one, or F.W8 may write the port first.
3. **The cure for `FR-AFP-66` is a LIFT, and the letter should name the source.** `admin.py:214-219` is the
   only `content_hash`-keyed cascade in the repo. An ask phrased as *"add a flags cascade to the janitor"*
   invites a second, divergent implementation of a shape that already exists twenty files away.
4. **The docstring correction has three falsehoods to cure, not one.** Wrong owner (`cron_prune` vs the
   janitor's inline grace pass), no cascade at all, and a named function (`hard_delete_past_grace`) that
   does not exist. A landing that fixes only the third sentence leaves the module still teaching the wrong
   model — which is the §B3 indictment D8's lock names, appearing in a different file.
5. **`FR-AFP-71`'s module split is still ⊙ and is now the band's only unruled question.** R7 answered the
   codegen half; the split half sits under a measured god-module pair (**672** / **391**) and **no design
   exists for it in this wave**. A close seat reading *"R7 ruled"* must not read the split as ruled with it.

**Escalations: none.** No write was attempted outside the writable set (the two paths the brief names); **no
specified cure was impossible at the bytes** — all five burned rows are commissioned asks authored exactly
as §2.4 and v2's D3/D4/D5/D6/D7/D8/D17/A4 word them, and `FR-AFP-1` books no act by the ruling's own homing;
no third diagnose→edit→re-measure occurred on any gate.

**Unit `e` CLOSED. Unit `f` opens** — the audit actor (**FW6-G9**), one row, with **AA-10 CITED to F.W4 and
never booked**, **AA-23 a KILL-ONLY carry** whose host row is held at F.W5, and ▲ **K-6's METHOD LOCK**:
`grep "log_audit("` is structurally **blind** to the inlined second writer at `janitor.py:59-99` — enumerate
with S-8, exactly as this unit enumerated the flags producer rather than querying for one name.

#### Erratum — the seat clock, measured after the fact

⌧ **DATE ERRATUM — corrected BESIDE, never over (E-3), because a stamp is a figure and WRITE-THEN-MEASURE
binds the clock too.** Every cell of this unit reads *seat clock **2026-09-17***, which is the **wave's OPEN**
clock (seat 0, 22:56 EDT) carried forward from units `a`–`d`. Measured at the settled bytes, **unit `e` sat
entirely after midnight**: ⟨cmd⟩ `git show -s --format='%h %ad' --date=format:'%Y-%m-%d %H:%M' <sha>` →
`ef284298` **2026-09-18 00:09** · `01d36470` **00:11** · `f411a369` **00:11** · `39c02c50` **00:12** ·
`af053a3b` **00:13** · `121dd4f1` **00:14** (and this unit's record receipt `e3e2aaf3` **00:17**). **No
measurement is affected** — fourier stood at `3bac3d52` with **0** dirty paths before, during and after every
act, re-read post-commit — but an un-measured figure is precisely what this wave's laws convict, so the
correction is published rather than smoothed. **Read every in-row *2026-09-17* of §1.e and the `e` stamp's
*CLOSED 2026-09-17* as the SEAT-OPEN clock; the SETTLE clock is 2026-09-18.** Nothing above is rewritten.

---

### f — the audit actor: the FIELD and the SEAM, one act

**SERVED MODEL: claude-opus-5[1m]** · seat clock **2026-09-18** · engine **`/usr/bin/grep`** (BSD, the
spec's pinned binary; bare `grep` is ugrep in this shell). Sections executed, exactly as briefed: **§2.5**
(`:204-209` — `AA-10` **CITED** ⊕ `AA-5`'s server arm; `AA-6` · `AA-23` · `AA-24` cited) · **§3 `FW6-G9`**
(`:518`). Writes confined to the two paths of the unit's writable set. **Zero fourier bytes · zero
value-tree product bytes.**

⌧ **The clock is stated from this seat's own measurement, not inherited.** Unit `e`'s erratum above found
its in-row *2026-09-17* was the wave's OPEN clock while the unit actually sat after midnight. This unit
**measured first and stamped after**: its register commit is ⟨cmd⟩ `git log -1 --format='%h %ad'
--date=format:'%Y-%m-%d %H:%M'` → **`69e5333e` 2026-09-18 00:33**, so **2026-09-18** is the settle clock
and the seat clock both, in the row, in §1.f and in the §2 stamp. No correction-beside is owed.

#### Acts, in order

**Act 1 — substrate re-measured before any citation (D-19 MEASURE-AT-OPEN).** ⟨cmd⟩ `git -C $F rev-parse
--short=8 HEAD` → **`3bac3d52`** · ⟨cmd⟩ `git -C $F status --porcelain | wc -l` → **0**, both double-run
and re-run again after the commit. **Unmoved from units `a`–`e`**, so §0.1c's anchor re-resolution holds at
this clock: its janitor row (`:56` sentinel · `:95` the write · `:59` the second writer · `:133`/`:285` two
of the nine actions) and its `AdminAuditLog.vue:146` row were **consumed** from that table and re-read at
the bytes — **never re-derived as a rival act** (§4's F.W0 edge, R-9.1). The F.W0 pre-gate is unit `a`'s
and was not re-litigated.

**Act 2 — the carry read as the canonical homes it, before anything was written.** `AA-10` is **CITED to
F.W4 and booked nowhere**; what travels is the **`F.W5–W8` actor-field contract leg, under the holder's
id** (R4-6.1). ⟨cmd⟩ `/usr/bin/grep -oE '`AA-10`.*legs: F\.W5-W8</sub>' "$C"` → the canonical row homing it
**F.W4 <sub>legs: F.W5-W8</sub>**, and ⟨cmd⟩ `/usr/bin/grep -o 'the actor-field contract question \*\*→
F\.W5–W8\*\*\.' $G/fr-AdminAuditLog.md` → *"the actor-field contract question **→ F.W5–W8**."* — the record
naming the split in its own hand. The identity this row **BOOKS** is therefore `fr-AdminAuditLog` **AA-5**'s
**server arm**, whose canonical home is the band itself (⟨cmd⟩ `… '`AA-5`.*legs: F\.W4</sub>'` →
**F.W5-W8 <sub>legs: F.W4</sub>**) with the **display leg at F.W4**. `AA-6` · `AA-24` are cited; `AA-23` is
**kill-only**, its host row held at **F.W5** (⟨cmd⟩ `… '`AA-23`.*`F\.W5` \| \*\*F\.W5\*\*'` → the canonical
row, **no band leg at all**). **R-5 observed**: ⟨cmd⟩ a per-id `grep -rlE` loop over the 66 frozen records
returns **one** file for each of the five — `fr-AdminAuditLog.md` — so **no homonym exists** and the
qualification is exact rather than decorative.

**Act 3 — the absence-proof written to the S-8 bar, not to the killed one.** The `actor` field's absence
was proved by **enumerating the surface**: the model's whole shape (⟨cmd⟩ `sed -n '94,98p'
models/admin.py` → four fields, `timestamp · action · target · ip_hash`), the **wire twin's** whole shape
(`types.ts:173-178`, the same four), and then the token itself across the entire server tree — ⟨cmd⟩
`/usr/bin/grep -rnE '(^|[^a-zA-Z_])actor([^a-zA-Z_]|$)' $F/api --include='*.py' | wc -l` → **5**
(double-run), **every one of them prose** (two janitor comments, two test assertion messages, one
comment). **Not one is an identifier, a field, a column or a query key on either side of the wire.**

**Act 4 — K-6 demonstrated at the bytes rather than asserted.** ⟨cmd⟩ `grep -c 'log_audit('
services/janitor.py` → **0** over a file that inserts an audit row at `:92`; the same probe over the admin
router → **11**. **A seat trusting the killed method concludes the collection has one writer.** The
blindness is **lexical**: `_log_janitor_audit` does not contain the substring `log_audit(`. The S-8 form —
⟨cmd⟩ `grep -rnE 'admin_audit\.(insert_one|insert_many|update_one|update_many|replace_one|bulk_write)'` —
returns **three** sites, **two** of them production (`admin.py:75` inside `log_audit`, `janitor.py:92`
inside the inlined writer) plus one fixture.

**Act 5 — the vocabulary measured whole, both writers.** Nine `janitor:*` action **literals** (⟨cmd⟩
`grep -o '"janitor:[a-z_]*"' | sort -u | wc -l` → **9**, double-run), **including the audit log pruning its
own history** (`:276`, the 90-day window at `:274-275`); the admin writer emits **ten more forms from ten
call sites** (**7** single-line ⊕ **3** multi-line at `:366`/`:444`/`:497`). **Nineteen action forms, two
writers, declared in no single place** — and the reader's tone map (`AdminAuditLog.vue:67-80`) has four
arms plus a default and **no `janitor:` arm at all**, so all nine destructive sweeps render benign.

**Act 6 — the commissioned act authored as ONE act with two limbs.** **(1) THE FIELD** — `AuditEntry`
gains an `actor` field of its own, the system actor becomes a **value** of it, **both writers populate
it**, `ip_hash` stops carrying identity, and the **wire twin moves in the same act** (R7 = CODEGEN cited
**for the twin's shape only**; `FR-AFP-36`'s codegen row is unit `e`'s and is **not re-booked**).
**(2) THE SEAM** — the janitor's inlined writer routed through the shared `log_audit` seam and its nine
actions through **D16's declared taxonomy**. The two do not separate, and the row's *Not stamped by* cell
says so first. ⚑ **The finding that makes this act landable rather than merely correct**: the test suite
**pins the defect** — ⟨cmd⟩ `sed -n '88,93p' test_janitor_audit.py` → `:91 assert set(fields) ==
{"timestamp", "action", "target", "ip_hash"}`, an **exact set equality that adding `actor` turns RED by
construction** — and ⟨cmd⟩ `grep -n '== "system:janitor"'` → `:213` and `:350` pin the sentinel in the
privacy column. **The act carries the test's migration as part of itself**, because a green test asserting
the defect is not evidence, and leaving it green is precisely how this seam stayed one-sided (AA-44).

**Act 7 — the kill carried, and a measurement published that does not revive it.** AA-23's regex-action
cure stays **REJECTED**: the collection ships exactly **2** indexes (⟨cmd⟩ `grep -c
'admin_audit.create_index' database.py` → **2** — `[("timestamp", -1)]` and `[("action", 1),
("timestamp", -1)]`), and an unanchored `$options:"i"` regex cannot use the second. ⊘ **Disclosed rather
than smoothed**: the collection is **not** unbounded — `janitor.py:274-276` prunes at **90 days** — and
**the kill stands regardless**, because the index argument is size-independent and the retention sweep is
itself one of the nine un-declared actions. **AA-6's order (a) → (b) → (c) is carried as an ORDER, not a
menu.**

**Act 8 — the receipts run before they were banked; two of this seat's own did not reproduce.** **(i)** the
record's routing sentence, first cut with the period pulled **inside** the emphasis, returned **EMPTY** —
the exact drift class §2.5 convicts — and was re-cut to the bytes' form (period **outside**); **(ii)** the
test's sentinel assertion, first cut as `'ip_hash. == .system:janitor'`, returned **EMPTY** (`ip_hash"] ==
"` carries **two** characters where the pattern allowed one). ⊕ **a third class caught before it banked**:
three canonical citations first written as bare `**F.W4** <sub>legs: …</sub>` patterns are **not
row-specific** — each matches every census row with that homing — and all three were re-cut **row-scoped**.
All corrections are **published in the register beside the cured commands**, never silently.

#### Commit

| commit | meaning |
|---|---|
| **`69e5333e`** | `docs(x-f/w6.f · AA-5 server arm)` — the register's §1 row, §1.f's commentary (the identity table · the 12-figure double-run table · K-6 demonstrated · the two receipt cures · the two errata-beside · the five non-decisions · the V-γ composition) and the §2 `f` stamp, **one commit, one meaning**: the FIELD and the SEAM are one act under E18 ⊕ D16 and do not split |

Pathspec only (`docs/tranches/X/fourier/waves/F-W6/burn-register.md`); other tracks were writing
`INBOX.md`, `CARRY-LEDGER.md` and two untracked evidence dirs concurrently and **not one of them was
staged**. `scripts/dev/dev.sh` untouched.

#### Gate readings — BEFORE → AFTER

The AFTER witness was **re-run post-commit**; it reproduces unchanged, as it must while fourier is
read-only (HEAD `3bac3d52`, **0** dirty, measured again after the landing).

| gate | BEFORE (baseline, this record) | AFTER (this unit) | reading |
|---|---|---|---|
| **FW6-G9** the actor field | **RED-AS-EXPECTED** — `janitor.py:56` `_JANITOR_ACTOR = "system:janitor"` written into `ip_hash` at `:95`, rendered `system:jan` by `AdminAuditLog.vue:146`'s unconditional `.slice(0, 10)`; `admin_audit` carries **no** actor field; the second writer at `janitor.py:59-99` bypasses `log_audit` entirely | **RED — commissioned act installed; landing pending** | §3's split verdict applied literally. The gate's GREEN is *"An `actor` field exists and **both** writers populate it"* — **neither conjunct is satisfiable without a fourier byte**, and this wave moves none, so the honest reading is RED-with-the-act-installed. Post-commit re-measure, double-run: the model still carries **4** fields and **0** `actor` (⟨cmd⟩ `sed -n '95,98p' models/admin.py \| grep -c ': '` → 4; `\| grep -c 'actor'` → 0) and `grep -c 'log_audit(' janitor.py` → **0**. ▲ **Both of the gate's own method locks were obeyed and are visible in the row**: the writer set was enumerated by **S-8** (`admin_audit` write verbs), never by the **K-6-killed** `grep "log_audit("`, and that killed probe's failure is published as a figure rather than described; and **AA-23's regex-action cure is carried as a KILL**, with AA-6's (a)→(b)→(c) order intact |

**No other gate was touched, and none was read as GREEN.** The standing FW6-G16 condition holds at this
seat's clock — ⟨cmd⟩ `git diff --stat -- api/src src` → **empty** and ⟨cmd⟩ `git status --porcelain --
api/src src | wc -l` → **0**, before and after the commit.

#### Locks observed, each with the act that observed it

- **AA-10 CITED to F.W4, never booked** (Act 2). The row's id cell opens with the citation and the
  canonical receipt; **only the `F.W5–W8` leg travels, under the holder's id**, and the §2 stamp repeats it
  so no close seat infers a booking from the gate's title.
- **AA-23 KILL-ONLY, host row held at F.W5** (Acts 2, 7). Marked as a citation *in the cell that carries
  it*, with the canonical row showing **F.W5 and no band leg** — *a killed sub-claim never kills its host
  row*, and the regex cure stays rejected on the index argument.
- **K-6 METHOD LOCK** (Act 4). The killed probe was **run and published as a zero** beside the S-8
  enumeration that sees the writer — the lock demonstrated, not paraphrased.
- **Display arms are F.W4's** (Act 6, and the row's ⊘ cell). The sentinel-aware branch, the legend, the
  display taxonomy and the placeholder's wording are **emitted, never claimed**; the placeholder
  sharpening (`delete` hits exactly, `set_tier` can never hit) is entered **as evidence for F.W4**.
- **AA-44 → F.W9/W10** (the row's ⊘ cell). The coverage obligation is emitted with its canonical homing
  receipt and claimed nowhere here.
- **V-γ composed, not booked** (the row's tail, §1.f's closing paragraph). `lane-crud §R-7` is **one**
  clause with two burn seats; the fourier seat is this row, and the value half leaves at **unit `i`'s**
  routing receipt. **No double-booking** (§4 lock 2).
- **Census freeze** — the canonical at `f44362757458` was the only census operand; **no roster integer was
  re-derived**, and the three multiplicities behind the row-scoping cure were deliberately **not banked**
  (R3-3.10 admits a banked count only over the frozen `fr-*.md` corpus).
- **Probe parsimony** — **zero** browser/DevTools probes. Every witness is a static read of shipped bytes;
  the one cost question in reach is answered by index shape, which is size-independent, so **SS-13 was not
  invoked**.

#### Disclosures — measured after the commit, recorded rather than smoothed

- **D-6 · v2 §D16's janitor ⟨cmd⟩ returns TEN lines, not nine.** `grep -o 'janitor:[a-z_]*' | sort -u`
  picks up the bare `janitor:` of the docstring's ``janitor:<sweep>`` at `:71` (the `<` falls outside
  `[a-z_]`). **The clause's FIGURE — nine emitted actions — is true and reproduces**; only its command's
  raw output is not nine lines, and the quoted-literal form (`'"janitor:[a-z_]*"'`) prints exactly the
  nine. **The clause set is F.W5's and this seat does not edit it** (E-3); the correction is an
  addendum-beside in the register row and in §1.f.
- **D-7 · the e2e denominator is EIGHT at today's bytes, not nine.** `fr-AdminAuditLog.md:87` and §4's
  F.W9/W10 cross-edge both read *"nine e2e specs"*; ⟨cmd⟩ `find $F/web -name '*.spec.ts' -not -path
  '*/node_modules/*' | wc -l` → **8** (double-run). **The record is frozen and is not amended here.** The
  substance reproduces exactly: the record's *"4 prose-only `audit` hits"* is a **character-match** to
  today's **4**, and **0** spec files name the audit tab — so AA-44's finding is unchanged on either
  denominator and only the denominator drifted.
- **D-8 · two of this seat's own receipts did not reproduce and were cured before the commit** (Act 8),
  with a third class — non-row-specific canonical patterns — caught before it banked. All three cures are
  published beside the cured commands, because *the law is discharged by running it, not by wearing it*.

#### Residuals carried forward (none blocking)

1. **The landing itself.** `FW6-G9` stays **RED** until the fourier sub-session lands the field ⊕ the seam
   (COMMISSION §2). The evidence cell reads **PENDING** and its *Not stamped by* list is the acceptance
   bar — including **the test migration**, so a landing that leaves `test_janitor_audit.py:91`'s set
   equality green has **not** turned this gate.
2. **The field's schema is unchosen and deliberately so** — name, type, nullability, and what the admin
   writer puts in it for an authenticated operator are the fourier API row's under its own contract. The
   row states the obligation, never the schema.
3. **`log_audit`'s signature** (10 call sites) and the **taxonomy's mechanism** (enum / constant table /
   generated module) are unchosen; **R7 is cited for the WIRE TWIN's shape only**.
4. **AA-6's (a) placeholder arm and every other display arm are F.W4's**, carried as emissions in the row
   and owed a reciprocal in F.W4's own record, not here.
5. **AA-44's coverage programme is F.W9/W10's**, and the one-sided seam it names is now **documented with
   its cause** (the backend pins the janitor's half; the tab has no test at all) so the coverage wave
   inherits the diagnosis rather than re-deriving it.
6. **For unit `i`'s FW6-G17 closure**, this row's identities resolve as: `AA-5` **booked** · `AA-10`
   **cited-to-holder (F.W4)** · `AA-6` **cited** · `AA-23` **cited-to-holder (F.W5), kill-only** · `AA-24`
   **cited (F.W4)** · `AA-44` **emitted (F.W9/W10)** — tabulated at §1.f so the closure reads it rather
   than re-deriving it.


---

### g — contour, cache identity, and the canonical-geometry TRIPWIRE

**Seat**: Opus 5 (1M), **2026-09-18**. **Sections executed exactly as ordered**: spec §2.6 (`:210-217`) ·
§3 **FW6-G13** (`:522`), **FW6-G14** (`:523`), **FW6-G15** (`:524`) · §4 **lock 7** (`:548`). **Writes**:
the two paths of the unit's writable set and nothing else —
`docs/tranches/X/fourier/waves/F-W6/burn-register.md` and this record. **Zero fourier bytes · zero
value-tree product bytes.** Engine `/usr/bin/grep` (§0.2's pin). Every figure double-run; both runs agreed.

#### Acts, in order

**Act 1 — the spec read WHOLE, then the unit's five coordinates verified at the true bytes before any of
them was consumed.** `F-W6.md` is **634 lines / 263,396 B** (unchanged; **nothing in it was edited** — E-3).
Each ordered coordinate resolved to the section it names: `:210` `### §2.6 Contour, cache identity, and
canonical geometry (3 rows)` · `:522` `FW6-G13` · `:523` `FW6-G14` · `:524` `FW6-G15` · `:548` the
TRIPWIRE lock. **No anchor drifted; no INTENT substitution was needed.** The wave record's baseline, unit
plan, brief `g` and the receipts of `a`–`f` were read before measuring, and **COHESION §0j.D** was read for
the one ruling this unit consumes.

**Act 2 — §4 lock 7 run FIRST, as the lock orders** (*"track the seam (G2c) before any geometry act"*).
The seam, not the artifact, was measured first: ⟨cmd⟩ `git -C $F check-ignore -v
scripts/precompute_svg_fourier.py scripts/raw-contours.json` → both → `.gitignore:53:scripts/*`; ⟨cmd⟩
`git -C $F ls-files --error-unmatch scripts/precompute_svg_fourier.py` → *"did not match any file(s) known
to git"*; ⟨cmd⟩ `git -C $F status --porcelain --ignored scripts` → **three `!!` rows**, two of them this
seam's. **And the tree's own convention convicts it**: `.gitignore:52` reads *"# Scripts (private/local
only — tracked scripts use negation)"*, with ⟨cmd⟩ `/usr/bin/grep -c '^!scripts/' $F/.gitignore` → **10**
negation lines and ⟨cmd⟩ `git -C $F ls-files scripts | wc -l` → **16** tracked paths. **Sixteen siblings
were added to the allowlist; the only claimed producer of canonical geometry never was** — which is G2c
stated in one measurement rather than as an adjective.

**Act 3 — substrate re-measured (D-19 MEASURE-AT-OPEN) and §0.1c CONSUMED, not re-derived.** ⟨cmd⟩
`git -C $F rev-parse --short=8 HEAD` → **`3bac3d52`** · ⟨cmd⟩ `git -C $F status --porcelain | wc -l` → **0**,
both double-run — **unmoved from units `a`–`f`**. The register's §0.1c anchor table already holds this
unit's four geometry rows (`image_storage.py:250-266` · `:285`/`:290`/`:318` · `contours.py:20-30` · the
`order_contours` / `.gitignore:53` / `moon.json`-tracked rows), all marked **HOLDS**; they were re-read at
the bytes and cited **from that table**, never re-resolved as a rival act (§4's F.W0 edge, R-9.1).

**Act 4 — FW6-G13's witness re-cut as a SET DIFFERENCE.** The spec's witness is a list (*"a CLOSED
10-field literal … that OMITS `ml_threshold` / `ml_detail_threshold`"*), and a list is the instrument that
let the defect exist. Differenced mechanically instead: ⟨cmd⟩ `comm -23 <(/usr/bin/sed -n '44,62p'
$F/api/models/shared.py | /usr/bin/grep -oE 'self\.[a-z_]+' | sed 's/self\.//' | sort -u)
<(/usr/bin/sed -n '249,266p' $F/api/services/image_storage.py | /usr/bin/grep -oE 'settings\.[a-z_]+' |
sed 's/settings\.//' | sort -u)` → **`ml_detail_threshold` · `ml_threshold`** — **exactly two, no third**,
double-run. **The fields are consumed on the SHIPPED DEFAULT route**, which the spec asserts and this seat
walked: `strategy` defaults `"auto"` (`models/shared.py:9`) → `extract_contours_result` routes AUTO to
`extract_contours_pipeline` (`contours/extraction.py:161-162`) → Stage 1 `isolate_subject` thresholds at
`contours/isolation.py:40 subject_mask = saliency >= config.ml.threshold`. The short-circuit is before
compute (`routers/images.py:219-226` vs `:230`). **RED confirmed and sharpened.**

**Act 5 — FW6-G14's destroy path walked end-to-end, and it is SHORTER than the spec's prose.** The write
is provenance-free (`routers/contours.py:25`, the **one** `source="editor"` site; the callee sets the key
only `if extraction_cache_key_value:` at `image_storage.py:321-322`). **The arming step the spec does not
state**: `saveContourPoints` sets `epicycleData.value = null` · `basesData.value = null`
(`stores/workspace.ts:276-277`), and those two nulls are **exactly** the guard under which
`ContourSettings.vue:165` fires `runCompute()` from its `{ immediate: true }` watcher — **the save arms
the recompute that destroys it**. `runCompute` → `store.extractContour()` (`:126`) → same `cache_key` →
the ORIGINAL returns → `workspace.ts:251 contour.value = markRaw(result)`. M-14's second trigger
reproduces (`ContourSettings.vue:141` carries `props.nHarmonics, props.nPoints`). E17/`fr-ContourEditorCanvas
C-2` measured on both sides: the POST writes `image_bounds` verbatim `None`, backfill lives only inside
`get_contour` (`dependencies.py:102-103`) which `save_contour` never calls, and both consumers fail
**silently** (`ContourEditorCanvas.vue:100-101` · `useImageOverlay.ts:77-78`). ⟨cmd⟩ `/usr/bin/grep -rn
'image_bounds' $F/api/ --include='*.py' | wc -l` → **29**, double-run — a **character-match** to v2 §E17.

**Act 6 — FW6-G15's witness re-measured from the tracked artifacts, and M-10's rider PROVEN.** ⟨cmd⟩
`/usr/bin/grep -rn 'def order_contours' $F/src $F/api --include='*.py' | wc -l` → **0** (the script imports
it at `:40` and consumes it at `:81`); shipped `n_harmonics` **50** / **10** levels in *both* assets,
read out of the JSON itself, against the script's hard-coded `100` / **12** (`:139-142`) — **50/10 vs
100/12 reproduces exactly**. G5c's precondition at the bytes: three silent-drop gates
(`svg-contours.ts:40` · the **bare** `catch { continue; }` at `:47-48` · the `>= 3` floor at `:52`) in a
58-line file, with ⟨cmd⟩ `/usr/bin/grep -cE 'console|throw|warn'` → **0** on that file **and 0** on its
caller, while the server twin ships `ContourDiagnostics` on the same operation. **M-10's innerPoly rider,
asserted through four repair rounds, is now measured**: `@mkbabb/pencil-boil` **0.4.1**'s
`celestial.ts:45-96` draws a **single** `mulberry32` stream **twelve** times per iteration of
`numRays = 10` — outer **3**, mid **3** (both pushed into `outerPoints`), innerPoly **6** — and the
innerPoly six sit **at the END of each iteration**, so deleting them shifts every later iteration's outer
draws. ⊘ **The honest limit came with it**: ⟨cmd⟩ `/usr/bin/grep -rn 'innerPoly' $F/web/src | wc -l` → **0**
— the discard happens at the consumer and the anti-cure would have to be performed inside a **read-only
third-party package**, making the rider a bar on a non-act in either tree. **Both halves are in the row.**

**Act 7 — the three register rows, §1.g and the §2 stamp written and committed.** Commit **`58c4bb15`**
(pathspec `docs/tranches/X/fourier/waves/F-W6/burn-register.md`). **ONE commit, ONE meaning** — §2.6 is a
single section and the spec declares **no** one-cut family inside it or across it; unit `d`'s
four-rows-one-commit shape is followed. Register measured after the write (WRITE-THEN-MEASURE): **972
lines / 227,813 B**, **213** table rows, the three new rows verified as well-formed 5-cell rows by
unescaped-pipe count (`6` each, character-match to the seventeen rows already in the table).

#### Gate readings — BEFORE → AFTER (§3's SPLIT VERDICT, never a claimed GREEN)

| gate | BEFORE (baseline, unit `a`'s read) | AFTER (this unit) |
|---|---|---|
| **FW6-G13** | **RED-AS-EXPECTED** ⟨divergence D-1, form only⟩ | **RED — commissioned act INSTALLED**, witness **sharpened** from a list to a two-member set difference; D-1's operand retired rather than re-argued |
| **FW6-G14** | **RED-AS-EXPECTED** | **RED — commissioned act INSTALLED**, with the **arming step** added to the witness and E17's 29-site read re-verified as a character-match |
| **FW6-G15** | **RED-AS-EXPECTED** (stays RED by design) | **RED BY DESIGN — commissioned act INSTALLED, TRIPWIRE CHECKED**: fourier **0** dirty at open and close, assets byte-untouched; the interim **FROZEN** posture named with its ruled instrument |

**No gate turned GREEN, and none could**: §3's split verdict makes GREEN the *landing's*, and this wave
moves **zero fourier bytes** by its own §1 and §4. **FW6-G15 is the one gate in the wave whose RED is a
conformance result rather than a debt** — a GREEN there would mean a regeneration had occurred, which
§4 lock 7 makes a **FAILURE**.

#### Divergences and errata — BESIDE, never over (E-3)

- **D-9 · FW6-G13's GREEN fixture is homed at F.W3/W4 by v2, not here.** Spec §3's `FW6-G13` GREEN cell
  names *"the named fixture: `contour_hash` INSTABILITY across an ML-threshold change"* with owner
  **F.W6**; v2 §E13's disposition reads ***"F.W3/W4 owns the regression fixture"***. **Both are true and
  not in conflict** — the gate's *falsifier* is the fixture, its *authoring home* is F.W3/W4 — but a burn
  seat reading only §3 would author it here and **double-book against §4 lock 2**. The row states it:
  **F.W6 burns the KEY and EMITS the fixture.** Neither document is amended.
- **D-10 · `m-18` is a LEG held at F-W3, not a rider this wave books.** Spec §2.6 calls it a *"rider"*
  whose coupling *"the cure must not preserve"*; v2 §E13 homes the limb — *"the `m-18` limb rides as a
  LEG held at F-W3"*. **Reconciled by carrying only the PROHIBITION**, which is what "the cure must not
  preserve it" actually asks of a server cure. No `m-18` booking is made.
- **D-11 · the `10-field` reading (already D-1) is retired, not re-argued.** The live literal folds `_v`
  plus ten parameters, of which **nine** are `settings.*`. This unit banks the **deficit**, never the
  **cardinality**, so the disagreement has no operand left to bite on.
- **D-12 · `fr-FourierShapeExtractor L-B3` is CLOSED at the record and is NOT re-opened.** Its concrete
  `0.4.1 → 0.12.0` exposure measured **Δ 6.10e-6** (v2 §G2c's disposition) and **tracking
  `raw-contours.json` IS the golden file, not a separate act**. This seat noticed the caret range
  (`web/package.json:17 "@mkbabb/pencil-boil": "^0.4.1"`) and **declined to re-file it** — it is G2c's
  already-booked *unpinned generator input* leg, and re-raising a closed measurement as a new finding is
  the defect the census laws exist to stop.

#### Residuals carried forward (none blocking)

1. **The landings.** `FW6-G13` · `FW6-G14` stay **RED** until the fourier sub-session lands them
   (COMMISSION §2); each row's evidence cell reads **PENDING** and its *Not stamped by* list is the
   acceptance bar — including, for G13, *"a key that adds the two fields by hand without closing the
   class"*, which would re-open the identical defect at the next consumed field.
2. **`FW6-G15` stays RED by design until the pipeline lands**, and the ordered preconditions are in the
   row: **G2c → G5c → G1c (+G10c) → G6c → G7c**. **G5c is a PRECONDITION, not a companion** — a
   regeneration run today reports nothing, so a re-authored artifact would be trusted *for exactly the
   reason the present one is not*.
3. **Two rulings, one artifact, no contradiction — recorded so no seat reads one as barring the other.**
   §0j.D **G-15(c)/FM-19** rules the frozen-asset class's **instrument**; v2 §G1c **adopts it without
   re-opening it** and rules the artifact **RE-AUTHORED once the pipeline exists**. **FROZEN is the
   interim, RE-AUTHOR is the act, the golden-file diff makes the interim auditable, and DO-NOT-REGENERATE
   stands until F.W6 lands the pipeline.**
4. **Client arms emitted, never claimed**: **L-2's orchestrator move is F.W3/W4's** (REQUIRED, urgency
   rider at the data-loss class) — this unit's Act-5 arming step is the evidence that wave inherits; the
   `m-18` limb and the slider's own behaviour are likewise F-W3's.
5. **Magnitudes unspent**: **no probe was run**. `M-14`'s end-to-end arm and *"what `moon.json` WAS
   generated from"* both stay **SS-13**, and v2 §G1c states the latter is **not** a precondition of the
   RE-AUTHOR decision.
6. **For unit `i`'s FW6-G17 closure**, this unit's identities resolve as: `fr-ContourSettings B-4`
   **booked** · `fr-ContourSettings i-7` **folded (INFO, into B-4)** · `fr-ContourSettings m-18`
   **cited-to-holder (F-W3), prohibition only** · `fr-ContourSettings M-13` **booked** ·
   `fr-BasisSelector M-14` **carried on M-13** · `fr-ContourEditorCanvas C-2` **carried on M-13** ·
   `fr-CoefficientsSpectrum M-13` **cited as a DISTINCT identity, booked nowhere** ·
   `fr-FourierShapeExtractor L-B1` **booked** · `L-B2 / C-2` ⊕ `L-B3` ⊕ `L-M3/C-6` ⊕ `L-M5/C-5+C-15` ⊕
   `C-7` ⊕ `L-m3/C-10+L-m5` **carried on L-B1** · `fr-FourierShapeExtractor M-10` **a PROHIBITION, not an
   identity** (its head `D-16 ≡ C-9 ≡ L-m2-arm` is canonical **F.W4**'s) — tabulated at §1.g so the
   closure reads it rather than re-deriving it.
