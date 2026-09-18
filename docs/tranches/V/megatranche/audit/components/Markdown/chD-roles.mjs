import { webkit } from "@playwright/test";
const b = await webkit.launch();
const p = await (await b.newContext({ viewport:{width:1440,height:900}, colorScheme:"light" })).newPage();
await p.goto("http://localhost:9000/#/", { waitUntil:"domcontentloaded", timeout: 90000 });
await p.waitForTimeout(7000);
const out = await p.evaluate(() => {
  const roles = ["text-display","text-title","text-subheading","text-heading","text-prose","text-small","text-mono-small","mono-caption","text-4xl","text-3xl","text-2xl","text-xl","text-lg","text-base","text-xs"];
  const host = document.body;
  const res = {};
  for (const r of roles) {
    const e = document.createElement("span");
    e.className = r; e.textContent = "Ag";
    e.style.position="absolute"; e.style.left="-9999px";
    host.appendChild(e);
    const c = getComputedStyle(e);
    res[r] = { size: c.fontSize, weight: c.fontWeight, family: c.fontFamily.split(",")[0].replace(/["']/g,""), lh: c.lineHeight };
    e.remove();
  }
  return res;
});
console.log(JSON.stringify(out, null, 1));
await b.close();
