// Happy Path Test Suite - SCRUM-101
// HP-01 to HP-07: Positive checkout scenarios
import { test, expect } from '@playwright/test';
import {
  login,
  addProductToCart,
  openCart,
  proceedToCheckout,
  proceedToOverview,
  verifyOrderOverview,
  completeOrder,
  verifyOrderConfirmation,
  returnToHome,
  cancelFromCheckout,
  fillCheckoutInfo,
  takeScreenshot,
} from './helpers/checkout-helpers.js';
import { TEST_DATA, SELECTORS } from './helpers/test-data.js';

test.describe('Happy Path - Checkout Scenarios (HP-01 to HP-07)', () => {
  test.beforeEach(async ({ page }) => {
    // Setup: Login before each test
    await login(page);
    await takeScreenshot(page, 'HP-beforeEach', 'logged-in');
  });

  test('HP-01: Successful End-to-End Checkout with Single Item', async ({ page }) => {
    // Add single item
    await addProductToCart(page, SELECTORS.ADD_TO_CART_BACKPACK);
    await takeScreenshot(page, 'HP-01', 'item-added');

    // Proceed to checkout
    await openCart(page);
    await takeScreenshot(page, 'HP-01', 'cart-page');

    await proceedToCheckout(page);
    await takeScreenshot(page, 'HP-01', 'checkout-form');

    // Complete checkout
    await proceedToOverview(page, TEST_DATA.VALID_INFO);
    await takeScreenshot(page, 'HP-01', 'overview-page');

    // Verify confirmation
    await page.locator(SELECTORS.FINISH_BUTTON).click();
    await page.waitForURL(/checkout-complete.html/);
    await verifyOrderConfirmation(page);
    await takeScreenshot(page, 'HP-01', 'confirmation-page');

    // Verify success message
    const confirmMsg = await page.locator(SELECTORS.COMPLETE_HEADER).textContent();
    expect(confirmMsg).toContain('Thank you');
  });

  test('HP-02: Successful End-to-End Checkout with Multiple Items', async ({ page }) => {
    // Add multiple items
    await addProductToCart(page, SELECTORS.ADD_TO_CART_BACKPACK);
    await addProductToCart(page, SELECTORS.ADD_TO_CART_BIKE_LIGHT);
    await takeScreenshot(page, 'HP-02', 'multiple-items-added');

    // Cart page
    await openCart(page);
    const cartItems = page.locator(SELECTORS.CART_ITEM);
    await expect(cartItems).toHaveCount(2);
    await takeScreenshot(page, 'HP-02', 'cart-with-items');

    // Checkout to completion
    await proceedToCheckout(page);
    await proceedToOverview(page, TEST_DATA.VALID_INFO);
    await verifyOrderOverview(page);
    await completeOrder(page);
    await verifyOrderConfirmation(page);
    await takeScreenshot(page, 'HP-02', 'confirmation');
  });

  test('HP-03: Cart Review — Verify Product Details', async ({ page }) => {
    // Add item
    await addProductToCart(page, SELECTORS.ADD_TO_CART_BACKPACK);
    await openCart(page);

    // Verify product details
    const cartItem = page.locator(SELECTORS.CART_ITEM).first();
    const itemName = cartItem.locator(SELECTORS.ITEM_NAME);
    const itemPrice = cartItem.locator(SELECTORS.ITEM_PRICE);

    await expect(itemName).toContainText('Sauce Labs Backpack');
    await expect(itemPrice).toContainText('$29.99');
    await takeScreenshot(page, 'HP-03', 'product-details-verified');
  });

  test('HP-04: Checkout Information Form — Valid Data Submission', async ({ page }) => {
    // Add item and proceed
    await addProductToCart(page, SELECTORS.ADD_TO_CART_BACKPACK);
    await openCart(page);
    await proceedToCheckout(page);
    await takeScreenshot(page, 'HP-04', 'empty-form');

    // Fill with valid data
    await fillCheckoutInfo(page, TEST_DATA.VALID_INFO_ALT);
    await takeScreenshot(page, 'HP-04', 'form-filled');

    // Submit
    await page.locator(SELECTORS.CONTINUE_BUTTON).click();
    await page.waitForURL(/checkout-step-two.html/);
    await takeScreenshot(page, 'HP-04', 'overview-loaded');

    expect(page.url()).toContain('checkout-step-two');
  });

  test('HP-05: Order Overview — Verify Pricing Calculation', async ({ page }) => {
    // Proceed to overview
    await addProductToCart(page, SELECTORS.ADD_TO_CART_BACKPACK);
    await openCart(page);
    await proceedToCheckout(page);
    await proceedToOverview(page, TEST_DATA.VALID_INFO);

    // Verify pricing
    const subtotalText = await page.locator(SELECTORS.SUMMARY_SUBTOTAL).textContent();
    const taxText = await page.locator(SELECTORS.SUMMARY_TAX).textContent();
    const totalText = await page.locator(SELECTORS.SUMMARY_TOTAL).textContent();

    expect(subtotalText).toContain('29.99');
    expect(taxText).toContain('2.40');
    expect(totalText).toContain('32.39');

    await takeScreenshot(page, 'HP-05', 'pricing-verified');
  });

  test('HP-06: Order Completion — Verify Confirmation and Navigation', async ({ page }) => {
    // Complete order
    await addProductToCart(page, SELECTORS.ADD_TO_CART_BACKPACK);
    await openCart(page);
    await proceedToCheckout(page);
    await proceedToOverview(page, TEST_DATA.VALID_INFO);
    await completeOrder(page);

    // Verify confirmation
    await expect(page.locator(SELECTORS.COMPLETE_HEADER)).toBeVisible();
    await takeScreenshot(page, 'HP-06', 'confirmation-displayed');

    // Return home
    await returnToHome(page);
    expect(page.url()).toContain('inventory.html');
    await takeScreenshot(page, 'HP-06', 'returned-to-home');
  });

  test('HP-07: Continue Shopping — Cart to Products Navigation', async ({ page }) => {
    // Add item
    await addProductToCart(page, SELECTORS.ADD_TO_CART_BACKPACK);
    await openCart(page);
    await takeScreenshot(page, 'HP-07', 'on-cart-page');

    // Click continue shopping
    const continueShoppingBtn = page.locator('button:has-text("Continue Shopping")');
    await continueShoppingBtn.click();
    await page.waitForURL(/inventory.html/);

    expect(page.url()).toContain('inventory.html');
    // Verify cart still has item
    const badge = page.locator(SELECTORS.SHOPPING_CART_BADGE);
    await expect(badge).toContainText('1');
    await takeScreenshot(page, 'HP-07', 'back-on-products');
  });
});
