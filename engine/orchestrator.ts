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