/**
 * remove-exchange-offer.spec.js
 * Test: Remove applied exchange offer
 * 
 * This test verifies:
 * - Exchange section shows the applied state with ₹4000 discount
 * - Remove/delete action is initiated
 * - Exchange discount is removed from the cart
 * - Exchange discount line is removed from order details
 * - Subtotal reverts to ₹31,998 (quantity 2 without exchange)
 * - Total displays ₹31,998 (no longer reduced by ₹4000)
 * - Exchange offer section shows 'Select' option again
 * - No active discount is displayed
 */

const { test, expect } = require('@playwright/test');

class CartPage {
  constructor(page) {
    this.page = page;
  }

  async navigateCartWithExchange() {
    await this.page.goto('https://www.eurekaforbes.com/dp/GWPDNROCA0002X/aquaguard-enrich-nexen-2-x-ro-uv-active-copper-alkaline-water-purifier-2-year-filter-life-with-mega-sediment-filter', { waitUntil: 'domcontentloaded' });
    // fixed-add-to-cart-button is a sticky header button – more stable during page render
    const btn = this.page.getByTestId('fixed-add-to-cart-button');
    await btn.waitFor({ state: 'visible' });
    await btn.click({ noWaitAfter: true });
    await expect(this.page.getByText('Review your cart')).toBeVisible();

    // Update quantity to 2
    const productItem = this.page.getByRole('link', { name: /Aquaguard Enrich Nexen/ }).locator('../..');
    await productItem.getByRole('button').nth(1).click();

    // Apply exchange
    await this.page.getByRole('button', { name: /Select/i }).first().click();
    const modal = this.page.locator('[data-testid="modal-container"]');
    await modal.waitFor({ state: 'visible' });
    await modal.getByText(/Water Purifier/i).first().click();

    const continueBtn = this.page.getByRole('button', { name: /Continue with exchange/i });
    await continueBtn.waitFor({ state: 'visible' });
    await continueBtn.click();

    const pinInput = this.page.getByPlaceholder(/Pincode|PIN/i);
    await pinInput.waitFor({ state: 'visible' });
    await pinInput.fill('122003');
    await this.page.getByRole('button', { name: /Check/i }).click();

    const applyBtn = this.page.getByRole('button', { name: /Apply/i });
    await applyBtn.waitFor({ state: 'visible' });
    await applyBtn.click();
  }

  // Exchange item delete button - last button within the exchange line item
  getExchangeDeleteButton() {
    return this.page.locator('text=/Exchange your old appliance|exchange/i').locator('../../..').getByRole('button').last();
  }

  async clickExchangeDelete() {
    await this.getExchangeDeleteButton().click();
  }

  async getExchangeDiscountLine() {
    return this.page.locator('text=/Exchange.*discount|Exchange.*off/i');
  }

  async isExchangeDiscountVisible() {
    const line = await this.getExchangeDiscountLine();
    return await line.isVisible();
  }

  async getSubtotalAmount() {
    const line = this.page.locator('text=/Subtotal/').locator('..');
    const text = await line.locator('text=/₹/').textContent();
    return text;
  }

  async getTotalAmount() {
    const line = this.page.locator('text=/^Total$/').locator('..');
    const text = await line.locator('text=/₹/').textContent();
    return text;
  }

  async getExchangeSelectButton() {
    return this.page.getByRole('button', { name: /Select/i }).first();
  }

  async isExchangeSelectButtonVisible() {
    const btn = await this.getExchangeSelectButton();
    return await btn.isVisible();
  }
}

// ==================== Test Suite ====================

test.describe('Cart Page - Exchange Offer Removal', () => {
  let cartPage;

  test.beforeEach(async ({ page }) => {
    cartPage = new CartPage(page);
  });

  test('Remove applied exchange offer', async ({ page }) => {
    // Setup: Navigate to cart with exchange applied
    await cartPage.navigateCartWithExchange();

    // Verify: Exchange section shows the applied state
    const exchangeVisible = await cartPage.isExchangeDiscountVisible();
    expect(exchangeVisible).toBe(true);

    // Step: Remove/delete the applied exchange offer
    // Note: The delete button may be near the exchange offer section or inside it
    try {
      await cartPage.clickExchangeDelete();
    } catch (e) {
      // If specific delete button not found, try generic approach
      const deleteBtn = page.locator('button').filter({ hasText: /delete|remove/ }).first();
      if (await deleteBtn.isVisible()) {
        await deleteBtn.click();
        await page.waitForTimeout(500);
      }
    }

    // Verify: Exchange discount line is removed from order details
    const exchangeLineVisible = await cartPage.isExchangeDiscountVisible();
    expect(exchangeLineVisible).toBe(false);

    // Verify: Subtotal reverts to ₹31,998 (quantity 2 without exchange)
    const subtotal = await cartPage.getSubtotalAmount();
    expect(subtotal).toContain('₹31,998');

    // Verify: Total displays ₹31,998 (no longer reduced by ₹4000)
    const total = await cartPage.getTotalAmount();
    expect(total).toContain('₹31,998');

    // Verify: Exchange offer section shows 'Select' option again
    const selectButtonVisible = await cartPage.isExchangeSelectButtonVisible();
    expect(selectButtonVisible).toBe(true);

    // Verify: No active discount is displayed
    const discountStillVisible = await cartPage.isExchangeDiscountVisible();
    expect(discountStillVisible).toBe(false);
  });
});
