// SERVED MODEL: claude-opus-5-5 — X.KF.W13X.r3res2a · §0fj 1: easing dock Reset / R / Escape rest at phase 0 (served probe)
// usage: node probe.mjs <baseUrl> <label>   (headless real Chrome, §0ei; frames to ./frames/<label>-*.png)
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
  const read = () => p.evaluate(() => {
    const m = JSON.parse(localStorage.getItem("keyframes-js-scene-machine") ?? "{}");
    const s = document.querySelector('[role=slider][aria-label="Scrub animation timeline"]');
    return {
      snap: m.perScene?.easing ?? null,
      scrubNow: s?.getAttribute("aria-valuenow") ?? null,
      scrubMax: s?.getAttribute("aria-valuemax") ?? null,
      playLabel: [...document.querySelectorAll("[aria-label]")].map((e) => e.getAttribute("aria-label")).filter((l) => /^(Play|Pause)/.test(l)).slice(0, 2),
    };
  });
  const r = { label, base, load1: loadavg()[0].toFixed(2), paths: {} };
  for (const [name, key] of [["R", "r"], ["Escape", "Escape"], ["dock", null]]) {
    await p.goto(base + "/#/easing");
    await p.evaluate(() => localStorage.clear());
    await p.reload();
    await p.waitForSelector('[role=slider][aria-label="Scrub animation timeline"]', { state: "attached", timeout: 60000 });
    await p.waitForTimeout(1200);
    const play = p.getByRole("button", { name: /^Play/ }).first();
    if (await play.count()) await play.click();
    await p.waitForTimeout(900);
    const row = { playing: await read() };
    await p.screenshot({ path: out + label + "-" + name + "-a-playing.png" });
    if (key) {
      await p.mouse.click(1000, 860);
      await p.keyboard.press(key);
    } else {
      await p.getByRole("button", { name: /^Reset/ }).first().click();
    }
    await p.waitForTimeout(150);
    row.after150 = await read();
    await p.waitForTimeout(1200);
    row.after1350 = await read();
    await p.screenshot({ path: out + label + "-" + name + "-b-after-reset.png" });
    r.paths[name] = row;
  }
  r.errs = errs;
  console.log(JSON.stringify(r, null, 1));
} finally {
  await b.close();
}
