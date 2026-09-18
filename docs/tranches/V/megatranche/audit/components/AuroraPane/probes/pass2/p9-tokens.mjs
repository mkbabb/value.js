// P9 — do the three hand-written trigger classes resolve to anything, and what do they override?
import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto("http://localhost:9000/#/atmosphere", { waitUntil: "domcontentloaded" });
await p.waitForSelector(".aurora-row"); await p.waitForTimeout(1500);
console.log(JSON.stringify(await p.evaluate(() => {
    const probe = (cls) => { const e = document.createElement("div"); e.className = cls; document.body.appendChild(e); const cs = getComputedStyle(e); const r = { minWidth: cs.minWidth, height: cs.height, fontSize: cs.fontSize }; e.remove(); return r; };
    const trig = document.querySelector('[aria-label="Palette harmony"]');
    const cs = getComputedStyle(trig);
    const root = getComputedStyle(document.documentElement);
    return {
        trigger: { height: cs.height, minWidth: cs.minWidth, fontSize: cs.fontSize, width: cs.width },
        probe_h9: probe("h-9"), probe_min_w_menu: probe("min-w-menu"), probe_text_caption: probe("text-caption"), probe_text_dropdown: probe("text-dropdown"),
        tokens: {
            "--control-h-md": root.getPropertyValue("--control-h-md").trim(),
            "--control-h-sm": root.getPropertyValue("--control-h-sm").trim(),
            "--width-menu": root.getPropertyValue("--width-menu").trim(),
            "--text-caption": root.getPropertyValue("--text-caption").trim(),
            "--text-dropdown": root.getPropertyValue("--text-dropdown").trim(),
            "--muted-foreground": root.getPropertyValue("--muted-foreground").trim(),
            "--ink-muted": root.getPropertyValue("--ink-muted").trim(),
        },
    };
}), null, 1));
await b.close();
