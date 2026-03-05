import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const backendFilePath = path.join(
  __dirname,
  "../backend/src/main.ts" // or server.ts if that's your entry file
);

console.log("🔎 Reading backend file...\n");

const content = fs.readFileSync(backendFilePath, "utf-8");

console.log(content);


let report = "ENGINEERING REPORT\n";
report += "===================\n\n";
if (!content.includes("try") || !content.includes("catch")) {
  report += "⚠️ No error handling detected in backend routes.\n";
  console.log("⚠️ WARNING: No error handling detected in backend routes.");
} else {
  report += "✅ Error handling detected in backend routes.\n";
  console.log("✅ Error handling detected.");
}


// --- Frontend Analysis ---
const frontendFilePath = path.join(__dirname, "../frontend/bitcoin liquidity network/src/App.tsx");
let frontendContent = "";
try {
  frontendContent = fs.readFileSync(frontendFilePath, "utf-8");
  report += "\nFRONTEND ANALYSIS\n";
  report += "=================\n\n";
  // Simple rule: check if useEffect exists
  if (!frontendContent.includes("useEffect")) {
    report += "⚠️ No useEffect detected in App.tsx.\n";
    console.log("⚠️ WARNING: No useEffect detected in App.tsx.");
  } else {
    report += "✅ useEffect detected in App.tsx.\n";
    console.log("✅ useEffect detected in App.tsx.");
  }
} catch (err) {
  report += "\nFRONTEND ANALYSIS\n";
  report += "=================\n\n";
  report += "⚠️ Could not read App.tsx for analysis.\n";
  console.log("⚠️ Could not read App.tsx for analysis.");
}


// --- Engineering Score ---
let score = 0;
// Backend scoring
if (content.includes("try") && content.includes("catch")) score += 25;
if (content.includes("async")) score += 25;
// Frontend scoring
if (frontendContent.includes("useEffect")) score += 25;
if (frontendContent.includes("fetch")) score += 25;

report += "\nENGINEERING SCORE\n";
report += "=================\n\n";
report += `Score: ${score} / 100\n`;


// --- Score History Tracking ---
const historyPath = path.join(__dirname, "history.json");
let history = [];
if (fs.existsSync(historyPath)) {
  const existing = fs.readFileSync(historyPath, "utf-8");
  history = JSON.parse(existing);
}
history.push({
  date: new Date().toISOString(),
  score
});
fs.writeFileSync(historyPath, JSON.stringify(history, null, 2));


// --- AI Prompt Generation ---
const aiPromptPath = path.join(__dirname, "ai_prompt.txt");

let aiPrompt = `
You are a senior software architect.

Analyze the following full-stack project files and suggest improvements in:

1. Code structure
2. Error handling
3. Performance
4. Security
5. Scalability

BACKEND FILE:
-------------
${content}

FRONTEND FILE:
--------------
${frontendContent}

Respond with structured recommendations.
`;

fs.writeFileSync(aiPromptPath, aiPrompt);

const reportPath = path.join(__dirname, "report.txt");
fs.writeFileSync(reportPath, report);

console.log("📄 Report generated at /engine/report.txt");
console.log("📝 AI prompt generated at /engine/ai_prompt.txt");