// SERVED MODEL: claude-opus-5-5 — X.KF.W13X.spring · the served sweep/derby/facet probe (KFA-44/211, KFA-40/41/094, KFA-155/UIA-KF-107, UIA-KF-044 family, UIA-KF-308/320, KFA-157)
// usage: DIST=<dist> TAG=<tag> node sweep.mjs
import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const { serveDist } = await import("/Users/mkbabb/Programming/keyframes.js/scripts/lib/demo-driver.mjs");
const OUT = new URL("./frames/", import.meta.url).pathname;
const TAG = process.env.TAG || "before";
const srv = await serveDist(process.env.DIST);
const b = await chromium.launch();
for (const [w, h, theme] of [[1440, 900, "light"], [390, 844, "dark"]]) {
  const mob = w < 1024;
  const ctx = await b.newContext({ viewport: { width: w, height: h }, colorScheme: theme, isMobile: mob, hasTouch: mob });
  const p = await ctx.newPage();
  await p.goto(`${srv.url}/#/spring`, { waitUntil: "load" }); await p.waitForTimeout(2500);
  const k = `${w}-${theme}`;
  const phys = p.locator("button, [role=tab]", { hasText: /^Physics$/ }).first();
  if (await phys.count()) { await phys.click({ force: true }).catch(() => {}); await p.waitForTimeout(900); }
  // facet reads
  const facet = await p.evaluate(() => {
    const vis = (e) => { const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0 && getComputedStyle(e).visibility !== "hidden"; };
    const out = [...document.querySelectorAll(".param-value")].filter(vis).map((e) => [e.textContent.trim(), getComputedStyle(e).textTransform]);
    const editor = [...document.querySelectorAll("*")].filter(vis).some((e) => /Keyframe offsets|@keyframes \(editable\)|re-sample/i.test(e.childNodes[0]?.nodeValue || ""));
    const pips = [...document.querySelectorAll(".spring-heatmap-pip > span")].filter(vis).map((e) => e.textContent.trim());
    const marker = document.querySelector(".spring-heatmap-marker"); const mr = marker?.getBoundingClientRect();
    const hits = mr ? pips.length && [...document.querySelectorAll(".spring-heatmap-pip > span")].filter(vis).filter((e) => { const r = e.getBoundingClientRect(); return r.left < mr.right && r.right > mr.left && r.top < mr.bottom && r.bottom > mr.top; }).map((e) => e.textContent.trim()) : null;
    const crit = document.querySelector(".spring-heatmap-tag"); const cr = crit?.getBoundingClientRect();
    const critHits = cr ? [...document.querySelectorAll(".spring-heatmap-pip > span")].filter(vis).filter((e) => { const r = e.getBoundingClientRect(); return r.left < cr.right && r.right > cr.left && r.top < cr.bottom && r.bottom > cr.top; }).map((e) => e.textContent.trim()) : null;
    const title = document.querySelector("[data-figure-title]")?.closest("div"); 
    return { outputs: out, inlineEditor: editor, pips, pipOverMarker: hits, pipOverCritical: critHits, figHeadH: title ? Math.round(title.getBoundingClientRect().height) : null };
  });
  // heatmap hover (UIA-KF-308)
  const hm = p.locator(".spring-heatmap").filter({ visible: true }).first();
  let hover = null;
  if (await hm.count()) { const bb = await hm.boundingBox(); await p.mouse.move(bb.x + bb.width * 0.8, bb.y + bb.height * 0.8); await p.waitForTimeout(300);
    hover = await p.evaluate(() => document.querySelector("[data-heatmap-hover]")?.textContent?.trim() ?? null); await p.mouse.move(1, 1); }
  // sweep play → reverse (KFA-44 / KFA-211)
  const play = p.locator("button", { hasText: /^Play/ }).filter({ visible: true }).first();
  let sweep = null;
  if (await play.count()) {
    await play.click({ force: true }); await p.waitForTimeout(400);
    const read = () => p.evaluate(() => { const t = document.querySelector('[aria-label="Scrub animation timeline"] [role=slider], [role=slider][aria-label="Scrub animation timeline"]'); const root = document.querySelector(".spring-target"); const c = document.querySelector(".spring-carriage"); const s = document.querySelector(".sampler-carriage"); return { now: Number(t?.getAttribute("aria-valuenow")), live: root?.classList.contains("spring-target--live"), wcLive: c && getComputedStyle(c).willChange, wcSampler: s && getComputedStyle(s).willChange, badge: document.querySelector(".status-badge")?.textContent?.trim() }; });
    const f1 = await read(); await p.waitForTimeout(250); const f2 = await read();
    const rev = p.locator("button", { hasText: /^Reverse/ }).filter({ visible: true }).first(); await rev.click({ force: true }); await p.waitForTimeout(120);
    const r1 = await read(); await p.waitForTimeout(250); const r2 = await read();
    sweep = { fwd: [f1.now, f2.now], rev: [r1.now, r2.now], playing: { live: f2.live, wcLive: f2.wcLive, wcSampler: f2.wcSampler, badge: f2.badge } };
    await p.locator("button", { hasText: /^Pause/ }).filter({ visible: true }).first().click({ force: true }).catch(() => {});
    await rev.click({ force: true }).catch(() => {});
  }
  // derby (KFA-40/094 tags, KFA-41 axis)
  const rail = await p.locator(".spring-rail").boundingBox();
  let derby = null; let early;
  if (rail) {
    await p.mouse.click(rail.x + rail.width * 0.5, rail.y + rail.height / 2); await p.waitForTimeout(60); await p.mouse.click(rail.x + rail.width * 0.5, rail.y + rail.height / 2);
    await p.waitForTimeout(40);
    const early = await p.evaluate(() => [...document.querySelectorAll(".derby-lane-ball")].map((e) => e.style.transform));
    await p.waitForTimeout(460);
    derby = await p.evaluate(() => {
      const tags = [...document.querySelectorAll(".derby-lane-tag")].map((e) => { const r = e.getBoundingClientRect(); return { t: e.textContent.trim(), h: Math.round(r.height), lh: Math.round(parseFloat(getComputedStyle(e).lineHeight) || 0), sw: e.scrollWidth, cw: e.clientWidth }; });
      const tagRects = [...document.querySelectorAll(".derby-lane-tag")].map((e) => e.getBoundingClientRect());
      let overlaps = 0; for (let i = 0; i < tagRects.length; i++) for (let j = i + 1; j < tagRects.length; j++) { const a = tagRects[i], c = tagRects[j]; if (a.left < c.right && a.right > c.left && a.top < c.bottom && a.bottom > c.top) overlaps++; }
      const track = document.querySelector(".spring-track")?.getBoundingClientRect();
      const laneRail = document.querySelector(".derby-lane-rail")?.getBoundingClientRect();
      const lane = document.querySelector(".derby-lane")?.getBoundingClientRect();
      const railR = document.querySelector(".spring-rail")?.getBoundingClientRect();
      const tick = document.querySelector(".derby-target-tick")?.getBoundingClientRect();
      return { tags, overlaps, track: track && [Math.round(track.left), Math.round(track.right)], laneRail: laneRail && [Math.round(laneRail.left), Math.round(laneRail.right)], lane: lane && [Math.round(lane.left), Math.round(lane.right)], rail: railR && [Math.round(railR.left), Math.round(railR.right)], tickX: tick ? Math.round(tick.left) : null };
    });
    await p.screenshot({ path: `${OUT}${TAG}-${k}-derby.png` });
  }
  if (derby) { await p.waitForTimeout(2600); derby.restored = await p.evaluate(() => document.querySelector("[data-readout=primary]")?.textContent); }
  console.log(`${TAG} ${k} early ${JSON.stringify(typeof early === "undefined" ? null : early)} facet ${JSON.stringify(facet)} hover ${JSON.stringify(hover)} sweep ${JSON.stringify(sweep)} derby ${JSON.stringify(derby)}`);
  await ctx.close();
}
await b.close(); process.exit(0);
