// Mega-tranche visual-audit harness — Safari (WebKit) desktop + mobile, light + dark,
// every route, with per-page defect telemetry.
//
// Read-only against the running dev server. Writes ONLY under
// docs/tranches/V/megatranche/audit/visual/.
//
//   node docs/tranches/V/megatranche/audit/visual/capture.mjs [--origin http://localhost:9000]
//
// Produces: shots/<matrix>/<route>.png  and  REPORT.json + REPORT.md
import { webkit, devices } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const HERE = import.meta.dirname;
const ORIGIN =
  process.argv.find((a) => a.startsWith("--origin="))?.slice(9) ?? "http://localhost:9000";

// THE DEMO IS A HASH-ROUTER APP (`createWebHashHistory`, demo/color-picker/router/index.ts).
// Canonical deep links are `/#/<route>`. Navigating the bare path renders the DEFAULT view
// with the path intact — which silently captures the same pane N times. That error was made
// once here; it must never be made again, so the hash is baked into the route table.
const ROUTES = [
  { path: "/#/", name: "picker" },
  { path: "/#/palettes", name: "palettes" },
  { path: "/#/browse", name: "browse" },
  { path: "/#/extract", name: "extract" },
  { path: "/#/mix", name: "mix" },
  { path: "/#/generate", name: "generate" },
  { path: "/#/gradient", name: "gradient" },
  { path: "/#/atmosphere", name: "atmosphere" },
  { path: "/#/blob", name: "blob" },
  { path: "/#/admin/users", name: "admin-users" },
  { path: "/#/admin/names", name: "admin-names" },
  { path: "/#/admin/audit", name: "admin-audit" },
  { path: "/#/admin/flagged", name: "admin-flagged" },
  { path: "/#/admin/tags", name: "admin-tags" },
  { path: "/#/does-not-exist", name: "notfound-redirect" },
];

const MATRIX = [
  {
    id: "safari-desktop-light",
    engine: "webkit",
    colorScheme: "light",
    ctx: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 },
  },
  {
    id: "safari-desktop-dark",
    engine: "webkit",
    colorScheme: "dark",
    ctx: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 },
  },
  {
    id: "safari-mobile-light",
    engine: "webkit",
    colorScheme: "light",
    ctx: { ...devices["iPhone 14"] },
  },
  {
    id: "safari-mobile-dark",
    engine: "webkit",
    colorScheme: "dark",
    ctx: { ...devices["iPhone 14"] },
  },
];

// The demo drives dark via a `dark` class on <html> (useGlobalDark). Force BOTH
// the media preference and the class so the capture cannot be a false light shot.
const initScript = (scheme) => `
  try {
    localStorage.setItem('vueuse-color-scheme', ${JSON.stringify(scheme)});
    const de = document.documentElement;
    if (${JSON.stringify(scheme)} === 'dark') de.classList.add('dark');
    else de.classList.remove('dark');
  } catch (e) {}
`;

async function probe(page) {
  return page.evaluate(() => {
    const de = document.documentElement;
    const overflowX = de.scrollWidth - de.clientWidth;
    const sel = (s) => document.querySelectorAll(s).length;
    const vis = (el) => {
      const r = el.getBoundingClientRect();
      return r.width > 0 && r.height > 0;
    };
    // tap-target audit: interactive elements smaller than 24x24 CSS px
    const interactive = [
      ...document.querySelectorAll(
        'a,button,input,select,textarea,[role="button"],[role="link"],[role="tab"],[role="switch"],[role="slider"],[tabindex]:not([tabindex="-1"])',
      ),
    ].filter(vis);
    const small = interactive
      .map((el) => {
        const r = el.getBoundingClientRect();
        return { w: Math.round(r.width), h: Math.round(r.height), tag: el.tagName.toLowerCase(), label: (el.getAttribute("aria-label") || el.textContent || "").trim().slice(0, 40) };
      })
      .filter((m) => m.w < 24 || m.h < 24);
    // images without alt
    const imgNoAlt = [...document.querySelectorAll("img")].filter((i) => !i.hasAttribute("alt")).length;
    // buttons with no accessible name
    const namelessButtons = [...document.querySelectorAll('button,[role="button"]')]
      .filter(vis)
      .filter((b) => !(b.getAttribute("aria-label") || b.getAttribute("aria-labelledby") || b.textContent.trim()))
      .length;
    // elements overflowing the viewport horizontally
    const bleeding = [...document.querySelectorAll("body *")]
      .filter(vis)
      .filter((el) => el.getBoundingClientRect().right > de.clientWidth + 1)
      .slice(0, 12)
      .map((el) => `${el.tagName.toLowerCase()}${el.className && typeof el.className === "string" ? "." + el.className.split(/\s+/).slice(0, 2).join(".") : ""}`);
    return {
      title: document.title,
      url: location.href,
      overflowX,
      hasDarkClass: de.classList.contains("dark"),
      counts: {
        main: sel("main"),
        h1: sel("h1"),
        nav: sel("nav"),
        canvas: sel("canvas"),
        button: sel("button"),
        dialog: sel('[role="dialog"]'),
        allElements: sel("*"),
      },
      a11y: { smallTapTargets: small, imgNoAlt, namelessButtons },
      bleeding,
      bodyTextLength: (document.body.innerText || "").trim().length,
    };
  });
}

const results = [];
const browser = await webkit.launch();

for (const m of MATRIX) {
  const dir = resolve(HERE, "shots", m.id);
  mkdirSync(dir, { recursive: true });
  const context = await browser.newContext({ ...m.ctx, colorScheme: m.colorScheme });
  await context.addInitScript(initScript(m.colorScheme));

  for (const r of ROUTES) {
    const page = await context.newPage();
    const consoleErrors = [];
    const consoleWarnings = [];
    const pageErrors = [];
    const failedRequests = [];
    page.on("console", (msg) => {
      const t = msg.type();
      if (t === "error") consoleErrors.push(msg.text().slice(0, 300));
      else if (t === "warning") consoleWarnings.push(msg.text().slice(0, 300));
    });
    page.on("pageerror", (e) => pageErrors.push(String(e).slice(0, 300)));
    page.on("requestfailed", (req) =>
      failedRequests.push(`${req.method()} ${req.url().slice(0, 160)} :: ${req.failure()?.errorText}`),
    );

    const row = { matrix: m.id, route: r.path, name: r.name };
    const t0 = Date.now();
    try {
      await page.goto(ORIGIN + r.path, { waitUntil: "networkidle", timeout: 30000 });
    } catch (e) {
      row.navError = String(e).slice(0, 200);
      try {
        await page.goto(ORIGIN + r.path, { waitUntil: "domcontentloaded", timeout: 20000 });
      } catch (e2) {
        row.navFatal = String(e2).slice(0, 200);
      }
    }
    // Give WebGL / lazy panes a settle window; the boot is known-slow.
    await page.waitForTimeout(2500);
    row.settleMs = Date.now() - t0;

    try {
      row.probe = await probe(page);
    } catch (e) {
      row.probeError = String(e).slice(0, 200);
    }

    const shot = resolve(dir, `${r.name}.png`);
    try {
      await page.screenshot({ path: shot, fullPage: true, animations: "disabled" });
      row.shot = shot.replace(resolve(HERE, "../../../../../.."), "").replace(/^\//, "");
    } catch (e) {
      row.shotError = String(e).slice(0, 200);
    }

    row.consoleErrors = consoleErrors;
    row.consoleWarnings = consoleWarnings.slice(0, 20);
    row.pageErrors = pageErrors;
    row.failedRequests = failedRequests.slice(0, 20);
    results.push(row);
    await page.close();
    process.stderr.write(
      `${m.id} ${r.path} -> errs=${pageErrors.length}/${consoleErrors.length} overflowX=${row.probe?.overflowX ?? "?"} text=${row.probe?.bodyTextLength ?? "?"}\n`,
    );
  }
  await context.close();
}
await browser.close();

// ---- Report -----------------------------------------------------------------
const blank = results.filter((r) => (r.probe?.bodyTextLength ?? 0) < 40);
const withPageErrors = results.filter((r) => (r.pageErrors || []).length > 0);
const withConsoleErrors = results.filter((r) => (r.consoleErrors || []).length > 0);
const overflowing = results.filter((r) => (r.probe?.overflowX ?? 0) > 0);
const darkMissing = results.filter((r) => r.matrix.endsWith("dark") && r.probe && !r.probe.hasDarkClass);
const multiMain = results.filter((r) => (r.probe?.counts?.main ?? 1) !== 1);
const tapTargets = results.filter((r) => (r.probe?.a11y?.smallTapTargets || []).length > 0);
const nameless = results.filter((r) => (r.probe?.a11y?.namelessButtons ?? 0) > 0);

// SAMENESS GUARD — if routes inside one matrix render identical content, the harness is
// navigating wrong (this exact failure happened once with path URLs against a hash router).
// A visual audit that captures the same pane N times is worse than no audit: it reads green.
const sameness = [];
for (const m of MATRIX) {
  const rows = results.filter((r) => r.matrix === m.id);
  const buckets = new Map();
  for (const r of rows) {
    const key = `${r.probe?.bodyTextLength ?? "?"}|${(r.probe?.counts?.allElements ?? "?")}`;
    if (!buckets.has(key)) buckets.set(key, []);
    buckets.get(key).push(r.name);
  }
  for (const [key, names] of buckets) {
    if (names.length > 2) sameness.push(`${m.id}: ${names.length} routes share content signature ${key} -> ${names.join(", ")}`);
  }
}

const summary = {
  origin: ORIGIN,
  samenessGuard: sameness.length ? sameness : "PASS — routes render distinct content",
  matrixCount: MATRIX.length,
  routeCount: ROUTES.length,
  captures: results.length,
  defects: {
    blankOrNearBlank: blank.map((r) => `${r.matrix} ${r.route} (text=${r.probe?.bodyTextLength})`),
    pageErrors: withPageErrors.map((r) => `${r.matrix} ${r.route}: ${r.pageErrors[0]}`),
    consoleErrors: withConsoleErrors.map((r) => `${r.matrix} ${r.route}: ${r.consoleErrors[0]}`),
    horizontalOverflow: overflowing.map((r) => `${r.matrix} ${r.route}: +${r.probe.overflowX}px [${(r.probe.bleeding || []).join(", ")}]`),
    darkClassMissing: darkMissing.map((r) => `${r.matrix} ${r.route}`),
    mainCountNotOne: multiMain.map((r) => `${r.matrix} ${r.route}: main=${r.probe?.counts?.main}`),
    smallTapTargets: tapTargets.map((r) => `${r.matrix} ${r.route}: ${r.probe.a11y.smallTapTargets.length}`),
    namelessButtons: nameless.map((r) => `${r.matrix} ${r.route}: ${r.probe.a11y.namelessButtons}`),
  },
};

writeFileSync(resolve(HERE, "REPORT.json"), JSON.stringify({ summary, results }, null, 1));

const md = [
  "# Mega-tranche visual audit — Safari (WebKit), desktop + mobile, light + dark",
  "",
  `Origin: \`${ORIGIN}\` · ${MATRIX.length} matrices × ${ROUTES.length} routes = **${results.length} captures**`,
  "",
  "## Defect summary",
  "",
  ...Object.entries(summary.defects).map(
    ([k, v]) => `### ${k} — ${v.length}\n\n${v.length ? v.map((s) => `- ${s}`).join("\n") : "_none_"}\n`,
  ),
  "## Per-capture table",
  "",
  "| matrix | route | text | overflowX | main | h1 | canvas | pageErr | consoleErr | settle ms |",
  "|---|---|---:|---:|---:|---:|---:|---:|---:|---:|",
  ...results.map(
    (r) =>
      `| ${r.matrix} | \`${r.route}\` | ${r.probe?.bodyTextLength ?? "?"} | ${r.probe?.overflowX ?? "?"} | ${r.probe?.counts?.main ?? "?"} | ${r.probe?.counts?.h1 ?? "?"} | ${r.probe?.counts?.canvas ?? "?"} | ${(r.pageErrors || []).length} | ${(r.consoleErrors || []).length} | ${r.settleMs} |`,
  ),
].join("\n");
writeFileSync(resolve(HERE, "REPORT.md"), md + "\n");

console.log(JSON.stringify(summary, null, 2));
