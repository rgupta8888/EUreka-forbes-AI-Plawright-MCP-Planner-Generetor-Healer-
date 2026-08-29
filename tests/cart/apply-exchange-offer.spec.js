/**
 * apply-exchange-offer.spec.js
 * Test: Apply exchange offer with category selection
 * 
 * This test verifies:
 * - Exchange offer modal/dialog opens
 * - User is prompted to select an appliance category
 * - 'Water Purifiers' category is selectable
 * - Category selection is confirmed
 * - Flow progresses to next step (PIN code entry screen)
 * - PIN code is entered correctly in the field
 * - PIN code is visible in the textbox
 * - PIN validation is processed
 * - Success message or validation status is displayed
 * - Option to apply discount appears
 * - Discount is applied to the cart
 * - Confirmation message displays: 'Exchange applied! You saved ₹4000 on this order'
 * - 'Add to cart' or confirmation option appears for the exchange
 * - System shows exchange has been applied
 */

const { test, expect } = require('@playwright/test');

class CartPage {
  constructor(page) {
    this.page = page;
  }

  async navigateAndAddToCart() {
    await this.page.goto('https://www.eurekaforbes.com/dp/GWPDNROCA0002X/aquaguard-enrich-nexen-2-x-ro-uv-active-copper-alkaline-water-purifier-2-year-filter-life-with-mega-sediment-filter', { waitUntil: 'domcontentloaded' });
    // fixed button is stable during page render
    const btn = this.page.getByTestId('fixed-add-to-cart-button');
    await btn.waitFor({ state: 'visible' });
    await btn.click({ force: true, noWaitAfter: true });
    await expect(this.page.getByText('Review your cart')).toBeVisible();
  }

  async getExchangeSelectButton() {
    return this.page.getByRole('button', { name: /Select/i }).first();
  }

  async clickExchangeSelect() {
    const selectBtn = await this.getExchangeSelectButton();
    await selectBtn.click();
    // Wait for the modal to appear
    await this.page.locator('[data-testid="modal-container"]').waitFor({ state: 'visible' });
  }

  getWaterPurifiersOption() {
    // Scope to modal container to avoid matching navigation links
    const modal = this.page.locator('[data-testid="modal-container"]');
    return modal.getByText(/Water Purifier/i).first();
  }

  async selectWaterPurifiersCategory() {
    const option = this.getWaterPurifiersOption();
    await option.waitFor({ state: 'visible' });
    await option.click();
  }

  async getContinueWithExchangeButton() {
    return this.page.getByRole('button', { name: /Continue with exchange/i });
  }

  async clickContinueWithExchange() {
    const btn = await this.getContinueWithExchangeButton();
    await btn.waitFor({ state: 'visible' });
    await btn.click();
  }

  async getPINCodeInputField() {
    return this.page.getByPlaceholder(/PIN|Pincode|Pin code/i);
  }

  async enterPINCode(pinCode) {
    const input = await this.getPINCodeInputField();
    await input.fill(pinCode);
  }

  async getPINCodeValue() {
    const input = await this.getPINCodeInputField();
    return await input.inputValue();
  }

  async getCheckPINButton() {
    return this.page.getByRole('button', { name: /Check/i });
  }

  async clickCheckPIN() {
    const btn = await this.getCheckPINButton();
    await btn.click();
    // Wait for PIN validation response
    await this.page.getByRole('button', { name: /Apply/i }).waitFor({ state: 'visible' }).catch(() => {});
  }

  async getApplyDiscountButton() {
    return this.page.getByRole('button', { name: /Apply/i });
  }

  async clickApplyDiscount() {
    const btn = await this.getApplyDiscountButton();
    await btn.waitFor({ state: 'visible' });
    await btn.click();
  }

  async getSuccessMessage() {
    return this.page.getByText(/Exchange applied.*You saved ₹4000/i);
  }

  async isSuccessMessageVisible() {
    const message = await this.getSuccessMessage();
    return await message.isVisible();
  }

  async getAddToCartExchangeButton() {
    return this.page.getByRole('button', { name: /Add to cart.*exchange|Confirm/i });
  }
}

class ExchangeModal {
  constructor(page) {
    this.page = page;
  }

  async isCategorySelectionVisible() {
    // The modal opens with data-testid="modal-container" containing category options
    const modal = this.page.locator('[data-testid="modal-container"]');
    return await modal.isVisible();
  }

  async isContinueButtonEnabled() {
    const btn = this.page.getByRole('button', { name: /Continue with exchange/i });
    return await btn.isEnabled();
  }

  async isPINInputVisible() {
    const input = this.page.getByPlaceholder(/PIN|Pincode/i);
    return await input.isVisible();
  }
}

// ==================== Test Suite ====================

test.describe('Cart Page - Exchange Offer Application', () => {
  let cartPage;
  let exchangeModal;

  test.beforeEach(async ({ page }) => {
    cartPage = new CartPage(page);
    exchangeModal = new ExchangeModal(page);
  });

  test('Apply exchange offer with category selection', async ({ page }) => {
    // Setup: Add product to cart
    await cartPage.navigateAndAddToCart();

    // Step 1: Click 'Select' button in exchange section
    await cartPage.clickExchangeSelect();

    // Verify: Exchange offer modal/dialog opens
    // User is prompted to select an appliance category
    const categoryVisible = await exchangeModal.isCategorySelectionVisible();
    expect(categoryVisible).toBe(true);

    // Step 2: Select 'Water Purifiers' category from the available options
    await cartPage.selectWaterPurifiersCategory();

    // Verify: 'Water Purifiers' category is selectable and selected
    const continueEnabled = await exchangeModal.isContinueButtonEnabled();
    expect(continueEnabled).toBe(true);

    // Step 3: Click 'Continue with exchange' button
    await cartPage.clickContinueWithExchange();

    // Verify: Flow progresses to next step
    // User is presented with PIN code entry screen
    const pinInputVisible = await exchangeModal.isPINInputVisible();
    expect(pinInputVisible).toBe(true);

    // Step 4: Enter PIN code '122003'
    await cartPage.enterPINCode('122003');

    // Verify: PIN code is entered correctly in the field
    // PIN code is visible in the textbox
    const pinValue = await cartPage.getPINCodeValue();
    expect(pinValue).toBe('122003');

    // Step 5: Click 'Check' button to validate the PIN
    await cartPage.clickCheckPIN();

    // Verify: PIN validation is processed
    // Success message or validation status is displayed
    // Option to apply discount appears
    const applyBtn = await cartPage.getApplyDiscountButton();
    expect(await applyBtn.isVisible()).toBe(true);

    // Step 6: Click 'Apply' button to apply the exchange discount
    await cartPage.clickApplyDiscount();

    // Verify: Discount is applied to the cart
    // Confirmation message displays: 'Exchange applied! You saved ₹4000 on this order'
    const messageVisible = await cartPage.isSuccessMessageVisible();
    expect(messageVisible).toBe(true);

    // Verify: System shows exchange has been applied
    const successMsg = await cartPage.getSuccessMessage();
    const msgText = await successMsg.textContent();
    expect(msgText).toContain('Exchange applied');
    expect(msgText).toContain('₹4000');
  });
});
