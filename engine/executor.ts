import fs from "fs";
import path from "path";

// Example: Add a try/catch block to a backend route if missing
export function addErrorHandlingToBackend(baseDir: string): string {
  const backendFilePath = path.join(baseDir, "../backend/src/main.ts");
  if (!fs.existsSync(backendFilePath)) {
    return "Backend file not found.";
  }
  let content = fs.readFileSync(backendFilePath, "utf-8");
  if (content.includes("try") && content.includes("catch")) {
    return "Error handling already present in backend.";
  }
  // This is a simple example: wrap the first route handler in try/catch
  const routeRegex = /(app\.get\([^,]+,[^\{]+\{)([\s\S]*?)(\}\)\s*;)/m;
  const match = content.match(routeRegex);
  if (match) {
    const before = match[1];
    const body = match[2];
    const after = match[3];
    const newBody = `\n  try {${body}\n  } catch (error) {\n    console.error(error);\n    res.status(500).json({ error: 'Internal Server Error' });\n  }\n`;
    content = content.replace(routeRegex, before + newBody + after);
    fs.writeFileSync(backendFilePath, content);
    return "Added try/catch error handling to the first backend route.";
  }
  return "No suitable route found to add error handling.";
}
