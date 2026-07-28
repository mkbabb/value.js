import { chromium } from "playwright";
const browser = await chromium.launch();
for (const [name, w, h] of [["desktop-1440", 1440, 900], ["narrow-320", 320, 640]]) {
  const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
  await page.goto("http://localhost:9000/#/palettes", { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);
  const out = await page.evaluate(() => {
    // the real "My Palettes" plate — the column PaletteSlugBar's only historical host lived in
    const heads = [...document.querySelectorAll("h2,h1,div")].filter(e => /My\s*Palettes/.test(e.textContent || "") && e.children.length < 6);
    const plate = heads.length ? heads[heads.length - 1].closest("div") : null;
    const host = plate || document.querySelector("main") || document.body;
    const wrap = document.createElement("div");
    wrap.style.cssText = "position:relative";
    wrap.innerHTML = `
      <div id="p" class="flex items-center gap-1.5 mb-2 pt-0.5 relative min-h-9">
        <p id="e1" class="absolute left-0 -bottom-4 text-mono-small text-destructive whitespace-nowrap">Already signed in as this slug.</p>
      </div>
      <div id="p2" class="flex items-center gap-1.5 mb-2 pt-0.5 relative min-h-9">
        <p id="e2" class="absolute left-0 -bottom-4 text-mono-small text-destructive whitespace-nowrap">Rate limit exceeded: too many sign-in attempts from this address, retry after 60 seconds</p>
      </div>`;
    host.appendChild(wrap);
    const b = (s) => document.querySelector(s).getBoundingClientRect();
    const hostR = host.getBoundingClientRect();
    return {
      hostTag: host.tagName + "." + String(host.className).split(/\s+/).slice(0,3).join("."),
      hostWidth: +hostR.width.toFixed(2), hostRight: +hostR.right.toFixed(2),
      shortErrW: +b("#e1").width.toFixed(2), shortErrOverflowsHost: +(b("#e1").right - hostR.right).toFixed(2),
      longErrW: +b("#e2").width.toFixed(2), longErrOverflowsHost: +(b("#e2").right - hostR.right).toFixed(2),
      longErrOverflowsViewport: +(b("#e2").right - document.documentElement.clientWidth).toFixed(2),
      docScrollW: document.documentElement.scrollWidth, docClientW: document.documentElement.clientWidth,
    };
  });
  console.log(`### ${name}`, JSON.stringify(out, null, 1));
  await page.close();
}
await browser.close();
