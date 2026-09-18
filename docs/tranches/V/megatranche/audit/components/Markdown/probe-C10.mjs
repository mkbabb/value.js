// CHALLENGE-C probe 10 — one look with eyes, plus the focus-ring test.
// (i) screenshot the markdown body region;
// (ii) tab to the only external link in the doc and measure whether its focus
//      indicator is clipped by the `contain: paint` that content-visibility:auto
//      applies to the link's containing direct child.
import { webkit } from "playwright";

const b = await webkit.launch();
const c = await b.newContext({ viewport: { width: 1440, height: 1000 }, colorScheme: "light", deviceScaleFactor: 2 });
const p = await c.newPage();
await p.goto("http://localhost:9000/#/?space=oklab&color=" + encodeURIComponent("oklch(0.6 0.15 30)"), {
  waitUntil: "domcontentloaded",
});
await p.waitForSelector(".markdown-body", { timeout: 20000 });
await p.waitForTimeout(2500);

const card = p.locator(".about-card");
await card.evaluate((el) => (el.scrollTop = 300));
await p.waitForTimeout(600);
await card.screenshot({ path: "docs/tranches/V/megatranche/audit/components/Markdown/frames/C10-body-light.png" });

const link = await p.evaluate(() => {
  const a = document.querySelector(".markdown-body a");
  if (!a) return null;
  a.scrollIntoView({ block: "center" });
  a.focus();
  const cs = getComputedStyle(a);
  const parent = a.closest(".markdown-body > *");
  const pcs = parent ? getComputedStyle(parent) : null;
  return {
    href: a.getAttribute("href"),
    text: a.textContent.slice(0, 40),
    focused: document.activeElement === a,
    outline: cs.outlineWidth + " " + cs.outlineStyle + " " + cs.outlineOffset,
    parentTag: parent?.tagName,
    parentContentVisibility: pcs?.contentVisibility,
    parentContain: pcs?.contain,
    parentOverflowClipMargin: pcs?.overflowClipMargin,
    rect: (({ x, y, width, height }) => ({ width: +width.toFixed(1), height: +height.toFixed(1) }))(a.getBoundingClientRect()),
    // does the link open in a new tab without warning?
    target: a.getAttribute("target"),
    rel: a.getAttribute("rel"),
  };
});
await p.waitForTimeout(400);
await card.screenshot({ path: "docs/tranches/V/megatranche/audit/components/Markdown/frames/C10-link-focus.png" });
console.log(JSON.stringify({ link }, null, 2));
await b.close();
