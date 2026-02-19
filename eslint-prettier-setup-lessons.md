# ESLint and Prettier Setup: Lessons Learned

This document summarizes the challenges, solutions, and best practices for setting up ESLint and Prettier in this project. Use this as a reference for future projects to avoid common pitfalls and ensure a smooth setup.

---

## 1. Version Mismatches & Dependency Conflicts
- **Problem:** Peer dependency conflicts between ESLint 10.x and @typescript-eslint/eslint-plugin, @typescript-eslint/parser, eslint-plugin-react.
- **What Did Not Work:** Installing the latest versions without checking compatibility.
- **What Works:**
  - Uninstall all existing ESLint and related plugins.
  - Install ESLint 8.x and compatible plugin versions using:
    ```
    npm install --save-dev eslint@8 typescript @typescript-eslint/parser@6 @typescript-eslint/eslint-plugin@6 eslint-plugin-react@7 --legacy-peer-deps
    ```

## 2. Config File Confusion
- **Problem:** Using eslint.config.mjs (flat config) caused import errors and confusion.
- **What Did Not Work:** Mixing .eslintrc and eslint.config.mjs.
- **What Works:**
  - Delete eslint.config.mjs.
  - Use .eslintrc.json for configuration (widely supported and stable).

## 3. TypeScript and React Warnings
- **Problem:** Warnings about unsupported TypeScript version and missing React package.
- **What Did Not Work:** Ignoring these warnings can be confusing, but they do not block linting.
- **What Works:**
  - These are informational. Proceed unless you see real errors.

## 4. Prettier Integration
- **Problem:** Formatting errors and Prettier not working with ESLint.
- **What Did Not Work:** Not extending Prettier in ESLint config.
- **What Works:**
  - Install Prettier, eslint-config-prettier, eslint-plugin-prettier.
  - Add to .eslintrc.json:
    ```json
    "extends": [
      ...
      "plugin:prettier/recommended"
    ],
    "plugins": [
      ...
      "prettier"
    ],
    "rules": {
      "prettier/prettier": "error"
    }
    ```

## 5. Formatting Issues
- **Problem:** Hundreds of Prettier errors (line endings, etc.).
- **What Works:**
  - Run:
    ```
    npx prettier --write .
    ```
  - This auto-formats the entire codebase and resolves all errors.

## 6. CI/CD Integration
- **Problem:** Workflow failed because YAML file was not formatted.
- **What Works:**
  - Format workflow files with Prettier.
  - Use a workflow like .github/workflows/lint-and-format.yml to automate lint and format checks on every push/PR.

---

## Best Practices
- Always check plugin compatibility before installing/upgrading ESLint or Prettier.
- Use .eslintrc.json for config unless you have a strong reason to use flat config.
- Integrate Prettier with ESLint for unified error reporting.
- Run Prettier on all files, including workflow YAMLs.
- Set up CI/CD for lint and format early in the project.
- Document what works and what does not for your team and future self.

---

_This guide was created after real-world troubleshooting and is intended to save time and frustration in future projects._
