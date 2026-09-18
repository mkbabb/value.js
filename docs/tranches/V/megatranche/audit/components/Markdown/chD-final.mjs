import { chromium, webkit } from "@playwright/test";
const OUT = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/chD";

async function open(page) {
  await page.goto("http://localhost:9000/#/", { waitUntil: "load" });
  await page.waitForTimeout(4500);
}
async function scrollToGuide(page) {
  await page.evaluate(() => {
    const card = document.querySelector(".about-card");
    const h2 = [...document.querySelectorAll("h2")].find(e => e.textContent.includes("Detailed Guide"));
    if (card && h2) card.scrollTop = h2.offsetTop - 24;
  });
  await page.waitForTimeout(700);
}

// A. content-visibility scroll-height instability
{
  const b = await webkit.launch();
  const p = await (await b.newContext({ viewport: {width:1440,height:900}, colorScheme:"light" })).newPage();
  await open(p);
  const before = await p.evaluate(() => ({
    cardScrollHeight: document.querySelector(".about-card").scrollHeight,
    bodyScrollHeight: document.querySelector(".markdown-body")?.scrollHeight ?? null,
    renderedChildren: [...(document.querySelector(".markdown-body")?.children ?? [])]
      .filter(c => c.getBoundingClientRect().height > 0).length,
  }));
  // scroll through the whole card so every child renders once
  await p.evaluate(async () => {
    const card = document.querySelector(".about-card");
    for (let y = 0; y < card.scrollHeight; y += 400) { card.scrollTop = y; await new Promise(r=>requestAnimationFrame(r)); }
    card.scrollTop = 0;
  });
  await p.waitForTimeout(1200);
  const after = await p.evaluate(() => ({
    cardScrollHeight: document.querySelector(".about-card").scrollHeight,
    bodyScrollHeight: document.querySelector(".markdown-body")?.scrollHeight ?? null,
  }));
  console.log("\n===== A. content-visibility scroll-height =====");
  console.log(JSON.stringify({ before, after, deltaCard: after.cardScrollHeight - before.cardScrollHeight, deltaBody: after.bodyScrollHeight - before.bodyScrollHeight }, null, 1));
  await b.close();
}

// B. reduced motion — heading colour transition
{
  const b = await webkit.launch();
  const p = await (await b.newContext({ viewport: {width:1440,height:900}, colorScheme:"light", reducedMotion:"reduce" })).newPage();
  await open(p); await scrollToGuide(p);
  const m = await p.evaluate(() => {
    const body = document.querySelector(".markdown-body");
    const g = (s) => { const e = body.querySelector(s); return e ? getComputedStyle(e).transitionDuration + " / " + getComputedStyle(e).transitionProperty : null; };
    return { h2: g("h2"), h3: g("h3"), code: g("p code, li code"), mark: g("mark.cs-name"), hr: g("hr") };
  });
  console.log("\n===== B. reduced-motion transitions =====");
  console.log(JSON.stringify(m, null, 1));
  await b.close();
}

// C. forced-colors
{
  const b = await chromium.launch();
  const p = await (await b.newContext({ viewport: {width:1440,height:900}, colorScheme:"light", forcedColors:"active", deviceScaleFactor:2 })).newPage();
  await open(p); await scrollToGuide(p);
  const m = await p.evaluate(() => {
    const body = document.querySelector(".markdown-body");
    if (!body) return { err: "no body" };
    const g = (s) => { const e = body.querySelector(s); if(!e) return null; const c = getComputedStyle(e);
      return { color: c.color, bg: c.backgroundColor, weight: c.fontWeight, borderTop: c.borderTopWidth+" "+c.borderTopColor, opacity: c.opacity }; };
    return {
      p: g("p"), strong: g("strong"), mark: g("mark.cs-name"),
      code: g("p code, li code"), h2: g("h2"), h3: g("h3"), hr: g("hr"),
      plate: (() => { let e = body; while(e){ const bb=getComputedStyle(e).backgroundColor; if(bb && bb!=="rgba(0, 0, 0, 0)") return bb; e=e.parentElement;} return null;})(),
    };
  });
  await p.screenshot({ path: `${OUT}/final-forced-colors.png` });
  console.log("\n===== C. forced-colors =====");
  console.log(JSON.stringify(m, null, 1));
  await b.close();
}

// D. narrow 390 — katex overflow + measure
{
  const b = await webkit.launch();
  const p = await (await b.newContext({ viewport: {width:390,height:844}, colorScheme:"light", deviceScaleFactor:2, isMobile:true, hasTouch:true })).newPage();
  await open(p);
  const m = await p.evaluate(() => {
    const body = document.querySelector(".markdown-body");
    return {
      aboutPresent: !!document.querySelector(".about-card"),
      markdownPresent: !!body,
      bodyWidth: body ? Math.round(body.getBoundingClientRect().width) : null,
      katex: body ? [...body.querySelectorAll(":scope > div")].filter(d=>d.querySelector(":scope > .katex-display"))
        .map(d => ({ clientW: d.clientWidth, scrollW: d.scrollWidth, overflowing: d.scrollWidth > d.clientWidth, tabIndex: d.tabIndex })) : null,
      docOverflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    };
  });
  await p.screenshot({ path: `${OUT}/final-390.png` });
  console.log("\n===== D. 390px =====");
  console.log(JSON.stringify(m, null, 1));
  await b.close();
}
