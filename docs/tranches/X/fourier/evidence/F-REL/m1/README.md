SERVED MODEL: claude-opus-5-5

# F-REL.m1 — mongo pin vs SERVER-121912: the read (2026-10-19)

## 1. The runner and the refusal (CI run 39292117114, compose-boot job, runner image ubuntu-24.04 20261018.339.1)
- Kernel: `OS: Linux 7.0.0-1017-azure` (nginx boot notice in the same job; `ci-39292117114-refusal.txt`).
- mongod: `"id":12257600 … "MongoDB cannot start: Linux kernel versions 6.19 and newer has a known incompatibility with this version of MongoDB. See https://jira.mongodb.org/browse/SERVER-121912"`.
- The floating `mongo:8.0` tag at that time = 8.0.34: Docker Hub `tags/8.0` digest `sha256:4a4ab5d48342…` (updated 2026-10-17) = `tags/8.0.34` digest `sha256:4a4ab5d48342…`.

## 2. JIRA (REST `https://jira.mongodb.org/rest/api/2/issue/<key>`)
- **SERVER-121912** (https://jira.mongodb.org/browse/SERVER-121912) "Upgrade tcmalloc to include rseq bug fix": Closed / "Gone away", fixVersions `[]`. MongoDB comment 2026-06-04: *"This will be fixed in SERVER-125742."*
- **SERVER-125742** (https://jira.mongodb.org/browse/SERVER-125742) "Remove the graceful exit for kernel version 7.0.14 and above": Fixed 2026-07-24, fixVersions `9.1.0-rc0, 9.0.0-rc1, 8.3.9, 8.0.30`. *"Linux kernel versions 7.0.14+ and 7.1.0+ (inclusive) restore previous userspace behavior."* The 8.0 release notes (https://www.mongodb.com/docs/manual/release-notes/8.0/) list it under 8.0.30.
- **But the 8.0.30 exemption parses `uname -r`**, so Ubuntu kernels (which keep `X.Y.0`) never match — **SERVER-136848** (Open): *"MongoDB 8.0.32, 8.3.11, and 9.0.2 (official Docker Hub images) all exit during startup … `uname -r` 7.0.0-38-generic … upstream 7.0.14"*. The runner's `7.0.0-1017-azure` is this case; SERVER-131779 comment 2026-10-14: *"Ubuntu 24.04 VMs using the linux-azure kernel … `uname -r` reports `7.0.0-1017-azure`, while Ubuntu's ProcVersionSignature reports upstream kernel `7.0.14` … MongoDB still refuses to start."* Our CI reading confirms it for 8.0.34.
- **SERVER-131779** (https://jira.mongodb.org/browse/SERVER-131779) "Add linux the kernel 7.0.14 exemption for ubuntu": Fixed 2026-09-16, fixVersions **`9.1.0-rc0, 9.1.0-rc1024, 9.0.4, 8.3.14, 8.0.35`**. SERVER-136848 comment 2026-10-17: *"With the release of MongoDB 9.0.4, most of the issues on Ubuntu 24.04.5 (with the HWE kernel) and Ubuntu 26.04.1 have been resolved … even after 8.3.13 got released, it still fails."*

## 3. Official images on Docker Hub (2026-10-19, `hub.docker.com/v2/repositories/library/mongo/tags?name=…`)
- 8.0 line: `8.0.30` (09-10), `8.0.32` (10-02), `8.0.34` (10-17) — **no `8.0.35`** (query `name=8.0.35` → `[]`). 8.0 release notes newest = 8.0.34 (Oct 13, 2026).
- 8.3 line: newest `8.3.13` (10-17) — no `8.3.14`.
- 9.0 line: `9.0.2`, **`9.0.4` (10-17; variants `9.0.4`, `9.0.4-resolute`)**.
- **First official image tag carrying the fix that applies to this runner's kernel: `mongo:9.0.4`** — a new MAJOR, not a newer minor. No 8.0.x (nor 8.x) image ships it yet; the 8.0 fix is `8.0.35`, unreleased.

## 4. Data-file / FCV read (for the ruling)
- Upgrade docs (https://www.mongodb.com/docs/manual/release-notes/9.0-upgrade-standalone/): *"To upgrade an existing MongoDB deployment to 9.0, you must be running a 8.3 or 8.0 release."* So an 8.0 data volume is a lawful 9.0 starting point; FCV would stay `8.0` unless `setFeatureCompatibilityVersion` is run (not proposed). Not exercised here (no pin landed).
- Staying on 8.0.35 when it ships keeps the data files and FCV `8.0` byte-for-byte (patch release).

## 5. Verdict
The ruled cure (same major/minor family unless the fix exists only in a newer **minor**) cannot be landed at the bytes today: the only published image whose fix applies to the runner kernel is 9.0.4 (major jump). ESCALATED (ESC-FREL-m1-1); no pin edited, no commit to fourier.
