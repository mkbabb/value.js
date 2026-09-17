// SERVED MODEL: claude-opus-5[1m]
// X.KF.W9 `.d` — the safari-app/desktop capture pass.
//   node dcap.mjs <stateLabel>
// stateLabel is recorded on every row; the HOST state is set OUTSIDE this script
// (defaults write com.apple.universalaccess increaseContrast) and RE-MEASURED here,
// so the label can never disagree with the measurement.
import { newSession, exec, nav, del, sleep, post, get, tab } from "./wd.mjs";
import { writeFileSync, mkdirSync } from "node:fs";
import { createHash } from "node:crypto";

const STATE = process.argv[2] || "default";
const ORIGIN = "http://127.0.0.1:9123";
const OUT = "/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/audit/visual/safari-real";
const SUBSTRATE_SHA = "55e9bf0d2391bbc6d9871bb3f0555a6225daae92";
const BUNDLE_SHA = "1ba994574a250fcc1ffe4655fdee0249a235c2824a2692a6dcfe785d2afda448";
const CELL = "safari-app/desktop";
mkdirSync(OUT, { recursive: true });

const rows = [];
const sess = await newSession();
const sid = sess.sessionId;
const caps = {
  browserVersion: sess.capabilities.browserVersion,
  platformVersion: sess.capabilities["safari:platformVersion"],
  platformBuildVersion: sess.capabilities["safari:platformBuildVersion"],
  useSimulator: sess.capabilities["safari:useSimulator"],
};
console.error("SESSION", sid, JSON.stringify(caps));

async function shotTo(name) {
  const r = await get(`/session/${sid}/screenshot`);
  if (r.status !== 200) return { error: `screenshot ${r.status}` };
  const buf = Buffer.from(r.json.value, "base64");
  const p = `${OUT}/${name}`;
  writeFileSync(p, buf);
  const d = createHash("sha256").update(buf).digest("hex");
  writeFileSync(`${p}.sha256`, `${d}  ${name}\n`);
  return { path: p.replace("/Users/mkbabb/Programming/value.js/", ""), sha256: d, bytes: buf.length };
}

const CAPQ = `
  const mq=(q)=>{const m=matchMedia(q);return{media:m.media,matches:m.matches}};
  return JSON.stringify({
    fc:mq('(forced-colors: active)'), fcNone:mq('(forced-colors: none)'),
    prt:mq('(prefers-reduced-transparency: reduce)'), prm:mq('(prefers-reduced-motion: reduce)'),
    pcMore:mq('(prefers-contrast: more)'), pcNoPref:mq('(prefers-contrast: no-preference)'),
    dark:mq('(prefers-color-scheme: dark)'),
    ua:navigator.userAgent, dpr:devicePixelRatio, iw:innerWidth, ih:innerHeight });
`;

// Read the FOCUSED element's indicator, whatever it is. The discriminator is
// built in: we report :focus-visible separately from the paint, so "no
// indicator" can never be confused with "focus never happened".
const READ_ACTIVE = `
  const el = document.activeElement;
  if (!el || el === document.body) return JSON.stringify({ none: true, tag: el && el.tagName });
  const cs = getComputedStyle(el);
  const r = el.getBoundingClientRect();
  let fv = null; try { fv = el.matches(':focus-visible'); } catch (e) { fv = 'UNSUPPORTED: ' + e; }
  return JSON.stringify({
    tag: el.tagName.toLowerCase(),
    cls: (typeof el.className === 'string' ? el.className : '').slice(0, 160),
    id: el.id || null,
    text: (el.innerText || el.textContent || '').trim().slice(0, 60),
    ariaLabel: el.getAttribute('aria-label'),
    role: el.getAttribute('role'),
    focusVisible: fv,
    outlineStyle: cs.outlineStyle, outlineWidth: cs.outlineWidth,
    outlineColor: cs.outlineColor, outlineOffset: cs.outlineOffset,
    boxShadow: cs.boxShadow,
    borderTop: cs.borderTopWidth + ' ' + cs.borderTopStyle + ' ' + cs.borderTopColor,
    rect: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) }
  });
`;

// Tab-walk until activeElement matches `sel`, up to `max` tabs. Returns the
// number of tabs spent and whether it landed.
async function tabTo(sel, max = 60) {
  for (let i = 0; i < max; i++) {
    await tab(sid, 1);
    const hit = await exec(sid, `return document.activeElement && document.activeElement.matches(${JSON.stringify(sel)});`);
    if (hit) return { landed: true, tabs: i + 1 };
  }
  return { landed: false, tabs: max };
}

async function route(path, settle = 4000) {
  await nav(sid, ORIGIN + path);
  await sleep(settle);
}

try {
  // Window size: request 1280x900, RECORD the actual (the display may clamp).
  await post(`/session/${sid}/window/rect`, { width: 1280, height: 900 });
  await sleep(500);

  // ---------- OP-4, taken IN this cell ----------
  await route("/#/easing");
  const cap = JSON.parse(await exec(sid, CAPQ));
  console.error("OP4", JSON.stringify(cap));

  // ---------- G-KFW9-9 BEFORE WITNESS: the ribbon button ----------
  const ribbonPresence = JSON.parse(await exec(sid, `
    const b=[...document.querySelectorAll('.btn-playback')].map(e=>({
      cls:(typeof e.className==='string'?e.className:''),
      text:(e.innerText||'').trim().slice(0,30),
      hasFocusRing: e.classList.contains('focus-ring'),
      tabindex: e.getAttribute('tabindex'), tag:e.tagName.toLowerCase()}));
    return JSON.stringify({ btnPlayback:b, focusRingCount:document.querySelectorAll('.focus-ring').length });
  `));
  const t1 = await tabTo(".btn-playback");
  const ribbon = JSON.parse(await exec(sid, READ_ACTIVE));
  const ribbonShot = await shotTo(`hcm-safari-app-desktop-easing-ribbon-${STATE}.png`);
  rows.push({ probe: "G-KFW9-9 BEFORE · ribbon .btn-playback focus indicator", route: "/#/easing",
    cell: CELL, driver: "safaridriver", state: STATE, tabWalk: t1, active: ribbon, shot: ribbonShot,
    presence: ribbonPresence });

  // ---------- the .focus-ring copy, same page ----------
  const t2 = await tabTo(".focus-ring");
  const fr = JSON.parse(await exec(sid, READ_ACTIVE));
  const frShot = await shotTo(`hcm-safari-app-desktop-easing-focusring-${STATE}.png`);
  rows.push({ probe: "G-KFW9-9 BEFORE · .focus-ring focus indicator (the producer-identical selector)",
    route: "/#/easing", cell: CELL, driver: "safaridriver", state: STATE, tabWalk: t2, active: fr, shot: frShot });

  // ---------- ST-1 datum: the five sequence row sliders ----------
  await route("/#/sequence", 5000);
  const seqPresence = JSON.parse(await exec(sid, `
    const h=[...document.querySelectorAll('.seq-handle')];
    const s=[...document.querySelectorAll('[role="slider"]')].map(e=>({
      cls:(typeof e.className==='string'?e.className:'').slice(0,120),
      label:e.getAttribute('aria-label'), now:e.getAttribute('aria-valuenow'),
      vt:e.getAttribute('aria-valuetext'), min:e.getAttribute('aria-valuemin'),
      max:e.getAttribute('aria-valuemax'), ti:e.getAttribute('tabindex')}));
    return JSON.stringify({ seqHandleCount:h.length, sliders:s, sliderCount:s.length });
  `));
  const t3 = await tabTo('[role="slider"]');
  const seq = JSON.parse(await exec(sid, READ_ACTIVE));
  const seqShot = await shotTo(`hcm-safari-app-desktop-sequence-slider-${STATE}.png`);
  rows.push({ probe: "ST-1 · the sequence row sliders' focus indication (HCM datum)", route: "/#/sequence",
    cell: CELL, driver: "safaridriver", state: STATE, tabWalk: t3, active: seq, shot: seqShot,
    presence: seqPresence });

  writeFileSync(
    `/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/dcap-${STATE}.json`,
    JSON.stringify({ cell: CELL, driver: "safaridriver", state: STATE, caps, substrateSha: SUBSTRATE_SHA,
      bundleSha256: BUNDLE_SHA, origin: ORIGIN, capability: cap, rows }, null, 1),
  );
  console.log(JSON.stringify({ state: STATE, cap, rows }, null, 1));
} finally {
  await del(`/session/${sid}`);
  console.error("SESSION DELETED");
}
