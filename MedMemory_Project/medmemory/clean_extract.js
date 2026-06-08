const fs = require('fs');

const data = JSON.parse(fs.readFileSync('recovered_page.txt', 'utf8'));

// The output string from the tool response
let outputText = data.tool_calls[0].response.output;

// Now we need to parse out the lines. The output is usually:
// ...
// 50:       {/* Hero Body - strictly single viewport */}
// 51: ...
// The above content does NOT show the entire file contents...

const lines = outputText.split('\n');
let cleanContent = [];
let started = false;

for (let line of lines) {
    // Regex to match "123: content"
    const match = line.match(/^(\d+):\s(.*)$/);
    if (match) {
        started = true;
        cleanContent.push(match[2]);
    } else if (started && !line.includes("The above content")) {
        // sometimes empty lines are just empty
        if (line.match(/^\d+:$/)) {
            cleanContent.push("");
        } else if (line.trim() === "") {
             cleanContent.push("");
        }
    }
}

fs.writeFileSync('clean_page.tsx', cleanContent.join('\n'));
console.log("Done. Extracted " + cleanContent.length + " lines.");
