// SERVED MODEL: claude-opus-5-5 · SS-8 B15 · PalettesPane U-3 follow-up: why does the card's computed 2px focus outline
// not paint on its top/left/right edges? Lists clipping ancestors (overflow / contain:paint / clip-path / mask) between
// the focused [role=article] and the pane scroller, plus the outline geometry vs each clip box.
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { open, hue } from "../b15-seed.mjs";
const EV = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../../evidence/B15-palettes");
const b = await chromium.launch();
let r;
try {
    const { ctx, p } = await open(b, { current: hue(5, 10) });
    try {
        await p.keyboard.press("Tab"); await p.evaluate(() => document.querySelector("[role=article]").focus()); await p.waitForTimeout(300);
        r = await p.evaluate(() => {
            const c = document.querySelector("[role=article]"); const cs = getComputedStyle(c); const cr = c.getBoundingClientRect();
            const anc = []; let n = c.parentElement;
            for (let i = 0; n && i < 8; i++, n = n.parentElement) { const s = getComputedStyle(n); const r = n.getBoundingClientRect();
                anc.push({ tag: n.tagName, cls: String(n.className).slice(0, 70), ovX: s.overflowX, ovY: s.overflowY, contain: s.contain, clip: s.clipPath, mask: s.maskImage.slice(0, 40), x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), pl: s.paddingLeft, pt: s.paddingTop }); }
            return { focusVisible: c.matches(":focus-visible"), outline: `${cs.outlineStyle} ${cs.outlineWidth} ${cs.outlineColor}`, outlineOffset: cs.outlineOffset, transform: cs.transform, card: cr.toJSON(), ancestors: anc };
        });
    } finally { await ctx.close(); }
} finally { await b.close(); }
fs.writeFileSync(path.join(EV, "pp-u3-clip.out.json"), JSON.stringify(r, null, 1));
console.log(JSON.stringify(r, null, 1));
