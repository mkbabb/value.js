// Recon: mount #/admin/names seeded, dump the DOM shape the items need.
import { launch, cell, save, BASE, EVID } from "./lib.mjs";
const browser = await launch();
const out = {};
try {
    out.names = await cell(browser, {}, async (page, log) => {
        await page.goto(`${BASE}/#/admin/names`, { waitUntil: "networkidle" });
        await page.waitForTimeout(1500);
        const r = await page.evaluate(() => {
            const q = (s) => [...document.querySelectorAll(s)];
            const rect = (e) => { const b = e.getBoundingClientRect(); return [b.x, b.y, b.width, b.height].map((n) => +n.toFixed(2)); };
            const h1 = document.querySelector("h1")?.textContent?.trim();
            const tabs = q('[role="tablist"]').map((t) => ({ cls: t.className.slice(0, 160), rect: rect(t), html: t.outerHTML.slice(0, 900) }));
            const panel = document.querySelector("#admin-names-pending");
            const rows = panel ? [...panel.querySelectorAll(".border-card-edge.rounded-md")].map((e) => rect(e)) : [];
            const regions = q("[data-region], [data-pane], main, section").slice(0, 12).map((e) => ({ tag: e.tagName, attrs: [...e.attributes].map((a) => `${a.name}=${a.value.slice(0, 60)}`).join(" "), rect: rect(e) }));
            return { url: location.href, h1, tabs, rows, regions, bodyText: document.body.innerText.slice(0, 600) };
        });
        await page.screenshot({ path: `${EVID}/recon-names-1440-light.png` });
        return { ...r, log: log.map((l) => l.p) };
    });
} finally {
    await browser.close();
}
save("recon.json", out);
console.log(JSON.stringify(out, null, 1).slice(0, 5000));
