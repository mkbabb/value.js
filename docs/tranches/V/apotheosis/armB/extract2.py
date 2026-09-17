import json, sys, re

def owner_text(entry):
    if entry.get("type") != "user": return None
    msg = entry.get("message", {})
    if msg.get("role") != "user": return None
    content = msg.get("content")
    texts=[]
    if isinstance(content, str): texts.append(content)
    elif isinstance(content, list):
        for part in content:
            if isinstance(part, dict):
                if part.get("type")=="tool_result": return None
                if part.get("type")=="text": texts.append(part.get("text",""))
            elif isinstance(part,str): texts.append(part)
    if not texts: return None
    full="\n".join(texts).strip()
    return full

SKIP_MARKERS=["<task-notification>","<command-name>","<local-command","<bash-input>","<bash-stdout>","Caveat: The messages below"]
for path in sys.argv[1:]:
    print(f"\n########## {path} ##########")
    n=0
    with open(path) as f:
        for line in f:
            line=line.strip()
            if not line: continue
            try: entry=json.loads(line)
            except: continue
            t=owner_text(entry)
            if t is None: continue
            cleaned=re.sub(r"<system-reminder>.*?</system-reminder>","",t,flags=re.DOTALL).strip()
            if not cleaned: continue
            if any(cleaned.startswith(m) or ("<task-notification>" in cleaned[:50]) for m in SKIP_MARKERS): continue
            if cleaned.startswith("<task-notification"): continue
            # meta interruption
            if cleaned.startswith("[Request interrupted"): 
                # still could be interruption + text
                pass
            ts=entry.get("timestamp","")
            n+=1
            print(f"\n===== [{n}] ts={ts} len={len(cleaned)} =====")
            print(cleaned)
    print(f"\n---- total genuine owner msgs: {n} ----")
