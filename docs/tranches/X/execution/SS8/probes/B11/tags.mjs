// SS8 B11 — TagEditPopover items SS8-0327..0334 (headless chromium, one browser, one context per cell).
import { writeFileSync } from "node:fs";
import { withBrowser, cell, mockApi, cardMenu, desc, pixels, contrast, rgbOf, EV, PALETTES } from "./lib.mjs";
const out = {};
// 2026-10-19 resume: each cell is isolated (an error is recorded, not fatal) and the JSON is flushed after every cell.
const safe = async (key, fn) => { try { out[key] = await fn(); } catch (e) { out[key] = { error: String(e.message).split("\n")[0] }; } writeFileSync(EV + "tags.json", JSON.stringify(out, null, 1)); };
const goto = async (page) => {
  await page.goto("http://localhost:9000/#/browse", { waitUntil: "domcontentloaded", timeout: 90000 });
  await page.getByRole("article").first().waitFor({ timeout: 20000 });
  await page.waitForTimeout(500);
};
const openEditor = async (page, n = 2, how = "mouse") => {
  if (how === "keyboard") {
    const card = page.getByRole("article", { name: `Palette: Probe Palette ${n}` });
    await card.getByRole("button", { name: "Palette menu" }).focus();
    await page.keyboard.press("Enter"); await page.getByRole("menu").waitFor();
    await page.getByRole("menuitem", { name: "Edit Tags" }).focus(); await page.keyboard.press("Enter");
  } else {
    await cardMenu(page, n);
    await page.getByRole("menuitem", { name: "Edit Tags" }).click();
  }
  await page.getByRole("dialog", { name: /^Tags of/ }).waitFor();
};
const editorState = (page) => page.evaluate(() => {
  const d = document.querySelector('[role=dialog][aria-label^="Tags of"]'); const b = d?.getBoundingClientRect();
  return { rect: b ? [b.left, b.top, b.right, b.bottom].map((v) => +v.toFixed(1)) : null, chips: d?.querySelectorAll("button[aria-pressed]").length ?? 0, spinner: !!d?.querySelector(".animate-spin"), text: d?.textContent.replace(/\s+/g, " ").trim().slice(0, 80) };
});
const focusTrace = async (page, ms) => { const t = []; let last = 0; for (const m of ms) { await page.waitForTimeout(m - last); last = m; const s = await editorState(page); t.push(`${m}ms:${await page.evaluate(desc)}:chips=${s.chips}:spinner=${s.spinner}:h=${s.rect ? +(s.rect[3] - s.rect[1]).toFixed(1) : null}`); } return t; };

await withBrowser(async (b) => {
  // Focus entry on open — catalog pre-loaded vs delayed; mouse vs keyboard opening.
  for (const [name, how, tagsDelay] of [["preloaded-mouse", "mouse", 0], ["preloaded-keyboard", "keyboard", 0], ["delayed-mouse", "mouse", 3000], ["delayed-keyboard", "keyboard", 3000]]) {
    await safe("focus-" + name, () => cell(b, {}, async (page) => {
      const log = await mockApi(page, { tagsDelay });
      await goto(page);
      if (!tagsDelay) await page.waitForTimeout(800);
      const t0 = Date.now();
      await openEditor(page, 2, how);
      const r = { openedAtMsAfterBoot: Date.now() - t0, trace: await focusTrace(page, [0, 150, 600, 1500, 3500]) };
      r.tagsRequests = log.filter((l) => l.includes("tags")).length;
      return r;
    }));
  }

  // Chip :focus-visible ring under keyboard Tab; category ink; geometry vs anchor — light, two viewports.
  for (const [name, vp] of [["1280", { width: 1280, height: 900 }], ["390", { width: 390, height: 844 }]]) {
    await safe("paint-" + name, () => cell(b, { viewport: vp, colorScheme: "light", deviceScaleFactor: 2 }, async (page) => {
      await mockApi(page); await goto(page); await page.waitForTimeout(800);
      const r = {};
      for (const n of [2, 4]) {
        await openEditor(page, n, "keyboard"); await page.waitForTimeout(500);
        const g = await page.evaluate((slug) => { const d = document.querySelector('[role=dialog][aria-label^="Tags of"]').getBoundingClientRect(); const a = document.querySelector(`[aria-label="Palette: Probe Palette ${slug}"]`).getBoundingClientRect(); return { editor: [d.left, d.top, d.right, d.bottom].map((v) => +v.toFixed(1)), anchor: [a.left, a.top, a.right, a.bottom].map((v) => +v.toFixed(1)), inViewport: d.top >= 0 && d.left >= 0 && d.bottom <= innerHeight && d.right <= innerWidth, vp: [innerWidth, innerHeight] }; }, n);
        // category ink: computed colour + background pixels inside each label box (pixels farthest from the ink)
        const labels = await page.evaluate(() => [...document.querySelectorAll('[role=dialog][aria-label^="Tags of"] .tag-chip-set__label')].map((l) => { const b = l.getBoundingClientRect(); return { text: l.textContent.trim(), color: getComputedStyle(l).color, rect: [b.left, b.top, b.width, b.height] }; }));
        const shot = await page.screenshot();
        const ink = [];
        for (const l of labels) {
          const inkRgb = rgbOf(l.color);
          const p = await pixels(page, shot, { x: Math.round(l.rect[0] * 2), y: Math.round(l.rect[1] * 2), w: Math.max(1, Math.round(l.rect[2] * 2)), h: Math.max(1, Math.round(l.rect[3] * 2)) });
          let minC = Infinity, minBg = null, n2 = 0;
          for (let i = 0; i < p.data.length; i += 4) { const px = [p.data[i], p.data[i + 1], p.data[i + 2]]; const dist = Math.hypot(px[0] - inkRgb[0], px[1] - inkRgb[1], px[2] - inkRgb[2]); if (dist > 60) { n2++; const c = contrast(inkRgb, px); if (c < minC) { minC = c; minBg = px; } } }
          ink.push({ label: l.text, ink: l.color, bgSamples: n2, minContrast: +minC.toFixed(2), worstBg: minBg });
        }
        // keyboard: Tab into the chips; read the focused chip's ring
        await page.keyboard.press("Tab"); await page.waitForTimeout(150);
        const ring = await page.evaluate(() => { const e = document.activeElement; const c = getComputedStyle(e); return { focused: (e.getAttribute("aria-label") || e.textContent).trim().slice(0, 30), role: e.getAttribute("role") || e.tagName, pressed: e.getAttribute("aria-pressed"), fv: e.matches(":focus-visible"), outline: `${c.outlineStyle} ${c.outlineWidth} ${c.outlineColor} off ${c.outlineOffset}`, shadow: c.boxShadow.slice(0, 160) }; });
        if (n === 2 && name === "1280") await page.locator('[role=dialog][aria-label^="Tags of"]').screenshot({ path: EV + "tags-keyboard-focus-1280.png" });
        r["card" + n] = { geo: g, ink, ring };
        await page.keyboard.press("Escape"); await page.waitForTimeout(400);
      }
      return r;
    }));
  }

  // TEP-6 client half: a legacy row (currentHash null) — what If-Match does the toggle send?
  await safe("tep6", () => cell(b, {}, async (page) => {
    const legacy = PALETTES.map((p) => (p.slug === "probe-palette-2" ? { ...p, currentHash: null, updatedAt: "2026-01-01T00:00:00.000Z" } : p));
    const headers = [];
    page.on("request", (q) => { if (q.method() === "PATCH") headers.push({ url: new URL(q.url()).pathname, ifMatch: q.headers()["if-match"] ?? null, body: q.postData() }); });
    await mockApi(page, { palettes: legacy }); await goto(page); await page.waitForTimeout(800);
    await openEditor(page, 2); await page.waitForTimeout(400);
    await page.getByRole("dialog", { name: /^Tags of/ }).getByRole("button", { name: "warm" }).click();
    await page.waitForTimeout(800);
    return { patch: headers };
  }));

  // C-5 / TEP-19 — the live :3000 contract, unmocked tag catalog (what the editor renders on the dev corpus)
  await safe("c5live", () => cell(b, {}, async (page) => {
    const raw = await page.request.get("http://localhost:3000/colors/tags").then(async (r) => ({ status: r.status(), body: (await r.text()).slice(0, 80) }));
    await mockApi(page, { liveTags: true }); // palettes mocked; the tag catalog is the live :3000 answer
    await page.goto("http://localhost:9000/#/browse", { waitUntil: "networkidle" }); await page.getByRole("article").first().waitFor();
    await openEditor(page, 2); await page.waitForTimeout(800);
    return { raw, editor: await editorState(page) };
  }));
});
writeFileSync(EV + "tags.json", JSON.stringify(out, null, 1));
console.log(JSON.stringify(out, null, 1));
