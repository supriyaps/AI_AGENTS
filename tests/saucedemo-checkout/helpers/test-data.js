// Test Data Constants for SauceDemo Checkout Tests

export const TEST_DATA = {
  // Valid credentials
  VALID_USER: {
    username: 'standard_user',
    password: 'secret_sauce',
  },

  // Valid checkout information
  VALID_INFO: {
    firstName: 'Test',
    lastName: 'User',
    postalCode: '12345',
  },

  // Alternative valid data
  VALID_INFO_ALT: {
    firstName: 'John',
    lastName: 'Smith',
    postalCode: '98765',
  },

  // Invalid checkout information
  INVALID_INFO: {
    firstName: '!@#$%',
    lastName: '123',
    postalCode: '1',
  },

  // Empty information
  EMPTY_INFO: {
    firstName: '',
    lastName: '',
    postalCode: '',
  },

  // Partial empty
  EMPTY_FIRST_NAME: {
    firstName: '',
    lastName: 'User',
    postalCode: '12345',
  },

  EMPTY_LAST_NAME: {
    firstName: 'Test',
    lastName: '',
    postalCode: '12345',
  },

  EMPTY_POSTAL_CODE: {
    firstName: 'Test',
    lastName: 'User',
    postalCode: '',
  },

  // Long strings (105+ characters)
  LONG_STRING: 'A'.repeat(105),
  LONG_STRING_B: 'B'.repeat(105),
  LONG_STRING_C: '1'.repeat(27),

  // Whitespace
  WHITESPACE_ONLY: '     ',

  // Product names
  PRODUCTS: {
    BACKPACK: 'Sauce Labs Backpack',
    BIKE_LIGHT: 'Sauce Labs Bike Light',
    BOLT_TSHIRT: 'Sauce Labs Bolt T-Shirt',
    FLEECE_JACKET: 'Sauce Labs Fleece Jacket',
    ONESIE: 'Sauce Labs Onesie',
    TEST_ALLTHETHINGS: 'Test.allTheThings() T-Shirt (Red)',
  },

  // Prices
  PRICES: {
    BACKPACK: '$29.99',
    BIKE_LIGHT: '$9.99',
    BOLT_TSHIRT: '$15.99',
    FLEECE_JACKET: '$49.99',
    ONESIE: '$7.99',
    TEST_ALLTHETHINGS: '$15.99',
  },

  // URLs
  BASE_URL: 'https://www.saucedemo.com',
  PRODUCTS_URL: 'https://www.saucedemo.com/inventory.html',
  CART_URL: 'https://www.saucedemo.com/cart.html',
  CHECKOUT_INFO_URL: 'https://www.saucedemo.com/checkout-step-one.html',
  CHECKOUT_OVERVIEW_URL: 'https://www.saucedemo.com/checkout-step-two.html',
  CHECKOUT_COMPLETE_URL: 'https://www.saucedemo.com/checkout-complete.html',
};

export const SELECTORS = {
  // Login
  USERNAME_INPUT: '#user-name',
  PASSWORD_INPUT: '#password',
  LOGIN_BUTTON: '#login-button',

  // Products Page
  ADD_TO_CART_BACKPACK: 'button[data-test="add-to-cart-sauce-labs-backpack"]',
  ADD_TO_CART_BIKE_LIGHT: 'button[data-test="add-to-cart-sauce-labs-bike-light"]',
  SHOPPING_CART_LINK: '.shopping_cart_link',
  SHOPPING_CART_BADGE: '.shopping_cart_badge',

  // Cart Page
  CART_ITEM: '.cart_item',
  ITEM_NAME: '.inventory_item_name',
  ITEM_PRICE: '.inventory_item_price',
  ITEM_DESC: '.inventory_item_desc',
  REMOVE_BUTTON: 'button[id*="remove"]',
  CHECKOUT_BUTTON: 'button[data-test="checkout"]',
  CONTINUE_SHOPPING_BUTTON: 'button[data-test="continue-shopping"]',
  CART_LIST: '.cart_list',

  // Checkout Info Page
  FIRST_NAME_INPUT: 'input[data-test="firstName"]',
  LAST_NAME_INPUT: 'input[data-test="lastName"]',
  POSTAL_CODE_INPUT: 'input[data-test="postalCode"]',
  CONTINUE_BUTTON: 'input[data-test="continue"]',
  CANCEL_BUTTON: 'button[data-test="cancel"]',
  ERROR_MESSAGE: '[data-test="error"]',

  // Order Overview
  SUMMARY_INFO: '.summary_info',
  SUMMARY_SUBTOTAL: '.summary_subtotal_label',
  SUMMARY_TAX: '.summary_tax_label',
  SUMMARY_TOTAL: '.summary_total_label',
  FINISH_BUTTON: 'button[data-test="finish"]',

  // Order Confirmation
  COMPLETE_HEADER: 'h2.complete-header',
  BACK_HOME_BUTTON: 'button[data-test="back-to-products"]',
};
