const fs = require('fs');
const raw = fs.readFileSync('transcript_line.txt', 'utf16le'); // PowerShell > outputs utf16le
try {
    const obj = JSON.parse(raw.trim());
    let output = '';
    if (obj.tool_calls && obj.tool_calls[0] && obj.tool_calls[0].response) {
        output = obj.tool_calls[0].response.output;
    } else {
        // sometimes it's nested differently
        output = JSON.stringify(obj);
    }
    
    // clean up lines
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
    fs.writeFileSync('clean_page.tsx', cleanContent.join('\n'), 'utf8');
    console.log("Done. Extracted " + cleanContent.length + " lines.");
} catch (e) {
    console.error(e);
}
