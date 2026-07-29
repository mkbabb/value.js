// PROBE A — malformed / degenerate localStorage store shapes vs the palettes pane.
// One fresh browser context per row. Read-only against the live dev server.
import { chromium } from "playwright";

const URL = "http://localhost:9000/#/palettes";
const KEY = "color-palettes";

const P = (n, extra = {}) => ({
    id: `id-${n}`, name: n, slug: n.toLowerCase(),
    colors: [{ css: "#ff0000", position: 0 }, { css: "#00ff00", position: 1 }],
    createdAt: "2026-01-01T00:00:00.000Z", updatedAt: "2026-01-01T00:00:00.000Z",
    isLocal: true, ...extra,
});

const ROWS = [
    ["control_ok",        JSON.stringify({ version: 1, palettes: [P("Alpha")] })],
    ["no_palettes_key",   JSON.stringify({ version: 1 })],
    ["palettes_null",     JSON.stringify({ version: 1, palettes: null })],
    ["palettes_object",   JSON.stringify({ version: 1, palettes: {} })],
    ["palettes_string",   JSON.stringify({ version: 1, palettes: "nope" })],
    ["root_array",        JSON.stringify([1, 2, 3])],
    ["not_json",          "}{ not json"],
    ["version_2_future",  JSON.stringify({ version: 2, palettes: [P("Beta")] })],
    ["local_no_id",       JSON.stringify({ version: 1, palettes: [P("Ghost"), { ...P("Orphan"), id: undefined }] })],
    ["null_entry",        JSON.stringify({ version: 1, palettes: [P("Gamma"), null] })],
    ["colors_missing",    JSON.stringify({ version: 1, palettes: [{ ...P("NoColors"), colors: undefined }] })],
];

const browser = await chromium.launch();
const out = [];
for (const [label, raw] of ROWS) {
    const ctx = await browser.newContext();
    const page = await ctx.newPage();
    const pageErrors = [], consoleErrors = [];
    page.on("pageerror", (e) => pageErrors.push(String(e.message).slice(0, 140)));
    page.on("console", (m) => { if (m.type() === "error") consoleErrors.push(m.text().slice(0, 140)); });
    await page.addInitScript(([k, v]) => { window.localStorage.setItem(k, v); }, [KEY, raw]);
    await page.goto(URL, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2500);
    const m = await page.evaluate(() => ({
        appChildren: document.querySelector("#app")?.children.length ?? -1,
        grid: !!document.querySelector(".palette-card-grid"),
        cards: document.querySelectorAll('[role="article"]').length,
        badge: document.querySelector(".pane-header-title")?.textContent?.trim() ?? null,
        boundary: /something went wrong|error/i.test(document.body.innerText || ""),
        bodyLen: (document.body.innerText || "").length,
        stored: (() => { try { return JSON.parse(localStorage.getItem("color-palettes") || "null"); } catch { return "UNPARSEABLE"; } })(),
    }));
    out.push({ label, ...m, stored: JSON.stringify(m.stored).slice(0, 90), pageErr: pageErrors.length, err0: pageErrors[0] ?? "", cerr: consoleErrors.length });
    await ctx.close();
}
await browser.close();
const cols = ["label", "grid", "cards", "badge", "bodyLen", "pageErr", "cerr", "err0"];
console.log(cols.join(" | "));
for (const r of out) console.log(cols.map((c) => String(r[c])).join(" | "));
console.log("\n--- persisted store after boot ---");
for (const r of out) console.log(r.label.padEnd(18), r.stored);
