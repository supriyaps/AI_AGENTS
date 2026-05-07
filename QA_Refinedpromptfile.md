# 🧪 End-to-End QA Workflow — SauceDemo Checkout (SCRUM-101)
> Complete AI-Agent Prompt File | Playwright + MCP Servers | Natural Language Driven

---

## 📋 Application Under Test

| Field             | Value                                  |
|-------------------|----------------------------------------|
| **URL**           | https://www.saucedemo.com              |
| **Username**      | `standard_user`                        |
| **Password**      | `secret_sauce`                         |
| **Jira Story**    | SCRUM-101                              |
| **Feature**       | E-commerce Checkout Flow               |

---

## ✅ Acceptance Criteria

The following acceptance criteria must be satisfied before the story is considered done:

| AC#  | Acceptance Criterion                                                                 |
|------|--------------------------------------------------------------------------------------|
| AC-01 | User can log in with valid credentials and land on the products page               |
| AC-02 | User can add one or more products to the cart                                       |
| AC-03 | Cart displays correct product name, description, price, and quantity               |
| AC-04 | Checkout button navigates to the checkout information form                          |
| AC-05 | Submitting empty checkout form shows a validation error message                    |
| AC-06 | Submitting valid first name, last name, and zip code proceeds to order overview    |
| AC-07 | Order overview displays item list, payment info, shipping info, subtotal, tax, total|
| AC-08 | Clicking Finish on overview navigates to the order confirmation page               |
| AC-09 | Order confirmation page shows a success message and a Back Home button             |
| AC-10 | Back Home button returns the user to the products page                             |
| AC-11 | Cancel on checkout information page returns user to the cart                       |
| AC-12 | Cancel on order overview page returns user to the cart                             |
| AC-13 | Invalid or special character inputs show appropriate validation feedback            |
| AC-14 | Empty postal code prevents checkout from proceeding                                |

---

## 🗂️ STEP 1 — Read User Story & Summarise

**Prompt:**

```
I need to start a new QA workflow for SCRUM-101.

Please read the user story from:
  user-stories/SCRUM-101-ecommerce-checkout.md

Then summarise:
1. The key business requirement (what the user wants to achieve)
2. All acceptance criteria (AC-01 through AC-14)
3. The application URL and test credentials
4. The full testing scope (what is in scope and what is out of scope)
5. Any dependencies or preconditions

Present the output as a structured summary before we proceed to the next step.
```

**Expected Output:**
- Structured summary of the user story
- Numbered list of all acceptance criteria
- Application URL and credentials confirmed
- Defined test scope and any gaps identified

---

## 📄 STEP 2 — Create Comprehensive Test Plan

**Prompt:**

```
Based on user story SCRUM-101, use the playwright-test-planner agent to create a
comprehensive test plan.

Application URL: https://www.saucedemo.com
Credentials: standard_user / secret_sauce

The test plan MUST cover all of the following scenario categories:

─── HAPPY PATH SCENARIOS ──────────────────────────────────────────────────
HP-01: Successful end-to-end checkout with a single item
HP-02: Successful end-to-end checkout with multiple items
HP-03: Cart review — verify item name, description, price, and quantity
HP-04: Checkout information form — valid data submission
HP-05: Order overview — verify subtotal, tax, and total calculation
HP-06: Order completion — verify success message and Back Home navigation
HP-07: Continue Shopping — verify user returns to products page from cart

─── NEGATIVE SCENARIOS ────────────────────────────────────────────────────
NEG-01: Submit checkout form with all fields empty → expect validation error
NEG-02: Submit checkout form with First Name empty → expect validation error
NEG-03: Submit checkout form with Last Name empty → expect validation error
NEG-04: Submit checkout form with Zip/Postal Code empty → expect validation error
NEG-05: Enter special characters (!@#$%) in First Name field
NEG-06: Enter numeric-only value (123) in Last Name field
NEG-07: Enter a single character in Zip/Postal Code field
NEG-08: Attempt checkout with an empty cart (no items added)

─── EDGE CASE SCENARIOS ───────────────────────────────────────────────────
EDGE-01: Add maximum number of available products to cart and checkout
EDGE-02: Add a product, remove it from cart, re-add it and checkout
EDGE-03: Refresh the page mid-checkout and verify session state
EDGE-04: Navigate back using browser back button from overview page
EDGE-05: Enter very long strings (100+ characters) in checkout form fields
EDGE-06: Enter only whitespace/spaces in required fields
EDGE-07: Rapidly click the Finish button multiple times — check for duplicate orders
EDGE-08: Verify cart badge count updates correctly when items are added/removed

─── CANCELLATION FLOW ─────────────────────────────────────────────────────
CANCEL-01: Cancel from checkout information page → verify return to cart
CANCEL-02: Cancel from order overview page → verify return to cart
CANCEL-03: Verify no partial order is placed after cancellation

─── UI & NAVIGATION VALIDATION ────────────────────────────────────────────
UI-01: Verify all buttons are visible and clickable on each checkout page
UI-02: Verify breadcrumb / step indicator matches current checkout stage
UI-03: Verify page titles and headings are correct on each step
UI-04: Verify product image, name, and price render correctly in cart
UI-05: Verify the checkout form labels match the expected field names

For each test scenario include:
- Clear unique test case ID
- Test case title
- Preconditions
- Step-by-step instructions
- Expected result per step
- Test data requirements
- Screenshot checkpoints (where to capture evidence)

Save the test plan as: specs/saucedemo-checkout-test-plan.md
```

**Expected Output:**
- Complete test plan saved at specs/saucedemo-checkout-test-plan.md
- All 5 scenario categories covered
- Each test case has ID, title, steps, expected results, and screenshot markers
- Test data table included

---

## 🔍 STEP 3 — Perform Manual Exploratory Testing

**Prompt:**

```
Now perform manual exploratory testing for SCRUM-101 using Playwright MCP browser tools.

Read the test plan from: specs/saucedemo-checkout-test-plan.md

Execute all test scenarios from the plan manually:

1. Open https://www.saucedemo.com in the browser
2. For each test scenario:
   a. Follow the step-by-step instructions exactly as written
   b. Verify the actual result matches the expected result
   c. Mark the result as PASS or FAIL
   d. Take a screenshot at every defined screenshot checkpoint
   e. Document any unexpected behavior, UI inconsistency, or bug found

3. Screenshot checkpoints — MUST capture:
   - Login page (before login)
   - Products page (after successful login)
   - Cart page (with items added)
   - Checkout information page (empty form)
   - Checkout information page (validation error state)
   - Checkout information page (valid data filled)
   - Order overview / summary page
   - Order confirmation / success page
   - Any error state or unexpected behavior observed

4. Document findings:
   - Execution result (PASS/FAIL) per scenario
   - Actual vs Expected behaviour for any failure
   - List of all bugs or observations found
   - Screenshots saved as evidence in: screenshots/manual/

Save the exploratory testing results as: results/manual-exploratory-results.md
```

**Expected Output:**
- Manual execution results for all test scenarios
- Screenshots saved in screenshots/manual/
- PASS/FAIL status per test case
- List of bugs or observations with evidence
- Saved results file at results/manual-exploratory-results.md

---

## 🤖 STEP 4 — Generate Playwright Automation Scripts

**Prompt:**

```
Now create automated Playwright JavaScript test scripts for SCRUM-101.

Reference files:
1. Test plan: specs/saucedemo-checkout-test-plan.md
2. Exploratory results: results/manual-exploratory-results.md (for selectors & UI insights)

─── SCRIPT STRUCTURE ──────────────────────────────────────────────────────
Organise scripts into the following test suite files under tests/saucedemo-checkout/:

  tests/saucedemo-checkout/
  ├── happy-path.spec.js         → HP-01 to HP-07
  ├── negative-scenarios.spec.js → NEG-01 to NEG-08
  ├── edge-cases.spec.js         → EDGE-01 to EDGE-08
  ├── cancellation-flow.spec.js  → CANCEL-01 to CANCEL-03
  ├── ui-validation.spec.js      → UI-01 to UI-05
  └── helpers/
      └── checkout-helpers.js   → Reusable functions (login, addToCart, fillCheckout)

─── CODING REQUIREMENTS ───────────────────────────────────────────────────
All scripts must:
- Use @playwright/test with test() and expect()
- Use Page Object Model (POM) pattern
- Use stable selectors discovered during Step 3 exploratory testing
  (prefer: data-test attributes, IDs, roles over CSS class selectors)
- Include descriptive test names matching the test plan IDs
  e.g. test('HP-01: Successful checkout with single item', async ({ page }) => {})
- Add beforeEach() for common setup (login, navigation)
- Add afterEach() for cleanup and screenshot on failure
- Use proper Playwright wait strategies (waitForSelector, waitForURL, waitForLoadState)
- Use expect() assertions for every key verification step
- Add inline comments for complex steps
- Configure cross-browser: Chrome, Firefox, Safari

─── SCREENSHOT AUTOMATION ─────────────────────────────────────────────────
In all scripts, capture screenshots at these points:
- After login (products page loaded)
- After adding items to cart
- On cart review page
- On checkout information page (empty and filled states)
- On validation error state
- On order overview page
- On order confirmation page
- On any caught error or test failure → save to screenshots/automated/failures/

Use:
  await page.screenshot({ path: `screenshots/automated/${testId}-${stepName}.png`, fullPage: true });

─── SELF-HEALING CAPABILITY ───────────────────────────────────────────────
Implement self-healing locator strategy in helpers/checkout-helpers.js:

async function selfHealingLocator(page, selectors, label) {
  // Try each selector in priority order
  // Primary: data-test attribute
  // Fallback 1: ID selector
  // Fallback 2: role + name
  // Fallback 3: text content
  // If all fail: log warning and take screenshot before throwing
  for (const selector of selectors) {
    try {
      const el = page.locator(selector);
      await el.waitFor({ timeout: 3000 });
      return el;
    } catch {
      console.warn(`[Self-Heal] Selector failed: ${selector} for "${label}"`);
    }
  }
  await page.screenshot({ path: `screenshots/automated/heal-failure-${label}.png` });
  throw new Error(`[Self-Heal] All selectors failed for: ${label}`);
}

Apply selfHealingLocator() for all critical interactive elements:
- Login form inputs and button
- Add to Cart buttons
- Cart icon / shopping cart link
- Checkout button
- First Name, Last Name, Zip Code fields
- Continue and Finish buttons
- Error message container
- Order confirmation message

─── TEST DATA ─────────────────────────────────────────────────────────────
Define all test data in helpers/test-data.js:

  VALID_USER:   { username: 'standard_user', password: 'secret_sauce' }
  VALID_INFO:   { firstName: 'Test', lastName: 'User', zip: '12345' }
  INVALID_INFO: { firstName: '!@#$%', lastName: '123', zip: '' }
  EMPTY_INFO:   { firstName: '', lastName: '', zip: '' }
  LONG_STRING:  'A'.repeat(105)

After generating all scripts, run: npx playwright test tests/saucedemo-checkout/
to verify initial execution.
```

**Expected Output:**
- 5 test suite files + helpers created in tests/saucedemo-checkout/
- Self-healing locator utility in helpers/checkout-helpers.js
- Test data file at helpers/test-data.js
- Screenshots automated at defined checkpoints
- Initial test run completed

---

## 🔧 STEP 5 — Execute Tests & Self-Heal Failures

**Prompt:**

```
Execute all generated automation scripts and heal any failures for SCRUM-101.

Use the playwright-test-healer agent.

─── EXECUTION ─────────────────────────────────────────────────────────────
1. Run full test suite:
   npx playwright test tests/saucedemo-checkout/ --reporter=html,list

2. Identify all FAILED tests from the output

─── SELF-HEALING PROCESS ──────────────────────────────────────────────────
For each failing test:

a) DIAGNOSE the failure type:
   - Selector failure → element not found / changed attribute
   - Timing failure  → element not ready / race condition
   - Assertion failure → actual value differs from expected
   - Navigation failure → page did not load / URL mismatch

b) HEAL based on diagnosis:
   - Selector failure:
     * Inspect the page using Playwright's locator inspector
     * Update selfHealingLocator() with new working selector
     * Add the new selector as the primary, demote the old to fallback
   - Timing failure:
     * Replace hard waits with: waitForSelector, waitForURL, waitForLoadState
     * Increase timeout if genuinely slow-loading element
   - Assertion failure:
     * Verify actual app text/value vs expected value in test
     * Update assertion if app behaviour is intentional
     * Log as a bug if the app is wrong
   - Navigation failure:
     * Add waitForURL() after click actions
     * Verify the correct URL pattern

c) UPDATE the test script with the fix

d) RE-RUN the healed test individually to confirm it passes:
   npx playwright test tests/saucedemo-checkout/<file>.spec.js --grep "<test name>"

e) After all individual heals, run the FULL suite again to verify no regressions

─── DOCUMENTATION ─────────────────────────────────────────────────────────
Record for each healed test:
- Test ID and name
- Failure type (Selector / Timing / Assertion / Navigation)
- Root cause
- Healing action taken
- Before selector → After selector (if applicable)
- Final pass/fail status after healing

Save healing log as: results/healing-activities-log.md
```

**Expected Output:**
- All tests executed with HTML report generated
- Failing tests diagnosed and healed
- Updated test scripts with fixed selectors/waits
- Healing activities documented at results/healing-activities-log.md
- Full suite passing after healing

---

## 📊 STEP 6 — Generate Comprehensive Test Report

**Prompt:**

```
Create a comprehensive test execution report for SCRUM-101.

Compile results from:
- Step 3: results/manual-exploratory-results.md
- Step 4: Generated automation scripts (test names and IDs)
- Step 5: Playwright HTML report + results/healing-activities-log.md

Save the final report as: test-results/SCRUM-101-checkout-test-report.md

─── REPORT STRUCTURE ──────────────────────────────────────────────────────

## 1. Executive Summary
- Story: SCRUM-101 — Ecommerce Checkout
- Test Execution Date
- Tester / Agent
- Total test cases planned
- Total executed (manual + automated)
- Overall status: PASS / FAIL / BLOCKED
- Pass count | Fail count | Blocked count
- Recommendation: Ready for release / Not ready

## 2. Acceptance Criteria Coverage
| AC ID | Criterion | Covered By | Status |
For each AC-01 through AC-14 — map to test case ID(s) and pass/fail

## 3. Manual Test Results (Step 3)
| TC ID | Test Case Title | Status | Observations |
- Results from exploratory testing
- Screenshots referenced by filename
- Any bugs discovered

## 4. Automated Test Results (Step 5)
| TC ID | Suite File | Test Name | Initial Result | Healing Applied | Final Result |
- Per test suite: happy-path, negative, edge-cases, cancellation, ui-validation
- Pass/Fail count per suite
- Healing summary

## 5. Self-Healing Summary
- Total tests healed
- Breakdown by failure type (Selector / Timing / Assertion / Navigation)
- Healing success rate
- Any tests that could NOT be auto-healed (manual fix required)

## 6. Defects Log
For every failed test (manual or automated):

| Field            | Detail                     |
|------------------|----------------------------|
| Bug ID           | BUG-001, BUG-002 ...       |
| Severity         | Critical / High / Medium / Low |
| Title            |                            |
| Steps to Reproduce |                          |
| Expected Behaviour |                          |
| Actual Behaviour |                            |
| Screenshot       | path/to/screenshot.png     |
| Environment      | Browser / OS               |
| Status           | Open / Fixed / Deferred    |

## 7. Test Coverage Analysis
- Which acceptance criteria are fully covered
- Which have partial coverage
- Any gaps in coverage
- Coverage % = (Covered ACs / Total ACs) × 100

## 8. Screenshots Evidence Index
List all captured screenshots with:
- Screenshot filename
- Test case it belongs to
- Step at which it was captured

## 9. Summary and Recommendations
- Overall quality assessment
- Risk areas identified
- Test cases recommended for regression suite
- Suggested improvements to the application
- Next steps before release
```

**Expected Output:**
- Complete report saved at test-results/SCRUM-101-checkout-test-report.md
- AC coverage table filled for all 14 acceptance criteria
- All bugs documented with severity and evidence
- Healing summary included
- Clear release recommendation stated

---

## 🚀 STEP 7 — Commit & Push to GitHub Repository

**Git Repository URL:** `https://github.com/ravikaanthe/AgentE2EQAWorkflow-Playwright.git`

**Prompt:**

```
Commit and push all test artifacts to the remote GitHub repository using the GitHub
MCP agent.

Repository: https://github.com/ravikaanthe/AgentE2EQAWorkflow-Playwright.git

─── FILE STRUCTURE TO COMMIT ──────────────────────────────────────────────
Verify the following files and folders exist before committing:

  user-stories/
  └── SCRUM-101-ecommerce-checkout.md

  specs/
  └── saucedemo-checkout-test-plan.md

  tests/saucedemo-checkout/
  ├── happy-path.spec.js
  ├── negative-scenarios.spec.js
  ├── edge-cases.spec.js
  ├── cancellation-flow.spec.js
  ├── ui-validation.spec.js
  └── helpers/
      ├── checkout-helpers.js
      └── test-data.js

  screenshots/
  ├── manual/
  └── automated/
      └── failures/

  results/
  ├── manual-exploratory-results.md
  └── healing-activities-log.md

  test-results/
  └── SCRUM-101-checkout-test-report.md

  playwright.config.js
  package.json

─── GIT OPERATIONS ────────────────────────────────────────────────────────
1. Initialize Git if not already initialized:
   git init

2. Add remote origin (if not set):
   git remote add origin https://github.com/ravikaanthe/AgentE2EQAWorkflow-Playwright.git

3. Stage all files:
   git add .

4. Create commit with conventional commit message:
   git commit -m "feat(tests): Add complete E2E test suite for SCRUM-101 checkout workflow

   - Add user story documentation (SCRUM-101)
   - Add comprehensive test plan covering happy path, negative, edge cases,
     cancellation flow, and UI validation (33 test scenarios)
   - Add Playwright automation scripts for all test suites
   - Implement self-healing locator strategy in checkout-helpers.js
   - Add manual exploratory testing results with screenshots
   - Add healing activities log with diagnosis and fix details
   - Add full test execution report with AC coverage, defect log,
     and release recommendation

   Acceptance Criteria Covered: AC-01 through AC-14
   Resolves SCRUM-101"

5. Push to remote main branch:
   git push -u origin main

6. Confirm push was successful and provide:
   - Commit SHA
   - Branch pushed to
   - List of files committed
   - Link to repository
```

**Expected Output:**
- All artifacts committed with descriptive conventional commit message
- Successful push to remote GitHub repository confirmed
- Commit SHA and file list provided
- Repository URL confirmed

---

## 🖥️ COMPLETE SINGLE-PROMPT EXECUTION

> Use this single combined prompt to run the entire workflow end-to-end in one session.

**Prompt:**

```
I want to execute a complete end-to-end QA workflow for SCRUM-101 — SauceDemo
Ecommerce Checkout — using multiple AI agents and MCP servers.

Application: https://www.saucedemo.com
Credentials: standard_user / secret_sauce
Repository:  https://github.com/ravikaanthe/AgentE2EQAWorkflow-Playwright.git

Execute the following 7 steps sequentially and provide a status update after
completing each step before proceeding to the next.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 1 — READ USER STORY
Read user-stories/SCRUM-101-ecommerce-checkout.md and summarise the key
requirements, all 14 acceptance criteria, URL, credentials, and test scope.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 2 — CREATE TEST PLAN
Use playwright-test-planner agent to create a full test plan covering:
happy path (HP-01 to HP-07), negative scenarios (NEG-01 to NEG-08),
edge cases (EDGE-01 to EDGE-08), cancellation flow (CANCEL-01 to CANCEL-03),
and UI validation (UI-01 to UI-05).
Each test case must include ID, title, steps, expected results, test data,
and screenshot checkpoints.
Save as: specs/saucedemo-checkout-test-plan.md
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 3 — MANUAL EXPLORATORY TESTING
Read the test plan and use Playwright MCP browser tools to manually execute
every scenario. Capture screenshots at all defined checkpoints. Save findings
(PASS/FAIL per test, bugs, observations) in:
  results/manual-exploratory-results.md
  screenshots/manual/
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 4 — GENERATE AUTOMATION SCRIPTS
Use playwright-test-generator agent to create Playwright JS scripts for all
test suites using selectors discovered in Step 3. Implement:
- Page Object Model pattern
- Self-healing locator strategy with 4-level selector fallback
- Screenshot automation at key checkpoints and on failure
- Cross-browser config (Chrome, Firefox, Safari)
- beforeEach / afterEach hooks
Organise into: tests/saucedemo-checkout/ with helpers/ subfolder.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 5 — EXECUTE AND HEAL TESTS
Use playwright-test-healer agent to run all scripts. For each failing test:
diagnose the failure type, apply the appropriate heal (selector update,
wait strategy, assertion fix), re-run to verify, and log all healing activities.
Save healing log as: results/healing-activities-log.md
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 6 — GENERATE TEST REPORT
Compile a full report covering: AC coverage (AC-01 to AC-14), manual results,
automated results, self-healing summary, defects log with severity/evidence,
test coverage analysis, and a clear release recommendation.
Save as: test-results/SCRUM-101-checkout-test-report.md
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 7 — COMMIT AND PUSH TO GITHUB
Use the GitHub MCP agent to stage all artifacts, create a conventional commit
message referencing SCRUM-101, and push to:
https://github.com/ravikaanthe/AgentE2EQAWorkflow-Playwright.git
Confirm commit SHA and successful push.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

After each step, output:
  ✅ STEP [N] COMPLETE — [brief summary of what was done]
  ⏭️  Proceeding to STEP [N+1]...

Begin now with STEP 1.
```

---

## 📁 Expected Project File Structure

```
AgentE2EQAWorkflow-Playwright/
│
├── user-stories/
│   └── SCRUM-101-ecommerce-checkout.md
│
├── specs/
│   └── saucedemo-checkout-test-plan.md
│
├── tests/
│   └── saucedemo-checkout/
│       ├── happy-path.spec.js
│       ├── negative-scenarios.spec.js
│       ├── edge-cases.spec.js
│       ├── cancellation-flow.spec.js
│       ├── ui-validation.spec.js
│       └── helpers/
│           ├── checkout-helpers.js   ← self-healing locators
│           └── test-data.js          ← all test data constants
│
├── screenshots/
│   ├── manual/                        ← Step 3 evidence
│   └── automated/
│       └── failures/                  ← Step 5 failure captures
│
├── results/
│   ├── manual-exploratory-results.md
│   └── healing-activities-log.md
│
├── test-results/
│   └── SCRUM-101-checkout-test-report.md
│
├── playwright.config.js
└── package.json
```

---

## 🗺️ Test Coverage Matrix

| Test ID     | Category          | AC Covered         | Type       | Screenshot |
|-------------|-------------------|--------------------|------------|------------|
| HP-01       | Happy Path        | AC-02,04,06,07,08,09,10 | Automated | ✅ |
| HP-02       | Happy Path        | AC-02,03,07        | Automated  | ✅ |
| HP-03       | Happy Path        | AC-03              | Manual     | ✅ |
| HP-04       | Happy Path        | AC-05,06           | Automated  | ✅ |
| HP-05       | Happy Path        | AC-07              | Automated  | ✅ |
| HP-06       | Happy Path        | AC-08,09,10        | Automated  | ✅ |
| HP-07       | Happy Path        | AC-04              | Automated  | ✅ |
| NEG-01      | Negative          | AC-05              | Automated  | ✅ |
| NEG-02      | Negative          | AC-05              | Automated  | ✅ |
| NEG-03      | Negative          | AC-05              | Automated  | ✅ |
| NEG-04      | Negative          | AC-14              | Automated  | ✅ |
| NEG-05      | Negative          | AC-13              | Automated  | ✅ |
| NEG-06      | Negative          | AC-13              | Automated  | ✅ |
| NEG-07      | Negative          | AC-14              | Automated  | ✅ |
| NEG-08      | Negative          | AC-04              | Manual     | ✅ |
| EDGE-01     | Edge Case         | AC-02,07           | Automated  | ✅ |
| EDGE-02     | Edge Case         | AC-02,03           | Automated  | ✅ |
| EDGE-03     | Edge Case         | AC-06              | Manual     | ✅ |
| EDGE-04     | Edge Case         | AC-11,12           | Manual     | ✅ |
| EDGE-05     | Edge Case         | AC-13              | Automated  | ✅ |
| EDGE-06     | Edge Case         | AC-05,13           | Automated  | ✅ |
| EDGE-07     | Edge Case         | AC-08              | Manual     | ✅ |
| EDGE-08     | Edge Case         | AC-03              | Automated  | ✅ |
| CANCEL-01   | Cancellation      | AC-11              | Automated  | ✅ |
| CANCEL-02   | Cancellation      | AC-12              | Automated  | ✅ |
| CANCEL-03   | Cancellation      | AC-11,12           | Manual     | ✅ |
| UI-01       | UI Validation     | AC-04,06,08        | Automated  | ✅ |
| UI-02       | UI Validation     | AC-06,07           | Manual     | ✅ |
| UI-03       | UI Validation     | AC-01,04,07,08,09  | Manual     | ✅ |
| UI-04       | UI Validation     | AC-03              | Automated  | ✅ |
| UI-05       | UI Validation     | AC-05,06           | Manual     | ✅ |