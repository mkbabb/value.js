// SERVED MODEL: claude-opus-5-5
// X.W12U.x — injected metrics: window.__mx() -> object. READ-ONLY.
// Adapted from audit-2/value-L2/measure.js (git-excluded) + a card-containment read
// (the fourier A2-FO-L3-2 class: an action group overflowing its card).
window.__mx = function () {
  const de = document.documentElement, vw = de.clientWidth, vh = innerHeight;
  const R = (n) => Math.round(n * 10) / 10;
  const isVis = (el) => {
    const r = el.getBoundingClientRect();
    if (r.width < 1 || r.height < 1) return false;
    for (let e = el; e && e.nodeType === 1; e = e.parentElement) {
      const cs = getComputedStyle(e);
      if (cs.display === "none" || cs.visibility === "hidden" || cs.opacity === "0") return false;
      if (e.hasAttribute("inert") || e.getAttribute("aria-hidden") === "true") return false;
    }
    return true;
  };
  const path = (el) => {
    const p = [];
    for (let e = el; e && e !== document.body && p.length < 3; e = e.parentElement) {
      const c = (e.className?.baseVal ?? e.className ?? "").toString().trim().split(/\s+/).filter(Boolean).slice(0, 2).join(".");
      p.unshift(e.tagName.toLowerCase() + (c ? "." + c : ""));
    }
    return p.join(">");
  };
  const label = (el) => (el.getAttribute("aria-label") || el.getAttribute("title") || el.textContent || el.getAttribute("placeholder") || "").trim().replace(/\s+/g, " ").slice(0, 32);
  const clippedWithin = (e, stop) => {
    for (let a = e.parentElement; a && a !== stop; a = a.parentElement) {
      if (/(auto|scroll|hidden|clip)/.test(getComputedStyle(a).overflowX)) return a;
    }
    return null;
  };
  // 1 · viewport overflow (unclipped)
  const off = [];
  for (const e of document.body.querySelectorAll("*")) {
    if (e instanceof SVGElement && e.tagName !== "svg") continue;
    const r = e.getBoundingClientRect();
    if (r.width < 1 || r.height < 1 || !(r.right > vw + 0.5 || r.left < -0.5)) continue;
    const c = clippedWithin(e, document.body);
    if (c && c.getBoundingClientRect().right <= vw + 0.5) continue;
    if (!isVis(e)) continue;
    off.push({ p: path(e), l: R(r.left), r: R(r.right), t: label(e) });
    if (off.length >= 8) break;
  }
  // 2 · card containment
  const cardOver = [];
  for (const card of document.querySelectorAll("[data-slot=card]")) {
    if (!isVis(card)) continue;
    const cr = card.getBoundingClientRect();
    for (const e of card.querySelectorAll("button, a[href], input, [role=button], [role=combobox], span, p, h2, h3")) {
      const r = e.getBoundingClientRect();
      if (r.width < 1 || !(r.right > cr.right + 1 || r.left < cr.left - 1)) continue;
      const c = clippedWithin(e, card);
      if (c) continue;
      if (!isVis(e)) continue;
      cardOver.push({ p: path(e), over: R(Math.max(r.right - cr.right, cr.left - r.left)), t: label(e) });
      if (cardOver.length >= 8) break;
    }
  }
  // 3 · targets under 44
  const sel = "button, a[href], input:not([type=hidden]), select, textarea, [role=button], [role=tab], [role=slider], [role=switch], [role=checkbox], [role=menuitem], [role=option], [role=combobox]";
  const targets = [...document.querySelectorAll(sel)].filter((e) => isVis(e) && getComputedStyle(e).pointerEvents !== "none");
  const small = targets.map((e) => ({ e, r: e.getBoundingClientRect() })).filter(({ r }) => Math.min(r.width, r.height) < 43.5)
    .map(({ e, r }) => `${label(e) || e.tagName}:${Math.round(r.width)}x${Math.round(r.height)}`);
  // 4 · type floor
  let minFs = 99; const at11 = {};
  const tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); let n;
  while ((n = tw.nextNode())) {
    if (!n.textContent.trim()) continue;
    const el = n.parentElement;
    if (!el || el.closest("script,style,svg,.sr-only") || !isVis(el)) continue;
    const fs = parseFloat(getComputedStyle(el).fontSize);
    if (fs < minFs) minFs = fs;
    if (fs <= 11.5) { const k = path(el).split(">").slice(-1)[0]; at11[k] = (at11[k] || 0) + 1; }
  }
  // 5 · overlays
  const dialogs = [...document.querySelectorAll("[role=dialog],[role=alertdialog],[role=menu],[role=listbox]")].filter(isVis).map((d) => {
    const r = d.getBoundingClientRect();
    return { role: d.getAttribute("role"), t: R(r.top), b: R(r.bottom), l: R(r.left), r: R(r.right), h: R(r.height), sh: d.scrollHeight, ch: d.clientHeight,
      oy: getComputedStyle(d).overflowY, clipV: r.bottom > vh + 0.5 || r.top < -0.5, clipH: r.right > vw + 0.5 || r.left < -0.5 };
  });
  const headings = [...document.querySelectorAll("h1,h2,h3,[data-slot=card-title]")].filter(isVis).slice(0, 6)
    .map((h) => `${h.tagName} ${getComputedStyle(h).fontSize}/${getComputedStyle(h).fontWeight} ${h.textContent.trim().slice(0, 20)}`);
  return { hash: location.hash, vw, vh, dark: de.classList.contains("dark"), docSW: de.scrollWidth, docSH: de.scrollHeight,
    off, cardOver, small: { n: small.length, of: targets.length, list: small.slice(0, 24) }, minFs, at11, dialogs, headings };
};
