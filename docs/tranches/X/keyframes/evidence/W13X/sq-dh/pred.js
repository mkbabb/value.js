// Served geometric predicates for KF.W13X .sq/.dh — evaluated in the page.
(view) => {
  const PRIMARY = { sequence: ".seq-stage", easing: "[data-subject], .easing-catalogue", spring: "[data-subject], [role=img]" };
  const vw = innerWidth, vh = innerHeight;
  const alpha = (c) => { if (!c || c === "transparent") return 0; const m = c.match(/\/\s*([\d.]+)\s*\)$/) || c.match(/rgba\([^)]*,\s*([\d.]+)\)$/); return m ? +m[1] : (c.startsWith("rgb(") || c.startsWith("color(") || c.startsWith("oklab(") || c.startsWith("oklch(")) ? 1 : 1; };
  const shown = (el) => { const cs = getComputedStyle(el); if (cs.visibility === "hidden" || cs.display === "none") return false; let e = el; while (e) { if (+getComputedStyle(e).opacity === 0) return false; e = e.parentElement; } return true; };
  // visible rect: intersect with viewport and every clipping ancestor
  const visRect = (el) => { let r = el.getBoundingClientRect(); let x0 = Math.max(r.left, 0), y0 = Math.max(r.top, 0), x1 = Math.min(r.right, vw), y1 = Math.min(r.bottom, vh); let a = el.parentElement; while (a && a !== document.documentElement) { const cs = getComputedStyle(a); if (cs.overflowX !== "visible" || cs.overflowY !== "visible") { const q = a.getBoundingClientRect(); x0 = Math.max(x0, q.left); y0 = Math.max(y0, q.top); x1 = Math.min(x1, q.right); y1 = Math.min(y1, q.bottom); } a = a.parentElement; } return { x0, y0, x1, y1, area: Math.max(0, x1 - x0) * Math.max(0, y1 - y0) }; };
  const hit = (el) => { const v = visRect(el); for (const fx of [0.25, 0.5, 0.75]) for (const fy of [0.25, 0.5, 0.75]) { const e = document.elementFromPoint(v.x0 + (v.x1 - v.x0) * fx, v.y0 + (v.y1 - v.y0) * fy); if (e && el.contains(e)) return true; } return false; };
  const stageCard = document.querySelector(".stage-cell .card");
  const paneRoot = document.querySelector(".controls-pane-wrapper");
  const cards = [stageCard, ...(paneRoot ? [...paneRoot.querySelectorAll(".card")].filter(c => !c.parentElement.closest(".card") && shown(c) && visRect(c).area > 0 && hit(c)) : [])].filter(Boolean);
  const name = (el) => el.tagName.toLowerCase() + "." + [...el.classList].slice(0, 3).join(".");
  const r0 = (el) => { const cs = getComputedStyle(el); return ["borderTopLeftRadius","borderTopRightRadius","borderBottomLeftRadius","borderBottomRightRadius"].every(k => parseFloat(cs[k]) === 0); };
  // P1 — no square-cornered bordered (or filled) box within a card; no square clip cutting a card
  const square = []; const clip = [];
  for (const card of cards) for (const el of card.querySelectorAll("*")) {
    if (el.closest("svg") || ["CANVAS","IMG","SVG","TEXTAREA"].includes(el.tagName) || el.closest(".monaco-editor")) continue;
    if (!shown(el)) continue; const v = visRect(el); const w = v.x1 - v.x0, h = v.y1 - v.y0; if (w < 24 || h < 24) continue;
    if (!r0(el)) continue; const cs = getComputedStyle(el);
    const sides = ["Top","Right","Bottom","Left"].filter(s => parseFloat(cs["border"+s+"Width"]) > 0 && cs["border"+s+"Style"] !== "none" && alpha(cs["border"+s+"Color"]) > 0.05).length;
    const fill = alpha(cs.backgroundColor) >= 0.03;
    if (sides >= 2 || fill) square.push(`${name(el)} ${Math.round(w)}x${Math.round(h)} sides=${sides} bg=${cs.backgroundColor}`);
  }
  for (const card of cards) { const r = card.getBoundingClientRect(); const v = visRect(card); if (v.area > 0 && (v.y1 < r.bottom - 1 && v.y1 < vh - 1 || v.y0 > r.top + 1 && v.y0 > 1)) clip.push(`CLIP ${name(card)} cut ${Math.round(r.top)}..${Math.round(r.bottom)} -> ${Math.round(v.y0)}..${Math.round(v.y1)}`); }
  // P2 — the primary subject's visible area >= each other region's
  const prim = stageCard && stageCard.querySelector(PRIMARY[view]);
  const regions = [];
  if (stageCard) for (const c of stageCard.children) if (shown(c) && !(prim && (c === prim || c.contains(prim)))) regions.push(c);
  if (prim) { let p = prim.parentElement; while (p && p !== stageCard) { for (const s of p.parentElement.children) if (s !== p && shown(s) && !regions.includes(s) && s.parentElement !== stageCard) regions.push(s); p = p.parentElement; } }
  for (const c of cards.slice(1)) regions.push(c);
  const pa = prim ? visRect(prim).area : 0;
  const bigger = regions.map(r => [name(r), Math.round(visRect(r).area)]).filter(([, a]) => a > pa);
  // P3 — no text-overflow: ellipsis in effect
  const ell = []; const ellGlass = [];
  for (const root of cards) for (const el of [root, ...root.querySelectorAll("*")]) { const cs = getComputedStyle(el); if (cs.textOverflow === "ellipsis" && (cs.overflowX !== "visible") && shown(el) && visRect(el).area > 0) { const glass = el.matches(".configurator-section-label") || !!el.closest(".configurator-layer-header") && el.matches(".truncate") || el.matches("code.text-micro.truncate") && !!el.closest(".configurator-layer-body, [class*=easing-picker]"); (glass ? ellGlass : ell).push(name(el) + (el.scrollWidth > el.clientWidth ? " TRUNCATED" : "")); } }
  // D-text — a text run escaping its card's box (horizontal), e.g. a legend run over the edge
  const esc = [];
  for (const card of cards) { const cr = card.getBoundingClientRect(); for (const el of card.querySelectorAll("*")) { if (![...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim())) continue; if (!shown(el)) continue; const r = el.getBoundingClientRect(); if (r.width < 1) continue; if (r.right > cr.right + 1 || r.left < cr.left - 1) esc.push(name(el) + " " + JSON.stringify(el.textContent.trim().slice(0, 24))); } }
  // P4 — one label register per sequence row (stage rows + the Timeline pane's lane labels)
  const reg = [];
  if (view === "sequence") {
    const rows = [...document.querySelectorAll(".seq-row .seq-row-name, .seq-row-label, .seq-lanes .seq-lane-label")].filter(e => shown(e) && visRect(e).area > 0);
    for (const row of rows) { const keys = new Set(); const tw = document.createTreeWalker(row, NodeFilter.SHOW_TEXT); let n; while ((n = tw.nextNode())) { if (!n.textContent.trim()) continue; const cs = getComputedStyle(n.parentElement); keys.add([cs.fontFamily.split(",")[0], cs.fontSize, cs.fontWeight, cs.color, cs.textTransform].join("|")); } if (keys.size > 1) reg.push(`${JSON.stringify(row.textContent.trim())} ${keys.size} registers`); }
    // the owner-frame shape: an index and its @ms offset as two stacked elements of a row
    for (const row of document.querySelectorAll(".seq-row")) { const labs = [...row.querySelectorAll(".seq-row-label, .seq-row-name, .seq-row-at")].filter(shown); const keys = new Set(labs.map(e => { const cs = getComputedStyle(e); return [cs.fontFamily.split(",")[0], cs.fontSize, cs.fontWeight, cs.color].join("|"); })); if (keys.size > 1) reg.push(`stage row ${keys.size} registers`); }
  }
  return { view, vw, vh, P1: square.length === 0, square, P2: !!prim && bigger.length === 0, primary: prim ? name(prim) : null, primaryArea: Math.round(pa), bigger, P3: ell.length === 0, ell, ellGlass, clip, esc, P4: reg.length === 0, reg };
}
