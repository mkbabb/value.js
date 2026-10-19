// R-7 witness with the shipped bundler (rolldown, vite's): root-barrel vs subpath Select, minified.
import { rolldown } from "rolldown";
import { gzipSync } from "node:zlib";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
const HERE = dirname(fileURLToPath(import.meta.url));
const ext = (id) => /^(vue|reka-ui|@vueuse\/|@lucide\/|@floating-ui\/)/.test(id);
const out = {};
for (const v of ["root", "sub"]) {
    const bundle = await rolldown({ input: resolve(HERE, `sel-${v}.mjs`), external: ext, logLevel: "silent", moduleTypes: { ".css": "empty" } });
    try {
        const { output } = await bundle.generate({ format: "esm", minify: true });
        const code = output.filter((o) => o.type === "chunk").map((o) => o.code).join("");
        out[v] = { raw: Buffer.byteLength(code), gz: gzipSync(code, { level: 9 }).length, modules: output.filter((o) => o.type === "chunk").reduce((n, o) => n + Object.keys(o.modules).length, 0) };
    } finally { await bundle.close(); }
}
console.log(JSON.stringify(out));
