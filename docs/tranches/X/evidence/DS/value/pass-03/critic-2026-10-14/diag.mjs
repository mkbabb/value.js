import { chromium } from "@playwright/test";
const b = await chromium.launch({ channel: "chrome", headless: true });
try {
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  const errs = []; p.on("console", m => { if (m.type() === "error" || m.type()==="warning") errs.push(m.type()+": "+m.text().slice(0, 300)); }); p.on("pageerror", e => errs.push("pageerror: " + String(e).slice(0, 400)));
  p.on("requestfailed", r => errs.push("reqfail: " + r.url().slice(0,150) + " " + r.failure()?.errorText));
  await p.goto("http://localhost:9000/#/", { waitUntil: "load", timeout: 120000 });
  await p.waitForTimeout(45000);
  await p.screenshot({ path: import.meta.dirname + "/diag-boot.png" });
  console.log(JSON.stringify({ dock: await p.locator(".glass-dock").count(), title: await p.title(), body: (await p.locator("body").innerText()).slice(0, 300), errs: errs.slice(0, 25) }, null, 1));
} finally { await b.close(); }
