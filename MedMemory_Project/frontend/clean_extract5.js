const fs = require('fs');
const readline = require('readline');

async function extract() {
  const fileStream = fs.createReadStream('C:\\Users\\HARINI\\.gemini\\antigravity\\brain\\850a4825-6c56-41a6-b634-43227cf5e6e1\\.system_generated\\logs\\transcript.jsonl');
  const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

  for await (const line of rl) {
    try {
        const obj = JSON.parse(line);
        if (obj.type === "TOOL_RESPONSE" && obj.tool_responses) {
            for (const resp of obj.tool_responses) {
                if (resp.name === "view_file" && resp.output && resp.output.includes("Showing lines 50 to 612")) {
                    const output = resp.output;
                    const lines = output.split('\n');
                    let cleanContent = [];
                    let started = false;
                    for (let l of lines) {
                        const m = l.match(/^(\d+):\s(.*)$/);
                        if (m) {
                            started = true;
                            cleanContent.push(m[2]);
                        } else if (started && !l.includes("The above content")) {
                            if (l.match(/^\d+:$/)) {
                                cleanContent.push("");
                            } else if (l.trim() === "") {
                                cleanContent.push("");
                            }
                        }
                    }
                    fs.writeFileSync('src/app/page.tsx', cleanContent.join('\n'), 'utf8');
                    console.log("Success! Extracted " + cleanContent.length + " lines.");
                    return;
                }
            }
        }
    } catch(e){}
  }
  console.log("Not found in TOOL_RESPONSE");
}

extract();
