import { build } from "vite"; import { readdirSync, readFileSync } from "node:fs"; import { gzipSync } from "node:zlib";
await build({ configFile: false, logLevel: "silent", root: process.cwd() + "/app", build: { outDir: process.cwd() + "/out", emptyOutDir: true, minify: true } });
for (const f of readdirSync("out/assets")) { const b = readFileSync("out/assets/" + f); const s = b.toString(); console.log(f, b.length, gzipSync(b).length, "atKeyframes:" + s.includes("atKeyframes"), "lazy:" + /lazy/.test(f)); }
