// SERVED MODEL: claude-opus-5-5
// KF.W13X.r4panes served falsifier (KF-W13.md addendum (g), the R-4 "keyframes and timeline panes" row).
// Headless real Chrome (COHESION §0ei), a fresh context per cell.
//   T  Timeline pane (#/square, #/cube; 1440x900 L, 1024x768 D, 390x844 L):
//      T179  one toolbar: every timeline command (Undo, Redo, Clear all, Unfold, Snapshot, Import, Add, Export)
//            lives in ONE row — as a button there, or as an item of an overflow menu triggered from that row.
//      T200  no orphan wrap: every pane action row (timeline row here; the Keyframes row in K) keeps all its
//            buttons on one line (tops within 2 px) and inside the pane (right edge <= the row's right + 1).
//      T295  Clear all is disabled on an empty timeline.
//      T294  after Import (the scene's own @keyframes): the preview clone sits wholly inside the preview well
//            and is centred in it (+-2 px), and its label is not clipped (square only).
//   K  Keyframes pane (#/cube, #/square; 1440 L, 390 D):
//      K172  one surface: the editor well and the action row sit on the ONE pane card (no card nested in it),
//            and the action row is one line inside it.
//      K173  one name: "Copy keyframes" and "Copy compiled CSS" put CSS on the clipboard whose @keyframes
//            names are the same name.
//      K219  no chatter: an accepted edit raises no success toast; no toast title carries an emoji or "!".
//   S  Spring discrete Entry (#/spring, channel Entry; 1440 L/D):
//      Sart  at the default spring the compileToEntry artifact is PRESENTED (not refused as "does not describe
//            the card above" — the panel's check spelled 500ms while the emitter writes 0.5s).
//      S097  the artifact is highlighted with the editor's code tokens: >= 3 token inks in it, numbers in
//            the editor's number ink (--color-progress), property names in its structure ink (--foreground).
// Usage: node r4panes.mjs <base> <tag> [framesDir]   (ONLY=T,K,S)
import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/value.js/package.json");
const { chromium } = require("playwright");
const [, , base, tag, outDir] = process.argv;
const only = (process.env.ONLY || "T,K,S").split(",");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await chromium.launch({ channel: "chrome", headless: true });
const res = [];
const shot = async (p, name) => { if (outDir) await p.screenshot({ path: `${outDir}/${tag}-${name}.png` }).catch(() => {}); };
async function page(w, h, route, scheme) {
    const ctx = await b.newContext({ viewport: { width: w, height: h }, colorScheme: scheme, permissions: ["clipboard-read", "clipboard-write"] });
    const p = await ctx.newPage();
    await p.goto(`${base}#/${route}`, { waitUntil: "load", timeout: 240000 });
    await p.waitForSelector('[data-dock-tether="top"] .glass-dock', { timeout: 90000 });
    await sleep(3000);
    return { ctx, p };
}
async function surface(p, name, ready) {
    const bt = p.locator('[data-dock-tether=top] .glass-dock.collapsed [aria-label="Expand dock"]').first();
    if (await bt.count()) { await bt.click().catch(() => {}); await sleep(700); }
    const item = p.locator(`[data-dock-tether=top] [data-dock-surface-item][aria-label="${name}"]`).first();
    if ((await item.count()) && (await item.getAttribute("aria-pressed")) !== "true") await item.click({ force: true }).catch(() => {});
    if (ready) await p.waitForSelector(ready, { state: "visible", timeout: 30000 }).catch(() => {});
    await sleep(1800);
}
// The timeline's commands: the four tools (Undo, Redo, Clear all, Unfold) and the four verbs (Snapshot,
// Import, Add, Export). A tool is either a visible button, or an item of an overflow menu whose trigger sits
// in a toolbar row — the row that holds the trigger is where the tool lives.
async function ROW(p) {
    const base = await p.evaluate(() => {
        const vis = (e) => !!e && e.getClientRects().length > 0;
        const byLabel = (l) => [...document.querySelectorAll(`button[aria-label="${l}"]`)].find(vis);
        const byText = (t) => [...document.querySelectorAll("button")].find((e) => vis(e) && e.textContent.trim() === t);
        const cmds = {
            undo: byLabel("Undo"), redo: byLabel("Redo"), clear: byLabel("Clear all keyframes"), fold: byLabel("Unfold timeline"),
            snapshot: byText("Snapshot"), import: byLabel("Import CSS, replacing the timeline"),
            add: byLabel("Add CSS, merging into the timeline"), export: byLabel("Export CSS"),
            more: byLabel("More timeline actions"),
        };
        document.querySelectorAll("[data-r4-row]").forEach((e) => e.removeAttribute("data-r4-row"));
        const rows = [...new Set(Object.values(cmds).filter(Boolean).map((e) => e.parentElement))];
        rows.forEach((r, i) => r.setAttribute("data-r4-row", String(i)));
        const where = Object.fromEntries(Object.entries(cmds).map(([k, v]) => [k, v ? Number(v.parentElement.getAttribute("data-r4-row")) : null]));
        const rowFacts = rows.map((r) => {
            const bs = [...r.querySelectorAll(":scope > button, :scope > * > button")].filter(vis).map((e) => e.getBoundingClientRect());
            const rr = r.getBoundingClientRect();
            const tops = bs.map((x) => x.top);
            return { n: bs.length, oneLine: tops.length ? Math.max(...tops) - Math.min(...tops) <= 2 : true, inside: bs.every((x) => x.right <= rr.right + 1 && x.left >= rr.left - 1), w: Math.round(rr.width) };
        });
        return { where, rows: rows.length, rowFacts, clearDisabled: cmds.clear ? cmds.clear.disabled : null };
    });
    let menu = null;
    if (base.where.more !== null) {
        await p.locator('button[aria-label="More timeline actions"]:visible').first().click().catch(() => {});
        await p.waitForSelector('[role="menu"]', { timeout: 8000 }).catch(() => {});
        await sleep(500);
        menu = await p.evaluate(() => [...document.querySelectorAll('[role="menu"] [role="menuitem"]')].map((e) => ({ t: e.textContent.trim(), disabled: e.hasAttribute("data-disabled") || e.getAttribute("aria-disabled") === "true" })));
        await p.keyboard.press("Escape");
        await sleep(400);
    }
    const inMenu = (re) => menu?.find((m) => re.test(m.t)) ?? null;
    const tool = { undo: /^Undo/, redo: /^Redo/, clear: /^Clear all keyframes/, fold: /^Unfold timeline/ };
    const toolRow = Object.fromEntries(Object.entries(tool).map(([k, re]) => [k, base.where[k] !== null ? base.where[k] : inMenu(re) ? base.where.more : null]));
    const verbRows = ["snapshot", "import", "add", "export"].map((k) => base.where[k]);
    const allRows = [...Object.values(toolRow), ...verbRows];
    const clearDisabled = base.clearDisabled ?? (inMenu(tool.clear)?.disabled ?? null);
    return { ...base, menu, toolRow, oneToolbar: allRows.every((r) => r !== null) && new Set(allRows).size === 1, clearDisabled };
}
// ── T ───────────────────────────────────────────────────────────────────────
if (only.includes("T")) for (const route of ["square", "cube"]) for (const [w, h, scheme] of [[1440, 900, "light"], [1024, 768, "dark"], [390, 844, "light"]]) {
    const { ctx, p } = await page(w, h, route, scheme);
    await surface(p, "Timeline", 'h3:text-is("Timeline")');
    const r = await ROW(p);
    await shot(p, `t-${route}-${w}-${scheme}`);
    let fit = null;
    if (route === "square") {
        await p.locator('button[aria-label="Import CSS, replacing the timeline"]:visible').first().click().catch(() => {});
        await sleep(1200);
        await p.locator('[role="dialog"] button:has-text("Import")').last().click().catch(() => {});
        await sleep(2500);
        fit = await p.evaluate(() => {
            const stage = document.querySelector(".timeline-preview-stage");
            const subj = document.querySelector("[data-timeline-preview-subject]");
            if (!stage || !subj || stage.getClientRects().length === 0) return { shown: false, demoBoxes: document.querySelectorAll(".demo-box").length };
            stage.scrollIntoView({ block: "center" });
            const s = stage.getBoundingClientRect(), c = subj.getBoundingClientRect();
            const label = [...subj.querySelectorAll("*")].find((e) => /drag me/i.test(e.textContent) && e.children.length === 0) ?? subj;
            const l = label.getBoundingClientRect();
            const inside = (x) => x.left >= s.left - 1 && x.right <= s.right + 1 && x.top >= s.top - 1 && x.bottom <= s.bottom + 1;
            return { shown: true, inside: inside(c), labelInside: inside(l), dx: Math.round((c.left + c.width / 2) - (s.left + s.width / 2)), dy: Math.round((c.top + c.height / 2) - (s.top + s.height / 2)), stage: [Math.round(s.width), Math.round(s.height)], subj: [Math.round(c.width), Math.round(c.height)], demoBoxes: document.querySelectorAll(".demo-box").length };
        });
        await shot(p, `t294-${route}-${w}-${scheme}`);
    }
    const ok = { T179: r.oneToolbar, T200: r.rowFacts.every((x) => x.oneLine && x.inside), T295: r.clearDisabled === true };
    if (fit) ok.T294 = !!fit.shown && fit.inside && fit.labelInside && Math.abs(fit.dx) <= 2 && Math.abs(fit.dy) <= 2;
    res.push({ cell: `T ${route} ${w} ${scheme}`, ok, r, fit });
    await ctx.close();
}
// ── K ───────────────────────────────────────────────────────────────────────
if (only.includes("K")) for (const [route, w, h, scheme] of [["cube", 1440, 900, "light"], ["cube", 390, 844, "dark"], ["square", 1440, 900, "dark"]]) {
    const { ctx, p } = await page(w, h, route, scheme);
    await surface(p, "Keyframes", 'button[aria-label="Copy keyframes"]');
    await sleep(2500);
    const k172 = await p.evaluate(() => {
        const vis = (e) => !!e && e.getClientRects().length > 0;
        const copy = [...document.querySelectorAll('button[aria-label="Copy keyframes"]')].find(vis);
        const well = [...document.querySelectorAll(".code-well")].find(vis);
        if (!copy || !well) return { found: false };
        // the lowest surface holding BOTH the editor well and the action row
        let common = well.parentElement; while (common && !common.contains(copy)) common = common.parentElement;
        const separate = [...common.querySelectorAll(".card, .cartoon-surface")].filter((c) => vis(c) && (c.contains(well) || c.contains(copy)));
        const row = copy.parentElement, bs = [...row.querySelectorAll("button")].filter(vis).map((x) => x.getBoundingClientRect()), rr = row.getBoundingClientRect();
        const tops = bs.map((x) => x.top);
        return { found: true, common: common.className.toString().slice(0, 60), separateCards: separate.map((c) => c.className.toString().slice(0, 50)), rowOneLine: Math.max(...tops) - Math.min(...tops) <= 2, rowInside: bs.every((x) => x.right <= rr.right + 1), lead: row.querySelector("button")?.textContent.trim() };
    });
    await shot(p, `k-${route}-${w}-${scheme}`);
    const names = {};
    for (const [k, label] of [["copy", "Copy keyframes"], ["compiled", "Copy compiled CSS"]]) {
        await p.evaluate(() => navigator.clipboard.writeText(""));
        await p.locator(`button[aria-label="${label}"]:visible`).first().click().catch(() => {});
        await sleep(2000);
        const txt = await p.evaluate(() => navigator.clipboard.readText()).catch(() => "");
        names[k] = [...txt.matchAll(/@keyframes\s+([^\s{]+)/g)].map((m) => m[1]);
    }
    const toastsAfterCopy = await p.evaluate(() => [...document.querySelectorAll('[data-slot="toast"]')].map((e) => e.textContent.trim()).filter(Boolean));
    await shot(p, `k-${route}-${w}-${scheme}-toasts`);
    // an accepted edit: append a space at the end of the buffer
    await p.locator(".code-well .monaco-editor").first().click().catch(() => {});
    await p.keyboard.press("ControlOrMeta+End"); await p.keyboard.type(" "); await sleep(2500);
    const toastsAfterEdit = await p.evaluate(() => [...document.querySelectorAll('[data-slot="toast"]')].map((e) => e.textContent.trim()).filter(Boolean));
    const parsedToast = toastsAfterEdit.some((t) => /parsed/i.test(t));
    const all = [...toastsAfterCopy, ...toastsAfterEdit];
    const emoji = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u.test(all.join(" "));
    const bang = all.some((t) => /!/.test(t));
    const n1 = names.copy?.[0], n2 = names.compiled?.[0];
    const ok = { K172: !!k172.found && k172.separateCards.length === 0 && k172.rowOneLine && k172.rowInside, K219: !parsedToast && !emoji && !bang };
    // the compiled copy exists only where the scene compiles (the square's custom renderer refuses, by design)
    if (route !== "square") ok.K173 = !!n1 && n1 === n2 && names.copy.every((n) => n === n1) && names.compiled.every((n) => n === n1);
    res.push({ cell: `K ${route} ${w} ${scheme}`, ok, k172, names, toastsAfterCopy, toastsAfterEdit });
    await ctx.close();
}
// ── S ───────────────────────────────────────────────────────────────────────
if (only.includes("S")) for (const scheme of ["light", "dark"]) {
    const { ctx, p } = await page(1440, 900, "spring", scheme);
    await p.hover('[data-dock-tether="bottom"] .glass-dock').catch(() => {}); await sleep(1200);
    await p.locator('[role=combobox][aria-label="Channel to edit"]').first().click({ timeout: 8000 }).catch(() => {});
    await sleep(700);
    await p.getByRole("option", { name: /^Entry/ }).first().click({ timeout: 6000 }).catch(() => {});
    await p.waitForSelector("button.artifact-trigger, [role=alert]", { timeout: 30000 }).catch(() => {});
    await sleep(1500);
    const presented = await p.locator("button.artifact-trigger").count();
    await p.locator("button.artifact-trigger").first().click().catch(() => {});
    await sleep(1200);
    const m = await p.evaluate(() => {
        const code = document.querySelector("code.artifact");
        if (!code || code.getClientRects().length === 0) return { found: false };
        const probe = (css) => { const d = document.createElement("div"); d.style.color = css; code.appendChild(d); const c = getComputedStyle(d).color; d.remove(); return c; };
        const fg = probe("var(--foreground)"), num = probe("var(--color-progress)");
        const inks = new Map();
        const walker = document.createTreeWalker(code, NodeFilter.SHOW_TEXT);
        let numInk = null, nameInk = null;
        for (let n = walker.nextNode(); n; n = walker.nextNode()) {
            const t = n.textContent; if (!t.trim()) continue;
            const c = getComputedStyle(n.parentElement).color;
            inks.set(c, (inks.get(c) ?? 0) + 1);
            if (numInk === null && /^\s*-?\d/.test(t) && n.parentElement !== code) numInk = c;
            if (nameInk === null && /^\s*(transition|opacity|transform|translate|scale)\s*$/.test(t)) nameInk = c;
        }
        return { found: true, inks: inks.size, numInk, nameInk, fg, num, text: code.textContent.slice(0, 120) };
    });
    await shot(p, `s-spring-1440-${scheme}`);
    const ok = { Sart: presented > 0 && !/does not describe the card/i.test(await p.evaluate(() => document.body.innerText)), S097: !!m.found && m.inks >= 3 && m.numInk === m.num && m.nameInk === m.fg };
    res.push({ cell: `S spring 1440 ${scheme}`, ok, m });
    await ctx.close();
}
await b.close();
const flat = res.flatMap((r) => Object.entries(r.ok).map(([k, v]) => ({ k, v })));
console.log(JSON.stringify({ tag, base, pass: flat.filter((x) => x.v).length, of: flat.length, res }, null, 1));
