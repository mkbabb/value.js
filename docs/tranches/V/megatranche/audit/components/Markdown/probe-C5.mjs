// CHALLENGE-C probe 5 — three measurements against the LIVE markdown body:
//  (1) content-visibility:auto + contain-intrinsic-size:auto 200px distortion:
//      the About card's scrollHeight as a function of how far it has been
//      scrolled, vs. the same tree with content-visibility forced visible.
//  (2) highlight churn: document.createTreeWalker is called from exactly one
//      place in the app's markdown path (useMarkdownHighlighting), so counting
//      it counts full-document highlight walks.
//  (3) a11y surface of the async swap: aria-busy / role=status / aria-live.
import { webkit } from "playwright";

const b = await webkit.launch();
const c = await b.newContext({ viewport: { width: 1440, height: 1000 }, colorScheme: "light" });
await c.addInitScript(() => {
  window.__tw = 0;
  const orig = document.createTreeWalker.bind(document);
  document.createTreeWalker = (...a) => {
    window.__tw++;
    return orig(...a);
  };
});
const p = await c.newPage();
await p.goto("http://localhost:9000/#/", { waitUntil: "domcontentloaded" });
await p.waitForTimeout(9000);

const out = {};

// ── (1) content-visibility scroll distortion ────────────────────────────────
out.cv = await p.evaluate(async () => {
  const card = document.querySelector(".about-card");
  const body = document.querySelector(".markdown-body");
  if (!card || !body) return { error: "no card/body" };
  const kids = [...body.children];
  const cvKids = kids.filter((k) => getComputedStyle(k).contentVisibility === "auto");
  const sample = [];
  const wait = () => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

  card.scrollTop = 0;
  await wait();
  sample.push({ at: 0, scrollHeight: card.scrollHeight, bodyH: +body.getBoundingClientRect().height.toFixed(1) });
  for (const frac of [0.25, 0.5, 0.75, 1]) {
    card.scrollTop = card.scrollHeight * frac;
    await wait();
    await new Promise((r) => setTimeout(r, 250));
    sample.push({
      at: frac,
      scrollTop: +card.scrollTop.toFixed(0),
      scrollHeight: card.scrollHeight,
      bodyH: +body.getBoundingClientRect().height.toFixed(1),
    });
  }
  // now force every child visible and re-measure the true height
  const st = document.createElement("style");
  st.textContent = ".markdown-body > * { content-visibility: visible !important; contain-intrinsic-size: auto !important; }";
  document.head.appendChild(st);
  card.scrollTop = 0;
  await wait();
  await new Promise((r) => setTimeout(r, 300));
  const trueTop = { scrollHeight: card.scrollHeight, bodyH: +body.getBoundingClientRect().height.toFixed(1) };
  st.remove();
  return {
    childCount: kids.length,
    cvAutoChildCount: cvKids.length,
    intrinsic: cvKids[0] ? getComputedStyle(cvKids[0]).containIntrinsicSize : null,
    tagsWithCv: cvKids.map((k) => k.tagName),
    samples: sample,
    forcedVisible: trueTop,
  };
});

// ── (2) highlight churn ─────────────────────────────────────────────────────
out.walkAfterBoot = await p.evaluate(() => window.__tw);
// nudge the live color 12 times via the hex field / L slider keyboard; use the
// picker's own alpha slider keyboard steps (cheap, deterministic, no drag).
const slider = p.locator('[role="slider"]');
const sliderN = await slider.count();
if (sliderN) {
  await slider.first().focus();
  for (let i = 0; i < 12; i++) {
    await p.keyboard.press("ArrowRight");
    await p.waitForTimeout(120);
  }
}
await p.waitForTimeout(1200);
out.sliderCount = sliderN;
out.walkAfterColorChanges = await p.evaluate(() => window.__tw);
out.marks = await p.evaluate(() => document.querySelectorAll("mark.cs-name").length);

// ── (3) a11y surface ────────────────────────────────────────────────────────
out.a11y = await p.evaluate(() => {
  const wrapper = document.querySelector(".markdown-wrapper");
  const body = document.querySelector(".markdown-body");
  const card = document.querySelector(".about-card");
  const headings = body ? [...body.querySelectorAll("h1,h2,h3,h4,h5,h6")].map((h) => h.tagName) : [];
  const cardHeadings = card ? [...card.querySelectorAll("h1,h2,h3,h4,h5,h6")].map((h) => h.tagName + ":" + h.textContent.trim().slice(0, 22)) : [];
  return {
    wrapperAttrs: wrapper ? [...wrapper.attributes].map((a) => a.name + "=" + a.value.slice(0, 40)) : null,
    liveRegions: document.querySelectorAll("[aria-live],[role=status]").length,
    wrapperAriaBusy: wrapper?.getAttribute("aria-busy") ?? null,
    docHeadingSeq: headings,
    cardHeadingSeq: cardHeadings,
    marksAreSemantic: [...document.querySelectorAll("mark.cs-name")].slice(0, 2).map((m) => ({
      bg: getComputedStyle(m).backgroundColor,
      color: getComputedStyle(m).color,
      hasLabel: !!m.getAttribute("aria-label"),
    })),
  };
});

console.log(JSON.stringify(out, null, 2));
await b.close();
