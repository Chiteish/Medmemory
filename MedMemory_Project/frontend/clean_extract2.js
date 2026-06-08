const fs = require('fs');

const raw = fs.readFileSync('recovered_page.txt', 'utf8');

// The file might contain "\n" and "50:       {/* Hero Body" etc.
// Let's just find the string "Showing lines 50 to 612" and extract what comes after.
let match = raw.match(/Showing lines 50 to 612\\n[\\s\\S]*?\\n(\\d+: .*)/);
if (!match) {
    // maybe it's just the json object.
    try {
        let obj = JSON.parse(raw);
        let output = obj.output || (obj.tool_calls && obj.tool_calls[0] && obj.tool_calls[0].response && obj.tool_calls[0].response.output) || obj.content;
        
        if (!output && obj.tool_responses) {
            output = obj.tool_responses[0].output;
        }

        if(typeof output !== 'string') {
            output = JSON.stringify(obj); // fallback to raw
        }

        const lines = output.split('\n');
        let cleanContent = [];
        let started = false;
        for (let line of lines) {
            const m = line.match(/^(\d+):\s(.*)$/);
            if (m) {
                started = true;
                cleanContent.push(m[2]);
            } else if (started && !line.includes("The above content")) {
                if (line.match(/^\d+:$/)) {
                    cleanContent.push("");
                } else if (line.trim() === "") {
                    cleanContent.push("");
                }
            }
        }
        fs.writeFileSync('clean_page.tsx', cleanContent.join('\n'));
        console.log("Done. Extracted " + cleanContent.length + " lines.");

    } catch (e) {
        console.error(e);
    }
}
