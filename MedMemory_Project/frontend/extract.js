const fs = require('fs');
const readline = require('readline');

async function extract() {
  const fileStream = fs.createReadStream('C:\\Users\\HARINI\\.gemini\\antigravity\\brain\\850a4825-6c56-41a6-b634-43227cf5e6e1\\.system_generated\\logs\\transcript.jsonl');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    try {
        const data = JSON.parse(line);
        if (data.tool_calls) {
            for (const call of data.tool_calls) {
               // checking response
            }
        }
        // Let's just string match
        if (line.includes("Showing lines 50 to 612") && line.includes("page.tsx")) {
             fs.writeFileSync("recovered_page.txt", line);
             console.log("Found line!");
             return;
        }
    } catch(e){}
  }
  console.log("Not found.");
}

extract();
