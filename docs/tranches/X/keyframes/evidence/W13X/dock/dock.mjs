// SERVED MODEL: claude-opus-5-5 — X.KF.W13X.dock · the top dock, its selects, the @mbabb menu and the Clear-all dialog, served (gh-pages dist).
// One probe, one line per row per cell; a row is RED when its predicate (named beside it) fails.
// usage: DIST=<dist> TAG=<before|after-1|…> THEME=light|dark node dock.mjs
import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const { serveDist } = await import("/Users/mkbabb/Programming/keyframes.js/scripts/lib/demo-driver.mjs");
const OUT = new URL("./frames/", import.meta.url).pathname;
const srv = await serveDist(process.env.DIST || "/Users/mkbabb/Programming/keyframes.js/dist/gh-pages");
const theme = process.env.THEME || "light", TAG = process.env.TAG || "x";
const b = await chromium.launch();
const red = {}; const R = (id, bad, msg) => { red[id] = (red[id] ?? 0) + (bad ? 1 : 0); console.log(`${bad ? "RED  " : "GREEN"} ${id} ${theme} ${msg}`); };
const MOBILE = (w) => w < 1024;
async function page(w, h, route = "cube") {
  const p = await b.newPage({ viewport: { width: w, height: h }, colorScheme: theme, reducedMotion: "reduce", isMobile: MOBILE(w), hasTouch: MOBILE(w) });
  await p.goto(`${srv.url}/#/${route}`, { waitUntil: "load" }); await p.waitForTimeout(2200);
  return p;
}
const trig = (p) => p.locator('[data-dock-tether=top] [aria-label="@mbabb menu"]').first();
async function expandDock(p) {
  const d = p.locator("[data-dock-tether=top] .glass-dock").first();
  for (let k = 0; k < 5; k++) {
    if (await d.evaluate((e) => e.classList.contains("expanded"))) return;
    await d.hover({ force: true }).catch(() => {}); await p.waitForTimeout(500);
  }
}
async function openMenu(p) {
  await expandDock(p);
  for (let k = 0; k < 4; k++) {
    if (await p.locator('[role=menu]').count()) return true;
    await trig(p).click({ force: true }).catch(() => {}); await p.waitForTimeout(600);
  }
  return (await p.locator('[role=menu]').count()) > 0;
}
const dockState = (p) => p.evaluate(() => { const d = document.querySelector("[data-dock-tether=top] .glass-dock"); return d?.classList.contains("expanded") ? "expanded" : "collapsed"; });
// contrast of an element's text colour against the most frequent painted pixel of its box (the plate it sits on)
async function textContrast(p, loc, plate = loc) {
  const box = await plate.boundingBox(); if (!box) return null;
  const png = (await p.screenshot({ clip: box })).toString("base64");
  const color = await loc.evaluate((e) => getComputedStyle(e).color);
  return p.evaluate(async ({ png, color }) => {
    const img = await createImageBitmap(await (await fetch(`data:image/png;base64,${png}`)).blob());
    const c = new OffscreenCanvas(img.width, img.height), x = c.getContext("2d"); x.drawImage(img, 0, 0);
    const d = x.getImageData(0, 0, img.width, img.height).data, n = new Map();
    for (let i = 0; i < d.length; i += 4) { const k = `${d[i]},${d[i + 1]},${d[i + 2]}`; n.set(k, (n.get(k) ?? 0) + 1); }
    const bg = [...n.entries()].sort((a, b) => b[1] - a[1])[0][0].split(",").map(Number);
    const q = new OffscreenCanvas(1, 1).getContext("2d"); q.fillStyle = "#000"; q.fillStyle = color; q.fillRect(0, 0, 1, 1);
    const fg = [...q.getImageData(0, 0, 1, 1).data].slice(0, 3);
    const L = (rgb) => { const [r, g, b] = rgb.map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
    const [a, b2] = [L(fg), L(bg)].sort((u, v) => v - u);
    return { ratio: +((a + 0.05) / (b2 + 0.05)).toFixed(2), fg: fg.join(","), bg: bg.join(",") };
  }, { png, color });
}
const norm = (p, color) => p.evaluate((c) => { const q = new OffscreenCanvas(1, 1).getContext("2d"); q.fillStyle = "#000"; q.fillStyle = c; q.fillRect(0, 0, 1, 1); return [...q.getImageData(0, 0, 1, 1).data].slice(0, 3).join(","); }, color);

// ── A · the @mbabb menu (1440, 390, 844x390) ─────────────────────────────────
for (const [w, h] of [[1440, 900], [390, 844], [844, 390]]) {
  const vp = `${w}x${h}`;
  let p = await page(w, h);
  if (!(await openMenu(p))) { console.log(`ERR ${vp} menu did not open`); await p.close(); continue; }
  const m = await p.evaluate(() => {
    const menu = document.querySelector("[role=menu]"); const r = menu.getBoundingClientRect();
    const rows = [...menu.querySelectorAll("[role=menuitem],[role=menuitemcheckbox],[role=menuitemradio]")];
    const sub = rows.filter((x) => x.querySelector("p")).map((x) => x.textContent.trim().split(/\s{2,}/)[0]);
    const dark = rows.find((x) => /Dark mode/.test(x.textContent));
    const pp = menu.querySelector('a[href="https://ppmycota.com"]');
    const label = menu.querySelector("[data-slot=menu-label], .dropdown-menu__label, [role=group] > div");
    const idLines = menu.querySelectorAll('a[href^="https://github.com"], .dropdown-menu__label p').length;
    return { left: Math.round(r.left), right: Math.round(r.right), top: Math.round(r.top), bottom: Math.round(r.bottom), vw: innerWidth, vh: innerHeight,
      sh: menu.scrollHeight, ch: menu.clientHeight, rows: rows.length, sub, darkRole: dark?.getAttribute("role"), darkChecked: dark?.getAttribute("aria-checked"),
      rowRadius: rows[0] ? getComputedStyle(rows[0]).borderRadius : null, ppTransform: pp ? getComputedStyle(pp).textTransform : null, idLines, lastRowVisible: (() => { const l = rows.at(-1)?.getBoundingClientRect(); return l ? l.bottom <= r.bottom + 1 : false; })() };
  });
  R("UIA-KF-113", m.vw - m.right < 16 || m.left < 16, `${vp} menu x[${m.left},${m.right}] of ${m.vw} (gap ${m.vw - m.right} >= 16)`);
  R("A2-KE-L2-17", m.sh > m.ch + 1, `${vp} menu scroll ${m.sh}/${m.ch} rows ${m.rows} y[${m.top},${m.bottom}] of ${m.vh}`);
  R("UIA-KF-138", m.sub.length > 1 || m.idLines > 1, `${vp} rows-with-subtitle ${m.sub.length} [${m.sub.join("|")}] identity links+lines ${m.idLines}`);
  R("UIA-KF-137", m.darkRole !== "menuitemcheckbox", `${vp} dark row role=${m.darkRole} aria-checked=${m.darkChecked}`);
  R("UIA-KF-246", m.ppTransform === "uppercase", `${vp} ppmycota.com text-transform=${m.ppTransform}`);
  R("UIA-KF-130", m.rowRadius === "8px", `${vp} menu row radius ${m.rowRadius}`);
  if (w === 1440 || w === 844) await p.screenshot({ path: `${OUT}menu-${TAG}-${vp}-${theme}.png` });
  // A2-KE-L2-13 — a press on the Dark mode ROW (its label, away from any nested toggle) flips the theme
  const before = await p.evaluate(() => document.documentElement.classList.contains("dark"));
  const lab = p.locator("[role=menu] >> text=Dark mode").first(); const lb = await lab.boundingBox();
  if (MOBILE(w)) await p.touchscreen.tap(lb.x + lb.width / 2, lb.y + lb.height / 2); else await p.mouse.click(lb.x + lb.width / 2, lb.y + lb.height / 2);
  await p.waitForTimeout(700);
  const after = await p.evaluate(() => document.documentElement.classList.contains("dark"));
  R("A2-KE-L2-13", before === after, `${vp} tap on the Dark mode row label: dark ${before} -> ${after}`);
  await p.close();
}

// ── B · Clear-all + Keyboard shortcuts from the menu (1440, 390) ─────────────
for (const [w, h] of [[1440, 900], [390, 844]]) {
  const vp = `${w}x${h}`;
  const p = await page(w, h);
  await openMenu(p);
  // UIA-KF-060 — the destructive row's label ink and the confirm button: one red, legible
  const rowLab = p.locator("[role=menu] [role=menuitem]", { hasText: "Clear all" }).locator("span", { hasText: "Clear all" }).first();
  const c060 = await textContrast(p, rowLab, p.locator("[role=menu] [role=menuitem]", { hasText: "Clear all" }).first());
  const rowInk = await rowLab.evaluate((e) => getComputedStyle(e).color);
  await p.locator("[role=menu] [role=menuitem]", { hasText: "Clear all" }).first().click();
  await p.waitForTimeout(700);
  await p.mouse.move(Math.round(w / 2), Math.round(h * 0.6));
  const dlg = p.locator("[role=alertdialog], [role=dialog]").filter({ hasText: "Clear all saved" }).first();
  const confirmBg = await dlg.getByRole("button", { name: /Clear & reload/ }).evaluate((e) => getComputedStyle(e).backgroundColor);
  const [inkN, btnN] = [await norm(p, rowInk), await norm(p, confirmBg)];
  // (resumed seat) one red = the row's ink and the confirm's tone resolve to ONE token (--destructive); the button's painted fill is the
  // producer's capsule mix of that tone, so comparing the fill to the ink was never the row's predicate. Contrast is its own line.
  // tokens resolved by PAINTING them (a light-dark() value is not a canvas colour): a probe span's computed `color` inside each host
  const paint = (host, v) => { const sp = document.createElement("span"); sp.style.color = `var(${v})`; host.appendChild(sp); const c = getComputedStyle(sp).color; sp.remove(); return c; };
  const toneN = await norm(p, await dlg.getByRole("button", { name: /Clear & reload/ }).evaluate((e, f) => (0, eval)(f)(e, "--button-tone"), paint.toString()));
  const tokN = await norm(p, await p.evaluate((f) => (0, eval)(f)(document.body, "--destructive"), paint.toString()));
  R("UIA-KF-060", inkN !== tokN || toneN !== tokN, `${vp} one red: row ink ${inkN} · confirm tone ${toneN} · --destructive ${tokN} (confirm fill ${btnN})`);
  R("UIA-KF-060(contrast)", !c060 || c060.ratio < 4.5, `${vp} row ink ${inkN} on ${c060?.bg} = ${c060?.ratio}:1 (producer token; relay)`);
  const d = await dlg.evaluate((e) => {
    const t = e.querySelector("[data-slot=dialog-title], h2"), s = e.querySelector("[data-slot=dialog-description], p");
    const x = [...e.querySelectorAll("button")].filter((b) => b.textContent.trim() === "Close").length;
    const dm = (e.closest("[data-dismiss]") ?? e.querySelector("[data-dismiss]") ?? e).getAttribute("data-dismiss");
    return { title: t ? `${getComputedStyle(t).fontSize}/${getComputedStyle(t).lineHeight}/${t.className}` : null, desc: s ? `${getComputedStyle(s).fontSize}/${s.className}` : null,
      header: !!e.querySelector("[data-slot=dialog-header]"), closeX: x, dm };
  });
  R("UIA-KF-148", !d.header || /text-/.test(d.title ?? "") || /text-/.test(d.desc ?? ""), `${vp} header=${d.header} title ${d.title} · desc ${d.desc}`);
  // UIA-KF-149 — a destructive confirm takes the 'deliberate' grammar (Esc · outside, no redundant X beside Cancel)
  const stillOpen = true;
  R("UIA-KF-149", d.closeX > 0 || d.dm !== "deliberate", `${vp} data-dismiss=${d.dm} · close-X ${d.closeX}`);
  await p.waitForTimeout(4800);
  const hold1 = await dockState(p);
  if (w === 1440) await p.screenshot({ path: `${OUT}clearall-${TAG}-${vp}-${theme}.png` });
  if (stillOpen) { await dlg.getByRole("button", { name: "Cancel" }).click(); await p.waitForTimeout(800); }
  const focus = await p.evaluate(() => document.activeElement?.getAttribute("aria-label") ?? document.activeElement?.tagName);
  R("UIA-KF-118", focus !== "@mbabb menu", `${vp} focus after Cancel: ${focus}`);
  await openMenu(p);
  await p.locator("[role=menu] [role=menuitem]", { hasText: "Keyboard shortcuts" }).first().click();
  await p.waitForTimeout(700); await p.mouse.move(Math.round(w / 2), Math.round(h * 0.6)); await p.waitForTimeout(4800);
  const hold2 = await dockState(p);
  R("KFA-113", hold1 !== "expanded" || hold2 !== "expanded", `${vp} dock 4.8 s after the dialog opened: Clear-all ${hold1} · shortcuts ${hold2}`);
  if (w === 1440) await p.screenshot({ path: `${OUT}shortcuts-${TAG}-${vp}-${theme}.png` });
  await p.close();
}

// ── C · the top dock row and its scene select (360, 390, 1440) ───────────────
for (const [w, h] of [[360, 780], [390, 844], [1440, 900]]) {
  const vp = `${w}x${h}`;
  const p = await page(w, h);
  await expandDock(p);
  const row = await p.evaluate(() => {
    const d = document.querySelector("[data-dock-tether=top] .glass-dock .dock-layer.is-active") ?? document.querySelector("[data-dock-tether=top] .glass-dock");
    const ctl = [...d.querySelectorAll("button,[role=combobox]")].filter((e) => e.getBoundingClientRect().height > 2 && !e.closest("[inert]"));
    const hs = ctl.map((e) => Math.round(e.getBoundingClientRect().height)), cy = ctl.map((e) => { const q = e.getBoundingClientRect(); return q.top + q.height / 2; });
    const tops = new Set(cy.map((y) => (Math.abs(y - cy[0]) > 12 ? Math.round(y) : "row0")));
    const selects = d.querySelectorAll("[role=combobox]").length;
    const dr = document.querySelector("[data-dock-tether=top] .glass-dock").getBoundingClientRect();
    return { hs, rows: tops.size, selects, dockB: Math.round(dr.bottom), labels: ctl.map((e) => e.getAttribute("aria-label") ?? e.textContent.trim().slice(0, 12)) };
  });
  // consumer half: the two DockTriggers (scene, @mbabb) share one height; the DockControl items' own height is the producer's
  const hOf = (l) => row.hs[row.labels.indexOf(l)];
  R("UIA-KF-237", Math.abs(hOf("@mbabb menu") - hOf("Scene")) > 1, `${vp} dock control heights [${row.hs.join(",")}] (${row.labels.join("|")}) · triggers Scene ${hOf("Scene")} / @mbabb ${hOf("@mbabb menu")}`);
  R("UIA-KF-109", row.rows > 1, `${vp} dock rows ${row.rows}`);
  R("UIA-KF-245", row.selects !== 1, `${vp} selects in the dock ${row.selects} (one trigger treatment)`);
  if (w === 390) await p.screenshot({ path: `${OUT}dockrow-${TAG}-${vp}-${theme}.png`, clip: { x: 0, y: 0, width: w, height: 140 } });
  // UIA-KF-242 — keyboard: open the scene select and arrow through it; count the chunks it warms
  const reqs = []; p.on("request", (r) => { if (r.url().endsWith(".js")) reqs.push(r.url().split("/").pop()); });
  const st = p.locator('[data-dock-tether=top] [aria-label="Scene"][role=combobox]').first();
  await st.focus(); await p.keyboard.press("Enter"); await p.waitForTimeout(500);
  const lb = await p.evaluate(() => { const l = document.querySelector("[role=listbox]"); if (!l) return null; const r = l.getBoundingClientRect(); const sel = [...l.querySelectorAll("[role=option][data-state=checked] span span, [role=option][aria-selected=true] span span")].find((x) => x.textContent.trim());
    return { top: Math.round(r.top), fw: sel ? getComputedStyle(sel).fontWeight : null, n: l.querySelectorAll("[role=option]").length }; });
  for (let k = 0; k < 7; k++) { await p.keyboard.press("ArrowDown"); await p.waitForTimeout(120); }
  await p.waitForTimeout(600);
  R("UIA-KF-108", !lb || Number(lb.fw) >= 600, `${vp} selected scene row weight ${lb?.fw}`);
  R("UIA-KF-131", !lb || lb.top < row.dockB - 1, `${vp} listbox top ${lb?.top} vs dock bottom ${row.dockB}`);
  if (w === 1440) R("UIA-KF-242", reqs.length === 0, `${vp} keyboard: ${reqs.length} chunk requests while arrowing ${lb?.n} rows`);
  if (w === 390) await p.screenshot({ path: `${OUT}listbox-${TAG}-${vp}-${theme}.png` });
  await p.keyboard.press("Escape"); await p.waitForTimeout(300);
  await p.close();
  if (w === 390) { // touch: open the scene select with a tap; a touch user has no hover before the tap
    const q = await page(w, h); await expandDock(q);
    const rq = []; q.on("request", (r) => { if (r.url().endsWith(".js")) rq.push(r.url().split("/").pop()); });
    const t = await q.locator('[data-dock-tether=top] [aria-label="Scene"][role=combobox]').first().boundingBox();
    await q.touchscreen.tap(t.x + t.width / 2, t.y + t.height / 2); await q.waitForTimeout(1200);
    R("UIA-KF-242", rq.length === 0, `${vp} touch: ${rq.length} chunk requests after the tap opened the list`);
    await q.close();
  }
}

// ── D · sibling-owned rows, measured only (re-home evidence) ─────────────────
{ // A2-KE-L2-1 — touch: a TAP on a dock surface item leaves the sheet on its open rung (a click is the fine-pointer control)
  for (const how of ["tap", "click"]) {
    const p = await page(390, 844); await expandDock(p);
    const it = p.locator('[data-dock-tether=top] [data-dock-surface-item][data-surface="controls"]').first();
    const bx = await it.boundingBox();
    if (how === "tap") await p.touchscreen.tap(bx.x + bx.width / 2, bx.y + bx.height / 2); else await it.click({ force: true });
    await p.waitForTimeout(1200);
    const det = await p.evaluate(() => { const s = document.querySelector("[data-slot=sheet-content]"); return s ? getComputedStyle(s).getPropertyValue("--detent-t").trim() : null; });
    const hv = await p.locator("[data-slot=sheet-detent-handle]").first().getAttribute("aria-valuenow").catch(() => null);
    R(`A2-KE-L2-1(${how})`, !(Number(hv ?? det) > 0.2), `390x844 ${how} on Controls: detent ${det} valuenow ${hv}`);
    await p.close();
  }
}
for (const [w, h] of [[390, 844], [1440, 900]]) { // A2-KE-L2-8 / UIA-KF-032 — the collapsed transport contains its content
  const p = await page(w, h);
  await p.mouse.click(Math.round(w / 2), Math.round(h * 0.45)); await p.waitForTimeout(5200);
  const t = await p.evaluate(() => {
    const d = [...document.querySelectorAll(".glass-dock")].sort((a, b) => b.getBoundingClientRect().top - a.getBoundingClientRect().top)[0];
    const r = d.getBoundingClientRect(); const out = [...d.querySelectorAll("button,span,svg")].filter((e) => { const q = e.getBoundingClientRect(); return q.width > 1 && getComputedStyle(e).visibility !== "hidden" && !e.closest("[inert]") && (q.left < r.left - 1 || q.right > r.right + 1); });
    return { collapsed: d.classList.contains("collapsed"), x: [Math.round(r.left), Math.round(r.right)], spill: out.length };
  });
  R("A2-KE-L2-8", t.collapsed && t.spill > 0, `${w}x${h} transport ${t.collapsed ? "collapsed" : "expanded"} plate x[${t.x}] spilling children ${t.spill}`);
  if (w === 390) await p.screenshot({ path: `${OUT}transport-collapsed-${TAG}-${w}x${h}-${theme}.png`, clip: { x: 0, y: h - 140, width: w, height: 140 } });
  await p.close();
}
{ // A2-KE-L3-6 — 1440, rail open: the docks and the plate share one centring axis
  const p = await page(1440, 900, "easing"); await expandDock(p);
  const c = await p.evaluate(() => {
    const cx = (e) => { const r = e?.getBoundingClientRect(); return r ? Math.round(r.left + r.width / 2) : null; };
    const docks = [...document.querySelectorAll(".glass-dock")].sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top);
    const rail = document.querySelector(".controls-pane-wrapper"); const rr = rail?.getBoundingClientRect();
    const stage = rr && rr.width > 2 ? (rr.left > 720 ? rr.left / 2 : (rr.right + innerWidth) / 2) : innerWidth / 2;
    return { top: cx(docks[0]), bottom: cx(docks.at(-1)), stage: Math.round(stage), rail: rr ? [Math.round(rr.left), Math.round(rr.right)] : null };
  });
  R("A2-KE-L3-6", Math.abs(c.top - c.stage) > 4 || Math.abs(c.bottom - c.stage) > 4, `1440x900 #/easing top dock cx ${c.top} · transport cx ${c.bottom} · stage cx ${c.stage} (rail ${c.rail})`);
  await p.screenshot({ path: `${OUT}axes-${TAG}-1440x900-${theme}.png` });
  await p.close();
}
// ── E · the .x rows routed here (A2-KE-X-12, X-13) + the menu's dock clearance + PRM stills (added at the resumed seat) ──
for (const [w, h, route] of [[360, 780, "home"], [390, 844, "home"], [390, 844, "cube"], [1440, 900, "cube"]]) { // X-12 · UIA-KF-131 (menu)
  const vp = `${w}x${h}`;
  const p = await page(w, h, route);
  if (!(await openMenu(p))) { console.log(`ERR ${vp} ${route} menu did not open`); await p.close(); continue; }
  const m = await p.evaluate(() => { const r = document.querySelector("[role=menu]").getBoundingClientRect(); const d = document.querySelector("[data-dock-tether=top] .glass-dock").getBoundingClientRect();
    return { l: Math.round(r.left), r: Math.round(r.right), t: Math.round(r.top), vw: innerWidth, dockB: Math.round(d.bottom) }; });
  R("A2-KE-X-12", m.l < 16 || m.vw - m.r < 16, `${vp} #/${route} menu x[${m.l},${m.r}] of ${m.vw} (gutters ${m.l} / ${m.vw - m.r} >= 16)`);
  R("UIA-KF-131(menu)", m.t < m.dockB, `${vp} #/${route} menu top ${m.t} vs dock bottom ${m.dockB}`);
  if (route === "home" && w === 390) await p.screenshot({ path: `${OUT}menu-home-${TAG}-${vp}-${theme}.png` });
  await p.close();
}
for (const route of ["home", "cube", "easing", "spring", "sequence", "amiga", "square"]) { // X-13 — 844x390: the scene list shows every option or scrolls with its own affordance
  const p = await page(844, 390, route); await expandDock(p);
  const st = p.locator('[data-dock-tether=top] [aria-label="Scene"][role=combobox]').first();
  await st.focus(); await p.keyboard.press("Enter"); await p.waitForTimeout(600);
  const x = await p.evaluate(() => { const l = document.querySelector("[role=listbox]"); if (!l) return null; const r = l.getBoundingClientRect();
    const vpEl = l.querySelector("[data-reka-select-viewport], [role=presentation]") ?? l; const vr = vpEl.getBoundingClientRect();
    const opts = [...l.querySelectorAll("[role=option]")]; const clipped = opts.filter((o) => { const q = o.getBoundingClientRect(); return q.bottom > Math.min(vr.bottom, innerHeight) + 1 || q.top < Math.max(vr.top, 0) - 1; }).length;
    // the producer's scroll affordance is its FadingScroll (a faded, scrollable viewport), not reka's scroll buttons
    const sc = [...l.querySelectorAll("*")].find((e) => e.scrollHeight > e.clientHeight + 1 && getComputedStyle(e).overflowY === "auto");
    const fade = !!sc && sc.classList.contains("fading-scroll");
    const lastIn = (() => { if (!sc) return false; sc.scrollTop = sc.scrollHeight; const o = opts.at(-1).getBoundingClientRect(), v = sc.getBoundingClientRect(); return o.bottom <= v.bottom + 1 && o.bottom <= innerHeight; })();
    return { top: Math.round(r.top), bottom: Math.round(r.bottom), n: opts.length, clipped, fade, scroll: sc ? `${sc.scrollHeight}/${sc.clientHeight}` : "none", lastIn, vh: innerHeight }; });
  R("A2-KE-X-13", !x || x.top < 0 || x.bottom > x.vh || (x.clipped > 0 && !(x.fade && x.lastIn)), `844x390 #/${route} scene list y[${x?.top},${x?.bottom}] of ${x?.vh} options ${x?.n} past-viewport ${x?.clipped} · scroller ${x?.scroll} fading ${x?.fade} · last option reachable ${x?.lastIn}`);
  if (route === "cube") await p.screenshot({ path: `${OUT}listbox-${TAG}-844x390-${theme}.png` });
  await p.close();
}
{ // UIA-KF-129 — the live scene miniature in the chrome is STILL under reduced motion (the page runs reducedMotion: reduce)
  const p = await page(1440, 900, "cube");
  const g = p.locator("[data-dock-tether=top] .glass-dock").first(); const bb = await g.boundingBox();
  const a = await p.screenshot({ clip: bb }); await p.waitForTimeout(1200); const c = await p.screenshot({ clip: bb });
  R("UIA-KF-129", !a.equals(c), `1440x900 #/cube collapsed dock face, reducedMotion=reduce: frames 1.2 s apart ${a.equals(c) ? "identical" : "DIFFER"}`);
  await p.close();
}
console.log(`dock-probe ${TAG} ${theme}: ` + Object.entries(red).map(([k, v]) => `${k} ${v}`).join(" · "));
await b.close(); process.exit(0);
