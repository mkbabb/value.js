// CHALLENGE-C · probe C-0 — identify the WebKit-only failure the visual audit
// recorded on ALL FOUR /#/browse matrices:
//   "Failed to load remote palettes: SyntaxError: The string did not match the
//    expected pattern."
//
// Hypothesis: `request()` (demo/platform/transport/client.ts:118) ends with a
// bare `return res.json()`. A 2xx response whose body is not valid JSON throws
// a RAW parse error, which `loadRemotePalettes` catches and REPLACES with the
// constant "Failed to load palettes" (useBrowsePalettes.ts:79). WebKit's
// message for that parse failure is the exact string in the REPORT.
//
// Run: node docs/tranches/V/megatranche/audit/components/BrowsePane/probe-C-webkit-json.mjs
import { createServer } from "node:http";
import { webkit, chromium } from "playwright";

const BODIES = {
    "/good": ['{"data":[],"nextCursor":null,"hasMore":false}', "application/json"],
    "/empty": ["", "application/json"],
    "/html": ["<!doctype html><h1>502 Bad Gateway</h1>", "text/html"],
    "/trailing": ['{"data":[],}', "application/json"],
};

const server = createServer((req, res) => {
    const [body, type] = BODIES[req.url] ?? ["", "application/json"];
    res.writeHead(200, {
        "content-type": type,
        "access-control-allow-origin": "*",
    });
    res.end(body);
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const port = server.address().port;

async function run(name, launcher) {
    const b = await launcher.launch();
    const p = await b.newPage();
    await p.goto("about:blank");
    const out = await p.evaluate(async (port) => {
        const results = {};
        for (const path of ["/good", "/empty", "/html", "/trailing"]) {
            try {
                const r = await fetch(`http://127.0.0.1:${port}${path}`);
                await r.json();
                results[path] = "PARSED OK";
            } catch (e) {
                results[path] = String(e);
            }
        }
        return results;
    }, port);
    console.log(`\n== ${name} ==`);
    for (const [k, v] of Object.entries(out)) console.log(`  ${k.padEnd(10)} ${v}`);
    await b.close();
}

await run("WebKit (Safari engine)", webkit);
await run("Chromium", chromium);
server.close();
