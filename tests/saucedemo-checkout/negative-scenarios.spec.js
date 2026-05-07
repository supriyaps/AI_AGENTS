// Negative Scenarios Test Suite - SCRUM-101
// NEG-01 to NEG-08: Negative and validation scenarios
import { test, expect } from '@playwright/test';
import {
  login,
  addProductToCart,
  openCart,
  proceedToCheckout,
  fillCheckoutInfo,
  submitCheckoutForm,
  verifyCheckoutError,
  takeScreenshot,
} from './helpers/checkout-helpers.js';
import { TEST_DATA, SELECTORS } from './helpers/test-data.js';

test.describe('Negative Scenarios - Validation (NEG-01 to NEG-08)', () => {
  test.beforeEach(async ({ page }) => {
    // Setup: Login and add item
    await login(page);
    await addProductToCart(page, SELECTORS.ADD_TO_CART_BACKPACK);
    await openCart(page);
    await proceedToCheckout(page);
  });

  test('NEG-01: Submit Checkout Form with All Fields Empty', async ({ page }) => {
    // Try to submit with no data
    await submitCheckoutForm(page);

    // Verify error
    const errorMsg = await verifyCheckoutError(page);
    expect(errorMsg).toContain('required');
    await takeScreenshot(page, 'NEG-01', 'all-fields-empty-error');
  });

  test('NEG-02: Submit with First Name Empty', async ({ page }) => {
    // Fill only Last Name and Postal Code
    await fillCheckoutInfo(page, {
      firstName: '',
      lastName: 'User',
      postalCode: '12345',
    });

    await submitCheckoutForm(page);
    const errorMsg = await verifyCheckoutError(page);
    expect(errorMsg).toContain('First Name');
    await takeScreenshot(page, 'NEG-02', 'first-name-empty-error');
  });

  test('NEG-03: Submit with Last Name Empty', async ({ page }) => {
    // Fill First Name and Postal Code only
    await fillCheckoutInfo(page, {
      firstName: 'Test',
      lastName: '',
      postalCode: '12345',
    });

    await submitCheckoutForm(page);
    const errorMsg = await verifyCheckoutError(page);
    expect(errorMsg).toContain('Last Name');
    await takeScreenshot(page, 'NEG-03', 'last-name-empty-error');
  });

  test('NEG-04: Submit with Postal Code Empty', async ({ page }) => {
    // Fill First Name and Last Name only
    await fillCheckoutInfo(page, {
      firstName: 'Test',
      lastName: 'User',
      postalCode: '',
    });

    await submitCheckoutForm(page);
    const errorMsg = await verifyCheckoutError(page);
    expect(errorMsg).toContain('Postal Code');
    await takeScreenshot(page, 'NEG-04', 'postal-code-empty-error');
  });

  test('NEG-05: Enter Special Characters in First Name', async ({ page }) => {
    // Enter special characters
    await fillCheckoutInfo(page, {
      firstName: '!@#$%',
      lastName: 'User',
      postalCode: '12345',
    });

    await takeScreenshot(page, 'NEG-05', 'special-chars-entered');

    // Submit and observe behavior
    await submitCheckoutForm(page);

    // Check if form accepted or rejected
    try {
      await page.waitForURL(/checkout-step-two.html/, { timeout: 2000 });
      console.log('App accepted special characters');
      await takeScreenshot(page, 'NEG-05', 'special-chars-accepted');
    } catch {
      // Form rejected - check for error
      const errorMsg = await page.locator(SELECTORS.ERROR_MESSAGE).textContent();
      console.log(`App rejected with: ${errorMsg}`);
      await takeScreenshot(page, 'NEG-05', 'special-chars-rejected');
    }
  });

  test('NEG-06: Enter Numeric Value in Last Name', async ({ page }) => {
    // Enter numeric-only last name
    await fillCheckoutInfo(page, {
      firstName: 'Test',
      lastName: '123',
      postalCode: '12345',
    });

    await takeScreenshot(page, 'NEG-06', 'numeric-last-name-entered');

    // Submit
    await submitCheckoutForm(page);

    try {
      await page.waitForURL(/checkout-step-two.html/, { timeout: 2000 });
      console.log('App accepted numeric last name');
      await takeScreenshot(page, 'NEG-06', 'numeric-accepted');
    } catch {
      const errorMsg = await page.locator(SELECTORS.ERROR_MESSAGE).textContent();
      console.log(`App rejected with: ${errorMsg}`);
      await takeScreenshot(page, 'NEG-06', 'numeric-rejected');
    }
  });

  test('NEG-07: Enter Single Character in Postal Code', async ({ page }) => {
    // Enter single character postal code
    await fillCheckoutInfo(page, {
      firstName: 'Test',
      lastName: 'User',
      postalCode: '1',
    });

    await takeScreenshot(page, 'NEG-07', 'single-char-postal-code');

    // Submit
    await submitCheckoutForm(page);

    try {
      await page.waitForURL(/checkout-step-two.html/, { timeout: 2000 });
      console.log('App accepted single char postal code');
      await takeScreenshot(page, 'NEG-07', 'single-char-accepted');
    } catch {
      const errorMsg = await page.locator(SELECTORS.ERROR_MESSAGE).textContent();
      console.log(`App rejected with: ${errorMsg}`);
      await takeScreenshot(page, 'NEG-07', 'single-char-rejected');
    }
  });

  test('NEG-08: Attempt Checkout with Empty Cart', async ({ page }) => {
    // Remove item from cart first
    await page.goBack();
    await page.waitForURL(/cart.html/);

    const removeButton = page.locator('button[id*="remove"]').first();
    if (await removeButton.isVisible()) {
      await removeButton.click();
      await page.waitForTimeout(300);
    }

    await takeScreenshot(page, 'NEG-08', 'empty-cart');

    // Try to proceed to checkout
    const checkoutBtn = page.locator(SELECTORS.CHECKOUT_BUTTON);
    const isCheckoutEnabled = await checkoutBtn.isEnabled();

    if (isCheckoutEnabled) {
      console.log('Checkout button enabled with empty cart');
      await checkoutBtn.click();
      await takeScreenshot(page, 'NEG-08', 'checkout-with-empty-cart');
    } else {
      console.log('Checkout button disabled with empty cart');
      await takeScreenshot(page, 'NEG-08', 'checkout-disabled');
    }
  });
});
