const j=JSON.parse(require("fs").readFileSync(process.argv[2]));console.log(JSON.stringify(j.stats));
const w=(s,f)=>{(s.specs||[]).forEach(f);(s.suites||[]).forEach(x=>w(x,f))};
j.suites.forEach(s=>w(s,p=>{p.tests.forEach(t=>{const r=t.results[t.results.length-1];if(t.status==="unexpected"||r.status!=="passed"){const m=(r.errors&&r.errors[0]&&r.errors[0].message||"").replace(/\x1b\[[0-9;]*m/g,"").split("\n").slice(0,6).join(" ").slice(0,200);console.log(p.file+":"+p.line+" | "+p.title.slice(0,80)+" | "+m)}})}));
