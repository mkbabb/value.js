import json, sys

def extract(path, out):
    n=0
    with open(path) as f, open(out, 'w') as o:
        for i, line in enumerate(f):
            try:
                d = json.loads(line)
            except Exception:
                continue
            if d.get('type') != 'user' or d.get('isMeta'):
                continue
            msg = d.get('message', {})
            content = msg.get('content')
            texts = []
            if isinstance(content, str):
                texts.append(content)
            elif isinstance(content, list):
                for c in content:
                    if isinstance(c, dict) and c.get('type') == 'text':
                        texts.append(c.get('text',''))
            if not texts:
                continue
            t = '\n'.join(texts).strip()
            if not t: continue
            low = t
            if low.startswith('<task-notification') or low.startswith('<local-command') or low.startswith('<command-name') or low.startswith('Caveat:') or low.startswith('<system-reminder') or low.startswith('[Request interrupted'):
                continue
            ts = d.get('timestamp','?')
            n+=1
            o.write(f"\n===== OWNER MSG #{n} line={i} ts={ts} =====\n{t}\n")
    print(path, '->', n, 'owner messages')

extract(sys.argv[1], sys.argv[2])
