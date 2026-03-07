// engine/config.ts
// User preferences and orchestrator configuration

export interface UserConfig {
  autoExecute: boolean; // If true, executor runs without confirmation
  modules: string[];   // List of enabled modules (observer, evaluator, planner, executor)
  aiFeedback: boolean; // Enable AI feedback loop
  reportFormat: 'txt' | 'json';
}

export const defaultConfig: UserConfig = {
  autoExecute: false,
  modules: ['observer', 'evaluator', 'planner', 'executor'],
  aiFeedback: false,
  reportFormat: 'txt',
};

export function loadUserConfig(): UserConfig {
  // In a real app, load from file or env
  // For now, return default
  return defaultConfig;
}
