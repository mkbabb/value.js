// SERVED MODEL: claude-opus-5-5 · SS-8 B23 recon: /#/mix structure, one colors-mode mix.
import { launch, open, readyMix, addCurrent, mixButton, save } from "./lib.mjs";
const b = await launch();
try {
    const { ctx, p, errors } = await open(b, {});
    try {
        await readyMix(p);
        const pre = await p.evaluate(() => {
            const cv = document.querySelector("canvas.z-controls");
            const par = cv.parentElement;
            const chain = []; let n = cv; for (let i = 0; i < 6 && n; i++) { chain.push(`${n.tagName}.${(n.className?.baseVal ?? n.className ?? "").toString().slice(0, 90)}`); n = n.parentElement; }
            return { chain, par: { cw: par.clientWidth, ch: par.clientHeight, sh: par.scrollHeight, pos: getComputedStyle(par).position, ovy: getComputedStyle(par).overflowY },
                cv: cv.getBoundingClientRect().toJSON(), dpr: devicePixelRatio,
                mixBtns: [...document.querySelectorAll("button")].filter((x) => x.innerText.trim() === "Mix").map((x) => x.getBoundingClientRect().toJSON()) };
        });
        await addCurrent(p, 2);
        await mixButton(p).click();
        await p.waitForTimeout(150);
        const ghost = await p.evaluate(() => {
            const t = document.querySelector("[data-mix-target]");
            return { target: t?.getBoundingClientRect().toJSON(), plate: document.querySelector(".mix-plate")?.className, gctx: window.__mix.gctx };
        });
        await p.waitForTimeout(1600);
        const done = await p.evaluate(() => ({ plate: document.querySelector(".mix-plate")?.outerHTML.slice(0, 900), grads: window.__mix.grads.length, last: window.__mix.grads.slice(-2), cvw: document.querySelector("canvas.z-controls").width }));
        save("recon.json", { pre, ghost, done, errors });
        console.log(JSON.stringify({ pre, ghost, done, errors }, null, 1).slice(0, 5000));
    } finally { await ctx.close(); }
} finally { await b.close(); }
