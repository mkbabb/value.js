// timeline-panel — probe4: read the visible KeyframeTimeline's engine object (Vue internals, read-only)
// after 3 snapshots, and test whether scrub/interpFrames paints the preview subject.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process";
const kf = (c) => execSync(`git -C /Users/mkbabb/Programming/keyframes.js ${c}`).toString().trim();
console.log("khead", kf("rev-parse --short HEAD"), "kdirty", kf("status --porcelain").split("\n").filter(Boolean).length);
const browser = await chromium.launch({ headless: false });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await page.addInitScript(() => { window.__v = (sel) => [...document.querySelectorAll(sel)].find((e) => e.checkVisibility()); });
const errs = []; page.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") errs.push(m.text().slice(0, 200)); });
await page.goto("http://localhost:5173/#/cube", { waitUntil: "load" }); await page.waitForTimeout(5000);
await page.mouse.move(720, 70); await page.waitForTimeout(700);
await page.locator('[aria-label="Controls tab"]').click({ force: true }); await page.waitForTimeout(500);
await page.locator('[role=option]', { hasText: /timeline/i }).first().click(); await page.waitForTimeout(1500);
const track = page.locator(".timeline-track:visible");
const snap = async () => { await page.getByRole("button", { name: /^Snapshot$/ }).click(); await page.waitForTimeout(700); };
await snap(); await track.focus(); await page.keyboard.press("End"); await page.waitForTimeout(1300); await snap();
await page.waitForTimeout(1000);
const r = await page.evaluate(() => {
  const st = __v(".timeline-preview-stage"); let inst = st.__vueParentComponent; while (inst && !inst.setupState?.scrub) inst = inst.parent;
  const S = inst.setupState; const anim = S.animation; const subj = st.firstElementChild;
  const out = { hasAnim: !!anim, name: anim?.constructor?.name, targetsLen: anim?.targets?.length, targetIsSubject: anim?.targets?.[0] === subj, targetIsScene: anim?.targets?.[0]?.classList?.contains("animation") && !anim?.targets?.[0]?.dataset?.timelinePreviewSubject, frames: anim?.frames?.length, duration: anim?.options?.duration,
    kfs: S.state.keyframes.map((k) => ({ p: k.percent, t: (k.vars.transform || "").slice(0, 50), keys: Object.keys(k.vars).join(",") })) };
  const before = subj.getAttribute("style");
  const v1 = anim ? anim.interpFrames(anim.options.duration * 0.5, false) : null;
  S.scrub(0.5); const after = subj.getAttribute("style"); const comp = getComputedStyle(subj).transform.slice(0, 60);
  S.scrub(0.0); const after0 = subj.getAttribute("style");
  // Is the scene element being written instead?
  const scene = [...document.querySelectorAll(".cube.animation")].find((e) => !e.dataset.timelinePreviewSubject && e.checkVisibility());
  return { ...out, v1: v1 && JSON.stringify(v1).slice(0, 200), before: before?.slice(0, 120), after: after?.slice(0, 120), after0: after0?.slice(0, 120), comp, sceneStyle: scene?.getAttribute("style")?.slice(0, 120), stageBox: [st.clientWidth, st.clientHeight], subjBox: [subj.offsetWidth, subj.offsetHeight], subjCss: (() => { const c = getComputedStyle(subj); return { w: c.width, h: c.height, persp: c.perspective, ts: c.transformStyle }; })() };
});
console.log(JSON.stringify(r, null, 1)); console.log("console:", JSON.stringify(errs.slice(0, 12), null, 1));
await browser.close();
