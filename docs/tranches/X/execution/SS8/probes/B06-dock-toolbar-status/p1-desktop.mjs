// SERVED MODEL: claude-opus-5-5 — SS-8 B06 P1: desktop (1440x900, fine pointer) dock-chrome witnesses.
// One Chromium (headless shell), one context per cell, all closed in finally.
// Items: 0155(fine baseline) 0156(fine) 0157 0158 0168 0169 0172 0173 0175 0179 0180.
import { chromium } from "playwright";
import { boot, restOnDock, ensureExpanded, scheme, renderedContrast, resolveColor, oklab, writeJson, EV } from "./lib.mjs";

const out = { probe: "p1-desktop", at: new Date().toISOString(), cells: {} };
const VIEW_IDS = ["picker", "palettes", "browse", "extract", "mix", "generate", "gradient"];
const toggleBtn = (p) => p.locator(".action-bar-toggle-inner button").first();
const trigger = (p) => p.getByRole("combobox", { name: "Select view" });

async function openViewByName(page, name) {
  await ensureExpanded(page);
  await trigger(page).click();
  await page.getByRole("option", { name }).click();
  await page.waitForTimeout(1500);
}

const browser = await chromium.launch();
try {
  for (const cs of ["light", "dark"]) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: cs });
    const cell = (out.cells[cs] = { errors: [] });
    try {
      const page = await ctx.newPage();
      page.on("pageerror", (e) => cell.errors.push(String(e).slice(0, 200)));
      await boot(page, "#/");
      await restOnDock(page);
      cell.scheme = await scheme(page);

      // 0168 — trigger label + icon rendered contrast.
      const label = page.locator(".view-select-trigger span").filter({ hasText: /\S/ }).first();
      cell.c0168_label = await renderedContrast(page, label, { shot: `${EV}/p1-0168-trigger-${cs}.png`, pad: 0 });
      cell.c0168_icon = await renderedContrast(page, page.locator(".view-select-trigger svg").first());

      // 0172 — resolved per-view accents: only the CURRENT --accent-view is written at HEAD,
      // so each view is visited (in-app hash change) and the root token read.
      const accents = {};
      for (const id of VIEW_IDS) {
        await page.evaluate((h) => (location.hash = h), id === "picker" ? "#/" : "#/" + id);
        await page.waitForTimeout(1300);
        accents[id] = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue("--accent-view").trim());
      }
      await page.evaluate(() => (location.hash = "#/"));
      await page.waitForTimeout(1500);
      await ensureExpanded(page);
      const labs = {};
      for (const id of VIEW_IDS) if (accents[id]) labs[id] = oklab(await resolveColor(page, accents[id]));
      let maxD = 0, pair = null;
      const ks = Object.keys(labs);
      for (let i = 0; i < ks.length; i++) for (let j = i + 1; j < ks.length; j++) {
        const [a, b] = [labs[ks[i]], labs[ks[j]]];
        const d = Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
        if (d > maxD) { maxD = d; pair = [ks[i], ks[j]]; }
      }
      cell.c0172 = { accents, oklabL: Object.fromEntries(ks.map((k) => [k, +labs[k][0].toFixed(3)])), oklabC: Object.fromEntries(ks.map((k) => [k, +Math.hypot(labs[k][1], labs[k][2]).toFixed(3)])), maxPairwiseOKLab: +maxD.toFixed(4), pair };

      // 0169 + 0173 — pointer-open highlight seeding, listbox overlap.
      await trigger(page).click();
      await page.getByRole("listbox").waitFor({ state: "visible", timeout: 5000 });
      await page.mouse.move(1400, 880); // park the pointer off the list
      await page.waitForTimeout(400);
      cell.c0169 = await page.evaluate(() => {
        const opts = [...document.querySelectorAll('[role="option"]')];
        return {
          options: opts.length,
          highlighted: opts.filter((o) => o.hasAttribute("data-highlighted")).map((o) => o.textContent.trim()),
          selected: opts.filter((o) => o.getAttribute("aria-selected") === "true" || o.getAttribute("data-state") === "checked").map((o) => o.textContent.trim()),
          activeElement: (document.activeElement?.getAttribute("role") ?? "") + ":" + (document.activeElement?.textContent ?? "").trim().slice(0, 30),
        };
      });
      await page.screenshot({ path: `${EV}/p1-0169-open-${cs}.png`, clip: { x: 300, y: 0, width: 840, height: 520 } });
      cell.c0173 = await page.evaluate(() => {
        const lb = document.querySelector('[role="listbox"]');
        const pop = lb.closest("[data-reka-popper-content-wrapper]") ?? lb;
        const cont = lb.parentElement?.closest('[role="dialog"],[data-state]') ?? lb;
        const t = document.querySelector(".view-select-trigger").getBoundingClientRect();
        const plate = document.querySelector(".glass-dock .dock-plate").getBoundingClientRect();
        const band = document.querySelector(".dock-band")?.getBoundingClientRect();
        const c = pop.getBoundingClientRect(), l = lb.getBoundingClientRect();
        return { triggerBottom: t.bottom, plateBottom: plate.bottom, bandBottom: band?.bottom ?? null, contentTop: c.top, listboxTop: l.top, overlapPlate: +(plate.bottom - c.top).toFixed(2), overlapBand: band ? +(band.bottom - c.top).toFixed(2) : null, gapFromTrigger: +(c.top - t.bottom).toFixed(2) };
      });
      await page.keyboard.press("Escape");
      await page.waitForTimeout(500);

      // 0155 (fine baseline) — successor seat geometry vs sibling DockControl (Back).
      await ensureExpanded(page);
      await toggleBtn(page).click();
      await page.waitForTimeout(1200);
      cell.c0155_fine = await page.evaluate(() => {
        const r = (el) => { if (!el) return null; const b = el.getBoundingClientRect(); return [+b.width.toFixed(2), +b.height.toFixed(2)]; };
        const back = [...document.querySelectorAll(".glass-dock button")].find((b) => b.getAttribute("aria-label") === "Back");
        return { seats: [...document.querySelectorAll(".dock-face.is-active .action-button-wrapper")].map(r), back: r(back), rootFont: getComputedStyle(document.documentElement).fontSize, uiScale: getComputedStyle(document.documentElement).getPropertyValue("--ui-scale").trim(), pointerCoarse: matchMedia("(pointer: coarse)").matches };
      });

      // 0157 — focus ring on a successor seat (keyboard focus).
      const seat = page.locator(".dock-face.is-active .action-button-wrapper").first();
      const sbox = await seat.boundingBox();
      const pre = await page.screenshot({ clip: { x: sbox.x - 6, y: sbox.y - 6, width: sbox.width + 12, height: sbox.height + 12 } });
      await seat.focus();
      await page.keyboard.press("Shift+Tab"); await page.keyboard.press("Tab"); // ensure :focus-visible via keyboard modality
      await page.waitForTimeout(250);
      const ring = await seat.evaluate((el) => {
        const s = getComputedStyle(el);
        return { focusVisible: el.matches(":focus-visible"), outlineStyle: s.outlineStyle, outlineWidth: s.outlineWidth, outlineColor: s.outlineColor, outlineOffset: s.outlineOffset, boxShadow: s.boxShadow.slice(0, 160), color: s.color };
      });
      await page.screenshot({ path: `${EV}/p1-0157-ring-${cs}.png`, clip: { x: sbox.x - 6, y: sbox.y - 6, width: sbox.width + 12, height: sbox.height + 12 } });
      const ringCss = ring.outlineStyle !== "none" && ring.outlineWidth !== "0px" ? ring.outlineColor : null;
      if (ringCss) {
        const rc = await resolveColor(page, ringCss);
        ring.ringVsGround = await page.evaluate(async ({ b64, rc, pad }) => {
          const img = new Image(); img.src = "data:image/png;base64," + b64; await img.decode();
          const c = document.createElement("canvas"); c.width = img.width; c.height = img.height;
          const x = c.getContext("2d"); x.drawImage(img, 0, 0); const d = x.getImageData(0, 0, c.width, c.height).data;
          const lin = (v) => { const s = v / 255; return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4; };
          const L = (r, g, b) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
          const a = rc[3]; const out = [];
          for (let yy = 0; yy < c.height; yy++) for (let xx = 0; xx < c.width; xx++) {
            const band = xx < pad || yy < pad || xx >= c.width - pad || yy >= c.height - pad; if (!band) continue;
            const i = (yy * c.width + xx) * 4; const [r, g, b] = [d[i], d[i + 1], d[i + 2]];
            const l1 = L(a * rc[0] + (1 - a) * r, a * rc[1] + (1 - a) * g, a * rc[2] + (1 - a) * b), l2 = L(r, g, b);
            out.push((Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05));
          }
          out.sort((p, q) => p - q);
          return { px: out.length, min: +out[0].toFixed(3), median: +out[out.length >> 1].toFixed(3) };
        }, { b64: pre.toString("base64"), rc, pad: 6 });
        ring.ringRgba = rc.map((v) => +v.toFixed(2));
      }
      cell.c0157 = ring;
      await page.keyboard.press("Escape");

      if (cs === "light") try {
        // 0158 — actions<->main cut: per-frame computed opacity of every dock face.
        await ensureExpanded(page);
        const back = page.locator('.dock-face.is-active button[aria-label="Back"]').first();
        cell.c0158_pre = await page.evaluate(() => ({ collapsed: document.querySelector(".glass-dock").classList.contains("collapsed"), active: document.querySelector(".dock-face.is-active")?.textContent.trim().slice(0, 40) }));
        await boot(page, "#/"); await ensureExpanded(page);
        await toggleBtn(page).click(); await page.waitForTimeout(1200); await restOnDock(page);
        await back.waitFor({ state: "visible", timeout: 5000 });
        await page.evaluate(() => {
          window.__ss8 = []; const t0 = performance.now();
          const tick = () => {
            const faces = [...document.querySelectorAll(".glass-dock .dock-crossfade > .dock-face")];
            window.__ss8.push({ t: +(performance.now() - t0).toFixed(1), o: faces.map((f) => +Number(getComputedStyle(f).opacity).toFixed(3)), a: faces.map((f) => f.classList.contains("is-active") ? 1 : 0) });
            if (performance.now() - t0 < 1400) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        });
        await page.waitForTimeout(150);
        await back.click(); // action-bar -> main
        await page.waitForTimeout(600);
        await toggleBtn(page).click(); // main -> action-bar
        await page.waitForTimeout(900);
        const frames = await page.evaluate(() => window.__ss8);
        const mids = frames.filter((f) => f.o.some((v) => v > 0.02 && v < 0.98));
        cell.c0158 = { frames: frames.length, framesWithMidOpacityFace: mids.length, sampleMid: mids.slice(0, 6), first: frames[0], last: frames[frames.length - 1] };
        writeJson("p1-0158-frames.json", frames);

        // 0156 (fine) — hover a seat (popover -> keepOpen), click Extract (seat unmounts), read hold.
        const held = () => page.evaluate(() => { const d = document.querySelector(".glass-dock"); return { held: d.getAttribute("data-held"), collapsed: d.classList.contains("collapsed"), cls: d.className }; });
        await ensureExpanded(page);
        const ext = page.locator('[data-scene-action="color.extract"] .action-button-wrapper');
        await ext.hover();
        await page.waitForTimeout(900);
        const hoverOpen = await held();
        await ext.click();
        await page.mouse.move(700, 700);
        await page.waitForTimeout(800);
        const afterClick = await held();
        await page.waitForTimeout(6500);
        cell.c0156_fine = { hoverOpen, afterClick, after7s: await held(), hash: await page.evaluate(() => location.hash) };
        // control: a fresh boot, untouched, pointer off the dock for 7s.
        await boot(page, "#/");
        await page.mouse.move(700, 700);
        await page.waitForTimeout(7000);
        cell.c0156_control = await held();

        // 0179 — generic bar layer: stretched vs content-sized at 1440 (generate scene).
        await boot(page, "#/generate");
        await ensureExpanded(page);
        await toggleBtn(page).click();
        await page.waitForTimeout(1200);
        cell.c0179_1440 = await page.evaluate(() => {
          const row = document.querySelector('[data-testid="scene-action-row"]');
          const face = row.closest(".dock-face"); const plate = document.querySelector(".glass-dock .dock-plate");
          const seats = [...row.querySelectorAll(".scene-action-seat")].map((s) => s.getBoundingClientRect());
          const R = (b) => [+b.x.toFixed(1), +b.width.toFixed(1)];
          return { plate: R(plate.getBoundingClientRect()), face: R(face.getBoundingClientRect()), row: R(row.getBoundingClientRect()), seats: seats.map(R), gaps: seats.slice(1).map((b, i) => +(b.x - seats[i].right).toFixed(2)), pitch: seats.slice(1).map((b, i) => +(b.x - seats[i].x).toFixed(2)), rowJustify: getComputedStyle(row).justifyContent, rowFlex: getComputedStyle(row).flexGrow };
        });
        await page.screenshot({ path: `${EV}/p1-0179-generate-1440.png`, clip: { x: 300, y: 0, width: 840, height: 90 } });

        // 0180 — KeepAlive round trip: Regenerate, route away (Mix) and back, Regenerate.
        const sig = () => page.evaluate(() => { const m = document.querySelector("main") ?? document.body; return [...m.querySelectorAll("[style*='background']")].slice(0, 40).map((e) => e.getAttribute("style")).join("|").length + ":" + [...m.querySelectorAll("[style*='background']")].slice(0, 40).map((e) => getComputedStyle(e).backgroundColor).join(","); });
        const regen = page.locator('[data-scene-action="generate.regenerate"] .action-button-wrapper');
        const s0 = await sig(); await regen.click(); await page.waitForTimeout(1200); const s1 = await sig();
        await page.locator('.dock-face.is-active button[aria-label="Back"]').first().click(); await page.waitForTimeout(600);
        await openViewByName(page, "Mix");
        const midHash = await page.evaluate(() => location.hash);
        await openViewByName(page, "Generate");
        await ensureExpanded(page);
        await toggleBtn(page).click(); await page.waitForTimeout(1200);
        const st = await page.locator('[data-scene-action="generate.regenerate"]').getAttribute("data-action-state");
        const s2 = await sig(); await regen.click(); await page.waitForTimeout(1200); const s3 = await sig();
        cell.c0180 = { firstClickChanged: s0 !== s1, midHash, endHash: await page.evaluate(() => location.hash), stateAfterReturn: st, secondClickChanged: s2 !== s3, sigLen: s3.length };
      } catch (e) { cell.lightBlockError = String(e).slice(0, 400); }
    } finally { await ctx.close(); }
  }

  // 0175 — which gold paints (admin view, both schemes) + rendered ratio.
  for (const cs of ["light", "dark"]) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: cs });
    const cell = (out.cells[`admin-${cs}`] = {});
    try {
      await ctx.addInitScript(() => localStorage.setItem("palette-admin-token", "test-admin-token"));
      await ctx.route("**/sessions", (r) => r.fulfill({ status: 200, contentType: "application/json", body: r.request().method() === "POST" ? JSON.stringify({ token: "t", userSlug: "test-user" }) : "{}" }));
      await ctx.route("**/admin/**", (r) => new URL(r.request().url()).pathname.startsWith("/admin/") ? r.fulfill({ status: 200, contentType: "application/json", body: r.request().url().includes("/admin/tags") ? "[]" : JSON.stringify({ data: [], total: 0, limit: 20, offset: 0 }) }) : r.continue());
      const page = await ctx.newPage();
      await boot(page, "#/atmosphere");
      await ensureExpanded(page);
      const icon = page.locator(".view-select-trigger svg").first();
      cell.c0175 = await icon.evaluate((el) => {
        const s = getComputedStyle(el), r = getComputedStyle(document.documentElement);
        return { hash: location.hash, goldInk: el.classList.contains("gold-ink"), color: s.color, stroke: s.stroke, fill: s.fill, bgImage: s.backgroundImage.slice(0, 120), tokens: { "--color-gold": r.getPropertyValue("--color-gold").trim(), "--color-gold-light": r.getPropertyValue("--color-gold-light").trim(), "--gold": r.getPropertyValue("--gold").trim(), "--gold-ink": r.getPropertyValue("--gold-ink").trim() } };
      });
      cell.c0175_rendered = await renderedContrast(page, icon, { shot: `${EV}/p1-0175-gold-${cs}.png`, pad: 2 });
    } finally { await ctx.close(); }
  }
} finally {
  await browser.close();
  writeJson("p1-desktop.json", out);
  console.log(JSON.stringify(out, null, 1).slice(0, 9000));
}
