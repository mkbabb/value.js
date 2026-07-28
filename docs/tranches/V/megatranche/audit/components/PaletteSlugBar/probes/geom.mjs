import { chromium } from "playwright";

const MARKUP = `
<div id="chD-probe" class="flex items-center gap-1.5 mb-2 pt-0.5 relative min-h-9">
  <span class="slug-pill cursor-help" style="color:oklch(0.8 0.15 60);border-color:oklch(0.8 0.15 60)">brave-amber-quiet-fox</span>
  <button class="p-1 rounded-sm hover:bg-accent transition-colors duration-fast cursor-pointer" aria-label="Account menu">
    <svg class="w-3.5 h-3.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="1"/></svg>
  </button>
  <p id="chD-err" class="absolute left-0 -bottom-4 text-mono-small text-destructive whitespace-nowrap">Already signed in as this slug.</p>
</div>
<div id="chD-after" style="height:40px;background:rgba(255,0,0,.15)">FOLLOWING CONTENT</div>
`;

const LOGIN = `
<div id="chD-probe2" class="flex items-center gap-1.5 mb-2 pt-0.5 relative min-h-9">
  <button id="chD-login" class="flex items-center gap-1.5 text-mono-small font-bold px-3 py-1 rounded-full border border-primary/30 hover:bg-accent active:scale-95 transition-colors cursor-pointer">
    <svg class="w-3.5 h-3.5" viewBox="0 0 24 24"><path d="M0 0h1v1H0z"/></svg>Login
  </button>
</div>`;

const browser = await chromium.launch();
for (const [name, w, h] of [["desktop-1440", 1440, 900], ["mobile-390", 390, 844], ["narrow-320", 320, 640]]) {
  const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
  await page.goto("http://localhost:9000/#/palettes", { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);
  const out = await page.evaluate(({ MARKUP, LOGIN }) => {
    // host the probe inside the real library plate so it inherits the real cascade
    const host = document.querySelector("main") || document.body;
    const box = document.createElement("div");
    box.style.cssText = "position:relative";
    box.innerHTML = MARKUP + LOGIN;
    host.appendChild(box);
    const q = (s) => document.querySelector(s);
    const r = (s) => { const e = q(s); if (!e) return null; const b = e.getBoundingClientRect(); const c = getComputedStyle(e); return { w: +b.width.toFixed(2), h: +b.height.toFixed(2), top: +b.top.toFixed(2), bottom: +b.bottom.toFixed(2), left: +b.left.toFixed(2), right: +b.right.toFixed(2), fs: c.fontSize, lh: c.lineHeight, ff: c.fontFamily.split(",")[0], color: c.color, mb: c.marginBottom }; };
    const bar = r("#chD-probe"), err = r("#chD-err"), after = r("#chD-after"), pill = r("span.slug-pill"), dots = r("#chD-probe button"), login = r("#chD-login");
    const de = document.documentElement;
    const errRight = q("#chD-err").getBoundingClientRect().right;
    return {
      viewportW: de.clientWidth,
      bar, err, after, pill, dots, login,
      errOverlapsFollowing: err && after ? +(err.bottom - after.top).toFixed(2) : null,
      errOverflowsBarBox: err && bar ? +(err.bottom - bar.bottom).toFixed(2) : null,
      errBleedsViewport: +(errRight - de.clientWidth).toFixed(2),
    };
  }, { MARKUP, LOGIN });
  console.log(`\n### ${name} (viewport ${w}x${h}, clientWidth=${out.viewportW})`);
  console.log(JSON.stringify(out, null, 1));
  await page.close();
}
await browser.close();
