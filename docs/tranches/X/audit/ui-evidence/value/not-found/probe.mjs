// Probe: route <h1> visibility, heading duplication, veil band, text contrast inputs. Read-only.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs"; import path from "node:path"; import { execSync } from "node:child_process";
const OUT = path.dirname(new URL(import.meta.url).pathname);
const repo = "/Users/mkbabb/Programming/value.js";
const sha = execSync(`git -C ${repo} rev-parse --short HEAD`).toString().trim();
const dirty = execSync(`git -C ${repo} status --porcelain`).toString().trim().split("\n").filter(Boolean).length;
const b = await chromium.launch({ headless: false, args: ["--enable-gpu", "--ignore-gpu-blocklist"] });
const res = { sha, dirty, at: new Date().toISOString() };
for (const theme of ["light", "dark"]) {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: theme });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
  const p = await ctx.newPage(); const errs = []; p.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") errs.push(m.text().slice(0, 220)); });
  await p.goto("http://localhost:9000/#/nope", { waitUntil: "load", timeout: 120000 }).catch((e) => errs.push("goto " + String(e).slice(0, 80)));
  await p.waitForFunction(() => document.querySelector(".pane-header-title"), null, { timeout: 90000 });
  await p.waitForTimeout(3000);
  res[theme] = await p.evaluate(() => {
    const h = document.getElementById("route-title"); const r = h.getBoundingClientRect(); const cs = getComputedStyle(h);
    let o = 1, e = h; while (e) { o *= +getComputedStyle(e).opacity; e = e.parentElement; }
    const top = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2);
    const heads = [...document.querySelectorAll("h1,h2,h3")].filter((x) => /Not Found/i.test(x.textContent)).map((x) => ({ tag: x.tagName, cls: String(x.className).slice(0, 60) }));
    const ph = document.querySelector(".pane-header"); const phr = ph.getBoundingClientRect(); const phcs = getComputedStyle(ph, "::before");
    const btn = [...document.querySelectorAll("button")].find((x) => /picker/i.test(x.textContent));
    return { routeH1: { text: h.textContent.trim(), x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height), color: cs.color, visibility: cs.visibility, display: cs.display, effOpacity: o, topEl: top ? top.tagName + "." + String(top.className).slice(0, 50) : null }, notFoundHeadings: heads,
      paneHeader: { h: Math.round(phr.height), bottom: Math.round(phr.bottom), beforeBg: phcs.backgroundImage.slice(0, 120), beforeOpacity: phcs.opacity },
      btnAttrs: btn ? [...btn.attributes].map((a) => a.name + "=" + a.value.slice(0, 40)) : null };
  });
  res[theme].console = errs.slice(0, 12);
  await p.screenshot({ path: path.join(OUT, `probe-1440-${theme}-header-crop.png`), clip: { x: 190, y: 360, width: 1060, height: 280 }, timeout: 20000 }).catch(() => {});
  await ctx.close();
}
await b.close();
fs.writeFileSync(path.join(OUT, "probe-meta.json"), JSON.stringify(res, null, 1));
console.log(JSON.stringify(res, null, 1));
