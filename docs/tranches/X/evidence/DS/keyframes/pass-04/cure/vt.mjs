import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const b = await chromium.launch({ channel: "chrome", headless: true });
const p = await (await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" })).newPage();
await p.goto("http://localhost:5173/#/square"); await p.waitForTimeout(6000);
const box = await p.locator(".square-stage").boundingBox();
const clip = { x: box.x + 20, y: box.y + box.height - 120, width: 200, height: 100 };
await p.screenshot({ path: "vt-base.png", clip });
for (const [k, css] of [["vtn", ".scene-host{view-transition-name:none!important}"], ["inl", ".scene-host{opacity:1!important;transform:none!important}"]]) {
  const h = await p.addStyleTag({ content: css }); await p.waitForTimeout(500);
  await p.screenshot({ path: `vt-${k}.png`, clip }); await h.evaluate((n) => n.remove()); await p.waitForTimeout(300);
}
await b.close();
