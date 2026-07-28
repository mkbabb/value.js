// CHALLENGE-D · BrowsePane design probe (read-only).
import { chromium, webkit, devices } from "playwright";
import { writeFileSync, mkdirSync } from "node:fs";

const ENGINE = process.env.ENGINE === "webkit" ? webkit : chromium;
const OUT = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/D";
mkdirSync(OUT, { recursive: true });
const ORIGIN = "http://localhost:9000";

const browser = await ENGINE.launch();

async function probe(label, ctxOpts, work) {
  const ctx = await browser.newContext(ctxOpts);
  const page = await ctx.newPage();
  const console_ = [];
  page.on("console", (m) => m.type() === "error" && console_.push(m.text().slice(0, 160)));
  page.on("pageerror", (e) => console_.push("PAGEERR " + String(e).slice(0, 160)));
  const net = [];
  page.on("response", (r) => { if (r.url().includes("api.color")) net.push(`${r.status()} ${r.url().slice(0, 110)}`); });
  await page.goto(`${ORIGIN}/#/browse`, { waitUntil: "networkidle", timeout: 45000 });
  await page.waitForTimeout(3000);
  const out = await work(page);
  console.log(`\n===== ${label} =====`);
  console.log(JSON.stringify({ ...out, net: net.slice(0, 8), consoleErrors: console_.slice(0, 5) }, null, 1));
  await ctx.close();
  return out;
}

const MEASURE = async (page) => page.evaluate(() => {
  const q = (s) => document.querySelector(s);
  const r = (el) => { if (!el) return null; const b = el.getBoundingClientRect(); return { x: +b.x.toFixed(1), y: +b.y.toFixed(1), w: +b.width.toFixed(1), h: +b.height.toFixed(1), right: +b.right.toFixed(1), bottom: +b.bottom.toFixed(1) }; };

  const bar = q(".search-seated");
  const input = bar?.querySelector("input.input-bar-field");
  const slotBtn = bar?.querySelector("button");

  // measure the rendered width of the placeholder string in the input's own font
  let phWidth = null, inputContentW = null;
  if (input) {
    const cs = getComputedStyle(input);
    const c = document.createElement("canvas").getContext("2d");
    c.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
    phWidth = +c.measureText(input.placeholder).width.toFixed(1);
    inputContentW = +(input.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight)).toFixed(1);
  }

  const pane = document.querySelector(".pane-scroll-fade");
  const paneR = r(pane);
  const cards = [...document.querySelectorAll('[data-slot="card"], article')].length;

  // what state is rendered
  const state = q('[role="alert"]') ? "error" : (q('[aria-label="Loading palettes"]') ? "loading" : (q('[role="status"]') ? "empty-or-status" : "wall"));

  // running animations
  const anims = (document.getAnimations ? document.getAnimations() : []).map(a => {
    const t = a.effect?.target;
    return `${a.animationName || a.constructor.name}@${t ? t.tagName.toLowerCase() + "." + String(t.className).split(/\s+/)[0] : "?"}:${a.playState}`;
  });

  // tap targets inside the pane
  const smalls = [...(pane?.querySelectorAll("button, a, input, [role=button]") ?? [])]
    .filter(el => { const b = el.getBoundingClientRect(); return b.width > 0 && (b.width < 44 || b.height < 44); })
    .map(el => { const b = el.getBoundingClientRect(); return `${el.tagName.toLowerCase()}[${(el.getAttribute("aria-label") || el.textContent || "").trim().slice(0, 20)}] ${Math.round(b.width)}x${Math.round(b.height)}`; });

  // accessible names of pane controls
  const names = [...(pane?.querySelectorAll("button, input") ?? [])].map(el =>
    `${el.tagName.toLowerCase()}:aria=${el.getAttribute("aria-label") ?? "-"}:ph=${el.getAttribute("placeholder") ?? "-"}:txt=${(el.textContent || "").trim().slice(0, 18)}`);

  // vertical void: distance from last painted ink in the pane body to the pane bottom
  const body = pane?.querySelector(".pane-scroll-fade > div") || pane?.children?.[1];
  const lastInk = (() => {
    let max = -1, who = null;
    for (const el of pane?.querySelectorAll("*") ?? []) {
      if (!el.textContent?.trim() && el.tagName !== "svg" && el.tagName !== "BUTTON") continue;
      const b = el.getBoundingClientRect();
      if (b.height > 0 && b.bottom > max) { max = b.bottom; who = el.tagName.toLowerCase() + "." + String(el.className).split(/\s+/)[0]; }
    }
    return { bottom: +max.toFixed(1), who };
  })();

  return {
    state, cards,
    pane: paneR,
    bar: r(bar), input: r(input), slotBtn: r(slotBtn),
    barOverflow: bar && slotBtn ? +(r(slotBtn).right - (r(bar).right - parseFloat(getComputedStyle(bar).paddingRight))).toFixed(1) : null,
    slotBtnVsBarHeight: bar && slotBtn ? `${r(slotBtn).h} vs ${r(bar).h}` : null,
    placeholderWidth: phWidth, inputContentWidth: inputContentW,
    placeholderClipped: phWidth != null && inputContentW != null ? phWidth > inputContentW : null,
    placeholderText: input?.placeholder,
    inputTextOverflow: input ? getComputedStyle(input).textOverflow : null,
    anims, smallTapTargets: smalls, controlNames: names,
    voidBelowLastInk: paneR && lastInk.bottom > 0 ? +(paneR.bottom - lastInk.bottom).toFixed(1) : null,
    lastInk,
    scrollH: pane?.scrollHeight, clientH: pane?.clientHeight,
  };
});

// 1. desktop 1440 — as-is (live API)
await probe("desktop-1440-live", { viewport: { width: 1440, height: 900 } }, MEASURE);

// 2. mobile 390 — as-is
await probe("mobile-390-live", { ...devices["iPhone 14"] }, MEASURE);

// 3. desktop, 200% zoom equivalent (720x450 @2)
await probe("zoom200-720x450", { viewport: { width: 720, height: 450 }, deviceScaleFactor: 2 }, MEASURE);

// 4. narrow 320
await probe("narrow-320", { viewport: { width: 320, height: 720 } }, MEASURE);

await browser.close();
