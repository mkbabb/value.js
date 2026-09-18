import { chromium } from "playwright";
import { writeFileSync } from "fs";
const b = await chromium.launch(); const p = await b.newPage();
// portrait 120x900 with TOP/BOT markers
const dataUrl = await p.evaluate(() => {
  const c=document.createElement("canvas"); c.width=120; c.height=900; const g=c.getContext("2d");
  for(let y=0;y<900;y++){g.fillStyle=`hsl(${(y/900)*360} 80% 50%)`;g.fillRect(0,y,120,1);}
  g.fillStyle="#000"; g.font="bold 26px sans-serif"; g.fillText("TOP",8,40); g.fillText("BOT",8,880);
  return c.toDataURL("image/png");
});
writeFileSync("portrait.png", Buffer.from(dataUrl.split(",")[1], "base64"));
// landscape control 900x120
const d2 = await p.evaluate(() => {
  const c=document.createElement("canvas"); c.width=900; c.height=120; const g=c.getContext("2d");
  for(let x=0;x<900;x++){g.fillStyle=`hsl(${(x/900)*360} 80% 50%)`;g.fillRect(x,0,1,120);}
  return c.toDataURL("image/png");
});
writeFileSync("landscape.png", Buffer.from(d2.split(",")[1], "base64"));
await b.close();
