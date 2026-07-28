// CHALLENGE-C probe 8 — two observable consequences.
// (a) content-visibility:auto + contain-intrinsic-size:auto 200px makes the
//     document geometry a FUNCTION OF SCROLL POSITION: track the offsetTop of a
//     fixed late heading while scrolling down. A stable document keeps it
//     constant; a drifting one is moving content under the reader.
// (b) the `:key="model.selectedColorSpace"` remount + `isLoading` skeleton:
//     measure the layout collapse and the blank/skeleton window on a switch.
import { webkit } from "playwright";

const b = await webkit.launch();
const c = await b.newContext({ viewport: { width: 1440, height: 1000 }, colorScheme: "light" });
const p = await c.newPage();
await p.goto("http://localhost:9000/#/?space=hex&color=" + encodeURIComponent("oklch(0.6 0.15 30)"), {
  waitUntil: "domcontentloaded",
});
await p.waitForSelector(".markdown-body", { timeout: 20000 });
await p.waitForTimeout(2000);

// ── (a) geometry drift ──────────────────────────────────────────────────────
const drift = await p.evaluate(async () => {
  const card = document.querySelector(".about-card");
  const body = document.querySelector(".markdown-body");
  const heads = [...body.querySelectorAll("h2")];
  const target = heads[heads.length - 1];
  const label = target.textContent.trim().slice(0, 24);
  const settle = () =>
    new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(() => setTimeout(r, 220))));
  const rows = [];
  for (const top of [0, 500, 1000, 1500, 2000, 2500, 3000, 3500, 4000]) {
    card.scrollTop = top;
    await settle();
    // offset of the target relative to the scroll content origin
    const off = target.getBoundingClientRect().top - body.getBoundingClientRect().top;
    rows.push({
      requestedScrollTop: top,
      actualScrollTop: +card.scrollTop.toFixed(0),
      scrollHeight: card.scrollHeight,
      lastH2OffsetInBody: +off.toFixed(1),
    });
  }
  return { lastH2: label, rows };
});

// ── (b) switch cost ─────────────────────────────────────────────────────────
const switchCost = await (async () => {
  const before = await p.evaluate(() => {
    const h = [...document.querySelectorAll("h2")].find((x) => /Detailed Guide/.test(x.textContent));
    return { sectionH: +h.parentElement.getBoundingClientRect().height.toFixed(1) };
  });
  const triggers = p.locator('[aria-label="Select color space"]');
  const n = await triggers.count();
  await triggers.nth(n - 1).click();
  await p.waitForTimeout(600);
  const t0 = Date.now();
  await p.locator('[role="option"]', { hasText: /^\s*XYZ/ }).first().click();
  // sample the section height every 30ms for 3s to catch the collapse window
  const samples = [];
  for (let i = 0; i < 100; i++) {
    const s = await p.evaluate(() => {
      const h = [...document.querySelectorAll("h2")].find((x) => /Detailed Guide/.test(x.textContent));
      const sec = h?.parentElement;
      return {
        h: sec ? +sec.getBoundingClientRect().height.toFixed(1) : null,
        skeleton: !!sec?.querySelector('[data-slot="skeleton"], [class*="shimmer"]'),
        body: !!document.querySelector(".markdown-body"),
      };
    });
    samples.push({ t: Date.now() - t0, ...s });
    if (i > 3 && s.body && !s.skeleton) break;
    await p.waitForTimeout(25);
  }
  return { before, samples: samples.filter((s, i) => i < 4 || i % 4 === 0 || s.body) };
})();

console.log(JSON.stringify({ drift, switchCost }, null, 2));
await b.close();
