import json, sys

def extract(path, out):
    n=0
    with open(path, 'r', errors='replace') as f, open(out, 'w') as o:
        for i, line in enumerate(f):
            try:
                d = json.loads(line)
            except Exception:
                continue
            if d.get('type') != 'user' or d.get('isMeta') or d.get('isSidechain'):
                continue
            if d.get('toolUseResult') is not None:
                continue
            msg = d.get('message') or {}
            if msg.get('role') != 'user':
                continue
            c = msg.get('content')
            texts = []
            if isinstance(c, str):
                texts.append(c)
            elif isinstance(c, list):
                for item in c:
                    if isinstance(item, dict) and item.get('type') == 'text':
                        texts.append(item.get('text',''))
            for t in texts:
                t = t.strip()
                if not t:
                    continue
                if t.startswith('<command-name>') or t.startswith('<local-command') or t.startswith("Caveat:"):
                    continue
                if t.startswith('<system-reminder>') or t.startswith('[Request interrupted'):
                    continue
                ts = d.get('timestamp','?')
                n+=1
                o.write(f"\n===== msg {n} | line {i} | ts={ts} =====\n{t}\n")
    print(path, "->", n, "owner messages")

extract(sys.argv[1], sys.argv[2])
