const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, 'frontend', 'app');

const newBackground = `
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
                    <div className="absolute -top-[20%] -right-[10%] w-[70%] h-[140%] bg-secondary rounded-full blur-[120px] mix-blend-overlay"></div>
                    <div className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[120%] bg-primary-foreground rounded-full blur-[100px] mix-blend-overlay"></div>
                </div>
                
                <div className="container mx-auto px-6 relative z-10`;

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walkDir(fullPath, callback);
        } else {
            callback(fullPath);
        }
    });
}

let modifiedCount = 0;

walkDir(targetDir, (filePath) => {
    if (!filePath.endsWith('page.tsx')) return;
    if (filePath.includes('dewan-dosen')) return;

    let content = fs.readFileSync(filePath, 'utf8');
    
    // Non-greedy regex matching ONLY the first hero section block that is typically at the top of the file
    // We look for: <(section|div) className="...bg-primary...overflow-hidden..."> ... [any content inside] ... <div className="container mx-auto px-6 relative z-10
    // Using ? to make it non-greedy
    const regex = /(<\s*(?:section|div)\s+className="[^"]*bg-primary[^"]*overflow-hidden[^"]*"\s*>)([\s\S]*?)(<\s*div\s+className="container mx-auto px-6 relative z-10)/;
    
    const match = content.match(regex);
    if (match) {
        // match[0] is the entire regex match
        // match[1] is the opening <section> or <div> tag
        // match[2] is the existing decorations inside the hero
        // match[3] is the <div className="container mx-auto px-6 relative z-10

        // Only replace if this match is somewhere in the first half of the file (to ensure it's the hero)
        const matchIndex = content.indexOf(match[0]);
        if (matchIndex < content.length / 2) {
            
            // Reconstruct the new content for just THIS match
            const replacement = match[1] + newBackground;
            content = content.replace(regex, replacement);
            
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated hero background in: ${filePath}`);
            modifiedCount++;
        }
    }
});

console.log(`Total files updated: ${modifiedCount}`);
