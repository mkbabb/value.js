// CHALLENGE-L (PreviewStrip, pass 2) — where does each program resolve
// `@mkbabb/value.js/*` to?  Three resolvers, one question.
//   (a) Node ESM (what vitest externalises deps to)
//   (b) Vite's resolver under vitest.config.ts  (the ORACLE program)
//   (c) Vite's resolver under vite.config.ts    (the APP program)
import path from "node:path";
const ROOT = "/Users/mkbabb/Programming/value.js";
const rel = (p) => (p ? String(p).replace("file://", "").replace(ROOT + "/", "") : "UNRESOLVED");
const SPECS = ["@mkbabb/value.js/color", "@mkbabb/value.js/css", "@mkbabb/value.js"];

console.log("### (a) Node ESM resolution, parent = test/preview-chips.test.ts");
for (const s of SPECS) {
    try {
        console.log("  ", s.padEnd(26), "->", rel(import.meta.resolve(s)));
    } catch (e) {
        console.log("  ", s.padEnd(26), "-> THROWS", e.code);
    }
}

const { createServer } = await import("vite");
for (const [label, configFile, importer] of [
    ["(b) vitest.config.ts  [ORACLE]", "vitest.config.ts", "test/preview-chips.test.ts"],
    ["(c) vite.config.ts    [APP]", "vite.config.ts", "demo/color-session/color-chips/sample.ts"],
]) {
    console.log(`\n### ${label}  importer=${importer}`);
    const server = await createServer({
        configFile: path.join(ROOT, configFile),
        root: ROOT,
        mode: "development",
        logLevel: "silent",
        server: { middlewareMode: true },
    });
    const env = server.environments?.ssr ?? server;
    for (const s of SPECS) {
        let r = null;
        try {
            r = await (env.pluginContainer ?? server.pluginContainer).resolveId(
                s,
                path.join(ROOT, importer),
            );
        } catch (e) {
            r = { id: "THROWS " + e.message.split("\n")[0] };
        }
        console.log("  ", s.padEnd(26), "->", rel(r?.id));
    }
    await server.close();
}
