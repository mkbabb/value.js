import { webkit } from "playwright";
import { writeFileSync } from "node:fs";
const OUT =
    "/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/audit/components/wb-extract-workbench/probe";
const URL = "http://localhost:9000/#/extract";
const log = [];
const say = (s) => { console.log(s); log.push(String(s)); };
const J = (o) => JSON.stringify(o, null, 1);
// a 4-band image with a HARD MARKER in the top 12% and bottom 12%
const MAKE_FILE = `(async () => {
  const c = document.createElement('canvas'); c.width=200; c.height=200;
  const g = c.getContext('2d');
  ['#c81e5a','#1e5ac8','#5ac81e','#e8e0d0'].forEach((b,i)=>{ g.fillStyle=b; g.fillRect(0, i*50, 200, 50); });
  g.fillStyle='#000'; g.fillRect(0,0,200,8); g.fillRect(0,192,200,8);  // black rails top+bottom
  return c.toDataURL('image/png');
})()`;

const browser = await webkit.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light", deviceScaleFactor: 2 });
const p = await ctx.newPage();
await p.goto(URL, { waitUntil: "networkidle" });
await p.waitForTimeout(3000);
const d = await p.evaluate(MAKE_FILE);
await p.setInputFiles('input[type="file"]', { name: "rails.png", mimeType: "image/png", buffer: Buffer.from(d.split(",")[1], "base64") });
await p.waitForTimeout(3500);

const crop = await p.evaluate(() => {
    const img = document.querySelector('img[alt="Uploaded image"]');
    const dz = img?.closest('[role="button"]');
    const ir = img.getBoundingClientRect(), cr = dz.getBoundingClientRect();
    return {
        imgRect: { y: +ir.y.toFixed(1), h: +ir.height.toFixed(1), bottom: +ir.bottom.toFixed(1) },
        containerRect: { y: +cr.y.toFixed(1), h: +cr.height.toFixed(1), bottom: +cr.bottom.toFixed(1) },
        containerOverflow: getComputedStyle(dz).overflow,
        imgObjectFit: getComputedStyle(img).objectFit,
        imgHeightDecl: getComputedStyle(img).height,
        croppedTopPx: +(cr.y - ir.y).toFixed(1),
        croppedBottomPx: +(ir.bottom - cr.bottom).toFixed(1),
        croppedFraction: +(((cr.y - ir.y) + (ir.bottom - cr.bottom)) / ir.height).toFixed(3),
        // keyboard reachability of the preview / eyedropper
        dzTabindex: dz.getAttribute("tabindex"),
        dzAriaLabel: dz.getAttribute("aria-label"),
        dzRole: dz.getAttribute("role"),
    };
});
say("=== P7. preview crop + preview focusability (1440x900) ===");
say(J(crop));

// tab through the pane: does anything focus the preview / open the eyedropper?
const tabOrder = await p.evaluate(async () => {
    const seen = [];
    document.body.focus();
    for (let i = 0; i < 24; i++) {
        // synthetic tab is unreliable; enumerate the tabbable set instead
    }
    const tabbables = [...document.querySelectorAll("a[href],button:not([disabled]),input,select,textarea,[tabindex]")]
        .filter((e) => e.offsetParent !== null)
        .filter((e) => (e.getAttribute("tabindex") ?? "0") !== "-1")
        .map((e) => ({
            tag: e.tagName.toLowerCase(),
            name: e.getAttribute("aria-label") || e.getAttribute("title") || e.textContent.trim().slice(0, 22),
        }));
    return tabbables;
});
say("=== P7b. tabbable set on the populated route ===");
say(J(tabOrder));

// press Enter on the preview region: does the eyedropper open?
await p.evaluate(() => document.querySelector('img[alt="Uploaded image"]')?.closest('[role="button"]')?.focus());
await p.keyboard.press("Enter");
await p.waitForTimeout(600);
const eye = await p.evaluate(() => ({
    eyedropperOpen: !!document.querySelector('[class*="eyedropper"], [data-slot*="eyedropper"]'),
    activeEl: document.activeElement?.tagName + "/" + (document.activeElement?.getAttribute("aria-label") ?? ""),
}));
say("=== P7c. Enter on the focused preview ===");
say(J(eye));
await p.screenshot({ path: `${OUT}/P7-crop-rails.png` });
writeFileSync(`${OUT}/probe6-log.txt`, log.join("\n"));
await browser.close();
console.log("DONE");
