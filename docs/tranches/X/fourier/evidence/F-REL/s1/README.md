SERVED MODEL: claude-opus-5-5

# F-REL.s1 evidence (COHESION §0gi.2): production boots as production

fourier commit `c83b7ea` on `m/w1-bump-migration` (parent `9519b6f`). No secret value, host address or infrastructure detail is in this directory (§0gh.4): every token here is a non-secret fixture.

## Files
- `hc-probe.sh`: boots only the prod-compose mongo (base + prod overlay, fixture creds) for 60 s at the 5 s healthcheck interval (12 intervals), then counts mongod's `Checking authorization failed` lines, successful authentications, accepted connections, the memory limit and the healthcheck's argv.
- `hc-verbose.sh`: the diagnosis. The scheduled healthcheck is disabled, mongod's command/accessControl/network verbosity is raised, and each candidate healthcheck command runs once by hand in its own log window (local throwaway stack only).
- `hcv.out`: the diagnosis output (candidates A–D).
- `before-hist.out`: the BEFORE tree's mongod message histogram over 60 s.
- `pytest-run.sh`: runs fourier api pytest against a throwaway `mongo:8.0.20` on 127.0.0.1:27118.
- `pytest-bootguard-*.out`, `pytest-api-*.out`: the pytest readings.

BEFORE = a detached worktree of `9519b6f` (`.worktrees/s1-before`, removed at the end); AFTER = the main tree at `c83b7ea` (+ `563814d`, a smoke-instrument fix).

## Healthcheck readings
Diagnosis (`hcv.out`), one run each, mongod verbosity 2:

| Candidate | rc | connections | authenticated | commands mongod logged |
|---|---|---|---|---|
| A: pre-.s1 `mongosh -u -p --tls --eval ping` | 0 | 4 | 1 | aggregate, buildInfo, getParameter, ismaster ×2, ping, saslContinue, endSessions |
| B: `mongosh --nodb --norc` + `new Mongo(uri)` ping (**adopted**) | 0 | 2 | 1 | ismaster ×2, saslContinue, ping, endSessions |
| C: `mongosh --norc <uri>` | 0 | 4 | 1 | same as A (the startup probes stay) |
| D: B with a wrong password | 1 | 2 | 0 | ismaster ×2, saslContinue |

- `ismaster` ×2 is the driver handshake plus its monitor (the one `Connection not authenticating` per run in every candidate). That is the wire handshake, not a command needing authorization.
- B drops the shell's three startup probes (buildInfo, getParameter, aggregate) and halves the connections. It fails closed (D).

Scheduled healthcheck over 60 s = 12 intervals (`hc-probe.sh`, ×2 each):

| Tree | `Checking authorization failed` | authenticated runs | connections accepted | mongo memory limit | healthcheck argv[2] |
|---|---|---|---|---|---|
| BEFORE `9519b6f` run 1 / 2 | 0 / 0 | 13 / 13 | 56 / 56 | 536870912 | `-u` |
| AFTER `c83b7ea` run 1 / 2 | 0 / 0 | 12 / 12 | 32 / 32 | 1073741824 | `--nodb` |

The literal `Checking authorization failed` string is 0 locally in BOTH trees. The host's > 0 reading is the orchestrator's (§0gi) and is not reproducible on a fresh local mongod, so the measured local proxy is the shell's startup probes (3 → 0 per run) and the connections per run (≈4 → ≈2). The host count is read at `.d`.

## pytest
- `pytest-bootguard-1.out` / `-2.out` (main tree, AFTER): `2 passed` ×2.
- `pytest-bootguard-mutant.out`: the falsifier. In the BEFORE worktree the guard condition at `api/main.py:37` was made dead (`if False and …`), and the same test file ran on the main venv's interpreter → `1 failed, 1 passed` (`DID NOT RAISE <class 'RuntimeError'>`). The worktree was restored and removed.
- The full api suite ran on CI ×2: m/w1 `39340000550` (`c83b7ea`) and `39340556816` (`563814d`) → `347 passed` each, against 345 at `9519b6f` (+2 = this file). The local full-suite runs were withdrawn after more than an hour queued in `guarded` at load 75–141.
