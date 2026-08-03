// CHALLENGE-L pass 4 — WHICH value.js artifact does each regime resolve?
//
// This file lives INSIDE the `@mkbabb/value.js` package, so Node's
// self-reference resolution applies to it exactly as it does to `demo/test/**`.
// `import.meta.resolve` therefore answers the question vitest's externalised
// deps answer at run time.

import { createHash } from "node:crypto";
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const REPO = path.resolve(fileURLToPath(import.meta.url), "../../../../../../../..");

const sha = (p) =>
    existsSync(p) ? createHash("sha256").update(readFileSync(p)).digest("hex").slice(0, 16) : "(missing)";

const specifiers = [
    "@mkbabb/value.js/color",
    "@mkbabb/value.js/css",
    "@mkbabb/value.js/easing",
    "@mkbabb/value.js", // the bare root — declared in tsconfig.demo.json paths
];

const rows = [];
for (const s of specifiers) {
    let resolved = null;
    let err = null;
    try {
        resolved = fileURLToPath(import.meta.resolve(s));
    } catch (e) {
        err = `${e.code ?? e.name}: ${String(e.message).split("\n")[0]}`;
    }
    rows.push({
        specifier: s,
        nodeSelfReferenceResolvesTo: resolved ? resolved.replace(REPO, "<repo>") : null,
        error: err,
        sha256_16: resolved ? sha(resolved) : null,
    });
}

// The two artifacts that both claim version 4.0.0.
const pairs = ["color", "css", "easing", "math", "transform", "quantize", "value"].map((n) => {
    const local = path.join(REPO, "dist/subpaths", `${n}.js`);
    const installed = path.join(REPO, "node_modules/@mkbabb/value.js/dist/subpaths", `${n}.js`);
    const localD = path.join(REPO, "dist/subpaths", `${n}.d.ts`);
    const installedD = path.join(REPO, "node_modules/@mkbabb/value.js/dist/subpaths", `${n}.d.ts`);
    return {
        subpath: n,
        js: sha(local) === sha(installed) ? "same" : `DIFFERENT (${sha(local)} vs ${sha(installed)})`,
        dts: sha(localD) === sha(installedD) ? "same" : `DIFFERENT (${sha(localD)} vs ${sha(installedD)})`,
    };
});

console.log(
    JSON.stringify(
        {
            repoPackageVersion: JSON.parse(readFileSync(path.join(REPO, "package.json"), "utf8")).version,
            installedPackageVersion: JSON.parse(
                readFileSync(path.join(REPO, "node_modules/@mkbabb/value.js/package.json"), "utf8"),
            ).version,
            distTrackedByGit: false, // .gitignore:17 — see report
            resolution: rows,
            artifactComparison: pairs,
        },
        null,
        2,
    ),
);
