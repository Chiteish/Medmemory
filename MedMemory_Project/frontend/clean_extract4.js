const fs = require('fs');

const raw = fs.readFileSync('raw_transcript.txt', 'utf16le');
const lines = raw.split('\n');

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

fs.writeFileSync('src/app/page.tsx', cleanContent.join('\n'), 'utf8');
console.log("Done. Extracted " + cleanContent.length + " lines and restored to src/app/page.tsx");
