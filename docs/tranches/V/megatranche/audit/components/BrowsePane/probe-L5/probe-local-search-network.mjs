// CHALLENGE-L pass 5 — L5-1 reverse direction. Typing into PalettesPane's
// "Search your palettes..." field (a purely LOCAL, localStorage-backed concern)
// fires a network request to the remote commons, because `searchQuery` is the
// same ref that `useBrowsePalettes.currentFilterOpts()` reads.
//
// Run:  node probe-local-search-network.mjs      (dev server must be on :9000)
import { chromium } from "playwright";

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 1000 } });

const reqs = [];
p.on("request", (r) => reqs.push(r.url()));

await p.goto("http://localhost:9000/#/browse", { waitUntil: "networkidle" });
await p.waitForTimeout(2500);

const mark = reqs.length;
console.log("requests before typing:", mark);

// Type ONLY into the local "my palettes" field.
const mine = p.locator('input[placeholder="Search your palettes..."]');
await mine.click();
await mine.type("sunset", { delay: 60 });
await p.waitForTimeout(1500);

const after = reqs.slice(mark);
const paletteCalls = after.filter((u) => /\/colors\/palettes|api\.color\.babb\.dev/.test(u));
console.log("requests AFTER typing into the LOCAL field:", after.length);
console.log("  palette/commons calls:", paletteCalls.length);
paletteCalls.slice(0, 6).forEach((u) => console.log("   →", u));
console.log(
    "  LOCAL-SEARCH-HITS-NETWORK:",
    paletteCalls.some((u) => u.includes("q=sunset")) || paletteCalls.length > 0,
);

// And the commons field mirrored it:
const commons = p.locator('input[placeholder="Search the commons..."]');
console.log("  commons field now reads:", JSON.stringify(await commons.inputValue()));

await p.screenshot({ path: "L5-local-search-network.png" });
await b.close();
