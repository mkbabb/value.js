# H.W4 Lane E — CONTRIBUTING.md gaps closure

**Date**: 2026-05-26.
**Branch / HEAD**: `tranche-h` @ `d5d570b` (pre-lane edits).
**Scope**: close the two `audit/H-AUDIT-6 §5.2` documentation gaps in `CONTRIBUTING.md` (authored at G.W4 close).
**Author**: H.W4 Lane E agent.
**Bounds**: `CONTRIBUTING.md` (edit), `docs/tranches/H/audit/H.W4-lane-e-contributing-gaps.md` (new). Nothing else.

---

## §1 — Pre-state

`CONTRIBUTING.md` at the lane-open commit (`d5d570b`) had **73 lines** and the following sections:

1. `## Repository constellation + sibling checkout layout`
2. `### Why file: devDependencies`
3. `### Sibling-cwd codemod execution`
4. `## Development` (npm-script quickstart)
5. `## Invariant proof scripts`
6. `## Conventions`

Per `audit/H-AUDIT-6 §5.2` ("CONTRIBUTING.md completeness"), two gaps were identified:

| Gap | Audit ID | Description |
|---|---|---|
| 1 | H-OPP-E2E-2 | No mention of `npx playwright install`, nor that the smoke-safari project needs WebKit installed locally. |
| 2 | H-OPP-CI-1 | No mention of the manual publish process (the project ships via `npm publish` from a maintainer machine — no tag-triggered workflow). |

`grep -n "playwright install" CONTRIBUTING.md` → 0 matches.
`grep -n "RELEASE.md" CONTRIBUTING.md` → 0 matches.

---

## §2 — Post-state — insertions

### §2.1 — Playwright browser-installation guidance (Gap 1)

**Section**: `## Development` (the npm-script quickstart).

**Insertion A** — added to the fenced npm-script block (now line 46):

```
npx playwright install           # one-time: fetch all browser binaries (chromium + webkit + firefox)
```

**Insertion B** — added as a follow-on paragraph below the block (now line 54):

> `npx playwright install` is a one-time setup step. The e2e smoke suite spans 5 Playwright projects: `smoke` + `smoke-admin` + `smoke-reactivity` run on Chromium, `smoke-mobile` on Pixel-7 Chromium, and `smoke-safari` on iPhone-14 WebKit — so a local full-suite run needs both Chromium and WebKit installed. CI installs the narrower `chromium webkit` pair only (see `.github/workflows/node.js.yml`).

The paragraph spells out the **why** (5 projects → Chromium + WebKit needed locally) and pins the CI delta (CI's narrower `chromium webkit` install) against `.github/workflows/node.js.yml` so the doc has a single audit anchor.

### §2.2 — Publish process reference (Gap 2)

**Section**: new `## Release` section appended after `## Conventions` (lines 77–79).

**Insertion C**:

```markdown
## Release

Publishing is a manual, tranche-close ceremony — there is no tag-triggered release workflow. For the full publish sequence (version bump, CHANGELOG header, `npm publish --legacy-peer-deps`, tag-push, GitHub release), see `docs/RELEASE.md`.
```

This section is **forward-looking**: it references `docs/RELEASE.md`, which is concurrently being authored by H.W4 Lane D. By the time a contributor reads CONTRIBUTING.md at H.W4 close, RELEASE.md exists. Lane E did **not** author RELEASE.md itself — that is Lane D's bound.

---

## §3 — Lane D coordination

| Concern | Lane E (this lane) | Lane D (parallel) |
|---|---|---|
| Authors `docs/RELEASE.md` | NO | YES |
| References `docs/RELEASE.md` from CONTRIBUTING.md | YES | NO |
| Documents `npm publish --legacy-peer-deps` step-by-step | NO (one-line reference only) | YES (full sequence) |

The two lanes are non-overlapping; the close-order is irrelevant for correctness (the `docs/RELEASE.md` reference resolves at H.W4 merge, not at lane-author time).

---

## §4 — File-bounds discipline

Lane bounds (per the lane prompt + `H.W4.md §Lane E`):
- `CONTRIBUTING.md` — edited (Gaps 1 + 2 closed).
- `docs/tranches/H/audit/H.W4-lane-e-contributing-gaps.md` — newly authored (this file).

**Zero other files touched.** No cross-repo writes. No restructure of CONTRIBUTING.md beyond the two minimal additions.

---

## §5 — Sub-gate evidence

Per the lane prompt's sub-gate:

```
$ grep -n "playwright install" CONTRIBUTING.md
46:npx playwright install           # one-time: fetch all browser binaries (chromium + webkit + firefox)
54:`npx playwright install` is a one-time setup step. ...
```

→ **2 matches** (≥ 1 required). ✅

```
$ grep -n "RELEASE.md" CONTRIBUTING.md
79:Publishing is a manual, tranche-close ceremony — there is no tag-triggered release workflow. For the full publish sequence (version bump, CHANGELOG header, `npm publish --legacy-peer-deps`, tag-push, GitHub release), see `docs/RELEASE.md`.
```

→ **1 match** (≥ 1 required). ✅

Markdown structural validity:
- Heading levels remain monotonic (`#`, `##`, `###`).
- No orphan list items.
- The new `## Release` section sits at the same level as `## Conventions`.
- `wc -l CONTRIBUTING.md` → **79 lines** (was 73; delta = +6 lines).

---

## §6 — Verdict

Both `audit/H-AUDIT-6 §5.2` gaps closed via minimal, gestalt insertions:

- Playwright install — added inline in the dev quickstart, with a contributor-facing explanation that pins the 5-project topology to the CI install delta.
- Release process — referenced from a new `## Release` section pointing at the Lane D `docs/RELEASE.md` deliverable.

CONTRIBUTING.md is now complete vis-à-vis the H-AUDIT-6 §5.2 enumeration. No further H-OPP-E2E-2 / H-OPP-CI-1 documentation surface remains.
