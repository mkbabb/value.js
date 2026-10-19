import json,sys,glob
for cap in sorted(glob.glob("capture-*.json")):
  for name,r in json.load(open(cap)).items():
    if sys.argv[1:] and name not in sys.argv[1:]: continue
    print("#####",name,r.get("k0"),"trig",r.get("trigFound"),"post",(r.get("postCapture") or "")[40:80],"err",r.get("errors"),r.get("liveErrors"))
    for ph,o in r.items():
      if not isinstance(o,dict) or "frames" not in o: continue
      print("==",ph,"T",o["T"],"clip",o["clip"])
      for a in o["anims"]:
        if a["name"].startswith("charLift") or "typing-dot" in a["target"] or a["kind"]=="Animation": continue
        print("  ",a["kind"],a["name"],a["target"][:80],a["duration"],a["delay"],a["endTime"],a["easing"][:28])
      for f in o["frames"][::6]+[o["frames"][-1]]:
        c=f["content"] or {}; ov=f.get("overlay") or {}
        print("   f%02d t=%s st=%s op=%.3s sc=%s tr=%s fil=%s z=%s wz=%s dock=%s xy=%s,%s wh=%s,%s ov.op=%s ov.bdf=%s"%(f["i"],f["t"],c.get("st"),c.get("op"),c.get("scale"),c.get("tr"),c.get("filter"),c.get("z"),f["wrapZ"],f["dock"],c.get("x"),c.get("y"),c.get("w"),c.get("h"),ov.get("op"),ov.get("bdf")))
    lv=r.get("live")
    if lv: print("LIVE",{k:v for k,v in lv.items() if k!="hold"}, "hold-dock-states", sorted(set(h["dock"] for h in lv.get("hold",[]))), "content", sorted(set(str(h["contentState"]) for h in lv.get("hold",[]))))
