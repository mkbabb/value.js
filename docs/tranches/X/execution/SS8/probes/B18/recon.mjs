// Recon: mount each panel seeded; dump DOM shape + network log.
import { launch, cell, save, BASE, EVID } from "./lib.mjs";
const browser = await launch();
const out = {};
try {
    for (const tab of ["audit", "flagged", "tags"]) {
        out[tab] = await cell(browser, {}, async (page, log) => {
            await page.goto(`${BASE}/#/admin/${tab}`, { waitUntil: "networkidle" });
            await page.waitForTimeout(1500);
            const r = await page.evaluate(() => {
                const rect = (e) => { const b = e.getBoundingClientRect(); return [b.x, b.y, b.width, b.height].map((n) => +n.toFixed(1)); };
                const panes = [...document.querySelectorAll("[data-pane]")].map((e) => ({ pane: e.getAttribute("data-pane"), rect: rect(e) }));
                const tp = [...document.querySelectorAll('[role="tabpanel"]')].map((e) => ({ id: e.id, rect: rect(e), state: e.getAttribute("data-state") }));
                return { url: location.href, panes, tp, text: document.body.innerText.slice(0, 900) };
            });
            await page.screenshot({ path: `${EVID}/recon-${tab}-1440-light.png` });
            return { ...r, log: log.map((l) => l.m + " " + l.p) };
        });
    }
} finally {
    await browser.close();
}
save("recon.json", out);
console.log(JSON.stringify(out, null, 1).slice(0, 6000));
