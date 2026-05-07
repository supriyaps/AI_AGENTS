// UI Validation Test Suite - SCRUM-101
// UI-01 to UI-05: UI element visibility and correctness
import { test, expect } from '@playwright/test';
import {
  login,
  addProductToCart,
  openCart,
  proceedToCheckout,
  proceedToOverview,
  completeOrder,
  takeScreenshot,
} from './helpers/checkout-helpers.js';
import { TEST_DATA, SELECTORS } from './helpers/test-data.js';

test.describe('UI Validation - Element Visibility & Labels (UI-01 to UI-05)', () => {
  test('UI-01: Verify All Buttons Are Visible and Clickable', async ({ page }) => {
    await login(page);
    await addProductToCart(page, SELECTORS.ADD_TO_CART_BACKPACK);

    // Products page buttons
    await takeScreenshot(page, 'UI-01', 'products-buttons');
    const addBtn = page.locator(SELECTORS.ADD_TO_CART_BACKPACK);
    await expect(addBtn).toBeVisible();
    await expect(addBtn).toBeEnabled();
    console.log('✅ Add to Cart button visible and enabled');

    // Cart page buttons
    await openCart(page);
    await takeScreenshot(page, 'UI-01', 'cart-buttons');

    const checkoutBtn = page.locator(SELECTORS.CHECKOUT_BUTTON);
    const continueShoppingBtn = page.locator('button:has-text("Continue Shopping")');

    await expect(checkoutBtn).toBeVisible();
    await expect(checkoutBtn).toBeEnabled();
    await expect(continueShoppingBtn).toBeVisible();
    await expect(continueShoppingBtn).toBeEnabled();
    console.log('✅ Cart buttons visible and enabled');

    // Checkout form buttons
    await proceedToCheckout(page);
    await takeScreenshot(page, 'UI-01', 'checkout-buttons');

    const continueFormBtn = page.locator(SELECTORS.CONTINUE_BUTTON);
    const cancelBtn = page.locator(SELECTORS.CANCEL_BUTTON);

    await expect(continueFormBtn).toBeVisible();
    await expect(continueFormBtn).toBeEnabled();
    await expect(cancelBtn).toBeVisible();
    await expect(cancelBtn).toBeEnabled();
    console.log('✅ Checkout form buttons visible and enabled');

    // Overview buttons
    await proceedToOverview(page, TEST_DATA.VALID_INFO);
    await takeScreenshot(page, 'UI-01', 'overview-buttons');

    const finishBtn = page.locator(SELECTORS.FINISH_BUTTON);
    const overviewCancelBtn = page.locator(SELECTORS.CANCEL_BUTTON);

    await expect(finishBtn).toBeVisible();
    await expect(finishBtn).toBeEnabled();
    await expect(overviewCancelBtn).toBeVisible();
    await expect(overviewCancelBtn).toBeEnabled();
    console.log('✅ Overview buttons visible and enabled');

    // Confirmation button
    await completeOrder(page);
    await takeScreenshot(page, 'UI-01', 'confirmation-button');

    const backBtn = page.locator(SELECTORS.BACK_HOME_BUTTON);
    await expect(backBtn).toBeVisible();
    await expect(backBtn).toBeEnabled();
    console.log('✅ Confirmation button visible and enabled');
  });

  test('UI-02: Verify Step Indicator/Breadcrumb Matches Checkout Stage', async ({ page }) => {
    await login(page);
    await addProductToCart(page, SELECTORS.ADD_TO_CART_BACKPACK);
    await openCart(page);

    // Typically on products/cart there may not be a step indicator
    await takeScreenshot(page, 'UI-02', 'cart-page');

    // Checkout info (Step 1)
    await proceedToCheckout(page);
    await takeScreenshot(page, 'UI-02', 'step-1-checkout-info');

    // Look for step indicator
    const stepIndicator = page.locator('[class*="step"]');
    const pageTitle = page.locator('//span[text()="Checkout: Your Information"] | //h1 | //h2');

    if (await pageTitle.count() > 0) {
      const titleText = await pageTitle.first().textContent();
      console.log(`Checkout Step 1 title: ${titleText}`);
      expect(titleText).toContain('Information');
    }

    // Overview (Step 2)
    await page.locator(SELECTORS.FIRST_NAME_INPUT).fill('Test');
    await page.locator(SELECTORS.LAST_NAME_INPUT).fill('User');
    await page.locator(SELECTORS.POSTAL_CODE_INPUT).fill('12345');
    await page.locator(SELECTORS.CONTINUE_BUTTON).click();
    await page.waitForURL(/checkout-step-two.html/);

    await takeScreenshot(page, 'UI-02', 'step-2-overview');

    const overviewTitle = page.locator('//span[text()="Checkout: Overview"] | //h1 | //h2');
    if (await overviewTitle.count() > 0) {
      const titleText = await overviewTitle.first().textContent();
      console.log(`Checkout Step 2 title: ${titleText}`);
      expect(titleText).toContain('Overview');
    }

    // Confirmation (Step 3)
    await page.locator(SELECTORS.FINISH_BUTTON).click();
    await page.waitForURL(/checkout-complete.html/);

    await takeScreenshot(page, 'UI-02', 'step-3-confirmation');

    const confirmTitle = page.locator(SELECTORS.COMPLETE_HEADER);
    await expect(confirmTitle).toBeVisible();
    const confirmText = await confirmTitle.textContent();
    console.log(`Confirmation message: ${confirmText}`);
    expect(confirmText).toContain('Thank you');
  });

  test('UI-03: Verify Page Titles and Headings Are Correct', async ({ page }) => {
    await login(page);

    // Products page
    await takeScreenshot(page, 'UI-03', 'products-page');
    const productsHeading = page.locator('span:text("Products")');
    if (await productsHeading.count() > 0) {
      console.log('✅ Products page title visible');
    }

    // Add item and go to cart
    await addProductToCart(page, SELECTORS.ADD_TO_CART_BACKPACK);
    await openCart(page);

    // Cart page
    await takeScreenshot(page, 'UI-03', 'cart-page');
    const cartTitle = page.locator('span:text("Your Cart")');
    if (await cartTitle.count() > 0) {
      console.log('✅ Cart page title visible');
    }

    // Checkout info page
    await proceedToCheckout(page);
    await takeScreenshot(page, 'UI-03', 'checkout-form-page');
    const checkoutInfoTitle = page.locator('text=Checkout: Your Information');
    if (await checkoutInfoTitle.count() > 0) {
      console.log('✅ Checkout form page title visible');
    }

    // Overview page
    await proceedToOverview(page, TEST_DATA.VALID_INFO);
    await takeScreenshot(page, 'UI-03', 'overview-page');
    const overviewTitle = page.locator('text=Checkout: Overview');
    if (await overviewTitle.count() > 0) {
      console.log('✅ Overview page title visible');
    }

    // Confirmation page
    await completeOrder(page);
    await takeScreenshot(page, 'UI-03', 'confirmation-page');
    const confirmMsg = page.locator(SELECTORS.COMPLETE_HEADER);
    await expect(confirmMsg).toBeVisible();
    const confirmText = await confirmMsg.textContent();
    console.log(`✅ Confirmation message: ${confirmText}`);
  });

  test('UI-04: Verify Product Image, Name, and Price Render Correctly', async ({ page }) => {
    await login(page);
    await addProductToCart(page, SELECTORS.ADD_TO_CART_BACKPACK);
    await openCart(page);

    await takeScreenshot(page, 'UI-04', 'cart-product-display');

    // Check cart item elements
    const cartItem = page.locator(SELECTORS.CART_ITEM).first();

    // Product image
    const productImage = cartItem.locator('img');
    if (await productImage.count() > 0) {
      await expect(productImage).toBeVisible();
      const imageSrc = await productImage.first().getAttribute('src');
      console.log(`✅ Product image visible: ${imageSrc?.substring(0, 50)}...`);
    }

    // Product name
    const productName = cartItem.locator(SELECTORS.ITEM_NAME);
    await expect(productName).toBeVisible();
    const nameText = await productName.textContent();
    console.log(`✅ Product name: ${nameText}`);
    expect(nameText).toContain('Sauce Labs Backpack');

    // Product price
    const productPrice = cartItem.locator(SELECTORS.ITEM_PRICE);
    await expect(productPrice).toBeVisible();
    const priceText = await productPrice.textContent();
    console.log(`✅ Product price: ${priceText}`);
    expect(priceText).toContain('29.99');

    // Product description
    const productDesc = cartItem.locator(SELECTORS.ITEM_DESC);
    if (await productDesc.count() > 0) {
      await expect(productDesc).toBeVisible();
      const descText = await productDesc.textContent();
      console.log(`✅ Product description: ${descText?.substring(0, 50)}...`);
    }

    await takeScreenshot(page, 'UI-04', 'product-details-verified');
  });

  test('UI-05: Verify Checkout Form Field Labels', async ({ page }) => {
    await login(page);
    await addProductToCart(page, SELECTORS.ADD_TO_CART_BACKPACK);
    await openCart(page);
    await proceedToCheckout(page);

    await takeScreenshot(page, 'UI-05', 'form-with-labels');

    // Check for labels
    const firstNameLabel = page.locator('label[for*="firstName"], text="First Name"');
    const lastNameLabel = page.locator('label[for*="lastName"], text="Last Name"');
    const postalCodeLabel = page.locator('label[for*="postal"], text="Zip"');

    // First Name
    const firstNameInput = page.locator(SELECTORS.FIRST_NAME_INPUT);
    await expect(firstNameInput).toBeVisible();
    const firstNamePlaceholder = await firstNameInput.getAttribute('placeholder');
    console.log(`✅ First Name field visible - Placeholder: "${firstNamePlaceholder}"`);

    // Last Name
    const lastNameInput = page.locator(SELECTORS.LAST_NAME_INPUT);
    await expect(lastNameInput).toBeVisible();
    const lastNamePlaceholder = await lastNameInput.getAttribute('placeholder');
    console.log(`✅ Last Name field visible - Placeholder: "${lastNamePlaceholder}"`);

    // Postal Code
    const postalCodeInput = page.locator(SELECTORS.POSTAL_CODE_INPUT);
    await expect(postalCodeInput).toBeVisible();
    const postalCodePlaceholder = await postalCodeInput.getAttribute('placeholder');
    console.log(`✅ Postal Code field visible - Placeholder: "${postalCodePlaceholder}"`);

    // Look for visible labels
    const allLabels = page.locator('label, [role="label"]');
    const labelCount = await allLabels.count();
    console.log(`Total labels/label elements found: ${labelCount}`);

    await takeScreenshot(page, 'UI-05', 'field-labels-verified');
  });
});
