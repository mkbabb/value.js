// SERVED MODEL: claude-opus-5-5 — X.KF.W13X.r3res2b · §0fj 2: the Sweep ribbon ball vs the scrubber thumb under Reverse (served probe)
// usage: node probe.mjs <baseUrl> <label>   (headless real Chrome, §0ei; frames to ./frames/<label>-*.png)
// Reads, on #/spring (Sweep) at 1440x900, the scrubber thumb fraction (aria-valuenow / aria-valuemax)
// and the ribbon visualizer ball fraction (translateX / (stage width - ball width)) every ~100 ms
// over a playing sweep, first forward then with Reverse pressed. Tracking: |ball - thumb| small;
// mirroring: |ball - (1 - thumb)| small while |ball - thumb| is large.
import { createRequire } from "node:module";
import { loadavg } from "node:os";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const [base, label = "run"] = process.argv.slice(2);
const out = dirname(fileURLToPath(import.meta.url)) + "/frames/";
const b = await chromium.launch({ channel: "chrome", headless: true });
try {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage();
  const errs = [];
  p.on("pageerror", (e) => errs.push(String(e.message ?? e).slice(0, 200)));
  const sample = () => p.evaluate(() => {
    const s = document.querySelector('[role=slider][aria-label="Scrub animation timeline"]');
    const ball = document.querySelector(".visualizer-ball");
    const stage = ball?.closest(".visualizer-stage");
    const now = Number(s?.getAttribute("aria-valuenow"));
    const max = Number(s?.getAttribute("aria-valuemax"));
    let ballF = null;
    if (ball && stage) {
      const m = /translateX\(([-\d.]+)px\)/.exec(ball.style.transform ?? "");
      const maxX = stage.clientWidth - ball.clientWidth;
      if (m && maxX > 0) ballF = Number(m[1]) / maxX;
    }
    return { thumb: max > 0 ? now / max : null, ball: ballF };
  });
  const sweep = async (n) => {
    const rows = [];
    for (let i = 0; i < n; i++) { rows.push(await sample()); await p.waitForTimeout(100); }
    return rows;
  };
  const summarise = (rows) => {
    const ok = rows.filter((r) => r.thumb != null && r.ball != null);
    const track = Math.max(...ok.map((r) => Math.abs(r.ball - r.thumb)));
    const mirror = Math.max(...ok.map((r) => Math.abs(r.ball - (1 - r.thumb))));
    const span = Math.max(...ok.map((r) => r.thumb)) - Math.min(...ok.map((r) => r.thumb));
    return { n: ok.length, thumbSpan: +span.toFixed(3), maxTrackErr: +track.toFixed(3), maxMirrorErr: +mirror.toFixed(3),
      verdict: track < 0.08 ? "TRACKS" : mirror < 0.08 ? "MIRRORS" : "NEITHER" };
  };
  const r = { label, base, load1: loadavg()[0].toFixed(2) };
  await p.goto(base + "/#/spring");
  await p.evaluate(() => localStorage.clear());
  await p.reload();
  await p.waitForSelector('[role=slider][aria-label="Scrub animation timeline"]', { state: "attached", timeout: 60000 });
  await p.waitForSelector(".visualizer-ball", { state: "attached", timeout: 30000 });
  await p.waitForTimeout(1200);
  await p.getByRole("button", { name: /^Play/ }).first().click();
  await p.waitForTimeout(500);
  const fwd = await sweep(30);
  r.forward = { ...summarise(fwd), head: fwd.slice(0, 6) };
  await p.screenshot({ path: out + label + "-forward.png" });
  await p.getByRole("button", { name: /^Reverse/ }).first().click();
  await p.waitForTimeout(300);
  r.reversePressed = await p.getByRole("button", { name: /^Reverse/ }).first().getAttribute("aria-pressed");
  const rev = await sweep(30);
  r.reverse = { ...summarise(rev), head: rev.slice(0, 6) };
  await p.screenshot({ path: out + label + "-reverse.png" });
  // The scrub limb of the same contract (sliderUpdate.t is RAW engine time): paused under
  // Reverse, ArrowRight x5 on the rail must move the thumb RIGHT by ~5 steps, and the ball with it.
  await p.getByRole("button", { name: /^Pause/ }).first().click();
  await p.waitForTimeout(300);
  const slider = p.locator('[role=slider][aria-label="Scrub animation timeline"]').first();
  await slider.focus();
  const s0 = await sample();
  for (let i = 0; i < 5; i++) await slider.press("ArrowRight");
  await p.waitForTimeout(300);
  const s1 = await sample();
  r.scrubUnderReverse = { before: s0, after: s1, dThumb: +(s1.thumb - s0.thumb).toFixed(3),
    ballErr: +Math.abs(s1.ball - s1.thumb).toFixed(3),
    verdict: s1.thumb > s0.thumb && Math.abs(s1.thumb - s0.thumb) < 0.1 && Math.abs(s1.ball - s1.thumb) < 0.02 ? "RIGHT" : "WRONG" };
  r.load1end = loadavg()[0].toFixed(2);
  r.errs = errs;
  console.log(JSON.stringify(r, null, 1));
} finally {
  await b.close();
}
