// SERVED MODEL: claude-opus-5-5 — KF.W13X.r4transport: served per-row predicates (headless Chrome, §0ei)
// usage: node probe.mjs <base> <label>  → prints JSON; frames to frames/<label>-*.png
import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const [base, label] = process.argv.slice(2);
const dir = new URL("./frames/", import.meta.url).pathname;
const b = await chromium.launch({ channel: "chrome", headless: true });
const out = {};
async function page(route, w, h) {
  const p = await (await b.newContext({ viewport: { width: w, height: h } })).newPage();
  await p.goto(base + "/#/" + route);
  await p.waitForTimeout(7000);
  return p;
}
const PLAY = '[aria-label="Play animation"],[aria-label="Pause animation"]';
// UIA-KF-052 — Play is a DockControl like its Reset sibling (same host class set, same box)
{
  const p = await page("cube", 1440, 900);
  await p.hover(PLAY).catch(() => {});
  await p.waitForTimeout(800);
  out["052"] = await p.evaluate((sel) => {
    const pl = document.querySelector(sel), rs = document.querySelector('[aria-label="Reset animation"]');
    const r = (e) => e && { w: e.offsetWidth, h: e.offsetHeight, cls: e.className.slice(0, 160), radius: getComputedStyle(e).borderRadius };
    return { play: r(pl), reset: r(rs), playLiteralRounded: !!pl && /\brounded-full\b|\bw-10\b|\bscale-on-hover\b/.test(pl.className), sameHostClass: !!(pl && rs) && rs.classList[0] != null && pl.classList.contains(rs.classList[0]) };
  }, PLAY);
  out["052"].GREEN = !out["052"].playLiteralRounded && out["052"].sameHostClass && out["052"].play?.h === out["052"].reset?.h;
  await p.screenshot({ path: `${dir}${label}-052-cube-1440.png` });
  await p.close();
}
// UIA-KF-122 — at 390 the channel list's options are not bigger than the trigger label
{
  const p = await page("cube", 390, 844);
  await p.hover(PLAY).catch(() => {});
  await p.waitForTimeout(600);
  await p.click('[aria-label="Select animation"]', { timeout: 5000 }).catch((e) => (out.e122 = String(e).slice(0, 120)));
  await p.waitForTimeout(800);
  out["122"] = await p.evaluate(() => {
    const t = document.querySelector('[aria-label="Select animation"]');
    const o = [...document.querySelectorAll('[role="option"]')];
    const g = o[0]?.closest('[role="group"]');
    return { trigger: t && getComputedStyle(t).fontSize, options: o.map((e) => getComputedStyle(e).fontSize), groupDockLabel: !!g?.classList.contains("dock-label"), optionPadOverride: o.some((e) => /\bpy-2\b/.test(e.className)) };
  });
  const r = out["122"];
  r.GREEN = r.options.length > 0 && !r.groupDockLabel && !r.optionPadOverride && r.options.every((f) => parseFloat(f) <= parseFloat(r.trigger));
  await p.screenshot({ path: `${dir}${label}-122-cube-390.png` });
  await p.close();
}
// UIA-KF-229 — the home transport shows no control that does nothing there
{
  const p = await page("", 1440, 900);
  out["229"] = await p.evaluate(() => ({ reset: document.querySelectorAll('[aria-label="Reset animation"]').length, select: document.querySelectorAll('[aria-label="Select animation"]').length, play: document.querySelectorAll('[aria-label="Play animation"],[aria-label="Pause animation"]').length, route: location.hash }));
  await p.screenshot({ path: `${dir}${label}-229-home-1440.png` });
  // the list acts on home: its pick is carried into the scene Play opens
  let carried = null;
  if (out["229"].select) {
    await p.hover(PLAY).catch(() => {});
    await p.waitForTimeout(500);
    await p.click('[aria-label="Select animation"]').catch(() => {});
    await p.waitForTimeout(600);
    const opts = await p.$$('[role="option"]');
    const pick = opts.length > 1 ? (await opts[1].textContent()).trim() : null;
    if (pick) { await opts[1].click(); await p.waitForTimeout(500); await p.click(PLAY).catch(() => {}); await p.waitForTimeout(5000);
      carried = { pick, route: await p.evaluate(() => location.hash), selected: await p.evaluate(() => document.querySelector('[aria-label="Select animation"]')?.textContent.trim()) }; }
  }
  out["229"].carried = carried;
  // UIA-KF-229 — no Reset on the empty home group; the carried list stays (its pick reaches the scene)
  out["229"].GREEN = out["229"].reset === 0 && out["229"].select === 1 && !!carried && carried.route.includes("cube") && carried.selected === carried.pick;
  await p.close();
}
// UIA-KF-026 scrubber limb — after Play → Esc (Reset) the ribbon reads the rewound clock
{
  const p = await page("square", 1440, 900);
  const sl = () => p.evaluate(() => [...document.querySelectorAll('[role="slider"]')].map((e) => [e.getAttribute("aria-label") || e.getAttribute("aria-labelledby") || "", +e.getAttribute("aria-valuenow"), +e.getAttribute("aria-valuemax")]));
  const pre = await sl();
  const playing = await p.$('[aria-label="Pause animation"]');
  if (!playing) await p.click('[aria-label="Play animation"]').catch(() => {});
  await p.waitForTimeout(1700);
  // the takeover: a drag on the box (the machine pauses; the read-back reads the paused time and idles)
  const bb = await p.locator(".demo-box").boundingBox();
  if (bb) { await p.mouse.move(bb.x + bb.width / 2, bb.y + bb.height / 2); await p.mouse.down(); await p.mouse.move(bb.x + bb.width / 2 + 60, bb.y + bb.height / 2 + 30, { steps: 8 }); await p.mouse.up(); }
  await p.waitForTimeout(1500);
  const mid = await sl();
  await p.locator(".demo-box").focus().catch(() => {});
  await p.keyboard.press("Escape");
  await p.waitForTimeout(1500);
  const post = await sl();
  await p.waitForTimeout(1500);
  const late = await sl();
  out["026"] = { pre, mid, post, late, mode: await p.evaluate(() => document.querySelector(".demo-box")?.dataset.squareMode), box: await p.evaluate(() => getComputedStyle(document.querySelector(".demo-box")).transform) };
  // the unit's limb is the ribbon scrubber; the square's own axis readouts are recorded as an observation
  out["026"].GREEN = post.some((s) => s[0] === "Scrub animation timeline") && post.filter((s) => s[0] === "Scrub animation timeline").every((s) => s[1] === 0);
  await p.screenshot({ path: `${dir}${label}-026-square-1440.png` });
  await p.close();
}
// KFA-69 — a ribbon scrub moves every phase-locked child (the cube's bob follows its spin)
{
  const p = await page("cube", 1440, 900);
  if (await p.$('[aria-label="Pause animation"]')) await p.click('[aria-label="Pause animation"]');
  await p.waitForTimeout(800);
  const tf = () => p.evaluate(() => ["cube", "cube-bob"].map((c) => { const e = document.querySelector("." + c); return e ? getComputedStyle(e).transform.slice(0, 90) : null; }));
  const a = await tf();
  const s = await p.$('.controls-pane [role="slider"], [role="slider"]');
  if (s) { await s.focus(); for (let i = 0; i < 10; i++) await p.keyboard.press("ArrowRight"); }
  await p.waitForTimeout(800);
  const z = await tf();
  out["69"] = { before: a, after: z, slider: !!s };
  out["69"].GREEN = !!a[0] && !!a[1] && a[0] !== z[0] && a[1] !== z[1];
  await p.screenshot({ path: `${dir}${label}-69-cube-1440.png` });
  await p.close();
}
console.log(JSON.stringify(out, null, 1));
await b.close();
