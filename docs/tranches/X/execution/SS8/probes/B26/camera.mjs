// SS-8 B26 — #/extract camera cells on Chromium's FAKE capture device (headless default shell;
// --use-fake-device-for-media-stream supplies a 640x480 synthetic stream — not real hardware).
import { chromium, goto, save, runCells, EV } from "./lib.mjs";

const READ = () => {
  const v = document.querySelector('[aria-label="Camera"] video');
  if (!v) return { video: null };
  const r = v.getBoundingClientRect(); const s = getComputedStyle(v);
  const vw = v.videoWidth, vh = v.videoHeight;
  // fraction of the intrinsic frame actually painted inside the element box
  let shown = null;
  if (vw && vh) {
    const ar = vw / vh, br = r.width / r.height;
    if (s.objectFit === "cover") shown = ar > br ? br / ar : ar / br; else shown = 1;
  }
  const ctrls = [...document.querySelectorAll('[aria-label="Camera"] button, [aria-label="Camera"] [title]')].map((b) => { const q = b.getBoundingClientRect(); return { title: b.getAttribute("title"), aria: b.getAttribute("aria-label"), w: q.width, h: q.height, disabled: b.disabled }; });
  return { video: { objectFit: s.objectFit, box: { w: r.width, h: r.height }, intrinsic: { vw, vh }, fractionShown: shown, playing: !v.paused && v.readyState >= 2 }, ctrls, coarse: matchMedia("(pointer: coarse)").matches };
};

async function openCamera(page) {
  await goto(page, "extract");
  await page.locator(".pane-shell button", { hasText: "Open camera" }).first().click();
  await page.waitForFunction(() => { const v = document.querySelector('[aria-label="Camera"] video'); return v && v.videoWidth > 0 && !v.paused; }, null, { timeout: 30000 });
  await page.waitForTimeout(800);
}

const cells = [
  ["desk-camera", { w: 1440, h: 900, permissions: ["camera"] }, async (page) => {
    await openCamera(page);
    const a = await page.evaluate(READ);
    await page.screenshot({ path: EV + "camera-1440-fake-live.png" });
    return a;
  }],
  ["phone-camera-coarse", { w: 390, h: 844, mobile: true, hasTouch: true, permissions: ["camera"] }, async (page) => {
    await openCamera(page);
    const a = await page.evaluate(READ);
    // XW-9 re-entry: press the action-row camera toggle again; count live tracks after
    const streamsBefore = await page.evaluate(() => { const v = document.querySelector('[aria-label="Camera"] video'); return v && v.srcObject ? v.srcObject.getTracks().map((t) => t.readyState) : null; });
    await page.locator(".pane-shell button", { hasText: /camera/i }).first().tap();
    await page.waitForTimeout(1500);
    const afterToggle = await page.evaluate(() => ({ cameraGroup: !!document.querySelector('[aria-label="Camera"]'), toggleText: [...document.querySelectorAll(".pane-shell button")].map((b) => b.textContent.trim()).filter((t) => /camera/i.test(t)) }));
    await page.screenshot({ path: EV + "camera-390-coarse-after-toggle.png" });
    return { ...a, streamsBefore, afterToggle };
  }],
];

const out = { app: process.env.APP, at: new Date().toISOString(), device: "chromium --use-fake-device-for-media-stream (synthetic)" };
const browser = await chromium.launch({ args: ["--use-fake-device-for-media-stream", "--use-fake-ui-for-media-stream"] });
try { await runCells(browser, cells, out); }
finally { await browser.close(); save("camera.json", out); }
