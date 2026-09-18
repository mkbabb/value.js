import hljs from "highlight.js/lib/core";
import css from "highlight.js/lib/languages/css";
hljs.registerLanguage("css", css);

const s4 = "linear-gradient(90deg, oklch(0.75 0.15 145) 0%, oklch(71.549999815004% 0.160350000555 186.400002219955deg) 34.5%, oklch(67.889999783824% 0.171330000649 230.320002594111deg) 71.1%, oklch(0.65 0.18 265) 100%)";
const s2 = "linear-gradient(90deg, oklch(0.75 0.15 145) 0%, oklch(0.65 0.18 265) 100%)";
for (const [name, s] of [["2-stop", s2], ["4-stop", s4]]) {
  for (let i = 0; i < 200; i++) hljs.highlight(s, { language: "css" });
  const t0 = performance.now();
  const N = 2000;
  for (let i = 0; i < N; i++) hljs.highlight(s, { language: "css" });
  const ms = (performance.now() - t0) / N;
  console.log(`${name} (${s.length} chars): ${ms.toFixed(3)} ms/highlight  → ${(ms * 60).toFixed(1)} ms per 60 fps second`);
}
// escaping check (the innerHTML sink)
const evil = 'linear-gradient(90deg, <img src=x onerror=alert(1)>, blue)';
console.log("hljs output for an HTML payload:", hljs.highlight(evil, { language: "css" }).value.slice(0, 160));
