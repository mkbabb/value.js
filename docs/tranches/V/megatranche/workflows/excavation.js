export const meta = {
  name: 'excavation',
  description: 'M-14: physically unearth 100+ sessions + 100+ tranches — exhortation census, implementation truth, contrivance register, design-canon brief',
  whenToUse: 'Owner commission 2026-07-27 evening. Opus banausic seats → Fable aggregated adjudication passes, batched.',
  phases: [
    { title: 'Unearth', detail: 'Opus seats extract session logs + tranche records + censuses', model: 'opus' },
    { title: 'Adjudicate', detail: 'Fable aggregation passes: census, truth table, contrivance + canon', model: 'fable' },
  ],
}

const OUT = 'docs/tranches/V/megatranche/excavation'
const LAWS = `
## LAW (binding on this seat)
- MODEL RECEIPT FIRST: your structured return opens with modelObserved (the exact model id you observe).
- WRITE ONLY under ${OUT}/ (and scratch dirs). READ anything, in any repo. Never touch src/ demo/ api/
  test/ e2e/, any other repo's tree, docs/tranches/V/vnext/** (Codex-owned), scripts/dev/dev.sh, INBOX.md.
- EVIDENCE, not vibes: every claim carries a quote + file/session + date, or a command + pasted output.
  Memory recall is NOT evidence (M-14: the swarm exists because recall is not excavation).
- SESSION LOGS: only the TOP-LEVEL *.jsonl files in a project dir are owner-conversation records.
  NEVER read subagents/ (agent transcripts, gigabytes, not owner messages).
- The owner's voice is the subject; the assistant's replies are context. Extract owner-typed text ONLY.
`

const EXTRACT_RECIPE = `
## THE EXTRACTION RECIPE (run EXACTLY this shape per session file; stream, never load whole)
python3 - <<'PY'
import json
src = "SESSION_FILE"; out = "EXTRACT_FILE"
w = open(out, "a")
for line in open(src):
    try: r = json.loads(line)
    except: continue
    if r.get("type") != "user": continue
    c = (r.get("message") or {}).get("content")
    texts = [c] if isinstance(c, str) else [b.get("text","") for b in c if isinstance(b,dict) and b.get("type")=="text"] if isinstance(c, list) else []
    for t in texts:
        t = t.strip()
        if not t: continue
        if t.startswith("[SYSTEM NOTIFICATION") or t.startswith("<system-reminder>") or t.startswith("Caveat:") or t.startswith("<task-notification>") or t.startswith("[Image:"): continue
        w.write(json.dumps({"ts": r.get("timestamp"), "src": src.split("/")[-1][:12], "text": t[:4000]}) + "\\n")
PY
Then READ the extract file (it is small — owner messages only) and do your analysis on it.`

const SEAT_SCHEMA = { type: 'object', additionalProperties: false,
  required: ['modelObserved', 'reportPath', 'rowCount', 'headline'],
  properties: { modelObserved: {type:'string'}, reportPath: {type:'string', description:'the file you WROTE under excavation/'},
    rowCount: {type:'integer'}, headline: {type:'string'}, extractPath: {type:'string'} } }

const P = '/Users/mkbabb/.claude/projects'
const UNEARTH = [
  // A — owner-exhortation extraction per session corpus
  { label: 'A:value-sessions', brief: `Corpus: ALL top-level *.jsonl in ${P}/-Users-mkbabb-Programming-value-js/ (11 files; largest 44MB — stream).
Run the extraction recipe per file into ${OUT}/extracts/value-owner-messages.jsonl (append across files, chronological by file mtime).
Then read the extract and write ${OUT}/extracts/value-exhortations.md: EVERY owner edict/exhortation/correction as a row —
verbatim quote (trimmed), date, session id prefix, THEME tag (naming consistently: e.g. no-legacy, kiss-no-contrivance,
glass-first, root-styling, probe-parsimony, mail-law, model-law, workflow-cap, born-red, no-deferral, shadcn-abrogation,
animation-preservation, design-canon, durability, parser, mobile-layout…). Repetition is the SIGNAL: never dedup away a
restatement — every restatement is its own row. End with a per-theme tally table.` },
  { label: 'A:glass-sessions-1', brief: `Corpus: the OLDEST 13 top-level *.jsonl by mtime in ${P}/-Users-mkbabb-Programming-glass-ui/.
Same recipe → ${OUT}/extracts/glass1-owner-messages.jsonl → ${OUT}/extracts/glass1-exhortations.md (same row format).
NOTE: glass-ui's TREE is not ours; you are excavating the OWNER'S words only (constellation law is one voice).` },
  { label: 'A:glass-sessions-2', brief: `Corpus: the NEWEST 13 top-level *.jsonl by mtime in ${P}/-Users-mkbabb-Programming-glass-ui/.
Same recipe → ${OUT}/extracts/glass2-owner-messages.jsonl → ${OUT}/extracts/glass2-exhortations.md.` },
  { label: 'A:kf-fourier-sessions', brief: `Corpus: all top-level *.jsonl in ${P}/-Users-mkbabb-Programming-keyframes-js/ (4 files)
AND ${P}/-Users-mkbabb-Programming-fourier-analysis/ (1 file).
Same recipe → ${OUT}/extracts/kf-fourier-owner-messages.jsonl → ${OUT}/extracts/kf-fourier-exhortations.md.` },
  // B — tranche implementation truth
  { label: 'B:value-tranches-AM', brief: `Corpus: /Users/mkbabb/Programming/value.js/docs/tranches/{A..M} (13 tranches).
Per tranche read the charter/FINAL/wave specs (FINAL.md first; where absent, say so — an unclosed tranche is a finding).
Write ${OUT}/extracts/value-truth-A-M.md: per tranche a table — PROMISED (waves/items) / LANDED (commit refs where the doc
cites them; spot-verify ≥2 per tranche with git log --oneline --grep or path checks) / HALF-BAKED (landed-then-diverged,
partially executed, gates that never ran) / REJECTED-EXPLICITLY / SILENTLY DROPPED (promised, never mentioned again).
The SILENT DROPS are the payload.` },
  { label: 'B:value-tranches-NW', brief: `Corpus: /Users/mkbabb/Programming/value.js/docs/tranches/{N..W} (10 tranches incl. V's
subtree — for V use the reformation/CARRY-LEDGER + V-PRIME + megatranche STATE as the record; vnext/ is READ-ONLY Codex).
Same format → ${OUT}/extracts/value-truth-N-W.md.` },
  { label: 'B:keyframes-tranches', brief: `Corpus: /Users/mkbabb/Programming/keyframes.js/docs/tranches/{A..V} (22).
Same format → ${OUT}/extracts/keyframes-truth.md. Lighter per-tranche depth is acceptable at this count, but every
tranche gets a row and every FINAL-less tranche is flagged.` },
  { label: 'B:fourier-parsethat-tranches', brief: `Corpus: /Users/mkbabb/Programming/fourier-analysis/docs/tranches/ (~14 incl.
the two root MDs) AND /Users/mkbabb/Programming/parse-that/docs/tranches/{A,B,T,U}.
Same format → ${OUT}/extracts/fourier-parsethat-truth.md.` },
  // C — library gestalt + design canon
  { label: 'C:shadcn-library-census', brief: `Subject: the M-14 library lens on /Users/mkbabb/Programming/value.js (READ-ONLY).
Write ${OUT}/extracts/shadcn-library-census.md:
(1) SHADCN ABROGATION STATUS: census demo/**/components/ui/ (or wherever the shadcn tree now lives — find it) — file count,
per-component usage count (repo-wide import census), the unused list, the styled-vs-stock list. The standing edict is FULL
abrogation (components AND style) toward glass-ui.
(2) CONTRIVANCE CANDIDATES in the demo component tree: wrapper components that add nothing, dirs with one file, split-for-
splitting's-sake decompositions, dead props/exports (cite the adjudicated corpus where it already ruled — do not re-litigate
ruled rows, EXTEND the census to unruled areas).
(3) src/ library surface: modules with zero consumers (repo + published-subpath analysis), duplicated concepts.
Every row: evidence + a disposition CANDIDATE (PRUNE / CONSOLIDATE-INTO-x / KEEP-with-reason).` },
  { label: 'C:design-canon-census', brief: `Subject: the design canon of the value.js constellation (READ-ONLY sweep).
Write ${OUT}/extracts/design-canon-census.md:
(1) FIND the canonical definitions of **GOLDEN GLASS**, **BREATH OF LIFE**, **MOVEMENT OF MOMENTUM** — grep the
constellation's docs (value.js docs/, glass-ui docs/, keyframes docs/, the design MDs, CLAUDE.md files). Quote each
definition with its file:line. If a term has NO canonical written definition anywhere, that absence is a top finding.
(2) INVENTORY every design-authority doc (design MD, VISUAL-CONSTITUTION, PROPORTION-AUDIT, PALETTE-CONTRACT, style guides)
with date, size, and staleness signals (references to retired components/APIs, contradictions with the adjudicated corpus).
(3) ANSWER with evidence: does the design MD need re-authoring? What does it not govern that the owner's marks (OM-1..OM-10)
show it must (shadows, radii, spacing rhythm, vibrancy, motion mandates)?
(4) ANIMATIONS: census the motion inventory (global keyframes, scoped keyframes, transition tokens) vs the MT-F034 mandate.` },
  // D — the Codex handoff standing
  { label: 'D:vnext-codex-standing', brief: `Subject: the Codex handoff. READ-ONLY sweep of
/Users/mkbabb/Programming/value.js/docs/tranches/V/vnext/ (Codex-owned — not one byte written) + docs/tranches/V/evidence/
(vnext-clean-passes, vnext-history, vnext-union) + any megatranche/apotheosis rows that reference vnext.
Write ${OUT}/extracts/vnext-standing.md: what the handoff PROMISED, what vnext/ HOLDS today (file census, dates, drift
since the handoff), what the evidence dirs prove, what obligations point AT vnext from our side (parser proof, kickoff
prompt, context packets), and the honest standing verdict: ACTIVE / STALLED / SUPERSEDED-BY-MEGATRANCHE — with evidence.` },
  // E — glass-forward compliance
  { label: 'E:glass-forward-compliance', brief: `Subject: M-14 clause 1 — "ALL glass-ui-forward items delivered to that inbox
and marked accordingly." Sweep /Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/registry/adjudicated/*.md +
registry/ROOT-FINDINGS.md for EVERY glass-owned arm, ask, relay, or bank (grep GLASS-OWNED, RELAY, BH, glass ask, I-20).
Cross-check each against the SENT packets (docs/tranches/V/coordination/INBOX.md rows O-6..O-16 and the packet files in
/Users/mkbabb/Programming/glass-ui/docs/tranches/BJ/coordination/valuejs-*.md — READ them).
Write ${OUT}/extracts/glass-forward-compliance.md: the ledger — DELIVERED (arm → packet §) / UNRELAYED (the debt list,
exact arm + source file:line) / AMBIGUOUS. The UNRELAYED list is the payload; zero rows must be PROVEN, not asserted.` },
]

phase('Unearth')
const seats = []
const PAR = 3
for (let i = 0; i < UNEARTH.length; i += PAR) {
  const chunk = UNEARTH.slice(i, i + PAR)
  const batch = await parallel(chunk.map((s) => () =>
    agent(`You are excavation seat ${s.label} (Opus banausic band, M-14), value.js mega-tranche.
Repo root: /Users/mkbabb/Programming/value.js. Create ${OUT}/extracts/ if needed.

${s.brief}
${s.label.startsWith('A:') ? EXTRACT_RECIPE : ''}
${LAWS}
Return ONLY the structured object; reportPath = the file you actually wrote; rowCount = your row/tranche/item count.`,
      { model: 'opus', label: s.label, phase: 'Unearth', schema: SEAT_SCHEMA })))
  seats.push(...batch)
}
const done = seats.filter(Boolean)
log(`UNEARTH: ${done.length}/${UNEARTH.length} seats returned`)
if (done.length === 0) return { failed: 'entire unearth stage died — nothing to adjudicate; resume, do not report clean' }

const seatIndex = done.map((s) => `- ${s.reportPath} (${s.rowCount} rows) — ${s.headline}`).join('\n')

phase('Adjudicate')
const AGG_SCHEMA = { type: 'object', additionalProperties: false,
  required: ['modelObserved', 'path', 'headline'],
  properties: { modelObserved: {type:'string'}, path: {type:'string'}, headline: {type:'string'} } }

const [census, truth] = await parallel([
  () => agent(`You are the Fable EXHORTATION-CENSUS adjudicator (M-14 aggregated pass), value.js mega-tranche.
The Opus seats unearthed the owner's messages across the constellation's sessions. Their reports (READ every A:* and the
exhortation extracts on disk — the index below is a pointer, not a substitute):
${seatIndex}

WRITE ${OUT}/EXHORTATION-CENSUS.md — the answer to the owner's "how many more ecoute-moi's must this take":
per THEME (merged across repos): the exhortation, restatement COUNT, first/last dates, 2-3 verbatim quotes (dated),
and the RULING with root-verified evidence: ENCODED-DURABLY (name where: formation law / memory file / gate — verify the
named artifact exists) / RE-EXHORT (still being violated or未encoded — name the wave/law/addendum that must carry it,
and the violation evidence) / ESCALATE-TO-DISEASE (violated across ≥3 restatements — candidates for the disease registry).
Order by restatement count descending. The census is the FRICTION MAP: end with the top-10 friction sources and the
minimization move for each. Sagacity and incredulity: spot-verify at least 5 seat claims against the raw extracts.
${LAWS}`, { model: 'fable', label: 'F:exhortation-census', phase: 'Adjudicate', schema: AGG_SCHEMA }),
  () => agent(`You are the Fable IMPLEMENTATION-TRUTH adjudicator (M-14 aggregated pass), value.js mega-tranche.
READ every B:* seat report on disk (index below) plus the megatranche registries (DISEASE-REGISTRY, ROOT-FINDINGS,
the adjudicated corpus) — the truth table must not contradict already-ruled rows without saying so.
${seatIndex}

WRITE ${OUT}/TRUTH-TABLE.md: the constellation implementation truth across ~106 tranches —
(1) the HALF-BAKED REGISTER: everything landed-then-diverged or partially executed, with the tranche, the promise quote,
and today's state; (2) the SILENT-DROP REGISTER (promised, vanished — cross-reference the disease registry's anti-rename
ledger; NEW silent drops it missed are the payload); (3) the REJECTED register (explicit rejections that must never be
re-proposed); (4) the KEPT-PROMISES sample (honesty demands the denominator). Spot-verify ≥5 seat claims against the
actual tranche docs. End with the addenda consequence: which extant wave specs carry half-baked or dropped premises and
need re-authoring vs pruning.
${LAWS}`, { model: 'fable', label: 'F:truth-table', phase: 'Adjudicate', schema: AGG_SCHEMA }),
])

const contrivance = await agent(`You are the Fable CONTRIVANCE + CANON adjudicator (M-14 final aggregated pass),
value.js mega-tranche. READ on disk: every C:*, D:*, E:* seat report, PLUS the two sibling apotheoses just written:
${census ? census.path : '(census seat died — say so)'} and ${truth ? truth.path : '(truth seat died — say so)'}.
Seat index:
${seatIndex}

WRITE TWO FILES:
(1) ${OUT}/CONTRIVANCE-REGISTER.md — contrivance rooted out of BOTH the extant wave addenda AND the library gestalt:
per row: the contrivance, where it lives (addendum §/file), the evidence, and the terminal disposition candidate
(PRUNE / CONSOLIDATE / RE-AUTHOR) — feeding Phase F wave authoring. Include the shadcn-abrogation plan skeleton
(what goes, in what grouping, toward which glass primitive) and the glass-forward compliance verdict (the UNRELAYED
debt list verbatim from seat E, or its proven emptiness).
(2) ${OUT}/DESIGN-CANON-BRIEF.md — the design-canon standing: GOLDEN GLASS / BREATH OF LIFE / MOVEMENT OF MOMENTUM
(canonical definitions found, or the finding that they are undefined), the design-MD re-authoring verdict WITH the
specific gaps the owner's marks OM-1..OM-10 prove, and the brief for the Phase E design tri-folds (Fable+Opus author with
the frontend-design plugin, Fable agglomerates — per M-14 clause 4).
Sagacity: refute at least 3 seat claims by checking the tree yourself before adopting them.
${LAWS}
Return the structured object with path = the CONTRIVANCE-REGISTER path; name the second file in headline.`,
  { model: 'fable', label: 'F:contrivance+canon', phase: 'Adjudicate', schema: AGG_SCHEMA })

log(`EXCAVATION COMPLETE: census=${census ? census.path : 'DIED'} · truth=${truth ? truth.path : 'DIED'} · contrivance=${contrivance ? contrivance.path : 'DIED'}`)
return { unearthed: done.length, seatReports: done.map((s) => s.reportPath),
  census: census || 'DIED', truth: truth || 'DIED', contrivance: contrivance || 'DIED' }
