// CHALLENGE-D · AdminUsersPanel — measurement probe (round 2).
// Decides: nested-Card tuple compliance in the expanded disclosure, the
// slug-pill/plate contrast, the type-rung values, and the toolbar wrap.
//
// READ-ONLY. Writes ONLY under this component's audit directory.

import { webkit, devices } from "playwright";
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

const HERE = import.meta.dirname;
const ORIGIN = "http://localhost:9000";

const USERS = [
  { slug: "aurora-drifting-lantern-4471", createdAt: "2026-07-01T10:00:00Z", status: "active", paletteCount: 12 },
  { slug: "empty-ghost-quiet-meadow-33", createdAt: "2026-06-02T10:00:00Z", status: "active", paletteCount: 0 },
  { slug: "empty-ghost-quiet-meadow-77", createdAt: "2026-06-03T10:00:00Z", status: "suspended", paletteCount: 0 },
];
const PALETTES = [{
  name: "Harbor Dusk", slug: "harbor-dusk-1", userSlug: "aurora-drifting-lantern-4471",
  colors: [{ css: "oklch(62% 0.19 26)", position: 0 }, { css: "oklch(72% 0.15 84)", position: 1 }],
  createdAt: "2026-07-01T10:00:00Z", updatedAt: "2026-07-01T10:00:00Z", isLocal: false, tier: "standard", visibility: "public",
}];

const init = (scheme) => `try{
  localStorage.setItem('vueuse-color-scheme', ${JSON.stringify(scheme)});
  localStorage.setItem('palette-admin-token','PROBE-FAKE-ADMIN-TOKEN');
  const de=document.documentElement;
  if(${JSON.stringify(scheme)}==='dark') de.classList.add('dark'); else de.classList.remove('dark');
}catch(e){}`;

async function mount(browser, ctx, scheme) {
  const context = await browser.newContext({ ...ctx, colorScheme: scheme });
  await context.addInitScript(init(scheme));
  await context.route("**/admin/users/*/palettes", (r) => r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(PALETTES) }));
  await context.route("**/admin/users?**", (r) => r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ data: USERS, total: 3, limit: 50, offset: 0 }) }));
  const page = await context.newPage();
  await page.goto(`${ORIGIN}/#/admin/users`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(3400);
  return { context, page };
}

const out = {};
const browser = await webkit.launch();

const { context, page } = await mount(browser, { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 }, "light");

// type rungs + font-display italic provenance
out.tokens = await page.evaluate(() => {
  const cs = getComputedStyle(document.documentElement);
  const probe = document.createElement("span");
  probe.className = "font-display";
  document.body.appendChild(probe);
  const p = getComputedStyle(probe);
  const r = {
    typeCaption: cs.getPropertyValue("--type-caption").trim(),
    typeSmall: cs.getPropertyValue("--type-small").trim(),
    typeMonoSmall: cs.getPropertyValue("--type-mono-small").trim(),
    fontDisplayResolved: p.fontFamily, fontDisplayStyle: p.fontStyle,
  };
  probe.remove();
  return r;
});

// toolbar / count / row rhythm
out.desktop = await page.evaluate(() => {
  const qa = (s, r = document) => [...r.querySelectorAll(s)];
  const box = (el) => { const b = el.getBoundingClientRect(); return { x: +b.x.toFixed(1), y: +b.y.toFixed(1), w: +b.width.toFixed(1), h: +b.height.toFixed(1) }; };
  const rows = qa('[role="button"][aria-expanded]');
  const inert = qa(".rounded-md.border.border-card-edge.overflow-hidden > div").filter((d) => !d.hasAttribute("role"));
  const pills = qa("main .slug-pill");
  const first = pills[0];
  return {
    interactiveRows: rows.length,
    inertRows: inert.length,
    rowH: rows[0] ? box(rows[0]).h : null,
    inertRowH: inert[0] ? box(inert[0]).h : null,
    // dead middle: distance from badge right edge to first action button left edge
    contentColW: (() => {
      const r = rows[0]; if (!r) return null;
      const badge = r.querySelector("[data-slot='badge'], .rounded-badge, span + span");
      const act = r.querySelector("button");
      return act && badge ? +(box(act).x - (box(badge).x + box(badge).w)).toFixed(1) : null;
    })(),
    pillStyle: first ? { ...box(first), color: getComputedStyle(first).color, borderColor: getComputedStyle(first).borderColor, borderWidth: getComputedStyle(first).borderWidth, fontWeight: getComputedStyle(first).fontWeight } : null,
    plateBg: (() => { let el = document.querySelector("main .slug-pill"); while (el) { const b = getComputedStyle(el).backgroundColor; if (b && b !== "rgba(0, 0, 0, 0)" && b !== "transparent") return b; el = el.parentElement; } return null; })(),
  };
});

// expand, then measure the nested palette Card tuple
await page.locator('[role="button"][aria-expanded]').first().click();
await page.waitForTimeout(1200);
out.nestedCard = await page.evaluate(() => {
  const disc = document.querySelector('[role="button"][aria-expanded="true"]')?.parentElement?.querySelector(".border-t");
  if (!disc) return { found: false };
  const card = disc.querySelector("[class*='card'], article, [data-slot]");
  const all = [...disc.querySelectorAll("*")].filter((e) => /(^|\s)card(\s|$)|glass-|rounded-card/.test(e.className || ""));
  const pick = all[0] || card;
  if (!pick) return { found: false, discHTML: disc.innerHTML.slice(0, 400) };
  const cs = getComputedStyle(pick);
  const box = (el) => { const b = el.getBoundingClientRect(); return { x: +b.x.toFixed(1), w: +b.width.toFixed(1), h: +b.height.toFixed(1) }; };
  // count nested boundaries from the pane Card down to the palette card
  let depth = 0, node = pick, chain = [];
  while (node && node !== document.body) {
    const s = getComputedStyle(node);
    const hasBorder = parseFloat(s.borderTopWidth) > 0 || parseFloat(s.borderBottomWidth) > 0;
    const hasShadow = s.boxShadow && s.boxShadow !== "none";
    if (hasBorder || hasShadow) { depth++; chain.push({ cls: (node.className || "").toString().slice(0, 70), border: s.borderTopWidth, shadow: s.boxShadow.slice(0, 60) }); }
    node = node.parentElement;
  }
  return {
    found: true,
    cardClass: (pick.className || "").toString(),
    dataSlot: pick.getAttribute("data-slot"),
    boxShadow: cs.boxShadow,
    backgroundColor: cs.backgroundColor,
    backdropFilter: cs.backdropFilter || cs.webkitBackdropFilter,
    box: box(pick),
    boundedAncestorCount: depth,
    boundaryChain: chain,
  };
});

// dialog: cancel vs destructive hue, and the surface behind the confirm text
await page.locator('button[aria-label^="Delete user"]').first().click();
await page.waitForTimeout(900);
out.dialogSurface = await page.evaluate(() => {
  const d = document.querySelector('[role="dialog"]');
  if (!d) return null;
  const cs = getComputedStyle(d);
  const desc = d.querySelector("p, [id*='desc'], [data-slot*='description']");
  return {
    role: d.getAttribute("role"), ariaModal: d.getAttribute("aria-modal"),
    surfaceBg: cs.backgroundColor, backdrop: cs.backdropFilter || cs.webkitBackdropFilter, opacity: cs.opacity,
    descLines: desc ? Math.round(desc.getBoundingClientRect().height / parseFloat(getComputedStyle(desc).lineHeight || "20")) : null,
    descBox: desc ? { w: +desc.getBoundingClientRect().width.toFixed(1), h: +desc.getBoundingClientRect().height.toFixed(1) } : null,
    pillBox: (() => { const p = d.querySelector(".slug-pill"); return p ? { w: +p.getBoundingClientRect().width.toFixed(1), h: +p.getBoundingClientRect().height.toFixed(1), bw: getComputedStyle(p).borderWidth } : null; })(),
    buttons: [...d.querySelectorAll("button")].map((b) => ({ t: b.textContent.trim(), color: getComputedStyle(b).color, bg: getComputedStyle(b).backgroundColor })),
  };
});
await context.close();

// ---- mobile toolbar wrap, measured ------------------------------------------
{
  const { context: c2, page: p2 } = await mount(browser, { ...devices["iPhone 14"] }, "light");
  out.mobileToolbar = await p2.evaluate(() => {
    const bs = [...document.querySelectorAll("button")].filter((b) => /Prune empty|Refresh/.test(b.textContent || ""));
    const count = [...document.querySelectorAll("span")].find((s) => /\d+ users?$/.test((s.textContent || "").trim()));
    const empt = [...document.querySelectorAll("span")].find((s) => /^·\s*\d+ empty/.test((s.textContent || "").trim()));
    const box = (el) => { const b = el.getBoundingClientRect(); return { x: +b.x.toFixed(1), y: +b.y.toFixed(1), w: +b.width.toFixed(1), h: +b.height.toFixed(1) }; };
    return {
      viewport: window.innerWidth,
      count: count ? { text: count.textContent.trim(), ...box(count) } : null,
      empty: empt ? { text: empt.textContent.trim(), ...box(empt) } : null,
      prune: bs[0] ? box(bs[0]) : null,
      refresh: bs[1] ? box(bs[1]) : null,
      sameLine: bs[0] && bs[1] ? Math.abs(bs[0].getBoundingClientRect().y - bs[1].getBoundingClientRect().y) < 4 : null,
    };
  });
  await c2.close();
}

await browser.close();
writeFileSync(resolve(HERE, "probe-measure.json"), JSON.stringify(out, null, 1));
console.log(JSON.stringify(out, null, 1));
