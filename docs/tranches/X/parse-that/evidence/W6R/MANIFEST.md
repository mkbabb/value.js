SERVED MODEL: claude-opus-5-5

# X.P.W6R `.p` evidence — parse-that's AC-1 research instruments (R-r-1)

**Moved:** 2026-09-23, unit X.P.W6R.p (spec `docs/tranches/X/parse-that/waves/W6R.md` `.p` R-r-1; COHESION §0cg).
**Source:** parse-that `master` at commit `92d8ea7` (`refactor!: parse-that returns to a general parsing library — the CSS surface retires …`). The worktree bytes equalled HEAD for every path (`git diff --quiet HEAD -- harness experiments/w2` → exit 0) when copied.
**Scope:** `git ls-files harness experiments/w2/contract experiments/w2/corpus experiments/w2/stage0` → 62 files, copied with their paths preserved beneath this directory. They are removed from parse-that in one ordinary `git rm -r` commit after this evidence lands.

## Why they left parse-that
- They are the AC-1 research instruments of the retired CSS surface: the equivalence, bench and totality harnesses and the W2 contract, corpus and stage-0 experiments. With `./css` retired at `92d8ea7`, parse-that is a general parsing library again, and these instruments measure nothing it ships.
- They are not portable. `harness/equivalence/harness.ts:73-74` imports from an absolute `/Users/mkbabb/.claude/jobs/9e7dadd0/tmp/parser-proof/…` path, and `:91` names one (also `:19` comment, `equivalence-results.json:68`, `harness/totality/lib/config.mjs:71`). A library repository cannot carry a job-scratch path.
- They are kept here, byte for byte, as immutable evidence (E-3). They are not expected to run from this location.

## Files (sha256 of the bytes at `92d8ea7`)

| sha256 | path |
|---|---|
| `83ba069bc5553c56c00468a6e82a2b42c4b24af13d5375d6effd73d7d574c022` | `experiments/w2/contract/ALGEBRA-ADDENDA-2026-09-18.md` |
| `67c8253abaecb29a0b16a862bf63ad25ff1140d91f06248c843b9c253fc537de` | `experiments/w2/contract/ALGEBRA.md` |
| `14bcc998ad3e85068cc41c1a318870af94014b485631690eaf1b507a48aeac4a` | `experiments/w2/corpus/build-corpus.mjs` |
| `e6e5f3b5322a7d0b871dc19d5c73f3ab4fb21888a7a0577ae617873e7eaf0b5a` | `experiments/w2/corpus/fuzz-gen.mjs` |
| `3726287bfc1184a2b82879393e4af75acca95a52ee9baa00d0e944c40be896d4` | `experiments/w2/corpus/fuzz-seed.json` |
| `fc00ee3528ecd8bfe28afbb9e5384103232f45a00caa762a0abe4d6d50ac6bf2` | `experiments/w2/corpus/r1.json` |
| `1b3172e77fc7beb83bd956bb6de84dcb806a8ec7e12cc5814d3186d67e84b215` | `experiments/w2/corpus/slice.json` |
| `d6f9a6ab3058bc457bea1ec62fa8defc6ff2d527079e26200095e1a4c7f2d90e` | `experiments/w2/stage0/ADMISSION.md` |
| `144b963291b9e9420c334d05bd9cae143677b2fa35531f0b9aaa5960d12dabc3` | `experiments/w2/stage0/ac1-signature-instantiation.mjs` |
| `19f039d66933a62bb4de0c2a94b4172db9cdd43c6844ebd0011aee39fc9b2128` | `experiments/w2/stage0/ac2-ir-closure.mjs` |
| `b4d2c317e147fd36e7279f7462ebac675d24a62f47dd669d96b4e0ea22022ac4` | `experiments/w2/stage0/ac3-boundary-cost.mjs` |
| `005a5d88fe1c24d8c9cd528f6b0d00d951e62d9d725e69bfbc431fc0f1804684` | `experiments/w2/stage0/ac4-table-expressibility.mjs` |
| `28ba0b9b828ef822c7abd51e516d8523eec059dc45dc5730fcf3678245420167` | `harness/README.md` |
| `e80542eb9a6fd0ed692a8e0e35e2bdeb211e06d0bc6cb43bebf41c00f52c365b` | `harness/bench/METHOD.md` |
| `4fa3473edd1a5547bbe06d7f20f3fe5d852eb126e0b2890fd6cb369988ae31d6` | `harness/bench/aggregate.mjs` |
| `e5cc044080cabeb5844535e5dd4b2565753e146e0576dd83ff83fc6fcfa8a0fa` | `harness/bench/bench-raw.json` |
| `4282f579e582079acef662b3bc66dd0122cd150c9b673883b9cbf32b7cb6e0c3` | `harness/bench/bench-results.json` |
| `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855` | `harness/bench/bench.stderr` |
| `f5e0a9457d086bc5b596e68e3cee3e5c0c0a5959c23b44c5185756bd5819cdcd` | `harness/bench/bench.ts` |
| `e5347bed59801562721ae400de12b00d02710749d1a72b6f5bee2236dfe195d6` | `harness/bench/cell.mjs` |
| `517f8d68b103af5e6064ab07f936aca347ae7247f9ca0616af885362b109a435` | `harness/bench/census.mjs` |
| `dd49c754feb07e68862c8dd9dab6d9b65c73bb3dde005ae536151c68d498d74d` | `harness/bench/diagnostics-suite.mjs` |
| `7e67c29d779b55390303cdd6ef5a55f21da4885a963e6e8285709c6e91d5a1d1` | `harness/bench/finalize.mjs` |
| `743383e2c05610ef27ca6fe4160ca3c6edfb63a55b476207cac2f4ee4ed496e9` | `harness/bench/lib/boundary.mjs` |
| `59a879ecf0df59fb251260911f1a3c501b7afdc2452c376fd0653e2997d8c593` | `harness/bench/lib/corpora.mjs` |
| `8fc3348a66bfc0d7234faec0a857d43e6b52ee91e590f7c9a189381f0a005061` | `harness/bench/lib/engines.mjs` |
| `5a45fb699f4741873bef774a2336e22b44112243c1ac55d976575c2dc38b936b` | `harness/bench/lib/latch.mjs` |
| `4934e7f8b6106475a95edad9369d3990daad032d8b1cda3ff29ac0c9c6150c20` | `harness/bench/lib/stats.mjs` |
| `cb0754aab0275568fda0d8f67e6eb55dd9f2ec6289abafe887d58a3a8a2c01aa` | `harness/bench/package.json` |
| `c6649cadd10f2aca7227482bc0c05ea1f9aaf3159e563a052f65aeea0f0a4ff8` | `harness/equivalence/corpus.json` |
| `fd433849c5841f6dfcf96cdecd2afa591e80a7ec493e50eee3ac6347eb4c3e48` | `harness/equivalence/declared-divergences.ts` |
| `4c82e91c5435df2d9cd75ee2f04095ffc3f3355406804c6927642fcdf56f2215` | `harness/equivalence/equivalence-results.json` |
| `9b73be4e8d4391e7456c9df2025f85d688528ee3a92abe7a7d2dbe6c2b2c1b4d` | `harness/equivalence/harness.ts` |
| `ef3ade0d43c036cce7585ea28989f7d26d29a220216ada6c58af905c3a2bc7b2` | `harness/equivalence/taxonomy.ts` |
| `a18644f3f2aab9b3be36b13e736767be559b536b323be9e365c58bc3dd86a306` | `harness/totality/README.md` |
| `6fbfff14eeafc7770753feea4dbc6cc4da7692f4afe091718de7c97f12008e1e` | `harness/totality/derive.mjs` |
| `c4851498d2bcd1d3f378ac6e317e91ccf90bc41d4a2a2d081834cadaf96cfeba` | `harness/totality/lib/candidates.mjs` |
| `2ad1e0041bb91217ade8966baa96835de5f58e9d3167d74f77d1f120b93c33d5` | `harness/totality/lib/classify.mjs` |
| `7b18e6fb6c713fc1e304948afa9efef789b1223d5525cd26cb722e904061bf45` | `harness/totality/lib/config.mjs` |
| `3784e6e4b28196b968dc82c1847b6a43599c578d890e1876172aa0dd9206c402` | `harness/totality/lib/kf-seams.mjs` |
| `567586ad9ccf9e8376c77220152b7a0bee2f4ec69b4000fae0a741ef30b7e99d` | `harness/totality/lib/probes.mjs` |
| `2d0ef5be1e1a36e2cdd1c5d6ec26798a4f9ec0ffdbbe52c9c62ccaa80504c486` | `harness/totality/lib/report.mjs` |
| `5ad2460f1f0e834f7120b557b8275aa98f904e29322163ce5d92db8e50a25e49` | `harness/totality/lib/surface.mjs` |
| `f6b142a2b9a0bcb525205d42fa44767e4dbf491d98c5d812871226a209e80e13` | `harness/totality/manifest.json` |
| `83b41c4c1be160b91e79fe4d4d2c33b11b46652e30571f5e99a06c266986247e` | `harness/w2/README.md` |
| `fde31ac7a957bae8dc54e537eae121351794969b9cabb0b7546b1ee75ed19f6e` | `harness/w2/alloc-latch.mjs` |
| `813a8adb0b71ffeb027802b923dd67e367e62c85b2873fa39213411a22b6b85f` | `harness/w2/coverage-52-report.mjs` |
| `a3f6d8b992d287d5b6c5cff2f1d8faa8d708e9faa3bce040e65ae633e7f585a0` | `harness/w2/depth-scan.mjs` |
| `c039612d595591aefa23cc653f64f66452787f7e138d4a276d376ae63d07a5a7` | `harness/w2/eq-six.mjs` |
| `1333bb40b85dbd65827a8b7a111d40fd8202c2395d14dc18e5474c748eb5767c` | `harness/w2/idiom-nocst.mjs` |
| `d69124bce3e44757c6b169334370444c6880f3df70f09961203958ed1e1ee1c2` | `harness/w2/lib/candidate.mjs` |
| `71120988b1503c60aef449fd61cf42a4cc6edd96526df221dbd3b0c83bfa9e91` | `harness/w2/lib/contract.mjs` |
| `371e587dfc6edffc0b77687619f19de9cc80312515b55f9293b0af98dff01eba` | `harness/w2/lib/published.mjs` |
| `7ddeabb943d8e67a58de672a121b9094da3f1ca003b79f3cdc6ba9731af03d58` | `harness/w2/lib/report.mjs` |
| `22cc9e0de8d51f0fca1e8853fc92315cea72a51f15610d51dc9e0697ff144640` | `harness/w2/lib/serialize.mjs` |
| `f0df44097557c167bf1d3fba8a3bab3787861a8fd13cd52731ed676a34967b96` | `harness/w2/lib/term.mjs` |
| `9b13b4ffc759202f9b707170fe41e6273214118d75185689c1ffb27f5cc2c925` | `harness/w2/lib/wasm.mjs` |
| `e42b76659b8853339c420aa3093f02614baf230ce920be6d74e6120e91b3b805` | `harness/w2/op-bijection.mjs` |
| `81f4dd24b44629511a3bb807568874b840db406a3d0f1cd2d0906905fc5f91c3` | `harness/w2/r1-candidates.mjs` |
| `6f62b59377bd66f899eae6c9166074d851668dc8956efeb112234ccd2a8c2b32` | `harness/w2/recovery-laws.mjs` |
| `137d6830a93542ce4489e0db20e468a669b0be4dbbebdd04de42bcf6bc606f82` | `harness/w2/substrate-receipt.mjs` |
| `dbbc83305c40a179e29c465450736cf0c98f7a760d356722aaec310a50fa7066` | `harness/w2/wasm-audit.mjs` |

Rows: 62. Verify: from this directory, each row's `shasum -a 256 <path>` equals its sha256; at parse-that, `git show 92d8ea7:<path> | shasum -a 256` gives the same.
