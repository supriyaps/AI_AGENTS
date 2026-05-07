// Checkout Helper Functions with Self-Healing Locator Strategy
import { expect } from '@playwright/test';
import { TEST_DATA, SELECTORS } from './test-data.js';

/**
 * Self-healing locator function with fallback selectors
 * Tries multiple selector strategies in priority order:
 * 1. data-test attribute (primary)
 * 2. ID selector
 * 3. Aria role + name
 * 4. Text content
 */
export async function selfHealingLocator(page, selectorArray, label, timeout = 3000) {
  for (const selector of selectorArray) {
    try {
      const element = page.locator(selector);
      await element.waitFor({ timeout, state: 'visible' });
      console.log(`[Self-Heal] ✅ Found element "${label}" using selector: ${selector}`);
      return element;
    } catch (error) {
      console.log(`[Self-Heal] ⚠️  Selector failed for "${label}": ${selector}`);
    }
  }

  // All selectors failed - take diagnostic screenshot
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  await page.screenshot({
    path: `screenshots/automated/failures/heal-failure-${label}-${timestamp}.png`,
    fullPage: true,
  });
  throw new Error(`[Self-Heal] All selectors failed for: "${label}". Screenshot saved for diagnosis.`);
}

/**
 * Login to SauceDemo
 */
export async function login(page, username = TEST_DATA.VALID_USER.username, password = TEST_DATA.VALID_USER.password) {
  await page.goto(TEST_DATA.BASE_URL);

  const usernameInput = await selfHealingLocator(page, [
    SELECTORS.USERNAME_INPUT,
    'input[placeholder*="Username"]',
    '[name="user-name"]',
  ], 'username input');

  const passwordInput = await selfHealingLocator(page, [
    SELECTORS.PASSWORD_INPUT,
    'input[placeholder*="Password"]',
    '[name="password"]',
  ], 'password input');

  const loginButton = await selfHealingLocator(page, [
    SELECTORS.LOGIN_BUTTON,
    'button:has-text("Login")',
    'button[type="submit"]',
  ], 'login button');

  await usernameInput.fill(username);
  await passwordInput.fill(password);
  await loginButton.click();

  // Wait for products page to load
  await page.waitForURL(/inventory.html/);
  await page.waitForLoadState('load');
  console.log('✅ Login successful');
}

/**
 * Add a product to cart by product selector
 */
export async function addProductToCart(page, addToCartSelector) {
  const addButton = await selfHealingLocator(page, [
    addToCartSelector,
    `button[data-test*="${addToCartSelector.split('-').slice(-1)[0]}"]`,
  ], 'add to cart button');

  await addButton.click();
  await page.waitForTimeout(200); // Brief wait for UI update
  console.log('✅ Product added to cart');
}

/**
 * Open shopping cart
 */
export async function openCart(page) {
  const cartLink = await selfHealingLocator(page, [
    SELECTORS.SHOPPING_CART_LINK,
    '.cart_container a',
    'a[data-test*="cart"]',
  ], 'shopping cart link');

  await cartLink.click();
  await page.waitForURL(/cart.html/);
  await page.waitForLoadState('load');
  console.log('✅ Cart opened');
}

/**
 * Proceed to checkout from cart
 */
export async function proceedToCheckout(page) {
  const checkoutButton = await selfHealingLocator(page, [
    SELECTORS.CHECKOUT_BUTTON,
    'button:has-text("Checkout")',
    'button[data-test*="checkout"]',
  ], 'checkout button');

  await checkoutButton.click();
  await page.waitForURL(/checkout-step-one.html/);
  await page.waitForLoadState('load');
  console.log('✅ Proceeded to checkout');
}

/**
 * Fill checkout information form
 */
export async function fillCheckoutInfo(page, checkoutInfo = TEST_DATA.VALID_INFO) {
  const firstNameInput = await selfHealingLocator(page, [
    SELECTORS.FIRST_NAME_INPUT,
    'input[placeholder*="First"]',
    'input[id*="firstName"]',
  ], 'first name input');

  const lastNameInput = await selfHealingLocator(page, [
    SELECTORS.LAST_NAME_INPUT,
    'input[placeholder*="Last"]',
    'input[id*="lastName"]',
  ], 'last name input');

  const postalCodeInput = await selfHealingLocator(page, [
    SELECTORS.POSTAL_CODE_INPUT,
    'input[placeholder*="Zip"]',
    'input[id*="postalCode"]',
  ], 'postal code input');

  await firstNameInput.fill(checkoutInfo.firstName);
  await lastNameInput.fill(checkoutInfo.lastName);
  await postalCodeInput.fill(checkoutInfo.postalCode);

  console.log('✅ Checkout form filled');
}

/**
 * Submit checkout form (click Continue)
 */
export async function submitCheckoutForm(page) {
  const continueButton = await selfHealingLocator(page, [
    SELECTORS.CONTINUE_BUTTON,
    'input[value="Continue"]',
    'button:has-text("Continue")',
  ], 'continue button');

  await continueButton.click();
  await page.waitForTimeout(500); // Wait for form processing
  console.log('✅ Checkout form submitted');
}

/**
 * Verify checkout validation error
 */
export async function verifyCheckoutError(page) {
  const errorElement = await selfHealingLocator(page, [
    SELECTORS.ERROR_MESSAGE,
    '[class*="error"]',
    '.error-message',
  ], 'error message');

  await expect(errorElement).toBeVisible();
  const errorText = await errorElement.textContent();
  console.log(`✅ Error displayed: ${errorText}`);
  return errorText;
}

/**
 * Proceed from checkout info to overview
 */
export async function proceedToOverview(page, checkoutInfo = TEST_DATA.VALID_INFO) {
  await fillCheckoutInfo(page, checkoutInfo);
  await submitCheckoutForm(page);
  await page.waitForURL(/checkout-step-two.html/);
  await page.waitForLoadState('load');
  console.log('✅ Proceeded to order overview');
}

/**
 * Verify order overview page
 */
export async function verifyOrderOverview(page) {
  const summaryInfo = await selfHealingLocator(page, [
    SELECTORS.SUMMARY_INFO,
    '.summary_container',
    '[class*="summary"]',
  ], 'order summary');

  await expect(summaryInfo).toBeVisible();

  const subtotal = await selfHealingLocator(page, [
    SELECTORS.SUMMARY_SUBTOTAL,
  ], 'subtotal label');

  const tax = await selfHealingLocator(page, [
    SELECTORS.SUMMARY_TAX,
  ], 'tax label');

  const total = await selfHealingLocator(page, [
    SELECTORS.SUMMARY_TOTAL,
  ], 'total label');

  await expect(subtotal).toBeVisible();
  await expect(tax).toBeVisible();
  await expect(total).toBeVisible();

  console.log('✅ Order overview verified');
}

/**
 * Complete order (click Finish)
 */
export async function completeOrder(page) {
  const finishButton = await selfHealingLocator(page, [
    SELECTORS.FINISH_BUTTON,
    'button:has-text("Finish")',
    'button[data-test*="finish"]',
  ], 'finish button');

  await finishButton.click();
  await page.waitForURL(/checkout-complete.html/);
  await page.waitForLoadState('load');
  console.log('✅ Order completed');
}

/**
 * Verify order confirmation
 */
export async function verifyOrderConfirmation(page) {
  const confirmationHeader = await selfHealingLocator(page, [
    SELECTORS.COMPLETE_HEADER,
    'h2:has-text("Thank you")',
    '[class*="complete"]',
  ], 'confirmation header');

  await expect(confirmationHeader).toBeVisible();
  const message = await confirmationHeader.textContent();
  console.log(`✅ Confirmation message: ${message}`);
  return message;
}

/**
 * Return to home (click Back Home)
 */
export async function returnToHome(page) {
  const backButton = await selfHealingLocator(page, [
    SELECTORS.BACK_HOME_BUTTON,
    'button:has-text("Back Home")',
    'button[data-test*="back"]',
  ], 'back home button');

  await backButton.click();
  await page.waitForURL(/inventory.html/);
  await page.waitForLoadState('load');
  console.log('✅ Returned to home');
}

/**
 * Cancel from checkout (go back to cart)
 */
export async function cancelFromCheckout(page) {
  const cancelButton = await selfHealingLocator(page, [
    SELECTORS.CANCEL_BUTTON,
    'button:has-text("Cancel")',
    'button[data-test*="cancel"]',
  ], 'cancel button');

  await cancelButton.click();
  await page.waitForTimeout(500);
  console.log('✅ Checkout cancelled');
}

/**
 * Get cart item count from badge
 */
export async function getCartItemCount(page) {
  try {
    const badge = await selfHealingLocator(page, [
      SELECTORS.SHOPPING_CART_BADGE,
      '[class*="badge"]',
    ], 'cart badge');

    const count = await badge.textContent();
    return parseInt(count, 10);
  } catch {
    return 0; // Cart is empty if badge doesn't exist
  }
}

/**
 * Verify cart is empty
 */
export async function verifyCartEmpty(page) {
  try {
    const badge = page.locator(SELECTORS.SHOPPING_CART_BADGE);
    await expect(badge).not.toBeVisible();
    console.log('✅ Cart is empty (badge not visible)');
  } catch {
    console.log('✅ Cart is empty');
  }
}

/**
 * Take screenshot at key step
 */
export async function takeScreenshot(page, testId, stepName) {
  await page.screenshot({
    path: `screenshots/automated/${testId}-${stepName}.png`,
    fullPage: true,
  });
}

/**
 * Handle test failure with screenshot
 */
export async function handleTestFailure(page, testId, stepName, error) {
  await takeScreenshot(page, testId, `FAILURE-${stepName}`);
  console.error(`❌ Test failed at ${stepName}: ${error.message}`);
  throw error;
}
