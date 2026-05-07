// @ts-check
import { test, expect } from '@playwright/test';

const BASE_URL = 'https://www.saucedemo.com';
const USERNAME = 'standard_user';
const PASSWORD = 'secret_sauce';
const FIRST_NAME = 'Test';
const LAST_NAME = 'User';
const POSTAL_CODE = '12345';

async function login(page) {
  await page.goto(BASE_URL);
  await page.fill('#user-name', USERNAME);
  await page.fill('#password', PASSWORD);
  await page.click('#login-button');
  await expect(page).toHaveURL(/inventory.html/);
}

async function addItemToCart(page) {
  await page.click('button[data-test="add-to-cart-sauce-labs-backpack"]');
  await page.click('.shopping_cart_link');
  await expect(page).toHaveURL(/cart.html/);
}

test.describe('SauceDemo checkout workflow', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test('Cart review displays selected item and checkout option', async ({ page }) => {
    await addItemToCart(page);

    const cartItem = page.locator('.cart_item');
    await expect(cartItem).toHaveCount(1);
    await expect(cartItem.locator('.inventory_item_name')).toHaveText('Sauce Labs Backpack');
    await expect(cartItem.locator('.inventory_item_price')).toHaveText('$29.99');
    await expect(page.locator('.cart_list')).toBeVisible();
    await expect(page.locator('button[data-test="checkout"]')).toBeVisible();
  });

  test('Checkout information validation blocks missing required fields', async ({ page }) => {
    await addItemToCart(page);
    await page.click('button[data-test="checkout"]');
    await expect(page).toHaveURL(/checkout-step-one.html/);

    await page.click('input[data-test="continue"]');
    const error = page.locator('[data-test="error"]');
    await expect(error).toBeVisible();
    await expect(error).toContainText('is required');

    await page.fill('input[data-test="firstName"]', FIRST_NAME);
    await page.fill('input[data-test="lastName"]', LAST_NAME);
    await page.fill('input[data-test="postalCode"]', POSTAL_CODE);
    await page.click('input[data-test="continue"]');
    await expect(page).toHaveURL(/checkout-step-two.html/);
  });

  test('Order overview shows order summary, payment details, and pricing', async ({ page }) => {
    await addItemToCart(page);
    await page.click('button[data-test="checkout"]');
    await page.fill('input[data-test="firstName"]', FIRST_NAME);
    await page.fill('input[data-test="lastName"]', LAST_NAME);
    await page.fill('input[data-test="postalCode"]', POSTAL_CODE);
    await page.click('input[data-test="continue"]');

    await expect(page).toHaveURL(/checkout-step-two.html/);
    await expect(page.locator('.summary_info')).toBeVisible();
    await expect(page.locator('.summary_info')).toContainText('Payment Information');
    await expect(page.locator('.summary_info')).toContainText('Shipping Information');
    await expect(page.locator('.summary_subtotal_label')).toContainText('Item total:');
    await expect(page.locator('.summary_tax_label')).toContainText('Tax:');
    await expect(page.locator('.summary_total_label')).toContainText('Total:');
    await expect(page.locator('button[data-test="cancel"]')).toBeVisible();
    await expect(page.locator('button[data-test="finish"]')).toBeVisible();
  });

  test('Order completion shows confirmation and back home navigation', async ({ page }) => {
    await addItemToCart(page);
    await page.click('button[data-test="checkout"]');
    await page.fill('input[data-test="firstName"]', FIRST_NAME);
    await page.fill('input[data-test="lastName"]', LAST_NAME);
    await page.fill('input[data-test="postalCode"]', POSTAL_CODE);
    await page.click('input[data-test="continue"]');

    await page.click('button[data-test="finish"]');
    await expect(page).toHaveURL(/checkout-complete.html/);
    await expect(page.locator('h2.complete-header')).toHaveText('Thank you for your order!');
    await expect(page.locator('button[data-test="back-to-products"]')).toBeVisible();
    await page.click('button[data-test="back-to-products"]');
    await expect(page).toHaveURL(/inventory.html/);
  });

  test('Cancel checkout returns the user to a safe shopping page from checkout steps', async ({ page }) => {
    await addItemToCart(page);
    await page.click('button[data-test="checkout"]');
    await expect(page).toHaveURL(/checkout-step-one.html/);
    await page.click('button[data-test="cancel"]');
    await expect(page).toHaveURL(/cart.html/);

    await page.click('button[data-test="checkout"]');
    await page.fill('input[data-test="firstName"]', FIRST_NAME);
    await page.fill('input[data-test="lastName"]', LAST_NAME);
    await page.fill('input[data-test="postalCode"]', POSTAL_CODE);
    await page.click('input[data-test="continue"]');
    await expect(page).toHaveURL(/checkout-step-two.html/);
    await page.click('button[data-test="cancel"]');
    await expect(page).toHaveURL(/inventory.html/);
  });
});
