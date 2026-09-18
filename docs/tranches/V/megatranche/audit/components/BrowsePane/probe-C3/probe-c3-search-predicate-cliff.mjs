/**
 * CHALLENGE-C pass 3 · probe C3-1
 *
 * The browse search runs TWO predicates in series:
 *   server : Mongo `$text: {$search: q.trim()}` on a `{name:"text"}` index,
 *            sent ONLY when `q.trim().length >= 2`
 *            (demo/palettes/useBrowsePalettes.ts:52-61, api .../crud-list.ts:95-96,
 *             api/src/platform/db/db.ts:57-60)
 *   client : `name.toLowerCase().includes(q) || slug.includes(q)`, q UNTRIMMED,
 *            at ANY length (demo/palettes/useFilteredList.ts:8-12)
 *
 * This probe types a word one character at a time into BrowsePane's own
 * "Search the commons..." field against the REAL production commons (no stub)
 * and records, per keystroke: the request BrowsePane issued, the number of
 * cards the wall shows, and the empty-plate copy.
 *
 * Read-only. No source edits. Run:
 *   node docs/tranches/V/megatranche/audit/components/BrowsePane/probe-C3/probe-c3-search-predicate-cliff.mjs
 */
import { chromium } from "playwright";

// pass-1 note, re-confirmed: localhost:9000 is latched `misconfigured` by
// detectDevMisconfig (availability.ts:112-118) so NO request is ever issued.
// The same dev server over its LAN host clears the latch.
const BASE = process.env.PROBE_BASE ?? "http://192.168.1.166:9000";
const WORD = process.env.PROBE_WORD ?? "ocean";
const DEBOUNCE_MS = 900; // usePaletteWiring.ts:162 debounce is 400ms

const out = {};

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

const requests = [];
page.on("request", (r) => {
    const u = r.url();
    if (u.includes("/palettes")) requests.push(u);
});

await page.goto(`${BASE}/#/browse`, { waitUntil: "domcontentloaded" });
await page.waitForTimeout(3500);

const commonsBox = page.locator('input[placeholder="Search the commons..."]');

// ── How many BrowsePane instances are actually mounted? ──────────────────────
out.paneInstances = {
    commonsSearchInputs: await commonsBox.count(),
    myPalettesSearchInputs: await page
        .locator('input[placeholder="Search your palettes..."]')
        .count(),
};

const cardCount = () => page.locator('main [role="list"] [role="article"]').count();
const wallCopy = async () => {
    const t = await page.locator("main").innerText();
    return {
        trueEmptyInvitation: t.includes("No published palettes here yet"),
        loadMoreOffered: t.includes("More from the commons"),
    };
};

out.initial = { cards: await cardCount(), ...(await wallCopy()) };

// ── the per-keystroke ledger ─────────────────────────────────────────────────
out.keystrokes = [];
const box = commonsBox.first();
await box.click();
for (let n = 1; n <= WORD.length; n++) {
    const q = WORD.slice(0, n);
    await box.fill(q);
    requests.length = 0;
    await page.waitForTimeout(DEBOUNCE_MS);
    out.keystrokes.push({
        typed: q,
        serverRequest: requests.map((u) => u.replace(/^https?:\/\/[^/]+/, "")),
        cardsVisible: await cardCount(),
        ...(await wallCopy()),
    });
}

await box.fill("");
await page.waitForTimeout(DEBOUNCE_MS);
out.afterClear = { cards: await cardCount(), ...(await wallCopy()) };

// ── the "· the commons ·" plate at the 2-char cliff, photographed ────────────
await box.fill(WORD.slice(0, 2));
await page.waitForTimeout(DEBOUNCE_MS);
await page.screenshot({
    path: new URL("./c3-two-char-cliff.png", import.meta.url).pathname,
    fullPage: false,
});
out.cliffPlate = (await page.locator("main").innerText())
    .split("\n")
    .filter(Boolean)
    .slice(0, 12);

// ── colour-search reachability on the live commons ───────────────────────────
await box.fill("");
await page.waitForTimeout(DEBOUNCE_MS);
// (measured out-of-band with curl instead — the LAN page origin is not in the
// API's CORS allow-list, so an in-page fetch cannot reach it.)

console.log(JSON.stringify(out, null, 2));
await browser.close();
