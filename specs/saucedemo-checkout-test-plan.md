# SauceDemo Checkout Test Plan

## User Story
SCRUM-101: As a customer, I want to complete my purchase through a checkout process so that I can order products online.

## Application Under Test
- URL: https://www.saucedemo.com
- Test credentials: `standard_user` / `secret_sauce`

## Test Scope
Cover the end-to-end ecommerce checkout flow from product selection through order confirmation, including validations, navigation, and error handling.

## Test Data
- Username: `standard_user`
- Password: `secret_sauce`
- First Name: `Test`
- Last Name: `User`
- Zip / Postal Code: `12345`
- Invalid First Name: `!@#$%`
- Invalid Last Name: `123`
- Invalid Postal Code: `` (empty)

## Test Scenarios

### Scenario 1: Cart Review and Checkout Start
**Objective:** Verify a logged-in user can review cart items and begin checkout.

Steps:
1. Open the application URL.
2. Log in with standard_user / secret_sauce.
3. Add at least one product to the cart.
4. Open the shopping cart.
5. Verify cart item details (name, description, price, quantity).
6. Verify total price calculation is visible.
7. Verify buttons for "Continue Shopping" and "Checkout" are present.

Expected Results:
- User is logged in and navigated to the products page.
- Selected item appears in the cart with correct name, description, and price.
- Total price / summary is displayed.
- Checkout button is available.

### Scenario 2: Checkout Information Validation
**Objective:** Validate required checkout fields and error messages.

Steps:
1. From the cart page, click "Checkout".
2. Leave First Name, Last Name, and Zip/Postal Code empty.
3. Click "Continue".
4. Verify the required field error message is displayed.
5. Enter valid checkout information.
6. Click "Continue" again.

Expected Results:
- The checkout information page displays inputs for First Name, Last Name, and Zip/Postal Code.
- Submission with missing required data shows a validation error and prevents progress.
- Valid data allows navigation to the checkout overview page.

### Scenario 3: Order Overview Verification
**Objective:** Confirm the checkout overview displays summary details before order completion.

Steps:
1. On the checkout information page, enter valid First Name, Last Name, and Zip/Postal Code.
2. Click "Continue".
3. Verify the checkout overview page displays:
   - Order item list and item details.
   - Payment information label.
   - Shipping information label.
   - Subtotal, tax, and total amount.
   - "Cancel" and "Finish" buttons.

Expected Results:
- Overview page shows full order summary and payment/shipping details.
- Pricing information is visible and presented clearly.
- Cancellation and finish actions are available.

### Scenario 4: Order Completion
**Objective:** Complete checkout and verify order confirmation.

Steps:
1. From the checkout overview page, click "Finish".
2. Verify redirection to the order confirmation page.
3. Confirm success message text appears.
4. Confirm the "Back Home" button is displayed and returns user to the products page.

Expected Results:
- The order confirmation page loads.
- Success message confirms order completion.
- Back Home button returns to products view.

### Scenario 5: Checkout Cancellation Flow
**Objective:** Verify checkout can be canceled and user is returned to the cart.

Steps:
1. From the cart page, click "Checkout".
2. On the checkout information page, click "Cancel".
3. Verify user is returned to the cart page.
4. Repeat checkout and proceed to overview.
5. On the overview page, click "Cancel".
6. Verify user is returned to the cart.

Expected Results:
- Cancel returns user to the cart page from both checkout information and overview steps.
- No checkout progress is completed.

### Scenario 6: Error Handling for Invalid Input
**Objective:** Validate the checkout form rejects incomplete or invalid input.

Steps:
1. Start checkout from cart.
2. Enter invalid input values, such as special characters or incomplete postal code.
3. Click "Continue".
4. Observe validation behavior.

Expected Results:
- Invalid or empty fields should prevent progress if required.
- Appropriate validation messaging is displayed for missing input.
- The checkout system enforces mandatory fields.

## Reporting and Evidence
- Capture screenshots at key workflow points:
  - Login success
  - Cart review page
  - Checkout validation error
  - Overview summary
  - Order confirmation
- Document findings and any unexpected UI behavior in the manual exploratory results.
