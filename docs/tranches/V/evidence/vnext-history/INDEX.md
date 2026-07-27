# V-next historical apparatus ledger

This directory preserves byte-identical pre-union review, provider/session/custody,
fixture-generation and RR-17 artifacts removed from the active V-next authority by
the adjudicated apparatus diet. These files are evidence only: they grant no
current formation, clean-pass or execution credit.

Canonical ledger rows are sorted by their former path and encoded as
`sha256<TAB>decimal-bytes<TAB>former-path<LF>`. The 51 rows contain 878,130
bytes; their canonical ledger SHA-256 is
`1c1af01760144e1e9c4920a69b01caa765609ce707fa590dc29b6841534f3811`.

| Former path | Bytes | SHA-256 |
|---|---:|---|
| `AUDIT-REGISTRY.md` | 15807 | `991231d27895358f875e5dea99969d618745d8c06e87727bd35eba0e7638f36e` |
| `CLEAN-PROVIDER-BOOTSTRAP.json` | 1974 | `a3e74b866279e7a9651e3bb53f4cd30aba95de841f9e2590475361b3bfd05098` |
| `FORMATION-SEAT-LEDGER.json` | 59907 | `9b5b55fe4ced04e17c73f5f36ef7c5fd19b8f82946b67d27976b637daa5a2ab9` |
| `formation-clean-passes.schema.json` | 8445 | `74d7078e22379517864eca4445e5fa9aa664063ffd2282460400187a99b8c03e` |
| `reviews/A-ADJUDICATION.md` | 7953 | `f12cf78c24483143462f11391401271ac93c5c9db0657669bd39ada5f746eb12` |
| `reviews/CANONICAL-ORDER-SKEPTIC.md` | 15190 | `4ce034fe4005fa140221cdb5c87e47bd253649ecc77698b3f13e176c230450e6` |
| `reviews/DEPENDENCY-EPOCH-ADJUDICATION.md` | 5149 | `474733420902079d89b5b66303d6d860fde4a541ce3bab1622207460369e8fa5` |
| `reviews/EXTERNAL-EPOCH-FIXTURE-REPAIR.md` | 10779 | `e93342df8086d6b1f98ed87be348def8a9c9f74af26929ee78b6efd841121e39` |
| `reviews/EXTERNAL-EPOCH-FIXTURE-SKEPTIC.md` | 11371 | `0c0f3a04f7e3ab063e18073f6f622ba8bea9aff2e203ea0d763e6bf786613567` |
| `reviews/GD-ADJUDICATION.md` | 12322 | `c9c116cd32b8f3e2b04ca852720a178f364aa05b1dc9890969aa94d6095b3e7d` |
| `reviews/K-ADJUDICATION.md` | 7641 | `160e1b427657007f4c00ff5d1da8f3dd3a206f8561b34cb593f70f1fcd3e971a` |
| `reviews/MC-ADJUDICATION.md` | 11663 | `e74b7c6061a5cd8dad3143051c0b1722ef9a5c941373c2bb7b1d073c8e04881e` |
| `reviews/P-ADJUDICATION.md` | 5707 | `71f4fead2e9d5a8ed6ecb32e90287c0804870c0a2c1b62e768ce5614ec9861df` |
| `reviews/ROOT-REOPENING-ADJUDICATION.md` | 16463 | `88096f758cef055c9dac36996f2270b61ddf43d4a35021196222226d2617039d` |
| `reviews/ROOT-REPAIR-ADJUDICATION.md` | 12771 | `50ba150387091c7edd182b294fffeb89b5db7c953911838b8b99dd33e4a44b72` |
| `reviews/ROOT-REPAIR-IMPLEMENTATION.md` | 15627 | `71f73ae64e22669a32655c79ee0363e6e136867e6b7e543d4087ad2e675cb5de` |
| `reviews/ROOT-REPAIR-R2-SKEPTIC-A.md` | 2264 | `f60a8e284b7655e1bc67a3b908abd9796bf722cbd1ddaa308c31d2db0577cbfa` |
| `reviews/ROOT-REPAIR-R2-SKEPTIC-B.md` | 1784 | `a19403b7db94f8048f297597fd69301e3c0b048ce5a8ed22b78189cda0e9b2c0` |
| `reviews/ROOT-REPAIR-R3-ADJUDICATION.md` | 24110 | `bb09443031738dff21e0460bfa9f50bd7f7bbdb113fc0f814ebea66bebc564d5` |
| `reviews/ROOT-REPAIR-R3-SKEPTIC-A.md` | 11680 | `b15a6c4dd0976169970fd5a772bd397b8f96a832800d4de4bef4fda6d46ba352` |
| `reviews/ROOT-REPAIR-R3-SKEPTIC-A2.md` | 14336 | `739259185e1785c5be4489e407e43e3a36ef71f90989254a89c95eff4453544f` |
| `reviews/ROOT-REPAIR-R3-SKEPTIC-A3.md` | 15479 | `289f665ae6374dac6171f751220977650d95cf3c9f1e7509fd6e13fe3d5eb767` |
| `reviews/ROOT-REPAIR-R3-SKEPTIC-B.md` | 22846 | `b5ce469d9163934e85b6b17000b8e4ed2d05cb95e081a42207325f7dc81d62e9` |
| `reviews/ROOT-REPAIR-R4-ADJUDICATION.md` | 12224 | `6c559bd37f247a464d09716c6422a58aff8402caeacdc4e21008be88d4de0f0f` |
| `reviews/ROOT-REPAIR-R4-SKEPTIC-A.md` | 14888 | `87549789d084a390fa3fea429767b1c4404dfa4933fc5e387ac8ec256e2e20bb` |
| `reviews/ROOT-REPAIR-R4-SKEPTIC-B.md` | 15207 | `40c03f1ceb1802792e3e4b3e2d2ab57c1d28f0545af9757906ca4f19cc82cfdf` |
| `reviews/ROOT-REPAIR-SKEPTIC-A.md` | 3819 | `c55b37fef15219e730268bf416d108ec7a4232bf8cbe8ae34e7e8f535a1c4246` |
| `reviews/ROOT-REPAIR-SKEPTIC-B.md` | 3205 | `4c3484b9c82a40af61f5e2e97d66b8519f5e05261a13d52c858370f3922abf0f` |
| `reviews/UNIVERSAL-VALUE-EPOCH-SKEPTIC.md` | 4103 | `ca7795fc2918ce2e27831d697df01019c3b8c35cffea8f977c2cf832f6ee326c` |
| `reviews/V-ADJUDICATION.md` | 9917 | `afe8058aa373b34125db564a8d2f4d50c8d2fffdfe2d07fb0998213262e699cd` |
| `reviews/X-ADJUDICATION.md` | 5103 | `44779bbb4a71cb4d67ed8b454b548478b45603c82efc2301d013d48f585d3fe6` |
| `tools/build-seat-ledger.mjs` | 17181 | `f1a04e8ce72a760634e9fc387e5cea42a3214ffdfe56a43f09e0f1447da581bf` |
| `tools/clean-coordinator-custody.mjs` | 40537 | `00f61adee3b8831fe088101f2eeb9bce2a556645ddaf54368e34d6c1aebad74f` |
| `tools/clean-exec-contract.mjs` | 78326 | `573ac2f6f8dfe8c9f27460f052383f39d960f59336138a208c4d9c5e3ff8d756` |
| `tools/clean-provider-bootstrap-authority.mjs` | 9813 | `0a6581fff3ca3e46ff2b8588b307418d56e0c9e49809e31310ebf936f4c57150` |
| `tools/consumer-immutable-capture-authority-fixture.mjs` | 4353 | `7e8fe778d5d99af2e1cfab0d3f29d009d96212d658bf7c438fa857a8a3d55032` |
| `tools/consumer-universe-fixture.mjs` | 26558 | `51ba7d665f130ee184a73b76add152a9f0bff634053865b831e6f5c798eb9f09` |
| `tools/consumer-universe-return-mode-fixture.mjs` | 6969 | `4ec5873a0527e4aa759dc9b58e2de0b9510ac995f9b5a7c9fc0fc1ac77612744` |
| `tools/probe-clean-report-absence.mjs` | 968 | `f90c13ff32ed8635c8e006a55b67fe0ed7a2616ba3c2b1778b3f055cf58c2c81` |
| `tools/read-clean-critic-report.mjs` | 1482 | `e6e9a1f227ba632c23a363201bcfa1f11a49b121f8d5d3977335bd85d5e20bef` |
| `tools/read-formation-evidence.mjs` | 1981 | `8559930e0b9f8c2e592b8b4a2292472d835df97abac90e37b6f12c4bb8d840e6` |
| `tools/seat-ledger-session-index.mjs` | 697 | `7ab66c2703a235ca1a3fbd2a6d210669207c78c33186f2b0d99d2fa8b69ef00e` |
| `tools/selftest-clean-coordinator-custody.mjs` | 35376 | `9e7bb3d26bd97782c193bc28a402771e99767f6d3662c8f69d44938acad3de5f` |
| `tools/selftest-clean-exec-contract.mjs` | 68558 | `8ddb250c49c6cff6ec3a78036cf2193ef84137e5abc947a0e492f1a3811dffdc` |
| `tools/selftest-clean-pass-prompts.mjs` | 4134 | `cfc74b82c559d2136079c3bc6dbf06de7182fba95b3d2ce1245840071018bef5` |
| `tools/selftest-clean-provider-bootstrap-authority.mjs` | 3440 | `a02e548638f534f06d9bd7fecdeeb96503a06f2caa4475881b65862cdaf29230` |
| `tools/selftest-formation-proof-layer.mjs` | 6671 | `2cbbc9113b14935b60d33276994f52011e955c165c33685a960a5b06326db2c4` |
| `tools/validate-clean-passes.mjs` | 56850 | `8c71e160ba08fe7987a36e04c49609f8349017d6bd611f05cee6074ebfc118c8` |
| `tools/validate-seat-ledger.mjs` | 24142 | `1ab117a2e93114c48fd57d2ae8d1810fa54592556a95c7880d75ff928967630d` |
| `tools/value-target-resolution-fixture.mjs` | 73945 | `2c65b927a5c20e33c047212a09b93f36a34e7f515cb0e42917c3e1ee8f51d206` |
| `tools/value-target-transpose-fixture.mjs` | 36415 | `40af73f1141fd0256887cd984e768826e6020708698a9a8c69d550aeefd62e39` |

The former-path hierarchy is retained below this directory under `reviews/`,
`tools/`, `schemas/`, and `data/`. Later diet ledgers append rather than mutate
this sealed 51-row epoch.

The separate `DEFERRED.md` ledger seals the 44-file universal-return, P01 and
standalone-selftest epoch before replacement by the compact active contracts.
`KEYFRAMES-FOLDS.md` seals two later standalone validator wrappers after their
retained mechanics moved into the surviving Keyframes validators.
`API-COVERAGE-FOLD.md` seals the duplicate generated API return projection and
standalone checker after direct source/wave derivation replaced them.
