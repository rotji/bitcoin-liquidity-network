/**
 * Jest configuration for TypeScript support using ts-jest.
 * Place this file at the project root to ensure Jest picks it up.
 * Docs: https://kulshekhar.github.io/ts-jest/docs/getting-started/
 */

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFilesAfterEnv: [],
  // Add global Jest types for TypeScript
  globals: {
    'ts-jest': {
      tsconfig: {
        types: ["jest"]
      }
    }
  },
  // Remove or relax coverage thresholds for now
  // coverageThreshold: undefined,
};
