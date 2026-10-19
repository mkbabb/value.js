// SERVED MODEL: claude-opus-5-5
// X.W12U.q — what `blob-presence-mobile.spec.ts:139`'s `.pane-shell > *` (last) is at 390x844,
// and where `.hero-blob-anchor` sits against every candidate card. Read-only.
// usage: node probe-blob-seat.mjs [origin]
import { chromium, devices } from "@playwright/test";
const origin = process.argv[2] ?? "http://localhost:9141";
const browser = await chromium.launch({ channel: "chromium", headless: true, args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
const page = await browser.newPage({ ...devices["Pixel 7"], viewport: { width: 390, height: 844 } });
await page.goto(origin + "/", { timeout: 120_000 });
await page.locator('[data-testid="goo-blob-canvas"]').last().waitFor({ state: "attached", timeout: 90_000 });
await page.waitForTimeout(2500);
const out = await page.evaluate(() => {
    const r = (el) => { if (!el) return null; const b = el.getBoundingClientRect(); return { x: +b.x.toFixed(1), y: +b.y.toFixed(1), w: +b.width.toFixed(1), h: +b.height.toFixed(1) }; };
    const tag = (el) => el ? `${el.tagName.toLowerCase()}.${[...el.classList].slice(0, 4).join(".")}` : null;
    const shells = [...document.querySelectorAll(".pane-shell")];
    const kids = [...document.querySelectorAll(".pane-shell > *")];
    const anchors = [...document.querySelectorAll(".hero-blob-anchor")];
    const a = anchors[anchors.length - 1];
    const chain = []; for (let e = a; e && e !== document.body; e = e.parentElement) chain.push(tag(e));
    return {
        scrollWidth: document.documentElement.scrollWidth,
        shells: shells.map((s) => ({ el: tag(s), box: r(s), children: [...s.children].map((c) => ({ el: tag(c), box: r(c) })) })),
        lastKid: { el: tag(kids[kids.length - 1]), box: r(kids[kids.length - 1]) },
        anchors: anchors.length, anchor: r(a), anchorChain: chain.slice(0, 9),
        anchorShell: tag(a?.closest(".pane-shell")), anchorShellKid: (() => { const s = a?.closest(".pane-shell"); const k = s && [...s.children].find((c) => c.contains(a)); return k ? { el: tag(k), box: r(k) } : null; })(),
    };
});
console.log(JSON.stringify(out, null, 1));
await browser.close();
