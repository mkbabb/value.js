// SERVED MODEL: claude-opus-5-5 — X.W7L.v instrument: O-65 DOCK-COLLAPSED-FORM on served :9000 (glass 10.1.0),
// headed real GPU, 1440×900 light. The dock idles shut (collapse="open" on desktop); does the collapsed plate
// wrap every visible seat? Usage: node v-o65-probe.ts <origin> <outJson>
import { chromium } from "@playwright/test";
import { writeFileSync } from "node:fs";
const [origin = "http://localhost:9000", out = "v-o65.json"] = process.argv.slice(2);
const browser = await chromium.launch({ channel: "chromium", headless: false });
const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" })).newPage();
await page.goto(origin + "/");
await page.locator("main").first().waitFor({ state: "visible", timeout: 30000 });
await page.waitForTimeout(8000);
const read = () => page.evaluate(() => {
    const dock = document.querySelector(".glass-dock") as HTMLElement;
    const plate = (dock.querySelector(".dock-plate") ?? dock) as HTMLElement;
    const pr = plate.getBoundingClientRect();
    const outside: string[] = []; let seen = 0;
    for (const el of Array.from(dock.querySelectorAll("button, a, [role='progressbar'], svg")) as HTMLElement[]) {
        const r = el.getBoundingClientRect(); const cs = getComputedStyle(el);
        if (r.width < 1 || r.height < 1 || cs.visibility === "hidden" || +cs.opacity < 0.05) continue;
        const h = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2);
        if (!h || !(el.contains(h) || h.contains(el))) continue; // painted and hit-testable only
        seen++;
        if (r.left < pr.left - 1 || r.right > pr.right + 1 || r.top < pr.top - 1 || r.bottom > pr.bottom + 1) outside.push(`${el.getAttribute("aria-label") ?? el.tagName} ${r.left.toFixed(0)}..${r.right.toFixed(0)}`);
    }
    return { state: dock.className.toString().match(/collapsed|expanded/g)?.join(","), plate: { w: +pr.width.toFixed(1), h: +pr.height.toFixed(1) }, seats: seen, outside };
});
const res: Record<string, unknown> = { origin, at: new Date().toISOString(), atRest: await read() };
const d0 = (await page.locator(".glass-dock").boundingBox())!;
await page.mouse.move(d0.x + d0.width / 2, d0.y + d0.height / 2); // enter the dock, then leave: the idle timer arms on pointerleave
await page.waitForTimeout(600);
await page.mouse.move(1430, 890);
await page.waitForTimeout(6000);
res.idle = await read();
const b = (await page.locator(".glass-dock").boundingBox())!;
await page.screenshot({ path: out.replace(/\.json$/, ".png"), clip: { x: b.x - 16, y: Math.max(0, b.y - 16), width: b.width + 32, height: b.height + 32 } });
writeFileSync(out, JSON.stringify(res, null, 1));
console.log(JSON.stringify(res));
await browser.close();
