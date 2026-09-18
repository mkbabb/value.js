import { webkit } from "playwright";
const b = await webkit.launch();
const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
await p.goto("http://localhost:9000/#/mix", { waitUntil: "load" });
await p.waitForTimeout(4200);
const main = p.getByRole("main");
for (const q of ["Add current color to the mix"]) {
  const c = await main.getByRole("button", { name: q }).count();
  console.log(`getByRole('button', {name: "${q}"}).count() = ${c}`);
}
console.log("any node with that accessible text:", await p.getByText("Add current color", { exact: false }).count());
console.log("total buttons in main:", await main.getByRole("button").count());
await b.close();
