# SauceDemo Checkout Test Plan — SCRUM-101

**Document Date:** May 7, 2026  
**Application:** SauceDemo (https://www.saucedemo.com)  
**Test Credentials:** standard_user / secret_sauce  
**Scope:** End-to-end checkout workflow from product selection through order confirmation

---

## 📊 Test Scenario Summary

| Category | Test ID Range | Count | Type |
|----------|---------------|-------|------|
| Happy Path | HP-01 to HP-07 | 7 | Positive |
| Negative | NEG-01 to NEG-08 | 8 | Negative |
| Edge Cases | EDGE-01 to EDGE-08 | 8 | Edge Cases |
| Cancellation Flow | CANCEL-01 to CANCEL-03 | 3 | Navigation |
| UI Validation | UI-01 to UI-05 | 5 | Validation |
| **TOTAL** | — | **31** | — |

---

## 🎯 HAPPY PATH SCENARIOS (HP-01 to HP-07)

### HP-01: Successful End-to-End Checkout with Single Item
**Objective:** Verify the complete checkout flow works correctly when purchasing a single product.
**Test Data:** Login: standard_user/secret_sauce, Product: Sauce Labs Backpack, Info: Test/User/12345
**Steps:** Login → Products page → Add to cart → Open cart → Click Checkout → Fill form → Continue → Review overview → Click Finish
**Expected Result:** Order confirmation page displays "Thank you for your order!" ✅ **SC-HP01**

### HP-02: Successful End-to-End Checkout with Multiple Items
**Objective:** Verify checkout works correctly with multiple products.
**Test Data:** Products: Backpack + Bike Light, Checkout info: Test/User/12345
**Steps:** Add multiple items → Verify badge count → Open cart → Verify all items → Checkout → Complete
**Expected Result:** Order total reflects all items correctly ✅ **SC-HP02**

### HP-03: Cart Review — Verify Product Details
**Objective:** Validate cart displays correct product information.
**Test Data:** Product: Sauce Labs Backpack
**Steps:** Open cart → Verify name, description, price, quantity visible
**Expected Result:** All product details visible and correct ✅ **SC-HP03**

### HP-04: Checkout Information Form — Valid Data Submission
**Objective:** Verify valid checkout information is accepted.
**Test Data:** First Name: John, Last Name: Smith, Postal Code: 98765
**Steps:** Fill valid checkout info → Click Continue
**Expected Result:** Order overview page loads successfully ✅ **SC-HP04**

### HP-05: Order Overview — Verify Pricing Calculation
**Objective:** Confirm subtotal, tax, total are calculated correctly.
**Test Data:** Item: Sauce Labs Backpack ($29.99)
**Steps:** Open overview → Verify subtotal, tax, total visible → Verify calculation
**Expected Result:** All pricing fields visible and calculation correct ✅ **SC-HP05**

### HP-06: Order Completion — Verify Confirmation and Navigation
**Objective:** Confirm successful order placement and navigation.
**Steps:** Click Finish → Verify confirmation page → Click Back Home
**Expected Result:** Confirmation page displays, Back Home returns to products ✅ **SC-HP06**

### HP-07: Continue Shopping — Cart to Products Navigation
**Objective:** Verify Continue Shopping button returns to products.
**Steps:** Click Continue Shopping on cart page → Verify products page
**Expected Result:** Products page displayed with cart preserved ✅ **SC-HP07**

---

## ⚠️ NEGATIVE SCENARIOS (NEG-01 to NEG-08)

### NEG-01: Submit Checkout Form with All Fields Empty
**Expected Result:** Error message displayed, form not submitted ✅ **SC-NEG01**

### NEG-02: Submit with First Name Empty
**Test Data:** Last Name: User, Postal Code: 12345
**Expected Result:** Error for missing First Name ✅ **SC-NEG02**

### NEG-03: Submit with Last Name Empty
**Test Data:** First Name: Test, Postal Code: 12345
**Expected Result:** Error for missing Last Name ✅ **SC-NEG03**

### NEG-04: Submit with Postal Code Empty
**Test Data:** First Name: Test, Last Name: User
**Expected Result:** Error for missing Postal Code ✅ **SC-NEG04**

### NEG-05: Enter Special Characters in First Name
**Test Data:** First Name: !@#$%
**Expected Result:** Application behavior documented ✅ **SC-NEG05**

### NEG-06: Enter Numeric Value in Last Name
**Test Data:** Last Name: 123
**Expected Result:** Application behavior documented ✅ **SC-NEG06**

### NEG-07: Enter Single Character in Postal Code
**Test Data:** Postal Code: 1
**Expected Result:** Application behavior documented ✅ **SC-NEG07**

### NEG-08: Attempt Checkout with Empty Cart
**Expected Result:** Behavior documented (prevented or allowed) ✅ **SC-NEG08**

---

## 🎪 EDGE CASE SCENARIOS (EDGE-01 to EDGE-08)

### EDGE-01: Add Maximum Products to Cart and Checkout
**Test Data:** Add all 6 available products
**Expected Result:** All items successfully added and checkout completes ✅ **SC-EDGE01**

### EDGE-02: Add, Remove, Re-add Product and Checkout
**Test Data:** Product: Sauce Labs Backpack
**Steps:** Add → Remove → Re-add → Checkout
**Expected Result:** Re-added item successfully checks out ✅ **SC-EDGE02**

### EDGE-03: Refresh Page Mid-Checkout
**Steps:** On checkout form → Refresh page → Check form state
**Expected Result:** Form state behavior documented ✅ **SC-EDGE03**

### EDGE-04: Browser Back Button from Overview Page
**Steps:** On overview → Click browser back button
**Expected Result:** Navigation behavior documented ✅ **SC-EDGE04**

### EDGE-05: Enter Very Long String in Form Fields
**Test Data:** 105 character strings in all fields
**Expected Result:** Behavior documented (accept/truncate/reject) ✅ **SC-EDGE05**

### EDGE-06: Enter Whitespace/Spaces in Required Fields
**Test Data:** Spaces in First Name, Last Name, Postal Code
**Expected Result:** Whitespace handling documented ✅ **SC-EDGE06**

### EDGE-07: Rapidly Click Finish Button Multiple Times
**Steps:** Click Finish 5 times rapidly → Verify order count
**Expected Result:** Only one order placed (duplicate prevention) ✅ **SC-EDGE07**

### EDGE-08: Verify Cart Badge Count Updates
**Steps:** Add items → Verify badge increments → Remove → Verify decrements
**Expected Result:** Badge count always accurate ✅ **SC-EDGE08**

---

## 🚫 CANCELLATION FLOW (CANCEL-01 to CANCEL-03)

### CANCEL-01: Cancel from Checkout Information Page
**Steps:** Click Cancel on checkout info page → Verify return to cart
**Expected Result:** User returned to cart with items preserved ✅ **SC-CANCEL01**

### CANCEL-02: Cancel from Order Overview Page
**Steps:** Click Cancel on overview page → Verify navigation
**Expected Result:** Navigation handled correctly ✅ **SC-CANCEL02**

### CANCEL-03: Verify No Partial Order After Cancellation
**Steps:** Cancel checkout → Log out/in → Verify cart state
**Expected Result:** No order placed, cart items preserved ✅ **SC-CANCEL03**

---

## 🎨 UI VALIDATION SCENARIOS (UI-01 to UI-05)

### UI-01: Verify All Buttons Are Visible and Clickable
**Test Pages:** Cart, Checkout Info, Overview, Confirmation
**Expected Result:** All buttons visible, labeled, and functional ✅ **SC-UI01**

### UI-02: Verify Step Indicator/Breadcrumb Matches Checkout Stage
**Steps:** Navigate through checkout → Verify step indicator updates
**Expected Result:** Step indicator accurately reflects current position ✅ **SC-UI02**

### UI-03: Verify Page Titles and Headings Are Correct
**Expected Titles:** Products, Your Cart, Checkout Info, Overview, Confirmation
**Expected Result:** All page titles correct and descriptive ✅ **SC-UI03**

### UI-04: Verify Product Image, Name, and Price Render Correctly
**Steps:** Navigate to cart → Verify product image, name, price
**Expected Result:** All product information visible and correct ✅ **SC-UI04**

### UI-05: Verify Checkout Form Field Labels
**Expected Labels:** First Name, Last Name, Zip / Postal Code
**Expected Result:** All labels clear and properly associated ✅ **SC-UI05**

---

## 📋 Acceptance Criteria Mapping

| AC ID | Requirement | Covered By Test IDs |
|-------|-------------|-------------------|
| AC-01 | Login with valid credentials | HP-01, HP-02, HP-03 |
| AC-02 | Add products to cart | HP-01, HP-02, HP-07, EDGE-01, EDGE-02 |
| AC-03 | Cart displays correct details | HP-03, UI-04, EDGE-08 |
| AC-04 | Checkout button navigates to form | HP-01, HP-04, UI-01 |
| AC-05 | Empty form shows validation error | NEG-01, NEG-02, NEG-03, NEG-04, EDGE-06 |
| AC-06 | Valid info proceeds to overview | HP-04, HP-05, UI-05 |
| AC-07 | Overview shows all details | HP-05, HP-06, UI-03 |
| AC-08 | Finish navigates to confirmation | HP-06, EDGE-07 |
| AC-09 | Confirmation shows success message | HP-06 |
| AC-10 | Back Home returns to products | HP-06, HP-07 |
| AC-11 | Cancel from info returns to cart | CANCEL-01 |
| AC-12 | Cancel from overview returns to cart | CANCEL-02 |
| AC-13 | Invalid input handled appropriately | NEG-05, NEG-06, EDGE-05, EDGE-06 |
| AC-14 | Empty postal code prevented | NEG-04, NEG-07 |

---

## 🖼️ Screenshot Checkpoints

All screenshots saved to: `screenshots/manual/` (Step 3) and `screenshots/automated/` (Step 5)

| Checkpoint | Description |
|------------|-------------|
| SC-LOGIN | Login page and successful authentication |
| SC-PRODUCTS | Products page after login |
| SC-CART-ITEMS | Cart page with items |
| SC-CHECKOUT-FORM | Checkout information form (empty) |
| SC-CHECKOUT-ERROR | Validation error state |
| SC-CHECKOUT-FILLED | Form with valid data |
| SC-OVERVIEW | Order overview page |
| SC-CONFIRMATION | Order confirmation page |
| SC-BUTTONS | All interactive buttons |
| SC-LABELS | Form field labels |

---

## ✅ Approval & Sign-off

- **Plan Version:** 1.0 (Refined - 31 Test Scenarios)
- **Created Date:** May 7, 2026
- **Status:** Ready for STEP 3 — Manual Exploratory Testing
