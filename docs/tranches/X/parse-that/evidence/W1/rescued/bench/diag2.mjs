import { CSSValues, parseCSSStylesheet } from "../deposed-full/deposed-bundle.mjs";
const t = (l, fn) => { try { fn(); console.log("  OK  ", l); } catch(e){ console.log("  ERR ", l, "->", e.message.slice(0,60)); } };
for (const v of ["oklch(0.7 0.15 30)","cubic-bezier(0.42, 0, 0.58, 1)","linear-gradient(to right, red, blue)","blue","spring(1, 100, 10, 0)","linear(0, 0.5 50%, 1)","translateX(100px)","calc(100% - 2rem)","var(--color, red)","42px"]) t("V "+v, () => CSSValues.Value.parse(v));
for (const s of [".a { color: red; }",".card { padding: 1rem; background: oklch(0.7 0.15 30); }",".a { color: oklch(62.8% .257 29.23 / 85%); }","@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }"]) t("S "+s.slice(0,40), () => parseCSSStylesheet(s));
