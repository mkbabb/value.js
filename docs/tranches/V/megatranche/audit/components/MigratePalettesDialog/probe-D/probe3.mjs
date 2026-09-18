// CHALLENGE-D probe 3 — what the user is told while "Publish, then regenerate"
// runs, and what the app does when it fails. READ-ONLY. Writes only here.
import { webkit } from "playwright";
import { writeFileSync } from "node:fs";

const HERE = import.meta.dirname;
const ORIGIN = "http://localhost:9000";

const seed = (n) => {
    const now = new Date().toISOString();
    const store = {
        version: 1,
        palettes: Array.from({ length: n }, (_, i) => ({
            id: `probe-${i}`,
            name: `Probe palette ${i + 1}`,
            slug: `probe-palette-${i + 1}`,
            colors: [{ css: "oklch(70% 0.18 30)", position: 0 }],
            createdAt: now,
            updatedAt: now,
            isLocal: true,
        })),
    };
    return `
try {
  localStorage.setItem('vueuse-color-scheme','light');
  localStorage.setItem('palette-user-slug','quiet-amber-river-fox');
  localStorage.setItem('palette-user-token','probe-token');
  localStorage.setItem('color-palettes', ${JSON.stringify(JSON.stringify(store))});
} catch(e){}`;
};

const out = {};
const browser = await webkit.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
await ctx.addInitScript(seed(12));
const page = await ctx.newPage();

const net = [];
const logs = [];
page.on("console", (m) => logs.push(`${m.type()}: ${m.text().slice(0, 200)}`));
page.on("response", async (r) => {
    const u = r.url();
    if (u.startsWith("http://localhost:3000")) net.push(`${r.request().method()} ${u.replace("http://localhost:3000", "")} -> ${r.status()}`);
});

await page.goto(`${ORIGIN}/#/`, { waitUntil: "domcontentloaded" });
await page.waitForTimeout(2500);
const netBefore = net.length;
const logsBefore = logs.length;

await page.click('[data-o18="profile-trigger"]');
await page.waitForTimeout(300);
await page.click("text=Regenerate slug");
await page.waitForTimeout(600);

const t0 = Date.now();
await page.click("text=Publish, then regenerate");

const samples = [];
for (const wait of [100, 400, 1000, 2000, 4000, 8000]) {
    await page.waitForTimeout(wait - (Date.now() - t0) > 0 ? wait - (Date.now() - t0) : 0);
    samples.push({
        atMs: Date.now() - t0,
        ...(await page.evaluate(() => ({
            dialog: !!document.querySelector('[role="dialog"]'),
            busy: document.querySelectorAll('[aria-busy="true"]').length,
            statusRoles: document.querySelectorAll('[role="status"],[role="alert"],[role="progressbar"]').length,
            spinners: document.querySelectorAll(".animate-spin").length,
            slug: localStorage.getItem("palette-user-slug"),
            localCount: JSON.parse(localStorage.getItem("color-palettes") || "{}")?.palettes?.length ?? null,
            // any visible text that mentions the operation
            mentions: [...document.querySelectorAll("body *")]
                .filter((n) => n.children.length === 0 && /publish|migrat|saved|fail|error/i.test(n.textContent || ""))
                .map((n) => n.textContent.trim().slice(0, 60))
                .slice(0, 5),
        }))),
    });
}
out.samples = samples;
out.network = net.slice(netBefore);
out.consoleAfter = logs.slice(logsBefore);
await page.screenshot({ path: `${HERE}/shots/after-commit-8s.png` });

await ctx.close();
await browser.close();
writeFileSync(`${HERE}/telemetry3.json`, JSON.stringify(out, null, 2));
console.log(JSON.stringify(out, null, 2));
