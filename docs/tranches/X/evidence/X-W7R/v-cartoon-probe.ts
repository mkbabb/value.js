// SERVED MODEL: claude-opus-5-5 — X.W7R.v instrument (run from the scratch iso tree)
import { chromium } from "@playwright/test";
const b = await chromium.launch({ channel: "chromium", headless: false });
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto(process.argv[2] + "/"); await p.locator("main").first().waitFor(); await p.waitForTimeout(2000);
console.log(JSON.stringify(await p.evaluate(() => { const out: string[] = []; const walk = (rs: CSSRuleList, src: string) => { for (const r of Array.from(rs)) { const s = (r as CSSStyleRule).selectorText; if (s && /cartoon-(cast|surface)/.test(s)) out.push(src + " :: " + s.slice(0, 90) + " {" + (r as CSSStyleRule).style.cssText.slice(0, 70) + "}"); if ((r as any).cssRules) walk((r as any).cssRules, src); if ((r as any).styleSheet) try { walk((r as any).styleSheet.cssRules, src); } catch {} } }; for (const s of Array.from(document.styleSheets)) try { walk(s.cssRules, (s.href || (s.ownerNode as HTMLElement)?.getAttribute("data-vite-dev-id") || "inline").split("/").slice(-3).join("/")); } catch {} return out; }), null, 0));
await b.close();
