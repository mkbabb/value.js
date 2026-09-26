// SERVED MODEL: claude-opus-5-5
// X.W12U.s1 · UIA-V-72 / V-216 (current-view indicator) + V-226 / V-489 (producer separator)
// falsifier (:9000, 390x844 touch — the dock stays expanded). Open "Select view" on /palettes:
// the selected option paints the producer's indicator (a mark in the row's aria-hidden indicator
// slot) the other rows do not, and with an admin token the admin row is set off by the
// producer's separator (.glass-menu-divider, SelectSeparator), not a bordered div.
// Usage: node probe-view-select.mjs [light|dark] → exit 1 on RED.
import { chromium } from "@playwright/test";
import { prepare } from "../x/seed-x.mjs";
const theme = process.argv[2] ?? "light";
const b = await chromium.launch({ headless: false });
const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, colorScheme: theme, isMobile: true, hasTouch: true });
await prepare(ctx, { theme, admin: true });
const p = await ctx.newPage();
await p.goto("http://localhost:9000/#/palettes", { timeout: 90000 });
const t = p.getByRole("combobox", { name: /Select view/ }).first();
await t.waitFor({ timeout: 60000 });
await p.waitForTimeout(1200);
await t.click();
await p.waitForTimeout(800);
const r = await p.evaluate(() => {
    const lb = [...document.querySelectorAll("[role=listbox]")].find((e) => e.getBoundingClientRect().width > 0);
    const opts = [...lb.querySelectorAll("[role=option]")];
    // the producer's selected indicator: a painted mark inside the row's aria-hidden indicator slot
    const svgs = (o) => [...o.querySelectorAll(":scope > span[aria-hidden] *")].filter((s) => s.getBoundingClientRect().width > 0).length;
    const sel = opts.find((o) => o.getAttribute("aria-selected") === "true");
    const other = opts.find((o) => o !== sel && o.getAttribute("data-value") !== "__admin_toggle__");
    return { selected: sel?.innerText.trim(), selSvgs: sel ? svgs(sel) : -1, otherSvgs: other ? svgs(other) : -1, sep: lb.querySelectorAll(".glass-menu-divider").length, rule: lb.querySelectorAll("div.border-t").length };
});
const ok1 = r.selSvgs > r.otherSvgs;
const ok2 = r.sep > 0 && r.rule === 0;
console.log(`[${theme}]\n${ok1 ? "PASS" : "RED "} V-72/216 current view marked ${JSON.stringify(r)}\n${ok2 ? "PASS" : "RED "} V-226/489 producer separator sep=${r.sep} handRule=${r.rule}`);
await b.close();
process.exit(ok1 && ok2 ? 0 : 1);
