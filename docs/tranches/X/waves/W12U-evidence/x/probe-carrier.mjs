// SERVED MODEL: claude-opus-5-5
// X.W12U.x — A2-VA-X-2 root-cause confirmation: document scrollWidth with the
// pane wrapper's oversampled backdrop ::before (shell.css:372-383) present, then
// with it removed by an injected rule (READ-ONLY: nothing is written to the tree).
// Usage: node probe-carrier.mjs <width> <height> <route>
import { chromium } from "@playwright/test";
import { prepare } from "./seed-x.mjs";
const [W, H, R] = [Number(process.argv[2] ?? 768), Number(process.argv[3] ?? 1024), process.argv[4] ?? "/admin/tags"];
const b = await chromium.launch({ headless: false });
const ctx = await b.newContext({ viewport: { width: W, height: H } });
await prepare(ctx, { admin: true, palettes: true });
const p = await ctx.newPage();
await p.goto("http://localhost:9000/#" + R, { timeout: 90000 });
await p.waitForFunction(() => !document.body.innerText.includes("Loading the scene"), null, { timeout: 30000 }).catch(() => {});
await p.waitForTimeout(1500);
const read = () => p.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth }));
const withCarrier = await read();
await p.addStyleTag({ content: ".pane-wrapper::before, .pane-wrapper > div::before { display: none !important; }" });
await p.waitForTimeout(300);
const without = await read();
console.log(`${W}x${H} ${R} with-carrier ${JSON.stringify(withCarrier)} without ${JSON.stringify(without)} → ${withCarrier.sw > withCarrier.cw && without.sw === without.cw ? "CARRIER IS THE CAUSE" : "not isolated"}`);
await b.close();
