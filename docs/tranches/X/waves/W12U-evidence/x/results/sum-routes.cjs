// SERVED MODEL: claude-opus-5-5
const r=require(process.argv[2]);
for(const x of r){ if(x.unreached){console.log(x.tag,x.theme,x.route,"UNREACHED",x.unreached);continue;}
 const m=x.m; const a11=Object.entries(m.at11).map(([k,v])=>k.split(".").slice(0,2).join(".")+"×"+v).join(",").slice(0,70);
 console.log(x.tag,x.theme.slice(0,1),x.route.padEnd(14),`SW${m.docSW}/${m.vw} SH${m.docSH}/${m.vh} off${m.off.length} card${m.cardOver.length} small${m.small.n}/${m.small.of} min${Math.round(m.minFs*10)/10} a11[${a11}] panes${JSON.stringify(x.layout.panes)} dock${x.layout.dock?x.layout.dock.w+"/"+x.layout.dock.sw+"-"+x.layout.dock.cw:"-"} seats${x.seats.map(s=>s.w+"x"+s.h+(s.slop6?"s":"")).join(",")}`); }
