SERVED MODEL: claude-opus-5-5

# F.REL `.m2`: CI mirrors production's cell (COHESION §0gh.1), 2026-10-19

The fourier commit `a60c542` is on `m/w1-bump-migration`. It was pushed with no force, on top of `dc30e5e`.

## Pins (read at the true bytes after the commit)

⟨`grep -n "image: mongo" .github/workflows/ci.yml docker-compose.yml`⟩ →
- `ci.yml:63 image: mongo:8.0.20` (api-tests service; the spec's `:55`, moved +8 by the `.m2` comment block above it)
- `ci.yml:310 image: mongo:8.0.20` (e2e-tests service; the spec's `:298`)
- `docker-compose.yml:38 image: mongo:8.0.20`

Production inherits the pin. `scripts/deploy-hook.sh:71` reads `readonly COMPOSE=(docker compose -f docker-compose.yml -f docker-compose.prod.yml)`, and `docker-compose.prod.yml`'s `mongo:` service (`:96`) states no `image:`.
- Proof by composition: ⟨`MONGO_PASSWORD=config-read-only docker compose -f docker-compose.yml -f docker-compose.prod.yml config --images | grep '^mongo:'`⟩ → `mongo:8.0.20`. The same command read `mongo:8.0` before the edit.
- `docker-compose.prod.yml` was therefore not edited.

### Docker Hub read

⟨`curl -s 'https://hub.docker.com/v2/repositories/library/mongo/tags?name=8.0.20'`⟩ → `8.0.20 sha256:098862b1339f031900ca66cf8fef799e616d6324fa41b9a263f2ec899552c1ef 2026-04-16`

Local pull:
- ⟨`docker pull mongo:8.0.20`⟩ → `Digest: sha256:098862b1339f031900ca66cf8fef799e616d6324fa41b9a263f2ec899552c1ef`
- ⟨`docker run --rm mongo:8.0.20 mongod --version | head -1`⟩ → `db version v8.0.20`

## Runner label

`runs-on: ubuntu-22.04` is set on three jobs: `api-tests` (`ci.yml:60`), `e2e-tests` (`:298`) and `prod-compose` (`:460`). Those are the spec's `:52/:286/:448`, moved by the inserted comment and step lines.

The two non-mongo jobs, `web-build` and `inv-27-evidence`, stay on `ubuntu-latest`. §0gh.1 binds only the jobs that boot mongo.

Is the label supported?
- ⟨`gh api repos/actions/runner-images/contents/README.md | grep -n ubuntu-22.04`⟩ → `:27 | Ubuntu 22.04 …` and `:52 [ubuntu-22.04]: …Ubuntu2204-Readme.md`. It is a current image.
- ⟨`gh issue view 14254 -R actions/runner-images`⟩ → "[Ubuntu] The Ubuntu 22 based runner images will begin deprecation on September 17th and will be fully unsupported by April 17th …" (OPEN, created 2026-06-16).
  - Body: `Deprecation: September 17th, 2026` · `Retirement: April 17th, 2027`.
  - Also: "You may experience longer queue times during peak usage hours."

Dated residual: by 2027-04-17, before the 2027-03-23 brownouts, CI and production move together to a mongod whose kernel guard accepts the newer runner kernels (8.0.35 / SERVER-131779). Per §0gh.1 that is one deliberate act on both.

## Read-only cell-of-record steps (one per mongo job)

- `api-tests` and `e2e-tests`: `echo "kernel $(uname -r)"`, then pymongo `server_info()['version']` against the live service. That is the running server's buildInfo; inside the e2e job container, `uname -r` is the runner's kernel.
- `prod-compose`: `uname -r`, then the image resolved by `docker compose -f docker-compose.yml -f docker-compose.prod.yml config --images`, the same two-file composition the deploy hook uses, then `docker run --rm <img> mongod --version`.
  - It was dry-run locally: `image mongo:8.0.20`, `db version v8.0.20`.
  - pymongo is present in the uv env (`pymongo 4.16.0`).

## actionlint

⟨`actionlint .github/workflows/ci.yml | grep -c 'shellcheck\|error'`⟩ → `1`, both at HEAD before the edit (`git show dc30e5e:…`) and after it.
- The single finding is the pre-existing SC2016 *info* in the e2e `Producer-held manifest` step: a `node -e '…'` single-quote heredoc, intended.
- `.m2` adds none.

## Production data files and FCV: unchanged (stated, with source)

Production already runs mongod **8.0.20**. COHESION §0gh.1 records it as measured on the host on 2026-10-19 (Ubuntu 22.04, 6.8 kernel).

The pin names the same patch release production runs:
- the on-disk WiredTiger data-file format does not change;
- `featureCompatibilityVersion` does not change. It moves only on an explicit `setFeatureCompatibilityVersion`, and none is issued anywhere in this unit.

Before the pin, the floating `mongo:8.0` tag would have moved production to 8.0.34 on its next pull. The pin removes that drift.

Recorded for `.d`: compose recreates the mongo container at the next deploy, because the service's `image` string changes from `mongo:8.0` to `mongo:8.0.20`.
- That deploy pulls `mongo:8.0.20` (digest above).
- It is the same binary release, on the same named volume.
- `.d`'s lock already requires a backup before any mongo recreate, and it reads the mongod version and FCV after the deploy.

## Interpreter (inherited consequence of the runner label; same file, same concern)

The first m/w1 run, `39304476891` at `a60c542`, booted the mongo service at 8.0.20 on the 22.04 runner (log: `"buildInfo":{"version":"8.0.20"…`; runner `Image: ubuntu-22.04`, `Version: 20261012.322.1`).

`api-tests` then failed at `uv sync`:
- 22.04's system Python (3.10) is below `requires-python >=3.12`;
- so uv fetched its newest managed `cpython-3.15.0`;
- `error: Distribution ai-edge-litert==2.2.0 … only has wheels with … cp312, cp313, cp314`, exit 2.

On `ubuntu-latest`, uv had used the system 3.12.

Cure (`9519b6f`): `api-tests` `env: UV_PYTHON: "3.13"`, which is production's interpreter (`api/Dockerfile:1 FROM python:3.13-slim`); the local dev venv is also 3.13.5. setup-uv@v3 has no `python-version` input (⟨`gh api …/setup-uv/contents/action.yml?ref=v3`⟩ input list), so this is the idiomatic statement.

`e2e-tests` is not affected: it runs in the `playwright:v1.61.0-noble` container, whose system Python is unchanged by the runner label.

## m/w1 CI readings (job logs via ⟨`gh api repos/mkbabb/fourier-analysis/actions/jobs/<id>/logs`⟩)

### Run `39304476891` at `a60c542` (dispatch)

**prod-compose** (job `118237845434`): **success**.
- `Image: ubuntu-22.04`, `kernel 6.8.0-1064-azure`, `image mongo:8.0.20`, `db version v8.0.20`.
- `[prod-compose-smoke] PASS`, and deploy-switch-smoke A/B PASS (`the edge failed 0 of 121 polled requests`).
- ⟨`grep -c 12257600`⟩ → `0`.

**api-tests** (job `118237845953`): failure at `uv sync` (cpython 3.15; see Interpreter above).
- The mongo service itself booted: the container log reads `"buildInfo":{"version":"8.0.20"`.

**web**: success.

### Run `39304717107` at `9519b6f` (dispatch)

**api-tests** (job `118238685002`): **success**.
- `Image: ubuntu-22.04`, `Using CPython 3.13.16`, `kernel 6.8.0-1070-azure`, `mongod 8.0.20`.
- `345 passed in 59.96s`.
- ⟨`grep -c 12257600`⟩ → `0`.

**prod-compose** (job `118238684690`): **success**.
- `Image: ubuntu-22.04`, `kernel 6.8.0-1064-azure`, `image mongo:8.0.20`, `db version v8.0.20`.
- `[prod-compose-smoke] PASS`; deploy-switch-smoke A (`0 of 117`), B (`0 of 23`) and C (`0 of 17`) PASS.
- `12257600` ×0.
- prod-compose is therefore GREEN ×2 across the two runs.
