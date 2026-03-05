export function analyzeBackend(content: string): string {
  if (!content.includes("try") || !content.includes("catch")) {
    return "⚠️ No error handling detected in backend routes.";
  } else {
    return "✅ Error handling detected in backend routes.";
  }
}

export function analyzeFrontend(content: string): string {
  if (!content) return "⚠️ Could not read App.tsx for analysis.";
  if (!content.includes("useEffect")) {
    return "⚠️ No useEffect detected in App.tsx.";
  } else {
    return "✅ useEffect detected in App.tsx.";
  }
}

export function calculateScore(backend: string, frontend: string): number {
  let score = 0;
  if (backend.includes("try") && backend.includes("catch")) score += 25;
  if (backend.includes("async")) score += 25;
  if (frontend.includes("useEffect")) score += 25;
  if (frontend.includes("fetch")) score += 25;
  return score;
}
