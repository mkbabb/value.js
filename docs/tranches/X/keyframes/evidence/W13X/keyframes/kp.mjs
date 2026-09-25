// SERVED MODEL: claude-opus-5-5
// X.KF.W13X.keyframes — the Keyframes pane (KeyframesStringControls + CSSCodeEditor) on the served page.
// Usage: node kp.mjs <baseUrl> <tag> [scene=cube] [cfgs=1440x900:light,1440x900:dark,390x844:light,390x844:dark]
// Per config it opens the dock's Keyframes item and reads, then writes a frame to frames/<tag>-<scene>-<cfg>.png:
//  UIA-KF-174  ids = occurrences of the internal `keyframes-style-` token in the rendered buffer;
//              midTokenBreaks = wrapped continuation lines where the break cut through an identifier/call
//  UIA-KF-173  name = the @keyframes name in the buffer vs the Export CSS artifact's (clipboard)
//  UIA-KF-176/276  after a click in the code: the focused node's own outline (UA blue = RED), and the
//              well card's ring (outline style/width + border-radius)
//  UIA-KF-275  heading = the pane's own heading text; status = its role=status text
//  UIA-KF-277  after the audit's hard-fail buffer: which toast text appears ("Keyframes parsed" = RED)
import { createRequire } from "node:module";
import { mkdirSync } from "node:fs";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const [base = "http://127.0.0.1:5271/", tag = "run", scene = "cube", cfgs = "1440x900:light,1440x900:dark,390x844:light,390x844:dark"] = process.argv.slice(2);
mkdirSync(new URL("./frames/", import.meta.url), { recursive: true });
const HARDFAIL = "@keyframes x { 0% { transform: rotate( ; ) } }";
const b = await chromium.launch({ headless: false });
for (const cfg of cfgs.split(",")) {
    const [vp, scheme] = cfg.split(":"); const [w, h] = vp.split("x").map(Number);
    const ctx = await b.newContext({ viewport: { width: w, height: h }, colorScheme: scheme, deviceScaleFactor: 1, permissions: ["clipboard-read", "clipboard-write"] });
    const p = await ctx.newPage();
    await p.goto(base.replace(/#.*$/, "") + `#/${scene}`, { waitUntil: "networkidle" });
    await p.waitForTimeout(2200);
    const dock = p.locator("[data-dock-tether=top]");
    await dock.hover({ force: true }); await p.waitForTimeout(1300);
    const item = dock.locator('[data-dock-surface-item][aria-label="Keyframes"]');
    if ((await item.getAttribute("aria-pressed")) !== "true") await item.click();
    await p.waitForTimeout(2500);
    const pane = await p.evaluate(() => {
        const ed = [...document.querySelectorAll(".monaco-editor")].find((e) => e.getBoundingClientRect().width > 0);
        if (!ed) return { editor: false };
        const lines = [...ed.querySelectorAll(".view-lines .view-line")].map((l) => ({ top: parseFloat(l.style.top), text: l.textContent.replace(/ /g, " ") })).sort((a, b) => a.top - b.top);
        const nums = new Set([...ed.querySelectorAll(".margin-view-overlays .line-numbers")].filter((n) => n.textContent.trim()).map((n) => Math.round(n.getBoundingClientRect().top)));
        const edTop = ed.querySelector(".view-lines").getBoundingClientRect().top;
        let midTokenBreaks = 0, wrapped = 0;
        for (let i = 1; i < lines.length; i++) {
            const isCont = !nums.has(Math.round(edTop + lines[i].top));
            if (!isCont) continue; wrapped++;
            if (/[\w-]$/.test(lines[i - 1].text) && /^\s*[\w(:-]/.test(lines[i].text)) midTokenBreaks++;
        }
        const text = lines.map((l) => l.text).join("\n");
        const name = (text.match(/@keyframes\s+([\w-]+)/) || [])[1] || null;
        const panel = ed.closest("[role=tabpanel]");
        const region = ed.closest("section[aria-labelledby]");
        const heading = region ? document.getElementById(region.getAttribute("aria-labelledby"))?.textContent.trim() : (panel?.querySelector("h1,h2,h3,h4,[role=heading]")?.textContent.trim() ?? null);
        const status = (region ?? panel)?.querySelector("[role=status]")?.textContent.trim() ?? null;
        return { editor: true, ids: (text.match(/keyframes-style-/g) || []).length, wrapped, midTokenBreaks, name, heading, status, first: lines[0]?.text.slice(0, 60) };
    });
    // Focus: a pointer click in the code (text entry lights :focus-visible)
    const code = p.locator(".monaco-editor .view-lines").first();
    let focus = null;
    if (pane.editor) {
        await code.click({ position: { x: 40, y: 12 } }); await p.waitForTimeout(400);
        focus = await p.evaluate(() => {
            const a = document.activeElement; const cs = getComputedStyle(a);
            const card = a.closest(".cartoon-surface"); const cc = card ? getComputedStyle(card) : null;
            return { node: a.tagName + "." + [...a.classList].join("."), fv: a.matches(":focus-visible"), outline: `${cs.outlineStyle} ${cs.outlineWidth} ${cs.outlineColor}`, card: cc ? `${cc.outlineStyle} ${cc.outlineWidth} r=${cc.borderTopLeftRadius}` : null };
        });
        await p.screenshot({ path: new URL(`./frames/${tag}-${scene}-${w}-${scheme}.png`, import.meta.url).pathname });
    }
    // Export vs buffer name (UIA-KF-173) — clipboard, 1440 light only
    let exportName = null;
    if (pane.editor && w >= 1024 && scheme === "light") {
        const ex = p.locator('button[aria-label="Export CSS"]:visible').first();
        if (await ex.count()) { await ex.click(); await p.waitForTimeout(1200); const clip = await p.evaluate(() => navigator.clipboard.readText().catch((e) => "ERR " + e.message)); exportName = (clip.match(/@keyframes\s+([\w-]+)/) || [])[1] || clip.slice(0, 40); }
    }
    // Hard-fail buffer (UIA-KF-277), 1440 light only
    let hardfail = null;
    if (pane.editor && w >= 1024 && scheme === "light") {
        await code.click({ position: { x: 40, y: 12 } });
        await p.keyboard.press("Meta+A"); await p.keyboard.type(HARDFAIL, { delay: 5 });
        const t0 = Date.now(); hardfail = "none";
        while (Date.now() - t0 < 4000) {
            const t = await p.evaluate(() => document.body.innerText);
            if (/Keyframes parsed/.test(t)) { hardfail = "SUCCESS-TOAST"; break; }
            if (/Failed to parse/.test(t)) { hardfail = "error-toast"; break; }
            await p.waitForTimeout(150);
        }
        const st = await p.evaluate(() => { const ed = document.querySelector(".monaco-editor"); const r = ed?.closest("section[aria-labelledby]"); return r?.querySelector("[role=status]")?.textContent.trim() ?? null; });
        hardfail += ` status=${st}`;
    }
    console.log(`${tag} ${scene} ${cfg} editor=${pane.editor} ids=${pane.ids} wrapped=${pane.wrapped} midTokenBreaks=${pane.midTokenBreaks} name=${pane.name} exportName=${exportName} heading=${JSON.stringify(pane.heading)} status=${JSON.stringify(pane.status)} focus=${JSON.stringify(focus)} hardfail=${hardfail}`);
    await ctx.close();
}
await b.close();
