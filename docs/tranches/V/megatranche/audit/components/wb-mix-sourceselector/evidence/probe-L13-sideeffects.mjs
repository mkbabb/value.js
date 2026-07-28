#!/usr/bin/env node
/**
 * probe-L13-sideeffects.mjs — CHALLENGE-L pass 2, finding L-13 (BLOCKER).
 *
 * Proves that `package.json` `"sideEffects": false` — a LIBRARY publishing hint —
 * eliminates the DEMO APPLICATION entry from the production build, because demo
 * and src share one package manifest.
 *
 * Two arms, one variable. Uses THIS repo's own Vite binary so the toolchain is
 * identical to `npm run gh-pages`. Writes only under the directory passed as
 * argv[2] (default: a temp dir). Touches no repo file.
 *
 *   node probe-L13-sideeffects.mjs [workdir]
 *
 * Observed 2026-07-28, HEAD c654824e, vite ^8.0.13 (rolldown):
 *
 *   arm A  "sideEffects": false  -> assets/index-Dezn_h7o.js   698 bytes  (polyfill only)
 *   arm B  field absent          -> assets/index-e_Viud93.js   754 bytes  (+ the boot call)
 *
 * The arm-A chunk name `index-Dezn_h7o.js` is BYTE-IDENTICAL to the one the real
 * `vite build --mode gh-pages` emits into dist/gh-pages/assets/ — which is how we
 * know the real production entry chunk contains the modulepreload polyfill and
 * nothing else. The demo, including MixSourceSelector.vue, is absent from prod.
 */

import { mkdirSync, writeFileSync, readFileSync, readdirSync, rmSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join, resolve } from "node:path";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";

const REPO = resolve(import.meta.dirname, "../../../../../../../..");
const VITE = join(REPO, "node_modules/.bin/vite");
const work = process.argv[2] ?? mkdtempSync(join(tmpdir(), "probe-L13-"));

const FILES = {
    "src/app.js": `export function boot() { document.body.textContent = "MOUNTED-OK"; }\n`,
    // The shape that matters: an INLINE module entry in index.html whose only
    // job is a side effect. This is demo/color-picker/index.html:205-213.
    "index.html":
        `<!doctype html><html><head><script type="module">\n` +
        `import { boot } from "./src/app.js";\nboot();\n` +
        `</script></head><body><div id="app"></div></body></html>\n`,
};

function build(sideEffectsField) {
    rmSync(work, { recursive: true, force: true });
    mkdirSync(join(work, "src"), { recursive: true });
    for (const [p, body] of Object.entries(FILES)) writeFileSync(join(work, p), body);
    writeFileSync(
        join(work, "package.json"),
        JSON.stringify({ name: "probe-l13", type: "module", version: "1.0.0", ...sideEffectsField }),
    );
    execFileSync(VITE, ["build", "--logLevel", "warn"], { cwd: work, stdio: "inherit" });

    const dir = join(work, "dist/assets");
    const js = readdirSync(dir).filter((f) => f.endsWith(".js"));
    return js.map((f) => {
        const src = readFileSync(join(dir, f), "utf8");
        return { file: f, bytes: src.length, containsBoot: /MOUNTED-OK/.test(src) };
    });
}

const armA = build({ sideEffects: false });
const armB = build({});

console.log(JSON.stringify({ repo: REPO, work, armA_sideEffectsFalse: armA, armB_fieldAbsent: armB }, null, 2));

const aBoot = armA.some((c) => c.containsBoot);
const bBoot = armB.some((c) => c.containsBoot);
console.log(
    aBoot === false && bBoot === true
        ? "\nL-13 CONFIRMED: the application entry is eliminated iff sideEffects:false is present."
        : `\nL-13 NOT REPRODUCED (armA boot=${aBoot}, armB boot=${bBoot}) — re-verify before citing.`,
);
process.exit(aBoot === false && bBoot === true ? 0 : 1);
