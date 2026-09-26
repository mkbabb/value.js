// SERVED MODEL: claude-opus-5-5
const r=require(process.argv[2]);
for(const x of r){ if(x.adminHits!==undefined){console.log(x.tag,x.theme,"hits",x.adminHits);continue;}
 const f=(m)=>m?`SW${m.docSW}/${m.vw} SH${m.docSH}/${m.vh} off${m.off.length} card${m.cardOver.length} small${m.small.n}/${m.small.of} min${m.minFs} dlg${JSON.stringify(m.dialogs.map(d=>[d.role,d.h,d.clipV,d.clipH]))}`:"-";
 console.log(x.tag,x.theme,x.route||x.state,"| rest",f(x.rest),"| p2",x.page2?"y":"n","| confirm",x.destrLabel||"",f(x.confirm)); }
