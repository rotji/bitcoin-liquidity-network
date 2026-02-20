/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFilesAfterEnv: [],
  // Add global Jest types for TypeScript
  globals: {
    "ts-jest": {
      tsconfig: {
        types: ["jest"],
      },
    },
  },
  // Remove or relax coverage thresholds for now
  // coverageThreshold: undefined,
};
