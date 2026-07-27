export const meta = {
  name: 'safari-real-matrix',
  description: 'Phase D: re-run the route + state matrices in REAL Safari 26.4 via safaridriver; compare against the WebKit cells; probe the dock morph crash arm',
  whenToUse: 'Opus mechanical band; unblocked 2026-07-27 by real-Safari automation',
  phases: [
    { title: 'Routes', detail: 'route × viewport matrix in safari-app, screenshots + probes' },
    { title: 'States', detail: 'previously-inverted cells + reachable states + the dock morph arm' },
    { title: 'Synthesis', detail: 'MATRIX-SAFARI.md — safari-app vs webkit-engine, inversions flagged' },
  ],
}

const LAWS = `
## LAW (binding on this seat)
- MODEL RECEIPT FIRST: your JSON return opens with modelObserved (the exact model id you observe yourself to be).
- READ-ONLY on src/ demo/ api/ test/ e2e/; write ONLY under docs/tranches/V/megatranche/ and the scratchpad.
- WEBKIT-VS-SAFARI (I-20, inverted verdicts twice): webkit-engine (Playwright) and safari-app are SEPARATE
  evidence cells. You are producing the safari-app cells. NEVER copy a webkit verdict into a safari cell;
  a safari cell you did not run is UNMEASURED, not green.
- SINGLE-SESSION DISCIPLINE: safaridriver (WebDriver classic, http://localhost:4599) allows ONE session.
  Create yours with: curl -s -X POST http://localhost:4599/session -H 'Content-Type: application/json'
  -d '{"capabilities":{"alwaysMatch":{"browserName":"safari"}}}' — and you MUST delete it
  (curl -s -X DELETE http://localhost:4599/session/<id>) before returning, INCLUDING on failure paths.
  If session-create returns "already active", a prior seat leaked one: list nothing — wait 5s, retry twice,
  then report BLOCKED-SESSION rather than killing processes.
- WebDriver classic essentials: navigate POST /session/<id>/url {"url":...}; execute JS
  POST /session/<id>/execute/sync {"script":"return ...","args":[]}; window size
  POST /session/<id>/window/rect {"width":W,"height":H} (the physical display may CLAMP — always record
  the ACTUAL window.innerWidth/innerHeight via execute, never assume the requested size); screenshot
  GET /session/<id>/screenshot → base64 value → decode to PNG.
- ENV: the dev server at http://localhost:9000 is UP but API-LESS (no mongo) — data-backed surfaces
  (palette lists, admin panels) render blank; that is an ENVIRONMENT fact, not a defect. Record such cells
  UNVERIFIABLE-HERE.
- Console-error capture limitation: WebDriver classic cannot inject before load. Install
  window.__errs=[] + window.onerror AFTER load, then re-navigate interactions; early boot errors are
  a DECLARED blind spot of this cell — record the limitation, do not claim "0 errors" beyond its reach.
- CRASH IS EVIDENCE: if Safari dies (SIGABRT — the glass S0 arm), that IS the finding. Capture the newest
  ~/Library/Logs/DiagnosticReports/Safari*.ips (read-only), record its name + first 40 lines' key frames,
  note the session is gone, and continue with a fresh session if more cells remain.
- Probe parsimony: read files to plan; drive the browser only for cells that need it.
`

const ROUTES_SCHEMA = {
  type: 'object', additionalProperties: false,
  required: ['modelObserved', 'cells', 'shots', 'limitations'],
  properties: {
    modelObserved: { type: 'string' },
    cells: { type: 'array', items: { type: 'object', additionalProperties: false,
      required: ['route', 'requestedViewport', 'actualViewport', 'h1', 'verdict', 'note'],
      properties: { route: {type:'string'}, requestedViewport: {type:'string'}, actualViewport: {type:'string'},
        h1: {type:'integer'}, verdict: { enum: ['RENDERS', 'BLANK', 'PARTIAL', 'UNVERIFIABLE-HERE', 'CRASH'] },
        note: {type:'string'} } } },
    shots: { type: 'array', items: { type: 'string' }, description: 'paths of PNGs written under audit/visual/safari-real/' },
    limitations: { type: 'string' },
  },
}

const STATES_SCHEMA = {
  type: 'object', additionalProperties: false,
  required: ['modelObserved', 'cells', 'morphArm', 'limitations'],
  properties: {
    modelObserved: { type: 'string' },
    cells: { type: 'array', items: { type: 'object', additionalProperties: false,
      required: ['cell', 'webkitVerdict', 'safariVerdict', 'inverted', 'note'],
      properties: { cell: {type:'string'}, webkitVerdict: {type:'string'}, safariVerdict: {type:'string'},
        inverted: {type:'boolean'}, note: {type:'string'} } } },
    morphArm: { type: 'object', additionalProperties: false,
      required: ['driven', 'outcome', 'evidence'],
      properties: { driven: { type: 'boolean', description: 'did you actually drive --dock-expand-t through the morph' },
        outcome: { enum: ['SURVIVED', 'CRASHED-SIGABRT', 'CRASHED-OTHER', 'NOT-DRIVEN'] },
        evidence: { type: 'string' } } },
    limitations: { type: 'string' },
  },
}

const SYNTH_SCHEMA = {
  type: 'object', additionalProperties: false,
  required: ['modelObserved', 'matrixPath', 'inversions', 'headline'],
  properties: {
    modelObserved: { type: 'string' }, matrixPath: { type: 'string' },
    inversions: { type: 'integer' }, headline: { type: 'string' },
  },
}

phase('Routes')
const routes = await agent(`You are the Phase D routes seat (Opus mechanical), value.js mega-tranche,
repo /Users/mkbabb/Programming/value.js.

TASK — the safari-app ROUTE MATRIX:
1) Read docs/tranches/V/megatranche/audit/probes/layout-utilization.mjs to extract the EXACT route list
   (the 7 routes) and docs/tranches/V/megatranche/audit/visual/REPORT.md §route-matrix for the webkit
   cells you are twinning. Do not invent routes.
2) In REAL Safari via safaridriver: for each route × three viewports — 390×844 (mobile), 1440×900
   (desktop), and the widest the display permits (request 3440×1440, RECORD the clamp) — navigate
   http://localhost:9000<route>, settle ~1.5s, record actual innerWidth/innerHeight, h1 count,
   document.title, and body text length; screenshot to
   docs/tranches/V/megatranche/audit/visual/safari-real/<route-slug>-<w>.png (decode base64; sha256 each).
3) Data-backed routes render blank API-less: mark UNVERIFIABLE-HERE, do not book defects for them.
${LAWS}
Return ONLY the structured object. Your final text IS the data.`,
  { model: 'opus', label: 'safari:routes', phase: 'Routes', schema: ROUTES_SCHEMA })

phase('States')
const states = await agent(`You are the Phase D states seat (Opus mechanical), value.js mega-tranche,
repo /Users/mkbabb/Programming/value.js. The routes seat has finished; safaridriver should be free —
if a session is leaked, follow the session-discipline law.

TASK — the safari-app STATE CELLS + the dock morph crash arm:
1) Read docs/tranches/V/megatranche/audit/visual/STATES.json (the webkit-engine state matrix) and pick:
   (a) every cell whose history shows a webkit-vs-safari inversion or harness correction (MT-F022 class),
   (b) the states REACHABLE in WebDriver classic without emulation: RTL (document.documentElement.dir='rtl'
   post-load), dark mode IF the app exposes a toggle/class (read the demo theme wiring to find it — do not
   guess selectors), zoom via execute where meaningful. States needing media emulation (prefers-reduced-motion,
   prefers-color-scheme if no toggle exists, pointer:coarse) are UNREACHABLE-IN-CELL — record them as such.
2) For each chosen cell: run it in real Safari, record safariVerdict beside the webkitVerdict, flag inversions.
   Screenshot only where a verdict needs pixels (probe parsimony).
3) THE MORPH ARM (glass S0, I-20): the crash class is --dock-expand-t driven through the dock morph
   (glass-ui morph.css nested color-mix). Read the demo's dock integration
   (demo/@/components/custom/dock/) to find what drives expansion (hover/click/state), then DRIVE it via
   execute/sync (dispatch the real events or call the exposed state) and hold it through several
   animation frames. SURVIVED and CRASHED are both findings. If Safari SIGABRTs: capture the newest
   ~/Library/Logs/DiagnosticReports/Safari*.ips key frames as evidence; that cell is done.
${LAWS}
Return ONLY the structured object. Your final text IS the data.`,
  { model: 'opus', label: 'safari:states+morph', phase: 'States', schema: STATES_SCHEMA })

phase('Synthesis')
const synth = await agent(`You are the Phase D synthesis seat (Opus mechanical), value.js mega-tranche.
Two seats produced the safari-app cells. Their full returns:

=== ROUTES SEAT ===
${routes ? JSON.stringify(routes, null, 1) : 'SEAT DIED — synthesize what exists on disk under audit/visual/safari-real/ and SAY SO.'}

=== STATES SEAT ===
${states ? JSON.stringify(states, null, 1) : 'SEAT DIED — synthesize what exists on disk and SAY SO.'}

TASK: WRITE docs/tranches/V/megatranche/audit/visual/safari-real/MATRIX-SAFARI.md —
the safari-app evidence cell in full: route matrix table (with shot paths + sha256s), state cells table
(webkit verdict | safari verdict | INVERTED?), the morph-arm outcome with its evidence, the declared
limitations/blind spots of this cell (early-boot errors, emulation-locked states, display clamp,
API-less env), and a CELL-SEPARATION preamble stating that these verdicts twin — never replace —
the webkit-engine cells. Flag every inversion prominently; inversions are the payload.
Verify the shot files EXIST (ls) before citing them; a cited-but-absent shot is a defect in YOUR output.
${LAWS}
Return ONLY the structured object.`,
  { model: 'opus', label: 'safari:synthesis', phase: 'Synthesis', schema: SYNTH_SCHEMA })

if (synth) log(`SAFARI MATRIX: ${synth.matrixPath} · inversions=${synth.inversions} · ${synth.headline}`)
return { routes: routes ? routes.cells.length : 'DIED', states: states ? states.cells.length : 'DIED',
  morph: states ? states.morphArm.outcome : 'UNKNOWN', synthesis: synth }
