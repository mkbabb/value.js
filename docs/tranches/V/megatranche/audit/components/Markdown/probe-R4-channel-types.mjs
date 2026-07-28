const { parseCssColor } = await import("/Users/mkbabb/Programming/value.js/dist/subpaths/css.js");
const { convertColor } = await import("/Users/mkbabb/Programming/value.js/dist/subpaths/color.js");
for (const input of ["rgb(200 70 215)", "oklch(0.7 0.2 30)", "hsl(300 50% 50%)", "#ff0000", "white", "rgb(128 128 128)"]) {
  const p = parseCssColor(input);
  if (!p.ok) { console.log(input, "PARSE FAIL", p.diagnostics?.[0]); continue; }
  const c = convertColor(p.value, "oklch");
  if (!c.ok) { console.log(input, "CONV FAIL", c.error); continue; }
  const ch = c.value.channels;
  const [L,C,H] = ch;
  console.log(JSON.stringify({
    input,
    ctorNames: ch.map(x => x===null?"null":(x===undefined?"undefined":(typeof x === "object" ? x.constructor.name : typeof x))),
    stringified: ch.map(x => `${x}`),
    L_eq_none: L === "none", C_eq_none: C === "none", H_eq_none: H === "none",
    typeofL: typeof L, typeofC: typeof C, typeofH: typeof H,
    mathMaxC: Math.max(C, 0.08),
    interpolated: `oklch(${L} ${Math.max(C,0.08)} ${H})`,
  }));
}
