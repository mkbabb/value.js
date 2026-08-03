// CHALLENGE-D run-5 · probe — the producer-API break and the type-jurisdiction break.
//
// Two questions the first four runs did not ask:
//
//   (1) `PaletteSlugBar.vue:19,:31` pass `variant="ghost"` to glass-ui's `Button`.
//       glass-ui 7.0.0's `ButtonProps` has no `variant` axis — it has `emphasis`,
//       defaulting to "secondary". Does the button therefore render FILLED where a
//       ghost was authored? (Answered statically from the shipped bundle; this probe
//       records the rendered delta between the authored spelling and the real axis.)
//
//   (2) `:54,:91,:98,:106,:113` stack `font-display` on the `text-small` rung.
//       VISUAL-CONSTITUTION §4 fixes control/dropdown labels at `text-small`,
//       Plus Jakarta Sans, non-bold. Which utility wins in the built cascade?
//       And what is `text-caption` (:56), which is not in the closed matrix at all?
//
// Read-only. Every injected node is created and removed inside one evaluate.
//
// Usage:  node psb-emphasis-type.mjs        (dev server on :9000)

import { chromium } from "playwright";

const ORIGIN = process.env.PSB_ORIGIN ?? "http://localhost:9000";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(`${ORIGIN}/#/palettes`, { waitUntil: "networkidle" });

const result = await page.evaluate(() => {
    const host = document.createElement("div");
    host.setAttribute("data-psb-probe", "");
    host.style.cssText = "position:absolute;left:-99999px;top:0;width:600px;";
    // The exact class strings authored in PaletteSlugBar.vue.
    host.innerHTML = `
      <span   id="menu-label"   class="text-small font-display">Regenerate slug</span>
      <span   id="control-rung" class="text-small">Regenerate slug</span>
      <span   id="login-label"  class="text-mono-small font-bold">Login</span>
      <span   id="help-caption" class="text-caption">Your unique identity.</span>
      <span   id="help-prose"   class="text-prose">Your unique identity.</span>
      <button id="press"        class="transition-colors duration-fast active:scale-95">x</button>
      <button id="dots"         class="p-1 rounded-sm"><svg class="w-3.5 h-3.5" viewBox="0 0 24 24"></svg></button>
      <button id="login-btn"    class="flex items-center gap-1.5 text-mono-small font-bold px-3 py-1 rounded-full border border-primary/30"><svg class="w-3.5 h-3.5" viewBox="0 0 24 24"></svg>Login</button>
    `;
    document.body.appendChild(host);

    const read = (id) => {
        const el = host.querySelector("#" + id);
        const cs = getComputedStyle(el);
        const r = el.getBoundingClientRect();
        return {
            family: cs.fontFamily.split(",")[0].replace(/["']/g, ""),
            size: cs.fontSize,
            weight: cs.fontWeight,
            style: cs.fontStyle,
            transitionProperty: cs.transitionProperty,
            w: Math.round(r.width * 10) / 10,
            h: Math.round(r.height * 10) / 10,
        };
    };

    const out = {
        type: {
            "text-small font-display  (:54,:91,:98,:106,:113)": read("menu-label"),
            "text-small               (the §4 control rung)  ": read("control-rung"),
            "text-mono-small font-bold(:73 Login)            ": read("login-label"),
            "text-caption             (:56 help)             ": read("help-caption"),
            "text-prose               (the §4 help rung)     ": read("help-prose"),
        },
        motion: { "transition-colors duration-fast": read("press").transitionProperty },
        geometry: {
            "p-1 + w-3.5 icon  (:84 account menu)": read("dots"),
            "px-3 py-1 pill    (:71 Login)       ": read("login-btn"),
        },
    };
    host.remove();
    return out;
});

console.log(JSON.stringify(result, null, 2));
console.log(`
--- static half (no browser needed) -------------------------------------------
glass-ui 7.0.0 Button axis:
  $ grep -c "variant" node_modules/@mkbabb/glass-ui/dist/button-Bu9F4uU6.js
  0
  $ grep -o 'emphasis: { default: "[a-z]*"' node_modules/@mkbabb/glass-ui/dist/button-Bu9F4uU6.js
  emphasis: { default: "secondary"

  => PaletteSlugBar.vue:19,:31  <Button variant="ghost" …>  renders emphasis="secondary".
     The authored ghost is a filled button; "variant" falls through $attrs to the DOM.
     The producer also ships \`loading\`, which the file re-implements in four parts
     (:23 :disabled, :24 aria-label swap, :26 Loader2, animate-spin).
-------------------------------------------------------------------------------`);

await browser.close();
