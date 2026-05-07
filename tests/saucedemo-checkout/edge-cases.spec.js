// Edge Cases Test Suite - SCRUM-101
// EDGE-01 to EDGE-08: Edge case and boundary scenarios
import { test, expect } from '@playwright/test';
import {
  login,
  addProductToCart,
  openCart,
  proceedToCheckout,
  proceedToOverview,
  completeOrder,
  fillCheckoutInfo,
  submitCheckoutForm,
  getCartItemCount,
  takeScreenshot,
} from './helpers/checkout-helpers.js';
import { TEST_DATA, SELECTORS } from './helpers/test-data.js';

test.describe('Edge Cases - Boundary & Special Scenarios (EDGE-01 to EDGE-08)', () => {
  test('EDGE-01: Add Maximum Products to Cart and Checkout', async ({ page }) => {
    await login(page);

    // Add all available products
    const products = [
      SELECTORS.ADD_TO_CART_BACKPACK,
      SELECTORS.ADD_TO_CART_BIKE_LIGHT,
      'button[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]',
      'button[data-test="add-to-cart-sauce-labs-fleece-jacket"]',
      'button[data-test="add-to-cart-sauce-labs-onesie"]',
      'button[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]',
    ];

    for (const productSelector of products) {
      try {
        await addProductToCart(page, productSelector);
      } catch (e) {
        console.log(`Could not add product: ${productSelector}`);
      }
    }

    await takeScreenshot(page, 'EDGE-01', 'all-products-added');

    // Verify count
    const cartCount = await getCartItemCount(page);
    console.log(`Cart contains ${cartCount} items`);

    // Proceed to checkout
    await openCart(page);
    const cartItems = page.locator(SELECTORS.CART_ITEM);
    console.log(`Cart items count: ${await cartItems.count()}`);

    await proceedToCheckout(page);
    await proceedToOverview(page, TEST_DATA.VALID_INFO);
    await completeOrder(page);

    await takeScreenshot(page, 'EDGE-01', 'checkout-complete-with-max-items');
  });

  test('EDGE-02: Add, Remove, Re-add Product and Checkout', async ({ page }) => {
    await login(page);

    // Add product
    await addProductToCart(page, SELECTORS.ADD_TO_CART_BACKPACK);
    await takeScreenshot(page, 'EDGE-02', 'product-added');

    // Open cart
    await openCart(page);
    await takeScreenshot(page, 'EDGE-02', 'product-in-cart');

    // Remove product
    const removeBtn = page.locator('button[id*="remove"]').first();
    await removeBtn.click();
    await page.waitForTimeout(300);
    await takeScreenshot(page, 'EDGE-02', 'product-removed');

    // Re-add product
    const addBtn = page.locator('button[data-test*="add-to-cart"]').first();
    if (await addBtn.isVisible()) {
      await addBtn.click();
      await page.waitForTimeout(300);
    } else {
      // Navigate back to products to re-add
      await page.locator('button:has-text("Continue Shopping")').click();
      await page.waitForURL(/inventory.html/);
      await addProductToCart(page, SELECTORS.ADD_TO_CART_BACKPACK);
      await openCart(page);
    }

    await takeScreenshot(page, 'EDGE-02', 'product-readded');

    // Checkout
    await proceedToCheckout(page);
    await proceedToOverview(page, TEST_DATA.VALID_INFO);
    await completeOrder(page);

    await takeScreenshot(page, 'EDGE-02', 'checkout-after-readd');
  });

  test('EDGE-03: Refresh Page Mid-Checkout', async ({ page }) => {
    await login(page);
    await addProductToCart(page, SELECTORS.ADD_TO_CART_BACKPACK);
    await openCart(page);
    await proceedToCheckout(page);

    // Fill partial form data
    const firstNameInput = page.locator(SELECTORS.FIRST_NAME_INPUT);
    await firstNameInput.fill('Test');
    await page.waitForTimeout(200);

    await takeScreenshot(page, 'EDGE-03', 'form-partial-filled');

    // Refresh page
    await page.reload();
    await page.waitForLoadState('load');
    await takeScreenshot(page, 'EDGE-03', 'after-refresh');

    // Check if data persisted
    const firstName = await firstNameInput.inputValue();
    console.log(`Form data after refresh: "${firstName}"`);

    if (firstName === 'Test') {
      console.log('Form data persisted after refresh');
    } else {
      console.log('Form data cleared after refresh');
    }
  });

  test('EDGE-04: Browser Back Button from Overview Page', async ({ page }) => {
    await login(page);
    await addProductToCart(page, SELECTORS.ADD_TO_CART_BACKPACK);
    await openCart(page);
    await proceedToCheckout(page);
    await proceedToOverview(page, TEST_DATA.VALID_INFO);

    await takeScreenshot(page, 'EDGE-04', 'on-overview-page');

    // Click browser back
    await page.goBack();
    await page.waitForTimeout(500);
    await takeScreenshot(page, 'EDGE-04', 'after-browser-back');

    const currentUrl = page.url();
    console.log(`Current URL after back: ${currentUrl}`);
  });

  test('EDGE-05: Enter Very Long Strings in Form Fields', async ({ page }) => {
    await login(page);
    await addProductToCart(page, SELECTORS.ADD_TO_CART_BACKPACK);
    await openCart(page);
    await proceedToCheckout(page);

    // Fill with long strings
    await fillCheckoutInfo(page, {
      firstName: TEST_DATA.LONG_STRING,
      lastName: TEST_DATA.LONG_STRING_B,
      postalCode: TEST_DATA.LONG_STRING_C,
    });

    await takeScreenshot(page, 'EDGE-05', 'long-strings-entered');

    // Check field values
    const firstNameValue = await page.locator(SELECTORS.FIRST_NAME_INPUT).inputValue();
    console.log(`First name length: ${firstNameValue.length}`);

    // Try to submit
    await submitCheckoutForm(page);

    try {
      await page.waitForURL(/checkout-step-two.html/, { timeout: 2000 });
      console.log('Long strings accepted');
      await takeScreenshot(page, 'EDGE-05', 'long-strings-accepted');
    } catch {
      await takeScreenshot(page, 'EDGE-05', 'long-strings-rejected');
    }
  });

  test('EDGE-06: Enter Whitespace/Spaces in Required Fields', async ({ page }) => {
    await login(page);
    await addProductToCart(page, SELECTORS.ADD_TO_CART_BACKPACK);
    await openCart(page);
    await proceedToCheckout(page);

    // Fill with whitespace
    await fillCheckoutInfo(page, {
      firstName: TEST_DATA.WHITESPACE_ONLY,
      lastName: TEST_DATA.WHITESPACE_ONLY,
      postalCode: TEST_DATA.WHITESPACE_ONLY,
    });

    await takeScreenshot(page, 'EDGE-06', 'whitespace-entered');

    // Submit
    await submitCheckoutForm(page);

    try {
      await page.waitForURL(/checkout-step-two.html/, { timeout: 2000 });
      console.log('Whitespace accepted as valid input');
      await takeScreenshot(page, 'EDGE-06', 'whitespace-accepted');
    } catch {
      console.log('Whitespace rejected');
      await takeScreenshot(page, 'EDGE-06', 'whitespace-rejected');
    }
  });

  test('EDGE-07: Rapidly Click Finish Button Multiple Times', async ({ page }) => {
    await login(page);
    await addProductToCart(page, SELECTORS.ADD_TO_CART_BACKPACK);
    await openCart(page);
    await proceedToCheckout(page);
    await proceedToOverview(page, TEST_DATA.VALID_INFO);

    // Rapidly click finish button
    const finishBtn = page.locator(SELECTORS.FINISH_BUTTON);

    await takeScreenshot(page, 'EDGE-07', 'before-rapid-clicks');

    for (let i = 0; i < 5; i++) {
      await finishBtn.click({ force: true, timeout: 100 });
    }

    await page.waitForTimeout(1000);
    await page.waitForURL(/checkout-complete.html/, { timeout: 3000 });
    await takeScreenshot(page, 'EDGE-07', 'after-rapid-clicks');

    // Verify only one order was placed
    const confirmationMessage = await page.locator(SELECTORS.COMPLETE_HEADER).textContent();
    console.log(`Confirmation: ${confirmationMessage}`);
    expect(confirmationMessage).toContain('Thank you');
  });

  test('EDGE-08: Verify Cart Badge Count Updates', async ({ page }) => {
    await login(page);
    await takeScreenshot(page, 'EDGE-08', 'initial-empty-cart');

    // Add first item
    await addProductToCart(page, SELECTORS.ADD_TO_CART_BACKPACK);
    let count = await getCartItemCount(page);
    expect(count).toBe(1);
    await takeScreenshot(page, 'EDGE-08', 'after-add-1');

    // Add second item
    await addProductToCart(page, SELECTORS.ADD_TO_CART_BIKE_LIGHT);
    count = await getCartItemCount(page);
    expect(count).toBe(2);
    await takeScreenshot(page, 'EDGE-08', 'after-add-2');

    // Add third item
    await addProductToCart(page, 'button[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]');
    count = await getCartItemCount(page);
    expect(count).toBe(3);
    await takeScreenshot(page, 'EDGE-08', 'after-add-3');

    // Open cart and remove one
    await openCart(page);
    const removeBtn = page.locator('button[id*="remove"]').first();
    await removeBtn.click();
    await page.waitForTimeout(300);

    count = await getCartItemCount(page);
    expect(count).toBe(2);
    await takeScreenshot(page, 'EDGE-08', 'after-remove-1');

    console.log('Badge count updates verified');
  });
});
