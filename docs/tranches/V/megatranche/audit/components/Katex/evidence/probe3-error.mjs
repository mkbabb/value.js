// Reproduce the EXACT option set Katex.vue:31-42 passes, for the error and empty arms.
import katex from "katex";

const opts = { displayMode: true, throwOnError: false, output: "htmlAndMathml" };

const cases = [
    ["malformed", "\\frac{1}{"],
    ["unknown-macro", "\\thisIsNotAMacro{x}"],
    ["empty", ""],
    ["bad-env", "\\begin{cases} a \\\\ b"],
];

for (const [name, expr] of cases) {
    let html;
    try {
        html = katex.renderToString(expr, opts);
    } catch (e) {
        html = "THREW: " + e.message;
    }
    const inlineStyle = /style="[^"]*"/.exec(html);
    const errClass = /class="[^"]*error[^"]*"/.exec(html);
    console.log("--", name, "expr=", JSON.stringify(expr));
    console.log("   len", html.length);
    console.log("   errorClass:", errClass ? errClass[0] : "(none)");
    console.log("   inlineStyle:", inlineStyle ? inlineStyle[0] : "(none)");
    console.log("   hasCC0000:", html.includes("cc0000"));
    console.log("   role/aria:", /aria-[a-z]+="[^"]*"/g.test(html) ? [...html.matchAll(/aria-[a-z]+="[^"]*"/g)].map(m=>m[0]).slice(0,3).join(" ") : "(none)");
    console.log("   head:", html.slice(0, 220).replace(/\n/g, " "));
    console.log();
}
