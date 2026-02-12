## When to Add or Update Tests

- **When adding new features:** Write tests for new business logic, entities, or workflows.
- **When fixing bugs:** Add or update tests to cover the bug scenario and prevent regressions.
- **When refactoring code:** Update tests to match new logic and ensure nothing breaks.
- **When requirements change:** Adjust or add tests to reflect new business rules or behaviors.
- **When integrating with new systems:** Add integration tests for new adapters, APIs, or services.
- **When coverage is low:** Periodically review test coverage and add tests for untested critical paths.

**Tip:** Treat tests as living documentation—keep them up to date as your code and requirements evolve.

# Tests Guide: What and How to Test in Stack-Agnostic Foundation Projects

## Why Testing Matters

- **Quality assurance:** Prevents bugs and regressions.
- **Documentation:** Tests describe how your system is supposed to work.
- **Refactoring safety:** Enables safe changes and improvements.
- **Ecosystem trust:** Well-tested code is easier for others to use and extend.

## Types of Tests

1. **Unit Tests**
   - Test individual functions, classes, or modules in isolation.
   - Fast, focused, and easy to debug.

2. **Integration Tests**
   - Test how multiple modules or components work together.
   - Use real or mock adapters to simulate external systems.

3. **End-to-End (E2E) Tests**
   - Simulate real user flows through the entire system (frontend, backend, database).
   - Catch issues that only appear in full workflows.

4. **Contract/Interface Tests**
   - Ensure that interfaces (ports/adapters) are respected and implementations are swappable.

5. **Regression Tests**
   - Prevent previously fixed bugs from reappearing.

6. **Entities & Value Objects**
   - Do they enforce the rules and constraints you expect?
   - Can they be created, updated, and validated correctly?

7. **Business Logic (Use Cases)**
   - Does each use case do what it’s supposed to do, given valid and invalid inputs?
   - Are all business rules and workflows enforced?

8. **Interfaces/Ports**
   - Does your core logic interact with external systems (DB, APIs) only through defined interfaces?
   - Can you swap implementations without breaking the core logic?

9. **Adapters**
   - Do your adapters correctly translate between the core logic and external systems?
   - Are errors and edge cases handled?

10. **Integration Points**
    - Do the different parts of your system work together as expected?
    - Are data and control flows correct from end to end?

---

## How to Decide What to Test First

- **Test the most critical and risky parts first.**
- **Automate tests for anything that could break silently.**
- **Prioritize business rules, then edge cases, then integrations.**

- **Start with the most critical business rules:** What must never go wrong? (e.g., money transfers, user permissions)
- **Test the “happy path” first:** Does the system work as intended with valid input?
- **Add tests for edge cases and errors:** What happens with invalid input, missing data, or failures?
- **Test boundaries:** Can you swap out a database or API without breaking the core?

---

## Best Practices for Maintainable Tests

- **Keep tests independent:** Each test should set up and clean up its own data.
- **Use descriptive names:** Test names should describe the scenario and expected outcome.
- **Avoid testing implementation details:** Focus on behavior, not private methods.
- **Review and update tests as code evolves:** Outdated tests can be as harmful as no tests.
- **Run tests automatically:** Use CI/CD pipelines to run tests on every commit.

- **Tests are safety nets:** They catch mistakes before users do.
- **Tests clarify intent:** They show what the code is supposed to do.
- **Tests enable change:** You can refactor or add features without fear.

---

## Simple Template for Any Project

1. “If I change this, what could break?”
2. “What must always be true for this to work?”
3. “What’s the worst thing that could happen if this fails?”
4. “What’s the simplest way to prove this works?”

If you answer these questions, you’ll know what to test—no matter the project or stack.
