// SERVED MODEL: claude-opus-5-5 — X.KF.W13X.r3res2c · §0fj 3: the square axis read-out after a takeover drag + Escape (served probe)
// usage: node probe.mjs <baseUrl> <label>   (headless real Chrome, §0ei; frames to ./frames/<label>-*.png)
// On #/square at 1440x900: Play, let the tour run, grab the box mid-tour and drag it (the takeover),
// release and let it rest, read; press Escape (the transport's Reset), read. A reading = the box's
// accessible read-outs (SubjectAxes role=status), the stage header's x/y (the renderer's live
// deflection), and the box's painted translate. Pass: after Escape the read-outs equal the header and
// the box sits at identity.
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
    const n = (s) => Number(String(s).trim().replace("−", "-").replace("+", "")) + 0;
    const box = document.querySelector(".demo-box");
    const axes = Object.fromEntries([...(box?.querySelectorAll("[role=status]") ?? [])]
      .map((e) => e.textContent.trim().split(/\s+/)).map(([k, v]) => [k, n(v)]));
    const hdr = [...document.querySelectorAll(".square-telemetry-axes .stage-readout span:last-child")].map((e) => n(e.textContent));
    const m = /translate\(\s*(-?[\d.e+-]+)px,\s*(-?[\d.e+-]+)px\)/.exec(box?.style.transform ?? "");
    return { axes, header: { x: hdr[0], y: hdr[1] }, translate: m ? [Number(m[1]), Number(m[2])] : null };
  });
  const r = { label, base, load1: loadavg()[0].toFixed(2) };
  await p.goto(base + "/#/square");
  await p.evaluate(() => localStorage.clear());
  await p.reload();
  await p.waitForSelector(".demo-box", { state: "visible", timeout: 60000 });
  await p.waitForTimeout(1200);
  r.rest = await read();
  await p.getByRole("button", { name: /^Play/ }).first().click();
  await p.waitForTimeout(900);
  const bb = await p.locator(".demo-box").boundingBox();
  const cx = bb.x + bb.width / 2, cy = bb.y + bb.height / 2;
  await p.mouse.move(cx, cy);
  await p.mouse.down();
  for (let i = 1; i <= 10; i++) await p.mouse.move(cx + i * 9, cy + i * 5);
  await p.mouse.up();
  await p.waitForTimeout(1500);
  r.afterDrag = await read();
  await p.screenshot({ path: out + label + "-a-after-drag.png" });
  await p.keyboard.press("Escape");
  await p.waitForTimeout(1500);
  r.afterEsc = await read();
  await p.screenshot({ path: out + label + "-b-after-esc.png" });
  const a = r.afterEsc;
  const agree = a.axes.x === a.header.x && a.axes.y === a.header.y;
  const identity = a.translate && Math.abs(a.translate[0]) + Math.abs(a.translate[1]) < 0.5;
  r.verdict = agree && identity && a.axes.x === 0 && a.axes.y === 0 ? "IDENTITY" : "STALE";
  r.pageerrors = errs;
  await ctx.close();
  console.log(JSON.stringify(r));
} finally {
  await b.close();
}
