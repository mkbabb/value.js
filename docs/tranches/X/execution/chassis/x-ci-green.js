export const meta = {
  name: 'x-ci-green',
  description: 'X-W11 deploy gate: diagnose and cure every red value.js CI job at its root, then loop on real CI runs until green (no budget loosening, no skips, no bypass)',
  phases: [{ title: 'Cure', detail: 'one seat per red CI job, root cause and cure' }, { title: 'Verify', detail: 'push, read the real CI run, repair what stays red (max 3 rounds)' }],
}

const LAW = `
You are a seat in value.js Tranche X, Track A, X-W11's deploy gate (COHESION §0gc, to be written by the orchestrator from your receipts). Repo: /Users/mkbabb/Programming/value.js, branch tranche-u. Opus 5.5.
BINDING LAW:
- Machine law in ~/.claude/CLAUDE.md: every test/build/probe through ~/.claude/guard/guarded (browser runs never --light; vitest --maxWorkers=2; playwright --workers=1; WebKit runs with --exclusive webkit). No headed browsers, no screen capture.
- NO quick solutions, NO workarounds. Cure at the root cause. NEVER loosen a budget, threshold or assertion; NEVER skip, exclude, .only, retry-until-green, or mark a test flaky; NEVER use workflow_dispatch or any path that bypasses the declared green-CI deploy gate; NEVER force-push, stash, reset --hard. A cure that would mask a gate is forbidden; if the only honest cure is outside your bounds, return it as an escalation with the measured evidence.
- A sibling workflow (X-DS) is editing demo/** concurrently: run 'git status --porcelain' first; NEVER modify, stage or revert a file that carries uncommitted changes you did not make. If your cure needs such a file, escalate.
- Never touch scripts/dev/dev.sh, /Users/mkbabb/package.json, glass-ui source (READ-ONLY), or X-DS's LAW.
- Commits are pathspec-only (git commit -m ... -- <paths>), message ends with the trailer line 'Claude-Session: https://claude.ai/code/session_01QkbQV4VgkoQgSoUj2oKZim'. Push with 'git push -q origin HEAD' (if rejected, 'git pull --no-rebase --no-edit -q origin tranche-u' then push; never force).
- Use 'gh' for CI logs: gh run list --branch tranche-u --workflow ci.yml; gh run view <id> --json jobs; gh run view --job <jobId> --log-failed.
- Append a dated receipt for your work under '## CI-GREEN (§0gc)' in docs/tranches/X/execution/A/X-W11.md (create the heading if absent; append only, E-3), with every command and its measured output.
`

const RESULT = {
  type: 'object',
  properties: {
    job: { type: 'string' },
    rootCause: { type: 'string' },
    cured: { type: 'boolean' },
    commits: { type: 'array', items: { type: 'string' } },
    evidence: { type: 'array', items: { type: 'string' } },
    escalations: { type: 'array', items: { type: 'string' } },
  },
  required: ['job', 'rootCause', 'cured', 'commits', 'evidence', 'escalations'],
}

const SEATS = [
  { key: 'producer-plate-mass', prompt: `JOB: 'producer / Node 22' and 'producer / Node 24' (ci.yml: npx playwright install --with-deps chromium; npm test). Both fail npm test on demo/test/palettes/plate-mass.test.ts 'plate at 390 px' G20 and N-17 with 'Execution context was destroyed ... navigation' and a null getBoundingClientRect, in 6 of 6 COLD runs (CI runs 39188667296, 39117135689, 39034378132 and a local cold run); warm runs pass. Hypothesis to test, not assume: Vite's dependency optimizer discovers deps on the first browser-mode load and forces a full reload mid-test. Find the true root cause (reproduce cold locally: clear node_modules/.vite and the vitest cache, then run that file under guarded), cure it at the root (e.g. the vitest/vite config declaring the browser test's deps, or the harness awaiting the right readiness), and prove: 3 consecutive COLD local runs green, plus the whole 'npm test' green once locally (expect the 5 producer-held ink cases to report held-passing per §0gb). Grant: demo/test/palettes/plate-mass.test.ts, demo/test/** harness helpers, vitest.config.*/vite.config.* (test sections), package.json scripts only if strictly required.` },
  { key: 'oracle-slate', prompt: `JOB: 'oracle slate' (node scripts/ci/oracle-slate.mjs) fails with 'spawnSync git ENOBUFS' at trackedFiles (scripts/ci/oracle-slate.mjs:93, git ls-files -z). Root-cause why the output exceeds the buffer (how many tracked files/bytes; is something tracked that should not be, e.g. evidence trees, PNGs?) and cure at the root: if the tracked set is legitimately large, the script must read it without a fixed buffer (a correct maxBuffer sized to the measured output with headroom, or streaming); if it is tracking junk, report it as an escalation rather than deleting tracked evidence (E-3: never rewrite dated evidence). Then run the script locally (guarded --light) and report its full verdict; if the slate itself then reports failures, diagnose and cure each at its root within scripts/ci/** and the files the slate names (respecting the X-DS rule), else escalate. Grant: scripts/ci/oracle-slate.mjs and scripts/ci/**.` },
  { key: 'lhci', prompt: `JOB: 'lhci' (assert the four budgets) on CI run 39188667296: LCP 5972-6667 ms vs <=2500, TBT 144320-145607 ms vs <=300 (a main thread blocked for ~144 s), a third metric at 0.33-0.35 (likely CLS, confirm), INP auditRan 0 (warning). Read the lhci config, the job definition in .github/workflows/ci.yml, and the built app it audits. Find the TRUE root cause of each budget miss. Strong lead for TBT: the GPU-less runner renders the WebGL/WebGPU atmosphere through SwiftShader on the main thread, or a render loop never parks; check whether the app detects a software rasterizer / major-performance-caveat and whether rAF loops park when idle (the PRM/idle-park law). The CLS 0.33 is not a GPU artefact: find the shifting node. Reproduce locally under guarded with the same lighthouse settings against a production build (headless shell, one browser). Cure at the root in product code where it is a product defect (a real GPU-less or low-power user suffers the same), never by loosening budgets, changing throttling, or special-casing Lighthouse/CI user agents. Product cures may touch demo/** only in files with no uncommitted changes (X-DS rule) and must keep identity colours, type and motion (owner law §0dm: never strip the atmosphere; a lawful cure gates or defers work, e.g. failIfMajorPerformanceCaveat-based fallback or idle parking). Prove each metric under budget locally x2 and report the numbers.` },
  { key: 'e2e-visual', prompt: `JOBS: 'e2e-smoke', 'visual', 'e2e-safari', 'boot-smoke' (ci.yml). They were cancelled on run 39188667296; find the most recent COMPLETED run of each on tranche-u (gh run list --branch tranche-u --workflow ci.yml -L 15, then per run jobs) and read their failures. Also read .github/workflows/deploy-pages.yml to establish exactly which CI conclusion gates the deploy (workflow_run conclusion == success means EVERY ci.yml job must pass). Classify every failing cell by root cause: (1) harness/platform defects (e.g. Linux CI comparing against darwin goldens, missing browsers, ports, timeouts from dev-vs-build origin) are cured at the root in e2e/**, playwright.config.ts or ci.yml; (2) stale goldens owned by the X-W10 visual canon: re-baselining is lawful ONLY for cells X-W10's close proved are semantic-null (G-15 null-DELTA) and only on the same renderer CI uses (Linux goldens generated in the CI container mcr.microsoft.com/playwright matching the installed Playwright version, never from darwin); (3) product defects: cure at the root if in bounds (X-DS rule), else escalate with the cell list. Run local reproductions under guarded (playwright --workers=1). Report per job: cells red, causes, cures, and which remain.` },
]

phase('Cure')
const cured = await parallel(SEATS.map(s => () =>
  agent(`${LAW}\n\nYOUR SEAT: ${s.key}\n${s.prompt}\n\nReturn the structured result.`, { label: `cure:${s.key}`, phase: 'Cure', schema: RESULT })))
log(`cure round: ${cured.filter(Boolean).map(r => `${r.job}=${r.cured ? 'cured' : 'open'}`).join(', ')}`)

phase('Verify')
const VERIFY = {
  type: 'object',
  properties: {
    runId: { type: 'string' }, headSha: { type: 'string' }, allGreen: { type: 'boolean' },
    jobs: { type: 'array', items: { type: 'object', properties: { name: { type: 'string' }, conclusion: { type: 'string' }, failure: { type: 'string' } }, required: ['name', 'conclusion', 'failure'] } },
  },
  required: ['runId', 'headSha', 'allGreen', 'jobs'],
}
const rounds = []
let carry = cured.filter(Boolean)
for (let round = 1; round <= 3; round++) {
  const v = await agent(`${LAW}\n\nYOUR SEAT: CI verifier, round ${round}. Do not edit product or test files. Ensure origin/tranche-u has every local commit (git push -q origin HEAD). Find the ci.yml run for the current origin/tranche-u HEAD sha (wait for it to appear), then wait for it to complete with 'gh run watch <id> --exit-status' (re-invoke if it times out; it may take up to ~60 min). If a newer push supersedes it (concurrency cancel), follow the newest run for the newest HEAD. Report every job's conclusion and, for each failure, the decisive log lines (gh run view --job <id> --log-failed | tail -60, condensed). Prior seat results: ${JSON.stringify(carry).slice(0, 6000)}`, { label: `verify:r${round}`, phase: 'Verify', schema: VERIFY })
  rounds.push(v)
  if (!v || v.allGreen) break
  const red = v.jobs.filter(j => j.conclusion !== 'success' && j.conclusion !== 'skipped')
  carry = (await parallel(red.map(j => () =>
    agent(`${LAW}\n\nYOUR SEAT: repair, round ${round}, job '${j.name}' on CI run ${v.runId} (sha ${v.headSha}), conclusion ${j.conclusion}. Failure: ${j.failure}\nPrior cure receipts: ${JSON.stringify(cured.filter(Boolean)).slice(0, 4000)}\nDiagnose and cure at the root under the same law and the grant of the seat that owns this job (producer -> demo/test + vitest/vite test config; oracle slate -> scripts/ci; lhci -> product root cause, no budget changes; e2e/visual/boot-smoke -> e2e/**, playwright.config.ts, ci.yml, renderer-matched goldens only for semantic-null cells). If the failure is a cancellation by a newer push, return cured=true with that evidence. Return the structured result.`, { label: `repair:r${round}:${j.name}`, phase: 'Verify', schema: RESULT })))).filter(Boolean)
}
return { cured, rounds, finalRepairs: carry }
