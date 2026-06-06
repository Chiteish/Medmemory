import json

with open('C:\\Users\\HARINI\\.gemini\\antigravity\\brain\\850a4825-6c56-41a6-b634-43227cf5e6e1\\.system_generated\\logs\\transcript.jsonl', 'r', encoding='utf-8') as f:
    for line in f:
        try:
            data = json.loads(line)
            if 'tool_calls' in data:
                for call in data['tool_calls']:
                    if call['name'] == 'view_file':
                        out = call.get('response', {}).get('output', '')
                        if 'Showing lines 50 to 612' in out and 'page.tsx' in out:
                            with open('extracted_raw.txt', 'w', encoding='utf-8') as out_f:
                                out_f.write(out)
                            print("Found!")
                            exit(0)
        except:
            pass
