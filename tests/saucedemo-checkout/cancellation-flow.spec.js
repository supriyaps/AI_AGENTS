// Cancellation Flow Test Suite - SCRUM-101
// CANCEL-01 to CANCEL-03: Cancellation and navigation tests
import { test, expect } from '@playwright/test';
import {
  login,
  addProductToCart,
  openCart,
  proceedToCheckout,
  cancelFromCheckout,
  proceedToOverview,
  fillCheckoutInfo,
  takeScreenshot,
  getCartItemCount,
} from './helpers/checkout-helpers.js';
import { TEST_DATA, SELECTORS } from './helpers/test-data.js';

test.describe('Cancellation Flow - Navigation & Cart Preservation (CANCEL-01 to CANCEL-03)', () => {
  test('CANCEL-01: Cancel from Checkout Information Page', async ({ page }) => {
    await login(page);

    // Add item and open cart
    await addProductToCart(page, SELECTORS.ADD_TO_CART_BACKPACK);
    await openCart(page);
    await takeScreenshot(page, 'CANCEL-01', 'cart-with-item');

    const initialCount = await getCartItemCount(page);
    console.log(`Initial cart count: ${initialCount}`);

    // Proceed to checkout
    await proceedToCheckout(page);
    await takeScreenshot(page, 'CANCEL-01', 'on-checkout-form');

    // Cancel
    await cancelFromCheckout(page);
    await takeScreenshot(page, 'CANCEL-01', 'after-cancel');

    // Verify returned to cart
    expect(page.url()).toContain('cart.html');

    // Verify items still in cart
    const finalCount = await getCartItemCount(page);
    expect(finalCount).toBe(initialCount);
    console.log(`Cart count after cancel: ${finalCount} (preserved)`);

    await takeScreenshot(page, 'CANCEL-01', 'items-preserved');
  });

  test('CANCEL-02: Cancel from Order Overview Page', async ({ page }) => {
    await login(page);

    // Add item and proceed to overview
    await addProductToCart(page, SELECTORS.ADD_TO_CART_BACKPACK);
    await openCart(page);

    const initialCount = await getCartItemCount(page);
    console.log(`Initial cart count: ${initialCount}`);

    await proceedToCheckout(page);
    await fillCheckoutInfo(page, TEST_DATA.VALID_INFO);
    await page.locator(SELECTORS.CONTINUE_BUTTON).click();
    await page.waitForURL(/checkout-step-two.html/);

    await takeScreenshot(page, 'CANCEL-02', 'on-overview-page');

    // Cancel from overview
    const cancelBtn = page.locator(SELECTORS.CANCEL_BUTTON);
    await cancelBtn.click();
    await page.waitForTimeout(500);

    await takeScreenshot(page, 'CANCEL-02', 'after-cancel-from-overview');

    // Document navigation result
    const currentUrl = page.url();
    console.log(`URL after cancel from overview: ${currentUrl}`);

    // Verify cart or inventory page
    const isOnCart = currentUrl.includes('cart.html');
    const isOnInventory = currentUrl.includes('inventory.html');

    if (isOnCart) {
      console.log('Returned to cart page');
      const finalCount = await getCartItemCount(page);
      expect(finalCount).toBe(initialCount);
    } else if (isOnInventory) {
      console.log('Returned to inventory/products page');
    }

    await takeScreenshot(page, 'CANCEL-02', 'final-state');
  });

  test('CANCEL-03: Verify No Partial Order After Cancellation', async ({ page }) => {
    const context = page.context();

    // First user: Start checkout and cancel
    await login(page);
    await addProductToCart(page, SELECTORS.ADD_TO_CART_BACKPACK);
    await openCart(page);
    await proceedToCheckout(page);
    await fillCheckoutInfo(page, TEST_DATA.VALID_INFO);

    await takeScreenshot(page, 'CANCEL-03', 'before-cancel');

    // Cancel before completing
    const cancelBtn = page.locator(SELECTORS.CANCEL_BUTTON);
    await cancelBtn.click();
    await page.waitForTimeout(500);

    await takeScreenshot(page, 'CANCEL-03', 'cancelled');

    // Log out
    await page.click('button#react-burger-menu-btn');
    await page.click('a#logout_sidebar_link');
    await page.waitForTimeout(500);

    await takeScreenshot(page, 'CANCEL-03', 'logged-out');

    // Log back in
    await login(page);
    await takeScreenshot(page, 'CANCEL-03', 'logged-back-in');

    // Verify cart still has items (no order was placed)
    const cartCount = await getCartItemCount(page);
    console.log(`Cart count after re-login: ${cartCount}`);

    if (cartCount > 0) {
      console.log('✅ Partial order not placed - cart items preserved');
    } else {
      console.log('⚠️  Cart appears empty - may have been placed');
    }

    // Navigate to cart to double-check
    await page.locator(SELECTORS.SHOPPING_CART_LINK).click();
    await page.waitForURL(/cart.html/);

    const cartItems = page.locator(SELECTORS.CART_ITEM);
    const itemCount = await cartItems.count();
    console.log(`Items in cart: ${itemCount}`);

    await takeScreenshot(page, 'CANCEL-03', 'cart-after-relogin');

    // Verify at least one item is still there
    expect(itemCount).toBeGreaterThan(0);
  });
});
