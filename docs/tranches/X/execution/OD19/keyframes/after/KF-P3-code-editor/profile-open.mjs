// OD19 KF-P3 — CPU profile of the Keyframes open (one cell), self time by function. Headless chromium.
import { chromium } from "playwright";
import { writeFileSync } from "node:fs";
const OUT = process.argv[2]; const BASE = "http://localhost:5173/";
const browser = await chromium.launch({ headless: true });
try {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "dark", deviceScaleFactor: 2 });
  try {
    const page = await ctx.newPage();
    await page.goto(BASE + "#/cube", { waitUntil: "load" }); await page.waitForTimeout(3000);
    await page.locator('[data-dock-tether="top"] .glass-dock').hover({ timeout: 30000 }); await page.waitForTimeout(700);
    await page.locator("[data-dock-surface-trigger]").first().click({ timeout: 15000 }); await page.waitForTimeout(600);
    const cdp = await ctx.newCDPSession(page);
    await cdp.send("Profiler.enable"); await cdp.send("Profiler.setSamplingInterval", { interval: 200 }); await cdp.send("Profiler.start");
    await page.locator('[role=menuitem][data-surface="keyframes"]').first().click();
    await page.waitForSelector(".monaco-editor .view-lines .view-line", { timeout: 15000 }); await page.waitForTimeout(300);
    const { profile } = await cdp.send("Profiler.stop");
    const byId = new Map(profile.nodes.map((n) => [n.id, n])); const self = new Map();
    const dt = profile.timeDeltas; profile.samples.forEach((id, i) => { const n = byId.get(id); const f = n.callFrame; const k = `${f.functionName || "(anon)"} ${f.url.split("/").slice(-2).join("/").split("?")[0]}:${f.lineNumber}`; self.set(k, (self.get(k) ?? 0) + (dt[i] ?? 0) / 1000); });
    const parent = new Map(); for (const n of profile.nodes) for (const c of n.children ?? []) parent.set(c, n.id);
    const nm = (n) => `${n.callFrame.functionName || "(anon)"}:${n.callFrame.lineNumber}`;
    const chains = new Map();
    profile.samples.forEach((id, i) => { const n = byId.get(id); if (!/offsetWidth|getBoundingClientRect|offsetHeight|clientWidth|getComputedStyle/.test(n.callFrame.functionName)) return; const ch = []; for (let p = parent.get(id), k = 0; p && k < 7; p = parent.get(p), k++) ch.push(nm(byId.get(p))); const key = n.callFrame.functionName + " <- " + ch.join(" <- "); chains.set(key, (chains.get(key) ?? 0) + (dt[i] ?? 0) / 1000); });
    const chainTop = [...chains.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10).map(([k, v]) => `${v.toFixed(1)}ms ${k}`);
    console.log(chainTop.join("\n")); writeFileSync(`${OUT}/profile-open-forced.txt`, chainTop.join("\n") + "\n");
    const top = [...self.entries()].sort((a, b) => b[1] - a[1]).slice(0, 25).map(([k, v]) => `${v.toFixed(1)}ms ${k}`);
    // inclusive by url bucket
    writeFileSync(`${OUT}/profile-open.txt`, top.join("\n") + "\n");
    console.log(top.join("\n"));
  } finally { await ctx.close(); }
} finally { await browser.close(); }
