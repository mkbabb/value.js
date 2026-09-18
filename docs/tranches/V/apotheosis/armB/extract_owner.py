import json, sys, re

def is_owner_text(entry):
    if entry.get("type") != "user":
        return None
    msg = entry.get("message", {})
    if msg.get("role") != "user":
        return None
    content = msg.get("content")
    texts = []
    if isinstance(content, str):
        texts.append(content)
    elif isinstance(content, list):
        for part in content:
            if isinstance(part, dict):
                if part.get("type") == "tool_result":
                    return None  # skip tool results
                if part.get("type") == "text":
                    texts.append(part.get("text",""))
            elif isinstance(part, str):
                texts.append(part)
    if not texts:
        return None
    full = "\n".join(texts).strip()
    # skip if looks like system/command wrapper
    if not full:
        return None
    # skip pure command-name meta
    if full.startswith("<command-name>") or full.startswith("<local-command"):
        return None
    if full.startswith("Caveat:") and "tool" in full[:200]:
        return None
    return full

for path in sys.argv[1:]:
    print(f"\n\n########## FILE: {path} ##########")
    n=0
    with open(path) as f:
        for line in f:
            line=line.strip()
            if not line: continue
            try:
                entry=json.loads(line)
            except: continue
            t = is_owner_text(entry)
            if t is None: continue
            # filter out messages that are clearly interrupted-tool or system reminders only
            # strip system-reminder blocks
            cleaned = re.sub(r"<system-reminder>.*?</system-reminder>", "", t, flags=re.DOTALL).strip()
            if not cleaned: continue
            ts = entry.get("timestamp","")
            n+=1
            print(f"\n===== [{n}] ts={ts} len={len(cleaned)} =====")
            print(cleaned[:6000])
    print(f"\n---- total owner msgs in {path}: {n} ----")
