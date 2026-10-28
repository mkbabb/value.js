// SS-8 · Z4 — library-band numeric-leaf rows (MTS-05/06, W.L3) against the built ./math and
// ./transform of the given root; decomposeMatrix3D (no longer a published export) read from src
// through jiti so its singular behaviour is still witnessed.
//   ~/.claude/guard/guarded --light --timeout 5 -- node numeric.mjs <root>
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";
import { inspect } from "node:util";
import { createRequire } from "node:module";

const ROOT = resolve(process.argv[2] ?? ".");
const sub = (n) => import(pathToFileURL(resolve(ROOT, "dist/subpaths", `${n}.js`)).href);
const M = await sub("math");
const T = await sub("transform");
const s = (v) => inspect(v, { depth: 4, breakLength: Infinity }).slice(0, 300);
const tryv = (f) => { try { return { value: s(f()) }; } catch (e) { return { threw: String(e).split("\n")[0].slice(0, 160) }; } };

const out = { root: ROOT, transformExports: Object.keys(T), mathExports: Object.keys(M) };
out.deCasteljauEmpty = tryv(() => M.deCasteljau(0.5, []));
out.lerpArrayMismatch = tryv(() => M.lerpArray(new Float64Array([1, 2, 3]), new Float64Array([4, 5]), 0.5, new Float64Array(3)));
out.scaleDegenerate = tryv(() => M.scale(5, 0, 0, 0, 1)); // from-range of zero width
out.getTotalLengthTruncated = tryv(() => T.getTotalLength("M 0 0 L 10"));
out.arcExpanded = tryv(() => T.getTotalLength("M 0 0 A 5 5 0 1 0 10 0 A 5 5 0 1 0 0 0"));
out.arcCompact = tryv(() => T.getTotalLength("M0 0A5 5 0 1010 0A5 5 0 1000 0"));
try {
    const require = createRequire(resolve(ROOT, "package.json"));
    const jiti = require("jiti")(resolve(ROOT, "package.json"), { interopDefault: true });
    const { execSync } = await import("node:child_process");
    out.decomposeMatrix3DInSrc = execSync(`grep -rln decomposeMatrix3D ${resolve(ROOT, "src")} || true`).toString().trim() || "ABSENT from src/";
    const D = {};
    out.decomposeExports = Object.keys(D);
    if (D.decomposeMatrix3D) out.decomposeMatrix3DSingular = tryv(() => D.decomposeMatrix3D([0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]));
    if (D.decomposeMatrix2D) out.decomposeMatrix2DSingular = tryv(() => D.decomposeMatrix2D([0, 0, 0, 1, 0, 0]));
} catch (e) { out.srcReadError = String(e).slice(0, 300); }
console.log(JSON.stringify(out, null, 2));
