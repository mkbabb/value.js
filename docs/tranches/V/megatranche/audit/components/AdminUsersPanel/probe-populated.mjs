// CHALLENGE-D · AdminUsersPanel — populated/expanded/dialog state probe.
//
// The mega-tranche visual audit captured /#/admin/users ONLY in the
// no-admin-token state (dock shows "Login"; roster shows "No users found.").
// Every populated state of this component is therefore uncaptured. This probe
// mints a fake admin token, intercepts the admin API, and captures the real
// rows + expanded disclosure + confirm dialog, plus computed-style telemetry.
//
// READ-ONLY against the running dev server. Writes ONLY under
// docs/tranches/V/megatranche/audit/components/AdminUsersPanel/.
//
//   node docs/tranches/V/megatranche/audit/components/AdminUsersPanel/probe-populated.mjs

import { webkit, devices } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const HERE = import.meta.dirname;
const FRAMES = resolve(HERE, "frames");
mkdirSync(FRAMES, { recursive: true });
const ORIGIN = "http://localhost:9000";

const USERS = [
  { slug: "aurora-drifting-lantern-4471", createdAt: "2026-07-01T10:00:00Z", lastSeenAt: "2026-07-20T10:00:00Z", status: "active", paletteCount: 12 },
  { slug: "empty-ghost-quiet-meadow-33", createdAt: "2026-06-02T10:00:00Z", status: "active", paletteCount: 0 },
  { slug: "empty-ghost-quiet-meadow-77", createdAt: "2026-06-03T10:00:00Z", status: "suspended", paletteCount: 0 },
  { slug: "z", createdAt: "2026-05-01T10:00:00Z", status: "active", paletteCount: 3 },
  { slug: "an-extremely-long-user-slug-that-will-certainly-need-truncating-on-a-phone-9912", createdAt: "2026-04-01T10:00:00Z", status: "active", paletteCount: 1 },
];

const PALETTES = [
  {
    name: "Harbor Dusk", slug: "harbor-dusk-1", userSlug: "aurora-drifting-lantern-4471",
    colors: [
      { css: "oklch(62% 0.19 26)", position: 0 }, { css: "oklch(72% 0.15 84)", position: 1 },
      { css: "oklch(58% 0.12 220)", position: 2 }, { css: "oklch(45% 0.09 300)", position: 3 },
    ],
    createdAt: "2026-07-01T10:00:00Z", updatedAt: "2026-07-01T10:00:00Z",
    isLocal: false, tier: "standard", visibility: "public",
  },
  {
    name: "Kelp", slug: "kelp-2", userSlug: "aurora-drifting-lantern-4471",
    colors: [{ css: "oklch(52% 0.14 150)", position: 0 }, { css: "oklch(70% 0.10 140)", position: 1 }],
    createdAt: "2026-07-02T10:00:00Z", updatedAt: "2026-07-02T10:00:00Z",
    isLocal: false, tier: "featured", visibility: "public",
  },
];

const initScript = (scheme) => `
  try {
    localStorage.setItem('vueuse-color-scheme', ${JSON.stringify(scheme)});
    localStorage.setItem('palette-admin-token', 'PROBE-FAKE-ADMIN-TOKEN');
    const de = document.documentElement;
    if (${JSON.stringify(scheme)} === 'dark') de.classList.add('dark'); else de.classList.remove('dark');
  } catch (e) {}
`;

async function mount(browser, { scheme, ctx }) {
  const context = await browser.newContext({ ...ctx, colorScheme: scheme });
  await context.addInitScript(initScript(scheme));
  await context.route("**/admin/users/*/palettes", (r) =>
    r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(PALETTES) }));
  await context.route("**/admin/users?**", (r) =>
    r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ data: USERS, total: USERS.length, limit: 50, offset: 0 }) }));
  const page = await context.newPage();
  await page.goto(`${ORIGIN}/#/admin/users`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(3500);
  return { context, page };
}

const telemetry = {};

function shot(page, name) {
  return page.screenshot({ path: resolve(FRAMES, `${name}.png`), fullPage: false });
}

const browser = await webkit.launch();

// ---- desktop light: populated + expanded + dialog ---------------------------
{
  const { context, page } = await mount(browser, {
    scheme: "light",
    ctx: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 },
  });
  await shot(page, "A-desktop-light-populated");

  telemetry.desktopLight = await page.evaluate(() => {
    const q = (s, r = document) => r.querySelector(s);
    const qa = (s, r = document) => [...r.querySelectorAll(s)];
    const rows = qa('[role="button"][aria-expanded]');
    const box = (el) => { const r = el.getBoundingClientRect(); return { x: +r.x.toFixed(1), y: +r.y.toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1) }; };
    const cs = (el, props) => Object.fromEntries(props.map((p) => [p, getComputedStyle(el).getPropertyValue(p)]));

    // the panel's own toolbar buttons
    const btns = qa("button").filter((b) => /Prune empty|Refresh/.test(b.textContent || ""));
    const rowBtns = qa("button").filter((b) => /Palettes/.test(b.textContent || "") && b.closest('[role="button"][aria-expanded]'));
    const pill = q(".slug-pill");
    const panes = qa("main .pane-container > *, main > div > div");

    return {
      rowCount: rows.length,
      rowBoxes: rows.map(box),
      rowClasses: rows[0]?.className,
      rowChildInteractive: rows.map((r) => r.querySelectorAll("button,a,input,[tabindex]").length),
      toolbarButtons: btns.map((b) => ({
        text: (b.textContent || "").trim(), box: box(b),
        ...cs(b, ["font-family", "font-size", "font-style", "font-weight", "min-height", "height", "padding-inline-start", "color", "border-color"]),
      })),
      rowActionButtons: rowBtns.map((b) => ({ text: (b.textContent || "").trim(), box: box(b) })),
      slugPill: pill ? { text: pill.textContent, box: box(pill), ...cs(pill, ["color", "border-color", "border-width", "font-family", "font-size", "font-weight"]) } : null,
      // full-row focus target vs. nested buttons
      firstRowInner: rows[0] ? qa("button", rows[0]).map((b) => ({ label: b.getAttribute("aria-label") || (b.textContent || "").trim(), box: box(b) })) : [],
      // route-level composition: how much width does the Users pane get?
      mainWidth: q("main")?.getBoundingClientRect().width,
      cards: qa("main [data-slot='card'], main .glass-resting").map((c) => ({ cls: c.className.slice(0, 60), box: box(c) })),
      h1Count: qa("h1").length,
      docTitle: document.title,
    };
  });

  // expand the first row (12 palettes)
  const firstRow = page.locator('[role="button"][aria-expanded]').first();
  await firstRow.click();
  await page.waitForTimeout(1200);
  await shot(page, "B-desktop-light-expanded");

  telemetry.expanded = await page.evaluate(() => {
    const qa = (s, r = document) => [...r.querySelectorAll(s)];
    const box = (el) => { const r = el.getBoundingClientRect(); return { y: +r.y.toFixed(1), h: +r.height.toFixed(1) }; };
    const row = document.querySelector('[role="button"][aria-expanded="true"]');
    const shell = row?.parentElement;
    return {
      expandedRowAria: row?.getAttribute("aria-expanded"),
      hasAriaControls: row?.hasAttribute("aria-controls") ?? null,
      disclosureId: shell?.querySelector(".border-t")?.id || null,
      disclosureBox: shell?.querySelector(".border-t") ? box(shell.querySelector(".border-t")) : null,
      paletteCards: qa("[data-slot='card']", shell || document).length,
      nestedCardShellClass: shell?.className,
    };
  });

  // open the destructive confirm dialog from the row trash button
  await page.locator('button[aria-label^="Delete user"]').first().click();
  await page.waitForTimeout(900);
  await shot(page, "C-desktop-light-confirm-dialog");

  telemetry.dialog = await page.evaluate(() => {
    const d = document.querySelector('[role="dialog"], [role="alertdialog"]');
    if (!d) return { present: false };
    const cs = (el, p) => getComputedStyle(el).getPropertyValue(p);
    const btns = [...d.querySelectorAll("button")].map((b) => ({
      text: (b.textContent || "").trim(),
      bg: cs(b, "background-color"), color: cs(b, "color"), fontFamily: cs(b, "font-family"),
      w: +b.getBoundingClientRect().width.toFixed(1), h: +b.getBoundingClientRect().height.toFixed(1),
    }));
    return {
      present: true, role: d.getAttribute("role"),
      hasAriaModal: d.getAttribute("aria-modal"),
      focused: document.activeElement?.tagName + ":" + (document.activeElement?.textContent || "").trim().slice(0, 24),
      text: (d.textContent || "").replace(/\s+/g, " ").trim(),
      buttons: btns,
      pillInDescription: !!d.querySelector(".slug-pill"),
    };
  });
  await context.close();
}

// ---- desktop dark: populated ------------------------------------------------
{
  const { context, page } = await mount(browser, {
    scheme: "dark",
    ctx: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 },
  });
  await shot(page, "D-desktop-dark-populated");
  // hover the destructive per-row button to see the "red arrives on hover" claim
  await page.locator('button[aria-label^="Delete user"]').first().hover();
  await page.waitForTimeout(600);
  await shot(page, "E-desktop-dark-row-hover");
  telemetry.darkHover = await page.evaluate(() => {
    const b = document.querySelector('button[aria-label^="Delete user"]');
    const cs = getComputedStyle(b);
    return { color: cs.color, background: cs.backgroundColor };
  });
  await context.close();
}

// ---- mobile light: populated ------------------------------------------------
{
  const { context, page } = await mount(browser, { scheme: "light", ctx: { ...devices["iPhone 14"] } });
  await shot(page, "F-mobile-light-populated");
  telemetry.mobile = await page.evaluate(() => {
    const qa = (s, r = document) => [...r.querySelectorAll(s)];
    const box = (el) => { const r = el.getBoundingClientRect(); return { x: +r.x.toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1) }; };
    const rows = qa('[role="button"][aria-expanded]');
    return {
      docScrollW: document.documentElement.scrollWidth,
      innerW: window.innerWidth,
      rowBoxes: rows.map(box),
      slugTexts: qa(".slug-pill").map((p) => (p.textContent || "").trim()),
      slugBoxes: qa(".slug-pill").map(box),
      rowButtonBoxes: qa('[role="button"][aria-expanded] button').map((b) => ({ label: b.getAttribute("aria-label") || (b.textContent || "").trim(), ...box(b) })),
      toolbarWrapped: (() => {
        const bs = qa("button").filter((b) => /Prune empty|Refresh/.test(b.textContent || ""));
        return bs.map(box);
      })(),
    };
  });
  await context.close();
}

// ---- reduced motion: does the celebration Transition + spinner honour it? ----
{
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2,
    colorScheme: "light", reducedMotion: "reduce",
  });
  await context.addInitScript(initScript("light"));
  await context.route("**/admin/users?**", (r) =>
    r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ data: USERS, total: USERS.length, limit: 50, offset: 0 }) }));
  const page = await context.newPage();
  await page.goto(`${ORIGIN}/#/admin/users`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(3200);
  telemetry.reducedMotion = await page.evaluate(() => {
    const out = { celebrateRules: [], rowTransition: null, spinKeyframeGated: null };
    const row = document.querySelector('[role="button"][aria-expanded]');
    if (row) {
      const cs = getComputedStyle(row);
      out.rowTransition = { prop: cs.transitionProperty, dur: cs.transitionDuration };
    }
    for (const sheet of document.styleSheets) {
      let rules; try { rules = sheet.cssRules; } catch { continue; }
      for (const r of rules) {
        const t = r.cssText || "";
        if (/vj-celebrate/.test(t)) out.celebrateRules.push(t.slice(0, 260));
      }
    }
    out.prefersReduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    return out;
  });
  await context.close();
}

// ---- error state: backend 500 ----------------------------------------------
{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: "light" });
  await context.addInitScript(initScript("light"));
  await context.route("**/admin/users?**", (r) => r.fulfill({ status: 500, contentType: "application/json", body: JSON.stringify({ title: "Internal Server Error", detail: "roster store offline" }) }));
  const page = await context.newPage();
  await page.goto(`${ORIGIN}/#/admin/users`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(3200);
  await shot(page, "G-desktop-light-error");
  telemetry.error = await page.evaluate(() => {
    const m = document.querySelector("main");
    return { text: (m?.textContent || "").replace(/\s+/g, " ").trim().slice(0, 400) };
  });
  await context.close();
}

await browser.close();
writeFileSync(resolve(HERE, "probe-populated.json"), JSON.stringify(telemetry, null, 1));
console.log(JSON.stringify(telemetry, null, 1));
