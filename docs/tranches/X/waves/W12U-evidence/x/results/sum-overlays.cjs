// SERVED MODEL: claude-opus-5-5
const r=require(process.argv[2]);
for(const x of r){ if(x.unreached){console.log(x.tag,x.theme,x.id,"UNREACHED",x.unreached);continue;}
 const m=x.m; console.log(x.tag,x.theme,x.id,`SW${m.docSW}/${m.vw} vh${m.vh} off${m.off.length} card${m.cardOver.length} small${m.small.n} min${m.minFs} at11=${JSON.stringify(m.at11).slice(0,90)} dlg${JSON.stringify(m.dialogs.map(d=>[d.role,d.t,d.b,d.h,d.sh,d.clipV,d.clipH,d.oy]))}`, x.text?x.text.replace(/\s+/g," ").slice(0,70):""); }
