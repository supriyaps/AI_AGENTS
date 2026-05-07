// @ts-check
import { test, expect } from '@playwright/test';

const BASE_URL = 'https://www.saucedemo.com';
const USERNAME = 'standard_user';
const PASSWORD = 'secret_sauce';

test('manual exploratory checkout workflow for Sauce Demo', async ({ page }) => {
  await page.goto(BASE_URL);
  await page.screenshot({ path: 'test-results/screenshots/01-login-page.png', fullPage: true });

  await page.fill('#user-name', USERNAME);
  await page.fill('#password', PASSWORD);
  await page.click('#login-button');
  await expect(page).toHaveURL(/inventory.html/);
  await page.screenshot({ path: 'test-results/screenshots/02-products-page.png', fullPage: true });

  await page.click('button[data-test="add-to-cart-sauce-labs-backpack"]');
  await page.click('.shopping_cart_link');
  await expect(page).toHaveURL(/cart.html/);
  await expect(page.locator('.cart_item')).toHaveCount(1);
  await page.screenshot({ path: 'test-results/screenshots/03-cart-review.png', fullPage: true });

  await page.click('button[data-test="checkout"]');
  await expect(page).toHaveURL(/checkout-step-one.html/);
  await page.screenshot({ path: 'test-results/screenshots/04-checkout-information.png', fullPage: true });

  await page.click('input[data-test="continue"]');
  await expect(page.locator('[data-test="error"]')).toBeVisible();
  await page.screenshot({ path: 'test-results/screenshots/05-checkout-error.png', fullPage: true });

  await page.fill('input[data-test="firstName"]', 'Test');
  await page.fill('input[data-test="lastName"]', 'User');
  await page.fill('input[data-test="postalCode"]', '12345');
  await page.click('input[data-test="continue"]');
  await expect(page).toHaveURL(/checkout-step-two.html/);
  await page.screenshot({ path: 'test-results/screenshots/06-order-overview.png', fullPage: true });

  await expect(page.locator('.summary_info')).toBeVisible();
  await expect(page.locator('.summary_total_label')).toBeVisible();
  await expect(page.locator('button[data-test="cancel"]')).toBeVisible();
  await expect(page.locator('button[data-test="finish"]')).toBeVisible();

  await page.click('button[data-test="finish"]');
  await expect(page).toHaveURL(/checkout-complete.html/);
  await page.screenshot({ path: 'test-results/screenshots/07-order-confirmation.png', fullPage: true });

  await expect(page.locator('h2.complete-header')).toHaveText('Thank you for your order!');
  await page.click('button[data-test="back-to-products"]');
  await expect(page).toHaveURL(/inventory.html/);
  await page.screenshot({ path: 'test-results/screenshots/08-back-home.png', fullPage: true });
});
