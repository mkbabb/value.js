#!/usr/bin/env node
// OD19 repair 3 — serve the demo from the repo's vite.config.ts on its own port + deps cache, as one arm:
//   cure  the tree as written;
//   base  the tree with this repair's two files served as HEAD~ has them: demo/styles/foundation.css's
//         `@import "tailwindcss" source(none);` line swapped back to `@import "tailwindcss";`, and
//         demo/shell/dock/ColorInput.vue loaded from git at BASE_REV (default HEAD).
// Closes itself after <minutes>. usage: node r3-serve.mjs <base|cure> <port> <minutes>   (launch via guarded)
import { createServer } from "vite";
import { execFileSync } from "node:child_process";
import path from "node:path";
const [ARM, PORT, MIN = "20"] = process.argv.slice(2);
const REPO = path.resolve(import.meta.dirname, "../../../../../../..");
const REV = process.env.BASE_REV ?? "HEAD";
const FIELD = path.join(REPO, "demo/shell/dock/ColorInput.vue");
const fieldAtRev = ARM === "base" ? execFileSync("git", ["-C", REPO, "show", `${REV}:demo/shell/dock/ColorInput.vue`], { encoding: "utf8" }) : null;
const server = await createServer({
    configFile: path.join(REPO, "vite.config.ts"),
    cacheDir: process.env.R3_CACHE,
    logLevel: "warn",
    plugins: [{
        name: "r3-arm", enforce: "pre",
        load(id) { if (fieldAtRev && id === FIELD) return fieldAtRev; },
        transform(code, id) { if (ARM === "base" && id.endsWith("/demo/styles/foundation.css")) return code.replace('@import "tailwindcss" source(none);', '@import "tailwindcss";'); },
    }],
    server: { port: Number(PORT), strictPort: true },
});
await server.listen();
console.log(`r3-serve ${ARM} on :${PORT} (field from ${fieldAtRev ? REV : "tree"})`);
const stop = async () => { await server.close(); process.exit(0); };
setTimeout(stop, Number(MIN) * 60_000);
process.on("SIGTERM", stop); process.on("SIGINT", stop);
