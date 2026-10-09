// SERVED MODEL: claude-opus-5-5 — X.KF.W13X.r4state · KFA-39 (dock Reset on spring) + KFA-226 (scrub is not a PAUSE): served probe
// usage: node probe.mjs <baseUrl> <label>   (headless real Chrome, §0ei; frames to ./frames/<label>-*.png)
import { createRequire } from "node:module";
import { loadavg } from "node:os";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const [base, label = "run"] = process.argv.slice(2);
const out = dirname(fileURLToPath(import.meta.url)) + "/frames/";
const b = await chromium.launch({ channel: "chrome", headless: true });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const p = await ctx.newPage();
const errs = [];
p.on("pageerror", (e) => errs.push(String(e.message ?? e).slice(0, 200)));
const read = () => p.evaluate(() => {
  const m = JSON.parse(localStorage.getItem("keyframes-js-scene-machine") ?? "{}");
  const pick = (s) => document.querySelector(s)?.getAttribute("style") ?? null;
  return {
    snap: m.perScene?.spring ?? null,
    sweep: (document.body.innerText.match(/sweep\s+[0-9.]+/) ?? [null])[0],
    time: (document.body.innerText.match(/\d+ \/ 2000 ms/) ?? [null])[0],
    samplerBall: pick(".sampler-ball"),
    playLabel: [...document.querySelectorAll("[aria-label]")].map((e) => e.getAttribute("aria-label")).filter((l) => /^(Play|Pause)/.test(l)).slice(0, 2),
  };
});
await p.goto(base + "/#/spring");
await p.waitForSelector(".spring-ball", { timeout: 60000 });
await p.waitForTimeout(1500);
const r = { label, base, load1: loadavg()[0].toFixed(2) };
// KFA-39 — play, let the field move, then the dock's Reset
await p.getByRole("button", { name: "Play animation" }).click();
await p.waitForTimeout(1200);
r.playing = await read();
await p.screenshot({ path: out + label + "-39-a-playing.png" });
await p.mouse.click(1000, 860); // focus the page body (outside any control)
await p.keyboard.press("r"); // the dock Reset's shortcut (KFA-39: dock Reset · R · Escape)
await p.waitForTimeout(150);
r.afterReset = await read();
await p.waitForTimeout(1200);
r.afterReset1200 = await read();
await p.screenshot({ path: out + label + "-39-b-after-reset.png" });
// KFA-226 — scrub the time ribbon while playing: a scrub must not be a PAUSE (fresh load)
await p.evaluate(() => localStorage.clear());
await p.goto(base + "/#/spring");
await p.reload();
await p.waitForSelector(".spring-ball", { timeout: 60000 });
await p.waitForTimeout(1500);
await p.getByRole("button", { name: "Play animation" }).click();
await p.waitForTimeout(500);
r.replaying = await read();
const sliders = await p.evaluate(() => [...document.querySelectorAll("[role=slider]")].map((e) => { const r = e.getBoundingClientRect(); return { l: e.getAttribute("aria-label"), x: r.x, y: r.y, w: r.width, h: r.height, max: e.getAttribute("aria-valuemax") }; }));
r.sliders = sliders;
const tb = await p.locator('[role=slider][aria-label="Scrub animation timeline"]').evaluate((e) => { let t = e; while (t && t.getBoundingClientRect().width < 100) t = t.parentElement; const r = t.getBoundingClientRect(); return { x: r.x, y: r.y + r.height / 2, w: r.width }; });
r.track = tb;
await p.mouse.move(tb.x + tb.w * 0.3, tb.y);
await p.mouse.down();
await p.mouse.move(tb.x + tb.w * 0.5, tb.y, { steps: 6 });
await p.waitForTimeout(250);
r.duringScrub = await read();
await p.screenshot({ path: out + label + "-226-a-during-scrub.png" });
await p.mouse.up();
await p.waitForTimeout(60);
r.afterRelease60 = await read();
await p.waitForTimeout(400);
r.afterRelease460 = await read();
await p.screenshot({ path: out + label + "-226-b-after-release.png" });
// KFA-226 (c) — the user pauses DURING the scrub: the pause must survive the release
await p.mouse.move(tb.x + tb.w * 0.3, tb.y);
await p.mouse.down();
await p.mouse.move(tb.x + tb.w * 0.4, tb.y, { steps: 4 });
await p.keyboard.press("Space");
await p.waitForTimeout(150);
r.pauseDuringScrub = await read();
await p.mouse.up();
await p.waitForTimeout(460);
r.pauseDuringScrubReleased460 = await read();
await p.screenshot({ path: out + label + "-226-c-paused-in-scrub-released.png" });
r.errs = errs;
console.log(JSON.stringify(r, null, 1));
await b.close();
