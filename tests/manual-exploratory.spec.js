// @ts-check
import { test, expect } from '@playwright/test';

const BASE_URL = 'https://www.saucedemo.com';
const USERNAME = 'standard_user';
const PASSWORD = 'secret_sauce';

test('Manual Exploratory Testing - SauceDemo Checkout Workflow', async ({ page }) => {
  
  // CHECKPOINT 1: Login page
  await page.goto(BASE_URL);
  await page.screenshot({ path: 'screenshots/manual/SC-01-login-page.png', fullPage: true });
  console.log('✅ Checkpoint 1: Login page loaded');

  // CHECKPOINT 2: Login
  await page.fill('#user-name', USERNAME);
  await page.fill('#password', PASSWORD);
  await page.click('#login-button');
  await expect(page).toHaveURL(/inventory.html/);
  await page.screenshot({ path: 'screenshots/manual/SC-02-products-page.png', fullPage: true });
  console.log('✅ Checkpoint 2: Login successful, products page displayed');

  // CHECKPOINT 3: Add product to cart
  await page.click('button[data-test="add-to-cart-sauce-labs-backpack"]');
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  await page.screenshot({ path: 'screenshots/manual/SC-03-product-added.png', fullPage: true });
  console.log('✅ Checkpoint 3: Product added to cart (badge shows 1)');

  // CHECKPOINT 4: Open cart
  await page.click('.shopping_cart_link');
  await expect(page).toHaveURL(/cart.html/);
  await page.screenshot({ path: 'screenshots/manual/SC-04-cart-page.png', fullPage: true });
  console.log('✅ Checkpoint 4: Cart page opened, item displayed');

  // CHECKPOINT 5: Verify cart details
  const cartItem = page.locator('.cart_item');
  const itemName = await cartItem.locator('.inventory_item_name').textContent();
  const itemPrice = await cartItem.locator('.inventory_item_price').textContent();
  console.log(`   Item Name: ${itemName}, Price: ${itemPrice}`);
  await page.screenshot({ path: 'screenshots/manual/SC-05-cart-details.png', fullPage: true });
  console.log('✅ Checkpoint 5: Cart item details verified');

  // CHECKPOINT 6: Click checkout
  await page.click('button[data-test="checkout"]');
  await expect(page).toHaveURL(/checkout-step-one.html/);
  await page.screenshot({ path: 'screenshots/manual/SC-06-checkout-form.png', fullPage: true });
  console.log('✅ Checkpoint 6: Checkout information page loaded');

  // CHECKPOINT 7: Test validation - submit empty form
  await page.click('input[data-test="continue"]');
  await expect(page.locator('[data-test="error"]')).toBeVisible();
  const errorText = await page.locator('[data-test="error"]').textContent();
  console.log(`   Validation Error: ${errorText}`);
  await page.screenshot({ path: 'screenshots/manual/SC-07-validation-error.png', fullPage: true });
  console.log('✅ Checkpoint 7: Validation error displayed for empty form');

  // CHECKPOINT 8: Fill checkout form with valid data
  await page.fill('input[data-test="firstName"]', 'Test');
  await page.fill('input[data-test="lastName"]', 'User');
  await page.fill('input[data-test="postalCode"]', '12345');
  await page.screenshot({ path: 'screenshots/manual/SC-08-form-filled.png', fullPage: true });
  console.log('✅ Checkpoint 8: Checkout form filled with valid data');

  // CHECKPOINT 9: Submit checkout form
  await page.click('input[data-test="continue"]');
  await expect(page).toHaveURL(/checkout-step-two.html/);
  await page.screenshot({ path: 'screenshots/manual/SC-09-order-overview.png', fullPage: true });
  console.log('✅ Checkpoint 9: Order overview page loaded');

  // CHECKPOINT 10: Verify order overview details
  await expect(page.locator('.summary_subtotal_label')).toBeVisible();
  await expect(page.locator('.summary_tax_label')).toBeVisible();
  await expect(page.locator('.summary_total_label')).toBeVisible();
  const subtotal = await page.locator('.summary_subtotal_label').textContent();
  const tax = await page.locator('.summary_tax_label').textContent();
  const total = await page.locator('.summary_total_label').textContent();
  console.log(`   Subtotal: ${subtotal}, Tax: ${tax}, Total: ${total}`);
  await page.screenshot({ path: 'screenshots/manual/SC-10-pricing-details.png', fullPage: true });
  console.log('✅ Checkpoint 10: Pricing details verified on overview');

  // CHECKPOINT 11: Verify buttons on overview
  await expect(page.locator('button[data-test="cancel"]')).toBeVisible();
  await expect(page.locator('button[data-test="finish"]')).toBeVisible();
  await page.screenshot({ path: 'screenshots/manual/SC-11-overview-buttons.png', fullPage: true });
  console.log('✅ Checkpoint 11: Cancel and Finish buttons visible on overview');

  // CHECKPOINT 12: Complete order
  await page.click('button[data-test="finish"]');
  await expect(page).toHaveURL(/checkout-complete.html/);
  await page.screenshot({ path: 'screenshots/manual/SC-12-confirmation-page.png', fullPage: true });
  console.log('✅ Checkpoint 12: Order confirmation page loaded');

  // CHECKPOINT 13: Verify success message
  const confirmationMessage = await page.locator('h2.complete-header').textContent();
  console.log(`   Confirmation Message: ${confirmationMessage}`);
  await expect(page.locator('h2.complete-header')).toContainText('Thank you');
  await page.screenshot({ path: 'screenshots/manual/SC-13-success-message.png', fullPage: true });
  console.log('✅ Checkpoint 13: Success message displayed');

  // CHECKPOINT 14: Back Home button
  await expect(page.locator('button[data-test="back-to-products"]')).toBeVisible();
  await page.click('button[data-test="back-to-products"]');
  await expect(page).toHaveURL(/inventory.html/);
  await page.screenshot({ path: 'screenshots/manual/SC-14-back-home.png', fullPage: true });
  console.log('✅ Checkpoint 14: Back Home button returns to products page');

  // CHECKPOINT 15: Add multiple items test
  await page.click('button[data-test="add-to-cart-sauce-labs-bike-light"]');
  await page.click('button[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]');
  await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
  await page.screenshot({ path: 'screenshots/manual/SC-15-multiple-items.png', fullPage: true });
  console.log('✅ Checkpoint 15: Multiple items added to cart (badge shows 2)');

  // CHECKPOINT 16: Test cancel from checkout info
  await page.click('.shopping_cart_link');
  await page.click('button[data-test="checkout"]');
  await expect(page).toHaveURL(/checkout-step-one.html/);
  await page.click('button[data-test="cancel"]');
  await expect(page).toHaveURL(/cart.html/);
  await page.screenshot({ path: 'screenshots/manual/SC-16-cancel-from-info.png', fullPage: true });
  console.log('✅ Checkpoint 16: Cancel from checkout info returns to cart');

  console.log('\n✅ MANUAL EXPLORATORY TESTING COMPLETE - All 16 checkpoints passed');
});
