import { chromium } from "playwright";
const b = await chromium.launch();
const p = await (await b.newContext({ viewport: { width: 1440, height: 1000 } })).newPage();
await p.goto("http://localhost:9000/#/palettes", { waitUntil: "networkidle" });
await p.waitForTimeout(2000);
const r = await p.evaluate(() => {
  const host = document.createElement("div");
  host.style.cssText = "position:fixed;left:0;top:0;";
  document.body.appendChild(host);
  const mk = (cls, style) => { const s = document.createElement("span"); s.className = cls; if (style) s.setAttribute("style", style); s.textContent = "offline"; host.appendChild(s); return s; };
  const a = mk("fira-code text-mono-caption opacity-55 tracking-wide", "font-variant: small-caps");
  const bEl = mk("fira-code text-mono-caption opacity-55 tracking-wide");
  const c = mk("dropdown-menu__shortcut");
  const g = (e) => { const cs = getComputedStyle(e); return { textTransform: cs.textTransform, fontVariantCaps: cs.fontVariantCaps, letterSpacing: cs.letterSpacing, fontSize: cs.fontSize, opacity: cs.opacity, renderedWidth: +e.getBoundingClientRect().width.toFixed(2) }; };
  const out = { withSmallCaps: g(a), withoutSmallCaps: g(bEl), producerShortcut: g(c),
                identicalWidth: Math.abs(a.getBoundingClientRect().width - bEl.getBoundingClientRect().width) < 0.01 };
  host.remove();
  return out;
});
console.log(JSON.stringify(r, null, 2));
await b.close();
